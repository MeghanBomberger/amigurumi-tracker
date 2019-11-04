import React from "react"
import "../styles/YarnSwatch.scss"
import Yarn from "../component/Yarn.component.js"

const YarnSwatch = (props) => {
	const [swatchIsOpen, setSwatchIsOpen] = React.useState(false)

		return <div className={
							swatchIsOpen === true
								? "yarn-color-swatch"
								: "yarn-color-swatch closed"
						}>
						<Yarn 
							colorSwatch={ props.colorSwatch } 
							onClick={() => setSwatchIsOpen(!swatchIsOpen)}
						/>
						<div className="yarn-color-swatch-name"
						>
						<p>{props.colorName} ({props.brandName})</p>
					</div>
			</div>
}

export default YarnSwatch