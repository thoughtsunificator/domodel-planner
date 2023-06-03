import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import PlannerViewModel from "../src/model/view/planner.js"
import CalendarModel from "../src/model/view/planner/calendar.js"
import SettingsModel from "../src/model/view/planner/settings.js"

import PlannerViewBinding from "../src/model/view/planner.binding.js"
import CalendarBinding from "../src/model/view/planner/calendar.binding.js"
import SettingsBinding from "../src/model/view/planner/settings.binding.js"

import Planner from "../src/object/planner.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("PlannerViewBinding instance", (test) => {
	test.true(PlannerViewBinding.prototype instanceof Binding)
})

test("PlannerViewBinding onCreated", (test) => {
	const planner = new Planner()
	const binding = new PlannerViewBinding({ planner })
	test.context.rootBinding.run(PlannerViewModel(), { binding })
	test.is(binding.textFileURL, null)
	test.is(binding.interval, 1)
	test.deepEqual(PlannerViewBinding.INACTIVITY_TIMER_DELAY, (60 * 1000) * 15)
	test.deepEqual(binding._children[0].model, CalendarModel)
	test.deepEqual(binding._children[1].model, SettingsModel)
	test.deepEqual(binding._children[0].root, binding.identifier.content)
	test.deepEqual(binding._children[1].root, binding.identifier.content)
	test.true(binding._children[0] instanceof CalendarBinding)
	test.true(binding._children[1] instanceof SettingsBinding)
	test.context.window.clearInterval(binding.interval)
})

test("PlannerViewBinding logout", test => {
	const planner = new Planner()
	let emitted = 0
	planner.listen("logout", () => {
		emitted++
	})
	const binding = new PlannerViewBinding({ planner, inactivity_timer_delay: 20 })
	planner.emit("logout")
	test.context.rootBinding.run(PlannerViewModel(), { binding })
	test.is(binding.interval, 1)
	test.is(emitted, 1)
})

test("PlannerViewBinding startInactivityTimer", test => {
	return new Promise(resolve => {
		const planner = new Planner()
		let emitted = 0
		planner.listen("logout", () => {
			emitted++
		})
		const binding = new PlannerViewBinding({ planner, inactivity_timer_delay: 1 })
		test.context.rootBinding.run(PlannerViewModel(), { binding })
		test.is(binding.interval, 1)
		setTimeout(() => {
			test.is(emitted, 1)
			resolve()
		})
	})
})

test("PlannerViewBinding stopInactivityTimer", test => {
	return new Promise(resolve => {
		const planner = new Planner()
		let emitted = 0
		planner.listen("logout", () => {
			emitted++
		})
		const binding = new PlannerViewBinding({ planner, inactivity_timer_delay: 1 })
		test.context.rootBinding.run(PlannerViewModel(), { binding })
		test.is(binding.interval, 1)
		binding.stopInactivityTimer()
		setTimeout(() => {
			test.is(emitted, 0)
			resolve()
		})
	})
})

test("PlannerViewBinding restartInactivityTimer", (test) => {
	const planner = new Planner()
	const binding = new PlannerViewBinding({ planner })
	test.context.rootBinding.run(PlannerViewModel(), { binding })
	test.is(binding.interval, 1)
	binding.restartInactivityTimer()
	test.is(binding.interval, 2)
})

test("PlannerViewBinding windowClick", (test) => {
	const planner = new Planner()
	const binding = new PlannerViewBinding({ planner })
	test.context.rootBinding.run(PlannerViewModel(), { binding })
	test.is(binding.interval, 1)
	test.context.document.body.dispatchEvent(new test.context.window.Event("click", { bubbles: true }))
	test.is(binding.interval, 2)
})

test("PlannerViewBinding windowInput", (test) => {
	const planner = new Planner()
	const binding = new PlannerViewBinding({ planner })
	test.context.rootBinding.run(PlannerViewModel(), { binding })
	test.is(binding.interval, 1)
	test.context.document.body.dispatchEvent(new test.context.window.Event("input", { bubbles: true }))
	test.is(binding.interval, 2)
})

test("PlannerViewBinding menuButton", (test) => {
	const planner = new Planner()
	const binding = new PlannerViewBinding({ planner })
	test.context.rootBinding.run(PlannerViewModel(), { binding })
	let emitted = false
	router._view.listen("openSettings", () => {
		emitted = true
	})
	binding.identifier.menu.dispatchEvent(new test.context.window.Event("click"))
	test.true(emitted)
	test.context.window.clearInterval(binding.interval)
})