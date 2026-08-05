import { useCallback, useEffect, useMemo, useState } from 'react';
import { I18nContext, dictionaries, type Lang, type I18nContextValue } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveSupport from '@/components/LiveSupport';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import BranchesPage from '@/pages/BranchesPage';
import ContactPage from '@/pages/ContactPage';
import FaqPage from '@/pages/FaqPage';

function useHashRoute() {
  const [path, setPath] = useState<string>(() => window.location.hash.replace(/^#/, '') || '/');

  useEffect(() => {
    const onHash = () => {
      const next = window.location.hash.replace(/^#/, '') || '/';
      setPath(next);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((to: string) => {
    window.location.hash = to;
  }, []);

  return { path, navigate };
}

function App() {
  const { path, navigate } = useHashRoute();
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const i18nValue = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((l: Lang) => (l === 'en' ? 'ar' : 'en')),
      t: dictionaries[lang],
      dir: lang === 'ar' ? 'rtl' : 'ltr',
    }),
    [lang],
  );

  const renderPage = () => {
    switch (true) {
      case path === '/':
        return <HomePage onNavigate={navigate} />;
      case path.startsWith('/services'):
        return <ServicesPage onNavigate={navigate} />;
      case path.startsWith('/branches'):
        return <BranchesPage onNavigate={navigate} />;
      case path.startsWith('/contact'):
        return <ContactPage />;
      case path.startsWith('/faq'):
        return <FaqPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <I18nContext.Provider value={i18nValue}>
      <div className="flex min-h-screen flex-col bg-white">
        <Header currentPath={path} onNavigate={navigate} />
        <main className="flex-1">{renderPage()}</main>
        <Footer onNavigate={navigate} />
        <LiveSupport />
      </div>
    </I18nContext.Provider>
  );
}

export default App;
