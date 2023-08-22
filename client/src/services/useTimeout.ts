import {useCallback, useEffect, useRef} from "react";

export function useTimeout(cb: () => void, delay: number) {
    const callback = useRef(cb)
    const timeout = useRef<NodeJS.Timeout | null>(null)
    useEffect(() => {
        callback.current = cb
    }, [cb])

    const clear = useCallback(() => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }
    }, [])

    const set = useCallback(() => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }
        timeout.current = setTimeout(callback.current, delay)
    }, [delay])

    useEffect(() => {
        set()
        return clear
    }, [])

    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set])


    return {reset, clear}
}