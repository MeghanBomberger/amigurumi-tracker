import React, { useState, useEffect } from "react"
import axios from "axios"
import "../styles/DesignsLibrary.scss"
import ControlPanel from "../component/ControlPanel.component.js"
import DesignCard from "../component/DesignCard.component"
import FilterIcon from "../images/svg/funnel.svg"
import HomeIcon from "../images/svg/house.svg"

const DesignLibrary = () => {
	const [designsData, setDesignsData] = useState([])
	const [isLoading, setIsLoading] = useState([])
	const [openNavIcons, setOpenNavIcons] = useState(false)
	const [filterOpen, setFilterOpen] = useState(false)

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

	const designControlPanelOptions = [
		{
			icon: HomeIcon,
			description: "Go Home",
			link: "/",
			action: null
		},{
			icon: FilterIcon,
			description: "filter",
			link: null,
			action: () => setFilterOpen(!filterOpen)
		}
	]

	const mapDesignCards = designsData.map(design => {
		// console.log(design)
		return 	<DesignCard
							designName={design.designName}
							fandoms={design.fandoms}
							colors={design.colorsUsed}
						/>
	})

	return (
		<div className="page-container designs">
			<ControlPanel
				options={designControlPanelOptions}
			/>
			<div className="design-card-list">
				{mapDesignCards}
			</div>
		</div>
	)
}

export default DesignLibrary