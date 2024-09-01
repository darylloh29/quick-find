import { useEffect, useState } from 'react'
import DocumentRow from '@components/documents/DocumentRow'
import Loading from '@components/Loading'
import {
  Document,
  DocumentList,
  DocumentsMetadata,
  ResultItemResponse,
} from '@types'

export type DocumentsListProps = {
  searchQuery: string
}

export default function DocumentsList({ searchQuery }: DocumentsListProps) {
  const [documents, setDocuments] = useState<DocumentList>()
  const [documentsMetadata, setDocumentsMetadata] =
    useState<DocumentsMetadata>()
  const [isLoading, setisLoading] = useState<boolean>(true)
  const [hasNetworkError, setHasNetworkError] = useState<boolean>(false)

  useEffect(() => {
    const fetchDocuments = async () => {
      // Search query to be sent as query params, session token in auth header
      try {
        const data = await fetch(
          process.env.NEXT_PUBLIC_SEARCH_DOCUMENTS_ENDPOINT +
            `?search=${searchQuery}`
        )
        const jsonData = await data.json()

        setDocumentsMetadata({
          totalNumberOfResults: jsonData.TotalNumberOfResults,
          page: jsonData.Page,
          pageSize: jsonData.PageSize,
        })

        setDocuments(
          jsonData.ResultItems.map(
            (resultItems: ResultItemResponse): Document => ({
              id: resultItems.DocumentId,
              title: {
                text: resultItems.DocumentTitle.Text,
                highlights: resultItems.DocumentTitle.Highlights.map(
                  ({ BeginOffset, EndOffset }) => ({
                    beginOffset: BeginOffset,
                    endOffset: EndOffset,
                  })
                ),
              },
              excerpt: {
                text: resultItems.DocumentExcerpt.Text,
                highlights: resultItems.DocumentExcerpt.Highlights.map(
                  ({ BeginOffset, EndOffset }) => ({
                    beginOffset: BeginOffset,
                    endOffset: EndOffset,
                  })
                ),
              },
              uri: resultItems.DocumentURI,
            })
          )
        )

        setisLoading(false)
      } catch (e) {
        console.error(e)
        setHasNetworkError(true)
        setisLoading(false)
      }
    }

    fetchDocuments()
  }, [searchQuery])

  if (isLoading) {
    return <Loading />
  }

  if (hasNetworkError || !documents || !documentsMetadata) {
    return (
      <p className="flex m-8 text-red-500">
        Error fetching documents, try again later.
      </p>
    )
  }

  return (
    <div className="flex flex-col p-3 gap-3">
      <p className="p-3 text-lg font-bold">
        Showing 1-{documentsMetadata.pageSize} of{' '}
        {documentsMetadata.totalNumberOfResults} results
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
}
