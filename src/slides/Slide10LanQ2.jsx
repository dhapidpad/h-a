import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgSuperPhosphatePouch from '../components/illustrations/SvgSuperPhosphatePouch';

export default function Slide10LanQ2({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#F0EBFF', color: '#7C3AED' }}>
            <span style={{ fontSize: 13.5, fontWeight: 900 }}>PHÂN LÂN (P) • CÂU HỎI 02 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            SUPERPHOTPHAT ĐƠN (SSP) vs KÉP (TSP) — BẢN CHẤT %P₂O₅
          </h2>
        </div>

        <div className="slide-header-badge">
          <div className="slide-header-badge-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' }}>
            TSP
          </div>
          <div className="slide-header-badge-text">
            <div className="slide-header-badge-sub" style={{ color: '#C4B5FD' }}>HÀM LƯỢNG CAO NHẤT</div>
            <div className="slide-header-badge-main">40% – 50% P₂O₅ (Gấp 2.5 lần)</div>
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
          So sánh thành phần hóa học, hàm lượng %P₂O₅ và quy trình sản xuất giữa Supephotphat đơn (SSP) và Supephotphat kép (TSP)?
        </div>
      </div>

      {/* Grid 2 cột */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(400px, 0.94fr) minmax(540px, 1.26fr)', 
        gap: 16, 
        flex: 1, 
        minHeight: 0,
        alignItems: 'stretch'
      }}>
        {/* Cột trái */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 7, 
          justifyContent: 'flex-start',
          minHeight: 0,
          overflowY: 'auto',
          paddingRight: 5
        }}>
          {/* Card 1: Supephotphat đơn */}
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
                  SUPEPHOTPHAT ĐƠN: 14% – 20% P₂O₅
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, background: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: 6 }}>
                  1 GIAI ĐOẠN
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Hỗn hợp gồm muối tan <strong>Ca(H₂PO₄)₂</strong> + muối thạch cao không tan <strong>2CaSO₄</strong> (chiếm tới ~50% khối lượng).<br />
                Phản ứng: <strong>Ca₃(PO₄)₂ + 2H₂SO₄ → Ca(H₂PO₄)₂ + 2CaSO₄↓</strong>. Bù lại cung cấp thêm Lưu huỳnh (S) cho cây.
              </div>
            </div>
          </div>

          {/* Card 2: Supephotphat kép */}
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
                  SUPEPHOTPHAT KÉP: 40% – 50% P₂O₅
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, background: '#EDE9FE', color: '#5B21B6', padding: '2px 8px', borderRadius: 6 }}>
                  2 GIAI ĐOẠN
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Chỉ chứa muối tan <strong>Ca(H₂PO₄)₂</strong> tinh khiết (đã loại bỏ sạch tạp chất thạch cao CaSO₄).<br />
                Sản xuất bằng axit H₃PO₄: <strong>Ca₃(PO₄)₂ + 4H₃PO₄ → 3Ca(H₂PO₄)₂</strong>. Độ lân đậm đặc gấp 2.5 lần phân đơn.
              </div>
            </div>
          </div>

          {/* Card 3: Phân tích kinh tế */}
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
              color: '#15803D',
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
              <div style={{ fontSize: 15, fontWeight: 800, color: '#15803D', marginBottom: 2 }}>
                TIẾT KIỆM CHI PHÍ VẬN CHUYỂN ĐƯỜNG DÀI
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Tuy giá thành phân kép TSP cao hơn, nhưng nhờ hàm lượng P₂O₅ đậm đặc (40–50%), người nông dân chỉ cần vận chuyển <strong>1 bao phân kép thay vì 2.5 bao phân đơn</strong>, rất có lợi cho vận chuyển lên vùng cao Tây Bắc, Tây Nguyên.
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
              LÝ
            </div>
            <span>
              <strong>Tính chất vật lý:</strong> Cả 2 loại supe lân đều chứa Ca(H₂PO₄)₂ tan tốt trong nước, rễ cây hút nhanh chóng ngay sau khi bón.
            </span>
          </div>

          {/* Linh thú Bé Lân */}
          <CuteMascot
            variant="banner"
            mascotType="SPARKY_P"
            emotion="proud"
            speech="Supe kép TSP nhỏ mà có võ, đậm đặc gấp 2.5 lần supe đơn, mang vác lên nương rẫy nhẹ tênh! ⚡🎒"
            size={44}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG */}
        <div className="svg-stage-card">
          <SvgSuperPhosphatePouch />
        </div>
      </div>
    </div>
  );
}
