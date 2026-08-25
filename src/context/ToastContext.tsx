import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`animate-in slide-in-from-bottom-5 fade-in duration-300 px-6 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-3 border backdrop-blur-md pointer-events-auto
              ${toast.type === 'success' ? 'bg-green-500/90 text-white border-green-400 shadow-green-500/20' : ''}
              ${toast.type === 'info' ? 'bg-blue-500/90 text-white border-blue-400 shadow-blue-500/20' : ''}
              ${toast.type === 'warning' ? 'bg-gold-500/90 text-navy-950 border-gold-400 shadow-gold-500/20' : ''}
            `}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
