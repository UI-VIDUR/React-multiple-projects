import React, { useState } from "react";
import { validate_email, validate_phone, validate_age } from "../utils/helper";

const UserInfoForm = () => {
    
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		email: "",
		age: "",
		job: "",
		bio: "",
	});

    // const [users, setUsers] = useState([]);

    const [error, setError] = useState(false);
    const fieldErrors = {};

    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate_error = () => {
        
        // validate name
        if(formData.name === ""){
            fieldErrors.name = 'Name field is required';
        }

        // validate phone
        if(formData.phone === ""){
            fieldErrors.phone = 'phone field is required';
        }else{
            const phone_valid = validate_phone(formData.phone);
            if(!phone_valid.isValidPhoneNumber){
                fieldErrors.phone = phone_valid.fieldError;
            }
        }

        // validate email
        if(formData.email === ""){
            fieldErrors.email = 'Email field is required';
        }else{
            const email_valid = validate_email(formData.email);
            if(!email_valid.isValidEmail){
                fieldErrors.email = email_valid.fieldError;
            }
        }

        // validate age
        if(formData.age === ""){
            fieldErrors.age = 'Age field is required';
        }else{
            const age_valid = validate_age(formData.age);
            if(!age_valid.isValidAge){
                fieldErrors.age = age_valid.fieldError;
            }
        }

        // validate job
        if(formData.job === ""){
            fieldErrors.job = 'Please select your job';
        }

        // validate bio
        if(formData.bio === ""){
            fieldErrors.bio = 'Please tell us something about yourself';
        }

        setError(fieldErrors);
    }

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();

        validate_error();

         // Check if there are any validation errors
        if (Object.values(fieldErrors).some((error) => error !== null)) {
            return; // Exit early if there are errors
        }

        try {
            const response = await fetch('http://localhost:3004/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if(response.ok){
                console.log('form successfully submitted');
                setIsSubmitted(true)
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    age: "",
                    job: "",
                    bio: "",
                });
            }else{
                validate_error();
                setIsSubmitted(false)
            }

        } catch (error) {
            console.log(error.message)
        }
	};

	const showError = (fieldName) => {
        if(error[fieldName]){
            return <p>{error[fieldName]}</p>
        }
        return null;
	};

    // const getUsers = async () => {
    //     try {
    //         const data = await fetch('http://localhost:3004/users');
    //         const userList = await data.json() ;
    //         setUsers(userList);
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // };

    // useEffect(() => {
    //     getUsers();
    // },[])

	return (
        <>
            <form onSubmit={handleOnSubmit}>
                <div className="field-group">
                    <label htmlFor="name">Enter your name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleOnChange}
                    />
                    {showError('name')}
                </div>
                <div className="field-group">
                    <label htmlFor="phone">Enter your phone number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleOnChange}
                    />
                    {showError('phone')}
                </div>
                <div className="field-group">
                    <label htmlFor="email">Enter your email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleOnChange}
                    />
                    {showError('email')}
                </div>
                <div className="field-group">
                    <label htmlFor="age">Enter your age</label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleOnChange}
                    />
                    {showError('age')}
                </div>
                <div className="field-group">
                    <label htmlFor="job-profile">Select your job profile</label>
                    <select
                        name="job"
                        id="job-profile"
                        value={formData.job}
                        onChange={handleOnChange}
                    >
                        <option value="">Select your job profile</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Tester">Tester</option>
                        <option value="Project Manager">Project Manager</option>
                    </select>
                    {showError('job')}
                </div>
                <div className="field-group">
                    <label htmlFor="bio">Tell us something about yourself</label>
                    <textarea
                        name="bio"
                        id="bio"
                        cols="30"
                        rows="10"
                        value={formData.bio}
                        onChange={handleOnChange}
                    ></textarea>
                    {showError('bio')}
                </div>
                <button type="submit">Submit</button>
            </form>
            {isSubmitted ? <h1>You have successfully signed up!!</h1> : ''}
        </>
	);
};

export default UserInfoForm;
