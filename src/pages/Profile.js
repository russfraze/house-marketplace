import {useState} from 'react'
import {getAuth, updateProfile} from 'firebase/auth'
import { db } from '../firebase.config'
import {updateDoc, doc} from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Profile() {
    //get the auth object
    const auth = getAuth() 
    //
    const [changeDetails, setChangeDetails] = useState(false)
    //state for the signed in user's data that comes from auth 
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })
    // destructure from formData to get the two values 
    const {name, email} = formData
    //inital navigate hook 
    const navigate = useNavigate()
    //sign out and redirect on button click 
    const onLogout = () => {
       auth.signOut()
       navigate('/') 
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    } 

    const onSubmit = async () => {
        try {
            //check if current loggeg in user display name is equal to name in state
           if(auth.currentUser.displayName !== name) {
            //update display name in firebase
            await updateProfile(auth.currentUser, {
                displayName: name
            })

            // Update in firestore
            //creating a reference to the document 
            const userRef = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userRef, {
                name
            })
           }
        } catch (error) {
            console.log(error)
            toast.error('Could not update profile details')
        }
    }
   

    //check to see if there is a logged in user and if so display name
    return <div className='profile'>
        <header className='profileHeader'>
            <p className='pageHeader'>My Profile</p>
            <button type='button' className='logOut' onClick={onLogout}>Logout</button>
        </header>

        <main>
            <div className='profileDetailsHeader'>
                <p className='profileDetailsText'>Personal Details</p>
                {/* clickable text that lets user change details */}
                <p className='changePersonalDetails' onClick={() => {
                    changeDetails && onSubmit() 
                    setChangeDetails((prevState) => !prevState)
                }}>
                    {changeDetails ? 'done' : 'change'}
                </p>
            </div>

            <div className='profileCard'>
                <form>
                    <input 
                    className={!changeDetails ? 'profileName' : 'profileNameActive'} 
                    disabled={!changeDetails} 
                    id='name' 
                    type='text' 
                    value={name}
                    onChange={onChange}
                    />
                    <input 
                    className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} 
                    disabled={!changeDetails} 
                    id='email' 
                    type='text' 
                    value={email}
                    onChange={onChange}
                    />
                    
                </form>
            </div>
        </main>

    </div>
}

export default Profile


