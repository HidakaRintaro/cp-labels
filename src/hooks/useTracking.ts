import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { useLocation } from 'react-router-dom'

export const usePageTracking = (): void => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.initialize(import.meta.env.GA4_MEASUREMENT_ID)
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search
    })
  }, [location])
}
