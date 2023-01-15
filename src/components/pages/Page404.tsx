import { FC } from 'react'

import { LinkButton } from '~/components/atoms/LinkButton'

export const Page404: FC = () => (
  <div className="mt-8 text-center">
    <h2 className="mb-8 text-8xl font-black md:text-[200px]">404</h2>
    <LinkButton to="/" linkName="Topページに戻る" />
  </div>
)
