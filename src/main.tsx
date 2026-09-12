import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { TopoField } from "./TopoField";
import "./styles.css";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, className: `reveal${visible ? " reveal-visible" : ""}` };
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

const External = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14 5h5v5M19 5l-9 9" />
    <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
  </svg>
);

const Code = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
  </svg>
);

const jobs = [
  {
    company: "Luminous",
    role: "Founder",
    dates: "2025 — 2026",
    eyebrow: "Product · Full stack",
    summary:
      "Built applications helping small businesses manage finances, send invoices, and organize financial documents for tax purposes.",
    bullets: [
      "Worked directly with clients to shape features around day-to-day expense and invoice workflows.",
      "Designed frontend and backend architecture supporting both web and mobile clients.",
    ],
  },
  {
    company: "Shopify",
    role: "Senior Frontend Engineer · Platforms & Monetization",
    dates: "2020 — 2025",
    eyebrow: "AI · Platforms · Growth",
    summary:
      "Led frontend technical design for high-scale merchant platforms, generative AI interfaces, and merchant-facing growth funnels.",
    bullets: [
      "Built the AI chat agent interface for Shopify Help using React, Zustand, GraphQL, WebSockets, and interactive chat widgets, assisting 1,000+ merchants daily.",
      "Shipped AI-search autocomplete that improved query resolution speed by ~22% across 1,000+ daily merchant sessions.",
      "Unified Shopify's AI chat experience with the Help Chat Assistant package, adopted across the platform.",
      "Engineered context-aware AI Agent Billing with dynamic context injection and internal data tool-calling for real-time, multi-turn billing conversations.",
      "Overhauled LLM streaming and WebSocket implementation, reducing client-side latency by 35% while handling high token concurrency.",
      "Engineered deterministic UI for asynchronous, multi-step agent tool-calling workflows.",
      "Led frontend technical design for mobile apps and a new $5 Starter subscription plan using Remix and GCP.",
      "Built a Remix / React / Zustand CSV Import app used by thousands of merchants.",
      "Led UI projects including a Theme Chooser A/B experiment launched to thousands of merchants.",
      "Built an AI media workflow around fine-tuned Stable Diffusion / LoRA models trained in Google Vertex AI.",
      "Refactored global merchant onboarding, reducing funnel drop-off by ~10% through improved observability and UI redesign.",
    ],
  },
  {
    company: "Cleo",
    role: "Senior Frontend Engineer",
    dates: "2019 — 2020",
    eyebrow: "React Native · Infrastructure",
    summary:
      "Spearheaded core user-facing features across React Native and React, including scheduling and CMS-powered content generation.",
    bullets: [
      "Built deployment infrastructure and CI/CD that improved product quality and increased developer output by 35%.",
      "Authored frontend technical design specifications for major features, aligning product, design, and engineering partners.",
    ],
  },
  {
    company: "Riffyn",
    role: "Frontend Engineer",
    dates: "2015 — 2019",
    eyebrow: "Data visualization · Scientific software",
    summary:
      "Engineered complex interactive data-modeling dashboards using React and D3 for real-time scientific experiment metadata and high-frequency data feeds.",
    bullets: [
      "Optimized browser-based scientific applications for fast initial renders and smooth data-table interactions with massive client-side payloads.",
      "Mentored two junior engineers and helped scale the engineering team through a standardized interview process.",
    ],
  },
  {
    company: "Parsons Brinckerhoff",
    role: "Product Engineer",
    dates: "2011 — 2014",
    eyebrow: "Visualization · Computational design",
    summary:
      "Led technical teams building sophisticated 4D Building Information Models and tooling.",
    bullets: [
      "Developed parametric processes that instantly updated designs from new data, decreasing development time by over 80%.",
      "Built GIS applications using complex spatial data visualization and highly interactive graphical layouts for infrastructure projects.",
    ],
  },
];

const skillGroups = [
  [
    "Frontend",
    "React",
    "React Native",
    "TypeScript",
    "JavaScript",
    "Web Components",
    "HTML5 / CSS3",
    "TailwindCSS",
    "Remix",
    "Next.js",
  ],
  [
    "State & tooling",
    "Zustand",
    "TanStack Query",
    "Vite",
    "Webpack",
    "Playwright",
    "Jest",
    "Vitest",
  ],
  [
    "Backend & data",
    "GraphQL",
    "REST",
    "WebSockets",
    "Node.js",
    "Python",
    "Django",
    "Ruby on Rails",
    "GCP",
    "Client-side caching",
    "RSpec",
  ],
  [
    "AI / LLM",
    "LLM APIs",
    "RAG",
    "LLM streaming",
    "Agent tool-calling",
    "Human-in-the-loop UX",
    "Stable Diffusion",
    "LoRA",
  ],
];

function App() {
  const approachReveal = useReveal<HTMLDivElement>();
  const skillsReveal = useReveal<HTMLElement>();
  const experienceReveal = useReveal<HTMLElement>();
  const aboutReveal = useReveal<HTMLDivElement>();
  const passionsReveal = useReveal<HTMLElement>();
  const contactReveal = useReveal<HTMLDivElement>();

  return (
    <div className="site-shell">
      <header className="nav">
        <a className="wordmark" href="#top" aria-label="Jonathan Arnaldo home">
          JA<span>.</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#approach">Approach</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </nav>
        <a className="nav-contact" href="mailto:jonarnaldo@gmail.com">
          Let's talk <Arrow />
        </a>
      </header>

      <main id="top">
        <section className="hero hero-dark section-pad">
          <TopoField className="hero-topo" />
          <div className="hero-copy">
            <p className="kicker">
              <span className="status-dot" /> Frontend software engineer
            </p>
            <h1>
              I build <strong>high-leverage</strong> interfaces for complex
              products.
            </h1>
            <p className="hero-lede">
              10+ years building high-scale, AI-native interfaces specializing
              in LLM streaming architecture, real-time data systems, and React /
              TypeScript at scale.
            </p>
            <div className="hero-actions">
              <a className="button button-hero" href="#experience">
                View my work <Arrow />
              </a>
              <a
                className="button button-outline"
                href="mailto:jonarnaldo@gmail.com"
              >
                Let's talk <Arrow />
              </a>
            </div>
            <div className="hero-socials">
              <a
                href="https://www.linkedin.com/in/jonarnaldo"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <External />
              </a>
              <a href="mailto:jonarnaldo@gmail.com">
                Email <External />
              </a>
            </div>
          </div>
        </section>

        <section id="approach" className="dark-section">
          <div
            ref={approachReveal.ref}
            className={`section-pad ${approachReveal.className}`}
          >
            <div className="section-heading light">
              <p className="section-number">01 / How I build</p>
              <h2>
                Engineering is the <em>interface.</em>
              </h2>
              <p>
                I care about the layer between systems and people: the
                architecture that makes a product feel fast, predictable, and
                easy to understand.
              </p>
            </div>
            <div className="principles">
              <div>
                <span>01</span>
                <h3>Performance</h3>
                <p>
                  Fast initial renders, responsive data-heavy interactions,
                  efficient streaming, and deliberate client-side work.
                </p>
              </div>
              <div>
                <span>02</span>
                <h3>Architecture</h3>
                <p>
                  Clear component boundaries, reusable primitives, and
                  abstractions that solve real product problems.
                </p>
              </div>
              <div>
                <span>03</span>
                <h3>AI-native UX</h3>
                <p>
                  Designing interfaces for streaming, uncertainty, tool calls,
                  human-in-the-loop workflows, and evolving model behavior.
                </p>
              </div>
              <div>
                <span>04</span>
                <h3>Product thinking</h3>
                <p>
                  I work directly with product and design partners—and, when
                  possible, customers—to understand the problem before the
                  implementation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={skillsReveal.ref}
          className={`section-pad skills-section ${skillsReveal.className}`}
        >
          <div className="section-heading">
            <p className="section-number">02 / Technical toolkit</p>
            <h2>
              The tools behind the <em>work.</em>
            </h2>
          </div>
          <div className="skill-groups">
            {skillGroups.map(([name, ...skills]) => (
              <div className="skill-group" key={name}>
                <h3>{name}</h3>
                <div className="tag-row">
                  {skills.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="experience"
          ref={experienceReveal.ref}
          className={`section-pad experience-section ${experienceReveal.className}`}
        >
          <div className="section-heading">
            <p className="section-number">03 / Experience</p>
            <h2>
              A decade of building{" "}
              <em style={{ marginLeft: "0.25em" }}>for people.</em>
            </h2>
          </div>
          <div className="timeline">
            {jobs.map((job, idx) => (
              <article className="timeline-item" key={job.company}>
                <div className="timeline-index">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="timeline-main">
                  <div className="job-heading">
                    <div>
                      <h3>{job.company}</h3>
                      <p>{job.role}</p>
                    </div>
                    <time>{job.dates}</time>
                  </div>
                  <span className="job-eyebrow">{job.eyebrow}</span>
                  <p className="job-summary">{job.summary}</p>
                  <ul>
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about-section">
          <div
            ref={aboutReveal.ref}
            className={`section-pad about-grid ${aboutReveal.className}`}
          >
            <div>
              <p className="section-number">04 / About</p>
              <h2>
                Curious about the <em>whole system.</em>
              </h2>
            </div>
            <div className="about-copy">
              <p>
                I came to software through architecture and computational
                design, then moved into product engineering and frontend
                development. That background still shapes how I work: I like
                visual systems, spatial thinking, constraints, and making
                complex things legible.
              </p>
              <p>
                At Shopify, I spent five years leading frontend technical design
                across merchant platforms, AI products, and growth experiences.
                Today I'm especially interested in frontend roles where strong
                engineering meets ambitious product thinking.
              </p>
              <div className="education">
                <span>Education</span>
                <p>
                  Stanford University · M.S. Construction Engineering &
                  Management
                </p>
                <p>UC Berkeley · B.A. Architecture</p>
                <p>Hack Reactor · Advanced Software Engineering Immersive</p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={passionsReveal.ref}
          className={`passions section-pad ${passionsReveal.className}`}
        >
          <div className="section-heading">
            <p className="section-number">05 / Outside the job description</p>
            <h2>
              Still building when I'm <em>off the clock.</em>
            </h2>
          </div>
          <div className="passion-grid">
            <article>
              <span>01</span>
              <h3>Construction finance</h3>
              <p>
                Currently building a construction finance app using autonomous
                agents.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Computer vision</h3>
              <p>
                Built a custom computer vision system for races using
                client-side AI to detect winners with high precision.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Parametric making</h3>
              <p>
                Founded a company designing and manufacturing home goods that
                merge parametric digital design with modern additive
                manufacturing.
              </p>
              <a
                href="https://www.lumiri.studio/"
                target="_blank"
                rel="noreferrer"
              >
                Visit Lumiri Studio <External />
              </a>
            </article>
          </div>
        </section>

        <section className="contact-section">
          <div
            ref={contactReveal.ref}
            className={`section-pad contact-inner ${contactReveal.className}`}
          >
            <p className="section-number">06 / Contact</p>
            <h2>
              Let's build something <em>excellent.</em>
            </h2>
            <p>
              Interested in frontend engineering opportunities involving
              ambitious products, thoughtful UX, and hard technical problems.
            </p>
            <div className="contact-links">
              <a
                className="button button-light"
                href="mailto:jonarnaldo@gmail.com"
              >
                Email me <Arrow />
              </a>
              <a
                href="https://www.linkedin.com/in/jonarnaldo"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <External />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-pad">
        <span>Jonathan Arnaldo</span>
        <span>Senior Frontend Engineer</span>
        <span>Built for the web · 2026</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
