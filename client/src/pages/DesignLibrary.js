import React, { useState, useEffect } from "react"
import { Link } from "@reach/router"
import axios from "axios"

const DesignLibrary = () => {
	const [designsData, setDesignsData] = useState([])
	const [isLoading, setIsLoading] = useState([])

	useEffect(() => {
		axios.get('http://localhost:3308/api/designs/')
			.then(function (response) {
				setDesignsData(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [])

	useEffect(() => {
		setIsLoading(false)
	}, [designsData])

	const mapDesignsData = designsData.map((design, i) => {
		const mapColors = design.colorsUsed.map((color, i) => {
			return	<div>
							<p>{color.colorName}</p>
							<div className="color-swatch" style={{backgroundColor: `${color.colorSwatch}`}}></div>
						</div>
		})

		return 	<div>
						<h2>{design.designName}</h2>
						{mapColors}
					</div>
	})

	return (
		<div className="design-library">
			<h1>DesignLibrary.js</h1>
			<Link to="/">HOME</Link>
			<section className="design-list-container">
				{
					isLoading === true && <h2>Loading, please wait...</h2>
				}
				{
					designsData.length !== 0 && (
						<div>
							{mapDesignsData}
						</div>
					)
				}
			</section>
		</div>
	)
}

export default DesignLibrary