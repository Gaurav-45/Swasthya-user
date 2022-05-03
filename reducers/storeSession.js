let initialState = null

const storeSession = (state = initialState, action) => {

    if(action.type === "SESSION"){
        state = action.payload
        return state
    }

    return state
}

export default storeSession