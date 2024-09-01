import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar, { SearchBarProps } from './SearchBar'

const routerPushMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: routerPushMock,
      prefetch: () => null,
    }
  },
  usePathname: jest.fn(() => '/'),
}))

const data: SearchBarProps = { searchQuery: 'some search string' }

beforeEach(() => {
  jest.restoreAllMocks()
})

describe('SearchBar', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            stemmedQueryTerm: 'some search string',
            suggestions: [
              'suggestion 1',
              'suggestion 2',
              'suggestion 3',
              'suggestion 4',
              'suggestion 5',
            ],
          }),
      })
    ) as jest.Mock
  })

  it('renders search input box', async () => {
    await act(async () => {
      render(<SearchBar searchQuery={data.searchQuery} />)
    })

    expect(screen.getByDisplayValue('some search string')).toBeEnabled()
  })

  it('renders search button', async () => {
    await act(async () => {
      render(<SearchBar searchQuery={data.searchQuery} />)
    })

    expect(screen.getByText('Search')).toBeEnabled()
  })

  it('displays search query based on query params', () => {
    render(<SearchBar searchQuery={data.searchQuery} />)

    expect(screen.getByDisplayValue('some search string')).toBeVisible()
  })

  describe('search suggestions', () => {
    it('displays search suggestions', async () => {
      const user = userEvent.setup()

      await act(async () => {
        render(<SearchBar searchQuery={''} />)
      })

      const input = await screen.findByPlaceholderText('Type to search...')
      expect(input).toBeVisible()

      await act(async () => {
        await user.click(input)
        await user.keyboard('some query')
      })

      waitFor(() => {
        expect(screen.getByText('suggestion 1')).toBeVisible()
        expect(screen.getByText('suggestion 2')).toBeVisible()
        expect(screen.getByText('suggestion 3')).toBeVisible()
        expect(screen.getByText('suggestion 4')).toBeVisible()
        expect(screen.getByText('suggestion 5')).toBeVisible()
      })
    })
  })

  describe('submit search', () => {
    it('updates search params', async () => {
      const user = userEvent.setup()

      await act(async () => {
        render(<SearchBar searchQuery={''} />)
      })

      const input = await screen.findByPlaceholderText('Type to search...')
      expect(input).toBeVisible()

      await act(async () => {
        await user.click(input)
        await user.keyboard('somequery')
        const button = await screen.findByText('Search')
        await user.click(button)
      })

      expect(routerPushMock).toHaveBeenCalledWith('/?search=somequery')
    })

    it('does not update search params if there is no query', async () => {
      const user = userEvent.setup()

      await act(async () => {
        render(<SearchBar searchQuery={''} />)
      })

      const input = await screen.findByPlaceholderText('Type to search...')
      expect(input).toBeVisible()

      await act(async () => {
        const button = await screen.findByText('Search')
        await user.click(button)
      })

      expect(routerPushMock).not.toHaveBeenCalled()
    })
  })
})
