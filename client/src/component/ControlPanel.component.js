import React from "react"
import { Link } from "@reach/router"
import "../styles/ControlPanel.scss"

function ControlPanel (props) {
	const [isControlPanelOpen, setIsControlPanelOpen] = React.useState(false)

	const mapOptions = props.options.map(option => {
		if (option.action === null) {
			return (
				<Link to={option.link}>
					<img
						alt={option.description}
						className="control-panel-icon"
						src={option.icon}
					/>
				</Link>
			)
		} else if (option.action !== null) {
			return 	<img
								alt={option.description}
								className="control-panel-icon"
								onClick={option.action}
								src={option.icon}
							/>
		}
	})

	return (
		<nav className="control-panel-container">
			<div className="control-panel-options-container">
				{mapOptions}
			</div>
			<div className="menu-button-container" onClick={() => setIsControlPanelOpen(!isControlPanelOpen)}>
				<div className={isControlPanelOpen === false ? "menu-button-bar one" : "menu-button-bar open one"}></div>
				<div className={isControlPanelOpen === false ? "menu-button-bar two" : "menu-button-bar open two"}></div>
				<div className={isControlPanelOpen === false ? "menu-button-bar three" : "menu-button-bar open three"}></div>
			</div>
		</nav>
	)
}

export default ControlPanel