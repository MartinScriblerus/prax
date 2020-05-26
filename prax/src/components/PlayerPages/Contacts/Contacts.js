import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import "./contacts.scss";
// import { calculateDate } from "../../utils";

import { getUsersRequest } from '../../../redux/chat/actions'

export const Contacts = (props) => {
  const { id: idUserLogged, contacts } = props;
    console.log(idUserLogged)
    const dispatch = useDispatch()
   
    useEffect(() => {
      dispatch(getUsersRequest());
    }, []);



if (!Array.isArray(contacts)) { console.log('results are not array' ) }   
if (contacts !== undefined || null){
      console.log(contacts)
  return <h1>{props.idUserLogged}</h1>}
  else {
  return (
      <div className="contacts-container" />
    );
  }}
 