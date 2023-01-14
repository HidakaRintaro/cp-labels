import { Route, Routes } from 'react-router-dom'

import { Home } from '~/components/pages/Home'
import { Page404 } from '~/components/pages/Page404'
import { usePageTracking } from '~/hooks/useTracking'

export const Router = () => {
  usePageTracking()
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}
