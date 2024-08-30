import 'react'
import { CSSInterpolation } from '@emotion/serialize'

declare module 'react' {
  interface DOMAttributes {
    tw?: string
    css?: CSSInterpolation
  }
}