interface BuildingIllustrationAnimatedProps {
  className?: string;
}

export default function BuildingIllustrationAnimated({
  className = "",
}: BuildingIllustrationAnimatedProps) {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <style>{`
          /* Building floats gently */
          @keyframes float {
            0%   { transform: translateY(0px); }
            50%  { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }

          /* Edges draw themselves on load */
          @keyframes draw-in {
            from { stroke-dashoffset: 1200; opacity: 0.3; }
            to   { stroke-dashoffset: 0;    opacity: 1; }
          }

          /* Secondary edges fade in after primary */
          @keyframes fade-draw {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }

          /* Nodes pulse gently */
          @keyframes node-pulse {
            0%, 100% { r: 3; opacity: 0.6; }
            50%       { r: 5; opacity: 1;   }
          }

          /* Connection lines fade in and out */
          @keyframes line-breathe {
            0%, 100% { opacity: 0;    }
            30%, 70% { opacity: 0.45; }
          }

          /* Stars twinkle */
          @keyframes twinkle {
            0%, 100% { opacity: 0.15; }
            50%       { opacity: 0.9;  }
          }

          /* Scan ring expands from building base */
          @keyframes scan-ring {
            0%   { r: 40;  opacity: 0.5; stroke-width: 0.5; }
            100% { r: 160; opacity: 0;   stroke-width: 0.2; }
          }

          /* Grid lines shimmer */
          @keyframes grid-shimmer {
            0%, 100% { opacity: 0.15; }
            50%       { opacity: 0.4;  }
          }

          .building-group {
            animation: float 6s ease-in-out infinite;
            transform-origin: 240px 330px;
          }

          .edge-primary {
            stroke-dasharray: 1200;
            stroke-dashoffset: 1200;
            animation: draw-in 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          .edge-secondary {
            stroke-dasharray: 600;
            stroke-dashoffset: 600;
            animation: draw-in 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards;
            opacity: 0;
          }
          .edge-tertiary {
            animation: fade-draw 1.2s ease-out 1.4s forwards;
            opacity: 0;
          }

          .node { animation: node-pulse 3s ease-in-out infinite; }
          .node-1 { animation-delay: 0s;    }
          .node-2 { animation-delay: 0.8s;  }
          .node-3 { animation-delay: 1.4s;  }
          .node-4 { animation-delay: 2.1s;  }
          .node-5 { animation-delay: 0.4s;  }

          .conn-line { animation: line-breathe 4s ease-in-out infinite; }
          .conn-1 { animation-delay: 0s;   }
          .conn-2 { animation-delay: 1.2s; }
          .conn-3 { animation-delay: 2.4s; }
          .conn-4 { animation-delay: 0.7s; }

          .star { animation: twinkle 2s ease-in-out infinite; }
          .star-1 { animation-duration: 2.1s; animation-delay: 0s;    }
          .star-2 { animation-duration: 3.4s; animation-delay: 0.7s;  }
          .star-3 { animation-duration: 2.7s; animation-delay: 1.4s;  }
          .star-4 { animation-duration: 1.9s; animation-delay: 0.3s;  }
          .star-5 { animation-duration: 3.1s; animation-delay: 1.8s;  }
          .star-6 { animation-duration: 2.5s; animation-delay: 0.9s;  }

          .scan-ring { animation: scan-ring 5s ease-out infinite; }

          .grid-line { animation: grid-shimmer 6s ease-in-out infinite; }
          .grid-line-2 { animation: grid-shimmer 6s ease-in-out infinite; animation-delay: 1.5s; }
          .grid-line-3 { animation: grid-shimmer 6s ease-in-out infinite; animation-delay: 3s; }
        `}</style>
      </defs>

      {/* ── Background grid lines ── */}
      <line className="grid-line"   x1="240" y1="480" x2="0"   y2="280" stroke="#2a2a2a" strokeWidth="0.5" />
      <line className="grid-line-2" x1="240" y1="480" x2="480" y2="280" stroke="#2a2a2a" strokeWidth="0.5" />
      <line className="grid-line-3" x1="240" y1="480" x2="240" y2="20"  stroke="#2a2a2a" strokeWidth="0.5" />
      <line className="grid-line"   x1="240" y1="400" x2="60"  y2="300" stroke="#2a2a2a" strokeWidth="0.5" />
      <line className="grid-line-2" x1="240" y1="400" x2="420" y2="300" stroke="#2a2a2a" strokeWidth="0.5" />
      <line className="grid-line-3" x1="240" y1="400" x2="120" y2="260" stroke="#1e1e1e" strokeWidth="0.5" />
      <line className="grid-line"   x1="240" y1="400" x2="360" y2="260" stroke="#1e1e1e" strokeWidth="0.5" />

      {/* ── Scan ring from base ── */}
      <circle className="scan-ring" cx="240" cy="380" r="40" stroke="#404040" fill="none" />

      {/* ── Floating nodes (drawn outside building group so they drift independently) ── */}
      {/* Apex node */}
      <circle className="node node-1" cx="240" cy="58" r="3" fill="#707070" />
      {/* Left tower top */}
      <circle className="node node-2" cx="145" cy="215" r="3" fill="#606060" />
      {/* Right tower top */}
      <circle className="node node-3" cx="335" cy="215" r="3" fill="#606060" />
      {/* Upper left ambient */}
      <circle className="node node-4" cx="82" cy="118" r="3" fill="#505050" />
      {/* Upper right ambient */}
      <circle className="node node-5" cx="398" cy="118" r="3" fill="#505050" />

      {/* ── Connection lines between nodes ── */}
      <line className="conn-line conn-1" x1="240" y1="58"  x2="145" y2="215" stroke="#505050" strokeWidth="0.75" strokeDasharray="4 4" />
      <line className="conn-line conn-2" x1="240" y1="58"  x2="335" y2="215" stroke="#505050" strokeWidth="0.75" strokeDasharray="4 4" />
      <line className="conn-line conn-3" x1="82"  y1="118" x2="145" y2="215" stroke="#404040" strokeWidth="0.5"  strokeDasharray="3 5" />
      <line className="conn-line conn-4" x1="398" y1="118" x2="335" y2="215" stroke="#404040" strokeWidth="0.5"  strokeDasharray="3 5" />
      <line className="conn-line conn-1" x1="82"  y1="118" x2="240" y2="58"  stroke="#404040" strokeWidth="0.5"  strokeDasharray="3 5" />
      <line className="conn-line conn-3" x1="398" y1="118" x2="240" y2="58"  stroke="#404040" strokeWidth="0.5"  strokeDasharray="3 5" />

      {/* ── Building group (floats as one unit) ── */}
      <g className="building-group">

        {/* === MAIN CENTRAL TOWER === */}
        {/* Top face */}
        <polygon points="240,60 310,100 240,140 170,100" fill="#3a3a3a" />
        <line className="edge-tertiary" x1="240" y1="60"  x2="240" y2="140" stroke="#505050" strokeWidth="0.5" />
        <line className="edge-tertiary" x1="170" y1="100" x2="310" y2="100" stroke="#505050" strokeWidth="0.5" />

        {/* Left face */}
        <polygon points="170,100 240,140 240,330 170,290" fill="#2a2a2a" />
        <line className="edge-tertiary" x1="170" y1="143" x2="240" y2="183" stroke="#383838" strokeWidth="0.5" />
        <line className="edge-tertiary" x1="170" y1="186" x2="240" y2="226" stroke="#383838" strokeWidth="0.5" />
        <line className="edge-tertiary" x1="170" y1="229" x2="240" y2="269" stroke="#383838" strokeWidth="0.5" />
        <line className="edge-tertiary" x1="191" y1="107" x2="191" y2="297" stroke="#383838" strokeWidth="0.5" />
        <line className="edge-tertiary" x1="213" y1="117" x2="213" y2="320" stroke="#383838" strokeWidth="0.5" />

        {/* Right face */}
        <polygon points="240,140 310,100 310,290 240,330" fill="#222222" />
        <line className="edge-tertiary" x1="240" y1="183" x2="310" y2="143" stroke="#383838" strokeWidth="0.5" />
        <line className="edge-tertiary" x1="240" y1="226" x2="310" y2="186" stroke="#383838" strokeWidth="0.5" />
        <line className="edge-tertiary" x1="240" y1="269" x2="310" y2="229" stroke="#383838" strokeWidth="0.5" />
        <line className="edge-tertiary" x1="267" y1="320" x2="267" y2="107" stroke="#383838" strokeWidth="0.5" />
        <line className="edge-tertiary" x1="288" y1="297" x2="288" y2="117" stroke="#383838" strokeWidth="0.5" />

        {/* === LEFT SMALLER TOWER === */}
        <polygon points="170,200 220,228 170,256 120,228" fill="#333333" />
        <polygon points="120,228 170,256 170,360 120,332" fill="#252525" />
        <line className="edge-tertiary" x1="120" y1="275" x2="170" y2="303" stroke="#333333" strokeWidth="0.5" />
        <line className="edge-tertiary" x1="120" y1="307" x2="170" y2="335" stroke="#333333" strokeWidth="0.5" />
        <polygon points="170,256 220,228 220,332 170,360" fill="#1e1e1e" />
        <line className="edge-tertiary" x1="170" y1="303" x2="220" y2="275" stroke="#333333" strokeWidth="0.5" />
        <line className="edge-tertiary" x1="170" y1="335" x2="220" y2="307" stroke="#333333" strokeWidth="0.5" />

        {/* === RIGHT SMALLER TOWER === */}
        <polygon points="310,200 360,228 310,256 260,228" fill="#333333" />
        <polygon points="260,228 310,256 310,360 260,332" fill="#252525" />
        <line className="edge-tertiary" x1="260" y1="275" x2="310" y2="303" stroke="#333333" strokeWidth="0.5" />
        <line className="edge-tertiary" x1="260" y1="307" x2="310" y2="335" stroke="#333333" strokeWidth="0.5" />
        <polygon points="310,256 360,228 360,332 310,360" fill="#1e1e1e" />
        <line className="edge-tertiary" x1="310" y1="303" x2="360" y2="275" stroke="#333333" strokeWidth="0.5" />
        <line className="edge-tertiary" x1="310" y1="335" x2="360" y2="307" stroke="#333333" strokeWidth="0.5" />

        {/* === BASE PLATFORM === */}
        <polygon points="120,332 240,390 360,332 360,360 240,418 120,360" fill="#1a1a1a" stroke="#505050" strokeWidth="0.75" />
        <polygon points="120,360 240,418 240,430 120,372" fill="#151515" stroke="#404040" strokeWidth="0.75" />
        <polygon points="240,418 360,360 360,372 240,430" fill="#111111" stroke="#404040" strokeWidth="0.75" />

        {/* === PRIMARY HIGHLIGHT EDGES (animate drawing) === */}
        {/* These draw themselves on load — the "sketch" feel */}
        <line className="edge-primary" x1="240" y1="60"  x2="310" y2="100" stroke="#888888" strokeWidth="1.5" />
        <line className="edge-primary" x1="240" y1="60"  x2="170" y2="100" stroke="#888888" strokeWidth="1.5" />
        <line className="edge-primary" x1="310" y1="100" x2="310" y2="290" stroke="#666666" strokeWidth="1" />
        <line className="edge-primary" x1="170" y1="100" x2="170" y2="290" stroke="#777777" strokeWidth="1" />

        {/* Secondary outline edges */}
        <line className="edge-secondary" x1="240" y1="60"  x2="240" y2="140" stroke="#606060" strokeWidth="1" />
        <line className="edge-secondary" x1="170" y1="100" x2="310" y2="100" stroke="#555555" strokeWidth="0.75" />
        <line className="edge-secondary" x1="240" y1="140" x2="240" y2="330" stroke="#555555" strokeWidth="0.75" />
        <line className="edge-secondary" x1="120" y1="228" x2="120" y2="332" stroke="#555555" strokeWidth="0.75" />
        <line className="edge-secondary" x1="360" y1="228" x2="360" y2="332" stroke="#555555" strokeWidth="0.75" />

      </g>

      {/* ── Moon (static, outside float group) ── */}
      <path
        d="M 400 80 A 30 30 0 1 1 400 140 A 20 20 0 1 0 400 80"
        fill="#2a2a2a"
        stroke="#505050"
        strokeWidth="1"
      />

      {/* ── Stars ── */}
      <circle className="star star-1" cx="80"  cy="60"  r="1.5" fill="#707070" />
      <circle className="star star-2" cx="150" cy="40"  r="1"   fill="#606060" />
      <circle className="star star-3" cx="380" cy="50"  r="1.5" fill="#707070" />
      <circle className="star star-4" cx="420" cy="140" r="1"   fill="#606060" />
      <circle className="star star-5" cx="50"  cy="150" r="1"   fill="#505050" />
      <circle className="star star-6" cx="430" cy="200" r="1.5" fill="#606060" />
    </svg>
  );
}
