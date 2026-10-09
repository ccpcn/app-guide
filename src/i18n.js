import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//####### Add language translation here ####
import en from './locales/en.json';
import bn from './locales/bn.json';
import syl from './locales/syl.json'
import ar from './locales/ar.json'
import so from './locales/so.json'
import es from './locales/es.json'
import ro from './locales/ro.json'
// Add imports for each APPROVED translation JSON and register it below.
// ##########Change Translation here ################
export const approvedLanguages = [{code:'en', name:'English'},{code:'bn', name:'বাংলা'},{code:'bn', name:'সিলেটি'},{code:'syl', name:'সিলেটি'},{ code: 'ar', name: 'العربية' },{ code: 'so', name: 'Af-Soomaali' },{ code: 'es', name: 'Español' },{ code: 'ro', name: 'Română' }  ];
const resources = { en: { translation: en },bn: { translation: bn },syl: { translation: syl }, ar:{translation: ar},so:{translation: so}, es:{translation: es}, ro:{translation: ro}}
//############################
// es: { translation: es },ar: { translation: ar },pl: { translation: pl },
// pt: { translation: pt },ro: { translation: ro },so: { translation: so },tr: { translation: tr }, ur: { translation: ur }    };

const requested = new URLSearchParams(window.location.search).get('lang');
const language = approvedLanguages.some(x=>x.code===requested) ? requested : 'en';
i18n.use(initReactI18next).init({resources,lng:language,fallbackLng:'en',supportedLngs:approvedLanguages.map(x=>x.code),interpolation:{escapeValue:false},returnNull:false});
export function updateDocumentLanguage(code){
  document.documentElement.lang=code;
  document.documentElement.dir=['ar','ur'].includes(code)?'rtl':'ltr';
}
updateDocumentLanguage(language);
export default i18n;
