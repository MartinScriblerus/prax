import React from 'react';
import axios from 'axios';
import "./inputmessage.scss";


import {
  // Switch,
  // Route,
  Link
} from "react-router-dom";
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'

import setAuthToken from "../../../services/setAuthToken";
// import CreatePraxSpace from '../CreatePraxSpace/CreatePraxSpace';

import {socket} from '../../../services/socketIO' 


const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

const styles = {
  button: {
    // backgroundColor: "#030303",
    color: "#f6deba",
    height:60,
    fontSize: '22px',
    width: "76%",
    marginRight: "2%",
    marginLeft: "2%",
    border: "solid",
    borderWidth: 2,

    marginBottom: 30,
    // marginTop:20,
  },
  openRoomGrid: {
    margin:4
  },
  roomNameCard: {
    backgroundColor: "#212121",
    // color: "#dadcd7",
    width: "100%",
    justifyContent: 'center',
  },
  openRoomsCard: {
    textAlign: 'center',
    marginRight: '15%',
    marginLeft: '15%',
    backgroundColor: "#212121",
    color: "#030303",
  },

  openRoomsDescription: {
    justifyContent: 'center',
    zIndex: 3
  },

h3: {
  // color: "#5e5d5d",

  fontSize: 28,
},
textarea2: {
  color: "#f6deba"
}
}


// let dynamicList=[]

var userID
let username;
var messages;
var instrument;
let roomOption = [] 


export default class DynamButtons extends React.Component {

  constructor(props){
    super(props);
    console.log(props)
    this.state = { 
      dynamicList: [],
      dynamicListDescription: [],
      rooms : [],
      username : '',
    };
  
    
    // console.log(props.idUserLogged)
   
    username = props.username;
    instrument = props.instrument;
  
    
   
    this.addListItem = this.addListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    // this.addListItemDescription = this.addListItemDescription.bind(this);
    // this.removeListItemDescription = this.removeListItem.bind(this);
    }
    
    componentDidMount(){
      const {rooms} = this.state
      console.log(this.props)

      axios.get('http://localhost:5001/api/message')
                .then(res => {
                    const rooms = res.data;
                    this.setState({rooms});
                    return rooms
                });
                console.log(rooms)
  
                socket.on("roomOption_Joined", roomOptionFunct)
                function roomOptionFunct(itemToAdd){
                  console.log("ROOM OPTION (ITEM TO ADD): ", itemToAdd);
                }
    
    }
    
  
    addListItem(itemToAdd){
    let currentList = this.state.dynamicList;
    // let msg = response.messages;

      console.log(currentList); 
      console.log(this.props);
      currentList.push(itemToAdd);
      
      this.setState({dynamicList : currentList});
      console.log(this.state.dynamicList)
      let dynamicList = this.state.dynamicList
      console.log(dynamicList)
      let origin = this.props.idUserLogged;
      
      var message = {
       content: itemToAdd, 
        origin: origin,
        username: this.props.username
      }


      // socket.emit('username', {username: username})
      // socket.emit('userID', {userID: origin})
      socket.emit('joinRoom', itemToAdd)   

      // socket.on("username_Joined", usernameFunct)
      // function usernameFunct(username){
      //   console.log("USERNAME joined: ", username);
      //   return username;
      //   }
      // socket.on("userID_Joined", userIDFunct)
      // function userIDFunct(userID){
      //   console.log("USERID joined: ", userID);
      //   }



      axios({
          method: 'post',
          url: 'http://localhost:5001/api/message',
          data: message
        })
    
 
        
        username = this.props.username;
        origin = this.props.idUserLogged  
    }
 

  removeListItem(itemToRemove){
      let currentList = this.state.dynamicList;
      currentList.splice(itemToRemove, 1);
      this.setState({dynamicList : currentList});
      // this.props.history.push("praxspace/" + username + "/" + currentList);
    }

  handleSend = response => {
      this.props.getUsersRequest(response)
      console.log(this.props)
      console.log(response)
    }


  render(){
//   let g = JSON.stringify(this.state.rooms.messages)

// console.log(g);

    let roomOption = this.state.rooms.messages;
    username = this.state.username;

let redsox; 
let baseball;   
// console.log(roomOption)  
if(roomOption !== undefined || null){
redsox = roomOption.map(room=>room.content)
}
if (redsox !== undefined || null){
baseball = redsox.map(
  yankees=>yankees)
}
// console.log(baseball);
// console.log(username);
    return(
      <> 
    
      <div className="component-wrapper">
      <h1 style={styles.roomNameCard}>Create a Room</h1>
          <Card className="roomNameCard" style={styles.roomNameCard}> 
          
              <InputBoxDescription  addItem={this.addListItem} addItemDescription={this.addListItemDescription} style={styles.textarea2} /><br/>
          </Card>    
      </div>
    <div>  
 
     
    <Card style={styles.openRoomsCard}> 
        <h3 style={styles.roomNameCard} >Open Rooms</h3>
 
      
    {/*tk*/}    
     
        <DynamicList className="openRoomsTitle" listItems={this.state.dynamicList} removeItem={this.removeListItem} />
        {
          (baseball !== undefined || null)
          ? <DynamicList className="openRoomsTitle" listItems={baseball} removeItem={this.removeListItem} />
        : null
      }
    
         
          </Card>
     
     </div>
      </>
    );
  }
}


console.log(messages);
console.log(instrument);
console.log(userID);

let count = 0


export class DynamicList extends React.Component {


  render(){
   console.log()
    return (
      <>
        {  
          Object.keys(this.props.listItems).map( (index) => {
         
            
            return (
              <Link 
              // to={"praxspace/" + username + "/" + this.props.listItems[index]} 
              key={index}
              to={this.props.listItems[index]}
              onClick={(e)=>{
                e.preventDefault()
                window.open(this.props.listItems[index])
              }}
            > 
              <span 
                className="joinRoomButton" 
                // to={window.open("praxspace/" + this.props.listItems[index])}
                // onClick={
                //  window.open("praxspace/" + username + "/" + this.props.listItems[index]) 
                // }
                key={index}
                count={count++}
              >
                    <Button className="openRoomsTitle"  >
                    {this.props.listItems[index]}
                    </Button>
                </span>
              </Link>
            );
          })
        }
     <br/>

      </>
      );
  }
}



// export class DynamicListDescription extends React.Component {
 
//   render(){
//     return (
//       <>
//       <ul>
//         {
//           Object.keys(this.props.listItemsDescription).map( (indexDescription) => {
//             return (
//               <li style={styles.openRoomsDescription} 
//               onClick={ () => this.props.removeItemDescription(indexDescription) } 
//               key={indexDescription}>{this.props.listItemsDescription[indexDescription]}</li>
//             );
//           })
//         }
//       </ul>
//       </>
//     );
//   }
// }


export class InputBoxDescription extends React.Component {
  formSubmit2(e){
  e.preventDefault();  
    
    let itemToAdd = this.refs.item.value;
    if(itemToAdd !== ''){
      this.props.addItem(itemToAdd);
      this.refs.item.value = '';
      }
    }

  render(){
    return (
 
      <form ref="itemForm" onSubmit={e => this.formSubmit2(e)}>  
       
        <input className="inputCreateRoom" type="text" id="item" ref="item" placeholder="Name your Room"/>

        <Button type="submit" style={styles.button} className="buttonJoin btn btn-primary roomDefineButton"
        > Open Room
        </Button>
      </form>

      );
    }
  }