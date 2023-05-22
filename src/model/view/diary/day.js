import EventsModel from "./events.js"
import EventsBinding from "./events.binding.js"

export default day => ({
	tagName: "div",
	className: `day${day.today ? ' current' : '' }${day.previousMonth ? " grayed" : ""}`,
	children: [
		{
			tagName: "div",
			className: "date",
			textContent: day.date.getDate()
		},
		{
			model: EventsModel,
			binding: EventsBinding
		}
	]
})
