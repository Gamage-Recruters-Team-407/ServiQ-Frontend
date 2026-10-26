
import Image from "next/image";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          servi<span>Q</span>
        </div>

        <div className={styles.teamBadge}>
          TEAM 407
        </div>
      </header>

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
          Welcome to the official serviQ development
          environment. Together, we're building an
          AI-powered marketplace that connects customers
          with trusted local service professionals.
        </p>

        <div className={styles.status}>
          <span className={styles.statusDot}></span>
          Frontend Running Successfully
        </div>
      </section>

      <section className={styles.resources}>
        <div className={styles.sectionTitle}>
          <span>DEVELOPER RESOURCES</span>
          <h2>Let's Build Something Great Together</h2>
        </div>

        <div className={styles.cards}>
          <a
            className={styles.card}
            href="https://github.com/Gamage-Recruters-Team-407/ServiQ-Frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.cardIcon}>01</div>
            <h3>Frontend Repository</h3>
            <p>
              Explore the Next.js project structure,
              components, and development resources.
            </p>
            <span>Explore Repository ↗</span>
          </a>

          <a
            className={styles.card}
            href="https://github.com/Gamage-Recruters-Team-407/ServiQ-Backend"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.cardIcon}>02</div>
            <h3>Backend Repository</h3>
            <p>
              Explore the Node.js backend structure,
              REST APIs, and MongoDB integration.
            </p>
            <span>Explore Repository ↗</span>
          </a>

          <a
            className={styles.card}
            href="https://github.com/orgs/Gamage-Recruters-Team-407"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.cardIcon}>03</div>
            <h3>Team Collaboration</h3>
            <p>
              Collaborate with your teammates,
              manage branches, and submit pull requests.
            </p>
            <span>View Organization ↗</span>
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} serviQ</p>
        <p>Gamage Recruiters — Team 407</p>
      </footer>
    </main>
  );
}
