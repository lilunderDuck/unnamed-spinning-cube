import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js"
import { DUCK_LOG_LABEL, LOG_BASE_STYLE, logStateTransition } from "../../utils"
// @ts-ignore
import maxwellModel from "../../assets/maxwell_the_cat_dingus.glb"
import { Box3, Group, Object3DEventMap, Scene, Vector3 } from "three"

export function createMaxwellThenAddTo(scene: Scene) {
  logStateTransition("LOAD_MODEL", "for", maxwellModel)
  const loader = new GLTFLoader()
  let outRef: { model$: Group<Object3DEventMap> | null } = {
    model$: null
  }

  loader.load(
    maxwellModel, 
    (gltf) => {
      const model = gltf.scene
      scene.add(model)
      
      // Center the camera perspective on the newly loaded object
      const box = new Box3().setFromObject(model)
      const center = box.getCenter(new Vector3())
      model.position.sub(center)
      outRef.model$ = model
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
  return outRef
}

function shoutOut() {
  logStateTransition('SHOUT_CREDIT', "making sure to credit people...")
  
  const CAT_ASCII = `
                     \\    /\\
                      )  ( ')
                      (  /  )
                       \\(__)|
  `

  const messages = [
    "%cduck%c %cshouting out loud%c\n",
    CAT_ASCII,
    "\n",
    "%cMaxwell the cat (Dingus)%c %cby%c %c@bean(alwayshasbean)%c\n",
    "\n",
    "%cLicense%c: %cCC Attribution - CC BY 4.0%c\n",
    "|  https://creativecommons.org/licenses/by/4.0/",
    "\n\n",
    "%cOriginal work can be found on Sketchfab via here:%c\n",
    "https://sketchfab.com/3d-models/maxwell-the-cat-dingus-2ca7f3c1957847d6a145fc35de9046b0\n",
    "\n\n",
    "Thank you for making this model!\n"
  ]

  console.log(
    messages.join(''),
    DUCK_LOG_LABEL, "", 
    `${LOG_BASE_STYLE};background-color:#bd7aff`, "", 
    "font-size:20px;color:#fab387;font-weight:bold", "", 
    "font-size:20px", "", 
    "font-size:20px;color:#eba0ac;font-weight:bold", "",
    "color:#bac2de;font-weight:bold", "",
    "color:#74c7ec;font-weight:bold", "",
    "color:#bac2de;font-weight:bold", "",
  )
}

export class AnimationFrame {
  private requestID: number = 0
  constructor(private readonly fps: number, private animate: (deltaTime: number) => void) {
    this.fps = fps;
    this.animate = animate;
  }

  start() {
    let then = performance.now();
    const interval = 1000 / this.fps;
    const tolerance = 0.1;

    const animateLoop = (now: number) => {
      this.requestID = requestAnimationFrame(animateLoop);
      const delta = now - then;

      if (delta >= interval - tolerance) {
        then = now - (delta % interval);
        this.animate(delta);
      }
    }

    logStateTransition("RENDER_LOOP", "running...")
    this.requestID = requestAnimationFrame(animateLoop);
  }

  stop() {
    cancelAnimationFrame(this.requestID);
  }

}