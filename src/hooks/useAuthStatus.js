import { useEffect, useState, useRef} from 'react'
import {getAuth, onAuthStateChanged } from 'firebase/auth'


export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    //initaliZe useRef and store in a variable 
    const isMounted = useRef(true)

    useEffect(() => {
        const auth = getAuth()
        if(isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoggedIn(true)
                }
                setCheckingStatus(false)
            })
        }
        return () => {
            isMounted.current = false
        }
        
    }, [isMounted])
    return { loggedIn, checkingStatus }
}
