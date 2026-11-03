import Link from "next/link";
import CategoryIcon from "@/components/customer/CategoryIcon";
import styles from "./page.module.css";

const exampleCategories = [
  {
    name: "Home Cleaning",
    slug: "cleaning",
    description: "An example category for household cleaning services.",
  },
  {
    name: "Plumbing",
    slug: "plumbing",
    description: "An example category for plumbing and water fixtures.",
  },
  {
    name: "Electrical Services",
    slug: "electrical",
    description: "An example category for electrical work and repairs.",
  },
  {
    name: "AC & Appliance Repair",
    slug: "ac-repair",
    description: "An example category for air conditioning and appliance help.",
  },
  {
    name: "Painting",
    slug: "painting",
    description: "An example category for interior and exterior painting.",
  },
  {
    name: "Tutoring",
    slug: "tutoring",
    description: "An example category for learning and tutoring support.",
  },
];

const icons = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  receipt: (
    <>
      <path d="M4 3v18l4-2 4 2 4-2 4 2V3l-4 2-4-2-4 2-4-2Z" />
      <path d="M8 9h8M8 13h6" />
    </>
  ),
  support: (
    <>
      <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 13h3v6H6a2 2 0 0 1-2-2v-4ZM20 13h-3v6h1a2 2 0 0 0 2-2v-4ZM12 21h2" />
    </>
  ),
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m5 12 4 4L19 6" />,
};

function Icon({ name, className }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name]}
    </svg>
  );
}

const steps = [
  {
    number: "01",
    icon: "search",
    title: "Explore services",
    description: "Browse service categories and compare the details that matter to you.",
  },
  {
    number: "02",
    icon: "person",
    title: "Choose a professional",
    description: "Review available provider profiles, service information, and customer feedback.",
  },
  {
    number: "03",
    icon: "calendar",
    title: "Book with ease",
    description: "Send a booking request and keep track of updates from your account.",
  },
];

const benefits = [
  {
    icon: "shield",
    title: "Provider information",
    description: "Review profile details and verification information where available.",
  },
  {
    icon: "search",
    title: "Convenient discovery",
    description: "Explore service categories and find details in one easy-to-browse place.",
  },
  {
    icon: "calendar",
    title: "Booking management",
    description: "Keep booking requests and service updates organized from your account.",
  },
  {
    icon: "receipt",
    title: "Payment options",
    description: "See the payment methods available for a service during its booking flow.",
  },
  {
    icon: "layers",
    title: "Clear service details",
    description: "Compare service descriptions, pricing, and terms shared by providers.",
  },
  {
    icon: "support",
    title: "Help when you need it",
    description: "Customer support and dispute assistance are being developed for the marketplace.",
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                Local services, made simpler
              </span>
              <h1 id="hero-heading">
                Find Experts.
                <br />
                <span>Book Smarter.</span>
              </h1>
              <p className={styles.heroDescription}>
                Discover trusted local service professionals, explore services, and book the help
                you need with serviQ.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/services">
                  Explore Services <Icon name="arrow" className={styles.buttonIcon} />
                </Link>
                <Link className={styles.secondaryButton} href="/register">
                  Join serviQ
                </Link>
              </div>
              <div className={styles.heroNote}>
                <span className={styles.noteCheck}><Icon name="check" /></span>
                Browse services and providers at your own pace
              </div>
            </div>

            <div className={styles.heroVisual} aria-hidden="true">
              <div className={styles.visualGlow} />
              <div className={styles.visualOrbit}>
                <div className={`${styles.floatingIcon} ${styles.floatingIconOne}`}>⌂</div>
                <div className={`${styles.floatingIcon} ${styles.floatingIconTwo}`}>✦</div>
                <div className={`${styles.floatingIcon} ${styles.floatingIconThree}`}>✓</div>
              </div>
              <div className={styles.searchCard}>
                <div className={styles.searchCardTop}>
                  <div>
                    <span className={styles.searchCardLabel}>YOUR NEXT TO-DO</span>
                    <strong>Find a local expert</strong>
                  </div>
                  <span className={styles.searchCardBadge}>serviQ</span>
                </div>
                <div className={styles.searchField}>
                  <Icon name="search" />
                  <span>What service do you need?</span>
                  <span className={styles.searchFieldArrow}>→</span>
                </div>
                <div className={styles.visualCategoryLabel}>Popular categories</div>
                <div className={styles.visualCategories}>
                  <span><i>⌂</i> Home</span>
                  <span><i>⚡</i> Electrical</span>
                  <span><i>✦</i> More</span>
                </div>
                <div className={styles.providerPreview}>
                  <div className={styles.providerAvatar}>S</div>
                  <div className={styles.providerPreviewText}>
                    <strong>Local professionals</strong>
                    <span>Explore options that fit your needs</span>
                  </div>
                  <span className={styles.providerPreviewMark}>✓</span>
                </div>
              </div>
              <div className={styles.visualCaption}>
                <span className={styles.captionIcon}>✦</span>
                A simpler way to get things done
              </div>
            </div>
          </div>
          <div className={styles.heroBottomRule} />
        </section>

        <section className={styles.section} id="services" aria-labelledby="services-heading">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <span className={styles.sectionEyebrow}>Sample service categories</span>
              <h2 id="services-heading">Explore popular services</h2>
              <p>
                These examples are for illustration. Visit the catalogue to see categories and
                services currently available.
              </p>
            </div>

            <div className={styles.categoryGrid}>
              {exampleCategories.map((category) => (
                <Link className={styles.categoryCard} href="/categories" key={category.slug}>
                  <span className={styles.categoryIcon}>
                    {category.slug === "tutoring" ? (
                      <span aria-hidden="true">📚</span>
                    ) : (
                      <CategoryIcon category={category} />
                    )}
                  </span>
                  <span className={styles.categoryTitle}>{category.name}</span>
                  <span className={styles.categoryDescription}>{category.description}</span>
                  <span className={styles.categoryArrow} aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>

            <div className={styles.sectionLinkWrap}>
              <Link className={styles.textLink} href="/categories">
                View all categories <Icon name="arrow" className={styles.textLinkIcon} />
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.howSection} id="how-it-works" aria-labelledby="how-heading">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <span className={styles.sectionEyebrow}>Simple from start to finish</span>
              <h2 id="how-heading">How serviQ works</h2>
              <p>Three straightforward steps bring you closer to the help you need.</p>
            </div>
            <div className={styles.stepsGrid}>
              {steps.map((step) => (
                <article className={styles.stepCard} key={step.number}>
                  <div className={styles.stepTop}>
                    <span className={styles.stepIcon}><Icon name={step.icon} /></span>
                    <span className={styles.stepNumber}>{step.number}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="benefits-heading">
          <div className={styles.sectionInner}>
            <div className={styles.benefitsLayout}>
              <div className={styles.benefitsIntro}>
                <span className={styles.sectionEyebrow}>A more considered way to book</span>
                <h2 id="benefits-heading">Made around the way you need help.</h2>
                <p>
                  serviQ brings service discovery and booking tools together, with clear details
                  to help you make informed choices.
                </p>
                <Link className={styles.textLink} href="/services">
                  Explore the marketplace <Icon name="arrow" className={styles.textLinkIcon} />
                </Link>
              </div>
              <div className={styles.benefitsGrid}>
                {benefits.map((benefit) => (
                  <article className={styles.benefitCard} key={benefit.title}>
                    <span className={styles.benefitIcon}><Icon name={benefit.icon} /></span>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.providerSection} id="providers" aria-labelledby="provider-heading">
          <div className={styles.providerSectionInner}>
            <div className={styles.providerAccent} aria-hidden="true">✦</div>
            <div className={styles.providerCopy}>
              <span className={styles.providerEyebrow}>For skilled professionals</span>
              <h2 id="provider-heading">Grow Your Business with serviQ</h2>
              <p>
                Join serviQ and connect your professional skills with customers looking for local
                services.
              </p>
            </div>
            <Link className={styles.providerButton} href="/register">
              Become a Provider <Icon name="arrow" className={styles.buttonIcon} />
            </Link>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="final-cta-heading">
          <div className={styles.finalCtaInner}>
            <div>
              <span className={styles.sectionEyebrow}>Your next step starts here</span>
              <h2 id="final-cta-heading">Ready to Get Started?</h2>
              <p>Discover local services or create an account to get more from serviQ.</p>
            </div>
            <div className={styles.finalCtaActions}>
              <Link className={styles.primaryButton} href="/register">Create an Account</Link>
              <Link className={styles.secondaryButton} href="/login">Sign In</Link>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}