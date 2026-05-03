'use client';

/**
 * Global Error Boundary Component
 * Catches unhandled runtime errors and displays a user-friendly recovery UI.
 * Implements accessibility best practices with semantic HTML and ARIA roles.
 * @param {object} props - Contains the error object and a reset function.
 * @returns {JSX.Element} The error recovery interface.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      role="alert"
      aria-live="assertive"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Something went <span className="text-gradient">wrong</span>
      </h1>
      <p
        style={{
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          maxWidth: '500px',
        }}
      >
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <button
        onClick={reset}
        aria-label="Try again"
        style={{
          padding: '0.75rem 2rem',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          color: 'white',
          fontSize: '1rem',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Try Again
      </button>
    </main>
  );
}
