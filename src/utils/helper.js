// Validate phone number
export const validate_phone = (phone) => {
    const phoneNumberPattern = /^(?:\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;

    if(phoneNumberPattern.test(phone)){
        return {
            isValidPhoneNumber: true
        };
    }else{
        return {
            isValidPhoneNumber: false,
            fieldError: 'phone no isinvalid'
        }
    }
};

// Validate email address
export const validate_email = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(emailPattern.test(email)){
        return {
            isValidEmail: true
        };
    }else{
        console.log(email)
        return{
            isValidEmail: false,
            fieldError: 'Email is invalid'
        }
    }
};

// Validate age
export const validate_age = (age) => {
    // Regular expression to match only numbers
    const numberPattern = /^[0-9]+$/;

    if(numberPattern.test(age)){
        return {
            isValidAge: true
        } 
    }else{
        return{
            isValidAge: false,
            fieldError: 'Age is invalid'
        }
    }
};