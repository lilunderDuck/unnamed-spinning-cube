import { createContext, onMount, type ParentProps, useContext } from "solid-js";
import { AmbientLight, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { css } from "molcss";
// ...
import { createModelHandler, type ModelHandler } from "./model";
import { logStateTransition } from "../utils";
import { AnimationFrame } from "../spin/maxwell/model";

interface IUnnamedSpinningCubeContext {
  model$: ModelHandler
}

const Context = createContext<IUnnamedSpinningCubeContext>()

export function UnnamedSpinningCubeProvider(props: ParentProps) {
  const modelHandler = createModelHandler()

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

  const initScene = (camera: PerspectiveCamera, renderer: WebGLRenderer) => {
    const scene = new Scene()
  
    logStateTransition("COMMON_SETUP")
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    
    const ambientLight = new AmbientLight(0xffffff, MODEL_LIGHT_INTENSITY)    
    const directionalLight = new DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(5, 10, 7)

    scene.add(ambientLight, directionalLight)
  }

  const MODEL_LIGHT_INTENSITY = 5
  const MODEL_ROTATION_DEG = -0.03
  
  onMount(() => {
    const [renderer, camera] = initRenderer()
    const scene = new Scene()
  
    logStateTransition("COMMON_SETUP")
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    
    const ambientLight = new AmbientLight(0xffffff, MODEL_LIGHT_INTENSITY)    
    const directionalLight = new DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(5, 10, 7)

    scene.add(ambientLight, directionalLight)

    const animationFrame = new AnimationFrame(30, () => {
      if (modelHandler.currentModel$) {
        modelHandler.currentModel$.rotateY(MODEL_ROTATION_DEG)
      }

      renderer.render(scene, camera)
    })
    
    animationFrame.start()
  })

  return (
    <Context.Provider value={{
      model$: modelHandler
    }}>
      <canvas ref={canvasRef} class={css`position: fixed; top: 0; z-index: 1;`} />
      {props.children}
    </Context.Provider>
  )
}

export function useUnnamedSpinningCubeContext() {
  return useContext(Context)!
}