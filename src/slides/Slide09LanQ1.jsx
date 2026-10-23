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
            <span style={{ fontSize: 13, fontWeight: 900 }}>PHÂN LÂN (P) • CÂU HỎI 01 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            PHOTPHO (P) — NĂNG LƯỢNG ATP &amp; BỘ RỄ ĐÂM SÂU
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
            fontSize: 14
          }}>
            P
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#C4B5FD' }}>TIÊU CHUẨN ĐỘ LÂN</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Đo bằng <span style={{ color: '#FDE047', fontWeight: 900 }}>%P₂O₅ tương ứng</span></div>
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
          Phân lân cung cấp nguyên tố nào, dưới dạng ion gì? Vai trò cốt lõi của Photpho đối với bộ rễ, ra hoa, đậu quả và chuyển hóa năng lượng ATP?
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
          {/* Card 1: Pin năng lượng ATP */}
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
              ATP
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#5B21B6' }}>
                  TRẠM PIN NĂNG LƯỢNG ATP TẾ BÀO
                </span>
                <span style={{ fontSize: 11, fontWeight: 900, background: '#EDE9FE', color: '#5B21B6', padding: '2px 8px', borderRadius: 6 }}>
                  ~30.5 kJ/mol
                </span>
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Photpho là trung tâm cấu tạo phân tử <strong>ATP (Adenosine Triphosphate)</strong>. Liên kết photphat cao năng giải phóng năng lượng nuôi sống mọi phản ứng sinh hóa, vận chuyển chất dinh dưỡng qua màng tế bào.
              </div>
            </div>
          </div>

          {/* Card 2: Kích rễ đâm sâu */}
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
              color: '#15803D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 12,
              flexShrink: 0
            }}>
              RỄ
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#15803D' }}>
                  KÍCH BỘ RỄ ĐÂM SÂU TỎA RỘNG
                </span>
                <span style={{ fontSize: 11, fontWeight: 900, background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: 6 }}>
                  CHỐNG ĐỔ
                </span>
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Thúc đẩy phân chia tế bào mô phân sinh chóp rễ, giúp <strong>rễ cọc ăn sâu vào tầng đất ngầm</strong>, rễ tơ bung tỏa dồi dào, tăng khả năng hút nước và đứng vững trước giông lốc mưa bão.
              </div>
            </div>
          </div>

          {/* Card 3: Phân hóa hoa & Dạng ion */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '11px 16px',
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
              borderRadius: 10,
              background: '#FEF3C7',
              color: '#B45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 10,
              flexShrink: 0
            }}>
              H₂PO₄⁻
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#B45309' }}>
                  ĐẬU QUẢ SỚM & DẠNG ION HẤP THỤ
                </span>
                <span style={{ fontSize: 11, fontWeight: 900, background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: 6 }}>
                  HOA & HẠT
                </span>
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
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
          <SvgRootAtpStation />
        </div>
      </div>
    </div>
  );
}
