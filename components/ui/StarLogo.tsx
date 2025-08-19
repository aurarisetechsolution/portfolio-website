import React from "react";

export default function StarLogo({ width = 120, height = 120 }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 520 520" 
      role="img" 
      aria-labelledby="title desc"
      width={width}
      height={height}
      className="aurarise-logo inline-block"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        maxWidth: '100%',
        height: 'auto'
      }}
    >
      <title id="title">AURARISE Tech Solution PLC</title>
      <desc id="desc">Rhino with tech-circuit body inside a crescent, animated glow and circuit motion.</desc>

      {/* =============== THEME (edit these to match any background) =============== */}
      <style>
        {`
          .aurarise-logo {
            display: inline-block;
            vertical-align: middle;
            max-width: 100%;
            height: auto;
          }
          
          .aurarise-logo :root{
            --gold-1:#FFD34D;   /* outer glow */
            --gold-2:#FFB400;   /* inner gold */
            --blue-1:#0B1E3A;   /* deep blue */
            --blue-2:#1F47A4;   /* mid blue */
            --accent:#56CCF2;   /* circuit glow */
            --ink:#0E1726;      /* text/strokes on light bg */
          }
          
          /* Light/Dark auto tweak for better contrast */
          @media (prefers-color-scheme: light){
            .aurarise-logo :root{ --ink:#0B1E3A; }
          }

          /* --------- Animation keyframes --------- */
          @keyframes breathe { 0%,100%{opacity:.65} 50%{opacity:1} }
          @keyframes floaty  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
          @keyframes flow    { to { stroke-dashoffset:-260 } }
          @keyframes pulse   { 0%,100%{transform:scale(1); opacity:.9} 50%{transform:scale(1.08); opacity:1} }
          @keyframes shine   { 0%{transform:translateX(-120%)} 100%{transform:translateX(120%)} }

          /* --------- Filters for soft glow --------- */
          .aurarise-logo .glow-gold { filter:url(#glowGold); }
          .aurarise-logo .glow-blue { filter:url(#glowBlue); }

          /* Motion hooks */
          .aurarise-logo .breathe { animation:breathe 3.6s ease-in-out infinite; }
          .aurarise-logo .floaty  { animation:floaty 6s ease-in-out infinite; transform-origin:center; }
          .aurarise-logo .pulse   { animation:pulse 2.8s ease-in-out infinite; transform-origin:380px 175px; }

          /* Circuit "current" */
          .aurarise-logo .circuit-line {
            stroke: var(--accent);
            stroke-width:6;
            fill:none;
            stroke-linecap:round;
            stroke-linejoin:round;
            stroke-dasharray:24 12;
            animation:flow 2.6s linear infinite;
          }
          .aurarise-logo .circuit-node { fill: var(--accent); }

          /* Typography */
          .aurarise-logo text { font-family: system-ui, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; }
          .aurarise-logo .brand { font-weight:800; letter-spacing:1.5px; }
          .aurarise-logo .sub   { font-weight:600; letter-spacing:4px; }

          /* Optional highlight sweep across the rhino */
          .aurarise-logo .sweep {
            mix-blend-mode:screen;
            opacity:.35;
            animation:shine 3.5s ease-in-out infinite;
          }
        `}
      </style>

      {/* =============== DEFINITIONS =============== */}
      <defs>
        {/* Gradients */}
        <linearGradient id="goldGrad" x1="0" x2="1">
          <stop offset="0%"  stopColor="var(--gold-1)"/>
          <stop offset="100%" stopColor="var(--gold-2)"/>
        </linearGradient>
        <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="var(--blue-2)"/>
          <stop offset="100%" stopColor="var(--blue-1)"/>
        </linearGradient>

        {/* Soft glows */}
        <filter id="glowGold" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b1"/>
          <feMerge><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glowBlue" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b2"/>
          <feMerge><feMergeNode in="b2"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        {/* Crescent via mask */}
        <mask id="cut">
          <rect width="100%" height="100%" fill="white"/>
          {/* inner circle to cut from outer */}
          <circle cx="220" cy="250" r="150" fill="black"/>
        </mask>
      </defs>

      {/* =============== ICON =============== */}
      <g className="floaty">
        {/* Golden crescent */}
        <g className="breathe glow-gold">
          <circle cx="270" cy="250" r="190" fill="url(#goldGrad)" opacity=".35"/>
          <circle cx="270" cy="250" r="190" fill="url(#goldGrad)" mask="url(#cut)"/>
        </g>

        {/* Rhino head base */}
        <g id="rhino">
          {/* head silhouette */}
          <path className="glow-blue"
            d="M170,185
               q55,-32 120,-20
               q20,-22 25,-22
               q15,25 46,28
               q25,-20 45,-45
               q6,20 -8,45
               q32,16 43,20
               q-18,18 -40,31
               q0,12 -3,26
               q-3,15 -9,25
               q-22,35 -66,55
               q-56,26 -130,8
               q-74,-18 -94,-74
               q-8,-22 -4,-45
               q5,-27 35,-52 z"
            fill="url(#blueGrad)" stroke="var(--ink)" strokeWidth="0"/>

          {/* horn 1 */}
          <path className="pulse" d="M365,170
               q55,-10 80,-55
               q-6,60 -58,92 z"
               fill="url(#goldGrad)"/>

          {/* horn 2 (rear) */}
          <path className="pulse" style={{animationDelay:'.6s'}}
                d="M330,175
                   q38,-8 58,-42
                   q-4,43 -45,66 z"
                fill="url(#goldGrad)"/>

          {/* eye */}
          <ellipse cx="320" cy="220" rx="12" ry="8" fill="#0A0A0A" opacity=".85"/>

          {/* circuit network */}
          <g>
            <path className="circuit-line"
              d="M205,205 L235,235 L235,270 L265,300"/>
            <path className="circuit-line" style={{animationDelay:'.4s'}}
              d="M260,210 L290,230 L290,260"/>
            <circle className="circuit-node" cx="205" cy="205" r="7"/>
            <circle className="circuit-node" cx="235" cy="235" r="7"/>
            <circle className="circuit-node" cx="235" cy="270" r="7"/>
            <circle className="circuit-node" cx="265" cy="300" r="7"/>
            <circle className="circuit-node" cx="260" cy="210" r="7"/>
            <circle className="circuit-node" cx="290" cy="230" r="7"/>
            <circle className="circuit-node" cx="290" cy="260" r="7"/>
          </g>

          {/* highlight sweep */}
          <rect className="sweep" x="110" y="120" width="320" height="260" rx="160" fill="white"/>
        </g>
      </g>

      {/* =============== WORDMARK (optional; hide if you only need the icon) =============== */}
      <g transform="translate(260,468)" textAnchor="middle">
        <text className="brand" fontSize="46" fill="currentColor">AURARISE</text>
        <text className="sub"   fontSize="18" y="26" fill="currentColor" opacity=".85">TECH SOLUTION PLC</text>
      </g>
    </svg>
  );
}

