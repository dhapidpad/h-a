import React from 'react';

export default function SvgPercentTubes() {
  const tubes = [
    { name: 'Urê CO(NH₂)₂', percent: 46.7, color: '#36B86A', height: 260, crown: true, tag: 'ĐỈNH NHẤT' },
    { name: 'Amoni clorua NH₄Cl', percent: 26.2, color: '#2F80ED', height: 160, crown: false, tag: '26.2%' },
    { name: 'Amoni sunfat (NH₄)₂SO₄', percent: 21.2, color: '#8C6BFA', height: 130, crown: false, tag: '21.2%' },
    { name: 'Natri nitrat NaNO₃', percent: 16.5, color: '#94A3B8', height: 100, crown: false, tag: '16.5%' }
  ];

  return (
    <svg viewBox="0 0 540 460" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      {/* Vạch đo phần trăm ở nền */}
      <g stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" opacity="0.8">
        <line x1="40" y1="90" x2="500" y2="90" />
        <text x="30" y="94" textAnchor="end" fill="#94A3B8" fontSize="11" fontWeight="700">50%</text>

        <line x1="40" y1="190" x2="500" y2="190" />
        <text x="30" y="194" textAnchor="end" fill="#94A3B8" fontSize="11" fontWeight="700">30%</text>

        <line x1="40" y1="290" x2="500" y2="290" />
        <text x="30" y="294" textAnchor="end" fill="#94A3B8" fontSize="11" fontWeight="700">10%</text>
      </g>

      {/* Sàn đỡ */}
      <rect x="25" y="340" width="490" height="8" rx="4" fill="#CBD5E1" />

      {/* 4 ống đong dung dịch */}
      {tubes.map((tube, idx) => {
        const xPos = 65 + idx * 115;
        const tubeWidth = 64;
        const bottomY = 340;
        const liquidTopY = bottomY - tube.height;

        return (
          <g key={idx}>
            {/* Ống thủy tinh */}
            <rect 
              x={xPos} 
              y="70" 
              width={tubeWidth} 
              height="270" 
              rx="12" 
              fill="#F8FAFC" 
              stroke="#CBD5E1" 
              strokeWidth="2.5" 
            />

            {/* Mực dung dịch màu dâng lên */}
            <rect 
              x={xPos + 3} 
              y={liquidTopY} 
              width={tubeWidth - 6} 
              height={tube.height} 
              rx="8" 
              fill={tube.color} 
              opacity="0.9"
            />

            {/* Bọt khí li ti trong ống */}
            <circle cx={xPos + 20} cy={liquidTopY + 30} r="3" fill="#FFFFFF" opacity="0.6" />
            <circle cx={xPos + 40} cy={liquidTopY + 70} r="4.5" fill="#FFFFFF" opacity="0.6" />
            <circle cx={xPos + 25} cy={liquidTopY + 110} r="2.5" fill="#FFFFFF" opacity="0.6" />

            {/* Vương miện vàng cho Urê quán quân */}
            {tube.crown && (
              <g transform={`translate(${xPos + tubeWidth / 2}, 42)`}>
                <polygon points="-18,16 -12,2 0,12 12,2 18,16" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
                <circle cx="0" cy="5" r="2.5" fill="#E11D48" />
              </g>
            )}

            {/* Nhãn % N trên đỉnh cột */}
            <rect 
              x={xPos + 4} 
              y={liquidTopY - 26} 
              width={tubeWidth - 8} 
              height="22" 
              rx="6" 
              fill={tube.color} 
            />
            <text 
              x={xPos + tubeWidth / 2} 
              y={liquidTopY - 11} 
              textAnchor="middle" 
              fill="#FFFFFF" 
              fontSize="12" 
              fontWeight="800"
            >
              {tube.percent}%
            </text>

            {/* Tên hóa chất bên dưới */}
            <text 
              x={xPos + tubeWidth / 2} 
              y="370" 
              textAnchor="middle" 
              fill="#17243A" 
              fontSize="12" 
              fontWeight="800"
            >
              {tube.name.split(' ')[0]}
            </text>
            <text 
              x={xPos + tubeWidth / 2} 
              y="388" 
              textAnchor="middle" 
              fill="#64748B" 
              fontSize="11" 
              fontWeight="600"
            >
              {tube.name.split(' ')[1] || ''}
            </text>
          </g>
        );
      })}

      {/* Thẻ ghi chú tóm tắt */}
      <rect x="70" y="415" width="400" height="32" rx="16" fill="#E8F8EE" stroke="#36B86A" strokeWidth="1.5" />
      <text x="270" y="436" textAnchor="middle" fill="#1E824C" fontSize="13" fontWeight="800">
        💡 URÊ CHỨA HÀM LƯỢNG N CAO NHẤT (~46% N) — TIẾT KIỆM CHI PHÍ VẬN CHUYỂN
      </text>
    </svg>
  );
}
