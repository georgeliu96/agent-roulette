import { classNames, agentsMap } from "./util"
import { useState } from "react"

const SelectedAgents = ({ selected }) => {
	const numPlayers = selected.length
	const currIgns = sessionStorage.getItem("igns")?.split(",") ?? []
	const [editIdx, setEditIdx] = useState(null)

	const handleInput = (e, idx) => {
		if (e.key === "Enter") {
			handleBlur(e, idx)
		} else if (e.key === "Escape") {
			handleBlur({ target: { value: currIgns?.[idx] ?? "" } }, idx)
		}
	}

	const handleBlur = (e, idx) => {
		const newIgns = [...currIgns]
		newIgns[idx] = e.target.value === "" ? "" : e.target.value
		sessionStorage.setItem("igns", newIgns.join())
		setEditIdx(null)
	}

	return (
		<div className='selectedGrid'>
			{[...Array(numPlayers).keys()].map((int) => {
				const { name, img } = agentsMap[selected[int]] ?? {}
				return (
					<div
						key={int}
						className={`${classNames[int]} selectedAgentContainer`}>
						<div
							className={`selectedAgent`}
							style={{
								backgroundImage: img
									? `url(${process.env.PUBLIC_URL}/agents/${img})`
									: undefined,
							}}
						/>
						<div className='agentAndIgn'>
							{editIdx === int ? (
								<input
									type='text'
									onBlur={(e) => handleBlur(e, int)}
									onKeyDown={(e) => handleInput(e, int)}
								/>
							) : (
								<h3
									onClick={() => setEditIdx(int)}
									className='editIgn'>
									{currIgns?.[int] == null ||
									currIgns[int] === ""
										? "Click to enter IGN"
										: currIgns[int]}
								</h3>
							)}
							<h3>{name ?? "Picking..."}</h3>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default SelectedAgents
