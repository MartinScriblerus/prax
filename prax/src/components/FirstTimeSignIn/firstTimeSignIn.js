import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios';
import './firsttimesignin.scss'
import {
    BrowserRouter as Router,
    useHistory,
    Link
  } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            // backgroundImage: "url(https://www.getty.edu/art/exhibitions/cisneros/images/landing/4_Fiaminghi_Alternado2_x1024.jpg)",
      
            backgroundPosition: 'top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            overflow: 'auto',
        },
      a: {
            textAlign: 'center'
        }
    }));

    const styles = ({
        input: {
        //  marginLeft: '10vw',
         marginRight: '15vw',
        //  backgroundColor: "#212121",
        //  color: "#030303",
        //  marginTop: '10%'
        },
        signup: {
        marginTop: 0,
       
        },
     
        a: {
            width: 400,
            height: '60px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            marginTop: '4vh',
            borderStyle: "solid",
            borderColor: "#38A69B",
            color: '',
            borderWidth: 2,
            borderRadius: '5%',
            variant: "outlined",
            // justify: "right",
           
            // marginTop: '10vh'
        },
        card: {
        borderStyle: "solid",
        backgroundColor: "#333",
        borderWidth: 2,
        borderColor: "#50D4F2",
        borderRadius: '15px',
        variant: "outlined",
        marginRight: "12%",
        marginLeft: "12%",
        paddingRight: '5%',
        paddingLeft: '5%',
    
        paddingBottom: '20vh',
        marginBottom: '60vh',
        marginTop: '15vh',
        zIndex: 5
        }
    })

export default function FirstTimeLogin(newUser){
  
    const auth = useSelector(state => state.auth)
    console.log(auth.user.id)
    const classes = useStyles();
    const history = useHistory();
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ bandName, setBandName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ instrument, setInstrument ] = useState("");

   
    const handleSubmit = (evt) => {

        var user = {
            username: username, 
            email: email,
            firstName : firstName,
            lastName : lastName,
            bandName: bandName,
            password : password,
            instrument : instrument,
    }
    
       console.log(user);
       console.log(user.username);
       history.push("/");
      
    axios({
        method: 'post',
        url: 'http://localhost:8080/api/user',
        data: user
      })
    }

  return (
      <Router>
    <div className={classes.root}>
    
    <Card style={styles.card}>
    <h1 className='signupText'>Sign Up</h1>
    <form onSubmit={handleSubmit} noValidate autoComplete="off">  
        <TextField   
            className="inputPad"  
            type="username"
            variant="outlined"
            
            required
            fullWidth
            id="username"
            autoFocus
            value={username}
            onChange={e => 
                setUsername(e.target.value)
            }
            label="Choose a Username" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField  
         
            className="inputPad"
            type="password"
            variant="outlined"
           
            required
            fullWidth
            name="password"
            id="password"
            autoFocus
            value={password}
            onChange={e => 
            setPassword(e.target.value)
            }
            label="Choose a Password" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">  
    <TextField  
     
        className="inputPad"     
        type="text"
        variant="outlined"
        
        required
        fullWidth
        id="firstName"
        name="firstName"
        autoFocus
        value={firstName}
        onChange={e => 
            setFirstName(e.target.value)
        }
        label="Enter Your First Name" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField       
            className="inputPad"
           
            type="text"
            variant="outlined"
            
            required
            fullWidth
            name="lastName"
            id="lastName"
            autoFocus
            value={lastName}
            onChange={e => 
            setLastName(e.target.value)
            }
            label="Enter Your Last Name" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField       
            
            className="inputPad"
            type="email"
            variant="outlined"
            
            required
            fullWidth
            id="email"
            name="email"
            autoFocus
            value={email}
            onChange={e => 
            setEmail(e.target.value)
            }
            label="Enter your Email" 
        />
    </form>
  
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField       
            className="inputPad"
           
            type="text"
            variant="outlined"
         
            required
            fullWidth
            name="bandName"
            id="bandName"
            autoFocus
            value={bandName}
            onChange={e => 
            setBandName(e.target.value)
            }
            label="Group Affiliation" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField       
            className="inputPad"
      
            type="text"
            variant="outlined"
        
            required
            fullWidth
            name="instrument"
            id="instrument"
            autoFocus
            value={instrument}
            onChange={e => 
            setInstrument(e.target.value)
            }
            label="Your Primary Instrument" 
        />
    </form>
<Button id="firstSub">
         
            <Link 
                to="/" 
                className="firstTimeSubmit"
                onClick={() => 
                handleSubmit()
            }
                // style={{ textDecoration: 'none' }} 
            >
            Start Playing
            </Link>
        
            </Button>
          
                
        </Card>
    </div>
</Router>
)}