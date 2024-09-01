import { Card, CardHeader, CardBody, CardFooter, Link } from '@nextui-org/react'
import HighlightedText from '@components/common/HighlightedText'
import { Document } from '@types'

export type DocumentRowProps = Document

export default function DocumentRow({
  id,
  title,
  excerpt,
  uri,
}: DocumentRowProps) {
  return (
    <Card key={id} className="flex" fullWidth radius="none" shadow="none">
      <CardHeader className="flex">
        <Link isExternal href={uri}>
          <HighlightedText
            className="text-lg"
            text={title.text}
            highlights={title.highlights}
          />
        </Link>
      </CardHeader>
      <CardBody>
        <HighlightedText
          className="text-md"
          text={excerpt.text}
          highlights={excerpt.highlights}
        />
      </CardBody>
      <CardFooter>
        <p className="text-sm text-gray-500">{uri}</p>
      </CardFooter>
    </Card>
  )
}
