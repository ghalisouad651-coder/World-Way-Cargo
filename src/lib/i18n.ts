import { createContext, useContext } from 'react';

export type Lang = 'en' | 'ar';

export interface Dict {
  nav: { home: string; services: string; branches: string; contact: string; faq: string; track: string; quote: string };
  brand: { name: string; tagline: string };
  cta: { track: string; quote: string; contact: string; learnMore: string; send: string; sending: string; close: string };
  lang: { label: string; switchTo: string };
  liveSupport: { title: string; status: string; greeting: string; placeholder: string; send: string };
}

export const dictionaries: Record<Lang, Dict> = {
  en: {
    nav: { home: 'Home', services: 'Services', branches: 'Branches', contact: 'Contact', faq: 'FAQ & Trust', track: 'Track', quote: 'Get Quote' },
    brand: { name: 'Worldway-cargo', tagline: 'Global Electronics Logistics' },
    cta: { track: 'Track Your Shipment', quote: 'Get a Quick Quote', contact: 'Contact Us', learnMore: 'Learn More', send: 'Send', sending: 'Sending...', close: 'Close' },
    lang: { label: 'EN', switchTo: 'العربية' },
    liveSupport: { title: 'Live Support', status: 'Online now', greeting: 'Hi! How can we help with your shipment today?', placeholder: 'Type your message...', send: 'Send' },
  },
  ar: {
    nav: { home: 'الرئيسية', services: 'الخدمات', branches: 'الفروع', contact: 'اتصل بنا', faq: 'الأسئلة والأمان', track: 'تتبع', quote: 'اطلب عرض سعر' },
    brand: { name: 'ورلد واي كارغو', tagline: 'اللوجستيات العالمية للإلكترونيات' },
    cta: { track: 'تتبع شحنتك', quote: 'احصل على عرض سعر', contact: 'اتصل بنا', learnMore: 'اعرف المزيد', send: 'إرسال', sending: 'جارٍ الإرسال...', close: 'إغلاق' },
    lang: { label: 'ع', switchTo: 'English' },
    liveSupport: { title: 'الدعم المباشر', status: 'متصل الآن', greeting: 'مرحباً! كيف يمكننا مساعدتك في شحنتك اليوم؟', placeholder: 'اكتب رسالتك...', send: 'إرسال' },
  },
};

export interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: Dict;
  dir: 'ltr' | 'rtl';
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
