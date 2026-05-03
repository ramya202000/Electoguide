import Link from "next/link";
import styles from "./page.module.css";

/**
 * Dashboard Landing Page Component
 * Provides an overview of ElectoGuide features with quick-access cards.
 * Implements semantic HTML and accessible link structures.
 * @returns {JSX.Element} The rendered dashboard home page.
 */
export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.glow} aria-hidden="true"></div>

      <section className={styles.hero}>
        <h1 className={styles.title}>
          Democracy, <span className="text-gradient">Simplified.</span>
        </h1>
        <p className={styles.subtitle}>
          Navigate the election process with confidence. Learn about key
          concepts, track important milestones, and get real-time answers from
          our AI assistant.
        </p>

        <div className={styles.actions}>
          <Link href="/timeline" className={styles.primaryButton}>
            Get Started
          </Link>
          <Link href="/chat" className={styles.secondaryButton}>
            Ask AI Assistant
          </Link>
        </div>

        <div className={styles.featuresGrid}>
          <Link
            href="/timeline"
            className={`glass-panel ${styles.featureCard}`}
            aria-label="Navigate to Interactive Timeline"
          >
            <div className={styles.featureIcon} aria-hidden="true">
              🗺️
            </div>
            <h2 className={styles.featureTitle}>Interactive Timeline</h2>
            <p className={styles.featureDesc}>
              Follow a personalized visual map of the voting process, from
              registration to casting your ballot.
            </p>
          </Link>

          <Link
            href="/flashcards"
            className={`glass-panel ${styles.featureCard}`}
            aria-label="Navigate to Election Flashcards"
          >
            <div className={styles.featureIcon} aria-hidden="true">
              🎴
            </div>
            <h2 className={styles.featureTitle}>AI Flashcards</h2>
            <p className={styles.featureDesc}>
              Master the terminology with AI-powered flashcard generation.
              Learn about the Electoral College, swing states, and more.
            </p>
          </Link>

          <Link
            href="/chat"
            className={`glass-panel ${styles.featureCard}`}
            aria-label="Navigate to AI Guidance Chat"
          >
            <div className={styles.featureIcon} aria-hidden="true">
              🤖
            </div>
            <h2 className={styles.featureTitle}>AI Guidance</h2>
            <p className={styles.featureDesc}>
              Have a question? Our Gemini-powered chatbot is ready to help you
              with 24/7 non-partisan voting information.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
