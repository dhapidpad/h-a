import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgLeafScorchAlert from '../components/illustrations/SvgLeafScorchAlert';

export default function Slide16KaliQ3({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#FFF3DA', color: '#D97706' }}>
            <span style={{ fontSize: 14, fontWeight: 900 }}>PHÂN KALI (K) • CÂU HỎI 03 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            NHẬN DIỆN CÂY ĐÓI KALI &amp; CÂY NHẠY CẢM VỚI CLO
          </h2>
        </div>

        <div className="slide-header-badge">
          <div className="slide-header-badge-icon" style={{ background: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)' }}>
            KỴ Cl⁻
          </div>
          <div className="slide-header-badge-text">
            <div className="slide-header-badge-sub" style={{ color: '#FCA5A5' }}>CẢNH BÁO NÔNG HỌC</div>
            <div className="slide-header-badge-main">Cấm dùng KCl cho cây mẫn cảm Clo</div>
          </div>
        </div>
      </div>

      {/* Banner câu hỏi */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1.5px solid #FDE68A',
        borderRadius: 14,
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 4px 14px rgba(217, 119, 6, 0.07)'
      }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: '#FEF3C7',
          color: '#D97706',
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
          <span style={{ color: '#D97706', fontWeight: 900 }}>Câu hỏi thảo luận: </span>
          Hiện tượng "đói kali" biểu hiện thế nào trên lá cây? Tại sao các loại cây nhạy cảm Clo (sầu riêng, khoai tây, thuốc lá) lại bị cấm bón phân KCl?
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
          {/* Card 1: Bệnh cháy rìa mép lá */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '9px 14px',
            borderLeft: '5px solid #EF4444',
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
              background: '#FEE2E2',
              color: '#EF4444',
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
                <span style={{ fontSize: 15, fontWeight: 800, color: '#B91C1C' }}>
                  BỆNH ĐÓI KALI: CHÁY KHÔ TỪ RÌA MÉP LÁ GIÀ
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#FEE2E2', color: '#B91C1C', padding: '2px 8px', borderRadius: 6 }}>
                  CHÁY MÉP LÁ
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Do ion K⁺ linh động ưu tiên di chuyển lên nuôi chồi non, triệu chứng thiếu K <strong>xuất hiện sớm nhất ở mép lá già</strong>: chóp lá và rìa lá ngả vàng rồi khô giòn như bị lửa hơ xém, thân cây mềm oặt dễ đổ rạp.
              </div>
            </div>
          </div>

          {/* Card 2: Tác hại của Clo đối với cây nhạy cảm */}
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
              color: '#F59E0B',
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
                <span style={{ fontSize: 15, fontWeight: 800, color: '#B45309' }}>
                  TÁC HẠI TAI HẠI KHI BÓN KCL CHO CÂY KỴ CLO
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: 6 }}>
                  CÂY KỴ CL⁻
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                • <strong>Sầu riêng:</strong> Gốc Cl⁻ làm cơm múi bị nhão nước, sượng xơ, mất vị béo bùi thơm ngon.<br />
                • <strong>Khoai tây:</strong> Cl⁻ cản trở tích tụ tinh bột, củ bị tích nước sượng cứng không giòn.<br />
                • <strong>Thuốc lá:</strong> Làm lá giữ nước bí hơi, khi đốt cháy khét tàn đen, mất mùi thơm tự nhiên.
              </div>
            </div>
          </div>

          {/* Card 3: Bắt buộc dùng K2SO4 */}
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
                  GIẢI PHÁP: DÙNG K₂SO₄ HOẶC KNO₃ BẢO VỆ CHẤT LƯỢNG
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: 6 }}>
                  K₂SO₄ / KNO₃
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Đối với nhóm cây đặc sản mẫn cảm Clo, bắt buộc sử dụng <strong>Kali Sunfat (K₂SO₄)</strong> hoặc <strong>KNO₃</strong> để giữ trọn vẹn vị ngọt đậm, múi dẻo thơm và đạt chuẩn xuất khẩu nghiêm ngặt.
              </div>
            </div>
          </div>

          {/* Practical Note */}
          <div style={{
            background: '#FFFBEB',
            borderRadius: 12,
            padding: '9px 14px',
            border: '1.5px dashed #F59E0B',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 14,
            color: '#78350F'
          }}>
            <div style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: '#FEF3C7',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontWeight: 900,
              fontSize: 12.5
            }}>
              MẸO
            </div>
            <span>
              <strong>Nhận diện nhanh tại đồng ruộng:</strong> Thiếu Đạm vàng toàn bộ mặt lá già; Thiếu Kali chỉ vàng khô cháy dọc theo hai mép rìa viền ngoài vào trong.
            </span>
          </div>

          {/* Linh thú Bé Kali */}
          <CuteMascot 
            variant="banner"
            mascotType="SUNNY_K"
            emotion="worried"
            speech="Thấy mép lá già khô cháy như hơ lửa là cây đang khát Kali cấp cứu đó nha! 🍂"
            size={44}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG */}
        <div className="svg-stage-card">
          <SvgLeafScorchAlert />
        </div>
      </div>
    </div>
  );
}
