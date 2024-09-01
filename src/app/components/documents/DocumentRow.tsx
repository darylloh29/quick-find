import { Card, CardHeader, CardBody, CardFooter, Link } from '@nextui-org/react'
import HighlightedText from '../common/HighlightedText'
import { Document } from '@/types'

type DocumentRowProps = Document

export default function DocumentRow({ title, excerpt, uri }: DocumentRowProps) {
  return (
    <Card className="flex" fullWidth radius="none" shadow="none">
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
