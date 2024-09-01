import { render, screen } from '@testing-library/react'
import DocumentList, { DocumentsListProps } from './DocumentsList'

const data: DocumentsListProps = { searchQuery: 'some search string' }

describe('DocumentList', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            TotalNumberOfResults: 100,
            Page: 1,
            PageSize: 10,
            ResultItems: [
              {
                DocumentId: 'id-1',
                DocumentTitle: {
                  Text: 'Some Title 1',
                  Highlights: [
                    {
                      BeginOffset: 0,
                      EndOffset: 0,
                    },
                  ],
                },
                DocumentExcerpt: {
                  Text: 'Some excerpt 1',
                  Highlights: [
                    {
                      BeginOffset: 0,
                      EndOffset: 0,
                    },
                  ],
                },
                DocumentURI: 'somelink1.com',
              },
              {
                DocumentId: 'id-2',
                DocumentTitle: {
                  Text: 'Some Title 2',
                  Highlights: [
                    {
                      BeginOffset: 0,
                      EndOffset: 0,
                    },
                  ],
                },
                DocumentExcerpt: {
                  Text: 'Some excerpt 2',
                  Highlights: [
                    {
                      BeginOffset: 0,
                      EndOffset: 0,
                    },
                  ],
                },
                DocumentURI: 'somelink2.com',
              },
            ],
          }),
      })
    ) as jest.Mock
  })

  it('renders documents title, excerpt and uri', async () => {
    render(<DocumentList searchQuery={data.searchQuery} />)
    expect(await screen.findByText('Some Title 1')).toBeVisible()
    expect(await screen.findByText('Some excerpt 1')).toBeVisible()
    expect(await screen.findByText('somelink1.com')).toBeVisible()
    expect(await screen.findByText('Some Title 2')).toBeVisible()
    expect(await screen.findByText('Some excerpt 2')).toBeVisible()
    expect(await screen.findByText('somelink2.com')).toBeVisible()
  })

  it('renders helper text for search results', async () => {
    render(<DocumentList searchQuery={data.searchQuery} />)
    expect(await screen.findByText('Showing 1-10 of 100 results')).toBeVisible()
  })

  describe('network failure', () => {
    beforeAll(() => {
      global.fetch = jest.fn(() =>
        Promise.reject('Network Failure')
      ) as jest.Mock
    })

    it('renders network error text', async () => {
      render(<DocumentList searchQuery={data.searchQuery} />)
      expect(
        await screen.findByText('Error fetching documents, try again later.')
      ).toBeVisible()
    })
  })
})
