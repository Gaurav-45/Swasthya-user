import React, {useEffect, useState, useContext} from 'react'
import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import {useRouter} from 'next/router'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { sessionState } from '../actions/index'

const Navbar = () => {

    const router = useRouter()
    const [cnt, setCnt] = useState(0)
    const user = useSelector((state) => state.storeSession)
    const dispatch = useDispatch()

    useEffect(async() => {
            if(cnt > 0){
                dispatch(sessionState(null));
                router.push('/login')
            }
    }, [cnt])

    const handleClick = (e) => {
        e.preventDefault()
        setCnt(prev => prev + 1)
    }

    const handleLogin = (e) =>{
        e.preventDefault()
        router.push('/login')
    }

    const handleSignup = (e) => {
        e.preventDefault()
        router.push('/register')
    }

    return (
        <div className={styles.nav}>
            <div className={styles.logo}>Swasthya</div>
            <div className={styles.right}>
                {/* <div className={styles.search}>
                    <input type="text" placeholder='Search' />
                </div> */}
                {!user && <div className={styles.navbutton}>
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleSignup}>Sign up</button>
                </div>}
                {user && <div className={styles.navbutton}>
                <button onClick={handleClick}>Logout</button>
                </div>}
                {user && <div className={styles.user}>
                    <Link href="user"><img src="https://lh3.googleusercontent.com/ogw/ADea4I6fdtjkOOitsUPsUkVmX3WcWSwVxQDdU6p_2QMK=s32-c-mo" alt="" /></Link>
                </div>}
            </div>
            
        </div>
    )
}

export default Navbar