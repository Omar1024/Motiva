'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          background: 'linear-gradient(225deg, #06070e, #29524a, #94a187)'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '500px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '2rem',
            borderRadius: '1rem',
            color: 'white'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️ Critical Error</h2>
            <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
              {error.message || 'Something went wrong. Please try refreshing the page.'}
            </p>
            <button
              onClick={reset}
              style={{
                background: '#006494',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}


