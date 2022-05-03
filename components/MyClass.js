import React from 'react'
import styles from '../styles/myClass.module.css'
import cardImg from '../public/card-4.jpg'
import Image from 'next/image'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import PersonIcon from '@material-ui/icons/Person';

const MyClass = () => {
  return (
    <div className={styles.card}>
        <Image
            src={cardImg}
            width={400}
            height={250}
        />
        <div className={styles.content}>
          <div className={styles.heading}>
            <p >Calisthenics </p>
            <div className={styles.coach}>
              <PersonIcon/>
              <p>Kristen Pereira</p>
            </div>
          </div>
            
            <div className={styles.time}>
              <div className={styles.vertical}>
                <CalendarTodayIcon/> 
                <p>20-03-2022</p>
              </div>
              <div className={styles.vertical}>
                <AccessAlarmsIcon/> 
                <p>5:00 PM IST</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default MyClass