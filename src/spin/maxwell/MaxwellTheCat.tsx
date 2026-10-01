import { AmbientLight, Box3, DirectionalLight, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { onCleanup, onMount } from "solid-js"
// ...
import { css } from "molcss"
// ...
import { duckDotLog, logStateTransition } from "../../utils"
import { shoutOut } from "./shout"
// @ts-ignore
import maxwellModel from "../../assets/maxwell_the_cat_dingus.glb"

export function SpinningMaxwellTheCat() {
  logStateTransition("CONSTRUCT")
  duckDotLog("hold on, I need to steal a bit of GPU power for this one...")

  const CAT_MODEL_LIGHT_INTENSITY = 5
  
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
    camera.position.set(0, 2, 5)
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    return [renderer, camera] as const
  }

  const initModelAndAddToScene = (scene: Scene, controls: OrbitControls) => {
    logStateTransition("LOAD_MODEL", "for", maxwellModel)
    const loader = new GLTFLoader()
    loader.load(
      maxwellModel, 
      (gltf) => {
        const model = gltf.scene
        scene.add(model)
        
        // Center the camera perspective on the newly loaded object
        const box = new Box3().setFromObject(model)
        const center = box.getCenter(new Vector3())
        controls.target.copy(center)
      },
      (progressEvent) => {
        if (progressEvent.loaded / progressEvent.total * 100 <= 100) {
          logStateTransition("LOAD_MODEL_COMPLETE", `\n|  mod loading complete: ${maxwellModel} has been loaded`)
        }
      },
      (error) => {
        logStateTransition('LOAD_MODEL_ERROR', error)
      }
    )

    shoutOut()
  }
  
  onMount(() => {
    const [renderer, camera] = initRenderer()
    const scene = new Scene()
  
    logStateTransition("COMMON_SETUP")
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    
    const ambientLight = new AmbientLight(0xffffff, CAT_MODEL_LIGHT_INTENSITY)
    scene.add(ambientLight)
    
    const directionalLight = new DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(5, 10, 7)
    scene.add(directionalLight)

    initModelAndAddToScene(scene, controls)

    const render = () => {
      requestAnimationFrame(render)
      controls.update() 
      renderer.render(scene, camera)
    }

    logStateTransition("RENDER_LOOP", "running...")
    render()
  })

  return <>
    <canvas ref={canvasRef} class={css`position: fixed; top: 0; z-index: 1;`} />
  </>
}