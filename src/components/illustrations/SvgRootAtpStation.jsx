import React from 'react';

/* ---------- Dữ liệu tính trước (ổn định giữa các lần render) ---------- */
const seeded = (seed) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const rand = seeded(42);
const STARS = Array.from({ length: 34 }, () => ({
  x: 20 + rand() * 600,
  y: 12 + rand() * 150,
  r: 0.6 + rand() * 1.3,
  d: 2 + rand() * 3,
}));
const SOIL_GRAINS = Array.from({ length: 90 }, () => ({
  x: 30 + rand() * 580,
  y: 212 + rand() * 215,
  r: 0.8 + rand() * 2.6,
  o: 0.12 + rand() * 0.22,
}));

// Điểm bám của lông hút trên các nhánh rễ
const HAIR_ANCHORS = [
  [319, 250], [318, 290], [319, 335], [320, 380],
  [249, 259], [209, 294], [143, 382],
  [391, 259], [431, 294], [497, 382],
  [176, 270], [133, 293],
  [464, 270], [507, 293],
];
const HAIRS = HAIR_ANCHORS.flatMap(([x, y], i) =>
  [0, 1, 2].map((k) => {
    const a = (((i * 53 + k * 97) % 360) * Math.PI) / 180;
    const len = 8 + ((i * 7 + k * 5) % 9);
    return {
      x1: x,
      y1: y,
      x2: x + Math.cos(a) * len,
      y2: y + Math.sin(a) * len,
    };
  })
);

// Ion photphat trôi vào rễ
const IONS = [
  { x: 70, y: 250, dx: 85, dy: 45, label: 'H₂PO₄⁻', begin: '0s' },
  { x: 62, y: 352, dx: 100, dy: -8, label: 'H₂PO₄⁻', begin: '1.6s' },
  { x: 570, y: 250, dx: -85, dy: 45, label: 'HPO₄²⁻', begin: '0.8s' },
  { x: 578, y: 352, dx: -95, dy: -8, label: 'HPO₄²⁻', begin: '2.4s' },
];

export default function SvgRootAtpStation() {
  return (
    <svg
      viewBox="0 0 640 560"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Rễ cây hấp thụ photphat và tạo ra năng lượng ATP giúp cây ra hoa, kết hạt"
    >
      <defs>
        <linearGradient id="atpSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1E1B4B" />
          <stop offset="0.6" stopColor="#4C1D95" />
          <stop offset="1" stopColor="#C2410C" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="atpSoil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4C1D95" />
          <stop offset="0.45" stopColor="#2E1065" />
          <stop offset="1" stopColor="#1A0838" />
        </linearGradient>
        <linearGradient id="atpGrass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4ADE80" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
        <linearGradient id="atpStem" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#15803D" />
          <stop offset="0.5" stopColor="#4ADE80" />
          <stop offset="1" stopColor="#16A34A" />
        </linearGradient>
        <linearGradient id="atpLeaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#86EFAC" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
        <linearGradient id="atpRoot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3E8FF" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="atpBattery" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#581C87" />
          <stop offset="1" stopColor="#2E1065" />
        </linearGradient>
        <linearGradient id="atpGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FEF08A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <radialGradient id="atpSun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FEF3C7" />
          <stop offset="0.35" stopColor="#FCD34D" stopOpacity="0.8" />
          <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="atpAura" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FDE047" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FDE047" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="atpIon" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#C084FC" />
          <stop offset="1" stopColor="#4C1D95" />
        </radialGradient>
        <radialGradient id="atpPetal" cx="0.5" cy="0.9" r="0.9">
          <stop offset="0" stopColor="#BE185D" />
          <stop offset="1" stopColor="#F9A8D4" />
        </radialGradient>

        <filter id="atpGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="atpSoftGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="atpShadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
        </filter>

        <clipPath id="atpFrame">
          <rect x="10" y="8" width="620" height="544" rx="26" />
        </clipPath>
      </defs>

      <g clipPath="url(#atpFrame)">
        {/* ===== BẦU TRỜI ===== */}
        <rect x="0" y="0" width="640" height="215" fill="url(#atpSky)" />
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FFF">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur={`${s.d}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        <circle cx="570" cy="70" r="70" fill="url(#atpSun)" />
        <circle cx="570" cy="70" r="20" fill="#FEF3C7" />

        {/* Đồi xa */}
        <path
          d="M0 200 C 70 160, 140 170, 210 190 C 270 165, 350 160, 420 188 C 490 165, 570 170, 640 195 L640 215 L0 215 Z"
          fill="#3B0764"
          opacity="0.85"
        />

        {/* ===== ĐẤT ===== */}
        <rect x="0" y="198" width="640" height="362" fill="url(#atpSoil)" />
        {/* Các tầng đất */}
        <path d="M0 262 C 160 250, 300 276, 640 258" stroke="#6B21A8" strokeWidth="1.2" fill="none" opacity="0.4" />
        <path d="M0 340 C 200 354, 420 328, 640 346" stroke="#6B21A8" strokeWidth="1.2" fill="none" opacity="0.35" />
        <path d="M0 420 C 160 410, 400 432, 640 416" stroke="#6B21A8" strokeWidth="1.2" fill="none" opacity="0.3" />
        {SOIL_GRAINS.map((g, i) => (
          <circle key={i} cx={g.x} cy={g.y} r={g.r} fill="#A78BFA" opacity={g.o} />
        ))}

        {/* Thảm cỏ */}
        <path
          d="M0 198 Q 40 190 80 198 T 160 198 T 240 198 T 320 198 T 400 198 T 480 198 T 560 198 T 640 198 L640 212 L0 212 Z"
          fill="url(#atpGrass)"
        />
        {[40, 95, 150, 215, 430, 490, 545, 600].map((x, i) => (
          <g key={x} stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round" fill="none">
            <path d={`M${x} 200 Q ${x - 3} ${186 - (i % 3) * 3} ${x - 7} ${178 - (i % 2) * 4}`} />
            <path d={`M${x + 5} 200 Q ${x + 6} ${184} ${x + 11} ${176 + (i % 3) * 2}`} />
          </g>
        ))}

        {/* ===== CÂY ===== */}
        <g>
          {/* Thân */}
          <path
            d="M320 200 C 316 170, 324 140, 320 100"
            stroke="url(#atpStem)"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
          {/* Lá trái */}
          <g filter="url(#atpShadow)">
            <path
              d="M319 158 C 288 100, 232 98, 206 124 C 232 160, 284 170, 319 158 Z"
              fill="url(#atpLeaf)"
            />
            <path d="M319 158 Q 262 128 212 124" stroke="#166534" strokeWidth="2" fill="none" opacity="0.7" />
            <g stroke="#166534" strokeWidth="1" opacity="0.5" fill="none">
              <path d="M285 142 L 268 118" />
              <path d="M262 133 L 250 110" />
              <path d="M285 145 L 272 162" />
              <path d="M258 134 L 246 150" />
            </g>
          </g>
          {/* Lá phải */}
          <g filter="url(#atpShadow)">
            <path
              d="M321 140 C 352 84, 410 84, 436 110 C 410 146, 358 154, 321 140 Z"
              fill="url(#atpLeaf)"
            />
            <path d="M321 140 Q 378 112 430 110" stroke="#166534" strokeWidth="2" fill="none" opacity="0.7" />
            <g stroke="#166534" strokeWidth="1" opacity="0.5" fill="none">
              <path d="M355 124 L 372 100" />
              <path d="M378 116 L 390 95" />
              <path d="M355 127 L 368 146" />
              <path d="M382 117 L 394 134" />
            </g>
          </g>

          {/* Hoa */}
          <g transform="translate(320 84)">
            <circle r="46" fill="url(#atpAura)">
              <animate attributeName="r" values="40;50;40" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <g filter="url(#atpShadow)">
              {Array.from({ length: 8 }, (_, i) => (
                <ellipse
                  key={i}
                  cx="0"
                  cy="-19"
                  rx="9"
                  ry="19"
                  fill="url(#atpPetal)"
                  stroke="#9D174D"
                  strokeWidth="0.8"
                  transform={`rotate(${i * 45})`}
                />
              ))}
            </g>
            <circle r="12" fill="url(#atpGold)" stroke="#B45309" strokeWidth="1.2" />
            {[[-4, -3], [3, -5], [5, 3], [-3, 5], [0, 0]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.4" fill="#92400E" />
            ))}
          </g>

          {/* Hạt bay */}
          {[
            [388, 62, 0],
            [402, 82, 1.2],
            [250, 66, 0.6],
          ].map(([x, y, b], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <ellipse rx="3.2" ry="5" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" transform="rotate(30)">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; 0 -6; 0 0"
                  dur="3s"
                  begin={`${b}s`}
                  repeatCount="indefinite"
                />
              </ellipse>
            </g>
          ))}
        </g>

        {/* Nhãn hoa & hạt */}
        <g>
          <rect x="360" y="40" width="94" height="24" rx="12" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1.4" />
          <text x="407" y="56" textAnchor="middle" fill="#9D174D" fontSize="11.5" fontWeight="800">
            Hoa &amp; hạt
          </text>
          <path d="M360 52 L 346 66" stroke="#EC4899" strokeWidth="1.4" fill="none" />
        </g>

        {/* ===== BỘ RỄ ===== */}
        <g filter="url(#atpGlow)" fill="none" strokeLinecap="round">
          {/* Rễ cọc */}
          <path d="M320 200 C 322 260, 316 330, 320 400" stroke="#F3E8FF" strokeWidth="6" />
          {/* Rễ bên chính */}
          <path d="M320 205 C 280 240, 220 270, 170 340 C 150 370, 135 395, 120 420" stroke="url(#atpRoot)" strokeWidth="4.5" />
          <path d="M320 205 C 360 240, 420 270, 470 340 C 490 370, 505 395, 520 420" stroke="url(#atpRoot)" strokeWidth="4.5" />
          {/* Rễ nhánh */}
          <path d="M250 255 C 200 255, 150 275, 105 315" stroke="#D8B4FE" strokeWidth="3" />
          <path d="M390 255 C 440 255, 490 275, 535 315" stroke="#D8B4FE" strokeWidth="3" />
          <path d="M170 340 C 210 352, 238 380, 246 424" stroke="#D8B4FE" strokeWidth="2.6" />
          <path d="M470 340 C 430 352, 402 380, 394 424" stroke="#D8B4FE" strokeWidth="2.6" />
          <path d="M320 330 C 296 350, 280 372, 274 400" stroke="#C084FC" strokeWidth="2.2" />
          <path d="M320 330 C 344 350, 360 372, 366 400" stroke="#C084FC" strokeWidth="2.2" />
        </g>

        {/* Lông hút */}
        <g stroke="#E9D5FF" strokeWidth="1.1" strokeLinecap="round" opacity="0.8">
          {HAIRS.map((h, i) => (
            <line key={i} x1={h.x1} y1={h.y1} x2={h.x2} y2={h.y2} />
          ))}
        </g>

        {/* Dòng năng lượng chạy từ rễ về trạm ATP */}
        <g fill="none" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 8" opacity="0.9">
          <path d="M176 270 C 210 276, 236 296, 262 312">
            <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.4s" repeatCount="indefinite" />
          </path>
          <path d="M464 270 C 430 276, 404 296, 378 312">
            <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.4s" repeatCount="indefinite" />
          </path>
        </g>

        {/* ===== ION PHOTPHAT ===== */}
        {IONS.map((ion, i) => (
          <g key={i} transform={`translate(${ion.x} ${ion.y})`}>
            <g>
              <animateMotion
                path={`M0 0 L ${ion.dx} ${ion.dy}`}
                dur="4.8s"
                begin={ion.begin}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.12;0.85;1"
                dur="4.8s"
                begin={ion.begin}
                repeatCount="indefinite"
              />
              <circle r="20" fill="#A855F7" opacity="0.25" filter="url(#atpSoftGlow)" />
              <circle r="18" fill="url(#atpIon)" stroke="#D8B4FE" strokeWidth="1.6" />
              <text y="3.5" textAnchor="middle" fill="#FFF" fontSize="9.5" fontWeight="800">
                {ion.label}
              </text>
            </g>
          </g>
        ))}

        {/* Mũi tên "hấp thụ" */}
        <g fill="#E9D5FF" opacity="0.85" fontSize="10.5" fontWeight="700">
          <text x="34" y="292">Rễ hấp thụ</text>
          <text x="34" y="305">photphat</text>
          <text x="606" y="292" textAnchor="end">Rễ hấp thụ</text>
          <text x="606" y="305" textAnchor="end">photphat</text>
        </g>

        {/* ===== TRẠM PIN ATP ===== */}
        <g transform="translate(255 280)">
          <ellipse cx="65" cy="30" rx="95" ry="52" fill="#FDE047" opacity="0.28" filter="url(#atpSoftGlow)" />
          <rect
            x="0"
            y="0"
            width="130"
            height="62"
            rx="14"
            fill="url(#atpBattery)"
            stroke="#FDE047"
            strokeWidth="3"
            filter="url(#atpShadow)"
          />
          <rect x="130" y="19" width="11" height="24" rx="4" fill="url(#atpGold)" />
          {/* Vạch mức pin */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={10 + i * 29} y="46" width="23" height="8" rx="3" fill="url(#atpGold)">
              <animate
                attributeName="opacity"
                values="0.25;1;1"
                keyTimes="0;0.4;1"
                dur="3.2s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
          {/* Tia chớp */}
          <path d="M70 6 L 50 30 L 66 30 L 58 44 L 86 22 L 70 22 Z" fill="url(#atpGold)" stroke="#B45309" strokeWidth="1" strokeLinejoin="round" />
          <text x="65" y="-10" textAnchor="middle" fill="#FDE047" fontSize="14" fontWeight="900" letterSpacing="1.5">
            NĂNG LƯỢNG ATP
          </text>
          {/* Tia lấp lánh */}
          {[[-14, 12, 0], [146, 6, 0.8], [66, 78, 1.6]].map(([x, y, b], i) => (
            <path
              key={i}
              d={`M${x} ${y - 7} L ${x + 2} ${y - 2} L ${x + 7} ${y} L ${x + 2} ${y + 2} L ${x} ${y + 7} L ${x - 2} ${y + 2} L ${x - 7} ${y} L ${x - 2} ${y - 2} Z`}
              fill="#FEF08A"
            >
              <animate attributeName="opacity" values="0;1;0" dur="2.4s" begin={`${b}s`} repeatCount="indefinite" />
            </path>
          ))}
        </g>

        {/* ===== BẢNG PHÂN TỬ ATP ===== */}
        <g>
          <rect x="52" y="440" width="536" height="96" rx="18" fill="#1A0838" opacity="0.88" stroke="#7E22CE" strokeWidth="1.5" />
          <text x="320" y="458" textAnchor="middle" fill="#E9D5FF" fontSize="11.5" fontWeight="800">
            Cấu tạo phân tử ATP
          </text>

          {/* Adenine */}
          <polygon points="137,490 126,509 104,509 93,490 104,471 126,471" fill="#38BDF8" stroke="#BAE6FD" strokeWidth="1.6" />
          <text x="115" y="495" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="900">A</text>
          <line x1="137" y1="490" x2="166" y2="487" stroke="#E9D5FF" strokeWidth="2.2" />

          {/* Ribose */}
          <polygon points="185,470 204,484 197,506 173,506 166,484" fill="#F9A8D4" stroke="#FBCFE8" strokeWidth="1.6" />
          <text x="185" y="492" textAnchor="middle" fill="#831843" fontSize="10" fontWeight="800">Ribose</text>
          <line x1="204" y1="486" x2="236" y2="490" stroke="#E9D5FF" strokeWidth="2.2" />

          {/* 3 nhóm photphat */}
          {[258, 323, 388].map((cx, i) => (
            <g key={cx}>
              <circle cx={cx} cy="490" r="19" fill="url(#atpGold)" stroke="#B45309" strokeWidth="1.6" />
              <text x={cx} y="495" textAnchor="middle" fill="#78350F" fontSize="14" fontWeight="900">P</text>
            </g>
          ))}
          <line x1="277" y1="490" x2="304" y2="490" stroke="#E9D5FF" strokeWidth="2.2" />
          {/* Liên kết giàu năng lượng */}
          <line x1="342" y1="490" x2="369" y2="490" stroke="#FDE047" strokeWidth="3.2" strokeDasharray="4 3" filter="url(#atpGlow)">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
          </line>
          <path d="M351 476 L 346 489 L 354 489 L 349 503 L 362 486 L 354 486 L 358 476 Z" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" />

          {/* Chú thích */}
          <text x="115" y="526" textAnchor="middle" fill="#BAE6FD" fontSize="10" fontWeight="700">Adenine</text>
          <text x="185" y="526" textAnchor="middle" fill="#FBCFE8" fontSize="10" fontWeight="700">Đường</text>
          <text x="323" y="526" textAnchor="middle" fill="#FDE68A" fontSize="10" fontWeight="700">3 nhóm photphat (P)</text>
          <text x="488" y="486" textAnchor="middle" fill="#FDE047" fontSize="11" fontWeight="800">Bẻ liên kết P–P</text>
          <text x="488" y="502" textAnchor="middle" fill="#FDE047" fontSize="11" fontWeight="800">giải phóng năng lượng</text>
        </g>

        {/* ===== TIÊU ĐỀ ===== */}
        <g>
          <rect x="22" y="16" width="292" height="30" rx="15" fill="#F3EEFF" stroke="#8C6BFA" strokeWidth="1.6" filter="url(#atpShadow)" />
          <text x="168" y="36" textAnchor="middle" fill="#5B21B6" fontSize="13" fontWeight="800">
            ⚡ Photpho: pin năng lượng của tế bào
          </text>
        </g>
      </g>
    </svg>
  );
}