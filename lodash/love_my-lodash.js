var love_my = {
  isNaN: function(val) {
    if (typeof(val) == 'object') {
      if (val.length > 1) {
        return false
      }
      val = +String(val)
    }
    return val !== val
  }

  ,chunk: function(ary, size = 1) {
    var result = []
    for (var i = 0; i< ary.length; i++) {
      var ary2 = []
      for (var j = i; j < size + i && j < ary.length; j++) {
        ary2.push(ary[i])
      }
      result.push(ary2)
    }
    return result
  }

  ,compact: function(array) {
    var ary = []
    for (var i = 0; i < array.length; i++) {
      var a = array[i]
      if (a !== 0 && a !== '' && a !== null && a !== undefined || a !== a) {
        ary.push(a)
      }
    }
    return ary
  }

  ,concat: function(array, ...values) {
    var ary = array.slice()
    for (var i = 0; i <  values.length; i++) {
      var a = values[i]
      if (typeof(a) == 'number') {
        ary.push(a)
      } else if (Array.isArray(a)) {
        for (var j = 0; j < a.length; j++) {
          ary.push(a[j])
        }
      }
    }
    return ary
  }

  ,difference: function(array, val) {
    var ary = []
    for (var i = 0; i < array.length; i++) {
      if (val.includes(array[i])) {
        continue
      } else {
        ary.push(array[i])
      }
    }
    return ary
  }

  ,differenceBy: function(array, val, dif) {
    var ary = []
    if (typeof(dif) == 'function') {
      var ary1 = array.map(it => dif(it))
      var ary2 = val.map(it => dif(it))
    } else if (typeof(dif) == 'string') {
      var ary1 = array.map(it => it.dif)
      var ary2 = val.map(it => it.dif)
    }
    for (var i = 0; i < ary1.length; i++) {
      if (ary2.includes(ary1[i])) {
        continue
      } else {
        ary.push(ary[i])
      }
    }
    return ary
  }

  ,differenceWith: function(array, val, compare) {
    var ary = []
    for (var i = 0; i < array.length; i++) {
      if (!compare(arry[i], val)) {
        ary.push(array[i])
      }
    }
    return ary
  }

  ,drop: function(array, n = 1) {
    return array.slice(n)
  }

  ,dropRight: function(array, n = 1) {
    return array.slice(0, array.length - n)
  }

  ,dropRightWhile: function(array, predicate) {
    for (var i = array.length - 1; i >= 0; i--) {
      var a = array[i]
      if (typeof(predicate) == 'function') {
        if (!predicate(a)) {
          return array.slice(0, i + 1)
        }
      } else if (Array.isArray(predicate)) {
        for (var j = 0; j < predicate.length; j += 2) {
          if (a[predicate[j]] !== predicate[j + 1]) {
            return array.slice(0, i + 1)
          }
        }
      } else if (typeof(predicate) == 'object') {
        for (var key in predicate) {
          if (a[key] !== predicate[key]) {
            return array.slice(0, i + 1)
          }
        }
      } else {
        if (!a[predicate]) {
          return array.slice(0, i + 1)
        }
      }
    }
    return []
  }
  ,dropWhile: function(array, predicate) {
    for (var i = 0; i < predicate.length; i++) {
      var a = array[i]
      if (typeof(predicate) == 'function') {
        if (!predicate(a)) {
          return array.slice(i)
        }
      } else if (Array.isArray(predicate)) {
        for (var j = 0; j < predicate.length; j += 2) {
          if (a[predicate[j]] !== predicate[j + 1]) {
            return array.slice(i)
          }
        }
      } else if (typeof(predicate) == 'object') {
        for (var key in predicate) {
          if (a[key] !== predicate[key]) {
            return array.slice(i)
          }
        }
      } else {
        if (!a[predicate]) {
          return array.slice(i)
        }
      }
    }
    return []
  }
  ,fill: function(array, val, start = 0, end = array.length) {
    var ary = []
    for (var i = 0; i < array.length; i++) {
      if (i >= start && i < end) {
        ary[i] = val
      } else {
        ary[i] = array[i]
      }
    }
    return ary
  }
  ,findIndex: function(array, predicate, fromIndex = 0) {
    for (var i = fromIndex; i < array.length; i++) {
      var a = array[i]
      if (typeof(predicate) == 'function') {
        if (predicate(a)) {
          return i
        }
      } else if (Array.isArray(predicate)) {
        var isSame = true
        for (var j = 0; j < predicate.length; j += 2) {
          if (a[predicate[j]] !== predicate[j + 1]) {
            isSame = false
            break
          }
        }
        if (isSame) {
          return i
        }
      } else if (typeof(predicate) == 'object') {
        var isSame2 = true
        for (var key in predicate) {
          if (a[key] !== predicate[key]) {
            isSame2 = false
            break
          }
        }
        if (isSame2) {
          return i
        }
      } else {
        if (a[key]) {
          return i
        }
      }
    }
    return -1
  }
  ,findLastIndex: function(array, predicate, fromIndex = array.length-1) {
    for (var i = fromIndex; i >= 0; i--) {
      var a = array[i]
      if (typeof(predicate) == 'function') {
        if (predicate(a)) {
          return i
        }
      } else if (Array.isArray(predicate)) {
        var isSame = true
        for (var j = 0; j < predicate.length; j += 2) {
          if (a[predicate[j]] !== predicate[j + 1]) {
            isSame = false
            break
          }
        }
        if (isSame) {
          return i
        }
      } else if (typeof(predicate) == 'object') {
        var isSame2 = true
        for (var key in predicate) {
          if (a[key] !== predicate[key]) {
            isSame2 = false
            break
          }
        }
        if (isSame2) {
          return i
        }
      } else {
        if (a[key]) {
          return i
        }
      }
    }
    return -1
  }
  ,flatten: function(array) {
    var ary = []
    for (var i = 0; i < array.length; i++) {
      var a = array[i]
      if (Array.isArray(a)) {
        ary.push(...a)
      } else {
        ary.push(a)
      }
    }
    return ary
  }
  ,flattenDeep: function fDeep(array, ary = []) {
    for (var i = 0; i < array.length; i++) {
      var a = array[i]
      if (Array.isArray(a)) {
        fDeep(a, ary)
      } else {
        ary.push(a)
      }
    }
    return ary
  }
  ,flattenDepth: function fDepth(array, depth = 1, ary = []) {
    if (depth == 0) {
      ary.push(array)
    } else {
      for (var i = 0; i < array.length; i++) {
        var a = array[i]
        if (Array.isArray(a)) {
          fDepth(a, depth - 1, ary)
        } else {
          ary.push(a)
        }
      }
    }
    return ary
  }
  ,fromPairs: function(array) {
    var obj = {}
    for (var i = 0; i < array.length; i++) {
      obj[array[i][0]] = array[i][1]
    }
    return obj
  }
  ,head: function(array) {
    return array[0]
  }
  ,indexOf: function(array, val, fromIndex = 0) {
    for (var i = fromIndex; i < array.length;i ++) {
      if (array[i] == val) {
        return i
      }
    }
    return -1
  }
  ,initial: function(array) {
    return array.slice(0, array.length - 1)
  }
  ,intersection: function(...arrays) {
    var p = arguments
    var ary = []
    var a = p[0]
    for (var i = 0; i < a.length; i++) {
      var isAll = true
      for (var j = 1; j < p.length; j++) {
        if (!(p[j].includes(a[i]))) {
          isAll = false
          break
        }
      }
      if (isAll) {
        ary.push(a[i])
      }
    }
    return ary
  }
  ,intersectionBy: function(...arrays) {
    var p = Array.from(arguments).slice(0, -1)
    var ary = []
    var a = p[0]
    var iteratee = arguments[arguments.length - 1]
    for (var i = 0; i < a.length; i++) {
      if (typeof(iteratee) == 'function') {
        var b = iteratee(a[i])
        var isSame = true
        for (var j = 1; j < p.length; p++) {
          var isSame2 = false
          for (var k = 0; k < p[j].length; k++) {
            var c = iteratee(p[j][k])
            if (b == c) {
              isSame2 = true
              break
            }
          }
          if (!isSame2) {
            isSame = false
            break
          } else {
            break
          }
        }
        if (isSame) {
          ary.push(a[i])
        }
      } else {
        var b = a[i][iteratee]
        var isSame = true
        for (var j = 1; j < p.length; p++) {
          var isSame2 = false
          for (var k = 0; k < p[j].length; k++) {
            var c = p[j][k][iteratee]
            if (b == c) {
              isSame2 = true
              break
            }
          }
          if (!isSame2) {
            isSame = false
            break
          } else {
            break
          }
        }
        if (isSame) {
          ary.push(a[i])
        }
      }
    }
    return ary
  }
  ,intersectionWith: function(...arrays) {
    var p = Array.from(arguments).slice()
    var ary = []
    var a = p[0]
    var comparator = p[p.length - 1]
    for (var i = 0; i < a.length; i++) {
      var isSame = true
      for (var j = 1; j < p.length - 1; j++) {
        var isSame2 = false
        for (var k = 0; k < p[j].length; k++) {
          if (comparator(a[i], p[j][k])) {
            isSame2 = true
            break
          }
        }
        if (isSame2) {
          break
        } else {
          isSame = false
          break
        }
      }
      if (isSame2) {
        ary.push(a[i])
      }
    }
    return ary
  }
  ,join: function(array, separator) {
    return array.join(separator)
  }
  ,last: function(array) {
    return array[array.length - 1]
  }
  ,lastIndexOf: function(array, val, fromIndex = array.length - 1) {
    for (var i = fromIndex; i >= 0; i--) {
      if (array[i] == val) {
        return i
      }
    }
    return -1
  }
  ,nth: function(array, n = 0) {
    if (n >= 0) {
      return array[n]
    } else {
      return array[array.length - n]
    }
  }
    ,pull: function(array, ...vals) {
    var ary = []
    var p = Array.from(vals).slice()
    for (var i = 0; i < array.length; i++) {
      if (!(p.includes(array[i]))) {
        ary.push(array[i])
      }
    }
    return ary
  }
    ,pullAll: function(array, vals) {
    var ary = []
    for (var i = 0; i < array.length; i++) {
      if (!(vals.includes(array[i]))) {
        ary.push(array[i])
      }
    }
    return ary
  }
    ,pullAllBy: function(array, vals, iteratee) {
    var ary = []
    for (var i = 0; i < array.length; i++) {
      if (typeof(iteratee) == 'function') {
        var a = iteratee(array[i])
        var should = true
        for (var j = 0; j < vals.length; j++) {
          var b = iteratee(vals[j])
          if (a == b) {
            should = false
            break
          }
        }
        if (should) {
          ary.push(array[i])
        }
      } else {
        var a = array[i][iteratee]
        var should = true
        for (var j = 0; j < vals.length; j++) {
          var b = vals[j][iteratee]
          if (a == b) {
            should = false
            break
          }
        }
        if (should) {
          ary.push(array[i])
        }
      }
    }
   return ary
  }
  ,pullAllWith: function(array, vals, comparator) {
    var ary = []
    for (var i = 0; i < array.length; i++) {
      var should = true
      for (var j = 0; j < vals.length; j++) {
        if (comparator(array[i], vals[j])) {
          should = false
          break
        }
      }
      if (should) {
        ary.push(array[i])
      }
    }
    return ary
  }
  ,reverse: function(array) {
    var ary = []
    for (var i = array.length - 1; i >= 0; i--) {
      ary.push(array[i])
    }
    return ary
  }
  ,sortedIndex: function(array, val) {
    var start = 0
    var end = array.length - 1
    var mid = Math.floor((start + end) / 2)
    while (start < end - 1) {
      if (array[mid] >= val) {
        end = mid
        mid = Math.floor((start + end) / 2)
      } else {
        start = mid
        mid = Math.floor((start + end) / 2)
      }
    }
    if (array[start] > val) {
      return start
    } else if (array[end] < val) {
      return end + 1
    } else {
      return end
    }
  }
  ,sortedIndexBy: function(array, val, iterratee) {
    
  }
}