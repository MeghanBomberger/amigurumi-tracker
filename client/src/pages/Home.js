import React from "react"
import { Link } from "@reach/router"

const Home = () => {
	return (
		<div className="home">
			<h1>Home.js</h1>
			<Link to="/designs">Design Library</Link>
		</div>
	)
}

export default Home