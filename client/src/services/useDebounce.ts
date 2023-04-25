import {useEffect} from "react";
import {useTimeout} from "./useTimeout";

export function useDebounce(cb: () => any, delay: number, dependencies: any[]) {
    const {clear, reset} = useTimeout(cb, delay)
    useEffect(() => {
        reset()
    }, [...dependencies, delay])

    useEffect(() => {
        clear()
    }, [])
}