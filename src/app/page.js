import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      {/* Header & Navbar */}
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          servi<span>Q</span>
        </Link>

        <nav className={styles.navLinks}>
          <Link href="/services" className={styles.navLink}>
            Services
          </Link>
          <Link href="/services/compare" className={styles.navLink}>
            Compare
          </Link>
          <Link href="/customer/dashboard" className={styles.navLink}>
            Customer Portal
          </Link>
          <Link href="/provider/dashboard" className={styles.navLink}>
            Provider Portal
          </Link>
          <Link href="/admin/dashboard" className={styles.navLink}>
            Admin
          </Link>
        </nav>

        <div className={styles.navActions}>
          <Link href="/login" className={styles.loginBtn}>
            Login
          </Link>
          <Link href="/register" className={styles.createAccountBtn}>
            Create Account
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.welcomeBadge}>
          WELCOME TO THE DEVELOPMENT WORKSPACE
        </div>

        <Image
          src="/images/serviq-logo.png"
          alt="serviQ Official Logo"
          width={1200}
          height={500}
          className={styles.logo}
          priority
        />

        <h1>
          Welcome to <span>serviQ</span>
        </h1>

        <p className={styles.description}>
          Welcome to the official serviQ development environment. Together,
          we&apos;re building an AI-powered marketplace that connects customers
          with trusted local service professionals.
        </p>

        {/* Hero Quick Actions */}
        <div className={styles.heroActions}>
          <Link href="/register" className={styles.primaryBtn}>
            Create Account →
          </Link>
          <Link href="/login" className={styles.secondaryBtn}>
            Login to Account
          </Link>
          <Link href="/services" className={styles.outlineBtn}>
            Explore Services 🔍
          </Link>
        </div>

        <div className={styles.status}>
          <span className={styles.statusDot}></span>
          Frontend Running Successfully
        </div>
      </section>

      {/* Platform Portals Section */}
      <section className={styles.portalsSection}>
        <div className={styles.sectionTitle}>
          <span>APPLICATION PORTALS</span>
          <h2>Explore ServiQ Features</h2>
        </div>

        <div className={styles.portalGrid}>
          <Link href="/customer/dashboard" className={styles.portalCard}>
            <div className={styles.portalIcon}>👤</div>
            <h3>Customer Portal</h3>
            <p>
              Browse verified local service professionals, schedule bookings,
              pay via escrow protection, and track live status.
            </p>
            <span>Open Customer Portal →</span>
          </Link>

          <Link href="/provider/dashboard" className={styles.portalCard}>
            <div className={styles.portalIcon}>🛠️</div>
            <h3>Service Provider Portal</h3>
            <p>
              Manage booking requests, set real-time calendar availability,
              monitor verified earnings, and withdraw payouts.
            </p>
            <span>Open Provider Portal →</span>
          </Link>

          <Link href="/admin/dashboard" className={styles.portalCard}>
            <div className={styles.portalIcon}>⚙️</div>
            <h3>Admin Management</h3>
            <p>
              Monitor platform operations, configure commission rules, audit
              escrow payments, and resolve dispute tickets.
            </p>
            <span>Open Admin Dashboard →</span>
          </Link>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.sectionTitle}>
          <span>POPULAR SERVICES</span>
          <h2>Book Verified Local Professionals</h2>
        </div>

        <div className={styles.cards}>
          <Link href="/services?category=Electrical" className={styles.card}>
            <div className={styles.serviceIcon}>⚡</div>
            <h3>Electrical & Wiring</h3>
            <p>
              Short circuits, switchboard repairs, ceiling fans, power tripping,
              and complete domestic rewiring.
            </p>
            <div className={styles.cardFooter}>
              <span className={styles.rateTag}>From LKR 2,500</span>
              <span className={styles.cardLink}>Explore Electrical ↗</span>
            </div>
          </Link>

          <Link href="/services?category=Air+Conditioning" className={styles.card}>
            <div className={styles.serviceIcon}>❄️</div>
            <h3>Air Conditioning & HVAC</h3>
            <p>
              Inverter split AC servicing, chemical washes, gas leak detection,
              and compressor diagnostics.
            </p>
            <div className={styles.cardFooter}>
              <span className={styles.rateTag}>From LKR 3,500</span>
              <span className={styles.cardLink}>Explore AC ↗</span>
            </div>
          </Link>

          <Link href="/services?category=Plumbing" className={styles.card}>
            <div className={styles.serviceIcon}>🚰</div>
            <h3>Plumbing & Sanitation</h3>
            <p>
              Pipe leak repairs, water pressure pumps, bathroom fittings,
              unclogging, and overhead tank care.
            </p>
            <div className={styles.cardFooter}>
              <span className={styles.rateTag}>From LKR 2,000</span>
              <span className={styles.cardLink}>Explore Plumbing ↗</span>
            </div>
          </Link>

          <Link href="/services?category=Cleaning" className={styles.card}>
            <div className={styles.serviceIcon}>🧹</div>
            <h3>Deep Cleaning & Janitorial</h3>
            <p>
              Full house deep cleaning, sofa and mattress shampooing, kitchen
              degreasing, and sanitization.
            </p>
            <div className={styles.cardFooter}>
              <span className={styles.rateTag}>From LKR 4,000</span>
              <span className={styles.cardLink}>Explore Cleaning ↗</span>
            </div>
          </Link>

          <Link href="/services?category=Carpentry" className={styles.card}>
            <div className={styles.serviceIcon}>🔨</div>
            <h3>Carpentry & Woodwork</h3>
            <p>
              Custom furniture repairs, door lock fitting, window frame
              maintenance, and cabinetry fixes.
            </p>
            <div className={styles.cardFooter}>
              <span className={styles.rateTag}>From LKR 2,800</span>
              <span className={styles.cardLink}>Explore Carpentry ↗</span>
            </div>
          </Link>

          <Link href="/services?category=Appliance+Repair" className={styles.card}>
            <div className={styles.serviceIcon}>🔌</div>
            <h3>Home Appliances Repair</h3>
            <p>
              Washing machines, refrigerators, microwaves, induction cookers,
              and domestic electronics repairs.
            </p>
            <div className={styles.cardFooter}>
              <span className={styles.rateTag}>From LKR 2,200</span>
              <span className={styles.cardLink}>Explore Appliances ↗</span>
            </div>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <div className={styles.sectionTitle}>
          <span>HOW IT WORKS</span>
          <h2>Simple, Secure & Transparent</h2>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.stepBadge}>01</div>
            <h3>Browse & Choose Service</h3>
            <p>
              Select your required service category or compare verified
              professionals by ratings, transparent pricing, and real customer
              reviews.
            </p>
            <span className={styles.stepHighlight}>Instant Availability</span>
          </div>

          <div className={styles.card}>
            <div className={styles.stepBadge}>02</div>
            <h3>Book with Escrow Protection</h3>
            <p>
              Schedule a convenient appointment slot. Your payment is held safely
              in escrow and is never released until the job is approved.
            </p>
            <span className={styles.stepHighlight}>100% Payment Security</span>
          </div>

          <div className={styles.card}>
            <div className={styles.stepBadge}>03</div>
            <h3>Job Done & Release Payment</h3>
            <p>
              The verified expert completes the job. Inspect the finished work,
              release funds with your review, or request free rework.
            </p>
            <span className={styles.stepHighlight}>Satisfaction Guaranteed</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} serviQ</p>
        <p>Gamage Recruiters — Team 407</p>
      </footer>
    </main>
  );
}
