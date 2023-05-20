export const ITEM_NAME = "planning"

function save(diary) {
	localStorage.setItem(ITEM_NAME, diary.events.toString())
}

export default properties => {

	const { diary } = properties

	diary.firstRun = localStorage.getItem(ITEM_NAME) === null

	// diary.events.listen("add", () => save(diary))

	// diary.events.listen("update", () => save(diary))

	// diary.events.listen("remove", () => save(diary))

	diary.listen("imported", () => save(diary))

	diary.listen("reset", () => localStorage.removeItem(ITEM_NAME))

}
