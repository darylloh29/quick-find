import { Card, CardHeader, CardBody, CardFooter, Link } from '@nextui-org/react'
import { Document } from '@/types'

type DocumentRowProps = Document

export default function DocumentRow({ title, excerpt, uri }: DocumentRowProps) {
  return (
    <Card className="flex" fullWidth radius="none" shadow="none">
      <CardHeader className="flex">
        <Link isExternal href={uri}>
          <p className="text-lg">{title.text}</p>
        </Link>
      </CardHeader>
      <CardBody>
        <p className="text-md">{excerpt.text}</p>
      </CardBody>
      <CardFooter>
        <p className="text-sm text-gray-500">{uri}</p>
      </CardFooter>
    </Card>
  )
}
