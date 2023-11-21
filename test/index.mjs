import test from 'node:test'
import assert from 'node:assert'
import { typeOf } from '../index.mjs'

test('number test', (t) => {
  // test number function
  assert.strictEqual(typeOf(1).is('number'), true)
  assert.strictEqual(typeOf(NaN).is('number'), true)
  assert.strictEqual(typeOf(Infinity).is('number'), true)

  assert.strictEqual(typeOf(NaN).isNaN(), true)
  assert.strictEqual(typeOf(Infinity).isInfinity('number'), true)
  assert.strictEqual(typeOf(-Infinity).isInfinity('number'), true)

  assert.strictEqual(typeOf(1).isNormalNumber('number'), true)
  assert.strictEqual(typeOf(-Infinity).isNormalNumber('number'), false)
})

test('string test', (t) => {
  // test string function
  assert.strictEqual(typeOf('content').is('string'), true)
  assert.strictEqual(typeOf('content').is('number'), false)
})

test('boolean test', (t) => {
  // test boolean function
  assert.strictEqual(typeOf(true).is('boolean'), true)
  assert.strictEqual(typeOf(false).is('boolean'), true)
  assert.strictEqual(typeOf(1).is('boolean'), false)
})

test('symbol test', (t) => {
  // test symbol function
  assert.strictEqual(typeOf(Symbol('foo')).is('symbol'), true)
  assert.strictEqual(typeOf(Symbol('foo')).is('number'), false)
})

test('undefined test', (t) => {
  // test undefined function
  assert.strictEqual(typeOf(undefined).is('undefined'), true)
  assert.strictEqual(typeOf(undefined).is('number'), false)
})

test('object test', (t) => {
  // test object function
  assert.strictEqual(typeOf({}).is('object'), true)
  assert.strictEqual(typeOf({}).is('number'), false)

  assert.strictEqual(typeOf([]).is('array'), true)

  assert.strictEqual(typeOf(/foo/).is('regexp'), true)
  assert.strictEqual(typeOf(/foo/).is('object'), false)

  assert.strictEqual(typeOf(new Date()).is('date'), true)
})

test ('null test', (t) => {
  // null is not object

  assert.strictEqual(typeOf(null).is('null'), true)
  assert.strictEqual(typeOf(null).is('object'), false)
})

test ('constructor.name test', (t) => {
  // test constructor.name function

  assert.strictEqual(typeOf(new Map()).is('map'), true)
  assert.strictEqual(typeOf(new Set()).is('set'), true)
})

test ('class test', (t) => {
  class Foo {}

  assert.strictEqual(typeOf(new Foo()).is(Foo), true)
  assert.strictEqual(typeOf(new Foo()).is('Foo'), true)
  assert.strictEqual(typeOf(new Foo()).is('foo'), true)
})

test ('function test', (t) => {
  assert.strictEqual(typeOf(() => {}).is('function'), true)
  assert.strictEqual(typeOf(async () => {}).is('AsyncFunction'), true)
})
