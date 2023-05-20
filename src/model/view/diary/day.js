export default data => ({
	tagName: "td",
	className: `day${data.date.getMonth() === new Date().getMonth() && data.date.getDate() === new Date().getDate() && data.date.getFullYear() === new Date().getFullYear() ? ' current' : '' }${data.grayed ? " grayed" : ""}`,
	children: [
		{
			tagName: "div",
			textContent: data.date.getDate()
		},
		{
			tagName: "div",
		}
	]
})
