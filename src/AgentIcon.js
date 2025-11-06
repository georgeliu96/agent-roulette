import "./AgentIcon.scss"
import { classNames } from "./util"

const AgentIcon = ({ name, img, index, selected }) => {
	const selectedIdx = selected.findIndex((int) => int === index)
	const isSelected = selectedIdx !== -1

	return (
		<div
			className={`container ${
				isSelected ? `${classNames[selectedIdx]} selected` : ""
			}`}>
			<div
				className='icon'
				style={{
					backgroundImage: `url(${process.env.PUBLIC_URL}/agents/${img})`,
					backgroundSize: "cover",
				}}></div>
			<h3>{name}</h3>
		</div>
	)
}

export default AgentIcon
