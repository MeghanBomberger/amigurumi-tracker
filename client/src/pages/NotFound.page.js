import React from "react"
import "../styles/NotFound.scss"
import ControlPanel from "../component/ControlPanel.component.js"
import HomeIcon from "../images/svg/house.svg"

export default function NotFound () {
	const designControlPanelOptions = [
		{
			icon: HomeIcon,
			description: "Go Home",
			link: "/",
			action: null
		}
	]

	return (
		<div className="not-found">
			<ControlPanel
				options={designControlPanelOptions}
			/>
			<h1>404</h1>
			<h2>Page Not Found</h2>
		</div>
	)
}