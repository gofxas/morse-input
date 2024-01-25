!(function (t) {
  "use strict";
  var o = "L",
    L = "S",
    e = t.morjs,
    u = function (t, e) {
      if (t) for (var r = t.length, S = 0; r > S; S++) e(t[S], S, t);
    },
    i = function (t) {
      t = t.toLocaleUpperCase();
      var e;
      for (var r in S)
        if (S.hasOwnProperty(r) && S[r] === t) {
          e = r;
          break;
        }
      return e;
    },
    a = function (t) {
      return n[t];
    },
    c = function (t, e) {
      t = t || {};
      for (var r in e) "undefined" == typeof t[r] && (t[r] = e[r]);
      return t;
    },
    s = function (t) {
      return S[t.toLocaleUpperCase()];
    },
    p = function (t, r, S, n, o, L) {
      var i = "string" == typeof L,
        e = new RegExp("(" + r + "|" + n + ")", "g"),
        a = "";
      return (
        u(t.match(e), function (t, e) {
          i && e > 0 && (a += L), t === r ? (a += S) : t === n && (a += o);
        }),
        a
      );
    },
    l = function (t, e, S, n) {
      if ("string" != typeof t)
        throw new TypeError("Invalid value type: " + typeof t);
      var o = "undefined" != typeof n,
        r = new RegExp(e + "|[\\n\\r]+", "g"),
        L = t.trim().split(r);
      return (
        u(L, function (t, r) {
          (L[r] = t = t.split(S)),
            o &&
              u(t, function (t, e) {
                L[r][e] = t.split(n).join("");
              });
        }),
        L
      );
    },
    r = function (t, e) {
      if (!t) return t;
      for (var r = 0, S = ""; e > r; r++) S += t;
      return S;
    },
    S = {
      A: "SL",
      B: "LSSS",
      C: "LSLS",
      D: "LSS",
      E: "S",
      F: "SSLS",
      G: "LLS",
      H: "SSSS",
      I: "SS",
      J: "SLLL",
      K: "LSL",
      L: "SLSS",
      M: "LL",
      N: "LS",
      O: "LLL",
      P: "SLLS",
      Q: "LLSL",
      R: "SLS",
      S: "SSS",
      T: "L",
      U: "SSL",
      V: "SSSL",
      W: "SLL",
      X: "LSSL",
      Y: "LSLL",
      Z: "LLSS",
      0: "LLLLL",
      1: "SLLLL",
      2: "SSLLL",
      3: "SSSLL",
      4: "SSSSL",
      5: "SSSSS",
      6: "LSSSS",
      7: "LLSSS",
      8: "LLLSS",
      9: "LLLLS",
      ".": "SLSLSL",
      ",": "LLSSLL",
      "?": "SSLLSS",
      "'": "SLLLLS",
      "!": "LSLSLL",
      "/": "LSSLS",
      "(": "LSLLS",
      ")": "LSLLSL",
      "&": "SLSSS",
      ":": "LLLSSS",
      ";": "LSLSLS",
      "=": "LSSSL",
      "+": "SLSLS",
      "-": "LSSSSL",
      _: "SSLLSL",
      '"': "SLSSLS",
      $: "SSSLSSL",
      "@": "SLLSLS",
      Ä: "SLSL",
      Æ: "SLSL",
      Ą: "SLSL",
      À: "SLLSL",
      Å: "SLLSL",
      Ç: "LSLSS",
      Ĉ: "LSLSS",
      Ć: "LSLSS",
      Š: "LLLL",
      Ð: "SSLLS",
      Ś: "SSSLSSS",
      È: "SLSSL",
      Ł: "SLSSL",
      É: "SSLSS",
      Đ: "SSLSS",
      Ę: "SSLSS",
      Ĝ: "LLSLS",
      Ĥ: "LLLL",
      Ĵ: "SLLLS",
      Ź: "LLSSLS",
      Ñ: "LLSLL",
      Ń: "LLSLL",
      Ö: "LLLS",
      Ø: "LLLS",
      Ó: "LLLS",
      Ŝ: "SSSLS",
      Þ: "SLLSS",
      Ü: "SSLL",
      Ŭ: "SSLL",
      Ż: "LLSSL",
    },
    n = {
      classic: {
        charSpacer: " ",
        letterSpacer: r(" ", 3),
        longString: "-",
        shortString: "·",
        wordSpacer: r(" ", 7),
      },
      classicEntities: {
        charSpacer: "&nbsp;",
        letterSpacer: r("&nbsp;", 3),
        longString: "&#45;",
        shortString: "&middot;",
        wordSpacer: r("&nbsp;", 7),
      },
      compact: {
        charSpacer: "",
        letterSpacer: " ",
        longString: "-",
        shortString: "·",
        wordSpacer: r(" ", 3),
      },
      compactEntities: {
        charSpacer: "",
        letterSpacer: "&nbsp;",
        longString: "&#45;",
        shortString: "&middot;",
        wordSpacer: r("&nbsp;", 3),
      },
      simple: {
        charSpacer: "",
        letterSpacer: " ",
        longString: "-",
        shortString: ".",
        wordSpacer: r(" ", 3),
      },
    },
    f = {
      VERSION: "1.1.0",
      chars: S,
      defaults: {
        mode: "compact",
      },
      modes: n,
      decode: function (t, e) {
        (t = t || ""), (e = c(e, f.defaults));
        var S = a(e.mode),
          n = "",
          r = l(t, S.wordSpacer, S.letterSpacer, S.charSpacer);
        return r
          ? (u(r, function (t, e) {
              e > 0 && (n += " "),
                u(t, function (t) {
                  var e,
                    r = p(t, S.shortString, L, S.longString, o);
                  r && ((e = i(r)), "string" == typeof e && (n += e));
                });
            }),
            n)
          : n;
      },
      encode: function (t, e) {
        (t = t || ""), (e = c(e, f.defaults));
        var S = a(e.mode),
          n = "",
          r = l(t, "\\s+", "");
        return r
          ? (u(r, function (t, e) {
              e > 0 && (n += S.wordSpacer),
                u(t, function (t, e) {
                  e > 0 && (n += S.letterSpacer);
                  var r = s(t);
                  "string" == typeof r &&
                    (n += p(
                      r,
                      L,
                      S.shortString,
                      o,
                      S.longString,
                      S.charSpacer
                    ));
                });
            }),
            n)
          : n;
      },
      noConflict: function () {
        return (t.morjs = e), this;
      },
    };
  "undefined" != typeof exports
    ? ("undefined" != typeof module &&
        module.exports &&
        (exports = module.exports = f),
      (exports.morjs = f))
    : "function" == typeof define && define.amd
    ? define(function () {
        return f;
      })
    : (t.morjs = f);
})(this);
var decToHex = function (t) {
  var e = [];
  for (var r = 0; r < t.length; r++)
    e[r] = ("00" + t.charCodeAt(r).toString(16)).slice(-4);
  return "\\u" + e.join("\\u");
};
var hexToDec = function (t) {
  t = t.replace(/\\/g, "%");
  return unescape(t);
};
morjs.modes.custom = {
  charSpacer: "",
  letterSpacer: " ",
  longString: "-",
  shortString: "·",
  wordSpacer: " ",
};
var options = {
  mode: "custom",
};
var ss = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@";
function v10toX(t, e) {
  e = String(e).replace(/ /gi, "");
  if (e == "") return "";
  if (parseInt(e) != e) {
    return false;
  }
  var r = "";
  var S = ss.substr(0, t);
  while (e != 0) {
    var n = e % t;
    r = S.charAt(n) + r;
    e = (e - n) / t;
  }
  return r;
}
function vXto10(n, m) {
  m = String(m).replace(/ /gi, "");
  if (m == "") return "";
  var a = ss.substr(0, n);
  if (eval("m.replace(/[" + a + "]/gi,'')") != "") {
    return false;
  }
  var t = 0,
    c = 1;
  for (var x = m.length - 1; x > -1; x--) {
    t += c * a.indexOf(m.charAt(x));
    c *= n;
  }
  return t;
}
function vXtoY(t, e, r) {
  a = vXto10(t * 1, e);
  if (a == "") return "";
  a = v10toX(r, a);
  return a;
}
function M(t) {
  // alert(t)
}
function convert(t, e, r, S) {
  var n = document.getElementById(e).value;
  var o = document.getElementById(S);
  var L = document.getElementById(t).value;
  var i = document.getElementById(r).value;
  o.value = vXtoY(L, n, i);
}
function convert_c(t, e, r, S) {
  var n = document.getElementById(e).value;
  var o = document.getElementById(S);
  o.value = vXtoY(t, n, r);
}
var morse_char_re = /[a-zA-Z0-9.:,;?=\'\/\!_\"()$&@]/;

function encode_morse_zh(text) {
  var t = text;
  var e = t.match(/[\u0000-\uffff]/g);
  var r = "";
  if (e != null) {
    for (var S = 0; S < e.length; S++) {
      var n = e[S];
      if (n.trim() != "") {
        if (morse_char_re.test(n)) {
          r = r + morjs.encode(n, options) + morjs.modes.custom.letterSpacer;
        } else {
          var o = decToHex(n);
          if (o && o.substring(0, 2) == "\\u") {
            o = o.substring(2, o.length);
            o = vXtoY(16, o, 2);
            o = o.replace(/1/g, morjs.modes.custom.longString);
            o = o.replace(/0/g, morjs.modes.custom.shortString);
            r = r + o + morjs.modes.custom.letterSpacer;
          }
        }
      } else {
      }
    }
  }
  if (r != null && r.length > 0 && r.substring(r.length - 1, r.length)) {
    r = r.substring(0, r.length - 1);
  }
  return r;
}
function decode_morse_zh(text) {
  var input = text;
  out = "";
  if (input != null) {
    input_array = input.split(morjs.modes.custom.letterSpacer);
    eval("var re_1 = /\\" + morjs.modes.custom.longString + "/g;");
    eval("var re_0 = /\\" + morjs.modes.custom.shortString + "/g;");
    for (var i = 0; i < input_array.length; i++) {
      input = input_array[i];
      if (input != null && input.length >= 1) {
        if (input.length <= 5) {
          out = out + morjs.decode(input, options) + "";
        } else {
          input = input.replace(re_1, "1");
          input = input.replace(re_0, "0");
          input = vXtoY(2, input, 16);
          if (input === false || input === "") {
            out = "";
          } else {
            input = "\\u" + input;
            input = hexToDec(input);
            out = out + input + "";
          }
        }
      }
    }
  }
  return out;
}
