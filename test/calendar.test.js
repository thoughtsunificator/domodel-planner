import test from "ava"
import { Observable } from "domodel"

import Calendar from "../src/object/calendar.js"

test("Calendar instance", (test) => {
	const date = new Date()
	const calendar = new Calendar(date)
	test.true(Calendar.prototype instanceof Observable)
	test.is(calendar.date, date)
	test.is(calendar.weeks, null)
	test.is(calendar.day, null)
	test.notThrows(function() {
		calendar.weeks = []
		calendar.day = ""
		calendar.date = new Date()
	})
})

