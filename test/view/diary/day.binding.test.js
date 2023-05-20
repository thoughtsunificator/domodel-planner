import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import DayModel from "../../../src/model/view/diary/day.js"

import DayBinding from "../../../src/model/view/diary/day.binding.js"

import Diary from "../../../src/object/diary.js"
import Day from "../../../src/object/day.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("DayBinding instance", (test) => {
	test.true(DayBinding.prototype instanceof Binding)
})

test("DayBinding onCreated", (test) => {
	const diary = new Diary()
	const day = new Day(new Date())
	const binding = new DayBinding({ diary, day })
	test.context.rootBinding.run(DayModel(day), { binding })
	test.false(binding.root.classList.contains("content"))
})

test("DayBinding onCreated grayed", (test) => {
	const diary = new Diary()
	const day = new Day(new Date(), true)
	const binding = new DayBinding({ diary, day })
	test.context.rootBinding.run(DayModel(day), { binding })
	test.false(binding.root.classList.contains("content"))
	test.true(binding.root.classList.contains("grayed"))
})

test("DayBinding click", test => {
	return new Promise(resolve => {
		const diary = new Diary()
		const day = new Day(new Date())
		const binding = new DayBinding({ diary, day })
		test.context.rootBinding.run(DayModel(day), { binding })
		diary.calendar.listen("setDate", data => {
			test.deepEqual(data.date, day.date)
			resolve()
		})
		binding.root.dispatchEvent(new test.context.window.Event('click'))
	})
})

