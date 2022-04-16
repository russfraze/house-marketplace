import {useLocation, useNavigate} from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import goodleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            //check for user 
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            //If user doesn't exist create user  
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName, 
                    email: user.email, 
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            toast.error('Could not authoriZe with Google')
        }
    }

    return (
        <div className='socialLogin'>
            {/* this is cool cuZ depending on what page your on it says in or up  */}
            {/* see how the location hook is used for this */}
            <p>Sign {location.pathname === '/sign-up' ? 'up ' : 'in '} 
                 with 
            </p>
            <button className='socialIconDiv' onClick={onGoogleClick}>
                <img className='socialIconImg' src={goodleIcon} alt="google" />
            </button>
        </div>
    )
}

export default OAuth
