import { ReactNode } from 'react';
export function Card({ children, className='' }: { children: ReactNode; className?: string }){
  return <div className={`rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 shadow-soft bg-white/80 dark:bg-neutral-900/60 ${className}`}>{children}</div>
}
