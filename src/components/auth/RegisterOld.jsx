import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as requestAssets from "../../utils/request";
import './AuthPage.css'
const Register = () => {
    const [errorsList, setErrorsList] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [processForm, setProcessForm] = useState(false);
    const inputEmailRef = useRef(null);
    const inputPasswordRef = useRef(null);
    const inputFirstNameRef = useRef(null);
    const inputLastNameRef = useRef(null);
    const inputConfirmPasswordRef = useRef(null);
    const inputTermsRef = useRef(null);
    
    useEffect(() => {
       console.log({errorsList});
    }, [errorsList])
    function submitHandler (event)
    {
        event.preventDefault();
        setProcessForm(true);
        const inputFieldsObj = {
            email : inputEmailRef.current.value,
            password: inputPasswordRef.current.value,
            first_name: inputFirstNameRef.current.value,
            last_name: inputLastNameRef.current.value,
            password_confirmation: inputConfirmPasswordRef.current.value,
            terms: inputTermsRef.current.checked === true ? 'yes' : ''
        }
        requestAssets.api('auth/register', inputFieldsObj).then((res) => {
            setProcessForm(false);
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
            setErrorsList(null);
            inputEmailRef.current.value = null;
            inputPasswordRef.current.value = null;
            inputConfirmPasswordRef.current.value = null;
            inputTermsRef.current.value = null;
            inputFirstNameRef.current.value = null;
            inputLastNameRef.current.value = null;
            setSuccessMsg(res.data.message);
          }
        });
        
    }
    return (
        <div className='authpage'>
            <div className='authcont'>
                <form className='authform' onSubmit={submitHandler}>
                    <h1>Register</h1>
                   {
                    errorsList && errorsList.message && <span className="error">{errorsList.message}</span>
                   }
                    {
                    successMsg && <span className="success">{successMsg}</span>
                   }
                    <div className='formgroup'>
                        <label htmlFor='first_name'>First Name</label>
                        <input type='text' id='first_name' name="first_name" ref={inputFirstNameRef} />
                        {
                            errorsList && errorsList.first_name && <span className="error">{errorsList.first_name[0]}</span>
                        }
                        
                    </div>
                    <div className='formgroup'>
                        <label htmlFor='last_name'>Last Name</label>
                        <input type='text' id='last_name' name="last_name" ref={inputLastNameRef} />
                        {
                            errorsList && errorsList.last_name && <span className="error">{errorsList.last_name[0]}</span>
                        }
                        
                    </div>
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
                    <div className='formgroup'>
                        <label htmlFor='confrm_password'>Password</label>
                        <input type='password' id='confirm_password' name="confirm_password" ref={inputConfirmPasswordRef}/>
                    </div>
                    <div className='formgroup'>
                        <input type='checkbox' name="terms" ref={inputTermsRef}/> I agree with terms & conditions 
                        {
                            errorsList && errorsList.terms && <span className="error">{errorsList.terms[0]}</span>
                        }
                    </div>
                    <button type="submit" disabled={processForm}>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register
