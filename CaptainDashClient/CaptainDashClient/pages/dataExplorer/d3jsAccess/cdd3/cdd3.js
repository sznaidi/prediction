d3 = function() {
  var π = Math.PI, ε = 1e-6, d3 = {
    version: "3.0.6"
  }, d3_radians = π / 180, d3_degrees = 180 / π, d3_document = document, d3_window = window;
  function d3_target(d) {
    return d.target;
  }
  function d3_source(d) {
    return d.source;
  }
  var d3_format_decimalPoint = ".", d3_format_thousandsSeparator = ",", d3_format_grouping = [ 3, 3 ];
  if (!Date.now) Date.now = function() {
    return +new Date();
  };
  try {
    d3_document.createElement("div").style.setProperty("opacity", 0, "");
  } catch (error) {
    var d3_style_prototype = d3_window.CSSStyleDeclaration.prototype, d3_style_setProperty = d3_style_prototype.setProperty;
    d3_style_prototype.setProperty = function(name, value, priority) {
      d3_style_setProperty.call(this, name, value + "", priority);
    };
  }
  function d3_class(ctor, properties) {
    try {
      for (var key in properties) {
        Object.defineProperty(ctor.prototype, key, {
          value: properties[key],
          enumerable: false
        });
      }
    } catch (e) {
      ctor.prototype = properties;
    }
  }
  var d3_array = d3_arraySlice;
  function d3_arrayCopy(pseudoarray) {
    var i = -1, n = pseudoarray.length, array = [];
    while (++i < n) array.push(pseudoarray[i]);
    return array;
  }
  function d3_arraySlice(pseudoarray) {
    return Array.prototype.slice.call(pseudoarray);
  }
  try {
    d3_array(d3_document.documentElement.childNodes)[0].nodeType;
  } catch (e) {
    d3_array = d3_arrayCopy;
  }
  var d3_arraySubclass = [].__proto__ ? function(array, prototype) {
    array.__proto__ = prototype;
  } : function(array, prototype) {
    for (var property in prototype) array[property] = prototype[property];
  };
  d3.map = function(object) {
    var map = new d3_Map();
    for (var key in object) map.set(key, object[key]);
    return map;
  };
  function d3_Map() {}
  d3_class(d3_Map, {
    has: function(key) {
      return d3_map_prefix + key in this;
    },
    get: function(key) {
      return this[d3_map_prefix + key];
    },
    set: function(key, value) {
      return this[d3_map_prefix + key] = value;
    },
    remove: function(key) {
      key = d3_map_prefix + key;
      return key in this && delete this[key];
    },
    keys: function() {
      var keys = [];
      this.forEach(function(key) {
        keys.push(key);
      });
      return keys;
    },
    values: function() {
      var values = [];
      this.forEach(function(key, value) {
        values.push(value);
      });
      return values;
    },
    entries: function() {
      var entries = [];
      this.forEach(function(key, value) {
        entries.push({
          key: key,
          value: value
        });
      });
      return entries;
    },
    forEach: function(f) {
      for (var key in this) {
        if (key.charCodeAt(0) === d3_map_prefixCode) {
          f.call(this, key.substring(1), this[key]);
        }
      }
    }
  });
  var d3_map_prefix = "\0", d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
  function d3_identity(d) {
    return d;
  }
  function d3_true() {
    return true;
  }
  function d3_functor(v) {
    return typeof v === "function" ? v : function() {
      return v;
    };
  }
  d3.functor = d3_functor;
  d3.rebind = function(target, source) {
    var i = 1, n = arguments.length, method;
    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
    return target;
  };
  function d3_rebind(target, source, method) {
    return function() {
      var value = method.apply(source, arguments);
      return arguments.length ? target : value;
    };
  }
  d3.ascending = function(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  };
  d3.descending = function(a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
  };
  d3.mean = function(array, f) {
    var n = array.length, a, m = 0, i = -1, j = 0;
    if (arguments.length === 1) {
      while (++i < n) if (d3_number(a = array[i])) m += (a - m) / ++j;
    } else {
      while (++i < n) if (d3_number(a = f.call(array, array[i], i))) m += (a - m) / ++j;
    }
    return j ? m : undefined;
  };
  d3.median = function(array, f) {
    if (arguments.length > 1) array = array.map(f);
    array = array.filter(d3_number);
    return array.length ? d3.quantile(array.sort(d3.ascending), .5) : undefined;
  };
  d3.min = function(array, f) {
    var i = -1, n = array.length, a, b;
    if (arguments.length === 1) {
      while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
      while (++i < n) if ((b = array[i]) != null && a > b) a = b;
    } else {
      while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
    }
    return a;
  };
  d3.max = function(array, f) {
    var i = -1, n = array.length, a, b;
    if (arguments.length === 1) {
      while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
      while (++i < n) if ((b = array[i]) != null && b > a) a = b;
    } else {
      while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
    }
    return a;
  };
  d3.extent = function(array, f) {
    var i = -1, n = array.length, a, b, c;
    if (arguments.length === 1) {
      while (++i < n && ((a = c = array[i]) == null || a != a)) a = c = undefined;
      while (++i < n) if ((b = array[i]) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    } else {
      while (++i < n && ((a = c = f.call(array, array[i], i)) == null || a != a)) a = undefined;
      while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    }
    return [ a, c ];
  };
  d3.random = {
    normal: function(µ, σ) {
      var n = arguments.length;
      if (n < 2) σ = 1;
      if (n < 1) µ = 0;
      return function() {
        var x, y, r;
        do {
          x = Math.random() * 2 - 1;
          y = Math.random() * 2 - 1;
          r = x * x + y * y;
        } while (!r || r > 1);
        return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
      };
    },
    logNormal: function() {
      var random = d3.random.normal.apply(d3, arguments);
      return function() {
        return Math.exp(random());
      };
    },
    irwinHall: function(m) {
      return function() {
        for (var s = 0, j = 0; j < m; j++) s += Math.random();
        return s / m;
      };
    }
  };
  function d3_number(x) {
    return x != null && !isNaN(x);
  }
  d3.sum = function(array, f) {
    var s = 0, n = array.length, a, i = -1;
    if (arguments.length === 1) {
      while (++i < n) if (!isNaN(a = +array[i])) s += a;
    } else {
      while (++i < n) if (!isNaN(a = +f.call(array, array[i], i))) s += a;
    }
    return s;
  };
  d3.quantile = function(values, p) {
    var H = (values.length - 1) * p + 1, h = Math.floor(H), v = +values[h - 1], e = H - h;
    return e ? v + e * (values[h] - v) : v;
  };
  d3.shuffle = function(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.random() * m-- | 0;
      t = array[m], array[m] = array[i], array[i] = t;
    }
    return array;
  };
  d3.transpose = function(matrix) {
    return d3.zip.apply(d3, matrix);
  };
  d3.zip = function() {
    if (!(n = arguments.length)) return [];
    for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m; ) {
      for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n; ) {
        zip[j] = arguments[j][i];
      }
    }
    return zips;
  };
  function d3_zipLength(d) {
    return d.length;
  }
  d3.bisector = function(f) {
    return {
      left: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (f.call(a, a[mid], mid) < x) lo = mid + 1; else hi = mid;
        }
        return lo;
      },
      right: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (x < f.call(a, a[mid], mid)) hi = mid; else lo = mid + 1;
        }
        return lo;
      }
    };
  };
  var d3_bisector = d3.bisector(function(d) {
    return d;
  });
  d3.bisectLeft = d3_bisector.left;
  d3.bisect = d3.bisectRight = d3_bisector.right;
  d3.nest = function() {
    var nest = {}, keys = [], sortKeys = [], sortValues, rollup;
    function map(array, depth) {
      if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
      var i = -1, n = array.length, key = keys[depth++], keyValue, object, valuesByKey = new d3_Map(), values, o = {};
      while (++i < n) {
        if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
          values.push(object);
        } else {
          valuesByKey.set(keyValue, [ object ]);
        }
      }
      valuesByKey.forEach(function(keyValue, values) {
        o[keyValue] = map(values, depth);
      });
      return o;
    }
    function entries(map, depth) {
      if (depth >= keys.length) return map;
      var a = [], sortKey = sortKeys[depth++], key;
      for (key in map) {
        a.push({
          key: key,
          values: entries(map[key], depth)
        });
      }
      if (sortKey) a.sort(function(a, b) {
        return sortKey(a.key, b.key);
      });
      return a;
    }
    nest.map = function(array) {
      return map(array, 0);
    };
    nest.entries = function(array) {
      return entries(map(array, 0), 0);
    };
    nest.key = function(d) {
      keys.push(d);
      return nest;
    };
    nest.sortKeys = function(order) {
      sortKeys[keys.length - 1] = order;
      return nest;
    };
    nest.sortValues = function(order) {
      sortValues = order;
      return nest;
    };
    nest.rollup = function(f) {
      rollup = f;
      return nest;
    };
    return nest;
  };
  d3.keys = function(map) {
    var keys = [];
    for (var key in map) keys.push(key);
    return keys;
  };
  d3.values = function(map) {
    var values = [];
    for (var key in map) values.push(map[key]);
    return values;
  };
  d3.entries = function(map) {
    var entries = [];
    for (var key in map) entries.push({
      key: key,
      value: map[key]
    });
    return entries;
  };
  d3.permute = function(array, indexes) {
    var permutes = [], i = -1, n = indexes.length;
    while (++i < n) permutes[i] = array[indexes[i]];
    return permutes;
  };
  d3.merge = function(arrays) {
    return Array.prototype.concat.apply([], arrays);
  };
  function d3_collapse(s) {
    return s.trim().replace(/\s+/g, " ");
  }
  d3.range = function(start, stop, step) {
    if (arguments.length < 3) {
      step = 1;
      if (arguments.length < 2) {
        stop = start;
        start = 0;
      }
    }
    if ((stop - start) / step === Infinity) throw new Error("infinite range");
    var range = [], k = d3_range_integerScale(Math.abs(step)), i = -1, j;
    start *= k, stop *= k, step *= k;
    if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k); else while ((j = start + step * ++i) < stop) range.push(j / k);
    return range;
  };
  function d3_range_integerScale(x) {
    var k = 1;
    while (x * k % 1) k *= 10;
    return k;
  }
  d3.requote = function(s) {
    return s.replace(d3_requote_re, "\\$&");
  };
  var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
  d3.round = function(x, n) {
    return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
  };
  d3.xhr = function(url, mimeType, callback) {
    var xhr = {}, dispatch = d3.dispatch("progress", "load", "error"), headers = {}, response = d3_identity, request = new (d3_window.XDomainRequest && /^(http(s)?:)?\/\//.test(url) ? XDomainRequest : XMLHttpRequest)();
    "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function() {
      request.readyState > 3 && respond();
    };
    function respond() {
      var s = request.status;
      !s && request.responseText || s >= 200 && s < 300 || s === 304 ? dispatch.load.call(xhr, response.call(xhr, request)) : dispatch.error.call(xhr, request);
    }
    request.onprogress = function(event) {
      var o = d3.event;
      d3.event = event;
      try {
        dispatch.progress.call(xhr, request);
      } finally {
        d3.event = o;
      }
    };
    xhr.header = function(name, value) {
      name = (name + "").toLowerCase();
      if (arguments.length < 2) return headers[name];
      if (value == null) delete headers[name]; else headers[name] = value + "";
      return xhr;
    };
    xhr.mimeType = function(value) {
      if (!arguments.length) return mimeType;
      mimeType = value == null ? null : value + "";
      return xhr;
    };
    xhr.response = function(value) {
      response = value;
      return xhr;
    };
    [ "get", "post" ].forEach(function(method) {
      xhr[method] = function() {
        return xhr.send.apply(xhr, [ method ].concat(d3_array(arguments)));
      };
    });
    xhr.send = function(method, data, callback) {
      if (arguments.length === 2 && typeof data === "function") callback = data, data = null;
      request.open(method, url, true);
      if (mimeType != null && !("accept" in headers)) headers["accept"] = mimeType + ",*/*";
      if (request.setRequestHeader) for (var name in headers) request.setRequestHeader(name, headers[name]);
      if (mimeType != null && request.overrideMimeType) request.overrideMimeType(mimeType);
      if (callback != null) xhr.on("error", callback).on("load", function(request) {
        callback(null, request);
      });
      request.send(data == null ? null : data);
      return xhr;
    };
    xhr.abort = function() {
      request.abort();
      return xhr;
    };
    d3.rebind(xhr, dispatch, "on");
    if (arguments.length === 2 && typeof mimeType === "function") callback = mimeType, 
    mimeType = null;
    return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
  };
  function d3_xhr_fixCallback(callback) {
    return callback.length === 1 ? function(error, request) {
      callback(error == null ? request : null);
    } : callback;
  }
  d3.text = function() {
    return d3.xhr.apply(d3, arguments).response(d3_text);
  };
  function d3_text(request) {
    return request.responseText;
  }
  d3.json = function(url, callback) {
    return d3.xhr(url, "application/json", callback).response(d3_json);
  };
  function d3_json(request) {
    return JSON.parse(request.responseText);
  }
  d3.html = function(url, callback) {
    return d3.xhr(url, "text/html", callback).response(d3_html);
  };
  function d3_html(request) {
    var range = d3_document.createRange();
    range.selectNode(d3_document.body);
    return range.createContextualFragment(request.responseText);
  }
  d3.xml = function() {
    return d3.xhr.apply(d3, arguments).response(d3_xml);
  };
  function d3_xml(request) {
    return request.responseXML;
  }
  var d3_nsPrefix = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  d3.ns = {
    prefix: d3_nsPrefix,
    qualify: function(name) {
      var i = name.indexOf(":"), prefix = name;
      if (i >= 0) {
        prefix = name.substring(0, i);
        name = name.substring(i + 1);
      }
      return d3_nsPrefix.hasOwnProperty(prefix) ? {
        space: d3_nsPrefix[prefix],
        local: name
      } : name;
    }
  };
  d3.dispatch = function() {
    var dispatch = new d3_dispatch(), i = -1, n = arguments.length;
    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    return dispatch;
  };
  function d3_dispatch() {}
  d3_dispatch.prototype.on = function(type, listener) {
    var i = type.indexOf("."), name = "";
    if (i > 0) {
      name = type.substring(i + 1);
      type = type.substring(0, i);
    }
    return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
  };
  function d3_dispatch_event(dispatch) {
    var listeners = [], listenerByName = new d3_Map();
    function event() {
      var z = listeners, i = -1, n = z.length, l;
      while (++i < n) if (l = z[i].on) l.apply(this, arguments);
      return dispatch;
    }
    event.on = function(name, listener) {
      var l = listenerByName.get(name), i;
      if (arguments.length < 2) return l && l.on;
      if (l) {
        l.on = null;
        listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
        listenerByName.remove(name);
      }
      if (listener) listeners.push(listenerByName.set(name, {
        on: listener
      }));
      return dispatch;
    };
    return event;
  }
  d3.format = function(specifier) {
    var match = d3_format_re.exec(specifier), fill = match[1] || " ", align = match[2] || ">", sign = match[3] || "", basePrefix = match[4] || "", zfill = match[5], width = +match[6], comma = match[7], precision = match[8], type = match[9], scale = 1, suffix = "", integer = false;
    if (precision) precision = +precision.substring(1);
    if (zfill || fill === "0" && align === "=") {
      zfill = fill = "0";
      align = "=";
      if (comma) width -= Math.floor((width - 1) / 4);
    }
    switch (type) {
     case "n":
      comma = true;
      type = "g";
      break;

     case "%":
      scale = 100;
      suffix = "%";
      type = "f";
      break;

     case "p":
      scale = 100;
      suffix = "%";
      type = "r";
      break;

     case "b":
     case "o":
     case "x":
     case "X":
      if (basePrefix) basePrefix = "0" + type.toLowerCase();

     case "c":
     case "d":
      integer = true;
      precision = 0;
      break;

     case "s":
      scale = -1;
      type = "r";
      break;
    }
    if (basePrefix === "#") basePrefix = "";
    if (type == "r" && !precision) type = "g";
    type = d3_format_types.get(type) || d3_format_typeDefault;
    var zcomma = zfill && comma;
    return function(value) {
      if (integer && value % 1) return "";
      var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, "-") : sign;
      if (scale < 0) {
        var prefix = d3.formatPrefix(value, precision);
        value = prefix.scale(value);
        suffix = prefix.symbol;
      } else {
        value *= scale;
      }
      value = type(value, precision);
      if (!zfill && comma) value = d3_format_group(value);
      var length = basePrefix.length + value.length + (zcomma ? 0 : negative.length), padding = length < width ? new Array(length = width - length + 1).join(fill) : "";
      if (zcomma) value = d3_format_group(padding + value);
      if (d3_format_decimalPoint) value.replace(".", d3_format_decimalPoint);
      negative += basePrefix;
      return (align === "<" ? negative + value + padding : align === ">" ? padding + negative + value : align === "^" ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + suffix;
    };
  };
  var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/;
  var d3_format_types = d3.map({
    b: function(x) {
      return x.toString(2);
    },
    c: function(x) {
      return String.fromCharCode(x);
    },
    o: function(x) {
      return x.toString(8);
    },
    x: function(x) {
      return x.toString(16);
    },
    X: function(x) {
      return x.toString(16).toUpperCase();
    },
    g: function(x, p) {
      return x.toPrecision(p);
    },
    e: function(x, p) {
      return x.toExponential(p);
    },
    f: function(x, p) {
      return x.toFixed(p);
    },
    r: function(x, p) {
      return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))));
    }
  });
  function d3_format_precision(x, p) {
    return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1);
  }
  function d3_format_typeDefault(x) {
    return x + "";
  }
  var d3_format_group = d3_identity;
  if (d3_format_grouping) {
    var d3_format_groupingLength = d3_format_grouping.length;
    d3_format_group = function(value) {
      var i = value.lastIndexOf("."), f = i >= 0 ? "." + value.substring(i + 1) : (i = value.length, 
      ""), t = [], j = 0, g = d3_format_grouping[0];
      while (i > 0 && g > 0) {
        t.push(value.substring(i -= g, i + g));
        g = d3_format_grouping[j = (j + 1) % d3_format_groupingLength];
      }
      return t.reverse().join(d3_format_thousandsSeparator || "") + f;
    };
  }
  var d3_formatPrefixes = [ "y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y" ].map(d3_formatPrefix);
  d3.formatPrefix = function(value, precision) {
    var i = 0;
    if (value) {
      if (value < 0) value *= -1;
      if (precision) value = d3.round(value, d3_format_precision(value, precision));
      i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
      i = Math.max(-24, Math.min(24, Math.floor((i <= 0 ? i + 1 : i - 1) / 3) * 3));
    }
    return d3_formatPrefixes[8 + i / 3];
  };
  function d3_formatPrefix(d, i) {
    var k = Math.pow(10, Math.abs(8 - i) * 3);
    return {
      scale: i > 8 ? function(d) {
        return d / k;
      } : function(d) {
        return d * k;
      },
      symbol: d
    };
  }
  var d3_ease_default = function() {
    return d3_identity;
  };
  var d3_ease = d3.map({
    linear: d3_ease_default,
    poly: d3_ease_poly,
    quad: function() {
      return d3_ease_quad;
    },
    cubic: function() {
      return d3_ease_cubic;
    },
    sin: function() {
      return d3_ease_sin;
    },
    exp: function() {
      return d3_ease_exp;
    },
    circle: function() {
      return d3_ease_circle;
    },
    elastic: d3_ease_elastic,
    back: d3_ease_back,
    bounce: function() {
      return d3_ease_bounce;
    }
  });
  var d3_ease_mode = d3.map({
    "in": d3_identity,
    out: d3_ease_reverse,
    "in-out": d3_ease_reflect,
    "out-in": function(f) {
      return d3_ease_reflect(d3_ease_reverse(f));
    }
  });
  d3.ease = function(name) {
    var i = name.indexOf("-"), t = i >= 0 ? name.substring(0, i) : name, m = i >= 0 ? name.substring(i + 1) : "in";
    t = d3_ease.get(t) || d3_ease_default;
    m = d3_ease_mode.get(m) || d3_identity;
    return d3_ease_clamp(m(t.apply(null, Array.prototype.slice.call(arguments, 1))));
  };
  function d3_ease_clamp(f) {
    return function(t) {
      return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
    };
  }
  function d3_ease_reverse(f) {
    return function(t) {
      return 1 - f(1 - t);
    };
  }
  function d3_ease_reflect(f) {
    return function(t) {
      return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t));
    };
  }
  function d3_ease_quad(t) {
    return t * t;
  }
  function d3_ease_cubic(t) {
    return t * t * t;
  }
  function d3_ease_cubicInOut(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    var t2 = t * t, t3 = t2 * t;
    return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75);
  }
  function d3_ease_poly(e) {
    return function(t) {
      return Math.pow(t, e);
    };
  }
  function d3_ease_sin(t) {
    return 1 - Math.cos(t * π / 2);
  }
  function d3_ease_exp(t) {
    return Math.pow(2, 10 * (t - 1));
  }
  function d3_ease_circle(t) {
    return 1 - Math.sqrt(1 - t * t);
  }
  function d3_ease_elastic(a, p) {
    var s;
    if (arguments.length < 2) p = .45;
    if (arguments.length) s = p / (2 * π) * Math.asin(1 / a); else a = 1, s = p / 4;
    return function(t) {
      return 1 + a * Math.pow(2, 10 * -t) * Math.sin((t - s) * 2 * π / p);
    };
  }
  function d3_ease_back(s) {
    if (!s) s = 1.70158;
    return function(t) {
      return t * t * ((s + 1) * t - s);
    };
  }
  function d3_ease_bounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
  }
  d3.event = null;
  function d3_eventCancel() {
    d3.event.stopPropagation();
    d3.event.preventDefault();
  }
  function d3_eventSource() {
    var e = d3.event, s;
    while (s = e.sourceEvent) e = s;
    return e;
  }
  function d3_eventDispatch(target) {
    var dispatch = new d3_dispatch(), i = 0, n = arguments.length;
    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    dispatch.of = function(thiz, argumentz) {
      return function(e1) {
        try {
          var e0 = e1.sourceEvent = d3.event;
          e1.target = target;
          d3.event = e1;
          dispatch[e1.type].apply(thiz, argumentz);
        } finally {
          d3.event = e0;
        }
      };
    };
    return dispatch;
  }
  d3.transform = function(string) {
    var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
    return (d3.transform = function(string) {
      g.setAttribute("transform", string);
      var t = g.transform.baseVal.consolidate();
      return new d3_transform(t ? t.matrix : d3_transformIdentity);
    })(string);
  };
  function d3_transform(m) {
    var r0 = [ m.a, m.b ], r1 = [ m.c, m.d ], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
    if (r0[0] * r1[1] < r1[0] * r0[1]) {
      r0[0] *= -1;
      r0[1] *= -1;
      kx *= -1;
      kz *= -1;
    }
    this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
    this.translate = [ m.e, m.f ];
    this.scale = [ kx, ky ];
    this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
  }
  d3_transform.prototype.toString = function() {
    return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
  };
  function d3_transformDot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  function d3_transformNormalize(a) {
    var k = Math.sqrt(d3_transformDot(a, a));
    if (k) {
      a[0] /= k;
      a[1] /= k;
    }
    return k;
  }
  function d3_transformCombine(a, b, k) {
    a[0] += k * b[0];
    a[1] += k * b[1];
    return a;
  }
  var d3_transformIdentity = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  };
  d3.interpolate = function(a, b) {
    var i = d3.interpolators.length, f;
    while (--i >= 0 && !(f = d3.interpolators[i](a, b))) ;
    return f;
  };
  d3.interpolateNumber = function(a, b) {
    b -= a;
    return function(t) {
      return a + b * t;
    };
  };
  d3.interpolateRound = function(a, b) {
    b -= a;
    return function(t) {
      return Math.round(a + b * t);
    };
  };
  d3.interpolateString = function(a, b) {
    var m, i, j, s0 = 0, s1 = 0, s = [], q = [], n, o;
    d3_interpolate_number.lastIndex = 0;
    for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
      if (m.index) s.push(b.substring(s0, s1 = m.index));
      q.push({
        i: s.length,
        x: m[0]
      });
      s.push(null);
      s0 = d3_interpolate_number.lastIndex;
    }
    if (s0 < b.length) s.push(b.substring(s0));
    for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
      o = q[i];
      if (o.x == m[0]) {
        if (o.i) {
          if (s[o.i + 1] == null) {
            s[o.i - 1] += o.x;
            s.splice(o.i, 1);
            for (j = i + 1; j < n; ++j) q[j].i--;
          } else {
            s[o.i - 1] += o.x + s[o.i + 1];
            s.splice(o.i, 2);
            for (j = i + 1; j < n; ++j) q[j].i -= 2;
          }
        } else {
          if (s[o.i + 1] == null) {
            s[o.i] = o.x;
          } else {
            s[o.i] = o.x + s[o.i + 1];
            s.splice(o.i + 1, 1);
            for (j = i + 1; j < n; ++j) q[j].i--;
          }
        }
        q.splice(i, 1);
        n--;
        i--;
      } else {
        o.x = d3.interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
      }
    }
    while (i < n) {
      o = q.pop();
      if (s[o.i + 1] == null) {
        s[o.i] = o.x;
      } else {
        s[o.i] = o.x + s[o.i + 1];
        s.splice(o.i + 1, 1);
      }
      n--;
    }
    if (s.length === 1) {
      return s[0] == null ? q[0].x : function() {
        return b;
      };
    }
    return function(t) {
      for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
  d3.interpolateTransform = function(a, b) {
    var s = [], q = [], n, A = d3.transform(a), B = d3.transform(b), ta = A.translate, tb = B.translate, ra = A.rotate, rb = B.rotate, wa = A.skew, wb = B.skew, ka = A.scale, kb = B.scale;
    if (ta[0] != tb[0] || ta[1] != tb[1]) {
      s.push("translate(", null, ",", null, ")");
      q.push({
        i: 1,
        x: d3.interpolateNumber(ta[0], tb[0])
      }, {
        i: 3,
        x: d3.interpolateNumber(ta[1], tb[1])
      });
    } else if (tb[0] || tb[1]) {
      s.push("translate(" + tb + ")");
    } else {
      s.push("");
    }
    if (ra != rb) {
      if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360;
      q.push({
        i: s.push(s.pop() + "rotate(", null, ")") - 2,
        x: d3.interpolateNumber(ra, rb)
      });
    } else if (rb) {
      s.push(s.pop() + "rotate(" + rb + ")");
    }
    if (wa != wb) {
      q.push({
        i: s.push(s.pop() + "skewX(", null, ")") - 2,
        x: d3.interpolateNumber(wa, wb)
      });
    } else if (wb) {
      s.push(s.pop() + "skewX(" + wb + ")");
    }
    if (ka[0] != kb[0] || ka[1] != kb[1]) {
      n = s.push(s.pop() + "scale(", null, ",", null, ")");
      q.push({
        i: n - 4,
        x: d3.interpolateNumber(ka[0], kb[0])
      }, {
        i: n - 2,
        x: d3.interpolateNumber(ka[1], kb[1])
      });
    } else if (kb[0] != 1 || kb[1] != 1) {
      s.push(s.pop() + "scale(" + kb + ")");
    }
    n = q.length;
    return function(t) {
      var i = -1, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
  d3.interpolateRgb = function(a, b) {
    a = d3.rgb(a);
    b = d3.rgb(b);
    var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
    return function(t) {
      return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t));
    };
  };
  d3.interpolateHsl = function(a, b) {
    a = d3.hsl(a);
    b = d3.hsl(b);
    var h0 = a.h, s0 = a.s, l0 = a.l, h1 = b.h - h0, s1 = b.s - s0, l1 = b.l - l0;
    if (h1 > 180) h1 -= 360; else if (h1 < -180) h1 += 360;
    return function(t) {
      return d3_hsl_rgb(h0 + h1 * t, s0 + s1 * t, l0 + l1 * t) + "";
    };
  };
  d3.interpolateLab = function(a, b) {
    a = d3.lab(a);
    b = d3.lab(b);
    var al = a.l, aa = a.a, ab = a.b, bl = b.l - al, ba = b.a - aa, bb = b.b - ab;
    return function(t) {
      return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
    };
  };
  d3.interpolateHcl = function(a, b) {
    a = d3.hcl(a);
    b = d3.hcl(b);
    var ah = a.h, ac = a.c, al = a.l, bh = b.h - ah, bc = b.c - ac, bl = b.l - al;
    if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
    return function(t) {
      return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
    };
  };
  d3.interpolateArray = function(a, b) {
    var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
    for (i = 0; i < n0; ++i) x.push(d3.interpolate(a[i], b[i]));
    for (;i < na; ++i) c[i] = a[i];
    for (;i < nb; ++i) c[i] = b[i];
    return function(t) {
      for (i = 0; i < n0; ++i) c[i] = x[i](t);
      return c;
    };
  };
  d3.interpolateObject = function(a, b) {
    var i = {}, c = {}, k;
    for (k in a) {
      if (k in b) {
        i[k] = d3_interpolateByName(k)(a[k], b[k]);
      } else {
        c[k] = a[k];
      }
    }
    for (k in b) {
      if (!(k in a)) {
        c[k] = b[k];
      }
    }
    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  };
  var d3_interpolate_number = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  function d3_interpolateByName(name) {
    return name == "transform" ? d3.interpolateTransform : d3.interpolate;
  }
  d3.interpolators = [ d3.interpolateObject, function(a, b) {
    return b instanceof Array && d3.interpolateArray(a, b);
  }, function(a, b) {
    return (typeof a === "string" || typeof b === "string") && d3.interpolateString(a + "", b + "");
  }, function(a, b) {
    return (typeof b === "string" ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) : b instanceof d3_Color) && d3.interpolateRgb(a, b);
  }, function(a, b) {
    return !isNaN(a = +a) && !isNaN(b = +b) && d3.interpolateNumber(a, b);
  } ];
  function d3_uninterpolateNumber(a, b) {
    b = b - (a = +a) ? 1 / (b - a) : 0;
    return function(x) {
      return (x - a) * b;
    };
  }
  function d3_uninterpolateClamp(a, b) {
    b = b - (a = +a) ? 1 / (b - a) : 0;
    return function(x) {
      return Math.max(0, Math.min(1, (x - a) * b));
    };
  }
  function d3_Color() {}
  d3_Color.prototype.toString = function() {
    return this.rgb() + "";
  };
  d3.rgb = function(r, g, b) {
    return arguments.length === 1 ? r instanceof d3_Rgb ? d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : d3_rgb(~~r, ~~g, ~~b);
  };
  function d3_rgb(r, g, b) {
    return new d3_Rgb(r, g, b);
  }
  function d3_Rgb(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  var d3_rgbPrototype = d3_Rgb.prototype = new d3_Color();
  d3_rgbPrototype.brighter = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    var r = this.r, g = this.g, b = this.b, i = 30;
    if (!r && !g && !b) return d3_rgb(i, i, i);
    if (r && r < i) r = i;
    if (g && g < i) g = i;
    if (b && b < i) b = i;
    return d3_rgb(Math.min(255, Math.floor(r / k)), Math.min(255, Math.floor(g / k)), Math.min(255, Math.floor(b / k)));
  };
  d3_rgbPrototype.darker = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return d3_rgb(Math.floor(k * this.r), Math.floor(k * this.g), Math.floor(k * this.b));
  };
  d3_rgbPrototype.hsl = function() {
    return d3_rgb_hsl(this.r, this.g, this.b);
  };
  d3_rgbPrototype.toString = function() {
    return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
  };
  function d3_rgb_hex(v) {
    return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
  }
  function d3_rgb_parse(format, rgb, hsl) {
    var r = 0, g = 0, b = 0, m1, m2, name;
    m1 = /([a-z]+)\((.*)\)/i.exec(format);
    if (m1) {
      m2 = m1[2].split(",");
      switch (m1[1]) {
       case "hsl":
        {
          return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
        }

       case "rgb":
        {
          return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]));
        }
      }
    }
    if (name = d3_rgb_names.get(format)) return rgb(name.r, name.g, name.b);
    if (format != null && format.charAt(0) === "#") {
      if (format.length === 4) {
        r = format.charAt(1);
        r += r;
        g = format.charAt(2);
        g += g;
        b = format.charAt(3);
        b += b;
      } else if (format.length === 7) {
        r = format.substring(1, 3);
        g = format.substring(3, 5);
        b = format.substring(5, 7);
      }
      r = parseInt(r, 16);
      g = parseInt(g, 16);
      b = parseInt(b, 16);
    }
    return rgb(r, g, b);
  }
  function d3_rgb_hsl(r, g, b) {
    var min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, h, s, l = (max + min) / 2;
    if (d) {
      s = l < .5 ? d / (max + min) : d / (2 - max - min);
      if (r == max) h = (g - b) / d + (g < b ? 6 : 0); else if (g == max) h = (b - r) / d + 2; else h = (r - g) / d + 4;
      h *= 60;
    } else {
      s = h = 0;
    }
    return d3_hsl(h, s, l);
  }
  function d3_rgb_lab(r, g, b) {
    r = d3_rgb_xyz(r);
    g = d3_rgb_xyz(g);
    b = d3_rgb_xyz(b);
    var x = d3_xyz_lab((.4124564 * r + .3575761 * g + .1804375 * b) / d3_lab_X), y = d3_xyz_lab((.2126729 * r + .7151522 * g + .072175 * b) / d3_lab_Y), z = d3_xyz_lab((.0193339 * r + .119192 * g + .9503041 * b) / d3_lab_Z);
    return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
  }
  function d3_rgb_xyz(r) {
    return (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4);
  }
  function d3_rgb_parseNumber(c) {
    var f = parseFloat(c);
    return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
  }
  var d3_rgb_names = d3.map({
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  });
  d3_rgb_names.forEach(function(key, value) {
    d3_rgb_names.set(key, d3_rgb_parse(value, d3_rgb, d3_hsl_rgb));
  });
  d3.hsl = function(h, s, l) {
    return arguments.length === 1 ? h instanceof d3_Hsl ? d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : d3_hsl(+h, +s, +l);
  };
  function d3_hsl(h, s, l) {
    return new d3_Hsl(h, s, l);
  }
  function d3_Hsl(h, s, l) {
    this.h = h;
    this.s = s;
    this.l = l;
  }
  var d3_hslPrototype = d3_Hsl.prototype = new d3_Color();
  d3_hslPrototype.brighter = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return d3_hsl(this.h, this.s, this.l / k);
  };
  d3_hslPrototype.darker = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return d3_hsl(this.h, this.s, k * this.l);
  };
  d3_hslPrototype.rgb = function() {
    return d3_hsl_rgb(this.h, this.s, this.l);
  };
  function d3_hsl_rgb(h, s, l) {
    var m1, m2;
    h = h % 360;
    if (h < 0) h += 360;
    s = s < 0 ? 0 : s > 1 ? 1 : s;
    l = l < 0 ? 0 : l > 1 ? 1 : l;
    m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;
    function v(h) {
      if (h > 360) h -= 360; else if (h < 0) h += 360;
      if (h < 60) return m1 + (m2 - m1) * h / 60;
      if (h < 180) return m2;
      if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
      return m1;
    }
    function vv(h) {
      return Math.round(v(h) * 255);
    }
    return d3_rgb(vv(h + 120), vv(h), vv(h - 120));
  }
  d3.hcl = function(h, c, l) {
    return arguments.length === 1 ? h instanceof d3_Hcl ? d3_hcl(h.h, h.c, h.l) : h instanceof d3_Lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : d3_hcl(+h, +c, +l);
  };
  function d3_hcl(h, c, l) {
    return new d3_Hcl(h, c, l);
  }
  function d3_Hcl(h, c, l) {
    this.h = h;
    this.c = c;
    this.l = l;
  }
  var d3_hclPrototype = d3_Hcl.prototype = new d3_Color();
  d3_hclPrototype.brighter = function(k) {
    return d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
  };
  d3_hclPrototype.darker = function(k) {
    return d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
  };
  d3_hclPrototype.rgb = function() {
    return d3_hcl_lab(this.h, this.c, this.l).rgb();
  };
  function d3_hcl_lab(h, c, l) {
    return d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
  }
  d3.lab = function(l, a, b) {
    return arguments.length === 1 ? l instanceof d3_Lab ? d3_lab(l.l, l.a, l.b) : l instanceof d3_Hcl ? d3_hcl_lab(l.l, l.c, l.h) : d3_rgb_lab((l = d3.rgb(l)).r, l.g, l.b) : d3_lab(+l, +a, +b);
  };
  function d3_lab(l, a, b) {
    return new d3_Lab(l, a, b);
  }
  function d3_Lab(l, a, b) {
    this.l = l;
    this.a = a;
    this.b = b;
  }
  var d3_lab_K = 18;
  var d3_lab_X = .95047, d3_lab_Y = 1, d3_lab_Z = 1.08883;
  var d3_labPrototype = d3_Lab.prototype = new d3_Color();
  d3_labPrototype.brighter = function(k) {
    return d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };
  d3_labPrototype.darker = function(k) {
    return d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };
  d3_labPrototype.rgb = function() {
    return d3_lab_rgb(this.l, this.a, this.b);
  };
  function d3_lab_rgb(l, a, b) {
    var y = (l + 16) / 116, x = y + a / 500, z = y - b / 200;
    x = d3_lab_xyz(x) * d3_lab_X;
    y = d3_lab_xyz(y) * d3_lab_Y;
    z = d3_lab_xyz(z) * d3_lab_Z;
    return d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - .4985314 * z), d3_xyz_rgb(-.969266 * x + 1.8760108 * y + .041556 * z), d3_xyz_rgb(.0556434 * x - .2040259 * y + 1.0572252 * z));
  }
  function d3_lab_hcl(l, a, b) {
    return d3_hcl(Math.atan2(b, a) / π * 180, Math.sqrt(a * a + b * b), l);
  }
  function d3_lab_xyz(x) {
    return x > .206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
  }
  function d3_xyz_lab(x) {
    return x > .008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
  }
  function d3_xyz_rgb(r) {
    return Math.round(255 * (r <= .00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055));
  }
  function d3_selection(groups) {
    d3_arraySubclass(groups, d3_selectionPrototype);
    return groups;
  }
  var d3_select = function(s, n) {
    return n.querySelector(s);
  }, d3_selectAll = function(s, n) {
    return n.querySelectorAll(s);
  }, d3_selectRoot = d3_document.documentElement, d3_selectMatcher = d3_selectRoot.matchesSelector || d3_selectRoot.webkitMatchesSelector || d3_selectRoot.mozMatchesSelector || d3_selectRoot.msMatchesSelector || d3_selectRoot.oMatchesSelector, d3_selectMatches = function(n, s) {
    return d3_selectMatcher.call(n, s);
  };
  if (typeof Sizzle === "function") {
    d3_select = function(s, n) {
      return Sizzle(s, n)[0] || null;
    };
    d3_selectAll = function(s, n) {
      return Sizzle.uniqueSort(Sizzle(s, n));
    };
    d3_selectMatches = Sizzle.matchesSelector;
  }
  var d3_selectionPrototype = [];
  d3.selection = function() {
    return d3_selectionRoot;
  };
  d3.selection.prototype = d3_selectionPrototype;
  d3_selectionPrototype.select = function(selector) {
    var subgroups = [], subgroup, subnode, group, node;
    if (typeof selector !== "function") selector = d3_selection_selector(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;
      for (var i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroup.push(subnode = selector.call(node, node.__data__, i));
          if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_selector(selector) {
    return function() {
      return d3_select(selector, this);
    };
  }
  d3_selectionPrototype.selectAll = function(selector) {
    var subgroups = [], subgroup, node;
    if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i)));
          subgroup.parentNode = node;
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_selectorAll(selector) {
    return function() {
      return d3_selectAll(selector, this);
    };
  }
  d3_selectionPrototype.attr = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node();
        name = d3.ns.qualify(name);
        return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
      }
      for (value in name) this.each(d3_selection_attr(value, name[value]));
      return this;
    }
    return this.each(d3_selection_attr(name, value));
  };
  function d3_selection_attr(name, value) {
    name = d3.ns.qualify(name);
    function attrNull() {
      this.removeAttribute(name);
    }
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }
    function attrConstant() {
      this.setAttribute(name, value);
    }
    function attrConstantNS() {
      this.setAttributeNS(name.space, name.local, value);
    }
    function attrFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttribute(name); else this.setAttribute(name, x);
    }
    function attrFunctionNS() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttributeNS(name.space, name.local); else this.setAttributeNS(name.space, name.local, x);
    }
    return value == null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
  }
  d3_selectionPrototype.classed = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node(), n = (name = name.trim().split(/^|\s+/g)).length, i = -1;
        if (value = node.classList) {
          while (++i < n) if (!value.contains(name[i])) return false;
        } else {
          value = node.className;
          if (value.baseVal != null) value = value.baseVal;
          while (++i < n) if (!d3_selection_classedRe(name[i]).test(value)) return false;
        }
        return true;
      }
      for (value in name) this.each(d3_selection_classed(value, name[value]));
      return this;
    }
    return this.each(d3_selection_classed(name, value));
  };
  function d3_selection_classedRe(name) {
    return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g");
  }
  function d3_selection_classed(name, value) {
    name = name.trim().split(/\s+/).map(d3_selection_classedName);
    var n = name.length;
    function classedConstant() {
      var i = -1;
      while (++i < n) name[i](this, value);
    }
    function classedFunction() {
      var i = -1, x = value.apply(this, arguments);
      while (++i < n) name[i](this, x);
    }
    return typeof value === "function" ? classedFunction : classedConstant;
  }
  function d3_selection_classedName(name) {
    var re = d3_selection_classedRe(name);
    return function(node, value) {
      if (c = node.classList) return value ? c.add(name) : c.remove(name);
      var c = node.className, cb = c.baseVal != null, cv = cb ? c.baseVal : c;
      if (value) {
        re.lastIndex = 0;
        if (!re.test(cv)) {
          cv = d3_collapse(cv + " " + name);
          if (cb) c.baseVal = cv; else node.className = cv;
        }
      } else if (cv) {
        cv = d3_collapse(cv.replace(re, " "));
        if (cb) c.baseVal = cv; else node.className = cv;
      }
    };
  }
  d3_selectionPrototype.style = function(name, value, priority) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";
        for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
        return this;
      }
      if (n < 2) return d3_window.getComputedStyle(this.node(), null).getPropertyValue(name);
      priority = "";
    }
    return this.each(d3_selection_style(name, value, priority));
  };
  function d3_selection_style(name, value, priority) {
    function styleNull() {
      this.style.removeProperty(name);
    }
    function styleConstant() {
      this.style.setProperty(name, value, priority);
    }
    function styleFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.style.removeProperty(name); else this.style.setProperty(name, x, priority);
    }
    return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant;
  }
  d3_selectionPrototype.property = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") return this.node()[name];
      for (value in name) this.each(d3_selection_property(value, name[value]));
      return this;
    }
    return this.each(d3_selection_property(name, value));
  };
  function d3_selection_property(name, value) {
    function propertyNull() {
      delete this[name];
    }
    function propertyConstant() {
      this[name] = value;
    }
    function propertyFunction() {
      var x = value.apply(this, arguments);
      if (x == null) delete this[name]; else this[name] = x;
    }
    return value == null ? propertyNull : typeof value === "function" ? propertyFunction : propertyConstant;
  }
  d3_selectionPrototype.text = function(value) {
    return arguments.length ? this.each(typeof value === "function" ? function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    } : value == null ? function() {
      this.textContent = "";
    } : function() {
      this.textContent = value;
    }) : this.node().textContent;
  };
  d3_selectionPrototype.html = function(value) {
    return arguments.length ? this.each(typeof value === "function" ? function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    } : value == null ? function() {
      this.innerHTML = "";
    } : function() {
      this.innerHTML = value;
    }) : this.node().innerHTML;
  };
  d3_selectionPrototype.append = function(name) {
    name = d3.ns.qualify(name);
    function append() {
      return this.appendChild(d3_document.createElementNS(this.namespaceURI, name));
    }
    function appendNS() {
      return this.appendChild(d3_document.createElementNS(name.space, name.local));
    }
    return this.select(name.local ? appendNS : append);
  };
  d3_selectionPrototype.insert = function(name, before) {
    name = d3.ns.qualify(name);
    function insert() {
      return this.insertBefore(d3_document.createElementNS(this.namespaceURI, name), d3_select(before, this));
    }
    function insertNS() {
      return this.insertBefore(d3_document.createElementNS(name.space, name.local), d3_select(before, this));
    }
    return this.select(name.local ? insertNS : insert);
  };
  d3_selectionPrototype.remove = function() {
    return this.each(function() {
      var parent = this.parentNode;
      if (parent) parent.removeChild(this);
    });
  };
  d3_selectionPrototype.data = function(value, key) {
    var i = -1, n = this.length, group, node;
    if (!arguments.length) {
      value = new Array(n = (group = this[0]).length);
      while (++i < n) {
        if (node = group[i]) {
          value[i] = node.__data__;
        }
      }
      return value;
    }
    function bind(group, groupData) {
      var i, n = group.length, m = groupData.length, n0 = Math.min(n, m), updateNodes = new Array(m), enterNodes = new Array(m), exitNodes = new Array(n), node, nodeData;
      if (key) {
        var nodeByKeyValue = new d3_Map(), dataByKeyValue = new d3_Map(), keyValues = [], keyValue;
        for (i = -1; ++i < n; ) {
          keyValue = key.call(node = group[i], node.__data__, i);
          if (nodeByKeyValue.has(keyValue)) {
            exitNodes[i] = node;
          } else {
            nodeByKeyValue.set(keyValue, node);
          }
          keyValues.push(keyValue);
        }
        for (i = -1; ++i < m; ) {
          keyValue = key.call(groupData, nodeData = groupData[i], i);
          if (node = nodeByKeyValue.get(keyValue)) {
            updateNodes[i] = node;
            node.__data__ = nodeData;
          } else if (!dataByKeyValue.has(keyValue)) {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          }
          dataByKeyValue.set(keyValue, nodeData);
          nodeByKeyValue.remove(keyValue);
        }
        for (i = -1; ++i < n; ) {
          if (nodeByKeyValue.has(keyValues[i])) {
            exitNodes[i] = group[i];
          }
        }
      } else {
        for (i = -1; ++i < n0; ) {
          node = group[i];
          nodeData = groupData[i];
          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
          } else {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          }
        }
        for (;i < m; ++i) {
          enterNodes[i] = d3_selection_dataNode(groupData[i]);
        }
        for (;i < n; ++i) {
          exitNodes[i] = group[i];
        }
      }
      enterNodes.update = updateNodes;
      enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;
      enter.push(enterNodes);
      update.push(updateNodes);
      exit.push(exitNodes);
    }
    var enter = d3_selection_enter([]), update = d3_selection([]), exit = d3_selection([]);
    if (typeof value === "function") {
      while (++i < n) {
        bind(group = this[i], value.call(group, group.parentNode.__data__, i));
      }
    } else {
      while (++i < n) {
        bind(group = this[i], value);
      }
    }
    update.enter = function() {
      return enter;
    };
    update.exit = function() {
      return exit;
    };
    return update;
  };
  function d3_selection_dataNode(data) {
    return {
      __data__: data
    };
  }
  d3_selectionPrototype.datum = function(value) {
    return arguments.length ? this.property("__data__", value) : this.property("__data__");
  };
  d3_selectionPrototype.filter = function(filter) {
    var subgroups = [], subgroup, group, node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;
      for (var i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i)) {
          subgroup.push(node);
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_filter(selector) {
    return function() {
      return d3_selectMatches(this, selector);
    };
  }
  d3_selectionPrototype.order = function() {
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
        if (node = group[i]) {
          if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }
    return this;
  };
  d3_selectionPrototype.sort = function(comparator) {
    comparator = d3_selection_sortComparator.apply(this, arguments);
    for (var j = -1, m = this.length; ++j < m; ) this[j].sort(comparator);
    return this.order();
  };
  function d3_selection_sortComparator(comparator) {
    if (!arguments.length) comparator = d3.ascending;
    return function(a, b) {
      return !a - !b || comparator(a.__data__, b.__data__);
    };
  }
  d3_selectionPrototype.on = function(type, listener, capture) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof type !== "string") {
        if (n < 2) listener = false;
        for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
        return this;
      }
      if (n < 2) return (n = this.node()["__on" + type]) && n._;
      capture = false;
    }
    return this.each(d3_selection_on(type, listener, capture));
  };
  function d3_selection_on(type, listener, capture) {
    var name = "__on" + type, i = type.indexOf(".");
    if (i > 0) type = type.substring(0, i);
    function onRemove() {
      var wrapper = this[name];
      if (wrapper) {
        this.removeEventListener(type, wrapper, wrapper.$);
        delete this[name];
      }
    }
    function onAdd() {
      var node = this, args = d3_array(arguments);
      onRemove.call(this);
      this.addEventListener(type, this[name] = wrapper, wrapper.$ = capture);
      wrapper._ = listener;
      function wrapper(e) {
        var o = d3.event;
        d3.event = e;
        args[0] = node.__data__;
        try {
          listener.apply(node, args);
        } finally {
          d3.event = o;
        }
      }
    }
    return listener ? onAdd : onRemove;
  }
  d3_selectionPrototype.each = function(callback) {
    return d3_selection_each(this, function(node, i, j) {
      callback.call(node, node.__data__, i, j);
    });
  };
  function d3_selection_each(groups, callback) {
    for (var j = 0, m = groups.length; j < m; j++) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
        if (node = group[i]) callback(node, i, j);
      }
    }
    return groups;
  }
  d3_selectionPrototype.call = function(callback) {
    var args = d3_array(arguments);
    callback.apply(args[0] = this, args);
    return this;
  };
  d3_selectionPrototype.empty = function() {
    return !this.node();
  };
  d3_selectionPrototype.node = function() {
    for (var j = 0, m = this.length; j < m; j++) {
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        var node = group[i];
        if (node) return node;
      }
    }
    return null;
  };
  d3_selectionPrototype.transition = function() {
    var id = d3_transitionInheritId || ++d3_transitionId, subgroups = [], subgroup, node, transition = Object.create(d3_transitionInherit);
    transition.time = Date.now();
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) d3_transitionNode(node, i, id, transition);
        subgroup.push(node);
      }
    }
    return d3_transition(subgroups, id);
  };
  var d3_selectionRoot = d3_selection([ [ d3_document ] ]);
  d3_selectionRoot[0].parentNode = d3_selectRoot;
  d3.select = function(selector) {
    return typeof selector === "string" ? d3_selectionRoot.select(selector) : d3_selection([ [ selector ] ]);
  };
  d3.selectAll = function(selector) {
    return typeof selector === "string" ? d3_selectionRoot.selectAll(selector) : d3_selection([ d3_array(selector) ]);
  };
  function d3_selection_enter(selection) {
    d3_arraySubclass(selection, d3_selection_enterPrototype);
    return selection;
  }
  var d3_selection_enterPrototype = [];
  d3.selection.enter = d3_selection_enter;
  d3.selection.enter.prototype = d3_selection_enterPrototype;
  d3_selection_enterPrototype.append = d3_selectionPrototype.append;
  d3_selection_enterPrototype.insert = d3_selectionPrototype.insert;
  d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
  d3_selection_enterPrototype.node = d3_selectionPrototype.node;
  d3_selection_enterPrototype.select = function(selector) {
    var subgroups = [], subgroup, subnode, upgroup, group, node;
    for (var j = -1, m = this.length; ++j < m; ) {
      upgroup = (group = this[j]).update;
      subgroups.push(subgroup = []);
      subgroup.parentNode = group.parentNode;
      for (var i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i));
          subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_transition(groups, id) {
    d3_arraySubclass(groups, d3_transitionPrototype);
    groups.id = id;
    return groups;
  }
  var d3_transitionPrototype = [], d3_transitionId = 0, d3_transitionInheritId, d3_transitionInherit = {
    ease: d3_ease_cubicInOut,
    delay: 0,
    duration: 250
  };
  d3_transitionPrototype.call = d3_selectionPrototype.call;
  d3_transitionPrototype.empty = d3_selectionPrototype.empty;
  d3_transitionPrototype.node = d3_selectionPrototype.node;
  d3.transition = function(selection) {
    return arguments.length ? d3_transitionInheritId ? selection.transition() : selection : d3_selectionRoot.transition();
  };
  d3.transition.prototype = d3_transitionPrototype;
  function d3_transitionNode(node, i, id, inherit) {
    var lock = node.__transition__ || (node.__transition__ = {
      active: 0,
      count: 0
    }), transition = lock[id];
    if (!transition) {
      var time = inherit.time;
      transition = lock[id] = {
        tween: new d3_Map(),
        event: d3.dispatch("start", "end"),
        time: time,
        ease: inherit.ease,
        delay: inherit.delay,
        duration: inherit.duration
      };
      ++lock.count;
      d3.timer(function(elapsed) {
        var d = node.__data__, ease = transition.ease, event = transition.event, delay = transition.delay, duration = transition.duration, tweened = [];
        return delay <= elapsed ? start(elapsed) : d3.timer(start, delay, time), 1;
        function start(elapsed) {
          if (lock.active > id) return stop();
          lock.active = id;
          event.start.call(node, d, i);
          transition.tween.forEach(function(key, value) {
            if (value = value.call(node, d, i)) {
              tweened.push(value);
            }
          });
          if (!tick(elapsed)) d3.timer(tick, 0, time);
          return 1;
        }
        function tick(elapsed) {
          if (lock.active !== id) return stop();
          var t = (elapsed - delay) / duration, e = ease(t), n = tweened.length;
          while (n > 0) {
            tweened[--n].call(node, e);
          }
          if (t >= 1) {
            stop();
            event.end.call(node, d, i);
            return 1;
          }
        }
        function stop() {
          if (--lock.count) delete lock[id]; else delete node.__transition__;
          return 1;
        }
      }, 0, time);
      return transition;
    }
  }
  d3_transitionPrototype.select = function(selector) {
    var id = this.id, subgroups = [], subgroup, subnode, node;
    if (typeof selector !== "function") selector = d3_selection_selector(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          d3_transitionNode(subnode, i, id, node.__transition__[id]);
          subgroup.push(subnode);
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_transition(subgroups, id);
  };
  d3_transitionPrototype.selectAll = function(selector) {
    var id = this.id, subgroups = [], subgroup, subnodes, node, subnode, transition;
    if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          transition = node.__transition__[id];
          subnodes = selector.call(node, node.__data__, i);
          subgroups.push(subgroup = []);
          for (var k = -1, o = subnodes.length; ++k < o; ) {
            d3_transitionNode(subnode = subnodes[k], k, id, transition);
            subgroup.push(subnode);
          }
        }
      }
    }
    return d3_transition(subgroups, id);
  };
  d3_transitionPrototype.filter = function(filter) {
    var subgroups = [], subgroup, group, node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i)) {
          subgroup.push(node);
        }
      }
    }
    return d3_transition(subgroups, this.id, this.time).ease(this.ease());
  };
  d3_transitionPrototype.attr = function(nameNS, value) {
    if (arguments.length < 2) {
      for (value in nameNS) this.attr(value, nameNS[value]);
      return this;
    }
    var interpolate = d3_interpolateByName(nameNS), name = d3.ns.qualify(nameNS);
    function attrNull() {
      this.removeAttribute(name);
    }
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }
    return d3_transition_tween(this, "attr." + nameNS, value, function(b) {
      function attrString() {
        var a = this.getAttribute(name), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.setAttribute(name, i(t));
        });
      }
      function attrStringNS() {
        var a = this.getAttributeNS(name.space, name.local), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.setAttributeNS(name.space, name.local, i(t));
        });
      }
      return b == null ? name.local ? attrNullNS : attrNull : (b += "", name.local ? attrStringNS : attrString);
    });
  };
  d3_transitionPrototype.attrTween = function(nameNS, tween) {
    var name = d3.ns.qualify(nameNS);
    function attrTween(d, i) {
      var f = tween.call(this, d, i, this.getAttribute(name));
      return f && function(t) {
        this.setAttribute(name, f(t));
      };
    }
    function attrTweenNS(d, i) {
      var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
      return f && function(t) {
        this.setAttributeNS(name.space, name.local, f(t));
      };
    }
    return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
  };
  d3_transitionPrototype.style = function(name, value, priority) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";
        for (priority in name) this.style(priority, name[priority], value);
        return this;
      }
      priority = "";
    }
    var interpolate = d3_interpolateByName(name);
    function styleNull() {
      this.style.removeProperty(name);
    }
    return d3_transition_tween(this, "style." + name, value, function(b) {
      function styleString() {
        var a = d3_window.getComputedStyle(this, null).getPropertyValue(name), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.style.setProperty(name, i(t), priority);
        });
      }
      return b == null ? styleNull : (b += "", styleString);
    });
  };
  d3_transitionPrototype.styleTween = function(name, tween, priority) {
    if (arguments.length < 3) priority = "";
    return this.tween("style." + name, function(d, i) {
      var f = tween.call(this, d, i, d3_window.getComputedStyle(this, null).getPropertyValue(name));
      return f && function(t) {
        this.style.setProperty(name, f(t), priority);
      };
    });
  };
  d3_transitionPrototype.text = function(value) {
    return d3_transition_tween(this, "text", value, d3_transition_text);
  };
  function d3_transition_text(b) {
    if (b == null) b = "";
    return function() {
      this.textContent = b;
    };
  }
  d3_transitionPrototype.remove = function() {
    return this.each("end.transition", function() {
      var p;
      if (!this.__transition__ && (p = this.parentNode)) p.removeChild(this);
    });
  };
  d3_transitionPrototype.ease = function(value) {
    var id = this.id;
    if (arguments.length < 1) return this.node().__transition__[id].ease;
    if (typeof value !== "function") value = d3.ease.apply(d3, arguments);
    return d3_selection_each(this, function(node) {
      node.__transition__[id].ease = value;
    });
  };
  d3_transitionPrototype.delay = function(value) {
    var id = this.id;
    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
      node.__transition__[id].delay = value.call(node, node.__data__, i, j) | 0;
    } : (value |= 0, function(node) {
      node.__transition__[id].delay = value;
    }));
  };
  d3_transitionPrototype.duration = function(value) {
    var id = this.id;
    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
      node.__transition__[id].duration = Math.max(1, value.call(node, node.__data__, i, j) | 0);
    } : (value = Math.max(1, value | 0), function(node) {
      node.__transition__[id].duration = value;
    }));
  };
  d3_transitionPrototype.each = function(type, listener) {
    var id = this.id;
    if (arguments.length < 2) {
      var inherit = d3_transitionInherit, inheritId = d3_transitionInheritId;
      d3_transitionInheritId = id;
      d3_selection_each(this, function(node, i, j) {
        d3_transitionInherit = node.__transition__[id];
        type.call(node, node.__data__, i, j);
      });
      d3_transitionInherit = inherit;
      d3_transitionInheritId = inheritId;
    } else {
      d3_selection_each(this, function(node) {
        node.__transition__[id].event.on(type, listener);
      });
    }
    return this;
  };
  d3_transitionPrototype.transition = function() {
    var id0 = this.id, id1 = ++d3_transitionId, subgroups = [], subgroup, group, node, transition;
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          transition = Object.create(node.__transition__[id0]);
          transition.delay += transition.duration;
          d3_transitionNode(node, i, id1, transition);
        }
        subgroup.push(node);
      }
    }
    return d3_transition(subgroups, id1);
  };
  d3_transitionPrototype.tween = function(name, tween) {
    var id = this.id;
    if (arguments.length < 2) return this.node().__transition__[id].tween.get(name);
    return d3_selection_each(this, tween == null ? function(node) {
      node.__transition__[id].tween.remove(name);
    } : function(node) {
      node.__transition__[id].tween.set(name, tween);
    });
  };
  function d3_transition_tween(groups, name, value, tween) {
    var id = groups.id;
    return d3_selection_each(groups, typeof value === "function" ? function(node, i, j) {
      node.__transition__[id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
    } : (value = tween(value), function(node) {
      node.__transition__[id].tween.set(name, value);
    }));
  }
  var d3_timer_id = 0, d3_timer_byId = {}, d3_timer_queue = null, d3_timer_interval, d3_timer_timeout;
  d3.timer = function(callback, delay, then) {
    if (arguments.length < 3) {
      if (arguments.length < 2) delay = 0; else if (!isFinite(delay)) return;
      then = Date.now();
    }
    var timer = d3_timer_byId[callback.id];
    if (timer && timer.callback === callback) {
      timer.then = then;
      timer.delay = delay;
    } else d3_timer_byId[callback.id = ++d3_timer_id] = d3_timer_queue = {
      callback: callback,
      then: then,
      delay: delay,
      next: d3_timer_queue
    };
    if (!d3_timer_interval) {
      d3_timer_timeout = clearTimeout(d3_timer_timeout);
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }
  };
  function d3_timer_step() {
    var elapsed, now = Date.now(), t1 = d3_timer_queue;
    while (t1) {
      elapsed = now - t1.then;
      if (elapsed >= t1.delay) t1.flush = t1.callback(elapsed);
      t1 = t1.next;
    }
    var delay = d3_timer_flush() - now;
    if (delay > 24) {
      if (isFinite(delay)) {
        clearTimeout(d3_timer_timeout);
        d3_timer_timeout = setTimeout(d3_timer_step, delay);
      }
      d3_timer_interval = 0;
    } else {
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }
  }
  d3.timer.flush = function() {
    var elapsed, now = Date.now(), t1 = d3_timer_queue;
    while (t1) {
      elapsed = now - t1.then;
      if (!t1.delay) t1.flush = t1.callback(elapsed);
      t1 = t1.next;
    }
    d3_timer_flush();
  };
  function d3_timer_flush() {
    var t0 = null, t1 = d3_timer_queue, then = Infinity;
    while (t1) {
      if (t1.flush) {
        delete d3_timer_byId[t1.callback.id];
        t1 = t0 ? t0.next = t1.next : d3_timer_queue = t1.next;
      } else {
        then = Math.min(then, t1.then + t1.delay);
        t1 = (t0 = t1).next;
      }
    }
    return then;
  }
  var d3_timer_frame = d3_window.requestAnimationFrame || d3_window.webkitRequestAnimationFrame || d3_window.mozRequestAnimationFrame || d3_window.oRequestAnimationFrame || d3_window.msRequestAnimationFrame || function(callback) {
    setTimeout(callback, 17);
  };
  d3.mouse = function(container) {
    return d3_mousePoint(container, d3_eventSource());
  };
  var d3_mouse_bug44083 = /WebKit/.test(d3_window.navigator.userAgent) ? -1 : 0;
  function d3_mousePoint(container, e) {
    var svg = container.ownerSVGElement || container;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      if (d3_mouse_bug44083 < 0 && (d3_window.scrollX || d3_window.scrollY)) {
        svg = d3.select(d3_document.body).append("svg").style("position", "absolute").style("top", 0).style("left", 0);
        var ctm = svg[0][0].getScreenCTM();
        d3_mouse_bug44083 = !(ctm.f || ctm.e);
        svg.remove();
      }
      if (d3_mouse_bug44083) {
        point.x = e.pageX;
        point.y = e.pageY;
      } else {
        point.x = e.clientX;
        point.y = e.clientY;
      }
      point = point.matrixTransform(container.getScreenCTM().inverse());
      return [ point.x, point.y ];
    }
    var rect = container.getBoundingClientRect();
    return [ e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop ];
  }
  d3.touches = function(container, touches) {
    if (arguments.length < 2) touches = d3_eventSource().touches;
    return touches ? d3_array(touches).map(function(touch) {
      var point = d3_mousePoint(container, touch);
      point.identifier = touch.identifier;
      return point;
    }) : [];
  };
  function d3_noop() {}
  d3.scale = {};
  function d3_scaleExtent(domain) {
    var start = domain[0], stop = domain[domain.length - 1];
    return start < stop ? [ start, stop ] : [ stop, start ];
  }
  function d3_scaleRange(scale) {
    return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
  }
  function d3_scale_nice(domain, nice) {
    var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], dx;
    if (x1 < x0) {
      dx = i0, i0 = i1, i1 = dx;
      dx = x0, x0 = x1, x1 = dx;
    }
    if (nice = nice(x1 - x0)) {
      domain[i0] = nice.floor(x0);
      domain[i1] = nice.ceil(x1);
    }
    return domain;
  }
  function d3_scale_niceDefault() {
    return Math;
  }
  d3.scale.linear = function() {
    return d3_scale_linear([ 0, 1 ], [ 0, 1 ], d3.interpolate, false);
  };
  function d3_scale_linear(domain, range, interpolate, clamp) {
    var output, input;
    function rescale() {
      var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear, uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
      output = linear(domain, range, uninterpolate, interpolate);
      input = linear(range, domain, uninterpolate, d3.interpolate);
      return scale;
    }
    function scale(x) {
      return output(x);
    }
    scale.invert = function(y) {
      return input(y);
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(Number);
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.rangeRound = function(x) {
      return scale.range(x).interpolate(d3.interpolateRound);
    };
    scale.clamp = function(x) {
      if (!arguments.length) return clamp;
      clamp = x;
      return rescale();
    };
    scale.interpolate = function(x) {
      if (!arguments.length) return interpolate;
      interpolate = x;
      return rescale();
    };
    scale.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    scale.tickFormat = function(m) {
      return d3_scale_linearTickFormat(domain, m);
    };
    scale.nice = function() {
      d3_scale_nice(domain, d3_scale_linearNice);
      return rescale();
    };
    scale.copy = function() {
      return d3_scale_linear(domain, range, interpolate, clamp);
    };
    return rescale();
  }
  function d3_scale_linearRebind(scale, linear) {
    return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
  }
  function d3_scale_linearNice(dx) {
    dx = Math.pow(10, Math.round(Math.log(dx) / Math.LN10) - 1);
    return dx && {
      floor: function(x) {
        return Math.floor(x / dx) * dx;
      },
      ceil: function(x) {
        return Math.ceil(x / dx) * dx;
      }
    };
  }
  function d3_scale_linearTickRange(domain, m) {
    var extent = d3_scaleExtent(domain), span = extent[1] - extent[0], step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)), err = m / span * step;
    if (err <= .15) step *= 10; else if (err <= .35) step *= 5; else if (err <= .75) step *= 2;
    extent[0] = Math.ceil(extent[0] / step) * step;
    extent[1] = Math.floor(extent[1] / step) * step + step * .5;
    extent[2] = step;
    return extent;
  }
  function d3_scale_linearTicks(domain, m) {
    return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
  }
  function d3_scale_linearTickFormat(domain, m) {
    return d3.format(",." + Math.max(0, -Math.floor(Math.log(d3_scale_linearTickRange(domain, m)[2]) / Math.LN10 + .01)) + "f");
  }
  function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
    var u = uninterpolate(domain[0], domain[1]), i = interpolate(range[0], range[1]);
    return function(x) {
      return i(u(x));
    };
  }
  function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
    var u = [], i = [], j = 0, k = Math.min(domain.length, range.length) - 1;
    if (domain[k] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }
    while (++j <= k) {
      u.push(uninterpolate(domain[j - 1], domain[j]));
      i.push(interpolate(range[j - 1], range[j]));
    }
    return function(x) {
      var j = d3.bisect(domain, x, 1, k) - 1;
      return i[j](u[j](x));
    };
  }
  d3.scale.log = function() {
    return d3_scale_log(d3.scale.linear(), d3_scale_logp);
  };
  function d3_scale_log(linear, log) {
    var pow = log.pow;
    function scale(x) {
      return linear(log(x));
    }
    scale.invert = function(x) {
      return pow(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return linear.domain().map(pow);
      log = x[0] < 0 ? d3_scale_logn : d3_scale_logp;
      pow = log.pow;
      linear.domain(x.map(log));
      return scale;
    };
    scale.nice = function() {
      linear.domain(d3_scale_nice(linear.domain(), d3_scale_niceDefault));
      return scale;
    };
    scale.ticks = function() {
      var extent = d3_scaleExtent(linear.domain()), ticks = [];
      if (extent.every(isFinite)) {
        var i = Math.floor(extent[0]), j = Math.ceil(extent[1]), u = pow(extent[0]), v = pow(extent[1]);
        if (log === d3_scale_logn) {
          ticks.push(pow(i));
          for (;i++ < j; ) for (var k = 9; k > 0; k--) ticks.push(pow(i) * k);
        } else {
          for (;i < j; i++) for (var k = 1; k < 10; k++) ticks.push(pow(i) * k);
          ticks.push(pow(i));
        }
        for (i = 0; ticks[i] < u; i++) {}
        for (j = ticks.length; ticks[j - 1] > v; j--) {}
        ticks = ticks.slice(i, j);
      }
      return ticks;
    };
    scale.tickFormat = function(n, format) {
      if (arguments.length < 2) format = d3_scale_logFormat;
      if (!arguments.length) return format;
      var k = Math.max(.1, n / scale.ticks().length), f = log === d3_scale_logn ? (e = -1e-12, 
      Math.floor) : (e = 1e-12, Math.ceil), e;
      return function(d) {
        return d / pow(f(log(d) + e)) <= k ? format(d) : "";
      };
    };
    scale.copy = function() {
      return d3_scale_log(linear.copy(), log);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  var d3_scale_logFormat = d3.format(".0e");
  function d3_scale_logp(x) {
    return Math.log(x < 0 ? 0 : x) / Math.LN10;
  }
  function d3_scale_logn(x) {
    return -Math.log(x > 0 ? 0 : -x) / Math.LN10;
  }
  d3_scale_logp.pow = function(x) {
    return Math.pow(10, x);
  };
  d3_scale_logn.pow = function(x) {
    return -Math.pow(10, -x);
  };
  d3.scale.pow = function() {
    return d3_scale_pow(d3.scale.linear(), 1);
  };
  function d3_scale_pow(linear, exponent) {
    var powp = d3_scale_powPow(exponent), powb = d3_scale_powPow(1 / exponent);
    function scale(x) {
      return linear(powp(x));
    }
    scale.invert = function(x) {
      return powb(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return linear.domain().map(powb);
      linear.domain(x.map(powp));
      return scale;
    };
    scale.ticks = function(m) {
      return d3_scale_linearTicks(scale.domain(), m);
    };
    scale.tickFormat = function(m) {
      return d3_scale_linearTickFormat(scale.domain(), m);
    };
    scale.nice = function() {
      return scale.domain(d3_scale_nice(scale.domain(), d3_scale_linearNice));
    };
    scale.exponent = function(x) {
      if (!arguments.length) return exponent;
      var domain = scale.domain();
      powp = d3_scale_powPow(exponent = x);
      powb = d3_scale_powPow(1 / exponent);
      return scale.domain(domain);
    };
    scale.copy = function() {
      return d3_scale_pow(linear.copy(), exponent);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  function d3_scale_powPow(e) {
    return function(x) {
      return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
    };
  }
  d3.scale.sqrt = function() {
    return d3.scale.pow().exponent(.5);
  };
  d3.scale.ordinal = function() {
    return d3_scale_ordinal([], {
      t: "range",
      a: [ [] ]
    });
  };
  function d3_scale_ordinal(domain, ranger) {
    var index, range, rangeBand;
    function scale(x) {
      return range[((index.get(x) || index.set(x, domain.push(x))) - 1) % range.length];
    }
    function steps(start, step) {
      return d3.range(domain.length).map(function(i) {
        return start + step * i;
      });
    }
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = [];
      index = new d3_Map();
      var i = -1, n = x.length, xi;
      while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
      return scale[ranger.t].apply(scale, ranger.a);
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      rangeBand = 0;
      ranger = {
        t: "range",
        a: arguments
      };
      return scale;
    };
    scale.rangePoints = function(x, padding) {
      if (arguments.length < 2) padding = 0;
      var start = x[0], stop = x[1], step = (stop - start) / (Math.max(1, domain.length - 1) + padding);
      range = steps(domain.length < 2 ? (start + stop) / 2 : start + step * padding / 2, step);
      rangeBand = 0;
      ranger = {
        t: "rangePoints",
        a: arguments
      };
      return scale;
    };
    scale.rangeBands = function(x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = (stop - start) / (domain.length - padding + 2 * outerPadding);
      range = steps(start + step * outerPadding, step);
      if (reverse) range.reverse();
      rangeBand = step * (1 - padding);
      ranger = {
        t: "rangeBands",
        a: arguments
      };
      return scale;
    };
    scale.rangeRoundBands = function(x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding)), error = stop - start - (domain.length - padding) * step;
      range = steps(start + Math.round(error / 2), step);
      if (reverse) range.reverse();
      rangeBand = Math.round(step * (1 - padding));
      ranger = {
        t: "rangeRoundBands",
        a: arguments
      };
      return scale;
    };
    scale.rangeBand = function() {
      return rangeBand;
    };
    scale.rangeExtent = function() {
      return d3_scaleExtent(ranger.a[0]);
    };
    scale.copy = function() {
      return d3_scale_ordinal(domain, ranger);
    };
    return scale.domain(domain);
  }
  d3.scale.category10 = function() {
    return d3.scale.ordinal().range(d3_category10);
  };
  d3.scale.category20 = function() {
    return d3.scale.ordinal().range(d3_category20);
  };
  d3.scale.category20b = function() {
    return d3.scale.ordinal().range(d3_category20b);
  };
  d3.scale.category20c = function() {
    return d3.scale.ordinal().range(d3_category20c);
  };
  var d3_category10 = [ "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf" ];
  var d3_category20 = [ "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5" ];
  var d3_category20b = [ "#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6" ];
  var d3_category20c = [ "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9" ];
  d3.scale.quantile = function() {
    return d3_scale_quantile([], []);
  };
  function d3_scale_quantile(domain, range) {
    var thresholds;
    function rescale() {
      var k = 0, q = range.length;
      thresholds = [];
      while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
      return scale;
    }
    function scale(x) {
      if (isNaN(x = +x)) return NaN;
      return range[d3.bisect(thresholds, x)];
    }
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x.filter(function(d) {
        return !isNaN(d);
      }).sort(d3.ascending);
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.quantiles = function() {
      return thresholds;
    };
    scale.copy = function() {
      return d3_scale_quantile(domain, range);
    };
    return rescale();
  }
  d3.scale.quantize = function() {
    return d3_scale_quantize(0, 1, [ 0, 1 ]);
  };
  function d3_scale_quantize(x0, x1, range) {
    var kx, i;
    function scale(x) {
      return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
    }
    function rescale() {
      kx = range.length / (x1 - x0);
      i = range.length - 1;
      return scale;
    }
    scale.domain = function(x) {
      if (!arguments.length) return [ x0, x1 ];
      x0 = +x[0];
      x1 = +x[x.length - 1];
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.copy = function() {
      return d3_scale_quantize(x0, x1, range);
    };
    return rescale();
  }
  d3.scale.threshold = function() {
    return d3_scale_threshold([ .5 ], [ 0, 1 ]);
  };
  function d3_scale_threshold(domain, range) {
    function scale(x) {
      return range[d3.bisect(domain, x)];
    }
    scale.domain = function(_) {
      if (!arguments.length) return domain;
      domain = _;
      return scale;
    };
    scale.range = function(_) {
      if (!arguments.length) return range;
      range = _;
      return scale;
    };
    scale.copy = function() {
      return d3_scale_threshold(domain, range);
    };
    return scale;
  }
  d3.scale.identity = function() {
    return d3_scale_identity([ 0, 1 ]);
  };
  function d3_scale_identity(domain) {
    function identity(x) {
      return +x;
    }
    identity.invert = identity;
    identity.domain = identity.range = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(identity);
      return identity;
    };
    identity.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    identity.tickFormat = function(m) {
      return d3_scale_linearTickFormat(domain, m);
    };
    identity.copy = function() {
      return d3_scale_identity(domain);
    };
    return identity;
  }
  d3.svg = {};
  d3.svg.arc = function() {
    var innerRadius = d3_svg_arcInnerRadius, outerRadius = d3_svg_arcOuterRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
    function arc() {
      var r0 = innerRadius.apply(this, arguments), r1 = outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset, a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset, da = (a1 < a0 && (da = a0, 
      a0 = a1, a1 = da), a1 - a0), df = da < π ? "0" : "1", c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
      return da >= d3_svg_arcMax ? r0 ? "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "M0," + r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + -r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + r0 + "Z" : "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "Z" : r0 ? "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L" + r0 * c1 + "," + r0 * s1 + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0 + "Z" : "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L0,0" + "Z";
    }
    arc.innerRadius = function(v) {
      if (!arguments.length) return innerRadius;
      innerRadius = d3_functor(v);
      return arc;
    };
    arc.outerRadius = function(v) {
      if (!arguments.length) return outerRadius;
      outerRadius = d3_functor(v);
      return arc;
    };
    arc.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return arc;
    };
    arc.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return arc;
    };
    arc.centroid = function() {
      var r = (innerRadius.apply(this, arguments) + outerRadius.apply(this, arguments)) / 2, a = (startAngle.apply(this, arguments) + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
      return [ Math.cos(a) * r, Math.sin(a) * r ];
    };
    return arc;
  };
  var d3_svg_arcOffset = -π / 2, d3_svg_arcMax = 2 * π - 1e-6;
  function d3_svg_arcInnerRadius(d) {
    return d.innerRadius;
  }
  function d3_svg_arcOuterRadius(d) {
    return d.outerRadius;
  }
  function d3_svg_arcStartAngle(d) {
    return d.startAngle;
  }
  function d3_svg_arcEndAngle(d) {
    return d.endAngle;
  }
  function d3_svg_line(projection) {
    var x = d3_svg_lineX, y = d3_svg_lineY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, tension = .7;
    function line(data) {
      var segments = [], points = [], i = -1, n = data.length, d, fx = d3_functor(x), fy = d3_functor(y);
      function segment() {
        segments.push("M", interpolate(projection(points), tension));
      }
      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points.push([ +fx.call(this, d, i), +fy.call(this, d, i) ]);
        } else if (points.length) {
          segment();
          points = [];
        }
      }
      if (points.length) segment();
      return segments.length ? segments.join("") : null;
    }
    line.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      return line;
    };
    line.y = function(_) {
      if (!arguments.length) return y;
      y = _;
      return line;
    };
    line.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _;
      return line;
    };
    line.interpolate = function(_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      return line;
    };
    line.tension = function(_) {
      if (!arguments.length) return tension;
      tension = _;
      return line;
    };
    return line;
  }
  d3.svg.line = function() {
    return d3_svg_line(d3_identity);
  };
  function d3_svg_lineX(d) {
    return d[0];
  }
  function d3_svg_lineY(d) {
    return d[1];
  }
  var d3_svg_lineInterpolators = d3.map({
    linear: d3_svg_lineLinear,
    "linear-closed": d3_svg_lineLinearClosed,
    "step-before": d3_svg_lineStepBefore,
    "step-after": d3_svg_lineStepAfter,
    basis: d3_svg_lineBasis,
    "basis-open": d3_svg_lineBasisOpen,
    "basis-closed": d3_svg_lineBasisClosed,
    bundle: d3_svg_lineBundle,
    cardinal: d3_svg_lineCardinal,
    "cardinal-open": d3_svg_lineCardinalOpen,
    "cardinal-closed": d3_svg_lineCardinalClosed,
    monotone: d3_svg_lineMonotone
  });
  d3_svg_lineInterpolators.forEach(function(key, value) {
    value.key = key;
    value.closed = /-closed$/.test(key);
  });
  function d3_svg_lineLinear(points) {
    return points.join("L");
  }
  function d3_svg_lineLinearClosed(points) {
    return d3_svg_lineLinear(points) + "Z";
  }
  function d3_svg_lineStepBefore(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
    return path.join("");
  }
  function d3_svg_lineStepAfter(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
    return path.join("");
  }
  function d3_svg_lineCardinalOpen(points, tension) {
    return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, points.length - 1), d3_svg_lineCardinalTangents(points, tension));
  }
  function d3_svg_lineCardinalClosed(points, tension) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), 
    points), d3_svg_lineCardinalTangents([ points[points.length - 2] ].concat(points, [ points[1] ]), tension));
  }
  function d3_svg_lineCardinal(points, tension) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension));
  }
  function d3_svg_lineHermite(points, tangents) {
    if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
      return d3_svg_lineLinear(points);
    }
    var quad = points.length != tangents.length, path = "", p0 = points[0], p = points[1], t0 = tangents[0], t = t0, pi = 1;
    if (quad) {
      path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
      p0 = points[1];
      pi = 2;
    }
    if (tangents.length > 1) {
      t = tangents[1];
      p = points[pi];
      pi++;
      path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
      for (var i = 2; i < tangents.length; i++, pi++) {
        p = points[pi];
        t = tangents[i];
        path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
      }
    }
    if (quad) {
      var lp = points[pi];
      path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1];
    }
    return path;
  }
  function d3_svg_lineCardinalTangents(points, tension) {
    var tangents = [], a = (1 - tension) / 2, p0, p1 = points[0], p2 = points[1], i = 1, n = points.length;
    while (++i < n) {
      p0 = p1;
      p1 = p2;
      p2 = points[i];
      tangents.push([ a * (p2[0] - p0[0]), a * (p2[1] - p0[1]) ]);
    }
    return tangents;
  }
  function d3_svg_lineBasis(points) {
    if (points.length < 3) return d3_svg_lineLinear(points);
    var i = 1, n = points.length, pi = points[0], x0 = pi[0], y0 = pi[1], px = [ x0, x0, x0, (pi = points[1])[0] ], py = [ y0, y0, y0, pi[1] ], path = [ x0, ",", y0 ];
    d3_svg_lineBasisBezier(path, px, py);
    while (++i < n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    i = -1;
    while (++i < 2) {
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBasisOpen(points) {
    if (points.length < 4) return d3_svg_lineLinear(points);
    var path = [], i = -1, n = points.length, pi, px = [ 0 ], py = [ 0 ];
    while (++i < 3) {
      pi = points[i];
      px.push(pi[0]);
      py.push(pi[1]);
    }
    path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
    --i;
    while (++i < n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBasisClosed(points) {
    var path, i = -1, n = points.length, m = n + 4, pi, px = [], py = [];
    while (++i < 4) {
      pi = points[i % n];
      px.push(pi[0]);
      py.push(pi[1]);
    }
    path = [ d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
    --i;
    while (++i < m) {
      pi = points[i % n];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBundle(points, tension) {
    var n = points.length - 1;
    if (n) {
      var x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1, p, t;
      while (++i <= n) {
        p = points[i];
        t = i / n;
        p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
        p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
      }
    }
    return d3_svg_lineBasis(points);
  }
  function d3_svg_lineDot4(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }
  var d3_svg_lineBasisBezier1 = [ 0, 2 / 3, 1 / 3, 0 ], d3_svg_lineBasisBezier2 = [ 0, 1 / 3, 2 / 3, 0 ], d3_svg_lineBasisBezier3 = [ 0, 1 / 6, 2 / 3, 1 / 6 ];
  function d3_svg_lineBasisBezier(path, x, y) {
    path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
  }
  function d3_svg_lineSlope(p0, p1) {
    return (p1[1] - p0[1]) / (p1[0] - p0[0]);
  }
  function d3_svg_lineFiniteDifferences(points) {
    var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1);
    while (++i < j) {
      m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
    }
    m[i] = d;
    return m;
  }
  function d3_svg_lineMonotoneTangents(points) {
    var tangents = [], d, a, b, s, m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1;
    while (++i < j) {
      d = d3_svg_lineSlope(points[i], points[i + 1]);
      if (Math.abs(d) < 1e-6) {
        m[i] = m[i + 1] = 0;
      } else {
        a = m[i] / d;
        b = m[i + 1] / d;
        s = a * a + b * b;
        if (s > 9) {
          s = d * 3 / Math.sqrt(s);
          m[i] = s * a;
          m[i + 1] = s * b;
        }
      }
    }
    i = -1;
    while (++i <= j) {
      s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
      tangents.push([ s || 0, m[i] * s || 0 ]);
    }
    return tangents;
  }
  function d3_svg_lineMonotone(points) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
  }
  d3.svg.line.radial = function() {
    var line = d3_svg_line(d3_svg_lineRadial);
    line.radius = line.x, delete line.x;
    line.angle = line.y, delete line.y;
    return line;
  };
  function d3_svg_lineRadial(points) {
    var point, i = -1, n = points.length, r, a;
    while (++i < n) {
      point = points[i];
      r = point[0];
      a = point[1] + d3_svg_arcOffset;
      point[0] = r * Math.cos(a);
      point[1] = r * Math.sin(a);
    }
    return points;
  }
  function d3_svg_area(projection) {
    var x0 = d3_svg_lineX, x1 = d3_svg_lineX, y0 = 0, y1 = d3_svg_lineY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, interpolateReverse = interpolate, L = "L", tension = .7;
    function area(data) {
      var segments = [], points0 = [], points1 = [], i = -1, n = data.length, d, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function() {
        return x;
      } : d3_functor(x1), fy1 = y0 === y1 ? function() {
        return y;
      } : d3_functor(y1), x, y;
      function segment() {
        segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z");
      }
      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points0.push([ x = +fx0.call(this, d, i), y = +fy0.call(this, d, i) ]);
          points1.push([ +fx1.call(this, d, i), +fy1.call(this, d, i) ]);
        } else if (points0.length) {
          segment();
          points0 = [];
          points1 = [];
        }
      }
      if (points0.length) segment();
      return segments.length ? segments.join("") : null;
    }
    area.x = function(_) {
      if (!arguments.length) return x1;
      x0 = x1 = _;
      return area;
    };
    area.x0 = function(_) {
      if (!arguments.length) return x0;
      x0 = _;
      return area;
    };
    area.x1 = function(_) {
      if (!arguments.length) return x1;
      x1 = _;
      return area;
    };
    area.y = function(_) {
      if (!arguments.length) return y1;
      y0 = y1 = _;
      return area;
    };
    area.y0 = function(_) {
      if (!arguments.length) return y0;
      y0 = _;
      return area;
    };
    area.y1 = function(_) {
      if (!arguments.length) return y1;
      y1 = _;
      return area;
    };
    area.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _;
      return area;
    };
    area.interpolate = function(_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      interpolateReverse = interpolate.reverse || interpolate;
      L = interpolate.closed ? "M" : "L";
      return area;
    };
    area.tension = function(_) {
      if (!arguments.length) return tension;
      tension = _;
      return area;
    };
    return area;
  }
  d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
  d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;
  d3.svg.area = function() {
    return d3_svg_area(d3_identity);
  };
  d3.svg.area.radial = function() {
    var area = d3_svg_area(d3_svg_lineRadial);
    area.radius = area.x, delete area.x;
    area.innerRadius = area.x0, delete area.x0;
    area.outerRadius = area.x1, delete area.x1;
    area.angle = area.y, delete area.y;
    area.startAngle = area.y0, delete area.y0;
    area.endAngle = area.y1, delete area.y1;
    return area;
  };
  d3.svg.chord = function() {
    var source = d3_source, target = d3_target, radius = d3_svg_chordRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
    function chord(d, i) {
      var s = subgroup(this, source, d, i), t = subgroup(this, target, d, i);
      return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z";
    }
    function subgroup(self, f, d, i) {
      var subgroup = f.call(self, d, i), r = radius.call(self, subgroup, i), a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset, a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
      return {
        r: r,
        a0: a0,
        a1: a1,
        p0: [ r * Math.cos(a0), r * Math.sin(a0) ],
        p1: [ r * Math.cos(a1), r * Math.sin(a1) ]
      };
    }
    function equals(a, b) {
      return a.a0 == b.a0 && a.a1 == b.a1;
    }
    function arc(r, p, a) {
      return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p;
    }
    function curve(r0, p0, r1, p1) {
      return "Q 0,0 " + p1;
    }
    chord.radius = function(v) {
      if (!arguments.length) return radius;
      radius = d3_functor(v);
      return chord;
    };
    chord.source = function(v) {
      if (!arguments.length) return source;
      source = d3_functor(v);
      return chord;
    };
    chord.target = function(v) {
      if (!arguments.length) return target;
      target = d3_functor(v);
      return chord;
    };
    chord.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return chord;
    };
    chord.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return chord;
    };
    return chord;
  };
  function d3_svg_chordRadius(d) {
    return d.radius;
  }
  d3.svg.diagonal = function() {
    var source = d3_source, target = d3_target, projection = d3_svg_diagonalProjection;
    function diagonal(d, i) {
      var p0 = source.call(this, d, i), p3 = target.call(this, d, i), m = (p0.y + p3.y) / 2, p = [ p0, {
        x: p0.x,
        y: m
      }, {
        x: p3.x,
        y: m
      }, p3 ];
      p = p.map(projection);
      return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
    }
    diagonal.source = function(x) {
      if (!arguments.length) return source;
      source = d3_functor(x);
      return diagonal;
    };
    diagonal.target = function(x) {
      if (!arguments.length) return target;
      target = d3_functor(x);
      return diagonal;
    };
    diagonal.projection = function(x) {
      if (!arguments.length) return projection;
      projection = x;
      return diagonal;
    };
    return diagonal;
  };
  function d3_svg_diagonalProjection(d) {
    return [ d.x, d.y ];
  }
  d3.svg.diagonal.radial = function() {
    var diagonal = d3.svg.diagonal(), projection = d3_svg_diagonalProjection, projection_ = diagonal.projection;
    diagonal.projection = function(x) {
      return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection;
    };
    return diagonal;
  };
  function d3_svg_diagonalRadialProjection(projection) {
    return function() {
      var d = projection.apply(this, arguments), r = d[0], a = d[1] + d3_svg_arcOffset;
      return [ r * Math.cos(a), r * Math.sin(a) ];
    };
  }
  d3.svg.symbol = function() {
    var type = d3_svg_symbolType, size = d3_svg_symbolSize;
    function symbol(d, i) {
      return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i));
    }
    symbol.type = function(x) {
      if (!arguments.length) return type;
      type = d3_functor(x);
      return symbol;
    };
    symbol.size = function(x) {
      if (!arguments.length) return size;
      size = d3_functor(x);
      return symbol;
    };
    return symbol;
  };
  function d3_svg_symbolSize() {
    return 64;
  }
  function d3_svg_symbolType() {
    return "circle";
  }
  function d3_svg_symbolCircle(size) {
    var r = Math.sqrt(size / π);
    return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
  }
  var d3_svg_symbols = d3.map({
    circle: d3_svg_symbolCircle,
    cross: function(size) {
      var r = Math.sqrt(size / 5) / 2;
      return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
    },
    diamond: function(size) {
      var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)), rx = ry * d3_svg_symbolTan30;
      return "M0," + -ry + "L" + rx + ",0" + " 0," + ry + " " + -rx + ",0" + "Z";
    },
    square: function(size) {
      var r = Math.sqrt(size) / 2;
      return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
    },
    "triangle-down": function(size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z";
    },
    "triangle-up": function(size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z";
    }
  });
  d3.svg.symbolTypes = d3_svg_symbols.keys();
  var d3_svg_symbolSqrt3 = Math.sqrt(3), d3_svg_symbolTan30 = Math.tan(30 * d3_radians);
  d3.svg.axis = function() {
    var scale = d3.scale.linear(), orient = d3_svg_axisDefaultOrient, tickMajorSize = 6, tickMinorSize = 6, tickEndSize = 6, tickPadding = 3, tickArguments_ = [ 10 ], tickValues = null, tickFormat_, tickSubdivide = 0;
    function axis(g) {
      g.each(function() {
        var g = d3.select(this);
        var ticks = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments_) : scale.domain() : tickValues, tickFormat = tickFormat_ == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments_) : String : tickFormat_;
        if (orient != "bottom") {
          var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide), subtick = g.selectAll(".tick.minor").data(subticks, String), subtickEnter = subtick.enter().insert("line", ".tick").attr("class", "tick minor").style("opacity", 1e-6), subtickExit = d3.transition(subtick.exit()).style("opacity", 1e-6).remove(), subtickUpdate = d3.transition(subtick).style("opacity", 1);
        }
        var tick = g.selectAll("g").data(ticks, String), tickEnter = tick.enter().append("g", "path").style("opacity", 1e-6), tickExit = d3.transition(tick.exit()).style("opacity", 1e-6).remove(), tickUpdate = d3.transition(tick).style("opacity", 1), tickTransform;
        var scale1 = scale.copy(), scale0 = this.__chart__ || scale1;
        this.__chart__ = scale1;
        var range = d3_scaleRange(scale), path = g.selectAll(".domain").data([ 0 ]);
        path.enter().insert("path", ":first-child").attr("class", "domain"), pathUpdate = d3.transition(path);
        if (orient == "bottom") tickEnter.append("circle").attr("r", 4).attr("class", "tick"); else tickEnter.append("line").attr("class", "tick");
        tickEnter.append("text");
        var lineEnter = tickEnter.select("line"), lineUpdate = tickUpdate.select("line"), text = tick.select("text").text(tickFormat), textEnter = tickEnter.select("text"), textUpdate = tickUpdate.select("text");
        switch (orient) {
         case "bottom":
          {
            tickTransform = d3_svg_axisX;
            lineEnter.attr("y2", tickMajorSize);
            textEnter.attr("y", Math.max(tickMajorSize, 0) + tickPadding);
            lineUpdate.attr("x2", 0).attr("y2", tickMajorSize);
            textUpdate.attr("x", 0).attr("y", Math.max(tickMajorSize, 0) + tickPadding);
            text.attr("dy", ".71em").style("text-anchor", "middle");
            pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize);
            break;
          }

         case "top":
          {
            tickTransform = d3_svg_axisX;
            subtickEnter.attr("y2", -tickMinorSize);
            subtickUpdate.attr("x2", 0).attr("y2", -tickMinorSize);
            lineEnter.attr("y2", -tickMajorSize);
            textEnter.attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
            lineUpdate.attr("x2", 0).attr("y2", -tickMajorSize);
            textUpdate.attr("x", 0).attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
            text.attr("dy", "0em").style("text-anchor", "middle");
            pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize);
            break;
          }

         case "left":
          {
            tickTransform = d3_svg_axisY;
            subtickEnter.attr("x2", -tickMinorSize);
            subtickUpdate.attr("x2", -tickMinorSize).attr("y2", 0);
            lineEnter.attr("x2", -tickMajorSize);
            textEnter.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding));
            lineUpdate.attr("x2", -tickMajorSize).attr("y2", 0);
            textUpdate.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("y", 0);
            text.attr("dy", ".32em").style("text-anchor", "end");
            pathUpdate.attr("d", "M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize);
            break;
          }

         case "right":
          {
            tickTransform = d3_svg_axisY;
            subtickEnter.attr("x2", tickMinorSize);
            subtickUpdate.attr("x2", tickMinorSize).attr("y2", 0);
            lineEnter.attr("x2", tickMajorSize);
            textEnter.attr("x", Math.max(tickMajorSize, 0) + tickPadding);
            lineUpdate.attr("x2", tickMajorSize).attr("y2", 0);
            textUpdate.attr("x", Math.max(tickMajorSize, 0) + tickPadding).attr("y", 0);
            text.attr("dy", ".32em").style("text-anchor", "start");
            pathUpdate.attr("d", "M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize);
            break;
          }
        }
        if (scale.ticks) {
          tickEnter.call(tickTransform, scale0);
          tickUpdate.call(tickTransform, scale1);
          tickExit.call(tickTransform, scale1);
          if (orient != "bottom") {
            subtickEnter.call(tickTransform, scale0);
            subtickUpdate.call(tickTransform, scale1);
            subtickExit.call(tickTransform, scale1);
          }
        } else {
          var dx = scale1.rangeBand() / 2, x = function(d) {
            return scale1(d) + dx;
          };
          tickEnter.call(tickTransform, x);
          tickUpdate.call(tickTransform, x);
        }
      });
    }
    axis.scale = function(x) {
      if (!arguments.length) return scale;
      scale = x;
      return axis;
    };
    axis.orient = function(x) {
      if (!arguments.length) return orient;
      orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
      return axis;
    };
    axis.ticks = function() {
      if (!arguments.length) return tickArguments_;
      tickArguments_ = arguments;
      return axis;
    };
    axis.tickValues = function(x) {
      if (!arguments.length) return tickValues;
      tickValues = x;
      return axis;
    };
    axis.tickFormat = function(x) {
      if (!arguments.length) return tickFormat_;
      tickFormat_ = x;
      return axis;
    };
    axis.tickSize = function(x, y) {
      if (!arguments.length) return tickMajorSize;
      var n = arguments.length - 1;
      tickMajorSize = +x;
      tickMinorSize = n > 1 ? +y : tickMajorSize;
      tickEndSize = n > 0 ? +arguments[n] : tickMajorSize;
      return axis;
    };
    axis.tickPadding = function(x) {
      if (!arguments.length) return tickPadding;
      tickPadding = +x;
      return axis;
    };
    axis.tickSubdivide = function(x) {
      if (!arguments.length) return tickSubdivide;
      tickSubdivide = +x;
      return axis;
    };
    return axis;
  };
  var d3_svg_axisDefaultOrient = "bottom", d3_svg_axisOrients = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  };
  function d3_svg_axisX(selection, x) {
    selection.attr("transform", function(d) {
      return "translate(" + x(d) + ",0)";
    });
  }
  function d3_svg_axisY(selection, y) {
    selection.attr("transform", function(d) {
      return "translate(0," + y(d) + ")";
    });
  }
  function d3_svg_axisSubdivide(scale, ticks, m) {
    subticks = [];
    if (m && ticks.length > 1) {
      var extent = d3_scaleExtent(scale.domain()), subticks, i = -1, n = ticks.length, d = (ticks[1] - ticks[0]) / ++m, j, v;
      while (++i < n) {
        for (j = m; --j > 0; ) {
          if ((v = +ticks[i] - j * d) >= extent[0]) {
            subticks.push(v);
          }
        }
      }
      for (--i, j = 0; ++j < m && (v = +ticks[i] + j * d) < extent[1]; ) {
        subticks.push(v);
      }
    }
    return subticks;
  }
  d3.svg.brush = function() {
    var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"), x = null, y = null, resizes = d3_svg_brushResizes[0], extent = [ [ 0, 0 ], [ 0, 0 ] ], extentDomain;
    function brush(g) {
      g.each(function() {
        var g = d3.select(this), bg = g.selectAll(".background").data([ 0 ]), fg = g.selectAll(".extent").data([ 0 ]), tz = g.selectAll(".resize").data(resizes, String), e;
        g.style("pointer-events", "all").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart);
        bg.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
        fg.enter().append("rect").attr("class", "extent").style("cursor", "move");
        tz.enter().append("g").attr("class", function(d) {
          return "resize " + d;
        }).style("cursor", function(d) {
          return d3_svg_brushCursor[d];
        }).append("rect").attr("x", function(d) {
          return /[ew]$/.test(d) ? -3 : null;
        }).attr("y", function(d) {
          return /^[ns]/.test(d) ? -3 : null;
        }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
        tz.style("display", brush.empty() ? "none" : null);
        tz.exit().remove();
        if (x) {
          e = d3_scaleRange(x);
          bg.attr("x", e[0]).attr("width", e[1] - e[0]);
          redrawX(g);
        }
        if (y) {
          e = d3_scaleRange(y);
          bg.attr("y", e[0]).attr("height", e[1] - e[0]);
          redrawY(g);
        }
        redraw(g);
      });
    }
    function redraw(g) {
      g.selectAll(".resize").attr("transform", function(d) {
        return "translate(" + extent[+/e$/.test(d)][0] + "," + extent[+/^s/.test(d)][1] + ")";
      });
    }
    function redrawX(g) {
      g.select(".extent").attr("x", extent[0][0]);
      g.selectAll(".extent,.n>rect,.s>rect").attr("width", extent[1][0] - extent[0][0]);
    }
    function redrawY(g) {
      g.select(".extent").attr("y", extent[0][1]);
      g.selectAll(".extent,.e>rect,.w>rect").attr("height", extent[1][1] - extent[0][1]);
    }
    function brushstart() {
      var target = this, eventTarget = d3.select(d3.event.target), event_ = event.of(target, arguments), g = d3.select(target), resizing = eventTarget.datum(), resizingX = !/^(n|s)$/.test(resizing) && x, resizingY = !/^(e|w)$/.test(resizing) && y, dragging = eventTarget.classed("extent"), center, origin = mouse(), offset;
      var w = d3.select(d3_window).on("mousemove.brush", brushmove).on("mouseup.brush", brushend).on("touchmove.brush", brushmove).on("touchend.brush", brushend).on("keydown.brush", keydown).on("keyup.brush", keyup);
      if (dragging) {
        origin[0] = extent[0][0] - origin[0];
        origin[1] = extent[0][1] - origin[1];
      } else if (resizing) {
        var ex = +/w$/.test(resizing), ey = +/^n/.test(resizing);
        offset = [ extent[1 - ex][0] - origin[0], extent[1 - ey][1] - origin[1] ];
        origin[0] = extent[ex][0];
        origin[1] = extent[ey][1];
      } else if (d3.event.altKey) center = origin.slice();
      g.style("pointer-events", "none").selectAll(".resize").style("display", null);
      d3.select("body").style("cursor", eventTarget.style("cursor"));
      event_({
        type: "brushstart"
      });
      brushmove();
      d3_eventCancel();
      function mouse() {
        var touches = d3.event.changedTouches;
        return touches ? d3.touches(target, touches)[0] : d3.mouse(target);
      }
      function keydown() {
        if (d3.event.keyCode == 32) {
          if (!dragging) {
            center = null;
            origin[0] -= extent[1][0];
            origin[1] -= extent[1][1];
            dragging = 2;
          }
          d3_eventCancel();
        }
      }
      function keyup() {
        if (d3.event.keyCode == 32 && dragging == 2) {
          origin[0] += extent[1][0];
          origin[1] += extent[1][1];
          dragging = 0;
          d3_eventCancel();
        }
      }
      function brushmove() {
        var point = mouse(), moved = false;
        if (offset) {
          point[0] += offset[0];
          point[1] += offset[1];
        }
        if (!dragging) {
          if (d3.event.altKey) {
            if (!center) center = [ (extent[0][0] + extent[1][0]) / 2, (extent[0][1] + extent[1][1]) / 2 ];
            origin[0] = extent[+(point[0] < center[0])][0];
            origin[1] = extent[+(point[1] < center[1])][1];
          } else center = null;
        }
        if (resizingX && move1(point, x, 0)) {
          redrawX(g);
          moved = true;
        }
        if (resizingY && move1(point, y, 1)) {
          redrawY(g);
          moved = true;
        }
        if (moved) {
          redraw(g);
          event_({
            type: "brush",
            mode: dragging ? "move" : "resize"
          });
        }
      }
      function move1(point, scale, i) {
        var range = d3_scaleRange(scale), r0 = range[0], r1 = range[1], position = origin[i], size = extent[1][i] - extent[0][i], min, max;
        if (dragging) {
          r0 -= position;
          r1 -= size + position;
        }
        min = Math.max(r0, Math.min(r1, point[i]));
        if (dragging) {
          max = (min += position) + size;
        } else {
          if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));
          if (position < min) {
            max = min;
            min = position;
          } else {
            max = position;
          }
        }
        if (extent[0][i] !== min || extent[1][i] !== max) {
          extentDomain = null;
          extent[0][i] = min;
          extent[1][i] = max;
          return true;
        }
      }
      function brushend() {
        brushmove();
        g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
        d3.select("body").style("cursor", null);
        w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
        event_({
          type: "brushend"
        });
        d3_eventCancel();
      }
    }
    brush.x = function(z) {
      if (!arguments.length) return x;
      x = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };
    brush.y = function(z) {
      if (!arguments.length) return y;
      y = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };
    brush.extent = function(z) {
      var x0, x1, y0, y1, t;
      if (!arguments.length) {
        z = extentDomain || extent;
        if (x) {
          x0 = z[0][0], x1 = z[1][0];
          if (!extentDomain) {
            x0 = extent[0][0], x1 = extent[1][0];
            if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
            if (x1 < x0) t = x0, x0 = x1, x1 = t;
          }
        }
        if (y) {
          y0 = z[0][1], y1 = z[1][1];
          if (!extentDomain) {
            y0 = extent[0][1], y1 = extent[1][1];
            if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
            if (y1 < y0) t = y0, y0 = y1, y1 = t;
          }
        }
        return x && y ? [ [ x0, y0 ], [ x1, y1 ] ] : x ? [ x0, x1 ] : y && [ y0, y1 ];
      }
      extentDomain = [ [ 0, 0 ], [ 0, 0 ] ];
      if (x) {
        x0 = z[0], x1 = z[1];
        if (y) x0 = x0[0], x1 = x1[0];
        extentDomain[0][0] = x0, extentDomain[1][0] = x1;
        if (x.invert) x0 = x(x0), x1 = x(x1);
        if (x1 < x0) t = x0, x0 = x1, x1 = t;
        extent[0][0] = x0 | 0, extent[1][0] = x1 | 0;
      }
      if (y) {
        y0 = z[0], y1 = z[1];
        if (x) y0 = y0[1], y1 = y1[1];
        extentDomain[0][1] = y0, extentDomain[1][1] = y1;
        if (y.invert) y0 = y(y0), y1 = y(y1);
        if (y1 < y0) t = y0, y0 = y1, y1 = t;
        extent[0][1] = y0 | 0, extent[1][1] = y1 | 0;
      }
      return brush;
    };
    brush.clear = function() {
      extentDomain = null;
      extent[0][0] = extent[0][1] = extent[1][0] = extent[1][1] = 0;
      return brush;
    };
    brush.empty = function() {
      return x && extent[0][0] === extent[1][0] || y && extent[0][1] === extent[1][1];
    };
    return d3.rebind(brush, event, "on");
  };
  var d3_svg_brushCursor = {
    n: "ns-resize",
    e: "ew-resize",
    s: "ns-resize",
    w: "ew-resize",
    nw: "nwse-resize",
    ne: "nesw-resize",
    se: "nwse-resize",
    sw: "nesw-resize"
  };
  var d3_svg_brushResizes = [ [ "n", "e", "s", "w", "nw", "ne", "se", "sw" ], [ "e", "w" ], [ "n", "s" ], [] ];
  d3.behavior = {};
  d3.behavior.drag = function() {
    var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"), origin = null;
    function drag() {
      this.on("mousedown.drag", mousedown).on("touchstart.drag", mousedown);
    }
    function mousedown() {
      var target = this, event_ = event.of(target, arguments), eventTarget = d3.event.target, touchId = d3.event.touches ? d3.event.changedTouches[0].identifier : null, offset, origin_ = point(), moved = 0;
      var w = d3.select(d3_window).on(touchId != null ? "touchmove.drag-" + touchId : "mousemove.drag", dragmove).on(touchId != null ? "touchend.drag-" + touchId : "mouseup.drag", dragend, true);
      if (origin) {
        offset = origin.apply(target, arguments);
        offset = [ offset.x - origin_[0], offset.y - origin_[1] ];
      } else {
        offset = [ 0, 0 ];
      }
      if (touchId == null) d3_eventCancel();
      event_({
        type: "dragstart"
      });
      function point() {
        var p = target.parentNode;
        return touchId != null ? d3.touches(p).filter(function(p) {
          return p.identifier === touchId;
        })[0] : d3.mouse(p);
      }
      function dragmove() {
        if (!target.parentNode) return dragend();
        var p = point(), dx = p[0] - origin_[0], dy = p[1] - origin_[1];
        moved |= dx | dy;
        origin_ = p;
        d3_eventCancel();
        event_({
          type: "drag",
          x: p[0] + offset[0],
          y: p[1] + offset[1],
          dx: dx,
          dy: dy
        });
      }
      function dragend() {
        event_({
          type: "dragend"
        });
        if (moved) {
          d3_eventCancel();
          if (d3.event.target === eventTarget) w.on("click.drag", click, true);
        }
        w.on(touchId != null ? "touchmove.drag-" + touchId : "mousemove.drag", null).on(touchId != null ? "touchend.drag-" + touchId : "mouseup.drag", null);
      }
      function click() {
        d3_eventCancel();
        w.on("click.drag", null);
      }
    }
    drag.origin = function(x) {
      if (!arguments.length) return origin;
      origin = x;
      return drag;
    };
    return d3.rebind(drag, event, "on");
  };
  d3.behavior.zoom = function() {
    var translate = [ 0, 0 ], translate0, scale = 1, scale0, scaleExtent = d3_behavior_zoomInfinity, event = d3_eventDispatch(zoom, "zoom"), x0, x1, y0, y1, touchtime;
    function zoom() {
      this.on("mousedown.zoom", mousedown).on("mousemove.zoom", mousemove).on(d3_behavior_zoomWheel + ".zoom", mousewheel).on("dblclick.zoom", dblclick).on("touchstart.zoom", touchstart).on("touchmove.zoom", touchmove).on("touchend.zoom", touchstart);
    }
    zoom.translate = function(x) {
      if (!arguments.length) return translate;
      translate = x.map(Number);
      rescale();
      return zoom;
    };
    zoom.scale = function(x) {
      if (!arguments.length) return scale;
      scale = +x;
      rescale();
      return zoom;
    };
    zoom.scaleExtent = function(x) {
      if (!arguments.length) return scaleExtent;
      scaleExtent = x == null ? d3_behavior_zoomInfinity : x.map(Number);
      return zoom;
    };
    zoom.x = function(z) {
      if (!arguments.length) return x1;
      x1 = z;
      x0 = z.copy();
      translate = [ 0, 0 ];
      scale = 1;
      return zoom;
    };
    zoom.y = function(z) {
      if (!arguments.length) return y1;
      y1 = z;
      y0 = z.copy();
      translate = [ 0, 0 ];
      scale = 1;
      return zoom;
    };
    function location(p) {
      return [ (p[0] - translate[0]) / scale, (p[1] - translate[1]) / scale ];
    }
    function point(l) {
      return [ l[0] * scale + translate[0], l[1] * scale + translate[1] ];
    }
    function scaleTo(s) {
      scale = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
    }
    function translateTo(p, l) {
      l = point(l);
      translate[0] += p[0] - l[0];
      translate[1] += p[1] - l[1];
    }
    function rescale() {
      if (x1) x1.domain(x0.range().map(function(x) {
        return (x - translate[0]) / scale;
      }).map(x0.invert));
      if (y1) y1.domain(y0.range().map(function(y) {
        return (y - translate[1]) / scale;
      }).map(y0.invert));
    }
    function dispatch(event) {
      rescale();
      d3.event.preventDefault();
      event({
        type: "zoom",
        scale: scale,
        translate: translate
      });
    }
    function mousedown() {
      var target = this, event_ = event.of(target, arguments), eventTarget = d3.event.target, moved = 0, w = d3.select(d3_window).on("mousemove.zoom", mousemove).on("mouseup.zoom", mouseup), l = location(d3.mouse(target));
      d3_window.focus();
      d3_eventCancel();
      function mousemove() {
        moved = 1;
        translateTo(d3.mouse(target), l);
        dispatch(event_);
      }
      function mouseup() {
        if (moved) d3_eventCancel();
        w.on("mousemove.zoom", null).on("mouseup.zoom", null);
        if (moved && d3.event.target === eventTarget) w.on("click.zoom", click, true);
      }
      function click() {
        d3_eventCancel();
        w.on("click.zoom", null);
      }
    }
    function mousewheel() {
      if (!translate0) translate0 = location(d3.mouse(this));
      scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * scale);
      translateTo(d3.mouse(this), translate0);
      dispatch(event.of(this, arguments));
    }
    function mousemove() {
      translate0 = null;
    }
    function dblclick() {
      var p = d3.mouse(this), l = location(p), k = Math.log(scale) / Math.LN2;
      scaleTo(Math.pow(2, d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1));
      translateTo(p, l);
      dispatch(event.of(this, arguments));
    }
    function touchstart() {
      var touches = d3.touches(this), now = Date.now();
      scale0 = scale;
      translate0 = {};
      touches.forEach(function(t) {
        translate0[t.identifier] = location(t);
      });
      d3_eventCancel();
      if (touches.length === 1) {
        if (now - touchtime < 500) {
          var p = touches[0], l = location(touches[0]);
          scaleTo(scale * 2);
          translateTo(p, l);
          dispatch(event.of(this, arguments));
        }
        touchtime = now;
      }
    }
    function touchmove() {
      var touches = d3.touches(this), p0 = touches[0], l0 = translate0[p0.identifier];
      if (p1 = touches[1]) {
        var p1, l1 = translate0[p1.identifier];
        p0 = [ (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 ];
        l0 = [ (l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2 ];
        scaleTo(d3.event.scale * scale0);
      }
      translateTo(p0, l0);
      touchtime = null;
      dispatch(event.of(this, arguments));
    }
    return d3.rebind(zoom, event, "on");
  };
  var d3_behavior_zoomInfinity = [ 0, Infinity ];
  var d3_behavior_zoomDelta, d3_behavior_zoomWheel = "onwheel" in document ? (d3_behavior_zoomDelta = function() {
    return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1);
  }, "wheel") : "onmousewheel" in document ? (d3_behavior_zoomDelta = function() {
    return d3.event.wheelDelta;
  }, "mousewheel") : (d3_behavior_zoomDelta = function() {
    return -d3.event.detail;
  }, "MozMousePixelScroll");
  d3.layout = {};
  d3.layout.bundle = function() {
    return function(links) {
      var paths = [], i = -1, n = links.length;
      while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
      return paths;
    };
  };
  function d3_layout_bundlePath(link) {
    var start = link.source, end = link.target, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [ start ];
    while (start !== lca) {
      start = start.parent;
      points.push(start);
    }
    var k = points.length;
    while (end !== lca) {
      points.splice(k, 0, end);
      end = end.parent;
    }
    return points;
  }
  function d3_layout_bundleAncestors(node) {
    var ancestors = [], parent = node.parent;
    while (parent != null) {
      ancestors.push(node);
      node = parent;
      parent = parent.parent;
    }
    ancestors.push(node);
    return ancestors;
  }
  function d3_layout_bundleLeastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null;
    while (aNode === bNode) {
      sharedNode = aNode;
      aNode = aNodes.pop();
      bNode = bNodes.pop();
    }
    return sharedNode;
  }
  d3.layout.chord = function() {
    var chord = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
    function relayout() {
      var subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [], k, x, x0, i, j;
      chords = [];
      groups = [];
      k = 0, i = -1;
      while (++i < n) {
        x = 0, j = -1;
        while (++j < n) {
          x += matrix[i][j];
        }
        groupSums.push(x);
        subgroupIndex.push(d3.range(n));
        k += x;
      }
      if (sortGroups) {
        groupIndex.sort(function(a, b) {
          return sortGroups(groupSums[a], groupSums[b]);
        });
      }
      if (sortSubgroups) {
        subgroupIndex.forEach(function(d, i) {
          d.sort(function(a, b) {
            return sortSubgroups(matrix[i][a], matrix[i][b]);
          });
        });
      }
      k = (2 * π - padding * n) / k;
      x = 0, i = -1;
      while (++i < n) {
        x0 = x, j = -1;
        while (++j < n) {
          var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
          subgroups[di + "-" + dj] = {
            index: di,
            subindex: dj,
            startAngle: a0,
            endAngle: a1,
            value: v
          };
        }
        groups[di] = {
          index: di,
          startAngle: x0,
          endAngle: x,
          value: (x - x0) / k
        };
        x += padding;
      }
      i = -1;
      while (++i < n) {
        j = i - 1;
        while (++j < n) {
          var source = subgroups[i + "-" + j], target = subgroups[j + "-" + i];
          if (source.value || target.value) {
            chords.push(source.value < target.value ? {
              source: target,
              target: source
            } : {
              source: source,
              target: target
            });
          }
        }
      }
      if (sortChords) resort();
    }
    function resort() {
      chords.sort(function(a, b) {
        return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
      });
    }
    chord.matrix = function(x) {
      if (!arguments.length) return matrix;
      n = (matrix = x) && matrix.length;
      chords = groups = null;
      return chord;
    };
    chord.padding = function(x) {
      if (!arguments.length) return padding;
      padding = x;
      chords = groups = null;
      return chord;
    };
    chord.sortGroups = function(x) {
      if (!arguments.length) return sortGroups;
      sortGroups = x;
      chords = groups = null;
      return chord;
    };
    chord.sortSubgroups = function(x) {
      if (!arguments.length) return sortSubgroups;
      sortSubgroups = x;
      chords = null;
      return chord;
    };
    chord.sortChords = function(x) {
      if (!arguments.length) return sortChords;
      sortChords = x;
      if (chords) resort();
      return chord;
    };
    chord.chords = function() {
      if (!chords) relayout();
      return chords;
    };
    chord.groups = function() {
      if (!groups) relayout();
      return groups;
    };
    return chord;
  };
  d3.layout.force = function() {
    var force = {}, event = d3.dispatch("start", "tick", "end"), size = [ 1, 1 ], drag, alpha, friction = .9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, gravity = .1, theta = .8, nodes = [], links = [], distances, strengths, charges;
    function repulse(node) {
      return function(quad, x1, _, x2) {
        if (quad.point !== node) {
          var dx = quad.cx - node.x, dy = quad.cy - node.y, dn = 1 / Math.sqrt(dx * dx + dy * dy);
          if ((x2 - x1) * dn < theta) {
            var k = quad.charge * dn * dn;
            node.px -= dx * k;
            node.py -= dy * k;
            return true;
          }
          if (quad.point && isFinite(dn)) {
            var k = quad.pointCharge * dn * dn;
            node.px -= dx * k;
            node.py -= dy * k;
          }
        }
        return !quad.charge;
      };
    }
    force.tick = function() {
      if ((alpha *= .99) < .005) {
        event.end({
          type: "end",
          alpha: alpha = 0
        });
        return true;
      }
      var n = nodes.length, m = links.length, q, i, o, s, t, l, k, x, y;
      for (i = 0; i < m; ++i) {
        o = links[i];
        s = o.source;
        t = o.target;
        x = t.x - s.x;
        y = t.y - s.y;
        if (l = x * x + y * y) {
          l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
          x *= l;
          y *= l;
          t.x -= x * (k = s.weight / (t.weight + s.weight));
          t.y -= y * k;
          s.x += x * (k = 1 - k);
          s.y += y * k;
        }
      }
      if (k = alpha * gravity) {
        x = size[0] / 2;
        y = size[1] / 2;
        i = -1;
        if (k) while (++i < n) {
          o = nodes[i];
          o.x += (x - o.x) * k;
          o.y += (y - o.y) * k;
        }
      }
      if (charge) {
        d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
        i = -1;
        while (++i < n) {
          if (!(o = nodes[i]).fixed) {
            q.visit(repulse(o));
          }
        }
      }
      i = -1;
      while (++i < n) {
        o = nodes[i];
        if (o.fixed) {
          o.x = o.px;
          o.y = o.py;
        } else {
          o.x -= (o.px - (o.px = o.x)) * friction;
          o.y -= (o.py - (o.py = o.y)) * friction;
        }
      }
      event.tick({
        type: "tick",
        alpha: alpha
      });
    };
    force.nodes = function(x) {
      if (!arguments.length) return nodes;
      nodes = x;
      return force;
    };
    force.links = function(x) {
      if (!arguments.length) return links;
      links = x;
      return force;
    };
    force.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return force;
    };
    force.linkDistance = function(x) {
      if (!arguments.length) return linkDistance;
      linkDistance = typeof x === "function" ? x : +x;
      return force;
    };
    force.distance = force.linkDistance;
    force.linkStrength = function(x) {
      if (!arguments.length) return linkStrength;
      linkStrength = typeof x === "function" ? x : +x;
      return force;
    };
    force.friction = function(x) {
      if (!arguments.length) return friction;
      friction = +x;
      return force;
    };
    force.charge = function(x) {
      if (!arguments.length) return charge;
      charge = typeof x === "function" ? x : +x;
      return force;
    };
    force.gravity = function(x) {
      if (!arguments.length) return gravity;
      gravity = +x;
      return force;
    };
    force.theta = function(x) {
      if (!arguments.length) return theta;
      theta = +x;
      return force;
    };
    force.alpha = function(x) {
      if (!arguments.length) return alpha;
      x = +x;
      if (alpha) {
        if (x > 0) alpha = x; else alpha = 0;
      } else if (x > 0) {
        event.start({
          type: "start",
          alpha: alpha = x
        });
        d3.timer(force.tick);
      }
      return force;
    };
    force.start = function() {
      var i, j, n = nodes.length, m = links.length, w = size[0], h = size[1], neighbors, o;
      for (i = 0; i < n; ++i) {
        (o = nodes[i]).index = i;
        o.weight = 0;
      }
      for (i = 0; i < m; ++i) {
        o = links[i];
        if (typeof o.source == "number") o.source = nodes[o.source];
        if (typeof o.target == "number") o.target = nodes[o.target];
        ++o.source.weight;
        ++o.target.weight;
      }
      for (i = 0; i < n; ++i) {
        o = nodes[i];
        if (isNaN(o.x)) o.x = position("x", w);
        if (isNaN(o.y)) o.y = position("y", h);
        if (isNaN(o.px)) o.px = o.x;
        if (isNaN(o.py)) o.py = o.y;
      }
      distances = [];
      if (typeof linkDistance === "function") for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i); else for (i = 0; i < m; ++i) distances[i] = linkDistance;
      strengths = [];
      if (typeof linkStrength === "function") for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i); else for (i = 0; i < m; ++i) strengths[i] = linkStrength;
      charges = [];
      if (typeof charge === "function") for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i); else for (i = 0; i < n; ++i) charges[i] = charge;
      function position(dimension, size) {
        var neighbors = neighbor(i), j = -1, m = neighbors.length, x;
        while (++j < m) if (!isNaN(x = neighbors[j][dimension])) return x;
        return Math.random() * size;
      }
      function neighbor() {
        if (!neighbors) {
          neighbors = [];
          for (j = 0; j < n; ++j) {
            neighbors[j] = [];
          }
          for (j = 0; j < m; ++j) {
            var o = links[j];
            neighbors[o.source.index].push(o.target);
            neighbors[o.target.index].push(o.source);
          }
        }
        return neighbors[i];
      }
      return force.resume();
    };
    force.resume = function() {
      return force.alpha(.1);
    };
    force.stop = function() {
      return force.alpha(0);
    };
    force.drag = function() {
      if (!drag) drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend);
      if (!arguments.length) return drag;
      this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag);
    };
    function dragmove(d) {
      d.px = d3.event.x, d.py = d3.event.y;
      force.resume();
    }
    return d3.rebind(force, event, "on");
  };
  function d3_layout_forceDragstart(d) {
    d.fixed |= 2;
  }
  function d3_layout_forceDragend(d) {
    d.fixed &= ~6;
  }
  function d3_layout_forceMouseover(d) {
    d.fixed |= 4;
    d.px = d.x, d.py = d.y;
  }
  function d3_layout_forceMouseout(d) {
    d.fixed &= ~4;
  }
  function d3_layout_forceAccumulate(quad, alpha, charges) {
    var cx = 0, cy = 0;
    quad.charge = 0;
    if (!quad.leaf) {
      var nodes = quad.nodes, n = nodes.length, i = -1, c;
      while (++i < n) {
        c = nodes[i];
        if (c == null) continue;
        d3_layout_forceAccumulate(c, alpha, charges);
        quad.charge += c.charge;
        cx += c.charge * c.cx;
        cy += c.charge * c.cy;
      }
    }
    if (quad.point) {
      if (!quad.leaf) {
        quad.point.x += Math.random() - .5;
        quad.point.y += Math.random() - .5;
      }
      var k = alpha * charges[quad.point.index];
      quad.charge += quad.pointCharge = k;
      cx += k * quad.point.x;
      cy += k * quad.point.y;
    }
    quad.cx = cx / quad.charge;
    quad.cy = cy / quad.charge;
  }
  var d3_layout_forceLinkDistance = 20, d3_layout_forceLinkStrength = 1;
  d3.layout.partition = function() {
    var hierarchy = d3.layout.hierarchy(), size = [ 1, 1 ];
    function position(node, x, dx, dy) {
      var children = node.children;
      node.x = x;
      node.y = node.depth * dy;
      node.dx = dx;
      node.dy = dy;
      if (children && (n = children.length)) {
        var i = -1, n, c, d;
        dx = node.value ? dx / node.value : 0;
        while (++i < n) {
          position(c = children[i], x, d = c.value * dx, dy);
          x += d;
        }
      }
    }
    function depth(node) {
      var children = node.children, d = 0;
      if (children && (n = children.length)) {
        var i = -1, n;
        while (++i < n) d = Math.max(d, depth(children[i]));
      }
      return 1 + d;
    }
    function partition(d, i) {
      var nodes = hierarchy.call(this, d, i);
      position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
      return nodes;
    }
    partition.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return partition;
    };
    return d3_layout_hierarchyRebind(partition, hierarchy);
  };
  d3.layout.pie = function() {
    var value = Number, sort = d3_layout_pieSortByValue, startAngle = 0, endAngle = 2 * π;
    function pie(data) {
      var values = data.map(function(d, i) {
        return +value.call(pie, d, i);
      });
      var a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle);
      var k = ((typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - startAngle) / d3.sum(values);
      var index = d3.range(data.length);
      if (sort != null) index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
        return values[j] - values[i];
      } : function(i, j) {
        return sort(data[i], data[j]);
      });
      var arcs = [];
      index.forEach(function(i) {
        var d;
        arcs[i] = {
          data: data[i],
          value: d = values[i],
          startAngle: a,
          endAngle: a += d * k
        };
      });
      return arcs;
    }
    pie.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return pie;
    };
    pie.sort = function(x) {
      if (!arguments.length) return sort;
      sort = x;
      return pie;
    };
    pie.startAngle = function(x) {
      if (!arguments.length) return startAngle;
      startAngle = x;
      return pie;
    };
    pie.endAngle = function(x) {
      if (!arguments.length) return endAngle;
      endAngle = x;
      return pie;
    };
    return pie;
  };
  var d3_layout_pieSortByValue = {};
  d3.layout.stack = function() {
    var values = d3_identity, order = d3_layout_stackOrderDefault, offset = d3_layout_stackOffsetZero, out = d3_layout_stackOut, x = d3_layout_stackX, y = d3_layout_stackY;
    function stack(data, index) {
      var series = data.map(function(d, i) {
        return values.call(stack, d, i);
      });
      var points = series.map(function(d) {
        return d.map(function(v, i) {
          return [ x.call(stack, v, i), y.call(stack, v, i) ];
        });
      });
      var orders = order.call(stack, points, index);
      series = d3.permute(series, orders);
      points = d3.permute(points, orders);
      var offsets = offset.call(stack, points, index);
      var n = series.length, m = series[0].length, i, j, o;
      for (j = 0; j < m; ++j) {
        out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
        for (i = 1; i < n; ++i) {
          out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
        }
      }
      return data;
    }
    stack.values = function(x) {
      if (!arguments.length) return values;
      values = x;
      return stack;
    };
    stack.order = function(x) {
      if (!arguments.length) return order;
      order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
      return stack;
    };
    stack.offset = function(x) {
      if (!arguments.length) return offset;
      offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
      return stack;
    };
    stack.x = function(z) {
      if (!arguments.length) return x;
      x = z;
      return stack;
    };
    stack.y = function(z) {
      if (!arguments.length) return y;
      y = z;
      return stack;
    };
    stack.out = function(z) {
      if (!arguments.length) return out;
      out = z;
      return stack;
    };
    return stack;
  };
  function d3_layout_stackX(d) {
    return d.x;
  }
  function d3_layout_stackY(d) {
    return d.y;
  }
  function d3_layout_stackOut(d, y0, y) {
    d.y0 = y0;
    d.y = y;
  }
  var d3_layout_stackOrders = d3.map({
    "inside-out": function(data) {
      var n = data.length, i, j, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d3.range(n).sort(function(a, b) {
        return max[a] - max[b];
      }), top = 0, bottom = 0, tops = [], bottoms = [];
      for (i = 0; i < n; ++i) {
        j = index[i];
        if (top < bottom) {
          top += sums[j];
          tops.push(j);
        } else {
          bottom += sums[j];
          bottoms.push(j);
        }
      }
      return bottoms.reverse().concat(tops);
    },
    reverse: function(data) {
      return d3.range(data.length).reverse();
    },
    "default": d3_layout_stackOrderDefault
  });
  var d3_layout_stackOffsets = d3.map({
    silhouette: function(data) {
      var n = data.length, m = data[0].length, sums = [], max = 0, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o > max) max = o;
        sums.push(o);
      }
      for (j = 0; j < m; ++j) {
        y0[j] = (max - sums[j]) / 2;
      }
      return y0;
    },
    wiggle: function(data) {
      var n = data.length, x = data[0], m = x.length, i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
      y0[0] = o = o0 = 0;
      for (j = 1; j < m; ++j) {
        for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
        for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
          for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
            s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
          }
          s2 += s3 * data[i][j][1];
        }
        y0[j] = o -= s1 ? s2 / s1 * dx : 0;
        if (o < o0) o0 = o;
      }
      for (j = 0; j < m; ++j) y0[j] -= o0;
      return y0;
    },
    expand: function(data) {
      var n = data.length, m = data[0].length, k = 1 / n, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o) for (i = 0; i < n; i++) data[i][j][1] /= o; else for (i = 0; i < n; i++) data[i][j][1] = k;
      }
      for (j = 0; j < m; ++j) y0[j] = 0;
      return y0;
    },
    zero: d3_layout_stackOffsetZero
  });
  function d3_layout_stackOrderDefault(data) {
    return d3.range(data.length);
  }
  function d3_layout_stackOffsetZero(data) {
    var j = -1, m = data[0].length, y0 = [];
    while (++j < m) y0[j] = 0;
    return y0;
  }
  function d3_layout_stackMaxIndex(array) {
    var i = 1, j = 0, v = array[0][1], k, n = array.length;
    for (;i < n; ++i) {
      if ((k = array[i][1]) > v) {
        j = i;
        v = k;
      }
    }
    return j;
  }
  function d3_layout_stackReduceSum(d) {
    return d.reduce(d3_layout_stackSum, 0);
  }
  function d3_layout_stackSum(p, d) {
    return p + d[1];
  }
  d3.layout.histogram = function() {
    var frequency = true, valuer = Number, ranger = d3_layout_histogramRange, binner = d3_layout_histogramBinSturges;
    function histogram(data, i) {
      var bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), bin, i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n, x;
      while (++i < m) {
        bin = bins[i] = [];
        bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
        bin.y = 0;
      }
      if (m > 0) {
        i = -1;
        while (++i < n) {
          x = values[i];
          if (x >= range[0] && x <= range[1]) {
            bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
            bin.y += k;
            bin.push(data[i]);
          }
        }
      }
      return bins;
    }
    histogram.value = function(x) {
      if (!arguments.length) return valuer;
      valuer = x;
      return histogram;
    };
    histogram.range = function(x) {
      if (!arguments.length) return ranger;
      ranger = d3_functor(x);
      return histogram;
    };
    histogram.bins = function(x) {
      if (!arguments.length) return binner;
      binner = typeof x === "number" ? function(range) {
        return d3_layout_histogramBinFixed(range, x);
      } : d3_functor(x);
      return histogram;
    };
    histogram.frequency = function(x) {
      if (!arguments.length) return frequency;
      frequency = !!x;
      return histogram;
    };
    return histogram;
  };
  function d3_layout_histogramBinSturges(range, values) {
    return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
  }
  function d3_layout_histogramBinFixed(range, n) {
    var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
    while (++x <= n) f[x] = m * x + b;
    return f;
  }
  function d3_layout_histogramRange(values) {
    return [ d3.min(values), d3.max(values) ];
  }
  d3.layout.hierarchy = function() {
    var sort = d3_layout_hierarchySort, children = d3_layout_hierarchyChildren, value = d3_layout_hierarchyValue;
    function recurse(node, depth, nodes) {
      var childs = children.call(hierarchy, node, depth);
      node.depth = depth;
      nodes.push(node);
      if (childs && (n = childs.length)) {
        var i = -1, n, c = node.children = [], v = 0, j = depth + 1, d;
        while (++i < n) {
          d = recurse(childs[i], j, nodes);
          d.parent = node;
          c.push(d);
          v += d.value;
        }
        if (sort) c.sort(sort);
        if (value) node.value = v;
      } else if (value) {
        node.value = +value.call(hierarchy, node, depth) || 0;
      }
      return node;
    }
    function revalue(node, depth) {
      var children = node.children, v = 0;
      if (children && (n = children.length)) {
        var i = -1, n, j = depth + 1;
        while (++i < n) v += revalue(children[i], j);
      } else if (value) {
        v = +value.call(hierarchy, node, depth) || 0;
      }
      if (value) node.value = v;
      return v;
    }
    function hierarchy(d) {
      var nodes = [];
      recurse(d, 0, nodes);
      return nodes;
    }
    hierarchy.sort = function(x) {
      if (!arguments.length) return sort;
      sort = x;
      return hierarchy;
    };
    hierarchy.children = function(x) {
      if (!arguments.length) return children;
      children = x;
      return hierarchy;
    };
    hierarchy.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return hierarchy;
    };
    hierarchy.revalue = function(root) {
      revalue(root, 0);
      return root;
    };
    return hierarchy;
  };
  function d3_layout_hierarchyRebind(object, hierarchy) {
    d3.rebind(object, hierarchy, "sort", "children", "value");
    object.nodes = object;
    object.links = d3_layout_hierarchyLinks;
    return object;
  }
  function d3_layout_hierarchyChildren(d) {
    return d.children;
  }
  function d3_layout_hierarchyValue(d) {
    return d.value;
  }
  function d3_layout_hierarchySort(a, b) {
    return b.value - a.value;
  }
  function d3_layout_hierarchyLinks(nodes) {
    return d3.merge(nodes.map(function(parent) {
      return (parent.children || []).map(function(child) {
        return {
          source: parent,
          target: child
        };
      });
    }));
  }
  d3.layout.pack = function() {
    var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort), padding = 0, size = [ 1, 1 ];
    function pack(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0];
      root.x = 0;
      root.y = 0;
      d3_layout_treeVisitAfter(root, function(d) {
        d.r = Math.sqrt(d.value);
      });
      d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
      var w = size[0], h = size[1], k = Math.max(2 * root.r / w, 2 * root.r / h);
      if (padding > 0) {
        var dr = padding * k / 2;
        d3_layout_treeVisitAfter(root, function(d) {
          d.r += dr;
        });
        d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
        d3_layout_treeVisitAfter(root, function(d) {
          d.r -= dr;
        });
        k = Math.max(2 * root.r / w, 2 * root.r / h);
      }
      d3_layout_packTransform(root, w / 2, h / 2, 1 / k);
      return nodes;
    }
    pack.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return pack;
    };
    pack.padding = function(_) {
      if (!arguments.length) return padding;
      padding = +_;
      return pack;
    };
    return d3_layout_hierarchyRebind(pack, hierarchy);
  };
  function d3_layout_packSort(a, b) {
    return a.value - b.value;
  }
  function d3_layout_packInsert(a, b) {
    var c = a._pack_next;
    a._pack_next = b;
    b._pack_prev = a;
    b._pack_next = c;
    c._pack_prev = b;
  }
  function d3_layout_packSplice(a, b) {
    a._pack_next = b;
    b._pack_prev = a;
  }
  function d3_layout_packIntersects(a, b) {
    var dx = b.x - a.x, dy = b.y - a.y, dr = a.r + b.r;
    return dr * dr - dx * dx - dy * dy > .001;
  }
  function d3_layout_packSiblings(node) {
    if (!(nodes = node.children) || !(n = nodes.length)) return;
    var nodes, xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, a, b, c, i, j, k, n;
    function bound(node) {
      xMin = Math.min(node.x - node.r, xMin);
      xMax = Math.max(node.x + node.r, xMax);
      yMin = Math.min(node.y - node.r, yMin);
      yMax = Math.max(node.y + node.r, yMax);
    }
    nodes.forEach(d3_layout_packLink);
    a = nodes[0];
    a.x = -a.r;
    a.y = 0;
    bound(a);
    if (n > 1) {
      b = nodes[1];
      b.x = b.r;
      b.y = 0;
      bound(b);
      if (n > 2) {
        c = nodes[2];
        d3_layout_packPlace(a, b, c);
        bound(c);
        d3_layout_packInsert(a, c);
        a._pack_prev = c;
        d3_layout_packInsert(c, b);
        b = a._pack_next;
        for (i = 3; i < n; i++) {
          d3_layout_packPlace(a, b, c = nodes[i]);
          var isect = 0, s1 = 1, s2 = 1;
          for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
            if (d3_layout_packIntersects(j, c)) {
              isect = 1;
              break;
            }
          }
          if (isect == 1) {
            for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
              if (d3_layout_packIntersects(k, c)) {
                break;
              }
            }
          }
          if (isect) {
            if (s1 < s2 || s1 == s2 && b.r < a.r) d3_layout_packSplice(a, b = j); else d3_layout_packSplice(a = k, b);
            i--;
          } else {
            d3_layout_packInsert(a, c);
            b = c;
            bound(c);
          }
        }
      }
    }
    var cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2, cr = 0;
    for (i = 0; i < n; i++) {
      c = nodes[i];
      c.x -= cx;
      c.y -= cy;
      cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
    }
    node.r = cr;
    nodes.forEach(d3_layout_packUnlink);
  }
  function d3_layout_packLink(node) {
    node._pack_next = node._pack_prev = node;
  }
  function d3_layout_packUnlink(node) {
    delete node._pack_next;
    delete node._pack_prev;
  }
  function d3_layout_packTransform(node, x, y, k) {
    var children = node.children;
    node.x = x += k * node.x;
    node.y = y += k * node.y;
    node.r *= k;
    if (children) {
      var i = -1, n = children.length;
      while (++i < n) d3_layout_packTransform(children[i], x, y, k);
    }
  }
  function d3_layout_packPlace(a, b, c) {
    var db = a.r + c.r, dx = b.x - a.x, dy = b.y - a.y;
    if (db && (dx || dy)) {
      var da = b.r + c.r, dc = dx * dx + dy * dy;
      da *= da;
      db *= db;
      var x = .5 + (db - da) / (2 * dc), y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
      c.x = a.x + x * dx + y * dy;
      c.y = a.y + x * dy - y * dx;
    } else {
      c.x = a.x + db;
      c.y = a.y;
    }
  }
  d3.layout.cluster = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ];
    function cluster(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0], previousNode, x = 0;
      d3_layout_treeVisitAfter(root, function(node) {
        var children = node.children;
        if (children && children.length) {
          node.x = d3_layout_clusterX(children);
          node.y = d3_layout_clusterY(children);
        } else {
          node.x = previousNode ? x += separation(node, previousNode) : 0;
          node.y = 0;
          previousNode = node;
        }
      });
      var left = d3_layout_clusterLeft(root), right = d3_layout_clusterRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
      d3_layout_treeVisitAfter(root, function(node) {
        node.x = (node.x - x0) / (x1 - x0) * size[0];
        node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
      });
      return nodes;
    }
    cluster.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return cluster;
    };
    cluster.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return cluster;
    };
    return d3_layout_hierarchyRebind(cluster, hierarchy);
  };
  function d3_layout_clusterY(children) {
    return 1 + d3.max(children, function(child) {
      return child.y;
    });
  }
  function d3_layout_clusterX(children) {
    return children.reduce(function(x, child) {
      return x + child.x;
    }, 0) / children.length;
  }
  function d3_layout_clusterLeft(node) {
    var children = node.children;
    return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
  }
  function d3_layout_clusterRight(node) {
    var children = node.children, n;
    return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
  }
  d3.layout.tree = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ];
    function tree(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0];
      function firstWalk(node, previousSibling) {
        var children = node.children, layout = node._tree;
        if (children && (n = children.length)) {
          var n, firstChild = children[0], previousChild, ancestor = firstChild, child, i = -1;
          while (++i < n) {
            child = children[i];
            firstWalk(child, previousChild);
            ancestor = apportion(child, previousChild, ancestor);
            previousChild = child;
          }
          d3_layout_treeShift(node);
          var midpoint = .5 * (firstChild._tree.prelim + child._tree.prelim);
          if (previousSibling) {
            layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
            layout.mod = layout.prelim - midpoint;
          } else {
            layout.prelim = midpoint;
          }
        } else {
          if (previousSibling) {
            layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
          }
        }
      }
      function secondWalk(node, x) {
        node.x = node._tree.prelim + x;
        var children = node.children;
        if (children && (n = children.length)) {
          var i = -1, n;
          x += node._tree.mod;
          while (++i < n) {
            secondWalk(children[i], x);
          }
        }
      }
      function apportion(node, previousSibling, ancestor) {
        if (previousSibling) {
          var vip = node, vop = node, vim = previousSibling, vom = node.parent.children[0], sip = vip._tree.mod, sop = vop._tree.mod, sim = vim._tree.mod, som = vom._tree.mod, shift;
          while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
            vom = d3_layout_treeLeft(vom);
            vop = d3_layout_treeRight(vop);
            vop._tree.ancestor = node;
            shift = vim._tree.prelim + sim - vip._tree.prelim - sip + separation(vim, vip);
            if (shift > 0) {
              d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift);
              sip += shift;
              sop += shift;
            }
            sim += vim._tree.mod;
            sip += vip._tree.mod;
            som += vom._tree.mod;
            sop += vop._tree.mod;
          }
          if (vim && !d3_layout_treeRight(vop)) {
            vop._tree.thread = vim;
            vop._tree.mod += sim - sop;
          }
          if (vip && !d3_layout_treeLeft(vom)) {
            vom._tree.thread = vip;
            vom._tree.mod += sip - som;
            ancestor = node;
          }
        }
        return ancestor;
      }
      d3_layout_treeVisitAfter(root, function(node, previousSibling) {
        node._tree = {
          ancestor: node,
          prelim: 0,
          mod: 0,
          change: 0,
          shift: 0,
          number: previousSibling ? previousSibling._tree.number + 1 : 0
        };
      });
      firstWalk(root);
      secondWalk(root, -root._tree.prelim);
      var left = d3_layout_treeSearch(root, d3_layout_treeLeftmost), right = d3_layout_treeSearch(root, d3_layout_treeRightmost), deep = d3_layout_treeSearch(root, d3_layout_treeDeepest), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2, y1 = deep.depth || 1;
      d3_layout_treeVisitAfter(root, function(node) {
        node.x = (node.x - x0) / (x1 - x0) * size[0];
        node.y = node.depth / y1 * size[1];
        delete node._tree;
      });
      return nodes;
    }
    tree.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return tree;
    };
    tree.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return tree;
    };
    return d3_layout_hierarchyRebind(tree, hierarchy);
  };
  function d3_layout_treeSeparation(a, b) {
    return a.parent == b.parent ? 1 : 2;
  }
  function d3_layout_treeLeft(node) {
    var children = node.children;
    return children && children.length ? children[0] : node._tree.thread;
  }
  function d3_layout_treeRight(node) {
    var children = node.children, n;
    return children && (n = children.length) ? children[n - 1] : node._tree.thread;
  }
  function d3_layout_treeSearch(node, compare) {
    var children = node.children;
    if (children && (n = children.length)) {
      var child, n, i = -1;
      while (++i < n) {
        if (compare(child = d3_layout_treeSearch(children[i], compare), node) > 0) {
          node = child;
        }
      }
    }
    return node;
  }
  function d3_layout_treeRightmost(a, b) {
    return a.x - b.x;
  }
  function d3_layout_treeLeftmost(a, b) {
    return b.x - a.x;
  }
  function d3_layout_treeDeepest(a, b) {
    return a.depth - b.depth;
  }
  function d3_layout_treeVisitAfter(node, callback) {
    function visit(node, previousSibling) {
      var children = node.children;
      if (children && (n = children.length)) {
        var child, previousChild = null, i = -1, n;
        while (++i < n) {
          child = children[i];
          visit(child, previousChild);
          previousChild = child;
        }
      }
      callback(node, previousSibling);
    }
    visit(node, null);
  }
  function d3_layout_treeShift(node) {
    var shift = 0, change = 0, children = node.children, i = children.length, child;
    while (--i >= 0) {
      child = children[i]._tree;
      child.prelim += shift;
      child.mod += shift;
      shift += child.shift + (change += child.change);
    }
  }
  function d3_layout_treeMove(ancestor, node, shift) {
    ancestor = ancestor._tree;
    node = node._tree;
    var change = shift / (node.number - ancestor.number);
    ancestor.change += change;
    node.change -= change;
    node.shift += shift;
    node.prelim += shift;
    node.mod += shift;
  }
  function d3_layout_treeAncestor(vim, node, ancestor) {
    return vim._tree.ancestor.parent == node.parent ? vim._tree.ancestor : ancestor;
  }
  d3.layout.treemap = function() {
    var hierarchy = d3.layout.hierarchy(), round = Math.round, size = [ 1, 1 ], padding = null, pad = d3_layout_treemapPadNull, sticky = false, stickies, mode = "squarify", ratio = .5 * (1 + Math.sqrt(5));
    function scale(children, k) {
      var i = -1, n = children.length, child, area;
      while (++i < n) {
        area = (child = children[i]).value * (k < 0 ? 0 : k);
        child.area = isNaN(area) || area <= 0 ? 0 : area;
      }
    }
    function squarify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node), row = [], remaining = children.slice(), child, best = Infinity, score, u = mode === "slice" ? rect.dx : mode === "dice" ? rect.dy : mode === "slice-dice" ? node.depth & 1 ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy), n;
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while ((n = remaining.length) > 0) {
          row.push(child = remaining[n - 1]);
          row.area += child.area;
          if (mode !== "squarify" || (score = worst(row, u)) <= best) {
            remaining.pop();
            best = score;
          } else {
            row.area -= row.pop().area;
            position(row, u, rect, false);
            u = Math.min(rect.dx, rect.dy);
            row.length = row.area = 0;
            best = Infinity;
          }
        }
        if (row.length) {
          position(row, u, rect, true);
          row.length = row.area = 0;
        }
        children.forEach(squarify);
      }
    }
    function stickify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node), remaining = children.slice(), child, row = [];
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while (child = remaining.pop()) {
          row.push(child);
          row.area += child.area;
          if (child.z != null) {
            position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
            row.length = row.area = 0;
          }
        }
        children.forEach(stickify);
      }
    }
    function worst(row, u) {
      var s = row.area, r, rmax = 0, rmin = Infinity, i = -1, n = row.length;
      while (++i < n) {
        if (!(r = row[i].area)) continue;
        if (r < rmin) rmin = r;
        if (r > rmax) rmax = r;
      }
      s *= s;
      u *= u;
      return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity;
    }
    function position(row, u, rect, flush) {
      var i = -1, n = row.length, x = rect.x, y = rect.y, v = u ? round(row.area / u) : 0, o;
      if (u == rect.dx) {
        if (flush || v > rect.dy) v = rect.dy;
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dy = v;
          x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
        }
        o.z = true;
        o.dx += rect.x + rect.dx - x;
        rect.y += v;
        rect.dy -= v;
      } else {
        if (flush || v > rect.dx) v = rect.dx;
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dx = v;
          y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
        }
        o.z = false;
        o.dy += rect.y + rect.dy - y;
        rect.x += v;
        rect.dx -= v;
      }
    }
    function treemap(d) {
      var nodes = stickies || hierarchy(d), root = nodes[0];
      root.x = 0;
      root.y = 0;
      root.dx = size[0];
      root.dy = size[1];
      if (stickies) hierarchy.revalue(root);
      scale([ root ], root.dx * root.dy / root.value);
      (stickies ? stickify : squarify)(root);
      if (sticky) stickies = nodes;
      return nodes;
    }
    treemap.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return treemap;
    };
    treemap.padding = function(x) {
      if (!arguments.length) return padding;
      function padFunction(node) {
        var p = x.call(treemap, node, node.depth);
        return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === "number" ? [ p, p, p, p ] : p);
      }
      function padConstant(node) {
        return d3_layout_treemapPad(node, x);
      }
      var type;
      pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [ x, x, x, x ], 
      padConstant) : padConstant;
      return treemap;
    };
    treemap.round = function(x) {
      if (!arguments.length) return round != Number;
      round = x ? Math.round : Number;
      return treemap;
    };
    treemap.sticky = function(x) {
      if (!arguments.length) return sticky;
      sticky = x;
      stickies = null;
      return treemap;
    };
    treemap.ratio = function(x) {
      if (!arguments.length) return ratio;
      ratio = x;
      return treemap;
    };
    treemap.mode = function(x) {
      if (!arguments.length) return mode;
      mode = x + "";
      return treemap;
    };
    return d3_layout_hierarchyRebind(treemap, hierarchy);
  };
  function d3_layout_treemapPadNull(node) {
    return {
      x: node.x,
      y: node.y,
      dx: node.dx,
      dy: node.dy
    };
  }
  function d3_layout_treemapPad(node, padding) {
    var x = node.x + padding[3], y = node.y + padding[0], dx = node.dx - padding[1] - padding[3], dy = node.dy - padding[0] - padding[2];
    if (dx < 0) {
      x += dx / 2;
      dx = 0;
    }
    if (dy < 0) {
      y += dy / 2;
      dy = 0;
    }
    return {
      x: x,
      y: y,
      dx: dx,
      dy: dy
    };
  }
  function d3_dsv(delimiter, mimeType) {
    var reFormat = new RegExp('["' + delimiter + "\n]"), delimiterCode = delimiter.charCodeAt(0);
    function dsv(url, callback) {
      return d3.xhr(url, mimeType, callback).response(response);
    }
    function response(request) {
      return dsv.parse(request.responseText);
    }
    dsv.parse = function(text) {
      var o;
      return dsv.parseRows(text, function(row) {
        if (o) return o(row);
        o = new Function("d", "return {" + row.map(function(name, i) {
          return JSON.stringify(name) + ": d[" + i + "]";
        }).join(",") + "}");
      });
    };
    dsv.parseRows = function(text, f) {
      var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
      function token() {
        if (I >= N) return EOF;
        if (eol) return eol = false, EOL;
        var j = I;
        if (text.charCodeAt(j) === 34) {
          var i = j;
          while (i++ < N) {
            if (text.charCodeAt(i) === 34) {
              if (text.charCodeAt(i + 1) !== 34) break;
              ++i;
            }
          }
          I = i + 2;
          var c = text.charCodeAt(i + 1);
          if (c === 13) {
            eol = true;
            if (text.charCodeAt(i + 2) === 10) ++I;
          } else if (c === 10) {
            eol = true;
          }
          return text.substring(j + 1, i).replace(/""/g, '"');
        }
        while (I < N) {
          var c = text.charCodeAt(I++), k = 1;
          if (c === 10) eol = true; else if (c === 13) {
            eol = true;
            if (text.charCodeAt(I) === 10) ++I, ++k;
          } else if (c !== delimiterCode) continue;
          return text.substring(j, I - k);
        }
        return text.substring(j);
      }
      while ((t = token()) !== EOF) {
        var a = [];
        while (t !== EOL && t !== EOF) {
          a.push(t);
          t = token();
        }
        if (f && !(a = f(a, n++))) continue;
        rows.push(a);
      }
      return rows;
    };
    dsv.format = function(rows) {
      return rows.map(formatRow).join("\n");
    };
    function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }
    function formatValue(text) {
      return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text;
    }
    return dsv;
  }
  d3.csv = d3_dsv(",", "text/csv");
  d3.tsv = d3_dsv("	", "text/tab-separated-values");
  d3.geo = {};
  d3.geo.stream = function(object, listener) {
    if (d3_geo_streamObjectType.hasOwnProperty(object.type)) {
      d3_geo_streamObjectType[object.type](object, listener);
    } else {
      d3_geo_streamGeometry(object, listener);
    }
  };
  function d3_geo_streamGeometry(geometry, listener) {
    if (d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
      d3_geo_streamGeometryType[geometry.type](geometry, listener);
    }
  }
  var d3_geo_streamObjectType = {
    Feature: function(feature, listener) {
      d3_geo_streamGeometry(feature.geometry, listener);
    },
    FeatureCollection: function(object, listener) {
      var features = object.features, i = -1, n = features.length;
      while (++i < n) d3_geo_streamGeometry(features[i].geometry, listener);
    }
  };
  var d3_geo_streamGeometryType = {
    Sphere: function(object, listener) {
      listener.sphere();
    },
    Point: function(object, listener) {
      var coordinate = object.coordinates;
      listener.point(coordinate[0], coordinate[1]);
    },
    MultiPoint: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length, coordinate;
      while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1]);
    },
    LineString: function(object, listener) {
      d3_geo_streamLine(object.coordinates, listener, 0);
    },
    MultiLineString: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) d3_geo_streamLine(coordinates[i], listener, 0);
    },
    Polygon: function(object, listener) {
      d3_geo_streamPolygon(object.coordinates, listener);
    },
    MultiPolygon: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) d3_geo_streamPolygon(coordinates[i], listener);
    },
    GeometryCollection: function(object, listener) {
      var geometries = object.geometries, i = -1, n = geometries.length;
      while (++i < n) d3_geo_streamGeometry(geometries[i], listener);
    }
  };
  function d3_geo_streamLine(coordinates, listener, closed) {
    var i = -1, n = coordinates.length - closed, coordinate;
    listener.lineStart();
    while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1]);
    listener.lineEnd();
  }
  function d3_geo_streamPolygon(coordinates, listener) {
    var i = -1, n = coordinates.length;
    listener.polygonStart();
    while (++i < n) d3_geo_streamLine(coordinates[i], listener, 1);
    listener.polygonEnd();
  }
  function d3_geo_spherical(cartesian) {
    return [ Math.atan2(cartesian[1], cartesian[0]), Math.asin(Math.max(-1, Math.min(1, cartesian[2]))) ];
  }
  function d3_geo_sphericalEqual(a, b) {
    return Math.abs(a[0] - b[0]) < ε && Math.abs(a[1] - b[1]) < ε;
  }
  function d3_geo_cartesian(spherical) {
    var λ = spherical[0], φ = spherical[1], cosφ = Math.cos(φ);
    return [ cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ) ];
  }
  function d3_geo_cartesianDot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function d3_geo_cartesianCross(a, b) {
    return [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ];
  }
  function d3_geo_cartesianAdd(a, b) {
    a[0] += b[0];
    a[1] += b[1];
    a[2] += b[2];
  }
  function d3_geo_cartesianScale(vector, k) {
    return [ vector[0] * k, vector[1] * k, vector[2] * k ];
  }
  function d3_geo_cartesianNormalize(d) {
    var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
    d[0] /= l;
    d[1] /= l;
    d[2] /= l;
  }
  function d3_geo_resample(project) {
    var δ2 = .5, maxDepth = 16;
    function resample(stream) {
      var λ0, x0, y0, a0, b0, c0;
      var resample = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          stream.polygonStart();
          resample.lineStart = polygonLineStart;
        },
        polygonEnd: function() {
          stream.polygonEnd();
          resample.lineStart = lineStart;
        }
      };
      function point(x, y) {
        x = project(x, y);
        stream.point(x[0], x[1]);
      }
      function lineStart() {
        x0 = NaN;
        resample.point = linePoint;
        stream.lineStart();
      }
      function linePoint(λ, φ) {
        var c = d3_geo_cartesian([ λ, φ ]), p = project(λ, φ);
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
        stream.point(x0, y0);
      }
      function lineEnd() {
        resample.point = point;
        stream.lineEnd();
      }
      function polygonLineStart() {
        var λ00, φ00, x00, y00, a00, b00, c00;
        lineStart();
        resample.point = function(λ, φ) {
          linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
          resample.point = linePoint;
        };
        resample.lineEnd = function() {
          resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream);
          resample.lineEnd = lineEnd;
          lineEnd();
        };
      }
      return resample;
    }
    function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
      var dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy;
      if (d2 > 4 * δ2 && depth--) {
        var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = Math.sqrt(a * a + b * b + c * c), φ2 = Math.asin(c /= m), λ2 = Math.abs(Math.abs(c) - 1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a), p = project(λ2, φ2), x2 = p[0], y2 = p[1], dx2 = x2 - x0, dy2 = y2 - y0, dz = dy * dx2 - dx * dy2;
        if (dz * dz / d2 > δ2 || Math.abs((dx * dx2 + dy * dy2) / d2 - .5) > .3) {
          resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream);
          stream.point(x2, y2);
          resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream);
        }
      }
    }
    resample.precision = function(_) {
      if (!arguments.length) return Math.sqrt(δ2);
      maxDepth = (δ2 = _ * _) > 0 && 16;
      return resample;
    };
    return resample;
  }
  d3.geo.albersUsa = function() {
    var lower48 = d3.geo.albers();
    var alaska = d3.geo.albers().rotate([ 160, 0 ]).center([ 0, 60 ]).parallels([ 55, 65 ]);
    var hawaii = d3.geo.albers().rotate([ 160, 0 ]).center([ 0, 20 ]).parallels([ 8, 18 ]);
    var puertoRico = d3.geo.albers().rotate([ 60, 0 ]).center([ 0, 10 ]).parallels([ 8, 18 ]);
    function albersUsa(coordinates) {
      return projection(coordinates)(coordinates);
    }
    function projection(point) {
      var lon = point[0], lat = point[1];
      return lat > 50 ? alaska : lon < -140 ? hawaii : lat < 21 ? puertoRico : lower48;
    }
    albersUsa.scale = function(x) {
      if (!arguments.length) return lower48.scale();
      lower48.scale(x);
      alaska.scale(x * .6);
      hawaii.scale(x);
      puertoRico.scale(x * 1.5);
      return albersUsa.translate(lower48.translate());
    };
    albersUsa.translate = function(x) {
      if (!arguments.length) return lower48.translate();
      var dz = lower48.scale(), dx = x[0], dy = x[1];
      lower48.translate(x);
      alaska.translate([ dx - .4 * dz, dy + .17 * dz ]);
      hawaii.translate([ dx - .19 * dz, dy + .2 * dz ]);
      puertoRico.translate([ dx + .58 * dz, dy + .43 * dz ]);
      return albersUsa;
    };
    return albersUsa.scale(lower48.scale());
  };
  function d3_geo_albers(φ0, φ1) {
    var sinφ0 = Math.sin(φ0), n = (sinφ0 + Math.sin(φ1)) / 2, C = 1 + sinφ0 * (2 * n - sinφ0), ρ0 = Math.sqrt(C) / n;
    function albers(λ, φ) {
      var ρ = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
      return [ ρ * Math.sin(λ *= n), ρ0 - ρ * Math.cos(λ) ];
    }
    albers.invert = function(x, y) {
      var ρ0_y = ρ0 - y;
      return [ Math.atan2(x, ρ0_y) / n, Math.asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n)) ];
    };
    return albers;
  }
  (d3.geo.albers = function() {
    var φ0 = 29.5 * d3_radians, φ1 = 45.5 * d3_radians, m = d3_geo_projectionMutator(d3_geo_albers), p = m(φ0, φ1);
    p.parallels = function(_) {
      if (!arguments.length) return [ φ0 * d3_degrees, φ1 * d3_degrees ];
      return m(φ0 = _[0] * d3_radians, φ1 = _[1] * d3_radians);
    };
    return p.rotate([ 98, 0 ]).center([ 0, 38 ]).scale(1e3);
  }).raw = d3_geo_albers;
  var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function(cosλcosφ) {
    return Math.sqrt(2 / (1 + cosλcosφ));
  }, function(ρ) {
    return 2 * Math.asin(ρ / 2);
  });
  (d3.geo.azimuthalEqualArea = function() {
    return d3_geo_projection(d3_geo_azimuthalEqualArea);
  }).raw = d3_geo_azimuthalEqualArea;
  var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function(cosλcosφ) {
    var c = Math.acos(cosλcosφ);
    return c && c / Math.sin(c);
  }, d3_identity);
  (d3.geo.azimuthalEquidistant = function() {
    return d3_geo_projection(d3_geo_azimuthalEquidistant);
  }).raw = d3_geo_azimuthalEquidistant;
  d3.geo.bounds = d3_geo_bounds(d3_identity);
  function d3_geo_bounds(projectStream) {
    var x0, y0, x1, y1;
    var bound = {
      point: boundPoint,
      lineStart: d3_noop,
      lineEnd: d3_noop,
      polygonStart: function() {
        bound.lineEnd = boundPolygonLineEnd;
      },
      polygonEnd: function() {
        bound.point = boundPoint;
      }
    };
    function boundPoint(x, y) {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
    function boundPolygonLineEnd() {
      bound.point = bound.lineEnd = d3_noop;
    }
    return function(feature) {
      y1 = x1 = -(x0 = y0 = Infinity);
      d3.geo.stream(feature, projectStream(bound));
      return [ [ x0, y0 ], [ x1, y1 ] ];
    };
  }
  d3.geo.centroid = function(object) {
    d3_geo_centroidDimension = d3_geo_centroidW = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
    d3.geo.stream(object, d3_geo_centroid);
    var m;
    if (d3_geo_centroidW && Math.abs(m = Math.sqrt(d3_geo_centroidX * d3_geo_centroidX + d3_geo_centroidY * d3_geo_centroidY + d3_geo_centroidZ * d3_geo_centroidZ)) > ε) {
      return [ Math.atan2(d3_geo_centroidY, d3_geo_centroidX) * d3_degrees, Math.asin(Math.max(-1, Math.min(1, d3_geo_centroidZ / m))) * d3_degrees ];
    }
  };
  var d3_geo_centroidDimension, d3_geo_centroidW, d3_geo_centroidX, d3_geo_centroidY, d3_geo_centroidZ;
  var d3_geo_centroid = {
    sphere: function() {
      if (d3_geo_centroidDimension < 2) {
        d3_geo_centroidDimension = 2;
        d3_geo_centroidW = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
      }
    },
    point: d3_geo_centroidPoint,
    lineStart: d3_geo_centroidLineStart,
    lineEnd: d3_geo_centroidLineEnd,
    polygonStart: function() {
      if (d3_geo_centroidDimension < 2) {
        d3_geo_centroidDimension = 2;
        d3_geo_centroidW = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
      }
      d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
    },
    polygonEnd: function() {
      d3_geo_centroid.lineStart = d3_geo_centroidLineStart;
    }
  };
  function d3_geo_centroidPoint(λ, φ) {
    if (d3_geo_centroidDimension) return;
    ++d3_geo_centroidW;
    λ *= d3_radians;
    var cosφ = Math.cos(φ *= d3_radians);
    d3_geo_centroidX += (cosφ * Math.cos(λ) - d3_geo_centroidX) / d3_geo_centroidW;
    d3_geo_centroidY += (cosφ * Math.sin(λ) - d3_geo_centroidY) / d3_geo_centroidW;
    d3_geo_centroidZ += (Math.sin(φ) - d3_geo_centroidZ) / d3_geo_centroidW;
  }
  function d3_geo_centroidRingStart() {
    var λ00, φ00;
    d3_geo_centroidDimension = 1;
    d3_geo_centroidLineStart();
    d3_geo_centroidDimension = 2;
    var linePoint = d3_geo_centroid.point;
    d3_geo_centroid.point = function(λ, φ) {
      linePoint(λ00 = λ, φ00 = φ);
    };
    d3_geo_centroid.lineEnd = function() {
      d3_geo_centroid.point(λ00, φ00);
      d3_geo_centroidLineEnd();
      d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
    };
  }
  function d3_geo_centroidLineStart() {
    var x0, y0, z0;
    if (d3_geo_centroidDimension > 1) return;
    if (d3_geo_centroidDimension < 1) {
      d3_geo_centroidDimension = 1;
      d3_geo_centroidW = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
    }
    d3_geo_centroid.point = function(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians);
      x0 = cosφ * Math.cos(λ);
      y0 = cosφ * Math.sin(λ);
      z0 = Math.sin(φ);
      d3_geo_centroid.point = nextPoint;
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
      d3_geo_centroidW += w;
      d3_geo_centroidX += w * (x0 + (x0 = x));
      d3_geo_centroidY += w * (y0 + (y0 = y));
      d3_geo_centroidZ += w * (z0 + (z0 = z));
    }
  }
  function d3_geo_centroidLineEnd() {
    d3_geo_centroid.point = d3_geo_centroidPoint;
  }
  d3.geo.circle = function() {
    var origin = [ 0, 0 ], angle, precision = 6, interpolate;
    function circle() {
      var center = typeof origin === "function" ? origin.apply(this, arguments) : origin, rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert, ring = [];
      interpolate(null, null, 1, {
        point: function(x, y) {
          ring.push(x = rotate(x, y));
          x[0] *= d3_degrees, x[1] *= d3_degrees;
        }
      });
      return {
        type: "Polygon",
        coordinates: [ ring ]
      };
    }
    circle.origin = function(x) {
      if (!arguments.length) return origin;
      origin = x;
      return circle;
    };
    circle.angle = function(x) {
      if (!arguments.length) return angle;
      interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
      return circle;
    };
    circle.precision = function(_) {
      if (!arguments.length) return precision;
      interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
      return circle;
    };
    return circle.angle(90);
  };
  function d3_geo_circleInterpolate(radians, precision) {
    var cr = Math.cos(radians), sr = Math.sin(radians);
    return function(from, to, direction, listener) {
      if (from != null) {
        from = d3_geo_circleAngle(cr, from);
        to = d3_geo_circleAngle(cr, to);
        if (direction > 0 ? from < to : from > to) from += direction * 2 * π;
      } else {
        from = radians + direction * 2 * π;
        to = radians;
      }
      var point;
      for (var step = direction * precision, t = from; direction > 0 ? t > to : t < to; t -= step) {
        listener.point((point = d3_geo_spherical([ cr, -sr * Math.cos(t), -sr * Math.sin(t) ]))[0], point[1]);
      }
    };
  }
  function d3_geo_circleAngle(cr, point) {
    var a = d3_geo_cartesian(point);
    a[0] -= cr;
    d3_geo_cartesianNormalize(a);
    var angle = Math.acos(Math.max(-1, Math.min(1, -a[1])));
    return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI);
  }
  function d3_geo_clip(pointVisible, clipLine, interpolate) {
    return function(listener) {
      var line = clipLine(listener);
      var clip = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          clip.point = pointRing;
          clip.lineStart = ringStart;
          clip.lineEnd = ringEnd;
          invisible = false;
          invisibleArea = visibleArea = 0;
          segments = [];
          listener.polygonStart();
        },
        polygonEnd: function() {
          clip.point = point;
          clip.lineStart = lineStart;
          clip.lineEnd = lineEnd;
          segments = d3.merge(segments);
          if (segments.length) {
            d3_geo_clipPolygon(segments, interpolate, listener);
          } else if (visibleArea < -ε || invisible && invisibleArea < -ε) {
            listener.lineStart();
            interpolate(null, null, 1, listener);
            listener.lineEnd();
          }
          listener.polygonEnd();
          segments = null;
        },
        sphere: function() {
          listener.polygonStart();
          listener.lineStart();
          interpolate(null, null, 1, listener);
          listener.lineEnd();
          listener.polygonEnd();
        }
      };
      function point(λ, φ) {
        if (pointVisible(λ, φ)) listener.point(λ, φ);
      }
      function pointLine(λ, φ) {
        line.point(λ, φ);
      }
      function lineStart() {
        clip.point = pointLine;
        line.lineStart();
      }
      function lineEnd() {
        clip.point = point;
        line.lineEnd();
      }
      var segments, visibleArea, invisibleArea, invisible;
      var buffer = d3_geo_clipBufferListener(), ringListener = clipLine(buffer), ring;
      function pointRing(λ, φ) {
        ringListener.point(λ, φ);
        ring.push([ λ, φ ]);
      }
      function ringStart() {
        ringListener.lineStart();
        ring = [];
      }
      function ringEnd() {
        pointRing(ring[0][0], ring[0][1]);
        ringListener.lineEnd();
        var clean = ringListener.clean(), ringSegments = buffer.buffer(), segment, n = ringSegments.length;
        if (!n) {
          invisible = true;
          invisibleArea += d3_geo_clipAreaRing(ring, -1);
          ring = null;
          return;
        }
        ring = null;
        if (clean & 1) {
          segment = ringSegments[0];
          visibleArea += d3_geo_clipAreaRing(segment, 1);
          var n = segment.length - 1, i = -1, point;
          listener.lineStart();
          while (++i < n) listener.point((point = segment[i])[0], point[1]);
          listener.lineEnd();
          return;
        }
        if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
        segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
      }
      return clip;
    };
  }
  function d3_geo_clipPolygon(segments, interpolate, listener) {
    var subject = [], clip = [];
    segments.forEach(function(segment) {
      var n = segment.length;
      if (n <= 1) return;
      var p0 = segment[0], p1 = segment[n - 1], a = {
        point: p0,
        points: segment,
        other: null,
        visited: false,
        entry: true,
        subject: true
      }, b = {
        point: p0,
        points: [ p0 ],
        other: a,
        visited: false,
        entry: false,
        subject: false
      };
      a.other = b;
      subject.push(a);
      clip.push(b);
      a = {
        point: p1,
        points: [ p1 ],
        other: null,
        visited: false,
        entry: false,
        subject: true
      };
      b = {
        point: p1,
        points: [ p1 ],
        other: a,
        visited: false,
        entry: true,
        subject: false
      };
      a.other = b;
      subject.push(a);
      clip.push(b);
    });
    clip.sort(d3_geo_clipSort);
    d3_geo_clipLinkCircular(subject);
    d3_geo_clipLinkCircular(clip);
    if (!subject.length) return;
    var start = subject[0], current, points, point;
    while (1) {
      current = start;
      while (current.visited) if ((current = current.next) === start) return;
      points = current.points;
      listener.lineStart();
      do {
        current.visited = current.other.visited = true;
        if (current.entry) {
          if (current.subject) {
            for (var i = 0; i < points.length; i++) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.point, current.next.point, 1, listener);
          }
          current = current.next;
        } else {
          if (current.subject) {
            points = current.prev.points;
            for (var i = points.length; --i >= 0; ) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.point, current.prev.point, -1, listener);
          }
          current = current.prev;
        }
        current = current.other;
        points = current.points;
      } while (!current.visited);
      listener.lineEnd();
    }
  }
  function d3_geo_clipLinkCircular(array) {
    if (!(n = array.length)) return;
    var n, i = 0, a = array[0], b;
    while (++i < n) {
      a.next = b = array[i];
      b.prev = a;
      a = b;
    }
    a.next = b = array[0];
    b.prev = a;
  }
  function d3_geo_clipSort(a, b) {
    return ((a = a.point)[0] < 0 ? a[1] - π / 2 - ε : π / 2 - a[1]) - ((b = b.point)[0] < 0 ? b[1] - π / 2 - ε : π / 2 - b[1]);
  }
  function d3_geo_clipSegmentLength1(segment) {
    return segment.length > 1;
  }
  function d3_geo_clipBufferListener() {
    var lines = [], line;
    return {
      lineStart: function() {
        lines.push(line = []);
      },
      point: function(λ, φ) {
        line.push([ λ, φ ]);
      },
      lineEnd: d3_noop,
      buffer: function() {
        var buffer = lines;
        lines = [];
        line = null;
        return buffer;
      }
    };
  }
  function d3_geo_clipAreaRing(ring, invisible) {
    if (!(n = ring.length)) return 0;
    var n, i = 0, area = 0, p = ring[0], λ = p[0], φ = p[1], cosφ = Math.cos(φ), x0 = Math.atan2(invisible * Math.sin(λ) * cosφ, Math.sin(φ)), y0 = 1 - invisible * Math.cos(λ) * cosφ, x1 = x0, x, y;
    while (++i < n) {
      p = ring[i];
      cosφ = Math.cos(φ = p[1]);
      x = Math.atan2(invisible * Math.sin(λ = p[0]) * cosφ, Math.sin(φ));
      y = 1 - invisible * Math.cos(λ) * cosφ;
      if (Math.abs(y0 - 2) < ε && Math.abs(y - 2) < ε) continue;
      if (Math.abs(y) < ε || Math.abs(y0) < ε) {} else if (Math.abs(Math.abs(x - x0) - π) < ε) {
        if (y + y0 > 2) area += 4 * (x - x0);
      } else if (Math.abs(y0 - 2) < ε) area += 4 * (x - x1); else area += ((3 * π + x - x0) % (2 * π) - π) * (y0 + y);
      x1 = x0, x0 = x, y0 = y;
    }
    return area;
  }
  var d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate);
  function d3_geo_clipAntimeridianLine(listener) {
    var λ0 = NaN, φ0 = NaN, sλ0 = NaN, clean;
    return {
      lineStart: function() {
        listener.lineStart();
        clean = 1;
      },
      point: function(λ1, φ1) {
        var sλ1 = λ1 > 0 ? π : -π, dλ = Math.abs(λ1 - λ0);
        if (Math.abs(dλ - π) < ε) {
          listener.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? π / 2 : -π / 2);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          listener.point(λ1, φ0);
          clean = 0;
        } else if (sλ0 !== sλ1 && dλ >= π) {
          if (Math.abs(λ0 - sλ0) < ε) λ0 -= sλ0 * ε;
          if (Math.abs(λ1 - sλ1) < ε) λ1 -= sλ1 * ε;
          φ0 = d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          clean = 0;
        }
        listener.point(λ0 = λ1, φ0 = φ1);
        sλ0 = sλ1;
      },
      lineEnd: function() {
        listener.lineEnd();
        λ0 = φ0 = NaN;
      },
      clean: function() {
        return 2 - clean;
      }
    };
  }
  function d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1) {
    var cosφ0, cosφ1, sinλ0_λ1 = Math.sin(λ0 - λ1);
    return Math.abs(sinλ0_λ1) > ε ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0)) / (cosφ0 * cosφ1 * sinλ0_λ1)) : (φ0 + φ1) / 2;
  }
  function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
    var φ;
    if (from == null) {
      φ = direction * π / 2;
      listener.point(-π, φ);
      listener.point(0, φ);
      listener.point(π, φ);
      listener.point(π, 0);
      listener.point(π, -φ);
      listener.point(0, -φ);
      listener.point(-π, -φ);
      listener.point(-π, 0);
      listener.point(-π, φ);
    } else if (Math.abs(from[0] - to[0]) > ε) {
      var s = (from[0] < to[0] ? 1 : -1) * π;
      φ = direction * s / 2;
      listener.point(-s, φ);
      listener.point(0, φ);
      listener.point(s, φ);
    } else {
      listener.point(to[0], to[1]);
    }
  }
  function d3_geo_clipCircle(degrees) {
    var radians = degrees * d3_radians, cr = Math.cos(radians), interpolate = d3_geo_circleInterpolate(radians, 6 * d3_radians);
    return d3_geo_clip(visible, clipLine, interpolate);
    function visible(λ, φ) {
      return Math.cos(λ) * Math.cos(φ) > cr;
    }
    function clipLine(listener) {
      var point0, v0, v00, clean;
      return {
        lineStart: function() {
          v00 = v0 = false;
          clean = 1;
        },
        point: function(λ, φ) {
          var point1 = [ λ, φ ], point2, v = visible(λ, φ);
          if (!point0 && (v00 = v0 = v)) listener.lineStart();
          if (v !== v0) {
            point2 = intersect(point0, point1);
            if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
              point1[0] += ε;
              point1[1] += ε;
              v = visible(point1[0], point1[1]);
            }
          }
          if (v !== v0) {
            clean = 0;
            if (v0 = v) {
              listener.lineStart();
              point2 = intersect(point1, point0);
              listener.point(point2[0], point2[1]);
            } else {
              point2 = intersect(point0, point1);
              listener.point(point2[0], point2[1]);
              listener.lineEnd();
            }
            point0 = point2;
          }
          if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) listener.point(point1[0], point1[1]);
          point0 = point1;
        },
        lineEnd: function() {
          if (v0) listener.lineEnd();
          point0 = null;
        },
        clean: function() {
          return clean | (v00 && v0) << 1;
        }
      };
    }
    function intersect(a, b) {
      var pa = d3_geo_cartesian(a, 0), pb = d3_geo_cartesian(b, 0);
      var n1 = [ 1, 0, 0 ], n2 = d3_geo_cartesianCross(pa, pb), n2n2 = d3_geo_cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
      if (!determinant) return a;
      var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = d3_geo_cartesianCross(n1, n2), A = d3_geo_cartesianScale(n1, c1), B = d3_geo_cartesianScale(n2, c2);
      d3_geo_cartesianAdd(A, B);
      var u = n1xn2, w = d3_geo_cartesianDot(A, u), uu = d3_geo_cartesianDot(u, u), t = Math.sqrt(w * w - uu * (d3_geo_cartesianDot(A, A) - 1)), q = d3_geo_cartesianScale(u, (-w - t) / uu);
      d3_geo_cartesianAdd(q, A);
      return d3_geo_spherical(q);
    }
  }
  function d3_geo_compose(a, b) {
    function compose(x, y) {
      return x = a(x, y), b(x[0], x[1]);
    }
    if (a.invert && b.invert) compose.invert = function(x, y) {
      return x = b.invert(x, y), x && a.invert(x[0], x[1]);
    };
    return compose;
  }
  function d3_geo_equirectangular(λ, φ) {
    return [ λ, φ ];
  }
  (d3.geo.equirectangular = function() {
    return d3_geo_projection(d3_geo_equirectangular).scale(250 / π);
  }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
  var d3_geo_gnomonic = d3_geo_azimuthal(function(cosλcosφ) {
    return 1 / cosλcosφ;
  }, Math.atan);
  (d3.geo.gnomonic = function() {
    return d3_geo_projection(d3_geo_gnomonic);
  }).raw = d3_geo_gnomonic;
  d3.geo.graticule = function() {
    var x1, x0, y1, y0, dx = 22.5, dy = dx, x, y, precision = 2.5;
    function graticule() {
      return {
        type: "MultiLineString",
        coordinates: lines()
      };
    }
    function lines() {
      return d3.range(Math.ceil(x0 / dx) * dx, x1, dx).map(x).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).map(y));
    }
    graticule.lines = function() {
      return lines().map(function(coordinates) {
        return {
          type: "LineString",
          coordinates: coordinates
        };
      });
    };
    graticule.outline = function() {
      return {
        type: "Polygon",
        coordinates: [ x(x0).concat(y(y1).slice(1), x(x1).reverse().slice(1), y(y0).reverse().slice(1)) ]
      };
    };
    graticule.extent = function(_) {
      if (!arguments.length) return [ [ x0, y0 ], [ x1, y1 ] ];
      x0 = +_[0][0], x1 = +_[1][0];
      y0 = +_[0][1], y1 = +_[1][1];
      if (x0 > x1) _ = x0, x0 = x1, x1 = _;
      if (y0 > y1) _ = y0, y0 = y1, y1 = _;
      return graticule.precision(precision);
    };
    graticule.step = function(_) {
      if (!arguments.length) return [ dx, dy ];
      dx = +_[0], dy = +_[1];
      return graticule;
    };
    graticule.precision = function(_) {
      if (!arguments.length) return precision;
      precision = +_;
      x = d3_geo_graticuleX(y0, y1, precision);
      y = d3_geo_graticuleY(x0, x1, precision);
      return graticule;
    };
    return graticule.extent([ [ -180 + ε, -90 + ε ], [ 180 - ε, 90 - ε ] ]);
  };
  function d3_geo_graticuleX(y0, y1, dy) {
    var y = d3.range(y0, y1 - ε, dy).concat(y1);
    return function(x) {
      return y.map(function(y) {
        return [ x, y ];
      });
    };
  }
  function d3_geo_graticuleY(x0, x1, dx) {
    var x = d3.range(x0, x1 - ε, dx).concat(x1);
    return function(y) {
      return x.map(function(x) {
        return [ x, y ];
      });
    };
  }
  d3.geo.interpolate = function(source, target) {
    return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians);
  };
  function d3_geo_interpolate(x0, y0, x1, y1) {
    var cy0 = Math.cos(y0), sy0 = Math.sin(y0), cy1 = Math.cos(y1), sy1 = Math.sin(y1), kx0 = cy0 * Math.cos(x0), ky0 = cy0 * Math.sin(x0), kx1 = cy1 * Math.cos(x1), ky1 = cy1 * Math.sin(x1), d = Math.acos(Math.max(-1, Math.min(1, sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)))), k = 1 / Math.sin(d);
    function interpolate(t) {
      var B = Math.sin(t *= d) * k, A = Math.sin(d - t) * k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
      return [ Math.atan2(y, x) / d3_radians, Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_radians ];
    }
    interpolate.distance = d;
    return interpolate;
  }
  d3.geo.greatArc = function() {
    var source = d3_source, source_, target = d3_target, target_, precision = 6 * d3_radians, interpolate;
    function greatArc() {
      var p0 = source_ || source.apply(this, arguments), p1 = target_ || target.apply(this, arguments), i = interpolate || d3.geo.interpolate(p0, p1), t = 0, dt = precision / i.distance, coordinates = [ p0 ];
      while ((t += dt) < 1) coordinates.push(i(t));
      coordinates.push(p1);
      return {
        type: "LineString",
        coordinates: coordinates
      };
    }
    greatArc.distance = function() {
      return (interpolate || d3.geo.interpolate(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments))).distance;
    };
    greatArc.source = function(_) {
      if (!arguments.length) return source;
      source = _, source_ = typeof _ === "function" ? null : _;
      interpolate = source_ && target_ ? d3.geo.interpolate(source_, target_) : null;
      return greatArc;
    };
    greatArc.target = function(_) {
      if (!arguments.length) return target;
      target = _, target_ = typeof _ === "function" ? null : _;
      interpolate = source_ && target_ ? d3.geo.interpolate(source_, target_) : null;
      return greatArc;
    };
    greatArc.precision = function(_) {
      if (!arguments.length) return precision / d3_radians;
      precision = _ * d3_radians;
      return greatArc;
    };
    return greatArc;
  };
  function d3_geo_mercator(λ, φ) {
    return [ λ / (2 * π), Math.max(-.5, Math.min(+.5, Math.log(Math.tan(π / 4 + φ / 2)) / (2 * π))) ];
  }
  d3_geo_mercator.invert = function(x, y) {
    return [ 2 * π * x, 2 * Math.atan(Math.exp(2 * π * y)) - π / 2 ];
  };
  (d3.geo.mercator = function() {
    return d3_geo_projection(d3_geo_mercator).scale(500);
  }).raw = d3_geo_mercator;
  var d3_geo_orthographic = d3_geo_azimuthal(function() {
    return 1;
  }, Math.asin);
  (d3.geo.orthographic = function() {
    return d3_geo_projection(d3_geo_orthographic);
  }).raw = d3_geo_orthographic;
  d3.geo.path = function() {
    var pointRadius = 4.5, projection, context, projectStream, contextStream;
    function path(object) {
      if (object) d3.geo.stream(object, projectStream(contextStream.pointRadius(typeof pointRadius === "function" ? +pointRadius.apply(this, arguments) : pointRadius)));
      return contextStream.result();
    }
    path.area = function(object) {
      d3_geo_pathAreaSum = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathArea));
      return d3_geo_pathAreaSum;
    };
    path.centroid = function(object) {
      d3_geo_centroidDimension = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
      return d3_geo_centroidZ ? [ d3_geo_centroidX / d3_geo_centroidZ, d3_geo_centroidY / d3_geo_centroidZ ] : undefined;
    };
    path.bounds = function(object) {
      return d3_geo_bounds(projectStream)(object);
    };
    path.projection = function(_) {
      if (!arguments.length) return projection;
      projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
      return path;
    };
    path.context = function(_) {
      if (!arguments.length) return context;
      contextStream = (context = _) == null ? new d3_geo_pathBuffer() : new d3_geo_pathContext(_);
      return path;
    };
    path.pointRadius = function(_) {
      if (!arguments.length) return pointRadius;
      pointRadius = typeof _ === "function" ? _ : +_;
      return path;
    };
    return path.projection(d3.geo.albersUsa()).context(null);
  };
  function d3_geo_pathCircle(radius) {
    return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + +2 * radius + "z";
  }
  function d3_geo_pathProjectStream(project) {
    var resample = d3_geo_resample(function(λ, φ) {
      return project([ λ * d3_degrees, φ * d3_degrees ]);
    });
    return function(stream) {
      stream = resample(stream);
      return {
        point: function(λ, φ) {
          stream.point(λ * d3_radians, φ * d3_radians);
        },
        sphere: function() {
          stream.sphere();
        },
        lineStart: function() {
          stream.lineStart();
        },
        lineEnd: function() {
          stream.lineEnd();
        },
        polygonStart: function() {
          stream.polygonStart();
        },
        polygonEnd: function() {
          stream.polygonEnd();
        }
      };
    };
  }
  function d3_geo_pathBuffer() {
    var pointCircle = d3_geo_pathCircle(4.5), buffer = [];
    var stream = {
      point: point,
      lineStart: function() {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function() {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function() {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function(_) {
        pointCircle = d3_geo_pathCircle(_);
        return stream;
      },
      result: function() {
        if (buffer.length) {
          var result = buffer.join("");
          buffer = [];
          return result;
        }
      }
    };
    function point(x, y) {
      buffer.push("M", x, ",", y, pointCircle);
    }
    function pointLineStart(x, y) {
      buffer.push("M", x, ",", y);
      stream.point = pointLine;
    }
    function pointLine(x, y) {
      buffer.push("L", x, ",", y);
    }
    function lineEnd() {
      stream.point = point;
    }
    function lineEndPolygon() {
      buffer.push("Z");
    }
    return stream;
  }
  function d3_geo_pathContext(context) {
    var pointRadius = 4.5;
    var stream = {
      point: point,
      lineStart: function() {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function() {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function() {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function(_) {
        pointRadius = _;
        return stream;
      },
      result: d3_noop
    };
    function point(x, y) {
      context.moveTo(x, y);
      context.arc(x, y, pointRadius, 0, 2 * π);
    }
    function pointLineStart(x, y) {
      context.moveTo(x, y);
      stream.point = pointLine;
    }
    function pointLine(x, y) {
      context.lineTo(x, y);
    }
    function lineEnd() {
      stream.point = point;
    }
    function lineEndPolygon() {
      context.closePath();
    }
    return stream;
  }
  var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathArea = {
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function() {
      d3_geo_pathAreaPolygon = 0;
      d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
    },
    polygonEnd: function() {
      d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
      d3_geo_pathAreaSum += Math.abs(d3_geo_pathAreaPolygon / 2);
    }
  };
  function d3_geo_pathAreaRingStart() {
    var x00, y00, x0, y0;
    d3_geo_pathArea.point = function(x, y) {
      d3_geo_pathArea.point = nextPoint;
      x00 = x0 = x, y00 = y0 = y;
    };
    function nextPoint(x, y) {
      d3_geo_pathAreaPolygon += y0 * x - x0 * y;
      x0 = x, y0 = y;
    }
    d3_geo_pathArea.lineEnd = function() {
      nextPoint(x00, y00);
    };
  }
  var d3_geo_pathCentroid = {
    point: d3_geo_pathCentroidPoint,
    lineStart: d3_geo_pathCentroidLineStart,
    lineEnd: d3_geo_pathCentroidLineEnd,
    polygonStart: function() {
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
    },
    polygonEnd: function() {
      d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
      d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
    }
  };
  function d3_geo_pathCentroidPoint(x, y) {
    if (d3_geo_centroidDimension) return;
    d3_geo_centroidX += x;
    d3_geo_centroidY += y;
    ++d3_geo_centroidZ;
  }
  function d3_geo_pathCentroidLineStart() {
    var x0, y0;
    if (d3_geo_centroidDimension !== 1) {
      if (d3_geo_centroidDimension < 1) {
        d3_geo_centroidDimension = 1;
        d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
      } else return;
    }
    d3_geo_pathCentroid.point = function(x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      x0 = x, y0 = y;
    };
    function nextPoint(x, y) {
      var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
      d3_geo_centroidX += z * (x0 + x) / 2;
      d3_geo_centroidY += z * (y0 + y) / 2;
      d3_geo_centroidZ += z;
      x0 = x, y0 = y;
    }
  }
  function d3_geo_pathCentroidLineEnd() {
    d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
  }
  function d3_geo_pathCentroidRingStart() {
    var x00, y00, x0, y0;
    if (d3_geo_centroidDimension < 2) {
      d3_geo_centroidDimension = 2;
      d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
    }
    d3_geo_pathCentroid.point = function(x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      x00 = x0 = x, y00 = y0 = y;
    };
    function nextPoint(x, y) {
      var z = y0 * x - x0 * y;
      d3_geo_centroidX += z * (x0 + x);
      d3_geo_centroidY += z * (y0 + y);
      d3_geo_centroidZ += z * 3;
      x0 = x, y0 = y;
    }
    d3_geo_pathCentroid.lineEnd = function() {
      nextPoint(x00, y00);
    };
  }
  d3.geo.area = function(object) {
    d3_geo_areaSum = 0;
    d3.geo.stream(object, d3_geo_area);
    return d3_geo_areaSum;
  };
  var d3_geo_areaSum, d3_geo_areaRingU, d3_geo_areaRingV;
  var d3_geo_area = {
    sphere: function() {
      d3_geo_areaSum += 4 * π;
    },
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function() {
      d3_geo_areaRingU = 1, d3_geo_areaRingV = 0;
      d3_geo_area.lineStart = d3_geo_areaRingStart;
    },
    polygonEnd: function() {
      var area = 2 * Math.atan2(d3_geo_areaRingV, d3_geo_areaRingU);
      d3_geo_areaSum += area < 0 ? 4 * π + area : area;
      d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
    }
  };
  function d3_geo_areaRingStart() {
    var λ00, φ00, λ0, cosφ0, sinφ0;
    d3_geo_area.point = function(λ, φ) {
      d3_geo_area.point = nextPoint;
      λ0 = (λ00 = λ) * d3_radians, cosφ0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + π / 4), 
      sinφ0 = Math.sin(φ);
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      φ = φ * d3_radians / 2 + π / 4;
      var dλ = λ - λ0, cosφ = Math.cos(φ), sinφ = Math.sin(φ), k = sinφ0 * sinφ, u0 = d3_geo_areaRingU, v0 = d3_geo_areaRingV, u = cosφ0 * cosφ + k * Math.cos(dλ), v = k * Math.sin(dλ);
      d3_geo_areaRingU = u0 * u - v0 * v;
      d3_geo_areaRingV = v0 * u + u0 * v;
      λ0 = λ, cosφ0 = cosφ, sinφ0 = sinφ;
    }
    d3_geo_area.lineEnd = function() {
      nextPoint(λ00, φ00);
    };
  }
  d3.geo.projection = d3_geo_projection;
  d3.geo.projectionMutator = d3_geo_projectionMutator;
  function d3_geo_projection(project) {
    return d3_geo_projectionMutator(function() {
      return project;
    })();
  }
  function d3_geo_projectionMutator(projectAt) {
    var project, rotate, projectRotate, projectResample = d3_geo_resample(function(x, y) {
      x = project(x, y);
      return [ x[0] * k + δx, δy - x[1] * k ];
    }), k = 150, x = 480, y = 250, λ = 0, φ = 0, δλ = 0, δφ = 0, δγ = 0, δx, δy, clip = d3_geo_clipAntimeridian, clipAngle = null;
    function projection(point) {
      point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
      return [ point[0] * k + δx, δy - point[1] * k ];
    }
    function invert(point) {
      point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k);
      return point && [ point[0] * d3_degrees, point[1] * d3_degrees ];
    }
    projection.stream = function(stream) {
      return d3_geo_projectionRadiansRotate(rotate, clip(projectResample(stream)));
    };
    projection.clipAngle = function(_) {
      if (!arguments.length) return clipAngle;
      clip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle(clipAngle = +_);
      return projection;
    };
    projection.scale = function(_) {
      if (!arguments.length) return k;
      k = +_;
      return reset();
    };
    projection.translate = function(_) {
      if (!arguments.length) return [ x, y ];
      x = +_[0];
      y = +_[1];
      return reset();
    };
    projection.center = function(_) {
      if (!arguments.length) return [ λ * d3_degrees, φ * d3_degrees ];
      λ = _[0] % 360 * d3_radians;
      φ = _[1] % 360 * d3_radians;
      return reset();
    };
    projection.rotate = function(_) {
      if (!arguments.length) return [ δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees ];
      δλ = _[0] % 360 * d3_radians;
      δφ = _[1] % 360 * d3_radians;
      δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0;
      return reset();
    };
    d3.rebind(projection, projectResample, "precision");
    function reset() {
      projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
      var center = project(λ, φ);
      δx = x - center[0] * k;
      δy = y + center[1] * k;
      return projection;
    }
    return function() {
      project = projectAt.apply(this, arguments);
      projection.invert = project.invert && invert;
      return reset();
    };
  }
  function d3_geo_projectionRadiansRotate(rotate, stream) {
    return {
      point: function(x, y) {
        y = rotate(x * d3_radians, y * d3_radians), x = y[0];
        stream.point(x > π ? x - 2 * π : x < -π ? x + 2 * π : x, y[1]);
      },
      sphere: function() {
        stream.sphere();
      },
      lineStart: function() {
        stream.lineStart();
      },
      lineEnd: function() {
        stream.lineEnd();
      },
      polygonStart: function() {
        stream.polygonStart();
      },
      polygonEnd: function() {
        stream.polygonEnd();
      }
    };
  }
  function d3_geo_rotation(δλ, δφ, δγ) {
    return δλ ? δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ)) : d3_geo_rotationλ(δλ) : δφ || δγ ? d3_geo_rotationφγ(δφ, δγ) : d3_geo_equirectangular;
  }
  function d3_geo_forwardRotationλ(δλ) {
    return function(λ, φ) {
      return λ += δλ, [ λ > π ? λ - 2 * π : λ < -π ? λ + 2 * π : λ, φ ];
    };
  }
  function d3_geo_rotationλ(δλ) {
    var rotation = d3_geo_forwardRotationλ(δλ);
    rotation.invert = d3_geo_forwardRotationλ(-δλ);
    return rotation;
  }
  function d3_geo_rotationφγ(δφ, δγ) {
    var cosδφ = Math.cos(δφ), sinδφ = Math.sin(δφ), cosδγ = Math.cos(δγ), sinδγ = Math.sin(δγ);
    function rotation(λ, φ) {
      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδφ + x * sinδφ;
      return [ Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), Math.asin(Math.max(-1, Math.min(1, k * cosδγ + y * sinδγ))) ];
    }
    rotation.invert = function(λ, φ) {
      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδγ - y * sinδγ;
      return [ Math.atan2(y * cosδγ + z * sinδγ, x * cosδφ + k * sinδφ), Math.asin(Math.max(-1, Math.min(1, k * cosδφ - x * sinδφ))) ];
    };
    return rotation;
  }
  var d3_geo_stereographic = d3_geo_azimuthal(function(cosλcosφ) {
    return 1 / (1 + cosλcosφ);
  }, function(ρ) {
    return 2 * Math.atan(ρ);
  });
  (d3.geo.stereographic = function() {
    return d3_geo_projection(d3_geo_stereographic);
  }).raw = d3_geo_stereographic;
  function d3_geo_azimuthal(scale, angle) {
    function azimuthal(λ, φ) {
      var cosλ = Math.cos(λ), cosφ = Math.cos(φ), k = scale(cosλ * cosφ);
      return [ k * cosφ * Math.sin(λ), k * Math.sin(φ) ];
    }
    azimuthal.invert = function(x, y) {
      var ρ = Math.sqrt(x * x + y * y), c = angle(ρ), sinc = Math.sin(c), cosc = Math.cos(c);
      return [ Math.atan2(x * sinc, ρ * cosc), Math.asin(ρ && y * sinc / ρ) ];
    };
    return azimuthal;
  }
  d3.geom = {};
  d3.geom.hull = function(vertices) {
    if (vertices.length < 3) return [];
    var len = vertices.length, plen = len - 1, points = [], stack = [], i, j, h = 0, x1, y1, x2, y2, u, v, a, sp;
    for (i = 1; i < len; ++i) {
      if (vertices[i][1] < vertices[h][1]) {
        h = i;
      } else if (vertices[i][1] == vertices[h][1]) {
        h = vertices[i][0] < vertices[h][0] ? i : h;
      }
    }
    for (i = 0; i < len; ++i) {
      if (i === h) continue;
      y1 = vertices[i][1] - vertices[h][1];
      x1 = vertices[i][0] - vertices[h][0];
      points.push({
        angle: Math.atan2(y1, x1),
        index: i
      });
    }
    points.sort(function(a, b) {
      return a.angle - b.angle;
    });
    a = points[0].angle;
    v = points[0].index;
    u = 0;
    for (i = 1; i < plen; ++i) {
      j = points[i].index;
      if (a == points[i].angle) {
        x1 = vertices[v][0] - vertices[h][0];
        y1 = vertices[v][1] - vertices[h][1];
        x2 = vertices[j][0] - vertices[h][0];
        y2 = vertices[j][1] - vertices[h][1];
        if (x1 * x1 + y1 * y1 >= x2 * x2 + y2 * y2) {
          points[i].index = -1;
        } else {
          points[u].index = -1;
          a = points[i].angle;
          u = i;
          v = j;
        }
      } else {
        a = points[i].angle;
        u = i;
        v = j;
      }
    }
    stack.push(h);
    for (i = 0, j = 0; i < 2; ++j) {
      if (points[j].index !== -1) {
        stack.push(points[j].index);
        i++;
      }
    }
    sp = stack.length;
    for (;j < plen; ++j) {
      if (points[j].index === -1) continue;
      while (!d3_geom_hullCCW(stack[sp - 2], stack[sp - 1], points[j].index, vertices)) {
        --sp;
      }
      stack[sp++] = points[j].index;
    }
    var poly = [];
    for (i = 0; i < sp; ++i) {
      poly.push(vertices[stack[i]]);
    }
    return poly;
  };
  function d3_geom_hullCCW(i1, i2, i3, v) {
    var t, a, b, c, d, e, f;
    t = v[i1];
    a = t[0];
    b = t[1];
    t = v[i2];
    c = t[0];
    d = t[1];
    t = v[i3];
    e = t[0];
    f = t[1];
    return (f - b) * (c - a) - (d - b) * (e - a) > 0;
  }
  d3.geom.polygon = function(coordinates) {
    coordinates.area = function() {
      var i = 0, n = coordinates.length, area = coordinates[n - 1][1] * coordinates[0][0] - coordinates[n - 1][0] * coordinates[0][1];
      while (++i < n) {
        area += coordinates[i - 1][1] * coordinates[i][0] - coordinates[i - 1][0] * coordinates[i][1];
      }
      return area * .5;
    };
    coordinates.centroid = function(k) {
      var i = -1, n = coordinates.length, x = 0, y = 0, a, b = coordinates[n - 1], c;
      if (!arguments.length) k = -1 / (6 * coordinates.area());
      while (++i < n) {
        a = b;
        b = coordinates[i];
        c = a[0] * b[1] - b[0] * a[1];
        x += (a[0] + b[0]) * c;
        y += (a[1] + b[1]) * c;
      }
      return [ x * k, y * k ];
    };
    coordinates.clip = function(subject) {
      var input, i = -1, n = coordinates.length, j, m, a = coordinates[n - 1], b, c, d;
      while (++i < n) {
        input = subject.slice();
        subject.length = 0;
        b = coordinates[i];
        c = input[(m = input.length) - 1];
        j = -1;
        while (++j < m) {
          d = input[j];
          if (d3_geom_polygonInside(d, a, b)) {
            if (!d3_geom_polygonInside(c, a, b)) {
              subject.push(d3_geom_polygonIntersect(c, d, a, b));
            }
            subject.push(d);
          } else if (d3_geom_polygonInside(c, a, b)) {
            subject.push(d3_geom_polygonIntersect(c, d, a, b));
          }
          c = d;
        }
        a = b;
      }
      return subject;
    };
    return coordinates;
  };
  function d3_geom_polygonInside(p, a, b) {
    return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
  }
  function d3_geom_polygonIntersect(c, d, a, b) {
    var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3, y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3, ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
    return [ x1 + ua * x21, y1 + ua * y21 ];
  }
  d3.geom.voronoi = function(vertices) {
    var polygons = vertices.map(function() {
      return [];
    }), Z = 1e6;
    d3_voronoi_tessellate(vertices, function(e) {
      var s1, s2, x1, x2, y1, y2;
      if (e.a === 1 && e.b >= 0) {
        s1 = e.ep.r;
        s2 = e.ep.l;
      } else {
        s1 = e.ep.l;
        s2 = e.ep.r;
      }
      if (e.a === 1) {
        y1 = s1 ? s1.y : -Z;
        x1 = e.c - e.b * y1;
        y2 = s2 ? s2.y : Z;
        x2 = e.c - e.b * y2;
      } else {
        x1 = s1 ? s1.x : -Z;
        y1 = e.c - e.a * x1;
        x2 = s2 ? s2.x : Z;
        y2 = e.c - e.a * x2;
      }
      var v1 = [ x1, y1 ], v2 = [ x2, y2 ];
      polygons[e.region.l.index].push(v1, v2);
      polygons[e.region.r.index].push(v1, v2);
    });
    polygons = polygons.map(function(polygon, i) {
      var cx = vertices[i][0], cy = vertices[i][1], angle = polygon.map(function(v) {
        return Math.atan2(v[0] - cx, v[1] - cy);
      }), order = d3.range(polygon.length).sort(function(a, b) {
        return angle[a] - angle[b];
      });
      return order.filter(function(d, i) {
        return !i || angle[d] - angle[order[i - 1]] > ε;
      }).map(function(d) {
        return polygon[d];
      });
    });
    polygons.forEach(function(polygon, i) {
      var n = polygon.length;
      if (!n) return polygon.push([ -Z, -Z ], [ -Z, Z ], [ Z, Z ], [ Z, -Z ]);
      if (n > 2) return;
      var p0 = vertices[i], p1 = polygon[0], p2 = polygon[1], x0 = p0[0], y0 = p0[1], x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1], dx = Math.abs(x2 - x1), dy = y2 - y1;
      if (Math.abs(dy) < ε) {
        var y = y0 < y1 ? -Z : Z;
        polygon.push([ -Z, y ], [ Z, y ]);
      } else if (dx < ε) {
        var x = x0 < x1 ? -Z : Z;
        polygon.push([ x, -Z ], [ x, Z ]);
      } else {
        var y = (x2 - x1) * (y1 - y0) < (x1 - x0) * (y2 - y1) ? Z : -Z, z = Math.abs(dy) - dx;
        if (Math.abs(z) < ε) {
          polygon.push([ dy < 0 ? y : -y, y ]);
        } else {
          if (z > 0) y *= -1;
          polygon.push([ -Z, y ], [ Z, y ]);
        }
      }
    });
    return polygons;
  };
  var d3_voronoi_opposite = {
    l: "r",
    r: "l"
  };
  function d3_voronoi_tessellate(vertices, callback) {
    var Sites = {
      list: vertices.map(function(v, i) {
        return {
          index: i,
          x: v[0],
          y: v[1]
        };
      }).sort(function(a, b) {
        return a.y < b.y ? -1 : a.y > b.y ? 1 : a.x < b.x ? -1 : a.x > b.x ? 1 : 0;
      }),
      bottomSite: null
    };
    var EdgeList = {
      list: [],
      leftEnd: null,
      rightEnd: null,
      init: function() {
        EdgeList.leftEnd = EdgeList.createHalfEdge(null, "l");
        EdgeList.rightEnd = EdgeList.createHalfEdge(null, "l");
        EdgeList.leftEnd.r = EdgeList.rightEnd;
        EdgeList.rightEnd.l = EdgeList.leftEnd;
        EdgeList.list.unshift(EdgeList.leftEnd, EdgeList.rightEnd);
      },
      createHalfEdge: function(edge, side) {
        return {
          edge: edge,
          side: side,
          vertex: null,
          l: null,
          r: null
        };
      },
      insert: function(lb, he) {
        he.l = lb;
        he.r = lb.r;
        lb.r.l = he;
        lb.r = he;
      },
      leftBound: function(p) {
        var he = EdgeList.leftEnd;
        do {
          he = he.r;
        } while (he != EdgeList.rightEnd && Geom.rightOf(he, p));
        he = he.l;
        return he;
      },
      del: function(he) {
        he.l.r = he.r;
        he.r.l = he.l;
        he.edge = null;
      },
      right: function(he) {
        return he.r;
      },
      left: function(he) {
        return he.l;
      },
      leftRegion: function(he) {
        return he.edge == null ? Sites.bottomSite : he.edge.region[he.side];
      },
      rightRegion: function(he) {
        return he.edge == null ? Sites.bottomSite : he.edge.region[d3_voronoi_opposite[he.side]];
      }
    };
    var Geom = {
      bisect: function(s1, s2) {
        var newEdge = {
          region: {
            l: s1,
            r: s2
          },
          ep: {
            l: null,
            r: null
          }
        };
        var dx = s2.x - s1.x, dy = s2.y - s1.y, adx = dx > 0 ? dx : -dx, ady = dy > 0 ? dy : -dy;
        newEdge.c = s1.x * dx + s1.y * dy + (dx * dx + dy * dy) * .5;
        if (adx > ady) {
          newEdge.a = 1;
          newEdge.b = dy / dx;
          newEdge.c /= dx;
        } else {
          newEdge.b = 1;
          newEdge.a = dx / dy;
          newEdge.c /= dy;
        }
        return newEdge;
      },
      intersect: function(el1, el2) {
        var e1 = el1.edge, e2 = el2.edge;
        if (!e1 || !e2 || e1.region.r == e2.region.r) {
          return null;
        }
        var d = e1.a * e2.b - e1.b * e2.a;
        if (Math.abs(d) < 1e-10) {
          return null;
        }
        var xint = (e1.c * e2.b - e2.c * e1.b) / d, yint = (e2.c * e1.a - e1.c * e2.a) / d, e1r = e1.region.r, e2r = e2.region.r, el, e;
        if (e1r.y < e2r.y || e1r.y == e2r.y && e1r.x < e2r.x) {
          el = el1;
          e = e1;
        } else {
          el = el2;
          e = e2;
        }
        var rightOfSite = xint >= e.region.r.x;
        if (rightOfSite && el.side === "l" || !rightOfSite && el.side === "r") {
          return null;
        }
        return {
          x: xint,
          y: yint
        };
      },
      rightOf: function(he, p) {
        var e = he.edge, topsite = e.region.r, rightOfSite = p.x > topsite.x;
        if (rightOfSite && he.side === "l") {
          return 1;
        }
        if (!rightOfSite && he.side === "r") {
          return 0;
        }
        if (e.a === 1) {
          var dyp = p.y - topsite.y, dxp = p.x - topsite.x, fast = 0, above = 0;
          if (!rightOfSite && e.b < 0 || rightOfSite && e.b >= 0) {
            above = fast = dyp >= e.b * dxp;
          } else {
            above = p.x + p.y * e.b > e.c;
            if (e.b < 0) {
              above = !above;
            }
            if (!above) {
              fast = 1;
            }
          }
          if (!fast) {
            var dxs = topsite.x - e.region.l.x;
            above = e.b * (dxp * dxp - dyp * dyp) < dxs * dyp * (1 + 2 * dxp / dxs + e.b * e.b);
            if (e.b < 0) {
              above = !above;
            }
          }
        } else {
          var yl = e.c - e.a * p.x, t1 = p.y - yl, t2 = p.x - topsite.x, t3 = yl - topsite.y;
          above = t1 * t1 > t2 * t2 + t3 * t3;
        }
        return he.side === "l" ? above : !above;
      },
      endPoint: function(edge, side, site) {
        edge.ep[side] = site;
        if (!edge.ep[d3_voronoi_opposite[side]]) return;
        callback(edge);
      },
      distance: function(s, t) {
        var dx = s.x - t.x, dy = s.y - t.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    };
    var EventQueue = {
      list: [],
      insert: function(he, site, offset) {
        he.vertex = site;
        he.ystar = site.y + offset;
        for (var i = 0, list = EventQueue.list, l = list.length; i < l; i++) {
          var next = list[i];
          if (he.ystar > next.ystar || he.ystar == next.ystar && site.x > next.vertex.x) {
            continue;
          } else {
            break;
          }
        }
        list.splice(i, 0, he);
      },
      del: function(he) {
        for (var i = 0, ls = EventQueue.list, l = ls.length; i < l && ls[i] != he; ++i) {}
        ls.splice(i, 1);
      },
      empty: function() {
        return EventQueue.list.length === 0;
      },
      nextEvent: function(he) {
        for (var i = 0, ls = EventQueue.list, l = ls.length; i < l; ++i) {
          if (ls[i] == he) return ls[i + 1];
        }
        return null;
      },
      min: function() {
        var elem = EventQueue.list[0];
        return {
          x: elem.vertex.x,
          y: elem.ystar
        };
      },
      extractMin: function() {
        return EventQueue.list.shift();
      }
    };
    EdgeList.init();
    Sites.bottomSite = Sites.list.shift();
    var newSite = Sites.list.shift(), newIntStar;
    var lbnd, rbnd, llbnd, rrbnd, bisector;
    var bot, top, temp, p, v;
    var e, pm;
    while (true) {
      if (!EventQueue.empty()) {
        newIntStar = EventQueue.min();
      }
      if (newSite && (EventQueue.empty() || newSite.y < newIntStar.y || newSite.y == newIntStar.y && newSite.x < newIntStar.x)) {
        lbnd = EdgeList.leftBound(newSite);
        rbnd = EdgeList.right(lbnd);
        bot = EdgeList.rightRegion(lbnd);
        e = Geom.bisect(bot, newSite);
        bisector = EdgeList.createHalfEdge(e, "l");
        EdgeList.insert(lbnd, bisector);
        p = Geom.intersect(lbnd, bisector);
        if (p) {
          EventQueue.del(lbnd);
          EventQueue.insert(lbnd, p, Geom.distance(p, newSite));
        }
        lbnd = bisector;
        bisector = EdgeList.createHalfEdge(e, "r");
        EdgeList.insert(lbnd, bisector);
        p = Geom.intersect(bisector, rbnd);
        if (p) {
          EventQueue.insert(bisector, p, Geom.distance(p, newSite));
        }
        newSite = Sites.list.shift();
      } else if (!EventQueue.empty()) {
        lbnd = EventQueue.extractMin();
        llbnd = EdgeList.left(lbnd);
        rbnd = EdgeList.right(lbnd);
        rrbnd = EdgeList.right(rbnd);
        bot = EdgeList.leftRegion(lbnd);
        top = EdgeList.rightRegion(rbnd);
        v = lbnd.vertex;
        Geom.endPoint(lbnd.edge, lbnd.side, v);
        Geom.endPoint(rbnd.edge, rbnd.side, v);
        EdgeList.del(lbnd);
        EventQueue.del(rbnd);
        EdgeList.del(rbnd);
        pm = "l";
        if (bot.y > top.y) {
          temp = bot;
          bot = top;
          top = temp;
          pm = "r";
        }
        e = Geom.bisect(bot, top);
        bisector = EdgeList.createHalfEdge(e, pm);
        EdgeList.insert(llbnd, bisector);
        Geom.endPoint(e, d3_voronoi_opposite[pm], v);
        p = Geom.intersect(llbnd, bisector);
        if (p) {
          EventQueue.del(llbnd);
          EventQueue.insert(llbnd, p, Geom.distance(p, bot));
        }
        p = Geom.intersect(bisector, rrbnd);
        if (p) {
          EventQueue.insert(bisector, p, Geom.distance(p, bot));
        }
      } else {
        break;
      }
    }
    for (lbnd = EdgeList.right(EdgeList.leftEnd); lbnd != EdgeList.rightEnd; lbnd = EdgeList.right(lbnd)) {
      callback(lbnd.edge);
    }
  }
  d3.geom.delaunay = function(vertices) {
    var edges = vertices.map(function() {
      return [];
    }), triangles = [];
    d3_voronoi_tessellate(vertices, function(e) {
      edges[e.region.l.index].push(vertices[e.region.r.index]);
    });
    edges.forEach(function(edge, i) {
      var v = vertices[i], cx = v[0], cy = v[1];
      edge.forEach(function(v) {
        v.angle = Math.atan2(v[0] - cx, v[1] - cy);
      });
      edge.sort(function(a, b) {
        return a.angle - b.angle;
      });
      for (var j = 0, m = edge.length - 1; j < m; j++) {
        triangles.push([ v, edge[j], edge[j + 1] ]);
      }
    });
    return triangles;
  };
  d3.geom.quadtree = function(points, x1, y1, x2, y2) {
    var p, i = -1, n = points.length;
    if (arguments.length < 5) {
      if (arguments.length === 3) {
        y2 = y1;
        x2 = x1;
        y1 = x1 = 0;
      } else {
        x1 = y1 = Infinity;
        x2 = y2 = -Infinity;
        while (++i < n) {
          p = points[i];
          if (p.x < x1) x1 = p.x;
          if (p.y < y1) y1 = p.y;
          if (p.x > x2) x2 = p.x;
          if (p.y > y2) y2 = p.y;
        }
      }
    }
    var dx = x2 - x1, dy = y2 - y1;
    if (dx > dy) y2 = y1 + dx; else x2 = x1 + dy;
    function insert(n, p, x1, y1, x2, y2) {
      if (isNaN(p.x) || isNaN(p.y)) return;
      if (n.leaf) {
        var v = n.point;
        if (v) {
          if (Math.abs(v.x - p.x) + Math.abs(v.y - p.y) < .01) {
            insertChild(n, p, x1, y1, x2, y2);
          } else {
            n.point = null;
            insertChild(n, v, x1, y1, x2, y2);
            insertChild(n, p, x1, y1, x2, y2);
          }
        } else {
          n.point = p;
        }
      } else {
        insertChild(n, p, x1, y1, x2, y2);
      }
    }
    function insertChild(n, p, x1, y1, x2, y2) {
      var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, right = p.x >= sx, bottom = p.y >= sy, i = (bottom << 1) + right;
      n.leaf = false;
      n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());
      if (right) x1 = sx; else x2 = sx;
      if (bottom) y1 = sy; else y2 = sy;
      insert(n, p, x1, y1, x2, y2);
    }
    var root = d3_geom_quadtreeNode();
    root.add = function(p) {
      insert(root, p, x1, y1, x2, y2);
    };
    root.visit = function(f) {
      d3_geom_quadtreeVisit(f, root, x1, y1, x2, y2);
    };
    points.forEach(root.add);
    return root;
  };
  function d3_geom_quadtreeNode() {
    return {
      leaf: true,
      nodes: [],
      point: null
    };
  }
  function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
    if (!f(node, x1, y1, x2, y2)) {
      var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, children = node.nodes;
      if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
      if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
      if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
      if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
    }
  }
  d3.time = {};
  var d3_time = Date, d3_time_daySymbols = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  function d3_time_utc() {
    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
  }
  d3_time_utc.prototype = {
    getDate: function() {
      return this._.getUTCDate();
    },
    getDay: function() {
      return this._.getUTCDay();
    },
    getFullYear: function() {
      return this._.getUTCFullYear();
    },
    getHours: function() {
      return this._.getUTCHours();
    },
    getMilliseconds: function() {
      return this._.getUTCMilliseconds();
    },
    getMinutes: function() {
      return this._.getUTCMinutes();
    },
    getMonth: function() {
      return this._.getUTCMonth();
    },
    getSeconds: function() {
      return this._.getUTCSeconds();
    },
    getTime: function() {
      return this._.getTime();
    },
    getTimezoneOffset: function() {
      return 0;
    },
    valueOf: function() {
      return this._.valueOf();
    },
    setDate: function() {
      d3_time_prototype.setUTCDate.apply(this._, arguments);
    },
    setDay: function() {
      d3_time_prototype.setUTCDay.apply(this._, arguments);
    },
    setFullYear: function() {
      d3_time_prototype.setUTCFullYear.apply(this._, arguments);
    },
    setHours: function() {
      d3_time_prototype.setUTCHours.apply(this._, arguments);
    },
    setMilliseconds: function() {
      d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
    },
    setMinutes: function() {
      d3_time_prototype.setUTCMinutes.apply(this._, arguments);
    },
    setMonth: function() {
      d3_time_prototype.setUTCMonth.apply(this._, arguments);
    },
    setSeconds: function() {
      d3_time_prototype.setUTCSeconds.apply(this._, arguments);
    },
    setTime: function() {
      d3_time_prototype.setTime.apply(this._, arguments);
    }
  };
  var d3_time_prototype = Date.prototype;
  var d3_time_formatDateTime = "%a %b %e %X %Y", d3_time_formatDate = "%m/%d/%Y", d3_time_formatTime = "%H:%M:%S";
  var d3_time_days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], d3_time_dayAbbreviations = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ], d3_time_months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], d3_time_monthAbbreviations = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  d3.time.format = function(template) {
    var n = template.length;
    function format(date) {
      var string = [], i = -1, j = 0, c, p, f;
      while (++i < n) {
        if (template.charCodeAt(i) === 37) {
          string.push(template.substring(j, i));
          if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
          if (f = d3_time_formats[c]) c = f(date, p == null ? c === "e" ? " " : "0" : p);
          string.push(c);
          j = i + 1;
        }
      }
      string.push(template.substring(j, i));
      return string.join("");
    }
    format.parse = function(string) {
      var d = {
        y: 1900,
        m: 0,
        d: 1,
        H: 0,
        M: 0,
        S: 0,
        L: 0
      }, i = d3_time_parse(d, template, string, 0);
      if (i != string.length) return null;
      if ("p" in d) d.H = d.H % 12 + d.p * 12;
      var date = new d3_time();
      date.setFullYear(d.y, d.m, d.d);
      date.setHours(d.H, d.M, d.S, d.L);
      return date;
    };
    format.toString = function() {
      return template;
    };
    return format;
  };
  function d3_time_parse(date, template, string, j) {
    var c, p, i = 0, n = template.length, m = string.length;
    while (i < n) {
      if (j >= m) return -1;
      c = template.charCodeAt(i++);
      if (c === 37) {
        p = d3_time_parsers[template.charAt(i++)];
        if (!p || (j = p(date, string, j)) < 0) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function d3_time_formatRe(names) {
    return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i");
  }
  function d3_time_formatLookup(names) {
    var map = new d3_Map(), i = -1, n = names.length;
    while (++i < n) map.set(names[i].toLowerCase(), i);
    return map;
  }
  function d3_time_formatPad(value, fill, width) {
    value += "";
    var length = value.length;
    return length < width ? new Array(width - length + 1).join(fill) + value : value;
  }
  var d3_time_dayRe = d3_time_formatRe(d3_time_days), d3_time_dayAbbrevRe = d3_time_formatRe(d3_time_dayAbbreviations), d3_time_monthRe = d3_time_formatRe(d3_time_months), d3_time_monthLookup = d3_time_formatLookup(d3_time_months), d3_time_monthAbbrevRe = d3_time_formatRe(d3_time_monthAbbreviations), d3_time_monthAbbrevLookup = d3_time_formatLookup(d3_time_monthAbbreviations);
  var d3_time_formatPads = {
    "-": "",
    _: " ",
    "0": "0"
  };
  var d3_time_formats = {
    a: function(d) {
      return d3_time_dayAbbreviations[d.getDay()];
    },
    A: function(d) {
      return d3_time_days[d.getDay()];
    },
    b: function(d) {
      return d3_time_monthAbbreviations[d.getMonth()];
    },
    B: function(d) {
      return d3_time_months[d.getMonth()];
    },
    c: d3.time.format(d3_time_formatDateTime),
    d: function(d, p) {
      return d3_time_formatPad(d.getDate(), p, 2);
    },
    e: function(d, p) {
      return d3_time_formatPad(d.getDate(), p, 2);
    },
    H: function(d, p) {
      return d3_time_formatPad(d.getHours(), p, 2);
    },
    I: function(d, p) {
      return d3_time_formatPad(d.getHours() % 12 || 12, p, 2);
    },
    j: function(d, p) {
      return d3_time_formatPad(1 + d3.time.dayOfYear(d), p, 3);
    },
    L: function(d, p) {
      return d3_time_formatPad(d.getMilliseconds(), p, 3);
    },
    m: function(d, p) {
      return d3_time_formatPad(d.getMonth() + 1, p, 2);
    },
    M: function(d, p) {
      return d3_time_formatPad(d.getMinutes(), p, 2);
    },
    p: function(d) {
      return d.getHours() >= 12 ? "PM" : "AM";
    },
    S: function(d, p) {
      return d3_time_formatPad(d.getSeconds(), p, 2);
    },
    U: function(d, p) {
      return d3_time_formatPad(d3.time.sundayOfYear(d), p, 2);
    },
    w: function(d) {
      return d.getDay();
    },
    W: function(d, p) {
      return d3_time_formatPad(d3.time.mondayOfYear(d), p, 2);
    },
    x: d3.time.format(d3_time_formatDate),
    X: d3.time.format(d3_time_formatTime),
    y: function(d, p) {
      return d3_time_formatPad(d.getFullYear() % 100, p, 2);
    },
    Y: function(d, p) {
      return d3_time_formatPad(d.getFullYear() % 1e4, p, 4);
    },
    Z: d3_time_zone,
    "%": function() {
      return "%";
    }
  };
  var d3_time_parsers = {
    a: d3_time_parseWeekdayAbbrev,
    A: d3_time_parseWeekday,
    b: d3_time_parseMonthAbbrev,
    B: d3_time_parseMonth,
    c: d3_time_parseLocaleFull,
    d: d3_time_parseDay,
    e: d3_time_parseDay,
    H: d3_time_parseHour24,
    I: d3_time_parseHour24,
    L: d3_time_parseMilliseconds,
    m: d3_time_parseMonthNumber,
    M: d3_time_parseMinutes,
    p: d3_time_parseAmPm,
    S: d3_time_parseSeconds,
    x: d3_time_parseLocaleDate,
    X: d3_time_parseLocaleTime,
    y: d3_time_parseYear,
    Y: d3_time_parseFullYear
  };
  function d3_time_parseWeekdayAbbrev(date, string, i) {
    d3_time_dayAbbrevRe.lastIndex = 0;
    var n = d3_time_dayAbbrevRe.exec(string.substring(i));
    return n ? i += n[0].length : -1;
  }
  function d3_time_parseWeekday(date, string, i) {
    d3_time_dayRe.lastIndex = 0;
    var n = d3_time_dayRe.exec(string.substring(i));
    return n ? i += n[0].length : -1;
  }
  function d3_time_parseMonthAbbrev(date, string, i) {
    d3_time_monthAbbrevRe.lastIndex = 0;
    var n = d3_time_monthAbbrevRe.exec(string.substring(i));
    return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i += n[0].length) : -1;
  }
  function d3_time_parseMonth(date, string, i) {
    d3_time_monthRe.lastIndex = 0;
    var n = d3_time_monthRe.exec(string.substring(i));
    return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i += n[0].length) : -1;
  }
  function d3_time_parseLocaleFull(date, string, i) {
    return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
  }
  function d3_time_parseLocaleDate(date, string, i) {
    return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
  }
  function d3_time_parseLocaleTime(date, string, i) {
    return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
  }
  function d3_time_parseFullYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 4));
    return n ? (date.y = +n[0], i += n[0].length) : -1;
  }
  function d3_time_parseYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.y = d3_time_expandYear(+n[0]), i += n[0].length) : -1;
  }
  function d3_time_expandYear(d) {
    return d + (d > 68 ? 1900 : 2e3);
  }
  function d3_time_parseMonthNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.m = n[0] - 1, i += n[0].length) : -1;
  }
  function d3_time_parseDay(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.d = +n[0], i += n[0].length) : -1;
  }
  function d3_time_parseHour24(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.H = +n[0], i += n[0].length) : -1;
  }
  function d3_time_parseMinutes(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.M = +n[0], i += n[0].length) : -1;
  }
  function d3_time_parseSeconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.S = +n[0], i += n[0].length) : -1;
  }
  function d3_time_parseMilliseconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 3));
    return n ? (date.L = +n[0], i += n[0].length) : -1;
  }
  var d3_time_numberRe = /^\s*\d+/;
  function d3_time_parseAmPm(date, string, i) {
    var n = d3_time_amPmLookup.get(string.substring(i, i += 2).toLowerCase());
    return n == null ? -1 : (date.p = n, i);
  }
  var d3_time_amPmLookup = d3.map({
    am: 0,
    pm: 1
  });
  function d3_time_zone(d) {
    var z = d.getTimezoneOffset(), zs = z > 0 ? "-" : "+", zh = ~~(Math.abs(z) / 60), zm = Math.abs(z) % 60;
    return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2);
  }
  d3.time.format.utc = function(template) {
    var local = d3.time.format(template);
    function format(date) {
      try {
        d3_time = d3_time_utc;
        var utc = new d3_time();
        utc._ = date;
        return local(utc);
      } finally {
        d3_time = Date;
      }
    }
    format.parse = function(string) {
      try {
        d3_time = d3_time_utc;
        var date = local.parse(string);
        return date && date._;
      } finally {
        d3_time = Date;
      }
    };
    format.toString = local.toString;
    return format;
  };
  var d3_time_formatIso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
  d3.time.format.iso = Date.prototype.toISOString ? d3_time_formatIsoNative : d3_time_formatIso;
  function d3_time_formatIsoNative(date) {
    return date.toISOString();
  }
  d3_time_formatIsoNative.parse = function(string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  };
  d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
  function d3_time_interval(local, step, number) {
    function round(date) {
      var d0 = local(date), d1 = offset(d0, 1);
      return date - d0 < d1 - date ? d0 : d1;
    }
    function ceil(date) {
      step(date = local(new d3_time(date - 1)), 1);
      return date;
    }
    function offset(date, k) {
      step(date = new d3_time(+date), k);
      return date;
    }
    function range(t0, t1, dt) {
      var time = ceil(t0), times = [];
      if (dt > 1) {
        while (time < t1) {
          if (!(number(time) % dt)) times.push(new Date(+time));
          step(time, 1);
        }
      } else {
        while (time < t1) times.push(new Date(+time)), step(time, 1);
      }
      return times;
    }
    function range_utc(t0, t1, dt) {
      try {
        d3_time = d3_time_utc;
        var utc = new d3_time_utc();
        utc._ = t0;
        return range(utc, t1, dt);
      } finally {
        d3_time = Date;
      }
    }
    local.floor = local;
    local.round = round;
    local.ceil = ceil;
    local.offset = offset;
    local.range = range;
    var utc = local.utc = d3_time_interval_utc(local);
    utc.floor = utc;
    utc.round = d3_time_interval_utc(round);
    utc.ceil = d3_time_interval_utc(ceil);
    utc.offset = d3_time_interval_utc(offset);
    utc.range = range_utc;
    return local;
  }
  function d3_time_interval_utc(method) {
    return function(date, k) {
      try {
        d3_time = d3_time_utc;
        var utc = new d3_time_utc();
        utc._ = date;
        return method(utc, k)._;
      } finally {
        d3_time = Date;
      }
    };
  }
  d3.time.second = d3_time_interval(function(date) {
    return new d3_time(Math.floor(date / 1e3) * 1e3);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 1e3);
  }, function(date) {
    return date.getSeconds();
  });
  d3.time.seconds = d3.time.second.range;
  d3.time.seconds.utc = d3.time.second.utc.range;
  d3.time.minute = d3_time_interval(function(date) {
    return new d3_time(Math.floor(date / 6e4) * 6e4);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 6e4);
  }, function(date) {
    return date.getMinutes();
  });
  d3.time.minutes = d3.time.minute.range;
  d3.time.minutes.utc = d3.time.minute.utc.range;
  d3.time.hour = d3_time_interval(function(date) {
    var timezone = date.getTimezoneOffset() / 60;
    return new d3_time((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 36e5);
  }, function(date) {
    return date.getHours();
  });
  d3.time.hours = d3.time.hour.range;
  d3.time.hours.utc = d3.time.hour.utc.range;
  d3.time.day = d3_time_interval(function(date) {
    var day = new d3_time(1970, 0);
    day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    return day;
  }, function(date, offset) {
    date.setDate(date.getDate() + offset);
  }, function(date) {
    return date.getDate() - 1;
  });
  d3.time.days = d3.time.day.range;
  d3.time.days.utc = d3.time.day.utc.range;
  d3.time.dayOfYear = function(date) {
    var year = d3.time.year(date);
    return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
  };
  d3_time_daySymbols.forEach(function(day, i) {
    day = day.toLowerCase();
    i = 7 - i;
    var interval = d3.time[day] = d3_time_interval(function(date) {
      (date = d3.time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
      return date;
    }, function(date, offset) {
      date.setDate(date.getDate() + Math.floor(offset) * 7);
    }, function(date) {
      var day = d3.time.year(date).getDay();
      return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
    });
    d3.time[day + "s"] = interval.range;
    d3.time[day + "s"].utc = interval.utc.range;
    d3.time[day + "OfYear"] = function(date) {
      var day = d3.time.year(date).getDay();
      return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7);
    };
  });
  d3.time.week = d3.time.sunday;
  d3.time.weeks = d3.time.sunday.range;
  d3.time.weeks.utc = d3.time.sunday.utc.range;
  d3.time.weekOfYear = d3.time.sundayOfYear;
  d3.time.month = d3_time_interval(function(date) {
    date = d3.time.day(date);
    date.setDate(1);
    return date;
  }, function(date, offset) {
    date.setMonth(date.getMonth() + offset);
  }, function(date) {
    return date.getMonth();
  });
  d3.time.months = d3.time.month.range;
  d3.time.months.utc = d3.time.month.utc.range;
  d3.time.year = d3_time_interval(function(date) {
    date = d3.time.day(date);
    date.setMonth(0, 1);
    return date;
  }, function(date, offset) {
    date.setFullYear(date.getFullYear() + offset);
  }, function(date) {
    return date.getFullYear();
  });
  d3.time.years = d3.time.year.range;
  d3.time.years.utc = d3.time.year.utc.range;
  function d3_time_scale(linear, methods, format) {
    function scale(x) {
      return linear(x);
    }
    scale.invert = function(x) {
      return d3_time_scaleDate(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
      linear.domain(x);
      return scale;
    };
    scale.nice = function(m) {
      return scale.domain(d3_scale_nice(scale.domain(), function() {
        return m;
      }));
    };
    scale.ticks = function(m, k) {
      var extent = d3_time_scaleExtent(scale.domain());
      if (typeof m !== "function") {
        var span = extent[1] - extent[0], target = span / m, i = d3.bisect(d3_time_scaleSteps, target);
        if (i == d3_time_scaleSteps.length) return methods.year(extent, m);
        if (!i) return linear.ticks(m).map(d3_time_scaleDate);
        if (Math.log(target / d3_time_scaleSteps[i - 1]) < Math.log(d3_time_scaleSteps[i] / target)) --i;
        m = methods[i];
        k = m[1];
        m = m[0].range;
      }
      return m(extent[0], new Date(+extent[1] + 1), k);
    };
    scale.tickFormat = function() {
      return format;
    };
    scale.copy = function() {
      return d3_time_scale(linear.copy(), methods, format);
    };
    return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
  }
  function d3_time_scaleExtent(domain) {
    var start = domain[0], stop = domain[domain.length - 1];
    return start < stop ? [ start, stop ] : [ stop, start ];
  }
  function d3_time_scaleDate(t) {
    return new Date(t);
  }
  function d3_time_scaleFormat(formats) {
    return function(date) {
      var i = formats.length - 1, f = formats[i];
      while (!f[1](date)) f = formats[--i];
      return f[0](date);
    };
  }
  function d3_time_scaleSetYear(y) {
    var d = new Date(y, 0, 1);
    d.setFullYear(y);
    return d;
  }
  function d3_time_scaleGetYear(d) {
    var y = d.getFullYear(), d0 = d3_time_scaleSetYear(y), d1 = d3_time_scaleSetYear(y + 1);
    return y + (d - d0) / (d1 - d0);
  }
  var d3_time_scaleSteps = [ 1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6 ];
  var d3_time_scaleLocalMethods = [ [ d3.time.second, 1 ], [ d3.time.second, 5 ], [ d3.time.second, 15 ], [ d3.time.second, 30 ], [ d3.time.minute, 1 ], [ d3.time.minute, 5 ], [ d3.time.minute, 15 ], [ d3.time.minute, 30 ], [ d3.time.hour, 1 ], [ d3.time.hour, 3 ], [ d3.time.hour, 6 ], [ d3.time.hour, 12 ], [ d3.time.day, 1 ], [ d3.time.day, 2 ], [ d3.time.week, 1 ], [ d3.time.month, 1 ], [ d3.time.month, 3 ], [ d3.time.year, 1 ] ];
  var d3_time_scaleLocalFormats = [ [ d3.time.format("%Y"), d3_true ], [ d3.time.format("%B"), function(d) {
    return d.getMonth();
  } ], [ d3.time.format("%b %d"), function(d) {
    return d.getDate() != 1;
  } ], [ d3.time.format("%a %d"), function(d) {
    return d.getDay() && d.getDate() != 1;
  } ], [ d3.time.format("%I %p"), function(d) {
    return d.getHours();
  } ], [ d3.time.format("%I:%M"), function(d) {
    return d.getMinutes();
  } ], [ d3.time.format(":%S"), function(d) {
    return d.getSeconds();
  } ], [ d3.time.format(".%L"), function(d) {
    return d.getMilliseconds();
  } ] ];
  var d3_time_scaleLinear = d3.scale.linear(), d3_time_scaleLocalFormat = d3_time_scaleFormat(d3_time_scaleLocalFormats);
  d3_time_scaleLocalMethods.year = function(extent, m) {
    return d3_time_scaleLinear.domain(extent.map(d3_time_scaleGetYear)).ticks(m).map(d3_time_scaleSetYear);
  };
  d3.time.scale = function() {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
  };
  var d3_time_scaleUTCMethods = d3_time_scaleLocalMethods.map(function(m) {
    return [ m[0].utc, m[1] ];
  });
  var d3_time_scaleUTCFormats = [ [ d3.time.format.utc("%Y"), d3_true ], [ d3.time.format.utc("%B"), function(d) {
    return d.getUTCMonth();
  } ], [ d3.time.format.utc("%b %d"), function(d) {
    return d.getUTCDate() != 1;
  } ], [ d3.time.format.utc("%a %d"), function(d) {
    return d.getUTCDay() && d.getUTCDate() != 1;
  } ], [ d3.time.format.utc("%I %p"), function(d) {
    return d.getUTCHours();
  } ], [ d3.time.format.utc("%I:%M"), function(d) {
    return d.getUTCMinutes();
  } ], [ d3.time.format.utc(":%S"), function(d) {
    return d.getUTCSeconds();
  } ], [ d3.time.format.utc(".%L"), function(d) {
    return d.getUTCMilliseconds();
  } ] ];
  var d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);
  function d3_time_scaleUTCSetYear(y) {
    var d = new Date(Date.UTC(y, 0, 1));
    d.setUTCFullYear(y);
    return d;
  }
  function d3_time_scaleUTCGetYear(d) {
    var y = d.getUTCFullYear(), d0 = d3_time_scaleUTCSetYear(y), d1 = d3_time_scaleUTCSetYear(y + 1);
    return y + (d - d0) / (d1 - d0);
  }
  d3_time_scaleUTCMethods.year = function(extent, m) {
    return d3_time_scaleLinear.domain(extent.map(d3_time_scaleUTCGetYear)).ticks(m).map(d3_time_scaleUTCSetYear);
  };
  d3.time.scale.utc = function() {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleUTCMethods, d3_time_scaleUTCFormat);
  };
  return d3;
}();var config = {
	win8: false,
	width: 0,
	height: 0
}
var cd = {
  version: '1.0.4',
  dev: false
};

window.cd = cd;
cd.utils = {};

cd.utils.getparam = function(name) { return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null; }

Date.prototype.getWeek = function () {  
	// Create a copy of this date object  
	var target  = new Date(this.valueOf());  
  
	// ISO week date weeks start on monday  
	// so correct the day number  
	var dayNr   = (this.getDay() + 6) % 7;  
  
	// ISO 8601 states that week 1 is the week  
	// with the first thursday of that year.  
	// Set the target date to the thursday in the target week  
	target.setDate(target.getDate() - dayNr + 3);  
  
	// Store the millisecond value of the target date  
	var firstThursday = target.valueOf();  
  
	// Set the target to the first thursday of the year  
	// First set the target to january first  
	target.setMonth(0, 1);  
	// Not a thursday? Correct the date to the next thursday  
	if (target.getDay() != 4) {  
		target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);  
	}  
  
	// The weeknumber is the number of weeks between the   
	// first thursday of the year and the thursday in the target week  
	return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000  
}

cd.iconsrender = function(c1, c2, c3, border ) { 
	if( !c1 ) c1 = "#c34040";
	if( !c2 ) c2 = "#4296C9";
	if( !c3 ) c3 = "#CFB344";
	if( !border ) border = "#090808";
	return {"g":[{"g":[{"type":"polyline","fill":"none","stroke":border,"stroke-width":4,"points":[[-61,-49],[-61,51],[61,51]]},{"type":"rect","x":"-46.25","y":"-37.705","fill":c2,"stroke":c2,"stroke-width":2,"width":27,"height":"86.595"},{"type":"rect","x":"-11","y":"-51.25","fill":c3,"stroke":c3,"stroke-width":2,"width":27,"height":"100.141"},{"type":"rect","x":"24.25","y":"-2.39","fill":c1,"stroke":c1,"stroke-width":2,"width":27,"height":"51.28"}]},{"g":[{"type":"polyline","fill":"none","stroke":border,"stroke-width":4,"points":[[-61,-49],[-61,51],[61,51]]},{"type":"rect","x":"-43.917","y":"-51.75","fill":c3,"stroke":c3,"stroke-width":2,"width":"35.5","height":"34.889"},{"type":"rect","x":"-43.917","y":"-14.942","fill":c2,"stroke":c2,"stroke-width":2,"width":"35.5","height":"42.582"},{"type":"rect","x":"-43.917","y":"29.392","fill":c1,"stroke":c1,"stroke-width":2,"width":"35.5","height":"19.442"},{"type":"rect","x":"10.083","y":"-51.75","fill":c3,"stroke":c3,"stroke-width":2,"width":"35.5","height":"44.889"},{"type":"rect","x":"10.083","y":"-4.942","fill":c2,"stroke":c2,"stroke-width":2,"width":"35.5","height":"24.582"},{"type":"rect","x":"10.083","y":"21.392","fill":c1,"stroke":c1,"stroke-width":2,"width":"35.5","height":"27.442"}]},{"g":[{"type":"polyline","fill":"none","stroke":border,"stroke-width":4,"points":[[-61,-50],[-61,50],[61,50]]},{"type":"rect","x":"-52.611","y":"-26.72","fill":c3,"stroke":c3,"stroke-width":2,"width":"31.298","height":"52.659"},{"type":"rect","x":"-15.759","y":"-35.555","fill":c2,"stroke":c2,"stroke-width":2,"width":"31.297","height":"70.33"},{"type":"rect","x":"21.092","y":"-19.051","fill":c1,"stroke":c1,"stroke-width":2,"width":"31.298","height":"37.321"}]},{"g":[{"type":"polyline","fill":"none","stroke":border,"stroke-width":4,"points":[[-61,-50],[-61,50],[61,50]]},{"type":"rect","x":"-52.5","y":"28.746","fill":c1,"stroke":c1,"stroke-width":2,"width":"31.298","height":"6.802"},{"type":"rect","x":"-15.649","y":"25.737","fill":c1,"stroke":c1,"stroke-width":2,"width":"31.297","height":"12.818"},{"type":"rect","x":"21.202","y":"29.728","fill":c1,"stroke":c1,"stroke-width":2,"width":"31.298","height":"4.838"},{"type":"rect","x":"-52.611","y":"-9.028","fill":c2,"stroke":c2,"stroke-width":2,"width":"31.298","height":"24.919"},{"type":"rect","x":"-15.759","y":"-5.51","fill":c2,"stroke":c2,"stroke-width":2,"width":"31.297","height":"17.882"},{"type":"rect","x":"21.092","y":"0.463","fill":c2,"stroke":c2,"stroke-width":2,"width":"31.298","height":"5.937"},{"type":"rect","x":"-52.611","y":"-38.146","fill":c3,"stroke":c3,"stroke-width":2,"width":"31.298","height":"14.493"},{"type":"rect","x":"-15.759","y":"-44.555","fill":c3,"stroke":c3,"stroke-width":2,"width":"31.297","height":"27.311"},{"type":"rect","x":"21.092","y":"-42.334","fill":c3,"stroke":c3,"stroke-width":2,"width":"31.298","height":"22.87"}]},{"g":[{"type":"polyline","fill":"none","stroke":border,"stroke-width":4,"points":[[-61,-49],[-61,51],[61,51]]},{"type":"rect","x":"-46.944","y":"-51.75","fill":c3,"stroke":c3,"stroke-width":2,"width":"95.333","height":"24.889"},{"type":"rect","x":"-46.944","y":"-24.942","fill":c2,"stroke":c2,"stroke-width":2,"width":"95.333","height":"36.582"},{"type":"rect","x":"-46.944","y":"13.392","fill":c1,"stroke":c1,"stroke-width":2,"width":"95.333","height":"35.442"}]},{"g":[{"type":"polyline","fill":"none","stroke":border,"stroke-width":4,"points":[[-61,-50],[-61,50],[61,50]]},{"type":"polyline","fill":"none","stroke":c1,"stroke-width":5,"points":[[56,-32],[31,-19],[-2,-7],[-34,-25],[-57,-5]]},{"type":"polyline","fill":"none","stroke":c2,"stroke-width":5,"points":[[-57,24],[-34,-5],[-2,13],[31,-48],[56,-16]]},{"type":"polyline","fill":"none","stroke":c3,"stroke-width":5,"points":[[-57,44],[-34,40],[-2,18],[31,35],[56,-5]]}]},{"g":[{"type":"polygon","fill":c1,"stroke":c1,"stroke-width":2,"points":[[27,-43],[48,-27],[48,-39],[27,-53],[-1,-23],[-27,-40],[-46,-20],[-46,12],[-27,-17],[-1,1]]},{"type":"polygon","fill":c2,"stroke":c2,"stroke-width":2,"points":[[-46,15],[-27,-14],[0,4],[28,-40],[48,-25],[48,-3],[28,-7],[0,26],[-27,18],[-46,32]]},{"type":"polygon","fill":c3,"stroke":c3,"stroke-width":2,"points":[[-46,34],[-27,20],[0,28],[28,-5],[48,-1],[48,50],[-46,50]]},{"type":"polyline","fill":"none","stroke":border,"stroke-width":4,"points":[[-61,-47],[-61,53],[61,53]]}]},{"g":[{"type":"polygon","fill":c1,"stroke":c1,"stroke-width":2,"points":[[27,-16],[48,-11],[48,-28],[27,-31],[-1,-26],[-27,-38],[-46,-25],[-46,-7],[-27,-21],[-1,-10]]},{"type":"polygon","fill":c2,"stroke":c2,"stroke-width":2,"points":[[-46,-5],[-27,-19],[0,-8],[28,-14],[48,-9],[48,11],[28,16],[0,9],[-27,23],[-46,10]]},{"type":"polygon","fill":c3,"stroke":c3,"stroke-width":2,"points":[[-46,12],[-27,25],[0,11],[28,18],[48,13],[48,24],[28,29],[0,24],[-26,37],[-46,36]]},{"type":"polyline","fill":"none","stroke":border,"stroke-width":4,"points":[[-61,-50],[-61,50],[61,50]]}]},{"g":[{"type":"polygon","fill":c2,"stroke":c2,"stroke-width":2,"points":[[-46,-6],[-27,-20],[0,-9],[28,-15],[48,-10],[48,10],[28,15],[0,8],[-27,22],[-46,9]]},{"type":"polygon","fill":c1,"stroke":c1,"stroke-width":2,"points":[[-46,-40],[-27,-47],[0,-41],[28,-44],[48,-42],[48,-30],[28,-27],[0,-31],[-27,-24],[-46,-31]]},{"type":"polygon","fill":c3,"stroke":c3,"stroke-width":2,"points":[[48,30],[29,23],[3,29],[-25,26],[-46,28],[-46,39],[-25,42],[3,38],[29,46],[48,39]]},{"type":"polyline","fill":"none","stroke":border,"stroke-width":4,"points":[[-61,-50],[-61,50],[61,50]]}]},{"g":[{"type":"polygon","fill":c1,"stroke":c1,"stroke-width":2,"points":[[27,-42],[49,-26],[49,-51],[-48,-51],[-48,-23],[-28,-36],[-1,-15]]},{"type":"polygon","fill":c2,"stroke":c2,"stroke-width":2,"points":[[-48,-23],[-28,-36],[-1,-15],[28,-42],[49,-26],[49,48],[-48,48]]},{"type":"polygon","fill":c3,"stroke":c3,"stroke-width":2,"points":[[-48,31],[-28,17],[-1,25],[28,-3],[49,-4],[49,48],[-48,48]]},{"type":"polyline","fill":"none","stroke":border,"stroke-width":4,"points":[[-61,-49],[-61,51],[61,51]]}]},{"g":[{"type":"path","fill":c1,"stroke":c1,"stroke-width":2,"d":"M28.12,40.944  c-1.808,1.238-3.719,2.371-5.729,3.387c-24.484,12.365-54.355,2.543-66.722-21.941s-2.545-54.355,21.938-66.722  c5.797-2.928,11.894-4.611,17.988-5.151L-5.796,3.497L28.12,40.944z"},{"type":"path","fill":c2,"stroke":c2,"stroke-width":2,"d":"M49.254,6.401L-0.682,0.342  l1.219-50.017c17.939,0.209,35.146,10.16,43.795,27.281c4.667,9.242,6.174,19.25,4.924,28.797L49.254,6.401z"},{"type":"path","fill":c3,"stroke":c3,"stroke-width":2,"d":"M32.457,37.602L2.071,5.229  l46.06,7.014l0.003-0.002c-2.471,9.699-7.849,18.619-15.673,25.361H32.457z"}]},{"g":[{"type":"path","fill":c2,"stroke":c2,"stroke-width":2,"d":"M-15.514,47.181  c18.221,5.99,37.425,0.859,50.258-11.678L21.949,22.069C9.788,34.167-9.877,34.147-22.015,22.011c-1-1-1.908-2.055-2.744-3.148  L-39.355,30.3h-0.003C-33.491,37.935-25.349,43.946-15.514,47.181z"},{"g":[{"type":"path","fill":c3,"stroke":c3,"stroke-width":2,"d":"M-42.692,25.374   l15.048-11.07c-2.796-5.4-3.908-11.443-3.33-17.355l-18.566-0.59l-0.003,0.004c-0.764,10.301,1.74,20.412,6.852,29.018V25.374z"},{"g":[{"g":[{"g":[{"type":"path","fill":c1,"d":"M22.011-22.013C32.989-11.034,34.05,6.101,25.199,18.274l12.904,13.6	c3.928-4.691,7.048-10.191,9.077-16.361c8.567-26.057-5.61-54.125-31.667-62.693c-26.057-8.566-54.125,5.609-62.693,31.666	c-0.704,2.139-1.254,4.291-1.657,6.445l18.79,0.93c1.368-5.082,4.044-9.885,8.034-13.873	C-9.857-34.171,9.853-34.171,22.011-22.013z"},{"type":"path","fill":"none","stroke":c1,"stroke-width":2,"d":"M22.011-22.013	C32.989-11.034,34.05,6.101,25.199,18.274l12.904,13.6c3.928-4.691,7.048-10.191,9.077-16.361	c8.567-26.057-5.61-54.125-31.667-62.693c-26.057-8.566-54.125,5.609-62.693,31.666c-0.704,2.139-1.254,4.291-1.657,6.445	l18.79,0.93c1.368-5.082,4.044-9.885,8.034-13.873C-9.857-34.171,9.853-34.171,22.011-22.013z"}]}]}]}]}]},{"g":[{"type":"polyline","fill":c3,"stroke":c3,"stroke-width":2,"points":[[6,16],[6,48],[-50,48],[-50,16]]},{"type":"polyline","fill":c1,"stroke":c1,"stroke-width":2,"points":[[7,15],[-50,15],[-50,-48],[6,-48]]},{"type":"polyline","fill":c2,"stroke":c2,"stroke-width":2,"points":[[7,48],[50,48],[50,-48],[6,-48],[6,14]]}]}]}
};
cd.iconsstyle = [['Bar','normal'],['Bar','stack'],['Bar','stream'],['Bar','extend'],['Bar','expand'],
	['Area','normal'],['Area','stack'],['Area','stream'],['Area','extend'],['Area','expand'],
	['Pie','normal'],['Donut','normal'],['Treemap', 'normal']];
	
cd.timedef = [
	{
		name: 'minute',
		active: false,
		semantic: 1000*60*60*24*2, // 2 days
		limit: 1000*60*60*1,
		format: function(d) { return (parseInt(d3.time.format('%H')(d),10) +'h'+ d3.format("02d")(parseInt(d3.time.format('%M')(d),10))); },
		interval: 1000*60,
		add: function(d, num) { return new Date(d.getTime()+1000*60*(num != null?num:1)); },
		get: function(d) { return d.getMinutes(); },
	},
	{
		name: '30 minutes',
		active: false,
		semantic: 1000*3600*24*7,
		limit: 1000*3600*6,
		format: function(d) { return (parseInt(d3.time.format('%H')(d),10) +'h'+ d3.format("02d")(parseInt(d3.time.format('%M')(d),10) > 30 ? 30 : 0, '' )); },
		interval: 1000*3600/2,
		add: function(d, num) { return new Date(d.getTime()+1000*3600/2*(num != null?num:1)); },
		get: function(d) { return d.getMinutes() > 30 ? 30 : 0; },
	},
	{
		name: 'hour',
		active: false,
		semantic: 1000*3600*24*7*2,
		limit: 1000*3600*24*7*1.9,
		format: function(d) { return (parseInt(d3.time.format('%H')(d),10)) + 'h'; },
		interval: 1000*3600,
		add: function(d, num) { return new Date(d.getTime()+1000*3600); },
		get: function(d) { return d.getHours(); },
	},
	{
		name: 'day',
		active: true,
		semantic: 1000*3600*24*7*3, // 3 semaines
		limit: 1000*3600*24*7*2,
		format: d3.time.format('%b %e'),
		interval: 1000*3600*24*2,
		add: function(d, num) { return new Date(d.getTime()+1000*3600*24*(num != null?num:1)); },//; },
		get: function(d) { return d.getDay(); },
	},
	{
		name: 'week',
		active: false,
		semantic: 1000*3600*24*31*.8, // 2.1 months
		limit: 1000*3600*24*31*.7,
		format: function(d) { return (parseInt(d3.time.format('%W')(d),10)+1) + ' Week'; },
		interval: 1000*3600*24*7,
		add: function(d, num) { return new Date(d.setDate(d.getDate()+(num != null?num:1)*7)); },
		get: function(d) { return d.getWeek(); },
	},
	{
		name: 'month',
		active: true,
		semantic: 1000*3600*24*31*2, // 4 months
		limit: 1000*3600*24*31*1.9,
		format: d3.time.format('%b'),
		interval: 1000*3600*24*31,
		add: function(d, num) { 
            d = new Date(d);
            d.setMonth(d.getMonth()+(num != null?num:1));
            //d.setDate(1);
            return d;
    	},
		get: function(d) { return d.getMonth(); },
	},
	{
		name: 'trimester',
		active: false,
		semantic: 1000*3600*24*31*9, // 9 months
		limit: 1000*3600*24*31*8.9,
		format: function(d) { return (Math.floor(parseInt(d3.time.format('%m')(d))/3,10)+1) + ' Trim.'; },
		interval: 1000*3600*24*31*4,
		add: function(d, num) {
            d = new Date(d);
            d.setMonth(d.getMonth()+(num != null?num:1)*3);
            //d.setDate(1);
            return d;
    	},
		get: function(d) { return Math.floor(d.getMonth()/4); },
	},
	{
		name: 'year',
		active: true,
		semantic: 1000*3600*24*31*17, // 14 months
		limit: 1000*3600*24*31*13.9,
		format: d3.time.format('%Y'),
		interval: 1000*3600*24*366,
		add: function(d, num) {
            d = new Date(d);
            d.setFullYear(d.getFullYear()+(num != null?num:1));
            //d.setMonth(0);
            //d.setDate(1);
            return d;
    	},
		get: function(d) { return d.getFullYear(); },
	},
    {
		name: '5 years',
		active: true,
		semantic: 1000*3600*24*31*12*5, // 5 years
		limit: 1000*3600*24*31*12*4.9,
		format: d3.time.format('%Y'),
		interval: 1000*3600*24*366*5,
		add: function(d, num) {
            d = new Date(d);
            d.setFullYear(d.getFullYear()+(num != null?num:1)*5);
            //d.setMonth(0);
            //d.setDate(1);
            return d;
    	},
		get: function(d) { return d.getFullYear(); },
	},
]

cd.utils.windowSize = function() {
	// Sane defaults
	var size = {width: 1024, height: 720};

	// Earlier IE uses Doc.body
	if (document.body && document.body.offsetWidth) {
		size.width = document.body.offsetWidth;
		size.height = document.body.offsetHeight;
	}

	// IE can use depending on mode it is in
	if (document.compatMode=='CSS1Compat' &&
		document.documentElement &&
		document.documentElement.offsetWidth ) {
		size.width = document.documentElement.offsetWidth;
		size.height = document.documentElement.offsetHeight;
	}

	// Most recent browsers use
	if ( window.innerWidth && window.innerHeight) {
		size.width = window.innerWidth;
		size.height = window.innerHeight;
	}

	//if( window.getuterHeight() && size.)
	
	return (size);
};

cd.utils.windowResize = function(resize, erase){
  var oldresize = erase ? null : window.onresize;

  window.onresize = function(e) {
	if (typeof oldresize == 'function') oldresize(e);
	resize(e);
  }
}


cd.utils.toStaticHTMLWin8 = function(html) {
	if( config.win8 ) return toStaticHTML(html);
	else return html;
}

cd.utils.getpicto = function(type, color) {
	type = type.toLowerCase();

	var idclass = '.picto_' + type + '_' + color.replace('#', '') ;

	var gEnter = d3.selectAll(idclass).selectAll('.picto').data([0]).enter()
		.append('svg').attr('class', 'picto').style('width', 20).style('height', 20).append('g');

	gEnter.append('path').attr('class', 'primary');
	var path = d3.selectAll(idclass + ' .picto g path.primary');

	switch(type) {
		case 'bar':
			path.attr('fill', color);
			path.attr('d', 'M0.02,20h6.001V5.043H0.02V20z M7.02,20h6.006v-9.011H7.02V20z	 M14.035,0v20h5.985V0H14.035z');
		break;
		case 'line':
			path.attr('fill', color);
			path.attr('d', 'M18.021,7.474c-0.06,0-0.116-0.012-0.174-0.018 l-1.474,3.612c0.381,0.36,0.621,0.866,0.621,1.432c0,1.09-0.884,1.974-1.974,1.974c-0.528,0-1.004-0.21-1.358-0.547l-2.688,1.364 c0.008,0.069,0.021,0.137,0.021,0.209c0,1.09-0.884,1.974-1.974,1.974S7.046,16.59,7.046,15.5c0-0.673,0.338-1.266,0.852-1.622 L5.932,6.465C5.836,6.46,5.741,6.454,5.649,6.437l-2.153,3.765C3.802,10.549,3.994,11,3.994,11.5c0,1.09-0.884,1.974-1.974,1.974 S0.046,12.59,0.046,11.5c0-1.091,0.884-1.975,1.974-1.975c0.129,0,0.254,0.015,0.376,0.038l2.151-3.761 C4.239,5.455,4.046,5.002,4.046,4.5c0-1.09,0.884-1.974,1.974-1.974S7.994,3.41,7.994,4.5c0,0.655-0.323,1.232-0.814,1.591 l1.975,7.449c0.501,0.034,0.949,0.256,1.279,0.592l2.642-1.34c-0.014-0.096-0.029-0.191-0.029-0.291 c0-1.091,0.884-1.975,1.975-1.975c0.06,0,0.116,0.013,0.175,0.018l1.473-3.611c-0.381-0.36-0.622-0.867-0.622-1.432 c0-1.09,0.884-1.974,1.975-1.974c1.09,0,1.974,0.884,1.974,1.974S19.11,7.474,18.021,7.474z');
		break;
		case 'scatter':
			path.attr('fill', color);
			path.attr('d', 'M1.52,10.728c-0.831,0-1.504,0.674-1.504,1.504 c0,0.831,0.673,1.504,1.504,1.504s1.504-0.673,1.504-1.504C3.024,11.401,2.351,10.728,1.52,10.728z M7.024,10.224 c0-0.831-0.674-1.504-1.504-1.504s-1.504,0.674-1.504,1.504c0,0.83,0.673,1.504,1.504,1.504S7.024,11.054,7.024,10.224z M7.52,13.72c-0.831,0-1.504,0.673-1.504,1.504c0,0.83,0.673,1.504,1.504,1.504s1.504-0.674,1.504-1.504 C9.024,14.393,8.351,13.72,7.52,13.72z M18.52,3.719c-0.83,0-1.504,0.674-1.504,1.504s0.674,1.504,1.504,1.504 c0.831,0,1.504-0.673,1.504-1.504S19.351,3.719,18.52,3.719z M11.52,13.72c-0.83,0-1.504,0.673-1.504,1.504 c0,0.83,0.674,1.504,1.504,1.504c0.831,0,1.504-0.674,1.504-1.504C13.024,14.393,12.351,13.72,11.52,13.72z M1.52,4.719 c-0.831,0-1.504,0.674-1.504,1.504S0.689,7.728,1.52,7.728s1.504-0.673,1.504-1.504S2.351,4.719,1.52,4.719z M14.52,5.719 c-0.83,0-1.504,0.674-1.504,1.504s0.674,1.504,1.504,1.504c0.831,0,1.504-0.673,1.504-1.504S15.351,5.719,14.52,5.719z M13.52,9.719c-0.83,0-1.504,0.674-1.504,1.504c0,0.83,0.674,1.504,1.504,1.504c0.831,0,1.504-0.674,1.504-1.504 C15.024,10.393,14.351,9.719,13.52,9.719z M10.52,8.728c0.831,0,1.504-0.673,1.504-1.504s-0.673-1.504-1.504-1.504 c-0.831,0-1.504,0.674-1.504,1.504S9.689,8.728,10.52,8.728z M17.52,8.719c-0.83,0-1.504,0.674-1.504,1.504 c0,0.83,0.674,1.504,1.504,1.504c0.831,0,1.504-0.674,1.504-1.504C19.024,9.393,18.351,8.719,17.52,8.719z M11.024,11.224 c0-0.831-0.673-1.504-1.504-1.504s-1.504,0.674-1.504,1.504c0,0.83,0.673,1.504,1.504,1.504S11.024,12.054,11.024,11.224z');
		break;
		case 'stackedbar':
			path.attr('fill', color);
			path.attr('d', 'M20.02,8.985v0.998h-1V8.985h-1v0.998h-1V8.985h-1v0.998  h-1V8.985h-0.985V0.017h5.985V8.985L20.02,8.985z M16.02,11.983h-1v-1h1V11.983z M16.02,13.983h-1v-1h1V13.983z M16.02,15.983h-1v-1  h1V15.983z M16.02,17.983h-1v-1h1V17.983z M17.02,17.983v1h-1v-1H17.02z M19.02,17.983v1h-1v-1H19.02z M18.02,15.983h1v1h-1V15.983z   M18.02,13.983h1v1h-1V13.983z M18.02,11.983h1v1h-1V11.983z M18.02,9.983h1v1h-1V9.983z M16.02,10.983v-1h1v1H16.02z M17.02,12.983  h-1v-1h1V12.983z M17.02,14.983h-1v-1h1V14.983z M17.02,16.983h-1v-1h1V16.983z M18.02,16.983v1h-1v-1H18.02z M17.02,14.983h1v1h-1  V14.983z M17.02,12.983h1v1h-1V12.983z M17.02,10.983h1v1h-1V10.983z M20.02,10.983v1h-1v-1H20.02z M20.02,12.983v1h-1v-1H20.02z   M20.02,14.983v1h-1v-1H20.02z M20.02,16.983v1h-1v-1H20.02z M20.02,19.983h-1v-1h1V19.983z M18.02,19.983h-1v-1h1V19.983z   M16.02,19.983h-1v-1h1V19.983z M14.02,18.983v-1h1v1H14.02z M14.02,16.983v-1h1v1H14.02z M14.02,14.983v-1h1v1H14.02z   M14.02,12.983v-1h1v1H14.02z M14.02,10.983v-1h1v1H14.02z M13.02,17.983h-1v-0.967h-1v0.967h-1v-0.967h-1v0.967h-1v-0.967h-1  v-6.011h6.006v6.011H13.02V17.983z M10.02,17.983v1h-1v-1H10.02z M12.02,17.983v1h-1v-1H12.02z M13.02,19.983h-1v-1h1V19.983z   M11.02,19.983h-1v-1h1V19.983z M9.02,19.983h-1v-1h1V19.983z M7.02,18.983v-1h1v1H7.02z M6.02,13.983h-1v-0.967h-1v0.967h-1v-0.967  h-1v0.967h-1v-0.967h-1V5.06h6.001v7.957H6.02V13.983z M2.02,15.983h-1v-1h1V15.983z M2.02,17.983h-1v-1h1V17.983z M3.02,17.983v1  h-1v-1H3.02z M5.02,17.983v1h-1v-1H5.02z M4.02,15.983h1v1h-1V15.983z M4.02,13.983h1v1h-1V13.983z M2.02,14.983v-1h1v1H2.02z   M3.02,16.983h-1v-1h1V16.983z M4.02,16.983v1h-1v-1H4.02z M3.02,14.983h1v1h-1V14.983z M6.02,14.983v1h-1v-1H6.02z M6.02,16.983v1  h-1v-1H6.02z M6.02,19.983h-1v-1h1V19.983z M4.02,19.983h-1v-1h1V19.983z M2.02,19.983h-1v-1h1V19.983z M0.02,18.983v-1h1v1H0.02z   M0.02,16.983v-1h1v1H0.02z M0.02,14.983v-1h1v1H0.02z');
		break;
		case 'hbar':
			path.attr('fill', color);
			path.attr('d', 'M14.977,0H0.02v6.001h14.957V0z M9.031,7H0.02v6.006h9.011V7z	 M0.02,14.015V20h20v-5.985H0.02z');
		break;
		case 'pie':
			path.attr('fill', color);
			path.attr('d', 'M9.064,1.917c-4.996,0-9.046,4.05-9.046,9.046	c0,4.996,4.05,9.046,9.046,9.046c4.996,0,9.046-4.05,9.046-9.046c-2.872,0-9.101,0.023-9.101,0.023S9.064,4.352,9.064,1.917z	 M11.042-0.01c0,5.678-0.023,8.927-0.023,8.927s6.588,0.054,9.004,0.054C20.022,4.011,16.002-0.01,11.042-0.01z');
		break;
		case 'area':
		case 'arealine':
		case 'polygon':
			path.attr('stroke', color);
			path.attr('fill', 'none');
			path.attr('d', 'M8.18,19.186h8.472   l2.538-5.543L8.167,7.242L8.18,19.186z M0.851,9.979   c0,0,3.374,9.337,3.352,9.22C4.18,19.081,16.426,6.296,16.426,6.296v-5.49L4.213,0.801L0.851,9.979z');
			gEnter.append('path').attr('class', 'secondary');
			d3.selectAll(idclass + ' .picto g path.secondary').attr('fill', color).attr('d', "M8.167,7.242L12.885,10L8.167,14.952z");
		break;
		case 'circle':
			path.attr('stroke', color);
			path.attr('fill', 'none');
			path.attr('d', 'M8.645,3.712   c4.395,0,7.958,3.497,7.958,7.811c0,4.314-3.562,7.811-7.958,7.811s-7.958-3.497-7.958-7.811C0.687,7.209,4.25,3.712,8.645,3.712z M14.244,0.667   c2.822,0,5.11,2.288,5.11,5.11c0,2.821-2.288,5.109-5.11,5.109c-2.821,0-5.109-2.288-5.109-5.109   C9.135,2.955,11.422,0.667,14.244,0.667z M9.548,3.761   c3.577,0.397,6.437,3.122,6.967,6.594l0,0.001c-0.685,0.34-1.456,0.53-2.271,0.53c-2.821,0-5.109-2.288-5.109-5.109   C9.135,5.061,9.282,4.379,9.548,3.761L9.548,3.761z');
			gEnter.append('path').attr('class', 'secondary');
			d3.selectAll(idclass + ' .picto g path.secondary').attr('fill', color).attr('d', "M9.548,3.761 c3.577,0.397,6.437,3.122,6.967,6.594l0,0.001c-0.685,0.34-1.456,0.53-2.271,0.53c-2.821,0-5.109-2.288-5.109-5.109 C9.135,5.061,9.282,4.379,9.548,3.761L9.548,3.761z");
		break;
	}
	return true;
}

/*Array.prototype.unique = function() {
  var i,
	  len=this.length,
	  out=[],
	  obj={};

  for (i=0;i<len;i++) {
	obj[this[i]]=0;
  }
  for (i in obj) {
	out.push(i);
  }
  return out;
}*/

function capitalize(string) { return string[0].toUpperCase() + string.slice(1); }

function toggle(id) {
	var elt = document.getElementById(id);
	if ( elt.className == "hidden") elt.className = "visible";
	else elt.className = "hidden";
}

function clone(srcInstance)
{
	/*Si l'instance source n'est pas un objet ou qu'elle ne vaut rien c'est une feuille donc on la retourne*/
	if(typeof(srcInstance) != 'object' || srcInstance == null)
	{
		return srcInstance;
	}
	/*On appel le constructeur de l'instance source pour crée une nouvelle instance de la même classe*/
	var newInstance = srcInstance.constructor();
	/*On parcourt les propriétés de l'objet et on les recopies dans la nouvelle instance*/
	for(var i in srcInstance)
	{
		newInstance[i] = clone(srcInstance[i]);
	}
	/*On retourne la nouvelle instance*/
	return newInstance;
}cd.utils.zoom = function() {
  var translate = [0, 0],
      translate0, // translate when we started zooming (to avoid drift)
      scale = 1,
      scale0, // scale when we started touching
      scaleExtent = d3_behavior_zoomInfinity,
      event = d3_eventDispatch(zoom, "zoom"),
      x0,
      x1,
      y0,
      y1,
      touchtime; // time of last touchstart (to detect double-tap)

  function zoom() {
    this
        .on("mousedown.zoom", mousedown)
        .on("mousewheel.zoom", mousewheel)
        .on("mousemove.zoom", mousemove)
        .on("DOMMouseScroll.zoom", mousewheel)
        .on("dblclick.zoom", dblclick)
        .on("touchstart.zoom", touchstart)
        .on("touchmove.zoom", touchmove)
        .on("touchend.zoom", touchstart);
  }

  zoom.translate = function(x) {
    if (!arguments.length) return translate;
    translate = x.map(Number);
    return zoom;
  };

  zoom.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return zoom;
  };

  zoom.scaleExtent = function(x) {
    if (!arguments.length) return scaleExtent;
    scaleExtent = x == null ? d3_behavior_zoomInfinity : x.map(Number);
    return zoom;
  };

  zoom.x = function(z) {
    if (!arguments.length) return x1;
    x1 = z;
    x0 = z.copy();
    return zoom;
  };
  
  zoom.x0 = function(z) {
    if (!arguments.length) return x0;
    x0 = z;
    return zoom;
  };

  zoom.y = function(z) {
    if (!arguments.length) return y1;
    y1 = z;
    y0 = z.copy();
    return zoom;
  };
  
  zoom.xgoto = function(border) {
    if( x0.domain()[0] > border[0] || x0.domain()[1] < border[1] ) {
        scaleExtent = [1,1]
        if( x0.domain()[0] > border[0] ) border[0] = x0.domain()[0];
        if( x0.domain()[1] < border[1] ) border[1] = x0.domain()[1];
    }
    x1.domain([border[0], border[1]]);
    scale = (x0.range()[1] - x0.range()[0]) / (x0(border[1]) - x0(border[0]));
    translate[0] = -x0(border[0])*scale;
    return zoom;
  };
  
  zoom.update = function() {
    if (x1) x1.domain(x0.range().map(function(x) { return (x - translate[0]) / scale; }).map(x0.invert));
    if (y1) y1.domain(y0.range().map(function(y) { return (y - translate[1]) / scale; }).map(y0.invert));
    return zoom;
  };

  function location(p) {
    return [(p[0] - translate[0]) / scale, (p[1] - translate[1]) / scale];
  }

  function point(l) {
    return [l[0] * scale + translate[0], l[1] * scale + translate[1]];
  }

  function scaleTo(s) {
    scale = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
  }

  function translateTo(p, l) {
    l = point(l);
    translate[0] += p[0] - l[0];
    translate[1] += p[1] - l[1];
  }

  function dispatch(event) {
    if (x1) x1.domain(x0.range().map(function(x) { return (x - translate[0]) / scale; }).map(x0.invert));
    if (y1) y1.domain(y0.range().map(function(y) { return (y - translate[1]) / scale; }).map(y0.invert));
    d3.event.preventDefault();
    event({type: "zoom", scale: scale, translate: translate});
  }

  function mousedown() {
    var target = this,
        event_ = event.of(target, arguments),
        eventTarget = d3.event.target,
        moved = 0,
        w = d3.select(window).on("mousemove.zoom", mousemove).on("mouseup.zoom", mouseup),
        l = location(d3.mouse(target));

    window.focus();
    d3_eventCancel();

    function mousemove() {
      moved = 1;
      translateTo(d3.mouse(target), l);
      dispatch(event_);
    }

    function mouseup() {
      if (moved) d3_eventCancel();
      w.on("mousemove.zoom", null).on("mouseup.zoom", null);
      if (moved && d3.event.target === eventTarget) w.on("click.zoom", click, true);
    }

    function click() {
      d3_eventCancel();
      w.on("click.zoom", null);
    }
  }

  function mousewheel() {
    if (!translate0) translate0 = location(d3.mouse(this));
    scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * scale);
    translateTo(d3.mouse(this), translate0);
    dispatch(event.of(this, arguments));
  }

  function mousemove() {
    translate0 = null;
  }

  function dblclick() {
    var p = d3.mouse(this), l = location(p);
    scaleTo(d3.event.shiftKey ? scale / 2 : scale * 2);
    translateTo(p, l);
    dispatch(event.of(this, arguments));
  }

  function touchstart() {
    var touches = d3.touches(this);
      
    if (touches.length > 1) {
        scale0 = scale;
        translate0 = {};
        touches.forEach(function(t) { translate0[t.identifier] = location(t); });
        d3_eventCancel();
    }

    /*
    var now = Date.now();
    
    if (touches.length === 1) {
      if (now - touchtime < 500) { // dbltap
        var p = touches[0], l = location(touches[0]);
        scaleTo(scale * 2);
        translateTo(p, l);
        dispatch(event.of(this, arguments));
      }
      touchtime = now;
    }*/
  }

  function touchmove() {
    var touches = d3.touches(this);
    
    if (touches.length > 1) {
        var p0 = touches[0],
            l0 = translate0[p0.identifier];
        if (p1 = touches[1]) {
          var p1, l1 = translate0[p1.identifier];
          p0 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
          l0 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
          scaleTo(d3.event.scale * scale0);
        }
        translateTo(p0, l0);
        touchtime = null;
        dispatch(event.of(this, arguments));
    }
  }

  return d3.rebind(zoom, event, "on");
};

var d3_behavior_zoomDiv, // for interpreting mousewheel events
    d3_behavior_zoomInfinity = [0, Infinity]; // default scale extent

// https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/wheel
var d3_behavior_zoomDelta, d3_behavior_zoomWheel
    = "onwheel" in document ? (d3_behavior_zoomDelta = function() { return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1); }, "wheel")
    : "onmousewheel" in document ? (d3_behavior_zoomDelta = function() { return d3.event.wheelDelta; }, "mousewheel")
    : (d3_behavior_zoomDelta = function() { return -d3.event.detail; }, "MozMousePixelScroll");

// -- extract from d3js library

d3.event = null;

function d3_eventCancel() {
  d3.event.stopPropagation();
  d3.event.preventDefault();
}

function d3_eventSource() {
  var e = d3.event, s;
  while (s = e.sourceEvent) e = s;
  return e;
}

function d3_eventDispatch(target) {
  var dispatch = new d3.dispatch,
      i = 0,
      n = arguments.length;

  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);

  // Creates a dispatch context for the specified `thiz` (typically, the target
  // DOM element that received the source event) and `argumentz` (typically, the
  // data `d` and index `i` of the target element). The returned function can be
  // used to dispatch an event to any registered listeners; the function takes a
  // single argument as input, being the event to dispatch. The event must have
  // a "type" attribute which corresponds to a type registered in the
  // constructor. This context will automatically populate the "sourceEvent" and
  // "target" attributes of the event, as well as setting the `d3.event` global
  // for the duration of the notification.
  dispatch.of = function(thiz, argumentz) {
    return function(e1) {
      try {
        var e0 =
        e1.sourceEvent = d3.event;
        e1.target = target;
        d3.event = e1;
        dispatch[e1.type].apply(thiz, argumentz);
      } finally {
        d3.event = e0;
      }
    };
  };

  return dispatch;
}

d3.dispatch = function() {
  var dispatch = new d3_dispatch,
      i = -1,
      n = arguments.length;
  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
  return dispatch;
};

function d3_dispatch() {}

d3_dispatch.prototype.on = function(type, listener) {
  var i = type.indexOf("."),
      name = "";

  // Extract optional namespace, e.g., "click.foo"
  if (i > 0) {
    name = type.substring(i + 1);
    type = type.substring(0, i);
  }

  return arguments.length < 2
      ? this[type].on(name)
      : this[type].on(name, listener);
};

function d3_dispatch_event(dispatch) {
  var listeners = [],
      listenerByName = new d3.map;

  function event() {
    var z = listeners, // defensive reference
        i = -1,
        n = z.length,
        l;
    while (++i < n) if (l = z[i].on) l.apply(this, arguments);
    return dispatch;
  }

  event.on = function(name, listener) {
    var l = listenerByName.get(name),
        i;

    // return the current listener, if any
    if (arguments.length < 2) return l && l.on;

    // remove the old listener, if any (with copy-on-write)
    if (l) {
      l.on = null;
      listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
      listenerByName.remove(name);
    }

    // add the new listener, if any
    if (listener) listeners.push(listenerByName.set(name, {on: listener}));

    return dispatch;
  };

  return event;
}

(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };
})();var Element = Class.extend({
	init: function(width, height) {
		this._id = Math.floor(Math.random() * 10000);
		
		this._margin = {top: 0, right: 0, bottom: 0, left: 0};
		this._width = width;
		this._height = height;
	},
	id: function(_) {
		if (!arguments.length) return this._id;
	    this._id = _;
	    return this;
	},
	margin: function(_) {
		if (!arguments.length) return this._margin;
	    this._margin = _;
	    return this;
	},
	width: function(_) {
		if (!arguments.length) return this._width;
		this._width = _;
		return this;
	},
	height: function(_) {
		if (!arguments.length) return this._height;
		this._height = _;
		return this;
	},
});// ***** CHART ABSTRACT OBJECT
var Chart = Element.extend({
	init: function(type, view) {
		this._initial = true;
        
		this._super(); // handle id, margin, width, height with accessor
		
		// -- Main variables
		this.type(type);
        this.view(view);
		this.getX = function(d) { return d.x }; // accessor to get the x value from a data point
		this.getY = function(d) { return d.y }; // accessor to get the y value from a data point
		var t = this;
		this._defined = function(d,i) { return !isNaN(t.getY(d,i)) && t.getY(d,i) !== null }; // allows a line to be not continous when it is not defined
		this._isArea = function(d) { return d.area }; // decides if a line is an area or just a line
		this._xDomain = null;
		this._yDomain = null;
		this._duration = 500;
        this._num = 0;
		
		// -- scatter if used
		if( this._scatter ) {
			var t = this;
			this.scatter.dispatch.on('elementMouseover.tooltip', function(e) {
				e.pos = [e.pos[0] + t._margin.left, e.pos[1] + t._margin.top];
				t.dispatch.tooltipShow(e);
			});
			this.scatter.dispatch.on('elementMouseout.tooltip', function(e) { t.dispatch.tooltipHide(e); });
		}
		else {
			var t = this;
            if( t.dispatch && typeof t.dispatch.elementMouseover == 'function' ) {
    			t.dispatch.on('elementMouseover.tooltip', function(e) {
    				e.pos = [e.pos[0] + t._margin.left, e.pos[1] + t._margin.top];
    				t.dispatch.tooltipShow(e);
    			});
            }
            if( t.dispatch && typeof t.dispatch.elementMouseout == 'function' ) t.dispatch.on('elementMouseout.tooltip', function(e) { t.dispatch.tooltipHide(e); });
		}

		// -- Graph scale and translation referal
		//this._scaleX = 1;
		//this._translateX = 0;

		// -- Agreg
		this._semantic = false; // deprecated for now
		this.aggreg(false);
		
		// -- Series variables
        this.series = [];
		
		// -- Stacked variables
		if( this._stackable ) this._stacked = []; // data stacked (just the numbers of the serie)
		this._dragging = false;
		
		this._clipEdge = true; // if true, masks lines within x and y scale
	},
	
	// -- Chart
	view: function(_) {
		if (!arguments.length) return this._view;
	    this._view = _;
	    return this;
	},
	dragging: function(_) {
		if (!arguments.length) return this._dragging;
	    this._dragging = _;
	    if( this.view() ) this.view().dragging(!this._dragging);
	    return this;
	},
	initial: function(_) {
		if (!arguments.length) return this._initial;
	    this._initial = _;
	    return this;
	},
	id: function(_) {
		if (!arguments.length) return this._id;
		this._id = _;
		return this;
	},
	type: function(_) {
		if (!arguments.length) return this._type;
		this._type = _;
		return this;
	},
	semantic: function(_) {
		if (!arguments.length) return this._semantic;
	    this._semantic = _;
	    return this;
	},
	aggreg: function(_) {
		if (!arguments.length) return this._aggreg;
		this._aggreg = _;
		return this;
	},
	name: function(_) {
		if (!arguments.length) return this._name;
		this._name = _;
		return this;
	},
	x: function(_) {
		if (!arguments.length) return this.getX;
		this.getX = _;
		return this;
	},
	y: function(_) {
		if (!arguments.length) return this.getY;
		this.getY = _;
		return this;
	},
	clipEdge: function(_) {
		if (!arguments.length) return this._clipEdge;
	    this._clipEdge = _;
	    return this;
	},
	xScale: function(_) {
		if (!arguments.length) return this.sx;
		this.sx = _;
		if( this.scatter ) this.scatter.sx = _;
		return this;
	},
	yScale: function(_) {
		if (!arguments.length) return this.sy;
		this.sy = _;
		if( this.scatter ) this.scatter.sy = _;
		return this;
	},
	xDomain: function(_) {
		if (!arguments.length) return this._xDomain;
		this._xDomain = _;
		//this.sx.domain(_);
		//if( this.scatter ) this.scatter.xDomain(_);
		return this;
	},
	yDomain: function(_) {
		if (!arguments.length) return this._yDomain;
		this._yDomain = _;
		this.sy.domain(_);
		if( this.scatter ) this.scatter.yDomain(_);
		return this;
	},

	getpos: function() {
		if( this._pos ) {
			var domain = this.view()._xDomain, 
				xpos = this.view().sxLinear.invert(this._pos[0]);
			if( xpos < domain[0] ) this._index = 0;
			else if( xpos > domain[domain.length-1] ) this._index = domain.length-1;
			else for( var i=1; i<domain.length; i++ ) if( xpos >= domain[i-1] && xpos < domain[i]) this._index = i-1;
		}
	},

	begindisplay: function( selection, mode ) { return this; },
	display: function( selection, mode ) { return this; },
	enddisplay: function( selection, mode ) {
		this._initial = false;
		return this;
	},

	set: function( selection ) { selection.datum(this.series); },
	
	// -- Series
	addserie: function(serie) { this.series[this.series.length] = serie; return this; },
	removeserie: function(serie) { if( (sindex = this.series.indexOf(serie)) != -1 ) this.series.splice(sindex, 1); },
	getseries: function() { return this.series; },

	stackserie: function() {
		var a = arguments;
		
		// check if not already stacked
		for( var key in a ) {
			var num = a[key];
			for( var key in this.stacked ) for( var key2 in this.stacked[key] ) if( num == this.stacked[key][key2] ) return false;
		}
		
		// ok, so let's go
		this.stacked[this.stacked.length] = a;
		
		// and redraw ?
		
	},
	unstackserie: function() {
		var a = arguments;
		
		// remove all series of the num number
		for( var key in a ) {
			var num = a[key];
			for( var i; i<this.stacked.length; i++ ) {
				for( var j; j<this.stacked.length; j++ ) {
					if( num == this.stacked[i][j] ) {
						this.stacked[i].splice(j, 1);
						j--;
					}
				}
			}
		}
	},
	
	// -- Metrics
	removemetric: function(metric) { 
		for( var i=0; i<this.series.length; i++ ) {
			if( this.series[i].metric == metric ) {
				this.series.splice(i, 1);
				i--;
			}
		}
	},
});var Grid = Element.extend({
    init: function(array, width, height) {
        if( !array.length || !array[0].length ) throw 'Unable to create Grid';

		this._super(width, height);

        this._array = array;
        this._views = [];
        for( var i=0; i<this._array.length; i++ ) {
            if( !this._views[i] ) this._views[i] = [];
            for( var j=0; j<this._array[i].length; j++ ) {
                this._views[i][j] = this._array[i][j][2] ? this._array[i][j][2] : new View();
            }
        }

		this._margin = {top: 0, right: 0, bottom: 0, left: 0};
        this._initial = true;
	},
	array: function(_) {
		if (!arguments.length) return this._array;
	    this._array = _;
	    return this;
	},
    initdisplay: function(selection, mode) {
    	var t = this;

		if( !selection ) selection = this.selection;
        else this.selection = selection;
        
		selection.each(function(data) {
			var container = d3.select(this);
			
			// -- Wrap, graphs and all
			container.selectAll('g.wrap.grid').remove();
            var wrap = container.selectAll('g.grid').data([0]);
            var gEnter = wrap.enter().append('g').attr('class', 'wrap cdd3 grid');
            
            for( var i=0; i<t._array.length; i++ ) {
                for( var j=0; j<t._array[i].length; j++ ) {
                    var view = container.selectAll('.view-'+i+'-'+j).data([0]);
			        var view = gEnter.append('g').attr('class', 'view-'+i+'-'+j);
                }
            }
		});
    },
	display: function(selection, mode) {
		var t = this;

		if( selection ) t.selection = selection;
		else selection = t.selection;
		
		if( !selection ) return t;

        if( t._initial ) t.initdisplay(selection, mode);

		selection.each(function(data) {
			var availableWidth = (t._width || parseInt(d3.select(this).style('width'))) - t._margin.left - t._margin.right,
				availableHeight = (t._height || parseInt(d3.select(this).style('height'))) - t._margin.top - t._margin.bottom;

			var container = d3.select(this),
			that = this;
            
            var wrap = container.selectAll('g.grid');
            wrap.attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')');
            
            var left = 0, top = 0;
            for( var i=0; i<t._array.length; i++ ) {
                for( var j=0; j<t._array[i].length; j++ ) {
                    // split the width
                    var width = availableWidth*t._array[i][j][0];
                    var height = availableHeight*t._array[i][j][1];
                    var view = container.selectAll('.view-'+i+'-'+j)
                    
                    t._views[i][j].width(width);
                    t._views[i][j].height(height);
                    view.attr('transform', 'translate(' + left + ',' + top + ')')
                    t._views[i][j].display(view);
                    left += width; // at the end
                }
                top  += height;
                left = 0;
            }
		});
        
        t._initial = false;
	},
    add: function(i, j, chart) {
        this._view[i][j].addserie(chart);
        return this;
    },
    views: function(i, j, view) {
        if( !view ) return this._views[i][j];
        this._views[i][j] = view;
        return this;
    },
    applyviews: function(fn) {
        for( var i in this.views  ) for( var j in this.views ) fn.apply(t.views[i][j]);
        return this;
    },
});
var Axis = Element.extend({
	init: function(scale) {
		this._super(); // handle id, margin, width, height with accessor
		
		this._margin = {top: 0, right: 0, bottom: 0, left: 0};
		
		this._axisLabelText = null;
		this._width = 60
		this._height = 60;
		this._showMaxMin = false;
		this._showUnit = false;
        this._unit = '';
		this._rotateYLabel = true;
		this._highlightZero = true;
		this._align = 'begin';
		
		this._scale = scale ? scale : d3.scale.linear();
		this.axis = d3.svg.axis()
			.scale(this.scale)
			.orient('bottom')
			.tickFormat(function(d) { return d });
			
		d3.rebind(this, this.axis, 'orient', 'ticks', 'tickValues', 'tickSubdivide', 'tickSize', 'tickPadding', 'tickFormat');
		d3.rebind(this, this._scale, 'domain', 'range', 'rangeBand', 'rangeBands');
	},
	
	display: function(selection) {
		var t = this;

		selection.each(function(data) {
			var container = d3.select(this);

			var wrap = container.selectAll('g.wrap.axis').data([0]);
			var wrapEnter = wrap.enter().append('g').attr('class', 'wrap axis');
			var gEnter = wrapEnter.append('g');
			var g = wrap.select('g');

			////if (t.axis.orient() == 'top' || t.axis.orient() == 'bottom') t.axis.ticks(Math.abs(t._scale.range()[1] - t._scale.range()[0]) / 100);

			d3.transition(g).call(t.axis);

			var scale0 = scale0 || t.axis.scale();

			/*var axisLabel = g.selectAll('text.axislabel')
			    .data([t._axisLabelText || null]);
			
			axisLabel.exit().remove();*/
			
			/*switch (t.axis.orient()) {
			  case 'top':
			    axisLabel.enter().append('text').attr('class', 'axislabel')
			        .attr('text-anchor', 'middle')
			        .attr('y', 0);
			    var w = (t._scale.range().length==2) ? t._scale.range()[1] : (t._scale.range()[t._scale.range().length-1]+(t._scale.range()[1]-t._scale.range()[0]));
			    axisLabel
			        .attr('x', w/2);
			    if (t._showMaxMin) {
			      var axisMaxMin = wrap.selectAll('g.axisMaxMin')
			                     .data(t._scale.domain());
			      axisMaxMin.enter().append('g').attr('class', 'axisMaxMin').append('text');
			      axisMaxMin.exit().remove();
			      axisMaxMin
			          .attr('transform', function(d,i) {
			            return 'translate(' + t._scale(d) + ',0)'
			          })
			        .select('text')
			          .attr('dy', '0em')
			          .attr('y', -t.axis.tickPadding())
			          .attr('text-anchor', 'middle')
			          .text(function(d,i) {
			            return ('' + t.axis.tickFormat()(d)).match('NaN') ? '' : t.axis.tickFormat()(d)
			          });
			      d3.transition(axisMaxMin)
			          .attr('transform', function(d,i) {
			            return 'translate(' + t._scale.range()[i] + ',0)'
			          });
			    }
			    break;
			  case 'bottom':
			    axisLabel.enter().append('text').attr('class', 'axislabel')
			        .attr('text-anchor', 'middle')
			        .attr('y', 30);
			    var w = (t._scale.range().length==2) ? t._scale.range()[1] : (t._scale.range()[t._scale.range().length-1]+(t._scale.range()[1]-t._scale.range()[0]));
			    axisLabel
			        .attr('x', w/2);
			    if (t._showMaxMin) {
			      var axisMaxMin = wrap.selectAll('g.axisMaxMin')
			                     .data(t._scale.domain());
			      axisMaxMin.enter().append('g').attr('class', 'axisMaxMin').append('text');
			      axisMaxMin.exit().remove();
			      axisMaxMin
			          .attr('transform', function(d,i) {
			            return 'translate(' + t._scale(d) + ',0)'
			          })
			        .select('text')
			          .attr('dy', '.71em')
			          .attr('y', t.axis.tickPadding())
			          .attr('text-anchor', 'middle')
			          .text(function(d,i) {
			            return ('' + t.axis.tickFormat()(d)).match('NaN') ? '' : t.axis.tickFormat()(d)
			          });
			      d3.transition(axisMaxMin)
			          .attr('transform', function(d,i) {
			            return 'translate(' + t._scale.range()[i] + ',0)'
			          });
			    }
			    break;
			  case 'right':
			    axisLabel.enter().append('text').attr('class', 'axislabel')
			        .attr('text-anchor', t._rotateYLabel ? 'middle' : 'begin')
			        .attr('transform', t._rotateYLabel ? 'rotate(90)' : '')
			        .attr('y', t._rotateYLabel ? (-Math.max(t._margin.right,t._width) - 12) : -10); //TODO: consider calculating this based on largest tick width... OR at least expose this on chart
			    axisLabel
			        .attr('x', t._rotateYLabel ? (t._scale.range()[0] / 2) : t.axis.tickPadding());
			    if (t._showMaxMin) {
			      var axisMaxMin = wrap.selectAll('g.axisMaxMin')
			                     .data(t._scale.domain());
			      axisMaxMin.enter().append('g').attr('class', 'axisMaxMin').append('text')
			          .style('opacity', 0);
			      axisMaxMin.exit().remove();
			      axisMaxMin
			          .attr('transform', function(d,i) {
			            return 'translate(0,' + t._scale(d) + ')'
			          })
			        .select('text')
			          .attr('dy', '.32em')
			          .attr('y', 0)
			          .attr('x', t.axis.tickPadding())
			          .attr('text-anchor', 'start')
			          .text(function(d,i) {
			            return ('' + t.axis.tickFormat()(d)).match('NaN') ? '' : t.axis.tickFormat()(d)
			          });
			      d3.transition(axisMaxMin)
			          .attr('transform', function(d,i) {
			            return 'translate(0,' + t._scale.range()[i] + ')'
			          })
			        .select('text')
			          .style('opacity', 1);
			    }
			    break;
			  case 'left':
			    axisLabel.enter().append('text').attr('class', 'axislabel')
			        .attr('text-anchor', t._rotateYLabel ? 'middle' : 'end')
			        .attr('transform', t._rotateYLabel ? 'rotate(-90)' : '')
			        .attr('y', t._rotateYLabel ? (-Math.max(t._margin.left,t._width) + 12) : -10); //TODO: consider calculating this based on largest tick width... OR at least expose this on chart
			    axisLabel
			        .attr('x', t._rotateYLabel ? (-t._scale.range()[0] / 2) : -t.axis.tickPadding());
			    if(t._showUnit) {
    		           axisUnit = wrap.selectAll('g.unit').data([t._unit]);
                       var gUnit = axisUnit.enter().append('g').attr('class', 'unit').append('text');
                       axisUnit.exit().remove();
                       gUnit
        		          .attr('transform', function(d,i) {
    			            return 'translate(0,-20)'
    			          })
                          .attr('dy', '.32em')
        		          .attr('y', 0)
    			          .attr('x', -t.axis.tickPadding())
    			          .attr('text-anchor', 'end')
    			          .style('font-weight', 'bold')
                          .text(function(d,i) { return ''+d; });
			    }
                if (t._showMaxMin) {
			      var axisMaxMin = wrap.selectAll('g.axisMaxMin')
			                     .data(t._scale.domain());
			      axisMaxMin.enter().append('g').attr('class', 'axisMaxMin').append('text')
			          .style('opacity', 0);
			      axisMaxMin.exit().remove();
			      axisMaxMin
			          .attr('transform', function(d,i) {
			            return 'translate(0,' + scale0(d) + ')'
			          })
			        .select('text')
			          .attr('dy', '.32em')
			          .attr('y', 0)
			          .attr('x', -t.axis.tickPadding())
			          .attr('text-anchor', 'end')
			          .text(function(d,i) {
			            return ('' + t.axis.tickFormat()(d)).match('NaN') ? '' : t.axis.tickFormat()(d)
			          });
			      d3.transition(axisMaxMin)
			          .attr('transform', function(d,i) {
			            return 'translate(0,' + t._scale.range()[i] + ')'
			          })
			        .select('text')
			          .style('opacity', 1);
			    }
			    break;
			}
			axisLabel
			    .text(function(d) { return d });


			//check if max and min overlap other values, if so, hide the values that overlap
			if (t._showMaxMin && (t.axis.orient() === 'left' || t.axis.orient() === 'right')) {
			  g.selectAll('g') // the g's wrapping each tick
			      .each(function(d,i) {
			        if (t._scale(d) < t._scale.range()[1] + 10 || t._scale(d) > t._scale.range()[0] - 10) { // 10 is assuming text height is 16... if d is 0, leave it!
			          if (d > 1e-10 || d < -1e-10) // accounts for minor floating point errors... though could be problematic if the scale is EXTREMELY SMALL
			            d3.select(this).remove();
			          else
			            d3.select(this).select('text').remove(); // Don't remove the ZERO line!!
			        }
			      });
			}

			if (t._showMaxMin && (t.axis.orient() === 'top' || t.axis.orient() === 'bottom')) {
			  var maxMinRange = [];
			  wrap.selectAll('g.axisMaxMin')
			      .each(function(d,i) {
			        if (i) // i== 1, max position
			          maxMinRange.push(t._scale(d) - this.getBBox().width - 4)  //assuming the max and min labels are as wide as the next tick (with an extra 4 pixels just in case)
			        else // i==0, min position
			          maxMinRange.push(t._scale(d) + this.getBBox().width + 4)
			      });
			  g.selectAll('g') // the g's wrapping each tick
			      .each(function(d,i) {
			        if (t._scale(d) < maxMinRange[0] || t._scale(d) > maxMinRange[1]) {
			          if (d > 1e-10 || d < -1e-10) // accounts for minor floating point errors... though could be problematic if the scale is EXTREMELY SMALL
			            d3.select(this).remove();
			          else
			            d3.select(this).select('text').remove(); // Don't remove the ZERO line!!
			        }
			      });
			}


			//highlight zero line ... Maybe should not be an option and should just be in CSS?
			if (t._highlightZero)
			  g.selectAll('line.tick')
			    .filter(function(d) { return !parseFloat(Math.round(d*100000)/1000000) }) //this is because sometimes the 0 tick is a very small fraction, TODO: think of cleaner technique
			      .classed('zero', true);
                  
                  */

			scale0 = t._scale.copy();

		});

		return this;
	},
	
	showMaxMin: function(_) {
		if (!arguments.length) return this._showMaxMin;
		this._showMaxMin = _;
		return this;
	},
	highlightZero: function(_) {
		if (!arguments.length) return this._highlightZero;
		this._highlightZero = _;
		return this;
	},
	scale: function(_) {
		if (!arguments.length) return this._scale;
		this._scale = _;
		this.axis.scale(this._scale);
	    d3.rebind(this, this._scale, 'domain', 'range', 'rangeBand', 'rangeBands');
		return this;
	},
	rotateYLabel: function(_) {
		if (!arguments.length) return this._rotateYLabel;
		this._rotateYLabel = _;
		return this;
	},
	axisLabel: function(_) {
		if (!arguments.length) return this._axisLabelText;
		this._axisLabelText = _;
		return this;
	},
    unit: function(_) {
        if (!arguments.length) return this._unit;
    	this._unit = _;
        this._showUnit = !!this._unit;
		return this;
    }
});/*var Flag = [
    france: {"g":[{"type":"rect","width":900,"height":600,"fill":"#ED2939"},{"type":"rect","width":600,"height":600,"fill":"#fff"},{"type":"rect","width":300,"height":600,"fill":"#002395"}]},
    
];*/


var Legend = Element.extend({
	init: function() {
		this._super(); // handle id, margin, width, height with accessor
		
		this._margin = {top: 10, right: 0, bottom: 5, left: 0, intery: 0, interx: 10};
		
		this._width = 400;
		this._height = 20;
		this._align = true;
        this.fontsize(12);
        this._autowidth = true;
        this._autoheight = true;
        this._circle = true;
        this._background = false;
        this._strokewidth = 2;
        this._xpos = 0;
        this._ypos = 0;
        this.seriesWidths = [];
        this._maxY = 0;
        this._seriesPerRow = false;
        this._editable = false;
        this._showValues = false;
		
		this._getKey = function(d) { return d.key };
		
		this.dispatch = d3.dispatch('legendClick', 'legendDblclick', 'legendMouseover', 'legendMouseout');
	},
	
	// -- Legend
    fontsize: function(_) {
    	if (!arguments.length) return this._fontsize;
		this._fontsize = parseInt(_, 10);
        this._iconsize = this._fontsize*5/12;
		return this;
	},
    iconsize: function(_) {
        if (!arguments.length) return this._iconsize;
		this._iconsize = parseInt(_, 10);
		return this;
	},
	key: function(_) {
		if (!arguments.length) return this._getKey;
		this._getKey = _;
		return this;
	},
	align: function(_) {
		if (!arguments.length) return this._align;
		this._align = _;
		return this;
	},
	color: function(_) {
		if (!arguments.length) return this._color;
	    this._color = _;
	    return this;
	},
	showValues: function(_) {
		if (!arguments.length) return this._showValues;
	    this._showValues = _;
	    return this;
	},
	
	display: function(selection) {
		var t = this;

		selection.each(function(data) {
            var realWidth = (t._width  || parseInt(container.style('width')) || 960),
        		realHeight = (t._height || parseInt(container.style('height')) || 400)
			var availableWidth = t._width - t._margin.left - t._margin.right;
			var availableHeight = t._height - t._margin.top - t._margin.bottom;

			var wrap = d3.select(this).selectAll('g.legend').data([data]);
			var gEnter = wrap.enter().append('g').attr('class', 'cdd3 legend').append('g');

			var g = wrap.select('g').attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')');

			var series = g.selectAll('.series')
					.data(function(d) { return d });
			var seriesEnter = series.enter().append('g').attr('class', 'series')
					.on('mouseover', function(d,i) {
						t.dispatch.legendMouseover(d,i);	//TODO: Make consistent with other event objects
					})
					.on('mouseout', function(d,i) {
						t.dispatch.legendMouseout(d,i);
					})
					.on('click', function(d,i) {
						t.dispatch.legendClick(d,i);
                        if( t._background ) {
                            for( var i in data ) {
                                var d = data[i]
                                if( d._disabled ) {
                                    g.select('rect.legendicon-'+i)
                                        .style('fill', d3.rgb( t._background ).darker([.2]) )
                                        .style('fill-opacity', 1)
                                    g.select('text.legendicon-'+i).style('fill', d3.rgb( t._background ).darker([.5]) )
                                }
                                else {
                                    g.select('rect.legendicon-'+i).style('fill', d._color)
                                    g.select('text.legendicon-'+i).style('fill', 'black' )
                                }
                            }
                        }
					})
					.on('dblclick', function(d,i) {
						t.dispatch.legendDblclick(d,i);
					});
            if( t._circle ) {
                seriesEnter.append('circle')
                    .style('fill', function(d,i) { return d._color || t._color[i % t._color.length] })
                    .style('stroke', function(d,i) { return d._color || t._color[i % t._color.length] })
                    .style('stroke-width', t._strokewidth)
                    .attr('class', function(d,i) { return 'legendicon legendicon-'+i })
                    .attr('cy', -t._iconsize*.8)
                    .attr('r', t._iconsize);
            }
            else { // rect
                seriesEnter.append('rect')
                    .style('fill', function(d,i) { return d._color || t._color[i % t._color.length] })
                    .style('stroke', function(d,i) { return d._color || t._color[i % t._color.length] })
                    .style('stroke-width', t._strokewidth)
                    .attr('class', function(d,i) { return 'legendicon legendicon-'+i })
                    .attr('x', -t._iconsize)
                    .attr('y', -t._iconsize-t._fontsize*.4)
                    .attr('width', t._iconsize*2)
                    .attr('height', t._iconsize*2);
            }
			seriesEnter.append('text')
					.text(t._getKey)
					.attr('text-anchor', 'start')
                    .attr('class', function(d,i) { return 'legendicon legendicon-'+i })
					//.attr('dy', '.'+(32*t._fontsize/12)+'em' )
					.attr('dx', t._iconsize+t._margin.interx )
                    //.attr('transform', 'transalte(0,'+(-t._fontsize/2)+')')
					.style('font-size', t._fontsize);
            /*seriesEnter.append('text')
					.text(t._getKey)
					.attr('text-anchor', 'start')
                    .attr('class', function(d,i) { return 'legendicon legendicon-'+i+' value' })
					//.attr('dy', '.'+(32*t._fontsize/12)+'em' )
					.attr('dx', t._iconsize+t._margin.interx )
                    //.attr('transform', 'transalte(0,'+(-t._fontsize/2)+')')
					.style('font-size', t._fontsize);*/
			series.classed('disabled', function(d) { return d._disabled });
			series.exit().remove();

			if (t._align) {
				var seriesWidths = [];
				series.each(function(d,i) { seriesWidths.push(d3.select(this).select('text').node().getComputedTextLength()+34); });

				var seriesPerRow = 0;
				var maxwidth = 0;
				var columnWidths = [];
                
                if( t._seriesPerRow ) {
                    seriesPerRow = t._seriesPerRow;
                    maxwidth = d3.max(seriesWidths);
                }
                else {
                    while ( maxwidth < availableWidth && seriesPerRow < seriesWidths.length) {
        				columnWidths[seriesPerRow] = seriesWidths[seriesPerRow];
    					maxwidth += seriesWidths[seriesPerRow++];
    				}
                }

				while ( maxwidth > availableWidth && seriesPerRow > 1 ) {
					columnWidths = [];
					seriesPerRow--;

					for (k = 0; k < seriesWidths.length; k++) {
						if (seriesWidths[k] > (columnWidths[k % seriesPerRow] || 0) )
							columnWidths[k % seriesPerRow] = seriesWidths[k];
					}

					maxwidth = columnWidths.reduce(function(prev, cur, index, array) { return prev + cur; });
				}

				var xPositions = [];
				for (var i = 0, curX = 0; i < seriesPerRow; i++) {
						xPositions[i] = curX;
						curX += columnWidths[i];
				}
                
				series
					.attr('transform', function(d, i) {
                        var ypos =  5 + Math.floor(i / seriesPerRow) * (t._fontsize*20/12+t._margin.intery);
                        if( t._maxY < ypos ) t._maxY = ypos;
						return 'translate(' + xPositions[i % seriesPerRow] + ',' + ypos + ')';
					});
                
			} else {

				var ypos = 5,
					newxpos = 5,
					maxwidth = 0,
					xpos;
                
				series
					.attr('transform', function(d, i) {
						var length = d3.select(this).select('text').node().getComputedTextLength();
                        xpos = newxpos;

						if (t._width < t._margin.left + t._margin.right + xpos + length) {
							newxpos = xpos = 5;
							ypos += t._iconsize*2 + t._margin.intery+t._strokewidth;
						}

						newxpos += length;
						if (newxpos > maxwidth) maxwidth = newxpos;
                        
                        if( t._maxY < ypos ) t._maxY = ypos;
                        
						return 'translate(' + xpos + ',' + ypos + ')';
					});
			}
            
            var width = 0;
            var height = 0;
            if( t._background ) {
                width = maxwidth+t._iconsize+t._margin.interx*2+t._strokewidth;
                height = (t._iconsize+t._margin.intery)*data.length;
                seriesEnter.insert('rect', ':first-child')
                    .style('fill', t._background)
                    .style('stroke', 'none')
                    .attr('x', -t._iconsize-t._strokewidth/2)
                    .attr('y', -t._iconsize-t._fontsize*.4-t._strokewidth/2)
                    .attr('width', width)
                    .attr('height', t._iconsize*2+t._strokewidth);
            }
            
			//position legend as far right as possible within the total width
            var xpos = Math.abs(t._xpos);
            var ypos = Math.abs(t._ypos);
			g.attr('transform', 'translate(' + ( (xpos>0 && xpos<1 ? t._xpos*realWidth : t._xpos) + t._margin.left - (width-t._iconsize-t._margin.interx)/2 ) + ',' + ( (ypos>0 && ypos<1 ? t._ypos*realHeight : t._ypos) + t._margin.top - height/2) + ')');

		});
		
		return this;
	},
	
	
});

var Timeline = Element.extend({
	init: function(view, width, height) {
		this._view = view;

		this._super(width, height);

		this._margin = {top: 0, right: 20, bottom: 0, left: 60};
		this._ratioHeight = 3;

		// -- Domain
		this.sy = d3.scale.linear();
		this.sx = d3.scale.linear();
		this.sxBands = d3.scale.ordinal();
		this.sxPoints = d3.scale.ordinal();

		// -- Brush
		var t = this;
		this._brush = d3.svg.brush().x(this._view.sxLinear).on('brush', function() { t._view.brush(); } );
		this.graph(new Pie(this._view));
	},

	graph: function(_) {
		if (!arguments.length) return this._graph;
	    this._graph = _;
	    d3.select('.timeline .graph .chartWrap').remove();
	    return this;
	},
	display: function(selection, mode) {
		var t = this;

		if( selection ) t.selection = selection;
		else selection = t.selection;
		
		if( !selection ) return t;

		selection.each(function(data) {
			var height = (t._height || parseInt(d3.select(this).style('height')));
			var decaltop = height - height/t._ratioHeight + t._margin.top;

			var availableWidth = (t._width || parseInt(d3.select(this).style('width'))) - t._margin.left - t._margin.right,
				availableHeight = height/t._ratioHeight  - t._margin.top - t._margin.bottom;

			var container = d3.select(this),
			that = this;

			// brush here
			var timeline = container.selectAll('.timeline').data([0]).enter().append('g')
				.attr('class', 'timeline')
				.attr('transform', 'translate(' + t._margin.left + ',' + decaltop + ')')
				.style('width', availableWidth)
				.style('height', availableHeight);

			container.selectAll('.timeline').transition()
				.attr('transform', 'translate(' + t._margin.left + ',' + decaltop + ')')
				.style('width', availableWidth)
				.style('height', availableHeight);

			timeline.append('rect')
				.attr('x', 0)
				.attr('y', 0)
				.attr('height', availableHeight)
				.attr('width', availableWidth)
				//.attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')')
				.style('fill', 'white')

			var newdata = [];
			// -- Timeline size & display
			for( var key in t._view.charts ) {
				var chart = t._view.charts[key];
				var datum = chart.series;
				var data2 = datum.filter(function(d) {return !d._disabled}).map( function(d) { 
                    var d2 = d.clone();
                    d2.values = d.values.filter( function(d,i) { return (d.x > t._view.behavior.x().domain()[0] && d.x < t._view.behavior.x().domain()[1]); }).map(function(d) { return { x: d.x, y: d.y }; });
					return d2;
				});
				newdata = newdata.concat(data2);

				var margintop = chart._margin.top;
				var marginbottom = chart._margin.bottom;
				var scaleychart = t._view.sy;
				//var scalexchart = chart.sx;
				//var scalex0chart = chart.sx0;
				var scatter = chart._scatter;
				var interactive = chart._interactive;
				var translateX = chart._translateX;
				var scaleX = chart._scaleX;

				// reset default values
				chart._margin.top = t._margin.top;
				chart._margin.bottom = t._margin.bottom;
                t.sy.domain( [t._view.sy.domain()[0],t._view.sy.domain()[1]]  );
                chart.sy = t.sy;
                var rangeBands = [0, availableWidth];
    		    t._view.sxBands.rangeBands(rangeBands, t._view._padding, 0); // scale for bar chart, with range bands
                var rangePoints = [rangeBands[0]+t.sxBands.rangeBand()/2, rangeBands[1]-t.sxBands.rangeBand()/2];
			    t._view.sxPoints.rangePoints(rangePoints);
				chart._scatter = false;
				chart._initial = false;
				chart._interactive = false;
				chart._translateX = 0;
				chart._scaleX = 1;

				// display chart
				chart.width(availableWidth).height(availableHeight);
				chart.display(container.selectAll('.timeline').datum(datum), 'timeline');

				// give them back values
				chart._margin.top = margintop;
				chart._margin.bottom = marginbottom;
				chart.sy = scaleychart;
                var rangeBands = [0, availableWidth*t._view._scaleX];
        	    t._view.sxBands.rangeBands(rangeBands, t._view._padding, 0); // scale for bar chart, with range bands
                var rangePoints = [rangeBands[0]+t._view.sxBands.rangeBand()/2, rangeBands[1]-t._view.sxBands.rangeBand()/2];
			    t._view.sxPoints.rangePoints(rangePoints);
				chart._scatter = scatter;
				chart._interactive = interactive;
				chart._translateX = translateX;
				chart._scaleX = scaleX;
			}

			// -- Brush
			timeline.selectAll('.brush').data([0]).enter().append('g')
				.style('width', availableWidth)
				.style('height', availableHeight)
				.attr('class', 'x brush')
				.call(t._brush)
			.selectAll('rect')
				//.attr('transform', 'translate(' + t._margin.left + ',' + decaltop + ')')
				//.attr('y', -6)
				.attr('height', availableHeight);
			timeline.selectAll('.brush').style('height', availableHeight);

            container.selectAll('.timeline').selectAll('.x.brush').attr('transform', 'scale('+(1/t._view._scaleX)+', 1)')

			// -- Graph things
			var graph = timeline.selectAll('.graph').data([0]).enter().append('g')
				.attr('class', 'graph')
				.style('width', container.select('.extent').attr('width'))
				.style('height', container.select('.extent').attr('height'))
				.attr('transform', 'translate(' + (container.select('.extent').attr('x')/t._view._scaleX) + ',0)');
			t._graph.width( container.select('.extent').attr('width') || availableWidth).height(container.select('.extent').attr('height') || availableHeight);
			var transition = container.selectAll('.graph').datum(newdata).transition().delay(0).duration(200);
			t._graph.display(transition);
			container.selectAll('.graph').attr('transform', 'translate(' + (container.select('.extent').attr('x')/t._view._scaleX-container.select('.extent').attr('width')) + ',0)scale('+(3/t._view._scaleX)+', 1)')
            
            //.attr('transform', 'translate(' + (container.select('.extent').attr('x')/t._view._scaleX) + ',0)')
		});
	}
});var ValueViewer = Element.extend({
    init: function(view, width, height) {
		this._view = view;

		this._super(width, height);
        
		this._pos = null;
        this._r = 4;
        this._size = 2;
        
		var t = this;
        this._duration = 400;
		this._drag = d3.behavior.drag();
		this._recal = this._view._margin.top;
		this._newvalue = 0;
		this._newpos = 0;
		this._dragging = false;
        this._ready = true;
        this._showText = false;
        this._background = true;
        this._timeout = true;
        this._line = false;
	},
    circle: function() {
        return true;
        for( var k in this._view.charts ) if( this._view.charts[k]['Line'] != undefined ) return true;
        return false;
    },
	getpos: function() {
		var domain = this._view._xDomain;
        
		if( this._pos ) {
			var xpos = this._view.sxLinear2.invert(this._pos[0]-this._view._translateX);
			var dvalue = 0;

			if( xpos < domain[0] ) dvalue = domain[0];
			else if( xpos > domain[domain.length-1] ) dvalue = domain[domain.length-1];
			else for( var i=1; i<domain.length; i++ ) if( xpos >= domain[i-1] && xpos < domain[i]) dvalue = domain[i-1];
			this._newvalue = dvalue;
            
            var sx = this._view.state.ordinable() ? this._view.sxPoints : this._view.sxLinear;
			this._newpos = sx(dvalue)+this._view._margin.xleft+this._view._translateX;
		}
	},
	dragstart: function(container, pos) {
        this._dragging = true;
        this._ready = true;
        this.display(null, 'inspect');
	},
	dragmove: function(container, pos) {
        var t = this;
        
		this._pos = d3.mouse(container);
		this._size = this._view.sxBands.rangeBand();
    
		var oldpos = this._newpos;
		this.getpos();

		if( !this._dragging || oldpos != this._newpos ) {
            this._dragging = true;
            this._ready = true;
            if( this._timeout ) clearTimeout(this._timeout);
            this.display(null, 'inspect');
		}
	},
	dragend: function(container, pos) {
        //t._dragging = false;
        //t._ready = false;
        
        //if( this._view._vvover ) {
        if( this._timeout ) clearTimeout(this._timeout);
        var t = this;
        this._timeout = setTimeout(function(d) {
            if( t._dragging ) {
                t.display(null, "animation");
                t._dragging = false;
                t._timeout = false;
                t._view.state._event({event: 'dragend'});
            }
        }, 500);
        /*}
        else { 
    		this._dragging = false;
            t.display();
            if( this.circle() ) d3.selectAll('.valueviewer').selectAll('.circlezone').transition().duration(t._duration/2).attr('r', this._r);
            d3.selectAll('.valueviewer').attr('opacity', 0);
            var t = this;
            var initpos = t._newpos ? t._newpos : t._width + t._view._margin.xleft;
            d3.selectAll('.backgroundvalueviewer').selectAll('.rectzone').transition().duration(t._duration).attr('width', 0)                 .attr("x", initpos)
                .each('end', function() { d3.select(this).style('opacity', 1e-6) });
        }*/
    },
    clean: function(selection, mode ) {
        selection.each(function(data) {
            var container = d3.select(this);
            container.selectAll('.wrap.chart').selectAll('.valueviewer').remove();
        });
    },
	display: function(selection, mode) {
		var t = this;
		this._recal = this._view._margin.top;

		if( selection ) t.selection = selection;
		else selection = t.selection;
		
		if( !selection ) return t;

		selection.each(function(data) {
			var container = d3.select(this),
			that = this,
            availableHeight = (t._view._height || parseInt(container.style('height')) || 400) - t._view._margin.top - t._view._margin.bottom;

			//t._newpos = t._view.sxPoints(t._view._xDomainReal[t._view._xDomainReal.length-1])+t._view._margin.xleft+t._view._translateX;
            t.getpos();
			var initpos = t._newpos;
            var size = t._view.sxBands.rangeBand();
            for( var k in t._view.charts ) if( t._view.nbseries('Bar') == 0 ) size = 2;
			var gEnter = container.selectAll('.wrap.chart').selectAll('.backgroundvalueviewer').data([0]).enter()
        	var g = gEnter.insert('g', ":first-child").attr('class', 'backgroundvalueviewer');
            
            // -- Background
    		if( t._background ) {
                
    			// -- Background Rectangle
    			g.append('rect').attr('class', 'rectzone').style('opacity', 1e-6).attr('width', 0);
    			
                d3.selectAll('.backgroundvalueviewer').selectAll('.rectzone')
                    .attr("x", initpos-size/2)
                    .attr('width', t._ready && t._dragging ? size : 0).attr('height', availableHeight+t._recal)
                    .style('opacity', 1);
                
                if( mode == 'animation' || t._ready && !t._dragging ) container.selectAll('.backgroundvalueviewer')
                    .selectAll('.rectzone').transition().duration(t._duration)
                        .attr('width', 0)
                        .attr('height', availableHeight+t._recal)
                        .attr("x", initpos)
                        .each('end', function() { d3.select(this).style('opacity', 1e-6) });
    		}
            
            //g.append('line').attr('class', 'linezone').style('opacity', 1e-6).style('stroke-width', 0)
                    
            /*d3.selectAll('.backgroundvalueviewer').selectAll('.linezone').attr('x1', initpos).attr('x2', initpos)
                .attr('y1', 0).attr('y2', availableHeight+t._recal)
                .style('stroke', 'white').style('stroke-width', t._ready ? 2 : 0).style('opacity', 1)
            
            if( t._ready && !t._dragging ) d3.selectAll('.backgroundvalueviewer').selectAll('.linezone').transition().duration(t._duration)
                .style('stroke-width', 0)
                .each('end', function() { d3.select(this).style('opacity', 1e-6) });*/
            
			// Foreground
			var gEnter = container.selectAll('.wrap.chart').selectAll('.valueviewer').data([0]).enter();
			var g = gEnter.append('g').attr('class', 'valueviewer');
            
            if( t._newvalue && (mode == 'animation' || mode == 'inspect') ) {
                var data = t._view.state.updatevalueviewer(t._newvalue);
                
                var gData = d3.selectAll('.valueviewer').selectAll('.circlezone').data(d3.range(data.length)); //.data(d3.range(t._view.allseries.length));
                var gEnter = gData.enter();
                gData.exit().remove();

                // -- Foreground Circle
                if( t.circle() ) {
                    gEnter.append('circle').attr('class', 'circlezone')
                    
                    d3.selectAll('.valueviewer').selectAll('.circlezone')
                        //.transition().duration(t._duration/2)
            			.attr('r', function(d,i) { return data[i].type == 'Line' || data[i].type == 'Arealine' || data[i].type == 'Area' ? t._ready && t._dragging ? t._r * 1.5 : 0 : 0 })
                        .attr('cx', initpos)
                        .attr('cy', function(d,i) { return data[i].pos+t._view._margin.top })
                        .style("fill", function(d,i) { return d3.rgb( data[i].color ) }) // .darker([.5]) })
                    
                    if( mode == 'animation' || t._ready && !t._dragging ) container.selectAll('.valueviewer').selectAll('.circlezone').transition().duration(t._duration).attr('r', 0).attr('cx', initpos)
        			//if( !t._dragging ) container.selectAll('.backgroundvalueviewer').selectAll('.linezone').transition().duration(t._duration).attr('x1', initpos).attr('x2', initpos).attr('y1', 0).attr('y2', (availableHeight+t._recal)).style('opacity', 1e-6);
                }
                else if( t._line ) {
                    gEnter.append('line').attr('class', 'circlezone');
                    
                    var elements = d3.selectAll('.valueviewer').selectAll('.circlezone')
                        .attr('x1', initpos-size*.95/2)
                        /* separation in two
                        .attr('x2', function(d,i) {
                            var val = data[i].pos+t._view._margin.top;
                            var x2 = t._newpos+( values.indexOf(val) !== -1 ? 0 : size/2);
                            values.push(val);
                            return x2;
                        })*/
                        .attr('x2', initpos+size*.95/2)
                        .style("stroke", function(d,i) { return d3.rgb( data[i].color ).darker([.5]) }).style('stroke-width', 2)
                    
                    var transition = elements.transition().delay(200);
                    
                    transition.attr('y1', function(d,i) { return data[i].pos+t._view._margin.top }).attr('y2', function(d,i) { return data[i].pos+t._view._margin.top })
                    
                    if( t._showText ) {
                        gEnter.append('text').attr('class', 'textzone');

                        var values = [];
                        var elements = d3.selectAll('.valueviewer').selectAll('.textzone')
                            .attr('x', function(d,i) {
                                var val = data[i].pos+t._view._margin.top;
                                var x2 = t._newpos+( values.indexOf(val) !== -1 ? -1 : 1)*size/2;
                                values.push(val);
                                return x2;
                            })
                            .attr('dy', -10)
                            .attr('text-anchor', 'middle')
                            .style("fill", function(d,i) { return d3.rgb( data[i].color ).darker([.5]) })
                            
                        var transition = elements.transition().delay(200)
                            .attr('y', function(d,i) { return data[i].pos+t._view._margin.top })
                            .text(function(d,i) { return Math.round(data[i].value) });
                    }
                }
            }
            else d3.selectAll('.valueviewer').selectAll('.circlezone').remove();
		});
	},
});


var State = Class.extend({
	init: function(view) {
		this._view = view;
		this._allcharts = ['Bar', 'Area', 'Line', 'Scatter', 'Hbar', 'Pie', 'Donut', 'Stacked', 'Background', 'Weather', 'Value', 'Arealine', 'Gauge', 'Punchcard'];
		this._charts = this._allcharts.map(function(d) { return d; });
        this.ipad = false;
        
        var t = this;
		this.updatevalue(function(values, date) { t._event({event:'value', date: date, values: values}); });
        this.event(function(json) { });
        
        this._randomized = false;
        //this.event(function(json) { console.log(json) });
        
		// -- Color Stuff
		//this._color = d3.scale.category10().range();
		this._colors = d3.scale.category20().range().map(function(d) { return d; }).concat(d3.scale.category20b().range().map(function(d) { return d; })).concat(d3.scale.category20c().range().map(function(d) { return d; }));
		// ['rgb(114,65,99)','rgb(174,40,98)','rgb(224,90,105)','rgb(199,63,66)','rgb(200,80,40)','rgb(244,143,104)','rgb(225,156,75)','rgb(233,220,175)','rgb(186,200,176)','rgb(119,205,190)','rgb(111,162,165)','rgb(83,90,166)','rgb(183,226,198)','rgb(180,203,156)','rgb(118,206,164)','rgb(124,154,128)'];
		// #724163','#ae2862','#e05a69','#c73f42','#c85028','#f48f68','#e19c4b','#e9dcaf','#bac8b0','#77cdbe','#6fa2a5','#535aa6','#b7e2c6','#b4cb9c','#76cea4','#7c9a80
        this._allcolors = this._colors.map(function(d) { return d; });
		this._cnum = 0;
		this._predict = false;
        this._valueviewer = false;
        this._timeline = false;
        this._secondaxis = false;
        this._ordinable = false;
        this._watch = false;
        this._w8 = false;
	},
    communicate: function(json) {
        if( !json.event ) throw 'no event in json';
        
        var v = this._view;
        
        var mode = 'animation', elt;
        
        if( (v._initial || !v._element) && json.exploration && json.exploration.element ) v._element = json.exploration.element;
        
        if( !v._element ) throw 'no exploration.element property';
        
        var elt = d3.select('#'+v._element);
        if( !elt.length > 0 ) throw 'unabled to find elt: #'+v._element;
        
        if( json.duration > 0 ) elt = elt.transition().duration(json.duration)
        else if( json.duration == 0 || json.duration == false ) mode = 'zoom';
        else elt = elt.transition().duration(v._duration)
        
        switch(json.event) {
            case 'add':
                if( json.exploration ) v.addall(json.exploration)
                else if( json.series || json.charts || json.serie || json.chart ) v.addall(json)
                else throw 'nothing to add';
                v.initdata();
                if( v.allseries.length ) v.display( elt, mode );
                
                break;
            case 'remove':
                var ids = ( json.id ) ? [json.id] : json.ids;
                if( ids ) for( var k in ids ) v.removeid(ids[k]);
                else throw 'no ids to remove';
                v.initdata(); // reinit data
                v.display(elt, mode);
                break;
            case 'update':
                var change = false;
                
                if( json.mode ) {
                    v.style(json.mode);
                    change = true;
                }
                else {
                    if( !json.id ) throw 'no id to update';
                    var s = v.getid(json.id);
                    if( !s ) throw 'this id: '+json.id+' cannot be found';
                    
                    // -- color
                    if( json.color ) {
                        s.color(json.color);
                        change = true;
                    }
                    // -- secondaxis
                    if( json.secondaxis != null ) {
                        s.secondaxis(json.secondaxis);
                        v._initial = true
                        v._inittime = true
                        v.initdata();
                        change = true;
                    }
                    // -- time
                    if( json.time && json.time != v._time ) {
                        v.time(json.time);
                        change = true;
                    }
                    // -- data
                    if( json.data && json.timestamps ) {
                        var data = json.data[0];
                        var seriedata = json.timestamps.map(function (d,i) { return {x: new Date(d), y: data[i] ? data[i] : 0} })
                        s.data(seriedata);
                        v.initdata();
                        change = true;
                    }
                    // -- type
                    if( json.type ) {
                        var chart = v.create(json.type);
                        
                        s.chart().series.splice(s.chart().series.indexOf(s), 1);
                        s.chart(chart);
                        chart.addserie(s);
                        v.initdata();
                        v.refreshbehavior(false);
                        v.yborder(true);
                        change = true;
                    }
                }
                
                if( change ) v.display(elt,mode);
                
                break;
            case 'undisplay':
                v.undisplay();
                break;
        }
    }, 
    event: function(_) {
        if (!arguments.length) return this._event;
	    this._event = _;
	    return this;
	},
    updatevalue: function(_) {
	    if (!arguments.length) return this._updatevalue;
	    this._updatevalue = _;
	    return this;
	},
	isallowed: function (type) { return !this._watch || this._charts.indexOf(type) != -1; },
	//ishorizontal: function () { for( var key in this._view.charts ) if( this._view.charts[key]._type == 'Hreturn this._charts.indexOf(type) != -1; },
	allowed: function () { return this._charts; },
	addchart: function(type) { for( var key in arguments ) if( (gindex = this._charts.indexOf(arguments[key])) != -1 ) this._charts.push(gindex); },
	removechart: function() { for( var key in arguments ) if( (gindex = this._charts.indexOf(arguments[key])) != -1 ) this._charts.splice(gindex, 1); },
	add: function(type) {
		switch(type) {
			case 'Area':
				this.removechart('Hbar', 'Pie', 'Stacked');
			break;
			case 'Bar':
				this.removechart('Hbar', 'Pie', 'Stacked');
			break;
			case 'Hbar':
				this.removechart('Bar', 'Area', 'Line', 'Scatter', 'Pie', 'Stacked');
			break;
			case 'Line':
				this.removechart('Hbar', 'Pie', 'Stacked');
			break;
			case 'Scatter':
				this.removechart('Hbar', 'Pie', 'Stacked');
			break;
			case 'Pie':
				this.removechart('Bar', 'Area', 'Line', 'Scatter', 'Hbar');
			break;
            case 'Punchcard':
				this.removechart('Bar', 'Area', 'Line', 'Scatter', 'Hbar');
			break;
			case 'Donut':
				this.removechart('Bar', 'Area', 'Line', 'Scatter', 'Hbar');
			break;
			case 'Gauge':
				this.removechart('Bar', 'Area', 'Line', 'Scatter', 'Hbar');
			break;
			case 'Stacked':
				this.removechart('Bar', 'Area', 'Line', 'Scatter', 'Hbar');
			break;
			case 'Background':
				this.removechart('Hbar', 'Pie', 'Stacked');
			break;
			case 'Weather':
				this.removechart('Hbar', 'Pie', 'Stacked');
			break;
            case 'Value':
    			this.removechart('Hbar', 'Pie', 'Stacked');
			break;
            case 'Arealine':
    			this.removechart('Hbar', 'Pie', 'Stacked');
			break;
		}
	},
	remove: function(type) { if( this._view.charts.length == 0 ) this._charts = this._allcharts; },
	stackable: function() { 
		if( this.predictable() ) return false;
		var count = [];
		for( var k in this._view.charts ) {
            for( var k2 in this._view.charts[k] ) {
    			if( this._view.charts[k][k2]._stackable ) {
    				var type = this._view.charts[k][k2]._type;
    				if( !count[type] ) count[type] = this._view.charts[k][k2].series.filter(function(d) { return !d._disabled }).length;
    				else count[type] += this._view.charts[k][k2].series.filter(function(d) { return !d._disabled }).length;
    			}
    		}
		}
		for( var key in count ) if( count[key] > 1 ) return true;
		return false;
	},
    ordinable: function(_) { 
        if(arguments.length) this._ordinable = _; // search if we have a real ordinal
        if( this._ordinable === true ) return true
        for( var k in this._view.charts ) for( var k2 in this._view.charts[k] ) if( this._view.charts[k][k2]._ordinal ) return true;
        return false;
    },
    textable: function() {
        for( var key in this._view.allseries ) {
    		var s = this._view.allseries[key];
			if( typeof s.values[0].x == 'string' ) return true;
		}
		return false;
    },
	predictable: function() { 
		for( var key in this._view.allseries ) {
			var s = this._view.allseries[key];
			if( s._predicted ) return true;
		}
		return false;
	},
	predict: function(_) { 
		if (!arguments.length) return this._predict;
	    this._predict = _;
	    this._view.initdomain();
		this._view.display();
	    return this;
	},
    reload: function() {
        this._view._initial = true;
        this._view.initdisplay();
	    this._view.display();
	    return this;
	},
    valueviewer: function(_) { 
    	if (!arguments.length) return this._valueviewer;
	    this._valueviewer = _;
        this._view.showValueviewer(this._valueviewer);
		this._view.initdisplay();
        this._view.display();
	    return this;
	},
    w8: function(_) { 
        if (!arguments.length) return this._w8;
        this._w8 = _;
	    return this;
	},
    timeline: function(_) { 
    	if (!arguments.length) return this._timeline;
	    this._timeline = _;
        this._view.showTimeline(this._timeline);
        //this._view.initdomain();
		this._view.display();
	    return this;
	},
	semanticable: function() {
		for( var k in this._view.charts ) for( var k2 in this._view.charts[k] ) if( this._view.charts[k][k2]._semanticable ) return true;
		return false;
	},
	updatevalueviewer: function(x) {
		var values = [];

		for( var k in this._view.charts ) for( var k2 in this._view.charts[k] ) {
			var chart = this._view.charts[k][k2];
			for( var key2 in chart.series ) {
				var s = chart.series[key2];
				if(s._disabled) continue;
				for(var key3 in s.values) {
                    var ypos = this._view._style == 'stack' && s.values[key3].display && s._chart._type != 'Line' ? s.values[key3].display.y0+s.values[key3].display.y : s.values[key3].y;
                    var value = {id: s._id, color: s._color, type: chart._type, value: s.values[key3].y, pos: (k == 0 ? this._view.sy(ypos) : this._view.sySecond(ypos) )};
                    if( s.values[key3].x.getTime() == x.getTime() ) values.push(value);
				}
			}
		}

		this._updatevalue(values, x.getTime());
        
        return values;
	},
	colors: function() { return this._colors; },
	getcolor: function() {
		if( this._w8 || this._randomized ) this._colors.sort(function() {return .5 - Math.random()});
		var color  = this._colors[0];
		this._colors.splice(0,1);
		return color;
	},
	setcolor: function(id, color) {
		//this._view.charts[key]
		var s, cindex;
		if( s = this._view.getid(id) ) {
			if( color ) {
				this.removecolor(color); // delete the color from array
				var oldcolor = s._color;
				s._color = color; // set the color asked
				this._colors.push(oldcolor);
			}
			else s._color = this.getcolor();
		}
		else return false;
	},
	removecolor: function(c) { if( (cindex = this._colors.indexOf(c)) != -1 ) this._colors.splice(cindex, 1); },
});
var Serie = Class.extend({
	init: function(chart, metric, dimension, values, color, style, semantic) {
		this._id = Math.floor(Math.random() * 10000);
        this.chart(chart);
        
		this.metric = metric;
		this.dimension = dimension;
		
		// *** REMOVE SOON
		this.dnames = (dimension) ? dimension.dnames : null;
		this.dvalues = (dimension) ? dimension.dvalues : null;
		this.labels = (dimension) ? dimension : null;
		// *** REMOVE SOON

		this.key = this.metric && typeof this.metric == 'string' ? capitalize(this.metric.substring(this.metric.lastIndexOf('_')+1, this.metric.length)) : '';
		
        if( this.dimension && this.dimension.length == 1 ) this.key += (this.metric ? ' - ' : '')+this.dimension;
		else if( this.dimension && this.dimension.length ) this.key += (this.metric ? ' - ' : '')+this.dimension.map(function(d) { return d[1] }).join(' ');
		else if( this.dimension && this.dimension.dvalues ) this.key += ' - '+this.dimension.dvalues[0];
		
		this.getX = function(d) { return d.x };
		this.getY = function(d) { return d.y };
        
		this.originalvalues = this.savedvalues = values;
		this._axe = 0;
		this._color = color ? color : 'black';
		//this._style = style ? style : 'normal';
		this._disabled = false;
		this._domained = true;
		this._predicted = false;
        this._secondaxis = false;
        this._draggable = false;
        
        this.reduce();
        
		if( semantic === true ) this.semantize();
        else this._semantic = false;
	},
    reduce: function() {
        if( !this._chart._view._reduced ) return false;
        
        // find min for each
        var min = d3.min( this.values.map(function(d) { return d.y; }) );
        this.values = this.values.map(function(d) { return {x: d.x, y: d.y-min}; });
        
        return true;
    },
	semantize: function() {
		if( this._semantic ) return this;
        
        // filter time definition
        var timedef = [];
        for( var key in this._chart._view._timedef ) if( this._chart._view._timedef[key].active ) timedef.push(this._chart._view._timedef[key]);
        
        // set default state
        var state = {};
        for( var key in timedef ) {
            this[timedef[key].name] = [];
            state[key] = {val: -1, num: 0, nbvalues: 0};
        }
        
        // and let's go read values
        var date = 0, next = 0;
		for( var k in this.values ) {
            date = this.values[k].x; // BUG FIXED here (end of month beginning value)
            // for each timedef border
            for( var key in timedef ) {
                next = timedef[key].get(date);
                if( next != state[key].val ) {
                    if( this._chart._view._aggregation == 'avg' && state[key].nbvalues > 0 ) this[timedef[key].name][state[key].num].y = d3.sum(this[timedef[key].name][state[key].num].y) / state[key].nbvalues;
                    else if( this._chart._view._aggregation == 'max' && state[key].nbvalues > 0 ) this[timedef[key].name][state[key].num].y = d3.max(this[timedef[key].name][state[key].num].y);
                    else if( state[key].nbvalues > 0 ) this[timedef[key].name][state[key].num].y = d3.sum(this[timedef[key].name][state[key].num].y);
                    
                    state[key].num = this[timedef[key].name].push({x: timedef[key].add(date, 0), y: [this.values[k].y]})-1;
                    state[key].val = next;
                    state[key].nbvalues = 0;
                }
                else this[timedef[key].name][state[key].num].y.push(this.values[k].y);
                state[key].nbvalues++;
            }
		}
        // for the last values
        if( this._chart._view._aggregation == 'avg' ) {
            for( var key in timedef ) if( state[key].nbvalues > 0 ) this[timedef[key].name][state[key].num].y = d3.sum(this[timedef[key].name][state[key].num].y) / state[key].nbvalues;
        }
        else if( this._chart._view._aggregation == 'max' ) {
            for( var key in timedef ) if( state[key].nbvalues > 0 ) this[timedef[key].name][state[key].num].y = d3.max(this[timedef[key].name][state[key].num].y);
        }
        else {
            for( var key in timedef ) if( state[key].nbvalues > 0 ) this[timedef[key].name][state[key].num].y = d3.sum(this[timedef[key].name][state[key].num].y);
        }

		this._semantic = true;
        
		return this;
	},
	id: function(_) {
		if (!arguments.length) return this._id;
	    this._id = _;
	    return this;
	},
    data: function(_) {
        if (!arguments.length) return this._originalvalues;
        this.values = this.savedvalues = this.originalvalues = _;
        if( this._semantic ) {
            this._semantic = false;
            this.semantize();
        }
	    return this;
    },
	axe: function(_) {
		if (!arguments.length) return this._axe;
	    this._axe = _;
	    return this;
	},
	disabled: function(_) {
		if (!arguments.length) return this._disabled;
	    this._disabled = _;
	    return this;
	},
	color: function(_) {
		if (!arguments.length) return this._color;
	    this._color = _;
	    return this;
	},
	style: function(_) {
		if (!arguments.length) return this._style;
	    this._style = _;
	    return this;
	},
    secondaxis: function(_) {
    	if (!arguments.length) return this._secondaxis;
	    this._secondaxis = _;
	    return this;
	},
    chart: function(_) {
    	if (!arguments.length) return this._chart;
	    this._chart = _;
	    return this;
	},
	predicted: function(_) {
		if (!arguments.length) return this._predicted;
	    this._predicted = _;
	    return this;
	},
	clone: function() { return new Serie(this._chart,this.metric,this.labels,this.values,this._color, this._style, false); },
});
	
var View = Element.extend({
	init: function(width, height) {
		this._initial	= true;
		this._ready	= false;

		this._super(width, height);
			
		// -- State
		this.state = new State(this);

		// -- Charts
		this.allcharts = [];
		this.charts = [];
        
        // -- General params
        this._reduced = false;
        this._aggregation = 'avg';
		
		// -- Element
        this._element = '';
		this._margin = {top: 30, right: 0, bottom: 30, left: 0, xaxis: 12, yaxis: 20, space: 15 };
        this._margin.xleft = this._margin.left;
        this._margin.xright = this._margin.right;
		this._decal = {top: 0, right: 0, bottom:  0, left: 0};
		this.selection = null;
		this._fullscreen = false;
        this._autoadaptation = false;
		
		// -- Scale
		this.sxBehavior = d3.time.scale(); // used for zoom
		this.sxLinear = d3.time.scale(); // used for normal graph
		this.sxLinear2 = d3.time.scale(); // used for valueviewer
		this.sxLinearAxis = d3.scale.linear(); // used for axis display
		this.sxPoints = d3.scale.ordinal(); // use for other graph
		this.sxBands = d3.scale.ordinal(); // use for other graph
		this.sy = d3.scale.linear();
		this.sySecond = d3.scale.linear();
        this._sysecondaxis = false;
        this._secondaxisAuto = false;
        this._autoYAdjust = true;
        this._autoYAdapt = true;
        this._nbyticks = false;
        this._fontsizey = 12;
        this._fontsizex = 25;

		// -- Domain
		this._xDomain = null;
		this._yDomain = null;
		this._padding = .1;
		this._style = 'normal';
		this._stylesaved = 'normal';

		// -- Graph scale and translation for X axes (used for labels)
		this._scaleX = 1;
		this._translateX = 0;
        this._duration = 500;
        this._timeout = false;

		// -- Format & Interval
        var t = this;
        this.syFormat( function(d) { 
            var format = d3.format(',');
            if( t._yDomain[1] > 1000000 ) return format(Math.floor(d/100000)/10)+'M';
            else return format(d);
        } );
        this.syFormatSecond( function(d) { 
            var format = d3.format(',');
            if( t._yDomainSecond[1] > 1000000 ) return format(Math.floor(d/100000)/10)+'M';
            else return format(d);
        } );
		this.sxFormat( d3.time.format('%b %e, %Y') );
		this.sxInterval = 1000*3600*25;
		
		// -- Axis
		this.xAxis = new Axis().orient('bottom').tickPadding(5).tickSubdivide(true);
		this.xAxis2 = new Axis().orient('bottom').tickPadding(5);
		this.yAxis = new Axis().scale(this.sy).orient('left').tickSubdivide(false);
		this.yAxisSecond = new Axis().scale(this.sySecond).orient('right');
        this._showYTick = true;
        this._xDomainCustom = false;
		
		// -- Graph public
        this._showLegend = true;
		this.legend = new Legend();
		
		// -- Control things
		this._showTooltip = false;
        this._formatAction = null;
		this._showXAxis = true;
        this._showXLabels = true;
		this._showYAxis = true;
        this._forceMinY = 0;
        this._forceMaxY = false;
        this._adjustMinY = false;
		this._reduceXTick = true;
		this._reduceYTick = false;
		this._reduceXTickWidth = 420;
		this._reduceYTickHeight = 14;
        this._yDomainForced = false;
		
		// -- Scroll things
		this._useScroll = true;
		this._useXScroll = true;
		this._useYScroll = false;

		// -- Zoom things
		this._useZoom = true;
		this._useXZoom = true;
		this._useYZoom = false;
		this._zoomLimit = false; //[1, 30];
		this._zoom = 1;
		this._clipEdge = true;
		this.initialRangeBand = 0;
        this._limitDisplay = 60;

		// Time things
		this._timeinterval = false;
		this._time = 'day';
        this._timedef = cd.timedef.map(function(d) { return d; }).filter(function(d) { return d.active; });

		// -- Semantic Zoom
		this.semantic(false);
        this._min_semantic = 200;
		this.aggreg(false);
		this._aggregtransition = false;

		// -- Behavior
		this.behavior = null;
		this._dragging = false;
        this._initialbehavior = true;
        this._inittime = true;

		// -- Timeline things
		this.showTimeline(false);

		// -- ValueViewer things
		this.showValueviewer(false);
        this._vvover = false;
		
		// -- Tooltips
		if( this._showTooltip ) this.dispatch = d3.dispatch('tooltipShow', 'tooltipHide');
		
		// -- Interaction for touch (iPad)
		this.touch = (typeof(window.ontouchstart) != 'undefined') ? true : false;
		if( this.touch ) window.ontouchmove = function(e) { e.preventDefault(); };
		
		// -- Default control data
        this._showGraph = false;
        this._showControl = false;
        this._showData = false;
		this._controlData = [	{ key: 'Normal' },
								{ key: 'Center', _disabled: true },
								{ key: 'Stack', _disabled: true },
								{ key: 'Stream', _disabled: true },
								{ key: 'Expand', _disabled: true },
								{ key: 'Extend', _disabled: true },
								//{ key: 'Timeline+Stack', _disabled: true},
								//{ key: 'Timeline+Pie', _disabled: true},
								//{ key: 'NoTimeline', _disabled: true}   
							];
		this.controlData = new Legend();

		// -- Default control time
        this.showTime(false);

		// -- Default control action
        this._showAction = false;
		this._controlAction = [	{ key: 'Reload', _disabled: true },
                                { key: 'Timeline', _disabled: true },
                                { key: 'Valueviewer', _disabled: true },
                                { key: 'Predict', _disabled: true } ];
		this.controlAction = new Legend();
    
        // -- Data link
        this._changedata = false;
        this._attached = false;

		this.resize(true);

		var t = this;
	},
    
    nbcharts: function(type) {
        var count = 0;
        for(var k in this.charts) if( this.charts[k][type] && this.charts[k][type].series.filter(function(d) { return !d._disabled; }).length  > 0 ) count += 1;
        return count;
    },
    
    nbseries: function(type, all) {
        var count = 0;
        if( all === true ) {
            for(var k in this.charts) if( this.charts[k][type] && this.charts[k][type].series ) count += this.charts[k][type].series.length;
        }
        else {
            for(var k in this.charts) if( this.charts[k][type] && this.charts[k][type].series ) count += this.charts[k][type].series.filter(function(d) { return !d._disabled; }).length;
        }
        return count;
    },
    
    margin: function(name, value) {
        if (!value) return this._margin[name];
        this._margin[name] = value;
        return this;
    },
    
    ordinable: function() {
        for( var k in this.allcharts ) if( this.allcharts[k]._ordinable ) return true;
        return false;
    },
    
    changedata: function(_) {
        if (!arguments.length) return this._changedata;
        this._changedata = _;
    },    
    
    secondaxisAuto: function(_) {
        if (!arguments.length) return this.__secondaxisAuto;
        this._secondaxisAuto = _;
        return this; 
    },
    
    elementclick: function(_) {
        if (!arguments.length) return this._elementclick;
        this._elementclick = _;
    },
    
    resize: function(_) {
        if (!arguments.length) return this._resize;
        this._resize = _;
        var t = this;
        if( this._resize ) cd.utils.windowResize(function() {
            t._initial = true;
            t.display(null, 'resize');
        }, false);
        else cd.utils.windowResize(function() { }, true);
    },
    
    initial: function(_) {
    	if (!arguments.length) return this._initial;
	    this._initial = _;
	    for( var k in this.charts ) for( var k2 in this.charts[k] ) this.charts[k][k2].initial(_);
	    return this;
	},
	sxFormat: function(_) {
		if (!arguments.length) return this._sxFormat;
	    this._sxFormat = _;
	    return this;
	},
	syFormat: function(_) {
		if (!arguments.length) return this._syFormat;
	    this._syFormat = _;
	    return this;
	},
    syFormatSecond: function(_) {
    	if (!arguments.length) return this._syFormatSecond;
	    this._syFormatSecond = _;
	    return this;
	},
	color: function(_) {
		if (!arguments.length) return this._color;
	    this._color = _;
	    return this;
	},
	fullscreen: function(_) {
		if (!arguments.length) return this._fullscreen;
	    this._fullscreen = _;
        this.resize(this._fullscreen);
	    return this;
	},
    xDomainCustom: function(_) {
    	if (!arguments.length) return this._xDomainCustom;
	    this._xDomainCustom = _;
        if( this._xDomainCustom ) this.sxFormat( function(d) { return d; } );
        else this.sxFormat( d3.time.format('%b %e, %Y') );
	    return this;
	},
    bind: function(name, _) {
        for( var k in this.charts ) for( var k2 in this.charts[k] ) if(this.charts[k][k2][name]) this.charts[k][k2][name] = _;
    },

	style: function(_) {
        if (!arguments.length) return this._style;
		this._style = _;

		switch (this._style) {
			case 'normal':
				this.offset(false);
				this.order(false);
			break;
            case 'center':
            case 'extend':
			case 'stack':
				this.offset('zero');
                this.order('default');
				//this.order(this.state.ordinable() ? 'default' : 'reverse');
			break;
			case 'stream':
				this.offset('wiggle');
				this.order('default');
                //this.order('inside-out');
			break;
			case 'expand':
				this.offset('expand');
				this.order('default');
                //this.order(this.state.ordinable() ? 'default' : 'reverse');
			break;
		}

		return this;
	},
	
	order: function(_) {
		if (!arguments.length) return this._order;
		this._order = _;
		return this;
	},
	
	offset: function(_) {
		if (!arguments.length) return this._offset;
		this._offset = _;
		return this;
	},
    
    attached: function(_) {
        if (!arguments.length) return this._attached;
    	this._attached = _;
		return this;
    },
    
    nomargin: function(_) {
        this._margin = {top: 0, right: 0, bottom: 0, left: 0, xaxis: 0, yaxis: 0, space: 15, xleft: 0, xright: 0 };
    },
    

	
	dragging: function(_) {
		if (!arguments.length) return this._dragging;
	    this._dragging = _;
	    return this;
	},
    
    dragstart: function(elt) {
        if( this._vvover ) {
            this._dragging = true;
        }
        else {
            this._behavioring = false;
            this._dragging = false;
            if( this._showValueviewer === true ) this._vv.dragstart(elt);
            /*this._timeout = setTimeout(function() {
                if( !t._behavioring && t._showValueviewer ) {
                    t._touchtime = true;
                    t._dragging = true;
                    t._savedTranslateX = [t.behavior.translate()[0], t.behavior.translate()[1]];
                    t._savedScaleX = t.behavior.scale();
                    t._vv.dragstart(elt, pos);
                }
            }, 500);*/
        }
    },

    drag: function(elt) {
        this._dragging = true;
        if( this._showValueviewer === true && (this._dragging || this._vvover) ) this._vv.dragmove(elt);
        //else if( this._vv ) this._vv.clean(this.selection);
    },
    
    dragend: function(elt) {
        if( this._vvover ) {
            this._dragging = false;
            if( this._showValueviewer && this._vv ) this._vv.dragend(elt);
        }
        else {
            /*if( this._dragging && !this._behavioring ) {
                this.behavior.translate(this._savedTranslateX);
                this.behavior.scale(this._savedScaleX);
            }*/
            this._dragging = false;
            this._behavioring = false;
            //if( this._timeout ) clearTimeout(this._timeout);
            if( this._showValueviewer && this._vv ) this._vv.dragend(elt);
        }
    },

	initbehavior: function(container) {
		if( Object.keys(this.charts).length <= 0 || !this._useScroll && !this._useZoom ) return false;

		var t = this;
		this.behavior = cd.utils.zoom();

		if( !container ) container = this.selection;
		if( !container ) return this;

        var minzoom = (this._xDomainBehavior[1]-this._xDomainBehavior[0])/(this._xDomainReal[Math.min(this._limitDisplay ,this._xDomainReal.length-1)]-this._xDomainReal[0]);
        //console.log(minzoom,  (this._xDomainBehavior[1]-this._xDomainBehavior[0])/this.timedef(this._time).limit)
		if( this._useScroll && !this._useZoom ) this.behavior.scaleExtent([1,1]);
		else if( this._zoomLimit ) this.behavior.scaleExtent(this._zoomLimit);
		else if( this._timeinterval && this._timeinterval != 'semantic' ) this.behavior.scaleExtent( [1, (this._xDomainBehavior[1]-this._xDomainBehavior[0])/this.timedef(this._timeinterval).limit] );
		else if( this._time ) this.behavior.scaleExtent( [minzoom, (this._xDomainBehavior[1]-this._xDomainBehavior[0])/this.timedef(this._time).limit] );
		else this.behavior.scaleExtent( [1, (this._xDomainBehavior[1]-this._xDomainBehavior[0])/this.timedef('day').limit] );

		if( this._useXZoom || this._useXScroll ) this.behavior.x(this.sxBehavior); // act zoom on a copy of scale
		if( this._useYZoom || this._useYScroll ) this.behavior.y(this.sy);
		this.behavior.on('zoom', function() { t.refreshbehavior(container); } );
        
        /*if( this._translateX || this._scaleX ) {
            if( this._translateX ) this.behavior.translate([this._translateX, this.behavior.translate()[1]]);
            if( this._scaleX ) this.behavior.scale(this._scaleX);
        }*/
        
        this.initbehaviorview(container);
		this.semantize(true);
        
        this._initialbehavior = false;
	},
    
    initbehaviorview: function(container) {
        var t = this;
        
        container.select('.zoomWrap').call(this.behavior);
        if( t._showValueviewer ) {
            container.select('.zoomWrap')
                .on("touchstart", function() {
                    t._touches = d3.touches(this);
                    if( t._touches.length == 1 ) t.dragstart(this);
                    else {
                        t._vv._ready = false;
                        t._behavioring = true;
                    }
                })
                .on("touchmove", function() { 
                    t._touches = d3.touches(this);
                    if ( !t._behavioring && t._touches.length == 1 ) t.drag(this);
                    else {
                        t._vv._dragging = false;
                        t._vv._ready = false;
                        t._behavioring = true;
                    }
                })
                .on("touchend", function() {
                    if( t._touches.length == 1 ) t.dragend(this);
                    else t._vv.ready = false;
                    setTimeout(function() {
                        t._vv.ready = true;
                    }, 200)
                    t._behavioring = false;
                })
                .on("mousedown", function() { return t.dragstart(this); })
                .on("mouseenter", function() { return t.dragstart(this); })
                .on("mousemove", function() { return t.drag(this); })
                .on("mouseleave", function() { return t.dragend(this); })
                .on("mouseup", function() { return t.dragend(this);  })
        }
    },
    
    adapty: function() {
        var t = this;
        if( t._initial || !t._autoYAdapt ) return;
        if( t._timeoutzoom ) clearTimeout(t._timeoutzoom);
            t._timeoutzoom = setTimeout(function() {
                //t.initdomain();
                //if( t._behavioring ) return;
                // recalculte only y else, bad bad
                t.yborder(true);
                t.display(null, 'direct', 100);
        }, 400);
    },
	
	refreshbehavior: function(selection, xborder) {
		var t = this;
		var change = false; 

		// old version with hold // if( this._dragging ) return this;
        this._behavioring = true;

		if( this._useXZoom ) {
			change = this.semantize(true); // semantize first
            
            // -- check the domain before anything... axes
            var marginleft = t._margin.xleft,
                marginright = t._margin.xright;
            
            if( xborder ) {
                this.behavior.xgoto(xborder);
                this._translateX = this.behavior.translate()[0];
            }
            else {
                if( this.behavior.translate()[0] <= 0) {
                    var width = 0;
                    //selection.each(function(data) {  width = (t._width  || parseInt(d3.select(this).style('width')) || 960) - marginleft - marginright; });
                    var width = this.behavior.x0().range()[1];
                    var totalwidth = width*this.behavior.scale(); // new
                    //console.log(width, this.behavior.x0().range()[1])
                    var translate = this.behavior.translate()[0]; ///this.behavior.scale();
                    //console.log(totalwidth, translate, width, totalwidth + translate)
                    if( totalwidth + translate < width ) {
                        this.behavior.translate()[0] = -totalwidth+width;
                        this._translateX = -totalwidth+width;
                    }
                    else this._translateX = this.behavior.translate()[0];
                }    
                else {
                    this._translateX = 0;
                    this.behavior.translate()[0] = 0;
                }
            }

            this.behavior.update();

            // -- for axes
        	var behaviordomain = [t.behavior.x().domain()[0].getTime()-t.timedef().interval/2, t.behavior.x().domain()[1].getTime()];
			var newdomain = this._xDomainRoot.filter(function(d) { return (d>=behaviordomain[0] && d<=behaviordomain[1]); });
            //console.log(t.allseries, newdomain)
            this._xDomainReal = newdomain;
            
            // readapt series if too big
            for( var k in t.allseries ) {
                var serie = t.allseries[k];
                if( serie.savedvalues ) {
                    serie.values = serie.savedvalues.filter(function(d) { return (d.x>=behaviordomain[0] && d.x<=behaviordomain[1]); });
                    //if( serie.savedvalues.length > t._limitDisplay ) serie.values = serie.savedvalues.filter(function(d) { return (d.x>=behaviordomain[0] && d.x<=behaviordomain[1]); });
                    //else serie.values = serie.savedvalues;
                }
            }
            
            if( this._showValueviewer ) this._vv.sx.domain(newdomain);
            this._scaleX = this.behavior.scale();
            
            //selection.selectAll('.x.axis').selectAll('g').remove(); // fix bug on scale
            
            if( selection ) t.adapty();

			// -> For values
			//var realbehaviordomain = t.behavior.x().domain();
            //if( this._showTimeline ) this._tm.sx.domain(realbehaviordomain);
            //this._vv.dragmove();
		}
	
		if( this._useYZoom ) {
			this.sy.domain(this.behavior.y().domain());
			for( var k in this.charts ) for( var k2 in this.charts[k] ) this.charts[k][k2].yDomain(this.behavior.y().domain());
		}

		var t = this;
		if( this._showTimeline ) selection.each(function(data) {  d3.select(this).select(".brush").call(t._tm._brush.extent(t.behavior.x().domain())); });

		// decide if we anim the change or not
		if( !t._initial && selection ) { // avoid the loop...
            this.display(selection, 'zoom');
            if( this._attached ) this._attached.display(null, 'data');
            /*if( change ) {
    			
                if( this._showTimeline ) this._tm._brush.x(this.sxLinear);
    			//t.timeinterval(t._timeinterval, true, true);
    			//t.display(selection.transition().duration(800));
                // // update attached
    		}
    		else this.display(selection, 'zoom');*/
		}
        
		return this;
	},

	semantize: function(completed) {
		this.semantic(this._semantic); // recall if series added

		if( !this._semantic || !this.behavior || !this.allseries instanceof Array ) return false;

		var change = false;
		var domain = this.behavior.x().domain();
        
        var timedef = [];
        for( var key in this._timedef ) if( this._timedef[key].active ) timedef.push(this._timedef[key]);
        
        // begin by the year 
        timedef.reverse();
        var interval = domain[1]-domain[0];
        
        for( var key in timedef ) {
            if( interval > timedef[key].semantic ) {
                var name = timedef[key].name;
                var previous = this.aggreg()[1];
                this.aggreg([previous, name]);
                if( previous != name ) {
                    change = true;
                    this.timeinterval(name, true, completed);
                }
                break;
    		}
        }
    
		if( change ) this.initstyle();

		return change;
	},

	brush: function(selection, mode) {
        var t = this;
        if( selection ) t.selection = selection;
    	else selection = t.selection;
		
		if( !selection ) return t;
        
		var brushdomain = this._tm._brush.empty() ? this.sxPoints.domain() : this._tm._brush.extent();
		var domain = this._xDomainRoot.filter(function(d) { return (d>=brushdomain[0] && d<=brushdomain[1]); });
		var scale = 1;
		var translateX = -this.sxBehavior(domain[0])*scale;
		this.sxPoints.domain(domain);
		this.behavior.translate()[0] = translateX;
		this.behavior.scale(scale)
		this.behavior.x().domain(domain)

		/*for( var key in this.charts ) {
			var chart = this.charts[key];
			chart._translateX = translateX;
			chart._scaleX = scale;
			chart.xDomain(domain);
		}*/
		this.display(selection, 'timeline');
		var t = this;
		//selection.each(function(data) {  d3.select(this).select(".brush").call(t._tm._brush.extent(t.sxLinear.domain())); });		
	},
	
	translate: function( decal, set ) {
		if( set ) {
			if( this.behavior ) this.behavior.translate([decal, this.behavior.translate()[1]]);
			this._translateX = decal;
		}
		else {
			if( this.behavior ) this.behavior.translate([this.behavior.translate()[0]+decal, this.behavior.translate()[1]]);
			this._translateX += decal;
		}
	},

	zoom: function(scale) { 
		this._zoom = scale;

		// calculate new domain
		var domain = [new Date( this._xDomainBehavior[1].getTime() - (this._xDomainBehavior[1]-this._xDomainBehavior[0])/this._zoom ), this._xDomainBehavior[1] ];

		// set behavior
		var translateX = -this.sxBehavior(domain[0])*scale;
		this.behavior.translate()[0] = translateX;
		this.behavior.scale(scale);
		this.behavior.x().domain(domain);
		this.sxPoints.domain(domain);

		for( var k in this.charts ) for( var k2 in this.charts[k] ) {
			var chart = this.charts[k][k2];
			chart._translateX = translateX;
			chart._scaleX = scale;
			chart.xDomain(domain);
		}

		return this;
	},

	aggreg: function(_) {
		if (!arguments.length) return this._aggreg;
		this._aggreg = _;
		for( var key in this.allcharts ) this.allcharts[key].aggreg(this._aggreg);
		for( var k in this.charts ) for( var k2 in this.charts[k] ) this.charts[k][k2].aggreg(this._aggreg);
		return this;
	},
	semantic: function(_) {
		if (!arguments.length) return this._semantic;
		this._semantic = _;
        if( this._semantic ) {
            this._useScroll = true;
            this._useZoom = true;
        }
		for( var key in this.allcharts ) this.allcharts[key].semantic(this._semantic);
		for( var k in this.charts ) for( var k2 in this.charts[k] ) this.charts[k][k2].semantic(this._semantic);
	    return this;
	},


	// -- Mode functions
	mode: function (mode) {
		this.style(mode.toLowerCase());
		this.initstyle();
	},

    displaygraph: function(selection, mode) {
        var t = this;

    	if( !selection ) selection = this.selection;
        
        selection.each(function(data) {
    		var container = d3.select(this), that = this;
			
			var realWidth = (t._width  || parseInt(container.style('width')) || 960),
    			realHeight = (t._height || parseInt(container.style('height')) || 400),
				availableWidth =  realWidth - t._margin.left - t._margin.right;
				availableHeight = realHeight - t._margin.top - t._margin.bottom;
            
            //container.selectAll('.icons').remove()
			container.attr('transform','translate('+(- t._margin.left-5)+','+(45)+')scale(0.62)');
            var smax = .6;
            var smoy = .4;
        	var smin = .3;
        	var nbrows = 18;
            var graph = cd.iconsstyle;
        
        	function render(svg, json, num) {
        		var width = 128*smoy, height = 128*smoy;
                
                if( graph[num] && graph[num][2] ) return;
                
                var initpos = Math.floor(num/5)*5+1;
                var pos = num!=0 && (num%3 == 0 || num%4 == 0) ? Math.floor(num/5)*5+1 : num;
                var xpos = (num == 10 ? pos-3 : pos > 8 ? pos -4 : pos > 4 ? pos - 2 : pos)*width+width;
                var ypos = (num == 10 ? 1 : num == 0 || num == 6 ? 0 : num%3 == 0 ? -1 : num%4 == 0 ? 1 : 0 )*height+height/2;
                
        		var gMain = container.selectAll('.svg'+num).data([0]).enter().append('g')
                    //.attr('transform', 'translate(0,20)')
                    .append('g').attr('class', 'svg svg'+num)
                        .style('fill-opacity', .6).attr('transform', 'translate('+xpos+','+ypos+')');
        		var g = gMain.append('g').attr('class', 'icon').attr('transform', 'scale('+smin+')')
        		
        		gMain.append('rect')
        			.attr('x', 0).attr('y', 0)
        			.attr('width',width).attr('height',height)
        			.attr('fill', 'rgba(255,255,255,0)')
                    .style('border-radius', 4)
        			.attr('opacity', 0)
        			.attr('transform', 'translate(-'+width/2+',-'+height/2+')')
        			.on('mouseover', function() {
                        //d3.select(this).attr('fill', '#F1EEDC').attr('opacity', 1)
                        t._autoadaptation = false;
        				svg.select('g.svg'+num).selectAll('.icon').transition().duration(200).attr('transform', 'scale('+smax+')').style('fill-opacity', .3);
                        var type = graph[num][0];
                        var style = graph[num][1];
                        if( !t._lasttype && t.charts[0] && t.charts[0][type] ) {
                            t._lasttype = type;
                            t._laststyle = t._style;
                        }
                        if( !t._laststyle || !t._lasttype || t._lasttype != type  ) {
                            var allseries = t.allseries.map(function(d) { return d; });
                            //t.undisplay();
                            t._initial = true;
                            t._initialbehavior = false;
                            t.allcharts = [];
                            t.charts = [];
                            var chart = t.add(type, style, false);
                            for( var k in allseries ) {
                                allseries[k].chart(chart);
                                chart.addserie(allseries[k]);
                            }
                            t.display(null, 'animation');
                        }
                        else if( t._lasttype == type && t._laststyle != style ) {
                            t.mode(style);
                            t.display(null, 'animation');
                        }
                        t._lasttype = type;
                        t._laststyle = style;
        			})
        			.on('mouseout', function() {
                        //d3.select(this).attr('fill', 'rgba(255,255,255,0)').attr('opacity', 0)
        				svg.select('g.svg'+num).selectAll('.icon').transition().duration(200).attr('transform', 'scale('+smin+')').style('fill-opacity', .6);
        			})
        			.on('click', function() {
        				svg.select('g.svg'+num).selectAll('.icon').transition().duration(100).attr('transform', 'scale('+smin+')').style('fill-opacity', 1);
        			});
        			
        		append(g, json.g[num])
        	}
        
        	function append(g, obj) {
        		if( obj ) {
        			if( obj.g ) return append(g.append('g'), obj.g);
        			else if( obj.length > 0 ) for( var key in obj ) append(g, obj[key]);
        			else {
        				var objr = g.append(obj.type);
        				for( var key in obj ) objr.attr(key, obj[key]);
        			}
        		}
        		
        		return true;
        	}
        
            var json = cd.iconsrender('#535AA6','#E66305','#5F8B7F');
            var total = json.g.length;
            if( json.g ) for(var key in json.g) render(container, json, key);
        });
    },

	displaylegend: function(selection, mode) {
		var t = this;

		if( !selection ) selection = this.selection;

		selection.each(function(data) {
			var container = d3.select(this), that = this;
			
			var realWidth = (t._width  || parseInt(container.style('width')) || 960),
    			realHeight = (t._height || parseInt(container.style('height')) || 400),
				availableWidth =  realWidth - t._margin.left - t._margin.right;
				availableHeight = realHeight - t._margin.top - t._margin.bottom;
                
			var g = container.selectAll('g.wrap.chart');

			// size and position
			if( t.legend._autowidth === true ) t.legend.width(availableWidth);
			if( t.legend._autoheight === true ) t.legend.height(availableHeight);
			t.legend.display(g.select('.legendWrap').datum(t.allseries));
			
			g.select('.legendWrap').attr('transform', 'translate(0,' + (-t._margin.top) +')')
			
			t.legend.dispatch.on('legendClick', function(d,i) {
				// make it on the serie...
				d._disabled = !d._disabled;
				
				// reset when nothing is selected
				if (!t.allseries.filter(function(d) { return !d._disabled }).length) {
					t.allseries.map(function(d) {
						d._disabled = false;
						g.select('.legendWrap').selectAll('.series').classed('disabled', false);
						return d;
					});
				}
				
				t.initdata();
				t.displaylegend(container);
        		if( t._showValueviewer ) t._vv.display(container, 'zoom');
				t.display(container.transition().duration(t._duration));
			});
		});
		
		return this;
	},

	displaycontrol: function(selection, mode) {
		var t = this;
        
        if( this._showControl === false ) return;
        
		if( !selection ) selection = this.selection;

		selection.each(function(data) {
            
			var container = d3.select(this), that = this;

			var availableWidth =  (parseInt(container.style('width')) || 960) - t._margin.left - t._margin.right;
			var availableHeight = (parseInt(container.style('height')) || 400) - t._margin.top - t._margin.bottom;

			var g = container.selectAll('g.wrap.chart');

            var top = t._showLegend ?  t.legend._maxY+ 55 : 15;
            
            if( t._showData === true ) {
                if( t.controlData._autowidth === true ) t.controlData.width(availableWidth);
    		    if( t.controlData._autoheight === true ) t.controlData.height(availableHeight);
                
    			t.controlData.color(['#444', '#444', '#444', '#444', '#444', '#444']);
    			var controlWrap = g.select('.controlDataWrap').datum(t._controlData)
    			if(  !t.controlData._xpos && !t.controlData._ypos ) {
                    t.controlData._margin.top = top;
                    top += 35;
                    controlWrap.attr('transform', 'translate(0,' + (-t._margin.top) +')')
                }
                
                t.controlData.display(controlWrap);
    			
    			t.controlData.dispatch.on('legendClick', function(d,i) { 
    				if (!d._disabled) return;
    
    				t._controlData = t._controlData.map(function(s) {
    					s._disabled = true;
    					return s;
    				});
    				d._disabled = false;
    
    				t.mode(d.key);
    				
    				if( d.key.toLowerCase() != 'extend' ) t.display(container.transition().duration(t._duration));
                    else t.display(selection, mode);
    			});
            }
            
            // -- Time Controls
            if( t._showTime === true ) {
                if( t.controlTime._autowidth === true ) t.controlTime.width(availableWidth);
        	    if( t.controlTime._autoheight === true ) t.controlTime.height(availableHeight);
                
    			t.controlTime.color(['#444', '#444', '#444', '#444', '#444']);
    			var controlWrap = g.select('.controlTimeWrap').datum(t._controlTime)
                if(  !t.controlData._xpos && !t.controlData._ypos ) {
            		t.controlTime._margin.top = top;
                    top += 35;
                    controlWrap.attr('transform', 'translate(0,' + (-t._margin.top) +')')
                }
    			t.controlTime.display(controlWrap);
    			
    			t.controlTime.dispatch.on('legendClick', function(d,i) { 
    				if (!d._disabled) return;
    
    				t._controlTime = t._controlTime.map(function(s) {
    					s._disabled = true;
    					return s;
    				});
    				d._disabled = false;
    
    				// semantize all series (do nothing if already done)
    				for( var key in t.allseries ) t.allseries[key].semantize();
                    
                    t.timeinterval(d.key, false, true);
    				t.initial(true);
                    
    				t.display(container.transition().duration(t._duration));
    			});
            }
            
            // -- Action Controls
            if( t._showAction === true ) {
                if( t.controlAction._autowidth === true ) t.controlAction.width(availableWidth);
                if( t.controlAction._autoheight === true ) t.controlAction.height(availableHeight);
                
    			t.controlAction.color(['#444', '#444', '#444', '#444', '#444', '#444']);
    			t.controlAction._margin.top = top;
                top += 35;
    			var controlWrap = g.select('.controlActionWrap').datum(t._controlAction).attr('transform', 'translate(0,' + (-t._margin.top) +')')
    			t.controlAction.display(controlWrap);
    			/*controlWrap.selectAll('circle')
                    .style('stroke-width', 1) 
                    .attr('r', 6 ) 
                    .attr('transform', function(d,i) { return 'translate(-'+(t.controlAction.seriesWidths[i]/2)+',8)scale('+(t.controlAction.seriesWidths[i]/12)+',2)translate(10,0)' })*/
    			t.controlAction.dispatch.on('legendClick', function(d,i) {
    				d._disabled = true;
    				var key = d.key.toLowerCase();
    				t.state[key]( !t.state[key]() );
    				//t.initdomain();
    				//t.display(container.transition().duration(t._duration));
    			});
            }
		});
		
		return this;
	},
	
	showLegend: function(_) {
		if (!arguments.length) return this._showLegend;
		this._showLegend = _;
		return this;
	},
	showControl: function(_) {
		if (!arguments.length) return this._showControl;
		this._showControl = _;
		return this;
	},
    showTime: function(_) {
    	if (!arguments.length) return this._showTime;
		this._showTime = _;
        if( this._showTime ) {
            this._controlTime = this._timedef.filter(function(d) { return d.active; }).map(function(d) {
                return { key: capitalize(d.name), _disabled: true };
            }).reverse();
            if( this._semantic ) this._controlTime = [{ key: 'Semantic', _disabled: false }].concat(this._controlTime);
            this.controlTime = new Legend();
        }
		return this;
	},
    showData: function(_) {
        if (!arguments.length) return this._showData;
		this._showData = _;
		return this;
	},
    showGraph: function(_) {
        if (!arguments.length) return this._showGraph;
    	this._showGraph = _;
		return this;
	},
	showTooltip: function(_) {
		if (!arguments.length) return this._showTooltip;
	    this._showTooltip = _;
	    return this;
	},
    
	showTimeline: function(_) {
		if (!arguments.length) return this._showTimeline;
	    this._showTimeline = _;
	    if( this._showTimeline ) {
	    	this._tm = new Timeline(this, this._width, this._height);
			this.tmRatioHeight(5);
			this._tm.sy = this.sy.copy();
			this._tm.sx = this.sxPoints.copy();
	    }
	    else {
	    	d3.selectAll('.timeline').remove();
	    }
	    return this;
	},
	showValueviewer: function(_) {
		if (!arguments.length) return this._showValueviewer;
	    this._showValueviewer = _;
	    if( this._showValueviewer ) {
	    	this._vv = new ValueViewer(this, this._width, this._height);
			this._vv.sy = this.sy.copy();
			this._vv.sx = this.sxPoints.copy();
	    }
	    else {
	    	d3.selectAll('.valueviewer').remove();
	    }
	    return this;
	},
	tmRatioHeight: function(_) {
		if (!arguments.length) return this._tmRatioHeight;
	    this._tmRatioHeight = _;
	    if( this._tm ) this._tm._ratioHeight = this._tmRatioHeight;
	    return this;
	},
    updaterange: function(container, availableWidth, availableHeight, initial) {
        var t = this;
        
        // detect horizontal charts
        var horizontal = false;
    	for( var key in t.charts ) if( t.charts[key]._type == 'Hbar' ) horizontal = true;
            
        // -- Init Behavior
		if( horizontal ) {
			t.xAxis.orient('left');
			t.yAxis.orient('bottom');
			t.sy.range([0,availableWidth]);
			if( t.sySecond ) t.sySecond.range([availableWidth, 0]); // y scale universal
			var rangeBands = [0, availableHeight*t._scaleX];
		}
		else {
            var space = t._margin.space ? t._margin.space : 0;
			t.sy.range([availableHeight, space]); // y scale universal
			if( t.sySecond ) t.sySecond.range([availableHeight, space]); // y scale universal
			var rangeBands = [0, availableWidth*t._scaleX];
		}
        
        var padding = t._padding*2; //*(t._xDomainReal.length/80);

		t.sxBands.rangeBands(rangeBands, padding, 0); // scale for bar chart, with range bands
		//t.sxBehavior.range([rangeBands[0], rangeBands[1]+t._padding*(availableWidth/t._xDomain.length)]); // scale for zoom
		t.sxBehavior.range([0, availableWidth*t._scaleX]);
		t.sxBehavior.domain(t._xDomainBehavior);
        t.sxLinear.range([rangeBands[0], rangeBands[1]]);
        //t.sxLinear.domain(t._xDomainBehavior);
        var rangePoints = [rangeBands[0]+t.sxBands.rangeBand()/2, rangeBands[1]-t.sxBands.rangeBand()/2];
		t.sxLinear2.range(t.state.ordinable() ? [rangeBands[0], rangeBands[1]] : rangePoints);
        //t.sxLinearAxis.domain([0, t._xDomainRoot.length]);
		t.sxLinearAxis.range([rangeBands[0]+t.sxBands.rangeBand()/2, rangeBands[1]-t.sxBands.rangeBand()/2]);
		//t.sxPoints.rangePoints(rangePoints); // scale for normal graph (line, area, ...)
        
        if( initial && t._initial ) {
        	t.initialRangeBand = t.sxBands.rangeBand();
            if( t._semantic ) t.semantize(true);
			if( t._initialbehavior ) t.initbehavior(container); // init the zooms
            else t.initbehaviorview(container);
			if( t._semantic ) t.initdata();
            // recal the view
            if( t._inittime ) {
                var nextlevel = this._timedef[0].interval;
                for( var key in this._timedef ) {
                    if( this._timedef[key].name == this._time ) {
                        nextlevel = this._timedef[++key].interval;
                        break;
                    }
                }
                if( t.behavior ) t.behavior.x0().range([0, availableWidth]); // fix original scale
                t.refreshbehavior(container, [new Date(t._xDomainBehavior[1].getTime()-nextlevel), t._xDomainBehavior[1]])
                var rangeBands = [0, availableWidth*t._scaleX];
                t.sxBands.rangeBands(rangeBands, padding, 0); // scale for bar chart, with range bands
                t.sxBehavior.range([0, availableWidth*t._scaleX]);
                t.sxBehavior.domain(t._xDomainBehavior);
                t.sxLinear.range([rangeBands[0], rangeBands[1]]);
                var rangePoints = [rangeBands[0]+t.sxBands.rangeBand()/2, rangeBands[1]-t.sxBands.rangeBand()/2];
                t.sxLinear2.range(t.state.ordinable() ? [rangeBands[0], rangeBands[1]] : rangePoints);
                t.sxLinearAxis.range([rangeBands[0]+t.sxBands.rangeBand()/2, rangeBands[1]-t.sxBands.rangeBand()/2]);
                t.yborder(true);
            }
		}
        if( t.behavior ) t.behavior.x0().range([0, availableWidth]);

        // because of init
		t.sxPoints.rangePoints([rangeBands[0]+t.sxBands.rangeBand()/2, rangeBands[1]-t.sxBands.rangeBand()/2]); // scale for normal graph (line, area, ...)
    },

	addone: function(r) {
		if( !r.serie ) throw "no serie?";

		return this.addserie(r.serie);
	},

	// -- Data Part
	addall: function(exp) {
		if( !exp ) throw "no exploration ?";
        
        if( exp.exploration ) exp = exp.exploration;
        
        if( exp.margin ) for( var k in exp.margin ) this._margin[k] = exp.margin[k];
        
        if( exp.showlegend === true ) this._showLegend = true;
        else if( exp.showlegend === false ) this._showLegend = false;
        
        if( exp.showcontrol === true ) {
            this._showData = true;
            this._showControl = true;
        }
        else if( exp.showcontrol === false ) {
            this._showData = false;
            this._showControl = false;
        }
        
        if( exp.showtooltip === true ) this._showTooltip = true;
        else if( exp.showtooltip === false ) this._showTooltip = false;
        
        if( exp.secondaxisauto === true ) this._secondaxisAuto = true;
        else if( exp.secondaxisauto === false ) this._secondaxisAuto = false;
        
        if( exp.autoyadjust === true ) this._autoYAdjust = true;
        else if( exp.autoyadjust === false ) this._autoYAdjust = false;
        
        if( exp.showxaxis === true ) this._showXAxis = true;
        else if( exp.showxaxis === false ) this._showXAxis = false;
        
        if( exp.showyaxis === true ) this._showYAxis = true;
        else if( exp.showyaxis === false ) this._showYAxis = false;
        
        if( exp.semantic === true ) this.semantic(true);
        else if( exp.semantic === false ) 
        
        if( exp.valueviewer === true ) this.showValueviewer(true);
        else if( exp.valueviewer === false ) this.showValueviewer(false);
        
        if( exp.timeline === true ) this.showTimeline(true);
        
        if( exp.fullscreen === true ) this._fullscreen = true;
        else if( exp.fullscreen === false ) this._fullscreen = false;
        
        if( exp.autoadaptation === true ) this._autoadaptation = true;
        else if( exp.autoadaptation === false ) this._autoadaptation = false;
        
        if( exp.resize === true ) this.resize(true);
        else if( exp.resize === false ) this.resize(false);
        //else this.showTimeline(false);
        
        if( exp.time ) this.time(exp.time);
        
        // at the end, erase all
        if( exp.ipad ) {
            if( exp.ipad !== true) {
                var t = this
                this.state.event(function(json) {
                    if( t.state.ipad ) {
                        var array = JSON.stringify(json);
                        var url = 'http://'+t.state.ipad+'/?event='+ encodeURIComponent(array);
                        window.location.href = url; 
                    }
                });
            }
            this.state.ipad = exp.ipad;
            this.semantic(false);
            this.showValueviewer(true);
            
            this._showTooltip = false;
            this._secondaxisAuto = false;
            this._fullscreen = true;
            this._showLegend = false;
            this._autoYAdjust = false;
            this._showYAxis = true;
            this._showXAxis = true;
            
            this._margin.top = 15;
            this._margin.left = 0;
            this._margin.right = 0;
            this._margin.bottom = 44;
            this._margin.xaxis = 20;
            this._margin.yaxis = 0;
            this._margin.yaxisdecalleft = 16;
            this._margin.yaxisdecalright = 16;
            this._margin.yaxispos = 'inside';
            this._nbyticks = 3;
        }
        
        //if( exp.element ) this._element = exp.element;
        if( exp.element ) {
            this._element = exp.element;
            this.display(d3.select('#'+exp.element));
        }
        
		var ids = [];
		
        if( exp.chart ) ids = d3.merge(ids, this.addserie(exp.chart));
        if( exp.serie ) ids = d3.merge(ids, this.addserie(exp.serie));
        if( exp.series ) for( var key in exp.series ) ids = d3.merge(ids, this.addserie(exp.series[key]));
        if( exp.charts ) for( var key in exp.charts ) ids = d3.merge(ids, this.addserie(exp.charts[key]));
        
        if( exp.style  ) this.mode(exp.style);
        else if( exp.mode ) this.mode(exp.mode);
	},

	addserie: function(s, duration) {
        //console.log(s)
		if( !s.rows && !s.timestamps ) throw "no rows?";
		else if( !s.data ) throw "no data?";
		
		var metric = s.metric ? s.metric : '',
			rows = s.timestamps ? s.timestamps : s.rows,
			data = s.data;

		var type = s.type ? s.type : 'Bar';
        var secondaxis = s.secondaxis ? s.secondaxis : false;
        var disabled = s.disabled ? s.disabled : false;
        var aggregation = s.aggregation ? s.aggregation : false;
		var dates = rows.map(function(d) { return typeof d == 'string' ? d : new Date(d); });
        //if( typeof dates[0] == 'string' ) this.state.ordinable(false);
		var ids = [];
        
		var now = Date.now();

		for( var i=0; i < data.length; i++ ) {
			// concat data end dates
			var serie,
                id = (s.ids && s.ids[i]) ? s.ids[i] : s.id ? s.id : false,
				values = [],
				futurevalues = [],
				color = (s.colors && s.colors[i]) ? s.colors[i] : this.state.getcolor(),
				dimension = (s.cols && s.cols[i]) ? s.cols[i] : [];

			for( var j=0; j<data[i].length; j++ ) {
				if( dates[j] > now ) futurevalues.push( {x: dates[j], y: data[i][j]} );
				else
				    values.push({ x: dates[j], y: data[i][j] });
			}
            
            var chart = this.add(type, s.style);
			serie = new Serie(chart, metric, dimension, values, color, 'normal', this._semantic);
            if( id ) serie.id(id);
            if (!serie._color || serie._color == 'black') serie.color(/*this.state.getcolor()*/"#1f77b4");
            if( s.time ) this.time(s.time);
            if( this._semantic && serie.semantize ) serie.semantize();
            if( secondaxis ) serie._secondaxis = true;
            if( disabled ) serie._disabled = true;
            if( aggregation ) {
                serie._aggregation = aggregation;
                serie.semantize();
            }
			ids.push(serie.id());
			chart.addserie(serie);

			if( futurevalues.length > 0 ) {
				// join the last value
				futurevalues.unshift(values[values.length-1]) 
				// add the serie
				fserie = new Serie(chart, metric+' Predicted', dimension, futurevalues);
				fserie.style('dotted').predicted(true).color("#d62728");
				if( id ) fserie.id(id+'_predicted');
				ids.push(fserie.id());
				chart.addserie(fserie);
			}
		}
        
        
        /* no display in addserie now, see state.js
        if( !this._initial ) {
            this.initdata();

            //var savedduration = chart._duration;
            //chart._duration = duration;
            this.display(null);
            //chart._duration = savedduration;
		}*/

		return ids;
	},
    
    create: function( type, num ) {
        // Look for this type...
    	var chart = null;
    	
		for( var key in this.allcharts ) {
			if(this.allcharts[key]._type == type) chart = this.allcharts[key];
		}

        if( !chart || num >= 0 ) {
    		switch(type) {
				// -- Normal Type
				case 'Area':
					chart = new Area(this);
				break;
				case 'Bar':
					chart = new Bar(this);
				break;
				case 'Hbar':
					chart = new Hbar(this);
				break;
				case 'Line':
					chart = new Line(this);
				break;
				case 'Scatter':
					chart = new Scatter(this);
				break;
                case 'Value':
    				chart = new Value(this);
				break;
                case 'Arealine':
        			chart = new Arealine(this);
				break;


				// -- Accumulative Type
                case 'Pie':
    				chart = new Pie(this);
				break;
                case 'Donut':
    				chart = new Donut(this);
				break;
                case 'Treemap':
    				chart = new Treemap(this);
				break;
                case 'Weather':
					chart = new Weather(this);
				break;
				case 'Punchcard':
					chart = new Punchcard(this);
				break;
                case 'Gauge':
    				chart = new Gauge(this);
				break;
				case 'Stacked':
					chart = new Stacked(this);
				break;
                case 'Background':
    				chart = new Background(this);
				break;
			}

            if( num >= 0 ) {
                if( this.charts[num] ) this.charts[num][type] = chart;
                else {
                    this.charts[num] = {};
                    this.charts[num][type] = chart;
                }
            }
			else this.allcharts[type] = chart;
		}
		
        return chart;
    },
	// -- Data Part
	add: function(type, style, newone) {
		// -- Add axe
		if( !type ) type = 'Bar'; // by default
        
		// -- Handle state
		if( ! this.state.isallowed(type) ) throw "type: "+type+" is not allowed";
		else this.state.add(type);
        
        var chart = this.create(type);
        if( style ) this.style(style);

		return chart;
	},
    
	remove: function (s) {
        for (var type in this.allcharts) {
            for (var key in this.allcharts[type].series) {
                if (s == this.allcharts[type].series[key]) {
                    this.allcharts[type].removeserie(s);
                    this.initdata();
                    this.display();
                    if( this.allcharts[type].series.length == 0 ) delete this.chart[type];
					return true;
				}
			}
		}
		return false; // not found
	},
    
	getid: function(id) {
		for (var type in this.allcharts) for (var key in this.allcharts[type].series) if (id == this.allcharts[type].series[key]._id) return this.allcharts[type].series[key];
        return false;
	},
    
    getids: function(ids) {
        var series = [], num;
    	for (var type in this.allcharts) {
            for (var key in this.allcharts[type].series) {
                for ( var num in ids ) if( ids[num] == this.allcharts[type].series[key]._id ) series.push(this.allcharts[type].series[key]);
            }
    	}
        return series;
	},
    
    removeid: function(id) {
        for (var type in this.allcharts) {
            for (var key in this.allcharts[type].series) {
                if (id == this.allcharts[type].series[key]._id) {
                    this.allcharts[type].removeserie(this.allcharts[type].series[key]);
                    //this.initdata();
                    //this.display();
                    if (this.allcharts[type].series.length == 0) delete this.allcharts[type];
                    //else this.display();
                    return true;
                }
            }
        }
        return false;
    },
    //mohamed
    disableidWithOutDraw: function (id, bool) {
        for (var key in this.allseries) {
            if (this.allseries[key]._id == id) {
                this.allseries[key].disabled(bool);
                return true;
            }
        }
        return false;
    },
    disableid: function(id, bool) {
		for( var key in this.allseries ) {
			if( this.allseries[key]._id == id ) {
			    this.allseries[key].disabled(bool);
			    this.initdata();
				this.display();
				return true;
			}
		}
		return false;
	},
    disablekey: function(key, bool) { // bug fixed by Guillaume :)
    	for( var k in this.allseries ) {
			if( this.allseries[k].key == key ) {
			    this.allseries[k].disabled(bool);
			    this.initdata();
				this.display();
				return true;
			}
		}
		return false;
	},
	disablekeys: function(keys, bool) {
		var b = false;
		for(var key in keys) { // perf ? how to optimize better ? js guru somewhere ?
		for( var k in this.allseries ) {
		  if( this.allseries[k].key == keys[key] ) 
		  {
		    this.allseries[k].disabled(bool);
		    this.initdata();
		    b = true;
		  }
		}
		}
      	if(b == true) { this.display(); }
    	return b;
    },
	removeall: function() {
	    this.allcharts = [];
	    this.charts = [];
	    if( this.selection ) this.selection.selectAll('g.wrap.chart').remove();
		else d3.selectAll('g.wrap.chart').remove();
	},
	
	initdata: function() {
		// reconcat all series for legend and domain things
		this.allseries = [];
		for( var key in this.allcharts ) for( var key2 in this.allcharts[key].series ) this.allseries.push(this.allcharts[key].series[key2]);
		// switch to originalvalues
        for( var key in this.allseries ) this.allseries[key].values = this.allseries[key].originalvalues;
        if( this._semantic ) this.timeinterval(this._timeinterval, true);
        this.initdomain(); // add second axe
        
        // clean series
        for( var k in this.charts ) for( var k2 in this.charts[k] ) this.charts[k][k2].series = [];
        
        for( var key in this.allcharts ) { // separate series
            var type = this.allcharts[key]._type;
            for( var key2 in this.allcharts[key].series ) {
                var serie = this.allcharts[key].series[key2];
                if( serie._secondaxis ) {
                    if( !this.charts[1] ) this.charts[1] = {};
                    if( !this.charts[1][type] ) this.charts[1][type] = this.create(type, 1);
                    this.charts[1][type]._gnum = 1;
                    this.charts[1][type].addserie(serie);
                }
                else {
                    if( !this.charts[0] ) this.charts[0] = {};
                    if( !this.charts[0][type] ) this.charts[0][type] = this.create(type, 0);
                    this.charts[0][type]._gnum = 0;
                    this.charts[0][type].addserie(serie);
                }
            }
        }
        
        this.initstyle(); // init style
	},

	initdomain: function() {
		if( this.allseries.length <= 0 ) return false;

		var allseries = this.allseries;
		var borderMain = ( this.state.predict() ) ? allseries : allseries.filter(function(d) { return !d._predicted && d._domained });
		borderMain = borderMain.filter(function(d) {return !d._disabled})
        
        // -- xLimits
        var border = borderMain.map(function(d) { return d.values.map(function(d,i) { return { x: d.x, y: d.y  } }) });
        
        if( borderMain.length && borderMain[0].values && typeof borderMain[0].values[0].x == 'string' ) {
            // string serie
            var xLimit =  [0, borderMain[0].values.length];
            var xValues = borderMain[0].values.map(function(d) { return d.x } );
	    	
            this._xDomainCustom = xValues;
        }
        else {
            // number serie
            var xLimit = d3.extent(d3.merge(border).map(function(d) { return d.x }));

            if( !this._time ) { //  || this._initial
                // -- try to detect the granularity
                if( this.allseries[0].savedvalues[1] ) {
                    var diff = this.allseries[0].savedvalues[1].x.getTime() - this.allseries[0].savedvalues[0].x.getTime();
                    for( var key in this._timedef ) {
                        var td = this._timedef[key];
                        if( td.active && diff <= td.interval ) {
                            this._time = td.name;
                            this.sxFormat( td.format );
                            break;
                        }
                    }
                }
            }
            
            // -- try to recompose discret value from the time scale
            var xDomainValues = [];
    		var xVal = xLimit[0];
			while( xVal <= xLimit[1] ) {
				xDomainValues.push( xVal );
				xVal = this.timedef(this._time).add( xVal, 1 );
			}
            
            // -- reformat the serie adding missing values
            // fix bug, readaptation of points
            for( var key in this.allcharts ) {
                this.allcharts[key].series.filter(function(d) { return !d._disabled; }).map(function(serie, i) {
                    if( serie.savedvalues.length < xDomainValues.length ) {
                        var dates = serie.savedvalues.map(function(d) { return d.x.getTime(); });
                        var diff = xDomainValues.map(function(d) { return d.getTime(); }).filter(function(i) {return !(dates.indexOf(i) > -1);}).map(function(d) { return { x: new Date(d), y: 0 } });
                        serie.savedvalues = serie.savedvalues.concat(diff)
                        serie.savedvalues = serie.savedvalues.sort(function(a, b) { return a.x - b.x; })
                    }
                });
            }
            
            /*var first = this.allseries[0].values; // first as reference
            if( xDomainValues.length > first.length ) xValues = xDomainValues;
            else xValues = first.map(function(d) { return d.x } );*/
            xValues = xDomainValues;
            xLimit = d3.extent(xDomainValues);
        }
    	
        // -- x Limits
        this._xDomainBehavior = xLimit;
    	this._xDomainBehavior2 = [xLimit[0], xLimit[1]];
        if( borderMain.length && borderMain[0].values && typeof borderMain[0].values[0].x != 'string' ) {
            this._xDomainBehavior[1] = this.timedef(this._time).add(this._xDomainBehavior[1]); // add the last part for continue space
    		this._xDomainBehavior2[1] = this.timedef(this._time).add(this._xDomainBehavior2[1]); // add the last part for continue space
        }
		
		this._xDomainRoot = xValues.map(function(d) { return d; });
		this._xDomainReal = xValues.map(function(d) { return d; });
		this._xDomain = xValues; // current domain
        
        // -- y Limits
		var yLimit = d3.extent(d3.merge(border).map(function(d) { return d.y } ));
        var minmaxs = border.map(function(d) { return d3.extent(d.map(function(d) { return d.y})); } );
        
        var diff = yLimit[1]*(1-.02);
        var yminmaxSecond = [];
        var yLimitSecond = [yLimit[0], yLimit[1]];
        var newminmaxs = [];
        for( var key in minmaxs ) {
            var max = minmaxs[key][1];
            var decal = 1;
            if( this._secondaxisAuto && yLimitSecond[1]-max > diff || borderMain[key]._secondaxis === true ) {
                // second axe
                yminmaxSecond.push(minmaxs[key]);
                borderMain[key]._secondaxis = true;
                //yLimitSecond = d3.extent(d3.merge(yminmaxSecond));
            }
            else newminmaxs.push(minmaxs[key]);
        }
		var yminmax = d3.merge(newminmaxs);
        if( this._forceMinY !== false ) {
            yminmaxSecond = yminmaxSecond.filter( function(d) { return d > [this._forceMinY]; } );
            yminmax = yminmax.filter( function(d) { return d > [this._forceMinY]; } );
        }
        if( this._forceMaxY !== false ) yminmax = yminmax.concat( [this._forceMaxY] );
        this._yDomain = d3.extent(yminmax);
        this._yDomainSecond = d3.extent(d3.merge(yminmaxSecond));
        if( this._adjustMinY !== false ) {
            var adjust = (this._yDomain[1] - this._yDomain[0])*this._adjustMinY;
            if( this._yDomain[0] - adjust > 0 ) this._yDomain[0] = this._yDomain[0] - adjust;
        }
        
        // -- Behavior & axes
		if( this._initial ) this.sxBehavior.domain(this._xDomainBehavior);
		this.sxLinear.domain(this._xDomainBehavior);
		this.sxLinear2.domain(this._xDomainBehavior2);
		this.sxLinearAxis.domain([0, this._xDomain.length-1]);
		this.sxPoints.domain(this._xDomain);
		this.sxBands.domain(this._xDomain);
		this.sy.domain(this._yDomainForced || this._yDomain);
        if( this.sySecond && this._yDomainSecond.length > 0 ) {
            this._sysecondaxis = true;
            this.sySecond.domain(this._yDomainSecond);
        }

		if( this._showValueviewer ) this._vv.sx.domain(this._xDomainRoot);

		if( this._showTimeline ) {
			this._tm.sx.domain(this._xDomainBehavior);
			this._tm.sxBands.domain(this._xDomain);
			this._tm.sxPoints.domain(this._xDomain);
			this._tm.sy.domain(this._yDomain);
            //this._tm._brush.x().domain(this._xDomainRoot);
            //this._tm._brush.domain(this._yDomain);
		}
	},

	initstyle: function(style) {
		if( !this.allseries || this.allseries.length <= 0 ) return false;
        
		if( style ) {
            style = style.toLowerCase();
            this._style = style;
		} 
        else style = this._style;
        
		var t = this;
        
        var max = 0;
		for( var key in this.allcharts ) { // not this.allseries because of d.series from 0 for each chart
			var stackable = !!this.allcharts[key]._stackable;
            if( this.allcharts[key]._sumed ) {
                this.allcharts[key]._centered = true;
                this.allcharts[key].savedvalues.filter(function(d) { return !d._disabled; }).map(function(serie, i) {
                    var total = d3.sum(serie.savedvalues.map(function(d) { return d.y; }));
                    serie.savedvalues = [{x: new Date(0), y: total, stackedY: total, index: 0, series: i, }];
                    serie._num = i;
                    serie._localmax = total;
                    serie._stackable = stackable;
                    return serie;
                });
            }
            else {
                //var values = [];
                //if( t._xDomainRoot.length > t._limitDisplay ) values = t._xDomainReal;
                //else values = t._xDomainRoot;
                
                this.allcharts[key].series.filter(function(d) { return !d._disabled; }).map(function(serie, i) {
                    var localmax = d3.max(serie.savedvalues.map(function(d) { return d.y; }));
                    max += localmax;
                    
        			serie.savedvalues = serie.savedvalues.map(function(d, j) {
                        // -- to fix different range on x
                        if( serie.savedvalues[j] ) d = serie.savedvalues[j];
                        else d.y = 0;
                        d.display = {y: d.y, y0: 0};
                        d.index = j;
    					d.series = i;
                        d.stackedY = (serie._disabled) ? 0 : d.y;
                        if( t._style == 'extend' ) d.decaly0 = max-localmax+(localmax-d.y)/2;
                        return d;
    				})
                    
                    serie._num = i;
                    serie._localmax = localmax;
                    serie._stackable = stackable; //t.allcharts[key].type() == 'Area' ? false : 
    				return serie;
    			});
            }
		}
        
        for ( var k=0; k<2; k++ ) { // sorry it's ugly
            if( k == 0 ) {
                var allseries = this.allseries.filter(function(d) { return d._stackable && !d._secondaxis && !d._disabled; });
                var sy = t.sy;
            }
            else {
                var allseries = this.allseries.filter(function(d) { return d._stackable && d._secondaxis && !d._disabled; });
                var sy = t.sySecond;
            }
            
            // for no stackable series
            if( allseries.length == 0 ) continue;
            
            //var otherseries = ( k == 0 ) ? this.allseries.filter(function(d) { return !d._stackable && !d._secondaxis && !d._disabled; })
            //                : this.allseries.filter(function(d) { return !d._stackable && d._secondaxis && !d._disabled; });
            
        	allseries = d3.layout.stack()
                .order(t._order)
                .offset(t._offset)
                .values(function(d) { return d.savedvalues })
                .x(function(d) { return d.x; })
                .y(function(d) { return d.stackedY != undefined ? d.stackedY : 0 })
                .out(function(d, y0, y) {
                    d.display = { y: y, y0: ( t._style == 'extend' ) ? d.decaly0 : y0 }; // (extend ? d.extendY-y/2 :
                })
    			(allseries);
        }
        
        t.yborder(true);
	},
    
    yborder: function(force) {
        var t = this;

        var yDomain = t._yDomain
        var sy = t.sy
        var allseries = t.allseries
        var seriesdata = allseries.filter(function(d) { return !d._secondaxis && !d._disabled; }).map(function(serie) {
            var values = serie.values;
            serie.values.map(function(d,i) { return { x: d.x, y: d.display.y, y0: serie._stackable ? d.display.y0 : 0 }; });
            return values;
        });
		var mergeddata = d3.merge(seriesdata);
        
        if( t._style == 'expand' ) sy.domain( [0,1] );
        else { 
            var border = d3.extent(mergeddata.map(function(d,i) { return d.display.y + (t._style != 'normal' && t._style != 'center' ? d.display.y0 : 0) }));
            
            /*var otherborder = d3.extent(d3.merge(seriesdata.map(function (d) { return d.values; })).map(function (d) { return d.y; }));
            if( otherborder[0] < border[0] ) border[0] = otherborder[0];
            else if( otherborder[1] > border[1] ) border[1] = otherborder[1];*/

            // min domain
            if( t._adjustMinY !== false && t._style != 'stream' ) {
                var adjust = (border[1]-border[0])*t._adjustMinY;
                if( border[0] - adjust > 0 ) border[0] = forceymin = border[0] - adjust;
            }
            else if( t._forceMinY !== false ) {
                border.filter( function(d) { return d.y < t._forceMinY; } );
                border[0] = forceymin = t._forceMinY;
            }
            
            t._yMax = d3.max( mergeddata.map(function(d,i) { return d.y; }) );
            
            if( !force ) {
                if( yDomain[0] < border[0] ) border[0] = yDomain[0];
                if( yDomain[1] > border[1] ) border[1] = yDomain[1];
            }
            
            sy.domain( border ) // this._yDomainForced || 
        }
        
        var yDomain = t._yDomainSecond
        var sy = t.sySecond
        var allseries = t.allseries
        var seriesdata = allseries.filter(function(d) { return d._secondaxis && !d._disabled; }).map(function(d) {
            var values = d.values;
            d.values.map(function(d,i) { return { x: d.x, y: d.display.y, y0: d.display.y0 }; });
            return values;
        });
        var mergeddata = d3.merge(seriesdata);
        
        if( t.sySecond && t._yDomainSecond && seriesdata.length > 0 ) {
            
            if( t._style == 'expand' ) sy.domain( [0,1] );
            else { 
                var border = d3.extent(mergeddata.map(function(d,i) { return d.display.y + (t._style != 'normal' && t._style != 'center' ? d.display.y0 : 0) }));
                
                /*var otherborder = d3.extent(d3.merge(seriesdata.map(function (d) { return d.values; })).map(function (d) { return d.y; }));
                if( otherborder[0] < border[0] ) border[0] = otherborder[0];
                else if( otherborder[1] > border[1] ) border[1] = otherborder[1];*/
    
                // min domain
                if( t._adjustMinY !== false && t._style != 'stream' ) {
                    var adjust = (border[1]-border[0])*t._adjustMinY;
                    if( border[0] - adjust > 0 ) border[0] = forceymin = border[0] - adjust;
                }
                else if( t._forceMinY !== false ) {
                    border.filter( function(d) { return d.y < t._forceMinY; } );
                    border[0] = forceymin = t._forceMinY;
                }
                
                t._yMax = d3.max( mergeddata.map(function(d,i) { return d.y; }) );
                
                if( !force ) {
                    if( yDomain[0] < border[0] ) border[0] = yDomain[0];
                    if( yDomain[1] > border[1] ) border[1] = yDomain[1];
                }
                
                sy.domain( border ) // this._yDomainForced || 
            }
        }
        
        return this;
    },

	timeformat: function(format, domain) { // for date format
		this._time = format;
        var td = this.timedef(format);
		if( td ) {
            this.sxFormat( td.format );
			this.sxInterval = td.interval;
			if(domain && !this._initial) this.initdomain();
			if( this.behavior ) {
				if( this._semantic ) this.behavior.scaleExtent( [1, (this._xDomainBehavior[1]-this._xDomainBehavior[0])/this.timedef('day').limit] );
				else this.behavior.scaleExtent( [1, (this._xDomainBehavior[1]-this._xDomainBehavior[0])/td.limit] );
			} 
		}
	},

	timeinterval: function(_, conserv, domain) { // for semantic
        if( _ === false ) return;
		if( _ != 'semantic' ) this._timeinterval = _.toLowerCase(); 
		if( !conserv ) this.semantic(false);
        this.state.event()({ type: 'interval', interval: this._timeinterval });
        for( var key in this.allseries ) this.allseries[key].savedvalues = this.allseries[key].values = this.allseries[key][ this._timeinterval ];
        this.timeformat( this._timeinterval, domain );
        
		return this;
	},

    timedef: function(time) {
        if( ! time ) time = this._time;
        for(var key in this._timedef) {
            if( this._timedef[key].name == time ) return this._timedef[key];
        }
        return false;
    },
    
    time: function(_) {
		if (!arguments.length) return this._time;
        this.timeformat(_);
		return this;
	},
    
	initdisplay: function(selection, mode) {
		var t = this;

		//if( selection ) t.selection = selection;
    	//else selection = t.selection;
        
		if( this._initial ) this.initdata();

		selection.each(function(data) {
			var container = d3.select(this);
			
			// -- Wrap, graphs and all
			container.selectAll('g.wrap.chart').remove();

			var wrap = container.selectAll('g.main.chart').data([0]);
			var gEnter = wrap.enter().append('g').attr('class', 'wrap cdd3 chart').append('g');

			if( t._showYAxis ) gEnter.append('g').attr('class', 'y axis'); //.attr('transform', 'translate('+ marginleft +',' + t._margin.top + ')');
			if( t._showYAxis ) gEnter.append('g').attr('class', 'y axissecond'); //.attr('transform', 'translate('+ marginleft +',' + t._margin.top + ')');
            
			var zoomWrap = gEnter.append('g').attr('class', 'zoomWrap'); //.attr('transform', 'translate('+ marginleft +',0)');

			// rect for scroll / zoom
			zoomWrap.append('rect').attr('class', 'scroll').attr('x', 0).attr('y', 0).style('fill', 'rgba(255,255,255,0)');

			// definition
			zoomWrap.append('defs').append('clipPath').attr('id', 'edge-clip-' + t._id).append('rect');
			zoomWrap.attr('clip-path', t._clipEdge ? 'url(#edge-clip-' + t._id + ')' : '');
        
			// THE chart wrap
			var chartWrapMain = zoomWrap.append('g').attr('class', 'chartWrapMain');
			chartWrapMain.append('defs').append('clipPath').attr('id', 'edge-clip-' + (t._id+1)).append('rect');
			chartWrapMain.attr('clip-path', t._clipEdge ? 'url(#edge-clip-' + (t._id+1) + ')' : '');

			var chartWrapMain = container.selectAll('.chartWrapMain');

			var chartWrap = chartWrapMain.selectAll('.chartWrap').data([0]).enter().append('g').attr('class', 'chartWrap').attr('transform', 'translate(0,' + t._margin.top + ')');
			
			if( t._showXAxis ) zoomWrap.append('g').attr('class', 'x axis');
			if( t._showXAxis ) zoomWrap.append('g').attr('class', 'x axis2');

			var actionWrap = gEnter.append('g').attr('class', 'actionWrap').attr('transform', 'translate('+ t._margin.left +',' + t._margin.top + ')');

			if (t._showLegend) actionWrap.append('g').attr('class', 'legendWrap');
			if (t._showControl) {
                actionWrap.append('g').attr('class', 'controlDataWrap');
				actionWrap.append('g').attr('class', 'controlTimeWrap');
				actionWrap.append('g').attr('class', 'controlActionWrap');
			}
            if (t._showGraph) actionWrap.append('g').attr('class', 'icons');
			
            //var g = wrap.select('g'); // g is where we display chart (first one... if asking)
			//g.attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')');
		});
	},

	// -- Display ALL method (including legend, control...)
	displayall: function(selection, mode) {
		var t = this;
		
		if( selection ) t.selection = selection;
		else selection = t.selection;
		
		if( !selection ) return t;

		selection.each(function(data) {
			// -- Main display
			t._showLegend = true;
			t._showControl = true;
            t._showData = true;
            t.showTime(true);
            t._showAction = true;
			t.display(selection, mode);
		});
	},

	// -- Redisplay method
	redisplay: function() {
		//this._initial = true;
		this.display();
	},

	// -- Avoid the display of chart
	undisplay: function() {
		d3.selectAll('.wrap').remove();
		//d3.selectAll('.axis').remove();
        
        // delete data
        var t = this;
        
        for( var k in t.charts ) {
            for( var k2 in t.charts[k] ) {
        		delete t.charts[k][k2];
            }
            delete t.charts[k]
        }
        for( var k in t.allseries ) delete t.allseries;
        
        t.allseries = [];
        t.charts = [];
        t.allcharts = [];
        
        t._ready = false;
        t._initial = true;
        t._initialbehavior = true;
        
        t._inittime = true;
	},
    
    displayaxis: function(container, availableWidth, availableHeight) {
        var t = this;
        
         // -- Axis X
        var values = [];
        if( t._xDomainCustom ) values = t._xDomainCustom;
        else values = t._xDomainReal;

        if( t._showXAxis ) {
            
            t._reduceXTickWidth = (t._sxFormat(values[0]).toString().length)*t._fontsizex;
            var jump = Math.ceil( values.length * t._reduceXTickWidth / availableWidth );
            
            /* version with linear scale
            
            if( values.length > 14 ) {
    			t.xAxis.scale( t.sxLinearAxis )
                    .tickValues(null)
                    .tickFormat(function(d) {
                        if( /^\d+$/.test(d) ) {
                            var d2 = t._xDomainRoot[d];
                            return typeof d2 == 'string' ? d2 : t._sxFormat(d2); // %d/%m/%y 
                        }
                    })
            }
            else {*/
            
            var diff = Math.floor(jump/2);
            var pos = t._xDomainRoot.indexOf(values[0]);
            
            values = values.filter(function(d,i) { return (i+pos+diff)%jump == 0; });
            
            t.xAxis.scale( t.state.ordinable() ? t.sxBands : t.sxLinear )
			    .tickValues( t._showXLabels ? values : [])
                .tickFormat(function(d) { return typeof d == 'string' ? d : t._sxFormat(d); })
                .tickSize(0, 0).tickPadding(t._margin.xaxis);
            
            t.xAxis.display(container.select('.x.axis'));
            
            if( t.xAxis.orient() == 'bottom' ) container.select('.x.axis').attr('transform', 'translate('+t._translateX+',' +(t._margin.top+availableHeight)+ ')');
            else if( t.xAxis.orient() == 'left' ) container.select('.x.axis').attr('transform', 'translate(0,' + (t._translateX+availableHeight) + ')');

			// -- Axis X  // USE FOR TEST ONLY
			// BUG WITH BEHAVIOR ? a checker
            /*t.xAxis2.scale(t.sxBehavior).ticks( t.xAxis2.orient() == 'left' ? availableHeight / 100 : availableWidth / 100 ).tickFormat(function(d) { return t._sxFormat(new Date(d)); }) // %d/%m/%y.tickSize(2, 0);
            t.xAxis2.display(container.select('.x.axis2'));
            if( t.xAxis2.orient() == 'bottom' ) container.select('.x.axis2').attr('transform', 'translate('+t._translateX+',' + t.sy.range()[0] + ')');
            else if( t.xAxis2.orient() == 'left' ) container.select('.x.axis2').attr('transform', 'translate(0,' + (t._translateX+t.sy.range()[0]) + ')');*/
            
            // -- Ticks for axis X
            /*if( t._reduceXTick ) {
                t._reduceXTickWidth = t._sxFormat(values[0]).toString().length*t._fontsize;
                var xTicks = container.select('.x.axis > g').selectAll('g');
                xTicks.selectAll('line, text, circle').style('opacity', 1)
                // find position of first value
                //var index = t._xDomainRoot.indexOf(t._xDomainReal[0]);
                var jump = Math.ceil( t._xDomainReal.length * t._reduceXTickWidth / availableWidth );
                //var decal = index%jump;
                xTicks.filter(function(d,i) { return (i%jump) != 0; })
                    .selectAll('line, text, circle').style('opacity', 0);
        	}*/
        }
		
        if( t._showYAxis ) {
			// -- Axis Y
			t.yAxis.scale(t.sy).tickPadding(t._margin.yaxis);
            
            if( t._style == 'expand') t.yAxis.tickFormat(function(d) { return (d*100)+'%'; });
            else t.yAxis.tickFormat(function(d) { return t._syFormat(d); });
            
			if( t._showYTick ) {
                if( t._nbyticks ) t.yAxis.ticks(t._nbyticks);
                t.yAxis.tickSize( t.yAxis.orient() == 'bottom' ? -availableHeight : -availableWidth, 0);
			}
            
            t.yAxis.display(t._initial ? container.select('.y.axis') : container.select('.y.axis').transition());
            if( t._margin.yaxispos == 'inside' ) container.select('.y.axis').selectAll('.wrap.axis > g').selectAll('g').selectAll('text')
                .attr('style', 'text-anchor: begin')
                .attr('dy', -t._fontsizey)
                .attr('dx', t._margin.yaxisdecalleft > 0 ? t._margin.yaxisdecalleft : 0);
            
            // -- Axis Y Second
            if( t.sySecond ) {
                var ticks = t.sy.ticks(3), last = ticks[ticks.length-1], ticks2 = t.sySecond.ticks(3), last2 = ticks2[ticks2.length-1];
                var diff = t.state._w8 ? 0 : t.sy(last) - t.sySecond(last2);
                var space = t._margin.space ? t._margin.space : 0;
			    t.sySecond.range([availableHeight, space+diff]); // y
                
                t.yAxisSecond.scale(t.sySecond).tickPadding(t._margin.yaxis);
                if( t._style == 'expand') t.yAxisSecond.tickFormat(function(d) { return (d*100)+'%'; });
                else t.yAxisSecond.tickFormat(function(d) { return t._syFormatSecond(d); });
                
                if( t._nbyticks ) t.yAxisSecond.ticks(t._nbyticks);
                t.yAxisSecond.display(t._initial ? container.select('.y.axissecond') : container.select('.y.axissecond').transition());
                if( t._margin.yaxispos == 'inside' ) container.select('.y.axissecond').selectAll('.wrap.axis > g').selectAll('g').selectAll('text')
                    .attr('style', 'text-anchor: end')
                    .attr('dy', -t._fontsizey)
                    .attr('transform', 'translate('+(-t._margin.yaxisdecalright)+',0)');
            }
        }
    },

	// -- Display SIZE method
	display: function(selection, mode, duration) {
		var t = this;
        
        var reinit = false;
		
		if( selection ) t.selection = selection;
		else if( t._element ) selection = d3.select('#'+t._element);
        else selection = t.selection;
        
		if( !selection ) return t;
		
        if( mode != 'timeline' && t._showTimeline ) t._tm._brush.x(t.sxLinear).on('brush', function() { t.brush(selection, mode) } );
        
		// -- Fullscreen ?
		if( (mode == 'resize' || t._initial) && t._fullscreen ) {
            var size = cd.utils.windowSize();
			t._width = size.width;
			t._height = size.height;
		}

		// -- not a transition object..
		if( t._initial ) {
            t.initdisplay(selection);
            if (!t._element) t._element = selection.attr('id');
		}
        else if( t._style != t._stylesaved ) {
            t.initstyle();
            t._stylesaved = t._style;
        }
        
		//if( mode != 'zoom' && mode != 'timeline' ) selection = selection.transition().duration(t._duration);

		selection.each(function(data) {
            
            var container = d3.select(this), that = this;
            var space = t._margin.space ? t._margin.space : 0;
            
            // -- check the domain before anything... axes
            var marginleft = t._margin.left,
                marginright = t._margin.right;
            
            var decalleft = 0, decalright = 0;
            if( t._showYAxis && t._autoYAdjust ) {
                if( t._yDomain && t._yDomain[1] ) decalleft += (t._syFormat(Math.floor(t._yDomain[1])).toString().length+1)*t._fontsizey;
                if( t.sySecond && t._yDomainSecond && t._yDomainSecond[1] ) decalright += (t._syFormatSecond(Math.floor(t._yDomainSecond[1])).toString().length)*t._fontsizey;
            }
            
            if( t._margin.yaxispos == 'inside' ) {
                decalleft = 0;
                decalright = 0;
                marginleft = 0;
                marginright = 0;
            }
            else {
                t._margin.xleft = marginleft+decalleft;
                t._margin.xright = decalright;
            }
            
            // handle percentage
            // TODO if( ! t._width ) console.log(container.style('width'))
    		var realWidth = (t._width  || parseInt(container.style('width')) || 960),
				realHeight = (t._height || parseInt(container.style('height')) || 400),
				availableWidth =  realWidth - marginleft - marginright - decalleft - decalright,
				availableHeight = realHeight - t._margin.top - t._margin.bottom;
                
            if( t._grid ) {
                t._initial = true;
                t.initdisplay(selection);
                container.selectAll('g.wrap.grid').remove();
                t._grid = false;
            }
            
            if( (mode == 'resize' || t._initial) && t._fullscreen ) container.attr('width', realWidth).attr('height', realHeight)
            
			/*if( t.state.predict() ) {
				var max=0, series = t.allseries.filter(function(d) { return d._predicted });
				if( series.length ) for( var key in series ) max = Math.max(max, series[key].values.length);
				var decal = max*t.initialRangeBand-t.initialRangeBand/2;
				if( mode != 'zoom' && mode != 'resize' ) {
					t.translate(-availableWidth*t._scaleX+availableWidth, true); // && t._translateX >= -availableWidth*t._scaleX+availableWidth 
					container.select('.chartWrap').attr('transform', 'translate('+t._translateX+',' + t._margin.top + ')');
					t.translate(-availableWidth*t._scaleX+availableWidth-decal);
				}
				availableWidth += decal;
			}
            
    		// -- Timeline
			if( t._showTimeline ) {
				t._tm.width(realWidth).height(realHeight);
				t._tm._ratioHeight = t._tmRatioHeight; // if change
				availableHeight = realHeight - realHeight/t._tmRatioHeight - t._margin.top - t._margin.bottom;
			}*/
            
            if( t.allseries && (t.allseries.length > 0 || !t._initial) ) {
                // update range
                t.updaterange(container, availableWidth, availableHeight, true);
                // move container
                container.selectAll('.zoomWrap').attr('transform', 'translate('+ (marginleft+decalleft+t._decal.left*realWidth-t._decal.right*realWidth) +',0)');
                container.selectAll('.chartWrapMain').selectAll('.chartWrap').attr('transform', 'translate('+t._translateX+',' + (t._margin.top+t._decal.top*realHeight-t._decal.bottom*realHeight) + ')');
            
                // -- Size of charts
            	for( var k in t.charts ) for( var k2 in t.charts[k] ) {
    				var chart = t.charts[k][k2];
    
    				// -- Scale
                    var xScale = t.sxLinear;
                    
                    if( chart.series[0] && chart.series[0].values.length == 1 && chart._type == 'Line' ) t.state.ordinable(true);
                    
                    if( t.state.ordinable() ) xScale = ( chart._ordinal ) ? t.sxBands : t.sxPoints;
                    
    				chart.xScale(xScale);
    				chart.yScale(t.sy);
    				chart.width(availableWidth).height(availableHeight);
    			}
    
            
                // display axis
                t.displayaxis(container, availableWidth, availableHeight);
                
                if( t.yAxis.orient() == 'bottom' ) container.select('.y.axis').attr('transform', 'translate(0,' +(t._margin.top+availableHeight)+ ')');
        		else container.selectAll('.y.axis').attr('transform', 'translate('+ (decalleft+marginleft) +',' + t._margin.top + ')');
                if( t.sySecond ) {
                    if( t.yAxisSecond.orient() == 'bottom' ) container.select('.y.axissecond').attr('transform', 'translate(0,' + t.sxPoints.range()[0] + ')');
                    else container.selectAll('.y.axissecond').attr('transform', 'translate('+ (realWidth-decalright-marginright) +',' + t._margin.top + ')');
                }
                
    			t.displaychart(selection, mode, duration);
                
                // -- ValueViewer
                if( t._showValueviewer ) {
    				t._vv.width(availableWidth).height(availableHeight);
    				t._vv.sx.range([0, availableWidth]);
    				t._vv.sy.range([availableHeight, 0]);
    				t._vv.display(container, mode);
    			}
                
                if( t._showTimeline ) {
                    t._tm.sx.range([0, availableWidth]);
            		t._tm.sxBands.range([0, availableWidth]);
    				t._tm.sxPoints.range([0, availableWidth]);
    				t._tm.sy.range([realHeight/t._tmRatioHeight, 0]);
                }
            }
            
            if( !t._initial && t.allseries && t.allseries.length == 0 ) {
                t.undisplay();
                t._initial = true;
                reinit = true;
            }
            
			// -- Handle clip path on zoom
			container.select('#edge-clip-' + t._id + ' rect').attr('x', -space).attr('y', -space).attr('width', availableWidth+space*2).attr('height', realHeight+space);

			// -- Handle clip path on charts
			container.select('#edge-clip-' + (t._id+1) + ' rect').attr('x', -space).attr('y', -space).attr('width', availableWidth+space*2).attr('height', realHeight+space-t._margin.bottom);
            //.attr('width', availableWidth).attr('height', realHeight-t._margin.bottom);

			// -- Handle the zoom | scroll (after creation of wrap)
			selection.selectAll('.zoomWrap').attr('x', 0).attr('y', 0).attr('height', realHeight).attr('width', availableWidth)
			selection.selectAll('rect.scroll').attr('x', 0).attr('y', 0).attr('height', realHeight).attr('width', availableWidth).style('opacity', 0)

            // -- Timeline stuff
            if( t._showTimeline ) t._tm.display(selection, mode);
			// -- Legend stuff
			if (t._showLegend) t.displaylegend(selection, mode);
			// -- Control stuff
			if (t._showControl) t.displaycontrol(selection, mode);
            // -- Graph stuff
			if (t._showGraph) t.displaygraph(container.selectAll('.icons'), mode);
		});
        
        if( this.allseries && this.allseries.length > 0 ) {
            if( this._initial && this._timeout === false ) t._ready = true;
		    if( !reinit && this._initial ) this._initial = false;
        }

		return this;
	},

	displaychart: function(selection, mode, duration) {
		var t = this;

		if( !selection ) selection = this.selection;

		selection.each(function(data) {
			var container = d3.select(this), that = this;
            var realWidth =  (t._width  || parseInt(container.style('width')) || 960),
    			realHeight = (t._height || parseInt(container.style('height')) || 400)
            
            for( var k in t.charts ) for( var k2 in t.charts[k] ) {
    			var chart = t.charts[k][k2];
				var datum = chart.series;
                
                if( t._timeout !== false ) clearTimeout(t._timeout); 
                
                //if( chart._type != 'Line' ) { // special case for line
                    t._timeout = setTimeout(function() {
                        t._ready = true;
                        //t.state._event({event: 'ready'});
                        t._timeout = false;
                    }, (chart._delay ? chart._delay : 0) + chart._duration);
                //}
                
                // -- Disabled 
                chart.series.filter(function(d) { return !d._disabled; }).map(function(serie, i) {
    			    serie.values = serie.values.map(function(d, j) {
    					 d.rseries = i;
    					 return d;
    				});
                });
				
				// -- Chart wrap
				if( chart._type != 'Area' 
                    && chart._type != 'Arealine'
                    && chart._type != 'Pie'
                    && chart._type != 'Donut'
                    && chart._type != 'Gauge') datum = datum.filter(function(d) { return !d._disabled })

				//if( !t.state.predict() ) datum = datum.filter(function(d) { return !d._predicted })

                //if( datum[0].values.length == 1 && chart._type == 'Line' ) for( var k in datum ) datum[k].values[1] = datum[k].values[0]
                
				// -- Second axe
                /*chart.sy = function(d) {
                    if( datum[d.series]._secondaxe ) return t.sySecond(d);
                    else return t.sy(d);
                }*/
			    chart.sy = ( k == 0 ) ? t.sy : t.sySecond;
                
                // -- Move it!
    			var transition = ( mode == 'zoom' || mode == 'resize' || mode == 'direct' ) ? container.select('.chartWrap') : container.select('.chartWrap').transition().duration(t._duration);
				transition.attr('transform', 'translate('+t._translateX+',' + (t._margin.top+t._decal.top*realHeight-t._decal.bottom*realHeight) + ')');
                
                var wrap = container.select('.chartWrap');
                // TO CHECK if( chart._behaviorable ) var wrap = container.select('.chartWrap');
                //else wrap = container;
                
				// -- Chart size & display
				chart.display(wrap.datum(datum), mode, duration);
               
				// -- Tooltips
				if (t._showTooltip) {
                    if( chart.dispatch && typeof chart.dispatch.tooltipShow == 'function' ) {
    					chart.dispatch.on('tooltipShow', function(e) {
							//disable tooltips when value ~= 0
							if (!Math.round(chart.y()(e.point) * 100)) {  // 100 will not be good for very small numbers...
								setTimeout(function() { d3.selectAll('.point.hover').classed('hover', false) }, 0);
								return false;
							}
							e.pos = [e.pos[0] + t._margin.left, e.pos[1] + t._margin.top];
							t.makeTooltip(e, that, chart);
    					}); 
                    }
                    if( chart.dispatch && typeof chart.dispatch.tooltipHide == 'function' ) chart.dispatch.on('tooltipHide', function(e) { t.dispatch.tooltipHide(e); });
					if( t.dispatch && typeof t.dispatch.tooltipHide == 'function' ) t.dispatch.on('tooltipHide', t.cleanuptooltip);
				}
                
                // -- Actions
                if (t._showAction) {
                    if( chart.dispatch && typeof chart.dispatch.elementClick == 'function' ) {
                        chart.dispatch.on('elementClick', function(e) {
                            if (t._showAction) {
                                t.makeAction(e, that, chart);
                            }
                        }); 
                    }
                }
			}
		});
		
		return this;
	},
	
	// -- Tooltips things

	tooltipContent: function(_) {
		if (!arguments.length) return this._tooltip;
		this._tooltip = _;
		return this;
	},

	tooltip: function(key, x, y, e, graph) { 
		return '<h3 '+(e.color ? 'style="color: '+e.color+'"' : '')+'>' + key + '</h3>' +
		'<p>' +  y + '</p><p>' + x + '</p>';
	},

	makeTooltip: function(e, offsetElement, chart) {
		var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
		top = e.pos[1] + ( offsetElement.offsetTop || 0),
		x = this.xAxis.tickFormat()(chart.x()(e.point)),
		y = this.yAxis.tickFormat()(chart.y()(e.point)),
		content = this.tooltip(e.series.key, x, y, e, this);

		this.showtooltip([left, top], content, null, 0, e);
	},
    
    makeAction: function(e, offsetElement, chart) {
		var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
		    top = e.pos[1] + ( offsetElement.offsetTop || 0);
        if( this._elementclick ) this._elementclick(e.pointIndex);
		//if(this._formatAction) {
            //this._formatAction(e, offsetElement, chart)
	},
	
	showtooltip: function(pos, content, gravity, dist, e) {
		var container = document.createElement("div");
		container.className = "cdtooltip";

		gravity = gravity || 's';
		dist = dist || 20;

		var body = document.getElementsByTagName("body")[0];

		container.innerHTML = content;
		container.style.left = 0;
		container.style.top = 0;
		container.style.opacity = 0;
        container.style.border = '2px '+(e.color ? 'style="color: '+e.color+'"' : '#444')+' solid';

		body.appendChild(container);
		
		var height = parseInt(container.offsetHeight),
			width = parseInt(container.offsetWidth),
			windowWidth = cd.utils.windowSize().width,
			windowHeight = cd.utils.windowSize().height,
			scrollTop = body.scrollTop,
			scrollLeft = body.scrollLeft,
			left, top;


		switch (gravity) {
			case 'e':
				left = pos[0] - width - dist;
				top = pos[1] - (height / 2);
				if (left < scrollLeft) left = pos[0] + dist;
				if (top < scrollTop) top = scrollTop + 5;
				if (top + height > scrollTop + windowHeight) top = scrollTop - height - 5;
			break;
			case 'w':
				left = pos[0] + dist;
				top = pos[1] - (height / 2);
				if (left + width > windowWidth) left = pos[0] - width - dist;
				if (top < scrollTop) top = scrollTop + 5;
				if (top + height > scrollTop + windowHeight) top = scrollTop - height - 5;
			break;
			case 'n':
				left = pos[0] - (width / 2);
				top = pos[1] + dist;
				if (left < scrollLeft) left = scrollLeft + 5;
				if (left + width > windowWidth) left = windowWidth - width - 5;
				if (top + height > scrollTop + windowHeight) top = pos[1] - height - dist;
			break;
			case 's':
				left = pos[0] - (width / 2);
				top = pos[1] - height - dist;
				if (left < scrollLeft) left = scrollLeft + 5;
				if (left + width > windowWidth) left = windowWidth - width - 5;
				if (scrollTop > top) top = pos[1] + 20;
			break;
		}
		
		container.style.left = (this._margin.left+(this._margin.xaxis ? this._margin.xaxis : 0)+left)+"px";
		container.style.top = top+"px";
		container.style.opacity = 1;
		container.style.position = "absolute"; //fix scroll bar issue
		container.style.pointerEvents = "none"; //fix scroll bar issue
		
		return container;
	},
	
	cleanuptooltip: function() {
		
		// Find the tooltips, mark them for removal by this class (so others cleanups won't find it)
		var tooltips = document.getElementsByClassName('cdtooltip');
		var purging = [];
		while(tooltips.length) {
			purging.push(tooltips[0]);
			tooltips[0].style.transitionDelay = "0 !important";
			tooltips[0].style.opacity = 0;
			tooltips[0].className = "cdtooltip-pending-removal";
		}
		
		setTimeout(function() {
			while (purging.length) {
				var removeMe = purging.pop();
				removeMe.parentNode.removeChild(removeMe);
			}
		}, 500);
	},});var Area = Chart.extend({
	init: function(view) {
        // -- Options
		this._stackable = true;
		this._semanticable = true;
		this._scatter = (view.state._w8 || view.state.ipad) ? false : true;
		this._ordinal = false;
		
		// -- Scatter
		if( this._scatter ) this.scatter = new Scatter(null).size(16).sizeDomain([16,256]).layered(true);
		
		this._super('Area', view);
		
		if( this._scatter ) this.scatter.id(this._id)
		
		// -- Area
		this._interpolate = 'linear'; // controls the line interpolation
		this._gradient = false;
		
		this.dispatch =  d3.dispatch('tooltipShow', 'tooltipHide', 'areaClick', 'areaMouseover', 'areaMouseout');
		
		var t = this;
		if( this._scatter ) {
			d3.rebind(this, this.scatter, 'interactive', 'size', 'zScale', 'sizeDomain', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'clipRadius');
			this.scatter.dispatch.on('elementClick.area', function(e) { t.dispatch.areaClick(e); });
		}
        
        if( Object.keys(this._view.charts).length == 0 ) {
            this._view._showXAxis = true;
        	this._view._showYAxis = true;
            this._view._clipclip = true;
            if( this._view._autoadaptation ) {
                this._view._margin = {top: 10, right: 0, bottom: 0, left: 0, xaxis: 0, yaxis: 0 };
                this._view._useScroll = true;
                this._view._useZoom = true;
                this._view.showValueviewer(true);
            }    
        }
	},
	
	display: function(selection, mode) {
		
		if( selection ) this.selection = selection;
		else selection = this.selection;
		
		if( !selection ) return this;
		
		var t = this;
		selection.each(function(data) {
			var that = this;
			var sx = t.sx;
			var sy = t.sy;
			var forceymin = sy(sy.domain()[0]);
			var style = t.view()._style;
			var order = false; // t.view()._order;

			var wrap = d3.select(this).selectAll('g.wrap.area').data([0]);
			var wrapEnter = wrap.enter().append('g').attr('class', 'wrap cdd3 area');
			var gEnter = wrapEnter.append('g');
			var g = wrap.select('g');

			gEnter.append('g').attr('class', 'areaWrap');

			// -- Scatter part
			if( t._scatter ) {
                t.scatter.sx = sx;
                t.scatter.sy = sy;
				t.scatter.x(t.getX).y(function(d) { return order ? d.display.y + d.display.y0 : d.display.y }).forceY([0])
			}
			gEnter.append('g').attr('class', 'scatterWrap');
			var scatterWrap = g.select('.scatterWrap').datum(data)
			if( t._scatter ) t.scatter.display(scatterWrap);
			
			// -- Wrap
			wrap.attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')');

			// -- Group
			/*d3.transition(wrap.select('.groups').selectAll('.group'))
				.style('stroke-opacity', 1e-6)
				.style('fill-opacity', 1e-6);*/
			
			var area = d3.svg.area()
					.x(function(d,i){ return sx(t.getX(d,i)) })
					.y0(function(d) { return style != 'normal' ? sy(d.display.y0) : forceymin; })
					.y1(function(d) { return style != 'normal' ? sy(d.display.y + d.display.y0) : sy(d.display.y); })
					.interpolate(t._interpolate);

			var zeroArea = d3.svg.area()
					.x(function(d,i){ return sx(t.getX(d,i)) })
					.y0(function(d) { return sy(d.display.y0) })
					.y1(function(d) { return sy(d.display.y0) });

			var initArea = d3.svg.area()
					.x(function(d,i){ return sx(t.getX(d,i)) })
					.y0(function(d) { return forceymin })
					.y1(function(d) { return forceymin });

			var path = g.select('.areaWrap').selectAll('path.area').data(data);
			var pathEnter = path.enter();
            
            var linear = pathEnter.append('defs')
                .append('linearGradient')
                    .attr('id', function(d,i) { return 'degrade-area'+i; })
                    .attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%')
           	
            linear
                .append('stop')
                    .attr('class', 'begin')
                    .attr('offset', '0%')
                    .attr('stop-opacity', style == 'normal' ? .2 : .8)
                    .attr('stop-color', function(d,i){ return d._color || t._color[i % t._color.length] });
            
            linear
                .append('stop')
                    .attr('class', 'end')
                    .attr('offset', '80%')
                    .attr('stop-opacity', style == 'normal' ? 1e-6 : .2)
                    .attr('stop-color', function(d,i){ return d._color || t._color[i % t._color.length] });
            
            g.select('.areaWrap').selectAll('stop.begin').transition().attr('stop-opacity', .4);
            g.select('.areaWrap').selectAll('stop.end').transition().attr('stop-opacity', style == 'expand' ? .2 : .1);

            pathEnter
			.append('path')
				.attr('class', function(d,i) { return 'area area-' + i })
				.attr('d', function(d,i) { return initArea(d.values,i);	})
				.on('mouseover', function(d,i) {
					d3.select(this).classed('hover', true);
					t.dispatch.areaMouseover({
						point: d,
						series: d.key,
						pos: [d3.event.pageX, d3.event.pageY],
						seriesIndex: i
					});
				})
				.on('mouseout', function(d,i) {
					d3.select(this).classed('hover', false);
					t.dispatch.areaMouseout({
						point: d,
						series: d.key,
						pos: [d3.event.pageX, d3.event.pageY],
						seriesIndex: i
					});
				})
				.on('click', function(d,i) {
					d3.select(this).classed('hover', false);
					t.dispatch.areaClick({
						point: d,
						series: d.key,
						pos: [d3.event.pageX, d3.event.pageY],
						seriesIndex: i
					});
				})
			path.exit().transition()
					.attr('d', function(d,i) { return zeroArea(d.values,i) })
					.remove();
			
			path.style('fill', function(d,i){ 
					return style != 'normal' ? 'url(#degrade-area'+i+')' : 'none'; 
					var color =  d._color || t._color[i % t._color.length];
					color = d3.rgb(color);//.brighter();
					return 'rgba('+color.r+','+color.g+','+color.b+','+(.3)+')';
				});

            if( mode != 'zoom' && mode != 'timeline' && mode != 'resize' ) path.transition().duration(t._duration).attr('d', function(d,i) { return area(d.values,i); });
            else path.attr('d', function(d,i) { return area(d.values,i); });
            
			var linepath = d3.svg.line()
						.x(function(d,i) { return sx(t.getX(d,i)) })
						.y(function(d) { return style != 'normal' ? sy(d.display.y + d.display.y0) : sy(d.display.y); })
						.interpolate(t._interpolate);
			
			var initlinepath = d3.svg.line()
						.x(function(d,i) { return sx(t.getX(d,i)) })
						.y(function(d) { return forceymin; })
						.interpolate(t._interpolate);

			var line = g.select('.areaWrap').selectAll('path.line').data(data);

			line.enter().append('path')
				.attr('class', function(d,i) { return 'line line-' + i })
				.attr('d', function(d,i) { return initlinepath(d.values,i);	});
			
			line.exit().transition().remove();
			
			line.style('fill', 'none').style('stroke', function(d,i){ return d._color || t._color[i % t._color.length] }).style('stroke-width', 2)
            line.transition().style('stroke-opacity', 1); // style == 'normal' ? 1 : 1e-6)
			
			if( mode != 'zoom' && mode != 'timeline' && mode != 'resize' ) line.transition().duration(t._duration).attr('d', function(d,i) { return linepath(d.values,i); });
            else line.attr('d', function(d,i) { return linepath(d.values,i); });

			if( t._scatter ) {
				t.scatter.dispatch.on('elementMouseover.area', function(e) {
					g.select('.chart-' + t._id + ' .area-' + e.seriesIndex).classed('hover', true);
				});
				t.scatter.dispatch.on('elementMouseout.area', function(e) {
					g.select('.chart-' + t._id + ' .area-' + e.seriesIndex).classed('hover', false);
				});
			}

			t._nbdisplayed = data.length;
		});
		
		this.enddisplay(selection, mode);

		return this;
	},

	x: function(_) {
		if (!arguments.length) return this.getX;
		this.getX = d3.functor(_);
		return this;
	},
	y: function(_) {
		if (!arguments.length) return this.getY;
		this.getY = d3.functor(_);
		return this;
	},
});



var Bar = Chart.extend({
    init: function(view) {
        // -- Options
		this._stackable = true;
		this._semanticable = true;
		this._ordinal = true;
		this.dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout');
		
		this._super('Bar', view);

		this.sxgroup = d3.scale.ordinal();

		this._delay = 1200;
		this._padding = .1;
		this._hmode = false;
		this._wheight = 'height';
		this._wwidth = 'width';
		this._wx = 'x';
		this._wy = 'y';
        
        if( Object.keys(this._view.charts).length == 0 ) {
            this._view._clipclip = true;
            if( this._view._autoadaptation ) {
                this._view._showXAxis = true;
        	    this._view._showYAxis = true;
                this._view._useScroll = true;
                this._view._useZoom = true;
                this._view._margin = {top: 10, right: 0, bottom: 0, left: 0, xaxis: 0, yaxis: 0 };
                this._view.showValueviewer(true);
            }
        }
	},
	display: function(selection, mode, duration) {
		
		if( selection ) this.selection = selection;
		else selection = this.selection;
		
		if( !selection ) return this;
		
		var t = this;
		selection.each(function(data) {
            
			var sy = t.sy;
			var sx = t.sx;
			var sxgroup = t.sxgroup;
            var forceymin = sy(sy.domain()[0]);
            var style = t.view()._style;
            var yMax = d3.max(data.map(function(d) { return d._localmax; }));
            var nbseries = t.view().nbseries(t._type);
            var nbseriestotal = t.view().nbseries(t._type);
            var nbcharts = t.view().nbcharts(t._type);
            var centered = ( t.view()._style == 'center' );
            var extend = (t.view()._style == 'extend');
            var rangeBand = style != 'normal' && style != 'center' && nbcharts > 1 ? sx.rangeBand()/2 : sx.rangeBand(); // /2-sx.rangeBand()*t._padding
            var num = d3.min(data.map(function(d) { return d._num; }));
            var gnum = t._gnum ? t._gnum : 0;
            var first = gnum ? sx.rangeBand()/2 : 0; //*(nbseries-data.length)/nbseries
            //var first = sx.rangeBand()*num/nbseries;

			//store old scales if they exist
			var sx0 = t.sx0 || sx;
			var sy0 = t.sy0 || sy;
            var sxgroup0 = t.sxgroup0 || sxgroup;
            
			sxgroup.domain( d3.range(nbseriestotal) ).rangeBands([0, rangeBand], t._padding*2, t._padding);

			var wrap = d3.select(this).selectAll('g.wrap.multibar.multibar-'+gnum).data([data]);
			var wrapEnter = wrap.enter().insert('g', ':first-child').attr('class', 'wrap cdd3 multibar multibar-'+gnum);
			var gEnter = wrapEnter.append('g');
		
			gEnter.append('g').attr('class', 'groups');
		
			var g = wrap.select('g')
			wrap.attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')');

			var groups = wrap.select('.groups')
				.selectAll('.group')
				.data(function(d) { return d }, function(d) { return d._id }); // fix because of unique id
			groups.enter().append('g')
				.style('stroke-opacity', 1)
				.style('fill-opacity', 1);
            
			if( mode != 'zoom' && mode != 'timeline' && mode != 'resize' ) {
				if( data.length == 0 || mode == 'direct') {
                    groups.exit().transition().selectAll('rect.bar')
            			.delay(0)
    					.attr(t._wy, function(d) { return style != 'normal' && style != 'center' ? (style == 'expand' ?  sy(d.display.y0+d.display.y/2) : sy(d.display.y0)) : forceymin; })
    					.attr(t._wheight, 0)
    					.remove();
                }
                else {
                    groups.exit().transition().selectAll('rect.bar')
                    .delay(function(d,i,j) { return j * t._delay/ data[0].values.length })
						.attr(t._wy, function(d) { return style != 'normal' && style != 'center' ? (style == 'expand' ?  sy(d.display.y0+d.display.y/2) : sy(d.display.y0)) : forceymin; })
						.attr(t._wheight, 0)
						.remove();
                }
			}
			
			groups
				.attr('class', function(d,i) { return 'group series-' + i })
				.classed('hover', function(d) { return d.hover })
				.style('fill', function(d,i){ return d._color || t._color[i % t._color.length] })
				.style('stroke', function(d,i){ return d._color ||  t._color[i % t._color.length] });
			/*groups.transition()
				.style('stroke-opacity', 1)
				.style('fill-opacity', 1);*/

			var bars = groups.selectAll('rect.bar').data(function(d) { return d.values });

			bars.exit().remove();

			var barsEnter = bars.enter().append('rect')
				.attr('class', function(d,i) { return !t._hmode && d.display.y < 0 || t._hmode && d.display.y > 0 ? 'bar negative' : 'bar positive'})
				.attr(t._wx, function(d,i,j) { return style != 'normal' && style != 'center' ? first : sxgroup(d.series) })
				.attr(t._wy, function(d) { return style != 'normal' && style != 'center' ? sy(d.display.y0+d.display.y/2) : forceymin; })
				.attr(t._wheight, 0)
				.attr(t._wwidth, style == 'normal' || style == 'center' ? sxgroup.rangeBand() : rangeBand )
				.on('mouseover', function(d,i) {
					d3.select(this).classed('hover', true);
                    data = data.filter(function(d) { return !d._disabled; });
					e = {
						value: d.display.y,
						point: d,
						series: data[d.rseries],
						color: data[d.rseries]._color,
						pos: [sx(t.getX(d,i)) + (rangeBand * (style != 'normal' ? data.length / 2 : d.rseries + .5) / data.length), sy(d.display.y + (style != 'normal' ? d.display.y0 : 0))],
						pointIndex: i,
						seriesIndex: d.rseries,
						e: d3.event
					}
					t.dispatch.tooltipShow(e);
				})
				.on('mouseout', function(d,i) {
					d3.select(this).classed('hover', false);
                    data = data.filter(function(d) { return !d._disabled; });
					e = {
						value: d.display.y,
						point: d,
						series: data[d.rseries],
						pointIndex: i,
						seriesIndex: d.rseries,
						e: d3.event
					};
					t.dispatch.tooltipHide(e);
				})
				/*.on('click', function(d,i) {
					t.dispatch.elementClick({
						value: d.display.y,
						point: d,
						series: data[d.rseries],
						pos: [sx(t.getX(d,i)) + (rangeBand * (style != 'normal' ? data.length / 2 : d.rseries + .5) / data.length), sy(d.display.y + (style != 'normal' ? d.display.y0 : 0))],
						pointIndex: i,
						seriesIndex: d.rseries,
						e: d3.event
					});
					d3.event.stopPropagation();
				})
				.on('dblclick', function(d,i) {
					t.dispatch.elementDblClick({
						value: d.display.y,
						point: d,
						series: data[d.rseries],
						pos: [sx(t.getX(d,i)) + (rangeBand * (style != 'normal' ? data.length / 2 : d.rseries + .5) / data.length), sy(d.display.y + (style != 'normal' ? d.display.y0 : 0))],
						pointIndex: i,
						seriesIndex: d.rseries,
						e: d3.event
					});
					d3.event.stopPropagation();
				});*/

			// update
			bars
				.attr('class', function(d,i) { return !t._hmode && d.display.y < 0 || t._hmode && d.display.y > 0 ? 'bar negative' : 'bar positive'})
				.attr('transform', function(d,i) {
					if( t._hmode ) return 'translate(0,' + sx(t.getX(d,i)) + ')';
					else return 'translate(' + sx(t.getX(d,i)) + ',0)';
				})
            
			if( mode == 'zoom' || mode == 'timeline' ) { // !bars.id
				bars
					.attr(t._wx, function(d,i) { return style != 'normal' && style != 'center' ? first : sxgroup(d.series) })
					.attr(t._wwidth, style == 'normal' || style == 'center' ? sxgroup.rangeBand() : rangeBand )
				    .attr(t._wheight, function(d,i) { return Math.abs(sy(d.display.y + (style != 'normal' ? d.display.y0 : 0)) - sy((style != 'normal' ? d.display.y0 : 0))) })
    				.attr(t._wy, function(d,i) { return sy(d.display.y + (style != 'normal' ? d.display.y0 : 0)); });
				
                /*if(style == 'normal' || style == 'center') {
                    bars
    					.attr(t._wheight, function(d,i) { return Math.abs(sy(d.display.y) - forceymin) })
						.attr(t._wy, function(d,i) { return !t._hmode && d.display.y < 0 || t._hmode && d.display.y > 0 ? forceymin : sy(centered ? (yMax-d.display.y)/2+d.display.y : d.display.y); })
				}
				else {
				}*/
			}
			else {
                if( mode == 'direct' ) {
                    bars.transition().duration(duration ? duration : t._duration)
                        .attr(t._wy, function(d,i) { return sy( (centered ? (yMax-d.display.y)/2+d.display.y : d.display.y) + (style != 'normal' && style != 'center' ? d.display.y0 : 0) ); })
                        .attr(t._wheight, function(d,i) { return Math.abs(sy(d.display.y + (style != 'normal' ? d.display.y0 : 0)) - sy((style != 'normal' ? d.display.y0 : 0))) })
                }
				else if(style == 'normal' || style == 'center') {
					if ( t._nbdisplayed == data.length && mode == 'resize' ) {
                        bars.transition().duration(t._duration).delay(0) //.duration(400).ease('linear')
							.attr(t._wy, function(d,i) { return !t._hmode && d.display.y < 0 || t._hmode && d.display.y > 0 ? forceymin :  centered ? sy((yMax-d.display.y)/2+d.display.y) : sy(d.display.y); })
							.attr(t._wheight, function(d,i) { return Math.abs(sy(d.display.y) - forceymin) })
							.attr(t._wx, function(d,i) { return sxgroup(d.series); })
							.attr(t._wwidth, sxgroup.rangeBand() )
                    }
                    else if( t._nbdisplayed <= data.length ) { // add series
    					bars.transition().duration(t._duration)
							.delay(function(d,i) { return i * t._delay/ data[0].values.length })
							.attr(t._wx, function(d,i) { return sxgroup(d.series); })
							.attr(t._wwidth, sxgroup.rangeBand() )
							.transition()
								.attr(t._wy, function(d,i) { return !t._hmode && d.display.y < 0 || t._hmode && d.display.y > 0 ? forceymin :  centered ? sy((yMax-d.display.y)/2+d.display.y) : sy(d.display.y); })
								.attr(t._wheight, function(d,i) { return Math.abs(sy(d.display.y) - forceymin) })
					}
                    else { // rm or other case
    					bars.transition()
                            .duration(t._duration)
							.delay(function(d,i) { return i * t._delay/ data[0].values.length })
							.attr(t._wy, function(d,i) { return !t._hmode && d.display.y < 0 || t._hmode && d.display.y > 0 ? forceymin : centered ? sy((yMax-d.display.y)/2+d.display.y) : sy(d.display.y); })
							.attr(t._wheight, function(d,i) { return Math.abs(sy(d.display.y) - forceymin) })
							.transition()
								.attr(t._wx, function(d,i) { return sxgroup(d.series); })
								.attr(t._wwidth, sxgroup.rangeBand() )
                    }
				}
                else {
    				( mode == 'resize' ? bars.transition().duration(t._duration) : 
                        bars.transition().duration(t._duration).delay(function(d,i) { return i * t._delay / data[0].values.length }) )
						.attr(t._wy, function(d,i) { return sy( (centered ? (yMax-d.display.y)/2+d.display.y : d.display.y) + d.display.y0 ); })
						.attr(t._wheight, function(d,i) { return Math.abs(sy(d.display.y + (style != 'normal' ? d.display.y0 : 0)) - sy((style != 'normal' ? d.display.y0 : 0))) })
						.transition().duration(t._duration)
							.attr(t._wx, function(d,i) { return first; })
							.attr(t._wwidth, rangeBand );
				}
			}

			// old value to make animation
            t._previousstyle = style;
			t._nbdisplayed = data.length;
			t.sx0 = sx.copy();
			t.sxgroup0 = sxgroup.copy();
			t.sy0 = sy.copy();

		});
	
		this.enddisplay(selection, mode);

		return this;
	}
});var Background = Chart.extend({
	init: function(view) {
        // -- Options
		this._stackable = false;
		this._draggable = true;
		this._semanticable = true;
		this._scatter = false;
		this._ordinal = false;
		
		// -- Scatter
		if( this._scatter ) this.scatter = new Scatter(null).size(16).sizeDomain([16,256]).layered(true);
		else this.dispatch = d3.dispatch('elementMouseover', 'elementMouseout');

		this._super('Background', view);
		
		if( this._scatter ) {
			this.scatter.id(this._id)
			d3.rebind(this, this.scatter, 'interactive', 'size', 'zScale', 'sizeDomain', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'clipRadius');
		}
		
		this._interpolate = "linear"; // controls the background interpolation
		this.dispatch = d3.dispatch('tooltipShow', 'tooltipHide');
		this._drag = d3.behavior.drag();
		this._size = 12;

		this._color = ['#fe7929', '#ce9b69', '#b4ad8b', '#96c2b3', '#7ed2d3', '#67e3f2'];
		this.sz = d3.scale.linear().range(this._color);
        
        if( Object.keys(this._view.charts).length == 0 ) {
            this._view._showXAxis = false;
        	this._view._showYAxis = false;
            this._view._useScroll = false;
            this._view._useZoom = false;
            this._view._margin = {top: 10, right: 0, bottom: 0, left: 0, xaxis: 0, yaxis: 0 };
        }
	},
	dragstart: function(d, container, main) {
		this.dragging(true);
		this._pos = d3.mouse(container);
		
		d3.select(container).transition().attr('r', this._size * 2)
	},
	dragmove: function(d, container, main) {
		this._pos = d3.mouse(container);
		this.getpos(); 
		var t = this;

		d3.select(main).selectAll('g.wrap.back').select('.groups').selectAll('.group').selectAll('circle.point-'+this._index)
			//.data(function(d,i) { return })
			.attr('cy', function(d,i) { 
				d.y = t.sy.invert(t._pos[1]);
				return t.sy(t.getY(d,i));
			});
		d3.select(main).selectAll('g.wrap.back').select('.groups').selectAll('.group').selectAll('rect.bar-'+this._index)
			.attr('fill', function(d,i){ return t.sz(d.y); })
	},
	dragend: function(d, container, main) {
		this.dragging(false);
		d3.select(container).transition().attr('r', this._size)
	},
	display: function(selection, mode) {

		if( selection ) this.selection = selection;
		else selection = this.selection;
		
		if( !selection ) return this;
		
		var t = this;
		selection.each(function(data) {
			var that = this;
			var sy = t.sy;
			var sx = t.sx;
			var sz = t.sz;
			var diff = sy.domain()[1]/t._color.length;
			var domain = d3.range(t._color.length).map(function(d) { return diff*d; });
			sz.domain(domain);
			var sxBands = t.view().sxBands;
			var sx0 = t.sx0 || sx;
			var sy0 = t.sy0 || sy;

			var wrap = d3.select(this).selectAll('g.wrap.back').data([data]);
			var wrapEnter = wrap.enter().append('g').attr('class', 'wrap cdd3 back');
			var gEnter = wrapEnter.append('g');
			var g = wrap.select('g')

			gEnter.append('g').attr('class', 'groups');

			// -- Scatter part
			if( t._scatter ) {
				gEnter.append('g').attr('class', 'scatterWrap');
				var scatterWrap = g.select('.scatterWrap').datum(data);
				t.scatter.display(d3.transition(scatterWrap));
			}

			wrap.attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')');

			var groups = wrap.select('.groups').selectAll('.group')
					.data(function(d) { return d }, function(d) { return d.key });
			groups.enter().append('g')
					.style('stroke-opacity', 1e-6)
					.style('fill-opacity', 1e-6);
			d3.transition(groups.exit())
					.style('stroke-opacity', 1e-6)
					.style('fill-opacity', 1e-6)
					.remove();
			
			groups.attr('class', function(d,i) { return 'group series-' + i })
					.classed('hover', function(d) { return d.hover })
					.style('fill', function(d,i){ return d._color || t._color[i % t._color.length] })
					.style('stroke', function(d,i){ return d._color || t._color[i % t._color.length] })
			d3.transition(groups)
					.style('stroke-opacity', 1)
					.style('fill-opacity', .5);
			
			var bars = groups.selectAll('rect.bar')
				.data(function(d) { return d.values });

			bars.exit().remove();

			var barsEnter = bars.enter().append('rect')
				.attr('class', function(d,i) { return 'bar bar-'+i })
				.attr('x', function(d,i,j) { return 0 })
				.attr('y', function(d) { return 0; })
				.attr('height', sy.range()[0])
				.attr('width', sxBands.rangeBand() )
				.attr('fill', function(d,i){ return sz(d.y); })
				.style('stroke-opacity', 0)
				.style('fill-opacity', 1e-6);

			bars
				.attr('class', function(d,i) { return 'bar bar-'+i })
				.attr('transform', function(d,i) { return 'translate(' + sxBands(t.getX(d,i)) + ',0)'; })
				.attr('height', sy.range()[0])
				.attr('width', sxBands.rangeBand() );

			bars.transition().style('stroke-opacity', 0).style('fill-opacity', 1);

			t._drag.origin(Object)
				.on("dragstart", function(d) { t.dragstart(d, this, that) })
	   			.on("drag", function(d) { t.dragmove(d, this, that) })
	    		.on("dragend", function(d) { t.dragend(d, this, that) });

			var points = groups.selectAll('circle.point').data(function(d) { return d.values });

			var pointsEnter = points.enter().append('circle')
				.attr('class', function(d,i) { return 'point point-'+i })
				.attr('cx', function(d,i) { return sx(t.getX(d,i)) })
				.attr('cy', function(d,i) { return sy(t.getY(d,i)) })
				.attr('r', sxBands.rangeBand())
				.attr('fill', function(d,i){ return sz(d.y); })
				.call(t._drag)

			var transition = (mode == 'zoom') ? points : d3.transition(points);
			transition
				.attr('cx', function(d,i) { return sx(t.getX(d,i)) })
				.attr('cy', function(d,i) { return sy(t.getY(d,i)) })
				.attr('fill', function(d,i){ return sz(d.y); })
				.attr('r', sxBands.rangeBand())

			t._nbdisplayed = data.length;
			t.sx0 = sx.copy();
			t.sy0 = sy.copy();
		});
		
		this.enddisplay(selection, mode);

		return this;
	},
	x: function(_) {
		if (!arguments.length) return this.getX;
		this.getX = _;
		this.scatter.x(_); // fix this
		return this;
	},
	y: function(_) {
		if (!arguments.length) return this.getY;
		this.getY = _;
		this.scatter.y(_);
		return this;
	},
	color: function(_) {
		if (!arguments.length) return this._color;
		this._color = _;
		this.sz = d3.scale.linear().range(this._color);
		return this;
	},
	
	interpolate: function(_) {
		if (!arguments.length) return this._interpolate;
		this._interpolate = _;
		return this;
	},
	
	defined: function(_) {
		if (!arguments.length) return this._defined;
		this._defined = _;
		return this;
	},
	
	isArea: function(_) {
		if (!arguments.length) return this._isArea;
		this._isArea = _;
		return this;
	},
});var weatherdata = [
			{
    			name: 'sun',
				value: 0,
				path: "M21.997,2h-3.998c-1.104,0-2-0.896-2-1.999c0-1.104,0.896-2,2-2h3.998c1.104,0,2,0.896,2,2  C23.997,1.104,23.104,2,21.997,2z M14.143-11.312c-0.781,0.781-2.05,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l2.828-2.828  c0.778-0.781,2.047-0.781,2.828,0c0.778,0.781,0.778,2.047,0,2.828L14.143-11.312z M0.001,11.999c-6.627,0-12-5.373-12-11.999  c0-6.627,5.372-11.999,12-11.999c6.627,0,11.998,5.372,11.998,11.999C11.999,6.626,6.628,11.999,0.001,11.999z M0.001-7.999  c-4.418,0-8,3.581-8,7.999c0,4.417,3.583,7.999,8,7.999S7.999,4.417,7.999,0C7.999-4.417,4.419-7.999,0.001-7.999z M0.001-15.998  c-1.105,0-2-0.896-2-2v-3.999c0-1.104,0.895-2,2-2c1.104,0,2,0.896,2,2v3.999C2.001-16.894,1.104-15.998,0.001-15.998z   M-14.14-11.312l-2.828-2.828c-0.781-0.781-0.781-2.047,0-2.828c0.781-0.781,2.047-0.781,2.828,0l2.828,2.828  c0.781,0.781,0.781,2.047,0,2.828C-12.093-10.531-13.359-10.531-14.14-11.312z M-15.998,0c0,1.104-0.896,1.999-2,1.999h-4  C-23.102,2-23.997,1.104-23.997,0c0-1.104,0.896-2,1.999-2h4C-16.893-2-15.998-1.104-15.998,0z M-14.14,11.313  c0.781-0.781,2.047-0.781,2.828,0c0.781,0.779,0.781,2.047,0,2.828l-2.828,2.826c-0.781,0.781-2.047,0.781-2.828,0  c-0.781-0.779-0.781-2.047,0-2.826L-14.14,11.313z M0.001,15.999c1.104,0,2,0.895,2,1.998v4c0,1.105-0.896,2-2,2  c-1.105,0-2-0.895-2-2v-4C-1.999,16.894-1.104,15.999,0.001,15.999z M14.143,11.313l2.828,2.828c0.778,0.779,0.778,2.047,0,2.826  c-0.781,0.781-2.05,0.781-2.828,0l-2.828-2.826c-0.781-0.781-0.781-2.049,0-2.828C12.093,10.532,13.359,10.532,14.143,11.313z"
			},
			{
				name: 'cloudwithsun',
				value: 1,
				path: "M21.081-1.466h-3.326c-0.918,0-1.664,0.745-1.664,1.663  c0,0.919,0.745,1.664,1.664,1.664h3.326c0.919,0,1.664-0.744,1.664-1.664C22.745-0.722,21.999-1.466,21.081-1.466z M16.899-13.915  c-0.649-0.65-1.702-0.65-2.351,0l-2.352,2.352c-0.65,0.65-0.65,1.702,0,2.352c0.649,0.649,1.702,0.649,2.352,0l2.351-2.352  C17.548-12.213,17.548-13.265,16.899-13.915z M12.767,0.197c0-5.511-4.468-9.978-9.979-9.978c-2.979,0-5.634,1.319-7.462,3.389  c-1.446-0.523-2.994-0.807-4.59-0.807c-7.433,0-13.48,6.047-13.48,13.479c0,7.433,6.047,13.479,13.48,13.479H4.115  c5.558,0,10.08-4.522,10.08-10.08c0-2.278-0.768-4.375-2.047-6.065C12.539,2.547,12.766,1.4,12.767,0.197z M2.787-6.455  c3.674,0,6.652,2.978,6.652,6.651c0,0.306-0.028,0.604-0.069,0.898C7.838,0.153,6.042-0.4,4.115-0.4  c-0.538,0-1.072,0.042-1.599,0.126C1.498-2.105,0.083-3.643-1.59-4.802C-0.42-5.829,1.109-6.455,2.787-6.455z M4.115,16.433H-9.265  c-5.599,0-10.153-4.555-10.153-10.153c0-5.599,4.555-10.153,10.153-10.153c4.073,0,7.739,2.422,9.34,6.17l0.59,1.382l1.435-0.448  c0.65-0.203,1.327-0.305,2.014-0.305c3.724,0,6.753,3.03,6.753,6.753S7.838,16.433,4.115,16.433z M2.787-13.108  c0.919,0,1.664-0.745,1.664-1.663v-3.325c0-0.918-0.745-1.663-1.664-1.663c-0.918,0-1.663,0.745-1.663,1.663v3.325  C1.124-13.853,1.869-13.108,2.787-13.108z M-8.973-9.211c0.65,0.649,1.703,0.649,2.352,0c0.649-0.65,0.649-1.702,0-2.352  l-2.352-2.352c-0.648-0.65-1.702-0.65-2.351,0c-0.649,0.65-0.649,1.702,0,2.352L-8.973-9.211z"			},
            {
    			name: 'cloud',
				value: 2,
				path: "M10.088,16.208H-6c-8.938,0-16.208-7.271-16.208-16.208c0-8.938,7.271-16.208,16.208-16.208  c5.933,0,11.326,3.219,14.165,8.328c0.634-0.102,1.276-0.152,1.923-0.152c6.683,0,12.12,5.438,12.12,12.121  C22.208,10.771,16.771,16.208,10.088,16.208z M-6-12.208c-6.732,0-12.208,5.477-12.208,12.208c0,6.731,5.477,12.208,12.208,12.208  h16.088c4.478,0,8.12-3.643,8.12-8.12c0-4.478-3.643-8.121-8.12-8.121c-0.826,0-1.641,0.124-2.422,0.367L5.941-3.127l-0.71-1.662  C3.306-9.296-1.103-12.208-6-12.208z"
			},
			{
    			name: 'rain',
				value: 10,
				path: "M19.192-9.704C20.978-7.65,21.997-4.934,21.997-2c0,5.223-3.342,9.652-7.998,11.3v-4.38  c2.39-1.383,4-3.96,4-6.92c0-4.417-3.582-7.999-8-7.999c-1.6,0-3.084,0.48-4.334,1.291c-1.229-5.317-5.972-9.29-11.663-9.29  c-6.627,0-11.998,5.372-11.998,11.998c0,3.55,1.551,6.729,4,8.925v4.916c-4.777-2.769-8-7.921-8-13.841  c0-8.835,7.162-15.997,15.998-15.997c1.572,0,3.599,0.342,4.523,0.654s2.394,0.78,3.812,1.696c2.306,1.489,4.285,3.452,5.629,5.854  c0.664-0.113,1.338-0.205,2.033-0.205c2.125,0,4.279,0.593,5.85,1.527S18.336-10.688,19.192-9.704z M-8-2c1.105,0,2,0.897,2,2  v15.997c0,1.105-0.895,2-2,2c-1.104,0-2-0.895-2-2V0C-10-1.104-9.103-2-8-2z M0,2C1.104,2,2,2.894,2,4v15.998  c0,1.104-0.896,2-2.001,2s-2-0.896-2-2V4C-2,2.894-1.105,2,0,2z M7.999-2c1.104,0,2,0.897,2,2v15.997c0,1.105-0.896,2-2,2  s-2-0.895-2-2V0C5.999-1.104,6.895-2,7.999-2z"			},
            {
    			name: 'storm',
				value: 30,
				path: "M21.816-4h0.009c-0.362-2.148-1.217-4.169-2.634-5.704c-0.986-1.068-2.01-1.984-3.342-2.767   c-1.375-0.808-3.726-1.527-5.851-1.527c-0.696,0-1.369,0.092-2.033,0.205c-1.344-2.402-3.488-4.599-5.629-5.853   s-2.612-1.281-3.812-1.697s-2.95-0.655-4.522-0.655c-8.836,0-15.998,7.163-15.998,15.999c0,0.678,0.056,1.342,0.138,1.999   c0.787,6.293,5.213,11.452,11.116,13.282l1.351-3.777C-13.743,4.224-17.066,0.549-17.831-4h0.015   c-0.111-0.65-0.182-1.316-0.182-1.999c0-6.627,5.372-12,11.999-12c5.69,0,10.434,3.975,11.664,9.291   C6.917-9.518,8.398-9.998,10-9.998c3.725,0,6.848,2.551,7.736,5.999c0.164,0.642,0.263,1.31,0.263,2   c0,3.535-2.297,6.531-5.478,7.587L8.937,9.999c0.412,0,0.781,0,1.062,0c6.626,0,11.998-5.372,11.998-11.999   C21.997-2.681,21.925-3.347,21.816-4z M8.999,6 2,6 7.999,-4 -2,-4 -7,9.999 -0.4,9.999 -4,21.997z"
			},
	];


var Weather = Chart.extend({
	init: function(view) {
        // -- Options
		this._stackable = false;
		this._draggable = true;
		this._semanticable = true;
		this._scatter = false;
		this._ordinal = false;
		
		// -- Scatter
		if( this._scatter ) this.scatter = new Scatter(null).size(16).sizeDomain([16,256]).layered(true);
		else this.dispatch = d3.dispatch('elementMouseover', 'elementMouseout');

		this._super('Weather', view);
        
        if( Object.keys(this._view.charts).length == 0 ) {
            this._view._showXAxis = false;
        	this._view._showYAxis = false;
            this._view._margin = {top: 10, right: 0, bottom: 0, left: 0, xaxis: 0, yaxis: 0 };
        }
        
		if( this._scatter ) {
			this.scatter.id(this._id)
			d3.rebind(this, this.scatter, 'interactive', 'size', 'zScale', 'sizeDomain', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'clipRadius');
		}
		
		this._interpolate = "linear"; // controls the weatherground interpolation
		this.dispatch = d3.dispatch('tooltipShow', 'tooltipHide');
		this._drag = d3.behavior.drag();
		this._size = 12;

		this._color = ['#3D6167', '#5F7B75', '#9A754A', '#D7701D', '#FF6C00'];
		this.sz = d3.scale.linear().range(this._color);
	},
	dragstart: function(d, main) {
		this.dragging(true);
		this._pos = d3.mouse(main);
        this._pos[1] += 38; // fix bug
		
		//d3.select(container).transition().attr('r', this._size * 2)
	},
    getweather: function(val) {
        var i = 0; // sun by default
        if( val >= 0 && weatherdata[weatherdata.length-val-1] ) i = weatherdata.length-val-1;
        else if( this._pos ) {
            if( this._pos[1] <= 0 ) i = 0;
            else if( this._pos[1] >= this.sy.range()[0] ) i = weatherdata.length-1;
            else i = Math.floor(this._pos[1]*weatherdata.length/this.sy.range()[0]);
        }
        
        // adjust values if required by the client
        if( this.view()._changedata ) this.view()._changedata( this._index, i );
        
        return weatherdata[i].path; 
	},
	dragmove: function(d, main) {
		this._pos = d3.mouse(main);
        this._pos[1] += 38; // fix bug
		this.getpos(); 
		var t = this;
        var dy = 0;
        if( this._pos ) {
            if( this._pos[1] <= 0 ) dy = 0;
            else if( this._pos[1] >= this.sy.range()[0] ) dy = this.sy.range()[0];
            else dy = this._pos[1];
        } 
		/*d3.select(main).selectAll('g.wrap.weather').select('.groups').selectAll('.group').selectAll('circle.point-'+this._index)
			//.data(function(d,i) { return })
			.attr('cy', function(d,i) { 
				dy = d.y = t.sy.invert(t._pos[1]);
				return t.sy(t.getY(d,i));
			});*/
		d3.select(main).selectAll('g.wrap.weather').select('.groups').selectAll('.group').selectAll('rect.bar-'+this._index)
			.attr('fill', function(d,i){ return t.sz(t.sy.invert(dy)); })

		d3.select(main).selectAll('g.wrap.weather').select('.groups').selectAll('.group').selectAll('path.weather-'+this._index)
			.attr('d', function(d,i){ return t.getweather(); })   //t._index,main); })
	},
	dragend: function(d, container, main) {
		this.dragging(false);
		//d3.select(container).transition().attr('r', this._size)
	},
	display: function(selection, mode) {

		if( selection ) this.selection = selection;
		else selection = this.selection;
		
		if( !selection ) return this;
		
		var t = this;
		selection.each(function(data) {
			var that = this;
			var sy = t.sy;
			var sx = t.sx;
			var sz = t.sz;
            
			var diff = sy.domain()[1]/t._color.length;
			var domain = d3.range(t._color.length).map(function(d) { return diff*d; });
			sz.domain(domain);
			var sxBands = t.view().sxBands;
			var sxPoints = t.view().sxPoints;
			var sx0 = t.sx0 || sx;
			var sy0 = t.sy0 || sy;

			var wrap = d3.select(this).selectAll('g.wrap.weather').data([data]);
			var wrapEnter = wrap.enter().append('g').attr('class', 'wrap cdd3 weather');
			var gEnter = wrapEnter.append('g');
			var g = wrap.select('g')

			gEnter.append('g').attr('class', 'groups');

			// -- Scatter part
			if( t._scatter ) {
				gEnter.append('g').attr('class', 'scatterWrap');
				var scatterWrap = g.select('.scatterWrap').datum(data);
				t.scatter.display(d3.transition(scatterWrap));
			}

			wrap.attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')');

			var groups = wrap.select('.groups').selectAll('.group')
					.data(function(d) { return d }, function(d) { return d.key });
			groups.enter().append('g')
					.style('stroke-opacity', 1e-6)
					.style('fill-opacity', 1e-6);
			d3.transition(groups.exit())
					.style('stroke-opacity', 1e-6)
					.style('fill-opacity', 1e-6)
					.remove();
			
			groups.attr('class', function(d,i) { return 'group series-' + i })
					.classed('hover', function(d) { return d.hover })
					.style('fill', function(d,i){ return d._color || t._color[i % t._color.length] })
					.style('stroke', function(d,i){ return d._color || t._color[i % t._color.length] })
			d3.transition(groups)
					.style('stroke-opacity', 1)
					.style('fill-opacity', .5);

            t._drag.origin(Object)
				.on("dragstart", function(d) { t.dragstart(d, that) })
	   			.on("drag", function(d) { t.dragmove(d, that)})
	    		.on("dragend", function(d) { t.dragend(d, that)});

			// weatherground
			var bars = groups.selectAll('rect.bar')
				.data(function(d) { return d.values });

			bars.exit().remove();

			var barsEnter = bars.enter().append('rect')
				.attr('class', function(d,i) { return 'bar bar-'+i })
				.attr('x', function(d,i,j) { return 0 })
				.attr('y', function(d) { return 0; })
				.attr('height', sy.range()[0])
				.attr('width', sxBands.rangeBand() )
				.attr('fill', function(d,i){ return sz(d.y); })
				.style('stroke-opacity', 0)
				.style('fill-opacity', 1e-6);

			bars
				.attr('transform', function(d,i) { return 'translate(' + sxBands(t.getX(d,i)) + ',0)'; })
				.attr('height', sy.range()[0])
				.attr('width', sxBands.rangeBand() )
                .call(t._drag);

			bars.transition().style('stroke-opacity', 0).style('fill-opacity', 1);

		
            /*var points = groups.selectAll('circle.point').data(function(d) { return d.values });

			var pointsEnter = points.enter().append('circle')
				.attr('class', function(d,i) { return 'point point-'+i })
				.attr('cx', function(d,i) { return sx(t.getX(d,i)) })
				.attr('cy', function(d,i) { return sy(t.getY(d,i)) })
				.attr('r', t._size)
				.attr('fill', function(d,i){ return sz(d.y); })
				.call(t._drag)

			//var trans = (mode == 'zoom') ? points : d3.transition(points);
			points
				.attr('cx', function(d,i) { return sx(t.getX(d,i)) })
				.attr('cy', function(d,i) { return sy(t.getY(d,i)) })
				.attr('fill', function(d,i){ return sz(d.y); })
				.attr('r', t._size)*/

			// weather
			var weather = groups.selectAll('path.weather').data(function(d) { return d.values });
			weather.exit().remove();

			var weatherEnter = weather.enter().append('path')
				.attr('class', function(d,i) { return 'weather weather-'+i })
				.attr('d', function(d,i){ return t.getweather(d.y); })
				.attr('fill', 'white')
				.attr('transform', function(d,i) { return 'translate(' + sxPoints(t.getX(d,i)) + ','+ (sy.range()[0]/2) +')scale(1)'; })
				.style('stroke-opacity', 1e-6)
				.style('fill-opacity', 1e-6)
                .call(t._drag);

			var trans = (mode == 'zoom') ? weather : d3.transition(weather);
			trans
				.attr('transform', function(d,i) { return 'translate(' + sxPoints(t.getX(d,i)) + ','+ (sy.range()[0]/2) +')scale('+(sxBands.rangeBand()/92)+')'; })
				.style('fill-opacity', 1);

			t._nbdisplayed = data.length;
			t.sx0 = sx.copy();
			t.sy0 = sy.copy();
		});
		
		this.enddisplay(selection, mode);

		return this;
	},
	x: function(_) {
		if (!arguments.length) return this.getX;
		this.getX = _;
		this.scatter.x(_); // fix this
		return this;
	},
	y: function(_) {
		if (!arguments.length) return this.getY;
		this.getY = _;
		this.scatter.y(_);
		return this;
	},
	color: function(_) {
		if (!arguments.length) return this._color;
		this._color = _;
		this.sz = d3.scale.linear().range(this._color);
		return this;
	},
	
	interpolate: function(_) {
		if (!arguments.length) return this._interpolate;
		this._interpolate = _;
		return this;
	},
	
	defined: function(_) {
		if (!arguments.length) return this._defined;
		this._defined = _;
		return this;
	},
	
	isArea: function(_) {
		if (!arguments.length) return this._isArea;
		this._isArea = _;
		return this;
	},
});var Value = Chart.extend({
	init: function(view) {
		// -- Options
		this._stackable = false;
		this._draggable = true;
		this._semanticable = true;
		this._scatter = false;
		this._ordinal = true;

		this._super('Value', view);
        
        this.sxgroup = d3.scale.ordinal();
	},
	display: function(selection, mode) {

		if( selection ) this.selection = selection;
		else selection = this.selection;
		
		if( !selection ) return this;
		
		var t = this;
		selection.each(function(data) {
			var that = this;
			var sy = t.sy;
			var sx = t.sx;
            var sxgroup = t.sxgroup;
            
			var sx0 = t.sx0 || sx;
			var sy0 = t.sy0 || sy;
            var sxgroup0 = t.sxgroup0 || sxgroup;
    
            sxgroup.domain( d3.range(data.length-1) ).rangeBands([0, sx.rangeBand()]);

			var wrap = d3.select(this).selectAll('g.wrap.value').data([data[0]]);
			var wrapEnter = wrap.enter().append('g').attr('class', 'wrap cdd3 value');
			var gEnter = wrapEnter.append('g');

			gEnter.append('g').attr('class', 'group');
		
			var g = wrap.select('g')
			wrap.attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')');

			var group = wrap.select('.group');
			
			group
				.attr('class', function(d,i) { return 'group text-'+i; })
				.style('fill', function(d,i){ return d._color || t._color[i % t._color.length] })
				.style('stroke', function(d,i){ return d._color ||  t._color[i % t._color.length] })
                .style('stroke-opacity', 1e-6).style('fill-opacity', 1e-6);
			d3.transition(group)
				.style('stroke-opacity', 1).style('fill-opacity', 1);
            
            for( var k = 1; k < data.length; k++ ) {
                var values = group.selectAll('text.value-'+k).data(function(d) { return d.values });
                
                values.exit().remove();
            
                values.enter().append('text')
                    .text(function(d,i) { var val = data[k].values[i].y; return (val>0 || val!='') ? val : ''; })
                    .attr('class', function(d,i) { return 'value-'+k; })
                    .attr('text-anchor', k==2 ? 'end' : 'start')
    				.attr('dy', k==2 ? -11 : 0)
    				.attr('dx', k==2 ? 0 : -18)
                    //.attr('transform', function(d,i) { return 'translate(' + (sx(t.getX(d,i))+sxgroup(k-1)) + ',0)'; })
                    
                values //.transition()
                    .text(function(d,i) { var val = data[k].values[i].y; return (val>0 || val!='') ? val : ''; })
                    .attr('transform', function(d,i) { return 'translate(' +(sx(t.getX(d,i))+sxgroup(k-1)+sxgroup.rangeBand()/2)+ ',' + (sy(t.getY(d,i))-10) + ')'; })
                    .text(function(d,i) { var val = data[k].values[i].y; return (val>0 || val!='') ? val : ''; })
            }
            
			t._nbdisplayed = data.length;
			t.sx0 = sx.copy();
			t.sy0 = sy.copy();
		});
		
		this.enddisplay(selection, mode);

		return this;
	},
});var Arealine = Area.extend({
    init: function(view) {
		this._super(view);
		this._type = 'Arealine';
		this._gradient = false;
	},
});var Hbar = Bar.extend({
    init: function(view) {
		this._super(view);
		this._type = 'Hbar';
		this._hmode = true;
		this._wheight = 'width';
		this._wwidth = 'height';
		this._wx = 'y';
		this._wy = 'x';
	},
});var Line = Chart.extend({
	init: function(view) {
		// -- Options
		this._stackable = false;
		this._semanticable = true;
		this._scatter = (view.state._w8 || view.state.ipad) ? false : true;
		this._ordinal = false;
		
		// -- Scatter
		if( this._scatter ) this.scatter = new Scatter(null).size(16).sizeDomain([16,256]).layered(true);
		else this.dispatch = d3.dispatch('elementMouseover', 'elementMouseout');

		this._super('Line', view);
		
		if( this._scatter ) {
			this.scatter.id(this._id)
			d3.rebind(this, this.scatter, 'interactive', 'size', 'zScale', 'sizeDomain', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'clipRadius');
		}
		
		this._interpolate = "linear"; // controls the line interpolation
		this.dispatch = d3.dispatch('tooltipShow', 'tooltipHide');
		this._size = 6;
	},
	draw: function(paths, sx, sy) {
		var t = this;
		paths.attr("d", function(d) { return d3.svg.line()
		  .interpolate(t._interpolate)
		  .defined(t._defined)
		  .x(function(d,i) { return sx(t.getX(d,i)) })
		  .y(function(d,i) { return sy(t.getY(d,i)) })(d.values.slice(0, t.k)); });
	},
	display: function(selection, mode, duration) {

		if( selection ) this.selection = selection;
		else selection = this.selection;
		
		if( !selection ) return this;
		
		var t = this;
		selection.each(function(data) {
            
			var that = this;
			var sy = t.sy;
			var sx = t.sx;
			var sx0 = t.sx0 || sx;
			var sy0 = t.sy0 || sy;

            var gnum = t._gnum ? t._gnum : 0;
			var wrap = d3.select(this).selectAll('g.wrap.line.line-'+gnum).data([data]);
			var wrapEnter = wrap.enter().append('g').attr('class', 'wrap cdd3 line line-'+gnum);
			var gEnter = wrapEnter.append('g');
			//var g = wrap.select('g')

			//gEnter.append('g').attr('class', 'groups');
            
			// -- Scatter part
			if( t._scatter ) {
                t.scatter.sx = sx;
                t.scatter.sy = sy;
				gEnter.append('g').attr('class', 'scatterWrap');
				var scatterWrap = g.select('.scatterWrap').datum(data);
				t.scatter.display(scatterWrap);
			}

			wrap.attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')');

			/*var groups = wrap.select('.groups').selectAll('.group')
					.data(function(d) { return d }, function(d) { return d.key });
			groups.enter().append('g')
			groups.exit().transition()
					.style('stroke-opacity', 1e-6)
					.style('fill-opacity', 1e-6)
					.remove();
			
			groups.attr('class', function(d,i) { return 'group series-' + i })
					.classed('hover', function(d) { return d.hover })
					.style('fill', function(d,i){ return d._color || t._color[i % t._color.length] })
					.style('stroke', function(d,i){ return d._color || t._color[i % t._color.length] })*/

			//if( t._initial ) groups.selectAll('path.line').remove(); // remove old path if init

            if( data && data[0] && data[0].values.length == 1 ) {
                var points = wrap.selectAll('circle.line').data(data);
                points.enter().append('circle')
                    .attr('class', function(d,i) { return 'line line-'+i; })
                
                points.attr('r', 8)
                    .attr('cx', function(d,i) { return sx(t.getX(d.values[0],i)) })
                    .attr('cy', function(d) { return sy(d.values[0].display.y); })
                    .style('fill', function(d,i){ return d._color || t._color[i % t._color.length] })
                
                points.exit().remove();
            }
            else {
                var linePaths = wrap.selectAll('path.line').data(data);
        		var paths = linePaths.enter().append('path')
    				.attr('class', function(d,i) { return 'line line-'+i; })
                    .style('fill', 'none')
                    
    			linePaths.exit().remove(); 
                
                linePaths.style('stroke', function(d,i){ return d._color || t._color[i % t._color.length] }).style('stroke-width', 2)
                            
    			if( t._initial ) {
    				t.k = 0;
                    
    				d3.timer(function() {
    					t.draw(paths,sx,sy);
    					t.k++;
    					if( t.k > data[0].values.length ) { 
                            if( t._view._timeout !== false ) clearTimeout(t._view._timeout); 
                            //t._view.state._event({event: 'ready'});
                            return true;
                        }
    				});
    			}
    			else {
    				// remove curve
    				/*linePaths.exit().transition()
    					.attr('d', function(d) { 
                            var line = d3.svg.line().interpolate(t._interpolate).defined(t._defined);
                            //if( d._predicted ) return line.x(function(d,i) { return sx(t.getX(d,i)) }).y(function(d,i) { return sy(t.getY(d,i)) })(d.values);
                            return line.x(function(d,i) { return sx0(t.getX(d,i)) }).y(function(d,i) { return sy0(0) })(d.values);
                        })
                        .style('stroke-opacity', 1e-6)
    			  		.transition().duration(t._duration)
    			  			.attr('d', function(d) { return d3.svg.line()
    							  .interpolate(t._interpolate)
    							  .defined(t._defined)
    							  .x(function(d,i) { return sx(t.getX(d,i)) })
    							  .y(function(d,i) { return sy(t.getY(d,i)) })(d.values); } )
    			  				  .style('stroke-opacity', 1);*/
    			  	
                    var linepath = d3.svg.line().x(function(d,i) { return sx(t.getX(d,i)) }).y(function(d) { return sy(d.display.y); }).interpolate(t._interpolate);
    			  	var groupspath = ( mode != 'zoom' && mode != 'timeline' && mode != 'resize' ) ? linePaths.transition() : linePaths;
                    if( mode == 'direct' && duration ) groupspath.duration(duration);
                    
                    groupspath.attr('d', function(d,i) { return linepath(d.values,i); })
    
    			  	// add curve
    				/*if( t._nbdisplayed != null && t._nbdisplayed < data.length ) {
    			  		sy0 = sy.copy();
    
    			  		paths.attr('d', function(d) { 
    			  			var line = d3.svg.line().interpolate(t._interpolate).defined(t._defined);
    			  			if( d._predicted ) return line.x(function(d,i) { return sx(t.getX(d,i)) }).y(function(d,i) { return sy(t.getY(d,i)) })(d.values);
    			  			else return line.x(function(d,i) { return sx(t.getX(d,i)) }).y(function(d,i) { return sy(0) })(d.values);
    					} ) //.style('stroke-opacity', 1e-6);
    
    					linePaths.transition().attr('d', function(d) { 
    							return d3.svg.line()
    							  .interpolate(t._interpolate)
    							  .defined(t._defined)
    							  .x(function(d,i) { return sx(t.getX(d,i)) })
    							  .y(function(d,i) { return sy(t.getY(d,i)) })
    							  (d.values); 
    						  })
    						  .style('stroke-opacity', 1);
    				}*/
    			}
            }

			t._nbdisplayed = data.length;
			t.sx0 = sx.copy();
			t.sy0 = sy.copy();
		});
		
		this.enddisplay(selection, mode);

		return this;
	},
	x: function(_) {
    	if (!arguments.length) return this.getX;
		this.getX = d3.functor(_);
		return this;
	},
	y: function(_) {
		if (!arguments.length) return this.getY;
		this.getY = d3.functor(_);
		return this;
	},
	
	interpolate: function(_) {
		if (!arguments.length) return this._interpolate;
		this._interpolate = _;
		return this;
	},
	
	defined: function(_) {
		if (!arguments.length) return this._defined;
		this._defined = _;
		return this;
	},
	
	isArea: function(_) {
		if (!arguments.length) return this._isArea;
		this._isArea = _;
		return this;
	},
});var Punchcard = Chart.extend({
    init: function(view) {
        // -- Options
    	this.dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
		this._stackable = false;
		this._semanticable = false;
		
		this._super('Punchcard', view);
        
        if( Object.keys(this._view.charts).length == 0 ) {
            this._view._showXAxis = false;
    		this._view._showYAxis = false;
            this._view._useScroll = false;
            this._view._useZoom = false;
            this._view._margin = {top: 10, right: 0, bottom: 0, left: 0, xaxis: 0, yaxis: 0 };
        }
        
        this._ratio = 10;
        this._aggregation = 'avg';
	},
	
	display: function(selection, mode) {
		
		if( selection ) this.selection = selection;
		else selection = this.selection;
		
		if( !selection || mode == 'zoom') return this;
		
		var t = this;
		selection.each(function(data) {
			var availableWidth = t._width - t._margin.left - t._margin.right,
				availableHeight = t._height - t._margin.top - t._margin.bottom;
				radius = Math.min(availableWidth, availableHeight) / 2;
            
            /*var data = [
                [20130407017,17279747776,15251540237,15421881957,15068328844,11128489064,11232670687,12841493420,13504625836,14716474576,13665206102,11358394695,11306770570,11149931314,11528783834,12518759905,14297530053,15730944764,15682878868,14723984975,13399781819,14636959096,16890189693,20417146594],
                [19688311906,16971182117,15114246979,15362491125,14672726493,10413279751,11135600122,13456808043,14008367341,15073710121,14137603543,11667485239,11840987646,11449424628,11896409501,12727351924,14199648414,15834268789,15938790176,15027620136,13517822996,14891890808,17533431509,21357632911],
                [20297448742,17243895267,15165563080,15235098885,14878298537,10962249261,10936571964,12769156286,13605030603,14541859157,13561870799,11188349148,11084768829,11034137234,11432191090,12514555295,14397878211,15880569444,15732931254,14652729895,13233665022,14753673978,17049767249,20556973455],
                [19719523783,16824874216,14851611292,15003306672,14263183027,10842058953,11184632689,13224877353,13803997242,15025544659,13889980121,11731537372,11782315115,11534212969,11920620565,12670586952,14096480318,15285935714,15355580927,14574280646,13417099251,15018997348,17331317789,20978321121],
                [19856336871,16978599143,14977743444,14175094854,12502677971,9245335374,10695525386,13679754544,14768407156,15719200149,15075021467,12373444131,12411767691,11914692834,11951213401,12601871392,13830456064,15059296726,14970934779,14078843115,13255826943,15325959448,18100908901,22151273671],
                [21008942842,17493621926,14996959726,14203725072,11658665372,8184608911,9767902263,13266787677,15546220250,16702713056,15322705673,12009185544,11765333698,11283298656,11274580103,11865530421,13208652309,15001349937,15373262225,14546620630,13283721470,14957589368,17342841075,21392660634],
                [21304375204,17779934446,15292487147,14475241301,11907610200,8340349641,9914260394,13452758568,15817062695,16958899649,15522104740,12197651312,11851191747,11324465910,11238983955,11864463007,13244372270,15030019028,15555751648,14721803560,13269586107,14922701391,17666983477,21889797228]
            ];*/
            
            if( t._view.attached() ) {
                // get behavior
                var view = t._view.attached();
                var behaviordomain = [view.behavior.x().domain()[0].getTime()-view.sxInterval, view.behavior.x().domain()[1].getTime()+view.sxInterval];
                //var newdomain = view._xDomainRoot.filter(function(d) { return (d>=behaviordomain[0] && d<=behaviordomain[1]); });
                
                // recompose days
                var total = [];
                view.allseries.map(function(s, i) {
    				// sum the series
                    s.hour.filter(function(d) { return (d.x>=behaviordomain[0] && d.x<=behaviordomain[1]); }).map(function(d) {
                        var val = d.x;
                        if( !total[val.getDay()] ) total[val.getDay()] = [];
                        if( total[val.getDay()][val.getHours()] ) total[val.getDay()][val.getHours()].push(d.y)
                        else total[val.getDay()][val.getHours()] = [d.y];
                    })
    			});
                
                if( this._aggregation == 'avg' ) data = total.map(function(d1) { return d1.map(function(d2) { return d3.sum(d2)/d2.length; }); });
                else data = total.map(function(d1) { return d1.map(function(d2) { return d3.sum(d2); }); });
                
                // put sunday at the end
                data.push(data[0]);
                data.splice(0,1);
            }
            
            var wrap = d3.select(this).selectAll('g.wrap.punchcard').data([data]);
    		var wrapEnter = wrap.enter().append('g').attr('class', 'wrap cdd3 punchcard');
			var punchcard = wrapEnter.append('g');
            wrap.attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')');
    		
            var pane_left = 80
              , pane_right = availableWidth-80
              , width = pane_left + pane_right
              , height = availableHeight
              , margin = 10
              , i
              , j
              , tx
              , ty
              , max = 0;
            
            // X-Axis.
            var x = d3.scale.linear().domain([0, 23]).
              range([pane_left + margin, pane_right - 2 * margin]);
            
            // Y-Axis.
            var y = d3.scale.linear().domain([0, 6]).
              range([2 * margin, height - 10 * margin]);
            
            // Hour line markers by day.
            for (i in y.ticks(7)) {
              punchcard.
                append("g").
                selectAll("line").
                data([0]).
                enter().
                append("line").
                attr("x1", margin).
                attr("x2", width - 3 * margin).
                attr("y1", height - 3 * margin - y(i)).
                attr("y2", height - 3 * margin - y(i)).
                style("stroke-width", 1).
                style("stroke", "#efefef");
            
              punchcard.
                append("g").
                selectAll(".rule").
                data([0]).
                enter().
                append("text").
                style("font-size", 20).
                attr("x", margin).
                attr("y", height - 3 * margin - y(i) - 15).
                attr("text-anchor", "left").
                text(["Dimanche", "Samedi", "Vendredi", "Jeudi", "Mercredi", "Mardi", "Lundi"][i]);
            
              punchcard.
                append("g").
                selectAll("line").
                data(x.ticks(24)).
                enter().
                append("line").
                attr("x1", function(d) { return pane_left - 2 * margin + x(d); }).
                attr("x2", function(d) { return pane_left - 2 * margin + x(d); }).
                attr("y1", height - 4 * margin - y(i)).
                attr("y2", height - 3 * margin - y(i)).
                style("stroke-width", 1).
                style("stroke", "#ccc");
            }
            
            // Hour text markers.
            punchcard.
              selectAll(".rule").
              data(x.ticks(24)).
              enter().
              append("text").
              attr("class", "rule").
              attr("x", function(d) { return pane_left - 2 * margin + x(d); }).
              attr("y", height - 3 * margin).
              attr("text-anchor", "middle").
              text(function(d) {
                if (d === 0) {
                  return "12a";
                } else if (d > 0 && d < 12) {
                  return d;
                } else if (d === 12) {
                  return "12p";
                } else if (d > 12 && d < 25) {
                  return d - 12;
                }
              });
            
            // Data has array where indicy 0 is Monday and 6 is Sunday, however we draw
            // from the bottom up.
            data = data.reverse();
            
            // Find the max value to normalize the size of the circles.
            for (i = 0; i < data.length; i++) {
              max = Math.max(max, Math.max.apply(null, data[i]));
            }
            
            // Show the circles on the punchcard.
            for (i = 0; i < data.length; i++) {
              for (j = 0; j < data[i].length; j++) {
                punchcard.
                  append("g").
                  selectAll("circle").
                  data([data[i][j]]).
                  enter().
                  append("circle").
                  style("fill", "#888").
                  attr("class", "circle-"+i+"-"+j).
                  attr("r", function(d) { return d / max * t._ratio; }).
                  attr("transform", function() {
                      tx = pane_left - 2 * margin + x(j);
                      ty = t._margin.top + height - 7 * margin - y(i);
                      return "translate(" + tx + ", " + ty + ")";
                    });
                
                  wrap.selectAll(".circle-"+i+"-"+j).data([data[i][j]]).attr("r", function(d) { return d / max * t._ratio; });
              }
            }
		});

		this.enddisplay(selection, mode);
		
		return this;
	},

	y: function(_) {
		if (!arguments.length) return this.getY;
		this.getY = d3.functor(_);
		return this;
	},
	valueFormat: function(_) {
		if (!arguments.length) return this._valueFormat;
		this._valueFormat = _;
		return this;
	},
	showLabels: function(_) {
		if (!arguments.length) return this._showLabels;
		this._showLabels = _;
		return this;
	},
	donutLabelsOutside: function(_) {
		if (!arguments.length) return this._donutLabelsOutside;
		this._donutLabelsOutside = _;
		return this;
	},
	labelThreshold: function(_) {
		if (!arguments.length) return this._labelThreshold;
		this._labelThreshold = _;
		return this;
	},
	donut: function(_) {
		if (!arguments.length) return this._donut;
		this._donut = _;
		return this;
	},

});var Pie = Chart.extend({
	init: function(view) {
        // -- Options
		this.dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
		this._stackable = false;
		this._semanticable = false;
        this._behaviorable = false;
		
		this._super('Pie', view);
		
		this._valueFormat = d3.format(',.2f');
		this._showLabels = true;
		this._donutLabelsOutside = false;
		this._labelThreshold = .02; //if slice percentage is under this, don't show label
		this._donut = false;
        this._sum = 0;
        
        if( Object.keys(this._view.charts).length == 0 ) {
            this._view._showXAxis = false;
			this._view._showYAxis = false;
            this._view._useScroll = false;
            this._view._useZoom = false;
            this._view._inittime = false;
            if( this._view._autoadaptation ) {
                this._view._clipclip = false;
                this._view._margin = {top: 10, right: 0, bottom: 0, left: 0, xaxis: 0, yaxis: 0 };
            }
            this._view.showValueviewer(false);
        }
	},
	
	display: function(selection, mode) {
		
		if( selection ) this.selection = selection;
		else selection = this.selection;
		
		if( !selection || mode == 'zoom') return this;
		
		var t = this;
		selection.each(function(data) {
			var availableWidth = t._width - t._margin.left - t._margin.right,
				availableHeight = t._height - t._margin.top - t._margin.bottom;
				radius = Math.min(availableWidth, availableHeight) / 2;

			// -- reformat data
			data = data.map(function(s, i) {
				// sum the series
				var total = d3.sum(s.values, function(d, i) { return t.getY(d); }); //(s.disabled) ? 0 : ;
				return {x: s.key, y: total, rseries: i, _color: s._color, _disabled: s._disabled};
			});
			
            t._sum = d3.sum(data.map(function(d) { return d.y; }));
			var wrap = d3.select(this).selectAll('.wrap.pie').data([data]);
			var wrapEnter = wrap.enter().append('g').attr('class','cdd3 wrap pie chart-' + t._id);
			var gEnter = wrapEnter.append('g');
			var g = wrap.select('g');

			gEnter.append('g').attr('class', 'pie');

			wrap.attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')');
			g.select('.pie').attr('transform', 'translate(' + availableWidth / 2 + ',' + availableHeight / 2 + ')');

			d3.select(this)
				.on('click', function(d,i) {
					t.dispatch.chartClick({
						data: d,
						index: i,
						pos: d3.event,
						id: t._id
					});
				});

			var arc = d3.svg.arc().outerRadius((radius-(radius / 5)));
            
			if (t._donut) arc.innerRadius(radius / 2);

			// Setup the Pie chart and choose the data element
            
			var pie = d3.layout.pie()
				.sort(null)
				.value(function(d,i) { return (d._disabled || t._view._initial && i != 0) ? 0 : t.getY(d) });
            var pie2 = d3.layout.pie()
    			.sort(null)
				.value(function(d,i) { return (d._disabled) ? 0 : t.getY(d) });
                
			var slices = wrap.select('.pie').selectAll('.slice')
				.data(pie);

			slices.exit().remove();

			var ae = slices.enter().append('g')
					.attr('class', 'slice')
					.on('mouseover', function(d,i){
                        /*arc.innerRadius(radius / 2)
                        var path = d3.select(this).select('path').attr('d', arc)
                        setTimeout(function() { 
                            arc.innerRadius(0)
                            path.attr('d', arc)
                        }, 20)*/
					      d3.select(this).classed('hover', true);
    					  e = {
    						value: t.getY(d.data),
    						point: d.data,
                            color: d.data._color,
    						series: {key: t.getX(d.data)},
    						pos: [d3.event.pageX, d3.event.pageY],
    						pointIndex: i,
    						seriesIndex: i,
    						e: d3.event
    					  }
    					  t.dispatch.tooltipShow(e);
					  /*t.dispatch.elementMouseover({
						  series: d.key,
						  label: t.getX(d.data),
						  value: t.getY(d.data),
						  point: d.data,
						  pointIndex: i,
						  pos: [d3.event.pageX, d3.event.pageY],
						  id: t._id
					  });*/
					})
					.on('mouseout', function(d,i){
                        /*arc.innerRadius(0)
                        d3.select(this).select('path').transition().delay(4000).duration(3500).attr('d', arc).attrTween('d', arcTween)*/
					    d3.select(this).classed('hover', false);
					  /*t.dispatch.elementMouseout({
						  series: d.key,
						  label: t.getX(d.data),
						  value: t.getY(d.data),
						  point: d.data,
						  index: i,
						  id: t._id
					  });*/
                      
                        data = data.filter(function(d) { return !d._disabled; });
        				e = {
    						value: d.display ? d.display.y : d.y,
    						point: d,
    						//series: data[d.rseries],
    						pointIndex: i,
    						seriesIndex: d.rseries,
    						e: d3.event
    					};
    					t.dispatch.tooltipHide(e);
					})
					/*.on('click', function(d,i) {
					  dispatch.elementClick({
						  series: d.key,
						  label: t.getX(d.data),
						  value: t.getY(d.data),
						  point: d.data,
						  index: i,
						  pos: d3.event,
						  id: t._id
					  });
					  d3.event.stopPropagation();
					})
					.on('dblclick', function(d,i) {
					  dispatch.elementDblClick({
						  series: d.key,
						  label: t.getX(d.data),
						  value: t.getY(d.data),
						  point: d.data,
						  index: i,
						  pos: d3.event,
						  id: t._id
					  });
					  d3.event.stopPropagation();
					});*/

			  slices
				  .attr('fill', function(d,i) { return d.data._color || t._color[i % t._color.length]; })
				  .attr('stroke', function(d,i) { return d.data._color || t._color[i % t._color.length]; });

			  var paths = ae.append('path')
			  	  //.style('stroke', function(d,i) { return d.data._color || t._color[i % t._color.length]; })
			  	  .style('stroke-width', 0)
				  //.style('stroke-opacity', 1)
				  //.style('fill-opacity', 1)
				  .each(function(d) { this._current = d; })
				  //.attr('d', arc);
            
            
			  slices.data(pie2).select('path').transition()
				  .attr('d', arc)
				  .attrTween('d', arcTween)
				  .style('stroke-width', 0)
				  //.style('stroke-opacity', function(d,i) { return d.data._disabled ? 0 : 1; })
				  //.style('fill-opacity', function(d,i) { return d.data._disabled ? 0 : 1; });

			  if (t._showLabels) {
				// This does the normal label
				var labelsArc = arc;
				if (t._donutLabelsOutside) {
				  labelsArc = d3.svg.arc().outerRadius(arc.outerRadius())
				}

				ae.append("g").classed("label", true)
				  .each(function(d, i) {
					var group = d3.select(this);

					group
					  .attr('transform', function(d) {
						 d.outerRadius = radius + 10; // Set Outer Coordinate
						 d.innerRadius = radius + 15; // Set Inner Coordinate
						 return 'translate(' + labelsArc.centroid(d) + ')'
					  });

					group.append('rect')
						.style('stroke', '#fff')
						.style('fill', '#fff')
						.attr("rx", 3)
						.attr("ry", 3);

					/*group.append('text')
						.style('text-anchor', 'middle') //center the text on it's origin
						.style('fill', '#000')*/


				});

				slices.select(".label").transition()
				  .attr('transform', function(d) {
					  d.outerRadius = radius + 10; // Set Outer Coordinate
					  d.innerRadius = radius + 15; // Set Inner Coordinate
					  return 'translate(' + labelsArc.centroid(d) + ')';
				  });

				slices.each(function(d, i) {
				  var slice = d3.select(this);

				  slice
					.select(".label text")
					  .text(function(d, i) {
						var percent = (d.endAngle - d.startAngle) / (2 * Math.PI);
						return (d.value && percent > t._labelThreshold) ? t.getX(d.data) : '';
					  });
                    
                  /*if( slice.select('text').node() ) {
                      var textBox = slice.select('text').node().getBBox();
        			  slice.select(".label rect")
    					.attr("width", textBox.width + 10)
    					.attr("height", textBox.height + 10)
    					.attr("transform", function() {
    					  return "translate(" + [textBox.x - 5, textBox.y - 5] + ")";
    					});
                  }*/
				  
				});
			  }


			  // Computes the angle of an arc, converting from radians to degrees.
			  function angle(d) {
				var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
				return a > 90 ? a - 180 : a;
			  }

			  function arcTween(a) {
				if (!t._donut) a.innerRadius = 0;
				var i = d3.interpolate(this._current, a);
				this._current = i(0);
				return function(t) {
				  return arc(i(t));
				};
			  }

			  function tweenPie(b) {
				b.innerRadius = 0;
				var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
				return function(t) {
					return arc(i(t));
				};
			  }
		});

		this.enddisplay(selection, mode);
		
		return this;
	},

	y: function(_) {
		if (!arguments.length) return this.getY;
		this.getY = d3.functor(_);
		return this;
	},
	valueFormat: function(_) {
		if (!arguments.length) return this._valueFormat;
		this._valueFormat = _;
		return this;
	},
	showLabels: function(_) {
		if (!arguments.length) return this._showLabels;
		this._showLabels = _;
		return this;
	},
	donutLabelsOutside: function(_) {
		if (!arguments.length) return this._donutLabelsOutside;
		this._donutLabelsOutside = _;
		return this;
	},
	labelThreshold: function(_) {
		if (!arguments.length) return this._labelThreshold;
		this._labelThreshold = _;
		return this;
	},
	donut: function(_) {
		if (!arguments.length) return this._donut;
		this._donut = _;
		return this;
	},

});var Donut = Pie.extend({
    init: function(view) {
		this._super(view);
		this._type = 'Donut';
		this._donut = true;
        
        if( Object.keys(this._view.charts).length == 0 ) {
            this._view._showXAxis = false;
    		this._view._showYAxis = false;
            this._view._useScroll = false;
            this._view._useZoom = false;
            if( this._view._autoadaptation ) { 
                this._view._margin = {top: 10, right: 0, bottom: 0, left: 0, xaxis: 0, yaxis: 0 };
            }
        }
	},
});var Gauge = Donut.extend({
    init: function(view) {
    	this._super(view);
		this._type = 'Gauge';
        this._duration = 1000;
        this._percent = .34;
        this._fontsize = 42;
        
        if( this._view._autoadaptation && Object.keys(this._view.charts).length == 0 ) {
            this._view._showXAxis = false;
            this._view._showYAxis = false;
            this._view._useScroll = false;
            this._view._useZoom = false;
            this._view._margin = {top: 10, right: 0, bottom: 0, left: 0, xaxis: 0, yaxis: 0 };
        }
	},
    display: function(selection, mode) {
    	this._super(selection,mode);    
        
		if( selection ) this.selection = selection;
		else selection = this.selection;
		
		if( !selection || mode == 'zoom') return this;
		
		var t = this;
		setTimeout(function() { selection.each(function(data) {
            var availableWidth = t._width - t._margin.left - t._margin.right,
    			availableHeight = t._height - t._margin.top - t._margin.bottom;
				radius = Math.min(availableWidth, availableHeight) / 2;
            
            var arc = d3.svg.arc().outerRadius((radius-(radius / 5)));
    		if (t._donut) arc.innerRadius(radius / 2);
            
            var pie = d3.layout.pie()
    			.sort(null)
				.value(function(d,i) { return (d._disabled) ? 0 : t.getY(d) });
            var pie2 = d3.layout.pie()
        		.sort(null)
				.value(function(d,i) { return (i == 0) ? t._sum*t._percent : i == 1 ? t._sum/t._percent : 0; });
                
            var wrap = d3.select(this).selectAll('.wrap.pie').data([data]);
            var slices = wrap.select('.pie').selectAll('.slice')//.data(pie);
            var paths = slices.data(pie2).select('path').transition().duration(t._duration)
                    .attr('d', arc)
                    .attrTween('d', arcTween)
                    
            paths
                  .style('stroke-width', 2)
    			  .attr('fill', function(d,i) { return d.data._color || t._color[i % t._color.length]; })
				  .style('stroke', function(d,i) { return d.data._color || t._color[i % t._color.length]; })
                  .attr('fill-opacity', .3)
                  .attr('stroke-opacity', 1);
                  
            var gauge = wrap.selectAll('.gaugepercent').data([0]).enter().append('text')
                .attr('x', availableWidth/2).attr('y', availableHeight/2)
                .attr('class', 'gaugepercent')
                .style('font-family', 'Segoe')
                .style('font-size', t._fontsize)
                .attr('text-anchor', 'middle')
                .attr('dy', t._fontsize/3)
                .attr('fill', data[0]._color)
                .text(function(d) { return d + "%"; })
                
            gauge.transition().duration(t._duration).tween("text", function() {
              var i = d3.interpolate(0, 100*t._percent);
              return function(t) {
                gauge.text(Math.round(i(t))+ "%");
              };
            });
            
            function arcTween(a) {
    			if (!t._donut) a.innerRadius = 0;
				var i = d3.interpolate(this._current, a);
				this._current = i(0);
				return function(t) {
				  return arc(i(t));
				};
			  }
		});
		}, 1000);
    }
});var Stacked = Bar.extend({
    init: function(view) {
    	this._super(view);
		this._type = 'Stacked';
		this._centered = true;
        this._sumed = true;
        
        if( Object.keys(this._view.charts).length == 0 ) {
            this._view._showXAxis = false;
    		this._view._showYAxis = false;
            this._view._useScroll = false;
            this._view._useZoom = false;
            if( this._view._autoadaptation ) {
                this._view._clipclip = false;
                this._view._margin = {top: 10, right: 0, bottom: 0, left: 0, xaxis: 0, yaxis: 0 };
            }
            this._view.showValueviewer(false);
        }
	},

	forceY: function(_) {
		if (!arguments.length) return this._forceY;
		this._forceY = _;
		return this;
	},
	stacked: function(_) {
		if (!arguments.length) return this._stacked;
		this._stacked = _;
		return this;
	},
	delay: function(_) {
		if (!arguments.length) return this._delay;
		this._delay = _;
		return this;
	},

});/*{
     "name": "cluster",
     "children": [
      {"name": "AgglomerativeCluster", "size": 3938},
      {"name": "CommunityStructure", "size": 3812},
      {"name": "MergeEdge", "size": 743}
     ]
}*/

var Treemap = Chart.extend({
    init: function(view) {
        // -- Options
		this.dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
		this._stackable = false;
		this._semanticable = false;
        this._behaviorable = false;
		
		this._super('Treemap', view);
        
        if( Object.keys(this._view.charts).length == 0 ) {
            this._view._showXAxis = false;
			this._view._showYAxis = false;
            this._view._useScroll = false;
            this._view._useZoom = false;
            if( this._view._autoadaptation ) {
                this._view._clipclip = false;
                this._view._margin = {top: 10, right: 0, bottom: 0, left: 0, xaxis: 0, yaxis: 0 };
            }
            this._view.showValueviewer(false);
        }
	},
	
	display: function(selection, mode) {
		
		if( selection ) this.selection = selection;
		else selection = this.selection;
		
		if( !selection || mode == 'zoom') return this;
		
		var t = this;
		selection.each(function(data) {
			var availableWidth = t._width - t._margin.left - t._margin.right,
				availableHeight = t._height - t._margin.top - t._margin.bottom;;

			// -- reformat data
			data = data.map(function(s, i) {
				// sum the series
				var total = d3.sum(s.values, function(d) { return t.getY(d); }); //(s.disabled) ? 0 : ;
				return {name: s.key, size: total, _color: s._color, _disabled: s._disabled};
			});
            
            var treemap = d3.layout.treemap()
                //.round(false)
                .size([availableWidth, availableHeight])
                .sticky(true)
                //.padding([10, 0, 0, 0])
                .value(function(d) { return d.size; });
            
            var nodes = treemap.nodes({name: 'data', children: data}).filter(function(d) { return !d.children; });
            
            //t._sum = d3.sum(data.map(function(d) { return d.y; }));
			var wrap = d3.select(this).selectAll('.wrap.treemap').data([0]);
			var wrapEnter = wrap.enter().append('g').attr('class','cdd3 wrap treemap chart-' + t._id);
			var gEnter = wrapEnter.append('g');
			var g = wrap.select('g');//.attr("transform", "translate(.5,.5)");

			gEnter.append('g').attr('class', 'treemap');

			wrap.attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')');
			//g.select('.treemap').attr('transform', 'translate(' + availableWidth / 2 + ',' + availableHeight / 2 + ')');

            
            var cell = g.selectAll("g").data(nodes);
            var cellEnter = cell.enter().append("svg:g")
                .attr("class", "cell")
                /*.style("top", function(d) { return d.y; })
                .style("left", function(d) { return d.x; })*/
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                //.on("click", function(d) { return zoom(node == d.parent ? root : d.parent); });

            cellEnter.append("svg:rect")
                .attr("width", function(d) { return d.dx - 1; })
                .attr("height", function(d) { return d.dy - 1; })
                .style("fill", function(d,i) { return d._color || t._color[i % t._color.length]; });
            
            cellEnter.append("svg:text")
                .attr("x", function(d) { return d.dx / 2; })
                .attr("y", function(d) { return d.dy / 2; })
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .text(function(d) { return d.name; })
                .style("opacity", function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; });
            
            cell.exit().remove();


			d3.select(this)
				.on('click', function(d,i) {
					t.dispatch.chartClick({
						data: d,
						index: i,
						pos: d3.event,
						id: t._id
					});
				});
            
            
		});

		this.enddisplay(selection, mode);
		
		return this;
	},

	y: function(_) {
		if (!arguments.length) return this.getY;
		this.getY = d3.functor(_);
		return this;
	},
	valueFormat: function(_) {
		if (!arguments.length) return this._valueFormat;
		this._valueFormat = _;
		return this;
	},
	showLabels: function(_) {
		if (!arguments.length) return this._showLabels;
		this._showLabels = _;
		return this;
	},
	donutLabelsOutside: function(_) {
		if (!arguments.length) return this._donutLabelsOutside;
		this._donutLabelsOutside = _;
		return this;
	},
	labelThreshold: function(_) {
		if (!arguments.length) return this._labelThreshold;
		this._labelThreshold = _;
		return this;
	},
	donut: function(_) {
		if (!arguments.length) return this._donut;
		this._donut = _;
		return this;
	},

});var Scatter = Chart.extend({
	init: function(view) {
		// -- Options
		this._stackable = true;
		this._semanticable = true;
		this._ordinal = false;
		this.dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'elementClick', 'elementMouseover', 'elementMouseout');
		//this.scatter = this; // because of tooltips in chart js
		
		// -- Scatter
		this._super('Scatter', view);
		
		// -- Scatter special things
		// - public
		this.sz = d3.scale.linear();
		this.getSize = function(d) { return d.size || 38; };
		this.getShape = function(d) { return d.shape || 'circle' };
		
		// - private
		this._interactive = true;
		this._forceX = []; // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
		this._forceY = []; // List of numbers to Force into the Y scale
		this._forceSize = [];
		this._clipVoronoi = false;
		this._clipRadius = function() { return 25 };
		this._pointActive = function(d) { return !d.notActive };
		this._sizeDomain = [16,256];
		this._timeoutID = null;
	},
	
	display: function(selection, mode) {
		this._super(selection, mode);
		
		if( selection ) this.selection = selection;
		else selection = this.selection;
		
		if( !selection ) return this;
		
		var t = this;
		selection.each(function(data) {
			var that = this; 
			var sy = t.sy;
			var sx = t.sx;
			var sz = t.sz;
			var sx0 = t.sx0 || sx;
			var sy0 = t.sy0 || sy;
			
			// add series to points
			/*data = data.map(function(series, i) {
				series.values = series.values.map(function(point) {
					point.series = i;
					return point;
				});
				return series;
			});*/
			
			sz.domain(t._sizeDomain).range([38, 256]);
			
			var wrap = d3.select(this).selectAll('g.wrap.scatter').data([data]);
			var wrapEnter = wrap.enter().append('g').attr('class', 'wrap cdd3 scatter chart-' +t._id);
			var gEnter = wrapEnter.append('g');
			var g = wrap.select('g');
			
			gEnter.append('g').attr('class', 'groups');
			gEnter.append('g').attr('class', 'point-paths');

			wrap.attr('transform', 'translate(' + t._margin.left + ',' + t._margin.top + ')');
			
			function updateInteractiveLayer() {

				if (!t._interactive) return false;

				var vertices = d3.merge(data.map(function(group, groupIndex) {
					return group.values
						.filter(t._pointActive) // remove non-interactive points
						.map(function(point, pointIndex) {
							return [sx(t.getX(point,pointIndex)) * (Math.random() / 1e12 + 1)  , sy(t.getY(point,pointIndex)) * (Math.random() / 1e12 + 1), groupIndex, pointIndex];
						})
				})
				);

				if (t._clipVoronoi) {
                    var defsEnter = wrapEnter.append('defs');
                    
					defsEnter.append('clipPath').attr('id', 'points-clip-' + t._id);

					var pointClips = wrap.select('#points-clip-' + t._id).selectAll('circle')
						.data(vertices);
					pointClips.enter().append('circle')
						.attr('r', t._clipRadius);
					pointClips.exit().remove();
					pointClips
						.attr('cx', function(d) { return d[0] })
						.attr('cy', function(d) { return d[1] });

					wrap.select('.point-paths')
					.attr('clip-path', 'url(#points-clip-' + t._id + ')');
				}

				var voronoi = d3.geom.voronoi(vertices).map(function(d, i) {
					return {
						'data': d,
						'rseries': vertices[i][2],
						'point': vertices[i][3]
					}
				});

				var pointPaths = wrap.select('.point-paths').selectAll('path')
					.data(voronoi);
				pointPaths.enter().append('path')
					.attr('class', function(d,i) { return 'path-'+i; });
				pointPaths.exit().remove();
				pointPaths
					.attr('d', function(d) { return 'M' + d.data.join(',') + 'Z'; })
					.on('click', function(d) {
						var series = data[d.rseries],
						    point  = series.values[d.point];

						t.dispatch.elementClick({
							point: point,
							series: series,
                            color: series._color,
							pos: [sx(t.getX(point, d.point)) + t._margin.left, sy(t.getY(point, d.point)) + t._margin.top],
							seriesIndex: d.rseries,
							pointIndex: d.point
						});
					})
					.on('mouseover', function(d) {
						var series = data[d.rseries],
						    point  = series.values[d.point];
						
						t.dispatch.elementMouseover({
							point: point,
							series: series,
                            color: series._color,
							pos: [sx(t.getX(point, d.point)) + t._margin.left, sy(t.getY(point, d.point)) + t._margin.top],
							seriesIndex: d.rseries,
							pointIndex: d.point
						});
					})
					.on('mouseout', function(d, i) {
						var series = data[d.rseries],
						point  = series.values[d.point];

						t.dispatch.elementMouseout({
							point: point,
							series: series,
							seriesIndex: d.rseries,
							pointIndex: d.point
						});
					});
			}
			
			var groups = wrap.select('.groups').selectAll('.group')
				.data(function(d) { return d }, function(d) { return d.key });
			
			groups.enter().append('g')
				.style('stroke-opacity', 1e-6)
				.style('fill-opacity', 1e-6)
				.style('fill', function(d,i) { return d._color || t._color[i % t._color.length] })
				.style('stroke', function(d,i) { return d._color || t._color[i % t._color.length] });
			
			d3.transition(groups.exit())
				.style('stroke-opacity', 1e-6)
				.style('fill-opacity', 1e-6)
				.remove();
				
			groups
				.attr('class', function(d,i) { return 'group series-' + i })
				.classed('hover', function(d) { return d.hover });
				
			var transition = d3.transition(groups)
				.style('fill', function(d,i) { return d._color || t._color[i % t._color.length] })
				.style('stroke', function(d,i) { return d._color || t._color[i % t._color.length] })
			
			var points = groups.selectAll('path.point')
				.data(function(d) { return d.values });
			
			points.enter().append('path')
				.attr('transform', function(d,i) {
					return 'translate(' + sx(t.getX(d,i)) + ',' + sy(t.getY(d,i)) + ')' // (mode != 'zoom' ? sy(0) : sy(t.getY(d,i)) ) start from 0
				})
				.attr('d', d3.svg.symbol()
					.type(function(d,i) { return t.getShape(d,i); })
					.size(function(d,i) { return sz(t.getSize(d,i)) })
				);
			points.exit().remove(); // very important

			d3.transition(groups.exit().selectAll('path.point'))
				.attr('transform', function(d,i) {
					return 'translate(' + sx0(t.getX(d,i)) + ',' + sy(t.getY(d,i)) + ')'
				}).remove();
			
			points.attr('class', function(d,i) { return 'point point-' + i });
			
			d3.transition(points)
				.attr('transform', function(d,i) {
					return 'translate(' + sx(t.getX(d,i)) + ',' + sy(t.getY(d,i)) + ')'
				})
				.attr('d', d3.svg.symbol()
					.type('circle')
					.size(function(d,i) { return sz(t.getSize(d,i)) })
				);

			if( t._layered ) {
				groups.selectAll('path.point')
					.style('stroke-opacity', 0)
					.style('fill-opacity', 0);
			}
			else {
				groups.selectAll('path.point')
					.style('stroke-opacity', 1)
					.style('fill-opacity', .5);
			}

			if (t._interactive) {
				clearTimeout(t._timeoutID); // clean timer
				t._timeoutID = setTimeout(updateInteractiveLayer, 1000);
				
				t.dispatch.on('elementMouseover.point', function(d) {
					if (t._interactive) d3.select('.chart-' + t._id + ' .series-' + d.seriesIndex + ' .point-' + d.pointIndex).classed('hover', true);
				});

				t.dispatch.on('elementMouseout.point', function(d) {
					if (t._interactive) d3.select('.chart-' + t._id + ' .series-' + d.seriesIndex + ' .point-' + d.pointIndex).classed('hover', false);
				});
			}
		
			t.sx0 = sx.copy();
			t.sy0 = sy.copy();
		});

		this.enddisplay(selection, mode);

		return this;
	},
	layered: function(_) {
		if (!arguments.length) return this._layered;
		this._layered = _;
		return this;
	},
	forceX: function(_) {
		if (!arguments.length) return this._forceX;
		this._forceX = _;
		return this;
	},
	forceY: function(_) {
		if (!arguments.length) return this._forceY;
		this._forceY = _;
		return this;
	},
	size: function(_) {
		if (!arguments.length) return this.getSize;
		this.getSize = d3.functor(_);
		return this;
	},
	zScale: function(_) {
		if (!arguments.length) return this.sz;
		this.sz = _;
		return this;
	},
	sizeDomain: function(_) {
		if (!arguments.length) return this._sizeDomain;
		this._sizeDomain = _;
		return this;
	},
	interactive: function(_) {
		if (!arguments.length) return this._interactive;
		this._interactive = _;
		return this;
	},
	forceSize: function(_) {
		if (!arguments.length) return this._forceSize;
		this._forceSize = _;
		return this;
	},
	pointActive: function(_) {
		if (!arguments.length) return this._pointActive;
		this._pointActive = _;
		return this;
	},
	clipVoronoi: function(_) {
		if (!arguments.length) return this._clipVoronoi;
		this._clipVoronoi = _;
		return this;
	},
	clipRadius: function(_) {
		if (!arguments.length) return this._clipRadius;
		this._clipRadius = _;
		return this;
	},
});
			
