import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, HardDrives, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { clientLogos, products, services } from "@/lib/content";
import { HeroShowcase } from "@/components/hero-showcase";
import { SectorsExplorer } from "@/components/sectors-explorer";
import { StudioIntro } from "@/components/studio-intro";
import { WhyUsSection } from "@/components/why-us";
import { DeliveryMethodology } from "@/components/delivery-methodology";

const productImages = ["photo-1450101499163-c8848c66ca85", "photo-1516321318423-f06f85e504b3", "photo-1551288049-bebda4e38f71", "photo-1762163516269-3c143e04175c"];
const productVisuals = [ShieldCheck, ShieldCheck, FileText, HardDrives];
const methodologyDescriptions = [
    "We discuss your current headaches, broken workflows, and goals to create a clear, realistic software blueprint.",
    "We plan user screens, database structures, and security permissions before writing a single line of code.",
    "Every two weeks, you test working modules on a private link. You see real progress and give feedback as we build.",
    "We deploy your software live, verify that everything is running fast, and hand over 100% of the code and passwords."
];

export default function Home() {
    return <>
        <section className="pt-6 lg:pt-10 pb-12 lg:pb-16 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                <div className="lg:col-span-6 xl:col-span-7 text-left hero-reveal">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.06] mb-6 text-theme-text theme-transition">
                        Software that ships.<br />
                        <span className="opacity-40">Code that scales.</span><br />
                        <span className="text-theme-accent">AI that works.</span>
                    </h1>
                    <p className="text-base sm:text-lg text-theme-muted max-w-xl leading-relaxed mb-8 theme-transition">
                        We design, build, and run production software for companies that need more than a prototype.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 bg-theme-text text-theme-surface px-7 py-3.5 rounded-xl font-bold hover:bg-theme-accent hover:text-white transition-all duration-200 shadow-sm hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                        >
                            Get in touch
                            <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <Link
                            href="#what-we-build"
                            className="inline-flex items-center gap-2 bg-transparent border-2 border-theme-border text-theme-text px-7 py-3.5 rounded-xl font-bold hover:border-theme-text theme-transition"
                        >
                            Explore our work
                        </Link>
                    </div>
                </div>
                <div className="lg:col-span-6 xl:col-span-5 flex justify-center items-center hero-reveal delay-100">
                    <HeroShowcase />
                </div>
            </div>
        </section>

        <section className="py-12 lg:py-16 border-y border-theme-border bg-theme-surface/30 theme-transition overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-10">
                    <p className="font-mono text-xs font-semibold uppercase tracking-widest text-theme-accent mb-4 block">Our Clients</p>
                </div>
                <div className="logoloop logoloop--fade" role="region" aria-label="Partner clients">
                    <div className="logoloop__track">
                        <ul className="logoloop__list" role="list">
                            {[0, 1].flatMap((rep) =>
                                clientLogos.map((logo, idx) => (
                                    <li key={`${logo.name}-${rep}-${idx}`} className="logoloop__item flex items-center justify-center px-4">
                                        {logo.lightSrc && logo.darkSrc ? (
                                            <>
                                                <Image
                                                    src={logo.lightSrc}
                                                    alt={logo.name}
                                                    width={logo.width}
                                                    height={logo.height}
                                                    className={`client-logo-img logo-light-only h-12 sm:h-14 md:h-16 w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] object-contain transition-transform duration-300 hover:scale-105 ${logo.className || ""}`}
                                                />
                                                <Image
                                                    src={logo.darkSrc}
                                                    alt={logo.name}
                                                    width={logo.width}
                                                    height={logo.height}
                                                    className={`client-logo-img logo-dark-only h-12 sm:h-14 md:h-16 w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] object-contain transition-transform duration-300 hover:scale-105 ${logo.className || ""}`}
                                                />
                                            </>
                                        ) : (
                                            <Image
                                                src={logo.src!}
                                                alt={logo.name}
                                                width={logo.width}
                                                height={logo.height}
                                                className={`client-logo-img h-12 sm:h-14 md:h-16 w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] object-contain transition-transform duration-300 hover:scale-105 ${logo.className || ""}`}
                                            />
                                        )}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <StudioIntro />

        <section id="what-we-build" className="py-12 lg:py-16 px-6 bg-theme-bg relative overflow-hidden theme-transition border-b border-theme-border">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none rounded-full blur-3xl -z-10" />
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 lg:mb-10 reveal">
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-theme-accent mb-4 block">WHAT WE BUILD</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight theme-transition leading-[1.15] mb-6">Six disciplines. Everything custom for your business.</h2>
                    <p className="text-base md:text-lg text-theme-muted max-w-3xl leading-relaxed theme-transition">The dedicated engineers who design and architect your software write the code and run the servers — zero outsourced handoffs, zero middlemen, zero finger-pointing.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                    {services.map((service, i) => (
                        <Link
                            href={`/services/${service.slug}`}
                            key={service.slug}
                            className={`discipline-card group reveal delay-${i % 4 === 0 ? "100" : i % 4 === 1 ? "200" : i % 4 === 2 ? "300" : "400"} w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]`}
                        >
                            <div className="discipline-tag">
                                <span className="discipline-tag-circle" />
                                <span>{service.name}</span>
                            </div>
                            <div className="discipline-content">
                                <h3 className="discipline-title">
                                    {["Custom Web & Mobile Apps", "Practical AI & Automation", "Bulletproof Cloud Hosting", "Live Sync & Connectors", "Clean Data & Live Dashboards", "Technical Advisory"][i]}
                                </h3>
                                <p className="discipline-desc">{service.intro}</p>
                            </div>
                            <div className="discipline-capsule">
                                <Image
                                    src={service.image || `/services/${service.slug}.jpg`}
                                    alt={service.name}
                                    fill
                                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 25vw"
                                    className="capsule-photo"
                                />
                                <div className="capsule-scrim" />
                                <div className="capsule-track-line" />
                                <span className="capsule-text">View service</span>
                                <div className="capsule-arrow-circle">
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

        <WhyUsSection />

        <section id="products" className="py-12 lg:py-16 px-6 bg-theme-bg border-y border-theme-border theme-transition">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 lg:mb-10 reveal">
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-theme-accent mb-4 block">Ecosystem</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight theme-transition">Products</h2>
                    <p className="mt-4 text-theme-muted max-w-xl">Operationally complex software supported by custom engineering where out-of-the-box tools fall short.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, i) => {
                        const Icon = productVisuals[i];
                        return (
                            <Link
                                href={`/products/${product.slug}`}
                                key={product.slug}
                                className={`product-card product-card-expand group reveal delay-${i % 4 === 0 ? "100" : i % 4 === 1 ? "200" : i % 4 === 2 ? "300" : "400"}`}
                            >
                                <div className="product-expand-bg" aria-hidden="true">
                                    <Image
                                        src={`https://images.unsplash.com/${productImages[i]}?auto=format&fit=crop&w=1200&q=95`}
                                        alt={product.name}
                                        fill
                                        unoptimized
                                        quality={95}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="product-expand-img object-cover object-center"
                                    />
                                    <div className="product-expand-scrim" />
                                </div>
                                <div className="product-card-inner">
                                    <div className="discipline-tag mb-4">
                                        <span className="discipline-tag-circle" />
                                        <span>{product.category}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mb-3.5">
                                        <div className="product-icon-wrap flex-shrink-0">
                                            <Icon size={20} />
                                        </div>
                                        <h3 className="product-title">{product.name}</h3>
                                    </div>
                                    <div className="product-pills mb-4">
                                        {product.benefits.slice(0, 2).map((p) => (
                                            <span key={p} className="product-pill">{p}</span>
                                        ))}
                                    </div>
                                    <div className="product-thumbnail-spacer" />
                                    <div className="product-footer mt-auto">
                                        <span>Explore product</span>
                                        <div className="product-btn">
                                            <ArrowRight size={15} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="mt-10 text-center reveal">
                    <Link href="/contact" className="inline-flex items-center gap-2 font-bold text-sm text-theme-muted hover:text-theme-accent transition-colors">
                        Enquire about the OJIX product suite <ArrowRight size={15} />
                    </Link>
                </div>
            </div>
        </section>

        <section id="work" className="py-12 lg:py-16 px-6 bg-theme-bg theme-transition"><div className="max-w-7xl mx-auto"><div className="ox-sec-intro reveal"><div><span className="font-mono text-xs font-semibold uppercase tracking-widest text-theme-accent mb-4 block">Focus Areas</span><h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight theme-transition">Eight Mission-Critical Sectors</h2></div><p className="text-theme-muted max-w-md text-base sm:text-lg">Specialized domain engineering where reliability, security, and precision can never be compromised.</p></div><SectorsExplorer /></div></section>

        <DeliveryMethodology />
    </>
}
