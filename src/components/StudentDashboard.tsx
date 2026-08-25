import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { Award, BookOpen, Clock, Activity } from 'lucide-react';

const mockActivityData = [
  { name: 'السبت', value: 2 },
  { name: 'الأحد', value: 4 },
  { name: 'الاثنين', value: 3 },
  { name: 'الثلاثاء', value: 5 },
  { name: 'الأربعاء', value: 2 },
  { name: 'الخميس', value: 6 },
  { name: 'الجمعة', value: 8 },
];

export function StudentDashboard() {
  const { userData } = useAuth();
  const { completedLessons } = useProgress();

  if (!userData) return null;

  return (
    <div className="mb-12 space-y-6">
      <div className="bg-navy-950 border border-navy-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">مرحباً بك يا {userData.name} 👋</h2>
            <p className="text-navy-300">متابعة الأداء ومعدل التقدم الأسبوعي</p>
          </div>
          <div className="bg-gold-500/10 border border-gold-500/30 text-gold-400 px-4 py-2 rounded-full font-bold flex items-center gap-2">
            <Award className="w-5 h-5" />
            الطالب المثالي
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-navy-900 border border-navy-800 p-6 rounded-xl flex items-center gap-4">
            <div className="p-4 bg-blue-500/10 text-blue-400 rounded-full">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-navy-300 text-sm font-bold mb-1">الدروس المنجزة</p>
              <p className="text-3xl font-extrabold text-white">{completedLessons.length}</p>
            </div>
          </div>
          <div className="bg-navy-900 border border-navy-800 p-6 rounded-xl flex items-center gap-4">
            <div className="p-4 bg-green-500/10 text-green-400 rounded-full">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-navy-300 text-sm font-bold mb-1">ساعات المذاكرة</p>
              <p className="text-3xl font-extrabold text-white">12.5</p>
            </div>
          </div>
          <div className="bg-navy-900 border border-navy-800 p-6 rounded-xl flex items-center gap-4">
            <div className="p-4 bg-purple-500/10 text-purple-400 rounded-full">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-navy-300 text-sm font-bold mb-1">معدل الاستمرار</p>
              <p className="text-3xl font-extrabold text-white">7 أيام</p>
            </div>
          </div>
        </div>

        <div className="bg-navy-900 p-6 rounded-xl border border-navy-800">
          <h3 className="text-xl font-bold text-white mb-6">نشاط المراجعة خلال الأسبوع</h3>
          <div className="h-[300px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#94a3b8'}} />
                <YAxis stroke="#64748b" tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '8px' }}
                  itemStyle={{ color: '#d4af37' }}
                />
                <Line type="monotone" dataKey="value" name="الدروس/التدريبات" stroke="#d4af37" strokeWidth={3} dot={{ fill: '#d4af37', strokeWidth: 2 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
