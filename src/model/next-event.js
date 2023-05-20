export default event => ({
	tagName: "div",
	id: "next-event",
	children: [
		{
			tagName: "div",
			identifier: "title",
			textContent: event.title
		},
		{
			tagName: "div",
			identifier: "date",
			textContent: event.date
		}
	]
})
