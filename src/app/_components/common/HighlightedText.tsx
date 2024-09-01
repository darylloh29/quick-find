import { TextWithHighlights } from '@types'

type DocumentRowProps = TextWithHighlights & {
  className: string
}

const getHighlightedText = (
  text: string,
  highlights: Array<{ beginOffset: number; endOffset: number }>
) => {
  const segments: Array<{ text: string; isHighlighted: boolean }> = []
  let lastIndex = 0

  highlights.forEach(({ beginOffset, endOffset }) => {
    if (lastIndex < beginOffset) {
      segments.push({
        text: text.slice(lastIndex, beginOffset),
        isHighlighted: false,
      })
    }

    segments.push({
      text: text.slice(beginOffset, endOffset),
      isHighlighted: true,
    })

    lastIndex = endOffset
  })

  // Add any remaining text after the last highlight
  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      isHighlighted: false,
    })
  }

  return segments
}

export default function HighlightedText({
  text,
  highlights,
  className,
}: DocumentRowProps) {
  const segments = getHighlightedText(text, highlights)

  return (
    <p className={className}>
      {segments.map((segment, index) => (
        <span key={index} className={segment.isHighlighted ? 'font-bold' : ''}>
          {segment.text}
        </span>
      ))}
    </p>
  )
}
