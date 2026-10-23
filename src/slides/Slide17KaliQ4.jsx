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
            <span style={{ fontSize: 13, fontWeight: 900 }}>PHÂN KALI (K) • CÂU HỎI 04 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            THỜI ĐIỂM VÀNG CHO BÓN THÚC KALI
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
            70%
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#FDE68A' }}>TỶ LỆ BÓN THÚC</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Dành 60% – 70% Kali bón thúc</div>
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
          Tại sao phân kali luôn được ưu tiên để bón thúc (giai đoạn đón đòng, trổ hoa, tạo hạt, nuôi quả) thay vì bón lót toàn bộ từ đầu vụ?
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
          {/* Card 1: Đường cong sinh lý cây trồng */}
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
              ĐỈNH
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#B45309', marginBottom: 2 }}>
                ĐƯỜNG CONG NHU CẦU: CAO TRÀO ĐƠM HOA KẾT TRÁI
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Cây con lúc đầu sinh khối nhỏ cần rất ít Kali. Nhu cầu ion K⁺ chỉ <strong>bùng nổ mạnh mẽ khi phân hóa mầm hoa, đón đòng, tích lũy tinh bột và nuôi quả</strong> nhằm đẩy mạnh quang hợp và dẫn truyền dinh dưỡng.
              </div>
            </div>
          </div>

          {/* Card 2: Nguy cơ rửa trôi nếu lót sớm */}
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
              fontSize: 9.5,
              flexShrink: 0
            }}>
              DỄ TRÔI
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0369A1', marginBottom: 2 }}>
                TAN CỰC NHANH — DỄ BỊ MƯA RỬA TRÔI MẤT
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Các muối kali (KCl, K₂SO₄) tan rất nhanh trong nước ngầm. Nếu bón lót toàn bộ từ đầu vụ, mưa rào đầu mùa sẽ <strong>rửa trôi K⁺ xuống tầng đất sâu</strong> trước khi bộ rễ lớn kịp vươn tới hấp thụ.
              </div>
            </div>
          </div>

          {/* Card 3: Phân bổ lịch bón khoa học */}
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
              70%
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#15803D', marginBottom: 2 }}>
                TẬP TRUNG 60 – 70% LƯỢNG KALI BÓN THÚC
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
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
              fontSize: 10
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
          <SvgTopdressingMountain />
        </div>
      </div>
    </div>
  );
}
