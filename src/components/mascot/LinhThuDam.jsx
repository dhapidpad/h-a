import React, { useState, useRef, useEffect } from 'react';

/**
 * LINH THÚ 1: BÉ ĐẠM — SPROUTY N (Mầm Xanh Lá Chibi) — bản cute++
 * emotion: happy | cheering (S03) | teacher (S04) | champion (S05) | shocked (S06) | engineer (S07) | gardener (S08)
 * Giữ nguyên props: emotion, size, className. 100% SVG, không emoji.
 * Mới: tay có bàn tay, lá có gân + chồi cuộn, mắt anime nhiều lớp, pom-pom xơ, vòng nguyệt quế thật,
 *      lục lạp cho giáo viên, đường sốc cho hoảng hốt, nấm đất cho làm vườn, pháo hoa tim-sao khi bấm.
 */

const STAR5 = 'M0 -6 L1.8 -1.9 L6.3 -1.9 L2.7 0.9 L4 5.2 L0 2.6 L-4 5.2 L-2.7 0.9 L-6.3 -1.9 L-1.8 -1.9Z';
const SPARK = 'M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8Z';
const HEART = 'M0 3 C-6 -3 -8 -8 -4 -9 C-2 -10 0 -8 0 -6 C0 -8 2 -10 4 -9 C8 -8 6 -3 0 3Z';
const OUT = '#14532D';

const BURST = Array.from({ length: 10 }).map((_, i) => {
  const a = (i / 10) * Math.PI * 2;
  return {
    dx: Math.round(Math.cos(a) * 62), dy: Math.round(Math.sin(a) * 40 - 28),
    rot: (i % 2 ? 1 : -1) * (90 + i * 20), shape: ['heart', 'star', 'spark'][i % 3],
    color: ['#F472B6', '#FDE047', '#86EFAC', '#7DD3FC', '#C4B5FD'][i % 5], dl: (i % 3) * 0.05,
  };
});

const CSS = `
.dam-wrap{outline:none;transition:filter .3s}
.dam-wrap:hover{filter:drop-shadow(0 14px 28px rgba(34,197,94,.55))!important}
.dam-wrap:focus-visible{box-shadow:0 0 0 3px #fff,0 0 0 6px #22C55E;border-radius:24px}
.dam-wrap.is-booped{animation:damBoop .65s cubic-bezier(.34,1.56,.64,1)}
.dam-blink{transform-box:fill-box;transform-origin:50% 50%;animation:damBlink 4.2s infinite}
.dam-burst{transform-box:fill-box;transform-origin:50% 50%;opacity:0;animation:damBurst .9s ease-out var(--dl,0s) forwards}
.dam-halo{transform-box:fill-box;transform-origin:50% 50%;animation:damHalo 1.4s ease-in-out infinite}
@keyframes damBreathe{0%,100%{transform:translateY(0) scale(1,1)}50%{transform:translateY(-5px) scale(1.02,.98)}}
@keyframes damLeafL{0%,100%{transform:rotate(0)}50%{transform:rotate(-8deg)}}
@keyframes damLeafR{0%,100%{transform:rotate(0)}50%{transform:rotate(8deg)}}
@keyframes damBlink{0%,92%,100%{transform:scaleY(1)}96%{transform:scaleY(.08)}}
@keyframes damFloat{0%,100%{transform:translateY(0) scale(.95);opacity:.75}50%{transform:translateY(-7px) scale(1.15);opacity:1}}
@keyframes damWave{0%,100%{transform:rotate(0)}50%{transform:rotate(10deg)}}
@keyframes damShock{0%,100%{transform:translateX(0)}25%{transform:translateX(-1.5px) rotate(-1deg)}75%{transform:translateX(1.5px) rotate(1deg)}}
@keyframes damBoop{0%{transform:scale(1)}25%{transform:scale(1.14,.88) translateY(4px)}55%{transform:scale(.94,1.1) translateY(-8px)}100%{transform:scale(1)}}
@keyframes damBurst{0%{opacity:1;transform:translate(0,0) scale(.2) rotate(0)}100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(1.2) rotate(var(--r))}}
@keyframes damHalo{0%,100%{opacity:.25;transform:scale(.9)}50%{opacity:.7;transform:scale(1.15)}}
@media (prefers-reduced-motion:reduce){.dam-wrap,.dam-wrap *{animation:none!important}}
`;

/* Tay có viền + bàn tay; children (đạo cụ) vẽ dưới bàn tay để trông như đang cầm */
function Arm({ d, hand, origin, anim, children }) {
  return (
    <g style={anim ? { transformOrigin: origin, animation: anim } : undefined}>
      <path d={d} fill="none" stroke={OUT} strokeWidth="10.5" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#4ADE80" strokeWidth="6.5" strokeLinecap="round" />
      {children}
      <circle cx={hand[0]} cy={hand[1]} r="6.2" fill="#86EFAC" stroke={OUT} strokeWidth="2.2" />
      <circle cx={hand[0] - 2} cy={hand[1] - 2.2} r="1.8" fill="#fff" opacity=".75" />
    </g>
  );
}

/* Lá non có gân lá, viền sáng, mép cong */
function Leaf({ side, anim }) {
  const s = side;
  const x = (v) => 90 + s * (v - 90);
  return (
    <g style={{ transformOrigin: '90px 45px', animation: anim }}>
      <path d={`M 90 45 C ${x(62)} 12, ${x(24)} 20, ${x(40)} 46 C ${x(50)} 62, ${x(78)} 55, 90 45 Z`}
        fill="url(#damLeaf3D)" stroke={OUT} strokeWidth="2.8" strokeLinejoin="round" />
      <path d={`M ${x(84)} 45 Q ${x(60)} 36, ${x(44)} 40`} fill="none" stroke="#ECFCCB" strokeWidth="2" strokeLinecap="round" opacity=".9" />
      {[[70, 40, 62, 30], [62, 40, 52, 32], [56, 43, 46, 38]].map(([a, b, c, e], i) => (
        <path key={i} d={`M ${x(a)} ${b} L ${x(c)} ${e}`} stroke="#15803D" strokeWidth="1.2" strokeLinecap="round" opacity=".55" />
      ))}
      <path d={`M ${x(44)} 24 Q ${x(34)} 28, ${x(34)} 38`} fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".5" />
    </g>
  );
}

/* Mắt anime nhiều lớp (hoặc mắt ngôi sao khi cổ vũ / vô địch) */
function Eyes({ star }) {
  return (
    <g className="dam-blink">
      {[68, 112].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="100" rx={star ? 8.5 : 8} ry={star ? 10.5 : 10} fill="url(#damEyeIris)" stroke="#052E16" strokeWidth="2" />
          {star ? (
            <g transform={`translate(${cx} 100)`}><path d={STAR5} fill="#FDE047" stroke="#CA8A04" strokeWidth=".6" transform="scale(1.05)" /></g>
          ) : (
            <>
              <circle cx={cx - 3} cy="95" r="3.6" fill="#fff" />
              <circle cx={cx + 3} cy="104" r="1.8" fill="#fff" />
              <circle cx={cx + 4.5} cy="97" r=".9" fill="#fff" opacity=".8" />
            </>
          )}
          {star && <circle cx={cx - 4} cy="94" r="2.2" fill="#fff" />}
        </g>
      ))}
      <path d="M 58 93 Q 68 85, 77 94" fill="none" stroke="#052E16" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 103 94 Q 112 85, 122 93" fill="none" stroke="#052E16" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 58 93 L 54 89 M 62 90 L 59 85" stroke="#052E16" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 122 93 L 126 89 M 118 90 L 121 85" stroke="#052E16" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

export default function LinhThuDam({ emotion = 'happy', size = 140, className = '' }) {
  const [booped, setBooped] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const handleBoop = () => {
    clearTimeout(timer.current);
    setBooped(false);
    requestAnimationFrame(() => {
      setBooped(true);
      timer.current = setTimeout(() => setBooped(false), 900);
    });
  };

  const isStar = emotion === 'champion' || emotion === 'cheering';
  const plain = !['teacher', 'engineer', 'shocked', 'gardener', 'champion'].includes(emotion);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleBoop}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleBoop(); } }}
      className={`linh-thu-mascot linh-thu-dam dam-wrap ${booped ? 'is-booped' : ''} ${className}`}
      aria-label="Bé Đạm — Sprouty N"
      style={{
        width: size, height: size, position: 'relative', cursor: 'pointer', userSelect: 'none',
        filter: 'drop-shadow(0 12px 24px rgba(34, 197, 94, 0.38))',
      }}
      title="Bé Đạm — Sprouty N: Động cơ của màu xanh và sinh khối (Bấm vào bé để tương tác!)"
    >
      <style>{CSS}</style>

      <svg viewBox="0 0 180 180" width="100%" height="100%" aria-hidden="true"
        style={{ overflow: 'visible', animation: emotion === 'shocked' ? 'damShock .35s ease-in-out infinite' : 'damBreathe 3.2s ease-in-out infinite' }}>
        <defs>
          <radialGradient id="damBody3D" cx="35%" cy="28%" r="68%">
            <stop offset="0" stopColor="#D9F99D" /><stop offset=".28" stopColor="#86EFAC" />
            <stop offset=".68" stopColor="#22C55E" /><stop offset="1" stopColor="#15803D" />
          </radialGradient>
          <radialGradient id="damBellyGlow" cx="50%" cy="40%" r="55%">
            <stop offset="0" stopColor="#ECFDF5" stopOpacity=".8" /><stop offset="1" stopColor="#86EFAC" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="damLeaf3D" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ECFCCB" /><stop offset=".45" stopColor="#4ADE80" /><stop offset="1" stopColor="#15803D" />
          </linearGradient>
          <linearGradient id="damEyeIris" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#064E3B" /><stop offset=".55" stopColor="#047857" /><stop offset="1" stopColor="#34D399" />
          </linearGradient>
          <radialGradient id="damBlushGrad">
            <stop offset="0" stopColor="#FB7185" stopOpacity=".9" /><stop offset="1" stopColor="#FB7185" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="damGoldCup" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FEF08A" /><stop offset=".5" stopColor="#FACC15" /><stop offset="1" stopColor="#CA8A04" />
          </linearGradient>
          <radialGradient id="damOrb">
            <stop offset="0" stopColor="#FEF9C3" stopOpacity="1" /><stop offset="1" stopColor="#FDE047" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* bóng đổ + nền đất */}
        <ellipse cx="90" cy="166" rx="46" ry="8" fill="rgba(21,128,61,.24)" />
        {emotion === 'gardener' && (
          <g>
            <path d="M 34 168 Q 48 150, 70 160 Q 90 150, 112 160 Q 134 150, 148 168 Z" fill="#92400E" stroke="#78350F" strokeWidth="2" />
            <circle cx="60" cy="163" r="1.6" fill="#78350F" /><circle cx="100" cy="164" r="1.6" fill="#78350F" /><circle cx="128" cy="162" r="1.6" fill="#78350F" />
          </g>
        )}

        {/* hạt bay quanh: nguyên tố N (hoặc lục lạp khi làm giáo viên) + lấp lánh */}
        <g style={{ animation: 'damFloat 2.8s ease-in-out infinite' }}>
          {emotion === 'teacher' ? (
            <g>
              <ellipse cx="24" cy="54" rx="15" ry="10" fill="#4ADE80" stroke="#15803D" strokeWidth="2" transform="rotate(-20 24 54)" />
              {[[-6, 1], [3, -2], [11, -5]].map(([x, y], i) => (
                <ellipse key={i} cx={24 + x} cy={54 + y} rx="3.5" ry="2" fill="#15803D" opacity=".7" transform={`rotate(-20 ${24 + x} ${54 + y})`} />
              ))}
              <text x="24" y="76" textAnchor="middle" fill="#B45309" fontSize="8.5" fontWeight="900" fontFamily="sans-serif">Mg²⁺</text>
            </g>
          ) : (
            <g>
              <circle cx="24" cy="54" r="15" fill="url(#damOrb)" opacity=".55" />
              <circle cx="24" cy="54" r="10" fill="#ECFDF5" stroke="#22C55E" strokeWidth="2" />
              <circle cx="21" cy="50" r="2.4" fill="#fff" />
              <text x="24" y="58" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="900" fontFamily="sans-serif">N</text>
            </g>
          )}
          <path d="M 154 44 L 157 50 L 163 53 L 157 56 L 154 62 L 151 56 L 145 53 L 151 50 Z" fill="#FDE047" stroke="#F59E0B" strokeWidth=".8" />
          <g transform="translate(160 122) scale(.7)"><path d={SPARK} fill="#FDE68A" /></g>
          <g transform="translate(14 118) scale(.55)"><path d={SPARK} fill="#BBF7D0" /></g>
          {isStar && (
            <>
              <g transform="translate(40 26) scale(1.1)"><path d={STAR5} fill="#FDE047" stroke="#F59E0B" strokeWidth=".6" /></g>
              <g transform="translate(140 22) scale(.9)"><path d={STAR5} fill="#F9A8D4" stroke="#EC4899" strokeWidth=".6" /></g>
              <g transform="translate(168 90) scale(.8)"><path d={STAR5} fill="#7DD3FC" stroke="#0284C7" strokeWidth=".6" /></g>
            </>
          )}
        </g>

        {/* chân mũm mĩm có ngón */}
        {[70, 110].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx} cy="153" rx="13.5" ry="9" fill="#15803D" stroke="#052E16" strokeWidth="2.5" />
            <ellipse cx={cx} cy="151" rx="6.5" ry="3.5" fill="#86EFAC" opacity=".6" />
            <path d={`M ${cx - 4} 157 L ${cx - 4} 160 M ${cx} 158 L ${cx} 161 M ${cx + 4} 157 L ${cx + 4} 160`} stroke="#052E16" strokeWidth="1.3" strokeLinecap="round" opacity=".5" />
          </g>
        ))}

        {/* chồi cuộn + hai lá */}
        <path d="M 90 42 L 90 58" stroke={OUT} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 90 46 Q 90 30, 99 28 Q 106 28, 103 35" fill="none" stroke={OUT} strokeWidth="3.6" strokeLinecap="round" />
        <path d="M 90 46 Q 90 30, 99 28 Q 106 28, 103 35" fill="none" stroke="#4ADE80" strokeWidth="1.6" strokeLinecap="round" />
        <Leaf side={-1} anim="damLeafL 2.4s ease-in-out infinite" />
        <Leaf side={1} anim="damLeafR 2.4s ease-in-out infinite" />
        <circle cx="48" cy="34" r="3.6" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" />
        <circle cx="47" cy="33" r="1.2" fill="#fff" />

        {/* thân mầm tròn + viền sáng */}
        <ellipse cx="90" cy="108" rx="54" ry="49" fill="url(#damBody3D)" stroke={OUT} strokeWidth="3.2" />
        <path d="M 136 88 Q 146 112, 128 140" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".22" />
        <ellipse cx="72" cy="76" rx="22" ry="10" transform="rotate(-18 72 76)" fill="#fff" opacity=".4" />
        <circle cx="52" cy="88" r="4" fill="#fff" opacity=".4" />
        <circle cx="45" cy="97" r="1.8" fill="#fff" opacity=".35" />
        <ellipse cx="90" cy="126" rx="32" ry="22" fill="url(#damBellyGlow)" />
        {[[-12, -2], [0, -6], [12, -2]].map(([x, y], i) => (
          <circle key={i} cx={90 + x} cy={124 + y} r="1.2" fill="#15803D" opacity=".28" />
        ))}
        <circle cx="90" cy="140" r="10" fill="#ECFDF5" stroke="#15803D" strokeWidth="2" />
        <circle cx="87" cy="137" r="2" fill="#fff" />
        <text x="90" y="144" textAnchor="middle" fill="#15803D" fontSize="10.5" fontWeight="900" fontFamily="sans-serif">N</text>

        {/* ===== phụ kiện đầu ===== */}
        {emotion === 'gardener' && (
          <g transform="translate(90 56)">
            <polygon points="-48,14 48,14 0,-20" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.8" strokeLinejoin="round" />
            <path d="M -34 5 Q 0 11, 34 5" fill="none" stroke="#EAB308" strokeWidth="1.8" />
            <path d="M -20 -4 Q 0 1, 20 -4" fill="none" stroke="#EAB308" strokeWidth="1.8" />
            <path d="M -40 10 Q 0 17, 40 10" fill="none" stroke="#EAB308" strokeWidth="1.4" opacity=".7" />
            <circle cx="0" cy="-20" r="3.5" fill="#CA8A04" />
            <path d="M -28 14 Q 0 32, 28 14" fill="none" stroke="#4ADE80" strokeWidth="2.2" strokeDasharray="3 2" />
            <g transform="translate(-28 16)"><path d="M0 0 Q-6 -5 -9 1 Q-6 6 0 0Z M0 0 Q6 -5 9 1 Q6 6 0 0Z" fill="#4ADE80" stroke="#15803D" strokeWidth="1" /><circle r="2" fill="#16A34A" /></g>
          </g>
        )}
        {emotion === 'engineer' && (
          <g transform="translate(0 -4)">
            <path d="M 50 64 C 50 34, 130 34, 130 64 Z" fill="url(#damGoldCup)" stroke="#B45309" strokeWidth="2.8" />
            <rect x="82" y="38" width="16" height="22" rx="5" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />
            <path d="M 62 52 Q 66 42, 74 40 M 118 52 Q 114 42, 106 40" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".6" />
            <ellipse cx="90" cy="64" rx="46" ry="11" fill="#FACC15" stroke="#B45309" strokeWidth="2.8" />
            <circle cx="90" cy="51" r="6.5" fill="#22C55E" stroke="#fff" strokeWidth="1.5" />
            <text x="90" y="54" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">N</text>
          </g>
        )}
        {emotion === 'champion' && (
          <g transform="translate(90 58)">
            {[1, -1].map((s) => (
              <g key={s} transform={`scale(${s} 1)`}>
                <path d="M 38 10 Q 42 -8, 14 -14" fill="none" stroke="#CA8A04" strokeWidth="3" strokeLinecap="round" />
                {[[37, 4, 40], [37, -2, 20], [33, -7, 5], [27, -11, -10], [20, -13, -20]].map(([x, y, r], i) => (
                  <ellipse key={i} cx={x} cy={y} rx="6" ry="2.8" transform={`rotate(${r} ${x} ${y})`} fill="#FACC15" stroke="#B45309" strokeWidth="1.1" />
                ))}
              </g>
            ))}
            <g transform="translate(0 -10)"><path d={STAR5} fill="#FDE047" stroke="#CA8A04" strokeWidth="1.2" transform="scale(2.2)" /></g>
          </g>
        )}
        {emotion === 'teacher' && (
          <g transform="translate(0 2)">
            <circle cx="68" cy="100" r="15" fill="rgba(224,242,254,.35)" stroke="#F59E0B" strokeWidth="3" />
            <circle cx="112" cy="100" r="15" fill="rgba(224,242,254,.35)" stroke="#F59E0B" strokeWidth="3" />
            <line x1="83" y1="100" x2="97" y2="100" stroke="#F59E0B" strokeWidth="3" />
            <line x1="42" y1="96" x2="53" y2="99" stroke="#F59E0B" strokeWidth="2.5" />
            <line x1="127" y1="99" x2="138" y2="96" stroke="#F59E0B" strokeWidth="2.5" />
            <line x1="60" y1="92" x2="66" y2="88" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="104" y1="92" x2="110" y2="88" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}
        {plain && (
          <g transform="translate(0 -6)">
            <path d="M 42 76 Q 90 82, 138 76" fill="none" stroke="#0369A1" strokeWidth="4" />
            {[55, 95].map((x) => (
              <g key={x}>
                <rect x={x} y="63" width="30" height="20" rx="9" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
                <rect x={x + 3} y="66" width="24" height="14" rx="6" fill="#7DD3FC" opacity=".35" />
                <path d={`M ${x + 6} 68 L ${x + 16} 68`} stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            ))}
            <line x1="85" y1="73" x2="95" y2="73" stroke="#0284C7" strokeWidth="3.5" />
          </g>
        )}

        {/* má hồng */}
        <ellipse cx="56" cy="112" rx="11" ry="6.5" fill="url(#damBlushGrad)" />
        <ellipse cx="124" cy="112" rx="11" ry="6.5" fill="url(#damBlushGrad)" />
        {[52, 57, 120, 125].map((x) => (
          <line key={x} x1={x} y1="111" x2={x + 3} y2="114" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
        ))}

        {/* mắt */}
        {emotion === 'shocked' ? (
          <g>
            {[68, 112].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy="100" r="10.5" fill="#fff" stroke="#0F172A" strokeWidth="2.5" />
                <circle cx={cx} cy="100" r="4.6" fill="#0F172A" />
                <circle cx={cx - 2} cy="98" r="1.8" fill="#fff" />
              </g>
            ))}
            <path d="M 56 86 Q 66 82, 74 88" fill="none" stroke="#052E16" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M 124 86 Q 114 82, 106 88" fill="none" stroke="#052E16" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M 134 82 C 134 75, 140 70, 140 70 C 140 70, 146 75, 146 82 C 146 86, 143 89, 140 89 C 137 89, 134 86, 134 82 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
            <ellipse cx="138" cy="80" rx="1.6" ry="2.6" fill="#fff" opacity=".7" />
            {/* đường sốc */}
            <path d="M 44 62 L 52 70 M 38 74 L 48 78 M 136 60 L 128 68 M 146 70 L 138 76" stroke="#F59E0B" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        ) : (
          <Eyes star={isStar} />
        )}

        {/* miệng / mặt nạ */}
        {emotion === 'shocked' ? (
          <g>
            <line x1="48" y1="112" x2="70" y2="116" stroke="#334155" strokeWidth="3" />
            <line x1="132" y1="112" x2="110" y2="116" stroke="#334155" strokeWidth="3" />
            {[64, 116].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy="122" r="9" fill="#94A3B8" stroke="#1E293B" strokeWidth="2" />
                <path d={`M ${cx - 5} 119 L ${cx + 5} 119 M ${cx - 5} 123 L ${cx + 5} 123 M ${cx - 4} 127 L ${cx + 4} 127`} stroke="#475569" strokeWidth="1.2" />
              </g>
            ))}
            <rect x="70" y="108" width="40" height="24" rx="10" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2.5" />
            <circle cx="90" cy="120" r="6" fill="#38BDF8" stroke="#0369A1" strokeWidth="1.8" />
            <circle cx="88" cy="118" r="1.8" fill="#fff" />
            <g style={{ animation: 'damFloat 2s ease-in-out infinite' }}>
              <ellipse cx="32" cy="96" rx="16" ry="10" fill="#FEF08A" stroke="#EA580C" strokeWidth="1.8" />
              <circle cx="22" cy="88" r="5" fill="#FEF08A" stroke="#EA580C" strokeWidth="1.5" />
              <text x="32" y="99" textAnchor="middle" fill="#C2410C" fontSize="8.5" fontWeight="900">NH₃↑</text>
            </g>
          </g>
        ) : isStar ? (
          <g>
            <path d="M 78 110 Q 90 129, 102 110 Z" fill="#9F1239" stroke="#052E16" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M 82 118 Q 90 126, 98 118 Z" fill="#FB7185" />
            <path d="M 82 111 L 98 111" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".85" />
          </g>
        ) : (
          <path d="M 81 112 Q 85.5 117, 90 112 Q 94.5 117, 99 112" fill="none" stroke="#052E16" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* ===== tay + đạo cụ theo slide ===== */}
        {/* tay trái */}
        {emotion === 'cheering' ? (
          <Arm d="M 42 112 Q 24 96, 20 84" hand={[20, 84]} origin="42px 110px" anim="damWave .9s ease-in-out infinite">
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return <line key={i} x1="18" y1="78" x2={18 + Math.cos(a) * 15} y2={78 + Math.sin(a) * 15} stroke={i % 2 ? '#FACC15' : '#4ADE80'} strokeWidth="3.2" strokeLinecap="round" />;
            })}
            <circle cx="18" cy="78" r="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.6" />
          </Arm>
        ) : emotion === 'champion' ? (
          <Arm d="M 40 114 Q 24 96, 26 80" hand={[26, 80]} origin="40px 112px" anim="damWave 1.2s ease-in-out infinite" />
        ) : emotion === 'shocked' ? (
          <Arm d="M 40 116 Q 30 112, 34 104" hand={[34, 104]} />
        ) : (
          <Arm d="M 40 114 Q 24 104, 24 118" hand={[24, 118]} />
        )}

        {/* tay phải */}
        {emotion === 'cheering' && (
          <Arm d="M 138 112 Q 154 96, 158 84" hand={[158, 84]} origin="138px 110px" anim="damWave .9s ease-in-out infinite">
            <line x1="158" y1="84" x2="164" y2="56" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
            <circle className="dam-halo" cx="164" cy="52" r="20" fill="url(#damOrb)" />
            <circle cx="164" cy="52" r="11" fill="#FEF08A" stroke="#F59E0B" strokeWidth="2" />
            <text x="164" y="55" textAnchor="middle" fill="#B45309" fontSize="7.5" fontWeight="900">NPK</text>
          </Arm>
        )}
        {emotion === 'teacher' && (
          <Arm d="M 136 114 Q 148 106, 150 96" hand={[150, 96]} origin="136px 112px" anim="damWave 2s ease-in-out infinite">
            <line x1="146" y1="100" x2="166" y2="58" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
            <g transform="translate(166 50) scale(1.2)"><path d={STAR5} fill="#FDE047" stroke="#EA580C" strokeWidth="1.2" /></g>
          </Arm>
        )}
        {emotion === 'champion' && (
          <g transform="translate(128 68)" style={{ animation: 'damFloat 2.2s ease-in-out infinite' }}>
            <Arm d="M -6 44 Q 8 36, 14 28" hand={[14, 30]} />
            <path d="M 4 0 L 34 0 L 29 26 C 28 32, 10 32, 9 26 Z" fill="url(#damGoldCup)" stroke="#B45309" strokeWidth="2.2" />
            <path d="M 4 5 Q -6 12, 7 20" fill="none" stroke="#B45309" strokeWidth="2.5" />
            <path d="M 34 5 Q 44 12, 31 20" fill="none" stroke="#B45309" strokeWidth="2.5" />
            <path d="M 9 3 L 9 20" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".6" />
            <rect x="15" y="29" width="8" height="9" fill="#EAB308" stroke="#B45309" strokeWidth="1.5" />
            <rect x="8" y="38" width="22" height="6" rx="2.5" fill="#B45309" />
            <text x="19" y="17" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="900">46%</text>
          </g>
        )}
        {emotion === 'shocked' && <Arm d="M 140 116 Q 150 112, 146 104" hand={[146, 104]} />}
        {emotion === 'engineer' && (
          <g transform="translate(122 96)">
            <Arm d="M 10 18 Q 20 14, 26 20" hand={[24, 20]} />
            <path d="M 0 18 L 38 18 L 32 34 L 6 34 Z" fill="#F59E0B" stroke="#92400E" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 4 24 L 35 24 M 6 29 L 33 29" stroke="#92400E" strokeWidth="1" opacity=".5" />
            {[[10, 14, 5.5], [28, 14, 5.5], [19, 11, 6], [14, 16, 5], [24, 16, 5]].map(([x, y, r], i) => (
              <g key={i}><circle cx={x} cy={y} r={r} fill="#fff" stroke="#94A3B8" strokeWidth="1.4" /><circle cx={x - 1.5} cy={y - 1.8} r={r * 0.28} fill="#E2E8F0" /></g>
            ))}
            <text x="19" y="31.5" textAnchor="middle" fill="#FEF3C7" fontSize="7" fontWeight="900">UREA</text>
          </g>
        )}
        {emotion === 'gardener' && (
          <g transform="translate(124 92)">
            <line x1="10" y1="4" x2="26" y2="34" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
            <polygon points="22,30 34,25 40,40 28,45" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 25 33 L 34 29" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".7" />
            <Arm d="M 14 22 Q 8 14, 10 4" hand={[10, 5]} />
            <g style={{ animation: 'damFloat 2.4s ease-in-out infinite' }}>
              <path d="M -8 46 Q -14 36, -8 28 Q -2 22, -8 14" fill="none" stroke="#F472B6" strokeWidth="5.5" strokeLinecap="round" />
              <circle cx="-9" cy="14" r="1.5" fill="#0F172A" /><circle cx="-5" cy="14" r="1.5" fill="#0F172A" />
              <path d="M -9 18 Q -7 20 -5 18" fill="none" stroke="#9D174D" strokeWidth="1" strokeLinecap="round" />
            </g>
          </g>
        )}
        {(emotion === 'happy' || plain) && (
          <Arm d="M 140 114 Q 156 100, 156 116" hand={[156, 116]} origin="140px 112px" anim="damWave 1.6s ease-in-out infinite" />
        )}

        {/* pháo hoa tim–sao khi bấm */}
        {booped && (
          <g transform="translate(90 36)">
            {BURST.map((b, i) => (
              <g key={i} className="dam-burst" style={{ '--dx': `${b.dx}px`, '--dy': `${b.dy}px`, '--r': `${b.rot}deg`, '--dl': `${b.dl}s` }}>
                {b.shape === 'heart' && <path d={HEART} fill={b.color} transform="scale(1.3)" />}
                {b.shape === 'star' && <path d={STAR5} fill={b.color} transform="scale(1.2)" />}
                {b.shape === 'spark' && <path d={SPARK} fill={b.color} transform="scale(1.1)" />}
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}