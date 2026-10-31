import { css } from "molcss"
import { useUnnamedSpinningCubeContext } from "../provider"

const indicator__root = css`
  position: absolute;
  left: 50%;
  transform: translate(-59%, 0);
  margin-bottom: 20px;
  background-color: var(--base);
  padding-inline: 4rem;
  padding-block: 5px;
  border-radius: 6px;
  user-select: none;
  transition: 0.25s ease-out;
`

const indicator__show = css`
  bottom: 0;
`

const indicator__hide = css`
  bottom: -50px;
`

export function LoadingModelTextIndicator() {
  const { model$ } = useUnnamedSpinningCubeContext()

  return (
    <div class={`${indicator__root} ${model$.isLoading$() ? indicator__show : indicator__hide}`}>
      Loading 3D model...
    </div>
  )
}