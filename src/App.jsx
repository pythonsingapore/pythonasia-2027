import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Code2,
  Mail,
  Mails,
  MapPin,
  Menu,
  Sparkles,
  Ticket,
  UsersRound,
  X,
} from "lucide-react";
import { ConductPage, SchedulePage, SpeakersPage } from "./EventPages.jsx";
import { OpeningArtifactFlight } from "./motion/OpeningArtifactFlight.jsx";
import { useLandingMotion } from "./motion/useLandingMotion.js";

const processCards = [
  {
    title: "1. Venue Curation & Sponsorship",
    copy:
      "The organizing team is shaping the Singapore venue experience and partner opportunities for a welcoming regional gathering.",
    meta: "Sponsorship enquiries",
    href: "mailto:pyconsg@computing.sg",
  },
  {
    title: "2. Call for Proposal",
    copy:
      "The community opens the program with talks, tutorials, panels, and sprint ideas from every corner of Asia.",
    meta: "Submissions open soon",
    href: "mailto:pyconsg@computing.sg",
  },
  {
    title: "3. Volunteer Recruitment",
    copy:
      "Help with registration, speaker support, hallway flow, workshops, sprints, and the many small details that make the conference feel cared for.",
    meta: "Coming Soon",
  },
];

const supportRows = [
  {
    title: "Practical Python",
    copy:
      "Clear proposals on language practice, packaging, testing, performance, and production systems.",
  },
  {
    title: "AI, Data & Science",
    copy:
      "Talks that show real workflows, responsible decisions, useful tooling, and lessons from applied work.",
  },
  {
    title: "Community Value",
    copy:
      "Sessions that help beginners, educators, maintainers, local groups, and open source contributors move forward.",
  },
  {
    title: "Regional Relevance",
    copy:
      "Stories, case studies, and practices that connect Python communities across Asia.",
  },
];

const sponsorPackages = [
  {
    title: "Platinum",
    copy: "Maximum impact & exclusivity",
    perks: ["Largest logo placement", "Workshop or talk slot", "Double booth space", "10 conference tickets"],
  },
  {
    title: "Gold",
    copy: "Premium visibility & branding",
    perks: ["Large logo placement", "Talk slot", "Booth space", "5 conference tickets"],
  },
  {
    title: "Silver",
    copy: "Great community support",
    perks: ["Standard logo placement", "Talk slot", "Booth space", "2 conference tickets"],
  },
];

const terminalLines = [
  "$ sponsor --conference pycon-asia-2027",
  "Loading community partnership options...",
  "Platinum: maximum impact and exclusivity",
  "Gold: premium visibility and branding",
  "Silver: great community support",
  "In-kind sponsorship: pyconsg@computing.sg",
];

const countdownTarget = new Date("2027-06-01T00:00:00+08:00");

function getCountdownParts() {
  const remaining = Math.max(countdownTarget.getTime() - Date.now(), 0);
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

const stats = [
  ["12", "countries represented"],
  ["2+ days", "talks and workshops"],
  ["2+", "parallel tracks"],
  ["400", "target attendees"],
];

const connectionCards = [
  {
    label: "LinkedIn",
    copy: "Follow conference updates and community announcements.",
    href: "https://www.linkedin.com/company/python-user-group-singapore/",
    icon: LinkedInIcon,
    image: "/assets/card-bg-singapore-peranakan.webp",
  },
  {
    label: "Facebook",
    copy: "Join the Python Singapore community group.",
    href: "https://www.facebook.com/groups/pythonsg/",
    icon: FacebookIcon,
    image: "/assets/card-bg-malaysia-batik-rainforest.webp",
  },
  {
    label: "Mailing List",
    copy: "Get longer-form notes and community calls.",
    href: "https://groups.google.com/forum/#!forum/python-sg",
    icon: Mails,
    image: "/assets/card-bg-taiwan-alishan.webp",
  },
  {
    label: "Luma",
    copy: "Track upcoming meetups and Python events.",
    href: "https://luma.com/pugs",
    icon: CalendarDays,
    image: "/assets/card-bg-japan-lantern-street.webp",
  },
];

function LinkedInIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.94 8.98H3.9v10.24h3.04V8.98Zm.22-3.16c0-.98-.73-1.72-1.81-1.72-1.07 0-1.78.74-1.78 1.72 0 .95.69 1.72 1.74 1.72h.02c1.1 0 1.83-.77 1.83-1.72Zm12.27 7.53c0-3.15-1.68-4.61-3.92-4.61-1.81 0-2.62.99-3.07 1.69V8.98H9.4c.04.96 0 10.24 0 10.24h3.04v-5.72c0-.31.02-.61.11-.83.24-.61.78-1.25 1.69-1.25 1.19 0 1.67.91 1.67 2.24v5.56h3.04v-5.87h.48Z"
      />
    </svg>
  );
}

function FacebookIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.5 21v-7h2.4l.36-2.74H13.5V9.5c0-.79.22-1.33 1.36-1.33h1.45V5.72a19.7 19.7 0 0 0-2.11-.11c-2.09 0-3.52 1.28-3.52 3.62v2.03H8.31V14h2.37v7h2.82Z"
      />
    </svg>
  );
}

function LittleRedDotOrbit() {
  const backCanvasRef = useRef(null);
  const frontCanvasRef = useRef(null);

  useEffect(() => {
    const backCanvas = backCanvasRef.current;
    const frontCanvas = frontCanvasRef.current;
    if (!backCanvas || !frontCanvas) return undefined;

    const backContext = backCanvas.getContext("2d");
    const frontContext = frontCanvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let animationStart = performance.now();
    let width = 0;
    let height = 0;

    const prepareCanvas = (canvas, context) => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const orbitPoint = (angle) => {
      const centerX = width * 0.5;
      const centerY = height * 0.52;
      const rotation = -0.045;
      const ellipseX = Math.cos(angle) * width * 0.46;
      const ellipseY = Math.sin(angle) * height * 0.34;

      return {
        x: centerX + ellipseX * Math.cos(rotation) - ellipseY * Math.sin(rotation),
        y: centerY + ellipseX * Math.sin(rotation) + ellipseY * Math.cos(rotation),
      };
    };

    const drawOrbitArc = (context, startAngle, endAngle, alpha, lineWidth, echo = false) => {
      const gradient = context.createLinearGradient(width * 0.04, 0, width * 0.96, 0);
      gradient.addColorStop(0, `rgba(255, 96, 78, ${alpha * 0.78})`);
      gradient.addColorStop(0.58, `rgba(255, 112, 82, ${alpha})`);
      gradient.addColorStop(1, `rgba(255, 216, 142, ${alpha})`);

      context.save();
      context.translate(width * 0.5, height * (echo ? 0.6 : 0.52));
      context.rotate(-0.045);
      context.beginPath();
      context.ellipse(0, 0, width * 0.46, height * (echo ? 0.38 : 0.34), 0, startAngle, endAngle);
      context.strokeStyle = gradient;
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.shadowColor = `rgba(255, 92, 72, ${alpha * 0.72})`;
      context.shadowBlur = echo ? 5 : 9;
      context.stroke();
      context.restore();
    };

    const drawTail = (angle) => {
      const tailLength = 28;
      for (let index = tailLength; index > 0; index -= 1) {
        const segmentAngle = angle - index * 0.014;
        const from = orbitPoint(segmentAngle);
        const to = orbitPoint(segmentAngle + 0.017);
        const context = Math.sin(segmentAngle) >= 0 ? frontContext : backContext;
        const strength = (1 - index / tailLength) * 0.46;

        context.save();
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.strokeStyle = `rgba(255, 126, 82, ${strength})`;
        context.lineWidth = 1 + strength * 2.4;
        context.lineCap = "round";
        context.shadowColor = "rgba(255, 82, 70, 0.7)";
        context.shadowBlur = 9;
        context.stroke();
        context.restore();
      }
    };

    const drawCore = (context, angle) => {
      const point = orbitPoint(angle);
      const radius = Math.max(7, Math.min(11, width * 0.015));
      const bloom = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 3.3);
      bloom.addColorStop(0, "rgba(255, 251, 218, 1)");
      bloom.addColorStop(0.16, "rgba(255, 226, 150, 1)");
      bloom.addColorStop(0.34, "rgba(255, 72, 67, 0.98)");
      bloom.addColorStop(0.68, "rgba(237, 35, 55, 0.34)");
      bloom.addColorStop(1, "rgba(237, 35, 55, 0)");

      context.save();
      context.fillStyle = bloom;
      context.beginPath();
      context.arc(point.x, point.y, radius * 3.3, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = "rgba(255, 243, 196, 0.9)";
      context.lineWidth = 1;
      context.shadowColor = "rgba(255, 106, 76, 0.9)";
      context.shadowBlur = 8;
      context.beginPath();
      context.moveTo(point.x - radius * 1.9, point.y);
      context.lineTo(point.x + radius * 1.9, point.y);
      context.moveTo(point.x, point.y - radius * 1.9);
      context.lineTo(point.x, point.y + radius * 1.9);
      context.stroke();
      context.restore();
    };

    const renderOrbit = (timestamp) => {
      backContext.clearRect(0, 0, width, height);
      frontContext.clearRect(0, 0, width, height);

      const elapsed = reducedMotion.matches ? 0 : timestamp - animationStart;
      const angle = reducedMotion.matches ? 0.08 : ((elapsed % 5800) / 5800) * Math.PI * 2;
      const breath = reducedMotion.matches ? 0.78 : 0.74 + Math.sin(elapsed / 620) * 0.12;

      drawOrbitArc(backContext, Math.PI, Math.PI * 2, breath * 0.52, 1.05);
      drawOrbitArc(frontContext, 0, Math.PI, breath, 1.45);
      drawOrbitArc(frontContext, 0.12, Math.PI * 0.88, breath * 0.24, 0.7, true);
      drawTail(angle);
      drawCore(Math.sin(angle) >= 0 ? frontContext : backContext, angle);

      if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(renderOrbit);
    };

    const resize = () => {
      prepareCanvas(backCanvas, backContext);
      prepareCanvas(frontCanvas, frontContext);
      if (reducedMotion.matches) renderOrbit(performance.now());
    };

    const restartMotion = () => {
      window.cancelAnimationFrame(animationFrame);
      animationStart = performance.now();
      renderOrbit(animationStart);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(frontCanvas);
    reducedMotion.addEventListener?.("change", restartMotion);
    resize();
    renderOrbit(animationStart);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      reducedMotion.removeEventListener?.("change", restartMotion);
    };
  }, []);

  return (
    <span data-motion="orbit" className="title-orbit" aria-hidden="true">
      <canvas className="title-orbit-canvas is-back" ref={backCanvasRef} />
      <canvas className="title-orbit-canvas is-front" ref={frontCanvasRef} />
    </span>
  );
}

const socialLinks = [
  { label: "LinkedIn", icon: LinkedInIcon, href: "https://www.linkedin.com/company/python-user-group-singapore/" },
  { label: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/groups/pythonsg/" },
  { label: "Mailing List", icon: Mails, href: "https://groups.google.com/forum/#!forum/python-sg" },
  { label: "Email", icon: Mail, href: "mailto:pyconsg@computing.sg" },
];

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getCountdownParts);
  const isComplete = Object.values(timeLeft).every((value) => value === 0);
  const units = [
    ["Days", timeLeft.days],
    ["Hours", timeLeft.hours],
    ["Minutes", timeLeft.minutes],
    ["Seconds", timeLeft.seconds],
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getCountdownParts());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdown" aria-label="Countdown to tentative June 2027">
      <div className="countdown-kicker">
        <CalendarDays size={18} />
        <time dateTime="2027-06">(Tentative) June 2027</time>
      </div>
      <div className="countdown-grid" aria-live="polite">
        {units.map(([label, value]) => (
          <div className="countdown-unit" key={label}>
            <strong>{String(value).padStart(label === "Days" ? 3 : 2, "0")}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      {isComplete ? <p className="countdown-note">Python Asia 2027 is here.</p> : null}
    </div>
  );
}

function StreamingTerminal() {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    const timers = terminalLines.map((line, index) =>
      window.setTimeout(() => {
        setVisibleLines((current) => [...current, line]);
      }, index * 520),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <pre aria-live="polite">
      {visibleLines.map((line) => (
        <span className="terminal-line" key={line}>
          {line}
        </span>
      ))}
      <span className="terminal-cursor" aria-hidden="true" />
    </pre>
  );
}

function Header({ activePage = "home" }) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);
  const linkClass = (page, className = "") =>
    [activePage === page ? "is-active" : "", className].filter(Boolean).join(" ");

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Python Asia 2027 home" onClick={close}>
        <span className="brand-copy">Python Asia 2027</span>
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
        <a className={linkClass("home")} href="/" onClick={close}>
          Home
        </a>
        <a className={linkClass("schedule")} href="/schedule" onClick={close}>
          Schedule
        </a>
        <a className={linkClass("speakers")} href="/speakers" onClick={close}>
          Speakers
        </a>
        <a className={linkClass("coc")} href="/coc" onClick={close}>
          Code of Conduct
        </a>
        <a className="header-cta" href="/#updates" onClick={close}>
          Get Updates <ArrowRight size={18} />
        </a>
      </nav>
    </header>
  );
}

function FireworksBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const attemptPlayback = () => {
      video.muted = true;
      video.defaultMuted = true;
      const playback = video.play();
      if (playback) playback.catch(() => {});
    };
    const resumeWhenVisible = () => {
      if (document.visibilityState === "visible") attemptPlayback();
    };

    attemptPlayback();
    window.addEventListener("pageshow", attemptPlayback);
    document.addEventListener("visibilitychange", resumeWhenVisible);
    window.addEventListener("pointerdown", attemptPlayback, { once: true, passive: true });
    window.addEventListener("touchstart", attemptPlayback, { once: true, passive: true });

    return () => {
      window.removeEventListener("pageshow", attemptPlayback);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
      window.removeEventListener("pointerdown", attemptPlayback);
      window.removeEventListener("touchstart", attemptPlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="sky-video"
      src="/assets/hero-fireworks-silent.mp4"
      poster="/assets/hero-fireworks-poster.webp"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      onCanPlay={(event) => {
        event.currentTarget.muted = true;
        const playback = event.currentTarget.play();
        if (playback) playback.catch(() => {});
      }}
      aria-hidden="true"
    />
  );
}

const openingArtifacts = {
  schedule: "lantern",
  speakers: "bubble-tea",
  coc: "kimchi",
};

function AppShell({ children, showLandingScene = true, openingArtifact = null, shellRef = null }) {

  return (
    <div ref={shellRef} className={showLandingScene ? "page-shell" : "page-shell event-shell"}>
      <FireworksBackground />
      <div className="sky-tint" aria-hidden="true" />
      {showLandingScene ? (
        <div className="motion-artifact-clip" aria-hidden="true">
          <img data-motion="bloom" className="cherry-bloom-layer" src="/assets/cherry-blossom-bloom.webp" alt="" decoding="async" aria-hidden="true" />
          <img data-motion="merlion" className="merlion-side-layer" src="/assets/merlion-side-layer.webp" alt="" decoding="async" aria-hidden="true" />
          <img data-motion="cranes" className="floating-cranes" src="/assets/paper-cranes.webp" alt="" decoding="async" aria-hidden="true" />
        </div>
      ) : (
        <img className="event-artifact-layer" src="/assets/asia-party-footer.webp" alt="" decoding="async" aria-hidden="true" />
      )}
      {openingArtifact ? <OpeningArtifactFlight artifactId={openingArtifact} /> : null}
      {children}
    </div>
  );
}

function SiteFooter() {
  return (
    <footer data-motion="footer" className="site-footer">
      <div className="footer-content">
        <section className="footer-section" aria-labelledby="footer-about">
          <h2 id="footer-about">About</h2>
          <p>
            Python Asia 2027 is a community conference for Python developers, educators,
            maintainers, data practitioners, and open source teams across the region.
          </p>
          <div className="footer-links">
            <a href="/coc">Code of Conduct</a>
            <a href="/speakers">Speakers</a>
            <a href="/schedule">Schedule</a>
          </div>
        </section>

        <section className="footer-section" aria-labelledby="footer-venue">
          <h2 id="footer-venue">Dates &amp; Venue</h2>
          <dl className="footer-details">
            <div>
              <dt>When</dt>
              <dd>Coming soon in 2027</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>Singapore</dd>
            </div>
          </dl>
        </section>

        <section className="footer-section" aria-labelledby="footer-social">
          <h2 id="footer-social">Social Media</h2>
          <div className="social-links">
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <a className="social-link" href={href} aria-label={label} title={label} key={label}>
                <Icon size={22} />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
}

function LandingPage() {
  const motionScopeRef = useRef(null);
  useLandingMotion(motionScopeRef);

  return (
    <AppShell shellRef={motionScopeRef}>
      <Header activePage="home" />

      <main>
        <section data-motion="hero" className="hero section-band" id="home">
          <div className="hero-copy">
            <p className="eyebrow">
              <MapPin size={18} /> Singapore, 2027
            </p>
            <h1 className="hero-title">
              <span>Coming Soon to the</span>
              <span className="singapore-title">
                <span className="singapore-title-copy">Little Red Dot</span>
                <LittleRedDotOrbit />
              </span>
            </h1>
            <Countdown />
            <div className="hero-actions">
              <button className="button primary" type="button" disabled>
                Find Out More <ArrowRight size={20} />
              </button>
              <a className="button secondary" href="#updates">
                Sponsorship <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </section>

        <section data-motion="process" className="process section-band" id="program">
          <div className="section-heading centered">
            <p className="eyebrow">
              <Ticket size={18} /> What Happens Next
            </p>
            <h2>Coming Soon</h2>
          </div>

          <div className="process-grid">
            {processCards.map((card, index) => (
              <article className={index === 1 ? "process-card featured" : "process-card"} key={card.title}>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </div>
                <div className="process-meta">
                  <Sparkles size={22} />
                  {card.href ? <a href={card.href}>{card.meta}</a> : <span>{card.meta}</span>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section data-motion="sponsorship" className="clarity section-band">
          <div className="clarity-media" aria-hidden="true">
            <div className="terminal-card">
              <div className="terminal-dots">
                <span />
                <span />
                <span />
              </div>
              <StreamingTerminal />
            </div>
          </div>
          <div className="clarity-copy">
            <h2>Connect with us</h2>
            <p>
              Support the community and showcase your brand to developers, data scientists,
              educators, and tech leaders from across the Python ecosystem.
            </p>
            <div className="sponsor-grid">
              {sponsorPackages.map((tier) => (
                <article className="sponsor-tier" key={tier.title}>
                  <UsersRound size={28} />
                  <h3>{tier.title}</h3>
                  <p>{tier.copy}</p>
                  <ul>
                    {tier.perks.map((perk) => (
                      <li key={perk}>{perk}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="sponsor-actions">
              <a className="button primary" href="mailto:pyconsg@computing.sg">
                Contact Sponsorship <Mail size={20} />
              </a>
              <a className="button secondary" href="https://pycon.sg" target="_blank" rel="noreferrer">
                View PyCon.sg <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </section>

        <section data-motion="tracks" className="tracks section-band" id="tracks">
          <div className="section-heading">
            <p className="eyebrow">
              <Code2 size={18} /> How We Build The Program
            </p>
            <h2>CFP Consideration</h2>
          </div>

          <div className="track-list">
            {supportRows.map((row) => (
              <a className="track-row" href="#updates" key={row.title}>
                <h3>{row.title}</h3>
                <p>{row.copy}</p>
                <span className="round-action" aria-hidden="true">
                  <ArrowUpRight size={24} />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section data-motion="community" className="community section-band" id="community">
          <div className="community-copy">
            <h2>A living map of Python communities.</h2>
          </div>
          <img data-motion="map" className="asia-map" src="/assets/asia-connectivity.webp" loading="lazy" decoding="async" width="1100" height="825" alt="Dotted map of Asia with conference connection arcs" />
          <div data-motion="stats" className="stats-grid" aria-label="Conference statistics">
            {stats.map(([value, label]) => (
              <div className="stat" key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section data-motion="updates" className="faq section-band" id="updates">
          <div className="section-heading centered">
            <p className="eyebrow">
              <CalendarDays size={18} /> Community Channels
            </p>
            <h2>Stay Connected</h2>
          </div>

          <div className="connect-grid">
            {connectionCards.map(({ label, copy, href, icon: Icon, image }) => (
              <a
                className="connect-card"
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{ "--card-bg": `url(${image})` }}
                key={label}
              >
                <span className="connect-icon">
                  <Icon size={26} />
                </span>
                <h3>{label}</h3>
                <p>{copy}</p>
                <span className="connect-action">
                  Open <ArrowUpRight size={18} />
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </AppShell>
  );
}

export function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const routes = {
    "/schedule": { title: "Schedule", page: <SchedulePage /> },
    "/speakers": { title: "Speakers", page: <SpeakersPage /> },
    "/speaker": { title: "Speakers", page: <SpeakersPage /> },
    "/coc": { title: "Code of Conduct", page: <ConductPage /> },
  };
  const route = routes[path];

  useEffect(() => {
    document.title = route ? `${route.title} | Python Asia 2027` : "Python Asia 2027";
  }, [route]);

  if (!route) return <LandingPage />;

  const activePage = path === "/speaker" ? "speakers" : path.slice(1);
  return (
    <AppShell showLandingScene={false} openingArtifact={openingArtifacts[activePage]}>
      <Header activePage={activePage} />
      {route.page}
      <SiteFooter />
    </AppShell>
  );
}
