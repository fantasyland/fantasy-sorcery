function identity(a) {
    return a;
}
exports.identity = identity;

function constant(a) {
  return function(_) {
    return a;
  };
}
exports.constant = constant;

function append(a, b) {
    return a.concat(b);
}
exports.append = append;

function empty(m) {
    return m.empty ? m.empty() : m.constructor.empty();
}
exports.empty = empty;

function map(m, f) {
    if(m.map) return m.map(f);
    return flatMap(m, function(a) {
        return point(m, f(a));
    });
}
exports.map = map;

function flatMap(m, f) {
    return m.chain ? m.chain(f) : m.then(f);
}
exports.flatMap = flatMap;

function point(m, a) {
    return m.of ? m.of(a) : m.constructor.of(a);
}
exports.point = point;

function join(m) {
    return flatMap(m, identity);
}
exports.join = join;

function ap(a, f) {
    if(f.ap) return f.ap(a);
    return flatMap(f, function(f) {
        return map(a, f);
    });
}
exports.ap = ap;

function flowRight(left, right) {
  var of = left.of || left.constructor.of;
  if (!of) {
    throw new TypeError('Unable to find Applicative.of on left');
  }
  return of(constant(identity)).ap(left).ap(right);
}
exports.flowRight = flowRight;

function flowLeft(left, right) {
  var of = left.of || left.constructor.of;
  if (!of) {
    throw new TypeError('Unable to find Applicative.of on left');
  }
  return of(constant).ap(left).ap(right);
}
exports.flowLeft = flowLeft;

function lift2(f, a, b) {
    return ap(b, map(a, function(a) {
        return function(b) {
            return f(a, b);
        };
    }));
}
exports.lift2 = lift2;

function lift3(f, a, b, c) {
    return ap(c, ap(b, map(a, function(a) {
        return function(b) {
            return function(c) {
                return f(a, b, c);
            };
        };
    })));
}
exports.lift3 = lift3;

function lift4(f, a, b, c, d) {
    return ap(d, ap(c, ap(b, map(a, function(a) {
        return function(b) {
            return function(c) {
                return function(d) {
                    return f(a, b, c, d);
                };
            };
        };
    }))));
}
exports.lift4 = lift4;

function lift5(f, a, b, c, d, e) {
    return ap(e, ap(d, ap(c, ap(b, map(a, function(a) {
        return function(b) {
            return function(c) {
                return function(d) {
                    return function(e) {
                        return f(a, b, c, d, e);
                    };
                };
            };
        };
    })))));
}
exports.lift5 = lift5;
