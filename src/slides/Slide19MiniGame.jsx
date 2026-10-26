import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import { BLIND_BAGS, BASE_SCORE, PENALTY, MIN_SCORE, getRank } from '../data/miniGameData';
import {
  kindFor,
  Creature,
  PouchSvg,
  MedalSvg,
  TrophySvg,
  IconSpark,
  IconGift,
  IconCoin,
  IconTrophy,
  IconFlame,
  IconVolume,
  IconMute,
  IconReset,
  IconBulb,
  IconCheck,
  IconCross,
  IconBack,
  IconArrow,
  IconScissors,
  IconParty,
  IconStar
} from './MiniGameArt';
import './minigame.css';

/* ==========================================================================
   SLIDE 19 — MINIGAME: BÓC TÚI MÙ HÓA HỌC NPK (MỤC 5 & MỤC 10 MASTER SPEC)
   - Title: BÓC TÚI MÙ HÓA HỌC NPK (giữ hiệu ứng chữ reveal + sheen)
   - 4 túi có nhãn ngắn, nút chọn lớn; 1 câu + 4 đáp án rõ; trạng thái đúng/sai + giải thích 1-2 câu + XP.
   - Giữ state trong phiên khi rời rồi quay lại slide; đổi túi không reset nhầm.
   - Nút chuyển thẳng sang Tổng kết luôn hiển thị để người thuyết trình chủ động thời gian.
   - Phím A/B/C/D chỉ hoạt động khi đang ở màn câu hỏi; Esc trở lại chọn túi; vuốt ngang trong vùng câu hỏi không đổi slide.
   ========================================================================== */

const MIN_SCALE = 0.92;
const STAGE_PAD_X = 72; // padding trái+phải của .slide-canvas (36 + 36)
const STAGE_PAD_Y = 30; // padding trên+dưới của .slide-canvas (18 + 12)
const TEAR_MS = 740;
const STORE_KEY = 'npk-minigame-v3';
const LETTERS = ['A', 'B', 'C', 'D'];
const BAG_BY_ID = Object.fromEntries(BLIND_BAGS.map((b) => [b.id, b]));
const KIND_BY_ID = Object.fromEntries(BLIND_BAGS.map((b, i) => [b.id, kindFor(i)]));
const MAX_SCORE = BLIND_BAGS.length * BASE_SCORE;

const emptyProgress = () => ({ solved: false, wrong: [], score: 0 });
const potentialOf = (wrongCount) => Math.max(MIN_SCORE, BASE_SCORE - PENALTY * wrongCount);
const starsOf = (wrongCount) => (wrongCount === 0 ? 3 : wrongCount === 1 ? 2 : 1);

function makeOrder(bag, avoidPos) {
  const n = bag.options.length;
  let order = [];
  for (let t = 0; t < 12; t += 1) {
    order = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    if (n < 3 || order.indexOf(bag.correctIndex) !== avoidPos) break;
  }
  return order;
}

const bagVars = (bag, index = 0) => ({
  '--c': bag.themeColor,
  '--a': bag.accentColor,
  '--soft': bag.softColor,
  '--b': bag.borderColor,
  '--glow': bag.glowColor,
  '--i': index
});

function loadStore() {
  try {
    const raw = window.sessionStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const progress = {};
    BLIND_BAGS.forEach((b) => {
      const p = data && data.progress && data.progress[b.id];
      if (!p) return;
      const wrong = Array.isArray(p.wrong)
        ? [
            ...new Set(
              p.wrong.filter(
                (n) => Number.isInteger(n) && n >= 0 && n < b.options.length && n !== b.correctIndex
              )
            )
          ]
        : [];
      progress[b.id] = {
        solved: !!p.solved,
        wrong,
        score: p.solved ? Math.max(MIN_SCORE, Math.min(BASE_SCORE, Number(p.score) || MIN_SCORE)) : 0
      };
    });
    return {
      progress,
      sound: !data || data.sound !== false,
      streak: Math.max(0, Number(data && data.streak) || 0)
    };
  } catch {
    return null;
  }
}

function saveStore(value) {
  try {
    window.sessionStorage.setItem(STORE_KEY, JSON.stringify(value));
  } catch {
    /* ignore storage quota errors */
  }
}

const buzz = (pattern) => {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch {
    /* noop */
  }
};

function useSfx(enabled) {
  const ctxRef = useRef(null);
  const busRef = useRef(null);
  const noiseRef = useRef(null);
  const lastHoverRef = useRef(0);

  useEffect(
    () => () => {
      try {
        if (ctxRef.current && ctxRef.current.close) ctxRef.current.close();
      } catch {
        /* noop */
      }
      ctxRef.current = null;
      busRef.current = null;
    },
    []
  );

  return useCallback(
    (kind, n = 0) => {
      if (!enabled) return;
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;

        if (!ctxRef.current) {
          const ctx = new Ctx();
          const master = ctx.createGain();
          master.gain.value = 0.88;
          const comp = ctx.createDynamicsCompressor();
          comp.threshold.value = -16;
          comp.knee.value = 18;
          comp.ratio.value = 6;
          comp.attack.value = 0.003;
          comp.release.value = 0.2;
          const delay = ctx.createDelay(0.5);
          delay.delayTime.value = 0.13;
          const fb = ctx.createGain();
          fb.gain.value = 0.25;
          const wet = ctx.createGain();
          wet.gain.value = 0.2;
          delay.connect(fb);
          fb.connect(delay);
          delay.connect(wet);
          wet.connect(master);
          master.connect(comp);
          comp.connect(ctx.destination);

          const len = ctx.sampleRate;
          const buf = ctx.createBuffer(1, len, ctx.sampleRate);
          const d = buf.getChannelData(0);
          for (let i = 0; i < len; i += 1) d[i] = Math.random() * 2 - 1;

          ctxRef.current = ctx;
          busRef.current = { master, delay };
          noiseRef.current = buf;
        }

        const ctx = ctxRef.current;
        const { master, delay } = busRef.current;
        if (ctx.state === 'suspended') ctx.resume();
        const t0 = ctx.currentTime + 0.01;

        const route = (node, send) => {
          node.connect(master);
          if (send) {
            const g = ctx.createGain();
            g.gain.value = send;
            node.connect(g);
            g.connect(delay);
          }
        };

        const tone = (freq, at, dur, o = {}) => {
          const { type = 'sine', vol = 0.065, to, send = 0, attack = 0.012 } = o;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = type;
          osc.frequency.setValueAtTime(freq, t0 + at);
          if (to) osc.frequency.exponentialRampToValueAtTime(to, t0 + at + dur);
          gain.gain.setValueAtTime(0.0001, t0 + at);
          gain.gain.exponentialRampToValueAtTime(vol, t0 + at + attack);
          gain.gain.exponentialRampToValueAtTime(0.0001, t0 + at + dur);
          osc.connect(gain);
          route(gain, send);
          osc.start(t0 + at);
          osc.stop(t0 + at + dur + 0.03);
        };

        const bell = (freq, at, dur, vol = 0.065, send = 0.45) => {
          tone(freq, at, dur, { vol, send });
          tone(freq * 2.01, at, dur * 0.6, { vol: vol * 0.4, send });
        };

        const noise = (at, dur, o = {}) => {
          const { vol = 0.045, type = 'bandpass', f = 1500, fTo, q = 1, send = 0 } = o;
          const src = ctx.createBufferSource();
          src.buffer = noiseRef.current;
          src.loop = true;
          const filter = ctx.createBiquadFilter();
          filter.type = type;
          filter.Q.value = q;
          filter.frequency.setValueAtTime(f, t0 + at);
          if (fTo) filter.frequency.exponentialRampToValueAtTime(fTo, t0 + at + dur);
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.0001, t0 + at);
          gain.gain.exponentialRampToValueAtTime(vol, t0 + at + Math.min(0.01, dur / 3));
          gain.gain.exponentialRampToValueAtTime(0.0001, t0 + at + dur);
          src.connect(filter);
          filter.connect(gain);
          route(gain, send);
          src.start(t0 + at, Math.random() * 0.4);
          src.stop(t0 + at + dur + 0.03);
        };

        if (kind === 'hover') {
          const now = performance.now();
          if (now - lastHoverRef.current < 80) return;
          lastHoverRef.current = now;
          tone(1320, 0, 0.035, { vol: 0.014 });
        } else if (kind === 'tap') {
          tone(540, 0, 0.07, { type: 'triangle', vol: 0.045, to: 820 });
        } else if (kind === 'back') {
          tone(520, 0, 0.08, { type: 'triangle', vol: 0.04, to: 340 });
        } else if (kind === 'toggle') {
          tone(660, 0, 0.06, { type: 'triangle', vol: 0.045 });
          tone(990, 0.06, 0.09, { type: 'triangle', vol: 0.045 });
        } else if (kind === 'tear') {
          for (let i = 0; i < 5; i += 1) {
            noise(i * 0.04, 0.045, { vol: 0.02, type: 'bandpass', f: 2400 + (i % 2) * 800, q: 1.1 });
          }
          noise(0.22, 0.38, { vol: 0.05, type: 'bandpass', f: 800, fTo: 5800, q: 0.95 });
          tone(190, 0.22, 0.35, { type: 'sawtooth', vol: 0.014, to: 560 });
        } else if (kind === 'pop') {
          tone(240, 0, 0.16, { vol: 0.12, to: 60 });
          [1319, 1760, 2093, 2637].forEach((f, i) => bell(f, 0.04 + i * 0.05, 0.48, 0.038, 0.5));
        } else if (kind === 'correct') {
          const m = Math.pow(2, Math.min(n, 6) / 12);
          [523, 659, 784, 1047].forEach((f, i) => bell(f * m, i * 0.08, 0.4, 0.065, 0.4));
        } else if (kind === 'wrong') {
          tone(196, 0, 0.15, { type: 'square', vol: 0.03, to: 150 });
          tone(147, 0.13, 0.25, { type: 'square', vol: 0.03, to: 98 });
        } else if (kind === 'reward') {
          [659, 784, 988, 1319].forEach((f, i) => bell(f, i * 0.075, 0.42, 0.055, 0.45));
        } else if (kind === 'win') {
          [523, 659, 784, 1047, 1319].forEach((f, i) => bell(f, i * 0.085, 0.42, 0.065, 0.45));
        }
      } catch {
        /* noop */
      }
    },
    [enabled]
  );
}

function useCountUp(target) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start = 0;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / 800);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

function StarRow({ count, size = 22, pop = false }) {
  return (
    <span className={`mg-stars${pop ? ' is-pop' : ''}`} aria-label={`${count} trên 3 sao`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="mg-star" style={{ '--k': i }}>
          <IconStar size={size} on={i < count} />
        </span>
      ))}
    </span>
  );
}

const BagCard = memo(function BagCard({ bag, index, kind, stars, solved, tearing, onOpen, onHover }) {
  const btnRef = useRef(null);

  const handlePointerMove = useCallback(
    (e) => {
      const el = btnRef.current;
      if (!el || tearing) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = ((0.5 - py) * 8).toFixed(2);
      const ry = ((px - 0.5) * 10).toFixed(2);
      el.style.setProperty('--rx', `${rx}deg`);
      el.style.setProperty('--ry', `${ry}deg`);
      el.style.setProperty('--mx', `${Math.round(px * 100)}%`);
      el.style.setProperty('--my', `${Math.round(py * 100)}%`);
    },
    [tearing]
  );

  const handlePointerLeave = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '30%');
  }, []);

  return (
    <button
      ref={btnRef}
      type="button"
      className={`mg-bag${solved ? ' is-solved' : ''}${tearing ? ' is-tearing' : ''}`}
      style={bagVars(bag, index)}
      onClick={() => onOpen(bag.id)}
      onPointerEnter={onHover}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label={
        solved
          ? `${bag.shortName} — đã mở, xem lại phần thưởng`
          : `${bag.shortName} — chạm để xé túi`
      }
    >
      <div className="mg-bag-code">{bag.code}</div>
      {solved ? (
        <div className="mg-bag-tag is-done">
          <IconCheck size={13} /> ĐÃ MỞ
        </div>
      ) : (
        <div className="mg-bag-tag">
          <IconScissors size={13} /> Xé túi
        </div>
      )}
      <div className="mg-bag-art">
        <div className="mg-aura" />
        <div className="mg-float">
          {solved ? <MedalSvg bag={bag} kind={kind} /> : <PouchSvg bag={bag} kind={kind} />}
        </div>
      </div>
      <div className="mg-bag-name">{bag.shortName}</div>
      {solved ? (
        <div className="mg-bag-sub is-reward">
          <StarRow count={stars} size={16} />
        </div>
      ) : (
        <div className="mg-bag-sub">Chạm để mở câu hỏi</div>
      )}
    </button>
  );
});

function Finale({ total, progress, onNext, onReplay, onReview }) {
  const shown = useCountUp(total);
  const rank = getRank(total);
  const ratio = total / MAX_SCORE;
  const tier = ratio >= 0.85 ? 2 : ratio >= 0.6 ? 1 : 0;
  const lit = ratio >= 0.85 ? 3 : ratio >= 0.6 ? 2 : 1;
  return (
    <section className="mg-view mg-finale" data-no-swipe>
      <div className="mg-finale-trophy">
        <TrophySvg tier={tier} lit={lit} />
      </div>
      <div className="mg-finale-info">
        <div className="mg-finale-title">HOÀN THÀNH BÓC TÚI MÙ HÓA HỌC NPK!</div>
        <div className="mg-finale-rank">
          <IconSpark size={16} /> {rank.title} <IconSpark size={16} />
        </div>
        <div className="mg-finale-score">
          <IconCoin size={30} className="mg-finale-coin" /> {shown} <small>/ {MAX_SCORE} XP</small>
        </div>
        <div className="mg-finale-list">
          {BLIND_BAGS.map((b, i) => {
            const p = progress[b.id];
            return (
              <span
                key={b.id}
                className="mg-finale-item"
                style={{ ...bagVars(b, i), '--d': `${0.2 + i * 0.1}s` }}
              >
                <i>
                  <Creature bag={b} kind={KIND_BY_ID[b.id]} />
                </i>
                <span className="mg-finale-item-name">{b.shortName}</span>
                <StarRow count={starsOf(p ? p.wrong.length : 0)} size={13} />
              </span>
            );
          })}
        </div>
        <div className="mg-actions" style={bagVars(BLIND_BAGS[3] || BLIND_BAGS[0])}>
          {onNext && (
            <button type="button" className="mg-btn mg-btn--green" onClick={onNext}>
              Sang Slide 20: Tổng kết <IconArrow size={16} />
            </button>
          )}
          <button type="button" className="mg-btn mg-btn--ghost" onClick={onReview}>
            Xem lại các túi
          </button>
          <button type="button" className="mg-btn mg-btn--ghost" onClick={onReplay}>
            <IconReset size={15} /> Chơi lại
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Slide19MiniGame({ onNext, stage, isLeaving }) {
  const z = (stage && (stage.scale || stage.zoom)) || 1;
  const stageW = (stage && stage.width) || 1280;
  const stageH = (stage && stage.height) || 720;
  const k = Math.max(z, MIN_SCALE);
  const rootZoom = k / z;
  const W = Math.max(280, Math.floor(((stageW - STAGE_PAD_X) * z) / k));
  const H = Math.max(200, Math.floor(((stageH - STAGE_PAD_Y) * z) / k));
  const size = H < 480 ? 'compact' : 'regular';
  const narrow = W < 640;

  const [saved] = useState(loadStore);
  const [progress, setProgress] = useState(() => (saved && saved.progress) || {});
  const [sound, setSound] = useState(() => (saved ? saved.sound : true));
  const [streak, setStreak] = useState(() => (saved ? saved.streak : 0));
  const [view, setView] = useState('pick'); // pick | quiz | reward | finale
  const [activeId, setActiveId] = useState(null);
  const [tearingId, setTearingId] = useState(null);
  const [hint, setHint] = useState(null);
  const [delta, setDelta] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [orders, setOrders] = useState({});
  const ordersRef = useRef(orders);
  const lastPosRef = useRef(-1);
  ordersRef.current = orders;

  const progressRef = useRef(progress);
  const viewRef = useRef(view);
  const activeRef = useRef(activeId);
  const sizeRef = useRef(size);
  const streakRef = useRef(streak);
  const busyRef = useRef(false);
  const timersRef = useRef(new Set());
  const hintTimerRef = useRef(0);
  progressRef.current = progress;
  viewRef.current = view;
  activeRef.current = activeId;
  sizeRef.current = size;
  streakRef.current = streak;

  const sfx = useSfx(sound && !isLeaving);

  const later = useCallback((fn, ms) => {
    const id = setTimeout(() => {
      timersRef.current.delete(id);
      fn();
    }, ms);
    timersRef.current.add(id);
    return id;
  }, []);

  useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current.clear();
    },
    []
  );

  useEffect(() => {
    saveStore({ progress, sound, streak });
  }, [progress, sound, streak]);

  const solvedCount = BLIND_BAGS.filter((b) => progress[b.id] && progress[b.id].solved).length;
  const totalScore = BLIND_BAGS.reduce(
    (sum, b) => sum + (progress[b.id] && progress[b.id].solved ? progress[b.id].score : 0),
    0
  );
  const allSolved = solvedCount === BLIND_BAGS.length;
  const activeBag = activeId ? BAG_BY_ID[activeId] : null;
  const activeKind = activeId ? KIND_BY_ID[activeId] : 'n';
  const activeProg = (activeId && progress[activeId]) || emptyProgress();

  const fire = useCallback(async (opts, base) => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const scale = sizeRef.current === 'compact' ? 0.5 : 0.85;
    try {
      const { default: confetti } = await import('canvas-confetti');
      confetti({
        disableForReducedMotion: true,
        zIndex: 120,
        ticks: 130,
        scalar: 0.9,
        shapes: ['square', 'circle'],
        ...opts,
        particleCount: Math.max(10, Math.round(base * scale))
      });
    } catch {
      /* noop */
    }
  }, []);

  const hoverSfx = useCallback(
    (e) => {
      if (e && e.pointerType && e.pointerType !== 'mouse') return;
      sfx('hover');
    },
    [sfx]
  );

  const backToPick = useCallback(() => {
    clearTimeout(hintTimerRef.current);
    setHint(null);
    setActiveId(null);
    setView('pick');
    sfx('back');
  }, [sfx]);

  const openBag = useCallback(
    (id) => {
      if (busyRef.current) return;
      const bag = BAG_BY_ID[id];
      const p = progressRef.current[id];
      if (p && p.solved) {
        sfx('tap');
        setActiveId(id);
        setView('reward');
        return;
      }
      if (!ordersRef.current[id]) {
        const order = makeOrder(bag, lastPosRef.current);
        lastPosRef.current = order.indexOf(bag.correctIndex);
        ordersRef.current = { ...ordersRef.current, [id]: order };
        setOrders(ordersRef.current);
      }
      busyRef.current = true;
      setTearingId(id);
      sfx('tear');
      buzz([14, 30, 14]);
      later(() => {
        sfx('pop');
        fire(
          {
            spread: 70,
            startVelocity: 34,
            origin: { y: 0.6 },
            colors: [bag.accentColor, '#FDE047', '#FFFFFF']
          },
          42
        );
      }, 410);
      later(() => {
        setTearingId(null);
        setActiveId(id);
        setHint(null);
        setView('quiz');
        busyRef.current = false;
      }, TEAR_MS);
    },
    [sfx, later, fire]
  );

  const handleAnswer = useCallback(
    (idx) => {
      const id = activeRef.current;
      if (!id || viewRef.current !== 'quiz') return;
      const bag = BAG_BY_ID[id];
      const p = progressRef.current[id] || emptyProgress();
      if (p.solved || p.wrong.includes(idx)) return;

      if (idx === bag.correctIndex) {
        const score = potentialOf(p.wrong.length);
        const firstTry = p.wrong.length === 0;
        const nextStreak = firstTry ? streakRef.current + 1 : 0;
        setProgress((prev) => ({ ...prev, [id]: { ...p, solved: true, score } }));
        setStreak(nextStreak);
        setDelta({ key: Date.now(), value: score });
        clearTimeout(hintTimerRef.current);
        setHint(null);
        sfx('correct', nextStreak);
        buzz([25, 40]);
        fire(
          {
            spread: 85,
            startVelocity: 38,
            origin: { y: 0.58 },
            colors: [bag.accentColor, '#7862E8', '#E8A13A', '#16A36A']
          },
          80
        );
        later(() => setDelta(null), 1000);
        later(() => {
          if (viewRef.current === 'quiz' && activeRef.current === id) {
            setView('reward');
            sfx('reward');
          }
        }, 720);
      } else {
        const loss = potentialOf(p.wrong.length) - potentialOf(p.wrong.length + 1);
        setProgress((prev) => ({ ...prev, [id]: { ...p, wrong: [...p.wrong, idx] } }));
        setStreak(0);
        setHint({ key: Date.now(), text: bag.hint, loss });
        sfx('wrong');
        buzz([50, 35]);
        clearTimeout(hintTimerRef.current);
        hintTimerRef.current = later(() => setHint(null), 5000);
      }
    },
    [sfx, later, fire]
  );

  const goFinale = useCallback(() => {
    clearTimeout(hintTimerRef.current);
    setHint(null);
    setActiveId(null);
    setView('finale');
    sfx('win');
    const colors = ['#16A36A', '#7862E8', '#E8A13A', '#174B37'];
    fire({ angle: 60, spread: 65, startVelocity: 48, origin: { x: 0, y: 0.75 }, colors }, 65);
    fire({ angle: 120, spread: 65, startVelocity: 48, origin: { x: 1, y: 0.75 }, colors }, 65);
  }, [sfx, fire]);

  const handleReset = useCallback(() => {
    if (!confirmReset) {
      setConfirmReset(true);
      sfx('tap');
      later(() => setConfirmReset(false), 2600);
      return;
    }
    clearTimeout(hintTimerRef.current);
    busyRef.current = false;
    setConfirmReset(false);
    setOrders({});
    lastPosRef.current = -1;
    setProgress({});
    setStreak(0);
    setHint(null);
    setDelta(null);
    setTearingId(null);
    setActiveId(null);
    setView('pick');
    sfx('back');
  }, [confirmReset, later, sfx]);

  const toggleSound = useCallback(() => {
    setSound((s) => !s);
  }, []);

  const prevSound = useRef(sound);
  useEffect(() => {
    if (sound && !prevSound.current) sfx('toggle');
    prevSound.current = sound;
  }, [sound, sfx]);

  /* ---- Bàn phím: A-D chọn đáp án chỉ khi đang ở màn quiz; Esc quay lại chọn túi ---- */
  useEffect(() => {
    if (isLeaving || (view !== 'quiz' && view !== 'reward' && view !== 'finale')) return undefined;
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      const key = e.key.toLowerCase();
      if (view === 'quiz') {
        const idx = ['a', 'b', 'c', 'd'].indexOf(key);
        if (idx >= 0) {
          e.preventDefault();
          e.stopPropagation();
          const order = ordersRef.current[activeRef.current];
          const orig = order ? order[idx] : idx;
          if (orig !== undefined) handleAnswer(orig);
          return;
        }
      }
      if (key === 'escape') {
        e.preventDefault();
        e.stopPropagation();
        backToPick();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [isLeaving, view, handleAnswer, backToPick]);

  const potential = potentialOf(activeProg.wrong.length);

  return (
    <div
      className="mg-root"
      data-size={size}
      data-narrow={narrow ? '1' : '0'}
      style={{
        width: W,
        height: H,
        transform: rootZoom !== 1 ? `scale(${rootZoom})` : undefined,
        transformOrigin: 'top left'
      }}
      data-no-swipe
    >
      {/* HEADER + HUD */}
      <header className="mg-head">
        <div className="mg-head-main">
          <div className="mg-kicker">
            <IconSpark size={14} /> MINI GAME TƯƠNG TÁC • CỦNG CỐ KIẾN THỨC N–P–K
          </div>
          <h2 className="mg-title">
            <span className="mg-title-ico">
              <IconGift size={26} />
            </span>
            <span>BÓC TÚI MÙ HÓA HỌC NPK</span>
          </h2>
        </div>

        <div className="mg-hud">
          {streak >= 2 && (
            <span key={streak} className="mg-chip mg-chip--streak">
              <IconFlame size={17} className="mg-flame" /> Combo x{streak}
            </span>
          )}
          <span className="mg-chip mg-chip--bags">
            <IconGift size={16} />
            <span className="mg-pips" aria-hidden="true">
              {BLIND_BAGS.map((b) => (
                <i key={b.id} className={progress[b.id] && progress[b.id].solved ? 'is-on' : ''} />
              ))}
            </span>
            <b>
              {solvedCount}/{BLIND_BAGS.length}
            </b>
          </span>
          <span className="mg-chip mg-chip--xp">
            <IconCoin size={17} /> <b key={totalScore}>{totalScore}</b> XP
          </span>
          {delta && (
            <span key={delta.key} className="mg-delta is-up">
              +{delta.value}
            </span>
          )}
          {allSolved && view !== 'finale' && (
            <button type="button" className="mg-chip mg-chip--cta" onClick={goFinale}>
              <IconTrophy size={17} /> Xem cúp
            </button>
          )}
          <button
            type="button"
            className="mg-icon-btn"
            onClick={toggleSound}
            aria-label={sound ? 'Tắt âm thanh' : 'Bật âm thanh'}
            title={sound ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {sound ? <IconVolume size={18} /> : <IconMute size={18} />}
          </button>
          <button
            type="button"
            className={`mg-icon-btn is-reset${confirmReset ? ' is-confirm' : ''}`}
            onClick={handleReset}
            aria-label={confirmReset ? 'Xác nhận chơi lại từ đầu' : 'Chơi lại từ đầu'}
          >
            <IconReset size={15} />
            <span>{confirmReset ? 'Xác nhận xóa điểm?' : 'Chơi lại'}</span>
          </button>
          {onNext && (
            <button
              type="button"
              className="mg-chip mg-chip--cta"
              onClick={onNext}
              title="Chuyển thẳng sang Slide 20: Tổng kết"
            >
              <span>Sang Tổng kết</span>
              <IconArrow size={15} />
            </button>
          )}
        </div>
      </header>

      {/* KHU VỰC CHÍNH */}
      <div className="mg-stage">
        {view === 'pick' && (
          <div className="mg-view mg-pick" key="pick">
            {BLIND_BAGS.map((bag, i) => {
              const p = progress[bag.id];
              return (
                <BagCard
                  key={bag.id}
                  bag={bag}
                  index={i}
                  kind={KIND_BY_ID[bag.id]}
                  stars={starsOf(p ? p.wrong.length : 0)}
                  solved={!!(p && p.solved)}
                  tearing={tearingId === bag.id}
                  onOpen={openBag}
                  onHover={hoverSfx}
                />
              );
            })}
          </div>
        )}

        {view === 'quiz' && activeBag && (
          <section
            className="mg-view mg-quiz"
            key={`quiz-${activeBag.id}`}
            style={bagVars(activeBag)}
            data-no-swipe
          >
            <aside className="mg-quiz-side">
              <div className="mg-quiz-medal">
                <MedalSvg bag={activeBag} kind={activeKind} />
              </div>
              <div className="mg-quiz-side-name">{activeBag.name}</div>
              <div className="mg-quiz-side-reward">Phần thưởng: {activeBag.rewardTitle}</div>
            </aside>

            <div className="mg-quiz-main">
              <div className="mg-qhead">
                <button
                  type="button"
                  className="mg-back"
                  onClick={backToPick}
                  aria-label="Quay lại chọn túi khác (Esc)"
                >
                  <IconBack size={16} /> Chọn túi khác
                </button>
                {hint ? (
                  <div className="mg-hint" key={hint.key} role="status" aria-live="polite">
                    <IconBulb size={20} />
                    <span>
                      Chưa chính xác{hint.loss > 0 ? ` (−${hint.loss} XP)` : ''}! {hint.text}
                    </span>
                  </div>
                ) : (
                  <div className="mg-qtitle">
                    <span className="mg-qtitle-emoji">
                      <Creature bag={activeBag} kind={activeKind} />
                    </span>
                    <div className="mg-qtitle-text">
                      <div className="mg-qtitle-name">{activeBag.name}</div>
                      <div className="mg-qtitle-sub">Phím tắt trả lời: A · B · C · D (Esc để quay lại)</div>
                    </div>
                  </div>
                )}
                <span className="mg-xp-tag" key={potential}>
                  <IconCoin size={15} /> +{potential} XP
                </span>
              </div>

              <div className="mg-question">
                <em>CÂU HỎI</em>
                {activeBag.question}
              </div>

              <div className="mg-options" role="group" aria-label="Các đáp án">
                {(orders[activeBag.id] || activeBag.options.map((_, i) => i)).map((idx, pos) => {
                  const option = activeBag.options[idx];
                  const isWrong = activeProg.wrong.includes(idx);
                  const isRight = activeProg.solved && idx === activeBag.correctIndex;
                  const cls = `mg-opt${isWrong ? ' is-wrong' : ''}${isRight ? ' is-right' : ''}${
                    activeProg.solved && !isRight ? ' is-dim' : ''
                  }`;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={cls}
                      disabled={activeProg.solved || isWrong}
                      onClick={() => handleAnswer(idx)}
                      onPointerEnter={hoverSfx}
                    >
                      <span className="mg-opt-key">{LETTERS[pos]}</span>
                      <span className="mg-opt-text">{option}</span>
                      {isRight && <IconCheck size={22} className="mg-opt-ico" />}
                      {isWrong && <IconCross size={22} className="mg-opt-ico" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {view === 'reward' && activeBag && (
          <section
            className="mg-view mg-reward"
            key={`reward-${activeBag.id}`}
            style={bagVars(activeBag)}
            data-no-swipe
          >
            <div className="mg-reward-art">
              <div className="mg-rays" />
              <div className="mg-reward-medal">
                <MedalSvg bag={activeBag} kind={activeKind} />
              </div>
              <span className="mg-orbit mg-orbit--a">
                <IconSpark size={20} />
              </span>
              <span className="mg-orbit mg-orbit--b">
                <IconSpark size={14} />
              </span>
              <span className="mg-orbit mg-orbit--c">
                <IconSpark size={16} />
              </span>
            </div>
            <div className="mg-reward-body">
              <div className="mg-ok">
                <IconParty size={30} />
                <span>CHÍNH XÁC!</span>
                <span className="mg-gain">
                  <IconCoin size={16} /> +{activeProg.score} XP
                </span>
                <StarRow count={starsOf(activeProg.wrong.length)} size={24} pop />
              </div>
              <div className="mg-reward-title">
                <span className="mg-reward-pet">
                  <Creature bag={activeBag} kind={activeKind} />
                </span>
                {activeBag.rewardTitle}
              </div>
              <div className="mg-reward-desc">{activeBag.rewardDesc}</div>
              <div className="mg-explain">
                <b>Giải thích khoa học:</b> {activeBag.options[activeBag.correctIndex]}.{' '}
                {activeBag.explanation}
              </div>
              <div className="mg-actions">
                {allSolved ? (
                  <>
                    <button type="button" className="mg-btn mg-btn--green" onClick={goFinale}>
                      <IconTrophy size={18} /> Xem tổng kết điểm
                    </button>
                    <button type="button" className="mg-btn mg-btn--ghost" onClick={backToPick}>
                      Xem các túi
                    </button>
                  </>
                ) : (
                  <button type="button" className="mg-btn" onClick={backToPick}>
                    Chọn túi tiếp theo <IconArrow size={16} />
                  </button>
                )}
                {onNext && (
                  <button type="button" className="mg-btn mg-btn--ghost" onClick={onNext}>
                    Sang Slide 20: Tổng kết <IconArrow size={15} />
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {view === 'finale' && (
          <Finale
            key="finale"
            total={totalScore}
            progress={progress}
            onNext={onNext}
            onReview={backToPick}
            onReplay={() => {
              setProgress({});
              setOrders({});
              lastPosRef.current = -1;
              setStreak(0);
              setActiveId(null);
              setView('pick');
              sfx('tap');
            }}
          />
        )}
      </div>
    </div>
  );
}
