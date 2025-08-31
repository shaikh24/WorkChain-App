import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function App(){
  const { t, i18n } = useTranslation();
  return (
    <div>
      <header className="sticky top-0 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto p-4 flex gap-4 items-center">
          <Link to="/" className="font-bold">FM</Link>
          <nav className="flex gap-3 text-sm">
            <Link to="/jobs">Jobs</Link>
            <Link to="/orders-demo">Orders</Link>
            <Link to="/inbox">Inbox</Link>
            <Link to="/wallet">Wallet</Link>
            <Link to="/admin">Admin</Link>
          </nav>
          <div className="ml-auto flex gap-2">
            <button className="text-xs" onClick={()=>i18n.changeLanguage('en')}>EN</button>
            <button className="text-xs" onClick={()=>i18n.changeLanguage('ur')}>UR</button>
            <Link to="/login" className="text-sm">Login</Link>
          </div>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="text-center text-xs opacity-60 p-6">© FM</footer>
    </div>
  );
}
