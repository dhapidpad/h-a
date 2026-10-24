import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play, Pause, RotateCcw, FastForward, ArrowRight,
  Volume2, VolumeX, Mic, MicOff, Maximize2, Minimize2,
} from 'lucide-react';

/* ============================================================================
   BIỆT ĐỘI N – P – K · PHIM HOẠT HÌNH ĐỒNG QUÊ VIỆT NAM (30 GIÂY THỰC TẾ)
   ----------------------------------------------------------------------------
   • Thời lượng chuẩn: DUR = 30.0s, SPEED = 1.0 (tỉ lệ thời gian thực 1:1)
   • Phong cách: 2.5D Storybook Illustration lấy cảm hứng đồng bằng Bắc Bộ
     (lũy tre làng, hàng cau, mái ngói đỏ, núi đá vôi mờ sương, mương nước
     phản chiếu nắng mai, cánh đồng lúa nhiều lớp chuyển màu vàng lúa chín)
   • Nhân vật trung tâm: Bác nông dân Việt Nam (áo bà ba nâu, khăn rằn, nón lá)
     hiền hậu, ấm áp và Biệt đội Đạm (N) – Lân (P) – Kali (K) với hình dáng
     (silhouette) gắn liền với Lá lúa – Bộ rễ – Hạt thóc vàng.
   • Âm thanh: Nhạc nền ngũ cung đồng quê (sáo trúc, đàn tranh, gió đồng, chim
     sẻ buổi sớm) + giọng đọc tiếng Việt vi-VN tự nhiên, tự động giảm nhẹ nhạc
     nền (ducking) khi có lời thoại.
   ============================================================================ */

const DUR = 30;
const SPEED = 1;
const DISPLAY = "'Baloo 2','Nunito',system-ui,-apple-system,sans-serif";
const BODY = "'Nunito','Baloo 2',system-ui,-apple-system,sans-serif";

/* ====== Hàm toán học & nội suy chuyển động ====== */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const prog = (t, s, d) => clamp((t - s) / Math.max(0.0001, d));
const lerp = (a, b, k) => a + (b - a) * k;
const easeOut = (x) => 1 - Math.pow(1 - clamp(x), 3);
const easeIO = (x) => {
  const c = clamp(x);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
};
const smoothEnv = (t, a, b, fade = 0.35) =>
  easeIO(prog(t, a, fade)) * (1 - easeIO(prog(t, b - fade, fade)));
const springOut = (x) => {
  const c = clamp(x);
  return c <= 0 ? 0 : c >= 1 ? 1 : 1 + 1.45 * Math.pow(c - 1, 3) + 0.65 * Math.pow(c - 1, 2);
};
const fmt = (n) => {
  const sec = Math.max(0, Math.round(n));
  return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
};

const mixHex = (a, b, k) => {
  const ck = clamp(k);
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [A, B] = [p(a), p(b)];
  return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], ck))).join(',')})`;
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

const wrap = (s, n = 22) => {
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

/* Đường núi đá vôi & đồi xa trải rộng cho mọi khung hình */
const ridge = (base, amp, wl, ph, from = -1300, to = 2300) => {
  let d = `M${from} 700 L${from} ${base + Math.sin(ph) * amp}`;
  const step = wl / 2;
  for (let x = from, k = 0; x < to; x += step, k++) {
    const cy = base + Math.sin(k * 1.65 + ph + 0.9) * amp * 1.35 - amp * 0.45;
    const ey = base + Math.sin((k + 1) * 1.65 + ph) * amp;
    d += ` Q${x + step / 2} ${cy.toFixed(1)} ${x + step} ${ey.toFixed(1)}`;
  }
  return `${d} L${to} 700Z`;
};

const KARST_FAR = ridge(226, 36, 420, 0.5);
const KARST_SPIRES = 'M-180 300 L-180 276 Q-145 267 -127 239 Q-110 203 -93 228 Q-76 259 -48 267 Q-17 275 2 238 Q22 190 42 220 Q58 246 70 265 Q92 277 118 259 Q145 240 158 208 Q174 171 194 207 Q208 235 224 260 Q248 278 271 259 Q294 239 307 204 Q323 166 343 208 Q359 242 378 264 Q405 281 430 253 Q451 229 465 198 Q480 167 499 204 Q516 239 532 261 Q553 279 577 260 Q602 240 616 211 Q631 178 650 211 Q668 244 688 265 Q712 281 736 258 Q758 238 773 213 Q791 180 810 214 Q828 246 846 265 Q870 280 895 256 Q919 232 934 205 Q951 177 970 213 Q988 246 1010 267 L1120 300 Z';
const HILL_MID = ridge(264, 15, 520, 2.0);
const DIKE_NEAR = ridge(290, 7, 640, 3.8);

/* ============================================================================
   DỮ LIỆU KỊCH BẢN & TIMELINE 8 CẢNH (00:00 – 00:30)
   ============================================================================ */
const SCENES = [
  {
    at: 0.0,
    color: '#2E7D32',
    ink: '#1B5E20',
    key: 'Sớm mai đồng quê',
    rest: ' — Bình minh trong trẻo trên cánh đồng lúa Việt Nam',
  },
  {
    at: 3.0,
    color: '#8D5B4C',
    ink: '#5D3A2E',
    key: 'Bác nông dân thăm đồng',
    rest: ' — Chăm lúa đúng cách từ thuở ban đầu',
  },
  {
    at: 6.0,
    color: '#16A34A',
    ink: '#14532D',
    key: 'Đạm (N) xuất hiện',
    rest: ' — Thúc đẩy sinh trưởng thân và lá lúa xanh vươn cao',
  },
  {
    at: 9.0,
    color: '#6D28D9',
    ink: '#4C1D95',
    key: 'Lân (P) dưới tầng đất',
    rest: ' — Chuyển hóa năng lượng, hỗ trợ phát triển bộ rễ',
  },
  {
    at: 12.0,
    color: '#D97706',
    ink: '#92400E',
    key: 'Kali (K) nơi bông lúa',
    rest: ' — Điều hòa nước, giúp thân cứng và hạt lúa chắc mẩy',
  },
  {
    at: 15.0,
    color: '#0D9488',
    ink: '#115E59',
    key: 'Khoảnh khắc vui nhộn',
    rest: ' — Ba người bạn nhỏ cùng hào hứng khoe tài',
  },
  {
    at: 18.0,
    color: '#15803D',
    ink: '#14532D',
    key: 'Bón phân cân đối',
    rest: ' — Đủ Đạm, Lân, Kali đúng lượng giúp cây lúa khỏe mạnh',
  },
  {
    at: 24.0,
    color: '#B45309',
    ink: '#78350F',
    key: 'Mùa vàng bội thu',
    rest: ' — Chào mừng đến với bài thuyết trình Biệt đội N – P – K',
  },
];

/* Bảng màu bầu trời đồng quê buổi sớm chuyển dần sang nắng thu mùa gặt */
const SKY_TOP = [
  '#CFE8F7', // Cảnh 1: Sớm mai trong trẻo
  '#D4ECF9', // Cảnh 2: Bác nông dân ra đồng
  '#D6F2E4', // Cảnh 3: Đạm (N) xanh mát
  '#E3E5F8', // Cảnh 4: Lân (P) dịu nhẹ
  '#F9EBC8', // Cảnh 5: Kali (K) nắng ấm
  '#DCEEF5', // Cảnh 6: Ba bạn vui nhộn
  '#DCF2E6', // Cảnh 7: Hòa hợp cân đối
  '#FCE3A6', // Cảnh 8: Nắng vàng mùa lúa chín
];
const SKY_BOT = [
  '#FFF8E7',
  '#FFF9EB',
  '#F4FBF4',
  '#F7F6FC',
  '#FFFDF0',
  '#F7FBFD',
  '#F6FCF7',
  '#FFFBEB',
];

/* Thông tin 3 nhân vật Biệt đội N – P – K */
const MASC = [
  {
    id: 'N',
    name: 'Đạm (N)',
    role: 'Thúc đẩy sinh trưởng thân lá',
    c0: '#ECFDF5',
    c1: '#86EFAC',
    c2: '#22C55E',
    dark: '#14532D',
    at: 6.0,
    pts: [
      [6.0, 448, 232],
      [6.7, 362, 206],
      [14.8, 362, 206],
      [15.4, 386, 224],
      [18.2, 386, 224],
      [19.2, 402, 220],
      [23.8, 402, 220],
      [24.8, 376, 234],
    ],
  },
  {
    id: 'P',
    name: 'Lân (P)',
    role: 'Chuyển hóa năng lượng, phát triển rễ',
    c0: '#F5F3FF',
    c1: '#C4B5FD',
    c2: '#7C3AED',
    dark: '#4C1D95',
    at: 9.0,
    pts: [
      [9.0, 525, 382],
      [9.8, 628, 344],
      [11.8, 628, 344],
      [12.7, 628, 226],
      [14.8, 628, 226],
      [15.4, 604, 228],
      [18.2, 604, 228],
      [19.2, 592, 224],
      [23.8, 592, 224],
      [24.8, 616, 236],
    ],
  },
  {
    id: 'K',
    name: 'Kali (K)',
    role: 'Điều hòa nước, chống chịu, chắc hạt',
    c0: '#FFFBEB',
    c1: '#FDE68A',
    c2: '#D97706',
    dark: '#78350F',
    at: 12.0,
    pts: [
      [12.0, 540, 165],
      [12.7, 742, 208],
      [14.8, 742, 208],
      [15.4, 718, 220],
      [18.2, 718, 220],
      [19.2, 698, 218],
      [23.8, 698, 218],
      [24.8, 728, 232],
    ],
  },
];

/* [Màu viền, Màu chữ đậm, Nhãn người nói, Nền nhãn] */
const SPK = {
  narr: ['#2E7D32', '#14532D', '🌾 Lời dẫn đồng quê', '#DCFCE7'],
  farmer: ['#B45309', '#78350F', '🧑‍🌾 Bác nông dân', '#FEF3C7'],
  N: ['#16A34A', '#14532D', '🍃 Đạm (N)', '#DCFCE7'],
  P: ['#7C3AED', '#4C1D95', '🌱 Lân (P)', '#EDE9FE'],
  K: ['#D97706', '#78350F', '🌾 Kali (K)', '#FEF3C7'],
};

/* Cấu hình giọng đọc tự nhiên: [pitch chuẩn, rate chuẩn, ưu tiên giọng nam] */
const VOICE_CFG = {
  narr: { pitch: 0.98, rate: 0.96, preferMale: false },
  farmer: { pitch: 0.91, rate: 0.94, preferMale: true },
  N: { pitch: 1.06, rate: 1.01, preferMale: false },
  P: { pitch: 1.03, rate: 1.0, preferMale: false },
  K: { pitch: 0.96, rate: 0.98, preferMale: false },
};

/* Lời thoại đồng bộ kịch bản 30 giây */
const LINES = [
  { w: 'narr', a: 0.25, b: 2.85, t: 'Một sớm mai trên đồng lúa quê mình.', e: 'warm' },
  { w: 'farmer', a: 3.15, b: 5.80, t: 'Chăm đúng cách, lúa mới khỏe!', e: 'warm' },
  { w: 'N', a: 6.15, b: 8.80, t: 'Đạm giúp lá xanh!', e: 'cheer' },
  { w: 'P', a: 9.15, b: 11.80, t: 'Lân giúp rễ khỏe!', e: 'proud' },
  { w: 'K', a: 12.15, b: 14.80, t: 'Kali giúp thân cứng, hạt chắc!', e: 'calm' },
  { w: 'N', a: 15.10, b: 16.40, t: 'Tớ giỏi nhất!', e: 'playful' },
  { w: 'P', a: 16.45, b: 17.85, t: 'Cả ba cùng giỏi!', e: 'cheer' },
  { w: 'farmer', a: 18.20, b: 23.50, t: 'Đủ cả ba, bón cân đối, đúng lượng nhé!', e: 'warm' },
  { w: 'farmer', a: 24.20, b: 29.20, t: 'Mời thầy cô và các bạn cùng bắt đầu!', e: 'cheer' },
];

/* Dải ánh sáng dinh dưỡng hợp sức ở Cảnh 7 */
const STREAMS = [
  { from: [402, 220], to: [495, 195], c: '#4ADE80', a: 18.5, b: 23.8, label: 'Lá xanh' },
  { from: [592, 228], to: [505, 365], c: '#C4B5FD', a: 19.1, b: 23.8, label: 'Rễ khỏe' },
  { from: [698, 218], to: [515, 155], c: '#FBBF24', a: 19.7, b: 23.8, label: 'Hạt chắc' },
];

/* Hạt nắng & hương lúa nhẹ nhàng (không pháo hoa, không rối mắt) */
const GOLDEN_MOTES = Array.from({ length: 14 }, (_, i) => ({
  x: -120 + ((i * 97) % 1240),
  y: 55 + ((i * 43) % 235),
  r: 2.2 + (i % 3) * 1.1,
  sp: 0.45 + (i % 4) * 0.18,
  ph: i * 1.15,
}));

/* ============================================================================
   HỆ THỐNG ÂM THANH ĐỒNG QUÊ VIỆT NAM (Web Audio API)
   - Sáo trúc ngũ cung (Hò - Xự - Xang - Xê - Cống)
   - Đàn tranh gảy nhẹ
   - Âm thanh thiên nhiên: gió đồng, chim sẻ buổi sớm, giọt sương, bước chân
   ============================================================================ */
function playNote(c, d, f, at, dur, type = 'sine', vol = 0.08, f2 = null) {
  if (!c || !d) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, at);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, at + dur);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.linearRampToValueAtTime(vol, at + Math.min(0.06, dur * 0.25));
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g);
  g.connect(d);
  o.start(at);
  o.stop(at + dur + 0.04);
}

/* Tiếng sáo trúc ấm áp có độ ngân nhẹ */
function fluteNote(c, d, f, at, dur, vol = 0.048) {
  if (!c || !d) return;
  const o = c.createOscillator();
  const sub = c.createOscillator();
  const vib = c.createOscillator();
  const vibG = c.createGain();
  const g = c.createGain();

  o.type = 'sine';
  sub.type = 'triangle';
  o.frequency.setValueAtTime(f * 0.992, at);
  o.frequency.exponentialRampToValueAtTime(f, at + Math.min(0.09, dur * 0.3));
  sub.frequency.setValueAtTime(f * 2, at);

  vib.frequency.setValueAtTime(4.8, at);
  vibG.gain.setValueAtTime(f * 0.006, at);
  vib.connect(vibG);
  vibG.connect(o.frequency);

  const subG = c.createGain();
  subG.gain.setValueAtTime(0.18, at);

  g.gain.setValueAtTime(0.0001, at);
  g.gain.linearRampToValueAtTime(vol, at + Math.min(0.12, dur * 0.3));
  g.gain.setValueAtTime(vol * 0.85, at + dur * 0.65);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);

  o.connect(g);
  sub.connect(subG);
  subG.connect(g);
  g.connect(d);

  o.start(at);
  sub.start(at);
  vib.start(at);
  o.stop(at + dur + 0.05);
  sub.stop(at + dur + 0.05);
  vib.stop(at + dur + 0.05);
}

/* Tiếng đàn tranh gảy nhẹ */
function zitherPluck(c, d, f, at, dur = 0.9, vol = 0.036) {
  if (!c || !d) return;
  playNote(c, d, f, at, dur, 'triangle', vol);
  playNote(c, d, f * 2, at, dur * 0.45, 'sine', vol * 0.35);
}

const SFX = {
  dawnBreeze: (c, d, n) => {
    fluteNote(c, d, 523.25, n, 0.75, 0.04);
    fluteNote(c, d, 659.25, n + 0.35, 0.95, 0.045);
  },
  birdChirp: (c, d, n) => {
    playNote(c, d, 1760, n, 0.09, 'sine', 0.032, 2240);
    playNote(c, d, 2093, n + 0.12, 0.12, 'sine', 0.035, 1680);
  },
  stepSoft: (c, d, n) => {
    playNote(c, d, 135, n, 0.08, 'triangle', 0.05, 78);
  },
  waterRipple: (c, d, n) => {
    [587.33, 783.99, 1046.5].forEach((f, i) =>
      playNote(c, d, f, n + i * 0.07, 0.38, 'sine', 0.032)
    );
  },
  leafMorph: (c, d, n) => {
    zitherPluck(c, d, 523.25, n, 0.6, 0.045);
    zitherPluck(c, d, 659.25, n + 0.09, 0.7, 0.048);
    fluteNote(c, d, 783.99, n + 0.18, 0.65, 0.045);
  },
  rootMorph: (c, d, n) => {
    zitherPluck(c, d, 392.0, n, 0.7, 0.045);
    zitherPluck(c, d, 523.25, n + 0.1, 0.75, 0.048);
    fluteNote(c, d, 659.25, n + 0.2, 0.7, 0.045);
  },
  grainMorph: (c, d, n) => {
    zitherPluck(c, d, 587.33, n, 0.65, 0.045);
    zitherPluck(c, d, 783.99, n + 0.1, 0.75, 0.048);
    fluteNote(c, d, 880.0, n + 0.2, 0.7, 0.045);
  },
  playfulBanter: (c, d, n) => {
    zitherPluck(c, d, 659.25, n, 0.35, 0.038);
    zitherPluck(c, d, 783.99, n + 0.12, 0.4, 0.038);
  },
  harmonyChord: (c, d, n) => {
    [523.25, 587.33, 783.99, 1046.5].forEach((f, i) =>
      zitherPluck(c, d, f, n + i * 0.08, 1.2, 0.038)
    );
  },
  harvestGolden: (c, d, n) => {
    [523.25, 659.25, 783.99, 880.0, 1046.5].forEach((f, i) =>
      zitherPluck(c, d, f, n + i * 0.09, 1.35, 0.042)
    );
    fluteNote(c, d, 1046.5, n + 0.45, 1.3, 0.045);
  },
};

const CUES = [
  [0.15, 'dawnBreeze'],
  [1.20, 'birdChirp'],
  [3.10, 'stepSoft'],
  [3.55, 'stepSoft'],
  [4.00, 'stepSoft'],
  [4.45, 'waterRipple'],
  [6.05, 'leafMorph'],
  [7.40, 'waterRipple'],
  [9.05, 'rootMorph'],
  [12.05, 'grainMorph'],
  [15.05, 'playfulBanter'],
  [16.45, 'playfulBanter'],
  [18.40, 'harmonyChord'],
  [20.20, 'waterRipple'],
  [24.05, 'harvestGolden'],
  [26.20, 'birdChirp'],
];

/* Âm giai ngũ cung Việt Nam: C5, D5, F5, G5, A5, C6 */
const PENTA = [523.25, 587.33, 698.46, 783.99, 880.0, 1046.5];
const MELODY_PATTERN = [0, 1, 3, 4, 3, 1, 0, -1, 1, 3, 4, 5, 4, 3, 1, -1];
const ZITHER_BASS = [261.63, 293.66, 349.23, 392.0];

function playCountrysideBeat(c, d, b, ducking) {
  if (!c || !d) return;
  const n = c.currentTime + 0.02;
  const volScale = ducking ? 0.45 : 0.92;
  const m = MELODY_PATTERN[b % 16];
  if (m >= 0) {
    fluteNote(c, d, PENTA[m], n, 0.46, 0.042 * volScale);
  }
  if (b % 4 === 0) {
    const bassF = ZITHER_BASS[(b >> 2) % 4];
    zitherPluck(c, d, bassF, n, 1.35, 0.045 * volScale);
  }
  if (b % 2 === 1) {
    const arpF = PENTA[(b * 2) % 5] * 0.5;
    zitherPluck(c, d, arpF, n, 0.42, 0.022 * volScale);
  }
}

/* ============================================================================
   GIỌNG ĐỌC TIẾNG VIỆT TỰ NHIÊN (speechSynthesis)
   - Lựa chọn giọng thực tế từ danh sách voices của trình duyệt
   - Ưu tiên giọng nam tiếng Việt tự nhiên cho Bác nông dân
   - Tốc độ vừa phải, ngắt nhịp dấu phẩy tự nhiên, không ép nhanh
   ============================================================================ */
let speakToken = 0;

function pickBestVietnameseVoices(voices) {
  const vi = (voices || []).filter(
    (v) => /^vi/i.test(v.lang) || /viet|tiếng việt/i.test(v.name)
  );
  if (!vi.length) return { male: null, general: null };

  const baseRank = (v) =>
    (/natural/i.test(v.name) ? 6 : 0) +
    (/online/i.test(v.name) ? 4 : 0) +
    (/google/i.test(v.name) ? 3 : 0) +
    (v.localService ? 1 : 0);

  const maleRank = (v) =>
    baseRank(v) +
    (/namminh|nam|male|thanh|minh/i.test(v.name) ? 8 : 0) -
    (/hoaimy|nu|female|linh|my/i.test(v.name) ? 3 : 0);

  const generalRank = (v) =>
    baseRank(v) + (/hoaimy|namminh|linh/i.test(v.name) ? 4 : 0);

  const sortedMale = [...vi].sort((a, b) => maleRank(b) - maleRank(a));
  const sortedGeneral = [...vi].sort((a, b) => generalRank(b) - generalRank(a));

  return {
    male: sortedMale[0] || sortedGeneral[0] || null,
    general: sortedGeneral[0] || null,
  };
}

function buildUtterances(line) {
  const cfg = VOICE_CFG[line.w] || VOICE_CFG.narr;
  const raw = line.t.trim();
  /* Tách nhẹ theo dấu phẩy để tạo nhịp nghỉ tự nhiên của người Việt */
  const clauses = (raw.match(/[^,]+[,]*/g) || [raw])
    .map((s) => s.trim())
    .filter(Boolean);

  return clauses.map((clause, i) => {
    const cleanText = clause.replace(/[,]+$/, '').trim();
    const u = new SpeechSynthesisUtterance(cleanText);
    u.lang = 'vi-VN';
    u.volume = 1;
    const isLast = i === clauses.length - 1;
    u.pitch = clamp(cfg.pitch + (isLast ? 0.02 : 0), 0.85, 1.15);
    u.rate = clamp(cfg.rate, 0.9, 1.06);
    u.pauseAfter = clause.endsWith(',') ? 150 : 90;
    return u;
  });
}

function speakLine(synth, line, voicesMap) {
  if (!synth || typeof SpeechSynthesisUtterance === 'undefined') return;
  synth.cancel();
  const mine = ++speakToken;
  const cfg = VOICE_CFG[line.w] || VOICE_CFG.narr;
  const chosenVoice = cfg.preferMale
    ? voicesMap.male || voicesMap.general
    : voicesMap.general || voicesMap.male;

  const list = buildUtterances(line);
  let i = 0;
  const next = () => {
    if (mine !== speakToken || i >= list.length) return;
    const u = list[i++];
    if (chosenVoice) {
      u.voice = chosenVoice;
      u.lang = chosenVoice.lang || 'vi-VN';
    }
    u.onend = () => {
      if (mine === speakToken && i < list.length) {
        setTimeout(next, u.pauseAfter);
      }
    };
    u.onerror = () => {};
    try {
      synth.speak(u);
    } catch (_) {
      /* Bỏ qua nếu trình duyệt chặn phát tự động */
    }
  };
  setTimeout(next, 35);
}

/* ============================================================================
   THÀNH PHẦN CẢNH QUAN ĐỒNG QUÊ VIỆT NAM (SVG 2.5D)
   ============================================================================ */

/* Mây buổi sớm mềm mại, không gắn mặt hoạt hình trẻ con */
const SoftCloud = React.memo(function SoftCloud({ x, y, s, dur, delay, opacity = 0.88 }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} opacity={opacity}>
      <g className="vi-drift" style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}>
        <ellipse cx="4" cy="14" rx="58" ry="12" fill="#FDE68A" opacity=".28" />
        <ellipse cx="0" cy="10" rx="56" ry="15" fill="#FFFDF9" />
        <circle cx="-22" cy="-2" r="20" fill="#FFFDF9" />
        <circle cx="10" cy="-9" r="26" fill="#FFFDF9" />
        <circle cx="34" cy="1" r="17" fill="#FFFDF9" />
      </g>
    </g>
  );
});

/* Mặt trời buổi sớm dịu ấm */
const MorningSun = React.memo(function MorningSun({ harvestK }) {
  return (
    <g>
      <circle r={92 + harvestK * 16} fill="url(#sunHalo)" opacity={0.68 + harvestK * 0.15} />
      <circle r="48" fill="url(#sunHalo)" opacity=".5" />
      <circle r="32" fill="url(#sunCore)" />
      <ellipse cx="-10" cy="-12" rx="11" ry="5" fill="#FFFDF9" opacity=".45" transform="rotate(-24 -10 -12)" />
    </g>
  );
});

/* Lũy tre làng Việt Nam đung đưa trong gió */
const BambooGrove = React.memo(function BambooGrove({ x, y, s = 1, flip = 1 }) {
  const stalks = [
    [-18, 95, -14],
    [-8, 112, -7],
    [2, 118, 5],
    [12, 102, 13],
    [22, 86, 20],
  ];
  return (
    <g transform={`translate(${x},${y}) scale(${flip * s},${s})`}>
      <ellipse cx="4" cy="4" rx="44" ry="7" fill="#14532D" opacity=".22" />
      <g className="vi-sway" style={{ transformOrigin: '0px 0px', animationDuration: '4.2s' }}>
        {stalks.map(([sx, h, bend], idx) => (
          <g key={idx}>
            <path
              d={`M${sx} 0 Q${sx + bend * 0.4} ${-h * 0.55} ${sx + bend} ${-h}`}
              stroke={idx % 2 === 0 ? '#15803D' : '#166534'}
              strokeWidth="4.2"
              strokeLinecap="round"
              fill="none"
            />
            {[0.28, 0.56, 0.82].map((u, ni) => (
              <line
                key={ni}
                x1={sx + bend * u - 3}
                y1={-h * u}
                x2={sx + bend * u + 3}
                y2={-h * u}
                stroke="#86EFAC"
                strokeWidth="1.2"
                opacity=".7"
              />
            ))}
            {/* Tán lá tre mảnh */}
            {[-1, 1].map((dir) => (
              <path
                key={dir}
                d={`M${sx + bend} ${-h} Q${sx + bend + dir * 16} ${-h - 6} ${sx + bend + dir * 26} ${-h + 5} Q${sx + bend + dir * 12} ${-h + 2} ${sx + bend} ${-h}`}
                fill={idx % 2 ? '#22C55E' : '#15803D'}
              />
            ))}
            <path
              d={`M${sx + bend * 0.7} ${-h * 0.72} Q${sx + bend * 0.7 + 18} ${-h * 0.72 - 8} ${sx + bend * 0.7 + 28} ${-h * 0.72 + 2} Q${sx + bend * 0.7 + 14} ${-h * 0.72 + 1} ${sx + bend * 0.7} ${-h * 0.72}`}
              fill="#4ADE80"
              opacity=".85"
            />
          </g>
        ))}
      </g>
    </g>
  );
});

/* Hàng cau và mái nhà ngói đỏ làng quê Bắc Bộ */
const VillageCluster = React.memo(function VillageCluster({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {/* Tán cây vườn nhiều lớp, tạo chiều sâu sau mái nhà */}
      <g>
        <circle cx="-48" cy="-25" r="27" fill="#14532D" opacity=".88" />
        <circle cx="-33" cy="-39" r="20" fill="#166534" />
        <circle cx="-15" cy="-31" r="24" fill="#15803D" />
        <circle cx="47" cy="-28" r="25" fill="#166534" />
        <circle cx="62" cy="-40" r="19" fill="#15803D" />
        <circle cx="29" cy="-34" r="22" fill="#1E7A40" />
        <g fill="#4ADE80" opacity=".48">
          <circle cx="-40" cy="-44" r="4" /><circle cx="-21" cy="-27" r="3.2" />
          <circle cx="54" cy="-47" r="3.5" /><circle cx="34" cy="-29" r="3" />
        </g>
      </g>
      {/* Thân nhà vôi ấm, chân tường và ô cửa gỗ */}
      <rect x="-36" y="-23" width="72" height="27" rx="2" fill="#D9C7A7" opacity=".55" transform="translate(1,2)" />
      <rect x="-35" y="-25" width="70" height="27" rx="2" fill="#FFF3D9" stroke="#C5A980" strokeWidth="1.2" />
      <rect x="-39" y="-1" width="78" height="5" rx="1.5" fill="#B08961" />
      <path d="M-35 -13 H35" stroke="#E3D0B2" strokeWidth="1" />
      {/* Cửa chính */}
      <path d="M-8 2 V-15 Q0 -21 8 -15 V2Z" fill="#7C4A2A" stroke="#5C3824" strokeWidth="1.2" />
      <path d="M0 -16 V2 M-7 -7 H7" stroke="#C69A6B" strokeWidth=".9" />
      <circle cx="5.3" cy="-5" r=".9" fill="#FDE68A" />
      {/* Cửa sổ gỗ có song */}
      {[-25, 18].map((wx) => (
        <g key={wx}>
          <rect x={wx} y="-17" width="12" height="10" rx="1" fill="#8B5E3C" stroke="#6B4226" strokeWidth=".8" />
          <rect x={wx + 1.5} y="-15.5" width="9" height="7" fill="#FDE7AD" opacity=".78" />
          <path d={`M${wx + 6} -15.5 V-8.5 M${wx + 1.5} -12 H${wx + 10.5}`} stroke="#8B5E3C" strokeWidth=".9" />
        </g>
      ))}
      {/* Mái ngói đỏ nhiều hàng ngói */}
      <path d="M-47 -23 L0 -48 L47 -23 L39 -19 L0 -40 L-39 -19Z" fill="#7F1D1D" stroke="#6F1D1B" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M-45 -23 L0 -46 L45 -23 Q0 -17 -45 -23Z" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1.35" strokeLinejoin="round" />
      <path d="M-34 -25 Q0 -19 34 -25 M-25 -30 Q0 -24 25 -30 M-16 -35 Q0 -29 16 -35 M-7 -40 Q0 -38 7 -40" stroke="#F87171" strokeWidth="1.1" fill="none" opacity=".72" />
      <path d="M-42 -23 Q0 -16 42 -23" stroke="#FCA5A5" strokeWidth="1.2" fill="none" opacity=".65" />
      {/* Ống khói đất nung và làn khói bếp mỏng */}
      <rect x="21" y="-43" width="6" height="11" rx="1" fill="#A1624A" stroke="#7C3F2B" strokeWidth=".8" />
      <path className="vi-smoke" d="M24 -45 Q17 -53 25 -57 Q31 -62 25 -67" stroke="#F8FAFC" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".55" />
      {/* Hàng cau cao thanh mảnh hai bên mái */}
      {[-57, 54].map((px, i) => (
        <g key={i} transform={`translate(${px},0)`}>
          <path d={`M0 2 Q${i ? 4 : -4} -34 0 -82`} stroke="#78716C" strokeWidth="3.1" fill="none" strokeLinecap="round" />
          {[-2, 0, 2].map((fan, fi) => (
            <path key={fi} d={`M0 -82 Q${fan * 8 + (i ? 12 : -12)} -93 ${fan * 12 + (i ? 25 : -25)} -83 Q${fan * 7} -84 0 -82Z`} fill={fi === 1 ? '#22C55E' : '#15803D'} />
          ))}
          <path d="M0 -82 L-17 -90 M0 -82 L18 -91" stroke="#166534" strokeWidth="1" fill="none" />
        </g>
      ))}
      {/* Bụi hoa nhỏ bên hiên */}
      <g>
        <path d="M-38 1 Q-42 -8 -36 -13 M-34 2 Q-30 -7 -28 -11 M28 2 Q31 -7 36 -10" stroke="#166534" strokeWidth="1.8" fill="none" />
        <circle cx="-37" cy="-13" r="2" fill="#F9A8D4" /><circle cx="-28" cy="-11" r="1.7" fill="#FBCFE8" />
        <circle cx="36" cy="-10" r="1.9" fill="#FDE68A" />
      </g>
    </g>
  );
});

/* Chú trâu thong thả gặm cỏ ở bờ đê xa */
const WaterBuffalo = React.memo(function WaterBuffalo({ x, y, s = 0.72, t }) {
  const headNod = Math.sin(t * 1.05) * 1.7;
  const tailFlick = Math.sin(t * 2.2) * 5;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cx="1" cy="3" rx="31" ry="5" fill="#183B2B" opacity=".2" />
      {/* Đuôi và chùm lông */}
      <path d={`M23 -20 Q37 -16 34 -4 Q32 1 ${31 + tailFlick * 0.25} 4`} stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d={`M${31 + tailFlick * 0.25} 3 l-4 5 M${31 + tailFlick * 0.25} 3 l2 6 M${31 + tailFlick * 0.25} 3 l5 3`} stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
      {/* Chân và móng guốc */}
      {[-18, -7, 10, 19].map((lx, i) => (
        <g key={i}>
          <path d={`M${lx} -15 Q${lx - 1} -7 ${lx + (i % 2 ? 1 : -1)} 0`} stroke="#34445A" strokeWidth="5.2" strokeLinecap="round" />
          <path d={`M${lx - 3} -1 L${lx + 3} -1 L${lx + 3} 2 L${lx - 3} 2Z`} fill="#1F2937" />
        </g>
      ))}
      {/* Thân trâu xám xanh có bờm lưng và highlight */}
      <path d="M-27 -25 Q-23 -39 -5 -39 Q15 -40 27 -28 Q31 -20 24 -12 Q8 -8 -15 -11 Q-29 -14 -27 -25Z" fill="url(#buffaloHide)" stroke="#334155" strokeWidth="1.6" />
      <path d="M-19 -29 Q-7 -38 10 -32 Q18 -29 20 -23" stroke="#CBD5E1" strokeWidth="2.3" opacity=".36" fill="none" strokeLinecap="round" />
      <path d="M-22 -14 Q0 -9 20 -15" stroke="#1E293B" strokeWidth="1.2" opacity=".35" fill="none" />
      {/* Cổ và đầu */}
      <g transform={`translate(-20,-24) rotate(${headNod})`}>
        <path d="M-2 -9 Q-12 -17 -10 -29 Q-6 -34 1 -29 L7 -19 L13 -13Z" fill="#475569" stroke="#334155" strokeWidth="1.4" />
        <ellipse cx="-7" cy="-21" rx="11" ry="12" fill="#64748B" stroke="#334155" strokeWidth="1.35" />
        <path d="M-14 -25 Q-23 -38 -18 -42 Q-11 -39 -9 -30" fill="#F5E7C8" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        <path d="M-1 -26 Q8 -39 11 -35 Q13 -28 4 -20" fill="#F5E7C8" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="-14" cy="-8" rx="10.5" ry="7.5" fill="#94A3B8" stroke="#475569" strokeWidth="1.2" />
        <ellipse cx="-18" cy="-7" rx="2.6" ry="2" fill="#64748B" />
        <circle cx="-10" cy="-24" r="2.3" fill="#111827" />
        <circle cx="-10.7" cy="-24.8" r=".8" fill="#FFFFFF" />
        <path d="M-21 -13 Q-17 -11 -13 -13" stroke="#475569" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M-23 -2 Q-18 2 -13 -2" stroke="#E2E8F0" strokeWidth="1" fill="none" opacity=".6" />
        <path d="M-2 -31 Q-8 -37 -13 -33" stroke="#94A3B8" strokeWidth="1.3" fill="none" opacity=".75" />
      </g>
      {/* Dây thừng cổ mộc mạc */}
      <path d="M-25 -19 Q-10 -7 4 -16" stroke="#D6B779" strokeWidth="2.1" fill="none" strokeLinecap="round" />
      <path d="M-9 -13 l3 5 3 -5" stroke="#A16207" strokeWidth="1.2" fill="none" />
    </g>
  );
});

/* Chuồn chuồn bay lượn trên mặt ruộng */
const Dragonfly = ({ x, y, t, s = 1, color = '#EA580C' }) => {
  const wing = Math.sin(t * 25) * 12;
  const tilt = Math.sin(t * 1.8) * 5;
  return (
    <g transform={`translate(${x},${y}) rotate(${tilt}) scale(${s})`}>
      <g transform={`rotate(${wing})`}>
        <ellipse cx="-8" cy="-4" rx="10.5" ry="3.2" fill="#F0F9FF" fillOpacity=".86" stroke="#7DD3FC" strokeWidth=".75" />
        <ellipse cx="8" cy="-4" rx="10.5" ry="3.2" fill="#F0F9FF" fillOpacity=".86" stroke="#7DD3FC" strokeWidth=".75" />
        <path d="M-17 -4 L-2 -4 M2 -4 L17 -4 M-12 -6 L-7 -2 M12 -6 L7 -2" stroke="#BAE6FD" strokeWidth=".55" fill="none" />
      </g>
      <g transform={`rotate(${-wing * 0.72})`}>
        <ellipse cx="-7" cy="1" rx="8.8" ry="2.5" fill="#E0F2FE" fillOpacity=".72" stroke="#93C5FD" strokeWidth=".55" />
        <ellipse cx="7" cy="1" rx="8.8" ry="2.5" fill="#E0F2FE" fillOpacity=".72" stroke="#93C5FD" strokeWidth=".55" />
      </g>
      <path d="M0 -1 Q1 5 0 12" stroke={color} strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M0 3 L0 10" stroke="#FDE68A" strokeWidth=".9" strokeLinecap="round" fill="none" />
      <ellipse cx="0" cy="-4.2" rx="3.1" ry="3.5" fill={color} stroke="#9A3412" strokeWidth=".65" />
      <circle cx="-1" cy="-4.9" r="1.1" fill="#FFFFFF" opacity=".9" />
      <circle cx="-2.1" cy="-4.5" r=".65" fill="#172554" />
      <circle cx="2.1" cy="-4.5" r=".65" fill="#172554" />
    </g>
  );
};

const RiceDuck = React.memo(function RiceDuck({ x, y, s = 0.7, t, delay = 0 }) {
  const bob = Math.sin(t * 2.1 + delay) * 1.15;
  const headBob = Math.sin(t * 2.7 + delay) * 1.4;
  return (
    <g transform={`translate(${x},${y + bob}) scale(${s})`}>
      <ellipse cx="0" cy="8" rx="23" ry="3.4" fill="#7DD3FC" opacity=".23" />
      <path d="M-21 7 Q-10 4 0 7 T21 7" stroke="#E0F2FE" strokeWidth="1.2" fill="none" opacity=".65" />
      <ellipse cx="0" cy="0" rx="16" ry="9.8" fill="#FCD34D" stroke="#B7791F" strokeWidth="1" />
      <ellipse cx="-1" cy="-3" rx="10" ry="5.8" fill="#FEF3C7" opacity=".42" />
      <path d="M-9 -1 Q-16 -7 -18 -1 Q-13 3 -8 3Z" fill="#F59E0B" stroke="#B7791F" strokeWidth=".8" />
      <path d="M10 1 L18 3 L11 6Z" fill="#EAB308" stroke="#A16207" strokeWidth=".7" />
      <g transform={`translate(10,${-8 + headBob})`}>
        <circle cx="0" cy="0" r="7.4" fill="#FDE68A" stroke="#B7791F" strokeWidth=".9" />
        <path d="M5 0 L13 2 L5 4Z" fill="#F97316" stroke="#C2410C" strokeWidth=".65" />
        <circle cx="2.5" cy="-1.5" r="1.35" fill="#1F2937" />
        <circle cx="2.1" cy="-2" r=".55" fill="#FFFFFF" />
        <ellipse cx="5" cy="2.8" rx="2.1" ry="1.1" fill="#FB7185" opacity=".42" />
        <path d="M-3 -6 Q0 -10 3 -7" stroke="#FFF7D6" strokeWidth="1" fill="none" />
      </g>
      <path d="M-5 8 l-2 3 M3 8 l-1 3" stroke="#C2410C" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
});

/* Cánh đồng lúa nhiều lớp + mương nước + bờ ruộng chuyển màu mùa vàng */
const PaddyFieldBackdrop = React.memo(function PaddyFieldBackdrop({ t, harvestK, soilCutawayEnv }) {
  const paddyGreenFar = mixHex('#86EFAC', '#FDE047', harvestK);
  const paddyGreenMid = mixHex('#4ADE80', '#FBBF24', harvestK);
  const paddyGreenNear = mixHex('#22C55E', '#F59E0B', harvestK);
  const rowStrokeFar = mixHex('#16A34A', '#D97706', harvestK);
  const rowStrokeNear = mixHex('#15803D', '#B45309', harvestK);

  return (
    <g>
      {/* Dãy núi đá vôi mờ sương phía chân trời */}
      <g transform={`translate(${Math.sin(t * 0.12) * 6},0)`}>
        <path d={KARST_FAR} fill="#94A3B8" opacity=".24" />
        <path d={KARST_SPIRES} fill="#8298A6" opacity=".28" />
        <path d="M-92 231 Q-83 251 -68 263 M42 224 Q51 246 62 260 M194 211 Q204 237 215 254 M343 211 Q355 239 369 257 M499 207 Q511 238 523 256 M650 214 Q663 239 677 260 M810 216 Q824 243 837 260 M970 216 Q984 243 997 260" fill="none" stroke="#F8FAFC" strokeWidth="2" opacity=".38" />
        <path d={HILL_MID} fill="url(#hillFar)" opacity=".86" />
      </g>
      <path d={DIKE_NEAR} fill="url(#hillNear)" />

      {/* Mây sớm trôi nhẹ */}
      <SoftCloud x={165} y={84} s={1.0} dur={14} delay={0} />
      <SoftCloud x={620} y={62} s={1.18} dur={17} delay={-4} />
      <SoftCloud x={390} y={118} s={0.76} dur={13} delay={-2} />
      <SoftCloud x={-220} y={98} s={1.05} dur={15} delay={-6} />
      <SoftCloud x={1140} y={88} s={0.96} dur={16} delay={-3} />

      {/* Làng quê Bắc Bộ phía xa: mái ngói đỏ, lũy tre, hàng cau, chú trâu */}
      <VillageCluster x={180} y={288} s={0.82} />
      <VillageCluster x={860} y={290} s={0.74} />
      <BambooGrove x={42} y={296} s={0.95} flip={1} />
      <BambooGrove x={-165} y={300} s={1.1} flip={-1} />
      <BambooGrove x={968} y={296} s={0.92} flip={-1} />
      <BambooGrove x={1155} y={302} s={1.08} flip={1} />
      <WaterBuffalo x={755} y={292} s={0.76} t={t} />

      {/* Cánh đồng lúa tầng xa & trung cảnh */}
      <rect x="-1300" y="290" width="3600" height="65" fill={paddyGreenFar} />
      <path
        d="M-1300 312 Q-400 302 250 314 T1100 308 T2300 314 L2300 370 L-1300 370Z"
        fill={paddyGreenMid}
      />
      {/* Đường bờ thửa uốn nhẹ, tạo chiều sâu ruộng bậc lớp */}
      <path d="M-1300 302 Q-420 294 230 306 T1100 300 T2300 306" fill="none" stroke="#F0FDF4" strokeWidth="2.2" opacity=".5" />
      <path d="M-1300 315 Q-380 308 245 319 T1110 313 T2300 319" fill="none" stroke="#166534" strokeWidth="2" opacity=".22" />
      <path d="M-1300 324 Q-350 318 300 328 T1200 324 T2300 328" fill="none" stroke="#FEF3C7" strokeWidth="1.5" opacity=".48" />

      {/* Mặt nước ruộng & mương nước phản chiếu nắng sớm */}
      <path
        d="M-1300 326 Q-350 318 320 328 T1200 324 T2300 328 L2300 368 L-1300 368Z"
        fill="url(#waterReflect)"
        opacity={0.78 - harvestK * 0.28}
      />
      {/* Cầu ván nhỏ qua mương tưới, thấp thoáng giữa những thửa ruộng */}
      <g transform="translate(685,331) scale(.82)" pointerEvents="none">
        <path d="M-34 1 Q0 -9 34 1 L34 6 Q0 -3 -34 6Z" fill="#854D0E" stroke="#5B341A" strokeWidth="1.2" />
        <path d="M-29 0 L-29 7 M-15 -2 L-15 5 M0 -3 L0 4 M15 -2 L15 5 M29 0 L29 7" stroke="#D6A36A" strokeWidth="1.5" />
        <path d="M-34 -1 Q0 -11 34 -1" fill="none" stroke="#FDE68A" strokeWidth="1.6" opacity=".8" />
      </g>

      {/* Gợn nắng lấp lánh trên mặt nước ruộng */}
      {Array.from({ length: 18 }, (_, i) => {
        const wx = -250 + i * 88 + Math.sin(t * 1.4 + i) * 8;
        const wy = 326 + (i % 3) * 7;
        return (
          <ellipse
            key={i}
            cx={wx}
            cy={wy}
            rx={14 + (i % 3) * 5}
            ry="1.6"
            fill="#FEF08A"
            opacity={0.35 + 0.25 * Math.sin(t * 2.2 + i)}
          />
        );
      })}

      {/* Hai chú vịt con vàng bơi chậm trong mương nước, làm cảnh đồng quê thêm sinh động */}
      <RiceDuck x={206} y={338} s={0.56} t={t} delay={0.3} />
      <RiceDuck x={820} y={342} s={0.5} t={t} delay={1.6} />

      {/* Các hàng lúa cấy thẳng tắp ở trung cảnh */}
      <g>
        {Array.from({ length: 56 }, (_, i) => {
          const rx = -280 + i * 28;
          const ry = 312 + (i % 3) * 6;
          return (
            <g key={i} transform={`translate(${rx},${ry})`}>
              <path d="M0 0 Q-5 -12 -9 -22 M0 0 Q0 -14 2 -24 M0 0 Q6 -12 10 -21" stroke={rowStrokeFar} strokeWidth="2" fill="none" strokeLinecap="round" />
              {harvestK > 0.15 && (
                <path
                  d="M2 -24 Q9 -26 13 -19"
                  stroke="#F59E0B"
                  strokeWidth={2.6 * harvestK}
                  fill="none"
                  strokeLinecap="round"
                  opacity={harvestK}
                />
              )}
            </g>
          );
        })}
      </g>

      {/* Bờ ruộng đất nâu nơi bác nông dân đứng và bước đi */}
      <path
        d="M-1300 336 Q-450 328 220 334 Q500 338 820 333 T2300 336 L2300 356 L-1300 356Z"
        fill="url(#turf)"
      />
      <path
        d="M-1300 344 Q-450 338 220 343 Q500 347 820 342 T2300 344 L2300 364 L-1300 364Z"
        fill="#6B4423"
      />

      {/* Tầng đất phù sa đồng ruộng bên dưới gốc lúa */}
      <rect x="-1300" y="352" width="3600" height="1450" fill="url(#soil)" />
      <path
        d="M-1300 378 Q-500 368 180 380 T1050 374 T2300 378 L2300 1800 L-1300 1800Z"
        fill="#4A2E1B"
        opacity=".45"
      />
      <path
        d="M-1300 422 Q-420 412 280 424 T1080 418 T2300 422 L2300 1800 L-1300 1800Z"
        fill="#362011"
        opacity=".48"
      />
      {/* Vân phù sa mảnh, giữ tương phản thấp để không cạnh tranh với bộ rễ */}
      <g fill="none" strokeLinecap="round" pointerEvents="none">
        <path d="M-500 390 Q-250 382 -20 395 T450 392" stroke="#A16207" strokeWidth="2" opacity=".23" />
        <path d="M560 386 Q790 378 1080 392 T1450 389" stroke="#A16207" strokeWidth="2" opacity=".2" />
        <path d="M-420 446 Q-150 437 130 449 T500 445" stroke="#D6A36A" strokeWidth="1.8" opacity=".16" />
        <path d="M560 462 Q820 451 1110 465 T1460 458" stroke="#D6A36A" strokeWidth="1.8" opacity=".15" />
        <path d="M-350 488 Q-90 481 170 491" stroke="#A16207" strokeWidth="1.5" opacity=".15" />
        <path d="M620 502 Q900 492 1180 505" stroke="#A16207" strokeWidth="1.5" opacity=".14" />
      </g>

      {/* Mặt cắt tầng đất ẩm khi camera lướt xuống xem bộ rễ (Cảnh 4) */}
      {soilCutawayEnv > 0.02 && (
        <g opacity={soilCutawayEnv}>
          <ellipse cx="505" cy="405" rx="220" ry="72" fill="url(#purpleGlow)" />
          {Array.from({ length: 18 }, (_, i) => (
            <circle
              key={i}
              cx={355 + ((i * 37) % 300)}
              cy={364 + ((i * 29) % 82)}
              r={1.8 + (i % 3) * 0.9}
              fill="#A16207"
              opacity=".45"
            />
          ))}
        </g>
      )}

      {/* Thảm lúa tiền cảnh hai bên bờ ruộng */}
      <g>
        {Array.from({ length: 48 }, (_, i) => {
          const x = -300 + i * 34;
          /* Chừa khoảng trống ở giữa (430..570) cho khóm lúa nhân vật chính */
          if (x > 425 && x < 575) return null;
          return (
            <g key={i} transform={`translate(${x},346)`}>
              <path
                d={`M0 0 Q-7 -18 -13 -32 M0 0 Q1 -20 4 -35 M0 0 Q9 -17 15 -30`}
                stroke={rowStrokeNear}
                strokeWidth="2.8"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={`M0 0 Q-4 -15 -8 -27 M0 0 Q6 -15 11 -26`}
                stroke={paddyGreenNear}
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              {harvestK > 0.1 && (
                <g opacity={harvestK}>
                  <path
                    d="M4 -35 Q14 -38 20 -26"
                    stroke="#FBBF24"
                    strokeWidth="3.4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="14" cy="-33" r="2.2" fill="#FDE047" />
                  <circle cx="18" cy="-29" r="2.2" fill="#F59E0B" />
                </g>
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
});

/* Khóm lúa trung tâm (Nhân vật chính của cánh đồng):
   - Bộ rễ phát triển ở Cảnh 4 (Lân P)
   - Thân & lá lúa vươn xanh ở Cảnh 3 (Đạm N)
   - Thân cứng & bông lúa trổ hạt chắc ở Cảnh 5 (Kali K) và chín vàng ở Cảnh 8 */
const CenterRicePlant = ({
  t,
  leafGrowth,
  rootGrowth,
  rootGlowEnv,
  panicleGrowth,
  harvestK,
  harmonyGlow,
}) => {
  const sway = Math.sin(t * 1.65) * (2.4 + leafGrowth * 2.9);
  const stemColor = mixHex('#176B36', '#AD6A12', harvestK * 0.8);
  const leafLight = mixHex('#8EE66B', '#FFE17A', harvestK * 0.72);
  const leafMid = mixHex('#22A447', '#E8AA25', harvestK * 0.72);
  const h = 72 + leafGrowth * 78 + panicleGrowth * 18;

  const blades = [
    { side: -1, u: 0.28, len: 72, wave: 0.2 },
    { side: 1, u: 0.34, len: 74, wave: 1.0 },
    { side: -1, u: 0.48, len: 86, wave: 2.0 },
    { side: 1, u: 0.55, len: 90, wave: 2.7 },
    { side: -1, u: 0.69, len: 79, wave: 3.8 },
    { side: 1, u: 0.75, len: 83, wave: 4.5 },
    { side: -1, u: 0.87, len: 62, wave: 5.3 },
    { side: 1, u: 0.9, len: 63, wave: 6.0 },
  ];
  const panicles = [
    { dx: -20, dy: -h + 12, dir: -1, spread: 35, phase: 0.2 },
    { dx: -9, dy: -h - 3, dir: -1, spread: 29, phase: 1.1 },
    { dx: 2, dy: -h - 8, dir: 1, spread: 38, phase: 2.0 },
    { dx: 13, dy: -h + 2, dir: 1, spread: 33, phase: 3.1 },
  ];

  return (
    <g transform="translate(500,342)">
      {/* Bóng tiếp xúc và vệt nước nhỏ giúp khóm lúa có chiều sâu */}
      <ellipse cx="0" cy="4" rx="43" ry="7" fill="#173B26" opacity=".18" />
      <ellipse cx="0" cy="3" rx={35 + Math.sin(t * 1.8) * 2.4} ry="5.3" fill="#BAE6FD" opacity=".46" />
      <ellipse cx="0" cy="2.5" rx="21" ry="2.4" fill="#F0FDFF" opacity=".58" />

      {/* Quầng sáng dịu khi đủ bộ ba dinh dưỡng */}
      {harmonyGlow > 0.01 && (
        <g>
          <circle cx="0" cy={-h * 0.62} r={125 * (0.98 + 0.02 * Math.sin(t * 2.1))} fill="url(#gold)" opacity={harmonyGlow * 0.7} />
          <circle cx="0" cy={-h * 0.62} r="84" fill="none" stroke="#FFF4B8" strokeWidth="1.1" opacity={harmonyGlow * 0.42} strokeDasharray="3 9" />
        </g>
      )}

      {/* Bộ rễ tỏa nhánh rõ ràng trong mặt cắt đất */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {rootGlowEnv > 0.02 && (
          <g stroke="#C4B5FD" opacity={rootGlowEnv * 0.45}>
            <path d={`M0 4 Q${-2 + sway * 0.2} ${34 * rootGrowth} -2 ${107 * rootGrowth}`} strokeWidth="10" />
            <path d={`M-1 ${18 * rootGrowth} C-22 ${30 * rootGrowth} -46 ${56 * rootGrowth} -77 ${83 * rootGrowth}`} strokeWidth="8" />
            <path d={`M2 ${22 * rootGrowth} C28 ${37 * rootGrowth} 49 ${60 * rootGrowth} 78 ${88 * rootGrowth}`} strokeWidth="8" />
          </g>
        )}
        <g stroke="#FBE8B0">
          <path d={`M0 4 C4 ${24 * rootGrowth} 1 ${50 * rootGrowth} -2 ${107 * rootGrowth}`} strokeWidth="4.2" />
          <path d={`M-1 ${17 * rootGrowth} C-20 ${32 * rootGrowth} -45 ${57 * rootGrowth} -78 ${84 * rootGrowth}`} strokeWidth="3.2" />
          <path d={`M2 ${20 * rootGrowth} C24 ${36 * rootGrowth} 48 ${61 * rootGrowth} 79 ${88 * rootGrowth}`} strokeWidth="3.2" />
          <path d={`M-3 ${40 * rootGrowth} Q-24 ${60 * rootGrowth} -44 ${104 * rootGrowth}`} strokeWidth="2.6" />
          <path d={`M3 ${43 * rootGrowth} Q26 ${68 * rootGrowth} 47 ${105 * rootGrowth}`} strokeWidth="2.6" />
          <path d={`M-8 ${30 * rootGrowth} Q-48 ${35 * rootGrowth} -68 ${55 * rootGrowth}`} strokeWidth="1.8" opacity=".8" />
          <path d={`M8 ${32 * rootGrowth} Q47 ${37 * rootGrowth} 66 ${59 * rootGrowth}`} strokeWidth="1.8" opacity=".8" />
          {rootGrowth > 0.42 && (
            <g stroke="#FDE68A" strokeWidth="1.5" opacity={clamp((rootGrowth - 0.42) * 1.75)}>
              <path d={`M-27 ${45 * rootGrowth} Q-47 ${48 * rootGrowth} -61 ${69 * rootGrowth}`} />
              <path d={`M29 ${48 * rootGrowth} Q49 ${54 * rootGrowth} 62 ${75 * rootGrowth}`} />
              <path d={`M-18 ${69 * rootGrowth} Q-31 ${82 * rootGrowth} -35 ${98 * rootGrowth}`} />
              <path d={`M19 ${72 * rootGrowth} Q33 ${85 * rootGrowth} 37 ${100 * rootGrowth}`} />
              <path d={`M-41 ${64 * rootGrowth} l-10 ${7 * rootGrowth}`} />
              <path d={`M43 ${65 * rootGrowth} l11 ${8 * rootGrowth}`} />
            </g>
          )}
        </g>
      </g>

      {/* Thân lúa thon, có gân sáng mảnh */}
      {[-13, -5, 4, 12].map((offset, idx) => {
        const branchH = h * (idx === 1 || idx === 2 ? 1 : 0.91);
        const branchSway = sway * (idx % 2 ? 0.9 : 1.05) + offset * 0.52;
        return (
          <g key={idx}>
            <path
              d={`M${offset * 0.32} 2 C${offset + branchSway * 0.2} ${-branchH * 0.24} ${offset + branchSway * 0.8} ${-branchH * 0.68} ${offset + branchSway} ${-branchH}`}
              stroke={stemColor}
              strokeWidth={3.4 + panicleGrowth * 0.9}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M${offset * 0.32 - 0.8} 0 C${offset + branchSway * 0.2 - 0.8} ${-branchH * 0.24} ${offset + branchSway * 0.8 - 0.6} ${-branchH * 0.68} ${offset + branchSway - 0.7} ${-branchH + 3}`}
              stroke="#D9F99D"
              strokeWidth="0.9"
              opacity=".58"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      {/* Lá lúa dài, nhọn, cong nhẹ; gân lá và giọt sương riêng từng phiến */}
      {blades.map((b, i) => {
        const sy = -h * b.u;
        const sx = sway * b.u + (i % 2 ? 2.2 : -1.4);
        const len = b.len * (0.48 + 0.52 * leafGrowth);
        const wave = Math.sin(t * 1.9 + b.wave) * 2.25;
        const ex = sx + b.side * len * 0.92;
        const ey = sy - len * 0.46 + wave;
        const c1x = sx + b.side * len * 0.17;
        const c1y = sy - len * 0.31;
        const c2x = sx + b.side * len * 0.69;
        const c2y = sy - len * 0.63 + wave * 0.4;
        const fill = harvestK > 0.5
          ? (i % 2 ? 'url(#riceLeafGold)' : 'url(#riceLeafLime)')
          : (i % 2 ? 'url(#riceLeafBright)' : 'url(#riceLeafDeep)');
        return (
          <g key={i}>
            <path
              d={`M${sx} ${sy} C${c1x} ${c1y} ${c2x} ${c2y} ${ex} ${ey} Q${sx + b.side * len * 0.64} ${sy - len * 0.27 + wave} ${sx} ${sy + 3}Z`}
              fill={fill}
              stroke={harvestK > 0.48 ? '#A16207' : '#17633A'}
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            <path
              d={`M${sx} ${sy + 1} Q${sx + b.side * len * 0.38} ${sy - len * 0.28} ${ex - b.side * 4} ${ey + 2}`}
              stroke={harvestK > 0.5 ? '#FFF2A6' : '#D9F99D'}
              strokeWidth="1.05"
              opacity=".76"
              fill="none"
              strokeLinecap="round"
            />
            {i < 4 && harvestK < 0.42 && (
              <g transform={`translate(${lerp(sx, ex, 0.56)},${lerp(sy, ey, 0.56) - 2})`}>
                <ellipse cx="0" cy="0" rx="2.6" ry="4" fill="#BAE6FD" opacity=".82" transform="rotate(-24)" />
                <ellipse cx="-0.8" cy="-1.1" rx="0.9" ry="1.4" fill="#FFFFFF" opacity=".94" />
              </g>
            )}
          </g>
        );
      })}

      {/* Bông lúa nhiều nhánh, hạt thóc căng tròn dần và cúi vàng khi chín */}
      {panicleGrowth > 0.02 && panicles.map((p, idx) => {
        const px = p.dx + sway * (0.55 + idx * 0.06);
        const py = p.dy;
        const droop = 9 + harvestK * 20;
        const archX = px + p.dir * p.spread * panicleGrowth;
        const archY = py - 21 * panicleGrowth + droop * harvestK;
        const grainCol = mixHex('#C8F169', '#F8C43A', 0.38 + harvestK * 0.62);
        const grainEdge = mixHex('#4D8A2A', '#A85D14', 0.35 + harvestK * 0.65);
        const grainScale = (0.58 + 0.42 * harvestK) * panicleGrowth;
        return (
          <g key={idx} opacity={clamp(panicleGrowth * 1.3)}>
            <path
              d={`M${px} ${py} C${px + p.dir * 8} ${py - 15 * panicleGrowth} ${px + p.dir * 18 * panicleGrowth} ${py - 25 * panicleGrowth} ${archX} ${archY}`}
              stroke={grainEdge}
              strokeWidth="2.1"
              fill="none"
              strokeLinecap="round"
            />
            {Array.from({ length: 8 }, (_, gi) => {
              const u = (gi + 1) / 9;
              const gx = lerp(px, archX, u);
              const gy = lerp(py, archY, u) - Math.sin(u * Math.PI) * 11.5 * panicleGrowth;
              const spread = (3.4 + harvestK * 1.05) * grainScale;
              const rise = ((gi % 2 === 0) ? -1 : 1) * (3.0 + harvestK * 0.8) * grainScale;
              const rot = p.dir * (22 + u * 18) + (gi % 2 ? 8 : -5);
              return (
                <g key={gi}>
                  <ellipse
                    cx={gx + rise}
                    cy={gy - spread * 0.25}
                    rx={spread * 1.07}
                    ry={spread * 0.58}
                    fill={grainCol}
                    stroke={grainEdge}
                    strokeWidth="0.75"
                    transform={`rotate(${rot} ${gx + rise} ${gy})`}
                  />
                  <ellipse
                    cx={gx - rise * 0.72}
                    cy={gy + spread * 0.38}
                    rx={spread * 0.99}
                    ry={spread * 0.56}
                    fill={grainCol}
                    stroke={grainEdge}
                    strokeWidth="0.72"
                    transform={`rotate(${-rot} ${gx - rise * 0.72} ${gy})`}
                  />
                  {harvestK > 0.42 && gi % 3 === 0 && (
                    <path d={`M${gx - 1} ${gy - 1} l2 -1`} stroke="#FFF4B7" strokeWidth="0.9" strokeLinecap="round" opacity=".9" />
                  )}
                </g>
              );
            })}
            <path d={`M${px} ${py} Q${px + p.dir * 12} ${py - 13 * panicleGrowth} ${archX} ${archY}`} stroke="#FFF1A8" strokeWidth="0.7" opacity=".7" fill="none" />
          </g>
        );
      })}
    </g>
  );
};

/* ============================================================================
   BÁC NÔNG DÂN VIỆT NAM HIỀN HẬU
   - Đội nón lá truyền thống, mặc áo bà ba nâu giản dị, khăn rằn vắt vai
   - Cử chỉ: bước đi trên bờ ruộng, cúi nhẹ chăm lúa, chỉ tay hòa giải, vẫy chào
   - Mắt chớp tự nhiên, miệng mỉm cười & mấp máy theo lời thoại
   ============================================================================ */
const VietnameseFarmer = ({ t, x, walkEnv, bendEnv, mediateEnv, waveEnv, talk }) => {
  const step = walkEnv * Math.sin(t * 8.2);
  const bob = walkEnv * (-Math.abs(Math.sin(t * 8.2)) * 2.7) + (1 - walkEnv) * Math.sin(t * 1.7) * 0.8;
  const torsoTilt = bendEnv * 13 + mediateEnv * 4;
  const blink = (t * 0.72) % 4.1 > 3.96 ? 0.12 : 1;
  const mouthOpen = talk ? 1.8 + 2.2 * Math.abs(Math.sin(t * 10.5)) : 0;
  const rightArmRot =
    bendEnv * -34 +
    mediateEnv * (-52 + Math.sin(t * 3.5) * 5) +
    waveEnv * (-118 + Math.sin(t * 6.5) * 13) +
    (1 - Math.max(bendEnv, mediateEnv, waveEnv)) * (-9 + Math.sin(t * 1.7) * 2.5);

  return (
    <g transform={`translate(${x},340)`}>
      <ellipse cx="1" cy="4" rx="34" ry="6.2" fill="#26352B" opacity=".2" />
      <ellipse cx="0" cy="3" rx="23" ry="3.4" fill="#475569" opacity=".08" />
      <g transform={`translate(0,${bob})`}>
        {/* Quần nâu sẫm, ống quần mềm và dép quai ngang */}
        {[-1, 1].map((sg) => (
          <g key={sg} transform={`rotate(${step * sg * 14} ${sg * 9} -43)`}>
            <path d={`M${sg * 2} -48 Q${sg * 9} -46 ${sg * 15} -44 L${sg * 15} -15 Q${sg * 9} -10 ${sg * 3} -15Z`} fill="#3F342B" stroke="#2C241E" strokeWidth="1" />
            <path d={`M${sg * 3} -18 Q${sg * 8} -15 ${sg * 14} -18`} stroke="#8C7762" strokeWidth="1.3" fill="none" />
            <path d={`M${sg * 2} -9 Q${sg * 9} -14 ${sg * 16} -9 L${sg * 21} -4 Q${sg * 22} 0 ${sg * 17} 1 L${sg * 1} 1 Q${sg * -3} -2 ${sg * 2} -9Z`} fill="#8B6342" stroke="#5B422D" strokeWidth="1" />
            <path d={`M${sg * 4} -6 L${sg * 16} -6`} stroke="#D6B58B" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        ))}

        <g transform={`translate(0,-43) rotate(${torsoTilt})`}>
          {/* Giỏ tre đeo sau lưng, chỉ lộ một phần để gợi đúng chất nhà nông */}
          <g transform="translate(-26,-34) rotate(-8)">
            <path d="M-8 -6 Q0 -13 10 -6 L15 21 Q2 28 -13 21Z" fill="#B98243" stroke="#80552D" strokeWidth="1.5" />
            <path d="M-8 0 L11 1 M-10 7 L12 8 M-11 14 L13 15 M-4 -5 L1 23 M4 -6 L8 23" stroke="#E6BC76" strokeWidth="1.25" opacity=".8" />
            <path d="M-8 -6 Q0 -15 10 -6" fill="none" stroke="#F3D79D" strokeWidth="2.2" />
            <path d="M-4 -8 Q-5 -18 8 -19" fill="none" stroke="#8B5E34" strokeWidth="2.2" />
          </g>

          {/* Tay trái buông tự nhiên, có cổ tay áo và bàn tay ấm màu */}
          <g transform={`translate(-21,-40) rotate(${11 - bendEnv * 15 + Math.sin(t * 1.3) * 2})`}>
            <path d="M-6 -4 Q0 -7 6 -3 L7 20 Q2 29 -5 23Z" fill="url(#farmerShirt)" stroke="#654126" strokeWidth="1.2" />
            <path d="M-5 18 Q1 21 7 17 L7 22 Q1 26 -5 22Z" fill="#D5B18A" stroke="#80552D" strokeWidth=".8" />
            <path d="M-4 22 Q-1 18 4 22 L6 29 Q2 34 -3 30Z" fill="url(#farmerSkin)" stroke="#BA8150" strokeWidth=".8" />
            <path d="M-2 27 l1 3 M2 27 l1 3" stroke="#A96F43" strokeWidth=".7" />
          </g>

          {/* Áo bà ba nâu ấm, có nếp vải sáng tối */}
          <path
            d="M-24 -53 Q-17 -58 -8 -57 L0 -49 L8 -57 Q18 -57 24 -52 L28 -6 Q2 3 -28 -6Z"
            fill="url(#farmerShirt)"
            stroke="#5A3824"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M-19 -48 Q-12 -42 -11 -28 L-15 -8" stroke="#D9A66D" strokeWidth="1.1" opacity=".48" fill="none" />
          <path d="M19 -47 Q12 -35 15 -12" stroke="#4B2E1D" strokeWidth="1.3" opacity=".48" fill="none" />
          <path d="M0 -50 L0 -5" stroke="#4B2E1D" strokeWidth="1.25" opacity=".8" />
          {[-40, -30, -20, -10].map((cy) => (
            <g key={cy}>
              <circle cx="3" cy={cy} r="1.7" fill="#FDE7A6" stroke="#744A2C" strokeWidth=".55" />
              <circle cx="2.5" cy={cy - 0.5} r=".55" fill="#FFF9E5" />
            </g>
          ))}
          {/* Túi ngực và đường may */}
          <path d="M-19 -22 Q-12 -24 -6 -22 L-7 -10 Q-13 -8 -19 -10Z" fill="#85542F" stroke="#5A3824" strokeWidth=".9" />
          <path d="M-17 -20 H-8 M-17 -17 H-8" stroke="#C89A68" strokeWidth=".7" opacity=".8" />
          <path d="M8 -22 Q14 -24 19 -22 L19 -10 Q13 -8 8 -10Z" fill="#85542F" stroke="#5A3824" strokeWidth=".9" />

          {/* Khăn rằn ô vuông đen-trắng đặc trưng miền quê */}
          <path d="M-15 -54 Q0 -46 15 -54 L19 -24 L10 -21 L8 -43 Q0 -38 -8 -43 L-10 -21 L-19 -24Z" fill="#F4F1E7" stroke="#45505A" strokeWidth="1.1" />
          <path d="M-15 -45 L-10 -45 M-16 -39 L-10 -39 M-15 -33 L-10 -33 M-14 -27 L-10 -27 M10 -45 L15 -45 M10 -39 L16 -39 M10 -33 L15 -33 M10 -27 L14 -27" stroke="#26313B" strokeWidth="1.8" />
          <path d="M-15 -42 H-10 M10 -42 H15 M-15 -30 H-10 M10 -30 H15" stroke="#A8A29E" strokeWidth="1" />
          <path d="M-8 -47 Q0 -42 8 -47" stroke="#D6D3D1" strokeWidth="1" fill="none" />

          {/* Cánh tay phải chuyển động chậm, cổ tay và bàn tay có ngón cái */}
          <g transform={`translate(19,-40) rotate(${rightArmRot})`}>
            <path d="M-4 -6 Q6 -9 11 -3 L29 -1 Q34 2 30 7 L8 8 Q1 5 -4 4Z" fill="url(#farmerShirt)" stroke="#5A3824" strokeWidth="1.2" />
            <path d="M24 -1 Q28 -4 30 -8 Q34 -9 34 -4 L32 1 Q39 0 38 5 Q35 10 28 7 L25 4Z" fill="url(#farmerSkin)" stroke="#B77B4A" strokeWidth=".8" />
            <path d="M28 4 L33 5" stroke="#F8D2A4" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* Cổ áo */}
          <path d="M-9 -57 L0 -48 L9 -57" fill="#D9B28A" stroke="#5A3824" strokeWidth="1.1" />
          <rect x="-5.5" y="-66" width="11" height="12" rx="4" fill="url(#farmerSkin)" />

          {/* Khuôn mặt hiền hậu, mắt long lanh, ria bạc nhẹ tạo nét bác nông dân lớn tuổi */}
          <g transform={`translate(0,-80) rotate(${-torsoTilt * 0.28})`}>
            <path d="M-20 -8 Q-24 1 -20 13 Q-16 22 0 24 Q16 22 20 13 Q24 1 20 -8" fill="#BD8556" opacity=".18" />
            <circle cx="-23" cy="1" r="5.3" fill="url(#farmerSkin)" stroke="#C78C58" strokeWidth=".8" />
            <circle cx="23" cy="1" r="5.3" fill="url(#farmerSkin)" stroke="#C78C58" strokeWidth=".8" />
            <ellipse cx="-23" cy="1" rx="2.1" ry="3" fill="#E9B981" />
            <ellipse cx="23" cy="1" rx="2.1" ry="3" fill="#E9B981" />
            <ellipse cx="0" cy="0" rx="23.5" ry="25" fill="url(#farmerSkin)" stroke="#B77B4A" strokeWidth="1.35" />
            {/* Tóc bạc lộ nhẹ hai bên thái dương */}
            <path d="M-22 -7 Q-25 0 -19 10 L-15 8 L-17 -7Z M22 -7 Q25 0 19 10 L15 8 L17 -7Z" fill="#D6D3D1" stroke="#A8A29E" strokeWidth=".6" />
            <path d="M-19 -12 Q-12 -16 -5 -12 M5 -12 Q12 -16 19 -12" stroke="#69452E" strokeWidth="2.7" fill="none" strokeLinecap="round" />
            <path d="M-17 -9 Q-12 -11 -7 -9 M7 -9 Q12 -11 17 -9" stroke="#F7D6AA" strokeWidth=".75" fill="none" opacity=".75" />
            {/* Mắt */}
            {[-8.5, 9].map((ex, idx) => (
              <g key={idx} transform={`translate(${ex},-3) scale(1,${blink})`}>
                <ellipse cx="0" cy="0" rx="3.55" ry="4" fill="#FFF9EF" />
                <ellipse cx="0.25" cy="0.25" rx="2.5" ry="3.05" fill="#26352E" />
                <circle cx="1.15" cy="-1.2" r="1.15" fill="#FFFFFF" />
                <circle cx="-0.8" cy="1.45" r=".55" fill="#A7F3D0" opacity=".8" />
              </g>
            ))}
            <path d="M-13 3 Q-10 5 -7 3 M7 3 Q10 5 13 3" stroke="#A96F43" strokeWidth=".8" opacity=".6" fill="none" />
            {/* Má hồng và mũi */}
            <ellipse cx="-14" cy="5" rx="5.3" ry="3.1" fill="#E87968" opacity=".35" />
            <ellipse cx="14" cy="5" rx="5.3" ry="3.1" fill="#E87968" opacity=".35" />
            <path d="M0 -2 Q3 3 1 6 Q0 7 -2 6" stroke="#B97B4E" strokeWidth="1.35" fill="none" strokeLinecap="round" />
            <ellipse cx="2" cy="6" rx="2.4" ry="1.3" fill="#F1C99B" opacity=".65" />
            {/* Ria mép bạc nâu nhẹ, thân thiện chứ không dữ */}
            <path d="M-2 9 Q-8 5 -13 9 Q-10 15 -4 13 Q0 12 1 10 Q3 12 7 13 Q13 15 15 9 Q9 5 3 9" fill="#E7E5E4" stroke="#9CA3AF" strokeWidth=".75" strokeLinejoin="round" />
            <path d="M-11 10 Q-7 13 -4 11 M5 11 Q9 13 12 10" stroke="#B7B2AC" strokeWidth=".7" fill="none" />
            {talk ? (
              <g>
                <ellipse cx="1" cy="16.2" rx="5.8" ry={2.3 + mouthOpen} fill="#7F1D1D" stroke="#6B3528" strokeWidth=".9" />
                <path d="M-2.8 16.5 Q1 18 4.5 16.5" stroke="#FCA5A5" strokeWidth="1.2" fill="none" />
              </g>
            ) : (
              <path d="M-5.5 15 Q1 19.5 7 14.8" stroke="#7B4931" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            )}
            {/* Quai nón lá ôm quanh cằm */}
            <path d="M-19 -4 Q-12 27 0 28 Q12 27 19 -4" stroke="#E8CB87" strokeWidth="1.35" fill="none" opacity=".9" />

            {/* Nón lá truyền thống: nhiều vành nan, viền sáng và chóp nổi */}
            <g transform="translate(0,-15)">
              <ellipse cx="0" cy="4" rx="44" ry="7.8" fill="#8B5E34" opacity=".22" />
              <path d="M-44 2 Q-22 -7 0 -35 Q22 -7 44 2 Q0 12 -44 2Z" fill="url(#nonLaGrad)" stroke="#9A5C28" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M-38 1 Q0 8 38 1" stroke="#FFF8D9" strokeWidth="1.7" fill="none" opacity=".9" />
              <path d="M-32 -3 Q0 5 32 -3 M-29 -8 Q0 0 29 -8 M-24 -14 Q0 -6 24 -14 M-18 -20 Q0 -14 18 -20" stroke="#D09242" strokeWidth="1.15" fill="none" opacity=".82" />
              <path d="M0 -35 L-38 1 M0 -35 L-25 4 M0 -35 L-12 6 M0 -35 L0 7 M0 -35 L12 6 M0 -35 L25 4 M0 -35 L38 1" stroke="#A96A30" strokeWidth=".85" opacity=".48" />
              <path d="M-8 -29 Q0 -33 8 -29" stroke="#FFF7D7" strokeWidth="1.4" fill="none" opacity=".75" />
              <ellipse cx="-14" cy="-11" rx="7" ry="2.5" fill="#FFFDF5" opacity=".24" transform="rotate(-29 -14 -11)" />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
};

/* ============================================================================
   BIỆT ĐỘI N – P – K (SILHOUETTE RIÊNG BIỆT CHO TỪNG NHÂN VẬT)
   - Đạm (N): Hình dáng Giọt Mầm / Búp Lá Lúa Non xanh mướt
   - Lân (P): Hình dáng Củ Mầm & Tua Rễ Đất tím dịu thông minh
   - Kali (K): Hình dáng Hạt Thóc Vàng chắc mẩy, ấm áp
   ============================================================================ */
const MascotFace = ({ mood, t, px = 0, talk }) => {
  const blink = (t * 0.82) % 3.5 > 3.35 ? 0.14 : 1;
  const ink = '#1E293B';
  const talkScale = talk ? 0.65 + 0.55 * Math.abs(Math.sin(t * 12.5)) : 1;

  return (
    <g>
      {[-10.5, 10.5].map((ex, i) => {
        const sg = ex < 0 ? -1 : 1;
        if (mood === 'joy') {
          return (
            <path
              key={i}
              d={`M${ex - 6} -4 Q${ex} -12 ${ex + 6} -4`}
              stroke={ink}
              strokeWidth="2.8"
              fill="none"
              strokeLinecap="round"
            />
          );
        }
        return (
          <g key={i}>
            <ellipse cx={ex} cy="-5" rx="6.2" ry={7.0 * blink} fill="#FFF" stroke={ink} strokeWidth="1.2" />
            <ellipse cx={ex + px} cy="-4.5" rx="4.1" ry={4.8 * blink} fill={ink} />
            {blink > 0.3 && (
              <>
                <circle cx={ex + px - 1.4} cy="-6.8" r="1.9" fill="#FFF" />
                <circle cx={ex + px + 1.5} cy="-2.8" r="1.0" fill="#FFF" />
              </>
            )}
            {mood === 'playful' && (
              <path
                d={`M${ex - 5} -14 Q${ex} -17 ${ex + 5} -13`}
                stroke={ink}
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
              />
            )}
          </g>
        );
      })}

      {/* Má hồng dịu */}
      <ellipse cx="-19" cy="4" rx="5.5" ry="3.2" fill="#FDA4AF" opacity=".72" />
      <ellipse cx="19" cy="4" rx="5.5" ry="3.2" fill="#FDA4AF" opacity=".72" />

      {/* Miệng biểu cảm đồng bộ thoại */}
      <g transform={`translate(0,5) scale(1,${talkScale}) translate(0,-5)`}>
        {mood === 'playful' ? (
          <path d="M-5 5 Q0 11 6 4" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        ) : talk ? (
          <g>
            <path d="M-6.5 3.5 Q0 14 6.5 3.5Z" fill="#9F1239" stroke={ink} strokeWidth="1.2" />
            <path d="M-3.5 8.5 Q0 11.5 3.5 8.5Z" fill="#FB7185" />
          </g>
        ) : (
          <path d="M-6 4.5 Q0 11 6 4.5" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        )}
      </g>
    </g>
  );
};

const NPKMascot = ({ t, m, x, y, mood, talkEnv, waveEnv }) => {
  const appear = springOut(prog(t, m.at, 0.75));
  if (appear <= 0.001) return null;
  const bob = Math.sin(t * 2.35 + m.at) * 2.5;
  const talkHop = talkEnv * (-Math.abs(Math.sin(t * 6.6)) * 3.0);
  const armWave = Math.sin(t * 4.4 + m.at) * 12 + waveEnv * 22;
  const px = clamp((500 - x) / 160, -1, 1) * 1.25;
  const sc = appear * (1 + talkEnv * 0.025);

  return (
    <g transform={`translate(${x},${y + bob + talkHop}) scale(${sc})`}>
      <ellipse cx="0" cy="42" rx="24" ry="5.5" fill="#0F172A" opacity=".13" />
      <ellipse cx="0" cy="42" rx="15" ry="2.8" fill="#FFFFFF" opacity=".17" />
      <circle r="45" fill={m.c1} opacity={0.12 + talkEnv * 0.1} />
      <circle r="39" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 8" opacity=".25" />

      {/* Tay chân ngắn, mềm, có viền sáng như đồ chơi cao cấp */}
      <g>
        <path d="M-27 4 Q-40 -1 -38 -10 Q-35 -15 -30 -7 L-22 -2" fill={m.c2} stroke="#FFFFFF" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" transform={`rotate(${-armWave * 0.45} -28 4)`} />
        <path d="M27 4 Q40 -1 38 -10 Q35 -15 30 -7 L22 -2" fill={m.c2} stroke="#FFFFFF" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" transform={`rotate(${armWave * 0.45} 28 4)`} />
        <ellipse cx="-12" cy="35" rx="10" ry="6" fill={m.dark} stroke="#FFFFFF" strokeWidth="1.7" />
        <ellipse cx="12" cy="35" rx="10" ry="6" fill={m.dark} stroke="#FFFFFF" strokeWidth="1.7" />
        <ellipse cx="-14" cy="34" rx="3.2" ry="1.3" fill="#FFFFFF" opacity=".42" />
        <ellipse cx="10" cy="34" rx="3.2" ry="1.3" fill="#FFFFFF" opacity=".42" />
      </g>

      {/* ĐẠM N — nhân vật giọt mầm xanh với đôi lá non */}
      {m.id === 'N' && (
        <g>
          <path d="M0 -43 C18 -29 34 -6 34 12 C34 28 20 37 0 37 C-20 37 -34 28 -34 12 C-34 -6 -18 -29 0 -43Z" fill="url(#N)" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
          <path d="M-21 -3 C-24 10 -17 25 -4 29" stroke="#FFFFFF" strokeWidth="2.1" opacity=".4" fill="none" strokeLinecap="round" />
          <path d="M-3 -23 Q-10 -33 -23 -27 Q-18 -16 -3 -16Z" fill="#A7F3D0" stroke="#15803D" strokeWidth="1.4" />
          <g transform={`translate(0,-38) rotate(${Math.sin(t * 2.2) * 4})`}>
            <path d="M0 4 C-7 -14 -24 -22 -31 -9 C-20 1 -9 4 0 4Z" fill="#86EFAC" stroke="#15803D" strokeWidth="1.5" />
            <path d="M0 4 C7 -17 26 -24 31 -10 C20 1 9 4 0 4Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
            <path d="M0 3 Q-15 -9 -27 -10 M0 3 Q15 -10 27 -11" stroke="#D9F99D" strokeWidth="1.1" fill="none" />
            <circle cx="14" cy="-12" r="3.6" fill="#E0F2FE" stroke="#FFFFFF" strokeWidth="1.1" />
            <circle cx="13" cy="-13" r="1" fill="#FFFFFF" />
          </g>
          <path d="M-17 19 Q0 26 17 19" stroke="#DCFCE7" strokeWidth="1.2" opacity=".72" fill="none" />
        </g>
      )}

      {/* LÂN P — mầm đất tím, tua rễ mảnh và mầm vàng */}
      {m.id === 'P' && (
        <g>
          <path d="M-27 19 Q-41 25 -44 34 M-23 25 Q-35 33 -36 40 M27 19 Q41 25 44 34 M23 25 Q35 33 36 40" stroke="#A78BFA" strokeWidth="3.1" strokeLinecap="round" fill="none" />
          <path d="M-31 27 l-5 -3 M-35 35 l-5 2 M31 27 l5 -3 M35 35 l5 2" stroke="#DDD6FE" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M0 -36 C19 -36 29 -18 33 4 C37 23 24 37 0 37 C-24 37 -37 23 -33 4 C-29 -18 -19 -36 0 -36Z" fill="url(#P)" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
          <path d="M-22 2 Q-18 23 -2 29" stroke="#FFFFFF" strokeWidth="2.1" opacity=".38" fill="none" strokeLinecap="round" />
          <path d="M-23 18 Q-18 24 -15 29 M23 18 Q18 24 15 29" stroke="#DDD6FE" strokeWidth="1.4" fill="none" />
          <g transform={`translate(0,-35) rotate(${Math.sin(t * 2.6) * 4})`}>
            <path d="M0 4 Q-9 -8 -18 -4 Q-10 4 0 4Z" fill="#A78BFA" stroke="#5B21B6" strokeWidth="1.2" />
            <path d="M0 3 L0 -13" stroke="#5B21B6" strokeWidth="3" strokeLinecap="round" />
            <circle cx="0" cy="-16" r="5.8" fill="#FDE047" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="-1.3" cy="-17.5" r="1.5" fill="#FFF9C2" />
            <path d="M-10 -4 Q0 -10 10 -4" stroke="#EDE9FE" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </g>
        </g>
      )}

      {/* KALI K — hạt thóc vàng bóng mượt, có gân trấu và bông lúa nhỏ */}
      {m.id === 'K' && (
        <g>
          <path d="M0 -42 C21 -30 35 -10 34 9 C33 26 19 38 0 39 C-19 38 -33 26 -34 9 C-35 -10 -21 -30 0 -42Z" fill="url(#K)" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
          <path d="M-24 -12 Q-31 7 -21 25 M24 -12 Q31 7 21 25" stroke="#A85B0E" strokeWidth="1.25" opacity=".45" fill="none" />
          <path d="M-13 -23 Q-24 -7 -16 15" stroke="#FFF4C2" strokeWidth="2.1" opacity=".55" fill="none" strokeLinecap="round" />
          <path d="M0 -18 Q-7 0 0 25" stroke="#B7791F" strokeWidth="1.05" opacity=".34" fill="none" />
          <g transform={`translate(0,-36) rotate(${Math.sin(t * 2.2) * 3.5})`}>
            <path d="M-4 4 C-15 -7 -25 -7 -29 -1 C-20 5 -11 6 -4 4Z" fill="#22A447" stroke="#176B36" strokeWidth="1.15" />
            <path d="M0 4 Q8 -13 21 -14" stroke="#A85D14" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <ellipse cx="7" cy="-6" rx="4.8" ry="2.7" fill="#FDE68A" stroke="#A85D14" strokeWidth=".9" transform="rotate(-30 7 -6)" />
            <ellipse cx="14" cy="-11" rx="4.8" ry="2.7" fill="#FBBF24" stroke="#A85D14" strokeWidth=".9" transform="rotate(-18 14 -11)" />
            <ellipse cx="21" cy="-13" rx="4.6" ry="2.5" fill="#F59E0B" stroke="#A85D14" strokeWidth=".9" transform="rotate(-4 21 -13)" />
            <path d="M-2 -1 Q-1 -7 2 -10" stroke="#D9F99D" strokeWidth="1.4" fill="none" />
          </g>
        </g>
      )}

      {/* Ánh sáng bóng mềm và huy hiệu được đặt lớp trên cùng, nhưng không che mặt */}
      <ellipse cx="-14" cy="-18" rx="7.5" ry="4.2" fill="#FFFFFF" opacity=".46" transform="rotate(-27 -14 -18)" />
      <ellipse cx="17" cy="8" rx="3.6" ry="7" fill="#FFFFFF" opacity=".12" transform="rotate(-18 17 8)" />
      <MascotFace mood={mood} t={t} px={px} talk={talkEnv > 0.18} />
      <g transform="translate(0,23)">
        <circle r="10.2" fill="#FFFFFF" stroke={m.c2} strokeWidth="2.2" />
        <circle r="7.7" fill="#FFFFFF" opacity=".64" />
        <text y="4.6" textAnchor="middle" fontSize="13.8" fontWeight="900" fill={m.dark}>{m.id}</text>
      </g>
      <path d="M-39 -29 l2 -4 2 4 4 2 -4 2 -2 4 -2 -4 -4 -2Z" fill="#FFF9C2" opacity={0.55 + 0.25 * Math.sin(t * 2 + m.at)} />
    </g>
  );
};

/* Bóng thoại gọn gàng, không đè lên khuôn mặt nhân vật */
const SpeechBubble = ({ x, y, text, who, k }) => {
  const lines = wrap(text, 24);
  const [c, ink, label, badgeBg] = SPK[who] || SPK.narr;
  const W = Math.max(158, Math.max(...lines.map((l) => l.length)) * 8.2 + 36);
  const H = lines.length * 20 + 34;
  const cx = Math.round(clamp(x, W / 2 + 18, 982 - W / 2));
  const cy = Math.round(clamp(y, H + 26, 310));
  const tx = Math.round(clamp(x - cx, -W / 2 + 22, W / 2 - 22));
  const sc = Math.round(k * 1000) / 1000;

  return (
    <g transform={`translate(${cx},${cy}) scale(${sc})`} style={{ textRendering: 'geometricPrecision' }}>
      <rect x={-W / 2 + 2} y={-10 - H + 4} width={W} height={H} rx="16" fill="#0F172A" opacity=".12" />
      <path d={`M${tx - 9} -11 L${tx} 2 L${tx + 9} -11Z`} fill="#FFFDF9" stroke={c} strokeWidth="2.4" strokeLinejoin="round" />
      <rect x={-W / 2} y={-11 - H} width={W} height={H} rx="16" fill="#FFFDF9" stroke={c} strokeWidth="2.4" />
      <rect x={tx - 8} y="-14" width="16" height="5" fill="#FFFDF9" />
      <rect x={-W / 2 + 10} y={-11 - H + 6} width={Math.min(W - 20, label.length * 7.2 + 18)} height="17" rx="8.5" fill={badgeBg} />
      <text x={-W / 2 + 18} y={-11 - H + 18.5} fontSize="10.5" fontWeight="900" fill={ink}>
        {label}
      </text>
      {lines.map((l, i) => (
        <text key={i} y={-11 - H + 42 + i * 19} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0F172A">
          {l}
        </text>
      ))}
    </g>
  );
};

/* ============================================================================
   COMPONENT CHÍNH: Slide02VideoIntro({ onNext })
   ============================================================================ */
/* Không khí đồng quê: cò trắng bay, tia nắng xuyên sương, bụi sáng, khói bếp rạ */
const CountrysideAmbience = React.memo(function CountrysideAmbience() {
  const egret = (x, y, s, d, dl) => (
    <g key={`${x}${y}`} className="vi-fly" style={{ '--d': `${d}s`, '--dl': `${dl}s`, '--y0': `${y}px` }}>
      <g transform={`translate(${x},0) scale(${s})`}>
        <ellipse cx="0" cy="0" rx="9" ry="3.2" fill="#FFFFFF" />
        <path d="M8 -1 Q14 -3 17 -2" stroke="#F8FAFC" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M-9 0 L-22 3" stroke="#E2E8F0" strokeWidth="1.2" strokeLinecap="round" />
        <path className="vi-flap" d="M-3 -1 Q-1 -16 9 -20 Q4 -9 4 -1Z" fill="#F8FAFC" />
      </g>
    </g>
  );
  return (
    <g pointerEvents="none">
      <g className="vi-ray">
        <polygon points="850,70 880,70 520,440 300,440" fill="#FFF3B0" opacity=".14" />
        <polygon points="872,70 896,70 760,440 600,440" fill="#FFF3B0" opacity=".1" />
        <polygon points="838,70 856,70 240,440 90,440" fill="#FFF3B0" opacity=".08" />
      </g>
      {egret(0, 112, 1, 30, 0)}
      {egret(-34, 128, 0.8, 30, 0.35)}
      {egret(-62, 106, 0.7, 30, 0.7)}
      {egret(0, 150, 0.85, 36, 11)}
      {egret(-30, 160, 0.65, 36, 11.4)}
      {[0, 1, 2].map((i) => (
        <circle key={i} className="vi-mote" cx={150 + i * 22} cy={246} r={7 + i * 3} fill="#E7E5E4"
          style={{ '--d': '7s', '--dl': `${i * 2.2}s` }} opacity=".0" />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={`m${i}`} className="vi-mote" cx={40 + ((i * 61) % 930)} cy={190 + ((i * 37) % 120)} r={1.4 + (i % 3) * 0.6}
          fill="#FFF7C2" style={{ '--d': `${6 + (i % 5)}s`, '--dl': `${(i * 0.7) % 6}s` }} />
      ))}
    </g>
  );
});

export default function Slide02VideoIntro({ onNext }) {
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [runId, setRunId] = useState(0);
  const [musicOn, setMusicOn] = useState(true);
  const [voiceOn, setVoiceOn] = useState(true);
  const [full, setFull] = useState(false);
  const [ui, setUi] = useState(true);
  const [ar, setAr] = useState(16 / 9);
  const [reducedMotion, setReducedMotion] = useState(false);

  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const audioRef = useRef(null);
  const voicesMapRef = useRef({ male: null, general: null });
  const spokenKeyRef = useRef(-1);
  const prevT = useRef(0);
  const endedRef = useRef(false);
  const uiTimer = useRef(null);
  const keyRef = useRef(null);
  const tRef = useRef(0);
  const lastMusicBeatRef = useRef('');

  const idx = SCENES.reduce((a, s, i) => (t >= s.at ? i : a), 0);
  const scene = SCENES[idx];
  const accentColor = scene.color;
  endedRef.current = t >= DUR;

  const act = useMemo(() => LINES.find((l) => t >= l.a && t < l.b) || null, [t]);
  const actKey = act ? act.a : -1;

  /* Phát hiện chế độ giảm chuyển động (prefers-reduced-motion) */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(!!mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener('change', update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update);
    };
  }, []);

  /* Tự động co giãn khung nhìn SVG theo tỷ lệ màn hình (16:9 desktop & điện thoại) */
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      if (width > 0 && height > 0) {
        const next = clamp(width / height, 0.65, 3.2);
        setAr((previous) => (Math.abs(previous - next) > 0.015 ? next : previous));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const A = clamp(ar, 0.65, 3.2);
  /* Ưu tiên giữ vùng trung tâm chứa bác nông dân, khóm lúa và 3 nhân vật N-P-K */
  const vb =
    A >= 2
      ? { W: 500 * A, H: 500, x: 500 - 250 * A, y: 0 }
      : A >= 1.25
      ? { W: 1000, H: 1000 / A, x: 0, y: 500 - 1000 / A }
      : { W: 760, H: 760 / A, x: 135, y: 490 - 760 / A };

  /* Chế độ toàn màn hình */
  useEffect(() => {
    const f = () => setFull(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', f);
    return () => document.removeEventListener('fullscreenchange', f);
  }, []);

  const toggleFull = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (rootRef.current && rootRef.current.requestFullscreen) {
      rootRef.current.requestFullscreen().catch(() => {});
    }
  };

  /* Tự ẩn thanh điều khiển khi đang xem toàn màn hình */
  const wake = () => {
    if (!full) return;
    setUi(true);
    clearTimeout(uiTimer.current);
    uiTimer.current = setTimeout(() => setUi(false), 2800);
  };
  useEffect(() => () => clearTimeout(uiTimer.current), []);
  const showUi = !full || ui || !isPlaying;

  /*
   * Đồng hồ timeline chính xác theo timestamp, nhưng chỉ yêu cầu React vẽ khoảng 40fps.
   * SVG vẫn dùng CSS animation cho các chi tiết nhỏ; giới hạn repaint giúp tránh
   * dựng lại hàng trăm nút SVG ở mọi frame 60/120Hz gây khựng trên laptop phổ thông.
   * runId buộc đồng hồ khởi động lại đúng vị trí sau khi tua/phát lại.
   */
  useEffect(() => { tRef.current = t; }, [t]);
  useEffect(() => {
    if (!isPlaying) return undefined;
    let raf = 0;
    let startTs = null;
    let lastPaintTs = -Infinity;
    const base = clamp(tRef.current, 0, DUR);
    const paintInterval = 1000 / 40;

    const tick = (ts) => {
      if (startTs === null) startTs = ts;
      const elapsed = Math.max(0, (ts - startTs) / 1000);
      const next = clamp(base + elapsed * SPEED, 0, DUR);

      if (ts - lastPaintTs >= paintInterval || next >= DUR) {
        lastPaintTs = ts;
        tRef.current = next;
        setT(next);
      }

      if (next < DUR) {
        raf = requestAnimationFrame(tick);
      } else {
        tRef.current = DUR;
        setT(DUR);
        setIsPlaying(false);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, runId]);

  /* Nạp font trước (không dùng @import chặn render giữa chừng) */
  useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById('vi-fonts')) return;
    ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach((h) => {
      const l = document.createElement('link');
      l.rel = 'preconnect';
      l.href = h;
      l.crossOrigin = '';
      document.head.appendChild(l);
    });
    const f = document.createElement('link');
    f.id = 'vi-fonts';
    f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@700;800;900&display=swap';
    document.head.appendChild(f);
  }, []);

  useEffect(() => {
    if (t >= DUR) {
      setIsPlaying(false);
    }
  }, [t >= DUR]); // eslint-disable-line

  /* Khởi tạo Web Audio API */
  const initAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.c.state === 'suspended') {
        audioRef.current.c.resume().catch(() => {});
      }
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return; // Trình duyệt không hỗ trợ âm thanh Web Audio: phần hình vẫn chạy bình thường.
    try {
      const c = new AC();
      const master = c.createGain();
      const music = c.createGain();
      const sfx = c.createGain();
      master.gain.value = 0.85;
      music.gain.value = 0.36;
      sfx.gain.value = 0.55;
      music.connect(master);
      sfx.connect(master);
      master.connect(c.destination);
      audioRef.current = { c, music, sfx };
    } catch (error) {
      // Không để lỗi thiết bị âm thanh làm hỏng toàn bộ slide.
      audioRef.current = null;
    }
  };

  /* Nhạc nền ngũ cung đồng quê + tự động giảm nhẹ khi có lời thoại (ducking) */
  const beat = Math.floor(t * 2);
  useEffect(() => {
    const a = audioRef.current;
    if (!started || !isPlaying || !musicOn || !a) return;
    const beatKey = `${runId}:${beat}`;
    if (lastMusicBeatRef.current === beatKey) return;
    lastMusicBeatRef.current = beatKey;
    const duck = Boolean(act && voiceOn);
    playCountrysideBeat(a.c, a.music, beat, duck);
  }, [beat, started, isPlaying, musicOn, voiceOn, act, runId]);

  /* Tắt/bật nhạc có fade ngắn, tránh tiếng đệm còn ngân lớn sau khi bấm mute. */
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !a.c) return;
    const now = a.c.currentTime;
    [[a.music, musicOn ? 0.36 : 0.0001], [a.sfx, musicOn ? 0.55 : 0.0001]].forEach(([node, target]) => {
      if (!node || !node.gain) return;
      node.gain.cancelScheduledValues(now);
      node.gain.setTargetAtTime(target, now, 0.055);
    });
  }, [musicOn]);

  /* Hiệu ứng âm thanh theo mốc thời gian */
  useEffect(() => {
    const prev = prevT.current;
    prevT.current = t;
    const a = audioRef.current;
    if (!a || !musicOn || !started || !isPlaying || t < prev || t - prev > 0.3) return;
    CUES.forEach(([at, name]) => {
      if (prev < at && t >= at && SFX[name]) {
        SFX[name](a.c, a.sfx, a.c.currentTime + 0.02);
      }
    });
  }, [t, musicOn, started, isPlaying]);

  /* Tải danh sách giọng đọc tiếng Việt vi-VN và dọn dẹp khi unmount */
  useEffect(() => {
    const s = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (!s) return undefined;
    const loadVoices = () => {
      voicesMapRef.current = pickBestVietnameseVoices(s.getVoices());
    };
    loadVoices();
    if (s.addEventListener) s.addEventListener('voiceschanged', loadVoices);
    return () => {
      speakToken++;
      if (s.removeEventListener) s.removeEventListener('voiceschanged', loadVoices);
      s.cancel();
      if (audioRef.current && audioRef.current.c) {
        audioRef.current.c.close().catch(() => {});
      }
    };
  }, []);

  /* Điều phối phát giọng đọc đồng bộ với timeline, không chồng lấn */
  useEffect(() => {
    const s = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (!started || !voiceOn || !isPlaying) {
      if (s) {
        speakToken++;
        s.cancel();
      }
      if (!isPlaying || !voiceOn || !started) spokenKeyRef.current = -1;
      return undefined;
    }
    if (actKey < 0) return undefined;
    const key = `${runId}-${actKey}`;
    if (spokenKeyRef.current === key) return undefined;
    spokenKeyRef.current = key;
    const l = LINES.find((x) => x.a === actKey);
    if (!l) return undefined;
    if (s) speakLine(s, l, voicesMapRef.current);
    return undefined;
  }, [actKey, isPlaying, voiceOn, started, runId]);

  /* Các hàm điều khiển phát / tạm dừng / tua / bỏ qua */
  const stopSpeech = () => {
    speakToken++;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const seekTo = (sec) => {
    const target = clamp(sec, 0, DUR);
    prevT.current = target;
    tRef.current = target;
    spokenKeyRef.current = -1;
    lastMusicBeatRef.current = '';
    stopSpeech();
    setT(target);
    setRunId((r) => r + 1);
    if (target < DUR) setIsPlaying(true);
  };

  const handleStart = (withSound) => {
    setMusicOn(withSound);
    setVoiceOn(withSound);
    if (withSound) initAudio();
    spokenKeyRef.current = -1;
    setStarted(true);
    setIsPlaying(true);
  };

  const handleReplay = () => seekTo(0);

  const handleSkip = () => {
    stopSpeech();
    setIsPlaying(false);
    setT(DUR);
  };

  const handleSeek = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (r.width <= 0) return;
    seekTo(clamp((e.clientX - r.left) / r.width) * (DUR - 0.01));
  };

  const toggleMusic = () => {
    initAudio();
    lastMusicBeatRef.current = '';
    setMusicOn((v) => !v);
  };

  const toggleVoice = () => {
    const next = !voiceOn;
    if (!next) stopSpeech();
    // Có thể bật lại giọng đọc ngay giữa một câu hiện tại.
    spokenKeyRef.current = -1;
    setVoiceOn(next);
  };

  /* Phím tắt: K phát/dừng · F toàn màn hình · M bật/tắt nhạc */
  keyRef.current = (e) => {
    if (e.target && /input|textarea/i.test(e.target.tagName)) return;
    const k = e.key.toLowerCase();
    if (k === 'f') toggleFull();
    else if (k === 'k' && started) {
      if (t >= DUR) seekTo(0);
      else setIsPlaying((p) => !p);
    } else if (k === 'm') toggleMusic();
  };

  useEffect(() => {
    const h = (e) => keyRef.current && keyRef.current(e);
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  /* ============================================================================
     TÍNH TOÁN CHUYỂN ĐỘNG CAMERA, NHÂN VẬT & CẢNH SẮC THEO THỜI GIAN THỰC t (0..30s)
     ============================================================================ */
  const skyAt = (arr) =>
    mixHex(
      arr[Math.max(0, idx - 1)],
      arr[idx],
      idx > 0 ? easeOut(prog(t, scene.at, 1.2)) : 1
    );

  /* Độ chuyển màu mùa lúa chín vàng ở Cảnh 8 (24s – 30s) */
  const harvestK = easeIO(prog(t, 23.6, 3.8));
  const mistOpacity = (1 - easeOut(prog(t, 0, 5.5))) * 0.45;
  const sunY = lerp(128, 76, easeOut(prog(t, 0, 12)));

  /* Sự phát triển của khóm lúa trung tâm theo sự xuất hiện của N, P, K */
  const leafGrowth = 0.25 + 0.75 * easeIO(prog(t, 6.2, 2.6));
  const rootGrowth = 0.28 + 0.72 * easeIO(prog(t, 9.2, 2.5));
  const rootGlowEnv = smoothEnv(t, 9.0, 12.2, 0.5) + 0.45 * smoothEnv(t, 18.5, 23.8, 0.5);
  const panicleGrowth = easeIO(prog(t, 12.1, 2.6));
  const harmonyGlow = easeIO(prog(t, 18.8, 2.2));

  /* Camera đạo diễn mượt mà qua 8 cảnh:
     - Cảnh 1 (0-3s): Toàn cảnh đồng lúa sớm mai
     - Cảnh 2-3 (3-9s): Tiến nhẹ vào bác nông dân và khóm lúa / Đạm N
     - Cảnh 4 (9-12s): Lướt nhẹ xuống tầng đất để thấy bộ rễ & Lân P
     - Cảnh 5 (12-15s): Lướt dọc thân lúa lên bông lúa & Kali K
     - Cảnh 6-7 (15-24s): Khung trung cảnh bác nông dân hòa giải & bộ ba hợp sức
     - Cảnh 8 (24-30s): Lùi ra toàn cảnh mùa vàng bội thu */
  const camFocusY =
    252 +
    38 * smoothEnv(t, 9.0, 12.1, 0.75) -
    18 * smoothEnv(t, 12.1, 15.0, 0.75);
  const camZoom = reducedMotion
    ? 1
    : 1 +
      0.08 * smoothEnv(t, 3.2, 15.0, 1.0) +
      0.04 * smoothEnv(t, 15.0, 23.8, 0.9);
  const camT = `translate(500,${camFocusY.toFixed(1)}) scale(${camZoom.toFixed(4)}) translate(-500,${(-camFocusY).toFixed(1)})`;

  /* Bác nông dân Việt Nam: bước vào ở Cảnh 2, chăm lúa, hòa giải ở Cảnh 7, vẫy tay ở Cảnh 8 */
  const farmerX =
    t < 18
      ? lerp(85, 248, easeIO(prog(t, 2.8, 1.5)))
      : lerp(248, 268, easeIO(prog(t, 18.0, 1.2)));
  const walkEnv = smoothEnv(t, 2.8, 4.3, 0.25) + 0.5 * smoothEnv(t, 18.0, 19.1, 0.25);
  const bendEnv = smoothEnv(t, 4.2, 6.0, 0.35);
  const mediateEnv = smoothEnv(t, 18.1, 23.6, 0.4);
  const waveEnv = easeIO(prog(t, 24.0, 0.7));

  /* Vị trí và biểu cảm của 3 nhân vật N, P, K */
  const pos = Object.fromEntries(MASC.map((m) => [m.id, wp(m.pts, t)]));
  const mascotMood = (id) => {
    if (t >= 15.0 && t < 16.45 && id === 'N') return 'playful';
    if (t >= 18.2) return 'joy';
    return 'happy';
  };

  const talkEnvFor = (who) => {
    const line = LINES.find((l) => l.w === who && t >= l.a - 0.1 && t <= l.b + 0.1);
    return line ? smoothEnv(t, line.a, line.b, 0.18) : 0;
  };
  const farmerTalkEnv = talkEnvFor('farmer');

  /* Vị trí neo của bóng thoại để không che mặt nhân vật */
  const bubbleAnchor = {
    farmer: [farmerX + 8, 172],
    N: [pos.N[0] - 12, pos.N[1] - 58],
    P: [pos.P[0], pos.P[1] - 58],
    K: [pos.K[0] + 12, pos.K[1] - 58],
  };

  /* Thanh chỉ số dinh dưỡng cân đối N - P - K */
  const lv = [
    easeOut(prog(t, 6.2, 2.5)),
    easeOut(prog(t, 9.2, 2.5)),
    easeOut(prog(t, 12.2, 2.5)),
  ];

  const introTitleEnv = smoothEnv(t, 0.2, 2.9, 0.4);
  const endBannerEnv = springOut(prog(t, 24.2, 0.85));

  /* ====== Style bố cục đáp ứng 16:9 & Mobile ====== */
  const headerStyle = full
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 6,
        padding: '14px 22px 32px',
        background: 'linear-gradient(180deg, rgba(255,253,249,.92), rgba(255,253,249,0))',
        opacity: showUi ? 1 : 0,
        transition: 'opacity .35s',
        pointerEvents: showUi ? 'auto' : 'none',
      }
    : { marginBottom: 8 };

  const stageStyle = full
    ? { position: 'absolute', inset: 0, background: '#E6F4F1', overflow: 'hidden', contain: 'layout paint' }
    : {
        flex: 1,
        minHeight: 0,
        background: '#E6F4F1',
        borderRadius: 24,
        border: '2px solid rgba(255,255,255,0.92)',
        position: 'relative',
        overflow: 'hidden',
        contain: 'layout paint',
        boxShadow: '0 16px 40px rgba(15,23,42,0.10), inset 0 2px 8px rgba(255,255,255,0.6)',
      };

  const progStyle = full
    ? {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 6,
        padding: '32px 22px 14px',
        background: 'linear-gradient(0deg, rgba(255,253,249,.92), rgba(255,253,249,0))',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        opacity: showUi ? 1 : 0,
        transition: 'opacity .35s',
        pointerEvents: showUi ? 'auto' : 'none',
      }
    : { marginTop: 8, display: 'flex', alignItems: 'center', gap: 12 };

  return (
    <div
      ref={rootRef}
      onMouseMove={full ? wake : undefined}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        fontFamily: BODY,
        cursor: full && !showUi ? 'none' : 'auto',
        ...(full ? { background: '#E6F4F1' } : {}),
      }}
    >
      <style>{`
        .vi-sway,.vi-wiggle,.vi-spin,.vi-drift{transform-box:fill-box;transform-origin:center bottom;backface-visibility:hidden}
        .vi-fly{animation:vi-fly var(--d,26s) linear var(--dl,0s) infinite;transform-box:fill-box}
        @keyframes vi-fly{from{transform:translate(-160px,var(--y0,0px))}50%{transform:translate(520px,calc(var(--y0,0px) - 14px))}to{transform:translate(1220px,var(--y0,0px))}}
        .vi-flap{animation:vi-flap .5s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 100%}
        @keyframes vi-flap{from{transform:scaleY(.25)}to{transform:scaleY(1)}}
        .vi-ray{animation:vi-ray 7s ease-in-out infinite alternate}
        @keyframes vi-ray{from{opacity:.35}to{opacity:1}}
        .vi-mote{animation:vi-mote var(--d,8s) ease-in-out var(--dl,0s) infinite;transform-box:fill-box;opacity:0}
        @keyframes vi-mote{0%{opacity:0;transform:translate(0,0)}25%{opacity:.85}100%{opacity:0;transform:translate(22px,-70px)}}
        .vi-drift{animation:vi-drift 12s ease-in-out infinite alternate;will-change:transform}
        @keyframes vi-drift{from{transform:translateX(-12px)}to{transform:translateX(15px)}}
        .vi-smoke{transform-box:fill-box;transform-origin:50% 100%;animation:vi-smoke 5.5s ease-in-out infinite alternate;will-change:transform,opacity}
        @keyframes vi-smoke{from{transform:translate(0,2px) scale(.92);opacity:.28}to{transform:translate(4px,-5px) scale(1.06);opacity:.62}}
        .vi-spin{animation:vi-spin 28s linear infinite;transform-box:view-box}
        @keyframes vi-spin{to{transform:rotate(360deg)}}
        .vi-sway{animation:vi-sway 3.2s ease-in-out infinite alternate}
        @keyframes vi-sway{from{transform:skewX(-2.6deg)}to{transform:skewX(2.6deg)}}
        .vi-wiggle{animation:vi-wiggle 2.8s ease-in-out infinite alternate}
        @keyframes vi-wiggle{from{transform:translateX(-8px)}to{transform:translateX(10px)}}
        .vi-fade{animation:vi-fade .4s cubic-bezier(.2,.8,.2,1) both}
        @keyframes vi-fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        .vi-pulse{animation:vi-pulse 1.8s ease-in-out infinite}
        @keyframes vi-pulse{50%{transform:scale(1.04)}}
        .vi-pop{animation:vi-popin .32s cubic-bezier(.22,1,.36,1) both}
        @keyframes vi-popin{from{opacity:0;transform:scale(.95) translateY(6px)}to{opacity:1;transform:none}}
        .vi-wave{animation:vi-wave .6s ease-in-out infinite alternate}
        @keyframes vi-wave{from{transform:scaleY(.35)}to{transform:scaleY(1)}}
        .nav-circle-btn{width:40px;height:40px;border-radius:9999px;border:1px solid rgba(15,23,42,0.12);background:rgba(255,253,249,.94);color:#0F172A;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(15,23,42,0.07);transition:all .2s cubic-bezier(.34,1.56,.64,1);outline:none;padding:0;flex-shrink:0}
        .nav-circle-btn:hover:not(:disabled){border-color:rgba(22,163,74,0.4);color:#15803D;transform:translateY(-2px) scale(1.05);box-shadow:0 6px 14px rgba(22,163,74,0.16)}
        .nav-circle-btn:active:not(:disabled){transform:translateY(0) scale(0.96)}
        .nav-circle-btn:focus-visible,.tool-text-btn:focus-visible{outline:3px solid #22C55E;outline-offset:2px}
        .nav-circle-btn.muted{opacity:0.52;color:#64748B}
        .nav-circle-btn:disabled{opacity:0.35!important;cursor:not-allowed;box-shadow:none;transform:none!important}
        .tool-text-btn{height:40px;padding:0 16px;border-radius:9999px;border:1px solid rgba(15,23,42,0.12);background:rgba(255,253,249,.94);color:#0F172A;display:inline-flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;font-family:inherit;font-size:13.5px;font-weight:800;box-shadow:0 2px 8px rgba(15,23,42,0.07);transition:all .2s cubic-bezier(.34,1.56,.64,1);outline:none;white-space:nowrap;flex-shrink:0}
        .tool-text-btn:hover:not(:disabled){border-color:rgba(22,163,74,0.4);color:#15803D;transform:translateY(-2px) scale(1.02)}
        .tool-text-btn:disabled{opacity:0.35!important;cursor:not-allowed;box-shadow:none;transform:none!important}
        @media (prefers-reduced-motion:reduce){.vi-fly,.vi-flap,.vi-ray,.vi-mote,.vi-drift,.vi-spin,.vi-sway,.vi-pulse,.vi-wave,.vi-wiggle,.vi-smoke{animation:none!important;will-change:auto!important}}
      `}</style>

      {/* THANH TIÊU ĐỀ & ĐIỀU KHIỂN TRÊN */}
      <div style={{ ...headerStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 900,
                color: '#FFF',
                background: accentColor,
                padding: '3px 12px',
                borderRadius: 999,
                letterSpacing: '0.04em',
                boxShadow: `0 3px 10px ${accentColor}44`,
                transition: 'background .4s',
              }}
            >
              CẢNH {idx + 1} / {SCENES.length}
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 800, color: accentColor, letterSpacing: '0.02em' }}>
              CÂU CHUYỆN ĐỒNG QUÊ · BIỆT ĐỘI N – P – K
            </span>
            <span style={{ display: 'inline-flex', gap: 5 }}>
              {SCENES.map((s, i) => (
                <span
                  key={i}
                  onClick={() => started && seekTo(s.at + 0.05)}
                  title={`Chuyển tới Cảnh ${i + 1}: ${s.key}`}
                  style={{
                    width: i === idx ? 22 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i <= idx ? s.color : '#CBD5E1',
                    cursor: started ? 'pointer' : 'default',
                    transition: 'all .35s cubic-bezier(.34,1.56,.64,1)',
                  }}
                />
              ))}
            </span>
          </div>
          <h2
            key={idx}
            className="vi-fade"
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(18px, 1.85vw, 27px)',
              fontWeight: 800,
              color: '#0F172A',
              margin: '3px 0 0',
              lineHeight: 1.2,
            }}
          >
            <span style={{ color: scene.ink }}>{scene.key}</span>
            {scene.rest}
          </h2>
        </div>

        {/* Cụm nút điều khiển phát, âm thanh, toàn màn hình, bỏ qua */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button
            type="button"
            className="nav-circle-btn"
            onClick={() => (t >= DUR ? seekTo(0) : setIsPlaying(!isPlaying))}
            disabled={!started}
            title={isPlaying ? 'Tạm dừng (K)' : 'Tiếp tục phát (K)'}
            aria-label={isPlaying ? 'Tạm dừng' : 'Tiếp tục phát'}
            style={isPlaying ? { color: '#15803D', borderColor: 'rgba(22, 163, 74, 0.32)' } : {}}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
          </button>
          <button
            type="button"
            className="nav-circle-btn"
            onClick={handleReplay}
            disabled={!started}
            title="Phát lại từ đầu"
            aria-label="Phát lại từ đầu"
          >
            <RotateCcw size={18} />
          </button>
          <button
            type="button"
            className={`nav-circle-btn ${!musicOn ? 'muted' : ''}`}
            onClick={toggleMusic}
            title={musicOn ? 'Tắt nhạc đồng quê & hiệu ứng (M)' : 'Bật nhạc đồng quê & hiệu ứng (M)'}
            aria-label="Nhạc nền"
          >
            {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            type="button"
            className={`nav-circle-btn ${!voiceOn ? 'muted' : ''}`}
            onClick={toggleVoice}
            title={voiceOn ? 'Tắt giọng đọc tiếng Việt' : 'Bật giọng đọc tiếng Việt'}
            aria-label="Giọng đọc"
          >
            {voiceOn ? <Mic size={18} /> : <MicOff size={18} />}
          </button>
          <button
            type="button"
            className="nav-circle-btn"
            onClick={toggleFull}
            title="Toàn màn hình (F)"
            aria-label="Toàn màn hình"
          >
            {full ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button
            type="button"
            className="tool-text-btn"
            onClick={handleSkip}
            disabled={!started}
            title="Bỏ qua intro để vào bài thuyết trình"
            aria-label="Bỏ qua intro"
          >
            <FastForward size={16} />
            <span>Bỏ qua</span>
          </button>
        </div>
      </div>

      {/* SÂN KHẤU HOẠT HÌNH ĐỒNG QUÊ VIỆT NAM */}
      <div ref={stageRef} style={stageStyle}>
        <svg
          viewBox={`${vb.x} ${vb.y} ${vb.W} ${vb.H}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block', fontFamily: BODY, textRendering: 'optimizeSpeed' }}
        >
          <defs>
            <linearGradient id="sky" gradientUnits="userSpaceOnUse" x1="0" y1="-200" x2="0" y2="340">
              <stop offset="0" stopColor={skyAt(SKY_TOP)} />
              <stop offset="1" stopColor={skyAt(SKY_BOT)} />
            </linearGradient>
            <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={mixHex('#A7F3D0', '#FDE68A', harvestK * 0.5)} />
              <stop offset="1" stopColor={mixHex('#6EE7B7', '#FCD34D', harvestK * 0.5)} />
            </linearGradient>
            <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={mixHex('#86EFAC', '#FDE047', harvestK * 0.6)} />
              <stop offset="1" stopColor={mixHex('#4ADE80', '#F59E0B', harvestK * 0.6)} />
            </linearGradient>
            <linearGradient id="waterReflect" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#BAE6FD" stopOpacity=".85" />
              <stop offset=".55" stopColor="#FEF08A" stopOpacity=".55" />
              <stop offset="1" stopColor="#7DD3FC" stopOpacity=".75" />
            </linearGradient>
            <linearGradient id="turf" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#854D0E" />
              <stop offset=".5" stopColor="#A16207" />
              <stop offset="1" stopColor="#854D0E" />
            </linearGradient>
            <linearGradient id="soil" gradientUnits="userSpaceOnUse" x1="0" y1="345" x2="0" y2="620">
              <stop offset="0" stopColor="#6B4423" />
              <stop offset="1" stopColor="#2E1B0F" />
            </linearGradient>
            <linearGradient id="nonLaGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FEF3C7" />
              <stop offset=".6" stopColor="#FDE68A" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="farmerSkin" x1="0" y1="0" x2=".85" y2="1">
              <stop offset="0" stopColor="#F8D6A7" />
              <stop offset=".48" stopColor="#E9B47B" />
              <stop offset="1" stopColor="#C98550" />
            </linearGradient>
            <linearGradient id="farmerShirt" x1="0" y1="0" x2="1" y2=".3">
              <stop offset="0" stopColor="#98663C" />
              <stop offset=".45" stopColor="#7C4D2B" />
              <stop offset="1" stopColor="#5C3823" />
            </linearGradient>
            <linearGradient id="riceLeafBright" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#B7F77D" />
              <stop offset=".42" stopColor="#4CCB58" />
              <stop offset="1" stopColor="#15803D" />
            </linearGradient>
            <linearGradient id="riceLeafDeep" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#69D85C" />
              <stop offset=".55" stopColor="#279746" />
              <stop offset="1" stopColor="#0E5A31" />
            </linearGradient>
            <linearGradient id="riceLeafLime" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FFF3A6" />
              <stop offset=".5" stopColor="#E8C747" />
              <stop offset="1" stopColor="#C98A18" />
            </linearGradient>
            <linearGradient id="riceLeafGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FFF0A0" />
              <stop offset=".5" stopColor="#F5BF39" />
              <stop offset="1" stopColor="#B96B11" />
            </linearGradient>
            <linearGradient id="buffaloHide" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#94A3B8" />
              <stop offset=".48" stopColor="#64748B" />
              <stop offset="1" stopColor="#334155" />
            </linearGradient>
            <radialGradient id="sunCore" cx=".35" cy=".35">
              <stop offset="0" stopColor="#FFFBEB" />
              <stop offset="1" stopColor="#FBBF24" />
            </radialGradient>
            <radialGradient id="sunHalo">
              <stop offset="0" stopColor="#FDE68A" stopOpacity=".85" />
              <stop offset="1" stopColor="#FDE68A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="gold">
              <stop offset="0" stopColor="#FEF08A" stopOpacity=".9" />
              <stop offset=".6" stopColor="#FDE047" stopOpacity=".32" />
              <stop offset="1" stopColor="#FDE047" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="purpleGlow">
              <stop offset="0" stopColor="#DDD6FE" stopOpacity=".55" />
              <stop offset="1" stopColor="#DDD6FE" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sunLight" gradientUnits="userSpaceOnUse" cx="860" cy="82" r="680">
              <stop offset="0" stopColor="#FFF9DB" stopOpacity=".52" />
              <stop offset=".5" stopColor="#FEF08A" stopOpacity=".16" />
              <stop offset="1" stopColor="#FEF08A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="vig" cx="50%" cy="50%" r="74%">
              <stop offset=".68" stopColor="#0F172A" stopOpacity="0" />
              <stop offset="1" stopColor="#0F172A" stopOpacity=".15" />
            </radialGradient>
            {MASC.map((m) => (
              <radialGradient key={m.id} id={m.id} cx=".32" cy=".28">
                <stop offset="0" stopColor={m.c0} />
                <stop offset=".48" stopColor={m.c1} />
                <stop offset="1" stopColor={m.c2} />
              </radialGradient>
            ))}
          </defs>

          {/* Nền bầu trời đồng quê */}
          <rect x="-1300" y="-1500" width="3600" height="1850" fill="url(#sky)" />

          {/* Khung cảnh chính có chuyển động camera mượt */}
          <g transform={camT}>
            {/* Mặt trời buổi sớm & những tia nắng xuyên qua sương */}
            <g transform={`translate(860,${sunY})`}>
              <MorningSun harvestK={harvestK} />
            </g>
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M860 ${sunY} L${580 - i * 185} 340 L${665 - i * 185} 340Z`}
                fill="#FFFBEB"
                opacity={0.07 + 0.03 * Math.sin(t * 0.7 + i)}
                pointerEvents="none"
              />
            ))}

            {/* Cánh đồng lúa Việt Nam nhiều lớp */}
            <PaddyFieldBackdrop t={t} harvestK={harvestK} soilCutawayEnv={smoothEnv(t, 9.0, 12.1, 0.5)} />
            <CountrysideAmbience />

            {/* Sương sớm tan nhẹ trên mặt ruộng ở Cảnh 1 */}
            {mistOpacity > 0.01 && (
              <g opacity={mistOpacity} pointerEvents="none">
                <ellipse cx={360 + t * 18} cy="306" rx="280" ry="16" fill="#FFFDF9" />
                <ellipse cx={680 - t * 14} cy="320" rx="240" ry="14" fill="#FFFDF9" />
              </g>
            )}

            {/* Khóm lúa trung tâm */}
            <CenterRicePlant
              t={t}
              leafGrowth={leafGrowth}
              rootGrowth={rootGrowth}
              rootGlowEnv={rootGlowEnv}
              panicleGrowth={panicleGrowth}
              harvestK={harvestK}
              harmonyGlow={harmonyGlow}
            />

            {/* Hiệu ứng chiếc lá lúa vươn lên morph thành Đạm (N) ở Cảnh 3 (06:00 - 06:80) */}
            {t >= 5.85 && t < 6.85 && (() => {
              const mk = prog(t, 5.85, 0.85);
              const mx = lerp(475, 362, easeIO(mk));
              const my = lerp(248, 206, easeIO(mk));
              return (
                <g transform={`translate(${mx},${my}) rotate(${lerp(-25, 0, mk)}) scale(${1 - mk * 0.3})`} opacity={1 - mk * 0.8}>
                  <path d="M0 -24 C16 -12 22 4 0 24 C-22 4 -16 -12 0 -24Z" fill="#4ADE80" stroke="#FFF" strokeWidth="2" />
                </g>
              );
            })()}

            {/* Hiệu ứng rễ lúa morph thành Lân (P) ở Cảnh 4 (08:85 - 09:80) */}
            {t >= 8.85 && t < 9.85 && (() => {
              const mk = prog(t, 8.85, 0.85);
              const mx = lerp(520, 628, easeIO(mk));
              const my = lerp(388, 344, easeIO(mk));
              return (
                <circle cx={mx} cy={my} r={22 * (1 - mk * 0.3)} fill="#C4B5FD" stroke="#FFF" strokeWidth="2" opacity={1 - mk * 0.8} />
              );
            })()}

            {/* Hiệu ứng hạt lúa/sương mai morph thành Kali (K) ở Cảnh 5 (11:85 - 12:80) */}
            {t >= 11.85 && t < 12.85 && (() => {
              const mk = prog(t, 11.85, 0.85);
              const mx = lerp(525, 742, easeIO(mk));
              const my = lerp(172, 208, easeIO(mk));
              return (
                <ellipse cx={mx} cy={my} rx={16} ry={22} fill="#FDE047" stroke="#FFF" strokeWidth="2" opacity={1 - mk * 0.8} />
              );
            })()}

            {/* Dải ánh sáng dinh dưỡng N - P - K hòa quyện nuôi cây lúa ở Cảnh 7 */}
            {STREAMS.map((s, si) => {
              const env = smoothEnv(t, s.a, s.b, 0.5);
              if (env <= 0.01) return null;
              return Array.from({ length: 6 }, (_, k) => {
                const ph = (t * 0.55 + k / 6) % 1;
                const e = easeIO(ph);
                const x = lerp(s.from[0], s.to[0], e);
                const y = lerp(s.from[1], s.to[1], e) - Math.sin(ph * Math.PI) * 32;
                const o = env * Math.sin(ph * Math.PI);
                return (
                  <g key={`${si}-${k}`}>
                    <circle cx={x} cy={y} r="7.5" fill={s.c} opacity={o * 0.32} />
                    <circle cx={x} cy={y} r="3.6" fill={s.c} stroke="#FFF" strokeWidth="1" opacity={o} />
                  </g>
                );
              });
            })}

            {/* Bác nông dân Việt Nam (xuất hiện xuyên suốt từ cuối Cảnh 1 / đầu Cảnh 2 đến kết phim) */}
            {t >= 2.6 && (
              <VietnameseFarmer
                t={t}
                x={farmerX}
                walkEnv={walkEnv}
                bendEnv={bendEnv}
                mediateEnv={mediateEnv}
                waveEnv={waveEnv}
                talk={farmerTalkEnv > 0.15}
              />
            )}

            {/* Ba nhân vật Biệt đội N – P – K */}
            {MASC.map((m) => (
              <NPKMascot
                key={m.id}
                t={t}
                m={m}
                x={pos[m.id][0]}
                y={pos[m.id][1]}
                mood={mascotMood(m.id)}
                talkEnv={talkEnvFor(m.id)}
                waveEnv={waveEnv}
              />
            ))}

            {/* Chim sẻ bay trên cánh đồng & chuồn chuồn lướt nhẹ */}
            {[0, 1, 2].map((i) => {
              const bx = ((t * 36 + i * 380) % 1500) - 200;
              const by = 68 + i * 26 + Math.sin(t * 2.2 + i) * 7;
              const wing = Math.sin(t * 11 + i) * 4.5;
              return (
                <path
                  key={i}
                  d={`M${bx - 9} ${by + wing} Q${bx} ${by - 4} ${bx + 9} ${by + wing}`}
                  stroke="#475569"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              );
            })}
            <Dragonfly
              x={565 + Math.cos(t * 1.1) * 95}
              y={235 + Math.sin(t * 1.7) * 22}
              t={t}
              s={0.95}
              color="#EA580C"
            />
            {t >= 18 && (
              <Dragonfly
                x={420 + Math.sin(t * 0.9) * 80}
                y={215 + Math.cos(t * 1.4) * 18}
                t={t + 1.5}
                s={0.82}
                color="#D97706"
              />
            )}

            {/* Hạt nắng ấm áp lơ lửng nhẹ trên cánh đồng */}
            {GOLDEN_MOTES.map((m, i) => (
              <circle
                key={i}
                cx={m.x + Math.sin(t * m.sp + m.ph) * 14}
                cy={m.y + Math.cos(t * m.sp + m.ph) * 8}
                r={m.r}
                fill="#FEF08A"
                opacity={0.28 + 0.32 * Math.abs(Math.sin(t * 1.4 + m.ph))}
              />
            ))}

            {/* CẢNH 1: Thẻ tiêu đề mở đầu gọn gàng trên bầu trời */}
            {introTitleEnv > 0.01 && (
              <g
                transform={`translate(500,${115 - 10 * (1 - introTitleEnv)}) scale(${0.94 + 0.06 * introTitleEnv})`}
                opacity={introTitleEnv}
              >
                <rect x="-210" y="-42" width="420" height="84" rx="24" fill="#FFFDF9" opacity=".9" stroke="#BBF7D0" strokeWidth="2.5" />
                <text y="-11" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#15803D" letterSpacing="0.04em">
                  🌾 CÂU CHUYỆN ĐỒNG QUÊ VIỆT NAM 🌾
                </text>
                <text
                  y="25"
                  textAnchor="middle"
                  fontSize="32"
                  fontWeight="900"
                  fill="#14532D"
                  style={{ fontFamily: DISPLAY }}
                >
                  BIỆT ĐỘI N – P – K
                </text>
              </g>
            )}

            {/* Bóng thoại trực tiếp cho nhân vật */}
            {LINES.filter((l) => l.w !== 'narr').map((l) => {
              const k = easeOut(prog(t, l.a, 0.22)) * (1 - easeIO(prog(t, l.b - 0.2, 0.2)));
              if (k <= 0.02 || !bubbleAnchor[l.w]) return null;
              return (
                <SpeechBubble
                  key={l.a}
                  x={bubbleAnchor[l.w][0]}
                  y={bubbleAnchor[l.w][1]}
                  text={l.t}
                  who={l.w}
                  k={k}
                />
              );
            })}

            {/* CẢNH 8: Khung tiêu đề kết phim trang nhã trên bầu trời, không che ruộng lúa */}
            {endBannerEnv > 0.01 && (
              <g
                transform={`translate(500,56) scale(${endBannerEnv})`}
                style={{ textRendering: 'geometricPrecision' }}
              >
                <rect x="-266" y="-34" width="532" height="76" rx="22" fill="#0F172A" opacity=".14" />
                <rect x="-262" y="-36" width="524" height="74" rx="22" fill="#FFFDF9" opacity=".95" stroke="#F59E0B" strokeWidth="3" />
                <text
                  y="-6"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="900"
                  fill="#15803D"
                  letterSpacing="0.04em"
                  style={{ fontFamily: DISPLAY }}
                >
                  CHÀO MỪNG ĐẾN VỚI BÀI THUYẾT TRÌNH
                </text>
                <text
                  y="24"
                  textAnchor="middle"
                  fontSize="26"
                  fontWeight="900"
                  fill="#B45309"
                  style={{ fontFamily: DISPLAY }}
                >
                  BIỆT ĐỘI N – P – K
                </text>
              </g>
            )}
          </g>

          {/* Ánh nắng sớm & vignette điện ảnh */}
          <rect x={vb.x} y={vb.y} width={vb.W} height={vb.H} fill="url(#sunLight)" pointerEvents="none" />
          <rect x={vb.x} y={vb.y} width={vb.W} height={vb.H} fill="url(#vig)" pointerEvents="none" />

          {/* Bảng thông tin khoa học N – P – K cân đối ở góc trên bên trái */}
          <g
            transform={`translate(${vb.x + 16},${vb.y + (showUi && full ? 76 : 14)})`}
            opacity={prog(t, 5.8, 0.8)}
          >
            <rect width="218" height="86" rx="16" fill="#FFFDF9" opacity=".92" stroke="#E2E8F0" strokeWidth="1.5" />
            <text x="14" y="18" fontSize="10.5" fontWeight="900" fill="#475569" letterSpacing="0.03em">
              DINH DƯỠNG CÂN ĐỐI CHO CÂY LÚA
            </text>
            {MASC.map((m, i) => (
              <g key={m.id} transform={`translate(14,${25 + i * 19})`}>
                <text y="10" fontSize="11.5" fontWeight="900" fill={m.dark}>
                  {m.id}
                </text>
                <rect x="18" y="1.5" width="76" height="9" rx="4.5" fill="#F1F5F9" />
                <rect x="18" y="1.5" width={76 * lv[i]} height="9" rx="4.5" fill={m.c2} />
                <text x="100" y="9.5" fontSize="9.5" fontWeight="800" fill="#334155">
                  {m.id === 'N' ? 'Thân & lá xanh' : m.id === 'P' ? 'Bộ rễ khỏe' : 'Cứng cây, chắc hạt'}
                </text>
              </g>
            ))}
          </g>
        </svg>

        {/* PHỤ ĐỀ ĐỒNG BỘ LỜI THOẠI */}
        {act && started && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: full ? 72 : 14,
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none',
              padding: '0 18px',
              zIndex: 4,
            }}
          >
            <div
              key={act.a}
              className="vi-pop"
              style={{
                background: 'rgba(15, 23, 42, 0.88)',
                color: '#FFFDF9',
                padding: '9px 20px',
                borderRadius: 20,
                border: `2px solid ${SPK[act.w][0]}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                maxWidth: 'min(820px, 94vw)',
                flexWrap: 'wrap',
                justifyContent: 'center',
                boxShadow: '0 10px 26px rgba(15,23,42,0.28)',
              }}
            >
              <span
                style={{
                  background: SPK[act.w][3],
                  color: SPK[act.w][1],
                  fontWeight: 900,
                  fontSize: 12.5,
                  padding: '3px 11px',
                  borderRadius: 999,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {SPK[act.w][2]}
              </span>
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: full ? 'clamp(17px, 1.65vw, 24px)' : 'clamp(14.5px, 1.4vw, 18.5px)',
                  fontWeight: 700,
                  lineHeight: 1.35,
                }}
              >
                “{act.t}”
              </span>
              {voiceOn && isPlaying && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2.5, height: 15, marginLeft: 2 }}>
                  {[0, 0.15, 0.3].map((d, i) => (
                    <span
                      key={i}
                      className="vi-wave"
                      style={{
                        width: 3,
                        height: 13,
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

        {/* MÀN HÌNH CHỜ TRƯỚC KHI PHÁT */}
        {!started && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              background: 'rgba(255, 253, 249, 0.68)',
              backdropFilter: 'blur(8px)',
              textAlign: 'center',
              padding: 24,
            }}
          >
            <div style={{ fontSize: 56 }} className="vi-pulse">
              🌾
            </div>
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(28px, 4.2vw, 50px)',
                fontWeight: 800,
                color: '#14532D',
                lineHeight: 1.1,
              }}
            >
              BIỆT ĐỘI N – P – K
            </div>
            <div style={{ fontSize: 'clamp(13.5px, 1.4vw, 17px)', fontWeight: 800, color: '#475569', maxWidth: 540 }}>
              Phim hoạt hình mở đầu · Câu chuyện trên đồng lúa Việt Nam (30 giây)
            </div>
            <button
              type="button"
              onClick={() => handleStart(true)}
              style={{
                marginTop: 6,
                background: 'linear-gradient(135deg,#16A34A,#15803D)',
                color: '#FFF',
                border: 'none',
                borderRadius: 999,
                padding: '14px 32px',
                fontSize: 17.5,
                fontWeight: 900,
                fontFamily: 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                boxShadow: '0 10px 26px rgba(22,163,74,.38)',
              }}
            >
              <Play size={20} /> Bắt đầu xem
            </button>
            <button
              type="button"
              onClick={() => handleStart(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#475569',
                fontWeight: 800,
                fontSize: 14,
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: 'inherit',
              }}
            >
              Xem không âm thanh
            </button>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#64748B' }}>
              Phím tắt: K phát/dừng · F toàn màn hình · M bật/tắt nhạc
            </div>
          </div>
        )}

        {/* NÚT CHUYỂN SLIDE TIẾP THEO KHI KẾT THÚC (30 GIÂY) */}
        {t >= DUR && (
          <div className="vi-pop" style={{ position: 'absolute', bottom: full ? 74 : 22, right: 24, zIndex: 8 }}>
            <button
              type="button"
              onClick={onNext}
              className="vi-pulse"
              style={{
                background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 999,
                padding: '13px 26px',
                fontSize: 15.5,
                fontWeight: 900,
                fontFamily: 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(22,163,74,0.42)',
              }}
            >
              <span>GẶP GỠ BIỆT ĐỘI THÀNH VIÊN</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* THANH TIẾN TRÌNH THỜI GIAN THỰC (00:00 / 00:30) */}
      <div style={progStyle}>
        <span style={{ fontSize: 13, fontWeight: 800, color: '#475569', fontFamily: 'ui-monospace, monospace' }}>
          {fmt(t)} / {fmt(DUR)}
        </span>
        <div
          role="slider"
          aria-label="Vị trí phát video"
          aria-valuemin={0}
          aria-valuemax={DUR}
          aria-valuenow={Math.round(t)}
          tabIndex={started ? 0 : -1}
          onClick={started ? handleSeek : undefined}
          onKeyDown={started ? (e) => {
            if (e.key === 'ArrowRight') seekTo(Math.min(DUR - 0.01, t + 1));
            else if (e.key === 'ArrowLeft') seekTo(Math.max(0, t - 1));
            else if (e.key === 'Home') seekTo(0);
            else if (e.key === 'End') seekTo(DUR - 0.01);
          } : undefined}
          style={{
            flex: 1,
            height: 11,
            background: '#E2E8F0',
            borderRadius: 999,
            position: 'relative',
            cursor: started ? 'pointer' : 'default',
            touchAction: 'pan-y',
            outlineOffset: 4,
          }}
        >
          <div
            style={{
              width: `${(t / DUR) * 100}%`,
              height: '100%',
              background: `linear-gradient(90deg, #16A34A, ${accentColor})`,
              borderRadius: 999,
              transition: 'background .35s',
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