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
      path = path.split(/\[|\]\.|\]\[|\.|\]/)
    }
    var pre = obj
    var ary = []
    for (var i = 0; i < path.length; i++) {
      if (path[i] !== '') {
        ary.push(path[i])
      }
    }
    path = ary
    for (var i = 0; i < path.length - 1; i++) {
      if (!pre[path[i]]) {
        if (+path[i + 1] >= 0) {
          pre[path[i]] = []
        } else {
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
      if (val >= -Number.MAX_VALUE && val <= Number.MAX_VALUE) {
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
      if (val !== Infinity && val !== -Infinity) {
        if (Math.round(val) === val) {
          return true
        }
      }
    }
    return false
  }
  ,isLength: function(val) {
    if (typeof(val) == 'number') {
      if (val >= 0) {
        if (val !== Infinity) {
          if (Math.round(val) === val) {
            return true
          }
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
      if (!this.isEqual(object[key],source[key])) {
        return false
      }
    }
    return true
  }
  ,isMatchWith: function(object, source,customizer) {
    if (customizer == undefined) {
      return this.isMatch(object, source)
    }
    for (var key in source) {
      if (!customizer(object[key], source[key])) {
        return false
      }
    }
    return true
  }
  ,isNative: function(val) {
    return typeof(val) == 'function' && val.toString().includes('[native code]')
  }
  ,isNil: function(val) {
    return val === null || val === undefined
  }
  ,isNull: function(val) {
    return val === null
  }
  ,isNumber: function(val) {
    if (typeof(val) == 'number') {
      return true
    }
    if (typeof(val) == 'object') {
      if (typeof(val.valueOf()) == 'number') {
        return true
      }
    }
    return false
  }
  ,isObject: function(val) {
    if (val === null) {
      return false
    }
    return typeof(val) == 'object' || typeof(val) == 'function'
  }
  ,isObjectLike: function(val) {
    if (val === null) {
      return false
    }
    return typeof(val) == 'object'
  }
  ,isPlainObject: function(val) {
    if (val == null) {
      return false
    }
    return val.constructor === Object || val.__proto__ == null
  }
  ,isRegExp: function(val) {
    return typeof(val) == 'object' && Object.prototype.toString.call(val) == '[object RegExp]'
  }
  ,isSafeInteger: function(val) {
    if (typeof(val) == 'number') {
      if (parseInt(val) === val) {
        if (val >= 1 - 2 ** 53 && val <= 2 ** 53 - 1) {
          return true
        }
      }
    }
    return false
  }
  ,isSet: function(val) {
    return typeof(val) == 'object' && Object.prototype.toString.call(val) == '[object Set]'
  }
  ,isString: function(val) {
    if (typeof(val) == 'string') {
      return true
    }
    if (typeof(val) == 'object') {
      if (typeof(val.valueOf()) == 'string') {
        return true
      }
    }
    return false
  }
  ,isSymbol: function(val) {
    return typeof(val) == 'symbol'
  }
  ,isTypedArray: function(val) {
    return val instanceof Int8Array || val instanceof Uint8Array || val instanceof Uint8ClampedArray || val instanceof Int16Array || val instanceof Uint16Array || val instanceof Int32Array || val instanceof Uint32Array
  }
  ,isUndefined: function(val) {
    return val === undefined
  }
  ,isWeakMap: function(val) {
    return typeof(val) == 'object' && Object.prototype.toString.call(val) == '[object WeakMap]'
  }
  ,isWeakSet: function(val) {
    return typeof(val) == 'object' && Object.prototype.toString.call(val) == '[object WeakSet]'
  }
  ,lt: function(val, other) {
    return val < other
  }
  ,lte: function(val, other) {
    return val <= other
  }
  ,toArray: function(val) {
    var ary = []
    if (Array.isArray(val)) {
      ary = val.slice()
    } else if (typeof(val) == 'object') {
      for (var key in val) {
        ary.push(val[key])
      }
    } else if (typeof(val) == 'string') {
      ary = val.split('')
    }
    return ary
  }
  ,toFinite: function(val) {
    var a = +val
    if (a === a) {
      if (a < -Number.MAX_VALUE) {
        return -Number.MAX_VALUE
      } else if (a > Number.MAX_VALUE) {
        return Number.MAX_VALUE
      } else {
        return a
      }
    }
    return 0
  }
  ,toInteger: function(val) {
    var a = +val
    if (a === a) {
      if (a > Number.MAX_VALUE) {
        return Number.MAX_VALUE
      } else if (a < -Number.MAX_VALUE) {
        return -Number.MAX_VALUE
      } else {
        return Math.trunc(a)
      }
    }
    return 0
  }
  ,toLength: function(val) {
    var a = +val
    if (a === a) {
      var b = 2 ** 32 - 1
      if (a > b) {
        return b
      } else if (a < 0) {
        return 0
      } else {
        return Math.floor(a)
      }
    }
    return 0
  }
  ,toNumber: function(val) {
    return +val
  }
  ,toSafeInteger: function(val) {
    var a = +val
    if (a === a) {
      var b = 2 ** 53 - 1
      if (val > b) {
        return b
      } else if (val < -b) {
        return -b
      } else {
        return Math.trunc(a)
      }
    }
    return 0
  }
  ,assign: function(obj, source) {
    var p = Array.from(arguments).slice(1)
    for (var i = 0; i < p.length; i++) {
      var hasown = Object.prototype.hasOwnProperty
      for (var key in p[i]) {
        if (hasown.call(p[i], key)) {
          obj[key] = p[i][key]
        }
      }
    }
    return obj
  }
  ,add: function(a, b) {
    return a + b
  }
  ,ceil: function(n, p = 0) {
    return Math.ceil(n * 10 ** p) / (10 ** p)
  }
  ,divide: function(a, b) {
    return a / b
  }
  ,floor: function(n, p = 0) {
    return Math.floor(n * 10 ** p) / (10 ** p)
  }
  ,max: function(array) {
    if (array.length == 0) {
      return undefined
    }
    return Math.max(...array)
  }
  ,maxBy: function(array, f) {
    var ary
    if (typeof(f) == 'function') {
      ary = array.map(it => f(it))
    } else if (typeof(f) == 'string') {
      ary = array.map(it => it[f])
    }
    var max = Math.max(...ary)
    var idx = ary.indexOf(max)
    return array[idx]
  }
  ,mean: function(array) {
    if (array == undefined) {
      return NaN
    }
    return array.reduce((result, it) => {
      return result + it
    }, 0) / array.length
  }
  ,meanBy: function(array, f) {
    if (array == undefined) {
      return NaN
    }
    var ary
    if (typeof(f) == 'function') {
      ary = array.map(it => f(it))
    } else if (typeof(f) == 'string') {
      ary = array.map(it => it[f])
    }
    return ary.reduce((result, it) => {
      return result + it
    }, 0) / ary.length
  }
  ,min: function(array) {
    if (array.length == 0) {
      return undefined
    }
    return Math.min(...array)
  }
  ,minBy: function(array, f) {
    var ary
    if (typeof(f) == 'function') {
      ary = array.map(it => f(it))
    } else if (typeof(f) == 'string') {
      ary = array.map(it => it[f])
    }
    var min = Math.min(...ary)
    var idx = ary.indexOf(min)
    return array[idx]
  }
  ,multiply: function(a, b) {
    return a * b
  }
  ,round: function(n, p = 0) {
    return Math.round(n * 10 ** p) / (10 ** p)
  }
  ,subtract: function(a, b) {
    return a - b
  }
  ,sum: function(array) {
    return array.reduce((sum, it) => {
      return sum + it
    }, 0)
  }
  ,sumBy: function(array, f) {
    var ary
    if (typeof(f) == 'function') {
      ary = array.map(it => f(it))
    } else if (typeof(f) == 'string') {
      ary = array.map(it => it[f])
    }
    return ary.reduce((sum, it) => {
      return sum + it
    }, 0)
  }
  ,clamp: function(n, l, u) {
    if (n < l) {
      return l
    }
    if (n > u) {
      return u
    }
    return n
  }
  ,inRange: function(n, start = 0, end) {
    if (end == undefined) {
      end = start
      start = 0
    }
    return n >= start && n < end || n < start && n >= end
  }
  ,random: function(l = 0, u = 1, f = false) {
    var a = arguments.length
    if (a == 1) {
      var n = arguments[0]
      if (n == true) {
        return Math.random()
      } else if (n == false) {
        return Math.floor(Math.random() * 2)
      } else {
        if (this.isInteger(n)) {
          return Math.floor(Math.random() * (n + 1))
        }
        return Math.random() * n
      }
    } else if (a == 2) {
      var n = arguments[1]
      var m = arguments[0]
      if (n == true) {
        return Math.random() * m
      } else if (n == false) {
        if (this.isInteger(m)) {
          return Math.floor(Math.random() * (m + 1))
        }
        return Math.random() * m
      } else {
        if (this.isInteger(m) && this.isInteger(n)) {
          return Math.floor(Math.random() * (n - m + 1)) + m
        }
        return Math.random() * (n - m) + m
      }
    } else if (f || !this.isInteger(l) || !this.isInteger(u)) {
      return Math.random() * (u - l) + l
    } else {
      return Math.floor(Math.random() * (u - l + 1)) + l
    }
  }
  ,assignIn: function(obj, source) {
    var p = Array.from(arguments).slice(1)
    for (var i = 0; i < p.length; i++) {
      for (var key in p[i]) {
        obj[key] = p[i][key]
      }
    }
    return obj
  }
  ,get: function(obj, path, defaultvalue) {
    var result = obj
    if (typeof(path) == 'string') {
      path = path.split(/\[|\]\.|\]\[|\.|\]/)
    }
    for (var i = 0; i < path.length; i++) {
      if (path[i] !== '') {
        result = result[path[i]]
        if (result == undefined) {
          return defaultvalue
        }
      }
    }
    return result
  }
  ,at: function(obj, path) {
    var ary = []
    for (var i = 0; i < path.length; i++) {
      ary.push(this.get(obj, path[i]))
    }
    return ary
  }
  ,defaults: function(obj, source) {
    for (var key in source) {
      if (!(key in obj)) {
        obj[key] = source[key]
      }
    }
    return obj
  }
  ,defaultsDeep: function(obj, source) {
    for (var key in source) {
      if (typeof(source[key]) == 'object') {
        this.defaultsDeep(obj[key], source[key])
      } else {
        this.defaults(obj, source)
      }
    }
    return obj
  }
  ,findKey: function(obj, predicate) {
    for (var key in obj) {
      var a = obj[key]
      if (typeof(predicate) == 'function') {
        if (predicate(a)) {
          return key
        }
      } else if (typeof(predicate) == 'string') {
        if (a[predicate]) {
          return key
        }
      } else if (Array.isArray(predicate)) {
        var same = true
        for (var i = 0; i < predicate.length; i += 2) {
          if (a[predicate[i]] !== predicate[i + 1]) {
            same = false
            break
          }
        }
        if (same) {
          return key
        }
      } else if (typeof(predicate) == 'object') {
        var same = true
        for (var key2 in predicate) {
          if (a[key2] !== predicate[key2]) {
            same = false
            break
          }
        }
        if (same) {
          return key
        }
      }
    }
    return undefined
  }
  ,findLastKey: function(obj, predicate) {
    var ary = []
    for (var key in obj) {
      var a = obj[key]
      if (typeof(predicate) == 'function') {
        if (predicate(a)) {
          ary.push(key)
        }
      } else if (typeof(predicate) == 'string') {
        if (a[predicate]) {
          ary.push(key)
        }
      } else if (Array.isArray(predicate)) {
        var same = true
        for (var i = 0; i < predicate.length; i += 2) {
          if (a[predicate[i]] !== predicate[i + 1]) {
            same = false
            break
          }
        }
        if (same) {
          ary.push(key)
        }
      } else if (typeof(predicate) == 'object') {
        var same = true
        for (var key2 in predicate) {
          if (a[key2] !== predicate[key2]) {
            same = false
            break
          }
        }
        if (same) {
          ary.push(key)
        }
      }
    }
    return ary[ary.length - 1]
  }
  ,forIn: function(obj, iteratee) {
    for (var key in obj) {
      if (iteratee(obj[key], key, obj) === false) {
        break
      }
    }
    return obj
  }
  ,forInRight: function(obj, iteratee) {
    var ary = []
    for (var key in obj) [
      ary.push(key)
    ]
    for (var i = ary.length - 1; i >= 0; i--) {
      var key = ary[i]
      if (iteratee(obj[key], key, obj) === false) {
        break
      }
    }
    return obj
  }
  ,forOwn: function(obj, iteratee) {
    var hasown = Object.prototype.hasOwnProperty
    for (var key in obj) {
      if (hasown.call(obj, key)) {
        if (iteratee(obj[key], key, obj) === false) {
          break
        }
      }
    }
    return obj
  }
  ,forOwnRight: function(obj, iteratee) {
    var hasown = Object.prototype.hasOwnProperty
    var ary = []
    for (var key in obj) {
      if (hasown.call(obj, key)) {
        ary.push(key)
      }
    }
    for (var i = ary.length - 1; i >= 0; i--) {
      var key = ary[i]
      if (iteratee(obj[key], key, obj) === false) {
        break
      }
    }
    return obj
  }
  ,functions: function(obj) {
    var ary = []
    var hasown = Object.prototype.hasOwnProperty
    for (var key in obj) {
      if (hasown.call(obj, key)) {
        if (typeof(obj[key]) == 'function') {
          ary.push(key)
        }
      }
    }
    return ary
  }
  ,functionsIn: function(obj) {
    var ary = []
    for (var key in obj) {
      if (typeof(obj[key]) == 'function') {
        ary.push(key)
      }
    }
    return ary
  }
  ,has: function(obj, path) {
    var a = obj
    var hasown = Object.prototype.hasOwnProperty
    if (typeof(path) == 'string') {
      path = path.split('.')
    }
    for (var i = 0; i < path.length; i++) {
      if (!(hasown.call(a, path[i]))) {
        return false
      }
      a = a[path[i]]
    }
    return true
  }
  ,hasIn: function(obj, path) {
    var a = obj
    if (typeof(path) == 'string') {
      path = path.split('.')
    }
    for (var i = 0; i < path.length; i++) {
      if (!(path[i] in a)) {
        return false
      }
      a = a[path[i]]
    }
    return true
  }
  ,invert: function(obj) {
    var o = {}
    for (var key in obj) {
      o[obj[key]] = key
    }
    return o
  }
  ,invertBy: function(obj, iteratee) {
    var o = {}
    var okey
    for (var key in obj) {
      if (iteratee !== undefined) {
        okey = iteratee(obj[key])
      } else {
        okey = obj[key]
      }
      if (okey in o) {
        o[okey].push(key)
      } else {
        o[okey] = [key]
      }
    }
    return o
  }
  ,invoke: function(obj, path, ...args) {
    var ary = path.split('.')
    var f = ary.pop()
    path = ary.join('.')
    var val = this.get(obj, path)
    return val[f](...args)
  }
  ,keys: function(obj) {
    return Object.keys(obj)
  }
  ,keysIn: function(obj) {
    var ary = []
    for (var key in obj) {
      ary.push(key)
    }
    return ary
  }
  ,mapKeys: function(obj, iteratee) {
    var o = {}
    var okey
    for (var key in obj) {
      okey = iteratee(obj[key], key, obj)
      o[okey] = obj[key]
    }
    return o
  }
  ,mapValues: function(obj, iteratee) {
    var o = {}
    var val
    for (var key in obj) {
      if (typeof(iteratee) == 'function') {
        val = iteratee(obj[key])
      } else if (typeof(iteratee) == 'string') {
        val = obj[key][iteratee]
      }
      o[key] = val
    }
    return o
  }
  ,merge: function(obj, ...source) {
    for (var i = 0; i < source.length; i++) {
      var a = source[i]
      for (var key in a) {
        if (!(key in obj)) {
          obj[key] = a[key]
        } else {
          var b = obj[key]
          var c =a[key]
          if (typeof(b) == typeof(c) && typeof(b) == 'object') {
            this.merge(b, c)
          } else {
            b = c
          }
        }
      }
    }
    return obj
  }
  ,mergeWith: function(obj, source, customizer) {
    var p = Array.from(arguments)
    if (typeof(p[p.length - 1]) !== 'function') {
      source = p.slice(1, -1)
      return this.merge(obj, source)
    } else {
      customizer = p.pop()
      source = p.slice(1)
    }
    for (var i = 0; i < source.length; i++) {
      var a = source[i]
      for (var key in a) {
        if (key in obj) {
          obj[key] = customizer(obj[key], a[key], key, obj, a)
        } else {
          obj[key] = a[key]
        }
      }
    }
    return obj
  }
  ,omit: function(obj, path) {
    var o = {}
    for (var key in obj) {
      if (!(path.includes(key))) {
        o[key] = obj[key]
      }
    }
    return o
  }
  ,omitBy: function(obj, predicate) {
    var o = {}
    for (var key in obj) {
      if (!predicate(obj[key], key)) {
        o[key] = obj[key]
      }
    }
    return o
  }
  ,pick: function(obj, path) {
    var o = {}
    for (var key in obj) {
      if (path.includes(key)) {
        o[key] = obj[key]
      }
    }
    return o
  }
  ,pickBy: function(obj, predicate) {
    var o = {}
    for (var key in obj) {
      if (predicate(obj[key], key)) {
        o[key] = obj[key]
      }
    }
    return o
  }
  ,result: function(obj, path, defaultvalue) {
    var val = this.get(obj, path)
    if (typeof(val) == 'function') {
      return val()
    } else if (val == undefined) {
      if (typeof(defaultvalue) == 'function') {
        return defaultvalue()
      } else {
        return defaultvalue
      }
    } else {
      return val
    }
  }
  ,setWith: function(obj, path, val, customizer) {
    if (customizer == undefined || customizer() == undefined) {
      return this.set(obj, path, val)
    }
    if (typeof(path) == 'string') {
      path = path.split(/\[|\]\.|\]\[|\.|\]/)
    }
    var pre = obj
    var ary = []
    for (var i = 0; i < path.length; i++) {
      if (path[i] !== '') {
        ary.push(path[i])
      }
    }
    path = ary
    var i = 0
    for (i = 0; i < path.length - 2; i++) {
      if (!pre[path[i]]) {
        if (+path[i + 1] >= 0) {
          pre[path[i]] = []
        } else {
          pre[path[i]] = {}
        }
      }
      pre = pre[path[i]]
    }
    pre[path[i]] = customizer()
    pre = pre[path[i]]
    pre[path[i + 1]] = val
    return obj
  }
  ,toPairs: function(obj) {
    var ary = []
    if (this.isSet(obj)) {
      for (var val of obj) {
        ary.push([val, val])
      }
    } else if (this.isMap(obj)) {
      for (var val of obj) {
        ary.push(val)
      }
    } else {
      var keys = Object.keys(obj)
      for (var i = 0; i < keys.length; i++) {
        ary.push(keys[i], obj[keys[i]])
      }
    }
    return arys
  }
  ,toPairsIn: function(obj) {
    var ary = []
    if (this.isSet(obj)) {
      for (var val of obj) {
        ary.push([val, val])
      }
    } else if (this.isMap(obj)) {
      for (var val of obj) {
        ary.push(val)
      }
    } else {
      for (var key in obj) {
        ary.push(key, obj[key])
      }
    }
    return arys
  }
  ,transform: function(obj, iteratee, accumulator) {
    if (Array.isArray(obj)) {
      if (accumulator == undefined) {
        accumulator = []
      }
      for (var i = 0; i < obj.length; i++) {
        var a = iteratee(accumulator, obj[i], i, obj)
        if (this.isBoolean(a)) {
          if (a == false) {
            break
          }
        } else if (a !== undefined) {
          accumulator = a
        }
      }
    } else if (typeof(obj) == 'object') {
      if (accumulator == undefined) {
        accumulator = {}
      }
      for (var key in obj) {
        var a = iteratee(accumulator, obj[key], key, obj)
        if (this.isBoolean(a)) {
          if (a == false) {
            break
          }
        } else if (a !== undefined) {
          accumulator = a
        }
      }
    }
    return accumulator
  }
  ,
}