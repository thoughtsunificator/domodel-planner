export const ITEM_NAME = "events"

function save(diary) {
	localStorage.setItem(ITEM_NAME, diary.calendar.events.toString())
}

export default properties => {

	const { diary } = properties

	diary.firstRun = localStorage.getItem(ITEM_NAME) === null

	if(diary.firstRun == false) {
			const events = JSON.parse(localStorage.getItem(ITEM_NAME))
			for(const event of events) {
				diary.calendar.addEvent(event.title, new Date(event.date))
			}
	}

	// diary.events.listen("add", () => save(diary))

	// diary.events.listen("update", () => save(diary))

	// diary.events.listen("remove", () => save(diary))

	diary.calendar.events.listen("added", () => save(diary))

	// diary.listen("imported", () => save(diary))

	diary.listen("reset", () => localStorage.removeItem(ITEM_NAME))

}
