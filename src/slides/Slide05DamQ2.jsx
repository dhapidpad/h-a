import React, { useState } from 'react';
import QuestionSlide from './QuestionSlide';
import SvgPercentTubes from '../components/illustrations/SvgPercentTubes';

/* ==========================================================================
   SLIDE 05 — ĐẠM CÂU 2: TÍNH %N VÀ LOẠI CAO NHẤT (MỤC 5 - SLIDE 05)
   - Tiêu đề: ĐỌC %N: URÊ CÓ HÀM LƯỢNG LÝ THUYẾT CAO NHẤT
   - Biểu đồ thanh ngang cùng scale từ cao xuống thấp:
     1. Urê CO(NH₂)₂: ≈ 46,7% N
     2. Amoni clorua NH₄Cl: ≈ 26,2% N
     3. Amoni sunfat (NH₄)₂SO₄: ≈ 21,2% N
     4. Natri nitrat NaNO₃: ≈ 16,5% N
   - Chú giải: Tính từ công thức tinh khiết; hàm lượng thương mại phụ thuộc grade/độ tinh khiết và nhãn sản phẩm.
   ========================================================================== */

const FERTILIZER_BARS = [
  {
    id: 'urea',
    name: 'Urê',
    formula: 'CO(NH₂)₂',
    percent: 46.7,
    label: '≈ 46,7% N',
    calc: 'M ≈ 60 g/mol · 28 g N → (28/60)×100% ≈ 46,7%',
    color: '#16A36A',
    soft: '#DCFCE7',
    deep: '#116946'
  },
  {
    id: 'nh4cl',
    name: 'Amoni clorua',
    formula: 'NH₄Cl',
    percent: 26.2,
    label: '≈ 26,2% N',
    calc: 'M ≈ 53,5 g/mol · 14 g N → (14/53,5)×100% ≈ 26,2%',
    color: '#1D75A8',
    soft: '#DCEFF9',
    deep: '#124E73'
  },
  {
    id: 'nh42so4',
    name: 'Amoni sunfat',
    formula: '(NH₄)₂SO₄',
    percent: 21.2,
    label: '≈ 21,2% N',
    calc: 'M ≈ 132 g/mol · 28 g N → (28/132)×100% ≈ 21,2%',
    color: '#7862E8',
    soft: '#E9E4FC',
    deep: '#4A36B0'
  },
  {
    id: 'nano3',
    name: 'Natri nitrat',
    formula: 'NaNO₃',
    percent: 16.5,
    label: '≈ 16,5% N',
    calc: 'M ≈ 85 g/mol · 14 g N → (14/85)×100% ≈ 16,5%',
    color: '#E8A13A',
    soft: '#FDECCE',
    deep: '#965710'
  }
];

const PILLARS = [
  {
    id: 'criteria',
    number: '01',
    tone: 'green',
    title: 'CHỈ TIÊU ĐÁNH GIÁ: % KHỐI LƯỢNG NITƠ (%N)',
    badge: '%N = (m_N / M) × 100%',
    desc: (
      <>
        Độ dinh dưỡng của phân đạm xét theo <strong>phần trăm khối lượng nitơ (%N)</strong>. Trong 4 công thức đã cho,{' '}
        <strong>Urê CO(NH₂)₂ đạt cao nhất (≈ 46,7% N)</strong>.
      </>
    )
  }
];

export default function Slide05DamQ2({ onOpenNotes }) {
  const [selectedId, setSelectedId] = useState('urea');
  const currentItem = FERTILIZER_BARS.find((item) => item.id === selectedId) || FERTILIZER_BARS[0];

  const horizontalChartCard = (
    <div
      className="pillar-card"
      style={{
        '--card-accent': 'var(--n-main)',
        '--card-soft': 'var(--n-tint)',
        '--card-deep': 'var(--n-deep)',
        flexDirection: 'column',
        gap: 8,
        padding: '10px 14px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ fontSize: 14.5, fontWeight: 900, color: 'var(--n-deep)' }}>
          SO SÁNH %N LÝ THUYẾT (THANG 0–50% N):
        </span>
        <span style={{ fontSize: 12.2, fontWeight: 700, color: 'var(--ink-mute)' }}>
          {currentItem.calc}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: '100%' }}>
        {FERTILIZER_BARS.map((bar) => {
          const isSelected = bar.id === selectedId;
          const widthPct = Math.round((bar.percent / 50) * 100);
          return (
            <button
              key={bar.id}
              type="button"
              onClick={() => setSelectedId(bar.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                padding: '6px 10px',
                borderRadius: 11,
                border: `1.5px solid ${isSelected ? bar.color : 'var(--line)'}`,
                background: isSelected ? bar.soft : '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14.2, fontWeight: 800, color: 'var(--ink)' }}>
                  {bar.name}{' '}
                  <code style={{ fontWeight: 900, color: bar.deep, fontSize: 13.8 }}>{bar.formula}</code>
                </span>
                <span style={{ fontSize: 15, fontWeight: 900, color: bar.deep }}>{bar.label}</span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 9,
                  borderRadius: 999,
                  background: '#E8ECE9',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${widthPct}%`,
                    height: '100%',
                    borderRadius: 999,
                    background: bar.color,
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div
        style={{
          fontSize: 12.8,
          fontWeight: 600,
          color: 'var(--ink-mute)',
          borderTop: '1px dashed var(--line)',
          paddingTop: 5
        }}
      >
        Chú giải: Tính từ công thức tinh khiết; hàm lượng thương mại phụ thuộc grade/độ tinh khiết và nhãn sản phẩm.
      </div>
    </div>
  );

  return (
    <QuestionSlide
      chapter="dam"
      pillText="PHÂN ĐẠM (N) • CÂU 02 / 15"
      title="ĐỌC %N: URÊ CÓ HÀM LƯỢNG LÝ THUYẾT CAO NHẤT"
      badgeIcon="%N"
      badgeSub="CAO NHẤT LÝ THUYẾT"
      badgeMain="Urê CO(NH₂)₂ ≈ 46,7% N"
      question="Urê dẫn đầu hàm lượng %N lý thuyết trong 4 loại phân đạm phổ biến; khi sử dụng thực tế cần đọc grade trên nhãn."
      pillars={PILLARS}
      customBottomCard={horizontalChartCard}
      mascot={{
        mascotType: 'SPROUTY_N',
        emotion: 'proud',
        speech: `${currentItem.name} (${currentItem.formula}): ${currentItem.calc}. Luôn xem nhãn bao bì khi bón nhé! 📊`
      }}
      svgCard={{
        title: 'SO SÁNH %N CỦA 4 LOẠI PHÂN ĐẠM',
        subtitle: 'CO(NH₂)₂ ≈ 46,7% · NH₄Cl ≈ 26,2% · (NH₄)₂SO₄ ≈ 21,2% · NaNO₃ ≈ 16,5%',
        badge: '≈ 46,7% N',
        takeaway:
          'Xét theo công thức tinh khiết, Urê CO(NH₂)₂ có %N cao nhất (≈ 46,7%). Trên thị trường, hàm lượng công bố phụ thuộc độ tinh khiết/tiêu chuẩn thương mại (thường khoảng 46% N).'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgPercentTubes selectedId={selectedId} onSelect={setSelectedId} />
    </QuestionSlide>
  );
}
