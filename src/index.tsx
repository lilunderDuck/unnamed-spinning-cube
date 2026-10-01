/* @refresh reload */
import { render } from 'solid-js/web'
import 'solid-devtools'
import "molcss/style.css"

import './assets/index.css'
import App from './App'
import { logVersion } from './utils'

const root = document.getElementById('root')

logVersion("unnamed-spinning-cube", "solid@1.9.15 THREE@0.186.1 <no libquackity here!>")

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  )
}

render(() => <App />, root!)
