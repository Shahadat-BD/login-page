import React, { useState,useRef, useContext } from 'react';
import { GithubAuthProvider, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail  } from "firebase/auth";

import {FiEye,FiEyeOff} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Provider/AuthProvider';

const Login = () => {
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const [showPassword,setShowPassword] = useState(false)
    const emailRef = useRef(null)
    const navigate = useNavigate()

    const {setUser,signInUser} = useContext(AuthContext)

  const handleLoginForm = e => {
      e.preventDefault()
      const email = e.target.email.value
      const password = e.target.password.value
      
      signInUser(email, password)
            .then(result => {
                const userInfo = result.user
                e.target.reset()
                navigate('/')
                console.log(userInfo);
                if (!userInfo.emailVerified) {
                    toast("please verify your email")
                }else{
                    setSuccess('user login successfully')
                    setUser(userInfo)
                    setError('')
                }
               

            })
            .catch(error => {
                setError(error.message)
                setSuccess('')
            });

  }

  const handleForgetPassword = () =>{
    const email = emailRef.current.value;
     if (!email) {
        setError('please provide an email')
        return
     }else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
        setError("please provide a valid email ")
        return
    }

    sendPasswordResetEmail(auth,email)
    .then(()=>{
        toast('please check your email')
    })
    .catch((error)=>{
        setError(error.message)
    })


  }

  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

    const handleGoogleSignIn = () =>{
        signInWithPopup(auth,googleProvider)
        .then(result =>{
            const loggedInUser = result.user
              setUser(loggedInUser)
              console.log(loggedInUser);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    const handleGithubSignIn = () =>{
        signInWithPopup(auth,githubProvider)
        .then(result =>{
            const loggedInUser = result.user
              setUser(loggedInUser)
              console.log(loggedInUser);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    return (
        <div>
        <div className="flex justify-center">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <p className='text-center text-2xl font-bold text-gray-500 mt-4'>Please Login Now</p>
           <form className="card-body pb-0" onSubmit={handleLoginForm}>

          <div className="relative h-11 w-full min-w-[200px] mb-3">
              <input type="email" ref={emailRef}  name='email' placeholder="" className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" required />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                 Email
              </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px] mb-3">
              <input type={showPassword ? "text" : "password"} name='password' placeholder="" className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" required />
              <span onClick={()=>setShowPassword(!showPassword)} className='absolute -ml-10 mt-4 cursor-pointer'>{showPassword ? <FiEye/> : <FiEyeOff/>}</span>

              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                 password
              </label>
              <label className="label mt-3">
                 <a href="#" onClick={handleForgetPassword} className="label-text-alt link font-bold link-hover">Forgot password</a>
              </label>
          </div>

          <div className="form-control mt-10">
          <input className="btn btn-primary" type='submit' value={'Login'}></input>
          </div>
          <Link to={'/Register'}> <p className='text-center font-bold'>If you a new user ? please Register</p> </Link>
          <p className='text-red-500'>{error}</p>
          <p className='text-green-500'>{success}</p>
           </form>
      
          <div className='text-center mb-5'>
            <button onClick={handleGoogleSignIn} className='bg-black text-white px-5 py-2 mr-3'>google</button>
            <button onClick={handleGithubSignIn} className='bg-black text-white px-5 py-2 '>github</button>
         </div> 
       

        </div>

        
      </div>

            <ToastContainer></ToastContainer>
    </div>
    );
};

export default Login;