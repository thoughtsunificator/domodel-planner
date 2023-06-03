import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import DayModel from "../../src/model/view/planner/day.js"

import DayBinding from "../../src/model/view/planner/day.binding.js"

import Planner from "../../src/object/planner.js"
import Day from "../../src/object/day.js"

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
	const planner = new Planner()
	const day = new Day(new Date())
	const binding = new DayBinding({ planner, day })
	test.context.rootBinding.run(DayModel(day), { binding })
	test.false(binding.root.classList.contains("content"))
})

test("DayBinding onCreated grayed", (test) => {
	const planner = new Planner()
	const day = new Day(new Date(), true)
	const binding = new DayBinding({ planner, day })
	test.context.rootBinding.run(DayModel(day), { binding })
	test.false(binding.root.classList.contains("content"))
	test.true(binding.root.classList.contains("grayed"))
})

test("DayBinding click", test => {
	return new Promise(resolve => {
		const planner = new Planner()
		const day = new Day(new Date())
		const binding = new DayBinding({ planner, day })
		test.context.rootBinding.run(DayModel(day), { binding })
		planner.calendar.listen("setDate", data => {
			test.deepEqual(data.date, day.date)
			resolve()
		})
		binding.root.dispatchEvent(new test.context.window.Event('click'))
	})
})

