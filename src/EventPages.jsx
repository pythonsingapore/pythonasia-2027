import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Clock3,
  Coffee,
  Globe2,
  Mail,
  MapPin,
  Mic2,
  Search,
  ShieldCheck,
  Tag,
  UsersRound,
} from "lucide-react";
import { sitePaths } from "./sitePaths.js";

const rooms = ["Main Hall", "Data Studio", "Community Room"];

const culturalHoverTreatments = {
  data: {
    image: sitePaths.asset("schedule-culture-india.webp"),
    desktop: "50% 60%",
    mobile: "50% 64%",
    detail: "50% 54%",
    detailMobile: "50% 58%",
  },
  education: {
    image: sitePaths.asset("schedule-culture-indonesia.webp"),
    desktop: "58% 48%",
    mobile: "60% 52%",
    detail: "57% 48%",
    detailMobile: "56% 50%",
  },
  korea: {
    image: sitePaths.asset("schedule-culture-korea.webp"),
    desktop: "34% 65%",
    mobile: "32% 67%",
    detail: "34% 56%",
    detailMobile: "34% 58%",
  },
  vietnam: {
    image: sitePaths.asset("schedule-culture-vietnam.webp"),
    desktop: "72% 46%",
    mobile: "76% 50%",
    detail: "72% 48%",
    detailMobile: "68% 50%",
  },
};

function culturalTreatmentForSession(session) {
  if (session.topic === "Data & AI") return culturalHoverTreatments.data;
  if (session.topic === "Python Core") return culturalHoverTreatments.korea;
  if (session.topic === "Education" || session.topic === "Open Source") return culturalHoverTreatments.education;
  return session.room === "Main Hall" ? culturalHoverTreatments.vietnam : culturalHoverTreatments.education;
}

function culturalStyleForSession(session) {
  const treatment = culturalTreatmentForSession(session);

  return {
    "--session-culture-image": `url("${treatment.image}")`,
    "--session-culture-position": treatment.desktop,
    "--session-culture-mobile-position": treatment.mobile,
    "--session-detail-image": `url("${treatment.image}")`,
    "--session-detail-position": treatment.detail,
    "--session-detail-mobile-position": treatment.detailMobile,
  };
}

const dayOne = [
  {
    time: "08:30",
    kind: "break",
    title: "Registration & Coffee",
    icon: Coffee,
  },
  {
    time: "09:00",
    sessions: [
      { id: "opening-keynote", room: "Main Hall", title: "Opening Keynote", subtitle: "The Next Chapter: Python in Asia", speaker: "Maya Chen", level: "All levels", topic: "Community" },
      { id: "notebooks-products", room: "Data Studio", title: "From Notebooks to Products", subtitle: "Pragmatic data science in production", speaker: "Wei Ling Tan", level: "Intermediate", topic: "Data & AI" },
      { id: "pycon-and-you", room: "Community Room", title: "PyCon & You", subtitle: "Get involved, give back", speaker: "Adrian Yap", level: "Beginner", topic: "Community" },
    ],
  },
  {
    time: "10:00",
    sessions: [
      { id: "packaging-2027", room: "Main Hall", title: "Python Packaging in 2027", subtitle: "Modern workflows, trusted distributions", speaker: "Arjun Dev", level: "Intermediate", topic: "Python Core" },
      { id: "polars", room: "Data Studio", title: "Data Engineering with Polars", subtitle: "Fast, lazy, and scalable", speaker: "Jason Ng", level: "Advanced", topic: "Data & AI" },
      { id: "teaching-confidence", room: "Community Room", title: "Teaching Python with Confidence", subtitle: "Practical ideas for educators", speaker: "Nurul Huda", level: "All levels", topic: "Education" },
    ],
  },
  {
    time: "11:00",
    sessions: [
      { id: "python-without-borders", room: "Main Hall", title: "Python Without Borders", subtitle: "Technology, access, and belonging", speaker: "Aisha Rahman", level: "Intermediate", topic: "Community", description: "Technology connects us, but access is not always equal. This talk explores how Python can be a force for inclusion through community, education, and empathetic design, with stories from across Asia." },
      { id: "asia-data", room: "Data Studio", title: "Visualising Asia's Data", subtitle: "Stories with maps and charts", speaker: "Mei Lin Ho", level: "Intermediate", topic: "Data & AI" },
      { id: "open-source-101", room: "Community Room", title: "Open Source 101", subtitle: "Your first contribution", speaker: "Ravi Shankar", level: "Beginner", topic: "Open Source" },
    ],
  },
  { time: "12:00", kind: "break", title: "Lunch Break", icon: UsersRound },
  {
    time: "13:00",
    sessions: [
      { id: "libraries-love", room: "Main Hall", title: "Building Python Libraries People Love", subtitle: "API design, testing, docs", speaker: "Hyunwoo Kim", level: "Intermediate", topic: "Python Core" },
      { id: "clean-data", room: "Data Studio", title: "From CSV to Clean Data", subtitle: "Tidy pipelines with Python", speaker: "Farah Khan", level: "Beginner", topic: "Data & AI" },
      { id: "diversity-tech", room: "Community Room", title: "Diversity in Tech", subtitle: "Perspectives from our community", speaker: "Shreya Iyer", level: "All levels", topic: "Community" },
    ],
  },
  {
    time: "14:00",
    sessions: [
      { id: "async-real-world", room: "Main Hall", title: "Async Python in the Real World", subtitle: "Concurrency beyond basics", speaker: "Tomohiro Sato", level: "Advanced", topic: "Python Core" },
      { id: "edge-ml", room: "Data Studio", title: "Machine Learning on the Edge", subtitle: "Tiny models, big impact", speaker: "Aiko Nakamura", level: "Advanced", topic: "Data & AI" },
      { id: "python-good", room: "Community Room", title: "Python for Good", subtitle: "Building tools for social impact", speaker: "Miguel Santos", level: "All levels", topic: "Community" },
    ],
  },
  {
    time: "15:00",
    sessions: [
      { id: "future-panel", room: "Main Hall", title: "The Future of Python in Asia", subtitle: "Panel: leaders, innovators, builders", speaker: "Community Panel", level: "All levels", topic: "Community" },
      { id: "lightning-data", room: "Data Studio", title: "Data Lightning Talks", subtitle: "Five ideas in five minutes", speaker: "Multiple speakers", level: "All levels", topic: "Data & AI" },
      { id: "lightning-community", room: "Community Room", title: "Community Lightning Talks", subtitle: "Short talks, big impact", speaker: "Multiple speakers", level: "All levels", topic: "Community" },
    ],
  },
  { time: "16:00", kind: "break", title: "Coffee Break", icon: Coffee },
  {
    time: "17:00",
    sessions: [
      { id: "closing-keynote", room: "Main Hall", title: "Closing Keynote", subtitle: "Small steps, big change", speaker: "Dr. Ye Lin Aung", level: "All levels", topic: "Community" },
      { id: "ask-experts", room: "Data Studio", title: "Ask the Experts", subtitle: "Data, AI & Python open Q&A", speaker: "Expert Panel", level: "All levels", topic: "Data & AI" },
      { id: "closing-circle", room: "Community Room", title: "Closing Circle", subtitle: "Reflections and thanks", speaker: "Python Asia Team", level: "All levels", topic: "Community" },
    ],
  },
];

function cloneDay(prefix, titleSuffix) {
  return dayOne.map((slot, slotIndex) => ({
    ...slot,
    sessions: slot.sessions?.map((session, sessionIndex) => ({
      ...session,
      id: `${prefix}-${slotIndex}-${sessionIndex}`,
      title: sessionIndex === 0 ? `${session.title}${titleSuffix}` : session.title,
    })),
  }));
}

const scheduleDays = [
  { id: "fri", short: "Fri 4 June", long: "Friday, 4 June", slots: dayOne },
  { id: "sat", short: "Sat 5 June", long: "Saturday, 5 June", slots: cloneDay("sat", "") },
  { id: "sun", short: "Sun 6 June", long: "Sunday, 6 June", slots: cloneDay("sun", " Workshop") },
];

const defaultSession = { ...dayOne.find((slot) => slot.time === "11:00").sessions[0], time: "11:00" };

const speakers = [
  { id: "aisha", type: "Keynote", name: "Aisha Rahman", role: "Developer Advocate", region: "Kuala Lumpur, Malaysia", talk: "Python Without Borders", bio: "Aisha builds developer education programs across emerging technology communities and advocates for more inclusive paths into open source." },
  { id: "mei", type: "Talk", name: "Mei Lin Ho", role: "Data Visualisation Researcher", region: "Taipei, Taiwan", talk: "Visualising Asia's Data", bio: "Mei Lin turns complex public datasets into clear stories using Python, maps, and responsible visual communication." },
  { id: "hyunwoo", type: "Talk", name: "Hyunwoo Kim", role: "Open Source Maintainer", region: "Seoul, South Korea", talk: "Building Python Libraries People Love", bio: "Hyunwoo maintains widely used Python tooling and cares deeply about APIs, documentation, and sustainable maintainer communities." },
  { id: "nurul", type: "Workshop", name: "Nurul Huda", role: "Computing Educator", region: "Jakarta, Indonesia", talk: "Teaching Python with Confidence", bio: "Nurul helps teachers design hands-on computing lessons that are practical, welcoming, and grounded in local classrooms." },
  { id: "tomohiro", type: "Talk", name: "Tomohiro Sato", role: "Platform Engineer", region: "Tokyo, Japan", talk: "Async Python in the Real World", bio: "Tomohiro works on high-throughput Python platforms and shares pragmatic lessons from running asynchronous systems in production." },
  { id: "shreya", type: "Keynote", name: "Shreya Iyer", role: "Community Director", region: "Bengaluru, India", talk: "The Communities That Keep Us Learning", bio: "Shreya connects open-source groups across Asia and studies how durable communities share leadership, care, and technical knowledge." },
  { id: "miguel", type: "Talk", name: "Miguel Santos", role: "Civic Technology Lead", region: "Manila, Philippines", talk: "Python for Good", bio: "Miguel leads civic technology projects that use open data and Python to improve access to public services." },
  { id: "wei", type: "Workshop", name: "Wei Ling Tan", role: "Machine Learning Engineer", region: "Singapore", talk: "From Notebooks to Products", bio: "Wei Ling helps teams move machine learning experiments into understandable, observable, and reliable products." },
];

function PageHeading({ eyebrow, title, copy }) {
  return (
    <header className="event-page-heading">
      <p className="event-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {copy ? <p className="event-page-intro">{copy}</p> : null}
    </header>
  );
}

function SessionCell({ session, selected, onSelect }) {
  if (!session) return <div className="ledger-session is-empty" aria-hidden="true" />;
  return (
    <button
      className={selected ? "ledger-session is-selected" : "ledger-session"}
      type="button"
      onClick={() => onSelect(session)}
      aria-pressed={selected}
      style={culturalStyleForSession(session)}
    >
      <strong>{session.title}</strong>
      <span>{session.subtitle}</span>
      <small>{session.speaker}</small>
    </button>
  );
}

function SessionDetails({ session }) {
  const startHour = Number(session.time?.slice(0, 2) || 11);
  const endTime = `${String(startHour + 1).padStart(2, "0")}:00`;

  return (
    <aside className="session-details" aria-live="polite" style={culturalStyleForSession(session)}>
      <div className="session-detail-time"><Clock3 size={16} /> {session.time || "11:00"} - {endTime}</div>
      <p className="session-detail-room">{session.room}</p>
      <h2>{session.title}</h2>
      <strong className="session-detail-speaker">{session.speaker}</strong>
      <p>{session.description || `${session.subtitle}. A practical session with lessons, examples, and ideas attendees can apply in their own Python work.`}</p>
      <dl className="session-meta">
        <div><Tag size={17} /><dt>Format</dt><dd>Talk</dd></div>
        <div><BarChart3 size={17} /><dt>Level</dt><dd>{session.level}</dd></div>
        <div><Globe2 size={17} /><dt>Language</dt><dd>English</dd></div>
      </dl>
    </aside>
  );
}

export function SchedulePage() {
  const [dayId, setDayId] = useState("fri");
  const [selectedSession, setSelectedSession] = useState(defaultSession);
  const activeDay = scheduleDays.find((day) => day.id === dayId);

  const selectDay = (day) => {
    setDayId(day.id);
    const firstSlot = day.slots.find((slot) => slot.sessions);
    const nextSession = firstSlot ? { ...firstSlot.sessions[0], time: firstSlot.time } : defaultSession;
    setSelectedSession(nextSession);
  };

  return (
    <main className="event-main schedule-page" id="main-content">
      <PageHeading eyebrow="Programme" title="Python Asia 2027 Schedule" />
      <div className="day-tabs" role="tablist" aria-label="Conference day">
        {scheduleDays.map((day) => (
          <button key={day.id} type="button" role="tab" aria-selected={day.id === dayId} onClick={() => selectDay(day)}>
            <CalendarDays size={18} /> {day.short}
          </button>
        ))}
      </div>
      <p className="mobile-day-label">{activeDay.long}</p>

      <div className="schedule-layout">
        <section className="ledger-table" aria-label={`${activeDay.long} timetable`}>
          <div className="ledger-head"><span>Time</span>{rooms.map((room) => <strong key={room}>{room}</strong>)}</div>
          {activeDay.slots.map((slot) => {
            if (slot.kind === "break") {
              const Icon = slot.icon;
              return <div className="ledger-row ledger-break" key={`${dayId}-${slot.time}`}><time>{slot.time}</time><div><Icon size={18} />{slot.title}</div></div>;
            }
            return (
              <div className="ledger-row" key={`${dayId}-${slot.time}`}>
                <time>{slot.time}</time>
                {rooms.map((room) => {
                  const session = slot.sessions.find((item) => item.room === room);
                  return <SessionCell key={room} session={session} selected={session?.id === selectedSession.id} onSelect={(item) => setSelectedSession({ ...item, time: slot.time })} />;
                })}
              </div>
            );
          })}
        </section>

        <section className="mobile-schedule-list" aria-label={`${activeDay.long} agenda`}>
          {activeDay.slots.map((slot) => (
            <div className={slot.kind === "break" ? "mobile-slot is-break" : "mobile-slot"} key={`mobile-${dayId}-${slot.time}`}>
              <time>{slot.time}</time>
              {slot.kind === "break" ? <strong>{slot.title}</strong> : slot.sessions.map((session) => (
                <button
                  type="button"
                  key={session.id}
                  onClick={() => setSelectedSession({ ...session, time: slot.time })}
                  aria-pressed={session.id === selectedSession.id}
                  style={culturalStyleForSession(session)}
                >
                  <span>{session.room}</span><strong>{session.title}</strong><small>{session.speaker}</small>
                </button>
              ))}
            </div>
          ))}
        </section>

        <SessionDetails session={selectedSession} />
      </div>
      <p className="schedule-note">Schedule is illustrative and subject to change. All times shown in SGT (UTC+8).</p>
    </main>
  );
}

export function ConductPage() {
  return (
    <main className="event-main conduct-page" id="main-content">
      <PageHeading
        eyebrow="Community Care"
        title="Code of Conduct"
        copy="Python Asia is built for learning, collaboration, and belonging. Everyone who joins the conference shares responsibility for making that possible."
      />

      <section className="conduct-urgent" aria-labelledby="report-heading">
        <AlertTriangle size={28} />
        <div><p>Need help now?</p><h2 id="report-heading">Report a concern to the response team</h2><span>Reports are handled promptly, privately, and with care.</span></div>
        <a href="mailto:pyconsg@computing.sg">Email the team <Mail size={18} /></a>
      </section>

      <div className="conduct-layout">
        <aside className="conduct-summary">
          <ShieldCheck size={30} />
          <h2>The short version</h2>
          <p>Be kind, be professional, and make room for people with different backgrounds and experiences.</p>
          <ul>
            <li>No harassment or discrimination.</li>
            <li>Keep communication appropriate for a professional audience.</li>
            <li>Stop when someone asks you to stop.</li>
            <li>Contact organisers when you need support.</li>
          </ul>
        </aside>

        <article className="conduct-article">
          <section><h2>Our commitment</h2><p>We are committed to a harassment-free conference experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, body size, race, religion, age, or technical background.</p></section>
          <section><h2>Expected behaviour</h2><p>Show respect and courtesy in talks, workshops, social events, online spaces, sponsor areas, and informal conversations. Listen generously, use welcoming language, and respect personal boundaries.</p></section>
          <section><h2>Unacceptable behaviour</h2><p>Harassment includes offensive comments, deliberate intimidation, stalking or following, unwanted photography or recording, sustained disruption, inappropriate physical contact, and unwelcome sexual attention.</p></section>
          <details><summary>How enforcement works <ChevronDown size={20} /></summary><p>Participants asked to stop unacceptable behaviour must comply immediately. Organisers may issue a warning, remove someone from an activity, or expel a participant without refund when necessary to protect the community.</p></details>
          <details><summary>Guidance for speakers, sponsors, and volunteers <ChevronDown size={20} /></summary><p>Presentation material, booth activities, clothing, and community interactions must remain appropriate for a broad professional audience. Every event contributor is covered by this policy.</p></details>
          <details><summary>Policy attribution and license <ChevronDown size={20} /></summary><p>This illustrative policy is adapted from long-standing Python community codes of conduct and the Geek Feminism conference policy template.</p></details>
        </article>
      </div>
    </main>
  );
}

export function SpeakersPage() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState("aisha");

  const visibleSpeakers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return speakers.filter((speaker) => {
      const matchesType = filter === "All" || speaker.type === filter;
      const matchesQuery = !normalized || `${speaker.name} ${speaker.talk} ${speaker.region}`.toLowerCase().includes(normalized);
      return matchesType && matchesQuery;
    });
  }, [filter, query]);

  return (
    <main className="event-main speakers-page" id="main-content">
      <PageHeading eyebrow="People & Ideas" title="Meet the Speakers" copy="Voices from across Asia sharing practical Python, thoughtful research, and community lessons." />
      <div className="speaker-toolbar">
        <div className="speaker-filters" aria-label="Filter speakers">
          {["All", "Keynote", "Talk", "Workshop"].map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <label><Search size={18} /><span className="sr-only">Search speakers</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search speakers or talks" /></label>
      </div>

      <section className="speaker-list" aria-live="polite">
        {visibleSpeakers.length ? visibleSpeakers.map((speaker, index) => {
          const isOpen = expanded === speaker.id;
          return (
            <article className={isOpen ? "speaker-row is-open" : "speaker-row"} key={speaker.id}>
              <span className="speaker-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="speaker-person"><span><Mic2 size={22} /></span><div><p>{speaker.type}</p><h2>{speaker.name}</h2><small>{speaker.role}</small></div></div>
              <div className="speaker-talk"><p>Session</p><h3>{speaker.talk}</h3><span><MapPin size={15} />{speaker.region}</span></div>
              <button className="speaker-toggle" type="button" aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? "" : speaker.id)} aria-label={`${isOpen ? "Hide" : "Show"} biography for ${speaker.name}`}>
                {isOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </button>
              {isOpen ? <p className="speaker-bio">{speaker.bio}</p> : null}
            </article>
          );
        }) : <div className="speaker-empty"><BookOpen size={28} /><h2>No speakers found</h2><p>Try another name, talk, or filter.</p></div>}
      </section>
    </main>
  );
}
