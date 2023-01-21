/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_GA4_MEASUREMENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
