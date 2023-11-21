# picky typeof

## install
```
npm i picky_typoef
```

## primitive value

```javascirpt
import { typeOf } from 'pickey_typeof'

// number
typeOf(1).is('number') // true
typeOf(NaN).is('number') // true
typeOf(Infinity).is('number') // true
typeOf(1).isNaN() // false, why don't use native isNaN ?
typeOf(1).isInfinity() // false
typeOf(1).isNormalNumber() // true
typeOf(NaN).isNormalNumber() // false
typeOf(Infinity).isNormalNumber() // false

// string
typeOf('a').is('string') // true

// boolean
typeOf(true).is('boolean') // true

// symbol
typeOf(Symbol()).is('symbol') // true

// date
typeOf(new Date()).is('date') // true
```

## reference value
compare with a.constructor.name

```javascirpt
// object
typeOf({}).is('object') // true, only match [object Object]
 
// object-like
use constructor.name, worked with most of cases.
typeOf([]).is('array') // true
typeOf(new Map()).is('map') // true
typeOf(new Set()).is('set') // true
typeOf(new Buffer()).is('buffer') // true

// function
typeOf(() => {}).is('function') // true
typeOf(() => {}).is('AsyncFunction') // false
typeOf(async () => {}).is('AsyncFunction') // false

// class
class DemoClass () {}
typeOf(new DemoClass()).is('DemoClass') // true
typeOf(new DemoClass()).is(DemoClass) // true, a safer way
```

##  with Constructor 

```javascirpt
typeOf([]).is(Array) // true
typeOf(() => {}).is(Function) // true
```
Warning: When you pass in the constructor, instancesOf will actually be called for comparison. Object will return true in all cases. When it needs to be strictly judged as an 
ordinary object, use `typeOf({}).is('object')`
