import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgStomataShield from '../components/illustrations/SvgStomataShield';

export default function Slide14KaliQ1({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#FFF3DA', color: '#D97706' }}>
            <span style={{ fontSize: 13, fontWeight: 900 }}>PHÂN KALI (K) • CÂU HỎI 01 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            K — VỆ SĨ ĐỀ KHÁNG &amp; TRẠM BƠM ĐƯỜNG BỘT
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
            fontSize: 14
          }}>
            K
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#FDE68A' }}>DẠNG ION TỒN TẠI</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Ion K⁺ tự do lưu động trong tế bào</div>
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
          Phân kali cung cấp nguyên tố nào, tồn tại dưới dạng ion gì? Vai trò của Kali (K) trong điều hòa khí khổng, vận chuyển đường bột và tăng sức đề kháng chống hạn rét, chống đổ?
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
          {/* Card 1: Điều tiết khí khổng */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '11px 16px',
            borderLeft: '5px solid #D97706',
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
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 12,
              flexShrink: 0
            }}>
              K⁺
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#92400E', marginBottom: 2 }}>
                ĐIỀU HÒA ĐÓNG MỞ KHÍ KHỔNG — CHỐNG HẠN RÉT
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Kali tồn tại dạng <strong>ion K⁺ tự do lưu động</strong> trong dịch bào. K⁺ đi vào tế bào hạt đậu làm mở khí khổng đón CO₂ quang hợp; khi gặp khô hạn hay rét buốt, K⁺ rút ra khép lỗ khí giữ nước, ngăn ngừa héo rũ mô lá.
              </div>
            </div>
          </div>

          {/* Card 2: Bơm đường bột về quả/củ */}
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
              fontSize: 9.5,
              flexShrink: 0
            }}>
              ĐƯỜNG
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#15803D', marginBottom: 2 }}>
                TRẠM VẬN CHUYỂN ĐƯỜNG BỘT VỀ CỦ QUẢ
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Đóng vai trò "đầu kéo container" dẫn truyền đường saccarozơ và tinh bột từ lá <strong>về tích trữ ở múi quả, củ và hạt</strong>. Tăng độ ngọt (Brix), củ to đặc ruột, hạt lúa vàng sáng chắc mẩy.
              </div>
            </div>
          </div>

          {/* Card 3: Tăng đề kháng & chống đổ */}
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
              fontSize: 10.5,
              flexShrink: 0
            }}>
              CỨNG
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#1D4ED8', marginBottom: 2 }}>
                HIỆP SĨ ĐỀ KHÁNG: CỨNG CÂY, CHỐNG ĐỔ NGÃ
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Gia tăng độ dày thành tế bào và mô cơ lóng thân cây, giúp thân rạ lúa cứng cáp, <strong>chống chịu giông lốc mưa bão đổ ngã</strong> và ngăn cản sợi nấm bệnh xâm nhập biểu bì lá.
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
              60+
            </div>
            <span>
              <strong>Kích hoạt Enzyme:</strong> Ion K⁺ là cofactor hoạt hóa hơn <strong>60 hệ thống enzyme sinh học</strong> điều khiển quang hợp, hô hấp và sinh tổng hợp protein thực vật.
            </span>
          </div>

          {/* Linh thú Bé Kali */}
          <CuteMascot 
            variant="banner"
            mascotType="SUNNY_K"
            emotion="knight"
            speech="Có tớ bảo vệ, cây trồng cứng cáp vững vàng, quả ngọt mọng nước thơm ngon! 🛡️🍊"
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
          <SvgStomataShield />
        </div>
      </div>
    </div>
  );
}
