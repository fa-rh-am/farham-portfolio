// A small pixel-art character whose proportions and gear change across
// the 5 timeline stages: a wide-headed, short toddler at "Born", growing
// taller and more equipped (hair, backpack, hiking pole) by "Today" —
// echoing the mountaineer in the hero photo.

const STAGES = [
  { headR: 8, bodyH: 10, bodyW: 11, legH: 5, color: '#6C9BB8', backpack: false, pole: false, hair: false },
  { headR: 7.5, bodyH: 12, bodyW: 11, legH: 7, color: '#89A98E', backpack: false, pole: false, hair: true },
  { headR: 7, bodyH: 14, bodyW: 11, legH: 9, color: '#E3B655', backpack: false, pole: false, hair: true },
  { headR: 6.5, bodyH: 16, bodyW: 11, legH: 11, color: '#243238', backpack: true, pole: false, hair: true },
  { headR: 6, bodyH: 17, bodyW: 11, legH: 13, color: '#243238', backpack: true, pole: true, hair: true },
]

export default function PixelHiker({ stage = 0, size = 40 }) {
  const s = STAGES[Math.max(0, Math.min(STAGES.length - 1, stage))]
  const totalH = s.headR * 2 + s.bodyH + s.legH
  const width = 34

  return (
    <svg
      width={size}
      height={(size * totalH) / width}
      viewBox={`0 0 ${width} ${totalH}`}
      shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    >
      {s.pole && (
        <rect x={width - 5} y={s.headR * 2 - 2} width="2" height={s.bodyH + s.legH} fill="#8B9A9C" />
      )}
      {s.backpack && (
        <rect x="2" y={s.headR * 2 + 2} width="6" height={s.bodyH - 4} rx="1" fill="#E3B655" />
      )}
      <rect
        x={width / 2 - s.bodyW / 2}
        y={s.headR * 2 + s.bodyH}
        width={s.bodyW / 2 - 1}
        height={s.legH}
        fill="#59696F"
      />
      <rect
        x={width / 2 + 1}
        y={s.headR * 2 + s.bodyH}
        width={s.bodyW / 2 - 1}
        height={s.legH}
        fill="#59696F"
      />
      <rect
        x={width / 2 - s.bodyW / 2}
        y={s.headR * 2}
        width={s.bodyW}
        height={s.bodyH}
        rx="2"
        fill={s.color}
      />
      <circle cx={width / 2} cy={s.headR} r={s.headR} fill="#F0D9B5" />
      {s.hair && (
        <rect
          x={width / 2 - s.headR}
          y={s.headR * 0.15}
          width={s.headR * 2}
          height={s.headR * 0.7}
          rx="3"
          fill="#3E2C23"
        />
      )}
      <rect x={width / 2 - s.headR * 0.45} y={s.headR * 1.05} width="1.6" height="1.6" fill="#243238" />
      <rect x={width / 2 + s.headR * 0.15} y={s.headR * 1.05} width="1.6" height="1.6" fill="#243238" />
    </svg>
  )
}
