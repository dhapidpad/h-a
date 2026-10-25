import React, { useState } from 'react';
import QuestionSlide from './QuestionSlide';
import SvgChlorophyllFactory from '../components/illustrations/SvgChlorophyllFactory';

const PILLARS = [
  {
    id: 'chloroplast',
    number: '01',
    tone: 'green',
    title: 'ĐỘNG CƠ QUANG HỢP — TẠO NĂNG LƯỢNG',
    badge: 'C₅₅H₇₂O₅N₄Mg',
    desc: (
      <>
        Nitơ là nguyên tử trung tâm của <strong>Diệp lục (Chlorophyll)</strong>. Thiếu N, lá mất màu xanh, quang hợp đình trệ và suy kiệt năng lượng.
      </>
    ),
  },
  {
    id: 'ions',
    number: '02',
    tone: 'blue',
    title: '2 DẠNG ION RỄ CÂY TRỰC TIẾP HÚT',
    badge: 'NH₄⁺ & NO₃⁻',
    desc: (
      <>
        Cây <strong>không hấp thụ được N₂</strong> khí quyển. Rễ chỉ hút Nitơ khoáng hòa tan ở 2 dạng ion: <strong>Amoni (NH₄⁺)</strong> và <strong>Nitrat (NO₃⁻)</strong>.
      </>
    ),
  },
  {
    id: 'protein',
    number: '03',
    tone: 'purple',
    title: 'XÂY DỰNG PROTEIN & BỘ GEN DI TRUYỀN',
    badge: 'Axit Amin / ADN',
    desc: (
      <>
        Nitơ cấu thành <strong>20 loại Axit Amin</strong> tổng hợp Protein thực vật và các bazơ nitơ trong <strong>ADN/ARN</strong> điều khiển nhân đôi tế bào.
      </>
    ),
  },
];

export default function Slide04DamQ1({ onOpenNotes }) {
  const [diagMode, setDiagMode] = useState('deficiency');

  const diagBox = (
    <div
      style={{
        background: diagMode === 'deficiency' ? 'var(--k-soft)' : diagMode === 'excess' ? 'var(--danger-soft)' : 'var(--n-soft)',
        borderRadius: 14,
        padding: '8px 13px',
        border: `1.5px solid ${diagMode === 'deficiency' ? 'var(--k-main)' : diagMode === 'excess' ? 'var(--danger)' : 'var(--n-main)'}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ fontSize: 13.5, fontWeight: 900, color: 'var(--ink)' }}>
          CHẨN ĐOÁN THỰC TIỄN ĐỒNG RUỘNG:
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {[
            { key: 'deficiency', label: 'Thiếu Đạm' },
            { key: 'optimal', label: 'Đủ Đạm' },
            { key: 'excess', label: 'Thừa Đạm' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setDiagMode(tab.key)}
              style={{
                border: 'none',
                borderRadius: 6,
                padding: '3px 9px',
                fontSize: 12.5,
                fontWeight: 800,
                cursor: 'pointer',
                background: diagMode === tab.key ? 'var(--ink)' : '#FFFFFF',
                color: diagMode === tab.key ? '#FFFFFF' : 'var(--ink-soft)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.06)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.4 }}>
        {diagMode === 'deficiency' && (
          <>
            <strong style={{ color: 'var(--k-deep)' }}>Thiếu N:</strong> Lá già ở gốc vàng úa hình chữ V từ chóp vào gân lá, cây còi cọc đẻ nhánh kém.
          </>
        )}
        {diagMode === 'optimal' && (
          <>
            <strong style={{ color: 'var(--n-deep)' }}>Cân đối N:</strong> Lá xanh mướt dày dặn, quang hợp sung sức, đâm chồi nhánh đồng loạt.
          </>
        )}
        {diagMode === 'excess' && (
          <>
            <strong style={{ color: 'var(--danger-deep)' }}>Thừa N:</strong> Lá xanh đen mềm nhũn, dễ <strong>lốp đổ ngã</strong>, sâu bệnh hại và tích lũy <strong>NO₃⁻ dư</strong>.
          </>
        )}
      </div>
    </div>
  );

  return (
    <QuestionSlide
      chapter="dam"
      pillText="PHÂN ĐẠM (N) • CÂU HỎI 01 / 15"
      title="NITƠ (N) — ĐỘNG CƠ CỦA MÀU XANH & SINH KHỐI"
      badgeIcon="N"
      badgeSub="ĐỘ ĐẠM TIÊU CHUẨN"
      badgeMain="Đo bằng %N khối lượng"
      question="Phân đạm cung cấp nguyên tố gì? Vai trò cốt lõi của Nitơ với màu xanh sinh khối và 2 dạng ion rễ cây trực tiếp hấp thụ?"
      questionChips={[
        { label: 'NH₄⁺ Amoni', tone: 'purple' },
        { label: 'NO₃⁻ Nitrat', tone: 'blue' },
      ]}
      pillars={PILLARS}
      customBottomCard={diagBox}
      mascot={{
        mascotType: 'SPROUTY_N',
        emotion: 'teacher',
        speech: 'Cây không hít được khí N₂ đâu nhé! Rễ chỉ uống được ion Amoni NH₄⁺ và Nitrat NO₃⁻ hòa tan thôi! 🌱✨',
      }}
      svgCard={{
        title: 'NHÀ MÁY DIỆP LỤC & LỤC LẠP',
        subtitle: 'Động cơ quang hợp • Cấu trúc C₅₅H₇₂O₅N₄Mg & tổng hợp Protein',
        badge: 'C₅₅H₇₂O₅N₄Mg',
        takeaway:
          'Nitơ là nguyên tử trung tâm xây dựng phân tử Diệp Lục (C₅₅H₇₂O₅N₄Mg) và Axit Amin để tổng hợp toàn bộ Protein thực vật. Bộ rễ chỉ hút được Nitơ khoáng hòa tan ở 2 dạng ion: Amoni (NH₄⁺) và Nitrat (NO₃⁻).',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgChlorophyllFactory />
    </QuestionSlide>
  );
}
