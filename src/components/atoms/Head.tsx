import { FC } from 'react'
import { Helmet } from 'react-helmet-async'

interface HeadProps {
  title: string
}

export const Head: FC<HeadProps> = props => {
  const { title } = props
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="GitHubでリポジトリ間のLabelのコピーができるツールです。 A tool that allows you to copy Label between repositories on GitHub."
      />
    </Helmet>
  )
}
