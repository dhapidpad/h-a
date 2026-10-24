import React, { useState } from 'react';
import CuteMascot from '../components/mascot/CuteMascot';
import SvgPercentTubes from '../components/illustrations/SvgPercentTubes';

const FERTILIZER_RANKING = [
  {
    id: 'urea',
    rank: '🥇 HẠNG 1',
    name: 'Đạm Urê',
    formula: 'CO(NH₂)₂',
    nPercent: '46.7%',
    commercial: '~46% N',
    desc: 'Hàm lượng N cao nhất, khối lượng mol nhỏ (60 g/mol). 100 kg Urê cung cấp đủ 46 kg N nguyên chất.',
    accent: '#16A34A',
    accentLight: '#DCFCE7'
  },
  {
    id: 'nh4cl',
    rank: '🥈 HẠNG 2',
    name: 'Amoni clorua',
    formula: 'NH₄Cl',
    nPercent: '26.2%',
    commercial: '~25% N',
    desc: 'Cung cấp N và Cl⁻. Cần 176 kg phân để có được 46 kg N. Không dùng cho cây trồng mẫn cảm với clo.',
    accent: '#0284C7',
    accentLight: '#E0F2FE'
  },
  {
    id: 'sa',
    rank: '🥉 HẠNG 3',
    name: 'Đạm SA (Sunfat)',
    formula: '(NH₄)₂SO₄',
    nPercent: '21.2%',
    commercial: '~21% N',
    desc: 'Bổ sung thêm 24% Lưu huỳnh (S) kích thích mùi thơm. Cần 217 kg phân để đạt 46 kg N.',
    accent: '#7C3AED',
    accentLight: '#EDE9FE'
  },
  {
    id: 'nano3',
    rank: '🏷️ HẠNG 4',
    name: 'Natri nitrat',
    formula: 'NaNO₃',
    nPercent: '16.5%',
    commercial: '~16% N',
    desc: 'Dạng NO₃⁻ hấp thu nhanh, nhưng %N thấp nhất. Cần tới 279 kg phân để có được 46 kg N.',
    accent: '#D97706',
    accentLight: '#FEF3C7'
  }
];

export default function Slide05DamQ2({ onOpenNotes }) {
  const [selectedTube, setSelectedTube] = useState('urea');
  const currentItem = FERTILIZER_RANKING.find(item => item.id === selectedTube) || FERTILIZER_RANKING[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="chapter-pill" style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}>
            <span style={{ fontSize: 14, fontWeight: 900 }}>PHÂN ĐẠM (N) • CÂU HỎI 02 / 15</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2, fontSize: 26, color: '#0F172A' }}>
            ĐÁNH GIÁ ĐỘ DINH DƯỠNG &amp; VƯƠNG MIỆN ĐẠM URÊ
          </h2>
        </div>

        <div className="slide-header-badge">
          <div className="slide-header-badge-icon" style={{ background: 'linear-gradient(135deg, #22C55E 0%, #15803D 100%)' }}>
            %N
          </div>
          <div className="slide-header-badge-text">
            <div className="slide-header-badge-sub" style={{ color: '#86EFAC' }}>CÔNG THỨC QUY ĐỔI</div>
            <div className="slide-header-badge-main">%N = (m_N / M_phân) × 100%</div>
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
          Độ dinh dưỡng của phân đạm được đánh giá theo chỉ tiêu nào? Xếp hạng hàm lượng %N và vì sao phân Urê lại chiếm ngôi Quán Quân?
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
          {/* Card 1: Tiêu chuẩn %N */}
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
              01
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#0369A1' }}>
                  TIÊU CHÍ CHUẨN: % KHỐI LƯỢNG NITƠ (%N)
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: 6 }}>
                  %N ĐỊNH LƯỢNG
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Độ dinh dưỡng của phân đạm được đánh giá bằng <strong>% khối lượng Nitơ (%N)</strong> có trong phân: <strong>%N = (m_N / M_phân) × 100%</strong>. %N càng cao thì lượng phân cần bón càng ít.
              </div>
            </div>
          </div>

          {/* Card 2: Urê Quán quân */}
          <div 
            onClick={() => setSelectedTube('urea')}
            style={{
              background: selectedTube === 'urea' ? '#F0FDF4' : 'rgba(255, 255, 255, 0.96)',
              borderRadius: 14,
              padding: '9px 14px',
              borderLeft: '5px solid #16A34A',
              borderTop: `1px solid ${selectedTube === 'urea' ? '#86EFAC' : '#E2E8F0'}`,
              borderRight: `1px solid ${selectedTube === 'urea' ? '#86EFAC' : '#E2E8F0'}`,
              borderBottom: `1px solid ${selectedTube === 'urea' ? '#86EFAC' : '#E2E8F0'}`,
              boxShadow: selectedTube === 'urea' ? '0 8px 20px rgba(22, 163, 74, 0.1)' : '0 3px 10px rgba(15, 23, 42, 0.04)',
              cursor: 'pointer',
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start'
            }}
          >
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
              02
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#15803D' }}>
                  URÊ CO(NH₂)₂: 46.7% N — QUÁN QUÂN ĐỘ ĐẠM
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 900, background: '#16A34A', color: '#FFFFFF', padding: '2px 8px', borderRadius: 6 }}>
                  46.7% N (HẠNG 1)
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.42 }}>
                Chứa <strong>2 nhóm amin (-NH₂)</strong> gắn gốc cacbonyl rất nhẹ (M = 60 g/mol). Phân Urê thực tế đạt <strong>~46% N</strong> — cao vượt trội gấp đôi các loại phân khác, tiết kiệm tối đa bao bì và cước vận chuyển.
              </div>
            </div>
          </div>

          {/* Card 3: Bảng xếp hạng chọn 4 ống */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 14,
            padding: '10px 14px',
            borderLeft: '5px solid #7C3AED',
            borderTop: '1px solid #E2E8F0',
            borderRight: '1px solid #E2E8F0',
            borderBottom: '1px solid #E2E8F0',
            boxShadow: '0 3px 10px rgba(15, 23, 42, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: '#EDE9FE',
                color: '#7C3AED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 14,
                flexShrink: 0
              }}>
                03
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#5B21B6' }}>
                BẢNG SO SÁNH HÀM LƯỢNG %N (BẤM CHỌN LOẠI PHÂN):
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {FERTILIZER_RANKING.map((item) => {
                const isActive = selectedTube === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedTube(item.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 10,
                      background: isActive ? item.accentLight : '#F8FAFC',
                      border: `1.5px solid ${isActive ? item.accent : '#E2E8F0'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 900, color: item.accent }}>
                        {item.rank}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>
                        {item.name}
                      </div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: item.accent }}>
                      {item.nPercent}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Linh thú Bé Đạm */}
          <CuteMascot
            variant="banner"
            mascotType="SPROUTY_N"
            emotion={selectedTube === 'urea' ? 'proud' : 'scientist'}
            speech={
              selectedTube === 'urea'
                ? "Tớ là Đạm Urê, mang vương miện 46% N! Chỉ cần 1 bao 50kg là bằng cả 2-3 bao phân khác đấy! 👑"
                : `Loại ${currentItem.name} (${currentItem.formula}) có độ đạm ${currentItem.nPercent}. ${currentItem.desc}`
            }
            size={44}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: SVG */}
        <div className="svg-stage-card">
          <SvgPercentTubes selectedId={selectedTube} onSelect={setSelectedTube} />
        </div>
      </div>
    </div>
  );
}
