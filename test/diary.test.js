import test from "ava"
import { Observable } from "domodel"

import Diary from "../src/object/diary.js"
import Calendar from "../src/object/calendar.js"


test("Diary instance", (test) => {
	const date = new Date()
	const diary = new Diary(date)
	test.true(Diary.prototype instanceof Observable)
	test.true(diary.calendar instanceof Calendar)
	test.is(diary.calendar.date, date)
	test.is(diary.firstRun, true)
	test.notThrows(() => {
		diary.firstRun = ""
	})
	test.throws(() => { diary.editor = "" })
	test.throws(() => { diary.calendar = "" })
})

