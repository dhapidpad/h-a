import React from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgSoilBalance from '../components/illustrations/SvgSoilBalance';

export default function Slide08DamQ5({ onOpenNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}>
            <span style={{ fontSize: 13, fontWeight: 900 }}>PHÂN ĐẠM (N) • CÂU HỎI 05 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            PHỤC HỒI ĐẤT CHUA: NGUYÊN TẮC "4 ĐÚNG" &amp; VI SINH HỮU CƠ
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
            background: '#16A34A',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 12
          }}>
            4Đ
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#86EFAC' }}>MỤC TIÊU BỀN VỮNG</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Đúng Loại • Đúng Liều • Lúc • Cách</div>
          </div>
        </div>
      </div>

      {/* Banner câu hỏi thảo luận */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
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
          Làm thế nào để khắc phục tình trạng đất bị chua hóa và thoái hóa do bón phân đạm khoáng vô cơ lâu năm? Các giải pháp kết hợp hiệu quả là gì?
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
          {/* Card 1: Bón vôi khử chua */}
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
              color: '#B45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 12,
              flexShrink: 0
            }}>
              pH
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#B45309' }}>
                  BÓN VÔI KHỬ CHUA CÂN BẰNG PH
                </span>
                <span style={{ fontSize: 11, fontWeight: 900, background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: 6 }}>
                  pH 6.0 - 6.8
                </span>
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Bón vôi nông nghiệp (CaCO₃, CaO) định kỳ để <strong>trung hòa ion H⁺ tự do</strong> sinh ra từ quá trình nitrat hóa đạm amoni, nâng pH từ mức chua (&lt; 5.0) về ngưỡng trung tính lý tưởng cho rễ.
              </div>
            </div>
          </div>

          {/* Card 2: Hữu cơ vi sinh */}
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
              color: '#15803D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 11,
              flexShrink: 0
            }}>
              MÙN
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#15803D' }}>
                  HỮU CƠ VI SINH: TÁI TẠO TẦNG MÙN & KEO ĐẤT
                </span>
                <span style={{ fontSize: 11, fontWeight: 900, background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: 6 }}>
                  BIOCHAR
                </span>
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Bổ sung <strong>phân chuồng hoai mục, than sinh học (biochar)</strong>. Tái tạo tầng keo mùn xốp, gia tăng dung tích hấp phụ CEC, nuôi giun đất và bảo vệ hệ vi sinh vật đối kháng có lợi.
              </div>
            </div>
          </div>

          {/* Card 3: Phân đạm thông minh CRF */}
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
              borderRadius: 10,
              background: '#EDE9FE',
              color: '#7C3AED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 11,
              flexShrink: 0
            }}>
              CRF
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#5B21B6' }}>
                  PHÂN TAN CHẬM CÓ KIỂM SOÁT (CRF) & LUÂN CANH ĐẬU
                </span>
                <span style={{ fontSize: 11, fontWeight: 900, background: '#EDE9FE', color: '#7C3AED', padding: '2px 8px', borderRadius: 6 }}>
                  CÔNG NGHỆ CAO
                </span>
              </div>
              <div style={{ fontSize: 13.5, color: '#1E293B', lineHeight: 1.48 }}>
                Ứng dụng <strong>Urê bọc polymer tan chậm</strong> nhả dưỡng chất theo nhu cầu cây suốt 60–90 ngày. Kết hợp luân canh cây họ Đậu với vi khuẩn nốt sần Rhizobium để cố định đạm sinh học tự nhiên.
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
            fontSize: 13,
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
              fontSize: 10
            }}>
              4Đ
            </div>
            <span>
              <strong>Công thức thành công:</strong> Cắt giảm 20–30% đạm hóa học, bù đắp bằng hữu cơ vi sinh giúp đất tơi xốp, giữ ẩm tốt và không lo bạc màu.
            </span>
          </div>

          {/* Linh thú Bé Đạm */}
          <CuteMascot
            variant="banner"
            mascotType="SPROUTY_N"
            emotion="happy"
            speech="Cho đất ăn thêm phân hữu cơ và rải vôi khử chua, đất sẽ khỏe mạnh và nuôi tớ tốt nhất bạn nhé! 🌱✨"
            size={52}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: 22,
          border: '1.5px solid #86EFAC',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          minHeight: 0
        }}>
          <SvgSoilBalance />
        </div>
      </div>
    </div>
  );
}
