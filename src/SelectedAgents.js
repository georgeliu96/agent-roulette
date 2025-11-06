import { classNames, agentsMap } from "./util"

const SelectedAgents = ({ selected }) => {
	const numPlayers = selected.length

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
						<h3>{name ?? ""}</h3>
					</div>
				)
			})}
		</div>
	)
}

export default SelectedAgents
