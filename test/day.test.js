import test from "ava"
import { Observable } from "domodel"

import Day from "../src/object/day.js"

test("Day instance", (test) => {
	const date = new Date()
	const day = new Day(date)
	test.true(Day.prototype instanceof Observable)
	test.is(day.date, date)
	test.throws(function() {
		day.date = new Date()
	})
	const day2 = new Day(date, true)
	test.is(day2.date, date)
	test.is(day2.grayed, true)
})

