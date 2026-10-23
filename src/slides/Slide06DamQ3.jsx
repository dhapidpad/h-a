import React, { useState } from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgGasLoss from '../components/illustrations/SvgGasLoss';

const LOSS_CARDS = [
  {
    id: 'hydrolysis',
    number: '01',
    tag: 'THỦY PHÂN',
    title: 'CƠ CHẾ THỦY PHÂN URÊ TRONG ĐẤT',
    equation: 'CO(NH₂)₂ + 2H₂O ⟶ (NH₄)₂CO₃',
    desc: 'Dưới tác dụng của men Urease do vi sinh vật đất tiết ra, Urê chuyển thành amoni cacbonat tan trong nước, phân li ra ion NH₄⁺ để rễ cây trực tiếp hấp thu nuôi lá.',
    accent: '#0284C7',
    accentLight: '#E0F2FE',
    accentDark: '#0369A1'
  },
  {
    id: 'lime',
    number: '02',
    tag: 'MẤT NH₃↑',
    title: 'BỐC HƠI KHI GẶP ĐẤT KIỀM / TRỘN CHUNG VỚI VÔI',
    equation: 'NH₄⁺ + OH⁻ ⟶ NH₃↑ + H₂O',
    desc: 'Gốc OH⁻ của vôi kiềm đẩy NH₄⁺ thành khí Amoniac (NH₃) bay hơi vào không khí. Bón đạm gặp vôi hoặc phơi nắng mặt ruộng có thể làm thất thoát 30% – 50% lượng đạm!',
    accent: '#EF4444',
    accentLight: '#FEE2E2',
    accentDark: '#B91C1C'
  },
  {
    id: 'leaching',
    number: '03',
    tag: 'RỬA TRÔI',
    title: 'RỬA TRÔI TẦNG NƯỚC NGẦM & PHÚ DƯỠNG',
    equation: 'NO₃⁻ không bị keo đất giữ',
    desc: 'Ion Nitrat mang điện tích âm (-) không bám được vào hạt keo đất (-). Khi gặp mưa to hay tưới tràn, NO₃⁻ bị cuốn trôi xuống mạch nước ngầm gây phú dưỡng ao hồ.',
    accent: '#F59E0B',
    accentLight: '#FEF3C7',
    accentDark: '#B45309'
  }
];

export default function Slide06DamQ3({ onOpenNotes }) {
  const [activeCard, setActiveCard] = useState('lime');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}>
            <span style={{ fontSize: 13, fontWeight: 900 }}>PHÂN ĐẠM (N) • CÂU HỎI 03 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            CƠ CHẾ CHUYỂN HÓA &amp; NGUY CƠ THẤT THOÁT ĐẠM
          </h2>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#0F172A',
          padding: '6px 14px',
          borderRadius: 12,
          border: '1px solid #334155'
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#EF4444',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 12
          }}>
            NH₃↑
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#FCA5A5' }}>TƯƠNG KỴ HÓA HỌC</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>NH₄⁺ + OH⁻ ⟶ NH₃↑ + H₂O</div>
          </div>
        </div>
      </div>

      {/* Banner câu hỏi thảo luận */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1.5px solid #FCA5A5',
        borderRadius: 14,
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 4px 14px rgba(239, 68, 68, 0.07)'
      }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: '#FEE2E2',
          color: '#DC2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontWeight: 900,
          fontSize: 15
        }}>
          ?
        </div>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: '#0F172A', lineHeight: 1.4 }}>
          <span style={{ color: '#DC2626', fontWeight: 900 }}>Câu hỏi thảo luận: </span>
          Urê chuyển hóa trong đất như thế nào? Tại sao bón phân đạm rải mặt khi nắng gắt hoặc bón trên đất kiềm/bón chung với vôi lại gây bốc hơi mất đạm?
        </div>
      </div>

      {/* Grid 2 cột */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(440px, 1.05fr) minmax(460px, 1.15fr)', 
        gap: 16, 
        flex: 1, 
        minHeight: 0,
        alignItems: 'stretch'
      }}>
        {/* Cột trái */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 9, 
          justifyContent: 'flex-start',
          minHeight: 0,
          overflowY: 'auto',
          paddingRight: 5
        }}>
          {LOSS_CARDS.map((card) => {
            const isSelected = activeCard === card.id;
            return (
              <div
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                style={{
                  background: isSelected ? 'rgba(255, 255, 255, 0.99)' : 'rgba(255, 255, 255, 0.92)',
                  borderRadius: 14,
                  padding: '11px 16px',
                  borderLeft: `5px solid ${card.accent}`,
                  borderTop: `1px solid ${isSelected ? card.accent : '#E2E8F0'}`,
                  borderRight: `1px solid ${isSelected ? card.accent : '#E2E8F0'}`,
                  borderBottom: `1px solid ${isSelected ? card.accent : '#E2E8F0'}`,
                  boxShadow: isSelected ? '0 8px 20px rgba(15, 23, 42, 0.08)' : '0 2px 8px rgba(15, 23, 42, 0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start'
                }}
              >
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 11,
                  background: card.accentLight,
                  color: card.accentDark,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: 16,
                  flexShrink: 0
                }}>
                  {card.number}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginBottom: 3 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: card.accentDark }}>
                      {card.title}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 900, background: card.accentLight, color: card.accentDark, padding: '2px 8px', borderRadius: 6, flexShrink: 0 }}>
                      {card.tag}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: card.accent, marginBottom: 3 }}>
                    Phản ứng: {card.equation}
                  </div>
                  <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                    {card.desc}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Kỹ thuật chuẩn */}
          <div style={{
            background: '#F0FDF4',
            borderRadius: 12,
            padding: '9px 14px',
            border: '1.5px dashed #22C55E',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 13,
            color: '#15803D'
          }}>
            <div style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: '#DCFCE7',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontWeight: 900,
              fontSize: 11
            }}>
              MẸO
            </div>
            <span>
              <strong>Kỹ thuật chống mất đạm:</strong> Bón vùi sâu <strong>5 – 7 cm</strong> rồi lấp đất kín ngay; không bón đạm lúc trời nắng gắt hay cùng lúc với bón vôi khử chua (nên cách nhau 15–20 ngày).
            </span>
          </div>

          {/* Linh thú Bé Đạm */}
          <CuteMascot
            variant="banner"
            mascotType="SPROUTY_N"
            emotion={activeCard === 'lime' ? 'shocked' : 'teacher'}
            speech={
              activeCard === 'lime'
                ? "Ối dồi ôi! Gặp vôi bột là tớ biến thành khí NH₃ bay mất lên mây liền, phí tiền của bà con lắm đó! 😱"
                : "Hãy vùi sâu tớ xuống đất rồi tưới ẩm nhẹ nhàng, rễ cây sẽ hút trọn vẹn 100% nha! 🌱✨"
            }
            size={52}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: 22,
          border: '1.5px solid #FCA5A5',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          minHeight: 0
        }}>
          <SvgGasLoss />
        </div>
      </div>
    </div>
  );
}
