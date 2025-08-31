import { ButtonHTMLAttributes } from 'react';
export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>){
  return <button {...props} className={`px-4 py-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-soft hover:opacity-90 ${props.className||''}`} />;
}
