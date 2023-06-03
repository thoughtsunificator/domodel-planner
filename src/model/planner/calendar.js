import DateBrowser from "./date-browser.js"
import DateBrowserBinding from "./date-browser.binding.js"

export default {
	tagName: "div",
	id: "calendar",
	children: [
		{
			tagName: "h2",
			identifier: "date",
			id: "date"
		},
		{
			model: DateBrowser,
			binding: DateBrowserBinding
		},
		{
			tagName: "div",
			id: "day-headers",
			children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => ({
				tagName: "div",
				className: "day-header padding-2xs",
				textContent: day
			}))
		},
		{
			tagName: "div",
			identifier: "weeks",
			id: "weeks"
		}
	]
}
