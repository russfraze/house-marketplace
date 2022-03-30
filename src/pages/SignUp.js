import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { toast } from 'react-toastify'

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    //remember this shorthand  
    const { name, email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            //this part is tricky  
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            //getting an auth value 
            const auth = getAuth()

            //register the user with that long function which returns a promise 
            //which we put into user credential 
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            //get the user info 
            const user = userCredential.user 
            //update the display name 
            updateProfile(auth.currentUser, {
                displayName: name
            })

            //copy the form data into a new object without changing the sate
            const formDataCopy = {...formData}
            //delete the password from the new object 
            delete formDataCopy.password
            //add a timestamp to the object
            formDataCopy.timestamp = serverTimestamp()
            // update the database and add new user to users collection 
            await setDoc(doc (db, 'users', user.uid), formDataCopy)

            //redirect 
            navigate('/')

        } catch (error) {
           toast.error('Something went wrong') 
        }
    }


    return (
        <>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>
                        Welcome Back!
                    </p>
                </header>

                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        id="name"
                        className='nameInput'
                        value={name}
                        onChange={onChange}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        className='emailInput'
                        value={email}
                        onChange={onChange}
                    />

                    <div className="passwordInputDiv">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="passwordInput"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={onChange}
                        />

                        <img
                            src={visibilityIcon}
                            alt="show password"
                            className="showPassword"
                            onClick={() => setShowPassword((prevState) => !prevState)}
                        />
                    </div>

                    <Link to='/forgot-password'
                        className="forgotPasswordLink">
                        Forgot Password
                    </Link>

                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up 
                        </p>
                        <button className="signUpButton">
                            <ArrowRightIcon fill='ffffff' width='34px' height='34px' />
                        </button>
                    </div>
                </form>
                {/* Google OAuth */}

                <Link to='/sign-in' className="registerLink">
                    Sign In Instead
                </Link>

            </div>
        </>
    )
}

export default SignUp