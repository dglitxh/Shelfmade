import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';



const Signup = () => {
    const [ user, setUser] = useState('')
    const [ email, setEmail ]  = useState('')
    const [password, setPassword ] = useState('')
    const [password_2, setPassword_2] = useState('')

  
    const createAccount = (e) => {
        e.preventDefault()
        if (password === password_2){
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
    // Signed in 
        const user = userCredential.user;
        setUser(user)
        console.log('user:', user)
    // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
     });
    }else{
        alert("Your pass words do not match")
    }
}


    return(
        <div>
           <div class="container">
            <div class="lg:w-1/2 xl:max-w-screen-sm">
                <div class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                    <h2 class="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Sign Up</h2>
                    <div class="mt-12">
                        <form onSubmit={() => {createAccount()}}>
                            <div>
                                <div class="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                                <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" 
                                    type="" 
                                    placeholder="mike@gmail.com"
                                    name='email'
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}/>
                            </div>
                            <div class="mt-8">
                                <div class="flex justify-between items-center">
                                    <div class="text-sm font-bold text-gray-700 tracking-wide">
                                        Password
                                    </div>
                                    
                                </div>
                                <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" 
                                type="password" 
                                placeholder="Enter your password"
                                name='password'
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}/>
                                <div className='mt-12'>
                                <div class="flex justify-between items-center">
                                    <div class="text-sm font-bold text-gray-700 tracking-wide">
                                        Re-enter Password
                                    </div>
                                    </div>
                                </div>
                                <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" 
                                type="password" 
                                placeholder="Re-enter your password"
                                name='password_2'
                                onChange={(e) => {
                                    setPassword_2(e.target.value)
                                }}/>
                            </div>
                            <div class="mt-10">
                                <button onClick={(e) => {createAccount(e)}} class="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg">
                                    Signup
                                </button>
                            </div>
                        </form>
                        <div class="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                            Already have an account ? <Link to class="cursor-pointer text-indigo-600 hover:text-indigo-800">login</Link>
                        </div>
                    </div>
                </div>
            </div>
            </div> 
        </div>
    )
}


export default Signup