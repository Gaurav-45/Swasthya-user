import React from 'react'
import styles from '../styles/sidehug.module.css'
import sidehugImg from '../public/sidehug.jpg'
import Image from 'next/image'

const Sidehug = () => {
  return (
    <div className={styles.sidehug}>
        <div>
            <Image
                src={sidehugImg} alt="google-logo" height={600} width={800}
            />
        </div>
        <div className={styles.content}>
            <h1>Start your journey with us</h1>
            <p>Get 10% off on your first class booking</p>
            <button className={styles.book}>Book now!</button>
        </div>
    </div>
  )
}

export default Sidehug