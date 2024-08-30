type TextWithHighlightsResponse = {
  Text: string
  Highlights: Array<{ BeginOffset: number; EndOffset: number }>
}

export type ResultItemResponse = {
  DocumentId: string // TODO change to uuid
  DocumentTitle: TextWithHighlightsResponse
  DocumentExcerpt: TextWithHighlightsResponse
  DocumentURI: string
}

export type DocumentResponse = {
  TotalNumberOfResults: number
  Page: number
  PageSize: number
  ResultItems: ResultItemResponse[]
}
