import React from 'react';
import "./inputmessage.scss";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'

import setAuthToken from "../../../services/setAuthToken";
import CreatePraxSpace from '../CreatePraxSpace/CreatePraxSpace';


const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

const styles = {
  button: {
    // backgroundColor: "#030303",
    color: "#dadcd7",
    height:40,
    width: "85%",
    marginRight: "7.5%",
    marginLeft: "7.5%",
    border: "solid",
    borderWidth: 2,
    borderColor: "#4797DE",
    marginBottom: 30,
    marginTop:20
  },
  openRoomGrid: {
margin:4
  },
  roomNameCard: {
    backgroundColor: "#212121",
    color: "#dadcd7",
    width: "100%",
      border: "solid",
    borderWidth: 2,
    borderColor: "#85b1d7",
 
  },
  openRoomsCard: {
  
    backgroundColor: "#272727",
    color: "#dadcd7",
  },
  openRoomsTitle: {
    backgroundColor: "#212121",
    color: "#dadcd7",
    zIndex: 3,
    width: "100%",
    height: 60,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#24a7a8",

  },
  openRoomsDescription: {
    backgroundColor: "#85b1d7",
    zIndex: 3
  },
  input: {
    width: "85%",
    marginRight: "7.5%",
    marginLeft: "7.5%",
    marginTop: 5,
    height: 40,
    backgroundColor: "#dadcd7",
    fontSize: 18 
  },

  // dynamic1 : {
  //   backgroundColor: "pink"
  // },
h1: {
  backgroundColor: "#85b1d7",
  color: "#212121"
},

h3: {
  color: "#5e5d5d",
  paddingTop: 5,
  marginLeft: "5%"
},
textarea2: {
  color: "#dadcd7"
}
}


// let dynamicList=[]

var userID
var username;
var messages;
var instrument;



export default class DynamButton extends React.Component {

  constructor(props){
    super(props);

    this.state = { 
      dynamicList: [],
      dynamicListDescription: []
    };
  
    console.log(props)
    // console.log(props.idUserLogged)
    userID = props.idUserLogged;
    username = props.username;
    instrument = props.instruments

    this.addListItem = this.addListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    this.addListItemDescription = this.addListItemDescription.bind(this);
    this.removeListItemDescription = this.removeListItem.bind(this);
    }

  addListItem(itemToAdd){
      let currentList = this.state.dynamicList;
    
      currentList.push(itemToAdd);
      this.setState({dynamicList : currentList});
      console.log(this.state.dynamicList)

      let dynamicList = this.state.dynamicList
      console.log(dynamicList)
    }

  addListItemDescription(itemToAddDescription){
      let currentListDescription = this.state.dynamicListDescription;
      currentListDescription.push(itemToAddDescription);
      // THIS WORKS ---> currentListDescription
      // console.log(currentListDescription)
      // socket.emit("toInputMessageDescription", currentListDescription)
  
      this.setState({dynamicListDescription : currentListDescription});
      console.log(this.state.dynamicListDescription);
  // THIS WORKS ---> this.state.dynamicListDescription
      let dynamicListDescription  = this.state.dynamicListDescription
      console.log(dynamicListDescription)
    }
  removeListItem(itemToRemove){
      let currentList = this.state.dynamicList;
      currentList.splice(itemToRemove, 1);
      this.setState({dynamicList : currentList});
      // this.props.history.push("praxspace/" + username + "/" + currentList);
    }
  removeListItemDescription(itemToRemoveDescription){
      let currentListDescription = this.state.dynamicListDescription;
      currentListDescription.splice(itemToRemoveDescription, 1);
      this.setState({dynamicListDescription : currentListDescription});
    }
  handleSend = response => {
      this.props.getUsersRequest(response)
      console.log(this.props)
      console.log(response)
    }
 
  render(){
    return(
      <> 
      <div className="component-wrapper">
     
          <Card className="roomCard" style={styles.roomNameCard}> 
            <h1 style={styles.h1}>Create a Room</h1>
              <InputBoxDescription  addItem={this.addListItem} addItemDescription={this.addListItemDescription} style={styles.textarea2} /><br/>
          </Card>
       
    
      </div>
      <div>  
    
        <Card style={styles.openRoomsCard}> 
        <h3>Open Rooms</h3>
   
    {/*tk*/}    
      <DynamicList style={styles.openRoomsTitle} listItems={this.state.dynamicList} removeItem={this.removeListItem} />
  
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

    return (
      <>
        {  
          Object.keys(this.props.listItems).map( (index) => {
            
            return (
              <Link 
              // to={"praxspace/" + username + "/" + this.props.listItems[index]} 
              key={index}
              to={"praxspace/" + username + "/" + this.props.listItems[index]}
              onClick={(e)=>{
                e.preventDefault()
                window.open("praxspace/" + username + "/" + this.props.listItems[index])}}
            > 
              <li 
                className="joinRoomButton" 
                to={window.open("praxspace/" + username + "/" + this.props.listItems[index])}
                // onClick={
                //  window.open("praxspace/" + username + "/" + this.props.listItems[index]) 
                // }
                key={index}
                count={count++}
              >
                <Button style={styles.openRoomsTitle}  >
                    {this.props.listItems[index]}
                    </Button>
                </li>
              </Link>
            );
          })
        }
     <br/>
      <Switch>            
        <Route exact path="/praxspace/:username/:message" component={CreatePraxSpace}/> 
      </Switch>
      </>
      );
  }
}

export class DynamicListDescription extends React.Component {
 
  render(){
    return (
      <>
      <ul>
        {
          Object.keys(this.props.listItemsDescription).map( (indexDescription) => {
            return (
              <li style={styles.openRoomsDescription} 
              onClick={ () => this.props.removeItemDescription(indexDescription) } 
              key={indexDescription}>{this.props.listItemsDescription[indexDescription]}</li>
            );
          })
        }
      </ul>
      </>
    );
  }
}


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
        <input style={styles.input} type="text" id="item" ref="item" placeholder="Give your prax-space a name"/>

        <Button  style={styles.button} type="submit" className="btn btn-primary roomDefineButton"
        > Join the Room
        </Button>
      </form>
      );
    }
  }