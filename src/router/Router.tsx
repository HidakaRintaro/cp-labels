import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

export const Router: FC = () => (
  <Routes>
    <Route path="/" />
    <Route path="*" />
  </Routes>
)
