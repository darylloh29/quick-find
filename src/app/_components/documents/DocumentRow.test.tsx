import { render, screen } from '@testing-library/react'
import DocumentRow, { DocumentRowProps } from './DocumentRow'

const data: DocumentRowProps = {
  id: 'some-dummy-id',
  title: {
    text: 'Some Title',
    highlights: [{ beginOffset: 5, endOffset: 11 }],
  },
  excerpt: {
    text: 'some excerpt',
    highlights: [{ beginOffset: 5, endOffset: 13 }],
  },
  uri: 'somelink.com',
}

describe('DocumentRow', () => {
  it('renders title with link to uri', () => {
    render(
      <DocumentRow
        id={data.id}
        title={data.title}
        excerpt={data.excerpt}
        uri={data.uri}
      />
    )
    expect(screen.getByRole('link', { name: 'Some Title' })).toHaveAttribute(
      'href',
      'somelink.com'
    )
  })

  it('renders excerpt', () => {
    render(
      <DocumentRow
        id={data.id}
        title={data.title}
        excerpt={data.excerpt}
        uri={data.uri}
      />
    )
    expect(screen.getByText('some')).toBeVisible()
    expect(screen.getByText('excerpt')).toBeVisible()
  })

  it('renders uri', () => {
    render(
      <DocumentRow
        id={data.id}
        title={data.title}
        excerpt={data.excerpt}
        uri={data.uri}
      />
    )
    expect(screen.getByText('somelink.com')).toBeVisible()
  })

  it('bolds the necessary text', () => {
    render(
      <DocumentRow
        id={data.id}
        title={data.title}
        excerpt={data.excerpt}
        uri={data.uri}
      />
    )
    expect(screen.getByText('Title')).toHaveAttribute('class', 'font-bold')
    expect(screen.getByText('excerpt')).toHaveAttribute('class', 'font-bold')
  })
})
