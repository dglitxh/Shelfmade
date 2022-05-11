import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { login } from '../../Redux/userSlice';
import { useDispatch,  } from 'react-redux';
import { Spinner } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'


const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const [err, setErr ] = useState('')

    const navigate = useNavigate()
    const loginUser = (e) => {
        e.preventDefault()
        setLoading(true)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
        // Signed in
            const user = userCredential.user;
            setLoading(false)
            navigate('/cart')
            console.log("loggedIn", user.uid)
        // ...
         })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErr("authentication failed due to and error. Refresh page and try again")
            console.log(`${errorCode}: ${errorMessage}`)
            setLoading(false)
            setAlert(true)
            if (errorCode === 'auth/wrong-password' || errorCode === "auth/user-not-found"){
                setAlert(true)
                setErr('Invalid user name or password')
            }
        });
        onAuthStateChanged(auth, (user) => {
            if (user) {
                    // Profile updated!
                    console.log(user.displayName)
                    dispatch(login({email:user.email, uid:user.uid, displayName:user.displayName}))
                    window.location.reload()
                    // ...
            } else {
              // User is signed out
              // ...
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

        <div className="container">
            <div className=" ">
                <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-64 xl:mx-20">
                    <h2 className="text-center text-4xl text-red-500 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Log in</h2>
                    <div className="mt-12">
                    {alert ? <MyAlert/> : <></>}
                    <br></br>
                        <form onSubmit={() => {loginUser()}}>
                            <div>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                                    type="email"
                                    placeholder="mike@gmail.com"
                                    name="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    />
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Password
                                    </div>
                                    <div>
                                        <Link to='/forgot' className="text-xs font-display font-semibold text-red-600 hover:text-red-800
                                        cursor-pointer">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}/>
                            </div>
                            <div className="mt-10">
                                <button onClick={(e) => {loginUser(e)}} className="bg-red-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600
                                shadow-lg">
                                    {loading? <Spinner/> : "Log In"}
                                </button>
                            </div>
                        </form>
                        <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                            Don't have an account ? <Link to='/signup' className="cursor-pointer text-red-600 hover:text-red-800">Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    )
}

export default Login
