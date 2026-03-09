import React, { useEffect, useState } from "react";
import "../css/HomePage.css";

function HomePage({ setCurrentPage }) {
  const [fontSize, setFontSize] = useState(18);
  const [highContrast, setHighContrast] = useState(false);
  const [boldText, setBoldText] = useState(false);
  const [quakes, setQuakes] = useState({
    loading: true,
    error: false,
    events: [],
  });

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
    return () => {
      document.body.style.fontSize = "";
    };
  }, [fontSize]);

  useEffect(() => {
    const cls = "high-contrast";
    document.body.classList.toggle(cls, highContrast);
    return () => document.body.classList.remove(cls);
  }, [highContrast]);

  useEffect(() => {
    const cls = "bold-text";
    document.body.classList.toggle(cls, boldText);
    return () => document.body.classList.remove(cls);
  }, [boldText]);

  useEffect(() => {
    const sections = document.querySelectorAll(".home-page .animate-section");

    if (!("IntersectionObserver" in window)) {
      sections.forEach((s) => s.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const url =
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const events = (data.features || []).slice(0, 5);
        setQuakes({
          loading: false,
          error: false,
          events,
        });
      })
      .catch(() => {
        setQuakes({
          loading: false,
          error: true,
          events: [],
        });
      });
  }, []);

  const isLarger = fontSize > 18;
  const isSmaller = fontSize < 18;

  const handleIncreaseFont = () => {
    if (fontSize < 22) setFontSize((prev) => prev + 2);
  };

  const handleDecreaseFont = () => {
    if (fontSize > 16) setFontSize((prev) => prev - 2);
  };

  return (
    <div className="home-page">
      <main className="page">
        <section
          id="home"
          className="hero animate-section"
          aria-label="Earthquake response overview"
        >
          <div className="hero-main">
            <div className="eyebrow">Home · Welcome</div>
            <h1>Earthquake Response &amp; Support, Right Now</h1>
            <p className="lead">
              This page brings together recent earthquake updates, safe ways to
              help, and practical guidance for you and your community.
            </p>

            <div className="hero-meta">
              <span className="tag">
                SDG 11 · Sustainable Cities &amp; Communities
              </span>
              <span className="tag">Recent earthquakes</span>
              <span className="tag">Disaster response</span>
            </div>

            <p>
              Whether you are directly affected, supporting loved ones, or
              looking for trusted ways to donate or volunteer, you are in the
              right place. Information here is kept short, clear, and easy to
              scan.
            </p>

            <div className="btn-row" aria-label="Primary calls to action">
              <a className="btn btn-primary" href="#crisis-support">
                Get help now
              </a>
              <a className="btn btn-outline" href="#take-action">
                Volunteer &amp; donate
              </a>
              {setCurrentPage && (
                <>
                  <button
                    className="btn btn-outline"
                    type="button"
                    onClick={() => setCurrentPage("login")}
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-outline"
                    type="button"
                    onClick={() => setCurrentPage("signup")}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            <div className="btn-row" style={{ marginTop: "1rem" }}>
              <button
                className="btn btn-outline"
                type="button"
                aria-pressed={isSmaller ? "true" : "false"}
                onClick={handleDecreaseFont}
              >
                A−
              </button>
              <button
                className="btn btn-outline"
                type="button"
                aria-pressed={isLarger ? "true" : "false"}
                onClick={handleIncreaseFont}
              >
                A+
              </button>
              <button
                className="btn btn-outline"
                type="button"
                aria-pressed={highContrast ? "true" : "false"}
                onClick={() => setHighContrast((v) => !v)}
              >
                High contrast
              </button>
              <button
                className="btn btn-outline"
                type="button"
                aria-pressed={boldText ? "true" : "false"}
                onClick={() => setBoldText((v) => !v)}
              >
                Bold
              </button>
            </div>
          </div>

          <aside className="hero-aside">
            <div>
              <h2>Recent Earthquakes</h2>
              <p>
                Global earthquake activity is continuous. Use the live map and
                official feeds below to check recent events and local guidance.
              </p>
            </div>

            <div className="hero-aside-img" aria-hidden="true">
              <img
                src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=900&q=80"
                alt="Volunteers distributing emergency supplies after an earthquake"
              />
            </div>

            <div className="btn-row">
              <a
                className="btn btn-outline"
                href="https://earthquake.usgs.gov/earthquakes/map"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live earthquake map
              </a>
              <a
                className="btn btn-outline"
                href="https://earthquake.usgs.gov/earthquakes/feed/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Real-time USGS feed
              </a>
            </div>

            <p className="muted">
              For immediate danger, always follow instructions from your local
              emergency services and authorities.
            </p>
          </aside>
        </section>

        <section
          id="resources"
          className="animate-section"
          aria-label="Sustainable cities and earthquake resilience"
        >
          <div className="card">
            <div className="card-header-inline">
              <div>
                <div className="eyebrow">Why this matters</div>
                <h2>SDG 11: Safer, More Resilient Cities</h2>
              </div>
              <span className="pill">SDG 11</span>
            </div>

            <p>
              Sustainable Development Goal 11 focuses on making cities
              inclusive, safe, resilient, and sustainable. Earthquakes test how
              well our homes, schools, hospitals, and transport systems can
              protect people.
            </p>

            <ul>
              <li>Strengthening buildings and infrastructure in high-risk areas.</li>
              <li>Planning safe public spaces and evacuation routes.</li>
              <li>Investing in early-warning systems and community drills.</li>
              <li>
                Protecting vulnerable groups: children, older adults, and people
                with disabilities.
              </li>
            </ul>

            <div className="tip" role="note">
              <strong>Quick tip</strong>
              Ask your local school, workplace, or community centre if they have
              an earthquake plan. If not, you can help start one.
            </div>
          </div>
        </section>

        <section
          className="animate-section"
          aria-label="Live disaster news and recent earthquakes"
        >
          <div className="card-grid card-grid--two">
            <div className="card">
              <div className="card-header-inline">
                <div>
                  <div className="eyebrow">Live disaster news</div>
                  <h2>Earthquake Updates</h2>
                </div>
                <span className="pill">Live</span>
              </div>

              <p>
                For the most up-to-date information on global earthquakes, use
                official real-time services:
              </p>

              <ul>
                <li>
                  <a
                    href="https://earthquake.usgs.gov/earthquakes/map"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    USGS Latest Earthquakes – interactive global map
                  </a>
                </li>
                <li>
                  <a
                    href="https://earthquake.usgs.gov/earthquakes/feed/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    USGS real-time feeds (RSS / ATOM / APIs)
                  </a>
                </li>
                <li>
                  <a
                    href="https://hub.arcgis.com/maps/9e2f2b544c954fda9cd13b7f3e6eebce"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PAGER: Recent Earthquakes Impact (ArcGIS)
                  </a>
                </li>
              </ul>

              <h3>Latest Global Earthquakes (M4.5+ last 24h)</h3>
              <div id="quake-feed" className="quake-feed muted">
                {quakes.loading && "Loading latest earthquake data…"}
                {quakes.error &&
                  "Unable to load live earthquake data right now. You can use the USGS map link above instead."}
                {!quakes.loading &&
                  !quakes.error &&
                  quakes.events.length === 0 &&
                  "No recent earthquakes (M4.5+) reported in the last 24 hours."}

                {!quakes.loading &&
                  !quakes.error &&
                  quakes.events.length > 0 && (
                    <ul className="quake-list">
                      {quakes.events.map((ev) => {
                        const props = ev.properties || {};
                        const magnitude =
                          props.mag != null ? props.mag.toFixed(1) : "?";
                        const place = props.place || "Location unavailable";
                        const time = props.time ? new Date(props.time) : null;
                        const url = props.url || "#";

                        const timeText = time
                          ? time.toLocaleString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Time not available";

                        return (
                          <li className="quake-item" key={ev.id}>
                            <div className="quake-main">
                              <span className="quake-place">{place}</span>
                              <span className="quake-mag">M {magnitude}</span>
                            </div>
                            <div className="quake-meta">
                              {timeText} ·{" "}
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                More details
                              </a>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
              </div>

              <p className="muted" style={{ marginTop: "0.6rem" }}>
                Live data is provided by the USGS public API. Times are shown in
                your local timezone.
              </p>
            </div>

            <div className="card">
              <div className="card-header-inline">
                <div>
                  <div className="eyebrow">In the news</div>
                  <h2>Recent Significant Earthquakes</h2>
                </div>
                <span className="pill">Selected</span>
              </div>

              <ul className="articles-list">
                <li>
                  <a
                    className="title"
                    href="https://warchild.ca/afghanistan-earthquake/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    2025 Northern Afghanistan earthquake response
                  </a>
                  <div className="article-meta">
                    Humanitarian organisations are providing emergency shelter,
                    winter supplies, and protection for children.
                  </div>
                </li>
                <li>
                  <a
                    className="title"
                    href="https://www.unicef.org.uk/donate/myanmar-earthquake-appeal/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Myanmar earthquake appeal for children
                  </a>
                  <div className="article-meta">
                    Ongoing support for families affected by major earthquakes,
                    with a focus on water, health, and education.
                  </div>
                </li>
                <li>
                  <a
                    className="title"
                    href="https://reliefweb.int/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ReliefWeb – latest global disaster reports
                  </a>
                  <div className="article-meta">
                    UN-hosted platform compiling situation reports and response
                    plans for earthquakes and other crises.
                  </div>
                </li>
              </ul>

              <div className="tip" role="note">
                <strong>Verify</strong>
                When you see earthquake news on social media, cross-check it with
                official feeds or trusted newsrooms before sharing.
              </div>
            </div>
          </div>
        </section>

        <section
          id="crisis-support"
          className="animate-section"
          aria-label="Getting help after an earthquake"
        >
          <div className="card">
            <div className="card-header-inline">
              <div>
                <div className="eyebrow">Getting help</div>
                <h2>If You’ve Been Affected</h2>
              </div>
              <span className="pill">Support</span>
            </div>

            <p>
              If you are in an area impacted by a recent earthquake, your first
              step is to follow local emergency instructions. The links below
              connect you to organisations that coordinate shelter, food, and
              medical aid.
            </p>

            <ul>
              <li>
                Contact your local emergency number and civil protection authority
                for evacuation and shelter updates.
              </li>
              <li>
                Reach out to your national Red Cross or Red Crescent society for
                local services and family-linking support.
              </li>
              <li>
                Check your city or regional government website for “emergency
                shelters” or “disaster assistance”.
              </li>
            </ul>

            <h3>Global organisations that support shelter &amp; relief</h3>
            <ul>
              <li>
                <a
                  href="https://www.ifrc.org/appeals"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IFRC Emergency Appeals – Red Cross / Red Crescent
                </a>
              </li>
              <li>
                <a
                  href="https://shelterbox.org/where-we-work/afghanistan-earthquake/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ShelterBox – emergency shelter after earthquakes
                </a>
              </li>
              <li>
                <a
                  href="https://crisisrelief.un.org/en/donate-afghanistan-crisis"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UN Crisis Relief – earthquake-affected communities
                </a>
              </li>
            </ul>

            <div className="tip" role="note">
              <strong>Documents</strong>
              If it is safe, keep ID, medicines, and essential documents in a
              small grab-bag. This can speed up access to assistance and temporary
              housing.
            </div>
          </div>
        </section>

        <section
          id="take-action"
          className="animate-section"
          aria-label="How you can help"
        >
          <div className="card-grid card-grid--two">
            <div className="card">
              <div className="card-header-inline">
                <div>
                  <div className="eyebrow">What you can do</div>
                  <h2>Donate Safely</h2>
                </div>
                <span className="pill">Give</span>
              </div>

              <p>
                Financial support lets trained teams buy exactly what is needed
                close to affected communities, reducing delays and waste.
              </p>

              <ul>
                <li>
                  <a
                    href="https://crisisrelief.un.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    UN Crisis Relief – global emergency fund
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ifrc.org/donate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    International Federation of Red Cross and Red Crescent (IFRC)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.unicef.org.uk/donate/donate-and-help-protect-children-in-afghanistan/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    UNICEF – Afghanistan earthquake appeal
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.unicef.org.uk/donate/myanmar-earthquake-appeal/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    UNICEF – Myanmar earthquake appeal
                  </a>
                </li>
              </ul>

              <p className="muted">
                Whenever possible, donate via official websites rather than links
                shared in private messages.
              </p>
            </div>

            <div className="card">
              <div className="card-header-inline">
                <div>
                  <div className="eyebrow">What you can do</div>
                  <h2>Volunteer &amp; Community Action</h2>
                </div>
                <span className="pill">Act</span>
              </div>

              <p>
                Volunteering and local organising are essential for resilient, SDG
                11-aligned communities.
              </p>

              <ul>
                <li>
                  Join or start a local community emergency response or
                  neighbourhood support group.
                </li>
                <li>
                  Take part in first aid, search-and-rescue, or psychological
                  first aid training.
                </li>
                <li>
                  Help translate official information into local languages or
                  accessible formats.
                </li>
                <li>
                  Support data entry, logistics, or hotlines for recognised
                  organisations.
                </li>
              </ul>

              <div className="tip" role="note">
                <strong>Safety first</strong>
                Only volunteer through organisations that provide training,
                insurance, and clear roles. Never enter damaged buildings unless
                you are specifically trained and authorised.
              </div>
            </div>
          </div>
        </section>

        <section
          id="community"
          className="animate-section"
          aria-label="Community resilience and mental health"
        >
          <div className="card-grid">
            <div className="card">
              <div className="card-header-inline">
                <div>
                  <div className="eyebrow">Community</div>
                  <h2>Supporting Each Other</h2>
                </div>
                <span className="pill">Well-being</span>
              </div>

              <p>
                Earthquakes can be frightening and disorienting. Emotional support
                is just as important as physical safety.
              </p>

              <ul>
                <li>
                  Check in regularly with neighbours, especially older adults and
                  people living alone.
                </li>
                <li>
                  Share verified information calmly; avoid spreading rumours or
                  graphic content.
                </li>
                <li>
                  Encourage children to ask questions and answer honestly in
                  age-appropriate language.
                </li>
                <li>
                  Seek professional mental health support if distress lasts more
                  than a few weeks or interferes with daily life.
                </li>
              </ul>

              <p className="muted">
                If you or someone you know is in immediate danger or at risk of
                harming themselves, contact local emergency services or crisis
                hotlines right away.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;