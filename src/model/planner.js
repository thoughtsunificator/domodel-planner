import CalendarModel from "./planner/calendar.js"

import CalendarBinding from "./planner/calendar.binding.js"
import NextEventsModel from "./next-events.js"
import NextEventsBinding from "./next-events.binding.js"

export default {
	tagName: "div",
	id: "planner",
	children: [
		{
			tagName: "div",
			id: "navigation",
			identifier: "navigation",
			children: [
				{
					tagName: "button",
					textContent: "Export",
					identifier: "export"
				},
				{
					tagName: "button",
					textContent: "Import",
					identifier: "import"
				},
				{
					tagName: "button",
					textContent: "Calendar",
					identifier: "calendarButton"
				},
				{
					tagName: "button",
					textContent: "Next events",
					identifier: "nextEventsButton"
				},
			]
		},
		{
			identifier: "calendar",
			model: CalendarModel,
			binding: CalendarBinding
		},
		{
			identifier: "nextEvents",
			model: NextEventsModel,
			binding: NextEventsBinding
		}
	]
}
