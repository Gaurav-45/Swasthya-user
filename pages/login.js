import React, { useState } from 'react'
import loginImage from '../public/login.png'
import Image from 'next/image'
import styles from '../styles/login.module.css'
import Link from 'next/link'
import google from '../public/google.svg';
import {useRouter} from 'next/router'
import { firebaseApp } from '../config/firebaseApp'
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {sessionState} from '../actions/index'

const Login = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.storeSession)
    
    const [creds, setCreds] = useState({
        identifier:"",
        password:""
    })
    const authentication = getAuth();
    
    //noraml email pass
    const handleLogin=(e)=>{
        e.preventDefault();
    
        signInWithEmailAndPassword(authentication, creds.identifier, creds.password)
        .then((response) => {
            const firebaseUid = response.user.uid

            axios.post("https://swasthya-backend.herokuapp.com/user/present", {params : {firebaseUid : firebaseUid}})
            .then((response) => {
                if(response.data.present){
                    dispatch(sessionState(response.data.user))
                    router.push('/')
                }
                else{
                    router.push('/register')
                    window.alert("Please register first")
                }
            })
            .catch((err) => console.log(err))
            
        })
        .catch((err) => {window.alert("Invalid username or password please try again")})
    }

    //google
    const provider = new GoogleAuthProvider();
    const handleGoogleLogin =(e)=> {

        e.preventDefault()

        signInWithPopup(authentication, provider)
        .then((result) => {
            const user = result.user;
            
            const firebaseUid = user.uid
            const email = user.email
            const name = user.displayName

            axios.post("https://swasthya-backend.herokuapp.com/user/present", {params : {firebaseUid : firebaseUid}})
            .then((response) => {
                if(response.data.present){
                    dispatch(sessionState(response.data.user))
                    console.log("Already Present")
                    router.push('/')
                }
                else{
                    const body = {email : email, name : name, firebaseUid : firebaseUid}

                    axios.post("https://swasthya-backend.herokuapp.com/user", body)
                    .then((response) => {
                        dispatch(sessionState(response.data.result))
                        router.push('/')
                    })
                    .catch(err =>  console.log(err))
                }
            })
            .catch((err) => console.log(err))
  
        }).catch((error) => {
            console.log(error)
            window.alert("Invalid username or password please try again")
           
        });
    }

  return (
    <div className={styles.login}>
        <div className={styles.container}>
            <div className={styles.sidehug}>
                <img className={styles.image} src="https://vinron.in/wp-content/uploads/2021/06/Fitnessillustration.png" alt="" />
            </div>
            <div className={styles.sidehug}>
                <div className={styles.signIn}>
                    <form onSubmit={handleLogin}  className={styles.form}>
                        <h3 className={`${styles.center} ${styles.heading}`}>Login</h3>
                        <div className={styles.element}>
                            <label>Email</label>
                            <input onChange={(e)=>setCreds({...creds, identifier:e.target.value})} type="text" name="username" id="username" value={creds.username} placeholder='Email' />
                        </div>
                        <div className={styles.element}>
                            <label>Password </label>
                            <input onChange={(e)=>setCreds({...creds, password:e.target.value})} type="password" name="password" id="password" value={creds.password} placeholder='Password'/>
                        </div>
                        <div className={styles.center}>
                            <input type='submit' value='Login' className={styles.btn}/>
                        </div>
                        <div className={styles.orDivider}>
                            <hr/>
                                <span>OR</span>
                            <hr/>
                        </div>
                        <div className={styles.thirdParty}>
                            <button className={styles.authBtn} onClick={handleGoogleLogin}><Image src={google} alt="google-logo" height={25}/>Sign in using Google</button>
                            {/* <button className={styles.authBtn}><Image src={facebook} alt="facebook-logo" height={25}/>Sign in using Facebook</button> */}
                        </div>
                    </form>
                    <p className={styles.subtitle}>Don't have an account? <Link href="/register"><a>Sign-up</a></Link></p>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login