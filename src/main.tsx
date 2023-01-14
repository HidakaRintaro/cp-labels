import { AmplifyProvider } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from '~/App'
import config from '~/aws-exports'

Amplify.configure(config)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AmplifyProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AmplifyProvider>
)
