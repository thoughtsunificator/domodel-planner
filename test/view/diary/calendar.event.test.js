import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"

import CalendarModel from "../../../src/model/view/diary/calendar.js"

import CalendarBinding from "../../../src/model/view/diary/calendar.binding.js"

import CalendarEventListener from "../../../src/model/view/diary/calendar.event.js"

import Diary from "../../../src/object/diary.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("CalendarEventListener instance", (test) => {
	test.true(CalendarEventListener.prototype instanceof EventListener)
})

test("CalendarEventListener setDate", (test) => {
	const diary = new Diary()
	const binding = new CalendarBinding({ diary })
	test.context.rootBinding.run(CalendarModel, { binding })
	const date = new Date()
	diary.calendar.emit("setDate", { date })
	test.is(binding.identifier.date.textContent, date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))
	test.is(binding.identifier.month.selectedIndex, date.getMonth())
	test.is(binding.identifier.year.value, `${date.getFullYear()}`)
	test.deepEqual(diary.calendar.date, date)
})


test("CalendarEventListener setYear", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		const binding = new CalendarBinding({ diary })
		test.context.rootBinding.run(CalendarModel, { binding })
		const date = diary.calendar.date
		const year = date.getFullYear()
		let nextYear = year + 1
		diary.calendar.listen("setDate", (data) => {
			test.is(data.date.getFullYear(), nextYear)
			resolve()
		})
		diary.calendar.emit("setYear", nextYear)
	})
})

test("CalendarEventListener imported", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		const binding = new CalendarBinding({ diary })
		test.context.rootBinding.run(CalendarModel, { binding })
		const date = diary.calendar.date
		diary.calendar.listen("setDate", (data) => {
			test.is(data.date.getDate(), date.getDate())
			test.is(data.date.getFullYear(), date.getFullYear())
			test.is(data.date.getMonth(), date.getMonth())
			test.is(data.date.getDay(), date.getDay())
			resolve()
		})
		diary.emit("imported")
	})
})

test("CalendarEventListener todayButton", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		const binding = new CalendarBinding({ diary })
		test.context.rootBinding.run(CalendarModel, { binding })
		const date = diary.calendar.date
		diary.calendar.listen("setDate", (data) => {
			test.is(data.date.getDate(), date.getDate())
			test.is(data.date.getFullYear(), date.getFullYear())
			test.is(data.date.getMonth(), date.getMonth())
			test.is(data.date.getDay(), date.getDay())
			resolve()
		})
		binding.identifier.today.dispatchEvent(new test.context.window.Event('click'))
	})
})

test("CalendarEventListener monthButton", (test) => {
	return Promise.all([
		new Promise(resolve => {
			const diary = new Diary()
			const binding = new CalendarBinding({ diary })
			test.context.rootBinding.run(CalendarModel, { binding })
			const date = diary.calendar.date
			diary.calendar.listen("setDate", (data) => {
				test.true(data.rebuild)
				test.is(data.date.getDate(), date.getDate())
				test.is(data.date.getFullYear(), date.getFullYear())
				test.is(data.date.getMonth(), 2)
				test.is(data.date.getDay(), date.getDay())
				resolve()
			})
			binding.identifier.month.value = 3
			binding.identifier.month.dispatchEvent(new test.context.window.Event('change'))
		}),
		new Promise(resolve => {
			const diary = new Diary()
			const binding = new CalendarBinding({ diary })
			test.context.rootBinding.run(CalendarModel, { binding })
			const date = diary.calendar.date
			diary.calendar.listen("setDate", (data) => {
				test.true(data.rebuild)
				test.is(data.date.getDate(), date.getDate())
				test.is(data.date.getFullYear(), date.getFullYear())
				test.is(data.date.getMonth(), 4)
				test.is(data.date.getDay(), date.getDay())
				resolve()
			})
			binding.identifier.month.value = 5
			binding.identifier.month.dispatchEvent(new test.context.window.Event('change'))
		})
	])
})

test("CalendarEventListener previousMonthButton", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		const binding = new CalendarBinding({ diary })
		test.context.rootBinding.run(CalendarModel, { binding })
		const date = binding.getPreviousMonthDate()
		diary.calendar.listen("setDate", (data) => {
			test.true(data.rebuild)
			test.is(data.date.getDate(), date.getDate())
			test.is(data.date.getFullYear(), date.getFullYear())
			test.is(data.date.getMonth(), date.getMonth())
			test.is(data.date.getDay(), date.getDay())
			resolve()
		})
		binding.identifier.previousMonth.dispatchEvent(new test.context.window.Event('click'))
	})
})

test("CalendarEventListener nextMonthButton", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		const binding = new CalendarBinding({ diary })
		test.context.rootBinding.run(CalendarModel, { binding })
		const date = binding.getNextMonthDate()
		diary.calendar.listen("setDate", (data) => {
			test.true(data.rebuild)
			test.is(data.date.getDate(), date.getDate())
			test.is(data.date.getFullYear(), date.getFullYear())
			test.is(data.date.getMonth(), date.getMonth())
			test.is(data.date.getDay(), date.getDay())
			resolve()
		})
		binding.identifier.nextMonth.dispatchEvent(new test.context.window.Event('click'))
	})
})

test("CalendarEventListener year input", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		const binding = new CalendarBinding({ diary })
		test.context.rootBinding.run(CalendarModel, { binding })
		const date = diary.calendar.date
		const nextYear = date.getFullYear() + 1
		diary.calendar.listen("setDate", (data) => {
			test.is(data.date.getDate(), date.getDate())
			test.is(data.date.getFullYear(), nextYear)
			test.is(data.date.getMonth(), date.getMonth())
			resolve()
		})
		binding.identifier.year.value = nextYear
		binding.identifier.year.dispatchEvent(new test.context.window.Event('input'))
	})
})
