import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"
import { Router, RouterModel, RouterBinding } from "@domodel/router"

import DiaryModel from "../src/model/diary.js"
import DiaryViewModel from "../src/model/view/diary.js"

import DiaryBinding from "../src/model/diary.binding.js"
import DiaryViewBinding from "../src/model/view/diary.binding.js"

import Diary from "../src/object/diary.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("DiaryBinding instance", (test) => {
	test.true(DiaryBinding.prototype instanceof Binding)
})

test("DiaryBinding onCreated", (test) => {
	const diary = new Diary()
	const binding = new DiaryBinding({ diary })
	test.context.rootBinding.run(DiaryModel, { binding })
	test.deepEqual(binding._children[0].model, RouterModel)
	test.true(binding._children[0] instanceof RouterBinding)
	const router = binding._children[0].properties.router
	test.true(router instanceof Router)
	test.is(router.type, Router.TYPE.VIRTUAL)
	test.is(router.routes[0].match, "/")
	test.deepEqual(router.routes[0].model, DiaryViewModel)
	test.deepEqual(router.routes[0].binding, DiaryViewBinding)
})
