import React from "react"
import { Router } from "@reach/router"
import "./styles/App.scss"
import Home from "./pages/Home.js"
import DesignLibrary from "./pages/DesignLibrary.js"

const App = () => {
	return (
		<div className="app">
			<Router>
				<Home path="/" />
				<DesignLibrary path="/designs" />
			</Router>
		</div>
	)
}

export default App