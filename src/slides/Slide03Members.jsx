import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../data/slideData';
import {
  Sparkles,
  FlaskConical,
  Leaf,
  Sprout,
  Atom,
  Droplets,
  Microscope,
  BarChart3,
  BookOpen,
  Lightbulb,
  Check
} from 'lucide-react';
import LinhThuBietDoi from '../components/mascot/LinhThuBietDoi';

/* ==========================================================================
   SLIDE 03 — GIỚI THIỆU 9 THÀNH VIÊN (bản nâng cấp)
   - Giữ nguyên: lưới 3×3, hiện sẵn cả 9 tên + vai trò, không ellipsis.
   - Nâng cấp:
     • Điểm nhấn duy nhất: ánh sáng mềm bám theo con trỏ trên từng thẻ.
     • Avatar dạng "con dấu" gradient + vòng sáng, icon trắng nổi bật.
     • Số thứ tự khổng lồ mờ làm watermark nền (thay cho "#01" nhỏ).
     • Nhiệm vụ tách thành chip nhỏ, dễ quét mắt hơn chuỗi dấu chấm.
     • Thẻ đang chọn: viền gradient + dấu tích + nền ngả màu.
     • Sửa a11y: role="listitem" nằm ở wrapper, nút chỉ giữ aria-pressed.
   ========================================================================== */

const PALETTE = [
  { c: '#174B37', soft: '#E8F3EE', line: '#B8D4C5', badgeBg: '#174B37' },
  { c: '#16A36A', soft: '#ECFDF5', line: '#A5E6C6', badgeBg: '#116946' },
  { c: '#7862E8', soft: '#F5F2FE', line: '#C9BEF8', badgeBg: '#4A36B0' },
  { c: '#E8A13A', soft: '#FFF8EB', line: '#F7D394', badgeBg: '#965710' },
  { c: '#16A36A', soft: '#ECFDF5', line: '#A5E6C6', badgeBg: '#116946' },
  { c: '#7862E8', soft: '#F5F2FE', line: '#C9BEF8', badgeBg: '#4A36B0' },
  { c: '#E8A13A', soft: '#FFF8EB', line: '#F7D394', badgeBg: '#965710' },
  { c: '#174B37', soft: '#E8F3EE', line: '#B8D4C5', badgeBg: '#174B37' },
  { c: '#16A36A', soft: '#ECFDF5', line: '#A5E6C6', badgeBg: '#116946' }
];

const ICONS = [
  FlaskConical,
  Leaf,
  Sprout,
  Atom,
  Droplets,
  Microscope,
  BarChart3,
  BookOpen,
  Lightbulb
];

const CSS = `
.m3-root{display:flex;flex-direction:column;height:100%;gap:14px;position:relative}
.m3-header{display:flex;align-items:center;justify-content:space-between;gap:18px}
.m3-header-left{display:flex;flex-direction:column;gap:4px;min-width:0}
.m3-sub{font-size:15px;font-weight:600;color:var(--ink-soft);margin:0;max-width:62ch;line-height:1.4}

.m3-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr));
  gap:16px;flex:1;min-height:0}
.m3-cell{display:flex;min-height:0;min-width:0}

/* ---------- Thẻ ---------- */
.m3-card{position:relative;isolation:isolate;display:flex;align-items:center;gap:16px;width:100%;
  padding:14px 18px 14px 22px;border-radius:20px;
  background:linear-gradient(180deg,#FFFFFF 0%,color-mix(in srgb,var(--soft) 55%,#FFFFFF) 100%);
  border:1.5px solid var(--bd);
  box-shadow:0 1px 0 #FFFFFF inset,0 2px 4px rgba(16,37,30,.04),0 14px 28px -16px rgba(16,37,30,.22);
  text-align:left;font-family:inherit;cursor:pointer;overflow:hidden;
  transition:transform .28s var(--ease-out),box-shadow .28s var(--ease-out),border-color .28s var(--ease-out),background .28s var(--ease-out);
  animation:m3In .5s var(--ease-out) backwards;animation-delay:calc(var(--i,0) * 45ms)}

/* dải màu bên trái */
.m3-card::before{content:'';position:absolute;left:0;top:14px;bottom:14px;width:5px;border-radius:0 6px 6px 0;
  background:linear-gradient(180deg,var(--c),color-mix(in srgb,var(--c) 55%,#FFFFFF));
  transition:width .28s var(--ease-out),top .28s var(--ease-out),bottom .28s var(--ease-out)}

/* ánh sáng bám theo con trỏ */
.m3-card::after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:0;
  background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%),
    color-mix(in srgb,var(--c) 18%,transparent),transparent 62%);
  transition:opacity .3s var(--ease-out)}

/* số thứ tự khổng lồ làm watermark */
.m3-ghost{position:absolute;right:10px;bottom:-14px;z-index:-1;pointer-events:none;
  font-family:var(--font-display);font-weight:900;font-size:92px;line-height:1;letter-spacing:-.04em;
  color:var(--c);opacity:.07;transition:opacity .3s var(--ease-out),transform .4s var(--ease-out)}

@media (hover:hover){
  .m3-card:hover{transform:translateY(-3px);border-color:var(--c);
    box-shadow:0 1px 0 #FFFFFF inset,0 20px 34px -18px color-mix(in srgb,var(--c) 55%,transparent)}
  .m3-card:hover::after{opacity:1}
  .m3-card:hover::before{top:10px;bottom:10px;width:7px}
  .m3-card:hover .m3-ghost{opacity:.12;transform:translateX(-4px)}
}
.m3-card:focus-visible{outline:3px solid var(--c);outline-offset:3px}

/* thẻ đang chọn */
.m3-card.is-active{border-color:var(--c);
  background:linear-gradient(180deg,color-mix(in srgb,var(--soft) 70%,#FFFFFF) 0%,var(--soft) 100%);
  box-shadow:0 0 0 4px color-mix(in srgb,var(--c) 14%,transparent),
    0 18px 34px -18px color-mix(in srgb,var(--c) 60%,transparent)}
.m3-card.is-active::before{top:10px;bottom:10px;width:7px}
.m3-card.is-active .m3-ghost{opacity:.13}

.m3-check{position:absolute;top:10px;right:12px;width:22px;height:22px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;background:var(--c);color:#FFFFFF;
  box-shadow:0 4px 10px -3px color-mix(in srgb,var(--c) 70%,transparent);
  animation:m3Pop .32s var(--ease-out)}

/* ---------- Avatar ---------- */
.m3-avatar{position:relative;width:60px;height:60px;border-radius:18px;flex-shrink:0;color:#FFFFFF;
  display:flex;align-items:center;justify-content:center;
  background:linear-gradient(145deg,color-mix(in srgb,var(--c) 82%,#FFFFFF) 0%,var(--c) 45%,color-mix(in srgb,var(--c) 70%,#000000) 100%);
  box-shadow:inset 0 1.5px 0 rgba(255,255,255,.45),inset 0 -6px 10px -6px rgba(0,0,0,.25),
    0 10px 18px -8px color-mix(in srgb,var(--c) 75%,transparent);
  transition:transform .35s var(--ease-out)}
.m3-avatar::after{content:'';position:absolute;inset:-5px;border-radius:22px;
  border:1.5px solid color-mix(in srgb,var(--c) 30%,transparent);pointer-events:none}
@media (hover:hover){
  .m3-card:hover .m3-avatar{transform:rotate(-6deg) scale(1.06)}
}
.m3-card.is-active .m3-avatar{transform:scale(1.04)}

/* ---------- Nội dung ---------- */
.m3-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px}
.m3-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding-right:22px}
.m3-name{font-family:var(--font-display);font-size:19px;font-weight:800;color:var(--ink);line-height:1.2;letter-spacing:-.005em}
.m3-badge{font-size:11.5px;font-weight:800;padding:3px 10px;border-radius:999px;
  background:var(--badge-bg);color:#FFFFFF;white-space:nowrap;flex-shrink:0;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.25)}
.m3-role{font-size:14.2px;font-weight:700;color:var(--c);line-height:1.3}

.m3-tasks{display:flex;flex-wrap:wrap;gap:5px;margin:2px 0 0;padding:0;list-style:none}
.m3-task{font-size:12.2px;font-weight:600;color:var(--ink-soft);line-height:1.25;
  padding:3px 9px;border-radius:8px;
  background:color-mix(in srgb,var(--c) 8%,#FFFFFF);
  border:1px solid color-mix(in srgb,var(--c) 18%,transparent)}

@keyframes m3In{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}
@keyframes m3Pop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
@media (prefers-reduced-motion:reduce){
  .m3-card,.m3-avatar,.m3-ghost,.m3-card::before,.m3-card::after{animation:none!important;transition:none!important}
  .m3-check{animation:none}
}
`;

/* Ánh sáng bám theo con trỏ: chỉ cập nhật 2 biến CSS, không re-render React */
function trackPointer(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export default function Slide03Members() {
  const [selectedId, setSelectedId] = useState('01');

  return (
    <div className="m3-root">
      <style>{CSS}</style>

      {/* Header */}
      <header className="m3-header">
        <div className="m3-header-left">
          <div className="chapter-pill">
            <Sparkles size={15} />
            <span>Đội ngũ thực hiện báo cáo • 9 thành viên</span>
          </div>
          <h2 className="slide-title" style={{ marginTop: 2 }}>
            GIỚI THIỆU 9 THÀNH VIÊN NHÓM
          </h2>
          <p className="m3-sub">
            Phối hợp tra cứu tài liệu, biên tập nội dung, trực quan hóa sơ đồ, thiết kế slide/video và kiểm duyệt khoa học
          </p>
        </div>

        <LinhThuBietDoi />
      </header>

      {/* Lưới 3×3 hiển thị trực tiếp cả 9 thành viên */}
      <div className="m3-grid" role="list" aria-label="Danh sách 9 thành viên nhóm">
        {TEAM_MEMBERS.map((member, idx) => {
          const pal = PALETTE[idx % PALETTE.length];
          const Icon = ICONS[idx % ICONS.length];
          const isSelected = selectedId === member.id;
          const tasks = Array.isArray(member.tasks) ? member.tasks : [];

          return (
            <div className="m3-cell" role="listitem" key={member.id}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedId(member.id)}
                onPointerMove={trackPointer}
                className={`m3-card${isSelected ? ' is-active' : ''}`}
                style={{
                  '--i': idx,
                  '--c': pal.c,
                  '--soft': pal.soft,
                  '--bd': pal.line,
                  '--badge-bg': pal.badgeBg
                }}
              >
                <span className="m3-ghost" aria-hidden="true">{member.id}</span>

                {isSelected && (
                  <span className="m3-check" aria-hidden="true">
                    <Check size={13} strokeWidth={3.2} />
                  </span>
                )}

                <div className="m3-avatar" aria-hidden="true">
                  <Icon size={26} strokeWidth={2.1} />
                </div>

                <div className="m3-body">
                  <div className="m3-top">
                    <span className="m3-name">{member.name}</span>
                    {member.badge && <span className="m3-badge">{member.badge}</span>}
                  </div>
                  <div className="m3-role">{member.role}</div>
                  {tasks.length > 0 && (
                    <ul className="m3-tasks">
                      {tasks.map((t, i) => (
                        <li className="m3-task" key={i}>{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}