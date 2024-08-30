type TextWithHighlights = {
  text: string
  highlights: Array<{ BeginOffset: number; EndOffset: number }>
}

export interface Document {
  id: string // TODO change to uuid
  title: TextWithHighlights
  excerpt: TextWithHighlights
  uri: string
}

export type DocumentList = Document[]

export type DocumentsMetadata = {
  totalNumberOfResults: number
  page: number
  pageSize: number
}
