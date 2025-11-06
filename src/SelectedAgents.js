import { classNames, agentsMap } from "./util"
import { useState } from "react"

const SelectedAgents = ({ selected }) => {
	const numPlayers = selected.length
	const currIgns = sessionStorage.getItem("igns")?.split(",") ?? []
	const [editIdx, setEditIdx] = useState(null)

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
								/>
							) : (
								<h3 onClick={() => setEditIdx(int)}>
									{currIgns?.[int] == null ||
									currIgns[int] === ""
										? "Click to enter IGN"
										: currIgns[int]}
								</h3>
							)}
							<h3>{name ?? ""}</h3>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default SelectedAgents
