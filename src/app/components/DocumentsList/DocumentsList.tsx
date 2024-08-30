import DocumentRow from '../DocumentRow/DocumentRow'
import {
  Document,
  DocumentList,
  DocumentsMetadata,
  DocumentResponse,
  ResultItemResponse,
} from '@/types'

export default async function DocumentsList() {
  try {
    const data = await fetch(
      'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json'
    )
    const jsonData = await data.json()

    const documentsMetadata: DocumentsMetadata = {
      totalNumberOfResults: jsonData.TotalNumberOfResults,
      page: jsonData.Page,
      pageSize: jsonData.PageSize,
    }

    const documents: DocumentList = jsonData.ResultItems.map(
      ({
        DocumentId,
        DocumentTitle,
        DocumentExcerpt,
        DocumentURI,
      }: ResultItemResponse): Document => ({
        id: DocumentId,
        title: {
          text: DocumentTitle.Text,
          highlights: DocumentTitle.Highlights,
        },
        excerpt: {
          text: DocumentExcerpt.Text,
          highlights: DocumentExcerpt.Highlights,
        },
        uri: DocumentURI,
      })
    )

    return (
      <div className="flex flex-col p-3 gap-3">
        <p className="p-3 text-lg font-bold">
          Showing 1-{documentsMetadata.pageSize} of{' '}
          {documentsMetadata.totalNumberOfResults} Results
        </p>
        {documents.map(({ id, title, excerpt, uri }) => {
          return (
            <DocumentRow
              key={id}
              id={id}
              title={title}
              excerpt={excerpt}
              uri={uri}
            />
          )
        })}
      </div>
    )
  } catch (e) {
    console.error('Error fetching documents:', e)

    return (
      <div className="text-red-500">
        Error fetching documents. Please try again later.
      </div>
    )
  }
}
