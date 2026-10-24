import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgApatiteMine from '../components/illustrations/SvgApatiteMine';

export default function Slide13LanQ5({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#F0EBFF', color: '#7C3AED' }}>
            <span style={{ fontSize: 13.5, fontWeight: 900 }}>PHÂN LÂN (P) • CÂU HỎI 05 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            QUẶNG APATIT LÀO CAI &amp; BÀI TOÁN TÀI NGUYÊN
          </h2>
        </div>

        <div className="slide-header-badge">
          <div className="slide-header-badge-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' }}>
            2.5B
          </div>
          <div className="slide-header-badge-text">
            <div className="slide-header-badge-sub" style={{ color: '#C4B5FD' }}>MỎ APATIT LÀO CAI</div>
            <div className="slide-header-badge-main">Trữ lượng hàng đầu Đông Nam Á</div>
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
          Nguyên liệu tự nhiên sản xuất phân lân là gì? Mỏ quặng Apatit Lào Cai và 3 nhà máy trụ cột nước ta? Thách thức cạn kiệt tài nguyên quặng giàu?
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
          {/* Card 1: Mỏ Apatit Lào Cai */}
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
                  MỎ APATIT LÀO CAI: TRỮ LƯỢNG HÀNG ĐẦU KHU VỰC
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, background: '#EDE9FE', color: '#5B21B6', padding: '2px 8px', borderRadius: 6 }}>
                  LÀO CAI 2.5B TẤN
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Mỏ quặng Apatit Lào Cai trải dài hơn <strong>100 km dọc hữu ngạn sông Hồng</strong> với trữ lượng ước tính trên <strong>2.5 tỷ tấn</strong>. Là kho tàng quặng photphat tự nhiên lớn nhất cả nước và toàn khu vực Đông Nam Á.
              </div>
            </div>
          </div>

          {/* Card 2: 3 Nhà máy trụ cột */}
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
              02
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#1D4ED8' }}>
                  3 NHÀ MÁY TRỤ CỘT NGÀNH LÂN VIỆT NAM
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, background: '#EFF6FF', color: '#1D4ED8', padding: '2px 8px', borderRadius: 6 }}>
                  3 ĐẠI NHÀ MÁY
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                1. <strong>Supe Phốt phát Lâm Thao</strong> (Phú Thọ): Sản xuất supe lân đơn quy mô lớn nhất.<br />
                2. <strong>Lân Nung Chảy Văn Điển</strong> (Hà Nội): Chuyên phân lân FMP kiềm hóa chịu chua mặn.<br />
                3. <strong>Lân Nung Chảy Ninh Bình</strong>: Cung cấp lân nung chảy cho miền Trung & Tây Nguyên.
              </div>
            </div>
          </div>

          {/* Card 3: Thách thức cạn kiệt */}
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
              03
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#B91C1C' }}>
                  THÁCH THỨC: CẠN KIỆT QUẶNG GIÀU LOẠI 1
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, background: '#FEE2E2', color: '#B91C1C', padding: '2px 8px', borderRadius: 6 }}>
                  BẢO VỆ TÀI NGUYÊN
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Quặng loại 1 (&gt; 28% P₂O₅) đang cạn kiệt nhanh. Hiện nay các nhà máy phải đẩy mạnh <strong>công nghệ tuyển nổi quặng nghèo loại 2, 3</strong> tiêu tốn nhiều năng lượng, đồng thời xử lý triệt để bãi thải bã thạch cao phosphogypsum bảo vệ môi trường.
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
              ECO
            </div>
            <span>
              <strong>Kinh tế tuần hoàn:</strong> Tận dụng xỉ quặng lân nung chảy và thạch cao nhân tạo sau chế biến để sản xuất xi măng và vật liệu san lấp hạ tầng giao thông.
            </span>
          </div>

          {/* Linh thú Bé Lân */}
          <CuteMascot 
            variant="banner"
            mascotType="SPARKY_P"
            emotion="curious"
            speech="Tài nguyên quặng tự nhiên là hữu hạn, chúng mình phải khai thác tiết kiệm và tái chế tuần hoàn bạn nhé! 🏔️⚡"
            size={44}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG */}
        <div className="svg-stage-card">
          <SvgApatiteMine />
        </div>
      </div>
    </div>
  );
}
