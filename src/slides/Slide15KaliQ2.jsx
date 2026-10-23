import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgKClvsK2SO4 from '../components/illustrations/SvgKClvsK2SO4';

export default function Slide15KaliQ2({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#FFF3DA', color: '#D97706' }}>
            <span style={{ fontSize: 13, fontWeight: 900 }}>PHÂN KALI (K) • CÂU HỎI 02 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            KALI CLORUA (60%) vs KALI SUNFAT (50% K₂O)
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
            background: '#D97706',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 10
          }}>
            %K₂O
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#FDE68A' }}>TIÊU CHÍ DINH DƯỠNG</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Đo bằng % khối lượng K₂O quy đổi</div>
          </div>
        </div>
      </div>

      {/* Banner câu hỏi */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
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
          Độ dinh dưỡng của phân kali được đánh giá theo chỉ tiêu nào? So sánh thành phần, độ tan, ưu nhược điểm giữa Kali Clorua (KCl) và Kali Sunfat (K₂SO₄)?
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
          {/* Card 1: Tiêu chuẩn %K2O */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '11px 16px',
            borderLeft: '5px solid #2563EB',
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
              background: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 11,
              flexShrink: 0
            }}>
              %K₂O
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#1D4ED8' }}>
                  TIÊU CHÍ ĐÁNH GIÁ: % KHỐI LƯỢNG K₂O
                </span>
                <span style={{ fontSize: 11, fontWeight: 900, background: '#EFF6FF', color: '#1D4ED8', padding: '2px 8px', borderRadius: 6 }}>
                  QUY ĐỔI
                </span>
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Độ dinh dưỡng của phân kali được quy đổi và đánh giá bằng <strong>% khối lượng K₂O tương ứng</strong> với lượng kali có trong thành phần muối bón.
              </div>
            </div>
          </div>

          {/* Card 2: KCl Muối đỏ */}
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
              color: '#F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 11,
              flexShrink: 0
            }}>
              KCl
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#B45309' }}>
                  KALI CLORUA (KCl): 60% K₂O — MUỐI ĐỎ BÌNH DÂN
                </span>
                <span style={{ fontSize: 11, fontWeight: 900, background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: 6 }}>
                  PHỔ BIẾN &gt;90%
                </span>
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Hạt tinh thể đỏ hồng hoặc trắng, chứa <strong>~60% K₂O</strong>. Giá thành hợp lý, tan rất nhanh, chiếm hơn 90% lượng phân kali tiêu thụ toàn cầu. Nhược điểm: Chứa ion Cl⁻ gây mặn đất nếu bón dư thừa.
              </div>
            </div>
          </div>

          {/* Card 3: K2SO4 Muối trắng */}
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
              K₂SO₄
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#15803D' }}>
                  KALI SUNFAT (K₂SO₄): 50% K₂O — CAO CẤP KHÔNG CLO
                </span>
                <span style={{ fontSize: 11, fontWeight: 900, background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: 6 }}>
                  +18% LƯU HUỲNH
                </span>
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Bột tinh khiết màu trắng chứa <strong>~50% K₂O</strong>. Hoàn toàn không chứa gốc Clo, đồng thời cung cấp thêm <strong>18% Lưu huỳnh (S)</strong> giúp kích hoạt hương thơm, độ ngọt và tinh dầu cho trái cây đặc sản.
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
            fontSize: 13,
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
              fontSize: 9.5
            }}>
              GIÁ
            </div>
            <span>
              <strong>Kinh tế nông nghiệp:</strong> K₂SO₄ giá đắt gấp ~2 lần KCl, được dành riêng cho các loại nông sản xuất khẩu giá trị cao (sầu riêng, thanh long, bưởi da xanh).
            </span>
          </div>

          {/* Linh thú Bé Kali */}
          <CuteMascot 
            variant="banner"
            mascotType="SUNNY_K"
            emotion="scientist"
            speech="Cây ưa ngọt thơm hãy chọn K₂SO₄ của tớ nhé, không lo gốc Clo làm sượng múi đâu! 🧪✨"
            size={52}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: 22,
          border: '1.5px solid #FDE68A',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          minHeight: 0
        }}>
          <SvgKClvsK2SO4 />
        </div>
      </div>
    </div>
  );
}
