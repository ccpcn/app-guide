import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {useTranslation} from 'react-i18next';
import i18n, {updateDocumentLanguage} from './i18n';
import './styles.css';

const icons=['📱','💬','🧪','💊','🗓️','🏥','🔔','👥'];
//########### Add translation here ###########
const approvedLanguages = [
  { code: "en", name: "English" },
  { code: "bn", name: "বাংলা" },
  { code: "syl", name: "সিলেটি" },
  { code: 'ar', name: 'العربية' },
  { code: 'so', name: 'Af-Soomaali' },
  { code: 'es', name: 'Español' },
  { code: 'ro', name: 'Română' }
];
const featureIds=['contact-gp','test-results','prescriptions','gp-appointments','hospital-appointments','messages','family-access'];
const URLS={ios:'https://apps.apple.com/gb/app/nhs-app/id1388411277',android:'https://play.google.com/store/apps/details?id=com.nhs.online.nhsonline',other:'https://www.nhs.uk/nhs-app/setting-up/downloading/'};
function getDownloadUrl(){const ua=navigator.userAgent||'';if(/iPhone|iPad|iPod/i.test(ua))return URLS.ios;if(/Android/i.test(ua))return URLS.android;return URLS.other;}
function App(){
 const {t}=useTranslation();
 const [lang,setLang]=useState(i18n.resolvedLanguage || 'en');
const translatedSections = t('sections', {
  returnObjects: true
});
const sections = Array.isArray(translatedSections)
  ? translatedSections
  : [];
const translatedFeatures = t('featureLabels', {
  returnObjects: true
});

const featureLabels = Array.isArray(translatedFeatures)
  ? translatedFeatures
  : [];
 const features=featureIds.map((id,i)=>({id,label:featureLabels[i]}));
 const [open,setOpen]=useState([]);
 const [copied,setCopied]=useState('');
 const [downloadUrl,setDownloadUrl]=useState(URLS.other);

//  console.log("Current language:", i18n.language);
// console.log("Translations loaded:", i18n.hasResourceBundle("en", "translation"));
// console.log("Sections:", translatedSections);
// console.log("Is array:", Array.isArray(translatedSections));
console.log("Active language:", i18n.language);
console.log("Bengali loaded:", i18n.hasResourceBundle("bn", "translation"));
console.log("Translated heading:", t("heading"));
 useEffect(()=>{updateDocumentLanguage(lang);},[lang]);
 useEffect(()=>{setDownloadUrl(getDownloadUrl());},[]);
 useEffect(()=>{function syncHash(){const id=decodeURIComponent(window.location.hash.slice(1));if(!sections.some(s=>s.id===id))return;setOpen(prev=>prev.includes(id)?prev:[...prev,id]);requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'}));}window.addEventListener('hashchange',syncHash);syncHash();return()=>window.removeEventListener('hashchange',syncHash);},[]);
 function changeLang(event){const next=event.target.value;setLang(next);i18n.changeLanguage(next);const url=new URL(window.location.href);url.searchParams.set('lang',next);history.replaceState(null,'',url);}
 function toggle(id){setOpen(prev=>prev.includes(id)?prev.filter(item=>item!==id):[...prev,id]);}
 function openFeature(id){setOpen(prev=>prev.includes(id)?prev:[...prev,id]);window.location.hash=id;document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});}
 async function copyLink(id){const url=new URL(window.location.href);url.hash=id;try{await navigator.clipboard.writeText(url.toString());setCopied(id);}catch{window.prompt('Copy this link:',url.toString());}}
 return <>
  <a className="skip-link" href="#main">{t('skip')}</a>
  <header className="site-header" id="top"><div className="container header-content"><div className="brand"><img src="/images/che_Logo.jpg" alt="Camden GP Federation and Central Camden" onError={e=>{e.currentTarget.hidden=true;e.currentTarget.nextElementSibling.hidden=false;}}/><span hidden className="brand-fallback">Camden GP Federation <span aria-hidden="true">|</span> Central Camden</span></div><div className="language-control"><label htmlFor="language">{t('language')}</label><select id="language" value={lang} onChange={changeLang}>{approvedLanguages.map(l=><option key={l.code} value={l.code}>{l.name}</option>)}</select></div></div></header>
  <main id="main">
   <section className="hero" aria-labelledby="page-heading"><div className="container hero-content">
    <img className="hero-image" src="/images/nhs-app-hero.png" alt="NHS App logo and smartphone with a heart symbol" width="400" height="200"/>
    <h1 id="page-heading">{t('heading')}<span>{t('tagline')}</span></h1>
    <div className="feature-panel"><h2>{t('features')}</h2><ul>{features.map(f=><li key={f.id}><button type="button" onClick={()=>openFeature(f.id)}>{f.label}</button></li>)}</ul></div>
    <div className="download-group"><a className="download-button" href={downloadUrl}><span aria-hidden="true">↓</span>{t('download')}</a><a className="download-fallback" href={URLS.other}>{t('otherDownload')}</a></div>
   </div></section>
   <div className="container body-content">
    <div className="accordion-controls"><button type="button" onClick={()=>setOpen(sections.map(s=>s.id))}>{t('expand')}</button><button type="button" onClick={()=>setOpen([])}>{t('close')}</button></div>
    <div className="accordions">{sections.map((s,i)=><section className={`accordion ${open.includes(s.id)?'is-open':''}`} id={s.id} key={s.id}><h2><button className="accordion-trigger" type="button" aria-expanded={open.includes(s.id)} aria-controls={`panel-${s.id}`} onClick={()=>toggle(s.id)}><span className="topic-icon" aria-hidden="true">{icons[i]}</span><span className="topic-title">{s.title}</span><span className="expand-symbol" aria-hidden="true">{open.includes(s.id)?'−':'+'}</span></button></h2><div className="accordion-panel" id={`panel-${s.id}`} hidden={!open.includes(s.id)}><ol>{s.steps.map((step,j)=><li key={j}>{s.id==='getting-started'&&j===1?<>{t('loginPrefix')}<a href="https://access.login.nhs.uk/login">{t('loginLink')}</a>{t('loginSuffix')}</>:step}</li>)}</ol><p className="note"><strong>{t('note')}:</strong> {s.note}</p><div className="section-links"><a href="https://www.nhs.uk/nhs-app/help/videos/">{t('video')}</a><button type="button" onClick={()=>copyLink(s.id)}>{copied===s.id?t('copied'):t('copy')}</button></div></div></section>)}</div>
    <section className="help"><h2>{t('help')}</h2><p>{t('helpText')}</p><a href="https://www.nhs.uk/nhs-app/help/">{t('official')}</a></section>
    <p className="emergency">{t('emergency')}</p><a className="back-to-top" href="#top">↑ {t('back')}</a>
   </div>
  </main>
  <footer className="footer"><div className="container"><p>{t('footer')}</p><p>{t('disclaimer')}</p></div></footer>
 </>;
}
createRoot(document.getElementById('root')).render(<App/>);
