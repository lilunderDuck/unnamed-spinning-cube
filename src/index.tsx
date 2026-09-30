/* @refresh reload */
import { render } from 'solid-js/web'
import 'solid-devtools'
import "molcss/style.css"

import './assets/index.css'
import App from './App'
import { logWithLabel } from './utils'

const root = document.getElementById('root')

logWithLabel("version", "unnamed-spinning-cube, made with no contexts and solid@1.9.15 THREE@0.186.1 <no libquackity here!>, love is really the 1st ingredient for this one!")

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  )
}

render(() => <App />, root!)
