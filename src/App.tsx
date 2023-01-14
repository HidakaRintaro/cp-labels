import { usePageTracking } from '~/hooks/useTracking'
import { Router } from '~/router/Router'
import '~/index.css'

usePageTracking()

const App = () => <Router />

export default App
