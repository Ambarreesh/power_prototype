import { FormEvent, useEffect, useRef, useState } from "react";

const HERO =
  "https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?auto=format&fit=crop&w=2200&q=88";
const PROGRAM_IMAGES = [
  "https://images.unsplash.com/photo-1709315957145-a4bad1feef28?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1722925541142-5db2668ca492?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1641337221253-fdc7237f6b61?auto=format&fit=crop&w=1200&q=82",
];

const Arrow = ({ down = false }: { down?: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d={down ? "M12 4v16m0 0 6-6m-6 6-6-6" : "M5 12h14m0 0-6-6m6 6-6 6"} />
  </svg>
);

const Bolt = () => (
  <span className="bolt" aria-hidden="true">
    <svg viewBox="0 0 28 36">
      <path d="M17 1 3 21h10l-2 14 14-21H15l2-13Z" />
    </svg>
  </span>
);

const programs = [
  {
    no: "01",
    name: "Strength",
    text: "Build a powerful foundation with progressive training and focused coaching.",
  },
  {
    no: "02",
    name: "Conditioning",
    text: "Move faster, last longer, and train your cardiovascular engine with intent.",
  },
  {
    no: "03",
    name: "Functional",
    text: "Athletic full-body sessions designed around how your body actually moves.",
  },
];

const pricing = [
  { name: "Monthly", sub: "Start your routine", features: ["Gym access", "Fitness assessment", "Locker access"] },
  { name: "Quarterly", sub: "Build real momentum", features: ["Everything in Monthly", "Progress check-ins", "1 guided session"] },
  { name: "Annual", sub: "Commit to the change", features: ["Everything in Quarterly", "Priority support", "Training roadmap"] },
];

function TrialModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [slot, setSlot] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setStep((value) => Math.min(value + 1, 4));
  };

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="trial-modal" role="dialog" aria-modal="true" aria-label="Book a free trial" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close booking form">×</button>
        {step < 4 ? (
          <>
            <div className="modal-top">
              <span className="eyebrow lime">Free trial</span>
              <span className="step-count">0{step} / 03</span>
            </div>
            <div className="progress"><span style={{ width: `${step * 33.33}%` }} /></div>
            <form onSubmit={submit}>
              {step === 1 && (
                <div className="form-step">
                  <h3>Let’s start with<br />the basics.</h3>
                  <label>Your name<input required autoFocus placeholder="Enter your full name" /></label>
                  <label>Phone number<input required inputMode="tel" placeholder="+91 98765 43210" /></label>
                </div>
              )}
              {step === 2 && (
                <div className="form-step">
                  <h3>What are you<br />training for?</h3>
                  <div className="chip-grid">
                    {["Muscle gain", "Weight loss", "Stamina", "General fitness"].map((item) => (
                      <button type="button" className={goal === item ? "chip active" : "chip"} onClick={() => setGoal(item)} key={item}>{item}</button>
                    ))}
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="form-step">
                  <h3>When do you<br />want to train?</h3>
                  <div className="slot-grid">
                    {["Morning", "Evening"].map((item) => (
                      <button type="button" className={slot === item ? "slot active" : "slot"} onClick={() => setSlot(item)} key={item}>
                        <span>{item === "Morning" ? "06:00 — 10:00" : "17:00 — 21:00"}</span>{item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="form-actions">
                {step > 1 && <button type="button" className="back-button" onClick={() => setStep(step - 1)}>Back</button>}
                <button className="button primary form-next" type="submit">
                  {step === 3 ? "Confirm trial" : "Continue"} <Arrow />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="success">
            <div className="success-mark">✓</div>
            <span className="eyebrow lime">You’re in</span>
            <h3>Your first rep<br />starts now.</h3>
            <p>This is a demo booking. Once the gym confirms its contact details, the team will follow up on WhatsApp.</p>
            <button className="button primary" onClick={onClose}>Back to site <Arrow /></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [compare, setCompare] = useState(52);
  const [quote, setQuote] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const pointer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let value = 0;
    const timer = window.setInterval(() => {
      value += Math.ceil(Math.random() * 11);
      if (value >= 100) {
        value = 100;
        window.clearInterval(timer);
        window.setTimeout(() => setLoaded(true), 280);
      }
      setProgress(value);
    }, 60);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [loaded]);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (pointer.current) {
        pointer.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
        document.documentElement.style.setProperty("--mouse-x", `${event.clientX / window.innerWidth - 0.5}`);
        document.documentElement.style.setProperty("--mouse-y", `${event.clientY / window.innerHeight - 0.5}`);
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const value = available > 0 ? (window.scrollY / available) * 100 : 0;
      setScrollProgress(value);
      setScrolled(window.scrollY > 80);
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll("button, a, input, .program-card, .price-card");
    const enter = () => pointer.current?.classList.add("active");
    const leave = () => pointer.current?.classList.remove("active");
    targets.forEach((target) => {
      target.addEventListener("mouseenter", enter);
      target.addEventListener("mouseleave", leave);
    });
    return () => targets.forEach((target) => {
      target.removeEventListener("mouseenter", enter);
      target.removeEventListener("mouseleave", leave);
    });
  }, [loaded, modal]);

  const openTrial = () => {
    setMenu(false);
    setModal(true);
  };

  const scrollTo = (id: string) => {
    setMenu(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const quotes = [
    ["The kind of place that makes you show up stronger every day.", "Member story", "Preview content"],
    ["Focused coaching, serious energy, and a community that pushes together.", "Training story", "Preview content"],
    ["I stopped guessing and started training with a real plan.", "Member story", "Preview content"],
  ];

  return (
    <>
      <div className="cursor" ref={pointer} />
      <div className="scroll-progress" aria-hidden="true"><span style={{ height: `${scrollProgress}%` }} /></div>
      <div className={loaded ? "preloader done" : "preloader"}>
        <div className="loader-brand"><Bolt /> POWER</div>
        <div className="loader-bottom">
          <span>Building pressure</span><strong>{String(progress).padStart(3, "0")}%</strong>
        </div>
        <div className="loader-line"><span style={{ width: `${progress}%` }} /></div>
      </div>

      <nav className={scrolled ? "nav scrolled" : "nav"}>
        <button className="brand" onClick={() => scrollTo("#top")} aria-label="Power Fitness home"><Bolt /><span>POWER<small>Fitness & Gym</small></span></button>
        <div className="nav-links">
          <button onClick={() => scrollTo("#programs")}>Programs</button>
          <button onClick={() => scrollTo("#about")}>Why us</button>
          <button onClick={() => scrollTo("#membership")}>Membership</button>
          <button onClick={() => scrollTo("#location")}>Location</button>
        </div>
        <button className="nav-cta" onClick={openTrial}>Free trial <Arrow /></button>
        <button className={menu ? "menu-button open" : "menu-button"} onClick={() => setMenu(!menu)} aria-label="Toggle menu"><span /><span /></button>
      </nav>

      <div className={menu ? "mobile-menu open" : "mobile-menu"}>
        <div>
          {["Programs", "Why us", "Membership", "Location"].map((item, index) => (
            <button key={item} style={{ transitionDelay: `${index * 60}ms` }} onClick={() => scrollTo(`#${item.toLowerCase().replace(" ", "-").replace("why-us", "about")}`)}>
              <span>0{index + 1}</span>{item}
            </button>
          ))}
        </div>
        <button className="button primary" onClick={openTrial}>Book free trial <Arrow /></button>
      </div>

      <main>
        <section className="hero" id="top">
          <img src={HERO} alt="Athlete preparing to lift in a dark gym" />
          <div className="hero-shade" />
          <div className="hero-glow" />
          <div className="hero-content">
            <div className="hero-kicker"><span>Madurai</span><span>9.9603° N</span></div>
            <h1><span>Power</span><span>Starts</span><span className="accent">Here.</span></h1>
            <div className="hero-bottom">
              <p>Serious training. Expert guidance.<br />A stronger you starts today.</p>
              <div className="hero-actions">
                <button className="button primary" onClick={openTrial}>Book a free trial <Arrow /></button>
                <button className="button text-button" onClick={() => scrollTo("#programs")}>Explore programs <Arrow down /></button>
              </div>
            </div>
          </div>
          <div className="scroll-cue"><span>Scroll to move</span><i /></div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div>{["Strength", "Conditioning", "Functional", "Personal training", "Strength", "Conditioning", "Functional", "Personal training"].map((word, i) => <span key={`${word}-${i}`}>{word}<b>✦</b></span>)}</div>
        </div>

        <section className="stats section-pad">
          {[["A new", "standard"], ["Train with", "purpose"], ["Built for", "Madurai"], ["Your pace.", "Your power."]].map(([big, small], i) => (
            <div className="stat reveal" style={{ transitionDelay: `${i * 70}ms` }} key={big}><strong>{big}</strong><span>{small}</span></div>
          ))}
          <small className="data-note">Brand statements shown for concept preview</small>
        </section>

        <section className="about section-pad" id="about">
          <div className="about-copy reveal">
            <span className="eyebrow"><i /> Built different</span>
            <h2>Not just a gym.<br />Your <em>powerhouse.</em></h2>
            <p>We believe better training begins with the right environment: focused coaching, quality equipment, and people who bring out your best.</p>
            <button className="text-link" onClick={() => scrollTo("#programs")}>Discover our approach <Arrow /></button>
          </div>
          <div className="about-image reveal">
            <img src="https://images.unsplash.com/photo-1734668485281-c1d03fee6023?auto=format&fit=crop&w=1400&q=85" alt="Athlete resting beside a barbell" />
            <div className="image-tag"><span>01</span> Focus<br />over noise</div>
          </div>
          <div className="vertical-word" aria-hidden="true">DISCIPLINE</div>
        </section>

        <section className="programs section-pad" id="programs">
          <div className="section-head reveal">
            <div><span className="eyebrow"><i /> Find your training</span><h2>Choose your<br /><em>challenge.</em></h2></div>
            <p>Different goals. One standard: train with intent and leave stronger than you arrived.</p>
          </div>
          <div className="program-grid">
            {programs.map((program, i) => (
              <article className="program-card reveal" style={{ transitionDelay: `${i * 80}ms` }} key={program.name}>
                <img src={PROGRAM_IMAGES[i]} alt={`${program.name} training`} />
                <div className="program-overlay" />
                <span className="program-no">{program.no}</span>
                <div className="program-info">
                  <h3>{program.name}</h3>
                  <p>{program.text}</p>
                  <button aria-label={`Learn about ${program.name}`}><Arrow /></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="transformation section-pad">
          <div className="section-head reveal">
            <div><span className="eyebrow"><i /> The difference</span><h2>Stronger is a<br /><em>state of mind.</em></h2></div>
            <p>Drag to explore the concept. Real member transformations will be added after client approval.</p>
          </div>
          <div className="compare reveal">
            <img className="compare-base" src="https://images.unsplash.com/photo-1683889842943-17e8eea3ac7c?auto=format&fit=crop&w=1800&q=84" alt="Athlete lifting a barbell" />
            <div className="after-grade" />
            <div className="compare-layer" style={{ width: `${compare}%` }}>
              <img src="https://images.unsplash.com/photo-1683889842943-17e8eea3ac7c?auto=format&fit=crop&w=1800&q=84&sat=-100" alt="" />
              <div className="before-grade" />
            </div>
            <span className="compare-label before"><b>Before</b> Unfocused</span><span className="compare-label after"><b>After</b> Power mode</span>
            <div className="compare-status"><span>Drag to transform</span><b>{compare}%</b></div>
            <div className="compare-line" style={{ left: `${compare}%` }}><i><span>↔</span></i></div>
            <input aria-label="Compare before and after" type="range" min="10" max="90" value={compare} onChange={(e) => setCompare(Number(e.target.value))} />
          </div>
        </section>

        <section className="membership section-pad" id="membership">
          <div className="section-head reveal">
            <div><span className="eyebrow"><i /> No excuses</span><h2>Invest in your<br /><em>strongest self.</em></h2></div>
            <div className="price-toggle"><button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Standard</button><button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Long-term</button></div>
          </div>
          <p className="placeholder-note reveal">Pricing is intentionally withheld until confirmed by Power Fitness & Gym.</p>
          <div className="pricing-grid">
            {pricing.map((plan, i) => (
              <article className={`price-card reveal ${i === 1 ? "featured" : ""}`} style={{ transitionDelay: `${i * 70}ms` }} key={plan.name}>
                {i === 1 && <span className="popular">Best momentum</span>}
                <span className="price-index">0{i + 1}</span>
                <h3>{plan.name}</h3><p>{plan.sub}</p>
                <div className="price"><strong>{annual ? "Custom" : "₹ ———"}</strong><span>/ confirmed on enquiry</span></div>
                <ul>{plan.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
                <button className={i === 1 ? "button primary full" : "button outline full"} onClick={openTrial}>Choose plan <Arrow /></button>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonial section-pad">
          <div className="quote-mark">“</div>
          <div className="quote-content reveal" key={quote}>
            <blockquote>{quotes[quote][0]}</blockquote>
            <div><strong>{quotes[quote][1]}</strong><span>{quotes[quote][2]}</span></div>
          </div>
          <div className="quote-controls">
            <button onClick={() => setQuote((quote + 2) % 3)} aria-label="Previous testimonial">←</button>
            <span>0{quote + 1} / 03</span>
            <button onClick={() => setQuote((quote + 1) % 3)} aria-label="Next testimonial">→</button>
          </div>
        </section>

        <section className="location section-pad" id="location">
          <div className="location-map reveal">
            <div className="map-grid" />
            <div className="road road-a" /><div className="road road-b" /><div className="road road-c" />
            <div className="pin"><span><Bolt /></span><i /></div>
            <span className="map-label one">Madurai</span><span className="map-label two">Power Fitness</span>
          </div>
          <div className="location-copy reveal">
            <span className="eyebrow"><i /> Find your power</span>
            <h2>Train local.<br /><em>Think bigger.</em></h2>
            <div className="address">
              <span>Location</span><p>Power Fitness & Gym<br />Madurai, Tamil Nadu</p>
            </div>
            <div className="address">
              <span>Hours</span><p>Contact the gym to confirm<br />today’s opening hours</p>
            </div>
            <a className="button primary" href="https://www.google.com/maps/search/?api=1&query=9.9603,78.1280" target="_blank" rel="noreferrer">Get directions <Arrow /></a>
          </div>
        </section>

        <section className="final-cta section-pad">
          <div className="outline-title" aria-hidden="true">POWER</div>
          <div className="reveal">
            <span className="eyebrow lime">Your move</span>
            <h2>Ready to feel<br /><em>the difference?</em></h2>
            <button className="button primary large" onClick={openTrial}>Book a free trial <Arrow /></button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="brand footer-brand"><Bolt /><span>POWER<small>Fitness & Gym</small></span></div>
        <div className="footer-links"><button onClick={() => scrollTo("#programs")}>Programs</button><button onClick={() => scrollTo("#membership")}>Membership</button><button onClick={() => scrollTo("#location")}>Location</button></div>
        <button className="back-top" onClick={() => scrollTo("#top")}>Back to top ↑</button>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Power Fitness & Gym</span><span>Concept website · Details subject to confirmation</span><span>Madurai, Tamil Nadu</span></div>
      </footer>

      <div className="mobile-actions"><a href="tel:">Call</a><a href="#location">Directions</a><button onClick={openTrial}>Free trial</button></div>
      {modal && <TrialModal onClose={() => setModal(false)} />}
    </>
  );
}
