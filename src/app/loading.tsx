/**
 * Global Loading UI Component
 * Provides a visual loading skeleton during page transitions via React Suspense.
 * @returns {JSX.Element} The loading spinner interface.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading content"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '1.5rem',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '4px solid var(--glass-border)',
          borderTopColor: 'var(--accent-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
        Loading...
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
