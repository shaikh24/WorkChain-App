import { createContext, useContext, useState, ReactNode } from "react";
type Toast = { id: string; title: string; description?: string };
const Ctx = createContext<{ toasts: Toast[]; push: (t: Omit<Toast, 'id'>)=>void }|null>(null);
export function ToasterProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = (t: Omit<Toast,'id'>) => {
    const toast = { id: Math.random().toString(36).slice(2), ...t };
    setToasts((x)=>[...x, toast]);
    setTimeout(()=> setToasts((x)=> x.filter(i=>i.id!==toast.id)), 3000);
  };
  return (
    <Ctx.Provider value={{ toasts, push }}>
      {children}
      <div className="fixed z-50 bottom-4 right-4 space-y-2">
        {toasts.map(t=> (
          <div key={t.id} className="bg-black text-white dark:bg-white dark:text-black rounded-xl px-4 py-3 shadow-soft max-w-xs">
            <div className="font-semibold">{t.title}</div>
            {t.description && <div className="text-sm opacity-80">{t.description}</div>}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
export function useToast(){ const ctx = useContext(Ctx)!; return ctx; }
