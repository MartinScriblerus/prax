import React, { useState, useEffect } from 'react';
// import '../Register/auth.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Welcome from '../../Layout/Welcome/Welcome'
import { loginUserRequest } from '../../../redux/auth/actions'
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import Initialize from '../components/(commented_out)initialize';
// import Register from '../components/registerComponent'
// import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';

// import { makeStyles } from '@material-ui/core/styles';


const styles = ({



    button: {
        width: 340,
        height: 50,
        color: "#aaf0d1",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "030303",
        variant: "outlined",
        // justify: "right",
        margin: 10,
        marginTop: 10
    },
    card: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "030303",
    variant: "outlined",
    padding: 30,
    marginRight: 80,
    marginLeft: 80,
    marginTop: 10 
    }
})

export default function Login (props){
    const auth = useSelector(state=> state.auth)
    const dispatch = useDispatch()

    const { isAuth, errors } = auth
    const { history } = props

    const [loginForm, setloginForm] = useState({
        username: '',
        password: ''
    })

    const {username, password} = loginForm

    useEffect(()=>{
        if(isAuth) history.push('/')
    }, [isAuth, history])

    const handleChange = (e) =>{
        const {name, value} = e.target
        setloginForm({
            ...loginForm,
            [name]: value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const dataLogin  = {
            username,
            password
        }
        dispatch(loginUserRequest(dataLogin))
    }

    return ( 
        <Welcome 
        >
            <div 
            className="auth-container"
           
            >
                <form 
                onSubmit={handleSubmit} 
                
                >
                    <Typography 
                    variant="h4"
                    
                    >Log In</Typography>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        value={username}
                        style={{border: errors && errors.user ? '1px solid red': undefined}}
                    ></input>
                    {errors && errors.user && <span className="show-error">{errors.user}</span>}
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={password}
                        style={{border: errors && errors.password ? '1px solid red': undefined}}
                    ></input>
                    {errors && errors.password && <span className="show-error">{errors.password}</span>}
                    <Button
                        className="submit-auth"
                       style={styles.button}
                        type="submit"
                        disabled={!username || !password ? true : false}
                    >Log In</Button>
                </form>
                <div className="question-form">
                    <p>Don't have an account? <Link to='/register' className="blue-link">Register</Link></p>
                </div>
            </div>
        </Welcome>
    )
}
