import { FC } from 'react'
import { Link } from 'react-router-dom'

interface LinkButtonProps {
  linkName: string
  to: string
}

export const LinkButton: FC<LinkButtonProps> = props => {
  const { linkName, to } = props
  return (
    <Link
      to={to}
      className="mb-2 rounded-lg bg-blue-700 px-6 py-4 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      {linkName}
    </Link>
  )
}
