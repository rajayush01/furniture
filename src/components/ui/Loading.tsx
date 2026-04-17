import { useEffect, useRef, useState } from "react";

interface LoaderProps {
  onComplete?: () => void;
}

export default function ArtisanLoader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done" | "exit">("loading");
  const loaderRef = useRef<HTMLDivElement>(null);

  const getStatus = (p: number) => {
    if (p >= 92) return "Almost ready";
    if (p >= 75) return "Polishing the details";
    if (p >= 50) return "Arranging the showroom";
    if (p >= 25) return "Curating collections";
    return "Preparing your experience";
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const steps = [
      { to: 28, delay: 0, dur: 650 },
      { to: 55, delay: 750, dur: 550 },
      { to: 78, delay: 1400, dur: 450 },
      { to: 95, delay: 2000, dur: 350 },
      { to: 100, delay: 2450, dur: 220 },
    ];

    let current = 0;

    steps.forEach(({ to, delay, dur }) => {
      const t = setTimeout(() => {
        const from = current;
        const start = Date.now();
        const tick = setInterval(() => {
          const elapsed = Date.now() - start;
          const frac = Math.min(elapsed / dur, 1);
          const eased = 1 - Math.pow(1 - frac, 3);
          const val = Math.round(from + (to - from) * eased);
          current = val;
          setProgress(val);
          if (frac >= 1) clearInterval(tick);
        }, 16);
        timers.push(tick as unknown as ReturnType<typeof setTimeout>);
      }, delay);
      timers.push(t);
    });

    const doneT = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setPhase("done");
        setTimeout(() => {
          setPhase("exit");
          setTimeout(() => onComplete?.(), 700);
        }, 900);
      }, 300);
    }, 2800);
    timers.push(doneT);

    return () => timers.forEach(clearTimeout);
  }, []);

  // Particles config
  const particles = Array.from({ length: 6 }, (_, i) => ({
    left: 15 + (i / 6) * 70 + Math.sin(i * 1.3) * 8,
    dx: (i % 2 === 0 ? 1 : -1) * (15 + i * 8),
    dur: 4 + i * 0.9,
    delay: i * 1.1,
    size: 3 + (i % 3),
  }));

  const isExit = phase === "exit";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        /* ── Outer shell ── */
        .ah-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #FAF7F2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Jost', sans-serif;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ah-loader.exit {
          opacity: 0;
          transform: scale(1.03);
          pointer-events: none;
        }

        /* ── Grain texture ── */
        .ah-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ── Ambient blobs ── */
        .ah-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: ahBlobPulse 7s ease-in-out infinite;
        }
        .ah-blob-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(184,147,90,0.13) 0%, transparent 70%);
          top: -120px; left: -100px;
        }
        .ah-blob-2 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(138,158,138,0.1) 0%, transparent 70%);
          bottom: -80px; right: -60px;
          animation-delay: -3.5s;
        }
        .ah-blob-3 {
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(196,134,106,0.09) 0%, transparent 70%);
          top: 35%; right: 18%;
          animation-delay: -1.5s;
        }

        /* ── Corner brackets ── */
        .ah-corner {
          position: absolute;
          pointer-events: none;
          opacity: 0.2;
          animation: ahFadeUp 0.9s 0.1s ease both;
        }
        .ah-corner-tl { top: 28px; left: 28px; }
        .ah-corner-br { bottom: 28px; right: 28px; transform: rotate(180deg); }
        .ah-corner-tr { top: 28px; right: 28px; transform: rotate(90deg); }
        .ah-corner-bl { bottom: 28px; left: 28px; transform: rotate(270deg); }

        /* ── Ring assembly ── */
        .ah-ring-wrap {
          position: relative;
          width: 168px; height: 168px;
          margin-bottom: 40px;
          animation: ahFadeUp 0.7s 0.1s ease both;
        }
        .ah-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid transparent;
        }
        .ah-ring-outer {
          inset: 0;
          border-color: rgba(184,147,90,0.18);
          animation: ahSpin 16s linear infinite;
        }
        .ah-ring-outer-tick {
          inset: 0;
          border-color: transparent;
          border-top-color: rgba(184,147,90,0.5);
          animation: ahSpin 16s linear infinite;
        }
        .ah-ring-mid {
          inset: 18px;
          border-color: rgba(61,53,48,0.07);
          border-right-color: rgba(138,158,138,0.4);
          animation: ahSpin 10s linear infinite reverse;
        }
        .ah-ring-inner {
          inset: 38px;
          border-color: rgba(184,147,90,0.1);
          border-bottom-color: rgba(184,147,90,0.55);
          animation: ahSpin 6s linear infinite;
        }

        /* ── Floating center icon ── */
        .ah-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: ahFloat 4s ease-in-out infinite;
        }

        /* ── Wordmark ── */
        .ah-wordmark {
          text-align: center;
          margin-bottom: 36px;
        }
        .ah-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #B8935A;
          font-weight: 300;
          margin-bottom: 10px;
          animation: ahFadeUp 0.6s 0.3s ease both;
          opacity: 0;
        }
        .ah-eyebrow-line {
          width: 22px; height: 1px;
          background: rgba(184,147,90,0.4);
        }
        .ah-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 300;
          color: #2C1810;
          letter-spacing: 0.12em;
          animation: ahFadeUp 0.6s 0.4s ease both;
          opacity: 0;
        }
        .ah-title em {
          font-style: italic;
          color: #B8935A;
        }

        /* ── Progress bar ── */
        .ah-progress-wrap {
          width: 260px;
          text-align: center;
          animation: ahFadeUp 0.6s 0.55s ease both;
          opacity: 0;
        }
        .ah-progress-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 10px;
        }
        .ah-percent {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          color: #B8935A;
          letter-spacing: 0.08em;
        }
        .ah-status-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8A9E8A;
          font-weight: 300;
          transition: opacity 0.4s ease;
        }
        .ah-track {
          width: 100%; height: 2px;
          background: rgba(61,53,48,0.1);
          border-radius: 2px;
          overflow: visible;
          position: relative;
        }
        .ah-fill {
          height: 100%;
          border-radius: 2px;
          background: linear-gradient(90deg, #8A9E8A 0%, #B8935A 100%);
          transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }
        .ah-fill::after {
          content: '';
          position: absolute;
          right: -1px; top: -3px;
          width: 5px; height: 8px;
          border-radius: 2px;
          background: #B8935A;
          box-shadow: 0 0 10px rgba(184,147,90,0.75);
        }

        /* ── Floating particles ── */
        .ah-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(184,147,90,0.3);
          pointer-events: none;
          animation: ahParticleDrift linear infinite;
        }

        /* ── Bottom hint ── */
        .ah-hint {
          position: absolute;
          bottom: 32px;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(61,53,48,0.28);
          font-weight: 300;
          animation: ahFadeUp 0.6s 0.8s ease both;
          opacity: 0;
        }

        /* ── Done overlay ── */
        .ah-done {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease;
          z-index: 10;
        }
        .ah-done.visible { opacity: 1; }
        .ah-check-circle {
          width: 60px; height: 60px;
          border-radius: 50%;
          background: rgba(184,147,90,0.1);
          border: 1.5px solid rgba(184,147,90,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          animation: ahScaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .ah-done-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 300;
          color: #2C1810;
          letter-spacing: 0.1em;
          animation: ahFadeUp 0.5s 0.15s ease both;
          opacity: 0;
        }
        .ah-done-sub {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #B8935A;
          font-weight: 300;
          margin-top: 6px;
          animation: ahFadeUp 0.5s 0.28s ease both;
          opacity: 0;
        }

        /* ── Decorative horizontal lines ── */
        .ah-line-left, .ah-line-right {
          position: absolute;
          top: 50%;
          height: 1px;
          background: rgba(184,147,90,0.1);
          animation: ahFadeUp 1s 0.5s ease both;
          opacity: 0;
        }
        .ah-line-left { left: 40px; width: 80px; }
        .ah-line-right { right: 40px; width: 80px; }

        /* ── Keyframes ── */
        @keyframes ahBlobPulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50%       { transform: scale(1.07); opacity: 1; }
        }
        @keyframes ahSpin { to { transform: rotate(360deg); } }
        @keyframes ahFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes ahFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ahParticleDrift {
          0%   { transform: translateY(0px) translateX(0px);             opacity: 0; }
          12%  { opacity: 0.65; }
          88%  { opacity: 0.3; }
          100% { transform: translateY(-130px) translateX(var(--ah-dx)); opacity: 0; }
        }
        @keyframes ahScaleIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {!isExit && (
        <div
          ref={loaderRef}
          className={`ah-loader${isExit ? " exit" : ""}`}
        >
          {/* Texture */}
          <div className="ah-grain" />

          {/* Ambient blobs */}
          <div className="ah-blob ah-blob-1" />
          <div className="ah-blob ah-blob-2" />
          <div className="ah-blob ah-blob-3" />

          {/* Decorative corner brackets */}
          {(["tl", "br", "tr", "bl"] as const).map((pos) => (
            <div key={pos} className={`ah-corner ah-corner-${pos}`}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path
                  d="M2 34 L2 2 L34 2"
                  stroke="#B8935A"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <circle cx="2" cy="2" r="2" fill="#B8935A" />
              </svg>
            </div>
          ))}

          {/* Side lines */}
          <div className="ah-line-left" />
          <div className="ah-line-right" />

          {/* Floating particles */}
          {particles.map((p, i) => (
            <div
              key={i}
              className="ah-particle"
              style={{
                left: `${p.left}%`,
                bottom: "80px",
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
                ["--ah-dx" as string]: `${p.dx}px`,
              }}
            />
          ))}

          {/* Wordmark */}
          <div className="ah-wordmark">
            <div className="ah-eyebrow">
              <span className="ah-eyebrow-line" />
              Handcrafted Furniture
              <span className="ah-eyebrow-line" />
            </div>
            <div className="ah-title">
              ARTISAN <em>HOME</em>
            </div>
          </div>

          {/* Ring + icon */}
          <div className="ah-ring-wrap">
            <div className="ah-ring ah-ring-outer" />
            <div className="ah-ring ah-ring-outer-tick" />
            <div className="ah-ring ah-ring-mid" />
            <div className="ah-ring ah-ring-inner" />

            <div className="ah-icon">
              <svg width="62" height="62" viewBox="0 0 62 62" fill="none">
                {/* Sofa body */}
                <rect
                  x="9" y="34" width="44" height="18" rx="4"
                  fill="#D4C5A9" opacity="0.65"
                />
                {/* Sofa backrest */}
                <rect
                  x="15" y="20" width="32" height="16" rx="3"
                  fill="#B8935A" opacity="0.55"
                />
                {/* Seat base */}
                <rect
                  x="7" y="30" width="48" height="6" rx="2"
                  fill="#7D5A3C" opacity="0.5"
                />
                {/* Left armrest */}
                <rect
                  x="7" y="22" width="8" height="20" rx="3"
                  fill="#B8935A" opacity="0.4"
                />
                {/* Right armrest */}
                <rect
                  x="47" y="22" width="8" height="20" rx="3"
                  fill="#B8935A" opacity="0.4"
                />
                {/* Legs */}
                <rect
                  x="13" y="50" width="4" height="9" rx="1.5"
                  fill="#7D5A3C" opacity="0.55"
                />
                <rect
                  x="45" y="50" width="4" height="9" rx="1.5"
                  fill="#7D5A3C" opacity="0.55"
                />
                {/* Cushion accent dot */}
                <circle
                  cx="31" cy="27" r="2"
                  fill="#FAF7F2" opacity="0.35"
                />
              </svg>
            </div>
          </div>

          {/* Progress */}
          <div className="ah-progress-wrap">
            <div className="ah-progress-row">
              <span className="ah-percent">{progress}%</span>
              <span className="ah-status-label">{getStatus(progress)}</span>
            </div>
            <div className="ah-track">
              <div className="ah-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Bottom hint */}
          <div className="ah-hint">Est. 2007 · Crafted in India</div>

          {/* Done overlay */}
          <div className={`ah-done${phase === "done" ? " visible" : ""}`}>
            <div className="ah-check-circle">
              <svg
                width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="#B8935A"
                strokeWidth="1.5" strokeLinecap="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="ah-done-label">Welcome Home</div>
            <div className="ah-done-sub">Your experience is ready</div>
          </div>
        </div>
      )}
    </>
  );
}