import React from "react"
import "../styles/DesignCard.scss"
import YarnSwatch from "./YarnSwatch.component"
import CheckMark from "../images/svg/rounded-check-mark-.svg"
import MenuDotsFilled from "../images/svg/menu-filled.svg"
import MenuDotsEmpty from "../images/svg/menu.svg"


export default function DesignCard (props) {
	const [expanded, setExpanded] = React.useState(false)
	const [checked, setChecked] = React.useState(false)
	const fandoms = props.fandoms
	const colors = props.colors

	const handleCheckBox = () => {
		setChecked(!checked)
	}

	const handleExpand = () => {
		setExpanded(!expanded)
	}

	const mapFandoms = fandoms.map(fandom => {
		if (fandom === props.fandoms[0]) {
			return `${fandom}`
		} else {
			return `, ${fandom}`
		}
	})

	const mapYarn = colors.map(color => {
		console.log(color)
		return 	<YarnSwatch
							colorSwatch={color.colorSwatch}
							colorName={color.colorName}
							brandName={color.brandName}
						/>
	})

	return (
		<div className="design-card">
			<div className="design-card-header">
				<div className="check-box" onClick={() => handleCheckBox()}>
					{checked === true && (
						<img
							alt="check mark"
							className="check-mark"
							src={CheckMark}
						/>
					)}
				</div>
				<h1>{props.designName}</h1>
				{
					expanded === true
						?	<img
								alt="open menu dots"
								className="menu-dots"
								src={MenuDotsEmpty}
								onClick={() => handleExpand()}
							/>
						:	<img
								alt="closed menu dots"
								className="menu-dots"
								src={MenuDotsFilled}
								onClick={() => handleExpand()}
							/>
				}
			</div>
			{
				expanded === true && (
					<div className="design-card-body">
						<p>({mapFandoms})</p>
						<div className="yarn-swatch-list-container">
							{mapYarn}
						</div>
					</div>
				)
			}
		</div>
	)
}