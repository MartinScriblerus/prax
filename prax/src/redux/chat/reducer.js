import { ChatTypes } from "./types";

const InitialState = {
  data: [],
  contacts: [],
  loadingContacts: false,
  // destiny: undefined,
  messages: [],
  sendingMsg: false
};

export default function(state = InitialState, action) {
  // payload.config request response contains contacts from firsttimesignin/db
  // console.log(action)
  switch (action.type) {

    case ChatTypes.GET_USERS_REQUEST:
  
      return {
        ...state,
        loadingContacts: true,
      };
      
    case ChatTypes.GET_USERS_SUCCESS:
     
      return {
        ...state,
        contacts: action.payload,
        loadingContacts: false,
      };
      
    // case ChatTypes.SET_USERS_DESTINY:
    //   return {
    //     ...state,
    //     destiny: action.payload
    //   };
    case ChatTypes.GET_CHAT_REQUEST:
      return {
        ...state
      };
    case ChatTypes.GET_CHAT_SUCCESS:
      return {
        ...state,
        messages: action.payload
      };
    case ChatTypes.POST_MESSAGE_REQUEST:
      return {
        ...state,
        sendingMsg: true
      };
    case ChatTypes.POST_MESSAGE_SUCCESS:
      return {
        ...state,
        sendingMsg: false
      }
    case ChatTypes.MARK_AS_READ_REQUEST:
      return {
        ...state
      };
    case ChatTypes.MARK_AS_READ_SUCCESS:
      return {
        ...state
      }
    case ChatTypes.CLEAR_STORE:
      return {
        ...state,
        contacts: [],
        destiny: undefined,
        messages: []
      }
    default:
      
      return state;
  }
}