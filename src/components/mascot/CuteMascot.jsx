import React, { useState } from 'react';
import LinhThuDam from './LinhThuDam';
import LinhThuLan from './LinhThuLan';
import LinhThuKali from './LinhThuKali';

export { LinhThuDam, LinhThuLan, LinhThuKali };

/**
 * CuteMascot: Bộ ba Linh Thú N-P-K Chibi tương tác
 * Đồng bộ bảng màu token (Mục 6.2) và bỏ transition: all (Mục 7.4)
 */
export default function CuteMascot({
  mascotType = 'SPROUTY_N',
  chapterId,
  emotion = 'happy',
  speech = '',
  speechText = '',
  size,
  onClick,
  style = {},
  variant = 'floating', // 'floating' | 'banner' | 'card'
}) {
  const [hovered, setHovered] = useState(false);
  const [speechVisible, setSpeechVisible] = useState(true);

  const finalType = chapterId || mascotType;
  const isDam = finalType === 'SPROUTY_N' || finalType === 'DAM';
  const isLan = finalType === 'SPARKY_P' || finalType === 'LAN';
  const isKali = finalType === 'SUNNY_K' || finalType === 'KALI';

  const finalSpeech = speech || speechText;

  const theme = isDam
    ? {
        border: 'var(--n-line)',
        borderSolid: 'var(--n-main)',
        badgeBg: 'linear-gradient(135deg, var(--n-main), var(--n-deep))',
        cardBg: 'linear-gradient(135deg, #FFFFFF 0%, var(--n-soft) 100%)',
        name: '🌱 Bé Đạm • Sprouty N',
        shortName: '🌱 BÉ ĐẠM NHẮC BẠN',
        textColor: 'var(--n-deep)',
        glow: 'var(--n-glow)',
      }
    : isLan
    ? {
        border: 'var(--p-line)',
        borderSolid: 'var(--p-main)',
        badgeBg: 'linear-gradient(135deg, var(--p-main), var(--p-deep))',
        cardBg: 'linear-gradient(135deg, #FFFFFF 0%, var(--p-soft) 100%)',
        name: '⚡ Bé Lân • Sparky P',
        shortName: '⚡ BÉ LÂN NHẮC BẠN',
        textColor: 'var(--p-deep)',
        glow: 'var(--p-glow)',
      }
    : {
        border: 'var(--k-line)',
        borderSolid: 'var(--k-main)',
        badgeBg: 'linear-gradient(135deg, var(--k-main), var(--k-deep))',
        cardBg: 'linear-gradient(135deg, #FFFFFF 0%, var(--k-soft) 100%)',
        name: '🍊 Bé Kali • Sunny K',
        shortName: '🍊 BÉ KALI NHẮC BẠN',
        textColor: 'var(--k-deep)',
        glow: 'var(--k-glow)',
      };

  const defaultSize = variant === 'banner' || variant === 'card' ? 56 : 96;
  const avatarSize = size || defaultSize;

  const renderAvatar = (sz) => (
    <div style={{ width: sz, height: sz, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isDam && <LinhThuDam emotion={emotion} size={sz} />}
      {isLan && <LinhThuLan emotion={emotion} size={sz} />}
      {isKali && <LinhThuKali emotion={emotion} size={sz} />}
    </div>
  );

  if (variant === 'banner' || variant === 'card') {
    return (
      <div
        className="mascot-companion-banner"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title="Bấm vào để mở sổ tay bài giảng (Phím N) 💡"
        style={{
          background: theme.cardBg,
          border: `1.5px solid ${theme.border}`,
          borderRadius: 15,
          padding: '7px 13px',
          boxShadow: hovered ? `0 8px 20px -6px ${theme.glow}` : `0 4px 12px -4px ${theme.glow}`,
          display: 'flex',
          alignItems: 'center',
          gap: 11,
          cursor: 'pointer',
          userSelect: 'none',
          transform: hovered ? 'translateY(-1.5px)' : 'translateY(0)',
          ...style,
        }}
      >
        {renderAvatar(avatarSize)}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
            <span
              style={{
                background: theme.badgeBg,
                color: '#FFFFFF',
                fontSize: 10.5,
                fontWeight: 900,
                padding: '2px 8px',
                borderRadius: 999,
                letterSpacing: '0.03em',
              }}
            >
              {theme.shortName}
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: theme.textColor, opacity: 0.9 }}>
              Mở sổ tay bài giảng (N) 💡
            </span>
          </div>
          {finalSpeech && (
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--ink)',
                lineHeight: 1.35,
              }}
            >
              {finalSpeech}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="mascot-companion-wrap"
      style={{
        position: 'absolute',
        bottom: 12,
        right: 28,
        zIndex: 40,
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        ...style,
      }}
    >
      {finalSpeech && speechVisible && (
        <div
          className="mascot-speech-bubble"
          style={{
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.98)',
            border: `2px solid ${theme.borderSolid}`,
            borderRadius: 18,
            padding: '10px 14px',
            marginBottom: 8,
            maxWidth: 270,
            boxShadow: `0 10px 25px ${theme.glow}`,
            transform: hovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
            transition: 'transform 0.22s var(--ease-out), box-shadow 0.22s var(--ease-out)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div
              style={{
                display: 'inline-block',
                background: theme.badgeBg,
                color: '#FFFFFF',
                fontSize: 10,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 999,
                letterSpacing: '0.03em',
              }}
            >
              {theme.name}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSpeechVisible(false);
              }}
              title="Thu nhỏ lời thoại để xem rõ đồ thị"
              style={{
                border: 'none',
                background: 'rgba(11, 18, 32, 0.08)',
                color: '#64748B',
                width: 18,
                height: 18,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                cursor: 'pointer',
                padding: 0,
                marginLeft: 6,
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          <div
            onClick={onClick}
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1.4,
              cursor: onClick ? 'pointer' : 'default',
            }}
          >
            {finalSpeech}
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: -7,
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: 12,
              height: 12,
              background: '#FFFFFF',
              borderRight: `2px solid ${theme.borderSolid}`,
              borderBottom: `2px solid ${theme.borderSolid}`,
            }}
          />
        </div>
      )}

      {finalSpeech && !speechVisible && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSpeechVisible(true);
          }}
          style={{
            border: `1.5px solid ${theme.borderSolid}`,
            background: '#FFFFFF',
            color: theme.textColor,
            padding: '3px 10px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 800,
            marginBottom: 6,
            cursor: 'pointer',
            boxShadow: `0 4px 12px ${theme.glow}`,
          }}
        >
          💬 Xem lời thoại
        </button>
      )}

      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title="Bấm vào để mở ghi chú bài giảng cùng tớ nè!"
        style={{ cursor: 'pointer' }}
      >
        {renderAvatar(avatarSize)}
      </div>
    </div>
  );
}
