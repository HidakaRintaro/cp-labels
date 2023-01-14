/// <reference types="vite/client" />

interface ImportMetaEnv {
  GA4_MEASUREMENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
