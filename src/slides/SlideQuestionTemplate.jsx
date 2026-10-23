import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import CuteMascot from '../components/mascot/CuteMascot';

// Import 15 SVG minh họa chuyên biệt
import SvgChlorophyllFactory from '../components/illustrations/SvgChlorophyllFactory';
import SvgPercentTubes from '../components/illustrations/SvgPercentTubes';
import SvgGasLoss from '../components/illustrations/SvgGasLoss';
import SvgVietnamFactories from '../components/illustrations/SvgVietnamFactories';
import SvgSoilBalance from '../components/illustrations/SvgSoilBalance';
import SvgRootAtpStation from '../components/illustrations/SvgRootAtpStation';
import SvgSuperPhosphatePouch from '../components/illustrations/SvgSuperPhosphatePouch';
import SvgFusedPhosphateCups from '../components/illustrations/SvgFusedPhosphateCups';
import SvgBasalRocket from '../components/illustrations/SvgBasalRocket';
import SvgApatiteMine from '../components/illustrations/SvgApatiteMine';
import SvgStomataShield from '../components/illustrations/SvgStomataShield';
import SvgKClvsK2SO4 from '../components/illustrations/SvgKClvsK2SO4';
import SvgLeafScorchAlert from '../components/illustrations/SvgLeafScorchAlert';
import SvgTopdressingMountain from '../components/illustrations/SvgTopdressingMountain';
import SvgSoilCompaction from '../components/illustrations/SvgSoilCompaction';

export default function SlideQuestionTemplate({ slide, onOpenNotes }) {
  const [showFullQuestion, setShowFullQuestion] = useState(false);

  // Chọn SVG tương ứng theo câu hỏi
  const renderIllustration = () => {
    switch (slide.questionId) {
      case 'DAM_Q1': return <SvgChlorophyllFactory />;
      case 'DAM_Q2': return <SvgPercentTubes />;
      case 'DAM_Q3': return <SvgGasLoss />;
      case 'DAM_Q4': return <SvgVietnamFactories />;
      case 'DAM_Q5': return <SvgSoilBalance />;
      case 'LAN_Q1': return <SvgRootAtpStation />;
      case 'LAN_Q2': return <SvgSuperPhosphatePouch />;
      case 'LAN_Q3': return <SvgFusedPhosphateCups />;
      case 'LAN_Q4': return <SvgBasalRocket />;
      case 'LAN_Q5': return <SvgApatiteMine />;
      case 'KALI_Q1': return <SvgStomataShield />;
      case 'KALI_Q2': return <SvgKClvsK2SO4 />;
      case 'KALI_Q3': return <SvgLeafScorchAlert />;
      case 'KALI_Q4': return <SvgTopdressingMountain />;
      case 'KALI_Q5': return <SvgSoilCompaction />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {/* Header: Chương & Tiêu đề lớn */}
      <div className="slide-header">
        <div 
          className="chapter-pill" 
          style={{ 
            backgroundColor: slide.chapter.softColor, 
            color: slide.chapter.color 
          }}
        >
          <span>{slide.chapter.name}</span>
        </div>

        <h2 className="slide-title">
          {slide.title}
        </h2>
      </div>

      {/* Grid 2 cột: Trái (Thẻ badges) - Phải (SVG Trực quan) */}
      <div className="question-slide-grid">
        {/* Cột trái: Tối đa 2-3 badge ý chính siêu ngắn gọn */}
        <div className="question-left-col">
          <div className="badges-stack">
            {slide.badges && slide.badges.map((badge, idx) => (
              <div 
                key={idx} 
                className="visual-badge-card"
                style={{ borderLeft: `5px solid ${badge.color || slide.chapter.color}` }}
              >
                <span className="visual-badge-text">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>

          {/* Hộp xem câu hỏi gốc từ NHÓM TÀI.txt */}
          {slide.sourceQuestion && (
            <div 
              className="source-question-pill" 
              onClick={() => setShowFullQuestion(!showFullQuestion)}
              style={{ cursor: 'pointer' }}
              title="Bấm để xem câu hỏi nguyên văn"
            >
              <HelpCircle size={18} color={slide.chapter.color} style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 700, color: '#17243A' }}>Câu hỏi gốc: </span>
                <span>
                  {showFullQuestion 
                    ? slide.sourceQuestion 
                    : `${slide.sourceQuestion.slice(0, 95)}... (bấm để xem hết)`
                  }
                </span>
              </div>
              {showFullQuestion ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          )}

          {/* Bé Mascot Chibi tương tác - Tích hợp gọn trong cột trái, KHÔNG BAO GIỜ CHE ĐỒ THỊ */}
          <CuteMascot 
            variant="banner"
            mascotType={slide.chapter.mascot || 'SPROUTY_N'}
            emotion={slide.mascotEmotion || 'happy'}
            speech={slide.mascotSpeech || ''}
            size={56}
            onClick={onOpenNotes}
          />
        </div>

        {/* Cột phải: Khung hình SVG trực quan tự giải thích */}
        <div className="question-right-visual">
          {renderIllustration()}
        </div>
      </div>
    </div>
  );
}
