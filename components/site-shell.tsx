"use client";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ArrowsMerge, Buildings, ChartLineUp, CheckCircle, Cloud, Code, Compass, FileText, HardDrives, ChatCircleDots, EnvelopeSimple, Moon, Phone, Scales, ShieldCheck, ShoppingBag, Sparkle, Sun, Truck, WhatsappLogo, CaretDown, X } from "@phosphor-icons/react";
import { industries, products, services } from "@/lib/content";

type MenuName="services"|"industries"|"products";
const PHONE="+91 90088 77883";
const TEL="tel:+919008877883";
const WHATSAPP="https://wa.me/919008877883";

function RollText({text}:{text:string}){
 return <span className="ox-roll-wrap"><span className="sr-only">{text}</span><span className="ox-roll" aria-hidden="true">{Array.from(text).map((c,i)=><span key={i} className="ox-roll-char" style={{"--i":i} as React.CSSProperties}><span>{c}</span><span>{c}</span></span>)}</span></span>;
}
const serviceIcons=[Code,Sparkle,Cloud,ArrowsMerge,ChartLineUp,Compass];
const industryIcons=[Cloud,Buildings,ShieldCheck,ShoppingBag,Code,HardDrives,Truck,Scales];
const productIcons=[Scales,ShieldCheck,FileText,HardDrives];
const previewImages={services:["photo-1522071820081-009f0129c71c","photo-1618005182384-a83a8bd57fbe","photo-1558494949-ef010cbdcc31","photo-1551288049-bebda4e38f71","photo-1460925895917-afdab827c52f","photo-1531403009284-440f080d1e12"],industries:["photo-1451187580459-43490279c0fa","photo-1563013544-824ae1b704d3","photo-1576091160399-112ba8d25d1d","photo-1556742049-0cfed4f6a45d","photo-1509062522246-3755977927d7","photo-1586528116311-ad8dd3c8310d","photo-1519003722824-194d4455a60c","photo-1450101499163-c8848c66ca85"],products:["photo-1450101499163-c8848c66ca85","photo-1516321318423-f06f85e504b3","photo-1551288049-bebda4e38f71","photo-1558494949-ef010cbdcc31"]};

export function SiteShell({children}:{children:React.ReactNode}){
 const pathname=usePathname();
 const isHome=pathname==="/"||pathname==="";
 const [open,setOpen]=useState<MenuName|null>(null),[mobile,setMobile]=useState(false),[industryIndex,setIndustryIndex]=useState(0),[productIndex,setProductIndex]=useState(0),[serviceIndex,setServiceIndex]=useState(0),[scrolled,setScrolled]=useState(false),[dark,setDark]=useState(false),[contact,setContact]=useState(false);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);

 const close=()=>{if(timer.current)clearTimeout(timer.current);setOpen(null);setMobile(false);setContact(false)};

 useEffect(()=>{
  let saved:string|null=null;try{saved=localStorage.getItem("ojix-theme")}catch{}
  const selected=saved||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
  document.documentElement.dataset.theme=selected;
  const onScroll=()=>setScrolled(window.scrollY>24);
  const raf=requestAnimationFrame(()=>{setDark(selected==="dark");onScroll()});
  window.addEventListener("scroll",onScroll,{passive:true});
  return()=>{cancelAnimationFrame(raf);window.removeEventListener("scroll",onScroll)};
 },[]);

 useEffect(()=>{
  document.documentElement.classList.toggle("ox-lock",mobile);
 },[mobile]);

 useEffect(()=>{
  const elements=document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)){
   elements.forEach(el=>el.classList.add("active"));
   return;
  }
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){
    entry.target.classList.add("active");
    revealObserver.unobserve(entry.target);
   }
  }),{threshold:0.06,rootMargin:"0px 0px 80px 0px"});

  elements.forEach(el=>{
   const rect=el.getBoundingClientRect();
   if(rect.top<window.innerHeight+50&&rect.bottom>-50){
    el.classList.add("active");
   }else{
    revealObserver.observe(el);
   }
  });

  return()=>revealObserver.disconnect();
 },[pathname]);

 const [prevPath, setPrevPath] = useState(pathname);
 if (prevPath !== pathname) {
  setPrevPath(pathname);
  if (open !== null) setOpen(null);
  if (mobile) setMobile(false);
 }

 useEffect(()=>{
  const handleKeyDown=(e:KeyboardEvent)=>{if(e.key==="Escape")close()};
  const handleClickOutside=(e:MouseEvent)=>{
   const target=e.target as HTMLElement;
   if(!target.closest("#site-header")&&!target.closest(".ox-mobile")){
    close();
   }
  };
  window.addEventListener("keydown",handleKeyDown);
  document.addEventListener("mousedown",handleClickOutside);
  return()=>{
   window.removeEventListener("keydown",handleKeyDown);
   document.removeEventListener("mousedown",handleClickOutside);
  };
 },[]);

 function showMenu(name:MenuName){if(timer.current)clearTimeout(timer.current);setOpen(name)}
 function hideSoon(){if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setOpen(null),140)}
 function applyTheme(next:string){document.documentElement.dataset.theme=next;setDark(next==="dark");try{localStorage.setItem("ojix-theme",next)}catch{}}
 function toggleTheme(e:React.MouseEvent<HTMLButtonElement>){
  const root=document.documentElement;
  const next=root.dataset.theme==="dark"?"light":"dark";
  const doc=document as Document&{startViewTransition?:(cb:()=>void)=>{ready:Promise<void>;finished:Promise<void>}};
  if(!doc.startViewTransition||matchMedia("(prefers-reduced-motion: reduce)").matches){applyTheme(next);return}
  const r=e.currentTarget.getBoundingClientRect();
  const x=r.left+r.width/2,y=r.top+r.height/2;
  const radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
  root.classList.add("ox-vt");
  const t=doc.startViewTransition(()=>{flushSync(()=>applyTheme(next))});
  t.ready.then(()=>{root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`]},{duration:750,easing:"cubic-bezier(.65,0,.35,1)",pseudoElement:"::view-transition-new(root)"})}).catch(()=>{});
  t.finished.finally(()=>root.classList.remove("ox-vt"));
 }
 const navItems:{label:string;href?:string;menu?:MenuName}[]=[{label:"Home",href:"/"},{label:"Services",menu:"services"},{label:"Industries",menu:"industries"},{label:"Products",menu:"products"},{label:"About",href:"/about"}];
 const mobileLinks=[{label:"Home",href:"/",note:""},{label:"Services",href:"/#what-we-build",note:"Six disciplines"},{label:"Industries",href:"/#work",note:"Eight sectors"},{label:"Products",href:"/#products",note:"Four products"},{label:"About",href:"/about",note:""}];
 const menuState={services:[serviceIndex,setServiceIndex],industries:[industryIndex,setIndustryIndex],products:[productIndex,setProductIndex]} as const;
 return <><header id="site-header" className={`ox-header${scrolled?" is-scrolled":""}${mobile?" is-menu-open":""}`} onMouseLeave={hideSoon} onMouseEnter={()=>timer.current&&clearTimeout(timer.current)}>
  <div className="ox-bar">
   <Link href="/" onClick={close} className="ox-brand" aria-label="OJIX — home"><Image priority className="theme-logo-light ox-logo" src="/ojix-logo-light.svg" width={755} height={380} alt="OJIX"/><Image priority className="theme-logo-dark ox-logo" src="/ojix-logo-dark.svg" width={755} height={380} alt="" aria-hidden="true"/></Link>
   <nav className="ox-nav" aria-label="Primary">
    {navItems.map(item=>{
     if(item.href){const active=item.href==="/"?isHome:pathname===item.href;return <Link key={item.label} href={item.href} onClick={close} onMouseEnter={()=>setOpen(null)} className={`ox-link${active?" is-active":""}`} aria-current={active?"page":undefined}><RollText text={item.label}/></Link>}
     const m=item.menu!;const [sel,setSel]=menuState[m];const sectionActive=pathname.startsWith(`/${m}/`);
     return <div key={item.label} className={`nav-dropdown-item${open===m?" open active":""}`} onMouseEnter={()=>showMenu(m)}>
      <button type="button" onFocus={()=>showMenu(m)} onClick={()=>open===m?setOpen(null):showMenu(m)} className={`ox-link${open===m||sectionActive?" is-active":""}`} aria-expanded={open===m} aria-haspopup="true"><RollText text={item.label}/><CaretDown size={11} weight="bold" className="ox-caret"/></button>
      <MegaMenu kind={m} open={open===m} close={close} hideSoon={hideSoon} keepOpen={()=>timer.current&&clearTimeout(timer.current)} selected={sel} setSelected={setSel}/>
     </div>})}
   </nav>
   <div className="ox-actions">
    <button type="button" role="switch" aria-checked={dark} onClick={toggleTheme} className="ox-switch" aria-label={dark?"Switch to light mode":"Switch to dark mode"} title="Toggle theme"><span className="ox-switch-knob">{dark?<Moon size={11} weight="fill"/>:<Sun size={11} weight="fill"/>}</span></button>
    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="ox-wa" aria-label="Chat with OJIX on WhatsApp" title="Chat on WhatsApp"><WhatsappLogo size={20} weight="fill"/></a>
    <div className={`ox-contact${contact?" is-open":""}`}>
     <button type="button" className="ox-contact-btn" onClick={()=>{setOpen(null);setContact(!contact)}} aria-expanded={contact} aria-haspopup="true" aria-label="Contact OJIX" title="Contact us"><ChatCircleDots size={19} weight="fill" className="ox-ci-a"/><X size={16} weight="bold" className="ox-ci-b"/></button>
     <div className="ox-contact-pop" role="menu" aria-hidden={!contact}>
      <div className="ox-cp-head"><span className="ox-cp-dot"/><div><b>Talk to an engineer</b><small>Mon–Sat · replies within hours</small></div></div>
      <a href={TEL} role="menuitem" className="ox-cp-item" onClick={()=>setContact(false)}><span className="ox-cp-ic"><Phone size={16} weight="fill"/></span><span className="ox-cp-txt"><b>Call us</b><small>{PHONE}</small></span><ArrowUpRight size={14} className="ox-cp-go"/></a>
      <a href="mailto:info@ojix.in" role="menuitem" className="ox-cp-item" onClick={()=>setContact(false)}><span className="ox-cp-ic"><EnvelopeSimple size={16} weight="fill"/></span><span className="ox-cp-txt"><b>Email us</b><small>info@ojix.in</small></span><ArrowUpRight size={14} className="ox-cp-go"/></a>
      <Link href="/contact" onClick={close} className="ox-cp-cta">Start a project <ArrowRight size={13}/></Link>
     </div>
    </div>
    <button type="button" className="ox-burger" onClick={()=>{setOpen(null);setMobile(!mobile)}} aria-expanded={mobile} aria-label={mobile?"Close menu":"Open menu"}><span/><span/></button>
   </div>
  </div>
 </header>
 <div className={`ox-mobile${mobile?" is-open":""}`} inert={!mobile} aria-hidden={!mobile}>
  <nav className="ox-mobile-links" aria-label="Mobile">{mobileLinks.map((l,i)=>{const active=l.href==="/"?isHome:pathname===l.href;return <Link key={l.label} href={l.href} onClick={close} style={{transitionDelay:mobile?`${80+i*55}ms`:"0ms"}} className={active?"is-active":""}><span className="ox-m-num">0{i+1}</span><span className="ox-m-label">{l.label}</span>{l.note&&<span className="ox-m-note">{l.note}</span>}</Link>})}</nav>
  <div className="ox-mobile-foot" style={{transitionDelay:mobile?"380ms":"0ms"}}>
   <a href={TEL} className="ox-m-call"><Phone size={17} weight="fill"/> {PHONE}</a>
   <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="ox-m-wa"><WhatsappLogo size={18} weight="fill"/> Chat on WhatsApp</a>
   <a href="mailto:info@ojix.in" className="ox-m-mail">info@ojix.in</a>
  </div>
 </div>
 <main>{children}</main>
 <footer id="contact" className="bg-theme-surface border-t border-theme-border pt-24 pb-12 px-6 theme-transition">
  <div className="max-w-4xl mx-auto text-center reveal mb-20"><span className="font-mono text-xs font-semibold uppercase tracking-widest text-theme-accent mb-4 block">LET’S BUILD SOMETHING REAL</span><h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 theme-transition">Tell us what you want to build.</h2><p className="text-lg md:text-xl text-theme-muted font-medium leading-relaxed mb-10 max-w-3xl mx-auto theme-transition">An engineer replies directly. Get a technical perspective on your architecture, bottlenecks, and build roadmap with <strong className="text-theme-text font-bold">zero sales fluff</strong>.</p><div className="flex flex-col sm:flex-row justify-center items-center gap-4"><Link href="/contact" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-theme-text text-theme-surface px-8 py-4 rounded-xl font-bold hover:bg-theme-accent hover:text-white transition-colors">Start a project <ArrowRight size={16}/></Link><a href="mailto:info@ojix.in" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-theme-bg border border-theme-border text-theme-text px-8 py-4 rounded-xl font-bold hover:border-theme-accent transition-colors theme-transition">info@ojix.in</a></div></div>
  <div className="max-w-7xl mx-auto pt-16 border-t border-theme-border/60"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8"><div className="lg:col-span-4 pr-0 lg:pr-6 space-y-5"><Link href="/" onClick={close}><Image className="theme-logo-light h-9 sm:h-10 w-auto" src="/ojix-logo-light.svg" width={755} height={380} alt="OJIX"/><Image className="theme-logo-dark h-9 sm:h-10 w-auto" src="/ojix-logo-dark.svg" width={755} height={380} alt="OJIX"/></Link><p className="text-sm text-theme-muted leading-relaxed max-w-sm">Software product studio building custom platforms, AI systems, cloud infrastructure, and DevOps. Production-grade from day one.</p><div className="font-mono text-xs font-bold uppercase tracking-widest text-theme-accent">BENGALURU · INDIA</div></div><div className="lg:col-span-2"><h4 className="text-xs font-mono font-bold uppercase tracking-widest text-theme-accent mb-4">Explore</h4><ul className="space-y-2.5 text-sm"><li><Link href="/" className="text-theme-muted hover:text-theme-accent transition-colors font-medium">Home</Link></li><li><Link href="/#what-we-build" className="text-theme-muted hover:text-theme-accent transition-colors font-medium">What we build</Link></li><li><Link href="/#products" className="text-theme-muted hover:text-theme-accent transition-colors font-medium">Products</Link></li><li><Link href="/#work" className="text-theme-muted hover:text-theme-accent transition-colors font-medium">Industries</Link></li><li><Link href="/about" className="text-theme-muted hover:text-theme-accent transition-colors font-medium">About</Link></li></ul></div><div className="lg:col-span-3"><h4 className="text-xs font-mono font-bold uppercase tracking-widest text-theme-accent mb-4">Contact</h4><ul className="space-y-2.5 text-sm"><li><Link href="/contact" className="text-theme-muted hover:text-theme-accent">Start a project</Link></li><li><a href="tel:+919008877883" className="text-theme-muted hover:text-theme-accent">+91 90088 77883</a></li><li><a href="mailto:info@ojix.in" className="text-theme-muted hover:text-theme-accent">info@ojix.in</a></li></ul></div><div className="lg:col-span-3"><h4 className="text-xs font-mono font-bold uppercase tracking-widest text-theme-accent mb-4">Ownership</h4><p className="text-sm text-theme-muted">100% code ownership. Direct engineering access. Clear milestones and working demos.</p></div></div><div className="flex justify-between items-center gap-5 flex-wrap mt-16 pt-6 border-t border-theme-border/60 text-xs text-theme-muted"><span>© {new Date().getFullYear()} OJIX Studio · Built with intent. Not assembled.</span><div className="flex items-center gap-5"><Link href="/privacy" className="hover:text-theme-accent transition-colors">Privacy Policy</Link><span className="opacity-30">·</span><Link href="/terms" className="hover:text-theme-accent transition-colors">Terms of Service</Link></div></div></div>
 </footer></>;
}

function MegaMenu({kind,open,close,hideSoon,keepOpen,selected,setSelected}:{kind:MenuName;open:boolean;close:()=>void;hideSoon:()=>void;keepOpen:()=>void;selected:number;setSelected:(i:number)=>void}){
 const list=kind==="services"?services:kind==="industries"?industries:products;
 const item=list[Math.min(selected,list.length-1)];
 const Icon=kind==="services"?serviceIcons[selected]:kind==="industries"?industryIcons[selected]:productIcons[selected];
 const href=kind==="services"?`/services/${item.slug}`:kind==="industries"?`/industries/${item.slug}`:`/products/${item.slug}`;
 const image=previewImages[kind][selected];
 return <div onMouseEnter={keepOpen} onMouseLeave={hideSoon} onFocus={keepOpen} className={`mega-menu-panel ${kind==="services"?"mega-services":"mega-preview-menu"} ${open?"open":""}`} role="region" aria-label={`${kind} menu`} aria-hidden={!open}>
  {kind==="services"?<><aside className="mega-sidebar"><div className="flex items-center justify-between pb-3 mb-1 border-b border-white/10 px-1"><span className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-bold">Services & Architecture</span><span className="text-[11px] font-mono text-orange-400 font-semibold">01 / Method</span></div><div className="mega-tab-btn active"><div className="mega-tab-title">What we build</div><div className="mega-tab-desc">Six disciplines. Everything custom for your business.</div></div><div className="mt-auto pt-3 border-t border-white/10 px-1 flex items-center justify-between text-[11px] text-slate-400"><span>Zero templates. Production code.</span><Link href="/#what-we-build" onClick={close} className="text-orange-400 font-bold hover:underline flex items-center gap-1">All Services <ArrowRight size={13}/></Link></div></aside><div className="mega-content-area"><div className="mega-tab-panel grid-3 active">{services.map((s,i)=>{const ServiceIcon=serviceIcons[i];return <Link prefetch={false} href={`/services/${s.slug}`} onClick={close} key={s.slug} className="mega-grid-item group"><div className="mega-item-top"><div className="mega-icon-box"><ServiceIcon size={19}/></div><div className="mega-head-row"><span className="mega-arrow"><ArrowRight size={14}/></span><h4 className="mega-item-title">{s.name}</h4></div><div className="mega-item-sub">{s.kicker}</div></div><p className="mega-item-desc">{s.intro}</p></Link>})}</div></div></>:<><aside className="mega-sidebar-wide"><div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 px-1"><span className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-bold">{kind==="industries"?"Industries & Solutions":"OJIX Product Suite"}</span><span className="text-[11px] font-mono text-orange-400 font-semibold">0{selected+1} / 0{list.length}</span></div><div className={`mega-list-scroll ${kind=== "products"?"products-scroll":""}`}>{list.map((x,i)=>{const ItemIcon=kind==="industries"?industryIcons[i]:productIcons[i];const itemHref=kind==="industries"?`/industries/${x.slug}`:`/products/${x.slug}`;return <Link key={x.slug} href={itemHref} prefetch={false} onClick={close} className={`${kind==="industries"?"industry-tab-btn":"product-tab-btn"} ${i===selected?"active":""}`} onMouseEnter={()=>setSelected(i)} onFocus={()=>setSelected(i)}>{kind==="industries"?<><span className="industry-icon-box"><ItemIcon size={16}/></span><span className="industry-tab-name">{x.name}</span></>:<><span className="product-tab-icon"><ItemIcon size={17}/></span><span className="product-tab-title">{x.name}</span></>}<ArrowRight size={12} className="industry-tab-arrow"/></Link>})}</div><Link prefetch={false} href={kind==="industries"?"/#work":"/#products"} onClick={close} className="mega-view-all">View all {kind} <ArrowRight size={13}/></Link></aside><div className="mega-content-area"><div className="industry-preview-pane active"><Link prefetch={false} href={href} onClick={close} className="block group"><div className="industry-preview-top"><span className="industry-preview-badge"><Icon size={14}/>{kind==="industries"?"Industry / Solution":"Product / OJIX Studio"}</span><h3 className="industry-preview-title group-hover:text-theme-accent transition-colors">{item.name}</h3><p className="industry-preview-desc">{kind==="industries"?(item as typeof industries[number]).brief:(item as typeof products[number]).description}</p><div className="industry-preview-pills">{(kind==="industries"?["Custom Platforms","Automation","Secure Systems"]:(item as typeof products[number]).benefits.slice(0,3)).map(p=><span key={p} className="industry-preview-pill">{p}</span>)}</div></div><div className="industry-preview-media"><Image loading="lazy" src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=80`} alt={item.name} fill unoptimized sizes="(max-width: 1050px) 60vw, 600px" className="industry-preview-img"/><div className="industry-preview-overlay"><span className="industry-preview-overlay-text"><CheckCircle size={16}/> Built for real-world operations</span></div></div></Link><div className="industry-preview-footer"><Link prefetch={false} href={href} onClick={close} className="industry-preview-link">Explore {item.name} <ArrowUpRight size={14}/></Link><span className="text-xs text-theme-muted font-mono font-semibold">0{selected+1} / 0{list.length}</span></div></div></div></>}
 </div>;
}
