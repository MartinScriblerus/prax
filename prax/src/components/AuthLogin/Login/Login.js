import React, { useState, useEffect } from 'react';
import '../authlogin.scss'
import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
import Welcome from '../../Layout/Welcome/Welcome'
import { loginUserRequest } from '../../../redux/auth/actions'
import Button from '@material-ui/core/Button';
import { StylesContext } from '@material-ui/styles';


const styles = {

    background: "url(http://davidhall.io/wp-content/uploads/2019/07/graphic-notation-John-Cage.jpg)",
}

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
        if(isAuth) history.push('/login')
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
        style={styles.background}
        >  
     
            <div 
            className="auth-container"
           
            >
          
    
               <h1 id="logTitle"
                    >  
                    Log In</h1>
                   
                <form 
                onSubmit={handleSubmit} 
                >
                <div id="logBorder">
                    <div id="logPos">
                   
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        className="input"
                        placeholder="Enter a Username here"
                        onChange={handleChange}
                        value={username}
                        style={{border: errors && errors.user ? '1px solid red': undefined}}
                    ></input>
                    {errors && errors.user && <span className="show-error">{errors.user}</span>}
            
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        className="input"
                        placeholder="Enter a Password here"
                        onChange={handleChange}
                        value={password}
                        style={{border: errors && errors.password ? '1px solid red': undefined}}
                    ></input>
                  </div>
                
                    {errors && errors.password && <span className="show-error">{errors.password}</span>}
                    <Button
                        className="submit-auth"
                        type="submit"
                        disabled={!username || !password ? true : false}
                    >Log In</Button>
                    </div>
                </form>
              
            </div>
        </Welcome>
    )
}
