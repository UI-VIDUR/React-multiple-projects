import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";

const Navigation = () => {
	
    const navigate = useNavigate()
    const [authenticated, setIsAuthenticated] = useState(null);

    const handleLogout = () => {
        if(authenticated){
            setIsAuthenticated(!authenticated)
            localStorage.setItem('authenticated', '')
        }else{
            navigate('/')
        }
        console.log(authenticated)
    }
    
    useEffect(() => {
        let loggedInUser = localStorage.getItem('authenticated');
        setIsAuthenticated(loggedInUser)
    }, [])

    return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/dashboard">Dashboard</Link>
				</li>
                {authenticated ? <li><button onClick={handleLogout}>Logout</button></li> : ''}
			</ul>
		</nav>
	);
};

export default Navigation;
