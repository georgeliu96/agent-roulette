import AgentIcon from "./AgentIcon"
import "./App.scss"
import SelectedAgents from "./SelectedAgents"
import Spinner from "./Spinner"
import { agentsMap } from "./util"
import { useState, useEffect, useCallback } from "react"

function App() {
	const [numSelected, setNumSelect] = useState(1)
	const [selected, setSelected] = useState([null])
	const [isSetting, setIsSetting] = useState(false)

	const handleReset = useCallback(() => {
		setSelected([...Array(~~numSelected).keys()].map(() => null))
	}, [numSelected])

	useEffect(() => {
		handleReset()
	}, [numSelected, handleReset])

	const getRandom = () => {
		const newSelected = []
		const length = Object.entries(agentsMap).length

		const indices = [...Array(length).keys()]
		for (let i = 0; i < numSelected; i++) {
			const index = Math.floor(Math.random() * indices.length)
			newSelected.push(...indices.splice(index, 1))
		}

		return newSelected
	}

	const setDelay = (startDelay = 250) => {
		if (startDelay > 800) {
			setIsSetting(false)
			setSelected(getRandom())
		} else {
			setTimeout(() => {
				setSelected(getRandom())
				setDelay(startDelay * 1.2)
			}, startDelay)
		}
	}

	const handleClick = () => {
		const audio = new Audio("/revolver.mp3")
		audio.play()
		setIsSetting(true)
		setDelay()
	}

	return (
		<div
			className='App'
			style={
				{
					// backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
					// backgroundSize: "cover",
				}
			}>
			<h1>Agent Roulette</h1>
			<div className='selectNum'>
				<label htmlFor='numPlayers'>Players</label>
				<select
					id='numPlayers'
					name='numPlayers'
					value={numSelected}
					disabled={isSetting}
					onChange={(e) => setNumSelect(e.target.value)}>
					{[...Array(5).keys()].map((int) => (
						<option key={int + 1} value={int + 1}>
							{int + 1}
						</option>
					))}
				</select>
			</div>
			<div className='layout'>
				<div className='spinToWin'>
					<SelectedAgents selected={selected} />
				</div>
				<div className='rightSection'>
					<div className='agentGrid'>
						{agentsMap.map((agentInfo, key) => (
							<AgentIcon
								{...agentInfo}
								key={key}
								index={key}
								selected={selected}
							/>
						))}
					</div>
					<div className='buttonsRow'>
						<button disabled={isSetting} onClick={handleClick}>
							Spin
						</button>
						<button disabled={isSetting} onClick={handleReset}>
							Reset
						</button>
						{isSetting ? <Spinner /> : null}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
