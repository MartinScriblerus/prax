import { ChatTypes } from './types'


import {
    getUsers as getUsersAPI,
    getChat as getChatAPI,
    postMessage as postMessageAPI,
    // markAsRead as markAsReadAPI
} from '../../services/api'


export const getUsersRequest = ()=>async dispatch=>{
    dispatch({type: ChatTypes.GET_USERS_REQUEST})
    try {
        //const response = await axios.get(`${BASE_URL}/relation`)
        const response = await getUsersAPI()
        //onsole.log(response)
        dispatch(getUsersSuccess(response))
    }catch(err){
        console.log(err.response)
    }
}

export const getUsersSuccess = (user)=> async dispatch=>{
    try {
       
        // const response = await axios.get(`${BASE_URL}/relation`)
        // users = await getUsersSuccess()

        dispatch({
            type: ChatTypes.GET_USERS_SUCCESS,
            payload: user
        })
     
       

    } catch (err){

        console.log("Get users success failed")
}
}



export const getChatRequest =(id)=> async dispatch=>{
    dispatch({type: ChatTypes.GET_USERS_REQUEST})
    try{
        //const response = await axios.get(`${BASE_URL}/message/chat/${id}`)
        const response = await getChatAPI(id)
        console.log(response);
        dispatch(getChatSuccess(response.data.chat))
        console.log(response.data.chat)
    }catch(err){
        console.log(err.response)
    }
}

export const getChatSuccess =(messages)=>async dispatch=>{
    dispatch({
        type: ChatTypes.GET_CHAT_SUCCESS,
        payload: messages
    })
}

export const postMessageRequest = (messages, idOrigin)=>async dispatch=>{
    dispatch({type: ChatTypes.POST_MESSAGE_REQUEST})
    try{
        //await axios.post(`${BASE_URL}/message/`, dataMessage)
        await postMessageAPI(messages)
        dispatch(postMessageSuccess(messages, idOrigin))
        // dispatch(Success(dataMessage, idOrigin))
    }catch(err){
        console.log(err.response)
    }
}


    export const postMessageSuccess = (idOrigin)=>async dispatch=>{
    dispatch({type: ChatTypes.POST_MESSAGE_SUCCESS})

    dispatch(getUsersRequest())


}



export const markAsReadSuccess =()=> async dispatch=>{
    dispatch({type: ChatTypes.MARK_AS_READ_SUCCESS})
}