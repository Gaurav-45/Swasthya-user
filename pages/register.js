import React, { useState } from 'react'
import loginImage from '../public/login.png'
import Image from 'next/image'
import styles from '../styles/register.module.css'
import Link from 'next/link'
import registerImage from '../public/register.png'
import google from '../public/google.svg';
import {useRouter} from 'next/router'
import { firebaseApp } from '../config/firebaseApp'
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import axios from 'axios'

const Register = () => {

    const router = useRouter();

    const [creds, setCreds] = useState({
        name : "",
        identifier:"",
        password:""
    })

    const authentication = getAuth();

    const register = e =>{
        e.preventDefault();

        createUserWithEmailAndPassword(authentication, creds.identifier, creds.password)
        .then((response) => {
            const firebaseUid = response.user.uid
            const email = response.user.email
            const name = creds.name

            axios.post("https://swasthya-backend.herokuapp.com/user/present", {params : {firebaseUid : firebaseUid}})
            .then((response) => {
                if(response.data.present){
                    console.log("Already Present")
                    router.push('/')
                }
                else{
                    const body = {email : email, name : name, firebaseUid : firebaseUid}

                    axios.post("https://swasthya-backend.herokuapp.com/user", body)
                    .then((response) => {
                        router.push('/login')
                    })
                    .catch(err =>  console.log(err))
                }
            })
            .catch((err) => console.log(err))
        })
        .catch(err => console.log(err))
    }

    const provider = new GoogleAuthProvider();
    const handleGoogleRegister = (e) => {
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
                    console.log("Already Present")
                    router.push('/')
                }
                else{
                    const body = {email : email, name : name, firebaseUid : firebaseUid}

                    axios.post("https://swasthya-backend.herokuapp.com/user", body)
                    .then((response) => {
                        router.push('/login')
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
            <div className={`${styles.sidehug} ${styles.image}`}>
                <Image
                    src={registerImage}
                    alt="register"
                />
            </div>
            <div className={styles.sidehug}>
                <div className={styles.signIn}>
                    <form onSubmit={register}  className={styles.form}>
                        <h3 className={`${styles.center} ${styles.heading}`}>Register</h3>
                        <div className={styles.element}>
                            <label>Name</label>
                            <input onChange={(e)=>setCreds({...creds, name:e.target.value})} type="text" name="name" id="name" value={creds.name} placeholder='Name' />
                        </div>
                        <div className={styles.element}>
                            <label>Email</label>
                            <input onChange={(e)=>setCreds({...creds, identifier:e.target.value})} type="text" name="username" id="username" value={creds.username} placeholder='Email' />
                        </div>
                        <div className={styles.element}>
                            <label>Password </label>
                            <input onChange={(e)=>setCreds({...creds, password:e.target.value})} type="password" name="password" id="password" value={creds.password} placeholder='Password'/>
                        </div>
                        <div className={styles.center}>
                            <input type='submit' value='Register' className={styles.btn}/>
                        </div>
                        <div className={styles.orDivider}>
                            <hr/>
                                <span>OR</span>
                            <hr/>
                        </div>
                        <div className={styles.thirdParty}>
                            <button className={styles.authBtn} onClick={handleGoogleRegister}><Image src={google} alt="google-logo" height={25}/>Sign up using Google</button>
                            {/* <button className={styles.authBtn}><Image src={facebook} alt="facebook-logo" height={25}/>Sign up using Facebook</button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register