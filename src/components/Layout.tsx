import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, CheckCircle2, LogOut, User, Sun, Moon } from 'lucide-react';
import { courseMap } from '../data/courseMap';
import { qalunCourseMap } from '../data/qalunCourseMap';
import { cn } from '../lib/utils';
import { qiraatTree } from '../data/qiraatTree';
import { useAuth } from '../context/AuthContext';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { role, userData, logout } = useAuth();
  
  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('app_theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.add('theme-light');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.add('theme-light');
      localStorage.setItem('app_theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.remove('theme-light');
      localStorage.setItem('app_theme', 'dark');
      setIsDarkMode(true);
    }
  };

  // Extract route params manually from pathname to determine if we are in a course view
  const isCourseRoute = location.pathname.includes('/course/') || location.pathname.includes('/lesson/');
  const pathParts = location.pathname.split('/');
  
  let qariId, rawiId, tariqId;
  if (isCourseRoute) {
    qariId = pathParts[2];
    rawiId = pathParts[3];
    tariqId = pathParts[4];
  }

  const qari = qiraatTree.find(q => q.id === qariId);
  const rawi = qari?.ruwat.find(r => r.id === rawiId);
  const tariq = rawi?.turuq.find(t => t.id === tariqId);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white flex flex-col font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-navy-950/90 backdrop-blur-md border-b border-navy-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isCourseRoute && (
              <button 
                className="lg:hidden p-2 hover:bg-navy-800 text-navy-200 hover:text-white rounded-lg transition"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            )}
            <Link to="/" className="flex items-center gap-3 hover:text-gold-400 transition group">
              <div className="bg-navy-800 p-1.5 rounded-lg border border-navy-700 shadow-sm group-hover:border-gold-500/50 transition-colors">
                <BookOpen className="text-gold-500 w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-bold text-xl tracking-wide hidden sm:block drop-shadow-sm">أصول القراءات</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 bg-navy-800 hover:bg-navy-700 text-gold-400 rounded-lg transition-colors border border-navy-700 hover:border-gold-500/30"
              title={isDarkMode ? "التبديل للوضع النهاري (وضع القراءة)" : "التبديل للوضع الليلي"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {!role ? (
              <>
                <Link to="/login" className="text-sm font-bold text-navy-200 hover:text-white transition">تسجيل الدخول</Link>
                <Link to="/admin" className="text-sm font-bold text-navy-200 hover:text-gold-400 transition hidden sm:block">الإدارة</Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gold-400 font-bold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {role === 'admin' ? 'المدير العام' : userData?.name || 'طالب علم'}
                </span>
                {role === 'admin' && location.pathname !== '/admin' && (
                  <Link to="/admin" className="text-sm font-bold text-navy-200 hover:text-white transition">لوحة التحكم</Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="text-sm font-bold text-red-400 hover:text-red-300 transition flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  خروج
                </button>
              </div>
            )}
            
            {isCourseRoute && tariq && (
              <div className="bg-navy-800/80 px-4 py-1.5 rounded-full border border-gold-500/30 text-sm font-bold flex items-center gap-2 shadow-inner text-gold-400">
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse shadow-[0_0_8px_#D4AF37]"></span>
                {rawi?.name} - {tariq?.name}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar - Only shown when inside a course */}
        {isCourseRoute && (
          <aside className={cn(
            "bg-navy-950/50 backdrop-blur-md w-80 border-l border-navy-800 overflow-y-auto fixed lg:sticky top-16 h-[calc(100vh-4rem)] z-40 transition-transform duration-300 shadow-2xl lg:shadow-none",
            isMobileMenuOpen ? "translate-x-0 right-0" : "translate-x-full right-0 lg:translate-x-0"
          )}>
            <div className="p-4">
              <Link 
                to={`/course/${qariId}/${rawiId}/${tariqId}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-bold mb-6 transition border shadow-sm",
                  location.pathname === `/course/${qariId}/${rawiId}/${tariqId}` 
                    ? "bg-navy-800 text-gold-400 border-gold-500/30 shadow-gold-500/5" 
                    : "text-navy-300 hover:bg-navy-800 hover:text-white border-transparent"
                )}
              >
                <BookOpen className="w-5 h-5" />
                خريطة المسار
              </Link>

              <div className="space-y-8">
                { (rawiId === 'qalun' ? qalunCourseMap : courseMap).map((unit) => (
                  <div key={unit.id} className="space-y-3">
                    <h3 className="font-bold text-navy-200 px-2 text-sm uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 bg-gold-500 rounded-full inline-block shadow-[0_0_5px_#D4AF37]"></span>
                      {unit.title}
                    </h3>
                    <div className="space-y-1">
                      {unit.lessons.length > 0 ? (
                        unit.lessons.map((lesson) => {
                          const isActive = location.pathname.includes(lesson.id);
                          return (
                            <Link
                              key={lesson.id}
                              to={`/lesson/${qariId}/${rawiId}/${tariqId}/${unit.id}/${lesson.id}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={cn(
                                "block px-4 py-2.5 rounded-lg text-sm transition relative overflow-hidden font-medium",
                                isActive
                                  ? "bg-navy-800 text-white shadow-md before:absolute before:right-0 before:top-0 before:h-full before:w-1.5 before:bg-gold-500"
                                  : "text-navy-400 hover:bg-navy-800/50 hover:text-navy-100"
                              )}
                            >
                              {lesson.title}
                            </Link>
                          );
                        })
                      ) : (
                        <div className="px-4 py-2 text-xs text-navy-500 italic bg-navy-900/50 rounded-lg border border-dashed border-navy-800">
                          قريباً...
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Overlay for mobile sidebar */}
        {isMobileMenuOpen && isCourseRoute && (
          <div 
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm z-30 lg:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-y-auto min-h-[calc(100vh-4rem)] transition-all",
          isCourseRoute ? "p-4 md:p-8" : "w-full px-4 md:px-8"
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
