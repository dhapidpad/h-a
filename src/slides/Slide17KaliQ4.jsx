import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgTopdressingMountain from '../components/illustrations/SvgTopdressingMountain';

export default function Slide17KaliQ4({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#FFF3DA', color: '#D97706' }}>
            <span style={{ fontSize: 14, fontWeight: 900 }}>PHÂN KALI (K) • CÂU HỎI 04 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            THỜI ĐIỂM VÀNG CHO BÓN THÚC KALI
          </h2>
        </div>

        <div className="slide-header-badge">
          <div className="slide-header-badge-icon" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
            70%
          </div>
          <div className="slide-header-badge-text">
            <div className="slide-header-badge-sub" style={{ color: '#FDE68A' }}>TỶ LỆ BÓN THÚC</div>
            <div className="slide-header-badge-main">Dành 60% – 70% Kali bón thúc</div>
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
          Tại sao phân kali luôn được ưu tiên để bón thúc (giai đoạn đón đòng, trổ hoa, tạo hạt, nuôi quả) thay vì bón lót toàn bộ từ đầu vụ?
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
          {/* Card 1: Đường cong sinh lý cây trồng */}
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
              01
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#B45309' }}>
                  ĐƯỜNG CONG NHU CẦU: CAO TRÀO ĐƠM HOA KẾT TRÁI
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: 6 }}>
                  ĐỈNH CAO TRÀO
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Cây con lúc đầu sinh khối nhỏ cần rất ít Kali. Nhu cầu ion K⁺ chỉ <strong>bùng nổ mạnh mẽ khi phân hóa mầm hoa, đón đòng, tích lũy tinh bột và nuôi quả</strong> nhằm đẩy mạnh quang hợp và dẫn truyền dinh dưỡng.
              </div>
            </div>
          </div>

          {/* Card 2: Nguy cơ rửa trôi nếu lót sớm */}
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
              02
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#0369A1' }}>
                  TAN CỰC NHANH — DỄ BỊ MƯA RỬA TRÔI MẤT
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: 6 }}>
                  DỄ RỬA TRÔI
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Các muối kali (KCl, K₂SO₄) tan rất nhanh trong nước ngầm. Nếu bón lót toàn bộ từ đầu vụ, mưa rào đầu mùa sẽ <strong>rửa trôi K⁺ xuống tầng đất sâu</strong> trước khi bộ rễ lớn kịp vươn tới hấp thụ.
              </div>
            </div>
          </div>

          {/* Card 3: Phân bổ lịch bón khoa học */}
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
                  TẬP TRUNG 60 – 70% LƯỢNG KALI BÓN THÚC
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: 6 }}>
                  BÓN THÚC 70%
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                • Bón lót: chỉ 20 – 30% để cây non tạo vách tế bào dẻo dai.<br />
                • Bón thúc đợt 1 (làm đòng / phân hóa nụ hoa): 40% K.<br />
                • Bón thúc đợt 2 (nuôi hạt thóc / dưỡng quả mọng): 30% K.
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
              LÚA
            </div>
            <span>
              <strong>Kinh nghiệm nhà nông:</strong> Bón thúc kali đón đòng trước trổ 15–20 ngày là chìa khóa vàng giúp bông lúa trổ đều, hạt vàng óng không lo lép lửng.
            </span>
          </div>

          {/* Linh thú Bé Kali */}
          <CuteMascot 
            variant="banner"
            mascotType="SUNNY_K"
            emotion="happy"
            speech="Cứ đón đòng và nuôi trái là tớ xuất hiện tiếp sức ngay, mùa màng bội thu chắc luôn! 🌾✨"
            size={44}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG */}
        <div className="svg-stage-card">
          <SvgTopdressingMountain />
        </div>
      </div>
    </div>
  );
}
