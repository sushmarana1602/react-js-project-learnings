import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as requestAssets from "../../utils/request";
import './AuthPage.css'
const Login = () => {
    const [errorsList, setErrorsList] = useState(null);
    const inputEmailRef = useRef(null);
    const inputPasswordRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
       console.log({errorsList});
    }, [errorsList])
    function submitHandler (event)
    {
        event.preventDefault();
        const inputFieldsObj = {
            email : inputEmailRef.current.value,
            password: inputPasswordRef.current.value
        }
       

        requestAssets.api('auth/login', inputFieldsObj).then((res) => {
            if (res) {
           if (res.status == 422) {
            console.log(res.data.errors);
            setErrorsList(res.data.errors);
           }
          if (res.status == 400) {
            console.log("ress", res);
            let resError = {
                message : res.data.message
            };
            setErrorsList(resError);
            console.log(errorsList);
          }
          if (res.status == 200) {
            navigate('/dashboard');
          }
        } else {
            const resError = {
                message : "error"
            };
            setErrorsList(resError);
        }
    
    }); 
    }
    return (
        <div className='authpage'>
            <div className='authcont'>
                <form className='authform' onSubmit={submitHandler}>
                    <h1>Login</h1>
                   {
                    errorsList && errorsList.message && <span className="error">{errorsList.message}</span>
                   }
                    <div className='formgroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name="email" ref={inputEmailRef} />
                        {
                            errorsList && errorsList.email && <span className="error">{errorsList.email[0]}</span>
                        }
                        
                    </div>

                    <div className='formgroup'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name="password" ref={inputPasswordRef}/>
                        {
                            errorsList && errorsList.password && <span className="error">{errorsList.password[0]}</span>
                        }
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
