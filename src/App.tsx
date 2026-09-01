import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";

const queryClient = new QueryClient();

const navigation = [
  { id: "district", label: "The district" },
  { id: "residences", label: "Residences" },
  { id: "story", label: "Our story" },
  { id: "arrival", label: "Arrive" },
];

function scrollToId(id: string, closeMenu?: () => void) {
  closeMenu?.();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("district");

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="nav-shell">
      <div className="nav-inner">
        <a
          href="#top"
          className="brand-mark"
          data-testid="link-brand-home"
          onClick={() => closeMenu()}
        >
          <span className="brand-symbol" aria-hidden="true" />
          <span className="brand-wordmark">
            <strong>Northline</strong>
            <span>Lake district · Est. 2027</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${active === item.id ? "active" : ""}`}
              data-testid={`link-nav-${item.id}`}
              onClick={() => closeMenu()}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#interest"
          className="nav-cta"
          data-testid="link-nav-interest"
          onClick={() => closeMenu()}
        >
          Register interest
        </a>
        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          data-testid="button-mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="menu-icon" />
        </button>
      </div>
      <nav className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation">
        {navigation.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="nav-link"
            data-testid={`link-mobile-nav-${item.id}`}
            onClick={() => scrollToId(item.id, closeMenu)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#interest"
          className="nav-link"
          data-testid="link-mobile-interest"
          onClick={() => scrollToId("interest", closeMenu)}
        >
          Register interest
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="eyebrow">A new address on the water · Lake Meridian</div>
          <h1 id="hero-title">
            Make room
            <br />
            for <em>more.</em>
          </h1>
          <p className="hero-intro">
            Northline is a waterfront neighborhood shaped for slow mornings,
            long tables, and the feeling of being exactly where you meant to be.
          </p>
          <div className="hero-footer">
            <a
              href="#district"
              className="hero-scroll"
              data-testid="link-hero-discover"
              onClick={() => scrollToId("district")}
            >
              <span className="scroll-line" />
              Discover Northline
              <ArrowDown size={13} strokeWidth={1.2} />
            </a>
            <span className="hero-note">Coming to the eastern shore · 2027</span>
          </div>
        </div>
      </div>
      <span className="hero-index">01 / 07 — Find your horizon</span>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="section section-cream" aria-labelledby="manifesto-title">
      <div className="section-inner manifesto">
        <div className="manifesto-text reveal">
          <div className="eyebrow">A different pace</div>
          <h2 className="section-heading" id="manifesto-title">
            Life, <em>well</em>
            <br />
            placed.
          </h2>
          <p className="section-copy">
            There are places you visit, and places that quietly change your
            definition of a good day. Northline is the latter: 18 acres of
            lakeside living, gathered around a public boardwalk and a shared
            sense of possibility.
          </p>
          <a
            href="#story"
            className="outline-link"
            data-testid="link-manifesto-story"
            onClick={() => scrollToId("story")}
          >
            The idea behind Northline
          </a>
        </div>
        <div className="manifesto-image reveal delay-1">
          <img src="/images/shoreline.jpg" alt="A quiet rocky shoreline framed by trees" data-testid="img-manifesto-shoreline" />
          <div className="image-caption">
            The east shore
            <span>Where the city meets the lake</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function District() {
  return (
    <section className="section section-dark" id="district" aria-labelledby="district-title">
      <div className="section-inner chapter">
        <div className="chapter-aside reveal">
          <div>
            <div className="chapter-number">02</div>
            <div className="chapter-rule" />
            <div className="eyebrow">The district</div>
          </div>
          <div className="chapter-quote">
            A neighborhood with a front door wide open to the lake.
          </div>
        </div>
        <div className="chapter-main reveal delay-1">
          <h2 className="section-heading" id="district-title">
            Everything
            <br />
            <em>within reach.</em>
          </h2>
          <p>
            Northline brings the everyday closer. Your morning coffee, a swim
            before work, dinner with friends, and a boat home at sunset — all
            inside one walkable, generous waterfront plan.
          </p>
          <p>
            Designed by <strong>Field Assembly</strong>, the landscape moves
            between intimate courtyards and wide lake views, with a rhythm that
            makes room for both neighborhood hellos and a little solitude.
          </p>
          <div className="stat-strip" aria-label="Northline at a glance">
            <div className="stat" data-testid="text-stat-acres">
              <strong>18</strong>
              <span>Acres of lakefront ground</span>
            </div>
            <div className="stat" data-testid="text-stat-boardwalk">
              <strong>0.8</strong>
              <span>Miles of public boardwalk</span>
            </div>
            <div className="stat" data-testid="text-stat-boat">
              <strong>12</strong>
              <span>Minutes to downtown by boat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DistrictMap() {
  return (
    <section className="section section-copper" aria-labelledby="map-title">
      <div className="section-inner district-layout">
        <div className="reveal">
          <div className="eyebrow">03 · The daily route</div>
          <h2 className="section-heading" id="map-title">
            Find your
            <br />
            <em>way here.</em>
          </h2>
          <div className="district-list">
            <div className="district-item" data-testid="row-district-dining">
              <span>Dining room</span>
              <span>04 places</span>
            </div>
            <div className="district-item" data-testid="row-district-wellness">
              <span>Water &amp; wellness</span>
              <span>03 ways in</span>
            </div>
            <div className="district-item" data-testid="row-district-gathering">
              <span>Gathering spaces</span>
              <span>07 open doors</span>
            </div>
            <div className="district-item" data-testid="row-district-moorings">
              <span>Private moorings</span>
              <span>28 slips</span>
            </div>
          </div>
        </div>
        <div className="district-visual reveal delay-1">
          <img src="/images/marina.jpg" alt="Blue water and a lively school of fish beneath the surface" data-testid="img-district-water" />
          <div className="map-card">
            <div className="eyebrow">Northline, mapped</div>
            <p>Drawn around what makes a day feel full.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const homes = [
  {
    name: "The Waterline",
    type: "Two to three beds",
    image: "/images/residence.jpg",
    description: "Warm, considered homes with a view that keeps unfolding.",
  },
  {
    name: "The Lookout",
    type: "Three to four beds",
    image: "/images/cabin.jpg",
    description: "A higher perspective, with private terraces made for the last light.",
  },
  {
    name: "The Landing",
    type: "One to two beds",
    image: "/images/boardwalk.jpg",
    description: "Compact, calm, and steps from the boardwalk’s morning circuit.",
  },
];

function Residences() {
  return (
    <section className="section section-cream" id="residences" aria-labelledby="residences-title">
      <div className="section-inner">
        <div className="homes-heading reveal">
          <div>
            <div className="eyebrow">04 · The residences</div>
            <h2 className="section-heading" id="residences-title">
              Made for the
              <br />
              <em>way you live.</em>
            </h2>
          </div>
          <p className="section-copy">
            Three distinct collections, one shared standard: honest materials,
            daylight from every direction, and the lake as a daily ritual.
          </p>
        </div>
        <div className="home-grid">
          {homes.map((home, index) => (
            <article className={`home-card reveal delay-${index + 1}`} key={home.name} data-testid={`card-home-${index + 1}`}>
              <div className="home-image-wrap">
                <img src={home.image} alt={`${home.name} residence at Northline`} data-testid={`img-home-${index + 1}`} />
              </div>
              <div className="home-meta">
                <strong>{home.name}</strong>
                <span>{home.type}</span>
              </div>
              <p className="home-description">{home.description}</p>
              <a href="#interest" className="outline-link" data-testid={`link-home-interest-${index + 1}`}>
                Explore the collection
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="section section-cream" id="story" aria-labelledby="story-title">
      <div className="section-inner story-layout">
        <div className="story-image reveal">
          <img src="/images/shoreline.jpg" alt="The rocky lake edge where Northline will meet the water" data-testid="img-story-shoreline" />
        </div>
        <div className="story-copy reveal delay-1">
          <div className="eyebrow">05 · A place with a past</div>
          <h2 className="section-heading" id="story-title">
            Keep the
            <br />
            <em>good parts.</em>
          </h2>
          <p>
            Before Northline had a name, this was a working shoreline — a
            place for ferries, fishermen, and the first light over the water.
            We’re carrying that spirit forward with architecture that feels
            grounded, useful, and built to gather people.
          </p>
          <div className="story-label">
            <strong>The northline principle</strong>
            Build for the long view. Leave room for the next story.
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrival() {
  return (
    <section className="section section-dark arrival" id="arrival" aria-labelledby="arrival-title">
      <div className="section-inner">
        <div className="arrival-header reveal">
          <div>
            <div className="eyebrow">06 · Getting here</div>
            <h2 className="section-heading" id="arrival-title">
              Come by
              <br />
              <em>whatever floats.</em>
            </h2>
          </div>
          <p className="section-copy">
            Northline is connected by road, rail, trail, and water. The easiest
            route is the one that makes arriving feel like part of the day.
          </p>
        </div>
        <div className="arrival-image reveal delay-1">
          <img src="/images/boardwalk.jpg" alt="Sunset over layered hills from the Northline boardwalk" data-testid="img-arrival-sunset" />
          <div className="arrival-overlay">
            <div className="route">
              <small>Water taxi · Pier 4</small>
              12 min to the city
            </div>
            <div className="time">First crossing 06:40<br />Last light 22:15</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  function submitInterest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-success" role="status" data-testid="status-interest-success">
        <span className="success-mark" aria-hidden="true"><Check size={18} strokeWidth={1.4} /></span>
        <div>
          <strong>We’ll meet you at the water.</strong>
          <p>Thank you{name ? `, ${name.split(" ")[0]}` : ""}. We’ll share the next Northline chapter soon.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="interest-form" onSubmit={submitInterest} data-testid="form-interest">
      <div className="field-row">
        <div className="field">
          <label htmlFor="interest-name">Your name</label>
          <input id="interest-name" name="name" required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} data-testid="input-interest-name" />
        </div>
        <div className="field">
          <label htmlFor="interest-email">Email address</label>
          <input id="interest-email" name="email" type="email" required autoComplete="email" data-testid="input-interest-email" />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="interest-home">I’m interested in</label>
          <select id="interest-home" name="home" defaultValue="" required data-testid="select-interest-home">
            <option value="" disabled>Select a collection</option>
            <option value="waterline">The Waterline</option>
            <option value="lookout">The Lookout</option>
            <option value="landing">The Landing</option>
            <option value="unsure">Help me choose</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="interest-arrival">How did you hear?</label>
          <select id="interest-arrival" name="source" defaultValue="" data-testid="select-interest-source">
            <option value="" disabled>Choose one</option>
            <option value="friend">A friend</option>
            <option value="search">Search</option>
            <option value="press">Press</option>
            <option value="event">An event</option>
          </select>
        </div>
      </div>
      <button type="submit" className="form-submit" data-testid="button-submit-interest">
        Register your interest <ArrowUpRight size={14} strokeWidth={1.4} />
      </button>
    </form>
  );
}

function Contact() {
  return (
    <section className="section contact" id="interest" aria-labelledby="interest-title">
      <div className="section-inner contact-layout">
        <div className="reveal">
          <div className="eyebrow">07 · Keep in touch</div>
          <h2 className="section-heading" id="interest-title">
            The view is
            <br />
            <em>worth the wait.</em>
          </h2>
          <p className="contact-note">
            Be the first to hear about new releases, private viewings, and
            weekends on the Northline shore.
          </p>
        </div>
        <div className="reveal delay-1">
          <InterestForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a href="#top" className="brand-mark" data-testid="link-footer-home">
          <span className="brand-symbol" aria-hidden="true" />
          <span className="brand-wordmark">
            <strong>Northline</strong>
            <span>Lake district · Est. 2027</span>
          </span>
        </a>
        <div className="footer-meta">
          <span>Lake Meridian<br />Eastern shore</span>
          <span><a href="#interest" data-testid="link-footer-contact">hello@northline.place</a><br />+1 206 555 0148</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Northline is a project by Meridian Works.</span>
        <span>Privacy · Accessibility · © 2025</span>
      </div>
    </footer>
  );
}

function Home() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <SiteNav />
      <main>
        <Hero />
        <Manifesto />
        <District />
        <DistrictMap />
        <Residences />
        <Story />
        <Arrival />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;