import React from 'react';
import { X, BookOpen, MessageSquare } from 'lucide-react';

export default function SpeakerNotesDrawer({ isOpen, onClose, slide }) {
  if (!slide) return null;

  return (
    <div className={`notes-drawer-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="notes-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="notes-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <BookOpen size={24} color="#2F80ED" />
            <h3 className="notes-header-title">Ghi Chú Thuyết Trình</h3>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="nav-circle-btn" 
            title="Đóng ghi chú (Phím N hoặc Esc)"
            aria-label="Đóng ghi chú"
          >
            <X size={20} />
          </button>
        </div>

        {slide.sourceQuestion && (
          <div style={{ background: '#F1F5F9', padding: '14px 18px', borderRadius: 12, borderLeft: '4px solid #2F80ED' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>
              Câu hỏi gốc (NHÓM TÀI.txt)
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', lineHeight: 1.45 }}>
              {slide.sourceQuestion}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
          <MessageSquare size={18} color="#36B86A" />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#17243A' }}>
            Kịch bản người nói & Đáp án học thuật:
          </span>
        </div>

        <div className="notes-body-text">
          {slide.speakerNotes || 'Chưa có ghi chú cho trang này.'}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #E2E8F0', fontSize: 13, color: '#94A3B8', textAlign: 'center' }}>
          💡 Nhấn phím <kbd style={{ padding: '2px 6px', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: 4, fontWeight: 700, color: '#334155' }}>N</kbd> để bật/tắt nhanh ghi chú khi thuyết trình.
        </div>
      </div>
    </div>
  );
}
