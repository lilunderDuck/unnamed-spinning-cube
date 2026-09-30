import { css } from 'molcss'
// ...
import "./App.css"
import "./assets/animation.css"
import { SpinningMaxwellTheCat } from './spin'
import { logWithLabel } from './utils'

const movingDot = css`
  background-size: 40px 40px;
  background-image: radial-gradient(var(--base) 2px, transparent 2px);
  width: 100%;
  height: 100%;
  background-color: var(--crust);
  animation: dot_grid_move 5s linear infinite, animation_fadeIn 1.5s ease-out forwards;
  position: absolute;
  top: 0;
  z-index: -1;
`

const spinning__scene = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function App() {
  return (
    <>
      <div class={movingDot} />
      <div class={spinning__scene}>
        {/* <SpinningCube cubeSize$={140} /> */}
        <SpinningMaxwellTheCat />
      </div>
    </>
  )
}
