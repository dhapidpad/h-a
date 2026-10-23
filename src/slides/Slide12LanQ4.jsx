import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgBasalRocket from '../components/illustrations/SvgBasalRocket';

export default function Slide12LanQ4({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#F0EBFF', color: '#7C3AED' }}>
            <span style={{ fontSize: 13, fontWeight: 900 }}>PHÂN LÂN (P) • CÂU HỎI 04 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            VÌ SAO PHÂN LÂN LUÔN ĐƯỢC BÓN LÓT ĐẦU VỤ?
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
            background: '#F59E0B',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 10
          }}>
            100%
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#FCD34D' }}>KỸ THUẬT VÀNG</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Bón lót sâu 10 – 15 cm dưới rãnh</div>
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
          Tại sao phân lân luôn được dùng để bón lót sâu vào đất trước khi gieo trồng chứ ít khi dùng bón thúc rải mặt như phân đạm?
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
          {/* Card 1: Di chuyển cực chậm */}
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
                  TÍNH DI ĐỘNG KÉM: CHỈ NGẤM 1 – 3 CM TRONG CẢ VỤ
                </span>
                <span style={{ fontSize: 11, fontWeight: 900, background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: 6 }}>
                  1–3 CM / VỤ
                </span>
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Ion photphat H₂PO₄⁻ bị keo đất và các ion <strong>Fe³⁺, Al³⁺ (đất chua) hoặc Ca²⁺ (đất kiềm) kết tủa cố định</strong>. Lân hầu như không tự ngấm sâu xuống tầng dưới; nếu bón rải mặt thì rễ ở tầng sâu không với tới được.
              </div>
            </div>
          </div>

          {/* Card 2: Bệ phóng rễ non */}
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
              02
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#5B21B6' }}>
                  BỆ PHÓNG RỄ NON: MẦM NHÚ LÀ CẦN LÂN NGAY
                </span>
                <span style={{ fontSize: 11, fontWeight: 900, background: '#EDE9FE', color: '#5B21B6', padding: '2px 8px', borderRadius: 6 }}>
                  RỄ NON ATP
                </span>
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Cây con trong <strong>2–3 tuần đầu đời cần lượng photpho rất cao</strong> để phân chia tế bào mô phân sinh rễ và tạo năng lượng ATP. Nếu thiếu lân đầu vụ, rễ còi cọc và suốt chu kỳ sinh trưởng sau này không thể hồi phục.
              </div>
            </div>
          </div>

          {/* Card 3: Kỹ thuật bón lót chuẩn */}
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
                  KỸ THUẬT: ĐẶT PHÂN ĐÚNG TẦNG RỄ CÂY
                </span>
                <span style={{ fontSize: 11, fontWeight: 900, background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: 6 }}>
                  ĐÁY RÃNH 15CM
                </span>
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Bón lót sâu <strong>10 – 15 cm dưới đáy rãnh</strong> hoặc trộn đều trong lòng luống cùng phân hữu cơ trước khi gieo hạt hay đặt cây con. Rễ nhú ra tiếp xúc ngay dinh dưỡng sẽ đâm sâu tỏa rộng tức thì.
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
              fontSize: 10
            }}>
              100%
            </div>
            <span>
              <strong>Tỷ lệ bón:</strong> Dành trọn vẹn <strong>100% lượng phân lân cả mùa vụ để bón lót</strong> (khác biệt hoàn toàn với phân đạm và kali phải chia nhỏ bón thúc nhiều lần).
            </span>
          </div>

          {/* Linh thú Bé Lân */}
          <CuteMascot 
            variant="banner"
            mascotType="SPARKY_P"
            emotion="astronaut"
            speech="Hãy chôn tớ xuống sâu 10–15 cm nhé, tớ sẽ kích hoạt bệ phóng rễ non bay vút lên! 🚀⚡"
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
          <SvgBasalRocket />
        </div>
      </div>
    </div>
  );
}
