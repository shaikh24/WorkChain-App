import { useEffect, useState } from "react";
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return <button className="text-sm opacity-80 hover:opacity-100" onClick={() => setDark(v=>!v)}>{dark ? "Dark" : "Light"}</button>;
}
