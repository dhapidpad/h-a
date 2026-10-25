import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgStageCard from '../components/SvgStageCard';
import SvgFusedPhosphateCups from '../components/illustrations/SvgFusedPhosphateCups';

export default function Slide11LanQ3({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#F0EBFF', color: '#7C3AED' }}>
            <span style={{ fontSize: 13.5, fontWeight: 900 }}>PHÂN LÂN (P) • CÂU HỎI 03 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            LÂN NUNG CHẢY: ĐẶC TRỊ CHO ĐẤT CHUA PHÈN
          </h2>
        </div>

        <div className="slide-header-badge">
          <div className="slide-header-badge-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' }}>
            FMP
          </div>
          <div className="slide-header-badge-text">
            <div className="slide-header-badge-sub" style={{ color: '#C4B5FD' }}>ĐẶC TÍNH KHỬ CHUA</div>
            <div className="slide-header-badge-main">Tính kiềm pH 8 – 8.5 (Ca, Mg, Si)</div>
          </div>
        </div>
      </div>

      {/* Banner câu hỏi */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1.5px solid #DDD6FE',
        borderRadius: 14,
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 4px 14px rgba(124, 58, 237, 0.07)'
      }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: '#EDE9FE',
          color: '#7C3AED',
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
          <span style={{ color: '#7C3AED', fontWeight: 900 }}>Câu hỏi thảo luận: </span>
          Phân lân nung chảy (FMP) khác superphotphat như thế nào? Tại sao phân này không tan trong nước mưa nhưng lại tan được trong axit yếu do rễ cây tiết ra?
        </div>
      </div>

      {/* Grid 2 cột */}
      <div className="slide-main-grid">
        {/* Cột trái */}
        <div className="slide-content-col">
          {/* Card 1: Không tan trong nước */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '9px 14px',
            borderLeft: '5px solid #0284C7',
            borderTop: '1px solid #E2E8F0',
            borderRight: '1px solid #E2E8F0',
            borderBottom: '1px solid #E2E8F0',
            boxShadow: '0 3px 10px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              background: '#E0F2FE',
              color: '#0284C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 16,
              flexShrink: 0
            }}>
              01
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#0369A1' }}>
                  KHÔNG TAN TRONG NƯỚC: TRÁNH RỬA TRÔI MÙA MƯA
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, background: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: 6 }}>
                  H₂O KHÔNG TAN
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Sản xuất bằng cách <strong>nung chảy quặng Apatit + Secpentin ở 1450°C</strong> rồi làm lạnh đột ngột bằng tia nước áp lực cao. Tạo hạt thủy tinh vô định hình, trơ trước nước mưa, không bị cuốn trôi ở vùng đồi núi dốc.
              </div>
            </div>
          </div>

          {/* Card 2: Tan trong axit hữu cơ rễ */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '9px 14px',
            borderLeft: '5px solid #7C3AED',
            borderTop: '1px solid #E2E8F0',
            borderRight: '1px solid #E2E8F0',
            borderBottom: '1px solid #E2E8F0',
            boxShadow: '0 3px 10px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              background: '#EDE9FE',
              color: '#7C3AED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 16,
              flexShrink: 0
            }}>
              02
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#5B21B6' }}>
                  RỄ TIẾT AXIT ĐẾN ĐÂU — HÒA TAN LÂN ĐẾN ĐÓ
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, background: '#EDE9FE', color: '#5B21B6', padding: '2px 8px', borderRadius: 6 }}>
                  H⁺ AXIT RỄ
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Lông hút rễ cây tiết <strong>axit hữu cơ yếu (axit citric, malic)</strong>. Ion H⁺ nồng độ cao tại mặt tiếp xúc rễ sẽ phá vỡ liên kết, hòa tan hạt lân nung chảy để cây hút trực tiếp mà không bị keo đất khóa chặt.
              </div>
            </div>
          </div>

          {/* Card 3: Tính kiềm khử chua */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '9px 14px',
            borderLeft: '5px solid #16A34A',
            borderTop: '1px solid #E2E8F0',
            borderRight: '1px solid #E2E8F0',
            borderBottom: '1px solid #E2E8F0',
            boxShadow: '0 3px 10px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              background: '#DCFCE7',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 16,
              flexShrink: 0
            }}>
              03
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#15803D' }}>
                  TÍNH KIỀM (pH 8 – 8.5): KHỬ CHUA, BỔ SUNG CA, MG, SI
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: 6 }}>
                  pH 8 – 8.5
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Chứa <strong>15–18% MgO, 25–30% CaO, 24–30% SiO₂</strong>. Tính kiềm giúp nâng độ pH, hạ phèn, hóa giải độc tố Al³⁺, Fe³⁺ cực tốt cho đất đồi dốc Tây Bắc, đất đỏ Tây Nguyên và đất trũng phèn.
              </div>
            </div>
          </div>

          {/* Practical Note */}
          <div style={{
            background: '#FAF5FF',
            borderRadius: 12,
            padding: '9px 14px',
            border: '1.5px dashed #A855F7',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 13.5,
            color: '#6B21A8'
          }}>
            <div style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: '#EDE9FE',
              color: '#7C3AED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontWeight: 900,
              fontSize: 12
            }}>
              VN
            </div>
            <span>
              <strong>Thương hiệu Việt:</strong> Lân nung chảy Văn Điển (FMP) và Ninh Bình là phân bón "vàng" cho cây chè Thái Nguyên, cà phê Tây Nguyên và lúa đất phèn.
            </span>
          </div>

          {/* Linh thú Bé Lân */}
          <CuteMascot 
            variant="banner"
            mascotType="SPARKY_P"
            emotion="scientist"
            speech="Nước mưa không cuốn trôi được tớ, chỉ giọt axit rễ cây mới đánh thức tớ dậy thôi nha! 🧪⚡"
            size={44}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG Showcase Stage */}
        <SvgStageCard
          title="ĐỘ TAN CỦA LÂN NUNG CHẢY"
          subtitle="Thí nghiệm 2 cốc: Không tan trong nước mưa • Tan tốt trong axit rễ cây"
          chapter="lan"
          badge="FMP Tính Kiềm"
          takeaway="Lân nung chảy (Văn Điển, Ninh Bình) không tan trong nước mưa nên không bị rửa trôi trên đất đồi dốc. Axit hữu cơ do đầu rễ cây tiết ra hòa tan từ từ lân, đồng thời thành phần vôi và magie kiềm hóa khử chua đất phèn hiệu quả."
        >
          <SvgFusedPhosphateCups />
        </SvgStageCard>
      </div>
    </div>
  );
}
