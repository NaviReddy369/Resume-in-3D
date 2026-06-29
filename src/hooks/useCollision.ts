import { useRef } from 'react'

// Placeholder hook for registering colliders in the scene.
export default function useCollision() {
  const colliders = useRef<Array<any>>([])
  return {
    add: (c: any) => void colliders.current.push(c),
    list: colliders.current
  }
}
