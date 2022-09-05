import {useRef, useEffect} from "react";

export function useClickOutside(toggleHandler:any) {
    const domRef = useRef<any>()
    useEffect(() => {
     const handler = (e:any) => {
        if(!domRef.current?.contains(e.target)) {
            toggleHandler()
        }
        document.body.addEventListener('touchstart', handler)
         document.addEventListener('click', handler)
         return () => {
             document.removeEventListener('touchstart', handler)
             document.addEventListener('click', handler)
         }
     }
    })
    return domRef
}