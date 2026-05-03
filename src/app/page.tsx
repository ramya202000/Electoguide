import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.glow}></div>
      
      <main className={styles.hero}>
        <h1 className={styles.title}>
          Democracy, <span className="text-gradient">Simplified.</span>
        </h1>
        <p className={styles.subtitle}>
          Navigate the election process with confidence. Learn about key concepts, 
          track important milestones, and get real-time answers from our AI assistant.
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
          <Link href="/timeline" className={`glass-panel ${styles.featureCard}`}>
            <div className={styles.featureIcon}>🗺️</div>
            <h2 className={styles.featureTitle}>Interactive Timeline</h2>
            <p className={styles.featureDesc}>
              Follow a personalized visual map of the voting process, from registration to casting your ballot.
            </p>
          </Link>

          <Link href="/flashcards" className={`glass-panel ${styles.featureCard}`}>
            <div className={styles.featureIcon}>🎴</div>
            <h2 className={styles.featureTitle}>Election Flashcards</h2>
            <p className={styles.featureDesc}>
              Master the terminology. Learn about the Electoral College, swing states, and more with interactive cards.
            </p>
          </Link>

          <Link href="/chat" className={`glass-panel ${styles.featureCard}`}>
            <div className={styles.featureIcon}>🤖</div>
            <h2 className={styles.featureTitle}>AI Guidance</h2>
            <p className={styles.featureDesc}>
              Have a question? Our intelligent chatbot is ready to help you with 24/7 non-partisan voting information.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
