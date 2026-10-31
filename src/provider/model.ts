import { createSignal } from "solid-js"
import { logStateTransition } from "../utils"
import { GLTFLoader } from "three/examples/jsm/Addons.js"
import { Box3, Group, Object3DEventMap, Scene, Vector3 } from "three"

export function createModelHandler() {
  const [isLoading, setIsLoading] = createSignal(false)

  let currentModel: Group<Object3DEventMap> | null = null
  
  const createModel = (scene: Scene, modelPathImport: any) => {
    logStateTransition("LOAD_MODEL", "for", modelPathImport)

    setIsLoading(true)
    const loader = new GLTFLoader()
    let outRef: { model$: Group<Object3DEventMap> | null } = {
      model$: null
    }
  
    loader.load(
      modelPathImport, 
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
          logStateTransition("LOAD_MODEL_COMPLETE", `\n|  mod loading complete: ${modelPathImport} has been loaded`)
          setIsLoading(false)
        }
      },
      (error) => {
        logStateTransition('LOAD_MODEL_ERROR', error)
        setIsLoading(false)
      }
    )
  
    return outRef
  }

  return {
    create$: createModel,
    isLoading$: isLoading,
    get currentModel$(): Group<Object3DEventMap> | null {
      return currentModel
    }
  }
}

export type ModelHandler = ReturnType<typeof createModelHandler>