import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Page404 } from '~/components/pages/Page404'

export const Router: FC = () => (
  <Routes>
    <Route path="/" />
    <Route path="*" element={<Page404 />} />
  </Routes>
)
