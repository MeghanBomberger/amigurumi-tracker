import React from "react"
import axios from "axios"
import "../styles/YarnMaker.scss"
import ControlPanel from "../component/ControlPanel.component.js"
import Yarn from "../component/Yarn.component.js"
import HomeIcon from "../images/svg/house.svg"

export default function YarnMaker () {
	const [red, setRed] = React.useState(255)
	const [green, setGreen] = React.useState(255)
	const [blue, setBlue] = React.useState(255)
	const [colorName, setColorName] = React.useState("")
	const [colorBrand, setColorBrand] = React.useState("")
	const [selectedType, setSelectedType] = React.useState(0)
	const [selectedWeight, setSelectedWeight] = React.useState(5)
	const [colorId, setColorId] = React.useState(0)
	const [errMsg, setErrMsg] = React.useState("")
	const [listStale, setListStale] = React.useState(false)
	const [colorList, setColorList] = React.useState([])
	const [typeList, setTypeList] = React.useState([])
	const [weightList, setWeightList] = React.useState([])
	const [createNewColor, setCreateNewColor] = React.useState(false)

	const designControlPanelOptions = [
		{
			icon: HomeIcon,
			description: "Go Home",
			link: "/",
			action: null
		}
	]

	React.useEffect(() => {
		setListStale(true)
	})

	React.useEffect(() => {
		axios.get('http://localhost:3308/api/colors/')
			.then(function (response) {
				setColorList(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})

		axios.get('http://localhost:3308/api/yarnweights')
			.then(function (response) {
				setWeightList(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})

		axios.get('http://localhost:3308/api/yarntypes')
			.then(function (response) {
				setTypeList(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [listStale])

	const mapYarns = colorList.map(yarn => {
		return	<option 
							key={yarn.id}
							className="yarn-option" 
							value={yarn.id}
						>
							{yarn.colorName} ({yarn.brandName})
						</option>
	})

	const mapYarnType = typeList.map(type => {
		return 	<option 
							key={type.id}
							className="yarn-option"
							value={selectedType}
						>
							{type.yarnType}
						</option>
	})

	const mapYarnWeight = weightList.map(weight => {
		return 	<option
							key={weight.id}
							className="yarn-option"
							value={selectedWeight}
						>
							({weight.weightNumber}) - {weight.weightName}
						</option>
	})

	function handleSelectColor(colorId) {
		if ( colorId < 1) {
			setCreateNewColor(true)
			setColorName("")
			setColorBrand("")
			setSelectedWeight("")
			setRed(255)
			setGreen(255)
			setBlue(255)

		} else {
			setCreateNewColor(false)
			let selectedColor = null
			colorList.filter(color => {
				if (color.id === parseInt(colorId)) {
					selectedColor = color
				} 
			})
			setColorId(selectedColor.id)
			setColorName(selectedColor.colorName)
			setColorBrand(selectedColor.brandName)
			setSelectedWeight(selectedColor.yarnWeightId)
			setSelectedType(selectedColor.yarnTypeId)

			let currentColor = selectedColor.colorSwatch
			currentColor = currentColor.slice(4, -1)
			currentColor = currentColor.split(",")

			setRed(parseInt(currentColor[0]))
			setGreen(parseInt(currentColor[1]))
			setBlue(parseInt(currentColor[2]))	
		}
	}

	function handleSubmit () {
		if (createNewColor === true) {
			axios.post('http://localhost:3308/api/colors', {
				colorName: colorName,
				brandName: colorBrand,
				colorSwatch: `rgb(${red}, ${green}, ${blue})`,
				yarnTypeId: selectedType,
				yarnWeightId: selectedWeight
			})
				.then(function (response) {
					// setListStale(true)
					console.log(response)
				})
				.catch(function (error) {
					console.log(error)
				})
		} else {
			axios.put(`http://localhost:3308/api/colors/${colorId}`, {
				colorName: colorName,
				brandName: colorBrand,
				colorSwatch: `rgb(${red}, ${green}, ${blue})`,
				yarnTypeId: selectedType,
				yarnWeightId: selectedWeight
			})
				.then(function (response) {
					setListStale(true)
				})
				.catch(function (error) {
					console.log(error)
				})
		}
	}

	return (
		<div className="yarn-marker">
			<ControlPanel
				options={designControlPanelOptions}
			/>
			<div className="example-container">
				<Yarn colorSwatch={`rgb(${red}, ${green}, ${blue})`} />
			</div>
			<form className="yarn-form" onSubmit={() => handleSubmit()}>
				<select onChange={e => handleSelectColor(e.target.value)}>
					<option className="yarn-option">Select a color</option>
					<option className="yarn-option" value={0}>Create a new yarn color</option>
					{mapYarns}
				</select>
				<table>
					<thead>
						<tr>
							<th>Red</th>
							<th>Green</th>
							<th>Blue</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input
									className="color-selector-input"
									type="number"
									max={255}
									min={0}
									name="red"
									value={red}
									onChange={e => setRed(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="color-selector-input"
									type="number"
									max={255}
									min={0}
									name="green"
									value={green}
									onChange={e => setGreen(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="color-selector-input"
									type="number"
									max={255}
									min={0}
									name="blue"
									value={blue}
									onChange={e => setBlue(e.target.value)}
								/>
							</td>
						</tr>
					</tbody>
				</table>
				<label>Color Name:</label>
				<input
					className="color-input"
					name="colorName"
					value={colorName}
					onChange={e => setColorName(e.target.value)}
				/>
				<label>Brand Name:</label>
				<input
					className="color-input"
					name="colorName"
					value={colorBrand}
					onChange={e => setColorBrand(e.target.value)}
				/>
				<label>Yarn Weight:</label>
				<select onChange={e => setSelectedWeight(e.target.value)}>
					<option className="yarn-option">Select a yarn weight</option>
					{mapYarnWeight}
				</select>
				<label>Yarn Type:</label>
				<select onChange={e => setSelectedType(e.target.value)}>
					<option className="yarn-option">Select a yarn type</option>
					{mapYarnType}
				</select>
				<button type="submit">
					{createNewColor === true ? "Create Color" : "Update Color"}
				</button>
			</form>
		</div>
	)
}