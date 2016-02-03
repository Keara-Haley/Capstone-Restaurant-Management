/**
 * CSS Selector Parser
 * @author Marat Dulin <mdevils@yandex.ru>
 * @source https://github.com/mdevils/node-css-selector-parser
 * @license MIT
 */
var ParseContext, doubleQuotesEscapeChars, identReplacements, identReplacementsRev, identSpecialChars, isAttrMatchOperator, isHex, isIdent, isIdentStart, singleQuoteEscapeChars, strReplacementsRev;

function CssSelectorParser() {
  this.pseudos = {};
  this.attrEqualityMods = {};
  this.ruleNestingOperators = {};
  this.substitutesEnabled = false;
}

CssSelectorParser.prototype.registerSelectorPseudos = function(name) {
  var _i, _len;
  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
    name = arguments[_i];
    this.pseudos[name] = 'selector';
  }
  return this;
};

CssSelectorParser.prototype.unregisterSelectorPseudos = function(name) {
  var _i, _len;
  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
    name = arguments[_i];
    delete this.pseudos[name];
  }
  return this;
};

CssSelectorParser.prototype.registerNestingOperators = function(op) {
  var _i, _len;
  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
    op = arguments[_i];
    this.ruleNestingOperators[op] = true;
  }
  return this;
};

CssSelectorParser.prototype.unregisterNestingOperators = function(op) {
  var _i, _len;
  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
    op = arguments[_i];
    delete this.ruleNestingOperators[op];
  }
  return this;
};

CssSelectorParser.prototype.registerAttrEqualityMods = function(mod) {
  var _i, _len;
  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
    mod = arguments[_i];
    this.attrEqualityMods[mod] = true;
  }
  return this;
};

CssSelectorParser.prototype.unregisterAttrEqualityMods = function(mod) {
  var _i, _len;
  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
    mod = arguments[_i];
    delete this.attrEqualityMods[mod];
  }
  return this;
};

CssSelectorParser.prototype.enableSubstitutes = function() {
  this.substitutesEnabled = true;
  return this;
};

CssSelectorParser.prototype.disableSubstitutes = function() {
  this.substitutesEnabled = false;
  return this;
};

isIdentStart = function(c) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
};

isIdent = function(c) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c === '-' || c === '_';
};

isHex = function(c) {
  return (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F') || (c >= '0' && c <= '9');
};

isAttrMatchOperator = function(c) {
  return c === '=' || c === '^' || c === '$' || c === '*' || c === '~';
};

identSpecialChars = {
  '!': true,
  '"': true,
  '#': true,
  '$': true,
  '%': true,
  '&': true,
  '\'': true,
  '(': true,
  ')': true,
  '*': true,
  '+': true,
  ',': true,
  '.': true,
  '/': true,
  ';': true,
  '<': true,
  '=': true,
  '>': true,
  '?': true,
  '@': true,
  '[': true,
  '\\': true,
  ']': true,
  '^': true,
  '`': true,
  '{': true,
  '|': true,
  '}': true,
  '~': true
};

identReplacements = {
  'n': '\n',
  'r': '\r',
  't': '\t',
  ' ': ' ',
  'f': '\f',
  'v': '\v'
};

identReplacementsRev = {
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t',
  ' ': '\\ ',
  '\f': '\\f',
  '\v': '\\v'
};

strReplacementsRev = {
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t',
  '\f': '\\f',
  '\v': '\\v'
};

singleQuoteEscapeChars = {
  n: '\n',
  r: '\r',
  t: '\t',
  f: '\f',
  '\\': '\\',
  '\'': '\''
};

doubleQuotesEscapeChars = {
  n: '\n',
  r: '\r',
  t: '\t',
  f: '\f',
  '\\': '\\',
  '"': '"'
};

ParseContext = function(str, p, pseudos, attrEqualityMods, ruleNestingOperators, substitutesEnabled) {
  var c, getIdent, getStr, l, skipWhitespace;
  l = str.length;
  c = null;
  getStr = function(quote, escapeTable) {
    var esc, hex, result;
    result = '';
    p++;
    c = str.charAt(p);
    while (p < l) {
      if (c === quote) {
        p++;
        return result;
      } else if (c === '\\') {
        p++;
        c = str.charAt(p);
        if (c === quote) {
          result += quote;
        } else if (esc = escapeTable[c]) {
          result += esc;
        } else if (isHex(c)) {
          hex = c;
          p++;
          c = str.charAt(p);
          while (isHex(c)) {
            hex += c;
            p++;
            c = str.charAt(p);
          }
          if (c === ' ') {
            p++;
            c = str.charAt(p);
          }
          result += String.fromCharCode(parseInt(hex, 16));
          continue;
        } else {
          result += c;
        }
      } else {
        result += c;
      }
      p++;
      c = str.charAt(p);
    }
    return result;
  };
  getIdent = function() {
    var hex, r, result;
    result = '';
    c = str.charAt(p);
    while (p < l) {
      if (isIdent(c)) {
        result += c;
      } else if (c === '\\') {
        p++;
        c = str.charAt(p);
        if (identSpecialChars[c]) {
          result += c;
        } else if (r = identReplacements[c]) {
          result += r;
        } else if (isHex(c)) {
          hex = c;
          p++;
          c = str.charAt(p);
          while (isHex(c)) {
            hex += c;
            p++;
            c = str.charAt(p);
          }
          if (c === ' ') {
            p++;
            c = str.charAt(p);
          }
          result += String.fromCharCode(parseInt(hex, 16));
          continue;
        } else {
          result += c;
        }
      } else {
        return result;
      }
      p++;
      c = str.charAt(p);
    }
    return result;
  };
  skipWhitespace = function() {
    var result;
    c = str.charAt(p);
    result = false;
    while (c === ' ' || c === "\t" || c === "\n" || c === "\r" || c === "\f") {
      result = true;
      p++;
      c = str.charAt(p);
    }
    return result;
  };
  this.parse = function() {
    var res;
    res = this.parseSelector();
    if (p < l) {
      throw Error('Rule expected but "' + str.charAt(p) + '" found.');
    }
    return res;
  };
  this.parseSelector = function() {
    var res, selector;
    selector = res = this.parseSingleSelector();
    c = str.charAt(p);
    while (c === ',') {
      p++;
      skipWhitespace();
      if (res.type !== 'selectors') {
        res = {
          type: 'selectors',
          selectors: [selector]
        };
      }
      selector = this.parseSingleSelector();
      if (!selector) {
        throw Error('Rule expected after ",".');
      }
      res.selectors.push(selector);
    }
    return res;
  };
  this.parseSingleSelector = function() {
    var currentRule, op, rule, selector;
    skipWhitespace();
    selector = {
      type: 'ruleSet'
    };
    rule = this.parseRule();
    if (!rule) {
      return null;
    }
    currentRule = selector;
    while (rule) {
      rule.type = 'rule';
      currentRule.rule = rule;
      currentRule = rule;
      skipWhitespace();
      c = str.charAt(p);
      if (p >= l || c === ',' || c === ')') {
        break;
      }
      if (ruleNestingOperators[c]) {
        op = c;
        p++;
        skipWhitespace();
        rule = this.parseRule();
        if (!rule) {
          throw Error('Rule expected after "' + op + '".');
        }
        rule.nestingOperator = op;
      } else {
        rule = this.parseRule();
        if (rule) {
          rule.nestingOperator = null;
        }
      }
    }
    return selector;
  };
  this.parseRule = function() {
    var attr, attrValue, id, operator, pseudo, pseudoName, rule, value;
    rule = null;
    while (p < l) {
      c = str.charAt(p);
      if (c === '*') {
        p++;
        (rule = rule || {}).tagName = '*';
      } else if (isIdentStart(c) || c === '\\') {
        (rule = rule || {}).tagName = getIdent();
      } else if (c === '.') {
        p++;
        rule = rule || {};
        (rule.classNames = rule.classNames || []).push(getIdent());
      } else if (c === '#') {
        p++;
        c = str.charAt(p);
        id = '';
        while (isIdent(c)) {
          id += c;
          p++;
          c = str.charAt(p);
        }
        (rule = rule || {}).id = id;
      } else if (c === '[') {
        p++;
        skipWhitespace();
        attr = {
          name: getIdent()
        };
        skipWhitespace();
        if (c === ']') {
          p++;
        } else {
          operator = '';
          if (attrEqualityMods[c]) {
            operator = c;
            p++;
            c = str.charAt(p);
          }
          if (p >= l) {
            throw Error('Expected "=" but end of file reached.');
          }
          if (c !== '=') {
            throw Error('Expected "=" but "' + c + '" found.');
          }
          attr.operator = operator + '=';
          p++;
          skipWhitespace();
          attrValue = '';
          attr.valueType = 'string';
          if (c === '"') {
            attrValue = getStr('"', doubleQuotesEscapeChars);
          } else if (c === '\'') {
            attrValue = getStr('\'', singleQuoteEscapeChars);
          } else if (substitutesEnabled && c === '$') {
            p++;
            attrValue = getIdent();
            attr.valueType = 'substitute';
          } else {
            while (p < l) {
              if (c === ']') {
                break;
              }
              attrValue += c;
              p++;
              c = str.charAt(p);
            }
            attrValue = attrValue.trim();
          }
          skipWhitespace();
          if (p >= l) {
            throw Error('Expected "]" but end of file reached.');
          }
          if (c !== ']') {
            throw Error('Expected "]" but "' + c + '" found.');
          }
          p++;
          attr.value = attrValue;
        }
        rule = rule || {};
        (rule.attrs = rule.attrs || []).push(attr);
      } else if (c === ':') {
        p++;
        pseudoName = getIdent();
        pseudo = {
          name: pseudoName
        };
        if (c === '(') {
          p++;
          value = '';
          skipWhitespace();
          if (pseudos[pseudoName] === 'selector') {
            pseudo.valueType = 'selector';
            value = this.parseSelector();
          } else {
            pseudo.valueType = 'string';
            if (c === '"') {
              value = getStr('"', doubleQuotesEscapeChars);
            } else if (c === '\'') {
              value = getStr('\'', singleQuoteEscapeChars);
            } else if (substitutesEnabled && c === '$') {
              p++;
              value = getIdent();
              pseudo.valueType = 'substitute';
            } else {
              while (p < l) {
                if (c === ')') {
                  break;
                }
                value += c;
                p++;
                c = str.charAt(p);
              }
              value = value.trim();
            }
            skipWhitespace();
          }
          if (p >= l) {
            throw Error('Expected ")" but end of file reached.');
          }
          if (c !== ')') {
            throw Error('Expected ")" but "' + c + '" found.');
          }
          p++;
          pseudo.value = value;
        }
        rule = rule || {};
        (rule.pseudos = rule.pseudos || []).push(pseudo);
      } else {
        break;
      }
    }
    return rule;
  };
  return this;
};

CssSelectorParser.prototype.parse = function(str) {
  var context;
  context = new ParseContext(str, 0, this.pseudos, this.attrEqualityMods, this.ruleNestingOperators, this.substitutesEnabled);
  return context.parse();
};

CssSelectorParser.prototype.escapeIdentifier = function(s) {
  var c, cc, extraCharCode, i, l, r, result;
  result = '';
  i = 0;
  l = s.length;
  while (i < l) {
    c = s.charAt(i);
    if (identSpecialChars[c]) {
      result += '\\' + c;
    } else if (r = identReplacementsRev[c]) {
      result += r;
    } else if ((cc = c.charCodeAt(0)) && (cc < 32 || cc > 126)) {
      if ((cc & 0xF800) === 0xD800) {
        extraCharCode = s.charCodeAt(i++);
        if ((cc & 0xFC00) !== 0xD800 || (extraCharCode & 0xFC00) !== 0xDC00) {
          throw Error('UCS-2(decode): illegal sequence');
        }
        cc = ((cc & 0x3FF) << 10) + (extraCharCode & 0x3FF) + 0x10000;
      }
      result += '\\' + cc.toString(16) + ' ';
    } else {
      result += c;
    }
    i++;
  }
  return result;
};

CssSelectorParser.prototype.escapeStr = function(s) {
  var c, i, l, r, result;
  result = '';
  i = 0;
  l = s.length;
  while (i < l) {
    c = s.charAt(i);
    if (c === '"') {
      c = '\\"';
    } else if (c === '\\') {
      c = '\\\\';
    } else if (r = strReplacementsRev[c]) {
      c = r;
    }
    result += c;
    i++;
  }
  return "\"" + result + "\"";
};

CssSelectorParser.prototype.render = function(path) {
  var renderEntity,
    _this = this;
  renderEntity = function(entity) {
    var currentEntity, parts, res;
    res = '';
    switch (entity.type) {
      case 'ruleSet':
        currentEntity = entity.rule;
        parts = [];
        while (currentEntity) {
          if (currentEntity.nestingOperator) {
            parts.push(currentEntity.nestingOperator);
          }
          parts.push(renderEntity(currentEntity));
          currentEntity = currentEntity.rule;
        }
        res = parts.join(' ');
        break;
      case 'selectors':
        res = entity.selectors.map(renderEntity).join(', ');
        break;
      case 'rule':
        if (entity.tagName) {
          if (entity.tagName === '*') {
            res = '*';
          } else {
            res = _this.escapeIdentifier(entity.tagName);
          }
        }
        if (entity.id) {
          res += "#" + (_this.escapeIdentifier(entity.id));
        }
        if (entity.classNames) {
          res += (entity.classNames.map(function(cn) {
            return "." + (_this.escapeIdentifier(cn));
          })).join('');
        }
        if (entity.attrs) {
          res += (entity.attrs.map(function(attr) {
            if (attr.operator) {
              if (attr.valueType === 'substitute') {
                return "[" + (_this.escapeIdentifier(attr.name)) + attr.operator + "$" + attr.value + "]";
              } else {
                return "[" + (_this.escapeIdentifier(attr.name)) + attr.operator + (_this.escapeStr(attr.value)) + "]";
              }
            } else {
              return "[" + (_this.escapeIdentifier(attr.name)) + "]";
            }
          })).join('');
        }
        if (entity.pseudos) {
          res += (entity.pseudos.map(function(pseudo) {
            if (pseudo.valueType) {
              if (pseudo.valueType === 'selector') {
                return ":" + (_this.escapeIdentifier(pseudo.name)) + "(" + (renderEntity(pseudo.value)) + ")";
              } else if (pseudo.valueType === 'substitute') {
                return ":" + (_this.escapeIdentifier(pseudo.name)) + "($" + pseudo.value + ")";
              } else {
                return ":" + (_this.escapeIdentifier(pseudo.name)) + "(" + (_this.escapeStr(pseudo.value)) + ")";
              }
            } else {
              return ":" + (_this.escapeIdentifier(pseudo.name));
            }
          })).join('');
        }
        break;
      default:
        throw Error('Unknown entity type: "' + entity.type(+'".'));
    }
    return res;
  };
  return renderEntity(path);
};

module.exports = CssSelectorParser;