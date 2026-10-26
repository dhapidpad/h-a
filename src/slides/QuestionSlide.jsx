import React, { useState } from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgStageCard from '../components/SvgStageCard';

/**
 * QuestionSlide — Khung dùng chung cho 15 slide câu hỏi (Slide 04 -> Slide 18)
 * Tuân thủ Mục 3.3, 3.4, 4 của Master Spec:
 * - Tương tác bằng thẻ <button> hỗ trợ bàn phím + aria-pressed
 * - Không cắt nội dung cốt lõi bằng ellipsis
 * - Bố cục 2 cột rõ ràng trên TV 16:9
 */
const TONE_MAP = {
  chapter: {
    accent: 'var(--c-main)',
    soft: 'var(--c-tint)',
    deep: 'var(--c-deep)'
  },
  green: {
    accent: 'var(--n-main)',
    soft: 'var(--n-tint)',
    deep: 'var(--n-deep)'
  },
  purple: {
    accent: 'var(--p-main)',
    soft: 'var(--p-tint)',
    deep: 'var(--p-deep)'
  },
  amber: {
    accent: 'var(--k-main)',
    soft: 'var(--k-tint)',
    deep: 'var(--k-deep)'
  },
  blue: {
    accent: 'var(--water)',
    soft: 'var(--water-tint)',
    deep: 'var(--water-deep)'
  },
  red: {
    accent: 'var(--danger)',
    soft: 'var(--danger-tint)',
    deep: 'var(--danger-deep)'
  },
  slate: {
    accent: '#52645A',
    soft: '#EBF0EC',
    deep: '#1C2923'
  }
};

export default function QuestionSlide({
  chapter = 'dam',
  pillText,
  title,
  badgeIcon,
  badgeSub,
  badgeMain,
  question,
  questionLabel = 'Thông điệp chính:',
  questionChips = [],
  pillars = [],
  activeCardId,
  onSelectCard,
  customBottomCard,
  note,
  mascot,
  svgCard,
  children,
  onOpenNotes
}) {
  const [internalActive, setInternalActive] = useState(pillars[0]?.id || null);
  const currentActive = activeCardId !== undefined ? activeCardId : internalActive;

  const handleCardClick = (id) => {
    if (onSelectCard) onSelectCard(id);
    else setInternalActive(id);
  };

  return (
    <div className={`q-slide chapter-${chapter}`} data-chapter={chapter}>
      <header className="q-header">
        <div className="q-header-top">
          <div className="q-header-titles">
            <div className="chapter-pill">
              <span>{pillText}</span>
            </div>
            <h2 className="slide-title">{title}</h2>
          </div>

          <div className="slide-header-badge">
            <div
              className="slide-header-badge-icon"
              style={badgeIcon?.bg ? { background: badgeIcon.bg } : undefined}
            >
              {badgeIcon?.text || badgeIcon}
            </div>
            <div className="slide-header-badge-text">
              <div className="slide-header-badge-sub">{badgeSub}</div>
              <div className="slide-header-badge-main">{badgeMain}</div>
            </div>
          </div>
        </div>

        {question && (
          <div className="q-question-strip">
            <div className="q-question-strip-main">
              <span className="q-question-qmark">✦</span>
              <span className="q-question-label">{questionLabel}</span>
              <span className="q-question-text">{question}</span>
            </div>
            {questionChips.length > 0 && (
              <div className="q-question-chips">
                {questionChips.map((chip, idx) => {
                  const t = TONE_MAP[chip.tone || 'chapter'] || TONE_MAP.chapter;
                  return (
                    <span
                      key={idx}
                      style={{
                        background: t.soft,
                        color: t.deep,
                        padding: '2px 9px',
                        borderRadius: 999,
                        fontSize: 12.5,
                        fontWeight: 800
                      }}
                    >
                      {chip.label}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </header>

      <div className="slide-main-grid">
        <div className="slide-content-col reveal">
          {pillars.map((item, idx) => {
            const tone = TONE_MAP[item.tone || 'chapter'] || TONE_MAP.chapter;
            const isSelected = currentActive === item.id;
            return (
              <button
                type="button"
                key={item.id || idx}
                aria-pressed={isSelected}
                style={{
                  '--i': idx,
                  '--card-accent': tone.accent,
                  '--card-soft': tone.soft,
                  '--card-deep': tone.deep
                }}
                onClick={() => handleCardClick(item.id)}
                className={`pillar-card is-interactive${isSelected ? ' is-active' : ''}`}
              >
                <div className="pillar-num">{item.number || String(idx + 1).padStart(2, '0')}</div>
                <div className="pillar-body">
                  <div className="pillar-head">
                    <span className="pillar-title">{item.title}</span>
                    {item.badge && <span className="pillar-badge">{item.badge}</span>}
                  </div>
                  {item.equation && (
                    <div
                      style={{
                        fontSize: 13.5,
                        fontWeight: 800,
                        color: tone.deep,
                        marginBottom: 3
                      }}
                    >
                      {item.equation}
                    </div>
                  )}
                  <div className="pillar-desc">{item.desc}</div>
                </div>
              </button>
            );
          })}

          {customBottomCard ? (
            <div style={{ '--i': pillars.length }}>{customBottomCard}</div>
          ) : (
            note && (
              <div className="practical-note-box" style={{ '--i': pillars.length }}>
                <div className="practical-note-tag">{note.tag || 'LƯU Ý'}</div>
                <span>
                  {note.title && <strong>{note.title} </strong>}
                  {note.text}
                </span>
              </div>
            )
          )}

          {mascot && (
            <div style={{ '--i': pillars.length + 1 }}>
              <CuteMascot
                variant="banner"
                mascotType={mascot.mascotType}
                emotion={mascot.emotion}
                speech={mascot.speech}
                size={44}
                onClick={onOpenNotes}
              />
            </div>
          )}
        </div>

        <SvgStageCard
          title={svgCard.title}
          subtitle={svgCard.subtitle}
          chapter={chapter}
          badge={svgCard.badge}
          takeaway={svgCard.takeaway}
        >
          {children}
        </SvgStageCard>
      </div>
    </div>
  );
}
