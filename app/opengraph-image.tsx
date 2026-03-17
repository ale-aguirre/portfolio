import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Alexis Aguirre — Frontend Engineer / AI Builder'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#070709',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Tech grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,217,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '500px',
            height: '200px',
            background: 'radial-gradient(ellipse, rgba(0,217,255,0.06) 0%, transparent 70%)',
          }}
        />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Name */}
          <div
            style={{
              fontSize: 128,
              fontWeight: 800,
              color: '#f0f0f4',
              lineHeight: 0.88,
              letterSpacing: '-4px',
              textTransform: 'uppercase',
            }}
          >
            ALEXIS
          </div>
          <div
            style={{
              fontSize: 128,
              fontWeight: 800,
              color: 'transparent',
              lineHeight: 0.88,
              letterSpacing: '-4px',
              textTransform: 'uppercase',
              WebkitTextStroke: '2px #3f3f46',
            }}
          >
            AGUIRRE
          </div>

          {/* Divider line */}
          <div
            style={{
              height: '1px',
              width: '100%',
              background: 'linear-gradient(90deg, #00d9ff 0%, #3f3f46 35%, transparent 100%)',
              marginTop: '28px',
              marginBottom: '28px',
            }}
          />

          {/* Role + location */}
          <div
            style={{
              fontSize: 26,
              color: '#71717a',
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
            }}
          >
            Frontend Engineer / AI Builder · Córdoba, Argentina · Remote
          </div>

          {/* Stats — pushed to bottom */}
          <div style={{ display: 'flex', gap: '56px', marginTop: 'auto' }}>
            {[
              ['5+', 'years shipping'],
              ['6', 'AI projects in prod'],
              ['3', 'autonomous agents'],
            ].map(([value, label]) => (
              <div key={value} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: 40, color: '#00d9ff', fontFamily: 'monospace', fontWeight: 600 }}>
                  {value}
                </span>
                <span style={{ fontSize: 15, color: '#52525b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {label}
                </span>
              </div>
            ))}

            {/* Domain tag — right side */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'flex-end' }}>
              <span
                style={{
                  fontSize: 14,
                  color: '#3f3f46',
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                portfolio-aguirre-alexis.vercel.app
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
