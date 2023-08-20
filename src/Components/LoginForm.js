import React, { useState } from "react";
import { validate_email, validate_phone } from "../utils/helper";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const navigate = useNavigate();
	
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [error, setError] = useState(false);

    const [exists, setExists] = useState(false);

    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));

    let fieldErrors = {}

    const validateLogin = () => {
        if(email === ""){
            fieldErrors.email = 'Email field is required';
        }else{
            const validEmail = validate_email(email);
            if(!validEmail.isValidEmail){
                fieldErrors.email = validEmail.fieldError;
            }
        }
        if(phone === ""){
            fieldErrors.phone = 'Phone field is required';
        }else{
            const validPhone = validate_phone(phone);
            if(!validPhone.isValidPhoneNumber){
                fieldErrors.phone = validPhone.fieldError;
            }
        }
        setError(fieldErrors)
    }

    const checkUser = async (email, phone) => {
        try {
            const response = await fetch(`http://localhost:3004/users?email=${email}&phone=${phone}`);
            const data = await response.json();
            const userExists = data.some(user => user.email === email || user.phone === phone);
            setExists(userExists);
            setauthenticated(true)
            localStorage.setItem("authenticated", true);
            console.log(userExists)
            return exists;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        validateLogin();

        try {
            checkUser(email, phone)
            .then((exists) => {
                if(exists){
                    if(authenticated){
                        navigate('/dashboard');     
                    }
                }else{
                    console.log('user does not exists');
                }
            })
        } catch (error) {
            console.log(error.message);
        }

    }

    const showError = (fieldName) => {
        if(error[fieldName]){
            return <p>{error[fieldName]}</p>
        }
        return null;
	};

    return (
        <>
            <form onSubmit={handleLogin}>
                <div className="field-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email-login" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {showError('email')}
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" name="phone-login" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    {showError('phone')}
                </div>
                <button type="submit">Login</button>
            </form>
            {exists && <p>logged in</p>}
        </>
	);
};

export default LoginForm;
