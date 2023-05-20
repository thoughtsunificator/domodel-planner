export const ITEM_NAME = "events"

function save(planner) {
	localStorage.setItem(ITEM_NAME, planner.calendar.events.toString())
}

export default properties => {

	const { planner } = properties

	planner.firstRun = localStorage.getItem(ITEM_NAME) === null

	if(planner.firstRun === false) {
		const events = JSON.parse(localStorage.getItem(ITEM_NAME))
		for(const event of events) {
			planner.calendar.addEvent(event.title, new Date(event.date))
		}
	}

	if(localStorage.getItem("currentDate")) {
		planner.calendar.date = new Date(localStorage.getItem("currentDate"))
	}

	planner.calendar.listen("setDate", () => localStorage.setItem("currentDate", planner.calendar.date))

	planner.calendar.events.listen("added", () => save(planner))
	planner.calendar.events.listen("removed", () => save(planner))
	planner.calendar.events.listen("updated", () => save(planner))

	planner.listen("imported", () => save(planner))

}
