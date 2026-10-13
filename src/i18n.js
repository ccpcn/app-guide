import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//####### Add language translation here ####
import en from './locales/en.json'
import bn from './locales/bn.json'
import ar from './locales/ar.json'
import so from './locales/so.json'
import es from './locales/es.json'
import ro from './locales/ro.json'
import hi from './locales/hi.json'
import ta from './locales/ta.json'
import zhCN from './locales/zhCN.json'
import fa from './locales/fa.json'

// Add imports for each APPROVED translation JSON and register it below.
// ##########Change Translation here ################
// export const approvedLanguages = [{code:'en', name:'English'},{code:'bn', name:'বাংলা'},{code:'syl', name:'সিলেটি'},{ code: 'ar', name: 'العربية' },{ code: 'so', name: 'Af-Soomaali' },{ code: 'es', name: 'Español' },{ code: 'ro', name: 'Română' },{ code: 'hi', name: 'हिन्दी' },{ code: 'ta', name: 'தமிழ்' }  ];
export const approvedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ar', name: 'العربية' },
  { code: 'so', name: 'Af-Soomaali' },
  { code: 'es', name: 'Español' },
  { code: 'ro', name: 'Română' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'zhCN', name: '简体中文' },
  { code: 'fa', name: 'فارسی' }
];
const resources = { en: { translation: en },bn: { translation: bn }, ar:{translation: ar},so:{translation: so}, es:{translation: es}, ro:{translation: ro}, hi:{translation: hi}, ta:{translation: ta}, zhCN: { translation: zhCN }, fa: { translation: fa }}
const requested = new URLSearchParams(window.location.search).get('lang');
const language = approvedLanguages.some(x=>x.code===requested) ? requested : 'en';
i18n.use(initReactI18next).init({resources,lng:language,fallbackLng:'en',supportedLngs:approvedLanguages.map(x=>x.code),interpolation:{escapeValue:false},returnNull:false});
export function updateDocumentLanguage(code){
  document.documentElement.lang=code;
  document.documentElement.dir=['ar','fa','ur'].includes(code)?'rtl':'ltr';
}
updateDocumentLanguage(language);
export default i18n;
