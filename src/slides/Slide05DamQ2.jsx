import React, { useState } from 'react';
import QuestionSlide from './QuestionSlide';
import SvgPercentTubes from '../components/illustrations/SvgPercentTubes';

const FERTILIZER_RANKING = [
  {
    id: 'urea',
    rank: '🥇 HẠNG 1',
    name: 'Đạm Urê',
    formula: 'CO(NH₂)₂',
    nPercent: '46.7%',
    desc: 'Hàm lượng N cao nhất (M = 60 g/mol). 100 kg Urê cung cấp đủ 46 kg N nguyên chất.',
    accent: 'var(--n-main)',
    deep: 'var(--n-deep)',
    soft: 'var(--n-tint)',
  },
  {
    id: 'nh4cl',
    rank: '🥈 HẠNG 2',
    name: 'Amoni clorua',
    formula: 'NH₄Cl',
    nPercent: '26.2%',
    desc: 'Cung cấp N và Cl⁻. Cần 176 kg phân để có 46 kg N. Không dùng cho cây kỵ clo.',
    accent: 'var(--water)',
    deep: 'var(--water-deep)',
    soft: 'var(--water-tint)',
  },
  {
    id: 'sa',
    rank: '🥉 HẠNG 3',
    name: 'Đạm SA (Sunfat)',
    formula: '(NH₄)₂SO₄',
    nPercent: '21.2%',
    desc: 'Bổ sung thêm 24% Lưu huỳnh (S) tạo hương thơm. Cần 217 kg phân để đạt 46 kg N.',
    accent: 'var(--p-main)',
    deep: 'var(--p-deep)',
    soft: 'var(--p-tint)',
  },
  {
    id: 'nano3',
    rank: '🏷️ HẠNG 4',
    name: 'Natri nitrat',
    formula: 'NaNO₃',
    nPercent: '16.5%',
    desc: 'Dạng NO₃⁻ hấp thu nhanh nhưng %N thấp nhất. Cần tới 279 kg phân cho 46 kg N.',
    accent: 'var(--k-main)',
    deep: 'var(--k-deep)',
    soft: 'var(--k-tint)',
  },
];

const PILLARS = [
  {
    id: 'criteria',
    number: '01',
    tone: 'blue',
    title: 'TIÊU CHÍ CHUẨN: % KHỐI LƯỢNG NITƠ (%N)',
    badge: '%N ĐỊNH LƯỢNG',
    desc: (
      <>
        Độ dinh dưỡng của phân đạm đo bằng <strong>% khối lượng Nitơ (%N)</strong>: <strong>%N = (m_N / M_phân) × 100%</strong>. %N càng cao thì lượng phân cần bón càng ít.
      </>
    ),
  },
  {
    id: 'urea',
    number: '02',
    tone: 'green',
    title: 'URÊ CO(NH₂)₂: 46.7% N — QUÁN QUÂN ĐỘ ĐẠM',
    badge: '46.7% N (HẠNG 1)',
    desc: (
      <>
        Chứa <strong>2 nhóm amin (-NH₂)</strong> gắn gốc cacbonyl nhẹ (M = 60). Đạt <strong>~46% N</strong> — cao gấp đôi phân khác, tiết kiệm tối đa bao bì và vận chuyển.
      </>
    ),
  },
];

export default function Slide05DamQ2({ onOpenNotes }) {
  const [selectedTube, setSelectedTube] = useState('urea');
  const currentItem = FERTILIZER_RANKING.find((item) => item.id === selectedTube) || FERTILIZER_RANKING[0];

  const rankingGrid = (
    <div
      className="pillar-card"
      style={{
        '--card-accent': 'var(--p-main)',
        '--card-soft': 'var(--p-tint)',
        '--card-deep': 'var(--p-deep)',
        flexDirection: 'column',
        gap: 7,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div className="pillar-num" style={{ width: 28, height: 28, fontSize: 13 }}>
          03
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--p-deep)' }}>
          SO SÁNH HÀM LƯỢNG %N (BẤM CHỌN LOẠI PHÂN):
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, width: '100%' }}>
        {FERTILIZER_RANKING.map((item) => {
          const isActive = selectedTube === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedTube(item.id)}
              style={{
                padding: '6px 11px',
                borderRadius: 10,
                background: isActive ? item.soft : '#F8FAFC',
                border: `1.5px solid ${isActive ? item.accent : 'var(--line)'}`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                fontFamily: 'inherit',
                transition: 'background-color 0.16s ease, border-color 0.16s ease',
              }}
            >
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 900, color: item.deep }}>{item.rank}</div>
                <div style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--ink)' }}>{item.name}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 900, color: item.deep }}>{item.nPercent}</div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <QuestionSlide
      chapter="dam"
      pillText="PHÂN ĐẠM (N) • CÂU HỎI 02 / 15"
      title="ĐÁNH GIÁ ĐỘ DINH DƯỠNG & VƯƠNG MIỆN ĐẠM URÊ"
      badgeIcon="%N"
      badgeSub="CÔNG THỨC QUY ĐỔI"
      badgeMain="%N = (m_N / M_phân) × 100%"
      question="Độ dinh dưỡng của phân đạm đánh giá theo chỉ tiêu nào? Xếp hạng %N giữa Urê, NH₄Cl, (NH₄)₂SO₄, NaNO₃ và vì sao Urê dẫn đầu?"
      pillars={PILLARS}
      activeCardId={selectedTube === 'urea' ? 'urea' : 'criteria'}
      onSelectCard={(id) => id === 'urea' && setSelectedTube('urea')}
      customBottomCard={rankingGrid}
      mascot={{
        mascotType: 'SPROUTY_N',
        emotion: selectedTube === 'urea' ? 'proud' : 'scientist',
        speech:
          selectedTube === 'urea'
            ? 'Tớ là Đạm Urê, mang vương miện 46% N! Chỉ cần 1 bao 50kg là bằng cả 2–3 bao phân khác đấy! 👑'
            : `${currentItem.name} (${currentItem.formula}) đạt ${currentItem.nPercent}. ${currentItem.desc}`,
      }}
      svgCard={{
        title: 'BẢNG ĐO %N & ỐNG NGHIỆM ĐẠM',
        subtitle: 'So sánh hàm lượng % khối lượng Nitơ nguyên chất • Urê quán quân 46%',
        badge: '46.7% N',
        takeaway:
          'Độ dinh dưỡng của phân đạm được tính bằng %N = (m_N / M_phân) × 100%. Phân Urê CO(NH₂)₂ chiếm ngôi vị quán quân với ~46% N, tiết kiệm tối đa chi phí bao bì, vận chuyển và công bón.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgPercentTubes selectedId={selectedTube} onSelect={setSelectedTube} />
    </QuestionSlide>
  );
}
