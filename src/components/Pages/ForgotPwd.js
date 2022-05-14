
import {useState} from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Spinner } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'


const ForgotPwd = () => {
    const [mail, setMail] = useState('')
    const [loading, setLoading] = useState(false)
    const [showAlert,  setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [alertStatus, setAlertStatus] = useState("")
    const [alertTitle, setAlertTitle] = useState("")

    const changePwd = () => {
        if (!mail) return
        const auth = getAuth();
        const emailAddress = mail
        setLoading(true)
        sendPasswordResetEmail(auth, emailAddress).then(() => {
          //Success
          setAlertStatus('success')
          setAlertTitle("Sucess!")
          setAlertMsg("A link to reset your password has been sent to your mail")
          setLoading(false)
          setShowAlert(true)
        }).catch((error) => {
          // An error ocurred
          setAlertStatus('error')
          setAlertTitle('Authentication error!')
          setLoading(false)
          setShowAlert(true)
          setAlertMsg("There was an error, please try again")
      });
      setTimeout(() => {
        setShowAlert(false)
      }, 8000)
    }

    const MyAlert = () => {
      return(
        <Alert status={alertStatus} variant="left-accent">
          <AlertIcon />
          <AlertTitle>{alertTitle}</AlertTitle>
          <AlertDescription>{alertMsg}</AlertDescription>
        </Alert>
      )
    }
    return (

            <div>
               <div className="container">
                <div className=" ">
                    <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-48 lg:mt-16 xl:px-24 ">
                        <h2 className="text-center text-4xl text-red-600 font-display font-semibold lg:text-left xl:text-5xl
                        xl:text-bold">Forgot Password</h2>

                        <div className="mt-12">
                        {showAlert ? <MyAlert/> : <></>}
                        <br></br>
                            <form onSubmit={() => changePwd()}>
                            <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Your Name</div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                                        type="email"
                                        placeholder="example@email.com"
                                        name='mail'
                                        required={true}
                                        onChange={(e) => {
                                            setMail(e.target.value)
                                        }}/>
                                </div>

                                <div className="mt-10">
                                    <button type="submit" onClick={() => changePwd()} className="bg-red-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600
                                    shadow-lg">
                                        {loading ? <Spinner/> : "Sumbit"}
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
