import { useState, useCallback, useEffect } from "react"

export default function useToggle(cb?: (status) => void) {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        cb && cb(isOpen)
    }, [isOpen])

    const open = useCallback(() => {
        setIsOpen(true)
    }, [])

    const close = useCallback(() => {
        setIsOpen(false)
    }, [])

    return { isOpen, open, close }
}