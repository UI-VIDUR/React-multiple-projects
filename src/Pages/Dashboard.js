import React,  {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    
    const navigate = useNavigate();
	const [authenticated, setauthenticated] = useState(null);
	useEffect(() => {
		const loggedInUser = localStorage.getItem("authenticated");
		if (loggedInUser) {
			setauthenticated(loggedInUser);
		}
	}, []);

    if(!authenticated){
        return navigate('/');
    }else{
        return <div>Dashboard</div>;
    }
};

export default Dashboard;
