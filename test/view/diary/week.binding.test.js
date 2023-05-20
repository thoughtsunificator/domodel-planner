import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import WeekModel from "../../../src/model/view/diary/week.js"

import WeekBinding from "../../../src/model/view/diary/week.binding.js"

import Diary from "../../../src/object/diary.js"
import Week from "../../../src/object/week.js"
import Day from "../../../src/object/day.js"
import DayModel from "../../../src/model/view/diary/day.js"
import DayBinding from "../../../src/model/view/diary/day.binding.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("WeekBinding instance", (test) => {
	test.true(WeekBinding.prototype instanceof Binding)
})

test("WeekBinding onCreated", (test) => {
	const diary = new Diary()
	const week = new Week()
	const day1 = new Day(new Date())
	const day2 = new Day(new Date())
	week.days.push(
		day1,
		day2
	)
	const binding = new WeekBinding({ diary, week })
	test.context.rootBinding.run(WeekModel, { binding })
	test.deepEqual(binding._children[0].model, DayModel(day1))
	test.deepEqual(binding._children[1].model, DayModel(day2))
	test.true(binding._children[0] instanceof DayBinding)
	test.true(binding._children[1] instanceof DayBinding)
	test.pass()
})

