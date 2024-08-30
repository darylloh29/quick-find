import { Card, CardHeader, CardBody, CardFooter, Link } from '@nextui-org/react'
import { Document } from '@/types'

type DocumentRowProps = Document

export default function DocumentRow({ title, excerpt, uri }: DocumentRowProps) {
  return (
    <Card className="flex" fullWidth radius="none" shadow="none">
      <CardHeader className="flex">
        <p className="text-lg">{title.text}</p>
      </CardHeader>
      <CardBody>
        <p className="text-md">{excerpt.text}</p>
      </CardBody>
      <CardFooter>
        <Link isExternal href={uri}>
          <p className="text-sm">{uri}</p>
        </Link>
      </CardFooter>
    </Card>
  )
}
