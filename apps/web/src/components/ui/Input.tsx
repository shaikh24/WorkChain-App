import { InputHTMLAttributes } from 'react';
export function Input(props: InputHTMLAttributes<HTMLInputElement>){
  return <input {...props} className={`w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 ${props.className||''}`} />;
}
