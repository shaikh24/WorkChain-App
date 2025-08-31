import { ReactNode, useEffect, useState } from "react";
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  useEffect(()=>{ document.documentElement.classList.toggle("dark", dark); }, [dark]);
  return (
    <div>
      <button onClick={()=>setDark(v=>!v)} className="fixed top-3 right-3 text-xs opacity-70 hover:opacity-100">
        {dark ? "Dark" : "Light"}
      </button>
      {children}
    </div>
  );
}
