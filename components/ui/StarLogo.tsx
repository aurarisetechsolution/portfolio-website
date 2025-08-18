import React from "react";

export default function StarLogo({ width = 120, height = 120 }) {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 120 120"
        className="star-logo"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Light Mode Gradient */}
          <radialGradient id="blueGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bbdefb" />
            <stop offset="50%" stopColor="#64b5f6" />
            <stop offset="100%" stopColor="#1976d2" />
          </radialGradient>

          {/* Dark Mode Gradient */}
          <radialGradient id="whiteGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#eeeeee" />
            <stop offset="100%" stopColor="#cccccc" />
          </radialGradient>

          {/* Glow Filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Mini Star Symbol */}
          <symbol id="miniStar" viewBox="0 0 24 24">
            <path
              d="M12 2L14.6 8.5L22 9.3L16.5 14L18.2 21.5L12 17.8L5.8 21.5L7.5 14L2 9.3L9.4 8.5L12 2Z"
              className="orbit-star"
              filter="url(#glow)"
            />
          </symbol>
        </defs>

        {/* Main Star with reduced height */}
        <path
          d="M60 30 L68 47 H98 L72 59 L80 77 L60 66 L40 77 L48 59 L22 47 H52 Z"
          className="main-star"
        />

        {/* Full Orbiting Stars (larger, closer) */}
        <use href="#miniStar" className="orbiting-star orbit1" width="10" height="10" />
        <use href="#miniStar" className="orbiting-star orbit2" width="8" height="8" />
        <use href="#miniStar" className="orbiting-star orbit3" width="7" height="7" />

        {/* Half Orbiting Stars (larger, closer) */}
        <use href="#miniStar" className="semi-orbit-star semi1" width="7" height="7" />
        <use href="#miniStar" className="semi-orbit-star semi2" width="6" height="6" />
        <use href="#miniStar" className="semi-orbit-star semi3" width="5" height="5" />
      </svg>

      <style jsx>{`
        .star-logo {
          display: block;
          max-width: 120px;
        }

        .main-star {
          fill: url(#blueGradient);
          stroke: rgba(0, 0, 0, 0.1);
          stroke-width: 1;
          filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.3));
          animation: pulse 3s ease-in-out infinite;
        }

        .orbit-star {
          fill: #ffeb3b; /* brighter yellow */
          filter: drop-shadow(0 0 3px #ffd54f);
        }

        /* Full Orbit Stars */
        .orbiting-star {
          transform-origin: 60px 60px;
          animation: orbit 6s linear infinite;
        }

        .orbit1 {
          transform: rotate(0deg) translate(18px);
        }

        .orbit2 {
          transform: rotate(120deg) translate(15px);
          animation-delay: 1s;
        }

        .orbit3 {
          transform: rotate(240deg) translate(12px);
          animation-delay: 2s;
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translate(18px);
          }
          100% {
            transform: rotate(360deg) translate(18px);
          }
        }

        /* Half Orbit Stars */
        .semi-orbit-star {
          transform-origin: 60px 60px;
          animation: semiOrbit 4s ease-in-out infinite alternate;
          opacity: 1;
        }

        .semi1 {
          transform: rotate(-90deg) translate(15px);
          animation-delay: 0.5s;
        }

        .semi2 {
          transform: rotate(-135deg) translate(14px);
          animation-delay: 1s;
        }

        .semi3 {
          transform: rotate(-180deg) translate(12px);
          animation-delay: 1.5s;
        }

        @keyframes semiOrbit {
          0% {
            transform: rotate(-90deg) translate(15px);
          }
          100% {
            transform: rotate(90deg) translate(15px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .main-star {
            fill: url(#whiteGradient);
          }

          .orbit-star {
            fill: #ffffff;
            filter: drop-shadow(0 0 3px #ffffff);
          }
        }
      `}</style>
    </>
  );
}
