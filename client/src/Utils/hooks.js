import { useEffect, useRef } from "react";

export const useOutsideClick = (callback) => {
    const ref = useRef()
  
    useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback()
          }
      }
  
      document.addEventListener('click', handleClick, true)
  
      return () => {
        document.removeEventListener('click', handleClick, true)
      }
    }, [callback])
  
    return ref
  }

  export const useEffectOnce = ( effect => {

    const destroyFunc = useRef()
    const calledOnce = useRef(false)
    const renderAfterCalled = useRef(false)

    if (calledOnce.current) {
        renderAfterCalled.current = true
    }

    useEffect( () => {
        if (calledOnce.current) { 
            return
        }

        calledOnce.current = true;
        destroyFunc.current = effect()

        return ()=> {
            if (!renderAfterCalled.current) {
                return
            }

            if (destroyFunc.current) {
                destroyFunc.current()
            }
        }
    }, [effect])
})
