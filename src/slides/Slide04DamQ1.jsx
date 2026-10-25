import React, { useState } from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgStageCard from '../components/SvgStageCard';
import SvgChlorophyllFactory from '../components/illustrations/SvgChlorophyllFactory';

const PILLARS = [
  {
    id: 'chloroplast',
    number: '01',
    badge: 'DIỆP LỤC',
    title: 'ĐỘNG CƠ QUANG HỢP — TẠO NĂNG LƯỢNG',
    formula: 'C₅₅H₇₂O₅N₄Mg',
    desc: 'Nitơ là nguyên tử trung tâm xây dựng phân tử Diệp Lục (Chlorophyll a & b). Thiếu N, lá mất màu xanh, quang hợp đình trệ, cây không tạo được tinh bột và suy kiệt năng lượng.',
    accent: '#16A34A',
    accentLight: '#DCFCE7',
    accentDark: '#14532D',
    accentBorder: '#86EFAC'
  },
  {
    id: 'ions',
    number: '02',
    badge: 'ION HẤP THỤ',
    title: '2 DẠNG ION RỄ CÂY TRỰC TIẾP HÚT',
    formula: 'NH₄⁺ & NO₃⁻',
    desc: 'Cây hoàn toàn KHÔNG THỂ hấp thụ khí N₂ từ khí quyển. Bộ rễ chỉ hút được Nitơ khoáng hòa tan ở 2 dạng ion: Amoni (NH₄⁺) và Nitrat (NO₃⁻) qua dung dịch đất.',
    accent: '#0284C7',
    accentLight: '#E0F2FE',
    accentDark: '#0369A1',
    accentBorder: '#7DD3FC'
  },
  {
    id: 'protein',
    number: '03',
    badge: 'SINH KHỐI',
    title: 'XÂY DỰNG PROTEIN & BỘ GEN DI TRUYỀN',
    formula: 'Axit Amin / ADN',
    desc: 'Nitơ cấu thành 20 loại Axit Amin để tổng hợp toàn bộ Protein thực vật, đồng thời là thành phần của các bazơ nitơ trong ADN/ARN điều khiển sinh trưởng và nhân đôi tế bào.',
    accent: '#7C3AED',
    accentLight: '#EDE9FE',
    accentDark: '#5B21B6',
    accentBorder: '#C4B5FD'
  }
];

export default function Slide04DamQ1({ onOpenNotes }) {
  const [activeCard, setActiveCard] = useState('chloroplast');
  const [diagMode, setDiagMode] = useState('deficiency');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}>
            <span style={{ fontSize: 14, fontWeight: 900 }}>PHÂN ĐẠM (N) • CÂU HỎI 01 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            NITƠ (N) — ĐỘNG CƠ CỦA MÀU XANH &amp; SINH KHỐI
          </h2>
        </div>

        {/* Huy hiệu Độ đạm chuẩn */}
        <div className="slide-header-badge">
          <div className="slide-header-badge-icon" style={{ background: 'linear-gradient(135deg, #22C55E 0%, #15803D 100%)' }}>
            N
          </div>
          <div className="slide-header-badge-text">
            <div className="slide-header-badge-sub" style={{ color: '#4ADE80' }}>ĐỘ ĐẠM TIÊU CHUẨN</div>
            <div className="slide-header-badge-main">Đo bằng <span style={{ color: '#38BDF8', fontWeight: 900 }}>%N khối lượng</span></div>
          </div>
        </div>
      </div>

      {/* Banner câu hỏi thảo luận */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1.5px solid #86EFAC',
        borderRadius: 14,
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
        boxShadow: '0 4px 14px rgba(22, 163, 74, 0.07)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: '#DCFCE7',
            color: '#15803D',
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
            <span style={{ color: '#15803D', fontWeight: 900 }}>Câu hỏi thảo luận: </span>
            Phân đạm cung cấp nguyên tố gì? Vai trò cốt lõi của Nitơ với màu xanh sinh khối và 2 dạng ion mà rễ cây trực tiếp hấp thụ?
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <span style={{ background: '#EDE9FE', color: '#6D28D9', padding: '3px 10px', borderRadius: 999, fontSize: 13.5, fontWeight: 900 }}>
            NH₄⁺ Amoni
          </span>
          <span style={{ background: '#E0F2FE', color: '#0284C7', padding: '3px 10px', borderRadius: 999, fontSize: 13.5, fontWeight: 900 }}>
            NO₃⁻ Nitrat
          </span>
        </div>
      </div>

      {/* Grid 2 cột */}
      <div className="slide-main-grid">
        {/* Cột trái */}
        <div className="slide-content-col">
          {PILLARS.map((item) => {
            const isSelected = activeCard === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveCard(item.id)}
                style={{
                  background: isSelected ? 'rgba(255, 255, 255, 0.99)' : 'rgba(255, 255, 255, 0.92)',
                  borderRadius: 14,
                  padding: '9px 14px',
                  borderLeft: `5px solid ${item.accent}`,
                  borderTop: `1px solid ${isSelected ? item.accentBorder : '#E2E8F0'}`,
                  borderRight: `1px solid ${isSelected ? item.accentBorder : '#E2E8F0'}`,
                  borderBottom: `1px solid ${isSelected ? item.accentBorder : '#E2E8F0'}`,
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
                  background: item.accentLight,
                  color: item.accentDark,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: 16,
                  flexShrink: 0
                }}>
                  {item.number}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginBottom: 3 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: item.accentDark }}>
                      {item.title}
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 900, background: item.accentLight, color: item.accentDark, padding: '2px 8px', borderRadius: 6 }}>
                      {item.formula}
                    </span>
                  </div>
                  <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Chẩn đoán đồng ruộng */}
          <div style={{
            background: diagMode === 'deficiency' ? '#FFFBEB' : diagMode === 'excess' ? '#FEF2F2' : '#F0FDF4',
            borderRadius: 14,
            padding: '10px 16px',
            border: `1.5px solid ${diagMode === 'deficiency' ? '#F59E0B' : diagMode === 'excess' ? '#EF4444' : '#22C55E'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 6
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#0F172A' }}>
                CHẨN ĐOÁN THỰC TIỄN ĐỒNG RUỘNG:
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[
                  { key: 'deficiency', label: 'Thiếu Đạm' },
                  { key: 'optimal', label: 'Đủ Đạm' },
                  { key: 'excess', label: 'Thừa Đạm' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setDiagMode(tab.key)}
                    style={{
                      border: 'none',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontSize: 13,
                      fontWeight: 800,
                      cursor: 'pointer',
                      background: diagMode === tab.key ? '#0F172A' : '#FFFFFF',
                      color: diagMode === tab.key ? '#FFFFFF' : '#334155',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.45 }}>
              {diagMode === 'deficiency' && (
                <>
                  <strong style={{ color: '#B45309' }}>Triệu chứng thiếu N:</strong> Lá già ở gốc vàng úa trước theo hình chữ V từ chóp vào gân lá (do Nitơ di động cao rút từ lá già lên nuôi lá non), cây còi cọc đẻ nhánh kém.
                </>
              )}
              {diagMode === 'optimal' && (
                <>
                  <strong style={{ color: '#15803D' }}>Cân đối N:</strong> Bộ lá xanh mướt dày dặn, quang hợp sung sức, thân cành vươn khỏe, đâm chồi nhánh đồng loạt và tích lũy sinh khối vượt trội.
                </>
              )}
              {diagMode === 'excess' && (
                <>
                  <strong style={{ color: '#B91C1C' }}>Hệ lụy thừa N:</strong> Lá xanh đen mềm nhũn, thân tích nước yếu ớt dễ bị <strong>lốp đổ ngã</strong> khi gặp giông gió, sâu bệnh hại tấn công mạnh và tích lũy tồn dư <strong>NO₃⁻ độc hại</strong>.
                </>
              )}
            </div>
          </div>

          {/* Linh thú Bé Đạm */}
          <CuteMascot
            variant="banner"
            mascotType="SPROUTY_N"
            emotion="teacher"
            speech="Cây không hít được khí N₂ đâu nhé! Rễ chỉ uống được ion Amoni NH₄⁺ và Nitrat NO₃⁻ hòa tan thôi! 🌱✨"
            size={44}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG Showcase Stage */}
        <SvgStageCard
          title="NHÀ MÁY DIỆP LỤC & LỤC LẠP"
          subtitle="Động cơ quang hợp • Cấu trúc C₅₅H₇₂O₅N₄Mg & tổng hợp Protein"
          chapter="dam"
          badge="C₅₅H₇₂O₅N₄Mg"
          takeaway="Nitơ là nguyên tử trung tâm xây dựng phân tử Diệp Lục (C₅₅H₇₂O₅N₄Mg) và Axit Amin để tổng hợp toàn bộ Protein thực vật. Bộ rễ chỉ hút được Nitơ khoáng hòa tan ở 2 dạng ion: Amoni (NH₄⁺) và Nitrat (NO₃⁻)."
        >
          <SvgChlorophyllFactory />
        </SvgStageCard>
      </div>
    </div>
  );
}
