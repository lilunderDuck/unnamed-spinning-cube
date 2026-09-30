import "./LoadingScreen.css"

export function LoadingScreen() {
  return (
    <div class="loadingScreen">
      <div class="loadingScreen__loader" />
      <div class="loadingScreen__moreInfo">
        The source code is aviliable at <a href="https://github.com/lilunderDuck/random-ahh-website">https://github.com/lilunderDuck/random-ahh-website</a>
      </div>
    </div>
  )
}