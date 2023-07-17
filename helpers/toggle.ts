import { useState, useCallback } from "react"

export default function useToggle () {
    
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    const open = useCallback(() => {
        setIsOpen(true)
    }, [isOpen])

    const close = useCallback(() => {
        setIsOpen(false)
    }, [isOpen])

    return { isOpen, open, close }
}