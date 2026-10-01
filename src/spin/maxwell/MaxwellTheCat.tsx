import { AmbientLight, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { onMount } from "solid-js"
// ...
import { css } from "molcss"
// ...
import { duckDotLog, logStateTransition } from "../../utils"
// @ts-ignore
import { AnimationFrame, createMaxwellThenAddTo } from "./model"

export function SpinningMaxwellTheCat() {
  logStateTransition("CONSTRUCT")
  duckDotLog("hold on, I need to steal a bit of GPU power for this one...")

  const CAT_MODEL_LIGHT_INTENSITY = 5
  const CAT_ROTATION_DEG = -0.03
  
  let canvasRef!: HTMLCanvasElement
  const initRenderer = () => {
    logStateTransition("INIT_RENDER", "for WebGL")
    const renderer = new WebGLRenderer({ 
      antialias: true, 
      canvas: canvasRef,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 18, 30)
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    return [renderer, camera] as const
  }
  
  onMount(() => {
    const [renderer, camera] = initRenderer()
    const scene = new Scene()
  
    logStateTransition("COMMON_SETUP")
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    
    const ambientLight = new AmbientLight(0xffffff, CAT_MODEL_LIGHT_INTENSITY)    
    const directionalLight = new DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(5, 10, 7)

    scene.add(ambientLight, directionalLight)
    const maxwell = createMaxwellThenAddTo(scene)

    const animationFrame = new AnimationFrame(30, () => {
      if (maxwell.model$) {
        maxwell.model$.rotateY(CAT_ROTATION_DEG)
      }
      // controls.update()
      renderer.render(scene, camera)
    })
    
    animationFrame.start()
  })

  return <>
    <canvas ref={canvasRef} class={css`position: fixed; top: 0; z-index: 1;`} />
  </>
}