import React, { useState } from 'react';
import QuestionSlide from './QuestionSlide';
import SvgChlorophyllFactory from '../components/illustrations/SvgChlorophyllFactory';

/* ==========================================================================
   SLIDE 04 — ĐẠM CÂU 1: PHÂN ĐẠM LÀ GÌ? VAI TRÒ CỦA N (MỤC 5 - SLIDE 04)
   - Tiêu đề: N — VẬT LIỆU CHO MÀU XANH VÀ SINH KHỐI
   - Màn hình (3 ý):
     1. Cung cấp N khoáng: cây hấp thụ chủ yếu NH₄⁺ và NO₃⁻
     2. Tham gia cấu tạo amino acid/protein, axit nucleic và diệp lục
     3. Thiếu N thường làm lá già vàng, cây chậm lớn
   ========================================================================== */

const PILLARS = [
  {
    id: 'ions',
    number: '01',
    tone: 'green',
    title: 'CUNG CẤP N KHOÁNG: HẤP THỤ CHỦ YẾU NH₄⁺ VÀ NO₃⁻',
    badge: 'NH₄⁺ • NO₃⁻',
    desc: (
      <>
        Phân đạm cung cấp nitơ cho cây dưới dạng ion khoáng hòa tan là <strong>amoni (NH₄⁺)</strong> và{' '}
        <strong>nitrat (NO₃⁻)</strong>; cây không hấp thụ trực tiếp khí N₂.
      </>
    )
  },
  {
    id: 'protein',
    number: '02',
    tone: 'blue',
    title: 'THAM GIA CẤU TẠO AMINO ACID/PROTEIN, AXIT NUCLEIC & DIỆP LỤC',
    badge: 'Protein • Diệp lục',
    desc: (
      <>
        Nitơ là thành phần thiết yếu cấu tạo <strong>amino acid, protein, enzyme, axit nucleic (ADN/ARN)</strong> và{' '}
        <strong>phân tử diệp lục</strong> giúp cây quang hợp.
      </>
    )
  },
  {
    id: 'symptom',
    number: '03',
    tone: 'amber',
    title: 'THIẾU N THƯỜNG LÀM LÁ GIÀ VÀNG, CÂY CHẬM LỚN',
    badge: 'Sinh trưởng thân lá',
    desc: (
      <>
        Thiếu N thường làm <strong>lá già vàng trước, cây sinh trưởng chậm</strong>; thừa N khiến thân lá mềm yếu, chậm chín hoặc tăng nguy cơ đổ ngã, sâu bệnh.
      </>
    )
  }
];

export default function Slide04DamQ1({ onOpenNotes }) {
  const [diagMode, setDiagMode] = useState('deficiency');

  const diagBox = (
    <div
      style={{
        background:
          diagMode === 'deficiency'
            ? 'var(--k-soft)'
            : diagMode === 'excess'
            ? 'var(--danger-soft)'
            : 'var(--n-soft)',
        borderRadius: 14,
        padding: '8px 13px',
        border: `1.5px solid ${
          diagMode === 'deficiency'
            ? 'var(--k-main)'
            : diagMode === 'excess'
            ? 'var(--danger)'
            : 'var(--n-main)'
        }`,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ fontSize: 13.5, fontWeight: 900, color: 'var(--ink)' }}>
          QUAN SÁT LÁ (LƯU Ý: TRIỆU CHỨNG CÓ THỂ TRÙNG NGUYÊN NHÂN KHÁC):
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {[
            { key: 'deficiency', label: 'Thiếu N' },
            { key: 'optimal', label: 'Đủ N' },
            { key: 'excess', label: 'Thừa N' }
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
                background: diagMode === tab.key ? 'var(--forest-green)' : '#FFFFFF',
                color: diagMode === tab.key ? '#FFFFFF' : 'var(--ink-soft)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.06)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 13.6, color: 'var(--ink-soft)', lineHeight: 1.38 }}>
        {diagMode === 'deficiency' && (
          <>
            <strong style={{ color: 'var(--k-deep)' }}>Thiếu N:</strong> Lá già thường nhạt màu rồi vàng trước, cây chậm lớn, đẻ nhánh kém (cần phân biệt với ngập úng, pH chua hoặc bệnh hại).
          </>
        )}
        {diagMode === 'optimal' && (
          <>
            <strong style={{ color: 'var(--n-deep)' }}>Đủ N cân đối:</strong> Lá xanh vừa phải, quang hợp hiệu quả, tạo mô mới và phát triển thân lá ổn định.
          </>
        )}
        {diagMode === 'excess' && (
          <>
            <strong style={{ color: 'var(--danger-deep)' }}>Thừa N:</strong> Thân lá vươn quá mạnh, mô mềm, chậm chín và có thể tăng nguy cơ đổ ngã hoặc sâu bệnh tùy điều kiện.
          </>
        )}
      </div>
    </div>
  );

  return (
    <QuestionSlide
      chapter="dam"
      pillText="PHÂN ĐẠM (N) • CÂU 01 / 15"
      title="N — VẬT LIỆU CHO MÀU XANH VÀ SINH KHỐI"
      badgeIcon="N"
      badgeSub="DẠNG HẤP THỤ"
      badgeMain="NH₄⁺ và NO₃⁻"
      question="Phân đạm cung cấp N khoáng giúp cây tổng hợp protein, axit nucleic, diệp lục và phát triển thân lá."
      questionChips={[
        { label: 'NH₄⁺', tone: 'green' },
        { label: 'NO₃⁻', tone: 'blue' }
      ]}
      pillars={PILLARS}
      customBottomCard={diagBox}
      mascot={{
        mascotType: 'SPROUTY_N',
        emotion: 'teacher',
        speech: 'Rễ hấp thụ NH₄⁺ và NO₃⁻ để tạo amino acid, protein và diệp lục nuôi cây! 🌱'
      }}
      svgCard={{
        title: 'DÒNG CHẢY ĐỒNG HÓA NITƠ TRONG CÂY',
        subtitle: 'NH₄⁺ / NO₃⁻ → hợp chất N hữu cơ → protein & diệp lục → sinh trưởng',
        badge: 'NH₄⁺ • NO₃⁻',
        takeaway:
          'Nitơ tham gia tạo amino acid/protein, axit nucleic, enzyme và diệp lục. Triệu chứng vàng lá già gợi ý thiếu N nhưng cần kết hợp kiểm tra đất và điều kiện canh tác.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgChlorophyllFactory />
    </QuestionSlide>
  );
}
