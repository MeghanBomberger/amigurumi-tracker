import React from "react"
import { Router } from "@reach/router"
import "./styles/App.scss"
import NotFound from "./pages/NotFound.page.js"
import Home from "./pages/Home.page.js"
import DesignLibrary from "./pages/DesignLibrary.page.js"
import YarnMaker from "./pages/YarnMaker.page.js"

export default function App () {
	return (
		<div className="app">
			<Router>
				<NotFound path="*"/>
				<Home path="/"/>
				<DesignLibrary path="/designs"/>
				<YarnMaker path="/yarns"/>
			</Router>
		</div>
	)
}