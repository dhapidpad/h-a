import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgSoilCompaction from '../components/illustrations/SvgSoilCompaction';

export default function Slide18KaliQ5({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#FFF3DA', color: '#D97706' }}>
            <span style={{ fontSize: 13, fontWeight: 900 }}>PHÂN KALI (K) • CÂU HỎI 05 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            HỆ LỤY LẠM DỤNG KCL: ĐẤT CHAI CỨNG &amp; BÍ KHÍ
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
            background: '#EF4444',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 11
          }}>
            EC
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#FCA5A5' }}>NGƯỠNG AN TOÀN ĐẤT</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Độ dẫn điện EC &lt; 1.5 mS/cm</div>
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
          Lạm dụng phân KCl lâu dài làm gia tăng độ mặn (EC) của đất ra sao? Phá vỡ cấu trúc đất, làm đất chai cứng và tiêu diệt vi sinh vật như thế nào?
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
          {/* Card 1: Gia tăng độ mặn đất & hạn sinh lý */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '11px 16px',
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
              borderRadius: 10,
              background: '#FEE2E2',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 11,
              flexShrink: 0
            }}>
              EC↑
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#B91C1C', marginBottom: 2 }}>
                TÍCH TỤ ĐỘ MẶN (EC TĂNG) — NGUY CƠ HẠN SINH LÝ
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Ion Cl⁻ dư thừa làm tăng chỉ số độ dẫn điện (EC) trong đất. Áp suất thẩm thấu dung dịch đất cao hơn dịch tế bào rễ, dẫn đến hiện tượng <strong>hạn sinh lý: rễ bị hút ngược nước ra ngoài</strong>, lông hút rễ teo tóp khô héo.
              </div>
            </div>
          </div>

          {/* Card 2: Phá vỡ kết cấu đất chai cứng */}
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
              fontSize: 9.5,
              flexShrink: 0
            }}>
              DẼ ĐẤT
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#B45309', marginBottom: 2 }}>
                PHÁ HỦY KEO ĐẤT — NÉN CHẶT CHAI CỨNG BÍ KHÍ
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Cl⁻ liên kết với Ca²⁺, Mg²⁺ tạo muối tan bị trôi theo dòng nước ngầm. Thiếu các cation đa hóa trị làm <strong>tan rã hạt keo đất viên đoàn</strong>, đất bị nén chặt như bê tông, mất khe hở mao quản khiến rễ bị nghẹt oxy.
              </div>
            </div>
          </div>

          {/* Card 3: Phục hồi & Luân phiên */}
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
              HỮU CƠ
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#15803D', marginBottom: 2 }}>
                GIẢI PHÁP: LUÂN PHIÊN K₂SO₄ & BỒI BỔ HỮU CƠ
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Luân phiên sang <strong>K₂SO₄ hoặc nguồn kali hữu cơ</strong> (tro trấu, phân trùn quế). Xới xáo phá váng bề mặt, bón vôi nông nghiệp bù lại Ca²⁺ và bổ sung nấm đối kháng Trichoderma phục hồi độ xốp đất.
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
              EC
            </div>
            <span>
              <strong>Kiểm tra định kỳ:</strong> Sử dụng bút đo độ mặn EC (&lt; 1.5 mS/cm là ngưỡng an toàn) trước khi quyết định bổ sung thêm muối kali khoáng vào đất.
            </span>
          </div>

          {/* Linh thú Bé Kali */}
          <CuteMascot 
            variant="banner"
            mascotType="SUNNY_K"
            emotion="worried"
            speech="Đừng bón KCl quá liều kẻo đất bị nghẹt thở và khát nước ngược đó nha! 🩺🧪"
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
          <SvgSoilCompaction />
        </div>
      </div>
    </div>
  );
}
