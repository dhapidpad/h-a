import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgStageCard from '../components/SvgStageCard';
import SvgKClvsK2SO4 from '../components/illustrations/SvgKClvsK2SO4';

export default function Slide15KaliQ2({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#FFF3DA', color: '#D97706' }}>
            <span style={{ fontSize: 14, fontWeight: 900 }}>PHÂN KALI (K) • CÂU HỎI 02 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            KALI CLORUA (60%) vs KALI SUNFAT (50% K₂O)
          </h2>
        </div>

        <div className="slide-header-badge">
          <div className="slide-header-badge-icon" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
            %K₂O
          </div>
          <div className="slide-header-badge-text">
            <div className="slide-header-badge-sub" style={{ color: '#FDE68A' }}>TIÊU CHÍ DINH DƯỠNG</div>
            <div className="slide-header-badge-main">Đo bằng % khối lượng K₂O quy đổi</div>
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
          Độ dinh dưỡng của phân kali được đánh giá theo chỉ tiêu nào? So sánh thành phần, độ tan, ưu nhược điểm giữa Kali Clorua (KCl) và Kali Sunfat (K₂SO₄)?
        </div>
      </div>

      {/* Grid 2 cột */}
      <div className="slide-main-grid">
        {/* Cột trái */}
        <div className="slide-content-col">
          {/* Card 1: Tiêu chuẩn %K2O */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '9px 14px',
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
              borderRadius: 11,
              background: '#EFF6FF',
              color: '#2563EB',
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
                <span style={{ fontSize: 15, fontWeight: 800, color: '#1D4ED8' }}>
                  TIÊU CHÍ ĐÁNH GIÁ: % KHỐI LƯỢNG K₂O
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#EFF6FF', color: '#1D4ED8', padding: '2px 8px', borderRadius: 6 }}>
                  QUY ĐỔI %K₂O
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Độ dinh dưỡng của phân kali được quy đổi và đánh giá bằng <strong>% khối lượng K₂O tương ứng</strong> với lượng kali có trong thành phần muối bón.
              </div>
            </div>
          </div>

          {/* Card 2: KCl Muối đỏ */}
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
                  KALI CLORUA (KCl): 60% K₂O — MUỐI ĐỎ BÌNH DÂN
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: 6 }}>
                  PHỔ BIẾN &gt;90%
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Hạt tinh thể đỏ hồng hoặc trắng, chứa <strong>~60% K₂O</strong>. Giá thành hợp lý, tan rất nhanh, chiếm hơn 90% lượng phân kali tiêu thụ toàn cầu. Nhược điểm: Chứa ion Cl⁻ gây mặn đất nếu bón dư thừa.
              </div>
            </div>
          </div>

          {/* Card 3: K2SO4 Muối trắng */}
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
                  KALI SUNFAT (K₂SO₄): 50% K₂O — CAO CẤP KHÔNG CLO
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: 6 }}>
                  +18% LƯU HUỲNH
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
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
            size={44}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG Showcase Stage */}
        <SvgStageCard
          title="ĐỐI CHIẾU KALI CLORUA VS SUNFAT"
          subtitle="Độ dinh dưỡng %K₂O • KCl 60% K₂O (đỏ ớt) vs K₂SO₄ 50% K₂O + Lưu huỳnh"
          chapter="kali"
          badge="Độ Dinh Dưỡng %K₂O"
          takeaway="Độ dinh dưỡng của phân kali tính bằng %K₂O. KCl (60% K₂O) giá rẻ nhất, chiếm 90% lượng tiêu thụ nhưng chứa Cl⁻ gây hại cây mẫn cảm. K₂SO₄ (50% K₂O + 18% S) là phân bón cao cấp không clo giúp quả ngọt, tinh bột thơm ngon."
        >
          <SvgKClvsK2SO4 />
        </SvgStageCard>
      </div>
    </div>
  );
}
