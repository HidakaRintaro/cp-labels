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
        content="GitHubのリポジトリ間でLabelのコピーができるツールです。 A tool that allows you to copy Label between repositories on GitHub."
      />
      {/* Google tag (gtag.js) */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA4_MEASUREMENT_ID}`}
      ></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${import.meta.env.VITE_GA4_MEASUREMENT_ID}');
        `}
      </script>
    </Helmet>
  )
}
