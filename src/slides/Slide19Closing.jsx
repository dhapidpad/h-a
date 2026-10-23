import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import SvgClosingEco from '../components/illustrations/SvgClosingEco';
import CuteMascot from '../components/mascot/CuteMascot';

export default function Slide19Closing({ slide }) {
  const [showQaModal, setShowQaModal] = useState(false);

  const handleConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 }
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(420px, 480px) 1fr', height: '100%', gap: 32, alignItems: 'center', overflow: 'hidden' }}>
      {/* Cột trái: Lời cảm ơn & Thông điệp 4 Đúng */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto', paddingRight: 6 }}>
        <div className="chapter-pill" style={{ background: '#EAF2FF', color: '#2F80ED', width: 'fit-content' }}>
          <span style={{ fontSize: 13, fontWeight: 900 }}>TỔNG KẾT & KẾT THÚC</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: '#17243A', lineHeight: 1.15, margin: 0 }}>
          NPK CÂN ĐỐI — VÌ NÔNG NGHIỆP XANH BỀN VỮNG
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Nguyên tắc 1: Đúng loại */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12, 
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 12,
            border: '1px solid #DCFCE7'
          }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: '#DCFCE7',
              color: '#15803D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 13,
              flexShrink: 0
            }}>
              ✓
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1E824C' }}>
              <strong>Đúng Loại:</strong> Đạm cho lá, Lân cho rễ, Kali cho quả hạt
            </div>
          </div>

          {/* Nguyên tắc 2: Đúng liều */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12, 
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 12,
            border: '1px solid #EDE9FE'
          }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: '#EDE9FE',
              color: '#6D28D9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 13,
              flexShrink: 0
            }}>
              ✓
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#5B21B6' }}>
              <strong>Đúng Liều:</strong> Phân tích đất & đáp ứng đúng nhu cầu sinh lý
            </div>
          </div>

          {/* Nguyên tắc 3: Đúng lúc */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12, 
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 12,
            border: '1px solid #FEF3C7'
          }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: '#FEF3C7',
              color: '#B45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 13,
              flexShrink: 0
            }}>
              ✓
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#B45309' }}>
              <strong>Đúng Lúc:</strong> Lót lân đầu vụ, thúc đạm kali đón đòng nuôi hạt
            </div>
          </div>

          {/* Nguyên tắc 4: Đúng cách */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12, 
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 12,
            border: '1px solid #E0F2FE'
          }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: '#E0F2FE',
              color: '#0284C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 13,
              flexShrink: 0
            }}>
              ✓
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0369A1' }}>
              <strong>Đúng Cách:</strong> Vùi sâu phủ kín, kết hợp hữu cơ giữ đất khỏe
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
          <button 
            onClick={handleConfetti}
            style={{ 
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 30,
              padding: '12px 24px',
              fontSize: 15,
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(16,185,129,0.35)',
              transition: 'transform 0.2s'
            }}
          >
            <span>🎉 CHÚC MỪNG VỤ MÙA!</span>
          </button>

          <button 
            onClick={() => setShowQaModal(!showQaModal)}
            style={{ 
              background: '#FFFFFF',
              color: '#2F80ED',
              border: '2px solid #2F80ED',
              borderRadius: 30,
              padding: '12px 20px',
              fontSize: 15,
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer'
            }}
          >
            <span>💬 Hỏi & Đáp (Q&A)</span>
          </button>
        </div>

        {showQaModal && (
          <div style={{ 
            background: '#F8FAFC', 
            border: '1.5px solid #CBD5E1', 
            borderRadius: 14, 
            padding: 12,
            fontSize: 13,
            color: '#334155',
            lineHeight: 1.45
          }}>
            💬 <strong>Nhóm xin trân trọng cảm ơn và sẵn sàng lắng nghe mọi câu hỏi, ý kiến đóng góp từ thầy cô và các bạn!</strong>
          </div>
        )}

        {/* Mascot Banner trong cột trái, KHÔNG BAO GIỜ CHE KHUẤT HÌNH */}
        <CuteMascot 
          variant="banner"
          mascotType="SPROUTY_N"
          emotion="proud"
          speech="Cảm ơn thầy cô và các bạn đã theo dõi bài báo cáo của nhóm nha! Chúc mọi người một ngày học tập thật tuyệt vời! 🌱✨"
          size={52}
        />
      </div>

      {/* Cột phải: Vòng tròn sinh thái NPK hội tụ 100% SVG */}
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.96)',
        borderRadius: 24,
        border: '1.5px solid #E2E8F0',
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.07)',
        padding: 8,
        minHeight: 0,
        overflow: 'hidden'
      }}>
        <SvgClosingEco />
      </div>
    </div>
  );
}
