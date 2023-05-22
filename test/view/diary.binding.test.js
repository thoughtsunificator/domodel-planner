import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, Observable } from "domodel"
import { Router } from "@domodel/router"

import DiaryViewModel from "../../src/model/view/diary.js"
import CalendarModel from "../../src/model/view/diary/calendar.js"
import SettingsModel from "../../src/model/view/diary/settings.js"

import DiaryViewBinding from "../../src/model/view/diary.binding.js"
import CalendarBinding from "../../src/model/view/diary/calendar.binding.js"
import SettingsBinding from "../../src/model/view/diary/settings.binding.js"

import Diary from "../../src/object/diary.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("DiaryViewBinding instance", (test) => {
	test.true(DiaryViewBinding.prototype instanceof Binding)
})

test("DiaryViewBinding onCreated", (test) => {
	const diary = new Diary()
	const router = new Router([])
	router._view = new Observable()
	const binding = new DiaryViewBinding({ diary, router })
	test.context.rootBinding.run(DiaryViewModel(), { binding })
	test.is(binding.textFileURL, null)
	test.is(binding.interval, 1)
	test.deepEqual(DiaryViewBinding.INACTIVITY_TIMER_DELAY, (60 * 1000) * 15)
	test.deepEqual(binding._children[0].model, CalendarModel)
	test.deepEqual(binding._children[1].model, SettingsModel)
	test.deepEqual(binding._children[0].root, binding.identifier.content)
	test.deepEqual(binding._children[1].root, binding.identifier.content)
	test.true(binding._children[0] instanceof CalendarBinding)
	test.true(binding._children[1] instanceof SettingsBinding)
	test.context.window.clearInterval(binding.interval)
})

test("DiaryViewBinding logout", test => {
	const diary = new Diary()
	let emitted = 0
	diary.listen("logout", () => {
		emitted++
	})
	const router = new Router([])
	router._view = new Observable()
	const binding = new DiaryViewBinding({ diary, router, inactivity_timer_delay: 20 })
	diary.emit("logout")
	test.context.rootBinding.run(DiaryViewModel(), { binding })
	test.is(binding.interval, 1)
	test.is(emitted, 1)
})

test("DiaryViewBinding startInactivityTimer", test => {
	return new Promise(resolve => {
		const diary = new Diary()
		let emitted = 0
		diary.listen("logout", () => {
			emitted++
		})
		const router = new Router([])
	 	router._view = new Observable()
		const binding = new DiaryViewBinding({ diary, router, inactivity_timer_delay: 1 })
		test.context.rootBinding.run(DiaryViewModel(), { binding })
		test.is(binding.interval, 1)
		setTimeout(() => {
			test.is(emitted, 1)
			resolve()
		})
	})
})

test("DiaryViewBinding stopInactivityTimer", test => {
	return new Promise(resolve => {
		const diary = new Diary()
		let emitted = 0
		diary.listen("logout", () => {
			emitted++
		})
		const router = new Router([])
	 	router._view = new Observable()
		const binding = new DiaryViewBinding({ diary, router, inactivity_timer_delay: 1 })
		test.context.rootBinding.run(DiaryViewModel(), { binding })
		test.is(binding.interval, 1)
		binding.stopInactivityTimer()
		setTimeout(() => {
			test.is(emitted, 0)
			resolve()
		})
	})
})

test("DiaryViewBinding restartInactivityTimer", (test) => {
	const diary = new Diary()
	const router = new Router([])
 	router._view = new Observable()
	const binding = new DiaryViewBinding({ diary, router })
	test.context.rootBinding.run(DiaryViewModel(), { binding })
	test.is(binding.interval, 1)
	binding.restartInactivityTimer()
	test.is(binding.interval, 2)
})

test("DiaryViewBinding windowClick", (test) => {
	const diary = new Diary()
	const router = new Router([])
 	router._view = new Observable()
	const binding = new DiaryViewBinding({ diary, router })
	test.context.rootBinding.run(DiaryViewModel(), { binding })
	test.is(binding.interval, 1)
	test.context.document.body.dispatchEvent(new test.context.window.Event("click", { bubbles: true }))
	test.is(binding.interval, 2)
})

test("DiaryViewBinding windowInput", (test) => {
	const diary = new Diary()
	const router = new Router([])
 	router._view = new Observable()
	const binding = new DiaryViewBinding({ diary, router })
	test.context.rootBinding.run(DiaryViewModel(), { binding })
	test.is(binding.interval, 1)
	test.context.document.body.dispatchEvent(new test.context.window.Event("input", { bubbles: true }))
	test.is(binding.interval, 2)
})

test("DiaryViewBinding menuButton", (test) => {
	const diary = new Diary()
	const router = new Router([])
	router._view = new Observable()
	const binding = new DiaryViewBinding({ diary, router })
	test.context.rootBinding.run(DiaryViewModel(), { binding })
	let emitted = false
	router._view.listen("openSettings", () => {
		emitted = true
	})
	binding.identifier.menu.dispatchEvent(new test.context.window.Event("click"))
	test.true(emitted)
	test.context.window.clearInterval(binding.interval)
})