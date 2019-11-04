import React from "react"
import { Link } from "@reach/router"
import "../styles/Home.scss"
import DollIcon from "../images/svg/001-doll.svg"
import PackageIcon from "../images/svg/002-package.svg"
import RetailIcon from "../images/svg/003-retail.svg"
import FandomIcon from "../images/svg/fandoms.svg"
import YarnBallsIcon from "../images/svg/yarns.svg"
import BagIcon from "../images/svg/briefcase.svg"

const Home = () => {
	return (
		<div className="home">
			<Link to="/designs">
				<img alt="doll icon" className="nav-icon" src={DollIcon}/>
			</Link>
			<Link to="/bag">
				<img alt="bag icon" className="nav-icon" src={BagIcon} />
			</Link>
			<Link to="/stocklists">
				<img alt="package icon" className="nav-icon" src={PackageIcon}/>
			</Link>
			<Link to="/commissions">
				<img alt="purchase icon" className="nav-icon" src={RetailIcon}/>
			</Link>
			<Link to="/fandoms">
				<img alt="fandom icon" className="nav-icon" src={FandomIcon}/>
			</Link>
			<Link to="/yarns">
				<img alt="yarns icon" className="nav-icon" src={YarnBallsIcon}/>
			</Link>
		</div>
	)
}

export default Home