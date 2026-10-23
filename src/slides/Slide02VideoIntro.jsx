import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, FastForward, ArrowRight, Volume2, VolumeX, Mic, MicOff, Sparkles } from 'lucide-react';

/* ============================================================
   KỊCH BẢN: Đất mẹ → Bác nông dân rải phân → Đạm/Lân/Kali khoe công
   → cãi nhau "ai quan trọng nhất" → hòa thuận → chào mừng nhóm
   ============================================================ */
const DUR = 66;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const prog = (t, s, d) => clamp((t - s) / d);
const lerp = (a, b, k) => a + (b - a) * k;
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeIO = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const smoothEnv = (t, a, b, fade = 0.35) => easeIO(prog(t, a, fade)) * (1 - easeIO(prog(t, b - fade, fade)));
const back = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2));
const fmt = (n) => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(Math.floor(n % 60)).padStart(2, '0')}`;

const mixHex = (a, b, k) => {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [A, B] = [p(a), p(b)];
  return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], k))).join(',')})`;
};

const wp = (pts, t) => {
  if (t <= pts[0][0]) return [pts[0][1], pts[0][2]];
  for (let i = 1; i < pts.length; i++) {
    if (t <= pts[i][0]) {
      const [t0, x0, y0] = pts[i - 1];
      const [t1, x1, y1] = pts[i];
      const k = easeIO(clamp((t - t0) / Math.max(0.001, t1 - t0)));
      return [lerp(x0, x1, k), lerp(y0, y1, k)];
    }
  }
  const l = pts[pts.length - 1];
  return [l[1], l[2]];
};

const wrap = (s, n = 20) => {
  const out = [];
  let cur = '';
  s.split(' ').forEach((w) => {
    if ((cur + ' ' + w).trim().length > n && cur) {
      out.push(cur);
      cur = w;
    } else {
      cur = (cur + ' ' + w).trim();
    }
  });
  if (cur) out.push(cur);
  return out;
};

const SCENES = [
  { at: 0, color: '#2F80ED', ink: '#1D6FE0', key: 'Mọi sự sống', rest: ' khởi đầu từ Đất mẹ dịu hiền... 🌱' },
  { at: 6, color: '#E08A1E', ink: '#C2410C', key: 'Bác nông dân ra đồng', rest: ' — rải phân NPK cho cây con đói bụng 🧑‍🌾' },
  { at: 12, color: '#22C55E', ink: '#15803D', key: 'Đạm (N)', rest: ' — Vươn chồi, xanh mướt cành lá sinh khối 🍃' },
  { at: 19, color: '#8B5CF6', ink: '#6D28D9', key: 'Lân (P)', rest: ' — Bám rễ sâu, nạp đầy pin năng lượng ATP ⚡' },
  { at: 26, color: '#F59E0B', ink: '#B45309', key: 'Kali (K)', rest: ' — Trọn vị ngọt ngào, trĩu quả, vững vàng chống chịu 🍊' },
  { at: 33, color: '#EF4444', ink: '#DC2626', key: 'Ai mới là số một?', rest: ' — Màn tranh cãi nảy lửa 💢' },
  { at: 44, color: '#EC4899', ink: '#DB2777', key: 'Hòa thuận', rest: ' — Đủ cả N, P, K cây mới khỏe mạnh 🤝' },
  { at: 55, color: '#2F80ED', ink: '#1D6FE0', key: 'Bộ ba hội tụ', rest: ' — Nền tảng cho mùa vàng bội thu! 🏆✨' },
  { at: 59.6, color: '#F43F5E', ink: '#E11D48', key: 'Chào mừng', rest: ' đến với bài thuyết trình của nhóm em! 🎉' },
];

const SKY_TOP = ['#FFD6EC', '#C8EBFF', '#CCFBF1', '#E5DBFF', '#FFEDD5', '#E2D4E0', '#D8F3FF', '#FEF08A', '#FFD9EC'];
const SKY_BOT = ['#FFF5EE', '#F0F9FF', '#F0FDF4', '#F8F5FF', '#FFFBEB', '#F5EBF2', '#F0FDFA', '#FFFBEB', '#FFF5F8'];

const MASC = [
  {
    id: 'N',
    name: 'Đạm (N)',
    badge: '🍃 Đạm (N)',
    c0: '#BBF7D0',
    c1: '#6EE7A0',
    c2: '#22C55E',
    dark: '#15803D',
    at: 12,
    sorry: 48.5,
    pts: [[12, 325, 220], [31.5, 325, 220], [33.2, 385, 258], [54.2, 385, 258], [55.8, 330, 276]],
  },
  {
    id: 'P',
    name: 'Lân (P)',
    badge: '⚡ Lân (P)',
    c0: '#EDE9FE',
    c1: '#C4B5FD',
    c2: '#8B5CF6',
    dark: '#5B21B6',
    at: 19,
    sorry: 50.8,
    pts: [[19, 685, 435], [20.5, 685, 260], [31.5, 685, 260], [33.2, 640, 258], [54.2, 640, 258], [55.8, 675, 276]],
  },
  {
    id: 'K',
    name: 'Kali (K)',
    badge: '🍊 Kali (K)',
    c0: '#FEF3C7',
    c1: '#FDE68A',
    c2: '#F59E0B',
    dark: '#B45309',
    at: 26,
    sorry: 53.1,
    pts: [[26, 825, 218], [31.5, 825, 218], [33.2, 755, 232], [54.2, 755, 232], [55.8, 820, 276]],
  },
];

const SPK = {
  farmer: ['#F59E0B', '#92400E', '🧑‍🌾 Bác nông dân', '#FEF3C7'],
  plant: ['#22C55E', '#166534', '🌱 Cây con', '#DCFCE7'],
  narr: ['#3B82F6', '#1E3A8A', '✨ Lời dẫn truyện', '#DBEAFE'],
  N: ['#22C55E', '#14532D', '🍃 Đạm (N)', '#DCFCE7'],
  P: ['#8B5CF6', '#4C1D95', '⚡ Lân (P)', '#EDE9FE'],
  K: ['#F59E0B', '#78350F', '🍊 Kali (K)', '#FEF3C7'],
};

/* [cao độ giọng tự nhiên, tốc độ đọc rõ ràng không méo tiếng] */
const VOICE = {
  narr: [1.02, 1.05],
  plant: [1.32, 1.08],
  farmer: [0.85, 1.03],
  N: [1.22, 1.08],
  P: [1.12, 1.07],
  K: [0.95, 1.06],
};

const LINES = [
  { w: 'narr', a: 0.4, b: 4.0, t: 'Mọi sự sống, đều khởi đầu từ đất mẹ.' },
  { w: 'plant', a: 4.3, b: 6.9, t: 'Ui… con đói bụng quá đi mất!' },
  { w: 'farmer', a: 7.2, b: 10.2, t: 'Để bác bón phân NPK cho con nào!' },
  { w: 'plant', a: 10.4, b: 12.3, t: 'Ngon quá! Con khỏe lên rồi!' },
  { w: 'N', a: 12.5, b: 15.8, t: 'Mình là Đạm! Lá xanh mướt là nhờ mình!' },
  { w: 'N', a: 16.0, b: 19.0, t: 'Mình là người quan trọng nhất đó nha!' },
  { w: 'P', a: 19.5, b: 22.8, t: 'Khoan đã! Không có Lân thì rễ đâu mà bám?' },
  { w: 'N', a: 23.0, b: 26.0, t: 'Hứ, rễ nằm dưới đất, ai thèm nhìn chứ!' },
  { w: 'K', a: 26.5, b: 29.7, t: 'Ồn ào quá! Quả ngọt trĩu cành là nhờ Kali!' },
  { w: 'P', a: 29.9, b: 33.0, t: 'Không có rễ khỏe thì quả rụng hết à?' },
  { w: 'N', a: 33.4, b: 35.5, t: 'Đạm mới là số một!' },
  { w: 'P', a: 35.7, b: 37.9, t: 'Không! Lân mới là số một!' },
  { w: 'K', a: 38.1, b: 40.3, t: 'Phải là Kali số một chứ!' },
  { w: 'plant', a: 40.5, b: 44.0, t: 'Ối, mình chóng mặt quá! Đừng cãi nhau nữa!' },
  { w: 'farmer', a: 44.3, b: 48.4, t: 'Ba đứa đều quý như nhau. Thiếu ai cây cũng buồn!' },
  { w: 'N', a: 48.6, b: 50.7, t: 'Mình xin lỗi Cây con nha!' },
  { w: 'P', a: 50.9, b: 53.0, t: 'Lân cũng xin lỗi các bạn!' },
  { w: 'K', a: 53.2, b: 55.2, t: 'Cùng nắm tay tiếp sức cho cây nào!' },
  { w: 'narr', a: 55.4, b: 59.3, t: 'Bộ ba hội tụ, nền tảng cho mùa vàng bội thu!' },
  { w: 'narr', a: 59.7, b: 65.8, t: 'Chào mừng thầy cô và các bạn đến với bài thuyết trình!' },
];

const LEAVES = [
  { u: 0.3, d: -1, at: 13.0, sc: 1.15, rot: -26 },
  { u: 0.3, d: 1, at: 13.18, sc: 1.15, rot: -26 },
  { u: 0.56, d: -1, at: 14.1, sc: 1.02, rot: -20 },
  { u: 0.56, d: 1, at: 14.28, sc: 1.02, rot: -20 },
  { u: 0.82, d: -1, at: 15.2, sc: 0.85, rot: -32 },
  { u: 0.82, d: 1, at: 15.38, sc: 0.85, rot: -32 },
];

const STREAMS = [
  { from: [330, 220], to: [500, 210], c: '#4ADE80', a: 12.6, b: 19 },
  { from: [685, 265], to: [520, 415], c: '#C4B5FD', a: 19.6, b: 26 },
  { from: [825, 222], to: [535, 250], c: '#FBBF24', a: 26.6, b: 33 },
];

const FW = [
  [55.6, 280, 115, '#FF7AA8'],
  [56.4, 730, 105, '#FFD93D'],
  [57.3, 500, 95, '#60A5FA'],
  [58.2, 160, 145, '#4ADE80'],
  [59.0, 850, 150, '#C084FC'],
  [60.8, 370, 90, '#FFD93D'],
  [62.0, 650, 95, '#FF7AA8'],
  [63.4, 510, 80, '#4ADE80'],
];

const GRAN = Array.from({ length: 42 }, (_, i) => ({
  ts: 8 + i * 0.082,
  tx: 435 + ((i * 53) % 150),
  c: ['#4ADE80', '#A78BFA', '#FBBF24'][i % 3],
}));

const CONF = Array.from({ length: 40 }, (_, i) => {
  const r = (n) => {
    const v = Math.sin(i * 97.13 + n * 13.7) * 43758.5453;
    return v - Math.floor(v);
  };
  return {
    x: r(1) * 1000,
    sp: 65 + r(2) * 75,
    ph: r(3) * 320,
    w: 7 + r(4) * 6,
    sw: 12 + r(5) * 26,
    c: ['#FF7AA8', '#FFD93D', '#4ADE80', '#60A5FA', '#C084FC', '#FB923C'][i % 6],
  };
});

const BOKEH = Array.from({ length: 14 }, (_, i) => ({
  x: 60 + ((i * 73) % 880),
  y: 40 + ((i * 47) % 210),
  r: 8 + (i % 4) * 5,
  sp: 0.7 + (i % 3) * 0.35,
  ph: i * 1.3,
}));

/* ================= Âm thanh (WebAudio, không cần file) ================= */
function tone(c, d, f, at, dur, type = 'sine', vol = 0.1, f2) {
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, at);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, at + dur);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(vol, at + 0.018);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g);
  g.connect(d);
  o.start(at);
  o.stop(at + dur + 0.04);
}
const seq = (c, d, n, fs, step, dur, type, vol) =>
  fs.forEach((f, i) => tone(c, d, f, n + i * step, dur, type, vol));

const SFX = {
  chime: (c, d, n) => seq(c, d, n, [1047, 1319, 1568, 2093], 0.08, 0.55, 'sine', 0.11),
  thud: (c, d, n) => tone(c, d, 190, n, 0.2, 'sine', 0.26, 62),
  grow: (c, d, n) => tone(c, d, 280, n, 0.85, 'triangle', 0.07, 880),
  step: (c, d, n) => tone(c, d, 160, n, 0.075, 'triangle', 0.12, 85),
  sprinkle: (c, d, n) => seq(c, d, n, [2093, 2349, 1760, 2637, 1976, 2217, 2489], 0.055, 0.11, 'sine', 0.045),
  gulp: (c, d, n) => {
    tone(c, d, 340, n, 0.11, 'sine', 0.18, 160);
    tone(c, d, 320, n + 0.15, 0.11, 'sine', 0.18, 150);
  },
  pop: (c, d, n) => {
    tone(c, d, 440, n, 0.13, 'sine', 0.2, 1180);
    tone(c, d, 1568, n + 0.09, 0.28, 'sine', 0.08);
  },
  leaf: (c, d, n) => {
    tone(c, d, 620, n, 0.11, 'sine', 0.13, 1320);
    tone(c, d, 1319, n + 0.07, 0.22, 'triangle', 0.06);
  },
  rumble: (c, d, n) => tone(c, d, 95, n, 0.8, 'triangle', 0.08, 58),
  zap: (c, d, n) => {
    tone(c, d, 240, n, 0.26, 'triangle', 0.05, 1480);
    seq(c, d, n + 0.08, [880, 1175, 1568], 0.07, 0.26, 'sine', 0.06);
  },
  bell: (c, d, n) =>
    [784, 988, 1175].forEach((f, i) => {
      tone(c, d, f, n + i * 0.075, 0.9, 'sine', 0.13);
      tone(c, d, f * 2, n + i * 0.075, 0.45, 'sine', 0.035);
    }),
  fruit: (c, d, n) => {
    tone(c, d, 520, n, 0.1, 'sine', 0.16, 980);
    tone(c, d, 1568, n + 0.07, 0.28, 'triangle', 0.065);
  },
  grr: (c, d, n) => {
    tone(c, d, 240, n, 0.38, 'sawtooth', 0.06, 125);
    tone(c, d, 255, n, 0.38, 'triangle', 0.04, 135);
  },
  wobble: (c, d, n) => seq(c, d, n, [520, 440, 540, 420, 560, 400], 0.11, 0.18, 'sine', 0.09),
  boing: (c, d, n) => tone(c, d, 220, n, 0.28, 'triangle', 0.16, 780),
  aww: (c, d, n) => seq(c, d, n, [659, 587, 523], 0.13, 0.38, 'triangle', 0.085),
  bling: (c, d, n) => seq(c, d, n, [1568, 2093, 2637], 0.08, 0.45, 'sine', 0.085),
  boom: (c, d, n) => {
    tone(c, d, 140, n, 0.36, 'sine', 0.25, 45);
    seq(c, d, n + 0.1, [2093, 2637, 3136, 2349], 0.055, 0.36, 'sine', 0.04);
  },
  whoosh: (c, d, n) => tone(c, d, 260, n, 0.55, 'sine', 0.06, 1500),
  fanfare: (c, d, n) => {
    seq(c, d, n, [523, 659, 784, 1047], 0.12, 0.42, 'triangle', 0.16);
    [523, 659, 784, 1047].forEach((f) => tone(c, d, f, n + 0.58, 1.5, 'sine', 0.075));
  },
  shimmer: (c, d, n) => seq(c, d, n, [1568, 1760, 2093, 1760, 2349, 2637], 0.11, 0.45, 'sine', 0.05),
  voiceBlip: (c, d, n, who) => {
    const base = { narr: 660, plant: 880, farmer: 440, N: 784, P: 698, K: 587 }[who] || 660;
    seq(c, d, n, [base, base * 1.18, base * 1.32], 0.045, 0.12, 'sine', 0.035);
  },
};

const CUES = [
  [0.15, 'chime'], [1.1, 'thud'], [2.0, 'grow'],
  [6.2, 'step'], [6.55, 'step'], [6.9, 'step'], [7.25, 'step'], [7.6, 'step'],
  [8.0, 'sprinkle'], [8.9, 'sprinkle'], [9.8, 'sprinkle'], [10.7, 'sprinkle'],
  [10.2, 'gulp'], [10.5, 'chime'],
  [12.0, 'pop'], [13.0, 'leaf'], [14.1, 'leaf'], [15.2, 'leaf'],
  [19.0, 'rumble'], [20.0, 'zap'],
  [26.0, 'bell'], [28.0, 'fruit'], [28.6, 'fruit'], [29.2, 'fruit'], [29.8, 'fruit'],
  [33.2, 'grr'], [35.5, 'grr'], [37.9, 'grr'], [40.2, 'wobble'],
  [44.2, 'boing'], [48.6, 'aww'], [50.9, 'aww'], [53.2, 'aww'], [53.8, 'bling'],
  [55.3, 'fanfare'], [56.5, 'boom'], [57.3, 'boom'], [58.2, 'boom'],
  [59.5, 'whoosh'], [60.0, 'fanfare'], [60.8, 'boom'], [62.0, 'boom'], [63.4, 'boom'], [64.5, 'shimmer'],
];

const NOTES = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
const NOTES_T = [392, 466.16, 523.25, 587.33, 622.25, 698.46];
const MEL = [0, 2, 3, 2, 4, 3, 2, -1, 3, 4, 5, 4, 3, 2, 0, -1];
const BASS = [130.8, 110, 87.3, 98];

function playBeat(c, d, b, tense) {
  const n = c.currentTime + 0.02;
  const m = MEL[b % 16];
  const sc = tense ? NOTES_T : NOTES;
  if (m >= 0) {
    tone(c, d, sc[m], n, tense ? 0.24 : 0.48, tense ? 'triangle' : 'sine', 0.085);
    tone(c, d, sc[m] * 2, n, 0.22, 'sine', 0.02);
  }
  if (b % 4 === 0 || (tense && b % 2 === 0)) {
    tone(c, d, tense ? 98 : BASS[(b >> 2) % 4], n, tense ? 0.28 : 1.6, 'triangle', 0.1);
  }
  if (b % 2 === 1) {
    tone(c, d, sc[(b * 3) % 5] / 2, n, 0.16, 'sine', 0.025);
  }
}

/* ================= Cảnh nền tĩnh (memo — CSS tự chuyển động mượt) ================= */
const Cloud = ({ x, y, s, dur, delay }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <g className="vi-drift" style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}>
      <ellipse cx="0" cy="10" rx="54" ry="17" fill="#FFF" opacity=".95" />
      <circle cx="-20" cy="-4" r="22" fill="#FFF" opacity=".96" />
      <circle cx="14" cy="-11" r="28" fill="#FFF" opacity=".96" />
      <circle cx="36" cy="2" r="18" fill="#FFF" opacity=".95" />
      <ellipse cx="-16" cy="6" rx="4.5" ry="2.8" fill="#FDA4AF" opacity=".75" />
      <ellipse cx="22" cy="6" rx="4.5" ry="2.8" fill="#FDA4AF" opacity=".75" />
      <circle cx="-6" cy="1" r="2.3" fill="#334155" />
      <circle cx="10" cy="1" r="2.3" fill="#334155" />
      <circle cx="-5.2" cy="0.2" r="0.9" fill="#FFF" />
      <circle cx="10.8" cy="0.2" r="0.9" fill="#FFF" />
      <path d="M-1 4 Q2 7 5 4" stroke="#334155" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  </g>
);

const SunFace = React.memo(function SunFace({ happy, worry }) {
  return (
    <g>
      <circle r="54" fill="url(#sunHalo)" opacity=".55" />
      <g className="vi-spin" style={{ transformOrigin: '0px 0px' }}>
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x="-3.5"
            y="-58"
            width="7"
            height="17"
            rx="3.5"
            fill={i % 2 ? '#FBBF24' : '#FDE047'}
            transform={`rotate(${i * 30})`}
          />
        ))}
      </g>
      <circle r="36" fill="url(#sunCore)" stroke="#F59E0B" strokeWidth="2.8" />
      <ellipse cx="-12" cy="-22" rx="10" ry="4.5" fill="#FFF" opacity=".45" transform="rotate(-22 -12 -22)" />
      {happy ? (
        <>
          <path d="M-16 -4 Q-11 -11 -6 -4" stroke="#78350F" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          <path d="M6 -4 Q11 -11 16 -4" stroke="#78350F" strokeWidth="2.8" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="-11" cy="-4" r="3.8" fill="#78350F" />
          <circle cx="11" cy="-4" r="3.8" fill="#78350F" />
          <circle cx="-9.8" cy="-5.4" r="1.4" fill="#FFF" />
          <circle cx="12.2" cy="-5.4" r="1.4" fill="#FFF" />
        </>
      )}
      <ellipse cx="-21" cy="6" rx="6.5" ry="3.8" fill="#FB7185" opacity=".65" />
      <ellipse cx="21" cy="6" rx="6.5" ry="3.8" fill="#FB7185" opacity=".65" />
      {worry ? (
        <path d="M-7 11 Q0 6 7 11" fill="none" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" />
      ) : (
        <path d="M-9 5 Q0 15 9 5" fill="none" stroke="#78350F" strokeWidth="2.6" strokeLinecap="round" />
      )}
    </g>
  );
});

const Scenery = React.memo(function Scenery() {
  const pebbles = [[80, 365, 14], [190, 452, 18], [330, 398, 10], [610, 472, 16], [820, 382, 12], [930, 442, 20], [460, 485, 9]];
  return (
    <g>
      <Cloud x={185} y={92} s={1.02} dur={10} delay={0} />
      <Cloud x={635} y={64} s={1.22} dur={13} delay={-4} />
      <Cloud x={420} y={136} s={0.74} dur={9} delay={-2} />

      {/* Đồi xa & Đồi gần */}
      <path d="M0 288 Q160 222 350 278 T680 262 T1000 272 L1000 340 L0 340Z" fill="url(#hillFar)" />
      <path d="M0 304 Q210 266 430 302 T810 292 T1000 298 L1000 340 L0 340Z" fill="url(#hillNear)" />

      {/* Cây cổ thụ kawaii bên trái */}
      <rect x="44" y="256" width="12" height="54" rx="5" fill="#8B5A2B" />
      <path d="M47 260 V304" stroke="#A67B5B" strokeWidth="2.5" strokeLinecap="round" opacity=".6" />
      <circle cx="50" cy="240" r="35" fill="#4ADE80" />
      <circle cx="25" cy="256" r="24" fill="#86EFAC" />
      <circle cx="75" cy="256" r="24" fill="#22C55E" />
      <circle cx="50" cy="236" r="28" fill="#86EFAC" opacity=".55" />
      <circle cx="38" cy="232" r="4.5" fill="#FB7185" />
      <circle cx="62" cy="246" r="4.5" fill="#FBBF24" />
      <circle cx="28" cy="254" r="4" fill="#FB7185" />
      <circle cx="72" cy="254" r="4" fill="#FFF" />

      {/* Cối xay gió & Nhà nông trại bên phải */}
      <g transform="translate(855, 255)">
        <path d="M-12 52 L-6 0 L6 0 L12 52Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
        <path d="M-8 0 L0 -10 L8 0Z" fill="#EF4444" />
        <g className="vi-spin" style={{ transformOrigin: '0px 4px', animationDuration: '11s' }}>
          {[0, 90, 180, 270].map((a) => (
            <g key={a} transform={`rotate(${a} 0 4)`}>
              <rect x="-2.5" y="-26" width="5" height="24" rx="2" fill="#FDE68A" stroke="#D97706" strokeWidth="1.2" />
            </g>
          ))}
          <circle cy="4" r="4" fill="#D97706" />
        </g>
      </g>

      <rect x="886" y="260" width="84" height="50" rx="4" fill="#EF4444" />
      <path d="M876 262 L928 224 L980 262Z" fill="#B91C1C" stroke="#FFF" strokeWidth="2" strokeLinejoin="round" />
      <rect x="913" y="278" width="30" height="32" rx="4" fill="#FFFBEB" stroke="#991B1B" strokeWidth="2" />
      <path d="M913 278 L943 310 M943 278 L913 310" stroke="#991B1B" strokeWidth="2" />
      <circle cx="928" cy="248" r="6.5" fill="#FFFBEB" stroke="#991B1B" strokeWidth="1.5" />

      {/* Hàng rào gỗ */}
      {[690, 718, 746, 774, 802, 830].map((x) => (
        <rect key={x} x={x} y="282" width="8" height="30" rx="4" fill="#FDE68A" stroke="#D97706" strokeWidth="1.2" />
      ))}
      <rect x="685" y="290" width="156" height="5" rx="2.5" fill="#FCD34D" />
      <rect x="685" y="301" width="156" height="5" rx="2.5" fill="#FCD34D" />

      {/* Nền đất mẹ màu mỡ */}
      <rect x="0" y="320" width="1000" height="180" fill="url(#soil)" />
      <path d="M0 355 Q260 342 520 358 T1000 350 L1000 500 L0 500Z" fill="#432818" opacity=".38" />
      {pebbles.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.62} fill="#8D6B54" opacity=".65" />
      ))}
      {Array.from({ length: 34 }, (_, i) => (
        <circle key={i} cx={(i * 97) % 1000} cy={336 + ((i * 53) % 155)} r={1.8 + (i % 3)} fill="#6F4E37" opacity=".55" />
      ))}

      {/* Bé giun đất hồng hào dễ thương dưới lòng đất */}
      <g transform="translate(260, 425)">
        <path d="M0 0 Q12 -14 24 -4 T46 -8" stroke="#F472B6" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M0 0 Q12 -14 24 -4 T46 -8" stroke="#FBCFE8" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".6" />
        <circle cx="44" cy="-9" r="1.6" fill="#1E293B" />
        <circle cx="49" cy="-8" r="1.6" fill="#1E293B" />
        <ellipse cx="42" cy="-5" rx="2.5" ry="1.4" fill="#FB7185" />
      </g>

      {/* Viền cỏ xanh mướt */}
      <rect x="0" y="312" width="1000" height="13" rx="6.5" fill="url(#turf)" />
    </g>
  );
});

const Grass = React.memo(function Grass() {
  const petals = ['#FF7AA8', '#FACC15', '#FFFFFF', '#FB923C', '#C084FC'];
  return (
    <g>
      {Array.from({ length: 42 }, (_, i) => {
        const x = 10 + i * 24 + (i % 3) * 3;
        const flower = i % 6 === 2;
        const col = petals[i % 5];
        return (
          <g
            key={i}
            className="vi-sway"
            style={{
              transformOrigin: `${x}px 320px`,
              transformBox: 'view-box',
              animationDelay: `${-(i % 6) * 0.4}s`,
              animationDuration: `${2.4 + (i % 4) * 0.4}s`,
            }}
          >
            {flower ? (
              <>
                <path d={`M${x} 320 L${x} 291`} stroke="#16A34A" strokeWidth="2.6" strokeLinecap="round" />
                {[0, 72, 144, 216, 288].map((a) => (
                  <circle
                    key={a}
                    cx={x + Math.cos((a * Math.PI) / 180) * 6.2}
                    cy={289 + Math.sin((a * Math.PI) / 180) * 6.2}
                    r="4.4"
                    fill={col}
                  />
                ))}
                <circle cx={x} cy="289" r="3.4" fill="#F59E0B" />
              </>
            ) : (
              <path
                d={`M${x} 322 q-4 -12 ${i % 2 ? 5 : -5} -${12 + ((i * 7) % 11)}`}
                stroke="#22C55E"
                strokeWidth="3.2"
                fill="none"
                strokeLinecap="round"
              />
            )}
          </g>
        );
      })}
    </g>
  );
});

/* ================= Các mảnh nhỏ Kawaii ================= */
const Leaf = ({ x, y, d = 1, rot = -25, s = 1, c = '#22C55E', c2 = '#86EFAC' }) =>
  s <= 0.001 ? null : (
    <g transform={`translate(${x},${y}) scale(${d * s},${s}) rotate(${rot})`}>
      <path d="M0 0C18-35 68-35 92-4C68 27 20 25 0 0Z" fill={c} stroke="#15803D" strokeWidth="1.5" />
      <path d="M2 -1C18-29 60-29 88-4C60-13 20-9 2 -1Z" fill={c2} opacity=".68" />
      <path d="M5 0Q45-6 82-4" stroke="#FFF" strokeOpacity=".75" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="58" cy="-12" r="3.2" fill="#E0F2FE" opacity=".85" />
      <circle cx="57" cy="-13" r="1.2" fill="#FFF" />
    </g>
  );

const Fruit = ({ x, y, r, swing = 0 }) =>
  r <= 0.5 ? null : (
    <g transform={`translate(${x},${y}) rotate(${swing})`}>
      <line x1="0" y1="0" x2="0" y2="9" stroke="#15803D" strokeWidth="2.8" strokeLinecap="round" />
      <circle cy={r + 8} r={r} fill="url(#fruitG)" stroke="#FFF" strokeWidth="2.4" />
      <ellipse cx={-r * 0.36} cy={r + 8 - r * 0.42} rx={r * 0.28} ry={r * 0.16} fill="#FFF" opacity=".72" />
      <path d="M0 9 q10 -11 17 -2 q-9 9 -17 2z" fill="#22C55E" />
      <circle cx={-r * 0.32} cy={r + 6.5} r="2.1" fill="#431407" />
      <circle cx={r * 0.32} cy={r + 6.5} r="2.1" fill="#431407" />
      <circle cx={-r * 0.32 + 0.7} cy={r + 5.7} r="0.8" fill="#FFF" />
      <circle cx={r * 0.32 + 0.7} cy={r + 5.7} r="0.8" fill="#FFF" />
      <ellipse cx={-r * 0.5} cy={r + 9.5} rx="2.6" ry="1.5" fill="#FB7185" opacity=".75" />
      <ellipse cx={r * 0.5} cy={r + 9.5} rx="2.6" ry="1.5" fill="#FB7185" opacity=".75" />
      <path d={`M${-r * 0.22} ${r + 10.5} Q0 ${r + 14.5} ${r * 0.22} ${r + 10.5}`} stroke="#431407" strokeWidth="1.7" fill="none" strokeLinecap="round" />
    </g>
  );

const Spark = ({ x, y, s, c, o = 1, rot = 0 }) =>
  s <= 0 ? null : (
    <path
      d="M0 -7.5L2 -2L7.5 0L2 2L0 7.5L-2 2L-7.5 0L-2 -2Z"
      fill={c}
      opacity={o}
      transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}
    />
  );

const Burst = ({ t, x, y, c, since, n = 10, R = 64, sz = 1.45 }) => {
  const k = prog(t, since, 1.1);
  if (k <= 0 || k >= 1) return null;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        const r = R * 0.35 + R * easeOut(k);
        return (
          <Spark
            key={i}
            x={x + Math.cos(a) * r}
            y={y + Math.sin(a) * r}
            s={sz * (1 - k)}
            c={i % 2 ? '#FFF' : c}
            o={1 - k}
            rot={k * 120}
          />
        );
      })}
    </g>
  );
};

/* Bóng thoại SVG chống giật: Tọa độ đã làm tròn & cố định neo, có nhãn tên nhân vật rõ nét */
const Bubble = ({ x, y, text, who, k }) => {
  const lines = wrap(text, 22);
  const [c, ink, label, badgeBg] = SPK[who];
  const W = Math.max(150, Math.max(...lines.map((l) => l.length)) * 8.2 + 38);
  const H = lines.length * 21 + 34;
  const cx = Math.round(clamp(x, W / 2 + 14, 986 - W / 2));
  const cy = Math.round(clamp(y, H + 22, 460));
  const tx = Math.round(clamp(x - cx, -W / 2 + 24, W / 2 - 24));
  const sc = Math.round(k * 1000) / 1000;

  return (
    <g transform={`translate(${cx},${cy}) scale(${sc})`} style={{ textRendering: 'geometricPrecision' }}>
      {/* Bóng đổ dịu nhẹ không dùng Gaussian filter nặng */}
      <rect x={-W / 2 + 2} y={-10 - H + 4} width={W} height={H} rx="18" fill="#0F172A" opacity=".1" />
      <path d={`M${tx - 10} -12 L${tx} 2 L${tx + 10} -12Z`} fill="#FFF" stroke={c} strokeWidth="2.8" strokeLinejoin="round" />
      <rect x={-W / 2} y={-12 - H} width={W} height={H} rx="18" fill="#FFF" stroke={c} strokeWidth="2.8" />
      <rect x={tx - 9} y="-15" width="18" height="5" fill="#FFF" />

      {/* Nhãn tên nhân vật siêu cute trên đầu bóng thoại */}
      <rect x={-W / 2 + 10} y={-12 - H + 7} width={Math.min(W - 20, label.length * 7.2 + 20)} height="18" rx="9" fill={badgeBg} />
      <text x={-W / 2 + 18} y={-12 - H + 20} fontSize="11" fontWeight="900" fill={ink}>
        {label}
      </text>

      {lines.map((l, i) => (
        <text
          key={i}
          y={-12 - H + 44 + i * 20}
          textAnchor="middle"
          fontSize="14.5"
          fontWeight="800"
          fill="#0F172A"
        >
          {l}
        </text>
      ))}
    </g>
  );
};

/* Khuôn mặt Kawaii Anime mắt long lanh dùng chung cho N, P, K và Cây con */
const Face = ({ mood, t, px = 0, talk }) => {
  const blinkPhase = (t * 0.85) % 3.4;
  const bl = blinkPhase > 3.25 ? 0.12 : 1;
  const ink = '#1E293B';

  const eye = (ex) => {
    const sg = ex < 0 ? -1 : 1;
    if (mood === 'joy') {
      return (
        <g key={ex}>
          <path d={`M${ex - 7} -4 Q${ex} -14 ${ex + 7} -4`} stroke={ink} strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d={`M${ex + sg * 6} -7 L${ex + sg * 9} -9`} stroke={ink} strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    }
    if (mood === 'dizzy') {
      return (
        <path
          key={ex}
          d={`M${ex} -6 m-1 0 a1.6 1.6 0 1 1 3.2 0 a3.6 3.6 0 1 1 -7.2 0 a5.6 5.6 0 1 1 11.2 0`}
          stroke={ink}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      );
    }
    const sq = mood === 'proud' ? 0.78 : bl;
    return (
      <g key={ex}>
        <ellipse cx={ex} cy="-6" rx="7.2" ry={8.2 * sq} fill="#FFF" stroke={ink} strokeWidth="1.2" />
        <ellipse cx={ex + px} cy="-5.2" rx="4.6" ry={5.6 * sq} fill={ink} />
        {sq > 0.3 && (
          <>
            <circle cx={ex + px - 1.4} cy="-7.6" r="2.1" fill="#FFF" />
            <circle cx={ex + px + 1.8} cy="-3.2" r="1.1" fill="#FFF" />
          </>
        )}
        {mood === 'angry' && (
          <path d={`M${ex + sg * 8.5} -17 L${ex - sg * 6} -10.5`} stroke={ink} strokeWidth="3.2" strokeLinecap="round" />
        )}
        {(mood === 'sorry' || mood === 'worry' || mood === 'sad') && (
          <path d={`M${ex + sg * 8.5} -10.5 L${ex - sg * 6} -16.5`} stroke={ink} strokeWidth="2.6" strokeLinecap="round" />
        )}
      </g>
    );
  };

  let mouth;
  if (mood === 'angry') {
    mouth = <path d="M-8 10 Q0 2 8 10 Z" fill="#9F1239" stroke={ink} strokeWidth="1.6" strokeLinejoin="round" />;
  } else if (mood === 'sad') {
    mouth = <path d="M-6 11 Q0 5 6 11" stroke="#7F1D1D" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  } else if (mood === 'sorry' || mood === 'worry' || mood === 'dizzy') {
    mouth = <path d="M-7 9 Q-3.5 5 0 9 Q3.5 13 7 9" stroke="#7F1D1D" strokeWidth="2.4" fill="none" strokeLinecap="round" />;
  } else if (mood === 'proud') {
    mouth = <path d="M-7 6 Q-3.5 11 0 7 Q3.5 11 7 6" stroke={ink} strokeWidth="2.4" fill="none" strokeLinecap="round" />;
  } else if (mood === 'joy') {
    mouth = (
      <g>
        <path d="M-10 3 Q0 22 10 3Z" fill="#9F1239" stroke={ink} strokeWidth="1.4" />
        <path d="M-5.5 11 Q0 16.5 5.5 11 Q0 8 -5.5 11Z" fill="#FB7185" />
      </g>
    );
  } else {
    mouth = (
      <g>
        <path d="M-6.5 4 Q0 16 6.5 4Z" fill="#9F1239" stroke={ink} strokeWidth="1.2" />
        <path d="M-3.5 9.5 Q0 12.5 3.5 9.5 Q0 7.2 -3.5 9.5Z" fill="#FB7185" />
      </g>
    );
  }

  const ts = talk ? 0.65 + 0.55 * Math.abs(Math.sin(t * 13)) : 1;
  const sorry = mood === 'sorry';

  return (
    <g>
      {[-11.5, 11.5].map(eye)}
      {/* Má hồng Kawaii */}
      <ellipse cx="-22" cy="4.5" rx={sorry ? 8 : 6.8} ry="4.2" fill={sorry ? '#FB7185' : '#FDA4AF'} opacity={sorry ? 0.9 : 0.78} />
      <ellipse cx="22" cy="4.5" rx={sorry ? 8 : 6.8} ry="4.2" fill={sorry ? '#FB7185' : '#FDA4AF'} opacity={sorry ? 0.9 : 0.78} />
      <path d="M-24 4.5 L-22 2.5 M-21 5.5 L-19 3.5 M19 5.5 L21 3.5 M22 4.5 L24 2.5" stroke="#F43F5E" strokeWidth="1" opacity=".55" strokeLinecap="round" />
      <g transform={`translate(0,6) scale(1,${ts}) translate(0,-6)`}>{mouth}</g>
      {mood === 'angry' && <text x="26" y={-22 + Math.sin(t * 16) * 1.5} fontSize="17" textAnchor="middle">💢</text>}
      {(sorry || mood === 'worry') && <path d="M27 -18 q-5 8 0 10 q5 -2 0 -10Z" fill="#38BDF8" stroke="#FFF" strokeWidth="1" />}
      {mood === 'sad' && <path d="M-15 3 q-3.5 6.5 0 8.5 q3.5 -2 0 -8.5Z" fill="#38BDF8" />}
    </g>
  );
};

/* Mascot Chibi N - P - K với chuyển động mượt mà không giật */
const Mascot = ({ t, m, x, y, mood, talkEnv, angryEnv, joyEnv }) => {
  const s = back(prog(t, m.at, 0.75));
  if (s <= 0.001) return null;

  const bob = Math.sin(t * 3.2 + m.at) * 5;
  const dx = angryEnv * Math.sin(t * 36) * 2.2;
  const hop =
    joyEnv * (-Math.abs(Math.sin(t * 5.2 + m.at)) * 13) +
    talkEnv * (1 - joyEnv) * (-Math.abs(Math.sin(t * 8.5)) * 5);
  const wave = Math.sin(t * 5.8 + m.at) * 20 - angryEnv * 40 - joyEnv * 25;
  const px = clamp((500 - x) / 150, -1, 1) * 1.8;
  const bodyScale = s * (1 + talkEnv * 0.045);

  return (
    <g transform={`translate(${x + dx},${y + bob + hop}) scale(${bodyScale})`}>
      {/* Bóng đổ dưới chân */}
      <ellipse cx="0" cy="40" rx={23 - hop * 0.3} ry="5.5" fill="#0F172A" opacity=".12" />

      {/* Hào quang năng lượng mềm mại */}
      <circle r="43" fill={m.c1} opacity={0.18 + talkEnv * 0.16 + joyEnv * 0.15} />

      {/* Khói giận dữ mượt */}
      {angryEnv > 0.05 &&
        [0, 1, 2].map((i) => {
          const k = (t * 1.5 + i / 3) % 1;
          return (
            <circle
              key={i}
              cx={-12 + i * 12}
              cy={-42 - k * 28}
              r={4 + k * 5.5}
              fill="#FFF"
              opacity={angryEnv * 0.75 * (1 - k)}
            />
          );
        })}

      {/* Phụ kiện trên đầu đặc trưng từng nguyên tố */}
      {m.id === 'N' && (
        <g transform={`translate(0,-34) rotate(${Math.sin(t * 3.2) * 7})`}>
          <path d="M0 2 L0 -6" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <path d="M0 -4 C-5-20-25-24-28-11 C-20-3-8-2 0 -4Z" fill="#86EFAC" stroke="#15803D" strokeWidth="1.8" />
          <path d="M0 -4 C5-20 25-24 28-11 C20-3 8-2 0 -4Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.8" />
          <circle cx="14" cy="-14" r="3.5" fill="#EF4444" />
          <circle cx="15" cy="-15" r="1" fill="#1E293B" />
        </g>
      )}
      {m.id === 'P' && (
        <g transform={`translate(0,${Math.sin(t * 5) * 2})`}>
          <ellipse cy="-46" rx="18" ry="5" fill="none" stroke="#FDE047" strokeWidth="2.5" opacity=".85" />
          <path d="M4 -60 L-9 -37 L0 -37 L-4 -23 L11 -45 L1 -45 Z" fill="#FDE047" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" />
        </g>
      )}
      {m.id === 'K' && (
        <g transform="translate(0, 2)">
          <path d="M-19 -32L-16 -52L-6 -40L0 -56L6 -40L16 -52L19 -32Z" fill="#FDE047" stroke="#D97706" strokeWidth="2.2" strokeLinejoin="round" />
          <circle cy="-40" r="3.8" fill="#F43F5E" stroke="#FFF" strokeWidth="1" />
          <circle cx="-11" cy="-38" r="2.2" fill="#38BDF8" />
          <circle cx="11" cy="-38" r="2.2" fill="#4ADE80" />
        </g>
      )}

      {/* Tay & Chân Chibi */}
      <ellipse cx="-37" cy="5" rx="8.5" ry="6.2" fill={m.c2} stroke="#FFF" strokeWidth="1.8" transform={`rotate(${-wave} -32 5)`} />
      <ellipse cx="37" cy="5" rx="8.5" ry="6.2" fill={m.c2} stroke="#FFF" strokeWidth="1.8" transform={`rotate(${wave} 32 5)`} />
      <ellipse cx="-13" cy="35" rx="10.5" ry="6" fill={m.dark} stroke="#FFF" strokeWidth="1.5" />
      <ellipse cx="13" cy="35" rx="10.5" ry="6" fill={m.dark} stroke="#FFF" strokeWidth="1.5" />

      {/* Thân Mochi 3D tròn trĩnh */}
      <circle r="36" fill={`url(#g${m.id})`} stroke="#FFF" strokeWidth="3.2" />
      <ellipse cx="-14" cy="-22" rx="10" ry="5.5" fill="#FFF" opacity=".48" transform="rotate(-25 -14 -22)" />
      <circle cx="-22" cy="-12" r="2.5" fill="#FFF" opacity=".55" />

      {/* Huy hiệu chữ cái N / P / K trước ngực */}
      <circle cy="24" r="10" fill="#FFF" stroke={m.c1} strokeWidth="2" />
      <text y="28.5" textAnchor="middle" fontSize="13.5" fontWeight="900" fill={m.dark}>
        {m.id}
      </text>

      <Face mood={mood} t={t} px={px} talk={talkEnv > 0.2} />
    </g>
  );
};

/* Bác nông dân Chibi ấm áp, chuyển động mượt không giật tay/chân */
const Farmer = ({ t, x, walkEnv, armR, talk, worry }) => {
  const step = walkEnv * Math.sin(t * 13);
  const bob = walkEnv * (-Math.abs(Math.sin(t * 13)) * 4.5) + (1 - walkEnv) * Math.sin(t * 2.2) * 1.5;
  const mo = talk ? 2.2 + 3 * Math.abs(Math.sin(t * 13)) : 0;

  return (
    <g transform={`translate(${x},318)`}>
      <ellipse cx="0" cy="3" rx="38" ry="6.5" fill="#0F172A" opacity=".14" />
      <g transform={`translate(0,${bob})`}>
        {[-1, 1].map((sg) => (
          <g key={sg} transform={`rotate(${step * sg * 22} ${sg * 10} -40)`}>
            <rect x={sg * 10 - 7.5} y="-42" width="15" height="34" rx="6.5" fill="#2563EB" />
            <ellipse cx={sg * 10 + 2} cy="-6" rx="12.5" ry="7.2" fill="#78350F" stroke="#451A03" strokeWidth="1.2" />
          </g>
        ))}

        {/* Áo sơ mi caro đỏ & Yếm bò xanh */}
        <rect x="-27" y="-97" width="54" height="62" rx="22" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
        <path d="M-14 -95V-40M0 -95V-40M14 -95V-40" stroke="#FCA5A5" strokeWidth="2" opacity=".65" />
        <path d="M-20 -70 H20 V-43 Q20 -35 12 -35 H-12 Q-20 -35 -20 -43Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.2" />
        <path d="M-14 -70 L-14 -93 M14 -70 L14 -93" stroke="#3B82F6" strokeWidth="6.5" strokeLinecap="round" />
        <circle cx="-14" cy="-72" r="2.8" fill="#FDE047" />
        <circle cx="14" cy="-72" r="2.8" fill="#FDE047" />
        <rect x="-9" y="-61" width="18" height="13" rx="4" fill="#1D4ED8" />
        <text y="-51.5" textAnchor="middle" fontSize="8" fill="#FDE047">🌱</text>

        {/* Tay trái xách xô phân NPK */}
        <ellipse cx="-32" cy="-78" rx="7.5" ry="13.5" fill="#EF4444" transform="rotate(10 -32 -78)" />
        <circle cx="-44" cy="-72" r="6.5" fill="#FED7AA" />
        <g transform={`translate(-44,-52) rotate(${Math.sin(t * 3) * 3})`}>
          <path d="M-13 0 H13 L10 23 H-10Z" fill="#D97706" stroke="#78350F" strokeWidth="2" strokeLinejoin="round" />
          <path d="M-13 0 Q0 -21 13 0" stroke="#78350F" strokeWidth="2.5" fill="none" />
          <circle cx="-6" cy="0" r="4" fill="#4ADE80" />
          <circle cx="0" cy="-2" r="4" fill="#A78BFA" />
          <circle cx="6" cy="0" r="4" fill="#FBBF24" />
          <text y="16" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#FFF">
            NPK
          </text>
        </g>

        {/* Tay phải rải phân / vẫy chào mượt mà */}
        <g transform={`translate(24,-84) rotate(${armR})`}>
          <rect x="-4" y="-6.5" width="31" height="13" rx="6.5" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />
          <circle cx="29" cy="0" r="7.2" fill="#FED7AA" />
        </g>

        {/* Đầu & Khuôn mặt hiền hậu của Bác nông dân */}
        <circle cx="-29" cy="-112" r="6.2" fill="#FED7AA" />
        <circle cx="29" cy="-112" r="6.2" fill="#FED7AA" />
        <circle cx="0" cy="-112" r="29" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.8" />
        {[-9.5, 9.5].map((ex) => (
          <g key={ex}>
            <circle cx={ex} cy="-114" r={worry ? 4.4 : 3.6} fill="#1E293B" />
            <circle cx={ex + 1.1} cy="-115.2" r="1.3" fill="#FFF" />
          </g>
        ))}
        {worry ? (
          <>
            <path d="M-15 -124 L-4 -121 M15 -124 L4 -121" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M35 -128 q-5 8 0 10 q5 -2 0 -10Z" fill="#38BDF8" />
          </>
        ) : (
          <path d="M-14 -122 Q-9 -125 -4 -122 M4 -122 Q9 -125 14 -122" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}
        <ellipse cx="-18" cy="-103" rx="6.5" ry="3.8" fill="#FB7185" opacity=".62" />
        <ellipse cx="18" cy="-103" rx="6.5" ry="3.8" fill="#FB7185" opacity=".62" />
        <circle cx="0" cy="-107" r="4.2" fill="#FCA5A5" />
        <ellipse cx="0" cy="-90" rx="5" ry={worry ? 4 + mo : 2.2 + mo} fill="#9F1239" />
        {/* Ria mép trắng bồng bềnh */}
        <ellipse cx="-7.5" cy="-99" rx="8.5" ry="4.8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
        <ellipse cx="7.5" cy="-99" rx="8.5" ry="4.8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />

        {/* Mũ rơm vàng */}
        <ellipse cx="0" cy="-134" rx="45" ry="10.5" fill="#FDE047" stroke="#D97706" strokeWidth="2.2" />
        <path d="M-27 -134 Q-27 -171 0 -171 Q27 -171 27 -134Z" fill="#FDE047" stroke="#D97706" strokeWidth="2.2" />
        <path d="M-27 -140 Q0 -132 27 -140 L27 -146 Q0 -138 -27 -146Z" fill="#EF4444" />
        <path d="M-14 -162 L-12 -148M0 -168 V-150M14 -162 L12 -148" stroke="#D97706" strokeWidth="1.5" opacity=".65" />
      </g>
    </g>
  );
};

/* ================= Component chính ================= */
export default function Slide02VideoIntro({ onNext }) {
  const [started, setStarted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [t, setT] = useState(0);
  const [runId, setRunId] = useState(0);
  const [musicOn, setMusicOn] = useState(true);
  const [voiceOn, setVoiceOn] = useState(true);

  const audioRef = useRef(null);
  const voiceRef = useRef(null);
  const spokenKeyRef = useRef(-1);
  const prevT = useRef(0);
  const endedRef = useRef(false);

  const idx = SCENES.reduce((a, s, i) => (t >= s.at ? i : a), 0);
  const scene = SCENES[idx];
  const accentColor = scene.color;
  endedRef.current = t >= DUR;

  const act = LINES.find((l) => t >= l.a && t < l.b);
  const actKey = act ? act.a : -1;
  const talkWho = act ? act.w : '';

  /* Vòng lặp thời gian 60fps mượt mà */
  useEffect(() => {
    if (!isPlaying) return undefined;
    let raf;
    let last = null;
    const tick = (ts) => {
      if (last == null) last = ts;
      const d = Math.min(0.06, Math.max(0, (ts - last) / 1000));
      last = ts;
      setT((p) => {
        const next = p + d;
        return next >= DUR ? DUR : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  useEffect(() => {
    if (t >= DUR) setIsPlaying(false);
  }, [t >= DUR]); // eslint-disable-line

  /* Khởi tạo WebAudio */
  const initAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.c.state === 'suspended') audioRef.current.c.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const c = new AC();
    const master = c.createGain();
    const music = c.createGain();
    const sfx = c.createGain();
    master.gain.value = 0.88;
    music.gain.value = 0.42;
    music.connect(master);
    sfx.connect(master);
    master.connect(c.destination);
    audioRef.current = { c, music, sfx };
  };

  /* Nhạc nền theo nhịp */
  const beat = Math.floor(t * 2);
  useEffect(() => {
    const a = audioRef.current;
    if (started && isPlaying && musicOn && a) {
      playBeat(a.c, a.music, beat, t >= 33 && t < 44);
    }
  }, [beat]); // eslint-disable-line

  /* Hiệu ứng âm thanh theo mốc thời gian */
  useEffect(() => {
    const prev = prevT.current;
    prevT.current = t;
    const a = audioRef.current;
    if (!a || !musicOn || !started || t < prev || t - prev > 0.25) return;
    CUES.forEach(([at, name]) => {
      if (prev < at && t >= at) SFX[name](a.c, a.sfx, a.c.currentTime + 0.02);
    });
  }, [t]); // eslint-disable-line

  /* Chọn giọng đọc tiếng Việt tốt nhất (ưu tiên Google Tiếng Việt / Microsoft HoaiMy / Natural) */
  useEffect(() => {
    const s = window.speechSynthesis;
    if (!s) return undefined;
    const load = () => {
      const voices = s.getVoices() || [];
      const viVoices = voices.filter((v) => /^vi/i.test(v.lang) || /viet/i.test(v.name));
      voiceRef.current =
        viVoices.find((v) => /natural|online|google/i.test(v.name)) ||
        viVoices[0] ||
        null;
    };
    load();
    if (s.addEventListener) s.addEventListener('voiceschanged', load);
    return () => {
      if (s.removeEventListener) s.removeEventListener('voiceschanged', load);
      s.cancel();
      if (audioRef.current) audioRef.current.c.close();
    };
  }, []);

  /* Phát giọng đọc mượt mà — tránh lỗi cancel() liên hoàn gây giật tiếng trên Chrome/Edge */
  useEffect(() => {
    const s = window.speechSynthesis;
    if (!started || !voiceOn || !isPlaying) {
      if (s && (!isPlaying || !voiceOn) && !endedRef.current) {
        s.cancel();
      }
      if (!isPlaying) spokenKeyRef.current = -1;
      return undefined;
    }
    if (actKey < 0) return undefined;
    if (spokenKeyRef.current === `${runId}-${actKey}`) return undefined;
    spokenKeyRef.current = `${runId}-${actKey}`;

    const l = LINES.find((x) => x.a === actKey);
    if (!l) return undefined;

    /* Phát âm hiệu ứng mở lời dễ thương cho từng nhân vật */
    if (audioRef.current && musicOn) {
      SFX.voiceBlip(audioRef.current.c, audioRef.current.sfx, audioRef.current.c.currentTime + 0.01, l.w);
    }

    if (!s) return undefined;
    const u = new SpeechSynthesisUtterance(l.t);
    u.lang = 'vi-VN';
    u.pitch = VOICE[l.w][0];
    u.rate = VOICE[l.w][1];
    u.volume = 1;
    if (voiceRef.current) u.voice = voiceRef.current;

    if (s.speaking || s.pending) {
      s.cancel();
      const timer = setTimeout(() => {
        s.speak(u);
      }, 45);
      return () => clearTimeout(timer);
    }
    s.speak(u);
    return undefined;
  }, [actKey, isPlaying, voiceOn, started, runId, musicOn]);

  /* Điều khiển */
  const handleStart = (withSound) => {
    setMusicOn(withSound);
    setVoiceOn(withSound);
    initAudio();
    spokenKeyRef.current = -1;
    setStarted(true);
    setIsPlaying(true);
  };
  const handleReplay = () => {
    prevT.current = 0;
    spokenKeyRef.current = -1;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setT(0);
    setRunId((r) => r + 1);
    setIsPlaying(true);
  };
  const handleSkip = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsPlaying(false);
    setT(DUR);
  };
  const handleSeek = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    prevT.current = 0;
    spokenKeyRef.current = -1;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setT(clamp((e.clientX - r.left) / r.width) * (DUR - 0.01));
    setRunId((x) => x + 1);
    setIsPlaying(true);
  };
  const toggleMusic = () => {
    initAudio();
    setMusicOn((v) => !v);
  };

  /* ====== Tính toán hình ảnh & chuyển động mượt (Zero-Snap Envelopes) ====== */
  const skyAt = (arr) =>
    mixHex(arr[Math.max(0, idx - 1)], arr[idx], idx > 0 ? easeOut(prog(t, scene.at, 1.4)) : 1);

  const h =
    18 * easeIO(prog(t, 1.8, 2.0)) +
    102 * easeIO(prog(t, 12.5, 5.0)) +
    52 * easeIO(prog(t, 27.0, 4.0));

  const dizzyEnv = smoothEnv(t, 40.3, 44.2, 0.45);
  const dizzy = dizzyEnv > 0.35;
  const sway = Math.sin(t * 1.8) * 7.5 * (h / 190 + 0.12) * (1 + dizzyEnv * 1.8);
  const xAt = (u) => sway * (2.4 * u - 1.4 * u * u);

  const rg = 0.25 * easeIO(prog(t, 1.5, 2.5)) + 0.75 * easeIO(prog(t, 19.5, 3.5));
  const rootGlowEnv = smoothEnv(t, 19.3, 26.5, 0.9);
  const glow = easeIO(prog(t, 55, 1.5));
  const rainbowEnv = easeIO(prog(t, 44.2, 2.2));

  const seedFall = prog(t, 0.1, 1.0);
  const seedY = lerp(40, 314, seedFall * seedFall);
  const squash = t >= 1.1 && t < 1.5 ? 1 - Math.sin(prog(t, 1.1, 0.4) * Math.PI) * 0.28 : 1;
  const sink = easeIO(prog(t, 1.5, 0.5));

  const bx = 500 + 340 * Math.sin(t * 0.5);
  const by = 148 + 42 * Math.sin(t * 1.1);
  const flap = 0.35 + 0.65 * Math.abs(Math.sin(t * 12));
  const sunY = lerp(146, 72, easeOut(prog(t, 0, 6)));

  const top = { x: xAt(1), y: -h };
  const pm =
    t < 9.6 ? 'sad' : t < 33 ? 'happy' : t < 40.4 ? 'worry' : dizzy ? 'dizzy' : t < 55 ? 'happy' : 'joy';

  /* Bác nông dân đi bộ & cử động tay mượt mà bằng smoothEnv */
  const fx = lerp(-130, 142, easeIO(prog(t, 6, 1.85)));
  const walkEnv = smoothEnv(t, 6.0, 7.95, 0.3);
  const idleArm = -8 + Math.sin(t * 2.2) * 4;
  const tossEnv = smoothEnv(t, 7.85, 11.85, 0.35);
  const calmEnv = smoothEnv(t, 44.2, 48.6, 0.35);
  const cheerEnv = easeIO(prog(t, 55.2, 0.5));
  const armR =
    idleArm * (1 - Math.max(tossEnv, calmEnv, cheerEnv)) +
    tossEnv * (-35 + Math.sin((t - 7.9) * 6.2) * 52) +
    calmEnv * (-118 + Math.sin(t * 5.5) * 9) +
    cheerEnv * (-148 + Math.sin(t * 8.5) * 18);

  const pos = Object.fromEntries(MASC.map((m) => [m.id, wp(m.pts, t)]));

  /* Tọa độ neo bóng thoại ĐÃ ĐƯỢC CHỐNG RUNG (không lắc theo sway từng frame) */
  const anchor = {
    farmer: [fx + 10, 134],
    plant: [500, 320 - 26 - h - 42],
    N: [pos.N[0], pos.N[1] - 72],
    P: [pos.P[0], pos.P[1] - 72],
    K: [pos.K[0], pos.K[1] - 72],
  };

  const lv = [
    easeOut(prog(t, 12.5, 5)),
    easeOut(prog(t, 19.5, 5)),
    easeOut(prog(t, 27.0, 5)),
  ];

  const fruitSpots = [
    { u: 0.5, d: -1, at: 28.0, R: 15.5 },
    { u: 0.5, d: 1, at: 28.6, R: 15.5 },
    { u: 0.3, d: -1, at: 29.2, R: 13.0 },
    { u: 0.3, d: 1, at: 29.8, R: 13.0 },
  ];

  const mFace = (m) => (t < 33 ? 'proud' : t < m.sorry ? 'angry' : t < 55 ? 'sorry' : 'joy');
  const stormK = smoothEnv(t, 32.8, 44.1, 0.85);
  const bunting = easeOut(prog(t, 55, 0.85));
  const banner = back(prog(t, 59.6, 0.85));

  /* Tính độ mở cho từng nhân vật đang nói để chuyển động không bị khựng */
  const talkEnvFor = (who) => {
    const line = LINES.find((l) => l.w === who && t >= l.a - 0.15 && t <= l.b + 0.15);
    return line ? smoothEnv(t, line.a, line.b, 0.2) : 0;
  };
  const plantTalkEnv = talkEnvFor('plant');
  const farmerTalkEnv = talkEnvFor('farmer');

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', userSelect: 'none' }}>
      <style>{`
        .vi-drift{animation:vi-drift 9s ease-in-out infinite alternate;will-change:transform}
        @keyframes vi-drift{from{transform:translateX(-28px)}to{transform:translateX(36px)}}
        .vi-spin{animation:vi-spin 24s linear infinite;transform-box:view-box}
        @keyframes vi-spin{to{transform:rotate(360deg)}}
        .vi-sway{animation:vi-sway 2.6s ease-in-out infinite alternate}
        @keyframes vi-sway{from{transform:rotate(-4.5deg)}to{transform:rotate(4.5deg)}}
        .vi-fade{animation:vi-fade .45s cubic-bezier(.2,.8,.2,1) both}
        @keyframes vi-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .vi-pulse{animation:vi-pulse 1.5s ease-in-out infinite}
        @keyframes vi-pulse{50%{transform:scale(1.05)}}
        .vi-pop{animation:vi-popin .38s cubic-bezier(.22,1,.36,1) both}
        @keyframes vi-popin{from{opacity:0;transform:scale(.94) translateY(8px)}to{opacity:1;transform:none}}
        .vi-wave{animation:vi-wave .65s ease-in-out infinite alternate}
        @keyframes vi-wave{from{transform:scaleY(.35)}to{transform:scaleY(1)}}
        @media (prefers-reduced-motion:reduce){.vi-drift,.vi-spin,.vi-sway,.vi-pulse,.vi-wave{animation:none}}
      `}</style>

      {/* Thanh tiêu đề Scene */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, gap: 12, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 12.5,
                fontWeight: 900,
                color: '#FFF',
                background: accentColor,
                padding: '3px 10px',
                borderRadius: 999,
                letterSpacing: '0.04em',
                boxShadow: `0 2px 8px ${accentColor}44`,
                transition: 'background .4s',
              }}
            >
              CẢNH {idx + 1} / {SCENES.length}
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 800, color: accentColor, letterSpacing: '0.03em' }}>
              PHIM HOẠT HÌNH BIỆT ĐỘI N – P – K
            </span>
            <span style={{ display: 'inline-flex', gap: 5 }}>
              {SCENES.map((s, i) => (
                <span
                  key={i}
                  onClick={() => {
                    if (!started) return;
                    prevT.current = 0;
                    spokenKeyRef.current = -1;
                    if (window.speechSynthesis) window.speechSynthesis.cancel();
                    setT(s.at + 0.05);
                    setRunId((x) => x + 1);
                    setIsPlaying(true);
                  }}
                  title={`Chuyển tới Cảnh ${i + 1}: ${s.key}`}
                  style={{
                    width: i === idx ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i <= idx ? s.color : '#CBD5E1',
                    cursor: started ? 'pointer' : 'default',
                    transition: 'all .4s cubic-bezier(.34,1.56,.64,1)',
                  }}
                />
              ))}
            </span>
          </div>
          <h2
            key={idx}
            className="vi-fade"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 2vw, 28px)',
              fontWeight: 900,
              color: '#0F172A',
              marginTop: 4,
            }}
          >
            <span style={{ color: scene.ink }}>{scene.key}</span>
            {scene.rest}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button
            className="nav-circle-btn"
            style={{ width: 40, height: 40 }}
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={!started}
            title={isPlaying ? 'Tạm dừng' : 'Tiếp tục phát'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            className="nav-circle-btn"
            style={{ width: 40, height: 40 }}
            onClick={handleReplay}
            disabled={!started}
            title="Phát lại từ đầu"
          >
            <RotateCcw size={18} />
          </button>
          <button
            className="nav-circle-btn"
            style={{ width: 40, height: 40, opacity: musicOn ? 1 : 0.45 }}
            onClick={toggleMusic}
            title="Nhạc nền & hiệu ứng"
          >
            {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            className="nav-circle-btn"
            style={{ width: 40, height: 40, opacity: voiceOn ? 1 : 0.45 }}
            onClick={() => setVoiceOn((v) => !v)}
            title="Giọng đọc nhân vật"
          >
            {voiceOn ? <Mic size={18} /> : <MicOff size={18} />}
          </button>
          <button
            className="tool-text-btn"
            onClick={handleSkip}
            disabled={!started}
            title="Bỏ qua intro"
          >
            <FastForward size={16} />
            <span>Bỏ qua</span>
          </button>
        </div>
      </div>

      {/* Sân khấu Hoạt Hình */}
      <div
        style={{
          flex: 1,
          background: 'radial-gradient(circle at 50% 35%, #FFFFFF 0%, #F1F5F9 100%)',
          borderRadius: 24,
          border: '2px solid rgba(255,255,255,0.85)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 14px 35px rgba(15,23,42,0.08), inset 0 2px 10px rgba(255,255,255,0.6)',
        }}
      >
        <svg viewBox="0 0 1000 500" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={skyAt(SKY_TOP)} />
              <stop offset="1" stopColor={skyAt(SKY_BOT)} />
            </linearGradient>
            <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#BBF7D0" />
              <stop offset="1" stopColor="#86EFAC" />
            </linearGradient>
            <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#86EFAC" />
              <stop offset="1" stopColor="#4ADE80" />
            </linearGradient>
            <linearGradient id="turf" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#22C55E" />
              <stop offset=".5" stopColor="#4ADE80" />
              <stop offset="1" stopColor="#22C55E" />
            </linearGradient>
            <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7C5338" />
              <stop offset="1" stopColor="#462C1D" />
            </linearGradient>
            <radialGradient id="sunCore" cx=".35" cy=".35">
              <stop offset="0" stopColor="#FEF08A" />
              <stop offset="1" stopColor="#FBBF24" />
            </radialGradient>
            <radialGradient id="sunHalo">
              <stop offset="0" stopColor="#FDE047" stopOpacity=".85" />
              <stop offset="1" stopColor="#FDE047" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="gold">
              <stop offset="0" stopColor="#FEF08A" stopOpacity=".95" />
              <stop offset=".6" stopColor="#FDE047" stopOpacity=".35" />
              <stop offset="1" stopColor="#FDE047" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="purpleGlow">
              <stop offset="0" stopColor="#C4B5FD" stopOpacity=".6" />
              <stop offset="1" stopColor="#C4B5FD" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="fruitG" cx=".35" cy=".3">
              <stop offset="0" stopColor="#FDE68A" />
              <stop offset=".55" stopColor="#FB923C" />
              <stop offset="1" stopColor="#EA580C" />
            </radialGradient>
            <linearGradient id="bannerG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#FB7185" />
              <stop offset=".5" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
            {MASC.map((m) => (
              <radialGradient key={m.id} id={`g${m.id}`} cx=".32" cy=".28">
                <stop offset="0" stopColor={m.c0} />
                <stop offset=".45" stopColor={m.c1} />
                <stop offset="1" stopColor={m.c2} />
              </radialGradient>
            ))}
          </defs>

          {/* Bầu trời */}
          <rect width="1000" height="500" fill="url(#sky)" />

          {/* Đốm sáng Bokeh lung linh */}
          {BOKEH.map((b, i) => (
            <circle
              key={i}
              cx={b.x}
              cy={b.y + Math.sin(t * b.sp + b.ph) * 8}
              r={b.r}
              fill="#FFF"
              opacity={0.28 + 0.15 * Math.sin(t * 1.5 + b.ph)}
            />
          ))}

          {/* Cầu vồng hòa thuận xuất hiện từ Cảnh 7 */}
          {rainbowEnv > 0.01 && (
            <g opacity={rainbowEnv * 0.55} transform="translate(500, 320)">
              {[
                [390, '#FB7185'],
                [378, '#FBBF24'],
                [366, '#4ADE80'],
                [354, '#60A5FA'],
                [342, '#A78BFA'],
              ].map(([r, c]) => (
                <path
                  key={r}
                  d={`M${-r} 0 A${r} ${r * 0.72} 0 0 1 ${r} 0`}
                  fill="none"
                  stroke={c}
                  strokeWidth="11"
                  strokeLinecap="round"
                />
              ))}
            </g>
          )}

          <g>
            {/* Mặt trời Kawaii */}
            <g transform={`translate(882,${sunY})`}>
              <SunFace happy={t >= 55} worry={t >= 33 && t < 44} />
            </g>

            <Scenery />

            {/* Mây giông + Sét lúc N-P-K cãi nhau */}
            {stormK > 0.01 && (
              <g opacity={stormK} transform={`translate(500,${54 + Math.sin(t * 3.2) * 3.5}) scale(1.5)`}>
                <ellipse cy="10" rx="58" ry="18" fill="#64748B" />
                <circle cx="-22" cy="-2" r="23" fill="#64748B" />
                <circle cx="16" cy="-10" r="29" fill="#94A3B8" />
                <path d="M-18 4 L-8 0 M18 4 L8 0" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                <circle cx="-12" cy="9" r="2.8" fill="#0F172A" />
                <circle cx="12" cy="9" r="2.8" fill="#0F172A" />
                {(t - 33.2) % 2.2 < 0.24 && t < 40.8 && (
                  <path
                    d="M-4 26 L10 26 L2 44 L14 44 L-12 82 L-6 52 L-16 52Z"
                    fill="#FEF08A"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                  />
                )}
              </g>
            )}

            {/* Hào quang mùa vàng */}
            {glow > 0 && (
              <circle cx="500" cy="200" r={245 * (0.92 + 0.08 * Math.sin(t * 3))} fill="url(#gold)" opacity={glow} />
            )}
            {rootGlowEnv > 0 && (
              <circle cx="505" cy="405" r="135" fill="url(#purpleGlow)" opacity={rootGlowEnv} />
            )}

            {/* Hạt giống rơi + bụi đất */}
            {t < 2.1 && (
              <g
                transform={`translate(500,${seedY + 14 * sink}) scale(${1 + (1 - squash)},${squash})`}
                opacity={1 - sink}
              >
                <path d="M0 -15C15 -10 15 12 0 17C-15 12 -15 -10 0 -15Z" fill="#D97706" stroke="#78350F" strokeWidth="2.2" />
                <ellipse cx="-4.5" cy="-6" rx="3.2" ry="5.2" fill="#FDE68A" opacity=".75" />
                <circle cx="-4.5" cy="1" r="2" fill="#1E293B" />
                <circle cx="4.5" cy="1" r="2" fill="#1E293B" />
                <ellipse cx="-7" cy="4" rx="2.2" ry="1.2" fill="#FB7185" opacity=".75" />
                <ellipse cx="7" cy="4" rx="2.2" ry="1.2" fill="#FB7185" opacity=".75" />
                <path d="M-3 6Q0 9.5 3 6" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </g>
            )}
            {t > 1.1 &&
              t < 2 &&
              [-1, 1].map((d) =>
                [0, 1].map((j) => {
                  const k = prog(t, 1.1, 0.8);
                  return (
                    <circle
                      key={`${d}${j}`}
                      cx={500 + d * (14 + 34 * k + j * 14)}
                      cy={312 - 10 * k * (1 + j)}
                      r={5 + 9 * k}
                      fill="#EBD9BE"
                      opacity={0.7 * (1 - k)}
                    />
                  );
                })
              )}

            {/* CÂY CON KAWAII: rễ - thân - lá - hoa - quả, có mặt & biểu cảm */}
            <g transform="translate(500,320)">
              {/* Hệ rễ phát sáng mượt không dùng filter blur gây khựng */}
              {t >= 1.5 && (
                <g strokeLinecap="round" fill="none">
                  {rootGlowEnv > 0.02 && (
                    <g stroke="#C4B5FD" opacity={rootGlowEnv * 0.55}>
                      <path d={`M0 0 Q5 ${70 * rg} -3 ${135 * rg}`} strokeWidth="14" />
                      <path d={`M2 ${25 * rg} Q-35 ${40 * rg} -70 ${85 * rg}`} strokeWidth="11" />
                      <path d={`M2 ${35 * rg} Q40 ${50 * rg} 78 ${92 * rg}`} strokeWidth="11" />
                      <path d={`M0 ${70 * rg} Q-25 ${85 * rg} -48 ${120 * rg}`} strokeWidth="9" />
                      <path d={`M0 ${80 * rg} Q28 ${95 * rg} 54 ${125 * rg}`} strokeWidth="9" />
                    </g>
                  )}
                  <g stroke="#FDE68A">
                    <path d={`M0 0 Q5 ${70 * rg} -3 ${135 * rg}`} strokeWidth="6.5" />
                    <path d={`M2 ${25 * rg} Q-35 ${40 * rg} -70 ${85 * rg}`} strokeWidth="4.5" />
                    <path d={`M2 ${35 * rg} Q40 ${50 * rg} 78 ${92 * rg}`} strokeWidth="4.5" />
                    <path d={`M0 ${70 * rg} Q-25 ${85 * rg} -48 ${120 * rg}`} strokeWidth="3.2" />
                    <path d={`M0 ${80 * rg} Q28 ${95 * rg} 54 ${125 * rg}`} strokeWidth="3.2" />
                  </g>
                </g>
              )}

              {rootGlowEnv > 0.05 &&
                [
                  [-70, 85],
                  [78, 92],
                  [-48, 120],
                  [54, 125],
                  [-3, 135],
                ].map(([x, y], i) => (
                  <Spark
                    key={i}
                    x={x * rg}
                    y={y * rg}
                    s={0.75 + 0.4 * Math.sin(t * 6 + i)}
                    c="#DDD6FE"
                    o={rootGlowEnv}
                    rot={t * 50}
                  />
                ))}

              <g transform="translate(0,-26)">
                {t >= 1.9 && (
                  <g>
                    <path
                      d={`M0 0 Q${sway * 1.2} ${-h / 2} ${sway} ${-h}`}
                      stroke="#15803D"
                      strokeWidth={8.5 + 2.5 * prog(t, 12, 8)}
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d={`M-1.5 0 Q${sway * 1.2 - 1.5} ${-h / 2} ${sway - 1.5} ${-h}`}
                      stroke="#4ADE80"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      opacity=".8"
                    />
                  </g>
                )}

                {/* Lá mầm: rũ khi đói, vươn lên sau khi ăn phân */}
                {[-1, 1].map((d) => (
                  <Leaf
                    key={d}
                    x={0}
                    y={-6}
                    d={d}
                    rot={lerp(56, -28, easeIO(prog(t, 9.6, 1.3))) + Math.sin(t * 2.2 + d) * 3}
                    s={back(prog(t, 2.6, 0.65)) * 0.56}
                    c="#22C55E"
                  />
                ))}

                {t >= 11 && t < 12.6 && (
                  <Spark x={0} y={-16 - h} s={1.3} c="#FFF" o={1 - prog(t, 11, 1.6)} rot={t * 90} />
                )}

                {LEAVES.map((l, i) => (
                  <Leaf
                    key={i}
                    x={xAt(l.u)}
                    y={-h * l.u}
                    d={l.d}
                    rot={l.rot + Math.sin(t * 2.2 + i) * 5.5}
                    s={back(prog(t, l.at, 0.75)) * l.sc * (1 + 0.25 * prog(t, 13, 6))}
                    c={i % 2 ? '#22C55E' : '#16A34A'}
                  />
                ))}

                {[
                  [-1, -55],
                  [1, -55],
                  [1, -95],
                ].map(([d, r], i) => (
                  <Leaf
                    key={i}
                    x={top.x}
                    y={top.y}
                    d={d}
                    rot={r + Math.sin(t * 2.5 + i) * 5}
                    s={back(prog(t, 12.8 + i * 0.15, 0.8)) * 0.56}
                    c="#4ADE80"
                  />
                ))}

                {/* Cành quả và Hoa nở trên đỉnh */}
                {t >= 26.9 &&
                  fruitSpots.map((f, i) => {
                    const sx = xAt(f.u);
                    const sy = -h * f.u;
                    const k = easeOut(prog(t, 26.9 + i * 0.1, 0.65));
                    const ex = sx + f.d * (f.u === 0.5 ? 62 : 50) * k;
                    const ey = sy + 20 * k;
                    return (
                      <path
                        key={i}
                        d={`M${sx} ${sy} Q${lerp(sx, ex, 0.5)} ${sy - 16 * k} ${ex} ${ey}`}
                        stroke="#16A34A"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                    );
                  })}

                {t >= 27 && (
                  <g transform={`translate(${top.x},${top.y - 12}) scale(${back(prog(t, 27, 0.8))}) rotate(${t * 18})`}>
                    {[0, 60, 120, 180, 240, 300].map((a) => (
                      <ellipse
                        key={a}
                        cx="0"
                        cy="-11"
                        rx="6"
                        ry="10"
                        fill="#FFF"
                        stroke="#FDA4AF"
                        strokeWidth="1.5"
                        transform={`rotate(${a})`}
                      />
                    ))}
                    <circle r="6.5" fill="#FACC15" stroke="#F59E0B" strokeWidth="1.2" />
                  </g>
                )}

                {t >= 26.9 &&
                  fruitSpots.map((f, i) => {
                    const sx = xAt(f.u);
                    const sy = -h * f.u;
                    const k = easeOut(prog(t, 26.9 + i * 0.1, 0.65));
                    return (
                      <Fruit
                        key={i}
                        x={sx + f.d * (f.u === 0.5 ? 62 : 50) * k}
                        y={sy + 20 * k}
                        r={f.R * back(prog(t, f.at, 0.65))}
                        swing={Math.sin(t * 2.4 + i) * 5.5}
                      />
                    );
                  })}

                {dizzyEnv > 0.1 &&
                  [0, 1, 2, 3].map((i) => (
                    <Spark
                      key={i}
                      x={top.x + Math.cos(t * 5 + i * 1.57) * 34}
                      y={top.y - 30 + Math.sin(t * 5 + i * 1.57) * 10}
                      s={1.15 * dizzyEnv}
                      c="#FACC15"
                      rot={t * 100}
                    />
                  ))}
              </g>

              {/* Khuôn mặt Mochi của Cây con */}
              {t >= 1.9 && (
                <g
                  transform={`translate(0,-8) scale(${
                    back(prog(t, 1.9, 0.65)) *
                    (1 + smoothEnv(t, 9.6, 12.0, 0.3) * 0.06 * Math.sin((t - 9.6) * 9)) *
                    (1 + plantTalkEnv * 0.05)
                  })`}
                >
                  <circle r="24" fill="url(#gN)" stroke="#FFF" strokeWidth="3" />
                  <ellipse cx="-8" cy="-14" rx="7.5" ry="3.8" fill="#FFF" opacity=".52" transform="rotate(-25 -8 -14)" />
                  <g transform="translate(0,2) scale(.66)">
                    <Face mood={pm} t={t} talk={plantTalkEnv > 0.2} />
                  </g>
                </g>
              )}
            </g>

            {/* Hạt phân bón NPK lấp lánh bay từ tay bác nông dân xuống gốc cây */}
            {GRAN.map((g, i) => {
              if (t < g.ts) return null;
              const k = prog(t, g.ts, 1.0);
              const o = 1 - prog(t, g.ts + 1.2, 1);
              if (o <= 0) return null;
              return (
                <circle
                  key={i}
                  cx={lerp(fx + 55, g.tx, k)}
                  cy={lerp(232, 314, k) - 72 * Math.sin(k * Math.PI) + 6 * prog(t, g.ts + 1.2, 1)}
                  r={4.5}
                  fill={g.c}
                  stroke="#FFF"
                  strokeWidth="1.4"
                  opacity={o}
                />
              );
            })}

            {t >= 9.6 &&
              t < 11.8 &&
              [0, 1, 2, 3, 4].map((i) => (
                <Spark
                  key={i}
                  x={460 + i * 20}
                  y={290 - ((t * 20 + i * 9) % 30)}
                  s={0.95}
                  c={['#4ADE80', '#C4B5FD', '#FBBF24', '#FFF', '#FF9EC7'][i]}
                  o={1 - prog(t, 10.8, 1)}
                  rot={t * 80}
                />
              ))}

            {/* Dòng hạt dinh dưỡng kỳ diệu bay từ N, P, K về cây */}
            {STREAMS.map((s, si) => {
              const env = smoothEnv(t, s.a, s.b, 0.6);
              if (env <= 0) return null;
              return Array.from({ length: 8 }, (_, k) => {
                const ph = (t * 0.45 + k / 8) % 1;
                const e = easeIO(ph);
                const x = lerp(s.from[0], s.to[0], e) + Math.sin(ph * 6.28 + k) * 10;
                const y = lerp(s.from[1], s.to[1], e) - Math.sin(ph * Math.PI) * 45;
                const o = env * Math.sin(ph * Math.PI);
                return (
                  <g key={`${si}${k}`}>
                    <circle cx={x} cy={y} r="9.5" fill={s.c} opacity={o * 0.28} />
                    <circle cx={x} cy={y} r={3.8 + (k % 3)} fill={s.c} stroke="#FFF" strokeWidth="1" opacity={o} />
                    <Spark x={x + 6} y={y - 6} s={0.55} c="#FFF" o={o} rot={t * 90} />
                  </g>
                );
              });
            })}

            {/* Bướm xuân bay lượn */}
            {t >= 2 && (
              <g transform={`translate(${bx},${by}) rotate(${Math.cos(t * 0.5) * 14})`} opacity={prog(t, 2, 1)}>
                <ellipse cx="-9" cy="-3" rx={9.5 * flap} ry="11.5" fill="#F472B6" stroke="#FFF" strokeWidth="1" />
                <ellipse cx="9" cy="-3" rx={9.5 * flap} ry="11.5" fill="#FB923C" stroke="#FFF" strokeWidth="1" />
                <ellipse cx="-6" cy="8" rx={6.5 * flap} ry="7.5" fill="#FBCFE8" />
                <ellipse cx="6" cy="8" rx={6.5 * flap} ry="7.5" fill="#FED7AA" />
                <ellipse cx="0" cy="2" rx="2.4" ry="9.5" fill="#4C1D95" />
                <path d="M-1 -7Q-5 -15 -8 -14M1 -7Q5 -15 8 -14" stroke="#4C1D95" strokeWidth="1.4" fill="none" />
              </g>
            )}

            {/* Nhân vật Bác Nông Dân & Biệt Đội Mascot N - P - K */}
            {t >= 5.8 && (
              <Farmer
                t={t}
                x={fx}
                walkEnv={walkEnv}
                armR={armR}
                talk={farmerTalkEnv > 0.2}
                worry={t >= 33 && t < 44}
              />
            )}

            {MASC.map((m) => (
              <Mascot
                key={m.id}
                t={t}
                m={m}
                x={pos[m.id][0]}
                y={pos[m.id][1]}
                mood={mFace(m)}
                talkEnv={talkEnvFor(m.id)}
                angryEnv={smoothEnv(t, 33.0, m.sorry, 0.35)}
                joyEnv={easeIO(prog(t, 55.0, 0.5))}
              />
            ))}

            {MASC.map((m) => (
              <Burst key={m.id} t={t} x={m.pts[0][1]} y={m.pts[1][2]} c={m.c2} since={m.at} />
            ))}
            <Burst t={t} x={500} y={200} c="#FACC15" since={55.3} n={14} R={115} sz={2} />
            {FW.map(([s, x, y, c], i) => (
              <Burst key={i} t={t} x={x} y={y} c={c} since={s} n={14} R={95} sz={2} />
            ))}

            <Grass />

            {/* Cờ hội + Vòng hội tụ + Pháo giấy + Tim bay */}
            {bunting > 0 && (
              <g transform={`translate(0,${-80 * (1 - bunting)})`}>
                {Array.from({ length: 20 }, (_, i) => {
                  const x = 25 + i * 50;
                  const y = 20 + 36 * Math.sin(((x % 500) / 500) * Math.PI);
                  if (x > 260 && x < 740) return null;
                  return (
                    <path
                      key={i}
                      d={`M${x - 12} ${y} L${x + 12} ${y} L${x} ${y + 26}Z`}
                      fill={['#FF7AA8', '#FFD93D', '#4ADE80', '#60A5FA'][i % 4]}
                      stroke="#FFF"
                      strokeWidth="1.2"
                      transform={`rotate(${Math.sin(t * 3 + i) * 6} ${x} ${y})`}
                    />
                  );
                })}
                <path d="M0 20 Q125 70 250 20 M750 20 Q875 70 1000 20" stroke="#92400E" strokeWidth="2.5" fill="none" />
              </g>
            )}

            {t >= 55.3 && (
              <g>
                {['#22C55E', '#8B5CF6', '#F59E0B'].map((c, i) => (
                  <g
                    key={c}
                    transform={`translate(500,200) scale(${back(prog(t, 55.5 + i * 0.25, 0.8))})`}
                    opacity=".85"
                  >
                    <circle
                      r={150 + i * 22}
                      fill="none"
                      stroke={c}
                      strokeWidth="3.5"
                      strokeDasharray="10 8"
                      strokeLinecap="round"
                      className="vi-spin"
                      style={{
                        transformOrigin: '0px 0px',
                        animationDuration: `${10 + i * 4}s`,
                        animationDirection: i % 2 ? 'reverse' : 'normal',
                      }}
                    />
                  </g>
                ))}
                {Array.from({ length: 12 }, (_, i) => {
                  const a = (i / 12) * 6.28 + t * 0.3;
                  return (
                    <Spark
                      key={i}
                      x={500 + Math.cos(a) * 235}
                      y={200 + Math.sin(a) * 200}
                      s={Math.abs(Math.sin(t * 4 + i)) * 1.35 * glow}
                      c={i % 2 ? '#FACC15' : '#FFF'}
                      rot={t * 60}
                    />
                  );
                })}
                <text x="866" y={238 - Math.abs(Math.sin(t * 3)) * 8} fontSize="38" textAnchor="middle">
                  🏆
                </text>
                {CONF.map((c, i) => {
                  const k = Math.max(0, t - 55.5);
                  const cycle = (k * c.sp + c.ph) % 520;
                  const y = -20 + cycle;
                  const edgeFade = clamp(cycle / 40) * clamp((520 - cycle) / 40);
                  return (
                    <rect
                      key={i}
                      x={c.x + Math.sin(k * 2.8 + i) * c.sw}
                      y={y}
                      width={c.w}
                      height={c.w * 0.62}
                      rx="2"
                      fill={c.c}
                      transform={`rotate(${k * 180 + i * 40} ${c.x} ${y})`}
                      opacity={prog(t, 55.5, 0.4) * edgeFade}
                    />
                  );
                })}
              </g>
            )}

            {t >= 53.3 &&
              t < 58.5 &&
              Array.from({ length: 8 }, (_, i) => {
                const k = t - 53.3 - i * 0.12;
                return k > 0 ? (
                  <text
                    key={i}
                    x={390 + i * 34 + Math.sin(k * 4 + i) * 10}
                    y={300 - k * 75}
                    fontSize="22"
                    opacity={clamp(1 - k / 3.2)}
                  >
                    💖
                  </text>
                ) : null;
              })}

            {/* Bóng thoại trên đầu nhân vật (cố định vị trí chống rung) */}
            {LINES.filter((l) => l.w !== 'narr').map((l) => {
              const k = easeOut(prog(t, l.a, 0.25)) * (1 - easeIO(prog(t, l.b - 0.22, 0.22)));
              return k > 0.02 ? (
                <Bubble key={l.a} x={anchor[l.w][0]} y={anchor[l.w][1]} text={l.t} who={l.w} k={k} />
              ) : null;
            })}

            {/* Băng-rôn chào mừng rực rỡ */}
            {banner > 0.01 && (
              <g transform={`translate(500,34) scale(${banner})`} style={{ textRendering: 'geometricPrecision' }}>
                <rect x="-244" y="-6" width="488" height="72" rx="20" fill="#0F172A" opacity=".14" />
                <rect x="-240" y="-8" width="480" height="70" rx="20" fill="url(#bannerG)" stroke="#FFF" strokeWidth="4" />
                <text
                  y="18"
                  textAnchor="middle"
                  fontSize="14.5"
                  fontWeight="900"
                  fill="#FFF"
                  style={{ paintOrder: 'stroke' }}
                  stroke="#9D174D"
                  strokeWidth="3"
                >
                  ✨ CHÀO MỪNG ĐẾN VỚI BÀI THUYẾT TRÌNH ✨
                </text>
                <text
                  y="49"
                  textAnchor="middle"
                  fontSize="26"
                  fontWeight="900"
                  fill="#FFF"
                  style={{ paintOrder: 'stroke' }}
                  stroke="#9D174D"
                  strokeWidth="4.5"
                >
                  CỦA NHÓM EM! 🎉
                </text>
              </g>
            )}
          </g>

          {/* HUD: Thanh chỉ số dinh dưỡng của Cây con */}
          <g transform="translate(14,12)" opacity={prog(t, 9.6, 1)}>
            <rect width="166" height="76" rx="16" fill="#FFF" opacity=".92" stroke="#E2E8F0" strokeWidth="1.5" />
            {['N', 'P', 'K'].map((n, i) => (
              <g key={n} transform={`translate(14,${12 + i * 20})`}>
                <text y="11" fontSize="12.5" fontWeight="900" fill={MASC[i].dark}>
                  {n}
                </text>
                <rect x="18" y="2" width="98" height="10" rx="5" fill="#F1F5F9" />
                <rect x="18" y="2" width={98 * lv[i]} height="10" rx="5" fill={MASC[i].c2} />
              </g>
            ))}
            {t >= 50 && (
              <text
                x="144"
                y="45"
                fontSize="22"
                textAnchor="middle"
                transform={`scale(${1 + 0.08 * Math.sin(t * 6)})`}
                style={{ transformOrigin: '144px 38px' }}
              >
                💖
              </text>
            )}
          </g>
        </svg>

        {/* Thanh Phụ Đề & Lời Thoại Rõ Ràng (Chống Giật 100%, Hiển Thị Mọi Nhân Vật & Lời Dẫn) */}
        {act && started && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 14,
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none',
              padding: '0 24px',
            }}
          >
            <div
              key={act.a}
              className="vi-pop"
              style={{
                background: 'rgba(15, 23, 42, 0.88)',
                backdropFilter: 'blur(10px)',
                color: '#FFF',
                padding: '10px 20px',
                borderRadius: 20,
                border: `2px solid ${SPK[act.w][0]}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                maxWidth: 760,
                boxShadow: '0 10px 28px rgba(15,23,42,0.28)',
              }}
            >
              <span
                style={{
                  background: SPK[act.w][3],
                  color: SPK[act.w][1],
                  fontWeight: 900,
                  fontSize: 13,
                  padding: '4px 12px',
                  borderRadius: 999,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {SPK[act.w][2]}
              </span>
              <span
                style={{
                  fontSize: 'clamp(15px, 1.45vw, 19px)',
                  fontWeight: 800,
                  lineHeight: 1.35,
                  letterSpacing: '0.01em',
                }}
              >
                “{act.t}”
              </span>
              {voiceOn && isPlaying && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2.5, height: 16, marginLeft: 4 }}>
                  {[0, 0.15, 0.3].map((d, i) => (
                    <span
                      key={i}
                      className="vi-wave"
                      style={{
                        width: 3,
                        height: 14,
                        borderRadius: 2,
                        background: SPK[act.w][0],
                        animationDelay: `${d}s`,
                      }}
                    />
                  ))}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Nút sang Slide 03 khi intro kết thúc */}
        {t >= DUR && (
          <div
            className="vi-pop"
            style={{
              position: 'absolute',
              bottom: 24,
              right: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <button
              onClick={onNext}
              className="vi-pulse"
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 999,
                padding: '14px 28px',
                fontSize: 16,
                fontWeight: 900,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(16,185,129,0.45)',
              }}
            >
              <span>GẶP GỠ BIỆT ĐỘI THÀNH VIÊN</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Thanh tiến trình (bấm để tua tới bất kỳ cảnh nào) */}
      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: '#475569', fontFamily: 'monospace' }}>
          {fmt(t)} / {fmt(DUR)}
        </span>
        <div
          onClick={started ? handleSeek : undefined}
          style={{
            flex: 1,
            height: 11,
            background: '#E2E8F0',
            borderRadius: 999,
            position: 'relative',
            cursor: started ? 'pointer' : 'default',
          }}
        >
          <div
            style={{
              width: `${(t / DUR) * 100}%`,
              height: '100%',
              background: `linear-gradient(90deg, #22C55E, ${accentColor})`,
              borderRadius: 999,
              transition: 'background .4s',
            }}
          />
          {SCENES.slice(1).map((s, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: 2,
                left: `${(s.at / DUR) * 100}%`,
                width: 2.5,
                height: 7,
                borderRadius: 1,
                background: '#FFF',
                opacity: 0.9,
              }}
            />
          ))}
          <span
            style={{
              position: 'absolute',
              top: -3.5,
              left: `calc(${(t / DUR) * 100}% - 9px)`,
              width: 18,
              height: 18,
              borderRadius: 9,
              background: '#FFF',
              border: `3.5px solid ${accentColor}`,
              boxShadow: '0 2px 6px rgba(0,0,0,.2)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}