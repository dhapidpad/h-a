import React, { useState } from 'react';
import LinhThuDam from './LinhThuDam';
import LinhThuLan from './LinhThuLan';
import LinhThuKali from './LinhThuKali';

export { LinhThuDam, LinhThuLan, LinhThuKali };

/**
 * CuteMascot: Bộ ba Linh Thú N-P-K Chibi tương tác siêu dễ thương
 * - Bé Đạm (LinhThuDam / Sprouty N)
 * - Bé Lân (LinhThuLan / Sparky P)
 * - Bé Kali (LinhThuKali / Sunny K)
 * 
 * Hỗ trợ 2 chế độ:
 * - variant="banner": Tích hợp gọn gàng trong cột nội dung (KHÔNG BAO GIỜ CHE ĐỒ THỊ)
 * - variant="floating": Nổi góc với nút thu nhỏ/mở rộng để không che nội dung
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
        border: '#86EFAC',
        borderSolid: '#22C55E',
        badgeBg: 'linear-gradient(135deg, #22C55E, #15803D)',
        cardBg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 253, 244, 0.96) 100%)',
        name: '🌱 Bé Đạm • Sprouty N',
        shortName: '🌱 BÉ ĐẠM NHẮC BẠN',
        textColor: '#14532D',
        glow: 'rgba(34, 197, 94, 0.16)',
      }
    : isLan
    ? {
        border: '#C4B5FD',
        borderSolid: '#8B5CF6',
        badgeBg: 'linear-gradient(135deg, #8B5CF6, #5B21B6)',
        cardBg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 243, 255, 0.96) 100%)',
        name: '⚡ Bé Lân • Sparky P',
        shortName: '⚡ BÉ LÂN NHẮC BẠN',
        textColor: '#581C87',
        glow: 'rgba(139, 92, 246, 0.16)',
      }
    : {
        border: '#FDE68A',
        borderSolid: '#F59E0B',
        badgeBg: 'linear-gradient(135deg, #F59E0B, #B45309)',
        cardBg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 243, 199, 0.96) 100%)',
        name: '🍊 Bé Kali • Sunny K',
        shortName: '🍊 BÉ KALI NHẮC BẠN',
        textColor: '#78350F',
        glow: 'rgba(245, 158, 11, 0.16)',
      };

  const defaultSize = variant === 'banner' || variant === 'card' ? 60 : 100;
  const avatarSize = size || defaultSize;

  // Render Mascot Avatar Icon
  const renderAvatar = (sz) => (
    <div style={{ width: sz, height: sz, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isDam && <LinhThuDam emotion={emotion} size={sz} />}
      {isLan && <LinhThuLan emotion={emotion} size={sz} />}
      {isKali && <LinhThuKali emotion={emotion} size={sz} />}
    </div>
  );

  // 1. Chế độ Banner / Card: Đặt gọn trong luồng nội dung, 100% KHÔNG CHE BẤT CỨ GÌ
  if (variant === 'banner' || variant === 'card') {
    return (
      <div
        className="mascot-companion-banner"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title="Bấm vào để mở sổ tay bài giảng 💡"
        style={{
          background: theme.cardBg,
          border: `1.5px solid ${theme.border}`,
          borderRadius: 16,
          padding: '8px 14px',
          boxShadow: hovered ? `0 8px 24px ${theme.glow}` : `0 4px 14px ${theme.glow}`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
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
                fontSize: 10,
                fontWeight: 900,
                padding: '2px 8px',
                borderRadius: 999,
                letterSpacing: '0.03em',
              }}
            >
              {theme.shortName}
            </span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: theme.textColor, opacity: 0.85 }}>
              Mở sổ tay bài giảng 💡
            </span>
          </div>
          {finalSpeech && (
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#0F172A',
                lineHeight: 1.38,
              }}
            >
              {finalSpeech}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. Chế độ Floating (Nổi góc): Có nút thu nhỏ/mở rộng để người học không bị che khuất
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
            transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
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

            {/* Nút thu nhỏ lời thoại để không che đồ thị */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSpeechVisible(false);
              }}
              title="Thu nhỏ lời thoại để xem rõ đồ thị"
              style={{
                border: 'none',
                background: 'rgba(15, 23, 42, 0.08)',
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
              fontSize: 12.2,
              fontWeight: 700,
              color: '#0F172A',
              lineHeight: 1.4,
              cursor: onClick ? 'pointer' : 'default',
            }}
          >
            {finalSpeech}
          </div>

          {/* Đuôi bong bóng thoại */}
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

      {/* Nút nhỏ mở lại lời thoại nếu đã thu nhỏ */}
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
            fontSize: 10.5,
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
