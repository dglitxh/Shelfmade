import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { login } from '../../Redux/userSlice';
import { useDispatch } from 'react-redux';
import { Spinner } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'



const Signup = () => {
    const dispatch = useDispatch()
    const [ email, setEmail ]  = useState('')
    const [ name, setName] = useState('')
    const [password, setPassword ] = useState('')
    const [password_2, setPassword_2] = useState('')
    const [alert_, setAlert] = useState(false)
    const [err, setErr ] = useState('')
    const [loading, setLoading] = useState(false)


    const createAccount = (e) => {
        e.preventDefault()
        setLoading(true)
        if (password === password_2){
          console.log("passwords do not match")
          setErr("Your passwords do not match")
          setLoading(false)
          setAlert(true)
        }
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in
                setLoading(false)
                const user = userCredential.user
                console.log('user:', user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false)
            setAlert(true)
            setErr("There was an error, check your input and try again")
            console.log(errorCode, errorMessage)
        });
        onAuthStateChanged(auth, (user) => {
            if (user) {
                updateProfile(auth.currentUser, {
                    displayName:name
                  }).then(() => {
                    // Profile updated!
                    console.log(user.displayName)
                    dispatch(login({email:user.email, uid:user.uid, displayName:user.displayName}))
                    window.location.reload()
                  }).catch((error) => {
                    // An error occurred
                    console.log(error)
                  });
            } else {
              // User is signed out
            }
          });

    setTimeout(()=>{
      setAlert(false)
    }, 8000)

}
const MyAlert = () => {
  return(
    <Alert status='error'>
      <AlertIcon />
      <AlertTitle>Authentication failed!</AlertTitle>
      <AlertDescription>{err}</AlertDescription>
    </Alert>
  )
}


    return(
        <div>
           <div className="container">
            <div className="lg:w-1/2 xl:max-w-screen-sm">
                <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-64 xl:mx-20">
                    <h2 className="text-center text-4xl text-red-600 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Sign Up</h2>

                    <div className="mt-12">
                    {alert_ ? <MyAlert/> : <></>}
                    <br></br>
                        <form onSubmit={createAccount}>
                        <div>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Your Name</div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                                    type="text"
                                    placeholder="Full name"
                                    name='name'
                                    required={true}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}/>
                            </div>
                            <div className='mt-8'>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                                    type="email"
                                    placeholder="mike@gmail.com"
                                    name='email'
                                    required={true}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}/>
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Password
                                    </div>

                                </div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                                type="password"
                                placeholder="Enter your password"
                                name='password'
                                required={true}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}/>
                                <div className='mt-12'>
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Re-enter Password
                                    </div>
                                    </div>
                                </div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                                type="password"
                                placeholder="Re-enter your password"
                                name='password_2'
                                required={true}
                                onChange={(e) => {
                                    setPassword_2(e.target.value)
                                }}/>
                            </div>
                            <div className="mt-10">
                                <button onClick={(e) => {createAccount(e)}} className="bg-red-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600
                                shadow-lg">
                                    {loading? <Spinner/> : "Signup"}
                                </button>
                            </div>
                        </form>
                        <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                            Already have an account ? <Link to='/login' className="cursor-pointer text-red-600 hover:text-red-800">login</Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}


export default Signup
