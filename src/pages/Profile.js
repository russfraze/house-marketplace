import {useState, useEffect} from 'react'
import {getAuth} from 'firebase/auth'

function Profile() {
    const [user,setUser] = useState(null)

    const auth = getAuth() 
    useEffect(() => {
        setUser(auth.currentUser)
    },[])

    //check to see if there is a logged in user and if so display name
    return user ? <h1>{user.displayName}</h1> : 'Not logged in'
}

export default Profile
