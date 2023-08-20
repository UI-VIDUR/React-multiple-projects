import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
import Navigation from "./Components/Navigation";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				<Navigation />
				<AppRoutes />
			</div>
		</Router>
	);
}

export default App;
