import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Sidehug from '../components/Sidehug'
import MyClass from '../components/MyClass'
import { useState } from 'react'
import Modal from '../components/Modal'

export default function Home() {

  const [showModal, setShowModal] = useState(true);

  return (
    <div className={styles.home}>
      <Navbar/>
      <Sidehug/>
      <h4>My classes</h4> 
      <div className={styles.class}>
        <MyClass/>
        <MyClass/>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}/>
    </div>
  )
}
