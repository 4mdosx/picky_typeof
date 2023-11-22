export class TypeInfo {
  constructor (a) {
    this.a = a
    this.type = typeof a
  }

  [Symbol.toPrimitive] () {
    if (!["object", "function"].includes(this.type)) {
      return this.type
    }

    if (this.type === 'function') {
      if (Function.prototype.toString.call(this.a).startsWith("class")) return 'class'
      return this.a.constructor.name.toLowerCase()
    }

    if (this.type === 'object') {
      if (this.a === null) return 'null'
      return this.a.constructor.name
    }

    const tag = this.a[Symbol.toStringTag]
    if (typeof tag === 'string') {
      return tag
    }
  }

  is (type) {
    if (typeof type !== 'string') {
      return this.a instanceof type
    }
    if (this.type === 'function' && type.endsWith('Function')) {
      return this.a.constructor.name === type
    }

    if (this.type === "function" && type === "class") {
      return Function.prototype.toString.call(this.a).startsWith("class")
    }

    if (this.type === 'object') {
      if (this.a === null) {
        return type === 'null'
      } else if (type === 'object') {
        return this.a.toString() === '[object Object]'
      } else if (type === 'array') {
        return Array.isArray(this.a)
      } else if (type === 'regexp') {
        return this.a instanceof RegExp
      } else if (type === 'date') {
        return this.a instanceof Date
      } else {
        return this.a.constructor.name === type || this.a.constructor.name.toLowerCase() === type
      }
    }
    return this.type === type
  }

  isNaN () {
    return isNaN(this.a)
  }

  isInfinity () {
    return Math.abs(this.a) === Infinity
  }

  isNormalNumber () {
    return this.is('number') && !this.isNaN() && !this.isInfinity()
  }
}

export function typeOf (a) {
  return new TypeInfo(a)
}
