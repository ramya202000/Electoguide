'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

/**
 * Interface for sidebar navigation items.
 */
interface NavItem {
  href: string;
  label: string;
  icon: string;
  description: string;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: '🏠', description: 'Home overview' },
  { href: '/timeline', label: 'Timeline', icon: '🗺️', description: 'Voting process steps' },
  { href: '/flashcards', label: 'Flashcards', icon: '🎴', description: 'Learn key terms' },
  { href: '/chat', label: 'AI Assistant', icon: '🤖', description: 'Ask questions' },
];

/**
 * Sidebar Navigation Component
 * Provides a persistent sidebar menu for dashboard-style navigation.
 * Implements full keyboard accessibility and ARIA roles.
 * @returns {JSX.Element} The sidebar navigation element.
 */
export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  /**
   * Toggles the collapsed state of the sidebar.
   */
  const toggleCollapse = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  return (
    <aside
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}
      aria-label="Main Navigation Sidebar"
    >
      <div className={styles.logoArea}>
        <Link href="/" className={styles.logo} aria-label="ElectoGuide Home">
          <span className={styles.logoIcon}>🗳️</span>
          {!collapsed && <span className="text-gradient">ElectoGuide</span>}
        </Link>
        <button
          className={styles.collapseBtn}
          onClick={toggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className={styles.nav} role="navigation">
        <ul className={styles.navList} role="menubar" aria-orientation="vertical">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  title={item.description}
                >
                  <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                  {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.footer}>
        {!collapsed && (
          <div className={styles.footerInfo}>
            <p className={styles.footerLabel}>Powered by</p>
            <p className={styles.footerBrand}>Google Gemini AI</p>
          </div>
        )}
      </div>
    </aside>
  );
}
