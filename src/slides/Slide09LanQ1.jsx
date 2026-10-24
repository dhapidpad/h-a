import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgRootAtpStation from '../components/illustrations/SvgRootAtpStation';

export default function Slide09LanQ1({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#F0EBFF', color: '#7C3AED' }}>
            <span style={{ fontSize: 13.5, fontWeight: 900 }}>PHÂN LÂN (P) • CÂU HỎI 01 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            PHOTPHO (P) — NĂNG LƯỢNG ATP &amp; BỘ RỄ ĐÂM SÂU
          </h2>
        </div>

        <div className="slide-header-badge">
          <div className="slide-header-badge-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' }}>
            P
          </div>
          <div className="slide-header-badge-text">
            <div className="slide-header-badge-sub" style={{ color: '#C4B5FD' }}>TIÊU CHUẨN ĐỘ LÂN</div>
            <div className="slide-header-badge-main">Đo bằng <span style={{ color: '#FDE047', fontWeight: 900 }}>%P₂O₅ tương ứng</span></div>
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
          Phân lân cung cấp nguyên tố nào, dưới dạng ion gì? Vai trò cốt lõi của Photpho đối với bộ rễ, ra hoa, đậu quả và chuyển hóa năng lượng ATP?
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
          {/* Card 1: Pin năng lượng ATP */}
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
              01
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#5B21B6' }}>
                  TRẠM PIN NĂNG LƯỢNG ATP TẾ BÀO
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, background: '#EDE9FE', color: '#5B21B6', padding: '2px 8px', borderRadius: 6 }}>
                  ATP ~30.5 kJ/mol
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Photpho là trung tâm cấu tạo phân tử <strong>ATP (Adenosine Triphosphate)</strong>. Liên kết photphat cao năng giải phóng năng lượng nuôi sống mọi phản ứng sinh hóa, vận chuyển chất dinh dưỡng qua màng tế bào.
              </div>
            </div>
          </div>

          {/* Card 2: Kích rễ đâm sâu */}
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
              02
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#15803D' }}>
                  KÍCH BỘ RỄ ĐÂM SÂU TỎA RỘNG
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: 6 }}>
                  BỘ RỄ KHỎE
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Thúc đẩy phân chia tế bào mô phân sinh chóp rễ, giúp <strong>rễ cọc ăn sâu vào tầng đất ngầm</strong>, rễ tơ bung tỏa dồi dào, tăng khả năng hút nước và đứng vững trước giông lốc mưa bão.
              </div>
            </div>
          </div>

          {/* Card 3: Phân hóa hoa & Dạng ion */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '9px 14px',
            borderLeft: '5px solid #F59E0B',
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
              background: '#FEF3C7',
              color: '#B45309',
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
                <span style={{ fontSize: 15, fontWeight: 800, color: '#B45309' }}>
                  ĐẬU QUẢ SỚM & DẠNG ION HẤP THỤ
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: 6 }}>
                  HOA & HẠT
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Kích thích phân hóa mầm hoa nở đồng loạt, chống rụng hoa và rụng quả non. Rễ cây hấp thụ chủ yếu dưới dạng ion <strong>H₂PO₄⁻ (đất chua)</strong> và <strong>HPO₄²⁻ (đất trung tính/kiềm nhẹ)</strong>.
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
              P
            </div>
            <span>
              <strong>Chỉ tiêu đánh giá:</strong> Độ dinh dưỡng của mọi loại phân lân đều được quy đổi và tính toán theo <strong>% khối lượng P₂O₅ tương ứng</strong>.
            </span>
          </div>

          {/* Linh thú Bé Lân */}
          <CuteMascot
            variant="banner"
            mascotType="SPARKY_P"
            emotion="scientist"
            speech="Có tớ tiếp lửa ATP, rễ non sẽ bung tỏa đâm sâu giữ đất vững vàng, hoa trái trĩu cành nha! ⚡🌱"
            size={44}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG */}
        <div className="svg-stage-card">
          <SvgRootAtpStation />
        </div>
      </div>
    </div>
  );
}
