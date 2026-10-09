import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
//import i18n from 'i18next';
import "./i18n";
import {initReactI18next, useTranslation} from 'react-i18next';
import {sections} from './content';
import './styles.css';

const translations = {
 en:{translation:{language:'Language',heading:'Your NHS App:',tagline:'Easy Access to Your Care Anytime',features:'NHS APP Features',summary:['Contact Your GP Surgery','View Test Results','Order Repeat Prescriptions','GP Surgery Appointments','Hospital Referrals','Messages','Manage services for someone else'],download:'Download the NHS App',otherDownload:'Other ways to download the NHS App',expand:'Expand all',close:'Close all',help:'Need more help?',helpText:'Contact your GP surgery for help with services provided by your practice, or visit the official NHS App help centre.',official:'Official NHS App help',emergency:'For a life-threatening emergency call 999. For urgent medical help use NHS 111.',back:'Back to top',skip:'Skip to main content',video:'Watch official NHS App video guides',note:'Good to know',copy:'Copy link to this guide',copied:'Link copied',notice:'The step-by-step instructions below remain in English. Translations must be reviewed before patient publication.',footer:'Patient information guide · Content review required before publication',disclaimer:'This is an informational guide, not the NHS App. Never enter NHS login details on this page.'}},
 bn:{translation:{language:'ভাষা',heading:'আপনার NHS অ্যাপ:',tagline:'যেকোনো সময় সহজে স্বাস্থ্যসেবা পান',features:'NHS অ্যাপের সুবিধা',download:'NHS অ্যাপ ডাউনলোড করুন',otherDownload:'NHS অ্যাপ ডাউনলোডের অন্যান্য উপায়',expand:'সব খুলুন',close:'সব বন্ধ করুন',help:'আরও সাহায্য দরকার?',helpText:'সহায়তার জন্য আপনার GP সার্জারির সঙ্গে যোগাযোগ করুন।',official:'NHS অ্যাপ সহায়তা',back:'উপরে যান',skip:'মূল বিষয়বস্তুতে যান',video:'NHS অ্যাপের ভিডিও নির্দেশিকা',note:'মনে রাখবেন',copy:'এই নির্দেশিকার লিংক কপি করুন',copied:'লিংক কপি হয়েছে',notice:'নিচের ধাপে ধাপে নির্দেশনাগুলি এখনও ইংরেজিতে রয়েছে। রোগীদের ব্যবহারের আগে অনুবাদ যাচাই করতে হবে।'}},
 ar:{translation:{language:'اللغة',heading:'تطبيق NHS الخاص بك:',tagline:'وصول سهل إلى رعايتك في أي وقت',features:'ميزات تطبيق NHS',download:'تنزيل تطبيق NHS',otherDownload:'طرق أخرى لتنزيل تطبيق NHS',expand:'فتح الكل',close:'إغلاق الكل',help:'هل تحتاج إلى مساعدة؟',helpText:'اتصل بعيادة طبيبك العام للحصول على المساعدة.',official:'مساعدة تطبيق NHS',back:'العودة إلى الأعلى',skip:'الانتقال إلى المحتوى الرئيسي',video:'شاهد فيديوهات NHS الإرشادية',note:'معلومة مهمة',copy:'نسخ رابط هذا الدليل',copied:'تم نسخ الرابط',notice:'التعليمات التفصيلية أدناه لا تزال باللغة الإنجليزية. يجب مراجعة الترجمات قبل نشرها للمرضى.'}}
};
const initialLang = new URLSearchParams(window.location.search).get('lang');
i18n.use(initReactI18next).init({resources:translations,lng:translations[initialLang]?initialLang:'en',fallbackLng:'en',interpolation:{escapeValue:false}});
const icons=['📱','💬','🧪','💊','🗓️','🏥','🔔','👥'];
const features=[{label:'Contact Your GP Surgery',id:'contact-gp'},{label:'View Test Results',id:'test-results'},{label:'Order Repeat Prescriptions',id:'prescriptions'},{label:'GP Surgery Appointments',id:'gp-appointments'},{label:'Hospital Referrals',id:'hospital-appointments'},{label:'Messages',id:'messages'},{label:'Manage services for someone else',id:'family-access'}];
const URLS={ios:'https://apps.apple.com/gb/app/nhs-app/id1388411277',android:'https://play.google.com/store/apps/details?id=com.nhs.online.nhsonline',other:'https://www.nhs.uk/nhs-app/setting-up/downloading/'};
function getDownloadUrl(){const ua=navigator.userAgent||'';if(/iPhone|iPad|iPod/i.test(ua))return URLS.ios;if(/Android/i.test(ua))return URLS.android;return URLS.other;}
function App(){
 const {t}=useTranslation();
 const [lang,setLang]=useState(i18n.language);
 const [open,setOpen]=useState([]);
 const [copied,setCopied]=useState('');
 const [downloadUrl,setDownloadUrl]=useState(URLS.other);
 useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';},[lang]);
 useEffect(()=>{setDownloadUrl(getDownloadUrl());},[]);
 useEffect(()=>{function syncHash(){const id=decodeURIComponent(window.location.hash.slice(1));if(!sections.some(s=>s.id===id))return;setOpen(prev=>prev.includes(id)?prev:[...prev,id]);requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'}));}window.addEventListener('hashchange',syncHash);syncHash();return()=>window.removeEventListener('hashchange',syncHash);},[]);
 function changeLang(event){const next=event.target.value;setLang(next);i18n.changeLanguage(next);const url=new URL(window.location.href);url.searchParams.set('lang',next);history.replaceState(null,'',url);}
 function toggle(id){setOpen(prev=>prev.includes(id)?prev.filter(item=>item!==id):[...prev,id]);}
 function openFeature(id){setOpen(prev=>prev.includes(id)?prev:[...prev,id]);window.location.hash=id;document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});}
 async function copyLink(id){const url=new URL(window.location.href);url.hash=id;try{await navigator.clipboard.writeText(url.toString());setCopied(id);}catch{window.prompt('Copy this link:',url.toString());}}
 return <>
  <a className="skip-link" href="#main">{t('skip')}</a>
  <header className="site-header" id="top"><div className="container header-content"><div className="brand"><img src="/images/che-central-camden.svg" alt="Camden GP Federation and Central Camden" onError={e=>{e.currentTarget.hidden=true;e.currentTarget.nextElementSibling.hidden=false;}}/><span hidden className="brand-fallback">Camden GP Federation <span aria-hidden="true">|</span> Central Camden</span></div><div className="language-control"><label htmlFor="language">{t('language')}</label><select id="language" value={lang} onChange={changeLang}><option value="en">English</option><option value="bn">বাংলা — Bengali (draft)</option><option value="ar">العربية — Arabic (draft)</option></select></div></div></header>
  <main id="main">
   <section className="hero" aria-labelledby="page-heading"><div className="container hero-content">
    <img className="hero-image" src="/images/nhs-app-hero.png" alt="NHS App logo and smartphone with a heart symbol" width="400" height="200"/>
    <h1 id="page-heading">{t('heading')}<span>{t('tagline')}</span></h1>
    <div className="feature-panel"><h2>{t('features')}</h2><ul>{features.map(f=><li key={f.id}><button type="button" onClick={()=>openFeature(f.id)}>{f.label}</button></li>)}</ul></div>
    <div className="download-group"><a className="download-button" href={downloadUrl}><span aria-hidden="true">↓</span>{t('download')}</a><a className="download-fallback" href={URLS.other}>{t('otherDownload')}</a></div>
   </div></section>
   <div className="container body-content">
    {lang!=='en'&&<div className="translation-warning" role="status">{t('notice')}</div>}
    <div className="accordion-controls"><button type="button" onClick={()=>setOpen(sections.map(s=>s.id))}>{t('expand')}</button><button type="button" onClick={()=>setOpen([])}>{t('close')}</button></div>
    <div className="accordions">{sections.map((s,i)=><section className={`accordion ${open.includes(s.id)?'is-open':''}`} id={s.id} key={s.id}><h2><button className="accordion-trigger" type="button" aria-expanded={open.includes(s.id)} aria-controls={`panel-${s.id}`} onClick={()=>toggle(s.id)}><span className="topic-icon" aria-hidden="true">{icons[i]}</span><span className="topic-title">{s.title}</span><span className="expand-symbol" aria-hidden="true">{open.includes(s.id)?'−':'+'}</span></button></h2><div className="accordion-panel" id={`panel-${s.id}`} hidden={!open.includes(s.id)}><ol>{s.steps.map((step,j)=><li key={j}>{s.id==='getting-started'&&j===1?<>Open the NHS App and <a href="https://access.login.nhs.uk/login">create or sign in to your NHS login</a> using your email address (official NHS website).</>:step}</li>)}</ol><p className="note"><strong>{t('note')}:</strong> {s.note}</p><div className="section-links"><a href="https://www.nhs.uk/nhs-app/help/videos/">{t('video')}</a><button type="button" onClick={()=>copyLink(s.id)}>{copied===s.id?t('copied'):t('copy')}</button></div></div></section>)}</div>
    <section className="help"><h2>{t('help')}</h2><p>{t('helpText')}</p><a href="https://www.nhs.uk/nhs-app/help/">{t('official')}</a></section>
    <p className="emergency">{t('emergency')}</p><a className="back-to-top" href="#top">↑ {t('back')}</a>
   </div>
  </main>
  <footer className="footer"><div className="container"><p>{t('footer')}</p><p>{t('disclaimer')}</p></div></footer>
 </>;
}
createRoot(document.getElementById('root')).render(<App/>);
