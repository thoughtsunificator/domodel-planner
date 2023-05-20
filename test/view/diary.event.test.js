import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, Observable, EventListener } from "domodel"
import { Router } from "@domodel/router"

import DiaryViewEventListener from "../../src/model/view/diary.event.js"

import DiaryViewModel from "../../src/model/view/diary.js"

import DiaryViewBinding from "../../src/model/view/diary.binding.js"

import Diary from "../../src/object/diary.js"


const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("DiaryViewEventListener instance", (test) => {
	test.true(DiaryViewEventListener.prototype instanceof EventListener)
})

test("DiaryViewEventListener export", (test) => {
	test.pass()
})

test("DiaryViewEventListener import", (test) => {
	test.pass()
})

test("DiaryViewEventListener openSettings", test => {
	return new Promise(resolve => {
		const diary = new Diary()
		const router = new Router([])
		router._view = new Observable()
		const binding = new DiaryViewBinding({ diary, router })
		test.context.rootBinding.run(DiaryViewModel(), { binding })
		binding.popup.listen("show", () => {
			test.pass()
			resolve()
		})
		router.view.emit("openSettings")
	})
})
