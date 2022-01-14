import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom"
import { login } from '../../Redux/userSlice';
import { useDispatch,  } from 'react-redux';


const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = (e) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
    // Signed in 
        const user = userCredential.user;
        console.log("loggedIn", user.uid)
        // ...
         })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}: ${errorMessage}`)
        if (errorCode === 'auth/wrong-password' || errorCode === "auth/user-not-found"){
            alert('Wrong email or password')
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
        e.preventDefault()
    }
    return(
  
        <div className="container">
            <div className="lg:w-1/2 xl:max-w-screen-sm">
                <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                    <h2 className="text-center text-4xl text-red-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Log in</h2>
                    <div className="mt-12">
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
                                        <Link to='/' className="text-xs font-display font-semibold text-red-600 hover:text-red-800
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
                                    Log In
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