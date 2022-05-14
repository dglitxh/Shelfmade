
import {useState} from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPwd = () => {
    const [mail, setMail] = useState('')

    changePwd = () => {
        const auth = getAuth();
        const emailAddress = mail

        sendPasswordResetEmail(auth, emailAddress).then(() => {
          alert("A link to reset your password has been sent to your mail")
        }).catch((error) => {
          // An error ocurred
          // ...
          alert("There was an error, please try again")
      });
    }
    return (

            <div>
               <div className="container">
                <div className=" ">
                    <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-48 lg:mt-16 xl:px-24 ">
                        <h2 className="text-center text-4xl text-red-600 font-display font-semibold lg:text-left xl:text-5xl
                        xl:text-bold">Forgot Password</h2>

                        <div className="mt-12">
                            <form onSubmit={() => console.log('i want to change my pwd')}>
                            <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Your Name</div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                                        type="email"
                                        placeholder="example@email.com"
                                        name='email'
                                        required={true}
                                        value={mail}
                                        onChange={mail=>setMail(mail)}/>
                                </div>

                                <div className="mt-10">
                                    <button onClick={changePwd} className="bg-red-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600
                                    shadow-lg">
                                        Signup
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
           </div>
        )

}


export default ForgotPwd
