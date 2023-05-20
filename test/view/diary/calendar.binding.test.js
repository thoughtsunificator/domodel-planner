import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import CalendarModel from "../../../src/model/view/diary/calendar.js"

import CalendarBinding from "../../../src/model/view/diary/calendar.binding.js"

import Diary from "../../../src/object/diary.js"


const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("CalendarBinding instance", (test) => {
	test.true(CalendarBinding.prototype instanceof Binding)
})

test("CalendarBinding onCreated", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		const date = new Date()
		diary.calendar.listen("setDate", (data) => {
			test.is(data.date.getDate(), date.getDate())
			test.is(data.date.getFullYear(), date.getFullYear())
			test.is(data.date.getMonth(), date.getMonth())
			test.is(data.date.getDay(), date.getDay())
			resolve()
		})
		const binding = new CalendarBinding({ diary })
		test.context.rootBinding.run(CalendarModel, { binding })
	})
})
