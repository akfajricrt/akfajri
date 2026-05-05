/**
 * Personal Profile Page
 * Drop into Docusaurus at: src/pages/profile.tsx
 *
 * Route: /profile
 *
 * Pure CSS Modules — no Tailwind required.
 * Pair with styles.module.css in the same folder.
 */
import React, { useState, useEffect, type ReactNode } from 'react';
import s from './index.module.css';
import useBaseUrl from "@docusaurus/useBaseUrl";



// ---------- Types ----------
type TechItem = {
  name: string;
  category: string;
  icon: ReactNode;
};

type IllustrationKind = 'wave' | 'graph' | 'stack';

type Project = {
  title: string;
  tag: string;
  description: string;
  stack: string[];
  accent: 'wave' | 'graph' | 'stack';
  illustration: IllustrationKind;
};

// ---------- Tech stack data ----------
const TECH_STACK: TechItem[] = [
  {
    name: 'Laravel',
    category: 'Backend',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7l9-5 9 5v10l-9 5-9-5V7z" />
        <path d="M3 7l9 5 9-5" />
        <path d="M12 12v10" />
        <path d="M7.5 4.5l9 5" />
      </svg>
    ),
  },
  {
    name: 'Nuxt.js',
    category: 'Framework',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 19h18L13.5 5a1.7 1.7 0 0 0-3 0L3 19z" />
        <path d="M9 14l2.5-4.5 5 8.5" />
      </svg>
    ),
  },
  {
    name: 'SvelteKit',
    category: 'Framework',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 4.5c-2.5-1.6-5.7-1-7.4 1.5l-4 6c-1.7 2.5-1 5.7 1.5 7.3 2.5 1.6 5.7 1 7.4-1.5l4-6c1.7-2.5 1-5.7-1.5-7.3z" />
        <path d="M11 10l-2 3" />
      </svg>
    ),
  },
  {
    name: 'Vue.js',
    category: 'Frontend',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4h5l5 8 5-8h5L12 20 2 4z" />
        <path d="M7 4l5 8 5-8" />
      </svg>
    ),
  },
  {
    name: 'NVIDIA Jetson',
    category: 'Edge AI',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
        <path d="M4 9h2M4 13h2M4 17h2M18 9h2M18 13h2M18 17h2M9 4v2M13 4v2M17 4v2M9 18v2M13 18v2M17 18v2" />
      </svg>
    ),
  },
  {
    name: 'AI / ML',
    category: 'Research',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <circle cx="5" cy="6" r="1.5" />
        <circle cx="5" cy="18" r="1.5" />
        <circle cx="19" cy="6" r="1.5" />
        <circle cx="19" cy="18" r="1.5" />
        <path d="M6.5 6.5L10 11M6.5 17.5L10 13M17.5 6.5L14 11M17.5 17.5L14 13" />
      </svg>
    ),
  },
];

// ---------- Projects data ----------
const PROJECTS: Project[] = [
  {
    title: 'Aquaculture AI Research',
    tag: "Research · Master's Thesis",
    description:
      'Real-time fish behavior monitoring on the edge — computer vision pipeline running on NVIDIA Jetson for sustainable aquaculture at Nankai University.',
    stack: ['PyTorch', 'Jetson', 'OpenCV'],
    accent: 'wave',
    illustration: 'wave',
  },
  {
    title: 'Machine Learning',
    tag: 'Applied Research',
    description:
      'Training and deploying neural networks for time-series prediction, anomaly detection, and embedded inference on resource-constrained hardware.',
    stack: ['Python', 'TensorFlow', 'CUDA'],
    accent: 'graph',
    illustration: 'graph',
  },
  {
    title: 'Software Engineering',
    tag: 'Full-stack Practice',
    description:
      'Production-grade web platforms built with Laravel, Nuxt and SvelteKit — from API architecture to design systems and developer experience.',
    stack: ['Laravel', 'Nuxt', 'PostgreSQL'],
    accent: 'stack',
    illustration: 'stack',
  },
];

// ---------- Decorative SVG illustrations for project cards ----------
function ProjectIllustration({ kind }: { kind: IllustrationKind }) {
  if (kind === 'wave') {
    return (
      <svg viewBox="0 0 200 80" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M0 50 Q25 30 50 50 T100 50 T150 50 T200 50" opacity="0.6" />
        <path d="M0 60 Q25 40 50 60 T100 60 T150 60 T200 60" opacity="0.4" />
        <path d="M0 40 Q25 20 50 40 T100 40 T150 40 T200 40" opacity="0.3" />
        <circle cx="40" cy="50" r="2" fill="currentColor" />
        <circle cx="100" cy="50" r="2" fill="currentColor" />
        <circle cx="160" cy="50" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (kind === 'graph') {
    return (
      <svg viewBox="0 0 200 80" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M10 70 L40 50 L70 60 L100 30 L130 45 L160 20 L190 35" />
        <circle cx="10" cy="70" r="2.5" fill="currentColor" />
        <circle cx="40" cy="50" r="2.5" fill="currentColor" />
        <circle cx="70" cy="60" r="2.5" fill="currentColor" />
        <circle cx="100" cy="30" r="2.5" fill="currentColor" />
        <circle cx="130" cy="45" r="2.5" fill="currentColor" />
        <circle cx="160" cy="20" r="2.5" fill="currentColor" />
        <circle cx="190" cy="35" r="2.5" fill="currentColor" />
        <line x1="0" y1="78" x2="200" y2="78" opacity="0.3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 80" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="40" y="14" width="120" height="14" rx="3" opacity="0.4" />
      <rect x="40" y="33" width="120" height="14" rx="3" opacity="0.6" />
      <rect x="40" y="52" width="120" height="14" rx="3" opacity="0.9" />
      <circle cx="52" cy="21" r="1.5" fill="currentColor" />
      <circle cx="52" cy="40" r="1.5" fill="currentColor" />
      <circle cx="52" cy="59" r="1.5" fill="currentColor" />
    </svg>
  );
}

// ---------- Background: circuit lines + grid dots ----------
function CircuitBackground() {
  return (
    <div className={s.bg} aria-hidden="true">
      <div className={s.bgWash1} />
      <div className={s.bgWash2} />
      <div className={s.bgDots} />

      <svg className={s.bgSvg} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="circuitStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="circuitStroke2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <g stroke="url(#circuitStroke)" strokeWidth="1">
          <path d="M-20 120 L180 120 L220 160 L380 160 L420 120 L600 120" />
          <path d="M-20 200 L120 200 L160 240 L320 240" />
          <path d="M380 160 L380 280 L460 280 L500 320 L720 320" />
          <path d="M600 120 L640 80 L900 80" />
          <circle cx="180" cy="120" r="3" fill="#34d399" fillOpacity="0.6" />
          <circle cx="380" cy="160" r="3" fill="#34d399" fillOpacity="0.6" />
          <circle cx="320" cy="240" r="3" fill="#2dd4bf" fillOpacity="0.6" />
          <circle cx="500" cy="320" r="3" fill="#2dd4bf" fillOpacity="0.6" />
          <circle cx="640" cy="80" r="3" fill="#34d399" fillOpacity="0.6" />
        </g>

        <g stroke="url(#circuitStroke2)" strokeWidth="1">
          <path d="M1460 780 L1240 780 L1200 740 L1020 740 L980 780 L800 780" />
          <path d="M1460 700 L1320 700 L1280 660 L1100 660" />
          <path d="M1020 740 L1020 600 L940 600 L900 560 L700 560" />
          <path d="M800 780 L760 820 L520 820" />
          <circle cx="1240" cy="780" r="3" fill="#5eead4" fillOpacity="0.6" />
          <circle cx="1020" cy="740" r="3" fill="#5eead4" fillOpacity="0.6" />
          <circle cx="1100" cy="660" r="3" fill="#34d399" fillOpacity="0.6" />
          <circle cx="900" cy="560" r="3" fill="#34d399" fillOpacity="0.6" />
          <circle cx="760" cy="820" r="3" fill="#2dd4bf" fillOpacity="0.6" />
        </g>

        <g stroke="#34d399" strokeOpacity="0.18" strokeWidth="1" fill="none">
          <polygon points="1280,140 1340,180 1320,250 1240,240 1220,180" />
          <polygon points="120,640 200,620 240,690 180,740 100,710" />
          <circle cx="1100" cy="200" r="60" />
          <circle cx="240" cy="500" r="40" />
        </g>
      </svg>

      <div className={s.bgVignette} />
    </div>
  );
}

// ---------- Reusable: glass card ----------
function GlassCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${s.glass} ${className}`}>{children}</div>;
}

// ---------- Helpers ----------
function washClass(kind: IllustrationKind): string {
  return kind === 'wave' ? s.washWave : kind === 'graph' ? s.washGraph : s.washStack;
}

const STATS = [
  { k: '6+', v: 'Years building' },
  { k: '20+', v: 'Shipped projects' },
  { k: '∞', v: 'Curiosity' },
];

// ---------- Main component ----------
export default function ProfilePage(): JSX.Element {
  const [mounted, setMounted] = useState(false);
  const profileSrc = useBaseUrl("/img/fajri.jpg");
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={s.page}>
      <CircuitBackground />

      {/* Top nav */}
      <header className={s.header}>
        <div className={s.logo}>
          <div className={s.logoMark}>
            <div className={s.logoMarkInner} />
            <span className={s.logoMarkLetter}>F</span>
          </div>
          <span className={s.logoText}>fajri.dev</span>
        </div>
        <nav className={s.nav}>
          <a href="/docs/category/about-me">Profile</a>
          <a href="/blog">Blog</a>
          <a href="/docs/intro">Tutorial</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="https://fajri.dev" target="_blank" rel="noreferrer" className={s.pillLink}>
          <span className={s.ping}>
            <span className={s.pingRing} />
            <span className={s.pingDot} />
          </span>
          Available to Collaboration
        </a>
      </header>

      {/* HERO */}
      <section
        id="about"
        className={`${s.hero} ${mounted ? s.floatIn : s.preMount}`}
      >
        <div className={s.heroGrid}>
          {/* Text */}
          <div className={s.heroText}>
            <div className={s.eyebrow}>
              <span className={s.eyebrowDot} />
              Nankai University · M.Sc Candidate
            </div>
            <h1 className={s.heroTitle}>
              Ahmad Khoirul 
              <span className={s.heroTitleAccent}>Fajeri.</span>
            </h1>
            <p className={s.heroLead}>
              Full-stack software developer and Master's student researching{' '}
              <em>edge-AI for sustainable aquaculture</em>. I build calm, considered systems — from
              production web platforms to neural networks running on embedded hardware.
            </p>

            <div className={s.heroCtas}>
              <a href="#work" className={s.btnPrimary}>
                View selected work
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://github.com/akfajricrt" target="_blank" rel="noreferrer" className={s.btnGhost}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.68.8.56C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                </svg>
                GitHub
              </a>
            </div>

            <div className={s.stats}>
              {STATS.map((stat) => (
                <div key={stat.v} className={s.statCell}>
                  <div className={s.statK}>{stat.k}</div>
                  <div className={s.statV}>{stat.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile photo */}
          <div className={s.heroPhoto}>
            <div className={s.photoWrap}>
              <div className={s.photoRing1} />
              <div className={s.photoRing2} />
              <div className={s.photoRing3} />
              <div className={s.photoGlow} />

              <GlassCard className={s.photoFrame}>
                <div className={s.photoInner}>
                  <div className={s.photoStripes} />
                  <div className={s.photoCenter}>
                    <div className={s.avatar}>
                      <img 
                      src={profileSrc}
                      alt="Portrait of Ahmad Khoirul Fajeri"
                      loading="eager"
                      />

                    </div>
                    <div className={s.avatarLabel}>[ 法杰里 ]</div>
                  </div>
                  <div className={`${s.bracket} ${s.bTL}`} />
                  <div className={`${s.bracket} ${s.bTR}`} />
                  <div className={`${s.bracket} ${s.bBL}`} />
                  <div className={`${s.bracket} ${s.bBR}`} />
                </div>
              </GlassCard>

              {/* Floating chips */}
              <div className={s.chipBL}>
                <div className={s.chipRow}>
                  <div className={s.chipIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l2 5h5l-4 3.5L17 16l-5-3-5 3 2-5.5L5 7h5z" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className={s.chipTitle}>Aquaculture AI</div>
                    <div className={s.chipSub}>Active research</div>
                  </div>
                </div>
              </div>
              <div className={s.chipTR}>
                <div className={s.chipRow}>
                  <div className={s.chipDot} />
                  <div className={s.chipText}>Tianjin, CN</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="stack" className={s.section}>
        <div className={s.sectionHead}>
          <div>
            <div className={s.kicker}>◇ 02 / Toolkit</div>
            <h2 className={s.h2}>The stack I build with</h2>
          </div>
          <div className={s.sectionAside}>From request to inference</div>
        </div>

        <div className={s.techGrid}>
          {TECH_STACK.map((t) => (
            <GlassCard key={t.name} className={s.techCard}>
              <div className={s.techCardSheen} />
              <div className={s.techIcon}>{t.icon}</div>
              <div className={s.techName}>{t.name}</div>
              <div className={s.techCat}>{t.category}</div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" className={s.section}>
        <div className={s.sectionHead}>
          <div>
            <div className={s.kicker}>◇ 03 / Selected work</div>
            <h2 className={s.h2}>Things I'm working on</h2>
          </div>
        </div>

        <div className={s.projGrid}>
          {PROJECTS.map((p) => (
            <a href="#" key={p.title} className={s.projCard}>
              <div className={`${s.projWash} ${washClass(p.accent)}`} />
              <div className={s.projInnerStroke} />

              <div className={s.projContent}>
                <div className={s.projIllust}>
                  <ProjectIllustration kind={p.illustration} />
                </div>

                <div className={s.projTag}>{p.tag}</div>
                <h3 className={s.projTitle}>{p.title}</h3>
                <p className={s.projDesc}>{p.description}</p>

                <div className={s.pills}>
                  {p.stack.map((t) => (
                    <span key={t} className={s.pill}>{t}</span>
                  ))}
                </div>

                <div className={s.projFoot}>
                  <span>Read case study</span>
                  <span className={s.projArrow}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`${s.section} ${s.contactSection}`}>
        <div className={s.contactCard}>
          <div className={s.contactGrid}>
            <div>
              <div className={s.kicker}>◇ 04 / Get in touch</div>
              <h2 className={s.contactTitle}>
                Building something thoughtful?
                <span className={s.contactTitleAccent}>Let's talk.</span>
              </h2>
              <p className={s.contactLead}>
                Open to research collaborations, full-stack contracts, and conversations about
                edge-AI, aquaculture, or developer tooling.
              </p>
            </div>

            <div className={s.contactLinks}>
              <a href="https://github.com/akfajricrt" target="_blank" rel="noreferrer" className={s.contactLink}>
                <div className={s.contactLinkLeft}>
                  <div className={s.contactIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.68.8.56C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                    </svg>
                  </div>
                  <div>
                    <div className={s.contactLinkTitle}>GitHub</div>
                    <div className={s.contactLinkSub}>@fajri — open source &amp; experiments</div>
                  </div>
                </div>
                <span className={s.contactArrow}>→</span>
              </a>

              <a href="https://fajri.dev" target="_blank" rel="noreferrer" className={s.contactLink}>
                <div className={s.contactLinkLeft}>
                  <div className={s.contactIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M4 6h16v12H4z" />
                      <path d="M4 10h16M9 6v12" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className={s.contactLinkTitle}>fajri.dev</div>
                    <div className={s.contactLinkSub}>Personal blog &amp; writing</div>
                  </div>
                </div>
                <span className={s.contactArrow}>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className={s.footer}>
          <div>© {new Date().getFullYear()} Ahmad Khoirul Fajeri · Built with care.</div>
          <div className={s.footerVer}>v1.0.0 · Tianjin → Worldwide</div>
        </div>
      </section>
    </div>
  );
}
