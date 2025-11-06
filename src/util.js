const AGENTS = [
	"Astra",
	"Breach",
	"Brim",
	"Chamber",
	"Clove",
	"Cypher",
	"Deadlock",
	"Fade",
	"Gekko",
	"Harbor",
	"Iso",
	"Jett",
	"Kayo",
	"Killjoy",
	"Neon",
	"Omen",
	"Phoenix",
	"Raze",
	"Reyna",
	"Sage",
	"Skye",
	"Sova",
	"Tejo",
	"Viper",
	"Vyse",
	"Yoru",
]

export const agentsMap = AGENTS.map((agent) => ({
	name: agent,
	img: `${agent.toLowerCase()}.jpg`,
}))

export const classNames = ["red", "green", "yellow", "purple", "blue"]
