import {useState, useEffect} from 'react'
import {getAuth} from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'

function Profile() {
    const auth = getAuth() 
    const [userData,setUserData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const {name, email} = userData

    const navigate = useNavigate()

    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }


    //check to see if there is a logged in user and if so display name
    return(
        <div className='profile' >
            <header className='profileHeader'>
                <p className="pageHeader">My Profile</p>
                <button type='button' className='logOut' onClick={onLogout}>
                    Logout
                </button>
            </header>
        </div>
    )
}

export default Profile
