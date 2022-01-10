import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { login } from '../../Redux/userSlice';
import { useDispatch } from 'react-redux';



const Signup = () => {
    const dispatch = useDispatch()
    const [ email, setEmail ]  = useState('')
    const [ name, setName] = useState('')
    const [password, setPassword ] = useState('')
    const [password_2, setPassword_2] = useState('')

  
    const createAccount = (e) => {
        e.preventDefault()
        if (password.length < 8) alert("Password must be more than 8 characters")
        if (password === password_2){
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)    
            .then((userCredential) => {
            // Signed in 
                const user = userCredential.user
                console.log('user:', user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
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
    }else{
        alert("Your passwords do not match")
    }
    
}


    return(
        <div>
           <div className="container">
            <div className="lg:w-1/2 xl:max-w-screen-sm">
                <div className="mt-10 px-42 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 ">
                    <h2 className="text-center text-4xl text-red-600 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Sign Up</h2>
                    
                    <div className="mt-12">
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
                                    Signup
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