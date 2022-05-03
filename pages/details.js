import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { sessionState } from '../actions/index';
import {useRouter} from 'next/router'

const details = () => {

    const state = useSelector((state) => state.storeSession)
    const dispatch = useDispatch()
    const router = useRouter()

    const showDetails = () =>{

        console.log(state);
    }

    const handleClick = () => {
        dispatch(sessionState(null))
        router.push('/login')
    }
    
     return state === null ? <div>Loading</div> : ( 
        <div>
            {state &&(<div>Logged in</div>)}
            <button onClick={showDetails}>Show</button>
            <button onClick={handleClick}>LogOut</button>
        </div>);  
    
}

export default details;