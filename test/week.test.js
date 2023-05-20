import test from "ava"
import { Observable } from "domodel"

import Week from "../src/object/week.js"


test("Week instance", (test) => {
	const week = new Week(2)
	test.true(Week.prototype instanceof Observable)
	test.is(week.number, 2)
	test.throws(() => {
		week.number = ""
		week.days = ""
	})
})

