import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgVietnamFactories from '../components/illustrations/SvgVietnamFactories';

export default function Slide07DamQ4({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}>
            <span style={{ fontSize: 14, fontWeight: 900 }}>PHÂN ĐẠM (N) • CÂU HỎI 04 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            CÔNG NGHIỆP ĐẠM VIỆT NAM: KHÍ THIÊN NHIÊN &amp; THAN ĐÁ
          </h2>
        </div>

        <div className="slide-header-badge">
          <div className="slide-header-badge-icon" style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}>
            VN
          </div>
          <div className="slide-header-badge-text">
            <div className="slide-header-badge-sub" style={{ color: '#93C5FD' }}>NĂNG LỰC SẢN XUẤT</div>
            <div className="slide-header-badge-main">&gt; 2.6 Triệu tấn Urê / năm</div>
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
        gap: 12,
        boxShadow: '0 4px 14px rgba(22, 163, 74, 0.07)'
      }}>
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
          Tại Việt Nam, các nhà máy sản xuất phân đạm lớn sử dụng 2 nguồn nguyên liệu tự nhiên nào và đóng góp gì cho việc tự chủ an ninh lương thực?
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
          {/* Card 1: Khí thiên nhiên */}
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
              01
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#15803D' }}>
                  ĐẠM PHÚ MỸ & CÀ MAU: KHÍ THIÊN NHIÊN
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: 6 }}>
                  CH₄ + H₂O
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                • <strong>Đạm Phú Mỹ</strong> (Bà Rịa - Vũng Tàu): Khí đồng hành mỏ Bạch Hổ & Nam Côn Sơn.<br />
                • <strong>Đạm Cà Mau</strong>: Khí tự nhiên từ cụm mỏ PM3-CAA vịnh Thái Lan.<br />
                Chuyển hóa metan thành H₂ để tổng hợp NH₃ theo chu trình Haber-Bosch và ép tạo hạt Urê chất lượng cao.
              </div>
            </div>
          </div>

          {/* Card 2: Khí hóa than đá */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '9px 14px',
            borderLeft: '5px solid #475569',
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
              background: '#F1F5F9',
              color: '#475569',
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
                <span style={{ fontSize: 15, fontWeight: 800, color: '#334155' }}>
                  ĐẠM NINH BÌNH & HÀ BẮC: KHÍ HÓA THAN ĐÁ
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#F1F5F9', color: '#475569', padding: '2px 8px', borderRadius: 6 }}>
                  THAN CÁM QN
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Sử dụng nguồn <strong>than cám mỏ than Quảng Ninh</strong>. Ứng dụng công nghệ khí hóa than ở nhiệt độ 1300°C tạo khí tổng hợp CO + H₂ để sản xuất phân đạm phục vụ vựa lúa đồng bằng Bắc Bộ.
              </div>
            </div>
          </div>

          {/* Card 3: Đóng góp quốc gia */}
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
              03
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#1D4ED8' }}>
                  TỰ CHỦ 100% NHU CẦU & XUẤT KHẨU
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#EFF6FF', color: '#1D4ED8', padding: '2px 8px', borderRadius: 6 }}>
                  TỰ CHỦ 100%
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Tổng công suất 4 nhà máy đạt <strong>&gt; 2.6 triệu tấn Urê/năm</strong>. Việt Nam từ nước phải nhập khẩu 100% phân đạm nay đã hoàn toàn tự chủ nguồn phân đạm quốc gia và xuất khẩu sang Ấn Độ, Campuchia.
              </div>
            </div>
          </div>

          {/* Practical Note */}
          <div style={{
            background: '#F0FDF4',
            borderRadius: 12,
            padding: '9px 14px',
            border: '1.5px dashed #22C55E',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 14,
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
              fontSize: 12.5
            }}>
              TOP
            </div>
            <span>
              <strong>An ninh lương thực:</strong> 4 nhà máy đạm quốc gia là "lá chắn thép" bảo vệ giá thành phân bón ổn định cho nông dân trước các biến động khủng hoảng năng lượng toàn cầu.
            </span>
          </div>

          {/* Linh thú Bé Đạm */}
          <CuteMascot
            variant="banner"
            mascotType="SPROUTY_N"
            emotion="proud"
            speech="Việt Nam mình tự sản xuất được hơn 2.6 triệu tấn Đạm mỗi năm từ dầu khí và than đá, xịn lắm đúng không nào! 🏭🌾"
            size={44}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG */}
        <div className="svg-stage-card">
          <SvgVietnamFactories />
        </div>
      </div>
    </div>
  );
}
