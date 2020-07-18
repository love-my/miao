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
    for (var i = 0; i< ary.length; i += size) {
      var ary2 = []
      for (var j = i; j < size + i && j < ary.length; j++) {
        ary2.push(ary[j])
      }
      result.push(ary2)
    }
    return result
  }

  ,compact: function(array) {
    var ary = []
    for (var i = 0; i < array.length; i++) {
      var a = array[i]
      if (a !== 0 && a !== '' && a !== null && a !== undefined && a !== false && a == a) {
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

  ,difference: function(array, vals) {
    var ary = []
    var p = Array.from(arguments).slice(1)
    var vals = []
    for (var i = 0; i < p.length; i++) {
      vals.push(...p[i])
    }
    for (var i = 0; i < array.length; i++) {
      if (!(vals.includes(array[i]))) {
        ary.push(array[i])
      }
    }
    return ary
  }

  ,differenceBy: function(array, vals, dif) {
    var ary = []
    var p = Array.from(arguments).slice(1)
    var dif = p[p.length - 1]
    var vals = []
    for (var i = 0; i < p.length - 1; i++) {
      vals.push(...p[i])
    }
    if (Array.isArray(dif)) {
      vals.push(...dif)
      for (var i = 0; i < array.length; i++) {
        var should = true
        for (var j = 0; j < vals.length; j++) {
          if (array[i] == vals[j]) {
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
    for (var i = 0; i < array.length; i++) {
      if (typeof(dif) == 'function') {
        var a = dif(array[i])
        var should = true
        for (var j = 0; j < vals.length; j++) {
          if (dif(vals[j]) == a) {
            should = false
            break
          }
        }
        if (should) {
          ary.push(array[i])
        }
      } else {
        var a = array[i][dif]
        var should = true
        for (var j = 0; j < vals.length; j++) {
          if (vals[j][dif] == a) {
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

  ,differenceWith: function(array, vals, compare) {
    var ary = []
    var p = Array.from(arguments).slice(1)
    var compare = p[p.length - 1]
    var vals = []
    for (var i = 0; i < p.length - 1; i++) {
      vals.push(...p[i])
    }
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < vals.length; j++) {
        if (!compare(array[i], vals[j])) {
          ary.push(array[i])
        }
      }
    }
    return ary
  }

  ,drop: function(array, n = 1) {
    return array.slice(n)
  }

  ,dropRight: function(array, n = 1) {
    if (n > array.length) {
      return []
    }
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
    for (var i = 0; i < array.length; i++) {
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
        if (a[predicate]) {
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
        if (a[predicate]) {
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
      ary.push(...array)
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
      return array[array.length + n]
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
  ,sortedIndexBy: function(array, val, iteratee) {
    for (var i = 0; i < array.length; i++) {
      if (typeof(iteratee) == 'function') {
        var a = iteratee(array[i])
        var b = iteratee(val)
      } else {
        var a = array[i][iteratee]
        var b = val[iteratee]
      }
      if (a >= b) {
        return i
      }
    }
    return -1
  }
  ,sortedIndexOf: function(array, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] >= val) {
        return i
      }
    }
    return -1
  }
  ,sortedLastIndex: function(array, val) {
    var start = 0
    var end = array.length - 1
    var mid = Math.floor((start + end) / 2)
    while (start < end - 1) {
      if (array[mid] > val) {
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
  ,sortedLastIndexBy: function(array, val, iteratee) {
    for (var i = array.length - 1; i >= 0; i--) {
      if (typeof(iteratee) == 'function') {
        var a = iteratee(array[i])
        var b = iteratee(val)
      } else {
        var a = array[i][iteratee]
        var b = val[iteratee]
      }
      if (a <= b) {
        return i + 1
      }
    }
    return -1
  }
  ,sortedLastIndexOf: function(array, val) {
    var start = 0
    var end = array.length - 1
    var mid
    while (start < end - 1) {
      mid = Math.floor((start + end) / 2)
      if (val == array[mid] && val < array[mid + 1]) {
        return mid
      } else if (val >= array[mid]) {
        start = mid
      } else {
        end = mid
      }
    }
    return -1
  }
  ,sortedUniq(array) {
    var ary = []
    if (array.length == 0) {
      ary = []
    } else {
      ary.push(array[0])
      for (var i = 1; i < array.length; i++) {
        if (array[i] !== array[i - 1]) {
          ary.push(array[i])
        }
      }
    }
    return ary
  }
  ,sortedUniqBy: function(array, iteratee) {
    var ary = []
    if (array.length == 0) {
      ary = []
    } else {
      ary.push(array[0])
      for (var i = 1; i < array.length; i++) {
        if (iteratee(array[i]) !== iteratee(array[i - 1])) {
          ary.push(array[i])
        }
      }
    }
    return ary
  }
  ,tail: function(array) {
    return array.slice(1)
  }
  ,take: function(array, n = 1) {
    return array.slice(0, n)
  }
  ,takeRight: function(array, n = 1) {
    return array.slice(array.length - n < 0 ? 0 : array.length - n,array.length)
  }
  ,takeRightWhile: function(array, predicate) {
    var ary = []
    for (var i = array.length - 1; i >= 0; i--) {
      var a = array[i]
      if (typeof(predicate) == 'function') {
        if (predicate(a)) {
          ary.unshift(a)
        } else {
          return ary
        }
      } else if (Array.isArray(predicate)) {
        for (var j = 0; j < predicate.length; j += 2) {
          if (a[predicate[j]] !== predicate[j + 1]) {
            return ary
          }
        }
        ary.unshift(a)
      } else if (typeof(predicate) == 'object') {
        for (var key in predicate) {
          if (a[key] !== predicate[key]) {
            return ary
          }
        }
        ary.unshift(a)
      } else {
        if (a[predicate]) {
          ary.unshift(a)
        } else {
          return ary
        }
      }
    }
  }
  ,takeWhile: function(array, predicate) {
    var ary = []
    for (var i = 0; i < array.length; i++) {
      var a = array[i]
      if (typeof(predicate) == 'function') {
        if (predicate(a)) {
          ary.push(a)
        } else {
          return ary
        }
      } else if (Array.isArray(predicate)) {
        for (var j = 0; j < predicate.length; j += 2) {
          if (a[predicate[j]] !== predicate[j + 1]) {
            return ary
          }
        }
        ary.push(a)
      } else if (typeof(predicate) == 'object') {
        for (var key in predicate) {
          if (a[key] !== predicate[key]) {
            return ary
          }
        }
        ary.push(a)
      } else {
        if (a[predicate]) {
          ary.push(a)
        } else {
          return ary
        }
      }
    }
  }
  ,union: function(arrays) {
    var p = Array.from(arguments)
    var ary = []
    for (var i = 0; i < p.length; i++) {
      for (var j = 0; j < p[i].length; j++) {
        if (!(ary.includes(p[i][j]))) {
          ary.push(p[i][j])
        }
      }
    }
    return ary
  }
  ,unionBy: function(arrays, iteratee) {
    var ary = []
    var ary2 = []
    var p = Array.from(arguments)
    var iter = p[p.length - 1]
    for (var i = 0; i< p.length - 1; i++) {
      for (var j = 0; j< p[i].length; j++) {
        if (typeof(iter) == 'function') {
          if (!(ary2.includes(iter(p[i][j])))) {
            ary.push(p[i][j])
            ary2.push(iter(p[i][j]))
          }
        } else {
          if (!(ary2.includes(p[i][j][iter]))) {
            ary.push(p[i][j])
            ary2.push(p[i][j][iter])
          }
        }
      }
    }
    return ary
  }
  ,unionWith: function(arrays, comparator) {
    var ary = []
    var p = Array.from(arguments)
    var comparator = p[p.length - 1]
    for (var i = 0; i < p.length - 1; i++) {
      for (var j = 0; j < p[i].length; j++) {
        if (ary.length == 0) {
          ary.push(p[i][j])
        } else {
          var should = true
          for (var k = 0; k < ary.length; k++) {
            if (comparator(ary[k], p[i][j])) {
              should = false
              break
            }
          }
          if (should) {
            ary.push(p[i][j])
          }
        }
      }
    }
    return ary
  }
  ,uniq: function(array) {
    var ary = []
    for (var i = 0; i < array.length; i++) {
      if (!(ary.includes(array[i]))) {
        ary.push(array[i])
      }
    }
    return ary
  }
  ,uniqBy: function(array, iteratee) {
    var ary = []
    var ary2 = []
    for (var i = 0; i < array.length; i++) {
      if (typeof(iteratee) == 'function') {
        if (!(ary2.includes(iteratee(array[i])))) {
          ary.push(array[i])
          ary2.push(iteratee(array[i]))
        }
      } else {
        if (!(ary2.includes(array[i][iteratee]))) {
          ary.push(array[i])
          ary2.push(array[i][iteratee])
        }
      }
    }
    return ary
  }
  ,uniqWith: function(array, comparator) {
    var ary = []
    for (var i = 0; i < array.length; i++) {
      if (ary.length == 0) {
        ary.push(array[i])
      } else {
        var should = true
        for (var j = 0; j < ary.length; j++) {
          if (comparator(array[i], ary[j])) {
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
  ,unzip: function(array) {
    var ary = []
    var ary2 = []
    for (var i = 0; i < array[0].length; i++) {
      for (var j = 0; j < array.length; j++) {
        ary2.push(array[j][i])
      }
      ary.push(ary2)
      ary2 = []
    }
    return ary
  }
  ,unzipWith: function(array, iteratee) {
    var ary = []
    for (var i = 0; i < array[0].length; i++) {
      ary.push(iteratee(array[array.length - 1][i], array[0][i]))
    }
    return ary
  }
  ,without: function(array, vals) {
    var ary = []
    var p = Array.from(arguments).slice(1)
    for (var i = 0; i < array.length; i++) {
      if (!(p.includes(array[i]))) {
        ary.push(array[i])
      }
    }
    return ary
  }
  ,xor: function(arrays) {
    var ary = []
    var ary2 = []
    var q = Array.from(arguments)
    for (var i = 0; i < q.length; i++) {
      ary2.push(...q[i])
    }
    for (var i = 0; i < ary2.length; i++) {
      if (ary2[i] !== undefined) {
        var same = false
        for (var j = i + 1; j < ary2.length; j++) {
          if (ary2[j] == ary2[i]) {
            ary2[j] = undefined
            same = true
          }
        }
        if (!same) {
          ary.push(ary2[i])
        }
      }
    }
    return ary
  }
  ,xorBy: function(arrays, iteratee) {
    var ary = []
    var ary2 = []
    var q = Array.from(arguments)
    var iter = q[q.length - 1]
    for (var i = 0; i < q.length - 1; i++) {
      ary2.push(...q[i])
    }
    for (var i = 0; i < ary2.length; i++) {
      if (ary2[i] !== undefined) {
        var same = false
        if (typeof(iter) == 'function') {
          var a = iter(ary2[i])
          for (var j = i + 1; j < ary2.length; j++) {
            if (iter(ary2[j]) == a) {
              ary2[j] = undefined
              same = true
            }
          }
        } else {
          var a = ary2[i][iter]
          for (var j = i + 1; j < ary2.length; j++) {
            if (ary2[j] !== undefined) {
              if (ary2[j][iter] == a) {
                ary2[j] = undefined
                same = true
              }
            }
          }
        }
        if (!same) {
          ary.push(ary2[i])
        }
      }
    }
    return ary
  }
  ,xorWith: function(arrays, comparator) {
    var ary = []
    var p = Array.from(arguments)
    var comparator = p.pop()
    var ary2 = []
    for (var i = 0; i < p.length; i++) {
      ary2.push(...p[i])
    }
    for (var i = 0; i < ary2.length; i++) {
      if (ary2[i] !== undefined) {
        var same = false
        var a = ary2[i]
        for (var j = i + 1; j < ary2.length; j++) {
          if (comparator(a, ary2[j])) {
            ary2[j] = undefined
            same = true
          }
        }
        if (!same) {
          ary.push(ary2[i])
        }
      }
    }
    return ary
  }
  ,zip: function(arrays) {
    var p = Array.from(arguments)
    var ary = []
    var ary2 = []
    for (var i = 0; i < p[0].length; i++) {
      for (var j = 0; j < p.length; j++) {
        ary2.push(p[j][i])
      }
      ary.push(ary2)
      ary2 = []
    }
    return ary
  }
  ,zipObject: function(array, val) {
    var obj = {}
    for (var i = 0; i < array.length; i++) {
      obj[array[i]] = val[i]
    }
    return obj
  }
  ,zipObjectDeep: function(array, aryval) {
    var obj = {}
    for (var i = 0; i < array.length; i++) {
      this.set(obj, array[i], aryval[i])
    }
    return obj
  }
  ,zipWith: function(arrays, iteratee) {
    var ary = []
    var p = Array.from(arguments)
    var iteratee = p.pop()
    var ary2 = []
    for (var i = 0; i < p[0].length; i++) {
      ary2 = []
      for (var j = 0; j < p.length; j++) {
        ary2.push(p[j][i])
      }
      ary[i] = iteratee(...ary2)
    }
    return ary
  }
  ,set: function(obj = {}, path, val) {
    if (typeof(path) == 'string') {
      path = path.split(/\[|\]\.|\./)
    }
    var pre = obj
    for (var i = 0; i < path.length - 1; i++) {
      if (path[i + 1] >= 0 && path[i + 1] <= 9) {
        if (!pre[path[i]]) {
          pre[path[i]] = []
        }
      } else {
        if (!pre[path[i]]) {
          pre[path[i]] = {}
        }
      }
      pre = pre[path[i]]
    }
    pre[path[i]] = val
    return obj
  }
  ,countBy: function(collection, iteratee) {
    if (Array.isArray(collection)) {
      var result = {}
      for (var i = 0; i< collection.length; i++) {
        if (collection[i] !== undefined) {
          if (typeof(iteratee) == 'function') {
            var key = iteratee(collection[i])
            var count = 1
            for (var j = i + 1; j < collection.length; j++) {
              if (iteratee(collection[j]) == key) {
                count++
                collection[j] = undefined
              }
            }
          } else {
            var key = collection[i][iteratee]
            var count = 1
            for (var j = i + 1; j < collection.length; j++) {
              if (collection[j][iteratee] == key) {
                count++
                collection[j] = undefined
              }
            }
          }
          result[key] = count
        }
      }
    }
    return result
  }
  ,every: function(collection, predicate) {
    if (Array.isArray(collection)) {
      if (collection.length == 0) {
        return true
      }
      for (var i = 0; i < collection.length; i++) {
        var a = collection[i]
        if (typeof(predicate) == 'function') {
          if (predicate(a) == false) {
            return false
          }
        } else if (typeof(predicate) == 'string') {
          if (a[predicate] == false) {
            return false
          }
        } else if (Array.isArray(predicate)) {
          for (var i = 0; i < predicate.length; i += 2) {
            if (a[predicate[i]] !== predicate[i + 1]) {
              return false
            }
          }
        } else if (typeof(predicate) == 'object') {
          for (var key in predicate) {
            if (a[key] !== predicate[key]) {
              return false
            }
          }
        }
      }
    } else {
      if (Object.keys(collection).length == 0) {
        return true
      }
      if (typeof(predicate) == 'string') {
        if (collection[predicate] == false) {
          return false
        }
      } else if (Array.isArray(predicate)) {
        for (var i = 0; i < predicate.length; i += 2) {
          if (collection[predicate[i]] !== predicate[i + 1]) {
            return false
          }
        }
      } else if (typeof(predicate) == 'object') {
        for (var key in predicate) {
          if (collection[key] !== predicate[key]) {
            return false
          }
        }
      }
    }
    return true
  }
  ,filter: function(collection, predicate) {
    var ary = []
    for (var i = 0; i < collection.length; i++) {
      var a = collection[i]
      if (typeof(predicate) == 'function') {
        if (predicate(a)) {
          ary.push(a)
        }
      } else if (typeof(predicate) == 'string') {
        if (a[predicate]) {
          ary.push(a)
        }
      } else if (Array.isArray(predicate)) {
        var same = true
        for (var j = 0; j < predicate.length; j += 2) {
          if (a[predicate[j]] !== predicate[j + 1]) {
            same = false
            break
          }
        }
        if (same) {
          ary.push(a)
        }
      } else if (typeof(predicate) == 'object') {
        var same = true
        for (var key in predicate) {
          if (a[key] !== predicate[key]) {
            same = false
            break
          }
        }
        if (same) {
          ary.push(a)
        }
      }
    }
    return ary
  }
  ,find: function(collection, predicate) {
    for (var i = 0; i < collection.length; i++) {
      var a = collection[i]
      if (typeof(predicate) == 'function') {
        if (predicate(a)) {
          return a
        }
      } else if (typeof(predicate) == 'string') {
        if (a[predicate]) {
          return a
        }
      } else if (Array.isArray(predicate)) {
        var same = true
        for (var j = 0; j < predicate.length; j += 2) {
          if (a[predicate[j]] !== predicate[j + 1]) {
            same = false
            break
          }
        }
        if (same) {
          return a
        }
      } else if (typeof(predicate) == 'object') {
        var same = true
        for (var key in predicate) {
          if (a[key] !== predicate[key]) {
            same = false
            break
          }
        }
        if (same) {
          return a
        }
      }
    }
    return undefined
  }
  ,findLast: function(collection, predicate) {
    for (var i = collection.length - 1; i >= 0; i--) {
      var a = collection[i]
      if (typeof(predicate) == 'function') {
        if (predicate(a)) {
          return a
        }
      } else if (typeof(predicate) == 'string') {
        if (a[predicate]) {
          return a
        }
      } else if (Array.isArray(predicate)) {
        var same = true
        for (var j = 0; j < predicate.length; j += 2) {
          if (a[predicate[j]] !== predicate[j + 1]) {
            same = false
            break
          }
        }
        if (same) {
          return a
        }
      } else if (typeof(predicate) == 'object') {
        var same = true
        for (var key in predicate) {
          if (a[key] !== predicate[key]) {
            same = false
            break
          }
        }
        if (same) {
          return a
        }
      }
    }
    return undefined
  }
  ,flatMap: function(collection, iteratee) {
    var ary = []
    for (var i = 0; i < collection.length; i++) {
      var a = iteratee(collection[i])
      ary.push(...a)
    }
    return ary
  }
  ,flatMapDeep: function(collection, iteratee) {
    var ary = []
    for (var i = 0; i < collection.length; i++) {
      var a = iteratee(collection[i])
      while (Array.isArray(a[0])) {
        a = a[0]
      }
      ary.push(...a)
    }
    return ary
  }
  ,flatMapDepth: function(collection, iteratee, depth = 1) {
    var ary = []
    var d = depth
    for (var i = 0; i < collection.length; i++) {
      var a = iteratee(collection[i])
      d = depth
      while (Array.isArray(a) && d > 0) {
        a = a[0]
        d--
      }
      ary.push(a)
    }
    return ary
  }
  ,forEach: function(collection, iteratee) {
    if (Array.isArray(collection)) {
      for (var val of collection) {
        iteratee(val)
      }
    } else {
      for (var key in collection) {
        iteratee(key)
      }
    }
    return collection
  }
  ,forEachRight: function(collection, iteratee) {
    for (var i = collection.length - 1; i >= 0; i--) {
      iteratee(collection[i])
    }
    return collection
  }
  ,groupBy: function(collection, iteratee) {
    var obj = {}
    var key = ''
    var ary = []
    for (var i = 0; i < collection.length; i++) {
      var a = collection[i]
      if (a !== undefined) {
        ary = [a]
        if (typeof(iteratee) == 'function') {
          var key = iteratee(a)
          for (var j = i + 1; j < collection.length; j++) {
            if (iteratee(collection[j]) == key) {
              ary.push(collection[j])
              collection[j] = undefined
            }
          }
        } else if (typeof(iteratee) == 'string') {
          var key = a[iteratee]
          for (var j = i + 1; j < collection.length; j++) {
            if (collection[j][iteratee] == key) {
              ary.push(collection[j])
              collection[j] = undefined
            }
          }
        }
        obj[key] = ary
      }
    }
    return obj
  }
  ,includes: function(collection, value, fromIndex = 0) {
    if (Array.isArray(collection)) {
      for (var i = fromIndex; i < collection.length; i++) {
        if (collection[i] == value) {
          return true
        }
      }
    } else if (typeof(collection) == 'object') {
      for (var key in collection) {
        if (collection[key] == value) {
          return true
        }
      }
    } else if (typeof(collection) == 'string') {
      for (var i = fromIndex; i < collection.length - value.length + 1; i++) {
        if (collection.slice(i, i + value.length) == value) {
          return true
        }
      }
    }
    return false
  }
  ,invokeMap: function(collection, path, ...arys) {
    var ary = []
    for (var i = 0; i < collection.length; i++) {
      if (typeof(path) == 'string') {
        ary.push(collection[i][path]())
      } else if (typeof(path) == 'function') {
        ary.push(path.call(collection[i], ...arys))
      }
    }
    return ary
  }
  ,keyBy: function(collection, iteratee) {
    var obj = {}
    var key
    for (var i = 0; i < collection.length; i++) {
      var a = collection[i]
      if (typeof(iteratee) == 'function') {
        key = iteratee(a)
      } else if (typeof(iteratee) == 'string') {
        key = a[iteratee]
      }
      obj[key] = a
    }
    return obj
  }
  ,map: function(collection, iteratee) {
    var ary = []
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        var a = collection[i]
        if (typeof(iteratee) == 'function') {
          ary.push(iteratee(a, i, collection))
        } else if (typeof(iteratee) == 'string') {
          var s = iteratee.split('.')
          var b = a
          for (var j = 0; j < s.length; j++) {
            b = b[s[j]]
          }
          ary.push(b)
        }
      }
    } else if (typeof(collection) == 'object') {
      for (var key in collection) {
        if (typeof(iteratee) == 'function') {
          ary.push(iteratee(collection[key]))
        }
      }
    }
    return ary
  }
  ,orderBy: function(collection, iteratee, orders = ['asc','asc']) {
    var ary = collection.slice()
    for (var i = orders.length - 1; i >= 0; i--) {
      if (orders[i] == 'asc') {
        ary.sort((a, b) => {
          if (a[iteratee[i]] > b[iteratee[i]]) {
            return 1
          } else if (a[iteratee[i]] < b[iteratee[i]]) {
            return -1
          } else {
            return 0
          }
        })
      } else {
        ary.sort((a, b) => {
          if (a[iteratee[i]] < b[iteratee[i]]) {
            return 1
          } else if (a[iteratee[i]] > b[iteratee[i]]) {
            return -1
          } else {
            return 0
          }
        })
      }
    }
    return ary
  }
  ,partition: function(collection, predicate) {
    var ary = []
    var arytrue = []
    var aryfalse = []
    for (var i = 0; i < collection.length; i++) {
      var a = collection[i]
      if (typeof(predicate) == 'function') {
        if (predicate(a)) {
          arytrue.push(a)
        } else {
          aryfalse.push(a)
        }
      } else if (typeof(predicate) == 'string') {
        if (a[predicate]) {
          arytrue.push(a)
        } else {
          aryfalse.push(a)
        }
      } else if (Array.isArray(predicate)) {
        var same = true
        for (var j = 0; j < predicate.length; j += 2) {
          if (a[predicate[j]] !== predicate[j + 1]) {
            aryfalse.push(a)
            same = false
            break
          }
        }
        if (same) {
          arytrue.push(a)
        }
      } else if (typeof(predicate) == 'object') {
        var same = true
        for (var key in predicate) {
          if (a[key] !== predicate[key]) {
            aryfalse.push(a)
            same = false
            break
          }
        }
        if (same) {
          arytrue.push(a)
        }
      }
    }
    ary.push(arytrue.slice(), aryfalse.slice())
    return ary
  }
  ,reduce: function(collection, iteratee, initial) {
    var start = 0
    var result = initial
    if (initial == undefined) {
      result = collection[start]
      start = 1
    }
    if (Array.isArray(collection)) {
      for (var i = start; i < collection.length; i++) {
        result = iteratee(result, collection[i], i, collection)
      }
    } else if (typeof(collection) == 'object') {
      for (var key in collection) {
        result = iteratee(result, collection[key], key, collection)
      }
    }
    return result
  }
  ,reduceRight: function(collection, iteratee, initial) {
    var start = collection.length - 1
    var result = initial
    if (initial == undefined) {
      result = collection[start]
      start = collection.length - 2
    }
    if (Array.isArray(collection)) {
      for (var i = start; i >= 0; i--) {
        result = iteratee(result, collection[i], i, collection)
      }
    } else if (typeof(collection) == 'object') {
      for (var key in collection) {
        result = iteratee(result, collection[key], key, collection)
      }
    }
    return result
  }
  ,reject: function(collection, predicate) {
    var ary = []
    for (var i = 0; i < collection.length; i++) {
      var a = collection[i]
      if (typeof(predicate) == 'function') {
        if (!(predicate(a))) {
          ary.push(a)
        }
      } else if (typeof(predicate) == 'string') {
        if (!a[predicate]) {
          ary.push(a)
        }
      } else if (Array.isArray(predicate)) {
        for (var j = 0; j < predicate.length; j += 2) {
          if (a[predicate[j]] !== predicate[j + 1]) {
            ary.push(a)
            break
          }
        }
      } else if (typeof(predicate) == 'object') {
        for (var key in predicate) {
          if (a[key] !== predicate[key]) {
            ary.push(a)
            break
          }
        }
      }
    }
    return ary
  }
  ,sample: function(collection) {
    var i = Math.floor(Math.random() * collection.length)
    return collection[i]
  }
  ,sampleSize: function(collection, n = 1) {
    var ary = []
    var ary2 = collection
    var j
    for (var i = 0; i < n && i < collection.length; i++) {
      j = Math.floor(Math.random() * ary2.length)
      ary.push(ary2[j])
      ary2 = ary2.slice(0, j).concat(ary2.slice(j + 1))
    }
    return ary
  }
  ,shuffle: function(collection) {
    var ary = []
    var ary2 = collection
    var j
    for (var i = 0; i < collection.length; i++) {
      j = Math.floor(Math.random() * ary2.length)
      ary.push(ary2[j])
      ary2 = ary2.slice(0, j).concat(ary2.slice(j + 1))
    }
    return ary
  }
  ,size: function(collection) {
    if (typeof(collection) == 'string') {
      return collection.length
    } else if (Array.isArray(collection)) {
      return collection.length
    } else if (typeof(collection) == 'object') {
      return Object.keys(collection).length
    }
  }
  ,some: function(collection, predicate) {
    for (var i = 0; i < collection.length; i++) {
      var a = collection[i]
      if (typeof(predicate) == 'function') {
        if (predicate(a)) {
          return true
        }
      } else if (typeof(predicate) == 'string') {
        if (a[predicate]) {
          return true
        }
      } else if (Array.isArray(predicate)) {
        var same = true
        for (var j = 0; j < predicate.length; j += 2) {
          if (a[predicate[j]] !== predicate[j + 1]) {
            same = false
            break
          }
        }
        if (same) {
          return true
        }
      } else if (typeof(predicate) == 'object') {
        var same = true
        for (var key in predicate) {
          if (a[key] !== predicate[key]) {
            same = false
            break
          }
        }
        if (same) {
          return true
        }
      }
    }
    return false
  }
  ,sortBy: function(collection, iteratee) {
    var ary = collection.slice()
    for (var i = 0; i < iteratee.length; i++) {
      var by = iteratee[i]
      if (typeof(by) == 'function') {
        ary.sort((a, b) => {
          if (by(a) > by(b)) {
            return 1
          } else if (by(a) < by(b)) {
            return -1
          } else {
            return 0
          }
        })
      } else if (typeof(by) == 'string') {
        ary.sort((a, b) => {
          if (a[by] > b[by]) {
            return 1
          } else if (a[by] < b[by]) {
            return -1
          } else {
            return 0
          }
        })
      }
    }
    return ary
  }
  ,defer: function(func, args) {
    return func(args)
  }
  ,delay: function(func, wait, args) {
    setTimeout(() => {
      func(args)
    }, wait);
  }
  ,castArray: function(val) {
    if (arguments.length == 0) {
      return []
    }
    if (Array.isArray(val)) {
      return val
    }
    return [val]
  }
  ,conformsTo: function(object, source) {
    for (var key in source) {
      if (source[key](object[key])) {
        return true
      }
      return false
    }
  }
  ,eq: function(val, other) {
    if (val !== val && other !== other) {
      return true
    }
    return val === other
  }
  ,gt: function(val, other) {
    return val > other
  }
  ,gte: function(val, other) {
    return val >= other
  }
  ,isArguments: function(val) {
    return typeof(val) === 'object' && val.toString() === '[object Arguments]'
  }
  ,isArray: function(val) {
    return Array.isArray(val)
  }
  ,isArrayBuffer: function(val) {
    return val.toString() === '[object ArrayBuffer]'
  }
  ,isArrayLike: function(val) {
    return typeof(val) !== 'function' && val.length >= 0
  }
  ,isArrayLikeObject: function(val) {
    return typeof(val) == 'object'
  }
  ,isBoolean: function(val) {
    if (val == null || val == undefined) {
      return false
    }
    return val.valueOf() === false || val.valueOf() === true
  }
  ,isDate: function(val) {
    return typeof(val) === 'object' && Object.prototype.toString.call(val) === "[object Date]"
  }
  ,isElement: function(val) {
    return typeof(a) === 'object' && Object.prototype.toString.call(val) === "[object HTMLBodyElement]"
  }
  ,isEmpty: function(val) {
    if (val === null) {
      return true
    }
    if (typeof(val) == 'object' || typeof(val) == 'string') {
      return false
    }
    return true
  }
  ,isEqual: function(val, other) {
    if (val !== val && other !== other) {
      return true
    }
    if (val === other) {
      return true
    }
    if (val === null) {
      return other === null
    } else if (other === null) {
      return false
    }
    var a = typeof(val)
    var b = typeof(other)
    if (a === b) {
      if (a == 'object') {
        var c = Object.keys(val).length
        var d = Object.keys(other).length
        if (c == d) {
          for (var key in a) {
            if (a[key] !== b[key]) {
              return false
            }
          }
          return true
        }
      }
    return false
    }
  }
  ,isEqualWith: function(val, other, customizer) {
    if (customizer == undefined) {
      return this.isEqual(val, other)
    }
    var a = typeof(val)
    var b = typeof(other)
    if (a == b) {
      if (a == 'object') {
        var c = Object.keys(val).length
        var d = Object.keys(other).length
        if (c == d) {
          for (var key in val) {
            if (customizer(val[key], other[key])) {
              return true
            }
          }
        }
        return false
      } else {
        return customizer(val, other)
      }
    }
    return false
  }
  ,isError: function(val) {
    return typeof(val) == 'object' && Object.prototype.toString.call(val) == '[object Error]'
  }
  ,isFinite: function(val) {
    if (typeof(val) == 'number') {
      if (val >= Number.MIN_VALUE && val <= Number.MAX_VALUE) {
        return true
      }
    }
    return false
  }
  ,isFunction: function(val) {
    return typeof(val) == 'function'
  }
  ,isInteger: function(val) {
    if (typeof(val) == 'number') {
      if (parseInt(val) === val) {
        return true
      }
    }
    return false
  }
  ,isLength: function(val) {
    if (typeof(val) == 'number') {
      if (val >= 0) {
        if (parseInt(val) === val) {
          return true
        }
      }
    }
    return false
  }
  ,isMap: function(val) {
    return typeof(val) == 'object' && Object.prototype.toString.call(val) == '[object Map]'
  }
  ,isMatch: function(object, source) {
    for (var key in source) {
      if (object[key] !== source[key]) {
        return false
      }
    }
    return true
  }
}