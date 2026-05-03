import Link from 'next/link';
import styles from './Navigation.module.css';

/**
 * Global Navigation Component
 * Provides routing across the ElectoGuide platform.
 * Includes ARIA labels for accessibility compliance.
 * @returns {JSX.Element} The sticky navigation bar.
 */
export default function Navigation() {
  return (
    <nav className={styles.navbar} aria-label="Main Navigation">
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="ElectoGuide Home">
          <span className="text-gradient">ElectoGuide</span>
        </Link>
        <div className={styles.links} role="menubar">
          <Link href="/timeline" className={styles.link} role="menuitem">Timeline</Link>
          <Link href="/flashcards" className={styles.link} role="menuitem">Flashcards</Link>
          <Link href="/chat" className={styles.link} role="menuitem">AI Assistant</Link>
        </div>
      </div>
    </nav>
  );
}
