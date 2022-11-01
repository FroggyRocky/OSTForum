import {useRef, useEffect} from "react";

export function useClickOutside(closingHandler:any) {
    const domRef = useRef<any>()
    useEffect(() => {
     const handler = (e:any) => {
         e.stopPropagation()
        if(!domRef.current?.contains(e.target) || !domRef.current) {
            closingHandler()
        }
     }
         document.addEventListener('touchstart', handler)
         document.addEventListener('click', handler)
         return () => {
             document.removeEventListener('touchstart', handler)
             document.addEventListener('click', handler)
         }

    }, [domRef])
    return domRef
}