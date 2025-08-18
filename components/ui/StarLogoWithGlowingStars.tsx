import React from "react"

export default function StarLogoWithGlowingStars() {
  return (
    <>
      <svg
        width="120"
        height="120"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="star-logo-with-glow"
      >
        <defs>
          {/* Glow gradient for stars */}
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD54F" stopOpacity="1" />
            <stop offset="70%" stopColor="#FFB300" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF6F00" stopOpacity="0" />
          </radialGradient>

          {/* Gradient fill for big star */}
          <linearGradient id="starGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFEB3B" />
            <stop offset="100%" stopColor="#FBC02D" />
          </linearGradient>

          {/* Drop shadow for depth */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FFB300" floodOpacity="0.6" />
          </filter>

          {/* Small star shape */}
          <symbol id="smallStar" viewBox="0 0 24 24" >
            <path
              fill="url(#starGradient)"
              d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.9 7.82 20 9 12.91 4 9.27l5.91-.01L12 2z"
              filter="url(#shadow)"
            />
          </symbol>
        </defs>

        {/* Large central star */}
        <path
          fill="url(#starGradient)"
          filter="url(#shadow)"
          d="M32 4l7.6 20.4L60 26l-17 14.4L47.2 60 32 49.2 16.8 60 20 40.4 4 26l20.4-1.6L32 4z"
        />

        {/* Glow around large star */}
        <circle cx="32" cy="32" r="28" fill="url(#glow)" />

        {/* Three small stars arranged top to east */}
        {/* Positions are relative to the SVG viewport */}
        <use
          href="#smallStar"
          x="42"
          y="8"
          width="18"
          height="18"
          className="glowing-small-star"
        />
        <use
          href="#smallStar"
          x="52"
          y="22"
          width="14"
          height="14"
          className="glowing-small-star"
        />
        <use
          href="#smallStar"
          x="48"
          y="38"
          width="12"
          height="12"
          className="glowing-small-star"
        />
      </svg>

      <style jsx>{`
        .star-logo-with-glow {
          cursor: pointer;
          user-select: none;
          display: block;
          max-width: 120px;
          max-height: 120px;
          animation: pulseStar 3s ease-in-out infinite;
        }

        .glowing-small-star {
          filter: drop-shadow(0 0 4px #FFD54F);
          animation: twinkle 2.5s ease-in-out infinite;
          transform-origin: center;
        }

        /* Pulsing glow and scale for big star */
        @keyframes pulseStar {
          0%, 100% {
            filter: drop-shadow(0 0 10px #FFD54F);
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 18px #FFC107);
            transform: scale(1.05);
          }
        }

        /* Small star twinkle animation */
        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 4px #FFD54F);
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            filter: drop-shadow(0 0 8px #FFC107);
            transform: scale(1.1);
          }
        }
      `}</style>
    </>
  )
}
