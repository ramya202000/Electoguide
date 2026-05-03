import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className="text-gradient">ElectoGuide</span>
        </Link>
        <div className={styles.links}>
          <Link href="/timeline" className={styles.link}>Timeline</Link>
          <Link href="/flashcards" className={styles.link}>Flashcards</Link>
          <Link href="/chat" className={styles.link}>AI Assistant</Link>
        </div>
      </div>
    </nav>
  );
}
