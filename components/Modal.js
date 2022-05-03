import 'date-fns';
import React, { useState , useEffect } from 'react'
import styles from '../styles/modal.module.css'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { sessionState } from '../actions/index';

const gender=[
    {
        value: 'Male',
        label: 'Male',
    },
    {
        value: 'Female',
        label: 'Female',
    },
    {
        value: 'Other',
        label: 'Other',
    }
]

const blood=[
    {
        value: 'A+',
        label: 'A+',
    },
    {
        value: 'A-',
        label: 'A-',
    },
    {
        value: 'B+',
        label: 'B+',
    },
    {
        value: 'B-',
        label: 'B-',
    },
    {
        value: 'AB+',
        label: 'AB+',
    },
    {
        value: 'AB-',
        label: 'AB-',
    },
    {
        value: 'O+',
        label: 'O+',
    },
    {
        value: 'O-',
        label: 'O-',
    }
]

const dis=[
    {
        value: true,
        label: 'Yes',
    },
    {
        value: false,
        label: 'No',
    }
]

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        marginBottom: 20,
        marginRight: 15,
      },
    },
}));

const Modal = ({showModal, setShowModal}) => {

    const classes = useStyles();
    const user = useSelector((state) => state.storeSession)
    const dispatch = useDispatch()

    const[userData, setUserData]=useState({
        gender:"",
        dob:"",
        heightInCm:"",
        weightInKg:"",
        bloodGroup:"",
        hasDiabetes:false,
        hasAsthma:false,
        isFirstTime : user === null ? false : user.isFirstTime
    })

    useEffect(() => {
    
        if(user && !showModal){
            const id = user._id;

            axios.patch("https://swasthya-backend.herokuapp.com/user", userData, {params : {userId : id}})
            .then(response => {
                dispatch(sessionState(response.data.result))
                console.log("User details updated successfully")
            })
            .catch(err => console.log(err))
        }
        
    }, [showModal])

    const handleClick=(e)=>{
        e.preventDefault()
        setShowModal(false)
        setUserData({...userData, isFirstTime : false})
    }

    const hnadleClose = (e) => {
        e.preventDefault()
        setShowModal(false)
        setUserData({
            gender:"",
            dob:"",
            heightInCm:"",
            weightInKg:"",
            bloodGroup:"",
            hasDiabetes:false,
            hasAsthma:false,
            isFirstTime : false
        })
    }

    return (
        <>
            {user === null ? null : (showModal && user.isFirstTime) ?(
                <div className={styles.background}>
                    <div className={styles.wrapper}>
                        <div className={styles.close}>
                            <button onClick={hnadleClose}>X</button>
                        </div>
                        <div className={styles.title}>
                            <h1>Help us you know better<img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/person-lifting-weights_1f3cb-fe0f.png" alt="" className={styles.gym}/></h1>   
                        </div>
                        <div className={styles.body}>
                            <form className={classes.root} onSubmit={handleClick}>
                                <div>
                                    <TextField
                                        select
                                        label="Gender"
                                        value={userData.gender}
                                        onChange={e=>setUserData({...userData, gender:e.target.value})}
                                        helperText="Select your gender"
                                        variant="outlined"
                                        required
                                        >
                                        {gender.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        id="date"
                                        label="Date of Birth"
                                        type="date"
                                        value={userData.dob}
                                        onChange={e=>setUserData({...userData, dob:e.target.value})}
                                        variant='outlined'
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>

                                <div>
                                    <TextField 
                                        id="height" 
                                        label="Height" 
                                        variant="outlined" 
                                        onChange={(e)=>setUserData({...userData,heightInCm:e.target.value})} 
                                        required
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Cm</InputAdornment>,
                                        }}
                                    />
                                    <TextField 
                                        id="weight" 
                                        label="Weight" 
                                        variant="outlined" 
                                        onChange={(e)=>setUserData({...userData,weightInKg:e.target.value})} 
                                        required
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                                        }}
                                    />
                                </div>

                                <TextField
                                    select
                                    label="Blood group"
                                    value={userData.bloodGroup}
                                    onChange={e=>setUserData({...userData, bloodGroup:e.target.value})}
                                    helperText="Select your blood group"
                                    variant="outlined"
                                    >
                                    {blood.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <div>
                                    <TextField
                                        select
                                        label="Diabetes"
                                        value={userData.hasDiabetes}
                                        onChange={e=>setUserData({...userData, hasDiabetes:e.target.value})}
                                        helperText="Do you have diabetes?"
                                        variant="outlined"
                                        >
                                        {dis.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        select
                                        label="Asthma"
                                        value={userData.hasAsthma}
                                        onChange={e=>setUserData({...userData, hasAsthma:e.target.value})}
                                        helperText="Do you have asthma?"
                                        variant="outlined"
                                        >
                                        {dis.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className={styles.footer}>
                                    <button type="submit" >Submit 💪🏼</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ):null}
        </>
    )
}

export default Modal