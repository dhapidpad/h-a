import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgFusedPhosphateCups from '../components/illustrations/SvgFusedPhosphateCups';

export default function Slide11LanQ3({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#F0EBFF', color: '#7C3AED' }}>
            <span style={{ fontSize: 13, fontWeight: 900 }}>PHÂN LÂN (P) • CÂU HỎI 03 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            LÂN NUNG CHẢY: ĐẶC TRỊ CHO ĐẤT CHUA PHÈN
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
            background: '#7C3AED',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 11
          }}>
            FMP
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#C4B5FD' }}>ĐẶC TÍNH KHỬ CHUA</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Tính kiềm pH 8 – 8.5 (Ca, Mg, Si)</div>
          </div>
        </div>
      </div>

      {/* Banner câu hỏi */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
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
          {/* Card 1: Không tan trong nước */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '11px 16px',
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
              borderRadius: 10,
              background: '#E0F2FE',
              color: '#0284C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 10,
              flexShrink: 0
            }}>
              H₂O✕
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0369A1', marginBottom: 2 }}>
                KHÔNG TAN TRONG NƯỚC: TRÁNH RỬA TRÔI MÙA MƯA
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Sản xuất bằng cách <strong>nung chảy quặng Apatit + Secpentin ở 1450°C</strong> rồi làm lạnh đột ngột bằng tia nước áp lực cao. Tạo hạt thủy tinh vô định hình, trơ trước nước mưa, không bị cuốn trôi ở vùng đồi núi dốc.
              </div>
            </div>
          </div>

          {/* Card 2: Tan trong axit hữu cơ rễ */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '11px 16px',
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
              borderRadius: 10,
              background: '#EDE9FE',
              color: '#7C3AED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 11,
              flexShrink: 0
            }}>
              H⁺ rễ
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#5B21B6', marginBottom: 2 }}>
                RỄ TIẾT AXIT ĐẾN ĐÂU — HÒA TAN LÂN ĐẾN ĐÓ
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Lông hút rễ cây tiết <strong>axit hữu cơ yếu (axit citric, malic)</strong>. Ion H⁺ nồng độ cao tại mặt tiếp xúc rễ sẽ phá vỡ liên kết, hòa tan hạt lân nung chảy để cây hút trực tiếp mà không bị keo đất khóa chặt.
              </div>
            </div>
          </div>

          {/* Card 3: Tính kiềm khử chua */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '11px 16px',
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
              borderRadius: 10,
              background: '#DCFCE7',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 10,
              flexShrink: 0
            }}>
              pH&gt;8
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#15803D', marginBottom: 2 }}>
                TÍNH KIỀM (pH 8 – 8.5): KHỬ CHUA, BỔ SUNG CA, MG, SI
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
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
            fontSize: 13,
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
              fontSize: 11
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
            size={52}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: 22,
          border: '1.5px solid #DDD6FE',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          minHeight: 0
        }}>
          <SvgFusedPhosphateCups />
        </div>
      </div>
    </div>
  );
}
