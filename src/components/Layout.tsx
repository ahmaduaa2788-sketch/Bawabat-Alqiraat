import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, CheckCircle2, LogOut, User, Sun, Moon, Target, Sparkles, Trophy } from 'lucide-react';
import { courseMap } from '../data/courseMap';
import { qalunCourseMap } from '../data/qalunCourseMap';
import { cn } from '../lib/utils';
import { qiraatTree } from '../data/qiraatTree';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useReview } from '../context/ReviewContext';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { role, userData, logout } = useAuth();
  const { completedLessons, getCourseProgress, isUnitCompleted } = useProgress();
  const { unmasteredMistakes } = useReview();
  
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
  
  let qariId: string | undefined, rawiId: string | undefined, tariqId: string | undefined;
  if (isCourseRoute) {
    qariId = pathParts[2];
    rawiId = pathParts[3];
    tariqId = pathParts[4];
  }

  const qari = qiraatTree.find(q => q.id === qariId);
  const rawi = qari?.ruwat.find(r => r.id === rawiId);
  const tariq = rawi?.turuq.find(t => t.id === tariqId);

  const courseProgress = rawiId ? getCourseProgress(rawiId) : { totalLessons: 0, completedCount: 0, percent: 0, completedUnits: [] };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans transition-colors duration-300" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-navy-900/90 backdrop-blur-md border-b border-navy-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isCourseRoute && (
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-navy-400 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-600 to-gold-400 flex items-center justify-center shadow-lg shadow-gold-500/20">
                <span className="font-arabic text-navy-950 font-bold text-2xl leading-none">ق</span>
              </div>
              <span className="font-bold text-lg md:text-xl text-white tracking-wide">
                مقرأة الإتقان <span className="text-gold-500 text-sm font-normal mr-1">للشاطبية</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-navy-300 hover:text-gold-400 hover:bg-navy-800/80 rounded-xl transition border border-transparent hover:border-navy-700"
              title={isDarkMode ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي"}
              aria-label="تبديل المظهر"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-gold-400" /> : <Moon className="w-5 h-5 text-navy-600" />}
            </button>

            {/* Review Mode Button (Always visible to logged-in users) */}
            {role && (
              <Link
                to="/review"
                className={cn(
                  "text-xs md:text-sm font-bold px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 shadow-sm",
                  location.pathname === '/review'
                    ? "bg-gold-500 text-navy-950 border-gold-400 shadow-gold-500/20"
                    : "bg-navy-800/90 hover:bg-navy-700 text-gold-400 border-gold-500/30"
                )}
                title="وضع مراجعة الأخطاء والتمكين"
              >
                <Target className="w-4 h-4 text-gold-400" />
                <span className="hidden sm:inline">وضع المراجعة</span>
                {unmasteredMistakes.length > 0 && (
                  <span className="px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[10px] font-black font-mono">
                    {unmasteredMistakes.length}
                  </span>
                )}
              </Link>
            )}

            {/* User Profile / Status / Admin Link */}
            {role && (
              <div className="flex items-center gap-2 border-r border-navy-800 pr-3">
                <span className="hidden md:inline text-xs text-navy-300 font-medium">
                  {userData?.name || (role === 'admin' ? 'المشرف العام' : 'طالب علم')}
                </span>
                {location.pathname !== '/admin' && (
                  <Link 
                    to="/admin" 
                    className="text-xs md:text-sm font-bold bg-navy-800 hover:bg-navy-700 text-gold-400 px-3 py-1.5 rounded-lg border border-gold-500/30 transition flex items-center gap-1.5"
                    title="لوحة تحكم المشرف وإدارة المادة العلمية"
                  >
                    لوحة الإدارة
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="text-xs md:text-sm font-bold text-red-400 hover:text-red-300 transition flex items-center gap-1 hover:bg-red-500/10 px-2.5 py-1.5 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  خروج
                </button>
              </div>
            )}
            
            {isCourseRoute && tariq && (
              <div className="bg-navy-800/80 px-3.5 py-1.5 rounded-full border border-gold-500/30 text-xs md:text-sm font-bold flex items-center gap-2 shadow-inner text-gold-400">
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse shadow-[0_0_8px_#D4AF37]"></span>
                <span className="hidden sm:inline">{rawi?.name} -</span> {tariq?.name}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar - Only shown when inside a course */}
        {isCourseRoute && rawiId && (
          <aside className={cn(
            "bg-navy-950/60 backdrop-blur-md w-80 border-l border-navy-800 overflow-y-auto fixed lg:sticky top-16 h-[calc(100vh-4rem)] z-40 transition-transform duration-300 shadow-2xl lg:shadow-none",
            isMobileMenuOpen ? "translate-x-0 right-0" : "translate-x-full right-0 lg:translate-x-0"
          )}>
            <div className="p-4 space-y-4">
              
              {/* Overall Course Progress Widget in Sidebar */}
              <div className="bg-navy-900/90 border border-navy-800 rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gold-400">إنجاز الدورة الكلية</span>
                  <span className="text-sm font-black text-white font-mono">{courseProgress.percent}%</span>
                </div>
                <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden border border-navy-800">
                  <div 
                    className="bg-gradient-to-l from-gold-500 to-emerald-400 h-full transition-all duration-500"
                    style={{ width: `${courseProgress.percent}%` }}
                  />
                </div>
                <div className="text-[11px] text-navy-400 mt-2 text-left font-mono">
                  {courseProgress.completedCount} / {courseProgress.totalLessons} مكتمل
                </div>
              </div>

              <Link 
                to={`/course/${qariId}/${rawiId}/${tariqId}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition border shadow-sm",
                  location.pathname === `/course/${qariId}/${rawiId}/${tariqId}` 
                    ? "bg-navy-800 text-gold-400 border-gold-500/30 shadow-gold-500/5" 
                    : "text-navy-300 hover:bg-navy-800 hover:text-white border-transparent"
                )}
              >
                <BookOpen className="w-5 h-5" />
                خريطة المسار
              </Link>

              <div className="space-y-6 pt-2">
                { (rawiId === 'qalun' ? qalunCourseMap : courseMap).map((unit) => {
                  const unitComplete = isUnitCompleted(rawiId!, unit.id);
                  const completedLessonsInUnit = (unit.lessons || []).filter(l => 
                    completedLessons.includes(`${rawiId}-${unit.id}-${l.id}`)
                  ).length;

                  return (
                    <div 
                      key={unit.id} 
                      className={cn(
                        "rounded-2xl p-3 border transition-colors",
                        unitComplete 
                          ? "bg-emerald-950/20 border-emerald-500/30" 
                          : "bg-navy-900/40 border-navy-800/80"
                      )}
                    >
                      <div className="flex justify-between items-center mb-2 px-1">
                        <h3 className="font-bold text-white text-xs md:text-sm flex items-center gap-2 truncate">
                          <span className={cn(
                            "w-2 h-2 rounded-full inline-block shrink-0",
                            unitComplete ? "bg-emerald-400 shadow-[0_0_6px_#10b981]" : "bg-gold-500 shadow-[0_0_5px_#D4AF37]"
                          )}></span>
                          <span className="truncate">{unit.title}</span>
                        </h3>
                        {unitComplete ? (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0">
                            مكتمل ✓
                          </span>
                        ) : (
                          <span className="text-[10px] text-navy-400 font-mono shrink-0">
                            {completedLessonsInUnit}/{unit.lessons.length}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        {unit.lessons.length > 0 ? (
                          unit.lessons.map((lesson) => {
                            const isLessonDone = completedLessons.includes(`${rawiId}-${unit.id}-${lesson.id}`);
                            const isActive = location.pathname.includes(lesson.id);
                            
                            return (
                              <Link
                                key={lesson.id}
                                to={`/lesson/${qariId}/${rawiId}/${tariqId}/${unit.id}/${lesson.id}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                  "flex items-center justify-between px-3 py-2 rounded-lg text-xs md:text-sm transition relative overflow-hidden font-medium",
                                  isActive
                                    ? "bg-navy-800 text-white shadow-md before:absolute before:right-0 before:top-0 before:h-full before:w-1.5 before:bg-gold-500"
                                    : isLessonDone
                                      ? "text-emerald-300 hover:bg-navy-800/50"
                                      : "text-navy-400 hover:bg-navy-800/50 hover:text-navy-100"
                                )}
                              >
                                <span className="truncate max-w-[180px]">{lesson.title}</span>
                                {isLessonDone && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mr-1" />
                                )}
                              </Link>
                            );
                          })
                        ) : (
                          <div className="px-3 py-1.5 text-xs text-navy-500 italic bg-navy-950/40 rounded border border-dashed border-navy-800">
                            قيد التطوير
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className={cn(
          "flex-1 p-4 md:p-8 overflow-x-hidden min-h-[calc(100vh-4rem)]",
          isCourseRoute ? "w-full lg:w-[calc(100%-20rem)]" : "w-full"
        )}>
          <Outlet />
        </main>
      </div>

      {/* Global Footer */}
      <footer className="bg-navy-900 border-t border-navy-800 py-6 text-center text-xs text-navy-400">
        <p>مقرأة الإتقان في أصول القراءات السبع من طريق الشاطبية © {new Date().getFullYear()}</p>
        <p className="mt-1">منهج علمي تفاعلي محكم لطلبة القراءات القرآنية</p>
      </footer>
    </div>
  );
}
