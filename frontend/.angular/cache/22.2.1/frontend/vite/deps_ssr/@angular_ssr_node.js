import { i as __toESM, n as __exportAll, r as __require, t as __commonJSMin } from "./rolldown-runtime-B4iAMlE-.js";
import { S as validateUrl, _ as renderModule, b as normalizeTrustProxyHeaders, g as renderApplication, h as SERVER_CONTEXT, t as AngularAppEngine, v as getFirstHeaderValue, x as parseForwardedHeader, y as isProxyHeaderAllowed } from "./ssr-CU-DpC_s.js";
import * as fs from "node:fs";
import { readFile, writeFile } from "node:fs";
import path, { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { URL as URL$1, fileURLToPath } from "node:url";
import { readFile as readFile$1 } from "node:fs/promises";
import { argv } from "node:process";
//#region node_modules/picocolors/picocolors.js
var require_picocolors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var p = process || {};
	var argv = p.argv || [];
	var env = p.env || {};
	var isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || (p.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
	var formatter = (open, close, replace = open) => (input) => {
		let string = "" + input, index = string.indexOf(close, open.length);
		return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
	};
	var replaceClose = (string, close, replace, index) => {
		let result = "", cursor = 0;
		do {
			result += string.substring(cursor, index) + replace;
			cursor = index + close.length;
			index = string.indexOf(close, cursor);
		} while (~index);
		return result + string.substring(cursor);
	};
	var createColors = (enabled = isColorSupported) => {
		let f = enabled ? formatter : () => String;
		return {
			isColorSupported: enabled,
			reset: f("\x1B[0m", "\x1B[0m"),
			bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
			dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
			italic: f("\x1B[3m", "\x1B[23m"),
			underline: f("\x1B[4m", "\x1B[24m"),
			inverse: f("\x1B[7m", "\x1B[27m"),
			hidden: f("\x1B[8m", "\x1B[28m"),
			strikethrough: f("\x1B[9m", "\x1B[29m"),
			black: f("\x1B[30m", "\x1B[39m"),
			red: f("\x1B[31m", "\x1B[39m"),
			green: f("\x1B[32m", "\x1B[39m"),
			yellow: f("\x1B[33m", "\x1B[39m"),
			blue: f("\x1B[34m", "\x1B[39m"),
			magenta: f("\x1B[35m", "\x1B[39m"),
			cyan: f("\x1B[36m", "\x1B[39m"),
			white: f("\x1B[37m", "\x1B[39m"),
			gray: f("\x1B[90m", "\x1B[39m"),
			bgBlack: f("\x1B[40m", "\x1B[49m"),
			bgRed: f("\x1B[41m", "\x1B[49m"),
			bgGreen: f("\x1B[42m", "\x1B[49m"),
			bgYellow: f("\x1B[43m", "\x1B[49m"),
			bgBlue: f("\x1B[44m", "\x1B[49m"),
			bgMagenta: f("\x1B[45m", "\x1B[49m"),
			bgCyan: f("\x1B[46m", "\x1B[49m"),
			bgWhite: f("\x1B[47m", "\x1B[49m"),
			blackBright: f("\x1B[90m", "\x1B[39m"),
			redBright: f("\x1B[91m", "\x1B[39m"),
			greenBright: f("\x1B[92m", "\x1B[39m"),
			yellowBright: f("\x1B[93m", "\x1B[39m"),
			blueBright: f("\x1B[94m", "\x1B[39m"),
			magentaBright: f("\x1B[95m", "\x1B[39m"),
			cyanBright: f("\x1B[96m", "\x1B[39m"),
			whiteBright: f("\x1B[97m", "\x1B[39m"),
			bgBlackBright: f("\x1B[100m", "\x1B[49m"),
			bgRedBright: f("\x1B[101m", "\x1B[49m"),
			bgGreenBright: f("\x1B[102m", "\x1B[49m"),
			bgYellowBright: f("\x1B[103m", "\x1B[49m"),
			bgBlueBright: f("\x1B[104m", "\x1B[49m"),
			bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
			bgCyanBright: f("\x1B[106m", "\x1B[49m"),
			bgWhiteBright: f("\x1B[107m", "\x1B[49m")
		};
	};
	module.exports = createColors();
	module.exports.createColors = createColors;
}));
//#endregion
//#region node_modules/postcss/lib/tokenize.js
var require_tokenize = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SINGLE_QUOTE = "'".charCodeAt(0);
	var DOUBLE_QUOTE = "\"".charCodeAt(0);
	var BACKSLASH = "\\".charCodeAt(0);
	var SLASH = "/".charCodeAt(0);
	var NEWLINE = "\n".charCodeAt(0);
	var SPACE = " ".charCodeAt(0);
	var FEED = "\f".charCodeAt(0);
	var TAB = "	".charCodeAt(0);
	var CR = "\r".charCodeAt(0);
	var OPEN_SQUARE = "[".charCodeAt(0);
	var CLOSE_SQUARE = "]".charCodeAt(0);
	var OPEN_PARENTHESES = "(".charCodeAt(0);
	var CLOSE_PARENTHESES = ")".charCodeAt(0);
	var OPEN_CURLY = "{".charCodeAt(0);
	var CLOSE_CURLY = "}".charCodeAt(0);
	var SEMICOLON = ";".charCodeAt(0);
	var ASTERISK = "*".charCodeAt(0);
	var COLON = ":".charCodeAt(0);
	var AT = "@".charCodeAt(0);
	var RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
	var RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
	var RE_BAD_BRACKET = /.[\r\n"'(/\\]/;
	var RE_HEX_ESCAPE = /[\da-f]/i;
	module.exports = function tokenizer(input, options = {}) {
		let css = input.css.valueOf();
		let ignore = options.ignoreErrors;
		let code, content, escape, next, quote;
		let currentToken, escaped, escapePos, n, prev;
		let length = css.length;
		let pos = 0;
		let buffer = [];
		let returned = [];
		let lastBadParen = -1;
		function position() {
			return pos;
		}
		function unclosed(what) {
			throw input.error("Unclosed " + what, pos);
		}
		function endOfFile() {
			return returned.length === 0 && pos >= length;
		}
		function nextToken(opts) {
			if (returned.length) return returned.pop();
			if (pos >= length) return;
			let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
			code = css.charCodeAt(pos);
			switch (code) {
				case NEWLINE:
				case SPACE:
				case TAB:
				case CR:
				case FEED:
					next = pos;
					do {
						next += 1;
						code = css.charCodeAt(next);
					} while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
					currentToken = ["space", css.slice(pos, next)];
					pos = next - 1;
					break;
				case OPEN_SQUARE:
				case CLOSE_SQUARE:
				case OPEN_CURLY:
				case CLOSE_CURLY:
				case COLON:
				case SEMICOLON:
				case CLOSE_PARENTHESES: {
					let controlChar = String.fromCharCode(code);
					currentToken = [
						controlChar,
						controlChar,
						pos
					];
					break;
				}
				case OPEN_PARENTHESES:
					prev = buffer.length ? buffer.pop()[1] : "";
					n = css.charCodeAt(pos + 1);
					if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
						next = pos;
						do {
							escaped = false;
							next = css.indexOf(")", next + 1);
							if (next === -1) {
								if (ignore || ignoreUnclosed) {
									next = pos;
									break;
								} else unclosed("bracket");
							}
							escapePos = next;
							while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
								escapePos -= 1;
								escaped = !escaped;
							}
						} while (escaped);
						currentToken = [
							"brackets",
							css.slice(pos, next + 1),
							pos,
							next
						];
						pos = next;
					} else if (pos <= lastBadParen) currentToken = [
						"(",
						"(",
						pos
					];
					else {
						next = css.indexOf(")", pos + 1);
						content = css.slice(pos, next + 1);
						if (next === -1 || RE_BAD_BRACKET.test(content)) {
							lastBadParen = next === -1 ? length : next;
							currentToken = [
								"(",
								"(",
								pos
							];
						} else {
							currentToken = [
								"brackets",
								content,
								pos,
								next
							];
							pos = next;
						}
					}
					break;
				case SINGLE_QUOTE:
				case DOUBLE_QUOTE:
					quote = code === SINGLE_QUOTE ? "'" : "\"";
					next = pos;
					do {
						escaped = false;
						next = css.indexOf(quote, next + 1);
						if (next === -1) {
							if (ignore || ignoreUnclosed) {
								next = pos + 1;
								break;
							} else unclosed("string");
						}
						escapePos = next;
						while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
							escapePos -= 1;
							escaped = !escaped;
						}
					} while (escaped);
					currentToken = [
						"string",
						css.slice(pos, next + 1),
						pos,
						next
					];
					pos = next;
					break;
				case AT:
					RE_AT_END.lastIndex = pos + 1;
					RE_AT_END.test(css);
					if (RE_AT_END.lastIndex === 0) next = css.length - 1;
					else next = RE_AT_END.lastIndex - 2;
					currentToken = [
						"at-word",
						css.slice(pos, next + 1),
						pos,
						next
					];
					pos = next;
					break;
				case BACKSLASH:
					next = pos;
					escape = true;
					while (css.charCodeAt(next + 1) === BACKSLASH) {
						next += 1;
						escape = !escape;
					}
					code = css.charCodeAt(next + 1);
					if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
						next += 1;
						if (RE_HEX_ESCAPE.test(css.charAt(next))) {
							while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) next += 1;
							if (css.charCodeAt(next + 1) === SPACE) next += 1;
						}
					}
					currentToken = [
						"word",
						css.slice(pos, next + 1),
						pos,
						next
					];
					pos = next;
					break;
				default: if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
					next = css.indexOf("*/", pos + 2) + 1;
					if (next === 0) {
						if (ignore || ignoreUnclosed) next = css.length;
						else unclosed("comment");
					}
					currentToken = [
						"comment",
						css.slice(pos, next + 1),
						pos,
						next
					];
					pos = next;
				} else {
					RE_WORD_END.lastIndex = pos + 1;
					RE_WORD_END.test(css);
					if (RE_WORD_END.lastIndex === 0) next = css.length - 1;
					else next = RE_WORD_END.lastIndex - 2;
					currentToken = [
						"word",
						css.slice(pos, next + 1),
						pos,
						next
					];
					buffer.push(currentToken);
					pos = next;
				}
			}
			pos++;
			return currentToken;
		}
		function back(token) {
			returned.push(token);
		}
		return {
			back,
			endOfFile,
			nextToken,
			position
		};
	};
}));
//#endregion
//#region node_modules/postcss/lib/terminal-highlight.js
var require_terminal_highlight = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pico = require_picocolors();
	var tokenizer = require_tokenize();
	var Input;
	function registerInput(dependant) {
		Input = dependant;
	}
	var HIGHLIGHT_THEME = {
		";": pico.yellow,
		":": pico.yellow,
		"(": pico.cyan,
		")": pico.cyan,
		"[": pico.yellow,
		"]": pico.yellow,
		"{": pico.yellow,
		"}": pico.yellow,
		"at-word": pico.cyan,
		"brackets": pico.cyan,
		"call": pico.cyan,
		"class": pico.yellow,
		"comment": pico.gray,
		"hash": pico.magenta,
		"string": pico.green
	};
	function getTokenType([type, value], processor) {
		if (type === "word") {
			if (value[0] === ".") return "class";
			if (value[0] === "#") return "hash";
		}
		if (!processor.endOfFile()) {
			let next = processor.nextToken();
			processor.back(next);
			if (next[0] === "brackets" || next[0] === "(") return "call";
		}
		return type;
	}
	function terminalHighlight(css) {
		let processor = tokenizer(new Input(css), { ignoreErrors: true });
		let result = "";
		while (!processor.endOfFile()) {
			let token = processor.nextToken();
			let color = HIGHLIGHT_THEME[getTokenType(token, processor)];
			if (color) result += token[1].split(/\r?\n/).map((i) => color(i)).join("\n");
			else result += token[1];
		}
		return result;
	}
	terminalHighlight.registerInput = registerInput;
	module.exports = terminalHighlight;
}));
//#endregion
//#region node_modules/postcss/lib/css-syntax-error.js
var require_css_syntax_error = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pico = require_picocolors();
	var terminalHighlight = require_terminal_highlight();
	var CssSyntaxError = class CssSyntaxError extends Error {
		constructor(message, line, column, source, file, plugin) {
			super(message);
			this.name = "CssSyntaxError";
			this.reason = message;
			if (file) this.file = file;
			if (source) this.source = source;
			if (plugin) this.plugin = plugin;
			if (typeof line !== "undefined" && typeof column !== "undefined") {
				if (typeof line === "number") {
					this.line = line;
					this.column = column;
				} else {
					this.line = line.line;
					this.column = line.column;
					this.endLine = column.line;
					this.endColumn = column.column;
				}
			}
			this.setMessage();
			if (Error.captureStackTrace) Error.captureStackTrace(this, CssSyntaxError);
		}
		setMessage() {
			this.message = this.plugin ? this.plugin + ": " : "";
			this.message += this.file ? this.file : "<css input>";
			if (typeof this.line !== "undefined") this.message += ":" + this.line + ":" + this.column;
			this.message += ": " + this.reason;
		}
		showSourceCode(color) {
			if (!this.source) return "";
			let css = this.source;
			if (color == null) color = pico.isColorSupported;
			let aside = (text) => text;
			let mark = (text) => text;
			let highlight = (text) => text;
			if (color) {
				let { bold, gray, red } = pico.createColors(true);
				mark = (text) => bold(red(text));
				aside = (text) => gray(text);
				if (terminalHighlight) highlight = (text) => terminalHighlight(text);
			}
			let lines = css.split(/\r?\n/);
			let start = Math.max(this.line - 3, 0);
			let end = Math.min(this.line + 2, lines.length);
			let maxWidth = String(end).length;
			return lines.slice(start, end).map((line, index) => {
				let number = start + 1 + index;
				let gutter = " " + (" " + number).slice(-maxWidth) + " | ";
				if (number === this.line) {
					if (line.length > 160) {
						let padding = 20;
						let subLineStart = Math.max(0, this.column - padding);
						let subLineEnd = Math.max(this.column + padding, this.endColumn + padding);
						let subLine = line.slice(subLineStart, subLineEnd);
						let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, Math.min(this.column - 1, 19)).replace(/[^\t]/g, " ");
						return mark(">") + aside(gutter) + highlight(subLine) + "\n " + spacing + mark("^");
					}
					let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
					return mark(">") + aside(gutter) + highlight(line) + "\n " + spacing + mark("^");
				}
				return " " + aside(gutter) + highlight(line);
			}).join("\n");
		}
		toString() {
			let code = this.showSourceCode();
			if (code) code = "\n\n" + code + "\n";
			return this.name + ": " + this.message + code;
		}
	};
	module.exports = CssSyntaxError;
	CssSyntaxError.default = CssSyntaxError;
}));
//#endregion
//#region node_modules/postcss/lib/stringifier.js
var require_stringifier = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var AT_NAME_END = /[\t\n\f\r "#'()/;[\\\]{}]/;
	var DEFAULT_RAW = {
		after: "\n",
		beforeClose: "\n",
		beforeComment: "\n",
		beforeDecl: "\n",
		beforeOpen: " ",
		beforeRule: "\n",
		colon: ": ",
		commentLeft: " ",
		commentRight: " ",
		emptyBody: "",
		indent: "    ",
		semicolon: false
	};
	function capitalize(str) {
		return str[0].toUpperCase() + str.slice(1);
	}
	function atruleStart(str, node) {
		let name = "@" + node.name;
		let params = node.params ? str.rawValue(node, "params") : "";
		let afterName = node.raws.afterName;
		if (typeof afterName === "undefined") afterName = params ? " " : "";
		else if (afterName === "" && params && !AT_NAME_END.test(params[0])) afterName = " ";
		return name + afterName + params;
	}
	function isCustomProperty(node) {
		if (!node.prop.startsWith("--")) return false;
		let before = node.raws.before;
		return typeof before === "undefined" || !/[^\s;]$/.test(before);
	}
	function pushBody(str, stack, node) {
		let nodes = node.nodes;
		let last = nodes.length - 1;
		while (last > 0) {
			if (nodes[last].type !== "comment") break;
			last -= 1;
		}
		let semicolon = str.raw(node, "semicolon");
		let isDocument = node.type === "document";
		for (let i = nodes.length - 1; i >= 0; i--) {
			let child = nodes[i];
			let childSemicolon = last !== i || semicolon;
			if (!childSemicolon && i < nodes.length - 1 && (child.type === "atrule" && !child.nodes || child.type === "decl" && isCustomProperty(child))) childSemicolon = true;
			stack.push({
				document: isDocument,
				node: child,
				semicolon: childSemicolon
			});
		}
	}
	function pushBlock(str, stack, node, start) {
		let between = str.raw(node, "between", "beforeOpen");
		str.builder(start + between + "{", node, "start");
		let hasNodes = node.nodes && node.nodes.length;
		let close = () => {
			let after = hasNodes ? str.raw(node, "after") : str.raw(node, "after", "emptyBody");
			if (after) str.builder(after);
			str.builder("}", node, "end");
			if (node.type === "rule" && node.raws.ownSemicolon) str.builder(node.raws.ownSemicolon, node, "end");
		};
		if (hasNodes) {
			stack.push(close);
			pushBody(str, stack, node);
		} else close();
	}
	var Stringifier = class Stringifier {
		constructor(builder) {
			this.builder = builder;
		}
		atrule(node, semicolon) {
			let start = atruleStart(this, node);
			if (node.nodes) this.block(node, start);
			else {
				let end = (node.raws.between || "") + (semicolon ? ";" : "");
				this.builder(start + end, node);
			}
		}
		beforeAfter(node, detect) {
			let value;
			if (node.type === "decl") value = this.raw(node, null, "beforeDecl");
			else if (node.type === "comment") value = this.raw(node, null, "beforeComment");
			else if (detect === "before") value = this.raw(node, null, "beforeRule");
			else value = this.raw(node, null, "beforeClose");
			let buf = node.parent;
			let depth = 0;
			while (buf && buf.type !== "root") {
				depth += 1;
				buf = buf.parent;
			}
			if (value.includes("\n")) {
				let indent = this.raw(node, null, "indent");
				if (indent.length) for (let step = 0; step < depth; step++) value += indent;
			}
			return value;
		}
		block(node, start) {
			let between = this.raw(node, "between", "beforeOpen");
			this.builder(start + between + "{", node, "start");
			let after;
			if (node.nodes && node.nodes.length) {
				this.body(node);
				after = this.raw(node, "after");
			} else after = this.raw(node, "after", "emptyBody");
			if (after) this.builder(after);
			this.builder("}", node, "end");
		}
		body(node) {
			let proto = Stringifier.prototype;
			let expandable = [
				"atrule",
				"block",
				"body",
				"rule",
				"stringify"
			].every((method) => this[method] === proto[method]);
			let stack = [];
			pushBody(this, stack, node);
			while (stack.length > 0) {
				let entry = stack.pop();
				if (typeof entry === "function") {
					entry();
					continue;
				}
				let child = entry.node;
				let before = this.raw(child, "before");
				if (before) this.builder(before);
				if (expandable && child.type === "rule") pushBlock(this, stack, child, this.rawValue(child, "selector"));
				else if (expandable && child.type === "atrule" && child.nodes) pushBlock(this, stack, child, atruleStart(this, child));
				else this.stringify(child, entry.semicolon);
			}
		}
		comment(node) {
			let left = this.raw(node, "left", "commentLeft");
			let right = this.raw(node, "right", "commentRight");
			this.builder("/*" + left + node.text + right + "*/", node);
		}
		decl(node, semicolon) {
			let raws = node.raws;
			let between = this.raw(node, "between", "colon");
			let string = node.prop + between + this.rawValue(node, "value");
			if (node.important) string += raws.important || " !important";
			if (semicolon) string += ";";
			this.builder(string, node);
		}
		document(node) {
			this.body(node);
		}
		raw(node, own, detect) {
			let value;
			if (!detect) detect = own;
			if (own) {
				value = node.raws[own];
				if (typeof value !== "undefined") return value;
			}
			let parent = node.parent;
			if (detect === "before") {
				if (!parent || parent.type === "root" && parent.first === node) return "";
				if (parent && parent.type === "document") return "";
			}
			if (!parent) return DEFAULT_RAW[detect];
			let root = node.root();
			let cache = root.rawCache || (root.rawCache = {});
			if (typeof cache[detect] !== "undefined") return cache[detect];
			if (detect === "before" || detect === "after") return this.beforeAfter(node, detect);
			else {
				let method = "raw" + capitalize(detect);
				if (this[method]) value = this[method](root, node);
				else root.walk((i) => {
					value = i.raws[own];
					if (typeof value !== "undefined") return false;
				});
			}
			if (typeof value === "undefined") value = DEFAULT_RAW[detect];
			cache[detect] = value;
			return value;
		}
		rawBeforeClose(root) {
			let value;
			root.walk((i) => {
				if (i.nodes && i.nodes.length > 0) {
					if (typeof i.raws.after !== "undefined") {
						value = i.raws.after;
						if (value.includes("\n")) value = value.replace(/[^\n]+$/, "");
						return false;
					}
				}
			});
			if (value) value = value.replace(/\S/g, "");
			return value;
		}
		rawBeforeComment(root, node) {
			let value;
			root.walkComments((i) => {
				if (typeof i.raws.before !== "undefined") {
					value = i.raws.before;
					if (value.includes("\n")) value = value.replace(/[^\n]+$/, "");
					return false;
				}
			});
			if (typeof value === "undefined") value = this.raw(node, null, "beforeDecl");
			else if (value) value = value.replace(/\S/g, "");
			return value;
		}
		rawBeforeDecl(root, node) {
			let value;
			root.walkDecls((i) => {
				if (typeof i.raws.before !== "undefined") {
					value = i.raws.before;
					if (value.includes("\n")) value = value.replace(/[^\n]+$/, "");
					return false;
				}
			});
			if (typeof value === "undefined") value = this.raw(node, null, "beforeRule");
			else if (value) value = value.replace(/\S/g, "");
			return value;
		}
		rawBeforeOpen(root) {
			let value;
			root.walk((i) => {
				if (i.type !== "decl") {
					value = i.raws.between;
					if (typeof value !== "undefined") return false;
				}
			});
			return value;
		}
		rawBeforeRule(root) {
			let value;
			root.walk((i) => {
				if (i.nodes && (i.parent !== root || root.first !== i)) {
					if (typeof i.raws.before !== "undefined") {
						value = i.raws.before;
						if (value.includes("\n")) value = value.replace(/[^\n]+$/, "");
						return false;
					}
				}
			});
			if (value) value = value.replace(/\S/g, "");
			return value;
		}
		rawColon(root) {
			let value;
			root.walkDecls((i) => {
				if (typeof i.raws.between !== "undefined") {
					value = i.raws.between.replace(/[^\s:]/g, "");
					return false;
				}
			});
			return value;
		}
		rawEmptyBody(root) {
			let value;
			root.walk((i) => {
				if (i.nodes && i.nodes.length === 0) {
					value = i.raws.after;
					if (typeof value !== "undefined") return false;
				}
			});
			return value;
		}
		rawIndent(root) {
			if (root.raws.indent) return root.raws.indent;
			let value;
			root.walk((i) => {
				let p = i.parent;
				if (p && p !== root && p.parent && p.parent === root) {
					if (typeof i.raws.before !== "undefined") {
						let parts = i.raws.before.split("\n");
						value = parts[parts.length - 1];
						value = value.replace(/\S/g, "");
						return false;
					}
				}
			});
			return value;
		}
		rawSemicolon(root) {
			let value;
			root.walk((i) => {
				if (i.nodes && i.nodes.length && i.last.type === "decl") {
					value = i.raws.semicolon;
					if (typeof value !== "undefined") return false;
				}
			});
			return value;
		}
		rawValue(node, prop) {
			let value = node[prop];
			let raw = node.raws[prop];
			if (raw && raw.value === value) return raw.raw;
			return value;
		}
		root(node) {
			if (!(node.parent && node.parent.type === "document") && node.source && node.source.input.hasBOM) this.builder("﻿", node, "start");
			this.body(node);
			if (node.raws.after) this.builder(node.raws.after);
		}
		rule(node) {
			this.block(node, this.rawValue(node, "selector"));
			if (node.raws.ownSemicolon) this.builder(node.raws.ownSemicolon, node, "end");
		}
		stringify(node, semicolon) {
			/* c8 ignore start */
			if (!this[node.type]) throw new Error("Unknown AST node type " + node.type + ". Maybe you need to change PostCSS stringifier.");
			/* c8 ignore stop */
			this[node.type](node, semicolon);
		}
	};
	module.exports = Stringifier;
	Stringifier.default = Stringifier;
}));
//#endregion
//#region node_modules/postcss/lib/stringify.js
var require_stringify = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stringifier = require_stringifier();
	var STYLE_TAG = /(<)(\/?style\b)/gi;
	var COMMENT_OPEN = /(<)(!--)/g;
	function escapeHTMLInCSS(str) {
		if (!str.includes("<")) return str;
		return str.replace(STYLE_TAG, "\\3c $2").replace(COMMENT_OPEN, "\\3c $2");
	}
	var SafeStringifier = class extends Stringifier {
		escapeHTML(node, print) {
			let builder = this.builder;
			let chunks, css;
			this.builder = (str, child, type) => {
				if (chunks) {
					css += str;
					chunks.push(str, child, type);
				} else if (str.includes("<")) {
					css = str;
					chunks = [
						str,
						child,
						type
					];
				} else builder(str, child, type);
			};
			print();
			this.builder = builder;
			if (!chunks) return;
			let escaped = escapeHTMLInCSS(css);
			if (escaped === css) for (let i = 0; i < chunks.length; i += 3) builder(chunks[i], chunks[i + 1], chunks[i + 2]);
			else builder(escaped, node);
		}
		root(node) {
			if (node.parent && node.parent.type === "document") {
				this.escapeHTML(node, () => this.body(node));
				if (node.raws.after) this.builder(node.raws.after);
			} else this.escapeHTML(node, () => super.root(node));
		}
	};
	function stringify(node, builder) {
		let str = new SafeStringifier(builder);
		if (node.type === "root" || node.type === "document") str.stringify(node);
		else str.escapeHTML(node, () => str.stringify(node));
	}
	module.exports = stringify;
	stringify.default = stringify;
}));
//#endregion
//#region node_modules/postcss/lib/symbols.js
var require_symbols = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports.isClean = Symbol("isClean");
	module.exports.my = Symbol("my");
}));
//#endregion
//#region node_modules/postcss/lib/node.js
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var CssSyntaxError = require_css_syntax_error();
	var Stringifier = require_stringifier();
	var stringify = require_stringify();
	var { isClean, my } = require_symbols();
	function cloneNode(obj, parent) {
		let cloned = new obj.constructor();
		let stack = [[
			obj,
			cloned,
			parent
		]];
		while (stack.length > 0) {
			let [source, target, targetParent] = stack.pop();
			for (let i in source) {
				if (!Object.prototype.hasOwnProperty.call(source, i))
 /* c8 ignore next 2 */
				continue;
				if (i === "proxyCache") continue;
				let value = source[i];
				let type = typeof value;
				if (i === "parent" && type === "object") {
					if (targetParent) target[i] = targetParent;
				} else if (i === "source") target[i] = value;
				else if (Array.isArray(value)) {
					let children = [];
					target[i] = children;
					for (let j of value) {
						let childClone = new j.constructor();
						children.push(childClone);
						stack.push([
							j,
							childClone,
							target
						]);
					}
				} else {
					if (type === "object" && value !== null) {
						let valueClone = new value.constructor();
						stack.push([
							value,
							valueClone,
							void 0
						]);
						value = valueClone;
					}
					target[i] = value;
				}
			}
		}
		return cloned;
	}
	function sourceOffset(inputCSS, position) {
		if (position && typeof position.offset !== "undefined") return position.offset;
		let column = 1;
		let line = 1;
		let offset = 0;
		for (let i = 0; i < inputCSS.length; i++) {
			if (line === position.line && column === position.column) {
				offset = i;
				break;
			}
			if (inputCSS[i] === "\n") {
				column = 1;
				line += 1;
			} else column += 1;
		}
		return offset;
	}
	var Node = class Node {
		get proxyOf() {
			return this;
		}
		constructor(defaults = {}) {
			this.raws = {};
			this[isClean] = false;
			this[my] = true;
			for (let name of Object.keys(defaults)) {
				if (name === "__proto__") continue;
				if (name === "nodes") {
					this.nodes = [];
					for (let node of defaults[name]) if (typeof node.clone === "function" && node.parent) this.append(node.clone());
					else this.append(node);
				} else this[name] = defaults[name];
			}
		}
		addToError(error) {
			error.postcssNode = this;
			if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
				let s = this.source;
				error.stack = error.stack.replace(/\n\s{4}at /, `$&${s.input.from}:${s.start.line}:${s.start.column}$&`);
			}
			return error;
		}
		after(add) {
			this.parent.insertAfter(this, add);
			return this;
		}
		assign(overrides = {}) {
			for (let name in overrides) this[name] = overrides[name];
			return this;
		}
		before(add) {
			this.parent.insertBefore(this, add);
			return this;
		}
		cleanRaws(keepBetween) {
			delete this.raws.before;
			delete this.raws.after;
			if (!keepBetween) delete this.raws.between;
		}
		clone(overrides = {}) {
			let cloned = cloneNode(this);
			for (let name in overrides) cloned[name] = overrides[name];
			return cloned;
		}
		cloneAfter(overrides = {}) {
			let cloned = this.clone(overrides);
			this.parent.insertAfter(this, cloned);
			return cloned;
		}
		cloneBefore(overrides = {}) {
			let cloned = this.clone(overrides);
			this.parent.insertBefore(this, cloned);
			return cloned;
		}
		error(message, opts = {}) {
			if (this.source) {
				let { end, start } = this.rangeBy(opts);
				return this.source.input.error(message, {
					column: start.column,
					line: start.line
				}, {
					column: end.column,
					line: end.line
				}, opts);
			}
			return new CssSyntaxError(message);
		}
		getProxyProcessor() {
			return {
				get(node, prop) {
					if (prop === "proxyOf") return node;
					else if (prop === "root") return () => node.root().toProxy();
					else return node[prop];
				},
				set(node, prop, value) {
					if (node[prop] === value) return true;
					node[prop] = value;
					if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || 
					/* c8 ignore next */
					prop === "text") node.markDirty();
					return true;
				}
			};
		}
		/* c8 ignore next 3 */
		markClean() {
			this[isClean] = true;
		}
		markDirty() {
			if (this[isClean]) {
				this[isClean] = false;
				let next = this;
				while (next = next.parent) next[isClean] = false;
			}
		}
		next() {
			if (!this.parent) return void 0;
			let index = this.parent.index(this);
			return this.parent.nodes[index + 1];
		}
		positionBy(opts = {}) {
			let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
			let pos = {
				column: this.source.start.column,
				line: this.source.start.line,
				offset: sourceOffset(inputString, this.source.start)
			};
			if (opts.index) pos = this.positionInside(opts.index);
			else if (opts.word) {
				let index = inputString.slice(sourceOffset(inputString, this.source.start), sourceOffset(inputString, this.source.end)).indexOf(opts.word);
				if (index !== -1) pos = this.positionInside(index);
			}
			return pos;
		}
		positionInside(index) {
			let column = this.source.start.column;
			let line = this.source.start.line;
			let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
			let offset = sourceOffset(inputString, this.source.start);
			let end = offset + index;
			for (let i = offset; i < end; i++) if (inputString[i] === "\n") {
				column = 1;
				line += 1;
			} else column += 1;
			return {
				column,
				line,
				offset: end
			};
		}
		prev() {
			if (!this.parent) return void 0;
			let index = this.parent.index(this);
			return this.parent.nodes[index - 1];
		}
		rangeBy(opts = {}) {
			let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
			let start = {
				column: this.source.start.column,
				line: this.source.start.line,
				offset: sourceOffset(inputString, this.source.start)
			};
			let end = this.source.end ? {
				column: this.source.end.column + 1,
				line: this.source.end.line,
				offset: typeof this.source.end.offset === "number" ? this.source.end.offset : sourceOffset(inputString, this.source.end) + 1
			} : {
				column: start.column + 1,
				line: start.line,
				offset: start.offset + 1
			};
			if (opts.word) {
				let index = inputString.slice(sourceOffset(inputString, this.source.start), sourceOffset(inputString, this.source.end)).indexOf(opts.word);
				if (index !== -1) {
					start = this.positionInside(index);
					end = this.positionInside(index + opts.word.length);
				}
			} else {
				if (opts.start) start = {
					column: opts.start.column,
					line: opts.start.line,
					offset: sourceOffset(inputString, opts.start)
				};
				else if (typeof opts.index === "number") start = this.positionInside(opts.index);
				if (opts.end) end = {
					column: opts.end.column,
					line: opts.end.line,
					offset: sourceOffset(inputString, opts.end)
				};
				else if (typeof opts.endIndex === "number") end = this.positionInside(opts.endIndex);
				else if (typeof opts.index === "number") end = this.positionInside(opts.index + 1);
			}
			if (end.line < start.line || end.line === start.line && end.column <= start.column) end = {
				column: start.column + 1,
				line: start.line,
				offset: start.offset + 1
			};
			return {
				end,
				start
			};
		}
		raw(prop, defaultType) {
			return new Stringifier().raw(this, prop, defaultType);
		}
		remove() {
			if (this.parent) this.parent.removeChild(this);
			this.parent = void 0;
			return this;
		}
		replaceWith(...nodes) {
			if (this.parent) {
				let bookmark = this;
				let foundSelf = false;
				for (let node of nodes) if (node === this) foundSelf = true;
				else if (foundSelf) {
					this.parent.insertAfter(bookmark, node);
					bookmark = node;
				} else this.parent.insertBefore(bookmark, node);
				if (!foundSelf) this.remove();
			}
			return this;
		}
		root() {
			let result = this;
			while (result.parent && result.parent.type !== "document") result = result.parent;
			return result;
		}
		toJSON(_, inputs) {
			let emitInputs = inputs == null;
			inputs = inputs || /* @__PURE__ */ new Map();
			let holderOfRoot = [];
			let queue = [[
				this,
				holderOfRoot,
				0
			]];
			for (let step = 0; step < queue.length; step++) {
				let [node, holder, key] = queue[step];
				let fixed = {};
				holder[key] = fixed;
				for (let name in node) {
					if (!Object.prototype.hasOwnProperty.call(node, name))
 /* c8 ignore next 2 */
					continue;
					if (name === "parent" || name === "proxyCache") continue;
					let value = node[name];
					if (Array.isArray(value)) {
						let fixedArray = [];
						fixed[name] = fixedArray;
						for (let i = 0; i < value.length; i++) {
							let item = value[i];
							if (typeof item === "object" && item.toJSON) {
								if (item.toJSON === Node.prototype.toJSON) queue.push([
									item,
									fixedArray,
									i
								]);
								else fixedArray[i] = item.toJSON(null, inputs);
							} else fixedArray[i] = item;
						}
					} else if (typeof value === "object" && value.toJSON) {
						if (value.toJSON === Node.prototype.toJSON) queue.push([
							value,
							fixed,
							name
						]);
						else fixed[name] = value.toJSON(null, inputs);
					} else if (name === "source") {
						if (value == null) continue;
						let inputId = inputs.get(value.input);
						if (inputId == null) {
							inputId = inputs.size;
							inputs.set(value.input, inputId);
						}
						fixed[name] = {
							end: value.end,
							inputId,
							start: value.start
						};
					} else fixed[name] = value;
				}
			}
			let fixed = holderOfRoot[0];
			if (emitInputs) fixed.inputs = [...inputs.keys()].map((input) => input.toJSON());
			return fixed;
		}
		toProxy() {
			if (!this.proxyCache) this.proxyCache = new Proxy(this, this.getProxyProcessor());
			return this.proxyCache;
		}
		toString(stringifier = stringify) {
			if (stringifier.stringify) stringifier = stringifier.stringify;
			let result = "";
			stringifier(this, (i) => {
				result += i;
			});
			return result;
		}
		warn(result, text, opts = {}) {
			let data = { node: this };
			for (let i in opts) data[i] = opts[i];
			return result.warn(text, data);
		}
	};
	module.exports = Node;
	Node.default = Node;
}));
//#endregion
//#region node_modules/postcss/lib/comment.js
var require_comment = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Node = require_node();
	var Comment = class extends Node {
		constructor(defaults) {
			super(defaults);
			this.type = "comment";
		}
	};
	module.exports = Comment;
	Comment.default = Comment;
}));
//#endregion
//#region node_modules/postcss/lib/declaration.js
var require_declaration = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Node = require_node();
	var Declaration = class extends Node {
		get variable() {
			return this.prop.startsWith("--") || this.prop[0] === "$";
		}
		constructor(defaults) {
			if (defaults && typeof defaults.value !== "undefined" && typeof defaults.value !== "string") defaults = {
				...defaults,
				value: String(defaults.value)
			};
			super(defaults);
			this.type = "decl";
		}
	};
	module.exports = Declaration;
	Declaration.default = Declaration;
}));
//#endregion
//#region node_modules/postcss/lib/container.js
var require_container = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Comment = require_comment();
	var Declaration = require_declaration();
	var Node = require_node();
	var { isClean, my } = require_symbols();
	var AtRule;
	var parse;
	var Root;
	var Rule;
	function cleanSource(nodes) {
		let stack = nodes.slice();
		while (stack.length > 0) {
			let node = stack.pop();
			delete node.source;
			if (node.nodes) {
				node.nodes = node.nodes.slice();
				for (let i of node.nodes) stack.push(i);
			}
		}
		return nodes.slice();
	}
	function markTreeDirty(node) {
		let stack = [node];
		while (stack.length > 0) {
			let next = stack.pop();
			next[isClean] = false;
			if (next.proxyOf.nodes) for (let i of next.proxyOf.nodes) stack.push(i);
		}
	}
	var Container = class Container extends Node {
		get first() {
			if (!this.proxyOf.nodes) return void 0;
			return this.proxyOf.nodes[0];
		}
		get last() {
			if (!this.proxyOf.nodes) return void 0;
			return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
		}
		append(...children) {
			for (let child of children) {
				let nodes = this.normalize(child, this.last);
				for (let node of nodes) this.proxyOf.nodes.push(node);
			}
			this.markDirty();
			return this;
		}
		cleanRaws(keepBetween) {
			let stack = [this];
			while (stack.length > 0) {
				let node = stack.pop();
				if (node !== this && node.cleanRaws !== Container.prototype.cleanRaws) {
					node.cleanRaws(keepBetween);
					continue;
				}
				Node.prototype.cleanRaws.call(node, keepBetween);
				if (node.nodes) for (let child of node.nodes) stack.push(child);
			}
		}
		each(callback) {
			if (!this.proxyOf.nodes) return void 0;
			let iterator = this.getIterator();
			let index, result;
			while (this.indexes[iterator] < this.proxyOf.nodes.length) {
				index = this.indexes[iterator];
				result = callback(this.proxyOf.nodes[index], index);
				if (result === false) break;
				this.indexes[iterator] += 1;
			}
			delete this.indexes[iterator];
			return result;
		}
		every(condition) {
			return this.nodes.every(condition);
		}
		getIterator() {
			if (!this.lastEach) this.lastEach = 0;
			if (!this.indexes) this.indexes = {};
			this.lastEach += 1;
			let iterator = this.lastEach;
			this.indexes[iterator] = 0;
			return iterator;
		}
		getProxyProcessor() {
			return {
				get(node, prop) {
					if (prop === "proxyOf") return node;
					else if (!node[prop]) return node[prop];
					else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) return (...args) => {
						return node[prop](...args.map((i) => {
							if (typeof i === "function") return (child, index) => i(child.toProxy(), index);
							else return i;
						}));
					};
					else if (prop === "every" || prop === "some") return (cb) => {
						return node[prop]((child, ...other) => cb(child.toProxy(), ...other));
					};
					else if (prop === "root") return () => node.root().toProxy();
					else if (prop === "nodes") return node.nodes.map((i) => i.toProxy());
					else if (prop === "first" || prop === "last") return node[prop].toProxy();
					else return node[prop];
				},
				set(node, prop, value) {
					if (node[prop] === value) return true;
					node[prop] = value;
					if (prop === "name" || prop === "params" || prop === "selector") node.markDirty();
					return true;
				}
			};
		}
		index(child) {
			if (typeof child === "number") return child;
			if (child.proxyOf) child = child.proxyOf;
			return this.proxyOf.nodes.indexOf(child);
		}
		insertAfter(exist, add) {
			let existIndex = this.index(exist);
			let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
			existIndex = this.index(exist);
			for (let node of nodes) this.proxyOf.nodes.splice(existIndex + 1, 0, node);
			let index;
			for (let id in this.indexes) {
				index = this.indexes[id];
				if (existIndex < index) this.indexes[id] = index + nodes.length;
			}
			this.markDirty();
			return this;
		}
		insertBefore(exist, add) {
			let existIndex = this.index(exist);
			let type = existIndex === 0 ? "prepend" : false;
			let nodes = this.normalize(add, this.proxyOf.nodes[existIndex], type).reverse();
			existIndex = this.index(exist);
			for (let node of nodes) this.proxyOf.nodes.splice(existIndex, 0, node);
			let index;
			for (let id in this.indexes) {
				index = this.indexes[id];
				if (existIndex <= index) this.indexes[id] = index + nodes.length;
			}
			this.markDirty();
			return this;
		}
		normalize(nodes, sample) {
			if (typeof nodes === "string") nodes = cleanSource(parse(nodes).nodes);
			else if (typeof nodes === "undefined") nodes = [];
			else if (Array.isArray(nodes)) {
				nodes = nodes.slice(0);
				for (let i of nodes) if (i.parent) i.parent.removeChild(i, "ignore");
			} else if (nodes.type === "root" && this.type !== "document") {
				nodes = nodes.nodes.slice(0);
				for (let i of nodes) if (i.parent) i.parent.removeChild(i, "ignore");
			} else if (nodes.type) nodes = [nodes];
			else if (nodes.prop) {
				if (typeof nodes.value === "undefined") throw new Error("Value field is missed in node creation");
				else if (typeof nodes.value !== "string") nodes.value = String(nodes.value);
				nodes = [new Declaration(nodes)];
			} else if (nodes.selector || nodes.selectors) nodes = [new Rule(nodes)];
			else if (nodes.name) nodes = [new AtRule(nodes)];
			else if (nodes.text) nodes = [new Comment(nodes)];
			else throw new Error("Unknown node type in node creation");
			return nodes.map((i) => {
				/* c8 ignore next */
				if (!i[my]) Container.rebuild(i);
				i = i.proxyOf;
				if (i.parent) i.parent.removeChild(i);
				if (i[isClean]) markTreeDirty(i);
				if (!i.raws) i.raws = {};
				if (typeof i.raws.before === "undefined") {
					if (sample && typeof sample.raws.before !== "undefined") i.raws.before = sample.raws.before.replace(/\S/g, "");
				}
				i.parent = this.proxyOf;
				return i;
			});
		}
		prepend(...children) {
			children = children.reverse();
			for (let child of children) {
				let nodes = this.normalize(child, this.first, "prepend").reverse();
				for (let node of nodes) this.proxyOf.nodes.unshift(node);
				for (let id in this.indexes) this.indexes[id] = this.indexes[id] + nodes.length;
			}
			this.markDirty();
			return this;
		}
		push(child) {
			child.parent = this;
			this.proxyOf.nodes.push(child);
			return this;
		}
		removeAll() {
			for (let node of this.proxyOf.nodes) node.parent = void 0;
			this.proxyOf.nodes = [];
			this.markDirty();
			return this;
		}
		removeChild(child) {
			child = this.index(child);
			this.proxyOf.nodes[child].parent = void 0;
			this.proxyOf.nodes.splice(child, 1);
			let index;
			for (let id in this.indexes) {
				index = this.indexes[id];
				if (index >= child) this.indexes[id] = index - 1;
			}
			this.markDirty();
			return this;
		}
		replaceValues(pattern, opts, callback) {
			if (!callback) {
				callback = opts;
				opts = {};
			}
			this.walkDecls((decl) => {
				if (opts.props && !opts.props.includes(decl.prop)) return;
				if (opts.fast && !decl.value.includes(opts.fast)) return;
				decl.value = decl.value.replace(pattern, callback);
			});
			this.markDirty();
			return this;
		}
		some(condition) {
			return this.nodes.some(condition);
		}
		walk(callback) {
			if (!this.proxyOf.nodes) return void 0;
			let stack = [{
				iterator: this.getIterator(),
				node: this.proxyOf
			}];
			while (stack.length > 0) {
				let { iterator, node } = stack[stack.length - 1];
				let index = node.indexes[iterator];
				if (index >= node.proxyOf.nodes.length) {
					delete node.indexes[iterator];
					stack.pop();
					let parent = stack[stack.length - 1];
					if (parent) parent.node.indexes[parent.iterator] += 1;
					continue;
				}
				let child = node.proxyOf.nodes[index];
				let result;
				try {
					result = callback(child, index);
				} catch (e) {
					throw child.addToError(e);
				}
				if (result === false) {
					for (let opened of stack) delete opened.node.indexes[opened.iterator];
					return false;
				}
				if (child.walk && child.proxyOf.nodes) stack.push({
					iterator: child.getIterator(),
					node: child
				});
				else node.indexes[iterator] += 1;
			}
		}
		walkAtRules(name, callback) {
			if (!callback) {
				callback = name;
				return this.walk((child, i) => {
					if (child.type === "atrule") return callback(child, i);
				});
			}
			if (name instanceof RegExp) return this.walk((child, i) => {
				if (child.type === "atrule" && name.test(child.name)) return callback(child, i);
			});
			return this.walk((child, i) => {
				if (child.type === "atrule" && child.name === name) return callback(child, i);
			});
		}
		walkComments(callback) {
			return this.walk((child, i) => {
				if (child.type === "comment") return callback(child, i);
			});
		}
		walkDecls(prop, callback) {
			if (!callback) {
				callback = prop;
				return this.walk((child, i) => {
					if (child.type === "decl") return callback(child, i);
				});
			}
			if (prop instanceof RegExp) return this.walk((child, i) => {
				if (child.type === "decl" && prop.test(child.prop)) return callback(child, i);
			});
			return this.walk((child, i) => {
				if (child.type === "decl" && child.prop === prop) return callback(child, i);
			});
		}
		walkRules(selector, callback) {
			if (!callback) {
				callback = selector;
				return this.walk((child, i) => {
					if (child.type === "rule") return callback(child, i);
				});
			}
			if (selector instanceof RegExp) return this.walk((child, i) => {
				if (child.type === "rule" && selector.test(child.selector)) return callback(child, i);
			});
			return this.walk((child, i) => {
				if (child.type === "rule" && child.selector === selector) return callback(child, i);
			});
		}
	};
	Container.registerParse = (dependant) => {
		parse = dependant;
	};
	Container.registerRule = (dependant) => {
		Rule = dependant;
	};
	Container.registerAtRule = (dependant) => {
		AtRule = dependant;
	};
	Container.registerRoot = (dependant) => {
		Root = dependant;
	};
	module.exports = Container;
	Container.default = Container;
	/* c8 ignore start */
	Container.rebuild = (node) => {
		let stack = [node];
		while (stack.length > 0) {
			let next = stack.pop();
			if (next.type === "atrule") Object.setPrototypeOf(next, AtRule.prototype);
			else if (next.type === "rule") Object.setPrototypeOf(next, Rule.prototype);
			else if (next.type === "decl") Object.setPrototypeOf(next, Declaration.prototype);
			else if (next.type === "comment") Object.setPrototypeOf(next, Comment.prototype);
			else if (next.type === "root") Object.setPrototypeOf(next, Root.prototype);
			next[my] = true;
			if (next.nodes) for (let child of next.nodes) stack.push(child);
		}
	};
}));
/* c8 ignore stop */
//#endregion
//#region node_modules/postcss/lib/at-rule.js
var require_at_rule = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Container = require_container();
	var AtRule = class extends Container {
		constructor(defaults) {
			super(defaults);
			this.type = "atrule";
		}
		append(...children) {
			if (!this.proxyOf.nodes) this.nodes = [];
			return super.append(...children);
		}
		prepend(...children) {
			if (!this.proxyOf.nodes) this.nodes = [];
			return super.prepend(...children);
		}
	};
	module.exports = AtRule;
	AtRule.default = AtRule;
	Container.registerAtRule(AtRule);
}));
//#endregion
//#region node_modules/postcss/lib/document.js
var require_document = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Container = require_container();
	var LazyResult;
	var Processor;
	var Document = class extends Container {
		constructor(defaults) {
			super({
				type: "document",
				...defaults
			});
			if (!this.nodes) this.nodes = [];
		}
		toResult(opts = {}) {
			return new LazyResult(new Processor(), this, opts).stringify();
		}
	};
	Document.registerLazyResult = (dependant) => {
		LazyResult = dependant;
	};
	Document.registerProcessor = (dependant) => {
		Processor = dependant;
	};
	module.exports = Document;
	Document.default = Document;
}));
//#endregion
//#region node_modules/nanoid/non-secure/index.cjs
var require_non_secure = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
	var customAlphabet = (alphabet, defaultSize = 21) => {
		return (size = defaultSize) => {
			let id = "";
			let i = size | 0;
			while (i-- > 0) id += alphabet[Math.random() * alphabet.length | 0];
			return id;
		};
	};
	var nanoid = (size = 21) => {
		let id = "";
		let i = size | 0;
		while (i-- > 0) id += urlAlphabet[Math.random() * 64 | 0];
		return id;
	};
	module.exports = {
		nanoid,
		customAlphabet
	};
}));
//#endregion
//#region node_modules/source-map-js/lib/base64.js
var require_base64 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
	/**
	* Encode an integer in the range of 0 to 63 to a single base 64 digit.
	*/
	exports.encode = function(number) {
		if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
		throw new TypeError("Must be between 0 and 63: " + number);
	};
	/**
	* Decode a single base 64 character code digit to an integer. Returns -1 on
	* failure.
	*/
	exports.decode = function(charCode) {
		var bigA = 65;
		var bigZ = 90;
		var littleA = 97;
		var littleZ = 122;
		var zero = 48;
		var nine = 57;
		var plus = 43;
		var slash = 47;
		var littleOffset = 26;
		var numberOffset = 52;
		if (bigA <= charCode && charCode <= bigZ) return charCode - bigA;
		if (littleA <= charCode && charCode <= littleZ) return charCode - littleA + littleOffset;
		if (zero <= charCode && charCode <= nine) return charCode - zero + numberOffset;
		if (charCode == plus) return 62;
		if (charCode == slash) return 63;
		return -1;
	};
}));
//#endregion
//#region node_modules/source-map-js/lib/base64-vlq.js
var require_base64_vlq = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64 = require_base64();
	var VLQ_BASE_SHIFT = 5;
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
	var VLQ_BASE_MASK = VLQ_BASE - 1;
	var VLQ_CONTINUATION_BIT = VLQ_BASE;
	/**
	* Converts from a two-complement value to a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	*   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	*/
	function toVLQSigned(aValue) {
		return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
	}
	/**
	* Converts to a two-complement value from a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	*   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	*/
	function fromVLQSigned(aValue) {
		var isNegative = (aValue & 1) === 1;
		var shifted = aValue >> 1;
		return isNegative ? -shifted : shifted;
	}
	/**
	* Returns the base 64 VLQ encoded value.
	*/
	exports.encode = function base64VLQ_encode(aValue) {
		var encoded = "";
		var digit;
		var vlq = toVLQSigned(aValue);
		do {
			digit = vlq & VLQ_BASE_MASK;
			vlq >>>= VLQ_BASE_SHIFT;
			if (vlq > 0) digit |= VLQ_CONTINUATION_BIT;
			encoded += base64.encode(digit);
		} while (vlq > 0);
		return encoded;
	};
	/**
	* Decodes the next base 64 VLQ value from the given string and returns the
	* value and the rest of the string via the out parameter.
	*/
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		var strLen = aStr.length;
		var result = 0;
		var shift = 0;
		var continuation, digit;
		do {
			if (aIndex >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
			digit = base64.decode(aStr.charCodeAt(aIndex++));
			if (digit === -1) throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
			continuation = !!(digit & VLQ_CONTINUATION_BIT);
			digit &= VLQ_BASE_MASK;
			result = result + (digit << shift);
			shift += VLQ_BASE_SHIFT;
		} while (continuation);
		aOutParam.value = fromVLQSigned(result);
		aOutParam.rest = aIndex;
	};
}));
//#endregion
//#region node_modules/source-map-js/lib/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* This is a helper function for getting values from parameter/options
	* objects.
	*
	* @param args The object we are extracting values from
	* @param name The name of the property we are getting.
	* @param defaultValue An optional value to return if the property is missing
	* from the object. If this is not specified and the property is missing, an
	* error will be thrown.
	*/
	function getArg(aArgs, aName, aDefaultValue) {
		if (aName in aArgs) return aArgs[aName];
		else if (arguments.length === 3) return aDefaultValue;
		else throw new Error("\"" + aName + "\" is a required argument.");
	}
	exports.getArg = getArg;
	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;
	function urlParse(aUrl) {
		var match = aUrl.match(urlRegexp);
		if (!match) return null;
		return {
			scheme: match[1],
			auth: match[2],
			host: match[3],
			port: match[4],
			path: match[5]
		};
	}
	exports.urlParse = urlParse;
	function urlGenerate(aParsedUrl) {
		var url = "";
		if (aParsedUrl.scheme) url += aParsedUrl.scheme + ":";
		url += "//";
		if (aParsedUrl.auth) url += aParsedUrl.auth + "@";
		if (aParsedUrl.host) url += aParsedUrl.host;
		if (aParsedUrl.port) url += ":" + aParsedUrl.port;
		if (aParsedUrl.path) url += aParsedUrl.path;
		return url;
	}
	exports.urlGenerate = urlGenerate;
	var MAX_CACHED_INPUTS = 32;
	/**
	* Takes some function `f(input) -> result` and returns a memoized version of
	* `f`.
	*
	* We keep at most `MAX_CACHED_INPUTS` memoized results of `f` alive. The
	* memoization is a dumb-simple, linear least-recently-used cache.
	*/
	function lruMemoize(f) {
		var cache = [];
		return function(input) {
			for (var i = 0; i < cache.length; i++) if (cache[i].input === input) {
				var temp = cache[0];
				cache[0] = cache[i];
				cache[i] = temp;
				return cache[0].result;
			}
			var result = f(input);
			cache.unshift({
				input,
				result
			});
			if (cache.length > MAX_CACHED_INPUTS) cache.pop();
			return result;
		};
	}
	/**
	* Normalizes a path, or the path portion of a URL:
	*
	* - Replaces consecutive slashes with one slash.
	* - Removes unnecessary '.' parts.
	* - Removes unnecessary '<dir>/..' parts.
	*
	* Based on code in the Node.js 'path' core module.
	*
	* @param aPath The path or url to normalize.
	*/
	var normalize = lruMemoize(function normalize(aPath) {
		var path = aPath;
		var url = urlParse(aPath);
		if (url) {
			if (!url.path) return aPath;
			path = url.path;
		}
		var isAbsolute = exports.isAbsolute(path);
		var parts = [];
		var start = 0;
		var i = 0;
		while (true) {
			start = i;
			i = path.indexOf("/", start);
			if (i === -1) {
				parts.push(path.slice(start));
				break;
			} else {
				parts.push(path.slice(start, i));
				while (i < path.length && path[i] === "/") i++;
			}
		}
		for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
			part = parts[i];
			if (part === ".") parts.splice(i, 1);
			else if (part === "..") up++;
			else if (up > 0) {
				if (part === "") {
					parts.splice(i + 1, up);
					up = 0;
				} else {
					parts.splice(i, 2);
					up--;
				}
			}
		}
		path = parts.join("/");
		if (path === "") path = isAbsolute ? "/" : ".";
		if (url) {
			url.path = path;
			return urlGenerate(url);
		}
		return path;
	});
	exports.normalize = normalize;
	/**
	* Joins two paths/URLs.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be joined with the root.
	*
	* - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	*   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	*   first.
	* - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	*   is updated with the result and aRoot is returned. Otherwise the result
	*   is returned.
	*   - If aPath is absolute, the result is aPath.
	*   - Otherwise the two paths are joined with a slash.
	* - Joining for example 'http://' and 'www.example.com' is also supported.
	*/
	function join(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		if (aPath === "") aPath = ".";
		var aPathUrl = urlParse(aPath);
		var aRootUrl = urlParse(aRoot);
		if (aRootUrl) aRoot = aRootUrl.path || "/";
		if (aPathUrl && !aPathUrl.scheme) {
			if (aRootUrl) aPathUrl.scheme = aRootUrl.scheme;
			return urlGenerate(aPathUrl);
		}
		if (aPathUrl || aPath.match(dataUrlRegexp)) return aPath;
		if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
			aRootUrl.host = aPath;
			return urlGenerate(aRootUrl);
		}
		var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
		if (aRootUrl) {
			aRootUrl.path = joined;
			return urlGenerate(aRootUrl);
		}
		return joined;
	}
	exports.join = join;
	exports.isAbsolute = function(aPath) {
		return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
	};
	/**
	* Make a path relative to a URL or another path.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be made relative to aRoot.
	*/
	function relative(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		aRoot = aRoot.replace(/\/$/, "");
		var level = 0;
		while (aPath.indexOf(aRoot + "/") !== 0) {
			var index = aRoot.lastIndexOf("/");
			if (index < 0) return aPath;
			aRoot = aRoot.slice(0, index);
			if (aRoot.match(/^([^\/]+:\/)?\/*$/)) return aPath;
			++level;
		}
		return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;
	var supportsNullProto = function() {
		return !("__proto__" in Object.create(null));
	}();
	function identity(s) {
		return s;
	}
	/**
	* Because behavior goes wacky when you set `__proto__` on objects, we
	* have to prefix all the strings in our set with an arbitrary character.
	*
	* See https://github.com/mozilla/source-map/pull/31 and
	* https://github.com/mozilla/source-map/issues/30
	*
	* @param String aStr
	*/
	function toSetString(aStr) {
		if (isProtoString(aStr)) return "$" + aStr;
		return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;
	function fromSetString(aStr) {
		if (isProtoString(aStr)) return aStr.slice(1);
		return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;
	function isProtoString(s) {
		if (!s) return false;
		var length = s.length;
		if (length < 9) return false;
		if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) return false;
		for (var i = length - 10; i >= 0; i--) if (s.charCodeAt(i) !== 36) return false;
		return true;
	}
	/**
	* Comparator between two mappings where the original positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same original source/line/column, but different generated
	* line and column the same. Useful when searching for a mapping with a
	* stubbed out mapping.
	*/
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;
	function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
	/**
	* Comparator between two mappings with deflated source and name indices where
	* the generated positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same generated line and column, but different
	* source/name/original line and column the same. Useful when searching for a
	* mapping with a stubbed out mapping.
	*/
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
	function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
	function strcmp(aStr1, aStr2) {
		if (aStr1 === aStr2) return 0;
		if (aStr1 === null) return 1;
		if (aStr2 === null) return -1;
		if (aStr1 > aStr2) return 1;
		return -1;
	}
	/**
	* Comparator between two mappings with inflated source and name strings where
	* the generated positions are compared.
	*/
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
	/**
	* Strip any JSON XSSI avoidance prefix from the string (as documented
	* in the source maps specification), and then parse the string as
	* JSON.
	*/
	function parseSourceMapInput(str) {
		return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
	}
	exports.parseSourceMapInput = parseSourceMapInput;
	/**
	* Compute the URL of a source given the the source root, the source's
	* URL, and the source map's URL.
	*/
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
		sourceURL = sourceURL || "";
		if (sourceRoot) {
			if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") sourceRoot += "/";
			sourceURL = sourceRoot + sourceURL;
		}
		if (sourceMapURL) {
			var parsed = urlParse(sourceMapURL);
			if (!parsed) throw new Error("sourceMapURL could not be parsed");
			if (parsed.path) {
				var index = parsed.path.lastIndexOf("/");
				if (index >= 0) parsed.path = parsed.path.substring(0, index + 1);
			}
			sourceURL = join(urlGenerate(parsed), sourceURL);
		}
		return normalize(sourceURL);
	}
	exports.computeSourceURL = computeSourceURL;
}));
//#endregion
//#region node_modules/source-map-js/lib/array-set.js
var require_array_set = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	var has = Object.prototype.hasOwnProperty;
	var hasNativeMap = typeof Map !== "undefined";
	/**
	* A data structure which is a combination of an array and a set. Adding a new
	* member is O(1), testing for membership is O(1), and finding the index of an
	* element is O(1). Removing elements from the set is not supported. Only
	* strings are supported for membership.
	*/
	function ArraySet() {
		this._array = [];
		this._set = hasNativeMap ? /* @__PURE__ */ new Map() : Object.create(null);
	}
	/**
	* Static method for creating ArraySet instances from an existing array.
	*/
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		var set = new ArraySet();
		for (var i = 0, len = aArray.length; i < len; i++) set.add(aArray[i], aAllowDuplicates);
		return set;
	};
	/**
	* Return how many unique items are in this ArraySet. If duplicates have been
	* added, than those do not count towards the size.
	*
	* @returns Number
	*/
	ArraySet.prototype.size = function ArraySet_size() {
		return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
	};
	/**
	* Add the given string to this set.
	*
	* @param String aStr
	*/
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
		var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
		var idx = this._array.length;
		if (!isDuplicate || aAllowDuplicates) this._array.push(aStr);
		if (!isDuplicate) {
			if (hasNativeMap) this._set.set(aStr, idx);
			else this._set[sStr] = idx;
		}
	};
	/**
	* Is the given string a member of this set?
	*
	* @param String aStr
	*/
	ArraySet.prototype.has = function ArraySet_has(aStr) {
		if (hasNativeMap) return this._set.has(aStr);
		else {
			var sStr = util.toSetString(aStr);
			return has.call(this._set, sStr);
		}
	};
	/**
	* What is the index of the given string in the array?
	*
	* @param String aStr
	*/
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
		if (hasNativeMap) {
			var idx = this._set.get(aStr);
			if (idx >= 0) return idx;
		} else {
			var sStr = util.toSetString(aStr);
			if (has.call(this._set, sStr)) return this._set[sStr];
		}
		throw new Error("\"" + aStr + "\" is not in the set.");
	};
	/**
	* What is the element at the given index?
	*
	* @param Number aIdx
	*/
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
		if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
		throw new Error("No element indexed by " + aIdx);
	};
	/**
	* Returns the array representation of this set (which has the proper indices
	* indicated by indexOf). Note that this is a copy of the internal array used
	* for storing the members so that no one can mess with internal state.
	*/
	ArraySet.prototype.toArray = function ArraySet_toArray() {
		return this._array.slice();
	};
	exports.ArraySet = ArraySet;
}));
//#endregion
//#region node_modules/source-map-js/lib/mapping-list.js
var require_mapping_list = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	/**
	* Determine whether mappingB is after mappingA with respect to generated
	* position.
	*/
	function generatedPositionAfter(mappingA, mappingB) {
		var lineA = mappingA.generatedLine;
		var lineB = mappingB.generatedLine;
		var columnA = mappingA.generatedColumn;
		var columnB = mappingB.generatedColumn;
		return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}
	/**
	* A data structure to provide a sorted view of accumulated mappings in a
	* performance conscious manner. It trades a neglibable overhead in general
	* case for a large speedup in case of mappings being added in order.
	*/
	function MappingList() {
		this._array = [];
		this._sorted = true;
		this._last = {
			generatedLine: -1,
			generatedColumn: 0
		};
	}
	/**
	* Iterate through internal items. This method takes the same arguments that
	* `Array.prototype.forEach` takes.
	*
	* NOTE: The order of the mappings is NOT guaranteed.
	*/
	MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
		this._array.forEach(aCallback, aThisArg);
	};
	/**
	* Add the given source mapping.
	*
	* @param Object aMapping
	*/
	MappingList.prototype.add = function MappingList_add(aMapping) {
		if (generatedPositionAfter(this._last, aMapping)) {
			this._last = aMapping;
			this._array.push(aMapping);
		} else {
			this._sorted = false;
			this._array.push(aMapping);
		}
	};
	/**
	* Returns the flat, sorted array of mappings. The mappings are sorted by
	* generated position.
	*
	* WARNING: This method returns internal data without copying, for
	* performance. The return value must NOT be mutated, and should be treated as
	* an immutable borrow. If you want to take ownership, you must make your own
	* copy.
	*/
	MappingList.prototype.toArray = function MappingList_toArray() {
		if (!this._sorted) {
			this._array.sort(util.compareByGeneratedPositionsInflated);
			this._sorted = true;
		}
		return this._array;
	};
	exports.MappingList = MappingList;
}));
//#endregion
//#region node_modules/source-map-js/lib/source-map-generator.js
var require_source_map_generator = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64VLQ = require_base64_vlq();
	var util = require_util();
	var ArraySet = require_array_set().ArraySet;
	var MappingList = require_mapping_list().MappingList;
	/**
	* An instance of the SourceMapGenerator represents a source map which is
	* being built incrementally. You may pass an object with the following
	* properties:
	*
	*   - file: The filename of the generated source.
	*   - sourceRoot: A root for all relative URLs in this source map.
	*/
	function SourceMapGenerator(aArgs) {
		if (!aArgs) aArgs = {};
		this._file = util.getArg(aArgs, "file", null);
		this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
		this._skipValidation = util.getArg(aArgs, "skipValidation", false);
		this._ignoreInvalidMapping = util.getArg(aArgs, "ignoreInvalidMapping", false);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		this._mappings = new MappingList();
		this._sourcesContents = null;
	}
	SourceMapGenerator.prototype._version = 3;
	/**
	* Creates a new SourceMapGenerator based on a SourceMapConsumer
	*
	* @param aSourceMapConsumer The SourceMap.
	*/
	SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
		var sourceRoot = aSourceMapConsumer.sourceRoot;
		var generator = new SourceMapGenerator(Object.assign(generatorOps || {}, {
			file: aSourceMapConsumer.file,
			sourceRoot
		}));
		aSourceMapConsumer.eachMapping(function(mapping) {
			var newMapping = { generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			} };
			if (mapping.source != null) {
				newMapping.source = mapping.source;
				if (sourceRoot != null) newMapping.source = util.relative(sourceRoot, newMapping.source);
				newMapping.original = {
					line: mapping.originalLine,
					column: mapping.originalColumn
				};
				if (mapping.name != null) newMapping.name = mapping.name;
			}
			generator.addMapping(newMapping);
		});
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var sourceRelative = sourceFile;
			if (sourceRoot !== null) sourceRelative = util.relative(sourceRoot, sourceFile);
			if (!generator._sources.has(sourceRelative)) generator._sources.add(sourceRelative);
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) generator.setSourceContent(sourceFile, content);
		});
		return generator;
	};
	/**
	* Add a single mapping from original source line and column to the generated
	* source's line and column for this source map being created. The mapping
	* object should have the following properties:
	*
	*   - generated: An object with the generated line and column positions.
	*   - original: An object with the original line and column positions.
	*   - source: The original source file (relative to the sourceRoot).
	*   - name: An optional original token name for this mapping.
	*/
	SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
		var generated = util.getArg(aArgs, "generated");
		var original = util.getArg(aArgs, "original", null);
		var source = util.getArg(aArgs, "source", null);
		var name = util.getArg(aArgs, "name", null);
		if (!this._skipValidation) {
			if (this._validateMapping(generated, original, source, name) === false) return;
		}
		if (source != null) {
			source = String(source);
			if (!this._sources.has(source)) this._sources.add(source);
		}
		if (name != null) {
			name = String(name);
			if (!this._names.has(name)) this._names.add(name);
		}
		this._mappings.add({
			generatedLine: generated.line,
			generatedColumn: generated.column,
			originalLine: original != null && original.line,
			originalColumn: original != null && original.column,
			source,
			name
		});
	};
	/**
	* Set the source content for a source file.
	*/
	SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		var source = aSourceFile;
		if (this._sourceRoot != null) source = util.relative(this._sourceRoot, source);
		if (aSourceContent != null) {
			if (!this._sourcesContents) this._sourcesContents = Object.create(null);
			this._sourcesContents[util.toSetString(source)] = aSourceContent;
		} else if (this._sourcesContents) {
			delete this._sourcesContents[util.toSetString(source)];
			if (Object.keys(this._sourcesContents).length === 0) this._sourcesContents = null;
		}
	};
	/**
	* Applies the mappings of a sub-source-map for a specific source file to the
	* source map being generated. Each mapping to the supplied source file is
	* rewritten using the supplied source map. Note: The resolution for the
	* resulting mappings is the minimium of this map and the supplied map.
	*
	* @param aSourceMapConsumer The source map to be applied.
	* @param aSourceFile Optional. The filename of the source file.
	*        If omitted, SourceMapConsumer's file property will be used.
	* @param aSourceMapPath Optional. The dirname of the path to the source map
	*        to be applied. If relative, it is relative to the SourceMapConsumer.
	*        This parameter is needed when the two source maps aren't in the same
	*        directory, and the source map to be applied contains relative source
	*        paths. If so, those relative source paths need to be rewritten
	*        relative to the SourceMapGenerator.
	*/
	SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		var sourceFile = aSourceFile;
		if (aSourceFile == null) {
			if (aSourceMapConsumer.file == null) throw new Error("SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's \"file\" property. Both were omitted.");
			sourceFile = aSourceMapConsumer.file;
		}
		var sourceRoot = this._sourceRoot;
		if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
		var newSources = new ArraySet();
		var newNames = new ArraySet();
		this._mappings.unsortedForEach(function(mapping) {
			if (mapping.source === sourceFile && mapping.originalLine != null) {
				var original = aSourceMapConsumer.originalPositionFor({
					line: mapping.originalLine,
					column: mapping.originalColumn
				});
				if (original.source != null) {
					mapping.source = original.source;
					if (aSourceMapPath != null) mapping.source = util.join(aSourceMapPath, mapping.source);
					if (sourceRoot != null) mapping.source = util.relative(sourceRoot, mapping.source);
					mapping.originalLine = original.line;
					mapping.originalColumn = original.column;
					if (original.name != null) mapping.name = original.name;
				}
			}
			var source = mapping.source;
			if (source != null && !newSources.has(source)) newSources.add(source);
			var name = mapping.name;
			if (name != null && !newNames.has(name)) newNames.add(name);
		}, this);
		this._sources = newSources;
		this._names = newNames;
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
				if (aSourceMapPath != null) sourceFile = util.join(aSourceMapPath, sourceFile);
				if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
				this.setSourceContent(sourceFile, content);
			}
		}, this);
	};
	/**
	* A mapping can have one of the three levels of data:
	*
	*   1. Just the generated position.
	*   2. The Generated position, original position, and original source.
	*   3. Generated and original position, original source, as well as a name
	*      token.
	*
	* To maintain consistency, we validate that any new mapping being added falls
	* in to one of these categories.
	*/
	SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
		if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
			var message = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
			if (this._ignoreInvalidMapping) {
				if (typeof console !== "undefined" && console.warn) console.warn(message);
				return false;
			} else throw new Error(message);
		}
		if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) return;
		else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) return;
		else {
			var message = "Invalid mapping: " + JSON.stringify({
				generated: aGenerated,
				source: aSource,
				original: aOriginal,
				name: aName
			});
			if (this._ignoreInvalidMapping) {
				if (typeof console !== "undefined" && console.warn) console.warn(message);
				return false;
			} else throw new Error(message);
		}
	};
	/**
	* Serialize the accumulated mappings in to the stream of base 64 VLQs
	* specified by the source map format.
	*/
	SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
		var previousGeneratedColumn = 0;
		var previousGeneratedLine = 1;
		var previousOriginalColumn = 0;
		var previousOriginalLine = 0;
		var previousName = 0;
		var previousSource = 0;
		var result = "";
		var next;
		var mapping;
		var nameIdx;
		var sourceIdx;
		var mappings = this._mappings.toArray();
		for (var i = 0, len = mappings.length; i < len; i++) {
			mapping = mappings[i];
			next = "";
			if (mapping.generatedLine !== previousGeneratedLine) {
				previousGeneratedColumn = 0;
				var lineDelta = mapping.generatedLine - previousGeneratedLine;
				next += lineDelta === 1 ? ";" : ";".repeat(lineDelta);
				previousGeneratedLine = mapping.generatedLine;
			} else if (i > 0) {
				if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
				next += ",";
			}
			next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
			previousGeneratedColumn = mapping.generatedColumn;
			if (mapping.source != null) {
				sourceIdx = this._sources.indexOf(mapping.source);
				next += base64VLQ.encode(sourceIdx - previousSource);
				previousSource = sourceIdx;
				next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
				previousOriginalLine = mapping.originalLine - 1;
				next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
				previousOriginalColumn = mapping.originalColumn;
				if (mapping.name != null) {
					nameIdx = this._names.indexOf(mapping.name);
					next += base64VLQ.encode(nameIdx - previousName);
					previousName = nameIdx;
				}
			}
			result += next;
		}
		return result;
	};
	SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		return aSources.map(function(source) {
			if (!this._sourcesContents) return null;
			if (aSourceRoot != null) source = util.relative(aSourceRoot, source);
			var key = util.toSetString(source);
			return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
		}, this);
	};
	/**
	* Externalize the source map.
	*/
	SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
		var map = {
			version: this._version,
			sources: this._sources.toArray(),
			names: this._names.toArray(),
			mappings: this._serializeMappings()
		};
		if (this._file != null) map.file = this._file;
		if (this._sourceRoot != null) map.sourceRoot = this._sourceRoot;
		if (this._sourcesContents) map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
		return map;
	};
	/**
	* Render the source map being generated to a string.
	*/
	SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
		return JSON.stringify(this.toJSON());
	};
	exports.SourceMapGenerator = SourceMapGenerator;
}));
//#endregion
//#region node_modules/source-map-js/lib/binary-search.js
var require_binary_search = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;
	/**
	* Recursive implementation of binary search.
	*
	* @param aLow Indices here and lower do not contain the needle.
	* @param aHigh Indices here and higher do not contain the needle.
	* @param aNeedle The element being searched for.
	* @param aHaystack The non-empty array being searched.
	* @param aCompare Function which takes two elements and returns -1, 0, or 1.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*/
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		var mid = Math.floor((aHigh - aLow) / 2) + aLow;
		var cmp = aCompare(aNeedle, aHaystack[mid], true);
		if (cmp === 0) return mid;
		else if (cmp > 0) {
			if (aHigh - mid > 1) return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
			if (aBias == exports.LEAST_UPPER_BOUND) return aHigh < aHaystack.length ? aHigh : -1;
			else return mid;
		} else {
			if (mid - aLow > 1) return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
			if (aBias == exports.LEAST_UPPER_BOUND) return mid;
			else return aLow < 0 ? -1 : aLow;
		}
	}
	/**
	* This is an implementation of binary search which will always try and return
	* the index of the closest element if there is no exact hit. This is because
	* mappings between original and generated line/col pairs are single points,
	* and there is an implicit region between each of them, so a miss just means
	* that you aren't on the very start of a region.
	*
	* @param aNeedle The element you are looking for.
	* @param aHaystack The array that is being searched.
	* @param aCompare A function which takes the needle and an element in the
	*     array and returns -1, 0, or 1 depending on whether the needle is less
	*     than, equal to, or greater than the element, respectively.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	*/
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		if (aHaystack.length === 0) return -1;
		var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
		if (index < 0) return -1;
		while (index - 1 >= 0) {
			if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) break;
			--index;
		}
		return index;
	};
}));
//#endregion
//#region node_modules/source-map-js/lib/quick-sort.js
var require_quick_sort = /* @__PURE__ */ __commonJSMin(((exports) => {
	function SortTemplate(comparator) {
		/**
		* Swap the elements indexed by `x` and `y` in the array `ary`.
		*
		* @param {Array} ary
		*        The array.
		* @param {Number} x
		*        The index of the first item.
		* @param {Number} y
		*        The index of the second item.
		*/
		function swap(ary, x, y) {
			var temp = ary[x];
			ary[x] = ary[y];
			ary[y] = temp;
		}
		/**
		* Returns a random integer within the range `low .. high` inclusive.
		*
		* @param {Number} low
		*        The lower bound on the range.
		* @param {Number} high
		*        The upper bound on the range.
		*/
		function randomIntInRange(low, high) {
			return Math.round(low + Math.random() * (high - low));
		}
		/**
		* The Quick Sort algorithm.
		*
		* @param {Array} ary
		*        An array to sort.
		* @param {function} comparator
		*        Function to use to compare two items.
		* @param {Number} p
		*        Start index of the array
		* @param {Number} r
		*        End index of the array
		*/
		function doQuickSort(ary, comparator, p, r) {
			if (p < r) {
				var pivotIndex = randomIntInRange(p, r);
				var i = p - 1;
				swap(ary, pivotIndex, r);
				var pivot = ary[r];
				for (var j = p; j < r; j++) if (comparator(ary[j], pivot, false) <= 0) {
					i += 1;
					swap(ary, i, j);
				}
				swap(ary, i + 1, j);
				var q = i + 1;
				doQuickSort(ary, comparator, p, q - 1);
				doQuickSort(ary, comparator, q + 1, r);
			}
		}
		return doQuickSort;
	}
	function cloneSort(comparator) {
		let template = SortTemplate.toString();
		return new Function(`return ${template}`)()(comparator);
	}
	var isEvalAllowed = (function() {
		try {
			new Function("return 0")();
			return true;
		} catch {
			return false;
		}
	})();
	/**
	* Sort the given array in-place with the given comparator function.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	*/
	var sortCache = /* @__PURE__ */ new WeakMap();
	exports.quickSort = function(ary, comparator, start = 0) {
		let doQuickSort = isEvalAllowed ? sortCache.get(comparator) : SortTemplate(comparator);
		if (doQuickSort === void 0) {
			doQuickSort = cloneSort(comparator);
			sortCache.set(comparator, doQuickSort);
		}
		doQuickSort(ary, comparator, start, ary.length - 1);
	};
}));
//#endregion
//#region node_modules/source-map-js/lib/source-map-consumer.js
var require_source_map_consumer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	var binarySearch = require_binary_search();
	var ArraySet = require_array_set().ArraySet;
	var base64VLQ = require_base64_vlq();
	var quickSort = require_quick_sort().quickSort;
	var MAX_SECTION_OFFSET_LINE = 1e7;
	function SourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
		return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
	}
	SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
		return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
	};
	/**
	* The version of the source mapping spec that we are consuming.
	*/
	SourceMapConsumer.prototype._version = 3;
	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
		configurable: true,
		enumerable: true,
		get: function() {
			if (!this.__generatedMappings) this._parseMappings(this._mappings, this.sourceRoot);
			return this.__generatedMappings;
		}
	});
	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
		configurable: true,
		enumerable: true,
		get: function() {
			if (!this.__originalMappings) this._parseMappings(this._mappings, this.sourceRoot);
			return this.__originalMappings;
		}
	});
	SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
		var c = aStr.charAt(index);
		return c === ";" || c === ",";
	};
	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		throw new Error("Subclasses must implement _parseMappings");
	};
	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;
	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;
	/**
	* Iterate over each mapping between an original source/line/column and a
	* generated line/column in this source map.
	*
	* @param Function aCallback
	*        The function that is called with each mapping.
	* @param Object aContext
	*        Optional. If specified, this object will be the value of `this` every
	*        time that `aCallback` is called.
	* @param aOrder
	*        Either `SourceMapConsumer.GENERATED_ORDER` or
	*        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	*        iterate over the mappings sorted by the generated file's line/column
	*        order or the original's source/line/column order, respectively. Defaults to
	*        `SourceMapConsumer.GENERATED_ORDER`.
	*/
	SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
		var context = aContext || null;
		var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
		var mappings;
		switch (order) {
			case SourceMapConsumer.GENERATED_ORDER:
				mappings = this._generatedMappings;
				break;
			case SourceMapConsumer.ORIGINAL_ORDER:
				mappings = this._originalMappings;
				break;
			default: throw new Error("Unknown order of iteration.");
		}
		var sourceRoot = this.sourceRoot;
		var boundCallback = aCallback.bind(context);
		var names = this._names;
		var sources = this._sources;
		var sourceMapURL = this._sourceMapURL;
		for (var i = 0, n = mappings.length; i < n; i++) {
			var mapping = mappings[i];
			var source = mapping.source === null ? null : sources.at(mapping.source);
			if (source !== null) source = util.computeSourceURL(sourceRoot, source, sourceMapURL);
			boundCallback({
				source,
				generatedLine: mapping.generatedLine,
				generatedColumn: mapping.generatedColumn,
				originalLine: mapping.originalLine,
				originalColumn: mapping.originalColumn,
				name: mapping.name === null ? null : names.at(mapping.name)
			});
		}
	};
	/**
	* Returns all generated line and column information for the original source,
	* line, and column provided. If no column is provided, returns all mappings
	* corresponding to a either the line we are searching for or the next
	* closest line that has any mappings. Otherwise, returns all mappings
	* corresponding to the given line and either the column we are searching for
	* or the next closest column that has any offsets.
	*
	* The only argument is an object with the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.  The line number is 1-based.
	*   - column: Optional. the column number in the original source.
	*    The column number is 0-based.
	*
	* and an array of objects is returned, each with the following properties:
	*
	*   - line: The line number in the generated source, or null.  The
	*    line number is 1-based.
	*   - column: The column number in the generated source, or null.
	*    The column number is 0-based.
	*/
	SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
		var line = util.getArg(aArgs, "line");
		var needle = {
			source: util.getArg(aArgs, "source"),
			originalLine: line,
			originalColumn: util.getArg(aArgs, "column", 0)
		};
		needle.source = this._findSourceIndex(needle.source);
		if (needle.source < 0) return [];
		var mappings = [];
		var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
		if (index >= 0) {
			var mapping = this._originalMappings[index];
			if (aArgs.column === void 0) {
				var originalLine = mapping.originalLine;
				while (mapping && mapping.originalLine === originalLine) {
					mappings.push({
						line: util.getArg(mapping, "generatedLine", null),
						column: util.getArg(mapping, "generatedColumn", null),
						lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
					});
					mapping = this._originalMappings[++index];
				}
			} else {
				var originalColumn = mapping.originalColumn;
				while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
					mappings.push({
						line: util.getArg(mapping, "generatedLine", null),
						column: util.getArg(mapping, "generatedColumn", null),
						lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
					});
					mapping = this._originalMappings[++index];
				}
			}
		}
		return mappings;
	};
	exports.SourceMapConsumer = SourceMapConsumer;
	/**
	* A BasicSourceMapConsumer instance represents a parsed source map which we can
	* query for information about the original file positions by giving it a file
	* position in the generated source.
	*
	* The first parameter is the raw source map (either as a JSON string, or
	* already parsed to an object). According to the spec, source maps have the
	* following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - sources: An array of URLs to the original source files.
	*   - names: An array of identifiers which can be referrenced by individual mappings.
	*   - sourceRoot: Optional. The URL root from which all sources are relative.
	*   - sourcesContent: Optional. An array of contents of the original source files.
	*   - mappings: A string of base64 VLQs which contain the actual mappings.
	*   - file: Optional. The generated file this source map is associated with.
	*
	* Here is an example source map, taken from the source map spec[0]:
	*
	*     {
	*       version : 3,
	*       file: "out.js",
	*       sourceRoot : "",
	*       sources: ["foo.js", "bar.js"],
	*       names: ["src", "maps", "are", "fun"],
	*       mappings: "AA,AB;;ABCDE;"
	*     }
	*
	* The second parameter, if given, is a string whose value is the URL
	* at which the source map was found.  This URL is used to compute the
	* sources array.
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	*/
	function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
		var version = util.getArg(sourceMap, "version");
		var sources = util.getArg(sourceMap, "sources");
		var names = util.getArg(sourceMap, "names", []);
		var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
		var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
		var mappings = util.getArg(sourceMap, "mappings");
		var file = util.getArg(sourceMap, "file", null);
		if (version != this._version) throw new Error("Unsupported version: " + version);
		if (sourceRoot) sourceRoot = util.normalize(sourceRoot);
		sources = sources.map(String).map(util.normalize).map(function(source) {
			return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
		});
		this._names = ArraySet.fromArray(names.map(String), true);
		this._sources = ArraySet.fromArray(sources, true);
		this._absoluteSources = this._sources.toArray().map(function(s) {
			return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
		});
		this.sourceRoot = sourceRoot;
		this.sourcesContent = sourcesContent;
		this._mappings = mappings;
		this._sourceMapURL = aSourceMapURL;
		this.file = file;
	}
	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
	/**
	* Utility function to find the index of a source.  Returns -1 if not
	* found.
	*/
	BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
		var relativeSource = aSource;
		if (this.sourceRoot != null) relativeSource = util.relative(this.sourceRoot, relativeSource);
		if (this._sources.has(relativeSource)) return this._sources.indexOf(relativeSource);
		var i = 0;
		for (; i < this._absoluteSources.length; ++i) if (this._absoluteSources[i] == aSource) return i;
		return -1;
	};
	/**
	* Create a BasicSourceMapConsumer from a SourceMapGenerator.
	*
	* @param SourceMapGenerator aSourceMap
	*        The source map that will be consumed.
	* @param String aSourceMapURL
	*        The URL at which the source map can be found (optional)
	* @returns BasicSourceMapConsumer
	*/
	BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
		var smc = Object.create(BasicSourceMapConsumer.prototype);
		var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
		var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
		smc.sourceRoot = aSourceMap._sourceRoot;
		smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
		smc.file = aSourceMap._file;
		smc._sourceMapURL = aSourceMapURL;
		smc._absoluteSources = smc._sources.toArray().map(function(s) {
			return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
		});
		var generatedMappings = aSourceMap._mappings.toArray().slice();
		var destGeneratedMappings = smc.__generatedMappings = [];
		var destOriginalMappings = smc.__originalMappings = [];
		for (var i = 0, length = generatedMappings.length; i < length; i++) {
			var srcMapping = generatedMappings[i];
			var destMapping = new Mapping();
			destMapping.generatedLine = srcMapping.generatedLine;
			destMapping.generatedColumn = srcMapping.generatedColumn;
			if (srcMapping.source) {
				destMapping.source = sources.indexOf(srcMapping.source);
				destMapping.originalLine = srcMapping.originalLine;
				destMapping.originalColumn = srcMapping.originalColumn;
				if (srcMapping.name) destMapping.name = names.indexOf(srcMapping.name);
				destOriginalMappings.push(destMapping);
			}
			destGeneratedMappings.push(destMapping);
		}
		quickSort(smc.__originalMappings, util.compareByOriginalPositions);
		return smc;
	};
	/**
	* The version of the source mapping spec that we are consuming.
	*/
	BasicSourceMapConsumer.prototype._version = 3;
	/**
	* The list of original sources.
	*/
	Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", { get: function() {
		return this._absoluteSources.slice();
	} });
	/**
	* Provide the JIT with a nice shape / hidden class.
	*/
	function Mapping() {
		this.generatedLine = 0;
		this.generatedColumn = 0;
		this.source = null;
		this.originalLine = null;
		this.originalColumn = null;
		this.name = null;
	}
	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	var compareGenerated = util.compareByGeneratedPositionsDeflatedNoLine;
	function sortGenerated(array, start) {
		let l = array.length;
		let n = array.length - start;
		if (n <= 1) return;
		else if (n == 2) {
			let a = array[start];
			let b = array[start + 1];
			if (compareGenerated(a, b) > 0) {
				array[start] = b;
				array[start + 1] = a;
			}
		} else if (n < 20) for (let i = start; i < l; i++) for (let j = i; j > start; j--) {
			let a = array[j - 1];
			let b = array[j];
			if (compareGenerated(a, b) <= 0) break;
			array[j - 1] = b;
			array[j] = a;
		}
		else quickSort(array, compareGenerated, start);
	}
	BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		var generatedLine = 1;
		var previousGeneratedColumn = 0;
		var previousOriginalLine = 0;
		var previousOriginalColumn = 0;
		var previousSource = 0;
		var previousName = 0;
		var length = aStr.length;
		var index = 0;
		var temp = {};
		var originalMappings = [];
		var generatedMappings = [], mapping, segment, end, value;
		let subarrayStart = 0;
		while (index < length) if (aStr.charAt(index) === ";") {
			generatedLine++;
			index++;
			previousGeneratedColumn = 0;
			sortGenerated(generatedMappings, subarrayStart);
			subarrayStart = generatedMappings.length;
		} else if (aStr.charAt(index) === ",") index++;
		else {
			mapping = new Mapping();
			mapping.generatedLine = generatedLine;
			for (end = index; end < length; end++) if (this._charIsMappingSeparator(aStr, end)) break;
			aStr.slice(index, end);
			segment = [];
			while (index < end) {
				base64VLQ.decode(aStr, index, temp);
				value = temp.value;
				index = temp.rest;
				segment.push(value);
			}
			if (segment.length === 2) throw new Error("Found a source, but no line and column");
			if (segment.length === 3) throw new Error("Found a source and line, but no column");
			mapping.generatedColumn = previousGeneratedColumn + segment[0];
			previousGeneratedColumn = mapping.generatedColumn;
			if (segment.length > 1) {
				mapping.source = previousSource + segment[1];
				previousSource += segment[1];
				mapping.originalLine = previousOriginalLine + segment[2];
				previousOriginalLine = mapping.originalLine;
				mapping.originalLine += 1;
				mapping.originalColumn = previousOriginalColumn + segment[3];
				previousOriginalColumn = mapping.originalColumn;
				if (segment.length > 4) {
					mapping.name = previousName + segment[4];
					previousName += segment[4];
				}
			}
			generatedMappings.push(mapping);
			if (typeof mapping.originalLine === "number") {
				let currentSource = mapping.source;
				while (originalMappings.length <= currentSource) originalMappings.push(null);
				if (originalMappings[currentSource] === null) originalMappings[currentSource] = [];
				originalMappings[currentSource].push(mapping);
			}
		}
		sortGenerated(generatedMappings, subarrayStart);
		this.__generatedMappings = generatedMappings;
		for (var i = 0; i < originalMappings.length; i++) if (originalMappings[i] != null) quickSort(originalMappings[i], util.compareByOriginalPositionsNoSource);
		this.__originalMappings = [].concat(...originalMappings);
	};
	/**
	* Find the mapping that best matches the hypothetical "needle" mapping that
	* we are searching for in the given "haystack" of mappings.
	*/
	BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
		if (aNeedle[aLineName] <= 0) throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
		if (aNeedle[aColumnName] < 0) throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
		return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
	};
	/**
	* Compute the last column for each generated mapping. The last column is
	* inclusive.
	*/
	BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
		for (var index = 0; index < this._generatedMappings.length; ++index) {
			var mapping = this._generatedMappings[index];
			if (index + 1 < this._generatedMappings.length) {
				var nextMapping = this._generatedMappings[index + 1];
				if (mapping.generatedLine === nextMapping.generatedLine) {
					mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
					continue;
				}
			}
			mapping.lastGeneratedColumn = Infinity;
		}
	};
	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.  The line number
	*     is 1-based.
	*   - column: The column number in the generated source.  The column
	*     number is 0-based.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.  The
	*     line number is 1-based.
	*   - column: The column number in the original source, or null.  The
	*     column number is 0-based.
	*   - name: The original identifier, or null.
	*/
	BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, "line"),
			generatedColumn: util.getArg(aArgs, "column")
		};
		var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
		if (index >= 0) {
			var mapping = this._generatedMappings[index];
			if (mapping.generatedLine === needle.generatedLine) {
				var source = util.getArg(mapping, "source", null);
				if (source !== null) {
					source = this._sources.at(source);
					source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
				}
				var name = util.getArg(mapping, "name", null);
				if (name !== null) name = this._names.at(name);
				return {
					source,
					line: util.getArg(mapping, "originalLine", null),
					column: util.getArg(mapping, "originalColumn", null),
					name
				};
			}
		}
		return {
			source: null,
			line: null,
			column: null,
			name: null
		};
	};
	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
		if (!this.sourcesContent) return false;
		return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
			return sc == null;
		});
	};
	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		if (!this.sourcesContent) return null;
		var index = this._findSourceIndex(aSource);
		if (index >= 0) return this.sourcesContent[index];
		var relativeSource = aSource;
		if (this.sourceRoot != null) relativeSource = util.relative(this.sourceRoot, relativeSource);
		var url;
		if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
			var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
			if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
			if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
		}
		if (nullOnMissing) return null;
		else throw new Error("\"" + relativeSource + "\" is not in the SourceMap.");
	};
	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.  The line number
	*     is 1-based.
	*   - column: The column number in the original source.  The column
	*     number is 0-based.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.  The
	*     line number is 1-based.
	*   - column: The column number in the generated source, or null.
	*     The column number is 0-based.
	*/
	BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
		var source = util.getArg(aArgs, "source");
		source = this._findSourceIndex(source);
		if (source < 0) return {
			line: null,
			column: null,
			lastColumn: null
		};
		var needle = {
			source,
			originalLine: util.getArg(aArgs, "line"),
			originalColumn: util.getArg(aArgs, "column")
		};
		var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
		if (index >= 0) {
			var mapping = this._originalMappings[index];
			if (mapping.source === needle.source) return {
				line: util.getArg(mapping, "generatedLine", null),
				column: util.getArg(mapping, "generatedColumn", null),
				lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
			};
		}
		return {
			line: null,
			column: null,
			lastColumn: null
		};
	};
	exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
	/**
	* An IndexedSourceMapConsumer instance represents a parsed source map which
	* we can query for information. It differs from BasicSourceMapConsumer in
	* that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	* input.
	*
	* The first parameter is a raw source map (either as a JSON string, or already
	* parsed to an object). According to the spec for indexed source maps, they
	* have the following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - file: Optional. The generated file this source map is associated with.
	*   - sections: A list of section definitions.
	*
	* Each value under the "sections" field has two fields:
	*   - offset: The offset into the original specified at which this section
	*       begins to apply, defined as an object with a "line" and "column"
	*       field.
	*   - map: A source map definition. This source map could also be indexed,
	*       but doesn't have to be.
	*
	* Instead of the "map" field, it's also possible to have a "url" field
	* specifying a URL to retrieve a source map from, but that's currently
	* unsupported.
	*
	* Here's an example source map, taken from the source map spec[0], but
	* modified to omit a section which uses the "url" field.
	*
	*  {
	*    version : 3,
	*    file: "app.js",
	*    sections: [{
	*      offset: {line:100, column:10},
	*      map: {
	*        version : 3,
	*        file: "section.js",
	*        sources: ["foo.js", "bar.js"],
	*        names: ["src", "maps", "are", "fun"],
	*        mappings: "AAAA,E;;ABCDE;"
	*      }
	*    }],
	*  }
	*
	* The second parameter, if given, is a string whose value is the URL
	* at which the source map was found.  This URL is used to compute the
	* sources array.
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	*/
	function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
		var version = util.getArg(sourceMap, "version");
		var sections = util.getArg(sourceMap, "sections");
		if (version != this._version) throw new Error("Unsupported version: " + version);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		var lastOffset = {
			line: -1,
			column: 0
		};
		var maxOffsetLine = 0;
		this._sections = sections.map(function(s) {
			if (s.url) throw new Error("Support for url field in sections not implemented.");
			var offset = util.getArg(s, "offset");
			var offsetLine = util.getArg(offset, "line");
			var offsetColumn = util.getArg(offset, "column");
			if (!isValidOffset(offsetLine) || !isValidOffset(offsetColumn)) throw new Error("Section offset line and column must be non-negative integers.");
			if (offsetLine > MAX_SECTION_OFFSET_LINE) throw new Error("Section offset line must not exceed " + MAX_SECTION_OFFSET_LINE + ".");
			if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) throw new Error("Section offsets must be ordered and non-overlapping.");
			lastOffset = offset;
			var consumer = new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL);
			var totalOffsetLine = offsetLine + (consumer._maxOffsetLine || 0);
			if (totalOffsetLine > MAX_SECTION_OFFSET_LINE) throw new Error("Section offset line must not exceed " + MAX_SECTION_OFFSET_LINE + ", including offsets of nested sections.");
			if (totalOffsetLine > maxOffsetLine) maxOffsetLine = totalOffsetLine;
			return {
				generatedOffset: {
					generatedLine: offsetLine + 1,
					generatedColumn: offsetColumn + 1
				},
				consumer
			};
		});
		this._maxOffsetLine = maxOffsetLine;
	}
	/**
	* Section offsets come from untrusted input and are used as line/column
	* numbers, so only accept non-negative safe integers (rejects NaN, Infinity,
	* strings, fractions, etc).
	*/
	function isValidOffset(aValue) {
		return typeof aValue === "number" && aValue >= 0 && aValue <= 9007199254740991 && Math.floor(aValue) === aValue;
	}
	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
	/**
	* The version of the source mapping spec that we are consuming.
	*/
	IndexedSourceMapConsumer.prototype._version = 3;
	/**
	* The list of original sources.
	*/
	Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", { get: function() {
		var sources = [];
		for (var i = 0; i < this._sections.length; i++) {
			var sectionSources = this._sections[i].consumer.sources;
			for (var j = 0; j < sectionSources.length; j++) sources.push(sectionSources[j]);
		}
		return sources;
	} });
	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.  The line number
	*     is 1-based.
	*   - column: The column number in the generated source.  The column
	*     number is 0-based.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.  The
	*     line number is 1-based.
	*   - column: The column number in the original source, or null.  The
	*     column number is 0-based.
	*   - name: The original identifier, or null.
	*/
	IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, "line"),
			generatedColumn: util.getArg(aArgs, "column")
		};
		var sectionIndex = binarySearch.search(needle, this._sections, function(needle, section) {
			var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
			if (cmp) return cmp;
			return needle.generatedColumn - section.generatedOffset.generatedColumn;
		});
		var section = this._sections[sectionIndex];
		if (!section) return {
			source: null,
			line: null,
			column: null,
			name: null
		};
		return section.consumer.originalPositionFor({
			line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
			column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
			bias: aArgs.bias
		});
	};
	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
		return this._sections.every(function(s) {
			return s.consumer.hasContentsOfAllSources();
		});
	};
	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		for (var i = 0; i < this._sections.length; i++) {
			var content = this._sections[i].consumer.sourceContentFor(aSource, true);
			if (content || content === "") return content;
		}
		if (nullOnMissing) return null;
		else throw new Error("\"" + aSource + "\" is not in the SourceMap.");
	};
	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.  The line number
	*     is 1-based.
	*   - column: The column number in the original source.  The column
	*     number is 0-based.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.  The
	*     line number is 1-based. 
	*   - column: The column number in the generated source, or null.
	*     The column number is 0-based.
	*/
	IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) continue;
			var generatedPosition = section.consumer.generatedPositionFor(aArgs);
			if (generatedPosition) return {
				line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
				column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
			};
		}
		return {
			line: null,
			column: null
		};
	};
	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		this.__generatedMappings = [];
		this.__originalMappings = [];
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			var sectionMappings = section.consumer._generatedMappings;
			for (var j = 0; j < sectionMappings.length; j++) {
				var mapping = sectionMappings[j];
				var source = section.consumer._sources.at(mapping.source);
				if (source !== null) source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
				this._sources.add(source);
				source = this._sources.indexOf(source);
				var name = null;
				if (mapping.name) {
					name = section.consumer._names.at(mapping.name);
					this._names.add(name);
					name = this._names.indexOf(name);
				}
				var adjustedMapping = {
					source,
					generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
					generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
					originalLine: mapping.originalLine,
					originalColumn: mapping.originalColumn,
					name
				};
				this.__generatedMappings.push(adjustedMapping);
				if (typeof adjustedMapping.originalLine === "number") this.__originalMappings.push(adjustedMapping);
			}
		}
		quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
		quickSort(this.__originalMappings, util.compareByOriginalPositions);
	};
	exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
}));
//#endregion
//#region node_modules/source-map-js/lib/source-node.js
var require_source_node = /* @__PURE__ */ __commonJSMin(((exports) => {
	var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
	var util = require_util();
	var REGEX_NEWLINE = /(\r?\n)/;
	var NEWLINE_CODE = 10;
	var isSourceNode = "$$$isSourceNode$$$";
	/**
	* SourceNodes provide a way to abstract over interpolating/concatenating
	* snippets of generated JavaScript source code while maintaining the line and
	* column information associated with the original source code.
	*
	* @param aLine The original line number.
	* @param aColumn The original column number.
	* @param aSource The original source's filename.
	* @param aChunks Optional. An array of strings which are snippets of
	*        generated JS, or other SourceNodes.
	* @param aName The original identifier.
	*/
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
		this.children = [];
		this.sourceContents = {};
		this.line = aLine == null ? null : aLine;
		this.column = aColumn == null ? null : aColumn;
		this.source = aSource == null ? null : aSource;
		this.name = aName == null ? null : aName;
		this[isSourceNode] = true;
		if (aChunks != null) this.add(aChunks);
	}
	/**
	* Creates a SourceNode from generated code and a SourceMapConsumer.
	*
	* @param aGeneratedCode The generated code
	* @param aSourceMapConsumer The SourceMap for the generated code
	* @param aRelativePath Optional. The path that relative sources in the
	*        SourceMapConsumer should be relative to.
	*/
	SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
		var node = new SourceNode();
		var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
		var remainingLinesIndex = 0;
		var shiftNextLine = function() {
			return getNextLine() + (getNextLine() || "");
			function getNextLine() {
				return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
			}
		};
		var lastGeneratedLine = 1, lastGeneratedColumn = 0;
		var lastMapping = null;
		aSourceMapConsumer.eachMapping(function(mapping) {
			if (lastMapping !== null) {
				if (lastGeneratedLine < mapping.generatedLine) {
					addMappingWithCode(lastMapping, shiftNextLine());
					lastGeneratedLine++;
					lastGeneratedColumn = 0;
				} else {
					var nextLine = remainingLines[remainingLinesIndex] || "";
					var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
					remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
					lastGeneratedColumn = mapping.generatedColumn;
					addMappingWithCode(lastMapping, code);
					lastMapping = mapping;
					return;
				}
			}
			while (lastGeneratedLine < mapping.generatedLine) {
				if (remainingLinesIndex >= remainingLines.length) {
					lastGeneratedLine = mapping.generatedLine;
					break;
				}
				node.add(shiftNextLine());
				lastGeneratedLine++;
			}
			if (lastGeneratedColumn < mapping.generatedColumn) {
				var nextLine = remainingLines[remainingLinesIndex] || "";
				node.add(nextLine.substr(0, mapping.generatedColumn));
				remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
				lastGeneratedColumn = mapping.generatedColumn;
			}
			lastMapping = mapping;
		}, this);
		if (remainingLinesIndex < remainingLines.length) {
			if (lastMapping) addMappingWithCode(lastMapping, shiftNextLine());
			node.add(remainingLines.splice(remainingLinesIndex).join(""));
		}
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
				if (aRelativePath != null) sourceFile = util.join(aRelativePath, sourceFile);
				node.setSourceContent(sourceFile, content);
			}
		});
		return node;
		function addMappingWithCode(mapping, code) {
			if (mapping === null || mapping.source === void 0) node.add(code);
			else {
				var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
				node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
			}
		}
	};
	/**
	* Add a chunk of generated JS to this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
		if (Array.isArray(aChunk)) aChunk.forEach(function(chunk) {
			this.add(chunk);
		}, this);
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
			if (aChunk) this.children.push(aChunk);
		} else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
		return this;
	};
	/**
	* Add a chunk of generated JS to the beginning of this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
		if (Array.isArray(aChunk)) for (var i = aChunk.length - 1; i >= 0; i--) this.prepend(aChunk[i]);
		else if (aChunk[isSourceNode] || typeof aChunk === "string") this.children.unshift(aChunk);
		else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
		return this;
	};
	/**
	* Walk over the tree of JS snippets in this node and its children. The
	* walking function is called once for each snippet of JS and is passed that
	* snippet and the its original associated source's line/column location.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
		var chunk;
		for (var i = 0, len = this.children.length; i < len; i++) {
			chunk = this.children[i];
			if (chunk[isSourceNode]) chunk.walk(aFn);
			else if (chunk !== "") aFn(chunk, {
				source: this.source,
				line: this.line,
				column: this.column,
				name: this.name
			});
		}
	};
	/**
	* Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	* each of `this.children`.
	*
	* @param aSep The separator.
	*/
	SourceNode.prototype.join = function SourceNode_join(aSep) {
		var newChildren;
		var i;
		var len = this.children.length;
		if (len > 0) {
			newChildren = [];
			for (i = 0; i < len - 1; i++) {
				newChildren.push(this.children[i]);
				newChildren.push(aSep);
			}
			newChildren.push(this.children[i]);
			this.children = newChildren;
		}
		return this;
	};
	/**
	* Call String.prototype.replace on the very right-most source snippet. Useful
	* for trimming whitespace from the end of a source node, etc.
	*
	* @param aPattern The pattern to replace.
	* @param aReplacement The thing to replace the pattern with.
	*/
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
		var lastChild = this.children[this.children.length - 1];
		if (lastChild[isSourceNode]) lastChild.replaceRight(aPattern, aReplacement);
		else if (typeof lastChild === "string") this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
		else this.children.push("".replace(aPattern, aReplacement));
		return this;
	};
	/**
	* Set the source content for a source file. This will be added to the SourceMapGenerator
	* in the sourcesContent field.
	*
	* @param aSourceFile The filename of the source file
	* @param aSourceContent The content of the source file
	*/
	SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
		this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
	};
	/**
	* Walk over the tree of SourceNodes. The walking function is called for each
	* source file content and is passed the filename and source content.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
		for (var i = 0, len = this.children.length; i < len; i++) if (this.children[i][isSourceNode]) this.children[i].walkSourceContents(aFn);
		var sources = Object.keys(this.sourceContents);
		for (var i = 0, len = sources.length; i < len; i++) aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	};
	/**
	* Return the string representation of this source node. Walks over the tree
	* and concatenates all the various snippets together to one string.
	*/
	SourceNode.prototype.toString = function SourceNode_toString() {
		var str = "";
		this.walk(function(chunk) {
			str += chunk;
		});
		return str;
	};
	/**
	* Returns the string representation of this source node along with a source
	* map.
	*/
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
		var generated = {
			code: "",
			line: 1,
			column: 0
		};
		var map = new SourceMapGenerator(aArgs);
		var sourceMappingActive = false;
		var lastOriginalSource = null;
		var lastOriginalLine = null;
		var lastOriginalColumn = null;
		var lastOriginalName = null;
		this.walk(function(chunk, original) {
			generated.code += chunk;
			if (original.source !== null && original.line !== null && original.column !== null) {
				if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) map.addMapping({
					source: original.source,
					original: {
						line: original.line,
						column: original.column
					},
					generated: {
						line: generated.line,
						column: generated.column
					},
					name: original.name
				});
				lastOriginalSource = original.source;
				lastOriginalLine = original.line;
				lastOriginalColumn = original.column;
				lastOriginalName = original.name;
				sourceMappingActive = true;
			} else if (sourceMappingActive) {
				map.addMapping({ generated: {
					line: generated.line,
					column: generated.column
				} });
				lastOriginalSource = null;
				sourceMappingActive = false;
			}
			for (var idx = 0, length = chunk.length; idx < length; idx++) if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
				generated.line++;
				generated.column = 0;
				if (idx + 1 === length) {
					lastOriginalSource = null;
					sourceMappingActive = false;
				} else if (sourceMappingActive) map.addMapping({
					source: original.source,
					original: {
						line: original.line,
						column: original.column
					},
					generated: {
						line: generated.line,
						column: generated.column
					},
					name: original.name
				});
			} else generated.column++;
		});
		this.walkSourceContents(function(sourceFile, sourceContent) {
			map.setSourceContent(sourceFile, sourceContent);
		});
		return {
			code: generated.code,
			map
		};
	};
	exports.SourceNode = SourceNode;
}));
//#endregion
//#region node_modules/source-map-js/source-map.js
var require_source_map = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
	exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
	exports.SourceNode = require_source_node().SourceNode;
}));
//#endregion
//#region node_modules/postcss/lib/previous-map.js
var require_previous_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { existsSync, readFileSync, realpathSync } = __require("fs");
	var { dirname: dirname$2, isAbsolute: isAbsolute$2, join: join$1, relative: relative$2, sep: sep$1 } = __require("path");
	var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
	function realPath(path) {
		try {
			return realpathSync(path);
		} catch {
			return path;
		}
	}
	function fromBase64(str) {
		if (Buffer) return Buffer.from(str, "base64").toString();
		else
 /* c8 ignore next 2 */
		return window.atob(str);
	}
	var PreviousMap = class {
		constructor(css, opts) {
			if (opts.map === false) return;
			if (opts.unsafeMap) this.unsafeMap = true;
			this.loadAnnotation(css);
			this.inline = this.startWith(this.annotation, "data:");
			let prev = opts.map ? opts.map.prev : void 0;
			let text = this.loadMap(opts.from, prev);
			if (!this.mapFile && opts.from) this.mapFile = opts.from;
			if (this.mapFile) this.root = dirname$2(this.mapFile);
			if (text) this.text = text;
		}
		consumer() {
			if (!this.consumerCache) this.consumerCache = new SourceMapConsumer(this.json || this.text);
			return this.consumerCache;
		}
		decodeInline(text) {
			let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
			let baseUri = /^data:application\/json;base64,/;
			let uriMatch = text.match(/^data:application\/json;charset=utf-?8,/) || text.match(/^data:application\/json,/);
			if (uriMatch) return decodeURIComponent(text.substr(uriMatch[0].length));
			let baseUriMatch = text.match(baseCharsetUri) || text.match(baseUri);
			if (baseUriMatch) return fromBase64(text.substr(baseUriMatch[0].length));
			let encoding = text.slice(22);
			encoding = encoding.slice(0, encoding.indexOf(","));
			throw new Error("Unsupported source map encoding " + encoding);
		}
		getAnnotationURL(sourceMapString) {
			return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
		}
		isMap(map) {
			if (typeof map !== "object") return false;
			return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
		}
		loadAnnotation(css) {
			let comments = css.match(/\/\*\s*# sourceMappingURL=/g);
			if (!comments) return;
			let start = css.lastIndexOf(comments.pop());
			let end = css.indexOf("*/", start);
			if (start > -1 && end > -1) this.annotation = this.getAnnotationURL(css.substring(start, end));
		}
		loadFile(path, cssFile, trusted) {
			if (!trusted && !this.unsafeMap) {
				if (!/\.map$/i.test(path)) return void 0;
				if (!cssFile) return void 0;
				let rel = relative$2(realPath(dirname$2(cssFile)), realPath(path));
				if (rel === ".." || rel.startsWith(".." + sep$1) || isAbsolute$2(rel)) return;
			}
			this.root = dirname$2(path);
			if (existsSync(path)) {
				this.mapFile = path;
				return readFileSync(path, "utf-8").toString().trim();
			}
		}
		loadMap(file, prev) {
			if (prev === false) return false;
			if (prev) {
				if (typeof prev === "string") return prev;
				else if (typeof prev === "function") {
					let prevPath = prev(file);
					if (prevPath) {
						let map = this.loadFile(prevPath, file, true);
						if (!map) throw new Error("Unable to load previous source map: " + prevPath.toString());
						return map;
					}
				} else if (prev instanceof SourceMapConsumer) return SourceMapGenerator.fromSourceMap(prev).toString();
				else if (prev instanceof SourceMapGenerator) return prev.toString();
				else if (this.isMap(prev)) return JSON.stringify(prev);
				else throw new Error("Unsupported previous source map format: " + prev.toString());
			} else if (this.inline) return this.decodeInline(this.annotation);
			else if (this.annotation) {
				let map = this.annotation;
				if (file) map = join$1(dirname$2(file), map);
				let unknown = this.loadFile(map, file, false);
				if (unknown) try {
					/* c8 ignore next 4 */
					this.json = JSON.parse(unknown.replace(/^\)]}'[^\n]*\n/, ""));
				} catch {
					return;
				}
				return unknown;
			}
		}
		startWith(string, start) {
			if (!string) return false;
			return string.substr(0, start.length) === start;
		}
		withContent() {
			return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
		}
	};
	module.exports = PreviousMap;
	PreviousMap.default = PreviousMap;
}));
//#endregion
//#region node_modules/postcss/lib/input.js
var require_input = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { nanoid } = require_non_secure();
	var { isAbsolute: isAbsolute$1, resolve: resolve$2 } = __require("path");
	var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
	var { fileURLToPath: fileURLToPath$1, pathToFileURL: pathToFileURL$1 } = __require("url");
	var CssSyntaxError = require_css_syntax_error();
	var PreviousMap = require_previous_map();
	var terminalHighlight = require_terminal_highlight();
	var lineToIndexCache = Symbol("lineToIndexCache");
	var sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
	var pathAvailable = Boolean(resolve$2 && isAbsolute$1);
	function getLineToIndex(input) {
		if (input[lineToIndexCache]) return input[lineToIndexCache];
		let lines = input.css.split("\n");
		let lineToIndex = new Array(lines.length);
		let prevIndex = 0;
		for (let i = 0, l = lines.length; i < l; i++) {
			lineToIndex[i] = prevIndex;
			prevIndex += lines[i].length + 1;
		}
		input[lineToIndexCache] = lineToIndex;
		return lineToIndex;
	}
	var Input = class {
		get from() {
			return this.file || this.id;
		}
		constructor(css, opts = {}) {
			if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) throw new Error(`PostCSS received ${css} instead of CSS string`);
			this.css = css.toString();
			if (this.css[0] === "﻿" || this.css[0] === "￾") {
				this.hasBOM = true;
				this.css = this.css.slice(1);
			} else this.hasBOM = false;
			this.document = this.css;
			if (opts.document) this.document = opts.document.toString();
			if (opts.from) {
				if (!pathAvailable || /^\w+:\/\//.test(opts.from) || isAbsolute$1(opts.from)) this.file = opts.from;
				else this.file = resolve$2(opts.from);
			}
			if (pathAvailable && sourceMapAvailable) {
				let map = new PreviousMap(this.css, opts);
				if (map.text) {
					this.map = map;
					let file = map.consumer().file;
					if (!this.file && file) this.file = this.mapResolve(file);
				}
			}
			if (!this.file) this.id = "<input css " + nanoid(6) + ">";
			if (this.map) this.map.file = this.from;
		}
		error(message, line, column, opts = {}) {
			let endColumn, endLine, endOffset, offset, result;
			if (line && typeof line === "object") {
				let start = line;
				let end = column;
				if (typeof start.offset === "number") {
					offset = start.offset;
					let pos = this.fromOffset(offset);
					line = pos.line;
					column = pos.col;
				} else {
					line = start.line;
					column = start.column;
					offset = this.fromLineAndColumn(line, column);
				}
				if (typeof end.offset === "number") {
					endOffset = end.offset;
					let pos = this.fromOffset(endOffset);
					endLine = pos.line;
					endColumn = pos.col;
				} else {
					endLine = end.line;
					endColumn = end.column;
					endOffset = this.fromLineAndColumn(end.line, end.column);
				}
			} else if (!column) {
				offset = line;
				let pos = this.fromOffset(offset);
				line = pos.line;
				column = pos.col;
			} else offset = this.fromLineAndColumn(line, column);
			let origin = this.origin(line, column, endLine, endColumn);
			if (origin) result = new CssSyntaxError(message, origin.endLine === void 0 ? origin.line : {
				column: origin.column,
				line: origin.line
			}, origin.endLine === void 0 ? origin.column : {
				column: origin.endColumn,
				line: origin.endLine
			}, origin.source, origin.file, opts.plugin);
			else result = new CssSyntaxError(message, endLine === void 0 ? line : {
				column,
				line
			}, endLine === void 0 ? column : {
				column: endColumn,
				line: endLine
			}, this.css, this.file, opts.plugin);
			result.input = {
				column,
				endColumn,
				endLine,
				endOffset,
				line,
				offset,
				source: this.css
			};
			if (this.file) {
				if (pathToFileURL$1) result.input.url = pathToFileURL$1(this.file).toString();
				result.input.file = this.file;
			}
			return result;
		}
		fromLineAndColumn(line, column) {
			return getLineToIndex(this)[line - 1] + column - 1;
		}
		fromOffset(offset) {
			let lineToIndex = getLineToIndex(this);
			let lastLine = lineToIndex[lineToIndex.length - 1];
			let min = 0;
			if (offset >= lastLine) min = lineToIndex.length - 1;
			else {
				let max = lineToIndex.length - 2;
				let mid;
				while (min < max) {
					mid = min + (max - min >> 1);
					if (offset < lineToIndex[mid]) max = mid - 1;
					else if (offset >= lineToIndex[mid + 1]) min = mid + 1;
					else {
						min = mid;
						break;
					}
				}
			}
			return {
				col: offset - lineToIndex[min] + 1,
				line: min + 1
			};
		}
		mapResolve(file) {
			if (/^\w+:\/\//.test(file)) return file;
			return resolve$2(this.map.consumer().sourceRoot || this.map.root || ".", file);
		}
		origin(line, column, endLine, endColumn) {
			if (!this.map) return false;
			let consumer = this.map.consumer();
			let from = consumer.originalPositionFor({
				column: column - 1,
				line
			});
			if (!from.source) return false;
			let to;
			if (typeof endLine === "number") {
				let toPosition = consumer.originalPositionFor({
					column: endColumn - 1,
					line: endLine
				});
				if (toPosition.source) to = toPosition;
			}
			let fromUrl;
			if (isAbsolute$1(from.source)) fromUrl = pathToFileURL$1(from.source);
			else fromUrl = new URL(from.source, this.map.consumer().sourceRoot || pathToFileURL$1(this.map.mapFile));
			let result = {
				column: from.column + 1,
				endColumn: to && to.column + 1,
				endLine: to && to.line,
				line: from.line,
				url: fromUrl.toString()
			};
			if (fromUrl.protocol === "file:") {
				if (fileURLToPath$1) result.file = fileURLToPath$1(fromUrl);
				else
 /* c8 ignore next 2 */
				throw new Error(`file: protocol is not available in this PostCSS build`);
			}
			let source = consumer.sourceContentFor(from.source);
			if (source) result.source = source;
			return result;
		}
		toJSON() {
			let json = {};
			for (let name of [
				"hasBOM",
				"css",
				"file",
				"id"
			]) if (this[name] != null) json[name] = this[name];
			if (this.map) {
				json.map = { ...this.map };
				if (json.map.consumerCache) json.map.consumerCache = void 0;
			}
			return json;
		}
	};
	module.exports = Input;
	Input.default = Input;
	if (terminalHighlight && terminalHighlight.registerInput) terminalHighlight.registerInput(Input);
}));
//#endregion
//#region node_modules/postcss/lib/root.js
var require_root = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Container = require_container();
	var LazyResult;
	var Processor;
	var Root = class extends Container {
		constructor(defaults) {
			super(defaults);
			this.type = "root";
			if (!this.nodes) this.nodes = [];
		}
		normalize(child, sample, type) {
			let keepBefore = /* @__PURE__ */ new Set();
			for (let node of Array.isArray(child) ? child : [child]) if (node && typeof node === "object" && !node.parent && node.raws && typeof node.raws.before !== "undefined") keepBefore.add(node.raws);
			let nodes = super.normalize(child);
			if (sample) {
				if (type === "prepend") {
					if (this.nodes.length > 1) sample.raws.before = this.nodes[1].raws.before;
					else delete sample.raws.before;
				} else if (this.first !== sample) {
					for (let node of nodes) if (!keepBefore.has(node.raws)) node.raws.before = sample.raws.before;
				}
			}
			return nodes;
		}
		removeChild(child, ignore) {
			let index = this.index(child);
			if (!ignore && index === 0 && this.nodes.length > 1) this.nodes[1].raws.before = this.nodes[index].raws.before;
			return super.removeChild(child);
		}
		toResult(opts = {}) {
			return new LazyResult(new Processor(), this, opts).stringify();
		}
	};
	Root.registerLazyResult = (dependant) => {
		LazyResult = dependant;
	};
	Root.registerProcessor = (dependant) => {
		Processor = dependant;
	};
	module.exports = Root;
	Root.default = Root;
	Container.registerRoot(Root);
}));
//#endregion
//#region node_modules/postcss/lib/list.js
var require_list = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var list = {
		comma(string) {
			return list.split(string, [","], true);
		},
		space(string) {
			return list.split(string, [
				" ",
				"\n",
				"	"
			]);
		},
		split(string, separators, last) {
			if (typeof string !== "string") return [];
			let array = [];
			let current = "";
			let split = false;
			let func = 0;
			let inQuote = false;
			let prevQuote = "";
			let escape = false;
			let inComment = false;
			for (let i = 0; i < string.length; i++) {
				let letter = string[i];
				if (inComment) {
					current += letter;
					if (letter === "*" && string[i + 1] === "/") {
						current += "/";
						i += 1;
						inComment = false;
					}
					continue;
				}
				if (escape) escape = false;
				else if (letter === "\\") escape = true;
				else if (inQuote) {
					if (letter === prevQuote) inQuote = false;
				} else if (letter === "\"" || letter === "'") {
					inQuote = true;
					prevQuote = letter;
				} else if (letter === "/" && string[i + 1] === "*") {
					current += "/*";
					i += 1;
					inComment = true;
					continue;
				} else if (letter === "(") func += 1;
				else if (letter === ")") {
					if (func > 0) func -= 1;
				} else if (func === 0) {
					if (separators.includes(letter)) split = true;
				}
				if (split) {
					let value = current.trim();
					if (last || value !== "") array.push(value);
					current = "";
					split = false;
				} else current += letter;
			}
			let value = current.trim();
			if (last || value !== "") array.push(value);
			return array;
		}
	};
	module.exports = list;
	list.default = list;
}));
//#endregion
//#region node_modules/postcss/lib/rule.js
var require_rule = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Container = require_container();
	var list = require_list();
	var Rule = class extends Container {
		get selectors() {
			return list.comma(this.selector);
		}
		set selectors(values) {
			let match = this.selector ? this.selector.match(/,\s*/) : null;
			let sep = match ? match[0] : "," + this.raw("between", "beforeOpen");
			this.selector = values.join(sep);
		}
		constructor(defaults) {
			super(defaults);
			this.type = "rule";
			if (!this.nodes) this.nodes = [];
		}
	};
	module.exports = Rule;
	Rule.default = Rule;
	Container.registerRule(Rule);
}));
//#endregion
//#region node_modules/postcss/lib/fromJSON.js
var require_fromJSON = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var AtRule = require_at_rule();
	var Comment = require_comment();
	var Declaration = require_declaration();
	var Input = require_input();
	var PreviousMap = require_previous_map();
	var Root = require_root();
	var Rule = require_rule();
	function hydrateInputs(json, inputs) {
		if (!json.inputs) return inputs;
		return json.inputs.map((input) => {
			let inputHydrated = {
				...input,
				__proto__: Input.prototype
			};
			if (inputHydrated.map) inputHydrated.map = {
				...inputHydrated.map,
				__proto__: PreviousMap.prototype
			};
			return inputHydrated;
		});
	}
	function constructNode(json, inputs, children) {
		let defaults = { ...json };
		delete defaults.inputs;
		delete defaults.nodes;
		if (defaults.source) {
			let { inputId, ...source } = defaults.source;
			defaults.source = source;
			if (inputId != null) defaults.source.input = inputs[inputId];
		}
		let node;
		if (defaults.type === "root") node = new Root(defaults);
		else if (defaults.type === "decl") node = new Declaration(defaults);
		else if (defaults.type === "rule") node = new Rule(defaults);
		else if (defaults.type === "comment") node = new Comment(defaults);
		else if (defaults.type === "atrule") node = new AtRule(defaults);
		else throw new Error("Unknown node type: " + json.type);
		if (children) {
			node.nodes = children;
			for (let child of children) child.parent = node;
		}
		return node;
	}
	function fromJSON(json, inputs) {
		if (Array.isArray(json)) return json.map((n) => fromJSON(n));
		let result;
		let stack = [{
			childIndex: 0,
			children: [],
			inputs: hydrateInputs(json, inputs),
			json
		}];
		while (stack.length > 0) {
			let frame = stack[stack.length - 1];
			let jsonNodes = frame.json.nodes;
			if (jsonNodes && frame.childIndex < jsonNodes.length) {
				let childJson = jsonNodes[frame.childIndex];
				frame.childIndex += 1;
				stack.push({
					childIndex: 0,
					children: [],
					inputs: hydrateInputs(childJson, frame.inputs),
					json: childJson
				});
				continue;
			}
			stack.pop();
			let node = constructNode(frame.json, frame.inputs, jsonNodes ? frame.children : void 0);
			if (stack.length > 0) stack[stack.length - 1].children.push(node);
			else result = node;
		}
		return result;
	}
	module.exports = fromJSON;
	fromJSON.default = fromJSON;
}));
//#endregion
//#region node_modules/postcss/lib/map-generator.js
var require_map_generator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { dirname: dirname$1, relative: relative$1, resolve: resolve$1, sep } = __require("path");
	var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
	var { pathToFileURL } = __require("url");
	var Input = require_input();
	var sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
	var pathAvailable = Boolean(dirname$1 && resolve$1 && relative$1 && sep);
	var MapGenerator = class {
		constructor(stringify, root, opts, cssString) {
			this.stringify = stringify;
			this.mapOpts = opts.map || {};
			this.root = root;
			this.opts = opts;
			this.css = cssString;
			this.originalCSS = cssString;
			this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
			this.memoizedFileURLs = /* @__PURE__ */ new Map();
			this.memoizedPaths = /* @__PURE__ */ new Map();
			this.memoizedURLs = /* @__PURE__ */ new Map();
		}
		addAnnotation() {
			let content;
			if (this.isInline()) content = "data:application/json;base64," + this.toBase64(this.map.toString());
			else if (typeof this.mapOpts.annotation === "string") content = this.mapOpts.annotation;
			else if (typeof this.mapOpts.annotation === "function") content = this.mapOpts.annotation(this.opts.to, this.root);
			else content = this.outputFile() + ".map";
			let eol = "\n";
			if (this.css.includes("\r\n")) eol = "\r\n";
			this.css += eol + "/*# sourceMappingURL=" + content + " */";
		}
		applyPrevMaps() {
			for (let prev of this.previous()) {
				let from = this.toUrl(this.path(prev.file));
				let root = prev.root || dirname$1(prev.file);
				let map;
				if (this.mapOpts.sourcesContent === false) {
					map = new SourceMapConsumer(prev.text);
					if (map.sourcesContent) map.sourcesContent = null;
				} else map = prev.consumer();
				this.map.applySourceMap(map, from, this.toUrl(this.path(root)));
			}
		}
		clearAnnotation() {
			if (this.mapOpts.annotation === false) return;
			if (this.root) {
				let node;
				for (let i = this.root.nodes.length - 1; i >= 0; i--) {
					node = this.root.nodes[i];
					if (node.type !== "comment") continue;
					if (node.text.startsWith("# sourceMappingURL=")) this.root.removeChild(i);
				}
			} else if (this.css) {
				let annotation = "/*# sourceMappingURL=";
				let css = "";
				let cursor = 0;
				let startIndex;
				while ((startIndex = this.css.indexOf(annotation, cursor)) !== -1) {
					let endIndex = this.css.indexOf("*/", startIndex + 21);
					if (endIndex === -1) break;
					while (startIndex > cursor && this.css[startIndex - 1] === "\n") startIndex--;
					css += this.css.slice(cursor, startIndex);
					cursor = endIndex + 2;
				}
				if (cursor > 0) this.css = css + this.css.slice(cursor);
			}
		}
		generate() {
			this.clearAnnotation();
			if (pathAvailable && sourceMapAvailable && this.isMap()) return this.generateMap();
			else {
				let result = "";
				this.stringify(this.root, (i) => {
					result += i;
				});
				return [result];
			}
		}
		generateMap() {
			if (this.root) this.generateString();
			else if (this.previous().length === 1) {
				let prev = this.previous()[0].consumer();
				prev.file = this.outputFile();
				this.map = SourceMapGenerator.fromSourceMap(prev, { ignoreInvalidMapping: true });
			} else {
				this.map = new SourceMapGenerator({
					file: this.outputFile(),
					ignoreInvalidMapping: true
				});
				this.map.addMapping({
					generated: {
						column: 0,
						line: 1
					},
					original: {
						column: 0,
						line: 1
					},
					source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
				});
			}
			if (this.isSourcesContent()) this.setSourcesContent();
			if (this.root && this.previous().length > 0) this.applyPrevMaps();
			if (this.isAnnotation()) this.addAnnotation();
			if (this.isInline()) return [this.css];
			else return [this.css, this.map];
		}
		generateString() {
			this.css = "";
			this.map = new SourceMapGenerator({
				file: this.outputFile(),
				ignoreInvalidMapping: true
			});
			let line = 1;
			let column = 1;
			let noSource = "<no source>";
			let mapping = {
				generated: {
					column: 0,
					line: 0
				},
				original: {
					column: 0,
					line: 0
				},
				source: ""
			};
			let last, lines;
			this.stringify(this.root, (str, node, type) => {
				this.css += str;
				if (node && type !== "end") {
					mapping.generated.line = line;
					mapping.generated.column = column - 1;
					if (node.source && node.source.start) {
						mapping.source = this.sourcePath(node);
						mapping.original.line = node.source.start.line;
						mapping.original.column = node.source.start.column - 1;
						this.map.addMapping(mapping);
					} else {
						mapping.source = noSource;
						mapping.original.line = 1;
						mapping.original.column = 0;
						this.map.addMapping(mapping);
					}
				}
				lines = str.match(/\n/g);
				if (lines) {
					line += lines.length;
					last = str.lastIndexOf("\n");
					column = str.length - last;
				} else column += str.length;
				if (node && type !== "start") {
					let p = node.parent || { raws: {} };
					if (!(node.type === "decl" || node.type === "atrule" && !node.nodes) || node !== p.last || p.raws.semicolon) {
						if (node.source && node.source.end) {
							mapping.source = this.sourcePath(node);
							mapping.original.line = node.source.end.line;
							mapping.original.column = node.source.end.column - 1;
							mapping.generated.line = line;
							mapping.generated.column = column - 2;
							this.map.addMapping(mapping);
						} else {
							mapping.source = noSource;
							mapping.original.line = 1;
							mapping.original.column = 0;
							mapping.generated.line = line;
							mapping.generated.column = column - 1;
							this.map.addMapping(mapping);
						}
					}
				}
			});
		}
		isAnnotation() {
			if (this.isInline()) return true;
			if (typeof this.mapOpts.annotation !== "undefined") return this.mapOpts.annotation;
			if (this.previous().length) return this.previous().some((i) => i.annotation);
			return true;
		}
		isInline() {
			if (typeof this.mapOpts.inline !== "undefined") return this.mapOpts.inline;
			let annotation = this.mapOpts.annotation;
			if (typeof annotation !== "undefined" && annotation !== true) return false;
			if (this.previous().length) return this.previous().some((i) => i.inline);
			return true;
		}
		isMap() {
			if (typeof this.opts.map !== "undefined") return !!this.opts.map;
			return this.previous().length > 0;
		}
		isSourcesContent() {
			if (typeof this.mapOpts.sourcesContent !== "undefined") return this.mapOpts.sourcesContent;
			if (this.previous().length) return this.previous().some((i) => i.withContent());
			return true;
		}
		outputFile() {
			if (this.opts.to) return this.path(this.opts.to);
			else if (this.opts.from) return this.path(this.opts.from);
			else return "to.css";
		}
		path(file) {
			if (this.mapOpts.absolute) return file;
			if (file.charCodeAt(0) === 60) return file;
			if (/^\w+:\/\//.test(file)) return file;
			let cached = this.memoizedPaths.get(file);
			if (cached) return cached;
			let from = this.opts.to ? dirname$1(this.opts.to) : ".";
			if (typeof this.mapOpts.annotation === "string") from = dirname$1(resolve$1(from, this.mapOpts.annotation));
			let path = relative$1(from, file);
			this.memoizedPaths.set(file, path);
			return path;
		}
		previous() {
			if (!this.previousMaps) {
				this.previousMaps = [];
				if (this.root) this.root.walk((node) => {
					if (node.source && node.source.input.map) {
						let map = node.source.input.map;
						if (!this.previousMaps.includes(map)) this.previousMaps.push(map);
					}
				});
				else {
					let input = new Input(this.originalCSS, this.opts);
					if (input.map) this.previousMaps.push(input.map);
				}
			}
			return this.previousMaps;
		}
		setSourcesContent() {
			let already = {};
			if (this.root) this.root.walk((node) => {
				if (node.source) {
					let from = node.source.input.from;
					if (from && !already[from]) {
						already[from] = true;
						let fromUrl = this.usesFileUrls ? this.toFileUrl(from) : this.toUrl(this.path(from));
						this.map.setSourceContent(fromUrl, node.source.input.css);
					}
				}
			});
			else if (this.css) {
				let from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
				this.map.setSourceContent(from, this.css);
			}
		}
		sourcePath(node) {
			if (this.mapOpts.from) return this.toUrl(this.mapOpts.from);
			else if (this.usesFileUrls) return this.toFileUrl(node.source.input.from);
			else return this.toUrl(this.path(node.source.input.from));
		}
		toBase64(str) {
			if (Buffer) return Buffer.from(str).toString("base64");
			else return window.btoa(unescape(encodeURIComponent(str)));
		}
		toFileUrl(path) {
			let cached = this.memoizedFileURLs.get(path);
			if (cached) return cached;
			if (pathToFileURL) {
				let fileURL = pathToFileURL(path).toString();
				this.memoizedFileURLs.set(path, fileURL);
				return fileURL;
			} else throw new Error("`map.absolute` option is not available in this PostCSS build");
		}
		toUrl(path) {
			let cached = this.memoizedURLs.get(path);
			if (cached) return cached;
			if (sep === "\\") path = path.replace(/\\/g, "/");
			let url = encodeURI(path).replace(/[#?]/g, encodeURIComponent);
			this.memoizedURLs.set(path, url);
			return url;
		}
	};
	module.exports = MapGenerator;
}));
//#endregion
//#region node_modules/postcss/lib/parser.js
var require_parser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var AtRule = require_at_rule();
	var Comment = require_comment();
	var Declaration = require_declaration();
	var Root = require_root();
	var Rule = require_rule();
	var tokenizer = require_tokenize();
	var SAFE_COMMENT_NEIGHBOR = {
		empty: true,
		space: true
	};
	function findLastWithPosition(tokens) {
		for (let i = tokens.length - 1; i >= 0; i--) {
			let token = tokens[i];
			let pos = token[3] || token[2];
			if (pos) return pos;
		}
	}
	function tokensToString(tokens, from, to) {
		let result = "";
		for (let i = from; i < to; i++) result += tokens[i][1];
		return result;
	}
	var Parser = class {
		constructor(input) {
			this.input = input;
			this.root = new Root();
			this.current = this.root;
			this.spaces = "";
			this.semicolon = false;
			this.createTokenizer();
			this.root.source = {
				input,
				start: {
					column: 1,
					line: 1,
					offset: 0
				}
			};
		}
		atrule(token) {
			let node = new AtRule();
			node.name = token[1].slice(1);
			if (node.name === "") this.unnamedAtrule(node, token);
			this.init(node, token[2]);
			let type;
			let prev;
			let shift;
			let last = false;
			let open = false;
			let params = [];
			let brackets = [];
			while (!this.tokenizer.endOfFile()) {
				token = this.tokenizer.nextToken();
				type = token[0];
				if (type === "(" || type === "[") brackets.push(type === "(" ? ")" : "]");
				else if (type === "{" && brackets.length > 0) brackets.push("}");
				else if (type === brackets[brackets.length - 1]) brackets.pop();
				if (brackets.length === 0) {
					if (type === ";") {
						node.source.end = this.getPosition(token[2]);
						node.source.end.offset++;
						this.semicolon = true;
						break;
					} else if (type === "{") {
						open = true;
						break;
					} else if (type === "}") {
						if (params.length > 0) {
							shift = params.length - 1;
							prev = params[shift];
							while (prev && prev[0] === "space") prev = params[--shift];
							if (prev) {
								node.source.end = this.getPosition(prev[3] || prev[2]);
								node.source.end.offset++;
							}
						}
						this.end(token);
						break;
					} else params.push(token);
				} else params.push(token);
				if (this.tokenizer.endOfFile()) {
					last = true;
					break;
				}
			}
			node.raws.between = this.spacesAndCommentsFromEnd(params);
			if (params.length) {
				node.raws.afterName = this.spacesAndCommentsFromStart(params);
				this.raw(node, "params", params);
				if (last) {
					token = params[params.length - 1];
					node.source.end = this.getPosition(token[3] || token[2]);
					node.source.end.offset++;
					this.spaces = node.raws.between;
					node.raws.between = "";
				}
			} else {
				node.raws.afterName = "";
				node.params = "";
			}
			if (open) {
				node.nodes = [];
				this.current = node;
			}
		}
		checkMissedSemicolon(tokens) {
			let colon = this.colon(tokens);
			if (colon === false) return;
			let founded = 0;
			let token;
			for (let j = colon - 1; j >= 0; j--) {
				token = tokens[j];
				if (token[0] !== "space") {
					founded += 1;
					if (founded === 2) break;
				}
			}
			throw this.input.error("Missed semicolon", token[0] === "word" ? token[3] + 1 : token[2]);
		}
		colon(tokens) {
			let brackets = 0;
			let prev, token, type;
			for (let [i, element] of tokens.entries()) {
				token = element;
				type = token[0];
				if (type === "(") brackets += 1;
				if (type === ")") brackets -= 1;
				if (brackets === 0 && type === ":") {
					if (!prev) this.doubleColon(token);
					else if (prev[0] === "word" && prev[1] === "progid") continue;
					else return i;
				}
				prev = token;
			}
			return false;
		}
		comment(token) {
			let node = new Comment();
			this.init(node, token[2]);
			node.source.end = this.getPosition(token[3] || token[2]);
			node.source.end.offset++;
			let text = token[1].slice(2, -2);
			if (!text.trim()) {
				node.text = "";
				node.raws.left = text;
				node.raws.right = "";
			} else {
				let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
				node.text = match[2];
				node.raws.left = match[1];
				node.raws.right = match[3];
			}
		}
		createTokenizer() {
			this.tokenizer = tokenizer(this.input);
		}
		decl(tokens, customProperty) {
			let node = new Declaration();
			this.init(node, tokens[0][2]);
			let last = tokens[tokens.length - 1];
			if (last[0] === ";") {
				this.semicolon = true;
				tokens.pop();
			}
			node.source.end = this.getPosition(last[3] || last[2] || findLastWithPosition(tokens));
			node.source.end.offset++;
			let start = 0;
			while (tokens[start][0] !== "word") {
				if (start === tokens.length - 1) this.unknownWord([tokens[start]]);
				start++;
			}
			node.raws.before += tokensToString(tokens, 0, start);
			node.source.start = this.getPosition(tokens[start][2]);
			let propStart = start;
			while (start < tokens.length) {
				let type = tokens[start][0];
				if (type === ":" || type === "space" || type === "comment") break;
				start++;
			}
			node.prop = tokensToString(tokens, propStart, start);
			let betweenStart = start;
			let token;
			while (start < tokens.length) {
				token = tokens[start];
				start++;
				if (token[0] === ":") break;
				if (token[0] === "word" && /\w/.test(token[1])) this.unknownWord([token]);
			}
			node.raws.between = tokensToString(tokens, betweenStart, start);
			if (node.prop[0] === "_" || node.prop[0] === "*") {
				node.raws.before += node.prop[0];
				node.prop = node.prop.slice(1);
			}
			let firstSpacesStart = start;
			while (start < tokens.length) {
				let next = tokens[start][0];
				if (next !== "space" && next !== "comment") break;
				start++;
			}
			let firstSpaces = tokens.slice(firstSpacesStart, start);
			tokens = tokens.slice(start);
			this.precheckMissedSemicolon(tokens);
			for (let i = tokens.length - 1; i >= 0; i--) {
				token = tokens[i];
				if (token[1].toLowerCase() === "!important") {
					node.important = true;
					let string = this.stringFrom(tokens, i);
					string = this.spacesFromEnd(tokens) + string;
					if (string !== " !important") node.raws.important = string;
					break;
				} else if (token[1].toLowerCase() === "important") {
					let cache = tokens.slice(0);
					let str = "";
					for (let j = i; j > 0; j--) {
						let type = cache[j][0];
						if (str.trim().startsWith("!") && type !== "space") break;
						str = cache.pop()[1] + str;
					}
					if (str.trim().startsWith("!")) {
						node.important = true;
						node.raws.important = str;
						tokens = cache;
					}
				}
				if (token[0] !== "space" && token[0] !== "comment") break;
			}
			if (tokens.some((i) => i[0] !== "space" && i[0] !== "comment")) {
				node.raws.between += firstSpaces.map((i) => i[1]).join("");
				firstSpaces = [];
			}
			this.raw(node, "value", firstSpaces.concat(tokens), customProperty);
			if (node.value.includes(":") && !customProperty) this.checkMissedSemicolon(tokens);
		}
		doubleColon(token) {
			throw this.input.error("Double colon", { offset: token[2] }, { offset: token[2] + token[1].length });
		}
		emptyRule(token) {
			let node = new Rule();
			this.init(node, token[2]);
			node.selector = "";
			node.raws.between = "";
			this.current = node;
		}
		end(token) {
			if (this.current.nodes && this.current.nodes.length) this.current.raws.semicolon = this.semicolon;
			this.semicolon = false;
			this.current.raws.after = (this.current.raws.after || "") + this.spaces;
			this.spaces = "";
			if (this.current.parent) {
				this.current.source.end = this.getPosition(token[2]);
				this.current.source.end.offset++;
				this.current = this.current.parent;
			} else this.unexpectedClose(token);
		}
		endFile() {
			if (this.current.parent) this.unclosedBlock();
			if (this.current.nodes && this.current.nodes.length) this.current.raws.semicolon = this.semicolon;
			this.current.raws.after = (this.current.raws.after || "") + this.spaces;
			this.root.source.end = this.getPosition(this.tokenizer.position());
		}
		freeSemicolon(token) {
			this.spaces += token[1];
			if (this.current.nodes) {
				let prev = this.current.nodes[this.current.nodes.length - 1];
				if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
					prev.raws.ownSemicolon = this.spaces;
					this.spaces = "";
					prev.source.end = this.getPosition(token[2]);
					prev.source.end.offset++;
				}
			}
		}
		getPosition(offset) {
			let pos = this.input.fromOffset(offset);
			return {
				column: pos.col,
				line: pos.line,
				offset
			};
		}
		init(node, offset) {
			this.current.push(node);
			node.source = {
				input: this.input,
				start: this.getPosition(offset)
			};
			node.raws.before = this.spaces;
			this.spaces = "";
			if (node.type !== "comment") this.semicolon = false;
		}
		other(start) {
			let end = false;
			let type = null;
			let colon = false;
			let bracket = null;
			let brackets = [];
			let customProperty = start[1].startsWith("--");
			let tokens = [];
			let token = start;
			while (token) {
				type = token[0];
				tokens.push(token);
				if (type === "(" || type === "[") {
					if (!bracket) bracket = token;
					brackets.push(type === "(" ? ")" : "]");
				} else if (customProperty && colon && type === "{") {
					if (!bracket) bracket = token;
					brackets.push("}");
				} else if (brackets.length === 0) {
					if (type === ";") {
						if (colon) {
							this.decl(tokens, customProperty);
							return;
						} else break;
					} else if (type === "{") {
						this.rule(tokens);
						return;
					} else if (type === "}") {
						this.tokenizer.back(tokens.pop());
						end = true;
						break;
					} else if (type === ":") colon = true;
				} else if (type === brackets[brackets.length - 1]) {
					brackets.pop();
					if (brackets.length === 0) bracket = null;
				}
				token = this.tokenizer.nextToken();
			}
			if (this.tokenizer.endOfFile()) end = true;
			if (brackets.length > 0) this.unclosedBracket(bracket);
			if (end && colon) {
				if (!customProperty) while (tokens.length) {
					token = tokens[tokens.length - 1][0];
					if (token !== "space" && token !== "comment") break;
					this.tokenizer.back(tokens.pop());
				}
				this.decl(tokens, customProperty);
			} else this.unknownWord(tokens);
		}
		parse() {
			let token;
			while (!this.tokenizer.endOfFile()) {
				token = this.tokenizer.nextToken();
				switch (token[0]) {
					case "space":
						this.spaces += token[1];
						break;
					case ";":
						this.freeSemicolon(token);
						break;
					case "}":
						this.end(token);
						break;
					case "comment":
						this.comment(token);
						break;
					case "at-word":
						this.atrule(token);
						break;
					case "{":
						this.emptyRule(token);
						break;
					default: this.other(token);
				}
			}
			this.endFile();
		}
		precheckMissedSemicolon() {}
		raw(node, prop, tokens, customProperty) {
			let token, type;
			let length = tokens.length;
			let value = "";
			let last = "";
			let clean = true;
			let next, prev;
			for (let i = 0; i < length; i += 1) {
				token = tokens[i];
				type = token[0];
				if (type === "space" && i === length - 1 && !customProperty) clean = false;
				else if (type === "comment") {
					prev = tokens[i - 1] ? tokens[i - 1][0] : "empty";
					next = tokens[i + 1] ? tokens[i + 1][0] : "empty";
					if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
						if (last === ",") clean = false;
						else {
							value += token[1];
							last = token[1].slice(-1);
						}
					} else clean = false;
				} else {
					value += token[1];
					last = token[1].slice(-1);
				}
			}
			if (!clean) {
				let raw = tokens.reduce((all, i) => all + i[1], "");
				node.raws[prop] = {
					raw,
					value
				};
			}
			node[prop] = value;
		}
		rule(tokens) {
			tokens.pop();
			let node = new Rule();
			this.init(node, tokens[0][2]);
			node.raws.between = this.spacesAndCommentsFromEnd(tokens);
			this.raw(node, "selector", tokens);
			this.current = node;
		}
		spacesAndCommentsFromEnd(tokens) {
			let lastTokenType;
			let spaces = "";
			while (tokens.length) {
				lastTokenType = tokens[tokens.length - 1][0];
				if (lastTokenType !== "space" && lastTokenType !== "comment") break;
				spaces = tokens.pop()[1] + spaces;
			}
			return spaces;
		}
		spacesAndCommentsFromStart(tokens) {
			let next;
			let spaces = "";
			while (tokens.length) {
				next = tokens[0][0];
				if (next !== "space" && next !== "comment") break;
				spaces += tokens.shift()[1];
			}
			return spaces;
		}
		spacesFromEnd(tokens) {
			let lastTokenType;
			let spaces = "";
			while (tokens.length) {
				lastTokenType = tokens[tokens.length - 1][0];
				if (lastTokenType !== "space") break;
				spaces = tokens.pop()[1] + spaces;
			}
			return spaces;
		}
		stringFrom(tokens, from) {
			let result = "";
			for (let i = from; i < tokens.length; i++) result += tokens[i][1];
			tokens.splice(from, tokens.length - from);
			return result;
		}
		unclosedBlock() {
			let pos = this.current.source.start;
			throw this.input.error("Unclosed block", pos.line, pos.column);
		}
		unclosedBracket(bracket) {
			throw this.input.error("Unclosed bracket", { offset: bracket[2] }, { offset: bracket[2] + 1 });
		}
		unexpectedClose(token) {
			throw this.input.error("Unexpected }", { offset: token[2] }, { offset: token[2] + 1 });
		}
		unknownWord(tokens) {
			throw this.input.error("Unknown word " + tokens[0][1], { offset: tokens[0][2] }, { offset: tokens[0][2] + tokens[0][1].length });
		}
		unnamedAtrule(node, token) {
			throw this.input.error("At-rule without name", { offset: token[2] }, { offset: token[2] + token[1].length });
		}
	};
	module.exports = Parser;
}));
//#endregion
//#region node_modules/postcss/lib/parse.js
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Container = require_container();
	var Input = require_input();
	var Parser = require_parser();
	function parse(css, opts) {
		let parser = new Parser(new Input(css, opts));
		try {
			parser.parse();
		} catch (e) {
			if (process.env.NODE_ENV !== "production") {
				if (e.name === "CssSyntaxError" && opts && opts.from) {
					if (/\.scss$/i.test(opts.from)) e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser";
					else if (/\.sass/i.test(opts.from)) e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser";
					else if (/\.less$/i.test(opts.from)) e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser";
				}
			}
			throw e;
		}
		return parser.root;
	}
	module.exports = parse;
	parse.default = parse;
	Container.registerParse(parse);
}));
//#endregion
//#region node_modules/postcss/lib/warning.js
var require_warning = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Container = require_container();
	var { my } = require_symbols();
	var Warning = class {
		constructor(text, opts = {}) {
			this.type = "warning";
			this.text = text;
			if (opts.node && opts.node.source) {
				if (!opts.node[my]) Container.rebuild(opts.node);
				let range = opts.node.rangeBy(opts);
				this.line = range.start.line;
				this.column = range.start.column;
				this.endLine = range.end.line;
				this.endColumn = range.end.column;
			}
			for (let opt in opts) this[opt] = opts[opt];
		}
		toString() {
			if (this.node) return this.node.error(this.text, {
				index: this.index,
				plugin: this.plugin,
				word: this.word
			}).message;
			if (this.plugin) return this.plugin + ": " + this.text;
			return this.text;
		}
	};
	module.exports = Warning;
	Warning.default = Warning;
}));
//#endregion
//#region node_modules/postcss/lib/result.js
var require_result = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Warning = require_warning();
	var Result = class {
		get content() {
			return this.css;
		}
		constructor(processor, root, opts) {
			this.processor = processor;
			this.messages = [];
			this.root = root;
			this.opts = opts;
			this.css = "";
			this.map = void 0;
		}
		toString() {
			return this.css;
		}
		warn(text, opts = {}) {
			if (!opts.plugin) {
				if (this.lastPlugin && this.lastPlugin.postcssPlugin) opts.plugin = this.lastPlugin.postcssPlugin;
			}
			let warning = new Warning(text, opts);
			this.messages.push(warning);
			return warning;
		}
		warnings() {
			return this.messages.filter((i) => i.type === "warning");
		}
	};
	module.exports = Result;
	Result.default = Result;
}));
//#endregion
//#region node_modules/postcss/lib/warn-once.js
var require_warn_once = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var printed = {};
	module.exports = function warnOnce(message) {
		if (printed[message]) return;
		printed[message] = true;
		if (typeof console !== "undefined" && console.warn) console.warn(message);
	};
}));
//#endregion
//#region node_modules/postcss/lib/lazy-result.js
var require_lazy_result = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Container = require_container();
	var Document = require_document();
	var MapGenerator = require_map_generator();
	var parse = require_parse();
	var Result = require_result();
	var Root = require_root();
	var stringify = require_stringify();
	var { isClean, my } = require_symbols();
	var warnOnce = require_warn_once();
	var TYPE_TO_CLASS_NAME = {
		atrule: "AtRule",
		comment: "Comment",
		decl: "Declaration",
		document: "Document",
		root: "Root",
		rule: "Rule"
	};
	var PLUGIN_PROPS = {
		AtRule: true,
		AtRuleExit: true,
		Comment: true,
		CommentExit: true,
		Declaration: true,
		DeclarationExit: true,
		Document: true,
		DocumentExit: true,
		Once: true,
		OnceExit: true,
		postcssPlugin: true,
		prepare: true,
		Root: true,
		RootExit: true,
		Rule: true,
		RuleExit: true
	};
	var NOT_VISITORS = {
		Once: true,
		postcssPlugin: true,
		prepare: true
	};
	var CHILDREN = 0;
	function isPromise(obj) {
		return typeof obj === "object" && typeof obj.then === "function";
	}
	function getEvents(node) {
		let key = false;
		let type = TYPE_TO_CLASS_NAME[node.type];
		if (node.type === "decl") key = node.prop.toLowerCase();
		else if (node.type === "atrule") key = node.name.toLowerCase();
		if (key && node.append) return [
			type,
			type + "-" + key,
			CHILDREN,
			type + "Exit",
			type + "Exit-" + key
		];
		else if (key) return [
			type,
			type + "-" + key,
			type + "Exit",
			type + "Exit-" + key
		];
		else if (node.append) return [
			type,
			CHILDREN,
			type + "Exit"
		];
		else return [type, type + "Exit"];
	}
	function toStack(node) {
		let events;
		if (node.type === "document") events = [
			"Document",
			CHILDREN,
			"DocumentExit"
		];
		else if (node.type === "root") events = [
			"Root",
			CHILDREN,
			"RootExit"
		];
		else events = getEvents(node);
		return {
			eventIndex: 0,
			events,
			iterator: 0,
			node,
			visitorIndex: 0,
			visitors: []
		};
	}
	function cleanMarks(node) {
		let stack = [node];
		while (stack.length > 0) {
			let next = stack.pop();
			next[isClean] = false;
			if (next.nodes) for (let i of next.nodes) stack.push(i);
		}
		return node;
	}
	var postcss = {};
	var LazyResult = class LazyResult {
		get content() {
			return this.stringify().content;
		}
		get css() {
			return this.stringify().css;
		}
		get map() {
			return this.stringify().map;
		}
		get messages() {
			return this.sync().messages;
		}
		get opts() {
			return this.result.opts;
		}
		get processor() {
			return this.result.processor;
		}
		get root() {
			return this.sync().root;
		}
		get [Symbol.toStringTag]() {
			return "LazyResult";
		}
		constructor(processor, css, opts) {
			this.stringified = false;
			this.processed = false;
			let root;
			if (typeof css === "object" && css !== null && (css.type === "root" || css.type === "document")) root = cleanMarks(css);
			else if (css instanceof LazyResult || css instanceof Result) {
				root = cleanMarks(css.root);
				if (css.map) {
					if (typeof opts.map === "undefined") opts.map = {};
					if (!opts.map.inline) opts.map.inline = false;
					opts.map.prev = css.map;
				}
			} else {
				let parser = parse;
				if (opts.syntax) parser = opts.syntax.parse;
				if (opts.parser) parser = opts.parser;
				if (parser.parse) parser = parser.parse;
				try {
					root = parser(css, opts);
				} catch (error) {
					this.processed = true;
					this.error = error;
				}
				if (root && !root[my])
 /* c8 ignore next 2 */
				Container.rebuild(root);
			}
			this.result = new Result(processor, root, opts);
			this.helpers = {
				...postcss,
				postcss,
				result: this.result
			};
			this.plugins = this.processor.plugins.map((plugin) => {
				if (typeof plugin === "object" && plugin.prepare) return {
					...plugin,
					...plugin.prepare(this.result)
				};
				else return plugin;
			});
		}
		async() {
			if (this.error) return Promise.reject(this.error);
			if (this.processed) return Promise.resolve(this.result);
			if (!this.processing) this.processing = this.runAsync();
			return this.processing;
		}
		catch(onRejected) {
			return this.async().catch(onRejected);
		}
		finally(onFinally) {
			return this.async().then(onFinally, onFinally);
		}
		getAsyncError() {
			throw new Error("Use process(css).then(cb) to work with async plugins");
		}
		handleError(error, node) {
			let plugin = this.result.lastPlugin;
			try {
				if (node) node.addToError(error);
				this.error = error;
				if (error.name === "CssSyntaxError" && !error.plugin) {
					error.plugin = plugin.postcssPlugin;
					error.setMessage();
				} else if (plugin.postcssVersion) {
					if (process.env.NODE_ENV !== "production") {
						let pluginName = plugin.postcssPlugin;
						let pluginVer = plugin.postcssVersion;
						let runtimeVer = this.result.processor.version;
						let a = pluginVer.split(".");
						let b = runtimeVer.split(".");
						if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) console.error("Unknown error from PostCSS plugin. Your current PostCSS version is " + runtimeVer + ", but " + pluginName + " uses " + pluginVer + ". Perhaps this is the source of the error below.");
					}
				}
			} catch (err) {
				/* c8 ignore next 3 */
				if (console && console.error) console.error(err);
			}
			return error;
		}
		prepareVisitors() {
			this.listeners = {};
			let add = (plugin, type, cb) => {
				if (!this.listeners[type]) this.listeners[type] = [];
				this.listeners[type].push([plugin, cb]);
			};
			for (let plugin of this.plugins) if (typeof plugin === "object") for (let event in plugin) {
				if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) throw new Error(`Unknown event ${event} in ${plugin.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);
				if (!NOT_VISITORS[event]) {
					if (typeof plugin[event] === "object") for (let filter in plugin[event]) if (filter === "*") add(plugin, event, plugin[event][filter]);
					else add(plugin, event + "-" + filter.toLowerCase(), plugin[event][filter]);
					else if (typeof plugin[event] === "function") add(plugin, event, plugin[event]);
				}
			}
			this.hasListener = Object.keys(this.listeners).length > 0;
		}
		async runAsync() {
			this.plugin = 0;
			for (let i = 0; i < this.plugins.length; i++) {
				let plugin = this.plugins[i];
				let promise = this.runOnRoot(plugin);
				if (isPromise(promise)) try {
					await promise;
				} catch (error) {
					throw this.handleError(error);
				}
			}
			this.prepareVisitors();
			if (this.hasListener) {
				let root = this.result.root;
				while (!root[isClean]) {
					root[isClean] = true;
					let stack = [toStack(root)];
					while (stack.length > 0) {
						let promise = this.visitTick(stack);
						if (isPromise(promise)) try {
							await promise;
						} catch (e) {
							let node = stack[stack.length - 1].node;
							throw this.handleError(e, node);
						}
					}
				}
				if (this.listeners.OnceExit) for (let [plugin, visitor] of this.listeners.OnceExit) {
					this.result.lastPlugin = plugin;
					try {
						if (root.type === "document") {
							let roots = root.nodes.map((subRoot) => visitor(subRoot, this.helpers));
							await Promise.all(roots);
						} else await visitor(root, this.helpers);
					} catch (e) {
						throw this.handleError(e);
					}
				}
			}
			this.processed = true;
			return this.stringify();
		}
		runOnRoot(plugin) {
			this.result.lastPlugin = plugin;
			try {
				if (typeof plugin === "object" && plugin.Once) {
					if (this.result.root.type === "document") {
						let roots = this.result.root.nodes.map((root) => plugin.Once(root, this.helpers));
						if (isPromise(roots[0])) return Promise.all(roots);
						return roots;
					}
					return plugin.Once(this.result.root, this.helpers);
				} else if (typeof plugin === "function") return plugin(this.result.root, this.result);
			} catch (error) {
				throw this.handleError(error);
			}
		}
		stringify() {
			if (this.error) throw this.error;
			if (this.stringified) return this.result;
			this.stringified = true;
			this.sync();
			let opts = this.result.opts;
			let str = stringify;
			if (opts.syntax) str = opts.syntax.stringify;
			if (opts.stringifier) str = opts.stringifier;
			if (str.stringify) str = str.stringify;
			let rootSource = this.result.root.source;
			if (opts.map === void 0 && !(rootSource && rootSource.input && rootSource.input.map)) {
				let result = "";
				str(this.result.root, (i) => {
					result += i;
				});
				this.result.css = result;
				return this.result;
			}
			let data = new MapGenerator(str, this.result.root, this.result.opts).generate();
			this.result.css = data[0];
			this.result.map = data[1];
			return this.result;
		}
		sync() {
			if (this.error) throw this.error;
			if (this.processed) return this.result;
			this.processed = true;
			if (this.processing) throw this.getAsyncError();
			for (let plugin of this.plugins) if (isPromise(this.runOnRoot(plugin))) throw this.getAsyncError();
			this.prepareVisitors();
			if (this.hasListener) {
				let root = this.result.root;
				while (!root[isClean]) {
					root[isClean] = true;
					this.walkSync(root);
				}
				if (this.listeners.OnceExit) {
					if (root.type === "document") for (let subRoot of root.nodes) this.visitSync(this.listeners.OnceExit, subRoot);
					else this.visitSync(this.listeners.OnceExit, root);
				}
			}
			return this.result;
		}
		then(onFulfilled, onRejected) {
			if (process.env.NODE_ENV !== "production") {
				if (!("from" in this.opts)) warnOnce("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.");
			}
			return this.async().then(onFulfilled, onRejected);
		}
		toString() {
			return this.css;
		}
		visitSync(visitors, node) {
			for (let [plugin, visitor] of visitors) {
				this.result.lastPlugin = plugin;
				let promise;
				try {
					promise = visitor(node, this.helpers);
				} catch (e) {
					throw this.handleError(e, node.proxyOf);
				}
				if (node.type !== "root" && node.type !== "document" && !node.parent) return true;
				if (isPromise(promise)) throw this.getAsyncError();
			}
		}
		visitTick(stack) {
			let visit = stack[stack.length - 1];
			let { node, visitors } = visit;
			if (node.type !== "root" && node.type !== "document" && !node.parent) {
				stack.pop();
				return;
			}
			if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
				let [plugin, visitor] = visitors[visit.visitorIndex];
				visit.visitorIndex += 1;
				if (visit.visitorIndex === visitors.length) {
					visit.visitors = [];
					visit.visitorIndex = 0;
				}
				this.result.lastPlugin = plugin;
				try {
					return visitor(node.toProxy(), this.helpers);
				} catch (e) {
					throw this.handleError(e, node);
				}
			}
			if (visit.iterator !== 0) {
				let iterator = visit.iterator;
				if (visit.descending) {
					visit.descending = false;
					node.indexes[iterator] += 1;
				}
				let child;
				while (child = node.nodes[node.indexes[iterator]]) {
					if (!child[isClean]) {
						child[isClean] = true;
						visit.descending = true;
						stack.push(toStack(child));
						return;
					}
					node.indexes[iterator] += 1;
				}
				visit.iterator = 0;
				delete node.indexes[iterator];
			}
			let events = visit.events;
			while (visit.eventIndex < events.length) {
				let event = events[visit.eventIndex];
				visit.eventIndex += 1;
				if (event === CHILDREN) {
					if (node.nodes && node.nodes.length) {
						node[isClean] = true;
						visit.iterator = node.getIterator();
					}
					return;
				} else if (this.listeners[event]) {
					visit.visitors = this.listeners[event];
					return;
				}
			}
			stack.pop();
		}
		walkSync(node) {
			node[isClean] = true;
			let stack = [{
				eventIndex: 0,
				events: getEvents(node),
				iterator: 0,
				node
			}];
			while (stack.length > 0) {
				let visit = stack[stack.length - 1];
				let visitNode = visit.node;
				if (visit.iterator !== 0) {
					let iterator = visit.iterator;
					if (visit.descending) {
						visit.descending = false;
						visitNode.indexes[iterator] += 1;
					}
					let child;
					let descended = false;
					while (child = visitNode.nodes[visitNode.indexes[iterator]]) {
						if (!child[isClean]) {
							child[isClean] = true;
							visit.descending = true;
							stack.push({
								eventIndex: 0,
								events: getEvents(child),
								iterator: 0,
								node: child
							});
							descended = true;
							break;
						}
						visitNode.indexes[iterator] += 1;
					}
					if (descended) continue;
					visit.iterator = 0;
					delete visitNode.indexes[iterator];
				}
				if (visit.eventIndex < visit.events.length) {
					let event = visit.events[visit.eventIndex];
					visit.eventIndex += 1;
					if (event === CHILDREN) {
						if (visitNode.nodes && visitNode.nodes.length) visit.iterator = visitNode.getIterator();
					} else {
						let visitors = this.listeners[event];
						if (visitors) {
							if (this.visitSync(visitors, visitNode.toProxy())) stack.pop();
						}
					}
					continue;
				}
				stack.pop();
			}
		}
		warnings() {
			return this.sync().warnings();
		}
	};
	LazyResult.registerPostcss = (dependant) => {
		postcss = dependant;
	};
	module.exports = LazyResult;
	LazyResult.default = LazyResult;
	Root.registerLazyResult(LazyResult);
	Document.registerLazyResult(LazyResult);
}));
//#endregion
//#region node_modules/postcss/lib/no-work-result.js
var require_no_work_result = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var MapGenerator = require_map_generator();
	var parse = require_parse();
	var Result = require_result();
	var stringify = require_stringify();
	var warnOnce = require_warn_once();
	var NoWorkResult = class {
		get content() {
			return this.result.css;
		}
		get css() {
			return this.result.css;
		}
		get map() {
			return this.result.map;
		}
		get messages() {
			return [];
		}
		get opts() {
			return this.result.opts;
		}
		get processor() {
			return this.result.processor;
		}
		get root() {
			if (this._root) return this._root;
			let root;
			let parser = parse;
			try {
				root = parser(this._css, this._opts);
			} catch (error) {
				this.error = error;
			}
			if (this.error) throw this.error;
			else {
				this._root = root;
				return root;
			}
		}
		get [Symbol.toStringTag]() {
			return "NoWorkResult";
		}
		constructor(processor, css, opts) {
			css = css.toString();
			this.stringified = false;
			this._processor = processor;
			this._css = css;
			this._opts = opts;
			this._map = void 0;
			let str = stringify;
			this.result = new Result(this._processor, void 0, this._opts);
			this.result.css = css;
			let self = this;
			Object.defineProperty(this.result, "root", { get() {
				return self.root;
			} });
			let map = new MapGenerator(str, void 0, this._opts, css);
			if (map.isMap()) {
				let [generatedCSS, generatedMap] = map.generate();
				if (generatedCSS) this.result.css = generatedCSS;
				if (generatedMap) this.result.map = generatedMap;
			} else {
				map.clearAnnotation();
				this.result.css = map.css;
			}
		}
		async() {
			if (this.error) return Promise.reject(this.error);
			return Promise.resolve(this.result);
		}
		catch(onRejected) {
			return this.async().catch(onRejected);
		}
		finally(onFinally) {
			return this.async().then(onFinally, onFinally);
		}
		sync() {
			if (this.error) throw this.error;
			return this.result;
		}
		then(onFulfilled, onRejected) {
			if (process.env.NODE_ENV !== "production") {
				if (!("from" in this._opts)) warnOnce("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.");
			}
			return this.async().then(onFulfilled, onRejected);
		}
		toString() {
			return this._css;
		}
		warnings() {
			return [];
		}
	};
	module.exports = NoWorkResult;
	NoWorkResult.default = NoWorkResult;
}));
//#endregion
//#region node_modules/postcss/lib/processor.js
var require_processor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Document = require_document();
	var LazyResult = require_lazy_result();
	var NoWorkResult = require_no_work_result();
	var Root = require_root();
	var Processor = class {
		constructor(plugins = []) {
			this.version = "8.5.29";
			this.plugins = this.normalize(plugins);
		}
		normalize(plugins) {
			let normalized = [];
			for (let i of plugins) {
				if (i.postcss === true) i = i();
				else if (i.postcss) i = i.postcss;
				if (typeof i === "object" && Array.isArray(i.plugins)) normalized = normalized.concat(i.plugins);
				else if (typeof i === "object" && i.postcssPlugin) normalized.push(i);
				else if (typeof i === "function") normalized.push(i);
				else if (typeof i === "object" && (i.parse || i.stringify)) {
					if (process.env.NODE_ENV !== "production") throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.");
				} else throw new Error(i + " is not a PostCSS plugin");
			}
			return normalized;
		}
		process(css, opts = {}) {
			if (!this.plugins.length && !opts.parser && !opts.stringifier && !opts.syntax) return new NoWorkResult(this, css, opts);
			else return new LazyResult(this, css, opts);
		}
		use(plugin) {
			this.plugins = this.plugins.concat(this.normalize([plugin]));
			return this;
		}
	};
	module.exports = Processor;
	Processor.default = Processor;
	Root.registerProcessor(Processor);
	Document.registerProcessor(Processor);
}));
//#endregion
//#region node_modules/postcss/lib/postcss.js
var require_postcss = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var AtRule = require_at_rule();
	var Comment = require_comment();
	var Container = require_container();
	var CssSyntaxError = require_css_syntax_error();
	var Declaration = require_declaration();
	var Document = require_document();
	var fromJSON = require_fromJSON();
	var Input = require_input();
	var LazyResult = require_lazy_result();
	var list = require_list();
	var Node = require_node();
	var parse = require_parse();
	var Processor = require_processor();
	var Result = require_result();
	var Root = require_root();
	var Rule = require_rule();
	var stringify = require_stringify();
	var Warning = require_warning();
	function postcss(...plugins) {
		if (plugins.length === 1 && Array.isArray(plugins[0])) plugins = plugins[0];
		return new Processor(plugins);
	}
	postcss.plugin = function plugin(name, initializer) {
		let warningPrinted = false;
		function creator(...args) {
			if (console && console.warn && !warningPrinted) {
				warningPrinted = true;
				console.warn(name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration");
				if (process.env.LANG && process.env.LANG.startsWith("zh"))
 /* c8 ignore next 7 */
				console.warn(name + ": 里面 postcss.plugin 被弃用. 迁移指南:\nhttps://www.w3ctech.com/topic/2226");
			}
			let transformer = initializer(...args);
			transformer.postcssPlugin = name;
			transformer.postcssVersion = new Processor().version;
			return transformer;
		}
		let cache;
		Object.defineProperty(creator, "postcss", { get() {
			if (!cache) cache = creator();
			return cache;
		} });
		creator.process = function(css, processOpts, pluginOpts) {
			return postcss([creator(pluginOpts)]).process(css, processOpts);
		};
		return creator;
	};
	postcss.stringify = stringify;
	postcss.parse = parse;
	postcss.fromJSON = fromJSON;
	postcss.list = list;
	postcss.comment = (defaults) => new Comment(defaults);
	postcss.atRule = (defaults) => new AtRule(defaults);
	postcss.decl = (defaults) => new Declaration(defaults);
	postcss.rule = (defaults) => new Rule(defaults);
	postcss.root = (defaults) => new Root(defaults);
	postcss.document = (defaults) => new Document(defaults);
	postcss.CssSyntaxError = CssSyntaxError;
	postcss.Declaration = Declaration;
	postcss.Container = Container;
	postcss.Processor = Processor;
	postcss.Document = Document;
	postcss.Comment = Comment;
	postcss.Warning = Warning;
	postcss.AtRule = AtRule;
	postcss.Result = Result;
	postcss.Input = Input;
	postcss.Rule = Rule;
	postcss.Root = Root;
	postcss.Node = Node;
	LazyResult.registerPostcss(postcss);
	module.exports = postcss;
	postcss.default = postcss;
}));
//#endregion
//#region node_modules/postcss/lib/postcss.mjs
var import_postcss = /* @__PURE__ */ __toESM(require_postcss(), 1);
var stringify = import_postcss.default.stringify;
import_postcss.default.fromJSON;
import_postcss.default.plugin;
var parse$2 = import_postcss.default.parse;
import_postcss.default.list;
import_postcss.default.document;
import_postcss.default.comment;
import_postcss.default.atRule;
import_postcss.default.rule;
import_postcss.default.decl;
import_postcss.default.root;
import_postcss.default.CssSyntaxError;
import_postcss.default.Declaration;
import_postcss.default.Container;
import_postcss.default.Processor;
import_postcss.default.Document;
import_postcss.default.Comment;
import_postcss.default.Warning;
import_postcss.default.AtRule;
import_postcss.default.Result;
import_postcss.default.Input;
import_postcss.default.Rule;
import_postcss.default.Root;
import_postcss.default.Node;
//#endregion
//#region node_modules/postcss-media-query-parser/dist/nodes/Node.js
var require_Node = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	* A very generic node. Pretty much any element of a media query
	*/
	function Node(opts) {
		this.after = opts.after;
		this.before = opts.before;
		this.type = opts.type;
		this.value = opts.value;
		this.sourceIndex = opts.sourceIndex;
	}
	exports.default = Node;
}));
//#endregion
//#region node_modules/postcss-media-query-parser/dist/nodes/Container.js
var require_Container = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _Node2 = _interopRequireDefault(require_Node());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function Container(opts) {
		var _this = this;
		this.constructor(opts);
		this.nodes = opts.nodes;
		if (this.after === void 0) this.after = this.nodes.length > 0 ? this.nodes[this.nodes.length - 1].after : "";
		if (this.before === void 0) this.before = this.nodes.length > 0 ? this.nodes[0].before : "";
		if (this.sourceIndex === void 0) this.sourceIndex = this.before.length;
		this.nodes.forEach(function(node) {
			node.parent = _this;
		});
	}
	Container.prototype = Object.create(_Node2.default.prototype);
	Container.constructor = _Node2.default;
	/**
	* Iterate over descendant nodes of the node
	*
	* @param {RegExp|string} filter - Optional. Only nodes with node.type that
	*    satisfies the filter will be traversed over
	* @param {function} cb - callback to call on each node. Takes theese params:
	*    node - the node being processed, i - it's index, nodes - the array
	*    of all nodes
	*    If false is returned, the iteration breaks
	*
	* @return (boolean) false, if the iteration was broken
	*/
	Container.prototype.walk = function walk(filter, cb) {
		var hasFilter = typeof filter === "string" || filter instanceof RegExp;
		var callback = hasFilter ? cb : filter;
		var filterReg = typeof filter === "string" ? new RegExp(filter) : filter;
		for (var i = 0; i < this.nodes.length; i++) {
			var node = this.nodes[i];
			if ((hasFilter ? filterReg.test(node.type) : true) && callback && callback(node, i, this.nodes) === false) return false;
			if (node.nodes && node.walk(filter, cb) === false) return false;
		}
		return true;
	};
	/**
	* Iterate over immediate children of the node
	*
	* @param {function} cb - callback to call on each node. Takes theese params:
	*    node - the node being processed, i - it's index, nodes - the array
	*    of all nodes
	*    If false is returned, the iteration breaks
	*
	* @return (boolean) false, if the iteration was broken
	*/
	Container.prototype.each = function each() {
		var cb = arguments.length <= 0 || arguments[0] === void 0 ? function() {} : arguments[0];
		for (var i = 0; i < this.nodes.length; i++) {
			var node = this.nodes[i];
			if (cb(node, i, this.nodes) === false) return false;
		}
		return true;
	};
	exports.default = Container;
}));
//#endregion
//#region node_modules/postcss-media-query-parser/dist/parsers.js
var require_parsers = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseMediaFeature = parseMediaFeature;
	exports.parseMediaQuery = parseMediaQuery;
	exports.parseMediaList = parseMediaList;
	var _Node2 = _interopRequireDefault(require_Node());
	var _Container2 = _interopRequireDefault(require_Container());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	/**
	* Parses a media feature expression, e.g. `max-width: 10px`, `(color)`
	*
	* @param {string} string - the source expression string, can be inside parens
	* @param {Number} index - the index of `string` in the overall input
	*
	* @return {Array} an array of Nodes, the first element being a media feature,
	*    the secont - its value (may be missing)
	*/
	function parseMediaFeature(string) {
		var index = arguments.length <= 1 || arguments[1] === void 0 ? 0 : arguments[1];
		var modesEntered = [{
			mode: "normal",
			character: null
		}];
		var result = [];
		var lastModeIndex = 0;
		var mediaFeature = "";
		var colon = null;
		var mediaFeatureValue = null;
		var indexLocal = index;
		var stringNormalized = string;
		if (string[0] === "(" && string[string.length - 1] === ")") {
			stringNormalized = string.substring(1, string.length - 1);
			indexLocal++;
		}
		for (var i = 0; i < stringNormalized.length; i++) {
			var character = stringNormalized[i];
			if (character === "'" || character === "\"") {
				if (modesEntered[lastModeIndex].isCalculationEnabled === true) {
					modesEntered.push({
						mode: "string",
						isCalculationEnabled: false,
						character
					});
					lastModeIndex++;
				} else if (modesEntered[lastModeIndex].mode === "string" && modesEntered[lastModeIndex].character === character && stringNormalized[i - 1] !== "\\") {
					modesEntered.pop();
					lastModeIndex--;
				}
			}
			if (character === "{") {
				modesEntered.push({
					mode: "interpolation",
					isCalculationEnabled: true
				});
				lastModeIndex++;
			} else if (character === "}") {
				modesEntered.pop();
				lastModeIndex--;
			}
			if (modesEntered[lastModeIndex].mode === "normal" && character === ":") {
				var mediaFeatureValueStr = stringNormalized.substring(i + 1);
				mediaFeatureValue = {
					type: "value",
					before: /^(\s*)/.exec(mediaFeatureValueStr)[1],
					after: /(\s*)$/.exec(mediaFeatureValueStr)[1],
					value: mediaFeatureValueStr.trim()
				};
				mediaFeatureValue.sourceIndex = mediaFeatureValue.before.length + i + 1 + indexLocal;
				colon = {
					type: "colon",
					sourceIndex: i + indexLocal,
					after: mediaFeatureValue.before,
					value: ":"
				};
				break;
			}
			mediaFeature += character;
		}
		mediaFeature = {
			type: "media-feature",
			before: /^(\s*)/.exec(mediaFeature)[1],
			after: /(\s*)$/.exec(mediaFeature)[1],
			value: mediaFeature.trim()
		};
		mediaFeature.sourceIndex = mediaFeature.before.length + indexLocal;
		result.push(mediaFeature);
		if (colon !== null) {
			colon.before = mediaFeature.after;
			result.push(colon);
		}
		if (mediaFeatureValue !== null) result.push(mediaFeatureValue);
		return result;
	}
	/**
	* Parses a media query, e.g. `screen and (color)`, `only tv`
	*
	* @param {string} string - the source media query string
	* @param {Number} index - the index of `string` in the overall input
	*
	* @return {Array} an array of Nodes and Containers
	*/
	function parseMediaQuery(string) {
		var index = arguments.length <= 1 || arguments[1] === void 0 ? 0 : arguments[1];
		var result = [];
		var localLevel = 0;
		var insideSomeValue = false;
		var node = void 0;
		function resetNode() {
			return {
				before: "",
				after: "",
				value: ""
			};
		}
		node = resetNode();
		for (var i = 0; i < string.length; i++) {
			var character = string[i];
			if (!insideSomeValue) {
				if (character.search(/\s/) !== -1) node.before += character;
				else {
					if (character === "(") {
						node.type = "media-feature-expression";
						localLevel++;
					}
					node.value = character;
					node.sourceIndex = index + i;
					insideSomeValue = true;
				}
			} else {
				node.value += character;
				if (character === "{" || character === "(") localLevel++;
				if (character === ")" || character === "}") localLevel--;
			}
			if (insideSomeValue && localLevel === 0 && (character === ")" || i === string.length - 1 || string[i + 1].search(/\s/) !== -1)) {
				if ([
					"not",
					"only",
					"and"
				].indexOf(node.value) !== -1) node.type = "keyword";
				if (node.type === "media-feature-expression") node.nodes = parseMediaFeature(node.value, node.sourceIndex);
				result.push(Array.isArray(node.nodes) ? new _Container2.default(node) : new _Node2.default(node));
				node = resetNode();
				insideSomeValue = false;
			}
		}
		for (var _i = 0; _i < result.length; _i++) {
			node = result[_i];
			if (_i > 0) result[_i - 1].after = node.before;
			if (node.type === void 0) {
				if (_i > 0) {
					if (result[_i - 1].type === "media-feature-expression") {
						node.type = "keyword";
						continue;
					}
					if (result[_i - 1].value === "not" || result[_i - 1].value === "only") {
						node.type = "media-type";
						continue;
					}
					if (result[_i - 1].value === "and") {
						node.type = "media-feature-expression";
						continue;
					}
					if (result[_i - 1].type === "media-type") {
						if (!result[_i + 1]) node.type = "media-feature-expression";
						else node.type = result[_i + 1].type === "media-feature-expression" ? "keyword" : "media-feature-expression";
					}
				}
				if (_i === 0) {
					if (!result[_i + 1]) {
						node.type = "media-type";
						continue;
					}
					if (result[_i + 1] && (result[_i + 1].type === "media-feature-expression" || result[_i + 1].type === "keyword")) {
						node.type = "media-type";
						continue;
					}
					if (result[_i + 2]) {
						if (result[_i + 2].type === "media-feature-expression") {
							node.type = "media-type";
							result[_i + 1].type = "keyword";
							continue;
						}
						if (result[_i + 2].type === "keyword") {
							node.type = "keyword";
							result[_i + 1].type = "media-type";
							continue;
						}
					}
					if (result[_i + 3]) {
						if (result[_i + 3].type === "media-feature-expression") {
							node.type = "keyword";
							result[_i + 1].type = "media-type";
							result[_i + 2].type = "keyword";
							continue;
						}
					}
				}
			}
		}
		return result;
	}
	/**
	* Parses a media query list. Takes a possible `url()` at the start into
	* account, and divides the list into media queries that are parsed separately
	*
	* @param {string} string - the source media query list string
	*
	* @return {Array} an array of Nodes/Containers
	*/
	function parseMediaList(string) {
		var result = [];
		var interimIndex = 0;
		var levelLocal = 0;
		var doesHaveUrl = /^(\s*)url\s*\(/.exec(string);
		if (doesHaveUrl !== null) {
			var i = doesHaveUrl[0].length;
			var parenthesesLv = 1;
			while (parenthesesLv > 0) {
				var character = string[i];
				if (character === "(") parenthesesLv++;
				if (character === ")") parenthesesLv--;
				i++;
			}
			result.unshift(new _Node2.default({
				type: "url",
				value: string.substring(0, i).trim(),
				sourceIndex: doesHaveUrl[1].length,
				before: doesHaveUrl[1],
				after: /^(\s*)/.exec(string.substring(i))[1]
			}));
			interimIndex = i;
		}
		for (var _i2 = interimIndex; _i2 < string.length; _i2++) {
			var _character = string[_i2];
			if (_character === "(") levelLocal++;
			if (_character === ")") levelLocal--;
			if (levelLocal === 0 && _character === ",") {
				var _mediaQueryString = string.substring(interimIndex, _i2);
				var _spaceBefore = /^(\s*)/.exec(_mediaQueryString)[1];
				result.push(new _Container2.default({
					type: "media-query",
					value: _mediaQueryString.trim(),
					sourceIndex: interimIndex + _spaceBefore.length,
					nodes: parseMediaQuery(_mediaQueryString, interimIndex),
					before: _spaceBefore,
					after: /(\s*)$/.exec(_mediaQueryString)[1]
				}));
				interimIndex = _i2 + 1;
			}
		}
		var mediaQueryString = string.substring(interimIndex);
		var spaceBefore = /^(\s*)/.exec(mediaQueryString)[1];
		result.push(new _Container2.default({
			type: "media-query",
			value: mediaQueryString.trim(),
			sourceIndex: interimIndex + spaceBefore.length,
			nodes: parseMediaQuery(mediaQueryString, interimIndex),
			before: spaceBefore,
			after: /(\s*)$/.exec(mediaQueryString)[1]
		}));
		return result;
	}
}));
//#endregion
//#region node_modules/postcss-media-query-parser/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = parseMedia;
	var _Container2 = _interopRequireDefault(require_Container());
	var _parsers = require_parsers();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	/**
	* Parses a media query list into an array of nodes. A typical node signature:
	*  {string} node.type -- one of: 'media-query', 'media-type', 'keyword',
	*    'media-feature-expression', 'media-feature', 'colon', 'value'
	*  {string} node.value -- the contents of a particular element, trimmed
	*    e.g.: `screen`, `max-width`, `1024px`
	*  {string} node.after -- whitespaces that follow the element
	*  {string} node.before -- whitespaces that precede the element
	*  {string} node.sourceIndex -- the index of the element in a source media
	*    query list, 0-based
	*  {object} node.parent -- a link to the parent node (a container)
	*
	* Some nodes (media queries, media feature expressions) contain other nodes.
	* They additionally have:
	*  {array} node.nodes -- an array of nodes of the type described here
	*  {funciton} node.each -- traverses direct children of the node, calling
	*    a callback for each one
	*  {funciton} node.walk -- traverses ALL descendants of the node, calling
	*    a callback for each one
	*/
	function parseMedia(value) {
		return new _Container2.default({
			nodes: (0, _parsers.parseMediaList)(value),
			type: "media-query-list",
			value: value.trim()
		});
	}
}));
//#endregion
//#region node_modules/postcss-safe-parser/lib/safe-parser.js
var require_safe_parser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Comment = require_comment();
	var Parser = require_parser();
	var tokenizer = require_tokenize();
	var SafeParser = class extends Parser {
		checkMissedSemicolon() {}
		comment(token) {
			let node = new Comment();
			this.init(node, token[2]);
			let pos = this.input.fromOffset(token[3]) || this.input.fromOffset(this.input.css.length - 1);
			node.source.end = {
				column: pos.col,
				line: pos.line,
				offset: token[3] + 1
			};
			let text = token[1].slice(2);
			if (text.slice(-2) === "*/") text = text.slice(0, -2);
			if (/^\s*$/.test(text)) {
				node.text = "";
				node.raws.left = text;
				node.raws.right = "";
			} else {
				let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
				node.text = match[2];
				node.raws.left = match[1];
				node.raws.right = match[3];
			}
		}
		createTokenizer() {
			this.tokenizer = tokenizer(this.input, { ignoreErrors: true });
		}
		decl(tokens) {
			if (tokens.length > 1 && tokens.some((i) => i[0] === "word")) super.decl(tokens);
		}
		doubleColon() {}
		endFile() {
			if (this.current.nodes && this.current.nodes.length) this.current.raws.semicolon = this.semicolon;
			this.current.raws.after = (this.current.raws.after || "") + this.spaces;
			while (this.current.parent) {
				this.current = this.current.parent;
				this.current.raws.after = "";
			}
			this.root.source.end = this.getPosition(this.tokenizer.position());
		}
		precheckMissedSemicolon(tokens) {
			let colon = this.colon(tokens);
			if (colon === false) return;
			let nextStart, prevEnd;
			for (nextStart = colon - 1; nextStart >= 0; nextStart--) if (tokens[nextStart][0] === "word") break;
			if (nextStart <= 0) return;
			for (prevEnd = nextStart - 1; prevEnd >= 0; prevEnd--) if (tokens[prevEnd][0] !== "space") {
				prevEnd += 1;
				break;
			}
			let other = tokens.slice(nextStart);
			let spaces = tokens.slice(prevEnd, nextStart);
			tokens.splice(prevEnd, tokens.length - prevEnd);
			this.spaces = spaces.map((i) => i[1]).join("");
			this.decl(other);
		}
		unclosedBracket() {}
		unexpectedClose() {
			this.current.raws.after += "}";
		}
		unknownWord(tokens) {
			this.spaces += tokens.map((i) => i[1]).join("");
		}
		unnamedAtrule(node) {
			node.name = "";
		}
	};
	module.exports = SafeParser;
}));
//#endregion
//#region node_modules/postcss-safe-parser/lib/safe-parse.js
var require_safe_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { Input } = require_postcss();
	var SafeParser = require_safe_parser();
	module.exports = function safeParse(css, opts) {
		let parser = new SafeParser(new Input(css, opts));
		parser.parse();
		return parser.root;
	};
}));
//#endregion
//#region node_modules/boolbase/dist/index.js
var import_dist = /* @__PURE__ */ __toESM(require_dist(), 1);
var import_safe_parse = /* @__PURE__ */ __toESM(require_safe_parse(), 1);
function trueFunc() {
	return true;
}
function falseFunc() {
	return false;
}
//#endregion
//#region node_modules/css-what/dist/types.js
/** Discriminants for selector token kinds. */
var SelectorType;
(function(SelectorType) {
	SelectorType["Attribute"] = "attribute";
	SelectorType["Pseudo"] = "pseudo";
	SelectorType["PseudoElement"] = "pseudo-element";
	SelectorType["Tag"] = "tag";
	SelectorType["Universal"] = "universal";
	SelectorType["Adjacent"] = "adjacent";
	SelectorType["Child"] = "child";
	SelectorType["Descendant"] = "descendant";
	SelectorType["Parent"] = "parent";
	SelectorType["Sibling"] = "sibling";
	SelectorType["ColumnCombinator"] = "column-combinator";
})(SelectorType || (SelectorType = {}));
/** Operators available for attribute selectors. */
var AttributeAction;
(function(AttributeAction) {
	AttributeAction["Any"] = "any";
	AttributeAction["Element"] = "element";
	AttributeAction["End"] = "end";
	AttributeAction["Equals"] = "equals";
	AttributeAction["Exists"] = "exists";
	AttributeAction["Hyphen"] = "hyphen";
	AttributeAction["Not"] = "not";
	AttributeAction["Start"] = "start";
})(AttributeAction || (AttributeAction = {}));
//#endregion
//#region node_modules/css-what/dist/parse.js
var reName = /^[^#\\]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\u00B0-\uFFFF-])+/;
var reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
var CharCode;
(function(CharCode) {
	CharCode[CharCode["LeftParenthesis"] = 40] = "LeftParenthesis";
	CharCode[CharCode["RightParenthesis"] = 41] = "RightParenthesis";
	CharCode[CharCode["LeftSquareBracket"] = 91] = "LeftSquareBracket";
	CharCode[CharCode["RightSquareBracket"] = 93] = "RightSquareBracket";
	CharCode[CharCode["Comma"] = 44] = "Comma";
	CharCode[CharCode["Period"] = 46] = "Period";
	CharCode[CharCode["Colon"] = 58] = "Colon";
	CharCode[CharCode["SingleQuote"] = 39] = "SingleQuote";
	CharCode[CharCode["DoubleQuote"] = 34] = "DoubleQuote";
	CharCode[CharCode["Plus"] = 43] = "Plus";
	CharCode[CharCode["Tilde"] = 126] = "Tilde";
	CharCode[CharCode["QuestionMark"] = 63] = "QuestionMark";
	CharCode[CharCode["ExclamationMark"] = 33] = "ExclamationMark";
	CharCode[CharCode["Slash"] = 47] = "Slash";
	CharCode[CharCode["Equal"] = 61] = "Equal";
	CharCode[CharCode["Dollar"] = 36] = "Dollar";
	CharCode[CharCode["Pipe"] = 124] = "Pipe";
	CharCode[CharCode["Circumflex"] = 94] = "Circumflex";
	CharCode[CharCode["Asterisk"] = 42] = "Asterisk";
	CharCode[CharCode["GreaterThan"] = 62] = "GreaterThan";
	CharCode[CharCode["LessThan"] = 60] = "LessThan";
	CharCode[CharCode["Hash"] = 35] = "Hash";
	CharCode[CharCode["LowerI"] = 105] = "LowerI";
	CharCode[CharCode["LowerS"] = 115] = "LowerS";
	CharCode[CharCode["BackSlash"] = 92] = "BackSlash";
	CharCode[CharCode["Space"] = 32] = "Space";
	CharCode[CharCode["Tab"] = 9] = "Tab";
	CharCode[CharCode["NewLine"] = 10] = "NewLine";
	CharCode[CharCode["FormFeed"] = 12] = "FormFeed";
	CharCode[CharCode["CarriageReturn"] = 13] = "CarriageReturn";
})(CharCode || (CharCode = {}));
var actionTypes = /* @__PURE__ */ new Map([
	[CharCode.Tilde, AttributeAction.Element],
	[CharCode.Circumflex, AttributeAction.Start],
	[CharCode.Dollar, AttributeAction.End],
	[CharCode.Asterisk, AttributeAction.Any],
	[CharCode.ExclamationMark, AttributeAction.Not],
	[CharCode.Pipe, AttributeAction.Hyphen]
]);
var unpackPseudos = /* @__PURE__ */ new Set([
	"has",
	"not",
	"matches",
	"is",
	"where",
	"host",
	"host-context"
]);
/**
* Pseudo elements defined in CSS Level 1 and CSS Level 2 can be written with
* a single colon; eg. :before will turn into ::before.
* @see {@link https://www.w3.org/TR/2018/WD-selectors-4-20181121/#pseudo-element-syntax}
*/
var pseudosToPseudoElements = /* @__PURE__ */ new Set([
	"before",
	"after",
	"first-line",
	"first-letter"
]);
/**
* Checks whether a specific selector is a traversal.
* This is useful eg. in swapping the order of elements that
* are not traversals.
* @param selector Selector to check.
*/
function isTraversal$1(selector) {
	switch (selector.type) {
		case SelectorType.Adjacent:
		case SelectorType.Child:
		case SelectorType.Descendant:
		case SelectorType.Parent:
		case SelectorType.Sibling:
		case SelectorType.ColumnCombinator: return true;
		case SelectorType.Attribute:
		case SelectorType.Pseudo:
		case SelectorType.PseudoElement:
		case SelectorType.Tag:
		case SelectorType.Universal: return false;
	}
}
var stripQuotesFromPseudos = /* @__PURE__ */ new Set(["contains", "icontains"]);
function funescape(_, escaped, escapedWhitespace) {
	const high = Number.parseInt(escaped, 16) - 65536;
	return Number.isNaN(high) || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
}
function unescapeCSS(cssString) {
	return cssString.replace(reEscape, funescape);
}
function isQuote(c) {
	return c === CharCode.SingleQuote || c === CharCode.DoubleQuote;
}
function isWhitespace$1(c) {
	return c === CharCode.Space || c === CharCode.Tab || c === CharCode.NewLine || c === CharCode.FormFeed || c === CharCode.CarriageReturn;
}
/**
* Parses `selector`.
* @param selector Selector to parse.
* @returns Returns a two-dimensional array.
* The first dimension represents selectors separated by commas (eg. `sub1, sub2`),
* the second contains the relevant tokens for that selector.
*/
function parse$1(selector) {
	const subselects = [];
	const endIndex = parseSelector(subselects, `${selector}`, 0);
	if (endIndex < selector.length) throw new Error(`Unmatched selector: ${selector.slice(endIndex)}`);
	return subselects;
}
function parseSelector(subselects, selector, selectorIndex) {
	let tokens = [];
	function getName(offset) {
		const match = selector.slice(selectorIndex + offset).match(reName);
		if (!match) throw new Error(`Expected name, found ${selector.slice(selectorIndex)}`);
		const [name] = match;
		selectorIndex += offset + name.length;
		return unescapeCSS(name);
	}
	function stripWhitespace(offset) {
		selectorIndex += offset;
		while (selectorIndex < selector.length && isWhitespace$1(selector.charCodeAt(selectorIndex))) selectorIndex++;
	}
	function readValueWithParenthesis() {
		selectorIndex += 1;
		const start = selectorIndex;
		for (let counter = 1; selectorIndex < selector.length; selectorIndex++) switch (selector.charCodeAt(selectorIndex)) {
			case CharCode.BackSlash:
				selectorIndex += 1;
				break;
			case CharCode.LeftParenthesis:
				counter += 1;
				break;
			case CharCode.RightParenthesis:
				counter -= 1;
				if (counter === 0) return unescapeCSS(selector.slice(start, selectorIndex++));
		}
		throw new Error("Parenthesis not matched");
	}
	function ensureNotTraversal() {
		if (tokens.length > 0 && isTraversal$1(tokens[tokens.length - 1])) throw new Error("Did not expect successive traversals.");
	}
	function addTraversal(type) {
		if (tokens.length > 0 && tokens[tokens.length - 1].type === SelectorType.Descendant) {
			tokens[tokens.length - 1].type = type;
			return;
		}
		ensureNotTraversal();
		tokens.push({ type });
	}
	function addSpecialAttribute(name, action) {
		tokens.push({
			type: SelectorType.Attribute,
			name,
			action,
			value: getName(1),
			namespace: null,
			ignoreCase: "quirks"
		});
	}
	/**
	* We have finished parsing the current part of the selector.
	*
	* Remove descendant tokens at the end if they exist,
	* and return the last index, so that parsing can be
	* picked up from here.
	*/
	function finalizeSubselector() {
		if (tokens.length > 0 && tokens[tokens.length - 1].type === SelectorType.Descendant) tokens.pop();
		if (tokens.length === 0) throw new Error("Empty sub-selector");
		subselects.push(tokens);
	}
	stripWhitespace(0);
	if (selector.length === selectorIndex) return selectorIndex;
	loop: while (selectorIndex < selector.length) {
		const firstChar = selector.charCodeAt(selectorIndex);
		switch (firstChar) {
			case CharCode.Space:
			case CharCode.Tab:
			case CharCode.NewLine:
			case CharCode.FormFeed:
			case CharCode.CarriageReturn:
				if (tokens.length === 0 || tokens[0].type !== SelectorType.Descendant) {
					ensureNotTraversal();
					tokens.push({ type: SelectorType.Descendant });
				}
				stripWhitespace(1);
				break;
			case CharCode.GreaterThan:
				addTraversal(SelectorType.Child);
				stripWhitespace(1);
				break;
			case CharCode.LessThan:
				addTraversal(SelectorType.Parent);
				stripWhitespace(1);
				break;
			case CharCode.Tilde:
				addTraversal(SelectorType.Sibling);
				stripWhitespace(1);
				break;
			case CharCode.Plus:
				addTraversal(SelectorType.Adjacent);
				stripWhitespace(1);
				break;
			case CharCode.Period:
				addSpecialAttribute("class", AttributeAction.Element);
				break;
			case CharCode.Hash:
				addSpecialAttribute("id", AttributeAction.Equals);
				break;
			case CharCode.LeftSquareBracket: {
				stripWhitespace(1);
				let name;
				let namespace = null;
				if (selector.charCodeAt(selectorIndex) === CharCode.Pipe) name = getName(1);
				else if (selector.startsWith("*|", selectorIndex)) {
					namespace = "*";
					name = getName(2);
				} else {
					name = getName(0);
					if (selector.charCodeAt(selectorIndex) === CharCode.Pipe && selector.charCodeAt(selectorIndex + 1) !== CharCode.Equal) {
						namespace = name;
						name = getName(1);
					}
				}
				stripWhitespace(0);
				let action = AttributeAction.Exists;
				const possibleAction = actionTypes.get(selector.charCodeAt(selectorIndex));
				if (possibleAction) {
					action = possibleAction;
					if (selector.charCodeAt(selectorIndex + 1) !== CharCode.Equal) throw new Error("Expected `=`");
					stripWhitespace(2);
				} else if (selector.charCodeAt(selectorIndex) === CharCode.Equal) {
					action = AttributeAction.Equals;
					stripWhitespace(1);
				}
				let value = "";
				let ignoreCase = null;
				if (action !== "exists") {
					if (isQuote(selector.charCodeAt(selectorIndex))) {
						const quote = selector.charCodeAt(selectorIndex);
						selectorIndex += 1;
						const sectionStart = selectorIndex;
						while (selectorIndex < selector.length && selector.charCodeAt(selectorIndex) !== quote) selectorIndex += selector.charCodeAt(selectorIndex) === CharCode.BackSlash ? 2 : 1;
						if (selector.charCodeAt(selectorIndex) !== quote) throw new Error("Attribute value didn't end");
						value = unescapeCSS(selector.slice(sectionStart, selectorIndex));
						selectorIndex += 1;
					} else {
						const valueStart = selectorIndex;
						while (selectorIndex < selector.length && !isWhitespace$1(selector.charCodeAt(selectorIndex)) && selector.charCodeAt(selectorIndex) !== CharCode.RightSquareBracket) selectorIndex += selector.charCodeAt(selectorIndex) === CharCode.BackSlash ? 2 : 1;
						value = unescapeCSS(selector.slice(valueStart, selectorIndex));
					}
					stripWhitespace(0);
					switch (selector.charCodeAt(selectorIndex) | 32) {
						case CharCode.LowerI:
							ignoreCase = true;
							stripWhitespace(1);
							break;
						case CharCode.LowerS:
							ignoreCase = false;
							stripWhitespace(1);
					}
				}
				if (selector.charCodeAt(selectorIndex) !== CharCode.RightSquareBracket) throw new Error("Attribute selector didn't terminate");
				selectorIndex += 1;
				const attributeSelector = {
					type: SelectorType.Attribute,
					name,
					action,
					value,
					namespace,
					ignoreCase
				};
				tokens.push(attributeSelector);
				break;
			}
			case CharCode.Colon: {
				if (selector.charCodeAt(selectorIndex + 1) === CharCode.Colon) {
					tokens.push({
						type: SelectorType.PseudoElement,
						name: getName(2).toLowerCase(),
						data: selector.charCodeAt(selectorIndex) === CharCode.LeftParenthesis ? readValueWithParenthesis() : null
					});
					break;
				}
				const name = getName(1).toLowerCase();
				if (pseudosToPseudoElements.has(name)) {
					tokens.push({
						type: SelectorType.PseudoElement,
						name,
						data: null
					});
					break;
				}
				let data = null;
				if (selector.charCodeAt(selectorIndex) === CharCode.LeftParenthesis) {
					if (unpackPseudos.has(name)) {
						if (isQuote(selector.charCodeAt(selectorIndex + 1))) throw new Error(`Pseudo-selector ${name} cannot be quoted`);
						data = [];
						selectorIndex = parseSelector(data, selector, selectorIndex + 1);
						if (selector.charCodeAt(selectorIndex) !== CharCode.RightParenthesis) throw new Error(`Missing closing parenthesis in :${name} (${selector})`);
						selectorIndex += 1;
					} else {
						data = readValueWithParenthesis();
						if (stripQuotesFromPseudos.has(name)) {
							const quot = data.charCodeAt(0);
							if (quot === data.charCodeAt(data.length - 1) && isQuote(quot)) data = data.slice(1, -1);
						}
						data = unescapeCSS(data);
					}
				}
				tokens.push({
					type: SelectorType.Pseudo,
					name,
					data
				});
				break;
			}
			case CharCode.Comma:
				finalizeSubselector();
				tokens = [];
				stripWhitespace(1);
				break;
			default: {
				if (selector.startsWith("/*", selectorIndex)) {
					const endIndex = selector.indexOf("*/", selectorIndex + 2);
					if (endIndex === -1) throw new Error("Comment was not terminated");
					selectorIndex = endIndex + 2;
					if (tokens.length === 0) stripWhitespace(0);
					break;
				}
				let namespace = null;
				let name;
				if (firstChar === CharCode.Asterisk) {
					selectorIndex += 1;
					name = "*";
				} else if (firstChar === CharCode.Pipe) {
					name = "";
					if (selector.charCodeAt(selectorIndex + 1) === CharCode.Pipe) {
						addTraversal(SelectorType.ColumnCombinator);
						stripWhitespace(2);
						break;
					}
				} else if (reName.test(selector.slice(selectorIndex))) name = getName(0);
				else break loop;
				if (selector.charCodeAt(selectorIndex) === CharCode.Pipe && selector.charCodeAt(selectorIndex + 1) !== CharCode.Pipe) {
					namespace = name;
					if (selector.charCodeAt(selectorIndex + 1) === CharCode.Asterisk) {
						name = "*";
						selectorIndex += 2;
					} else name = getName(1);
				}
				tokens.push(name === "*" ? {
					type: SelectorType.Universal,
					namespace
				} : {
					type: SelectorType.Tag,
					name,
					namespace
				});
			}
		}
	}
	finalizeSubselector();
	return selectorIndex;
}
//#endregion
//#region node_modules/domelementtype/dist/index.js
/** Types of elements found in htmlparser2's DOM */
var ElementType;
(function(ElementType) {
	/** Type for the root element of a document */
	ElementType["Root"] = "root";
	/** Type for Text */
	ElementType["Text"] = "text";
	/** Type for <? ... ?> */
	ElementType["Directive"] = "directive";
	/** Type for <!-- ... --> */
	ElementType["Comment"] = "comment";
	/** Type for <script> tags */
	ElementType["Script"] = "script";
	/** Type for <style> tags */
	ElementType["Style"] = "style";
	/** Type for Any tag */
	ElementType["Tag"] = "tag";
	/** Type for <![CDATA[ ... ]]> */
	ElementType["CDATA"] = "cdata";
	/** Type for <!doctype ...> */
	ElementType["Doctype"] = "doctype";
})(ElementType || (ElementType = {}));
/**
* Tests whether an element is a tag or not.
* @param element Element to test
* @param element.type Node type discriminator to check.
*/
function isTag$1(element) {
	return element.type === ElementType.Tag || element.type === ElementType.Script || element.type === ElementType.Style;
}
/** Type for the root element of a document */
var Root = ElementType.Root;
/** Type for Text */
var Text$1 = ElementType.Text;
/** Type for <? ... ?> */
var Directive = ElementType.Directive;
/** Type for <!-- ... --> */
var Comment$1 = ElementType.Comment;
/** Type for <script> tags */
var Script = ElementType.Script;
/** Type for <style> tags */
var Style = ElementType.Style;
/** Type for Any tag */
var Tag = ElementType.Tag;
/** Type for <![CDATA[ ... ]]> */
var CDATA$1 = ElementType.CDATA;
ElementType.Doctype;
//#endregion
//#region node_modules/domhandler/dist/node.js
/**
* This object will be used as the prototype for Nodes when creating a
* DOM-Level-1-compliant structure.
*/
var Node = class {
	/** Parent of the node */
	parent = null;
	/** Previous sibling */
	prev = null;
	/** Next sibling */
	next = null;
	/** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
	startIndex = null;
	/** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
	endIndex = null;
	/**
	* Same as {@link parent}.
	* [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	*/
	get parentNode() {
		return this.parent;
	}
	set parentNode(parent) {
		this.parent = parent;
	}
	/**
	* Same as {@link prev}.
	* [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	*/
	get previousSibling() {
		return this.prev;
	}
	set previousSibling(previous) {
		this.prev = previous;
	}
	/**
	* Same as {@link next}.
	* [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	*/
	get nextSibling() {
		return this.next;
	}
	set nextSibling(next) {
		this.next = next;
	}
	/**
	* Clone this node, and optionally its children.
	* @param recursive Clone child nodes as well.
	* @returns A clone of the node.
	*/
	cloneNode(recursive = false) {
		return cloneNode(this, recursive);
	}
};
/**
* A node that contains some data.
*/
var DataNode = class extends Node {
	data;
	/**
	* @param data The content of the data node
	*/
	constructor(data) {
		super();
		this.data = data;
	}
	/**
	* Same as {@link data}.
	* [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	*/
	get nodeValue() {
		return this.data;
	}
	set nodeValue(data) {
		this.data = data;
	}
};
/**
* Text within the document.
*/
var Text = class extends DataNode {
	type = ElementType.Text;
	get nodeType() {
		return 3;
	}
};
/**
* Comments within the document.
*/
var Comment = class extends DataNode {
	type = ElementType.Comment;
	get nodeType() {
		return 8;
	}
};
/**
* Processing instructions, including doc types.
*/
var ProcessingInstruction = class extends DataNode {
	type = ElementType.Directive;
	name;
	constructor(name, data) {
		super(data);
		this.name = name;
	}
	get nodeType() {
		return 1;
	}
	/** If this is a doctype, the document type name (parse5 only). */
	"x-name";
	/** If this is a doctype, the document type public identifier (parse5 only). */
	"x-publicId";
	/** If this is a doctype, the document type system identifier (parse5 only). */
	"x-systemId";
};
/**
* A node that can have children.
*/
var NodeWithChildren = class extends Node {
	children;
	/**
	* @param children Children of the node. Only certain node types can have children.
	*/
	constructor(children) {
		super();
		this.children = children;
	}
	/** First child of the node. */
	get firstChild() {
		return this.children[0] ?? null;
	}
	/** Last child of the node. */
	get lastChild() {
		return this.children.length > 0 ? this.children[this.children.length - 1] : null;
	}
	/**
	* Same as {@link children}.
	* [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	*/
	get childNodes() {
		return this.children;
	}
	set childNodes(children) {
		this.children = children;
	}
};
/**
* CDATA nodes.
*/
var CDATA = class extends NodeWithChildren {
	type = ElementType.CDATA;
	get nodeType() {
		return 4;
	}
};
/**
* The root node of the document.
*/
var Document = class extends NodeWithChildren {
	type = ElementType.Root;
	get nodeType() {
		return 9;
	}
};
/**
* An element within the DOM.
*/
var Element = class extends NodeWithChildren {
	name;
	attribs;
	type;
	/**
	* @param name Name of the tag, eg. `div`, `span`.
	* @param attribs Object mapping attribute names to attribute values.
	* @param children Children of the node.
	* @param type Node type used for the new node instance.
	*/
	constructor(name, attribs, children = [], type = name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag) {
		super(children);
		this.name = name;
		this.attribs = attribs;
		this.type = type;
	}
	get nodeType() {
		return 1;
	}
	/**
	* Same as {@link name}.
	* [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	*/
	get tagName() {
		return this.name;
	}
	set tagName(name) {
		this.name = name;
	}
	get attributes() {
		return Object.keys(this.attribs).map((name) => ({
			name,
			value: this.attribs[name],
			namespace: this["x-attribsNamespace"]?.[name],
			prefix: this["x-attribsPrefix"]?.[name]
		}));
	}
	/** Element namespace (parse5 only). */
	namespace;
	/** Element attribute namespaces (parse5 only). */
	"x-attribsNamespace";
	/** Element attribute namespace-related prefixes (parse5 only). */
	"x-attribsPrefix";
};
/**
* Checks if `node` is an element node.
* @param node Node to check.
* @returns `true` if the node is an element node.
*/
function isTag(node) {
	return isTag$1(node);
}
/**
* Checks if `node` is a CDATA node.
* @param node Node to check.
* @returns `true` if the node is a CDATA node.
*/
function isCDATA(node) {
	return node.type === ElementType.CDATA;
}
/**
* Checks if `node` is a text node.
* @param node Node to check.
* @returns `true` if the node is a text node.
*/
function isText(node) {
	return node.type === ElementType.Text;
}
/**
* Checks if `node` is a comment node.
* @param node Node to check.
* @returns `true` if the node is a comment node.
*/
function isComment(node) {
	return node.type === ElementType.Comment;
}
/**
* Checks if `node` is a directive node.
* @param node Node to check.
* @returns `true` if the node is a directive node.
*/
function isDirective(node) {
	return node.type === ElementType.Directive;
}
/**
* Checks if `node` is a document node.
* @param node Node to check.
* @returns `true` if the node is a document node.
*/
function isDocument(node) {
	return node.type === ElementType.Root;
}
/**
* Checks if `node` has children.
* @param node Node to check.
* @returns `true` if the node has children.
*/
function hasChildren(node) {
	return Object.hasOwn(node, "children");
}
/**
* Clone a node, and optionally its children.
* @param node Node to clone.
* @param recursive Clone child nodes as well.
* @returns A clone of the node.
*/
function cloneNode(node, recursive = false) {
	let result;
	if (isText(node)) result = new Text(node.data);
	else if (isComment(node)) result = new Comment(node.data);
	else if (isTag(node)) {
		const children = recursive ? cloneChildren(node.children) : [];
		const clone = new Element(node.name, { ...node.attribs }, children);
		for (const child of children) child.parent = clone;
		if (node.namespace != null) clone.namespace = node.namespace;
		if (node["x-attribsNamespace"]) clone["x-attribsNamespace"] = { ...node["x-attribsNamespace"] };
		if (node["x-attribsPrefix"]) clone["x-attribsPrefix"] = { ...node["x-attribsPrefix"] };
		result = clone;
	} else if (isCDATA(node)) {
		const children = recursive ? cloneChildren(node.children) : [];
		const clone = new CDATA(children);
		for (const child of children) child.parent = clone;
		result = clone;
	} else if (isDocument(node)) {
		const children = recursive ? cloneChildren(node.children) : [];
		const clone = new Document(children);
		for (const child of children) child.parent = clone;
		if (node["x-mode"]) clone["x-mode"] = node["x-mode"];
		result = clone;
	} else if (isDirective(node)) {
		const instruction = new ProcessingInstruction(node.name, node.data);
		if (node["x-name"] != null) {
			instruction["x-name"] = node["x-name"];
			instruction["x-publicId"] = node["x-publicId"];
			instruction["x-systemId"] = node["x-systemId"];
		}
		result = instruction;
	} else throw new Error(`Not implemented yet: ${node.type}`);
	result.startIndex = node.startIndex;
	result.endIndex = node.endIndex;
	if (node.sourceCodeLocation != null) result.sourceCodeLocation = node.sourceCodeLocation;
	return result;
}
/**
* Clone a list of child nodes.
* @param childs The child nodes to clone.
* @returns A list of cloned child nodes.
*/
function cloneChildren(childs) {
	const children = childs.map((child) => cloneNode(child, true));
	for (let index = 1; index < children.length; index++) {
		children[index].prev = children[index - 1];
		children[index - 1].next = children[index];
	}
	return children;
}
//#endregion
//#region node_modules/domhandler/dist/index.js
var defaultOptions$1 = {
	withStartIndices: false,
	withEndIndices: false,
	xmlMode: false
};
/**
* Event-based handler that builds a DOM tree from parser callbacks.
*/
var DomHandler = class {
	/** The elements of the DOM */
	dom = [];
	/** The root element for the DOM */
	root = new Document(this.dom);
	/** Called once parsing has completed. */
	callback;
	/** Settings for the handler. */
	options;
	/** Callback whenever a tag is closed. */
	elementCB;
	/** Indicated whether parsing has been completed. */
	done = false;
	/** Stack of open tags. */
	tagStack = [this.root];
	/** A data node that is still being written to. */
	lastNode = null;
	/** Reference to the parser instance. Used for location information. */
	parser = null;
	/**
	* @param callback Called once parsing has completed.
	* @param options Settings for the handler.
	* @param elementCB Callback whenever a tag is closed.
	*/
	constructor(callback, options, elementCB) {
		if (typeof options === "function") {
			elementCB = options;
			options = defaultOptions$1;
		}
		if (typeof callback === "object") {
			options = callback;
			callback = void 0;
		}
		this.callback = callback ?? null;
		this.options = options ?? defaultOptions$1;
		this.elementCB = elementCB ?? null;
	}
	onparserinit(parser) {
		this.parser = parser;
	}
	onreset() {
		this.dom = [];
		this.root = new Document(this.dom);
		this.done = false;
		this.tagStack = [this.root];
		this.lastNode = null;
		this.parser = null;
	}
	onend() {
		if (this.done) return;
		this.done = true;
		this.parser = null;
		this.handleCallback(null);
	}
	onerror(error) {
		this.handleCallback(error);
	}
	onclosetag() {
		this.lastNode = null;
		const element = this.tagStack.pop();
		if (this.options.withEndIndices && this.parser) element.endIndex = this.parser.endIndex;
		if (this.elementCB) this.elementCB(element);
	}
	onopentag(name, attribs) {
		const element = new Element(name, attribs, void 0, this.options.xmlMode ? ElementType.Tag : void 0);
		this.addNode(element);
		this.tagStack.push(element);
	}
	ontext(data) {
		const { lastNode } = this;
		if (lastNode && lastNode.type === ElementType.Text) {
			lastNode.data += data;
			if (this.options.withEndIndices && this.parser) lastNode.endIndex = this.parser.endIndex;
		} else {
			const node = new Text(data);
			this.addNode(node);
			this.lastNode = node;
		}
	}
	oncomment(data) {
		if (this.lastNode && this.lastNode.type === ElementType.Comment) {
			this.lastNode.data += data;
			return;
		}
		const node = new Comment(data);
		this.addNode(node);
		this.lastNode = node;
	}
	oncommentend() {
		this.lastNode = null;
	}
	oncdatastart() {
		const text = new Text("");
		const node = new CDATA([text]);
		this.addNode(node);
		text.parent = node;
		this.lastNode = text;
	}
	oncdataend() {
		this.lastNode = null;
	}
	onprocessinginstruction(name, data) {
		const node = new ProcessingInstruction(name, data);
		this.addNode(node);
	}
	handleCallback(error) {
		if (typeof this.callback === "function") this.callback(error, this.dom);
		else if (error) throw error;
	}
	addNode(node) {
		const parent = this.tagStack[this.tagStack.length - 1];
		const previousSibling = parent.children[parent.children.length - 1];
		if (this.options.withStartIndices && this.parser) node.startIndex = this.parser.startIndex;
		if (this.options.withEndIndices && this.parser) node.endIndex = this.parser.endIndex;
		parent.children.push(node);
		if (previousSibling) {
			node.prev = previousSibling;
			previousSibling.next = node;
		}
		node.parent = parent;
		this.lastNode = null;
	}
};
//#endregion
//#region node_modules/domutils/dist/querying.js
/**
* Search a node and its children for nodes passing a test function. If `node` is not an array, it will be wrapped in one.
*
* @category Querying
* @param test Function to test nodes on.
* @param node Node to search. Will be included in the result set if it matches.
* @param recurse Also consider child nodes.
* @param limit Maximum number of nodes to return.
* @returns All nodes passing `test`.
*/
function filter(test, node, recurse = true, limit = Number.POSITIVE_INFINITY) {
	return find(test, Array.isArray(node) ? node : [node], recurse, limit);
}
/**
* Search an array of nodes and their children for nodes passing a test function.
*
* @category Querying
* @param test Function to test nodes on.
* @param nodes Array of nodes to search.
* @param recurse Also consider child nodes.
* @param limit Maximum number of nodes to return.
* @returns All nodes passing `test`.
*/
function find(test, nodes, recurse, limit) {
	const result = [];
	/** Stack of the arrays we are looking at. */
	const nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
	/** Stack of the indices within the arrays. */
	const indexStack = [0];
	for (;;) {
		if (indexStack[0] >= nodeStack[0].length) {
			if (indexStack.length === 1) return result;
			nodeStack.shift();
			indexStack.shift();
			continue;
		}
		const element = nodeStack[0][indexStack[0]++];
		if (test(element)) {
			result.push(element);
			if (--limit <= 0) return result;
		}
		if (recurse && hasChildren(element) && element.children.length > 0) {
			indexStack.unshift(0);
			nodeStack.unshift(element.children);
		}
	}
}
/**
* Finds one element in a tree that passes a test.
*
* @category Querying
* @param test Function to test nodes on.
* @param nodes Node or array of nodes to search.
* @param recurse Also consider child nodes.
* @returns The first node that passes `test`.
*/
function findOne$1(test, nodes, recurse = true) {
	const searchedNodes = Array.isArray(nodes) ? nodes : [nodes];
	for (const node of searchedNodes) {
		if (isTag(node) && test(node)) return node;
		if (recurse && hasChildren(node) && node.children.length > 0) {
			const found = findOne$1(test, node.children, true);
			if (found) return found;
		}
	}
	return null;
}
/**
* Checks if a tree of nodes contains at least one node passing a test.
*
* @category Querying
* @param test Function to test nodes on.
* @param nodes Array of nodes to search.
* @returns Whether a tree of nodes contains at least one node passing the test.
*/
function existsOne(test, nodes) {
	return (Array.isArray(nodes) ? nodes : [nodes]).some((node) => isTag(node) && test(node) || hasChildren(node) && existsOne(test, node.children));
}
/**
* Search an array of nodes and their children for elements passing a test function.
*
* Same as `find`, but limited to elements and with less options, leading to reduced complexity.
*
* @category Querying
* @param test Function to test nodes on.
* @param nodes Array of nodes to search.
* @returns All nodes passing `test`.
*/
function findAll$1(test, nodes) {
	const result = [];
	const nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
	const indexStack = [0];
	for (;;) {
		if (indexStack[0] >= nodeStack[0].length) {
			if (nodeStack.length === 1) return result;
			nodeStack.shift();
			indexStack.shift();
			continue;
		}
		const element = nodeStack[0][indexStack[0]++];
		if (isTag(element) && test(element)) result.push(element);
		if (hasChildren(element) && element.children.length > 0) {
			indexStack.unshift(0);
			nodeStack.unshift(element.children);
		}
	}
}
//#endregion
//#region node_modules/domutils/dist/legacy.js
/**
* A map of functions to check nodes against.
*/
var Checks = {
	tag_name(name) {
		if (typeof name === "function") return (element) => isTag(element) && name(element.name);
		if (name === "*") return isTag;
		return (element) => isTag(element) && element.name === name;
	},
	tag_type(type) {
		if (typeof type === "function") return (element) => type(element.type);
		return (element) => element.type === type;
	},
	tag_contains(data) {
		if (typeof data === "function") return (element) => isText(element) && data(element.data);
		return (element) => isText(element) && element.data === data;
	}
};
/**
* Returns a function to check whether a node has an attribute with a particular
* value.
*
* @param attrib Attribute to check.
* @param value Attribute value to look for.
* @returns A function to check whether the a node has an attribute with a
*   particular value.
*/
function getAttribCheck(attrib, value) {
	if (typeof value === "function") return (element) => isTag(element) && value(element.attribs[attrib]);
	return (element) => isTag(element) && element.attribs[attrib] === value;
}
/**
* Returns a function that returns `true` if either of the input functions
* returns `true` for a node.
*
* @param a First function to combine.
* @param b Second function to combine.
* @returns A function taking a node and returning `true` if either of the input
*   functions returns `true` for the node.
*/
function combineFuncs(a, b) {
	return (element) => a(element) || b(element);
}
/**
* Returns a function that executes all checks in `options` and returns `true`
* if any of them match a node.
*
* @param options An object describing nodes to look for.
* @returns A function that executes all checks in `options` and returns `true`
*   if any of them match a node.
*/
function compileTest(options) {
	const funcs = Object.keys(options).map((key) => {
		const value = options[key];
		return Object.hasOwn(Checks, key) ? Checks[key](value) : getAttribCheck(key, value);
	});
	return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
}
/**
* Checks whether a node matches the description in `options`.
*
* @category Legacy Query Functions
* @param options An object describing nodes to look for.
* @param node The element to test.
* @returns Whether the element matches the description in `options`.
*/
function testElement(options, node) {
	const test = compileTest(options);
	return test ? test(node) : true;
}
/**
* Returns all nodes that match `options`.
*
* @category Legacy Query Functions
* @param options An object describing nodes to look for.
* @param nodes Nodes to search through.
* @param recurse Also consider child nodes.
* @param limit Maximum number of nodes to return.
* @returns All nodes that match `options`.
*/
function getElements(options, nodes, recurse, limit = Number.POSITIVE_INFINITY) {
	const test = compileTest(options);
	return test ? filter(test, nodes, recurse, limit) : [];
}
/**
* Returns the node with the supplied ID.
*
* @category Legacy Query Functions
* @param id The unique ID attribute value to look for.
* @param nodes Nodes to search through.
* @param recurse Also consider child nodes.
* @returns The node with the supplied ID.
*/
function getElementById(id, nodes, recurse = true) {
	if (!Array.isArray(nodes)) nodes = [nodes];
	return findOne$1(getAttribCheck("id", id), nodes, recurse);
}
/**
* Returns all nodes with the supplied `tagName`.
*
* @category Legacy Query Functions
* @param tagName Tag name to search for.
* @param nodes Nodes to search through.
* @param recurse Also consider child nodes.
* @param limit Maximum number of nodes to return.
* @returns All nodes with the supplied `tagName`.
*/
function getElementsByTagName(tagName, nodes, recurse = true, limit = Number.POSITIVE_INFINITY) {
	return filter(Checks["tag_name"](tagName), nodes, recurse, limit);
}
/**
* Returns all nodes with the supplied `className`.
*
* @category Legacy Query Functions
* @param className Class name to search for.
* @param nodes Nodes to search through.
* @param recurse Also consider child nodes.
* @param limit Maximum number of nodes to return.
* @returns All nodes with the supplied `className`.
*/
function getElementsByClassName(className, nodes, recurse = true, limit = Number.POSITIVE_INFINITY) {
	return filter(getAttribCheck("class", className), nodes, recurse, limit);
}
/**
* Returns all nodes with the supplied `type`.
*
* @category Legacy Query Functions
* @param type Element type to look for.
* @param nodes Nodes to search through.
* @param recurse Also consider child nodes.
* @param limit Maximum number of nodes to return.
* @returns All nodes with the supplied `type`.
*/
function getElementsByTagType(type, nodes, recurse = true, limit = Number.POSITIVE_INFINITY) {
	return filter(Checks["tag_type"](type), nodes, recurse, limit);
}
//#endregion
//#region node_modules/entities/dist/decode-codepoint.js
/**
* C1 Unicode control character reference replacements (code points 128–159).
* Index i gives the replacement for code point 128+i; 0 means "no replacement".
*/
var c1 = [
	8364,
	0,
	8218,
	402,
	8222,
	8230,
	8224,
	8225,
	710,
	8240,
	352,
	8249,
	338,
	0,
	381,
	0,
	0,
	8216,
	8217,
	8220,
	8221,
	8226,
	8211,
	8212,
	732,
	8482,
	353,
	8250,
	339,
	0,
	382,
	376
];
/**
* True for NUL, UTF-16 surrogates, and values past U+10FFFF.
* @param codePoint Unicode code point to check.
*/
function isInvalidCodePoint(codePoint) {
	return codePoint === 0 || codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111;
}
/**
* Replace the given code point with U+FFFD if it is NUL (0), a surrogate, or
* outside the valid Unicode range. Code points in the C1 controls range
* (128–159) are remapped to their Windows-1252 equivalents, following the
* HTML spec. All other code points are returned unchanged.
* @param codePoint Unicode code point to convert.
*/
function replaceCodePoint(codePoint) {
	if (isInvalidCodePoint(codePoint)) return 65533;
	if (codePoint >= 128 && codePoint <= 159) return c1[codePoint - 128] || codePoint;
	return codePoint;
}
/**
* XML numeric character references are the referenced Unicode code point.
* Invalid values still become U+FFFD; the HTML Windows-1252 C1 remap is not
* applied.
* @see https://www.w3.org/TR/xml/#NT-CharRef
* @param codePoint Unicode code point to convert.
*/
function replaceCodePointXML(codePoint) {
	return isInvalidCodePoint(codePoint) ? 65533 : codePoint;
}
//#endregion
//#region node_modules/entities/dist/internal/decode-shared.js
var BASE91_INVERSE = /* #__PURE__ */ (() => {
	const table = /* @__PURE__ */ new Uint8Array(127);
	let code = 0;
	for (let char = 33; char <= 126; char++) if (char !== 34 && char !== 36 && char !== 92) table[char] = code++;
	return table;
})();
/**
* Decode a dictionary-encoded trie string back into its Uint16Array.
*
* Stream layout (consumed in this order):
*   1. dict1 atoms — `dict1AtomCount` uint16 values, delta+RLE encoded.
*   2. dict2 atoms — `atomCount - dict1AtomCount` values, delta+RLE.
*   3. dict2 ngrams — `ngramCount - (dictSize - dict1AtomCount)` entries,
*      each a pair of slot codes that resolve to earlier slots.
*   4. dict1 ngrams — `dictSize - dict1AtomCount` entries, same shape.
*   5. data — slot codes, each expanding to one or more uint16 values.
*
* Codes use a 91-char base (printable ASCII minus `"`, `$`, `\`):
*   - char1 < dictSize  → 1-char code, slot = char1
*   - char1 ≥ dictSize  → 2-char code, slot = dictSize + (char1 - dictSize)*91 + char2
*
* Slot index → token kind:
*   [0, A)                  dict1 atoms     (1-char codes)
*   [A, dictSize)           dict1 ngrams    (1-char codes)
*   [dictSize, dictSize+D)  dict2 atoms     (2-char codes)
*   [dictSize+D, end)       dict2 ngrams    (2-char codes)
*
* Both atom dicts decode before any ngram, and dict2 ngrams decode before
* dict1 ngrams. So every ngram entry references slots whose contents are
* already filled — no forward references to handle.
*
* This runs on library import. Flat typed arrays store each slot as either
* a plain value (`single`, covering every atom) or a range in a shared
* `pool` (ngrams).
* @param input Packed trie string.
* @param resultLength Expected number of uint16 values in the output.
* @param atomCount Total number of distinct uint16 values in the trie.
* @param dict1AtomCount Atoms in the 1-char range (`A` above).
* @param ngramCount Total number of ngram entries (dict1 + dict2).
* @param dictSize Number of 1-char code slots; the rest of `BASE - dictSize`
*   first-byte values are 2-char codes.
*/
function decodeTrieDict(input, resultLength, atomCount, dict1AtomCount, ngramCount, dictSize) {
	const base = 91;
	const inputLength = input.length;
	const twoCharBias = dictSize * 90;
	let pos = 0;
	/** Read one slot code at `pos` and return its slot index, advancing pos. */
	const readSlotCode = () => {
		const c1 = BASE91_INVERSE[input.charCodeAt(pos++)];
		return c1 < dictSize ? c1 : c1 * base - twoCharBias + BASE91_INVERSE[input.charCodeAt(pos++)];
	};
	const dict2AtomCount = atomCount - dict1AtomCount;
	const slotCount = atomCount + ngramCount;
	const single = new Int32Array(slotCount);
	single.fill(-1, dict1AtomCount, dictSize);
	single.fill(-1, dictSize + dict2AtomCount, slotCount);
	const start = new Int32Array(slotCount);
	const length = new Int32Array(slotCount);
	/**
	* Decode `count` ascending uint16 values from a delta+RLE stream into
	* `single[off..off+count)`.
	*
	*   code < 89   → delta = code
	*   code == 89  → run-length: next char encodes runLength-2; emit `runLength` consecutive +1 values
	*   code == 90, next < 90  → escape: delta = 89 + next * BASE + after-next
	*   code == 90, next == 90 → double-escape: extra char for very large deltas
	* @param count
	* @param off
	*/
	function decodeDelta(count, off) {
		let previous = 0;
		let slot = off;
		const end = off + count;
		while (slot < end) {
			const code = BASE91_INVERSE[input.charCodeAt(pos++)];
			if (code < 89) {
				previous += code;
				single[slot++] = previous;
			} else if (code === 89) {
				let runLength = BASE91_INVERSE[input.charCodeAt(pos++)] + 2;
				while (runLength--) single[slot++] = ++previous;
			} else {
				const next = BASE91_INVERSE[input.charCodeAt(pos++)];
				previous += 89 + (next < 90 ? next * base + BASE91_INVERSE[input.charCodeAt(pos++)] : BASE91_INVERSE[input.charCodeAt(pos++)] * 8281 + BASE91_INVERSE[input.charCodeAt(pos++)] * base + BASE91_INVERSE[input.charCodeAt(pos++)]);
				single[slot++] = previous;
			}
		}
	}
	decodeDelta(dict1AtomCount, 0);
	decodeDelta(dict2AtomCount, dictSize);
	const references = new Int32Array(ngramCount * 2);
	let poolSize = 0;
	let ngramIndex = 0;
	/**
	* Read `count` ngram entries (each = 2 slot-code references) for the slots
	* starting at `startSlot`, recording references and assigning pool ranges.
	* @param count
	* @param startSlot
	*/
	function readNgramReferences(count, startSlot) {
		for (let index = 0; index < count; index++) {
			const slot = startSlot + index;
			const a = readSlotCode();
			const b = readSlotCode();
			references[ngramIndex * 2] = a;
			references[ngramIndex * 2 + 1] = b;
			ngramIndex += 1;
			start[slot] = poolSize;
			const entryLength = (single[a] < 0 ? length[a] : 1) + (single[b] < 0 ? length[b] : 1);
			length[slot] = entryLength;
			poolSize += entryLength;
		}
	}
	readNgramReferences(ngramCount - dictSize + dict1AtomCount, dictSize + dict2AtomCount);
	readNgramReferences(dictSize - dict1AtomCount, dict1AtomCount);
	const pool = new Uint16Array(poolSize);
	let write = 0;
	for (let index = 0; index < ngramIndex; index++) for (let half = 0; half < 2; half++) {
		const source = references[index * 2 + half];
		const value = single[source];
		if (value < 0) {
			let read = start[source];
			const readEnd = read + length[source];
			while (read < readEnd) pool[write++] = pool[read++];
		} else pool[write++] = value;
	}
	const out = new Uint16Array(resultLength);
	let outIndex = 0;
	while (pos < inputLength) {
		let slot = BASE91_INVERSE[input.charCodeAt(pos++)];
		if (slot >= dictSize) slot = slot * base - twoCharBias + BASE91_INVERSE[input.charCodeAt(pos++)];
		const value = single[slot];
		if (value < 0) {
			let read = start[slot];
			const readEnd = read + length[slot];
			while (read < readEnd) out[outIndex++] = pool[read++];
		} else out[outIndex++] = value;
	}
	return out;
}
//#endregion
//#region node_modules/entities/dist/generated/decode-data-html.js
/** Packed HTML decode trie data. */
var htmlDecodeTree = /* #__PURE__ */ decodeTrieDict("!}.&u%}'&}*'~!6*)%&,~!J~!J~%L~y<~!R,~~%Lu~~#GD~~#|)1#%}^%}2%+#.##%##%}&%##%'#%##&%#%#'%#&#%#&#'#%%#&#%##%#)%''%&%#%#'%#%%#%%}%%%#%#&(23#%%#&-%0%('1#(##%#'##+%'*.:1}#%#6-+(%'%%#%%%}#L'2351&('%}&/N'(0(/*-%(%%}#'+&T%7.2}#&%&#%#36/5##%&%%#&#%%#))2%%##%&&'0~!#*+&'%1~!%).'3q?&%'1~!.##%6(~!+%%%(Gw'rT~!E#<nA%#jZ~!H%(~!42##~!*31&~!G%U~#)5~#`3~!J~!Z~%]~%Y~%C~!q~!u~#kz~%#~!6'~!D~!U~!?~#T~!c%~!G#'~%7|~!G~!J~!G&~#pb~(Df}#%}*&}#%##%##%##&#-}&'#'&%#.++}%mI,#,@&(}*%}*'%&##&#%##%}&0}#.},U},%}+%}&%}#%##&}B%(}(%}+%)})%##%#&}&%##%&}<%}>%#%&}*%}(%}9%}/%})%}*%}*%}?&}&%}3%}&*#%})%#%#)}#&#-#+*%E%%'%'#%}#*V##&##I}#&&##%&%#&&Qf%%))w/0+&%#(#.%-''''++++7}>%4'',##1,#%#&%##&#'##&#*#9)%&%}#*}%,#+P(%A&%#'&##wSD',9E00#y#@}(+}&%&>~!#~!X}#*}(&&}(&}(,%}%&#+&}#&}I%#%}%)#(},'%#*}4%%#%}(''}#/##(##),%-##%%)#&}(.}&%#&}%%}*&#%},&&}&%}#%*'#%})%}D&}&%}-&}6&#&}-,%}#%})-(~+`~,=?~I9'9%~!,#%})%})%}@%}?%}(~!?~#<~#pP~#BG~#=1#%K+~#?#~%;)~#A~#mF1~#A'~'X%'~#lR~#N~'N~#r~#m#-~#i'?%#'%~#B%##%,%#~#_%#0%~#]732~,w~2+#:&#%&'0%&>%}#>##F+)#%&&#(+_}4&}-%}(&}@&}O7Fdf0@+/v4}&WU##&/0#&'('B#%}.%}'+#%}#%%&#&%#%##+#&#)#6#'#.},%}c%},%#%##%&#&%#&~#>'*-.%##%##%}#%%}%'~#)D1}#%*&~#_%%'(~#S2%'.}#~#=##*'*-%}&'%'##&&~'E%.#&~#M4}%%##&'%#~#O1##%&#'+~#<B%##%%'%+~#;#@%}#&%#&&%#(~#H1}'%'##&&~#?A}&'~#D#%32}'&&&&~#[}'(#%}'~#;C})&}%%#%~#=&%,3}%'(#%%~#^'#&&)#%'~#Y%-~#d-%'~#^%%&#&&&}#~#b~2t*&'~&(~&@~0%~e~3}%*''0})&}+~!9##-}#%-hD*)1fC#%/&/fB#40~!+#)*4~!+~!K'&:~!/*7~!.#~!H~!L':~%x&~!H#~!*~%1~!I#~!+A~#p'~!F~~#-#~,,(~.Z~!V~%;'B'mq-W~!N~%I%#&&#&}#%},%%}'%}+X#%}#&}(%}'%}<%}#%}%%'}'%}:~![)9@~%>~#UA%-%##&~!C%~!-.9:~!1~!-^2/:a~!y,D*J#-5)/4~%23,~#G~!L1~!0X3`~!2+~!!0-~&E~!W~!o,>Y&]~%cZx_&~#O*9#A#'#+I'%#)~!0B*-5A+-((F&*M#)(-7-5+'-3a5Vi~!Y~!?+[)%3),ERHm~!+:D,VG.+)?fB%%*(%)'(#&80%1'8`K8?`+'Z#&O&'H5#*9)A%%5&3))0%39+.*7#()&&*=4@**L)<'_&*+..;(#*+)./&0#3)%')-8(4ixD(&.}%,('aI:,)%,k2231T)I'#/-W7,/'Q#.'Y24+h')37</31&83##&0#),H(?'&?/1##%#&&#%''-%&&&#(&''&#.-'%#%%(,')*'&#&#'##%(%(#%('#&##%%%%('%#%#%%#%#&%##h>w+v<ayvyvcg.uuhKr}g/v|g>u9i[~>g5uI~=RvdwEg;v/g;uk!!TTSx]@RT!U!#!@VBRUU!'UTe-d0c`e&gSdicedFcrdTaqb.kYcAohdYd@a3e+d}dMdtd.aJ#bqcK`dle/e.e'dwdPdodddjbEb}ogd^ofdpduc6j?l%d{drdqc)d7bacOdQ%T#Y)X.sR[yH>6Vyv3[xwLu>vo'!*.[yBacahoj>6Rew3[xqdZa#!a&#^(X-[yG>6Vyu3[xvg3sEr|g.u/Ri9db0T#^(Xa)!-[y;>6Vylg4wKs{JwNZt3@3r=c4Z([xlg;wKt!cpq's@v7A'*a(a+!-a#[y<3Dt?3Dt'>6Vym3[xmg9rxsNJwLZt4~?r?db1T#`-!(Xa,!0[yS>6Vz%NuQs.g4wKtnJwNZtS@3r>c4Z([y%g;wKtrdga8!a(!#&T*Y-Xa#!a0<or[yc3Dtq>6Vz43[y3JwNZtf@3s!Ju}!%Dti:pm3c_%X#tjB5pkd6q!r]u?voC'*-a.a2!0a&a+[yI3DtI3Ds~3DtH>6Vyw3[xx;:s#~<5pKJwNZtE@3r~d`a)!a2T#a.(!+U.X1[yT3Dt`3Dtv>6Vz&3[y&g9rxwzcxstPu.<rAJwLZtT~?r@dZa%!a.&^*Za(/Reu[ya>6Vz23[y1g3sEr}wkg{NuQRg{ci(U#5@b`~,cg#U(2WnH5wugcRh7dX#T(Y,a'Ta!!a,[yZ<]mj>6Vz,3[y+Pv#5ReZKu+=,%!H}7ABwkaS?Rh:BcW(X#<]mrj:ubv/ARekdg%!(!a.*Ta(Y.X1!#sP>Rl*Dt6[y>>6Vyo3Wf*jOvuumvuRgRJuq*!:9<B@bX~3jVv&v@s@5Re[d/rQt{uAvo&a&a*)a2!,0Wf!3Dt0=Bs'>6Re}3[xy~<5s%JwJZt1~Gs)c;&!#2sJkNuXvzq7rxu,Re8dka4!a8(aEZ+a@Y.X1Xa)[yd=Bs(3DtP>6Vz53[y4cX#X&Re:avRe9~<5s&JwJZtQ~Gs*i^rzvdRg+Jv{%!2sbB@bX}kdga,!Za?&^*T1/!a'Dt+[y6>6Vyf3Wf%g/u;s4hGu6?Rh-JvZ,!c%#&RoX54Rivj7uyvf8RgTKvZB%*!2sGh<vu5Rgq<=C::9bb~#dZ#T&Ta6Y.X*Dt>[y93Wf)coZ(T,6VyifluvRgC@95@B@bX~/hFu34cC#T,k/unq8w8Q5RkUklwQuzunq8w8Q5Rk8d/rJu?v8w9)-&!a0a;a&aIWejg3sEr/h1s<DtDJvyZqY5aws3Jvy!&Wei~Hr1:au5@Bag>23E~5c:Z&bX};kKv?w&unuVu5Rjc;>bs)#~@:Rh.=ay<a]C;b`}Vd6s/t{uAvoaxa()!a,a7%-a#a2Dt,[yF2Wo[>6Vyt3[xuNuPRi&NuPwpi#RoWh?vf8Ri%Jv]!%Ri:KvxD!.'2WeAjZu`q9rxu,Re7woeAg-unLq(qA_/*2Wg_g3u5q^9:4E}/jTrxrzv=Wkkd~0UX#^^Xa-a1a5T&a=U1a'*aEa]!a*aPaA-adok[y54Rn>;:p3~Dp5g9rpsFNvZqjg3uJp4~<5p0Pw;5qlJwNZt*@3p1Pw:5p/Ou!5p2JvG'!6Vye=<qnJvh_[xhg3v,Rh3kOwOw-sDuev/Re^dha[a%!%!a+#Ta7)-5TaCaO!aka!a)sf[yb2>Rl!9ARiq5E}Qg=ucRkBE|oJrJ_@Wk~@Wk{JrJ_@Wk|@WkyJrJ_@Wk}@WkzJvO_[y2g-vMRmiKuYC!)&>Ri;>Ri<@3RkNc](X#@9Rk=g5vuRmhKvDB!+'=]meg3u4Rmgd)#Y'Vz3CARmfd`a+!%T'!+#Ta1Ta6TaM-sTDt9[yA9sYd'%Y#s[[xpj:ueunaXRgEjRq,v-vuqdd2'`#6Rev<32@5>:2<E}5xIo9a*X#Y(;5RePJvD_g>vyRgNj8w)v8<wggs:RgXiZt|vjx,hSq3ah!-(~@:Ro/Ou!5RhWj^v(pyw8unRhUdx-UY#^Ua.a3a70!)%UX1TaDa)'omRiRRhE[y:3Dsz=Br,>6Vyj3[xkg6ruwjcqsrPw;5r*Ku]D'Zt-@3r(~?r.i[vwv]dU1a--U#`a4(g/vsRhPOu!5RhLj:rmu9Wo!~@:wdh@g/vsRiTjXuvvNr}:RhBj^v(pyw8unRn]dz1UYa'a+^Y(!aETZalaRY.Ta?a4[yDJw1!#qLsW>6Vyrfzq-pLflpwRe|Js>%!Dt@3Dt&Jvy_[xs~HrnjMuwpsw'RecKu+D#'!t<~Grl~?rjg5u-x,gwp{ah!-(~@:Rg~Ou!5Rh'jXuvvNr}:Rh#cW#X/c;&!#2sLi[v7u7RgpJv)(!iLrxu,Re6j7v@s@5Se[e7d`aW!Za(a`T.a#!a3!&aDa-!9)Dt_=6s+3[x~~DR|h~DS6avhGun5RkZj3w)v-]mkKunB!&*]kb97R|i<ARk<c:Z(6Vy}Juh'!wziMRoS:F|vkLuauJv5vtvQRh1d='T+Y#VyO~DR|jcF#T'7R|g97R|kJv3'!ay<Rj,Jvh&!:ReXcsa6*a+#a#_aIRf9aLRf?c,Z&Rf5Rf7c.Z&Rf;Rf>cQ#%T'p-Rf8Rf=ct#%'(*!,p,Rf4p+Rf6Rf:Rf<d~'Ua%U*^UYa(!a,-!#a4YaTalaEX0a8a<Weo3Dt/3Dsx=Br93Wen~Dr;~<5p<JwNZt2@3p=Pw:5p;Ou!5r3c7&!#:p>3Ds}KvGB)_6Vyk2sM=<r7x'eovA(!hFu1ARf}cV#X&@r5j6rvwQa^Rf3c=Za'wkghJv__g;unRggA53B9=b^}%j6uduo5Jq;!(hIv%2Re`Ou4ARe_e%a#^^^Xa&!a*a2!&a6YaP!*ad!#a:aE/5Rn?[y@>6Vyp;:pE~DrY~<5pBJwNZt8@3pCh=rt3rWPw:5pAJup_[xoNuPpF9c!#'45pD5ARn)d8#X'X*3@rU72s]h>v<<sSjJpqvewOJq/(!hNw'5ReBk0s2u3w/w'5ReE5@Jq.!a+JQ!&WeU23d(#Y&RjG5]jBk!u7w&u0udARjEe#+^^^Ub#!a2/a`Z(agT1!a-a;|@TaG!aS[yV=Re~fow'RguNuPRe?bz#'>RoUWeL>:Cbb|?JwPZtVg6ruRmzJvD'!6Vz(g/vmRh~Jvy_[y(g9voRgyx*cy(#2>Ri2B9b]~9kIw9u7rluJu3Rg]dI#a%UY'@=p%CAx.gQZ&RhwwygtRm{x5g_Z'+ABqR9Woa=Bp&dV#^*Xa'!&@o{g4v]Rk;Jv{!%Rk[wkkiA5RkiwwfUB=x,fUuqC&*!>RfTg8v0RfV~ARfSd;rJsAuAv9wR'ae+/aO!a@aza/a#[yQ@Wg!2Wemg3sEr0JvB_g>uvReWg2v+Re=KupB_+[y!2AbY~-~Hr2AJwD!(h<~El>h<~El?Kun@+_:9b`}Kg-v/Ri3g;vtwyk_9]k_d=&T#*U.6qh@Ab`|K9:H|CJv[!&3Dtex'fDwC%!Rf[9WlMd[(^X,!a%Z06Vz!@WgBg=v~Rgvg,QRe@awd,#Y+jTv|Q~EfWj]uNr|~FRfXdy#Y&^Ua%!aO.!(a)Ua;=!a@aKap!a-,a!Ta]a[rSa]p?[y82sK=Bq~;:p:~<5p8Pw:5p7d'#Y'Wf(;RnRi[u4w&RgJJvG'!6Vyh=<r#ijuuv/sIKuYD'ZtG@3p9~Gr&d2#`(g<vtRgFj`u5w&rqpxRf2CJuY!+:wfnTOu!5Rg}jNs1ucv&RfwJvA!&3@q|BDcC#T,k/unq8w8Q5RkTklwQuzunq8w8Q5Rk9dga#!a'!a=#a0!:+Tb*b@aO.a4!aba8aFJv^}?!VyR~Dr<g;u%Rn.~<5p[x'e`wNZtR@3p]Pw:5pZhNvjBp.woe_g5u-r4JwF!%DtO3:ooc7&!#:p^3DtpLuGw(!+%)Dtk6Vz#2sd=<r8d'#Y([y#<x3gJt`w@!)%}MRiowzikRij=]ilxAf3,U(#B2Rf#g0v-Rm[ck{`U#]giKv3>)!&6Ri154s,KuGB_%@r68r:dJ|t`#X(9<E|u2@H|rx3gJu?w'!+'1Nu7Reg4=H~+9<wxgY95Rm]xLggZ-`(X}U2:Ri4h<uOawRmsJv__5@bb{jbV~3dka#a'a]!,#a+U=a>b6a3b%!/aKa/)!arwve^VyJ;:pR~DpTg3uJpS~<5pOPw;5qmPw:5pNOu!5pQJvG'!6Vyx=<qoJvA!{~Jup!%@qk7Rn/KvyD!}''[xz;>wkh'?Rh,x8gyt`w5D!&),(SgyccRgztJ@3pPB5p#d'(Y#<]mmifubw&RgoJvE&!82s^JvF&!8Rf,ADb]~;x=h'rNu]vK!,%'*0RnORh)4Rh*AqQg-vaRnNg;wHwkh'ba~4cE#Ta*x3gctyw@'!+%RnFRnD<4Rn@hFvK5RnCxWg[#`&a0Ua()`1Rm75Rg[c]%X#qi8Rg^NvdRj>BwzgZauwji7Rm6A4wgg]d1#&(*,.0a#Rm;Rm<Rm=Rm>Rm?Rm@RmARmBe%#^^^Xaea?aC/b+(,!a+a#!a/!>a&Ta<aKbD!2wphBRnk[yPw}hE|.=Br-3Dtm>6Vy~g6urRf.x,hPrNav!%'RnqRo%Ro#Nu;q[Pw;5r+JwNZtM@3r)d'#Y'Weh;xChL#`&RnmRnoKu}>%(!Rne~Bs-;2wjcussJv+'!aYSO}6@B<5?ba~8LrNvj!.%*ROwungw~ng~:9;Ri^>wtnig;wHRnixDh@|(UZ.x1h@|)!#:2<H|*xHn]#-UX'3Ro)z=iT}6ARns=Bwsn_wpnaRncw]aR(#UXa&Ua*a/=]iPd'#Y&Ro'WnXf{QRm2hNvj]nZd`'T~&1`{|`#9b]{}c:'!#Wl{>@=be}]?cl{{U#:5Abb}Jds#^YaF!a*b4a#a3aPa>&Tb!bH!*a_!Eau?/a&RjY<]gj>6Vz*;:pe~DrZg,QRj1JwNZtX@wihspcJvZ&!VyX9WmOJu|!|N2WmHJvh&!]ht~Bpbcn&T(!#RmQ<s7Nu;padH#X'`+WmJ@>RmKCARhnKup=!)&Wf+:RhqNuPpf9c!#'45pd5AwghpARn(Ls@w!%,)!RmP@Wfe<E|IJva!&WmNg8vsRmLd`*.`#Y'Xa!axRn*]hrA8Rhug5s@rXg8u!RmMd8#X'X*3@rV72smdI*#UY&RmICARho~GsgxVgd)Ta'U-Y&Xa!T#RnEWnA@Wffg1uDRi0hFvK5RnBxGnG&#`%owp)@wsf+bX}Ze-*1!a*^^^Ua|!#a.aq&Ya2!a>.a6!a:aO`aJDtL[y`@Wg#>6Vz12@wzoYRoZNuPRi!NuPRhzg=ucRi,@=b`{Yg=ucRi-ACJvB!&Sh[ebSh]ebi`wUuFRm4Jw2_[y0JvB!.<Ju(!&SoG}6Shd}6<Ju(!&SoH}6She}6Kur@._g5vHRieJvx!{L2G{Kx6gd'T#?Rh82Wi5cZ#X(g1w)Rm5dW-Y(Ta#!a)!#aYa=wnfE=su2>>bU{0j9udv:<svj8uQv-7RgHdE%#^'sq9sp=>Bb_{TJv`!&g/r|snj6v(us5d,#Y(56H}[978H}]Jw5!&g1rushJvB!+j;v{u5?zDhd}6}bj;v{u5?zDhe}6}ce*#`(^^^a[aea!=!a6a*aoXb1a.!aAbL!b>,b'aL!aV@Wf|2Wlg3[y/JwNZt^@3piPw:5pgJunZou3@rsJva&!Vy_g<v~Rm#JvG'!6Vz0=<r{Ju{%!:pj@WfsiXuJu3Rm:JvZ&!WfA~Bph@c4Z&Dtwax5rubx(#:awRk1@d,#Y&RfjRfid1#,Y(@Wfp2Wlrg5s@ryKu[@!,'=]ig9wlk?Rk>g5u-rqJvy'!@9RkQcH(T#=>Ri~@<wkj(Wj(KuZB*!&<7rw@9RkRcH(T#=>Ri}@<wkj)Wj)dg(Ta2Xa9X#`-!a*CARhg@@=I}d9x;c~#X%so=<sj>2@@=aybb}XjWv0Q~EfEj3vLv;<d,#Y(56H}`978H}_dgaPaFa'a/!#a3Y0a_a;a|!1(a7-[yE3[xt;:pJNvZrrg3uJrvJwNZt=@3pIh=rt3rxPw:5pGOu!5rpJvG'!6Vys=<rz@c4Z&Dt(ax5rtJvZ!&~BpH@wsfNg-vaRlNci*U#=<wei<F}a5@Jq.!a*JQ!%@qZ23d(#Y&RjH5]jCk!u7w&u0udARjFd/prq=tyvpaEa(a:.!a1aZ(@@=I}:9wpd%=<sX55w_h}@@=I{t=ay<aU@@=I}T=ay<2@@=I})?C9:9au@9Cb]}DP~=x-fAZ(2Wl1=ay<aU@@=I}>5@d##Y+jTv|vV~EfFj]uNpn~FRfGdgaK!Z2&!a8a-Tb({E!acTbM*!a(DtY[yYd'%Y#sl[y*hHvh>Re5x2c{Z}.j4uCvcawRiMd+#X+_x&d!},<5RkX;2Hzw@x,gavfB-!{CcF&T#Roe;RodwWbBg5urRgaKvHC*_6Vz+<4opieuew&Rmq@d]&Y)X,T#X0Rh}<BqP=4qS9:ReMg/ujReNJw0!/<Jui%!bd{kawwnemRelAxUa?a3#*.&UX(Ya+a/RhvRnQ<o}9Wmtd-#Y&RgSRmw9;Rmxay=Rmyg-vaRmuxEhSrNu,v-voC!%(aR.a(a7+1Ro1>Ro5CE{A9b]{@;5x#eO{:g;urRi+KrNA!%(Ro3>Ro79;Ri_Ku@>{;&!x%gX|{KunA_+g5QRj/g3u5Rj#g>uERj%wio/xRhS&!,!#^1U}wba{8>>@=be}qC@:D5ba{7Ku+A&!}x?ba}t>>@=be}se(aA^^^Uat!b0#{pa+awUazbGa#aLb9bgaWac'a5TbS=Br!d1#`%scp_Jvl!#rT>Re0JvX&!VyN=H{Fcm#U&:pY=ReaJv2&!]h0=]nUJvG'!6Vy|=<r%JrM_=]h2@Wlud'#)U'Wf'b]{i=]h/Jvh!&~BpWg=v]RnMx+ny#'Nu;pVwjnu=]nwxJnx,T#`&Reqwjnt=]nvieu9vrRjLLuYwP(#+!th@wih5pX~Gr'g5v/Rh4KunA'!-CARnP@wwiN:Rm_9x'cvw>!|l=<saKvAA!0&3@q}>w^e1bp#&Re2Re3BDx7gH#T|f5H|eKuZ>!%(:qNAH{]Jv6!+3B2B9=b^{X<5<B92:E{ZLvhwA(a;a%!igQuyRmad+#Y}m@3Rh5d8#X'X*:AqUAHzmaxwbh<aXRnVcF}RT#Nw&cj#U(BWnug/vsRntdka)(a3+.Zb7aYYan1!bVa@Xa}[y^@b[{G=H{+hFu73Rj&Pv#5ReQcK%T#sig1v{Rj'Ku+D#'!t]~Grm~?rkKuMB!01d5#`'Vy.ta3Dtu~Hroc8#'{^45s85AwZbP&!#Rn!wghxWn#KvEA!)&2RlA2RlBx:h|#(T,=]j09Wobz>x]z/@awRoTd+#Y(az]hFhCrm4d,#Y+jTv|Q~EfMj]uNr|~FRfOdCa!Xa9_X#@<plJvf!%b`{(9;Rgwc;.!#2x7cw#T|UDb]|T5Ju={(!=@E{&Jv)&!Ab`{'awJvf!~*>>@=be{#KuY>!+&4Ezyi[ugv&RjIdea+T)#UXa&T-T&a!Rh9auRmW=]kLg5vuRn+g3u4Rn-Ow6ARn,hHus5xNk?#UX(U~)/g8v0RkD~AwkkF?Ri.OuNBwkkA?Ri/d|a2`a*^UYa.!aBTZaTa'Xa;!(!2!-a#b2[yC>6Vyq3[xr2Wi?g1rusVh%s?DtF~<5rbJs;%!DtBfswKtCj[uvuSsEu3RgVx3o:u+wN'*Zt;@3rd~Grh~?rfg8w)Lq)qE&-a%!>bI|`jWv0vV~EfCjTv|vV~Ef@j]uNpn~FRfBcK#T']gWNu7x,k7q4ai(0!hHv8<RhmkMu9vrsBuev/RhlCJvB!,g<v{wchh~@:Rhji[vrv{wchi~@:RhkdS&a5UY#Ta!RgPwwiI5BwciI~@:Rh`x'iJvj'!5]iJPu8Bwch]~@:Rhach)U#h3rp]gLh@t|Ax,hTq3ah!-(~@:Ro0Ou!5RhXj^v(pyw8unRhVd|)`,^UYas!a?/a2Z'a^Ta{Tb7Ta(a#!a,Wf&9sZ3DtAadamov=Bqt3[xig8vsRm~>waiL2b`{QJv*_Ouv2qgj<v]v2BqfdR'X*X#Y-@3qr~Gqv~?p6hHv-]glPup5Lq+q?_%*b_{qF{n9b^{rOu4ARhpKvCD!+&~Bqp:5Dbb}nwoiKl&unuTuBv]v+ueunaXRf0=Jvh!0nKufu8v1w&w7q%w&uHrz:Rgnj5w,uxDJq/(!hNw'5ReCk0s2u3w/w'5ReFd>Za&!*UaA=<wkgsRnSJv^!%Refifw3vyRgOKu_B'!,<]gkiiu:w&Rh<=C@a^<B57@2F{[<B5@aW:=3away9A5aW=<B=C@a^<B57@2F{Ie-#`(^^^bCara.b8aza6!/bZ,!adTbnTbOb+aFaS!aAT9@Wf~2Wli3Dtl2@d,#Y&RfnRfmJwJZtN~GqyJva&!VyMg<v~Rm%iXuJu3Rm9Jv[_=]ih9wlkDRkCd1#`(@Wg>2Wls3cH#T(@<Rj*=>Ri|b~'#23s9h<~El.d'#Y&Dtxi^rzvdRl#d*#U%(o|B2s`hJwSaxRmDKv4B&!1:Rmdd5#`'Vx}to~Hq{x'f1v3(!BA5ba|bJv_&!Wfug1v]ReIdO+U/Y#&G}-8wze=Rh{g1v]ReHg/uQRf/by#)ibQwERl/cH#T(@<Rj+=>Ri{cNu+vlax-!(#a0qa9<Rii2;;bU{H;x<i=&X#Rk`<4wwi=C9H~8xAI(Y#<azRi@45wXI<B9;5bb~7dL(X#Xa(+!aL6Vy{g5QqOau:5au2@ay547EzbxOcU(UX-T#Ta#:Cbb|A?wjh/b_|SOw6ARgtihr}u7Rhy<d1#T)X1@@=I|~=ay<2@@=aybb}Sj3vLv;<d,#Y(56H}A978H}@dGpvs@uAu`vcw9*!aFa+ai%(b!aXa8.a?a[ozWey=sU2@G}Nch&U#Rf_WexKu+D#'!t:~Gr`~?r^j]uNr|~FRg*j^psurwJt|RmcKv)@&!)7Rkv~Br[@wxfO:Rl3co#U'6Rezj_q#vIuavjRltwzeyh@vr5JqD0!>aY?C9:9au@9Cb]}9cl#U*5;5<H||jbuus1ucv&Rfvg1v~d/pppzqFr^a--a~!aMat1(hFv;Wiz@@=Izoj5uuv-7Rix~Cw`fk2WlVcZ#X,k)u3vWs@u2]ktg;wEx'fBq(_2Wg/jTv|vV~EfoJv]!15x'hzqG!(P~EfU~CRl_j6v(us5x4i-#T(2WmZ?C2F|d>Kq<aj1!*jTqIsBv=Wl`~Cw`fi2WlWj`v0u*~>RlR=c>Z,k#u3vWs@u2]kr<c1Z+jTqIsBv=Wla~Cw`fm2WlXdmb3!a{(arZa`bkTa%TbQTa-a9+c'!aM!/[yL=Bqug.w'RifhFvyDRj.g>vgwyk^9]k^Jv3_@WfbAARkhJw2_[x|JvB_wkoIRoKwkoJRoLd'(Y#<]gm=<9<H|yd'%_X#skDtb3awwqkgNulRkgdB#^',9:p'hJwSaxRmEBwVb8@4=H|qLu+w50&!)@3qs~?pU>Awwn;;Rn=c:Z'ARn<=<qwKvC@!/&~BqqJv6!&]eVb^z^xRge'/a%+^`#Sge}6<4Rn3=]n0Pw2>Rn8Jw0!&>Rn:>Rn6cY#a7+!a&=<wkaNw~h3z_c5Z{=wjh#=]nLKv^D!&)Vyz=bW|swYb<WetcG#T(2wxa@qVx@gD#Y&b^|V5JwG&!5bb|pg/w&RgD@x=kHs=uAvn!a%%/'+RmSRh694Ro`g-vaRmRhHv-]mlxCcS#`&ba~.5cD#Ta)P~=d,#Y(56H{>978H{Dd_#{2^Y%_+qbbb{6g3sERhsbU{?dfa.,`a(Xa<!aiX#(55RiG54RiHcI#T'WiU3RiVNvdwtfcRlKNvdd,#Y&RlHRlExQgf.1*^T'X#Sgf}6Wn4=]hfPrk>Rn7Jw0!&>Rn5>Rn9Lunw?&a2!,5<oq@@wqfdRlJj5Q~=d,#Y(~ARfcOuN]fdDKw;ay(}i!547E}j?cI#T(@5bV}iCbV}hdv(^^Tb?a40,b##Tbo!a*bR!a<b|a/!aKai!aU[yK=]o^g:v>ReGJwPZtK<7Rh+h<~El,Pv#5ReR@awwxjCg,ulRjDJv6&!]j!z?aQeeg>w=Sh<eeJw;!&axEzOg,Qosc!#*:wkeJ]eJ>x'h-u(!%Ro.w~h.zPdNZ(X,Ya![x{;9ReY;wkgxRiF:x?ap#Y&RmUg<s2Rkod]+UY0TZ'!a&A9sw<=bczLNvuw{gqzNhJwSaxRmCKuLay!#&s_Rf-55b^{uJvZa!!c%#(55Ri654wmiu5RiuawLu,vp!+}^%b_}Y9;wkgxba}o>A9:=b^}zKuh=a''!3awRk3c*'!#aHRk6c+Z&Rk5Rk4Jv)&!awRjSawd9*`#0?C2@EzMj8u<uJ5RmbjQrquJu3x,k>uq@_+=ayb^|W~ARkEOuN]k@7dhzV^X/X&a-#zRzSb`zXcJzTT#2WkVKvDBzW!%FzY9;5bbzWjQrquJu3Jw3%!b`zU=ayb^zQd:#X(T-a!6Vyywxh}=b]{Jg=u1RiAdGp~qHtzv!w(wA+a+a;<!aJaYai'anasb(=azRmV:Cbb{MLq2vb!%')RjuRjrRjtRjqx3jnqCw3!%')Rk(Rk+Rk&Rk)Lq2vb!%')Rj{RjxRjzRjwLq2vb!%')RjsRjpRjfRjex3jcqCw3!%')Rk'Rk*RjkRjl9<CbbzfOu4ARhxLq2vb!%')RjyRjvRjhRjgx=joq*uKvb!%')+-Rk.Rk%Rj~Rk-Rk#Rj}x=jdq*uKvb!%')+-Rk,Rk!Rj|RjmRjjRjidAq&qKs@uAv8Aa.'*-a@a&0!aM@a5[y73Dsy3Ds|3Dt):wxgI2sHJwJZt.~Gqxwsf0ikrzt}Rl0Jvy_[xj~HqzKv_A|D!&WfP8axRoVcf,U#k(v]v+ueunaXRf1Ju}'!g8u#Ri=jQw!sCunLprq>!,')~<5qeGzq9F{W=c##%s5au:5aU3CBE|;d4#X(D!a&6Vygx(b;#(=]ed?C2F{N<capoq2r[a&!aPa9,'Pw;5s:@@=I|,55w_h|@@=IzcP~=x'fCqB_2Wl2>aU@@=I|1OuNBc1Z+jTqIsBv=Wlc~Cw`fl2WlZ~AcTa%!Z+jTqIsBv=Wlb~Cw`fh2WlYk+uNqJsBv=WlSg,u3dca3#UXaMYa)TaB-=cM|7T#<bI}l5@B932:aV2G{BOuNBJq:|M!5Ezt=<B=C@a^<B57@2F{v>cB{/T#=ay<bI{3Jv6!a.6BKq0ah&+!5E}HP~Ef{978BaU@@=Iza<7d#.Y#978BaU@@=IzH~AJq0!(@@=IzG978BaU@@=IzFe,aU*Y&^^^bvJb,b:bFad!a,c2Ta>aL.bo6!a#CbTa'T#Re{2Wlh2@G{yg6t~Ro_NvdRfticuRQRllJv3&!x&c|zs@Jw3!%RflwpfkRlpKuL;%(!Re<@G|C2GzdhIvuBwgjAg-u0RjAKQB%!(GzZ@G|5NuuRl7d='T+Y#Vy[g<v~Rm!==G|>JvA!)@wma=]m1ifuaw&RmnLs@vT'!|/+[y,g:v>ReTJw1!#qX=x!eC{bLu+wT&)ZtZauq_~Graci&U#F|89:r_Lupvq!.)&2RlG8RfaC=x!eF{_h?rpWlmd&'!#X|&]k::xJey#`'T|+<E|&2@H|%dE#(^,g;u.RiEg6vjRiC9xCkA{O|zY#g=ucRmXKs0@!&*@G|m@awRknJuh!,3d(}gY}eJvj!%Rm):Jw3!%Rm+Rm-Ls0w(&!a(a#@b[|6cZ#X'7RkxWgAOu4ARn'dH'U#Y*Vz-Wm'CARm}d]*#a%^a*T'aK!a<9bV{PC=p*Jw4!&SgxcbB5r]idw(wBRmF7xFkt#&`(Rm/Rm8E|!JuY_9:Rl5=wrgr2:bbxd@xXfB(a*#T+!.X0X1Ta/a'T&RlDRfL>RlyARl9b[z[>RfZ:RlL:RfRwlg/ARl;9;RlxKv,A/!%7s69<74=BA5ba{-8Bde#`a<XaKYa1,a'P~=wxfB2bZ}}?C972@@=I}r8@55B9;5bb}G978B2@@=aybb}3j3vLv;<Jw3&!>Rfk=ayb^}4~Ad1#`*@@=aybb{w2@>==<bbz]dx+UY#^UaF!a9!bB'Ya1.!ajXa#%olRhD[y=3Dt#Ov5BrHKuMB%!(Rf^Wep~HrJwkiQjKr|~FRg)Ku+D#'!t5~GrF~?rDdV)UY,Z/_7RkuG{<~BrBg,rlsO:235B@bX}|d?a1!#`(6Vyn5@d##Y+jTv|vV~EfIj]uNpn~FRfH7Lq2vb1!a9-978BaU@@=Iz9978BbU}#~AJq0!(@@=Iz8978BaU@@=Iz7~AJQ|}!978BbU}!JvkaK!AdUa21-U#`a+(g/vsRn~Ou!5RPj:rmu9WhOjXuvvNr}:RhAj^v(pyw8unRn[kPr}p|u7vwv]RiSBd;pppzq@qHQa?(b.!a.a`@.|xa(hFv;Wiyj5uuv-7Riw~Cw`fg2WlU978BbU|wOuNBJqG!(P~EfD~CRlQcZ#X,k)u3vWs@u2]ksg;wEx'f@q1_2Wg.j]uNpn~FRfqJv]!15x'h{qG!(@@=IzK~CRl^j6v(us5x4i,#T(2WmY?C2F{1>Kq<aj1!*jTqIsBv=Wld~Cw`fj2Wl[j`v0u*~>RlT=c>Z,k#u3vWs@u2]kq<c1Z+jTqIsBv=Wle~Cw`fn2Wl]dn1#c(a(b^a2!b/bAT(bj!aDa7bu,a_a{c0!2T0g:v>ReD2@G{42@G{5~DpM~<5rc=Bx6i>{RT#RnI@zCx]y]z:2Jv[!zr5Awyk]9]k]dD(Y+X#6Vz.g=wKtgwhaCwgmTWj2Lu,w%_+/[y-B;b^xeg3u3Rj-2@bX{*KrJ<!+'@Wg(g?QRlC@Jv`!%b[zIwsfII}8JQ_@w|kW|=Jv(%!AqcOuNBJvEzh!bYzjLs@wP#(0!oy@>RkdJwMZtc3Dtd@BcG#T'9bWxg2@2Fznd*#Y+;2x'c}w<zizixNgwa#Z'U+!/!a'!a+w~g~z6wcn{Rn}wcnzRn|5Rh%=]nJg5vuRmvNvdRlvcprJu}w*az*a#!%.a.'Bot9qT]kj@Wg'ay2Gzv@Jv`!%b[zEwsfHI}1;ck#Ux`<Cbbx_Lu+w!a&0*!wko*wwo,So,}6Juqxf!E}PigQuyRm`d3(`#8>Rn%:A5B;bZ~%KvhCa!a2!x>k7#Uxb@b{#xaRk7Jw0!)>wwhlShl}6>wwhmShm}6CJvB!.x'hhvj{!!5Bwkhhbaz}x'hivjz~!5Bwkhibaz|xEhTrNu,v-vpD!a%&/)a3a.,%Ro2t[CE{)@3re9b]{%wjo09:rgc:Z&Ro6=<riifuaw&RmoKrNA!%(Ro4>Ro89;Ri`dSaL'UYzxZb)7Rka3xRhT&!,!#^1U}vbaz{>>@=be}yC@:D5bazzKu+A&!}{?ba}y>>@=be}wxBh[t`u~vJvr!%a!a()a,a0a4RoC=]o;Ju(!%RoGRhdwjh`=]oAg>w#Ro?g5vuRo=NvdRl|Ku]C.!&;RoEJvB!%RoORoMBx'h[v+_?w~h`}~5?w~hd~!xKh]oiptu-utv.vp!#%&a30a@a'a+(a/aOp(o~p!RoDJu(!%RoHRhewjha=]oBNvdRl}g>w#Ro@g5vuRo>c[#X']o<CauRoRAd-#Y':RkpauRoQKu]C.!&;RoFJvB!%RoNRoPBx'h]v+_?w~ha}t5?w~he}ue!/UbhYacXaW^Tc&a;b:a-c/#b&aja1(!cL+!bKbt!bmcRc9aIc?8[yW3Dtt94Rg`Jv}!&SiRMzBhEebShEMNuPRe>x7gL#TzuwjirRipc<Z&>on;>z=h-MSh.Mwqczx'a7vj&!>Re4@=ResJt__NuPRi*NuPRi)j]uNr|~FRfzKrJ>_+@Wfy@Wf]2WocKrJ<!+'@Wg%g/QRl@@Jv`!&awRl<wsfFIzgLu(w*!.*&ShBMwvhIRhI9;RhNx1hK'!#Sn]Mx1hK~0!#:2<H~7cNu+w7D*'1ZtW>Rn1~?rOc:Z&Rn2=<rQ<7wjh&=BSnLMc]#X(6Vz)w[b=a!U#9wzgMc3#&(RgMRitRis<x,gKt`ax!&+SioM=BSilMc3#&(RgKRinRimKurB,!&SiQMzBhDebShDM6BJQ!(P~Efx978B2@@=I}WLrJw!!,a*&@G}O@9wkibRid@@x'fKwC!&SlDMSfLMjUv~Q~EfKKv3@a+!(hFv-]mpx/hYZ(C5RiWz<o/MwkhY?So/M@x,gbvfB*&!SgEM:SoeeehFu3:Rgbda(,^TZa)X/7Sg[eb:2RgI~BrMC@wgkc:wwkcRerx3h(uUvK!&*,SnOM4Sh*MArRg;wHRh(x=h;rJvPwI!a4',a'0@Wg&=BSh/Mg>w=Rh=g3w*wwgGRgGcW(X#;Sg}M2Gzk@Jv`!&awRl=wsfGIz`dKZ*T'Y-:RhR7RhQg5u-p`j6v(us5d,#Y+~Awkia?RicOuNBwkibba}Ld6p~tyu_vbAa'a+!a/'a3aEa8a!>Sh,ebJv{!&Sh@ebSaReb9;SgwebNuPRi(NvdRl)NuPRi'hHu^<Rm^Jvv_@Wl(g;u1Si/ebKu'B&!*Sh?eb@Wl'z@aPeb95Si.ebcpputyvjB)!,&a+0a%ShAMWeK@G}C@WfJ9;RhMwvhH9w{ia}ix,hJvRA1(!zAn[MRhHx1hJ~*!#hFv(BSn[MBJQ!(@@=I~'978B2@@=I}2db.Ua<'X}+T#a0XaG2G}E;wkg|wuh!Rh!x,hZu,@)!&So0MVy)C5RiXACJvB!&5RiY5RiZg8w)cG}*T#2@bU}=KsA>(!a.3wkhZba~(x,h^u(A!&(SoCMRhb5Bz=h[eb?w~hb~6x,h_u(A!&(SoDMRhc5Bz=h]eb?w~hc~6e)aA1T#T,^^^c-bMb&blcPaP(a/!0!bA=b5c@a(!bfbrc#2afwmhARnjwchORnp2Wlf3DtsNvdRl-2@wpa<]m0bx(#:awRk2@Jw3!%RfhwpfgRlnKQB%!(G{V@G|'NuuRl6d='T+Y#VyUg<v~Rl~==G|<Jv+'!aYShC}6@B<5?ba~8@Jw3'!g2QRljhLrpWlOd+#Y'g.w'rIg>w*wgj@g-u0Rj@Lu+wT&)ZtUauq]~GrGci&U#F|39:rELrNvj!.%*RhCwunfw~nf~:9;Ri]>wtnhg;wHRnhx3hDs@v~!/+'@Wfr@9RkSNu&Rlo=@<5GzoKs0@_+@Wl+@awRkmJuh!-3d(}pY#qWJvj!%Rm(:Jw3!%Rm,Rm*de&!1U-U#`)Re;@G|.@9Ri82@wjfvRlq=@<5GzpLvOvr!).&2RlF8Rf`C=x!eE{.Jw3_g2QRlkhLrpWlPde(!#U{s,UXa*Ta'[y'g:v>ReS;x0PZ&RnlRnn~HrKJw1}f!=x!eB|2w]aP(#Xa&a*Ta.Ua2a7=]iOd'#Y&Ro&WnWg;u.RiDg6vjRiBNvdRlzhNvj]nYJuW_2Wm3x)kFze{9d])!a.!,Y01!#&aC!a3RndC=ox~BrC@2b^{pg,rlse7x'ksuq!%Rm.E{xidw(wBRmGx9o+)X#wwo-So-}69:Rl4@xSf@a#XZ'X)X,Ta(/ARl8b[xc>RfY:RlI:RfQwlg.ARl:9;Rlwdn'#^XafaQa1X1TaHTa)@b[{zcZ#X'7RkwWg@Ou4ARn&x)kG#{,g7u/RkGdH'U#Y*Vz'Wm&CARm|bx#(A]gUbUzJj9Q~=d,#Y(56H}l978H{U7d,0#U*2>ABb_xZ978BbU{e~AJQ{g!978BbU{hxMh?ad{oUYZ.x1h?{l!#:2<H{mx3n[t{vl!,&a%3Ro(z=iS}6ARnr=Bwsn^wvn`Rnbd`*T}B0!#^X'BG{c9b]{a>>@=be}F?JvS!&BG{d7BG}(Bde#`a1X,Ya@!a'P~=wxf@2bZ}I56B2@@=aybb}08@55B9;5bb}<j3vLv;<Jw3&!>Rfg=ayb^}&OuNBKuLA!)a!P~=x#fD{f2@>==<bbzl?C972@@=Ix^d6rSu,v7w*C(0a)a6#B+a%!sQ[y?3Dt%3[xn~<5rLOu!5p@Ku+D#'!t7~GrP~?rNKvlaya7'!h+v-5qMg=t|cd,U#5AAaa5Abb{S@52B5@a[@52B5Gx[iXueu;d<#`a(!/549C;ag>23ExY5@Dah89b^~689Jv)!~2b[~1Lv'w(%*!a#bX|aPrmawRe]keu7uhv-q6rxu,q`xTo]/a5aU!bNaDXbi!b-!ao!b<bwA!#5@B932:aV2G|:d-)Y#hJrL>RhG<7@C5<H|_=Cau:5aj5@B932:bJ|ng>vIbs)#?C2F|9jPv0w.vISh-MKvUaz(.!9ABbb|[5;5<H|Eg>unwfh;9:4E|YjQsBt|vjx'hYq3!(?C2F|J:2<BaY?C2F|GOu!5x,g|p{ah!-(?C2F|c9:4E|OjXuvvNr}:Rh&i[w*t|cd+U#jJvsu)vsSn~Mkfrmu9p}u7vwv]So!McW#Xa!ax5@A5aY:5;5<H|>kJv~vYrquJu3x4ib#T)2@SmZM?C2F|Bj:rmu9@xPhI(a*a#U#`a3-5Abb|L~@:RhK9:4E|0@52B5G|#C::aY?C2F|-:2<BaY?C2F|.5Jvk!a)javYrquJu3x4ia#T)2@SmYM?C2F|HAxPhH(!a#U#`a*-5Abb|4~@:RhJ9:4E|R@52B5G|F:2<BaY?C2F|Sc^#Xa2j=Qq5CJvB!-g<v{z;hhM?C2F|Zi[vrv{z;hiM?C2F|XKsA>!a)-g<v{z;h[eb?C2F|]i[vrv{z;h]eb?C2F|^iZu.vix,hZq3ah!.(?C2F|QOu!5ShXM:2<BaY?C2F|P", 13494, 2713, 49, 25, 61);
//#endregion
//#region node_modules/entities/dist/generated/decode-data-xml.js
/** Packed XML decode trie data. */
var xmlDecodeTree = /* #__PURE__ */ new Uint16Array([
	512,
	26465,
	29036,
	7,
	0,
	2,
	4,
	116,
	24638,
	116,
	24636,
	8693,
	29807,
	24610,
	621,
	1,
	0,
	0,
	3,
	112,
	24614,
	111,
	115,
	24615
]);
//#endregion
//#region node_modules/entities/dist/internal/bin-trie-flags.js
/**
* Bit flags & masks for the binary trie encoding used for entity decoding.
*
* The trie is a flat `Uint16Array`. Every node starts with one header word:
*
*   15..14 VALUE_LENGTH   Number of words the value occupies, +1.
*                         0 = no value; 1 = value inline in bits 12..0;
*                         2/3 = value in the 1/2 words after the header.
*   13     FLAG13         If VALUE_LENGTH > 0: semicolon required ("strict"
*                         entity; `;` is never stored as a branch).
*                         If VALUE_LENGTH == 0: this node is a compact run.
*   12..7  BRANCH_LENGTH  Number of branches (or run length for runs).
*   6..0   JUMP_TABLE     Jump-table offset / single-branch char / first
*                         run char (see below).
*
* Branch data follows the header and any value words. Its shape is selected
* by (JUMP_TABLE, BRANCH_LENGTH) in the header:
*
*   Single branch  JUMP_TABLE = the only child's char, BRANCH_LENGTH = 0.
*                  No branch words; the child node follows immediately.
*   Jump table     JUMP_TABLE = first covered char (> 0), BRANCH_LENGTH =
*                  table length. One word per covered char: 0 = no branch,
*                  otherwise the child's offset from the END of the table,
*                  +1 (so 0 stays the no-branch sentinel).
*   Dictionary     JUMP_TABLE = 0, BRANCH_LENGTH = number of branches.
*                  ceil(n/2) words of sorted keys packed two per word
*                  (low byte first), then n pointer words storing the
*                  child's offset from the END of the branch data.
*   Compact run    VALUE_LENGTH = 0, FLAG13 set. BRANCH_LENGTH = run
*                  length (3..63), JUMP_TABLE = first char; remaining run
*                  chars packed two per word after the header. The target
*                  node follows the packed words immediately.
*
* Pointers are end-relative (rather than relative to the pointer's own
* position) because that makes the common "child encoded right after the
* branch data" case a small constant, which compresses far better. Offsets
* to already-encoded (shared) nodes wrap via uint16 modulo arithmetic; the
* decoder masks navigation results with `& 0xff_ff` to match.
*/
var BinTrieFlags;
(function(BinTrieFlags) {
	BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
	BinTrieFlags[BinTrieFlags["FLAG13"] = 8192] = "FLAG13";
	BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 8064] = "BRANCH_LENGTH";
	BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
	/** Bits 12..0: the inline value of a VALUE_LENGTH = 1 header word. */
	BinTrieFlags[BinTrieFlags["VALUE_MASK"] = 8191] = "VALUE_MASK";
})(BinTrieFlags || (BinTrieFlags = {}));
//#endregion
//#region node_modules/entities/dist/decode.js
var CharCodes$1;
(function(CharCodes) {
	CharCodes[CharCodes["AMP"] = 38] = "AMP";
	CharCodes[CharCodes["NUM"] = 35] = "NUM";
	CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
	CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
	CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
	CharCodes[CharCodes["NINE"] = 57] = "NINE";
	CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
	CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
})(CharCodes$1 || (CharCodes$1 = {}));
/** Bit that needs to be set to convert an upper case ASCII character to lower case */
var TO_LOWER_BIT = 32;
/**
* Unsigned subtraction trick: (code - lo) >>> 0 wraps negatives to large
* values, so a single `<=` covers the entire [lo..hi] range check.
* @param code Code point to check.
*/
function isNumber(code) {
	return code - CharCodes$1.ZERO >>> 0 <= 9;
}
function isHexadecimalCharacter(code) {
	return (code | TO_LOWER_BIT) - CharCodes$1.LOWER_A >>> 0 <= 5;
}
function isAlpha(code) {
	return (code | TO_LOWER_BIT) - CharCodes$1.LOWER_A >>> 0 <= 25;
}
/**
* Checks if the given character is a valid end character for an entity in an attribute.
*
* Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
* See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
* @param code Code point to check.
*/
function isEntityInAttributeInvalidEnd(code) {
	return code === CharCodes$1.EQUALS || isAlpha(code) || isNumber(code);
}
var EntityDecoderState;
(function(EntityDecoderState) {
	EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
	EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
	EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
	EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
	EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
/**
* Decoding mode for named entities.
*/
var DecodingMode;
(function(DecodingMode) {
	/** Entities in text nodes that can end with any character. */
	DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
	/** Only allow entities terminated with a semicolon. */
	DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
	/** Entities in attributes have limitations on ending characters. */
	DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
/**
* Token decoder with support of writing partial entities.
*/
var EntityDecoder = class {
	decodeTree;
	emitCodePoint;
	errors;
	/** The current state of the decoder. */
	state = EntityDecoderState.EntityStart;
	/** Characters that were consumed while parsing an entity. */
	consumed = 1;
	/**
	* The result of the entity.
	*
	* For named entities: the trie index of the best legacy match so far
	* (0 = none). For numeric entities: the accumulated code point.
	*/
	result = 0;
	/** The current index in the decode tree. */
	treeIndex = 0;
	/**
	* Characters consumed since the last recorded legacy match, plus one.
	* Invariant at the top of the `stateNamedEntity` loop: `excess` equals
	* the number of unrecorded consumed characters + 1.
	*/
	excess = 1;
	/** The mode in which the decoder is operating. */
	decodeMode = DecodingMode.Strict;
	/** The number of characters that have been consumed in the current run. */
	runConsumed = 0;
	constructor(decodeTree, emitCodePoint, errors) {
		this.decodeTree = decodeTree;
		this.emitCodePoint = emitCodePoint;
		this.errors = errors;
	}
	/**
	* Resets the instance to make it reusable.
	* @param decodeMode Entity decoding mode to use.
	*/
	startEntity(decodeMode) {
		this.decodeMode = decodeMode;
		this.state = EntityDecoderState.EntityStart;
		this.result = 0;
		this.treeIndex = 0;
		this.excess = 1;
		this.consumed = 1;
		this.runConsumed = 0;
	}
	/**
	* Write an entity to the decoder. This can be called multiple times with partial entities.
	* If the entity is incomplete, the decoder will return -1.
	*
	* Mirrors the non-streaming `decodeWithTrie`, but with the ability to stop decoding if the
	* entity is incomplete, and resume when the next string is written.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	write(input, offset) {
		switch (this.state) {
			case EntityDecoderState.EntityStart:
				if (input.charCodeAt(offset) === CharCodes$1.NUM) {
					this.state = EntityDecoderState.NumericStart;
					this.consumed += 1;
					return this.stateNumericStart(input, offset + 1);
				}
				this.state = EntityDecoderState.NamedEntity;
				return this.stateNamedEntity(input, offset);
			case EntityDecoderState.NumericStart: return this.stateNumericStart(input, offset);
			case EntityDecoderState.NumericDecimal: return this.stateNumericDecimal(input, offset);
			case EntityDecoderState.NumericHex: return this.stateNumericHex(input, offset);
			default: return this.stateNamedEntity(input, offset);
		}
	}
	/**
	* Switches between the numeric decimal and hexadecimal states.
	*
	* Equivalent to the `Numeric character reference state` in the HTML spec.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericStart(input, offset) {
		if (offset >= input.length) return -1;
		if ((input.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes$1.LOWER_X) {
			this.state = EntityDecoderState.NumericHex;
			this.consumed += 1;
			return this.stateNumericHex(input, offset + 1);
		}
		this.state = EntityDecoderState.NumericDecimal;
		return this.stateNumericDecimal(input, offset);
	}
	/**
	* Parses a hexadecimal numeric entity.
	*
	* Equivalent to the `Hexademical character reference state` in the HTML
	* spec. Digit parsing matches the hex loop in `parseNumericEntity`.
	* The accumulated value is preserved for numeric validation callbacks.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericHex(input, offset) {
		const inputLength = input.length;
		let { result } = this;
		let { consumed } = this;
		while (offset < inputLength) {
			const char = input.charCodeAt(offset);
			if (isNumber(char) || isHexadecimalCharacter(char)) {
				const digit = char <= CharCodes$1.NINE ? char - CharCodes$1.ZERO : (char | TO_LOWER_BIT) - CharCodes$1.LOWER_A + 10;
				result = result * 16 + digit;
				consumed += 1;
				offset += 1;
			} else {
				this.result = result;
				this.consumed = consumed;
				return this.emitNumericEntity(char, 3);
			}
		}
		this.result = result;
		this.consumed = consumed;
		return -1;
	}
	/**
	* Parses a decimal numeric entity.
	*
	* Equivalent to the `Decimal character reference state` in the HTML
	* spec. Digit parsing matches the decimal loop in `parseNumericEntity`.
	* The accumulated value is preserved for numeric validation callbacks.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericDecimal(input, offset) {
		const inputLength = input.length;
		let { result } = this;
		let { consumed } = this;
		while (offset < inputLength) {
			const digit = input.charCodeAt(offset) - CharCodes$1.ZERO;
			if (digit >>> 0 > 9) {
				this.result = result;
				this.consumed = consumed;
				return this.emitNumericEntity(digit + CharCodes$1.ZERO, 2);
			}
			result = result * 10 + digit;
			consumed += 1;
			offset += 1;
		}
		this.result = result;
		this.consumed = consumed;
		return -1;
	}
	/**
	* Validate and emit a numeric entity.
	*
	* Implements the logic from the `Hexademical character reference start
	* state` and `Numeric character reference end state` in the HTML spec.
	* @param lastCp The last code point of the entity. Used to see if the
	*               entity was terminated with a semicolon.
	* @param expectedLength The minimum number of characters that should be
	*                       consumed. Used to validate that at least one digit
	*                       was consumed.
	* @returns The number of characters that were consumed.
	*/
	emitNumericEntity(lastCp, expectedLength) {
		if (this.consumed <= expectedLength) {
			this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed);
			return 0;
		}
		if (lastCp === CharCodes$1.SEMI) this.consumed += 1;
		else if (this.decodeMode === DecodingMode.Strict) return 0;
		this.emitCodePoint((this.decodeTree === xmlDecodeTree ? replaceCodePointXML : replaceCodePoint)(this.result), this.consumed);
		if (this.errors) {
			if (lastCp !== CharCodes$1.SEMI) this.errors.missingSemicolonAfterCharacterReference();
			this.errors.validateNumericCharacterReference(this.result);
		}
		return this.consumed;
	}
	/**
	* Flush locally-tracked walk state back to the fields, then emit the
	* recorded legacy match or reject (cold path — at most once per
	* entity). Called after failed navigation (leaf node, branch miss, or
	* compact-run mismatch). In attribute mode, reject if no legacy was
	* recorded at the current node, if we descended past it, or if the
	* pending input character is an invalid attribute terminator.
	* @param consumed Locally-tracked consumed count.
	* @param excess Locally-tracked excess count.
	* @param char Pending input character (may be the mismatching char).
	* @param valueLength Value length at the current trie node.
	*/
	flushAndEmitLegacyOrReject(consumed, excess, char, valueLength) {
		this.consumed = consumed;
		this.excess = excess;
		return this.result === 0 || this.decodeMode === DecodingMode.Attribute && (valueLength === 0 || excess > 1 || isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
	}
	/**
	* Parses a named entity.
	*
	* Equivalent to the `Named character reference state` in the HTML spec.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNamedEntity(input, offset) {
		const { decodeTree } = this;
		const inputLength = input.length;
		const isStrict = this.decodeMode === DecodingMode.Strict;
		let { treeIndex } = this;
		let { excess } = this;
		let { consumed } = this;
		let current = decodeTree[treeIndex];
		while (offset < inputLength) {
			while ((current & (BinTrieFlags.VALUE_LENGTH | BinTrieFlags.FLAG13)) === 0 && (current & BinTrieFlags.JUMP_TABLE) !== 0) {
				const char = input.charCodeAt(offset);
				const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
				const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
				if (branchCount === 0) {
					if (char !== jumpOffset) return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
					treeIndex += 1;
				} else {
					const slot = char - jumpOffset;
					if (slot >>> 0 >= branchCount) return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
					const stored = decodeTree[treeIndex + 1 + slot];
					if (stored === 0) return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
					treeIndex = treeIndex + branchCount + stored & 65535;
				}
				current = decodeTree[treeIndex];
				offset += 1;
				excess += 1;
				if (offset >= inputLength) break;
			}
			if (offset >= inputLength) break;
			if ((current & (BinTrieFlags.VALUE_LENGTH | BinTrieFlags.FLAG13)) === BinTrieFlags.FLAG13) {
				const runLength = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
				let { runConsumed } = this;
				if (runConsumed === 0) {
					const char = input.charCodeAt(offset);
					if (char !== (current & BinTrieFlags.JUMP_TABLE)) return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
					offset += 1;
					excess += 1;
					runConsumed = 1;
				}
				while (runConsumed < runLength) {
					if (offset >= inputLength) {
						this.treeIndex = treeIndex;
						this.excess = excess;
						this.consumed = consumed;
						this.runConsumed = runConsumed;
						return -1;
					}
					const charIndexInPacked = runConsumed - 1;
					const expectedChar = decodeTree[treeIndex + 1 + (charIndexInPacked >> 1)] >> ((charIndexInPacked & 1) << 3) & 255;
					const char = input.charCodeAt(offset);
					if (char !== expectedChar) {
						this.runConsumed = 0;
						return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
					}
					offset += 1;
					excess += 1;
					runConsumed += 1;
				}
				this.runConsumed = 0;
				treeIndex += 1 + (runLength >> 1);
				current = decodeTree[treeIndex];
				continue;
			}
			const valueLength = current >>> 14;
			const char = input.charCodeAt(offset);
			if (valueLength !== 0) {
				if (!isStrict && (current & BinTrieFlags.FLAG13) === 0) {
					this.result = treeIndex;
					consumed += excess - 1;
					excess = 1;
				}
				if (char === CharCodes$1.SEMI) return this.emitNamedEntityData(treeIndex, valueLength, consumed + excess);
				if (valueLength === 1) return this.flushAndEmitLegacyOrReject(consumed, excess, char, valueLength);
			}
			const next = determineBranch(decodeTree, current, treeIndex + (valueLength || 1), char);
			if (next < 0) return this.flushAndEmitLegacyOrReject(consumed, excess, char, valueLength);
			treeIndex = next;
			current = decodeTree[treeIndex];
			offset += 1;
			excess += 1;
		}
		if (!isStrict && current >>> 14 !== 0 && (current & BinTrieFlags.FLAG13) === 0) {
			this.result = treeIndex;
			consumed += excess - 1;
			excess = 1;
		}
		this.treeIndex = treeIndex;
		this.excess = excess;
		this.consumed = consumed;
		return -1;
	}
	/**
	* Emit a named entity that was not terminated with a semicolon.
	* @returns The number of characters consumed.
	*/
	emitNotTerminatedNamedEntity() {
		const { result, decodeTree } = this;
		const valueLength = decodeTree[result] >>> 14;
		this.emitNamedEntityData(result, valueLength, this.consumed);
		this.errors?.missingSemicolonAfterCharacterReference();
		return this.consumed;
	}
	/**
	* Emit a named entity.
	* @param result The index of the entity in the decode tree.
	* @param valueLength Encoded value length (header plus any value words).
	* @param consumed The number of characters consumed.
	* @returns The number of characters consumed.
	*/
	emitNamedEntityData(result, valueLength, consumed) {
		const { decodeTree } = this;
		this.emitCodePoint(valueLength === 1 ? decodeTree[result] & BinTrieFlags.VALUE_MASK : decodeTree[result + 1], consumed);
		if (valueLength === 3) this.emitCodePoint(decodeTree[result + 2], consumed);
		return consumed;
	}
	/**
	* Signal to the parser that the end of the input was reached.
	*
	* Remaining data will be emitted and relevant errors will be produced.
	* @returns The number of characters consumed.
	*/
	end() {
		switch (this.state) {
			case EntityDecoderState.NamedEntity: return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
			case EntityDecoderState.NumericDecimal: return this.emitNumericEntity(0, 2);
			case EntityDecoderState.NumericHex: return this.emitNumericEntity(0, 3);
			case EntityDecoderState.NumericStart:
				this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed);
				return 0;
			default: return 0;
		}
	}
};
/**
* Determines the branch of the current node that is taken given the current
* character. This function is used to traverse the trie.
*
* See `BinTrieFlags` for the branch-data layouts handled here.
* @param decodeTree The trie.
* @param current The current node's header word.
* @param nodeIndex Index of the node's first branch-data word (the header
*   plus any value words have been skipped by the caller).
* @param char The current character.
* @returns The index of the next node, or -1 if no branch is taken.
*/
function determineBranch(decodeTree, current, nodeIndex, char) {
	const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
	const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
	if (jumpOffset) {
		if (branchCount === 0) return char === jumpOffset ? nodeIndex : -1;
		const slot = char - jumpOffset;
		if (slot >>> 0 >= branchCount) return -1;
		const stored = decodeTree[nodeIndex + slot];
		return stored === 0 ? -1 : nodeIndex + branchCount + stored - 1 & 65535;
	}
	if (branchCount === 0) return -1;
	const packedKeySlots = branchCount + 1 >> 1;
	const branchEnd = nodeIndex + packedKeySlots + branchCount;
	for (let index = 0; index < branchCount; index++) {
		const key = decodeTree[nodeIndex + (index >> 1)] >> ((index & 1) << 3) & 255;
		if (key === char) return branchEnd + decodeTree[nodeIndex + packedKeySlots + index] & 65535;
		if (key > char) return -1;
	}
	return -1;
}
//#endregion
//#region node_modules/entities/dist/escape.js
/**
* Get the named reference for an XML special character or U+00A0.
* @param char Code unit matched by one of the escape regexes.
*/
function getEscape(char) {
	return char === 34 ? "&quot;" : char === 38 ? "&amp;" : char === 39 ? "&apos;" : char === 60 ? "&lt;" : char === 62 ? "&gt;" : "&nbsp;";
}
/**
* Matches exactly the characters `encodeXML` escapes: the five XML special
* characters plus every non-ASCII code unit (lone surrogates included — no
* `u` flag). Kept in sync with `XML_BITSET_VALUE`.
*
* Shared with `encodeNonAsciiHTML` in `encode.ts`. Because the regex is
* stateful (`g` flag), every call site must set `lastIndex` before use.
*/
var xmlEncodeRegex = /["&'<>\u0080-\uFFFF]/g;
/**
* Whether `code` (a UTF-16 code unit) is escaped by {@link encodeXML}: a
* non-ASCII unit, or one of the five XML specials flagged in
* `XML_BITSET_VALUE` (which is only meaningful for code units 32-63).
* @param code Code unit to test.
*/
function isXmlEscapable(code) {
	return code >= 128 || code >= 32 && code < 64 && (1342177476 >>> code & 1) === 1;
}
/**
* Encodes all non-ASCII characters, as well as characters not valid in XML
* documents using XML entities.
*
* If a character has no equivalent entity, a numeric hexadecimal reference
* (eg. `&#xfc;`) will be used.
* @param input Input string to encode.
*/
function encodeXML(input) {
	const { length } = input;
	let out;
	let last = 0;
	let index = 0;
	while (index < length) {
		const char = input.charCodeAt(index);
		if (!isXmlEscapable(char)) {
			const bound = Math.min(index + 32, length);
			let next = index + 1;
			while (next < bound && !isXmlEscapable(input.charCodeAt(next))) next++;
			if (next < bound) {
				index = next;
				continue;
			}
			if (next >= length) break;
			xmlEncodeRegex.lastIndex = next;
			if (!xmlEncodeRegex.test(input)) break;
			index = xmlEncodeRegex.lastIndex - 1;
			continue;
		}
		if (out === void 0) out = input.substring(0, index);
		else if (last !== index) out += input.substring(last, index);
		if (char < 64) {
			out += getEscape(char);
			last = index += 1;
			continue;
		}
		const cp = input.codePointAt(index);
		out += `&#x${cp.toString(16)};`;
		if (cp !== char) index++;
		last = index += 1;
	}
	if (out === void 0) return input;
	if (last < length) out += input.substr(last);
	return out;
}
/**
* Escape `data` using `re`, mapping each matched character to its entity.
* Every match is one UTF-16 code unit, so its index is `lastIndex - 1`.
* @param re Global regex matching exactly the characters to escape
*   (`"`, `&`, `'`, `<`, `>`, `\u00A0` at most).
* @param data String to escape.
*/
function escapeWithRegex(re, data) {
	re.lastIndex = 0;
	if (!re.test(data)) return data;
	let out = "";
	let last = 0;
	do {
		const index = re.lastIndex - 1;
		if (last !== index) out += data.substring(last, index);
		const char = data.charCodeAt(index);
		out += getEscape(char);
		last = index + 1;
	} while (re.test(data));
	return out + data.substring(last);
}
var attributeEscapeRegex = /["&\u{A0}]/gu;
/**
* Encodes all characters that have to be escaped in HTML attributes,
* following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
* @param data String to escape.
*/
function escapeAttribute(data) {
	return escapeWithRegex(attributeEscapeRegex, data);
}
var textEscapeRegex = /[&<>\u{A0}]/gu;
/**
* Encodes all characters that have to be escaped in HTML text,
* following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
* @param data String to escape.
*/
function escapeText(data) {
	return escapeWithRegex(textEscapeRegex, data);
}
//#endregion
//#region node_modules/entities/dist/index.js
/** The level of entities to support. */
var EntityLevel;
(function(EntityLevel) {
	/** Support only XML entities. */
	EntityLevel[EntityLevel["XML"] = 0] = "XML";
	/** Support HTML entities, which are a superset of XML entities. */
	EntityLevel[EntityLevel["HTML"] = 1] = "HTML";
})(EntityLevel || (EntityLevel = {}));
/**
* Encoding strategy used by `encode`.
*/
var EncodingMode;
(function(EncodingMode) {
	/**
	* The output is UTF-8 encoded. Only characters that need escaping within
	* XML will be escaped.
	*/
	EncodingMode[EncodingMode["UTF8"] = 0] = "UTF8";
	/**
	* The output consists only of ASCII characters. Characters that need
	* escaping within HTML, and characters that aren't ASCII characters will
	* be escaped.
	*/
	EncodingMode[EncodingMode["ASCII"] = 1] = "ASCII";
	/**
	* Encode all characters that have an equivalent entity, as well as all
	* characters that are not ASCII characters.
	*/
	EncodingMode[EncodingMode["Extensive"] = 2] = "Extensive";
	/**
	* Encode all characters that have to be escaped in HTML attributes,
	* following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
	*/
	EncodingMode[EncodingMode["Attribute"] = 3] = "Attribute";
	/**
	* Encode all characters that have to be escaped in HTML text,
	* following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
	*/
	EncodingMode[EncodingMode["Text"] = 4] = "Text";
})(EncodingMode || (EncodingMode = {}));
//#endregion
//#region node_modules/dom-serializer/dist/foreign-names.js
/**
* Mixed-case SVG and MathML element names recognized in foreign content.
* @see https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inforeign
*/
var elementNames = new Map("altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath".split(" ").map((name) => [name.toLowerCase(), name]));
/**
* Mixed-case SVG and MathML attribute names recognized in foreign content.
* @see https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inforeign
*/
var attributeNames = new Map("definitionURL attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits diffuseConstant edgeMode filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan".split(" ").map((name) => [name.toLowerCase(), name]));
//#endregion
//#region node_modules/dom-serializer/dist/index.js
/** Elements whose text content is never entity-encoded. */
var unencodedElements = new Set("style script xmp iframe noembed noframes plaintext noscript".split(" "));
/** HTML void elements — they cannot have children. */
var voidElements$1 = new Set("area base basefont br col command embed frame hr img input isindex keygen link meta param source track wbr".split(" "));
/** Elements that switch the parser into foreign (XML-like) mode. */
var foreignElements = /* @__PURE__ */ new Set(["svg", "math"]);
/**
* Foreign-mode integration points: children of these elements are parsed
* as HTML again, not as foreign content.
*/
var foreignModeIntegrationPoints = new Set("mi mo mn ms mtext annotation-xml foreignObject desc title".split(" "));
/**
* Renders a DOM node or an array of DOM nodes to a string.
*
* Can be thought of as the equivalent of the `outerHTML` of the passed
* node(s).
* @param node Node to be rendered.
* @param options Changes serialization behavior
*/
function render(node, options = {}) {
	const nodes = "length" in node ? node : [node];
	const xmlMode = options.xmlMode ?? false;
	let output = "";
	for (let index = 0; index < nodes.length; index++) output += renderNode(nodes[index], options, xmlMode);
	return output;
}
/**
* Render an array of child nodes (skips the single-node wrapping in `render`).
* @param children The child nodes to render.
* @param options The serialization options.
* @param xmlMode The XML mode to use.
*/
function renderChildren(children, options, xmlMode) {
	let output = "";
	for (let index = 0; index < children.length; index++) output += renderNode(children[index], options, xmlMode);
	return output;
}
function renderNode(node, options, xmlMode) {
	switch (node.type) {
		case Root: return renderChildren(node.children, options, xmlMode);
		case Directive: return `<${node.data}>`;
		case Comment$1: return `<!--${node.data}-->`;
		case CDATA$1: return `<![CDATA[${node.children[0].data}]]>`;
		case Script:
		case Style:
		case Tag: return renderTag(node, options, xmlMode);
		case Text$1: {
			const element = node;
			const data = element.data || "";
			if ((options.encodeEntities ?? options.decodeEntities) !== false && !(!xmlMode && element.parent && unencodedElements.has(element.parent.name))) return xmlMode || options.encodeEntities !== "utf8" ? encodeXML(data) : escapeText(data);
			return data;
		}
	}
}
function renderTag(element, options, xmlMode) {
	if (xmlMode === "foreign") {
		element.name = elementNames.get(element.name) ?? element.name;
		if (element.parent && foreignModeIntegrationPoints.has(element.parent.name)) xmlMode = false;
	}
	if (!xmlMode && foreignElements.has(element.name)) xmlMode = "foreign";
	const { name, children } = element;
	const isVoid = !xmlMode && voidElements$1.has(name);
	let tag = `<${name}${formatAttributes(element.attribs, options, xmlMode)}`;
	if (children.length === 0 && (xmlMode ? options.selfClosingTags !== false : options.selfClosingTags && isVoid)) tag += xmlMode ? "/>" : " />";
	else {
		tag += ">";
		if (children.length > 0) tag += renderChildren(children, options, xmlMode);
		if (!isVoid) tag += `</${name}>`;
	}
	return tag;
}
function replaceQuotes(value) {
	return value.replaceAll("\"", "&quot;");
}
/**
* Serialize an element's attribute map to a string.
*
* Returns a string with a leading space before each attribute, or an
* empty string if there are no attributes. This convention lets the
* caller unconditionally concatenate the result onto the tag name.
* @param attributes
* @param options
* @param xmlMode
*/
function formatAttributes(attributes, options, xmlMode) {
	if (!attributes) return "";
	const encode = (options.encodeEntities ?? options.decodeEntities) === false ? replaceQuotes : xmlMode || options.encodeEntities !== "utf8" ? encodeXML : escapeAttribute;
	const isForeign = xmlMode === "foreign";
	const showEmpty = !!(options.emptyAttrs ?? xmlMode);
	let result = "";
	for (const key in attributes) {
		if (!Object.hasOwn(attributes, key)) continue;
		const value = attributes[key];
		const k = isForeign ? attributeNames.get(key) ?? key : key;
		result += !showEmpty && (value == null || value === "") ? ` ${k}` : ` ${k}="${encode(value == null ? "" : String(value))}"`;
	}
	return result;
}
//#endregion
//#region node_modules/domutils/dist/stringify.js
/**
* @category Stringify
* @deprecated Use the `dom-serializer` module directly.
* @param node Node to get the outer HTML of.
* @param options Options for serialization.
* @returns `node`'s outer HTML.
*/
function getOuterHTML(node, options) {
	return render(node, options);
}
/**
* @category Stringify
* @deprecated Use the `dom-serializer` module directly.
* @param node Node to get the inner HTML of.
* @param options Options for serialization.
* @returns `node`'s inner HTML.
*/
function getInnerHTML(node, options) {
	return hasChildren(node) ? node.children.map((node) => getOuterHTML(node, options)).join("") : "";
}
/**
* Get a node's inner text. Same as `textContent`, but inserts newlines for `<br>` tags. Ignores comments.
*
* @category Stringify
* @deprecated Use `textContent` instead.
* @param node Node to get the inner text of.
* @returns `node`'s inner text.
*/
function getText(node) {
	if (Array.isArray(node)) return node.map(getText).join("");
	if (isTag(node)) return node.name === "br" ? "\n" : getText(node.children);
	if (isCDATA(node)) return getText(node.children);
	if (isText(node)) return node.data;
	return "";
}
/**
* Get a node's text content. Ignores comments.
*
* @category Stringify
* @param node Node to get the text content of.
* @returns `node`'s text content.
* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent}
*/
function textContent(node) {
	if (Array.isArray(node)) return node.map(textContent).join("");
	if (hasChildren(node) && !isComment(node)) return textContent(node.children);
	if (isText(node)) return node.data;
	return "";
}
/**
* Get a node's inner text, ignoring `<script>` and `<style>` tags. Ignores comments.
*
* @category Stringify
* @param node Node to get the inner text of.
* @returns `node`'s inner text.
* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/innerText}
*/
function innerText(node) {
	if (Array.isArray(node)) return node.map(innerText).join("");
	if (hasChildren(node) && (node.type === ElementType.Tag || isCDATA(node))) return innerText(node.children);
	if (isText(node)) return node.data;
	return "";
}
//#endregion
//#region node_modules/domutils/dist/feeds.js
/**
* Get the feed object from the root of a DOM tree.
*
* @category Feeds
* @param document The DOM to extract the feed from.
* @returns The feed.
*/
function getFeed(document) {
	const feedRoot = getOneElement(isValidFeed, document);
	return feedRoot ? feedRoot.name === "feed" ? getAtomFeed(feedRoot) : getRssFeed(feedRoot) : null;
}
/**
* Parse an Atom feed.
*
* @param feedRoot The root of the feed.
* @returns The parsed feed.
*/
function getAtomFeed(feedRoot) {
	const childs = feedRoot.children;
	const feed = {
		type: "atom",
		items: getElementsByTagName("entry", childs).map((item) => {
			const { children } = item;
			const entry = { media: getMediaElements(children) };
			addConditionally(entry, "id", "id", children);
			addConditionally(entry, "title", "title", children);
			const href = getOneElement("link", children)?.attribs["href"];
			if (href) entry.link = href;
			const description = fetch$1("summary", children) || fetch$1("content", children);
			if (description) entry.description = description;
			const pubDate = fetch$1("updated", children);
			if (pubDate) entry.pubDate = new Date(pubDate);
			return entry;
		})
	};
	addConditionally(feed, "id", "id", childs);
	addConditionally(feed, "title", "title", childs);
	const href = getOneElement("link", childs)?.attribs["href"];
	if (href) feed.link = href;
	addConditionally(feed, "description", "subtitle", childs);
	const updated = fetch$1("updated", childs);
	if (updated) feed.updated = new Date(updated);
	addConditionally(feed, "author", "email", childs, true);
	return feed;
}
/**
* Parse a RSS feed.
*
* @param feedRoot The root of the feed.
* @returns The parsed feed.
*/
function getRssFeed(feedRoot) {
	const childs = getOneElement("channel", feedRoot.children)?.children ?? [];
	const feed = {
		type: feedRoot.name.substr(0, 3),
		id: "",
		items: getElementsByTagName("item", feedRoot.children).map((item) => {
			const { children } = item;
			const entry = { media: getMediaElements(children) };
			addConditionally(entry, "id", "guid", children);
			addConditionally(entry, "title", "title", children);
			addConditionally(entry, "link", "link", children);
			addConditionally(entry, "description", "description", children);
			const pubDate = fetch$1("pubDate", children) || fetch$1("dc:date", children);
			if (pubDate) entry.pubDate = new Date(pubDate);
			return entry;
		})
	};
	addConditionally(feed, "title", "title", childs);
	addConditionally(feed, "link", "link", childs);
	addConditionally(feed, "description", "description", childs);
	const updated = fetch$1("lastBuildDate", childs);
	if (updated) feed.updated = new Date(updated);
	addConditionally(feed, "author", "managingEditor", childs, true);
	return feed;
}
var MEDIA_KEYS_STRING = [
	"url",
	"type",
	"lang"
];
var MEDIA_KEYS_INT = [
	"fileSize",
	"bitrate",
	"framerate",
	"samplingrate",
	"channels",
	"duration",
	"height",
	"width"
];
/**
* Get all media elements of a feed item.
*
* @param where Nodes to search in.
* @returns Media elements.
*/
function getMediaElements(where) {
	return getElementsByTagName("media:content", where).map((element) => {
		const { attribs } = element;
		const media = {
			medium: attribs["medium"],
			isDefault: !!attribs["isDefault"]
		};
		for (const attrib of MEDIA_KEYS_STRING) if (attribs[attrib]) media[attrib] = attribs[attrib];
		for (const attrib of MEDIA_KEYS_INT) if (attribs[attrib]) media[attrib] = Number.parseInt(attribs[attrib], 10);
		if (attribs["expression"]) media.expression = attribs["expression"];
		return media;
	});
}
/**
* Get one element by tag name.
*
* @param tagName Tag name to look for
* @param node Node to search in
* @returns The element or null
*/
function getOneElement(tagName, node) {
	return getElementsByTagName(tagName, node, true, 1)[0];
}
/**
* Get the text content of an element with a certain tag name.
*
* @param tagName Tag name to look for.
* @param where Node to search in.
* @param recurse Whether to recurse into child nodes.
* @returns The text content of the element.
*/
function fetch$1(tagName, where, recurse = false) {
	return textContent(getElementsByTagName(tagName, where, recurse, 1)).trim();
}
/**
* Adds a property to an object if it has a value.
*
* @param object Object to be extended.
* @param property Property name.
* @param tagName Tag name that contains the conditionally added property.
* @param where Element to search for the property.
* @param recurse Whether to recurse into child nodes.
*/
function addConditionally(object, property, tagName, where, recurse = false) {
	const value = fetch$1(tagName, where, recurse);
	if (value) object[property] = value;
}
/**
* Checks if an element is a feed root node.
*
* @param value The name of the element to check.
* @returns Whether an element is a feed root node.
*/
function isValidFeed(value) {
	return value === "rss" || value === "feed" || value === "rdf:RDF";
}
//#endregion
//#region node_modules/domutils/dist/helpers.js
/**
* Given an array of nodes, remove any member that is contained by another
* member.
*
* @category Helpers
* @param nodes Nodes to filter.
* @returns Remaining nodes that aren't contained by other nodes.
*/
function removeSubsets(nodes) {
	let index = nodes.length;
	while (--index >= 0) {
		const node = nodes[index];
		if (index > 0 && nodes.lastIndexOf(node, index - 1) >= 0) {
			nodes.splice(index, 1);
			continue;
		}
		for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) if (nodes.includes(ancestor)) {
			nodes.splice(index, 1);
			break;
		}
	}
	return nodes;
}
/**
* @category Helpers
* @see {@link http://dom.spec.whatwg.org/#dom-node-comparedocumentposition}
*/
var DocumentPosition;
(function(DocumentPosition) {
	DocumentPosition[DocumentPosition["DISCONNECTED"] = 1] = "DISCONNECTED";
	DocumentPosition[DocumentPosition["PRECEDING"] = 2] = "PRECEDING";
	DocumentPosition[DocumentPosition["FOLLOWING"] = 4] = "FOLLOWING";
	DocumentPosition[DocumentPosition["CONTAINS"] = 8] = "CONTAINS";
	DocumentPosition[DocumentPosition["CONTAINED_BY"] = 16] = "CONTAINED_BY";
})(DocumentPosition || (DocumentPosition = {}));
/**
* Compare the position of one node against another node in any other document,
* returning a bitmask with the values from {@link DocumentPosition}.
*
* Document order:
* > There is an ordering, document order, defined on all the nodes in the
* > document corresponding to the order in which the first character of the
* > XML representation of each node occurs in the XML representation of the
* > document after expansion of general entities. Thus, the document element
* > node will be the first node. Element nodes occur before their children.
* > Thus, document order orders element nodes in order of the occurrence of
* > their start-tag in the XML (after expansion of entities). The attribute
* > nodes of an element occur after the element and before its children. The
* > relative order of attribute nodes is implementation-dependent.
*
* Source:
* http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
*
* @category Helpers
* @param nodeA The first node to use in the comparison
* @param nodeB The second node to use in the comparison
* @returns A bitmask describing the input nodes' relative position.
*
* See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
* a description of these values.
*/
function compareDocumentPosition(nodeA, nodeB) {
	const aParents = [];
	const bParents = [];
	if (nodeA === nodeB) return 0;
	let current = hasChildren(nodeA) ? nodeA : nodeA.parent;
	while (current) {
		aParents.unshift(current);
		current = current.parent;
	}
	current = hasChildren(nodeB) ? nodeB : nodeB.parent;
	while (current) {
		bParents.unshift(current);
		current = current.parent;
	}
	const maxIndex = Math.min(aParents.length, bParents.length);
	let index = 0;
	while (index < maxIndex && aParents[index] === bParents[index]) index++;
	if (index === 0) return DocumentPosition.DISCONNECTED;
	const sharedParent = aParents[index - 1];
	const siblings = sharedParent.children;
	const aSibling = aParents[index];
	const bSibling = bParents[index];
	if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
		if (sharedParent === nodeB) return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
		return DocumentPosition.FOLLOWING;
	}
	if (sharedParent === nodeA) return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
	return DocumentPosition.PRECEDING;
}
/**
* Sort an array of nodes based on their relative position in the document,
* removing any duplicate nodes. If the array contains nodes that do not belong
* to the same document, sort order is unspecified.
*
* @category Helpers
* @param nodes Array of DOM nodes.
* @returns Collection of unique nodes, sorted in document order.
*/
function uniqueSort(nodes) {
	nodes = nodes.filter((node, index, array) => !array.includes(node, index + 1));
	nodes.sort((a, b) => {
		const relative = compareDocumentPosition(a, b);
		if (relative & DocumentPosition.PRECEDING) return -1;
		if (relative & DocumentPosition.FOLLOWING) return 1;
		return 0;
	});
	return nodes;
}
//#endregion
//#region node_modules/domutils/dist/manipulation.js
/**
* Remove an element from the dom
*
* @category Manipulation
* @param element The element to be removed.
*/
function removeElement(element) {
	if (element.prev) element.prev.next = element.next;
	if (element.next) element.next.prev = element.prev;
	if (element.parent) {
		const childs = element.parent.children;
		const childsIndex = childs.lastIndexOf(element);
		if (childsIndex !== -1) childs.splice(childsIndex, 1);
	}
	element.next = null;
	element.prev = null;
	element.parent = null;
}
/**
* Replace an element in the dom
*
* @category Manipulation
* @param element The element to be replaced.
* @param replacement The element to be added
*/
function replaceElement(element, replacement) {
	replacement.prev = element.prev;
	if (replacement.prev) replacement.prev.next = replacement;
	replacement.next = element.next;
	if (replacement.next) replacement.next.prev = replacement;
	replacement.parent = element.parent;
	if (replacement.parent) {
		const { children } = replacement.parent;
		const elementIndex = children.lastIndexOf(element);
		if (elementIndex === -1) return;
		children[elementIndex] = replacement;
		element.parent = null;
	}
}
/**
* Append a child to an element.
*
* @category Manipulation
* @param parent The element to append to.
* @param child The element to be added as a child.
*/
function appendChild(parent, child) {
	removeElement(child);
	child.next = null;
	child.parent = parent;
	if (parent.children.push(child) > 1) {
		const sibling = parent.children[parent.children.length - 2];
		sibling.next = child;
		child.prev = sibling;
	} else child.prev = null;
}
/**
* Append an element after another.
*
* @category Manipulation
* @param element The element to append after.
* @param next The element be added.
*/
function append(element, next) {
	removeElement(next);
	const { parent } = element;
	const currentNext = element.next;
	next.next = currentNext;
	next.prev = element;
	element.next = next;
	next.parent = parent;
	if (currentNext) {
		currentNext.prev = next;
		if (parent) {
			const childs = parent.children;
			childs.splice(childs.lastIndexOf(currentNext), 0, next);
		}
	} else if (parent) parent.children.push(next);
}
/**
* Prepend a child to an element.
*
* @category Manipulation
* @param parent The element to prepend before.
* @param child The element to be added as a child.
*/
function prependChild(parent, child) {
	removeElement(child);
	child.parent = parent;
	child.prev = null;
	if (parent.children.unshift(child) === 1) child.next = null;
	else {
		const sibling = parent.children[1];
		sibling.prev = child;
		child.next = sibling;
	}
}
/**
* Prepend an element before another.
*
* @category Manipulation
* @param element The element to prepend before.
* @param previous The element to be added.
*/
function prepend(element, previous) {
	removeElement(previous);
	const { parent } = element;
	if (parent) {
		const childs = parent.children;
		childs.splice(childs.indexOf(element), 0, previous);
	}
	if (element.prev) element.prev.next = previous;
	previous.parent = parent;
	previous.prev = element.prev;
	previous.next = element;
	element.prev = previous;
}
//#endregion
//#region node_modules/domutils/dist/traversal.js
/**
* Get a node's children.
*
* @category Traversal
* @param element Node to get the children of.
* @returns `element`'s children, or an empty array.
*/
function getChildren(element) {
	return hasChildren(element) ? element.children : [];
}
function getParent(element) {
	return element.parent || null;
}
/**
* Gets an elements siblings, including the element itself.
*
* Attempts to get the children through the element's parent first. If we don't
* have a parent (the element is a root node), we walk the element's `prev` &
* `next` to get all remaining nodes.
*
* @category Traversal
* @param element Element to get the siblings of.
* @returns `element`'s siblings, including `element`.
*/
function getSiblings(element) {
	const parent = getParent(element);
	if (parent != null) return getChildren(parent);
	const siblings = [element];
	let { prev, next } = element;
	while (prev != null) {
		siblings.unshift(prev);
		({prev} = prev);
	}
	while (next != null) {
		siblings.push(next);
		({next} = next);
	}
	return siblings;
}
/**
* Gets an attribute from an element.
*
* @category Traversal
* @param element Element to check.
* @param name Attribute name to retrieve.
* @returns The element's attribute value, or `undefined`.
*/
function getAttributeValue(element, name) {
	const { attribs } = element;
	return attribs?.[name];
}
/**
* Checks whether an element has an attribute.
*
* @category Traversal
* @param element Element to check.
* @param name Attribute name to look for.
* @returns Returns whether `element` has the attribute `name`.
*/
function hasAttrib(element, name) {
	const { attribs } = element;
	return attribs != null && Object.hasOwn(attribs, name) && attribs[name] != null;
}
/**
* Get the tag name of an element.
*
* @category Traversal
* @param element The element to get the name for.
* @returns The tag name of `element`.
*/
function getName(element) {
	return element.name;
}
/**
* Returns the next element sibling of a node.
*
* @category Traversal
* @param element The element to get the next sibling of.
* @returns `element`'s next sibling that is a tag, or `null` if there is no next
* sibling.
*/
function nextElementSibling(element) {
	let { next } = element;
	while (next !== null && !isTag(next)) ({next} = next);
	return next;
}
/**
* Returns the previous element sibling of a node.
*
* @category Traversal
* @param element The element to get the previous sibling of.
* @returns `element`'s previous sibling that is a tag, or `null` if there is no
* previous sibling.
*/
function prevElementSibling(element) {
	let { prev } = element;
	while (prev !== null && !isTag(prev)) ({prev} = prev);
	return prev;
}
//#endregion
//#region node_modules/domutils/dist/index.js
var dist_exports = /* @__PURE__ */ __exportAll({
	DocumentPosition: () => DocumentPosition,
	append: () => append,
	appendChild: () => appendChild,
	compareDocumentPosition: () => compareDocumentPosition,
	existsOne: () => existsOne,
	filter: () => filter,
	find: () => find,
	findAll: () => findAll$1,
	findOne: () => findOne$1,
	getAttributeValue: () => getAttributeValue,
	getChildren: () => getChildren,
	getElementById: () => getElementById,
	getElements: () => getElements,
	getElementsByClassName: () => getElementsByClassName,
	getElementsByTagName: () => getElementsByTagName,
	getElementsByTagType: () => getElementsByTagType,
	getFeed: () => getFeed,
	getInnerHTML: () => getInnerHTML,
	getName: () => getName,
	getOuterHTML: () => getOuterHTML,
	getParent: () => getParent,
	getSiblings: () => getSiblings,
	getText: () => getText,
	hasAttrib: () => hasAttrib,
	innerText: () => innerText,
	nextElementSibling: () => nextElementSibling,
	prepend: () => prepend,
	prependChild: () => prependChild,
	prevElementSibling: () => prevElementSibling,
	removeElement: () => removeElement,
	removeSubsets: () => removeSubsets,
	replaceElement: () => replaceElement,
	testElement: () => testElement,
	textContent: () => textContent,
	uniqueSort: () => uniqueSort
});
//#endregion
//#region node_modules/css-select/dist/attributes.js
/**
* All reserved characters in a regex, used for escaping.
*
* Taken from XRegExp, (c) 2007-2020 Steven Levithan under the MIT license
* https://github.com/slevithan/xregexp/blob/95eeebeb8fac8754d54eafe2b4743661ac1cf028/src/xregexp.js#L794
*/
var reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;
var whitespaceRe = /\s/;
function escapeRegex(value) {
	return value.replace(reChars, "\\$&");
}
/**
* Attributes that are case-insensitive in HTML.
* @see https://html.spec.whatwg.org/multipage/semantics-other.html#case-sensitivity-of-selectors
*/
var caseInsensitiveAttributes = /* @__PURE__ */ new Set([
	"accept",
	"accept-charset",
	"align",
	"alink",
	"axis",
	"bgcolor",
	"charset",
	"checked",
	"clear",
	"codetype",
	"color",
	"compact",
	"declare",
	"defer",
	"dir",
	"direction",
	"disabled",
	"enctype",
	"face",
	"frame",
	"hreflang",
	"http-equiv",
	"lang",
	"language",
	"link",
	"media",
	"method",
	"multiple",
	"nohref",
	"noresize",
	"noshade",
	"nowrap",
	"readonly",
	"rel",
	"rev",
	"rules",
	"scope",
	"scrolling",
	"selected",
	"shape",
	"target",
	"text",
	"type",
	"valign",
	"valuetype",
	"vlink"
]);
function shouldIgnoreCase(selector, options) {
	return typeof selector.ignoreCase === "boolean" ? selector.ignoreCase : selector.ignoreCase === "quirks" ? !!options.quirksMode : !options.xmlMode && caseInsensitiveAttributes.has(selector.name);
}
/**
* Attribute selectors
*/
var attributeRules = {
	equals(next, data, options) {
		const { adapter } = options;
		const { name } = data;
		let { value } = data;
		if (shouldIgnoreCase(data, options)) {
			value = value.toLowerCase();
			return (element) => {
				const attribute = adapter.getAttributeValue(element, name);
				return attribute != null && attribute.length === value.length && attribute.toLowerCase() === value && next(element);
			};
		}
		return (element) => adapter.getAttributeValue(element, name) === value && next(element);
	},
	hyphen(next, data, options) {
		const { adapter } = options;
		const { name } = data;
		let { value } = data;
		const { length } = value;
		if (shouldIgnoreCase(data, options)) {
			value = value.toLowerCase();
			return function hyphenIC(element) {
				const attribute = adapter.getAttributeValue(element, name);
				return attribute != null && (attribute.length === length || attribute.charAt(length) === "-") && attribute.substr(0, length).toLowerCase() === value && next(element);
			};
		}
		return function hyphen(element) {
			const attribute = adapter.getAttributeValue(element, name);
			return attribute != null && (attribute.length === length || attribute.charAt(length) === "-") && attribute.substr(0, length) === value && next(element);
		};
	},
	element(next, data, options) {
		const { adapter } = options;
		const { name, value } = data;
		if (whitespaceRe.test(value)) return falseFunc;
		const regex = new RegExp(`(?:^|\\s)${escapeRegex(value)}(?:$|\\s)`, shouldIgnoreCase(data, options) ? "i" : "");
		return function element(node) {
			const attribute = adapter.getAttributeValue(node, name);
			return attribute != null && attribute.length >= value.length && regex.test(attribute) && next(node);
		};
	},
	exists(next, { name }, { adapter }) {
		return (element) => adapter.hasAttrib(element, name) && next(element);
	},
	start(next, data, options) {
		const { adapter } = options;
		const { name } = data;
		let { value } = data;
		const { length } = value;
		if (length === 0) return falseFunc;
		if (shouldIgnoreCase(data, options)) {
			value = value.toLowerCase();
			return (element) => {
				const attribute = adapter.getAttributeValue(element, name);
				return attribute != null && attribute.length >= length && attribute.substr(0, length).toLowerCase() === value && next(element);
			};
		}
		return (element) => !!adapter.getAttributeValue(element, name)?.startsWith(value) && next(element);
	},
	end(next, data, options) {
		const { adapter } = options;
		const { name } = data;
		let { value } = data;
		const length = -value.length;
		if (length === 0) return falseFunc;
		if (shouldIgnoreCase(data, options)) {
			value = value.toLowerCase();
			return (element) => adapter.getAttributeValue(element, name)?.substr(length).toLowerCase() === value && next(element);
		}
		return (element) => !!adapter.getAttributeValue(element, name)?.endsWith(value) && next(element);
	},
	any(next, data, options) {
		const { adapter } = options;
		const { name, value } = data;
		if (value === "") return falseFunc;
		if (shouldIgnoreCase(data, options)) {
			const regex = new RegExp(escapeRegex(value), "i");
			return function anyIC(element) {
				const attribute = adapter.getAttributeValue(element, name);
				return attribute != null && attribute.length >= value.length && regex.test(attribute) && next(element);
			};
		}
		return (element) => !!adapter.getAttributeValue(element, name)?.includes(value) && next(element);
	},
	not(next, data, options) {
		const { adapter } = options;
		const { name } = data;
		let { value } = data;
		if (value === "") return (element) => !!adapter.getAttributeValue(element, name) && next(element);
		if (shouldIgnoreCase(data, options)) {
			value = value.toLowerCase();
			return (element) => {
				const attribute = adapter.getAttributeValue(element, name);
				return (attribute == null || attribute.length !== value.length || attribute.toLowerCase() !== value) && next(element);
			};
		}
		return (element) => adapter.getAttributeValue(element, name) !== value && next(element);
	}
};
//#endregion
//#region node_modules/css-select/dist/helpers/querying.js
/**
* Find all elements matching the query. If not in XML mode, the query will ignore
* the contents of `<template>` elements.
* @param query - Function that returns true if the element matches the query.
* @param nodes - Nodes to query. If a node is an element, its children will be queried.
* @param options - Options for querying the document.
* @returns All matching elements.
*/
function findAll(query, nodes, options) {
	const { adapter, xmlMode = false } = options;
	const result = [];
	/** Stack of the arrays we are looking at. */
	const nodeStack = [nodes];
	/** Stack of the indices within the arrays. */
	const indexStack = [0];
	for (;;) {
		if (indexStack[0] >= nodeStack[0].length) {
			if (nodeStack.length === 1) return result;
			nodeStack.shift();
			indexStack.shift();
			continue;
		}
		const element = nodeStack[0][indexStack[0]++];
		if (!adapter.isTag(element)) continue;
		if (query(element)) result.push(element);
		if (xmlMode || adapter.getName(element) !== "template") {
			const children = adapter.getChildren(element);
			if (children.length > 0) {
				nodeStack.unshift(children);
				indexStack.unshift(0);
			}
		}
	}
}
/**
* Find the first element matching the query. If not in XML mode, the query will ignore
* the contents of `<template>` elements.
* @param query - Function that returns true if the element matches the query.
* @param nodes - Nodes to query. If a node is an element, its children will be queried.
* @param options - Options for querying the document.
* @returns The first matching element, or null if there was no match.
*/
function findOne(query, nodes, options) {
	const { adapter, xmlMode = false } = options;
	/** Stack of the arrays we are looking at. */
	const nodeStack = [nodes];
	/** Stack of the indices within the arrays. */
	const indexStack = [0];
	for (;;) {
		if (indexStack[0] >= nodeStack[0].length) {
			if (nodeStack.length === 1) return null;
			nodeStack.shift();
			indexStack.shift();
			continue;
		}
		const element = nodeStack[0][indexStack[0]++];
		if (!adapter.isTag(element)) continue;
		if (query(element)) return element;
		if (xmlMode || adapter.getName(element) !== "template") {
			const children = adapter.getChildren(element);
			if (children.length > 0) {
				nodeStack.unshift(children);
				indexStack.unshift(0);
			}
		}
	}
}
/**
* Get all element siblings after the provided node.
* @param element Element candidate being tested.
* @param adapter Adapter implementation used for DOM operations.
*/
function getNextSiblings(element, adapter) {
	const siblings = adapter.getSiblings(element);
	if (siblings.length <= 1) return [];
	const elementIndex = siblings.indexOf(element);
	if (elementIndex === -1 || elementIndex === siblings.length - 1) return [];
	return siblings.slice(elementIndex + 1).filter(adapter.isTag);
}
/**
* Get the parent element of a node.
* @param node Node to inspect.
* @param adapter Adapter implementation used for DOM operations.
*/
function getElementParent(node, adapter) {
	const parent = adapter.getParent(node);
	return parent != null && adapter.isTag(parent) ? parent : null;
}
//#endregion
//#region node_modules/css-select/dist/pseudo-selectors/aliases.js
/**
* Only text controls can be made read-only, since for other controls (such
* as checkboxes and buttons) there is no useful distinction between being
* read-only and being disabled.
* @see {@link https://html.spec.whatwg.org/multipage/input.html#attr-input-readonly}
*/
var textControl = "input:is([type=text i],[type=search i],[type=url i],[type=tel i],[type=email i],[type=password i],[type=date i],[type=month i],[type=week i],[type=time i],[type=datetime-local i],[type=number i])";
/**
* Aliases are pseudos that are expressed as selectors.
*/
var aliases = {
	"any-link": ":is(a, area, link)[href]",
	link: ":any-link:not(:visited)",
	disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
	enabled: ":is(button, input, select, textarea, optgroup, option, fieldset):not(:disabled)",
	checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], :selected)",
	required: ":is(input, select, textarea)[required]",
	optional: ":is(input, select, textarea):not([required])",
	"read-only": `[readonly]:is(textarea, ${textControl})`,
	"read-write": `:not([readonly]):is(textarea, ${textControl})`,
	/**
	* `:selected` matches option elements that have the `selected` attribute,
	* or are the first option element in a select element that does not have
	* the `multiple` attribute and does not have any option elements with the
	* `selected` attribute.
	* @see https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
	*/
	selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
	checkbox: "[type=checkbox]",
	file: "[type=file]",
	password: "[type=password]",
	radio: "[type=radio]",
	reset: "[type=reset]",
	image: "[type=image]",
	submit: "[type=submit]",
	parent: ":not(:empty)",
	header: ":is(h1, h2, h3, h4, h5, h6)",
	button: ":is(button, input[type=button])",
	input: ":is(input, textarea, select, button)",
	text: "input:is(:not([type!='']), [type=text])"
};
//#endregion
//#region node_modules/nth-check/dist/compile.js
/**
* Returns a function that checks if an elements index matches the given rule
* highly optimized to return the fastest solution.
* @param parsed A tuple [a, b], as returned by `parse`.
* @returns A highly optimized function that returns whether an index matches the nth-check.
* @example
*
* ```js
* const check = nthCheck.compile([2, 3]);
*
* check(0); // `false`
* check(1); // `false`
* check(2); // `true`
* check(3); // `false`
* check(4); // `true`
* check(5); // `false`
* check(6); // `true`
* ```
*/
function compile(parsed) {
	const a = parsed[0];
	const b = parsed[1] - 1;
	if (b < 0 && a <= 0) return falseFunc;
	if (a === -1) return (index) => index <= b;
	if (a === 0) return (index) => index === b;
	if (a === 1) return b < 0 ? trueFunc : (index) => index >= b;
	const absA = Math.abs(a);
	const bModulo = (b % absA + absA) % absA;
	return a > 1 ? (index) => index >= b && index % absA === bModulo : (index) => index <= b && index % absA === bModulo;
}
//#endregion
//#region node_modules/nth-check/dist/parse.js
var whitespace = /* @__PURE__ */ new Set([
	9,
	10,
	12,
	13,
	32
]);
var ZERO = "0".charCodeAt(0);
var NINE = "9".charCodeAt(0);
/**
* Parses an expression.
* @param formula CSS nth-formula to parse.
* @throws {Error} An `Error` if parsing fails.
* @returns An array containing the integer step size and the integer offset of the nth rule.
* @example nthCheck.parse("2n+3"); // returns [2, 3]
*/
function parse(formula) {
	formula = formula.trim().toLowerCase();
	switch (formula) {
		case "even": return [2, 0];
		case "odd": return [2, 1];
	}
	let index = 0;
	let a = 0;
	let sign = readSign();
	let number = readNumber();
	if (index < formula.length && formula.charAt(index) === "n") {
		index++;
		a = sign * (number ?? 1);
		skipWhitespace();
		if (index < formula.length) {
			sign = readSign();
			skipWhitespace();
			number = readNumber();
		} else sign = number = 0;
	}
	if (number === null || index < formula.length) throw new Error(`n-th rule couldn't be parsed ('${formula}')`);
	return [a, sign * number];
	function readSign() {
		switch (formula.charAt(index)) {
			case "-":
				index++;
				return -1;
			case "+": index++;
		}
		return 1;
	}
	function readNumber() {
		const start = index;
		let value = 0;
		while (index < formula.length && formula.charCodeAt(index) >= ZERO && formula.charCodeAt(index) <= NINE) {
			value = value * 10 + (formula.charCodeAt(index) - ZERO);
			index++;
		}
		return index === start ? null : value;
	}
	function skipWhitespace() {
		while (index < formula.length && whitespace.has(formula.charCodeAt(index))) index++;
	}
}
//#endregion
//#region node_modules/nth-check/dist/index.js
/**
* Parses and compiles a formula to a highly optimized function.
* Combination of {@link parse} and {@link compile}.
*
* If the formula doesn't match any elements,
* it returns [`boolbase`](https://github.com/fb55/boolbase)'s `falseFunc`.
* Otherwise, a function accepting an _index_ is returned, which returns
* whether or not the passed _index_ matches the formula.
*
* Note: The nth-rule starts counting at `1`, the returned function at `0`.
* @param formula The formula to compile.
* @example
* const check = nthCheck("2n+3");
*
* check(0); // `false`
* check(1); // `false`
* check(2); // `true`
* check(3); // `false`
* check(4); // `true`
* check(5); // `false`
* check(6); // `true`
*/
function nthCheck(formula) {
	return compile(parse(formula));
}
//#endregion
//#region node_modules/css-select/dist/helpers/cache.js
/**
* Some selectors such as `:contains` and (non-relative) `:has` will only be
* able to match elements if their parents match the selector (as they contain
* a subset of the elements that the parent contains).
*
* This function wraps the given `matches` function in a function that caches
* the results of the parent elements, so that the `matches` function only
* needs to be called once for each subtree.
* @param next Matcher to run after this matcher succeeds.
* @param options Configuration object for cache behavior.
* @param options.adapter Adapter implementation used for DOM access.
* @param options.cacheResults Whether results should be memoized by input root.
* @param matches Compiled matcher function to wrap with caching.
*/
function cacheParentResults(next, { adapter, cacheResults }, matches) {
	if (cacheResults === false || typeof WeakMap === "undefined") return (element) => next(element) && matches(element);
	const resultCache = /* @__PURE__ */ new WeakMap();
	function addResultToCache(element) {
		const result = matches(element);
		resultCache.set(element, result);
		return result;
	}
	return function cachedMatcher(element) {
		if (!next(element)) return false;
		if (resultCache.has(element)) return resultCache.get(element) ?? false;
		let node = element;
		do {
			const parent = getElementParent(node, adapter);
			if (parent === null) return addResultToCache(element);
			node = parent;
		} while (!resultCache.has(node));
		return resultCache.get(node) ? addResultToCache(element) : false;
	};
}
//#endregion
//#region node_modules/css-select/dist/helpers/options.js
/**
* Create a copy of options, omitting `context` and `rootFunc`.
*
* This is used when compiling nested selectors (e.g. inside `:is`, `:not`,
* `:nth-child(… of S)`) so that the parent compilation state doesn't leak.
*/
function copyOptions(options) {
	const { context: _, rootFunc: __, ...copied } = options;
	return copied;
}
//#endregion
//#region node_modules/css-select/dist/pseudo-selectors/filters.js
/**
* RFC 4647 extended filtering with pre-split subtags.
* @param tag - Lowercased subtags of the element's language value.
* @param range - Lowercased subtags of the language range to match against.
*/
function extendedFilter(tag, range) {
	if (range[0] !== "*" && range[0] !== tag[0]) return false;
	let tagIndex = 1;
	for (let rangeIndex = 1; rangeIndex < range.length; rangeIndex++) {
		if (range[rangeIndex] === "*") continue;
		while (tagIndex < tag.length && tag[tagIndex] !== range[rangeIndex]) if (tag[tagIndex++].length <= 1) return false;
		if (tagIndex >= tag.length) return false;
		tagIndex++;
	}
	return true;
}
/** @see {@link https://www.w3.org/TR/selectors-4/#the-nth-child-pseudo} */
var nthOfRegex = /^(.+?)\s+of\s+(.+)$/is;
function compileNth(reverse, ofType) {
	return function nth(next, rule, options, context, compileToken) {
		const { adapter, equals } = options;
		const ofMatch = ofType ? null : rule.match(nthOfRegex);
		const nthCheck$1 = nthCheck(ofMatch ? ofMatch[1].trim() : rule);
		if (nthCheck$1 === falseFunc) return falseFunc;
		const ofSelector = ofMatch && compileToken ? compileToken(parse$1(ofMatch[2].trim()), copyOptions(options), context) : void 0;
		if (ofSelector === falseFunc) return falseFunc;
		if (nthCheck$1 === trueFunc && !ofSelector) return (element) => getElementParent(element, adapter) !== null && next(element);
		const shouldCount = ofSelector ? (_element, sibling) => ofSelector(sibling) : ofType ? (element, sibling) => adapter.getName(sibling) === adapter.getName(element) : trueFunc;
		if (reverse) return function nthLast(element) {
			if (ofSelector && !ofSelector(element)) return false;
			const siblings = adapter.getSiblings(element);
			let pos = 0;
			for (let index = siblings.length - 1; index >= 0; index--) {
				const sibling = siblings[index];
				if (equals(element, sibling)) break;
				if (adapter.isTag(sibling) && shouldCount(element, sibling)) pos++;
			}
			return nthCheck$1(pos) && next(element);
		};
		return function nth(element) {
			if (ofSelector && !ofSelector(element)) return false;
			const siblings = adapter.getSiblings(element);
			let pos = 0;
			for (const sibling of siblings) {
				if (equals(element, sibling)) break;
				if (adapter.isTag(sibling) && shouldCount(element, sibling)) pos++;
			}
			return nthCheck$1(pos) && next(element);
		};
	};
}
/**
* Pre-compiled pseudo filters.
*/
var filters = {
	contains(next, text, options) {
		const { getText } = options.adapter;
		return cacheParentResults(next, options, (element) => getText(element).includes(text));
	},
	icontains(next, text, options) {
		const itext = text.toLowerCase();
		const { getText } = options.adapter;
		return cacheParentResults(next, options, (element) => getText(element).toLowerCase().includes(itext));
	},
	"nth-child": compileNth(false, false),
	"nth-last-child": compileNth(true, false),
	"nth-of-type": compileNth(false, true),
	"nth-last-of-type": compileNth(true, true),
	root(next, _rule, { adapter }) {
		return (element) => getElementParent(element, adapter) === null && next(element);
	},
	scope(next, rule, options, context) {
		const { equals } = options;
		if (!context || context.length === 0) return filters["root"](next, rule, options);
		if (context.length === 1) return (element) => equals(context[0], element) && next(element);
		return (element) => context.includes(element) && next(element);
	},
	lang(next, code, { adapter }) {
		const ranges = code.split(",").map((r) => r.trim()).filter((r) => r.length > 0).map((r) => r.replace(/^['"]|['"]$/g, "").toLowerCase().split("-"));
		return function lang(element) {
			let node = element;
			while (node != null) {
				const value = adapter.getAttributeValue(node, "xml:lang") ?? adapter.getAttributeValue(node, "lang");
				if (value != null) {
					if (!value) return ranges.some((r) => r[0] === "") && next(element);
					const tag = value.toLowerCase().split("-");
					return ranges.some((r) => extendedFilter(tag, r)) && next(element);
				}
				const parent = adapter.getParent(node);
				node = parent != null && adapter.isTag(parent) ? parent : null;
			}
			return ranges.some((r) => r[0] === "") && next(element);
		};
	},
	hover: dynamicStatePseudo("isHovered"),
	visited: dynamicStatePseudo("isVisited"),
	active: dynamicStatePseudo("isActive")
};
/**
* Dynamic state pseudos. These depend on optional Adapter methods.
* @param name The name of the adapter method to call.
* @returns Pseudo for the `filters` object.
*/
function dynamicStatePseudo(name) {
	return function dynamicPseudo(next, _rule, { adapter }) {
		const filterFunction = adapter[name];
		if (typeof filterFunction !== "function") return falseFunc;
		return function active(element) {
			return filterFunction(element) && next(element);
		};
	};
}
//#endregion
//#region node_modules/css-select/dist/pseudo-selectors/pseudos.js
/**
* CSS limits the characters considered as whitespace to space, tab & line
* feed. We add carriage returns as htmlparser2 doesn't normalize them to
* line feeds.
* @see {@link https://www.w3.org/TR/css-text-3/#white-space}
*/
var isDocumentWhiteSpace = /^[ \t\r\n]*$/;
/** Runtime pseudo selector implementations. */
var pseudos = {
	empty(element, { adapter }) {
		const children = adapter.getChildren(element);
		return children.every((element) => !adapter.isTag(element)) && children.every((element) => isDocumentWhiteSpace.test(adapter.getText(element)));
	},
	"first-child"(element, { adapter, equals }) {
		if (adapter.prevElementSibling) return adapter.prevElementSibling(element) == null;
		const firstChild = adapter.getSiblings(element).find((sibling) => adapter.isTag(sibling));
		return firstChild != null && equals(element, firstChild);
	},
	"last-child"(element, { adapter, equals }) {
		const siblings = adapter.getSiblings(element);
		for (let index = siblings.length - 1; index >= 0; index--) {
			if (equals(element, siblings[index])) return true;
			if (adapter.isTag(siblings[index])) break;
		}
		return false;
	},
	"first-of-type"(element, { adapter, equals }) {
		const siblings = adapter.getSiblings(element);
		const elementName = adapter.getName(element);
		for (const currentSibling of siblings) {
			if (equals(element, currentSibling)) return true;
			if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elementName) break;
		}
		return false;
	},
	"last-of-type"(element, { adapter, equals }) {
		const siblings = adapter.getSiblings(element);
		const elementName = adapter.getName(element);
		for (let index = siblings.length - 1; index >= 0; index--) {
			const currentSibling = siblings[index];
			if (equals(element, currentSibling)) return true;
			if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elementName) break;
		}
		return false;
	},
	"only-of-type"(element, { adapter, equals }) {
		const elementName = adapter.getName(element);
		return adapter.getSiblings(element).every((sibling) => equals(element, sibling) || !adapter.isTag(sibling) || adapter.getName(sibling) !== elementName);
	},
	"only-child"(element, { adapter, equals }) {
		return adapter.getSiblings(element).every((sibling) => equals(element, sibling) || !adapter.isTag(sibling));
	}
};
/**
* Validate pseudo selector argument arity.
* @param pseudoClassCondition Pseudo-function implementation to wrap.
* @param name Name of the pseudo selector.
* @param subselect Subselector passed to the pseudo-function.
* @param argumentIndex Index of the argument parser to apply.
*/
function verifyPseudoArguments(pseudoClassCondition, name, subselect, argumentIndex) {
	if (subselect === null) {
		if (pseudoClassCondition.length > argumentIndex) throw new Error(`Pseudo-class :${name} requires an argument`);
	} else if (pseudoClassCondition.length === argumentIndex) throw new Error(`Pseudo-class :${name} doesn't have any arguments`);
}
//#endregion
//#region node_modules/css-select/dist/helpers/selectors.js
/**
* Check whether a selector token performs traversal.
* @param token Selector token(s) to compile.
*/
function isTraversal(token) {
	return token.type === "_flexibleDescendant" || isTraversal$1(token);
}
/**
* Sort the parts of the passed selector, as there is potential for
* optimization (some types of selectors are faster than others).
* @param array Selector to sort
*/
function sortRules(array) {
	const ratings = array.map(getQuality);
	for (let index = 1; index < array.length; index++) {
		const procNew = ratings[index];
		if (procNew < 0) continue;
		for (let currentIndex = index; currentIndex > 0 && procNew < ratings[currentIndex - 1]; currentIndex--) {
			const token = array[currentIndex];
			array[currentIndex] = array[currentIndex - 1];
			array[currentIndex - 1] = token;
			ratings[currentIndex] = ratings[currentIndex - 1];
			ratings[currentIndex - 1] = procNew;
		}
	}
}
function getAttributeQuality(token) {
	switch (token.action) {
		case AttributeAction.Exists: return 10;
		case AttributeAction.Equals: return token.name === "id" ? 9 : 8;
		case AttributeAction.Not: return 7;
		case AttributeAction.Start: return 6;
		case AttributeAction.End: return 6;
		case AttributeAction.Any: return 5;
		case AttributeAction.Hyphen: return 4;
		case AttributeAction.Element: return 3;
	}
}
/**
* Determine the quality of the passed token. The higher the number, the
* faster the token is to execute.
* @param token Token to get the quality of.
* @returns The token's quality.
*/
function getQuality(token) {
	switch (token.type) {
		case SelectorType.Universal: return 50;
		case SelectorType.Tag: return 30;
		case SelectorType.Attribute: return Math.floor(getAttributeQuality(token) / (token.ignoreCase ? 2 : 1));
		case SelectorType.Pseudo: return token.data ? token.name === "has" || token.name === "contains" || token.name === "icontains" ? 0 : Array.isArray(token.data) ? Math.max(0, Math.min(...token.data.map((d) => Math.min(...d.map(getQuality))))) : 2 : 3;
		default: return -1;
	}
}
/**
* Check whether a token or nested token includes `:scope`.
* @param t Selector token under inspection.
*/
function includesScopePseudo(t) {
	return t.type === SelectorType.Pseudo && (t.name === "scope" || Array.isArray(t.data) && t.data.some((data) => data.some(includesScopePseudo)));
}
//#endregion
//#region node_modules/css-select/dist/pseudo-selectors/subselects.js
/** Used as a placeholder for :has. Will be replaced with the actual element. */
var PLACEHOLDER_ELEMENT = {};
/**
* Check if the selector has any properties that rely on the current element.
* If not, we can cache the result of the selector.
*
* We can't cache selectors that start with a traversal (e.g. `>`, `+`, `~`),
* or include a `:scope`.
* @param selector - The selector to check.
* @returns Whether the selector has any properties that rely on the current element.
*/
function hasDependsOnCurrentElement(selector) {
	return selector.some((sel) => sel.length > 0 && (isTraversal(sel[0]) || sel.some(includesScopePseudo)));
}
var is = (next, token, options, context, compileToken) => {
	const compiledToken = compileToken(token, copyOptions(options), context);
	return compiledToken === trueFunc ? next : compiledToken === falseFunc ? falseFunc : (element) => compiledToken(element) && next(element);
};
/** Pseudo selectors that compile nested selectors. */
var subselects = {
	is,
	/**
	* `:matches` and `:where` are aliases for `:is`.
	*/
	matches: is,
	where: is,
	not(next, token, options, context, compileToken) {
		const compiledToken = compileToken(token, copyOptions(options), context);
		return compiledToken === falseFunc ? next : compiledToken === trueFunc ? falseFunc : (element) => !compiledToken(element) && next(element);
	},
	has(next, subselect, options, _context, compileToken) {
		const { adapter } = options;
		const copiedOptions = copyOptions(options);
		copiedOptions.relativeSelector = true;
		const context = subselect.some((s) => s.some(isTraversal)) ? [PLACEHOLDER_ELEMENT] : void 0;
		const skipCache = hasDependsOnCurrentElement(subselect);
		const compiled = compileToken(subselect, copiedOptions, context);
		if (compiled === falseFunc) return falseFunc;
		if (context && compiled !== trueFunc) return skipCache ? (element) => {
			if (!next(element)) return false;
			context[0] = element;
			const childs = adapter.getChildren(element);
			return findOne(compiled, compiled.shouldTestNextSiblings ? [...childs, ...getNextSiblings(element, adapter)] : childs, options) !== null;
		} : cacheParentResults(next, options, (element) => {
			context[0] = element;
			return findOne(compiled, adapter.getChildren(element), options) !== null;
		});
		const hasOne = (element) => findOne(compiled, adapter.getChildren(element), options) !== null;
		return skipCache ? (element) => next(element) && hasOne(element) : cacheParentResults(next, options, hasOne);
	}
};
//#endregion
//#region node_modules/css-select/dist/pseudo-selectors/index.js
/**
* Compile a pseudo selector into an executable query function.
* @param next Matcher to run after this matcher succeeds.
* @param selector Selector used to match elements.
* @param options Options that control this operation.
* @param context Context nodes used to scope selector matching.
* @param compileToken Function used to compile nested selector tokens.
*/
function compilePseudoSelector(next, selector, options, context, compileToken) {
	const { name, data } = selector;
	if (Array.isArray(data)) {
		if (!(name in subselects)) throw new Error(`Unknown pseudo-class :${name}(${data})`);
		return subselects[name](next, data, options, context, compileToken);
	}
	const userPseudo = options.pseudos?.[name];
	const stringPseudo = typeof userPseudo === "string" ? userPseudo : aliases[name];
	if (typeof stringPseudo === "string") {
		if (data != null) throw new Error(`Pseudo ${name} doesn't have any arguments`);
		const alias = parse$1(stringPseudo);
		return subselects["is"](next, alias, options, context, compileToken);
	}
	if (typeof userPseudo === "function") {
		verifyPseudoArguments(userPseudo, name, data, 1);
		return (element) => userPseudo(element, data) && next(element);
	}
	if (name in filters) return filters[name](next, data, options, context, compileToken);
	if (name in pseudos) {
		const pseudo = pseudos[name];
		verifyPseudoArguments(pseudo, name, data, 2);
		return (element) => pseudo(element, options, data) && next(element);
	}
	throw new Error(`Unknown pseudo-class :${name}`);
}
//#endregion
//#region node_modules/css-select/dist/general.js
/**
* Compile a single selector token.
* @param next Matcher to run after this matcher succeeds.
* @param selector Selector used to match elements.
* @param options Options that control this operation.
* @param context Context nodes used to scope selector matching.
* @param compileToken Function used to compile nested selector tokens.
* @param hasExpensiveSubselector Whether the selector contains expensive subselectors.
*/
function compileGeneralSelector(next, selector, options, context, compileToken, hasExpensiveSubselector) {
	const { adapter, equals, cacheResults } = options;
	switch (selector.type) {
		case SelectorType.PseudoElement: throw new Error("Pseudo-elements are not supported by css-select");
		case SelectorType.ColumnCombinator: throw new Error("Column combinators are not yet supported by css-select");
		case SelectorType.Attribute:
			if (selector.namespace != null) throw new Error("Namespaced attributes are not yet supported by css-select");
			if (!options.xmlMode || options.lowerCaseAttributeNames) selector.name = selector.name.toLowerCase();
			return attributeRules[selector.action](next, selector, options);
		case SelectorType.Pseudo: return compilePseudoSelector(next, selector, options, context, compileToken);
		case SelectorType.Tag: {
			if (selector.namespace != null) throw new Error("Namespaced tag names are not yet supported by css-select");
			let { name } = selector;
			if (!options.xmlMode || options.lowerCaseTags) name = name.toLowerCase();
			return function tag(element) {
				return adapter.getName(element) === name && next(element);
			};
		}
		case SelectorType.Descendant: {
			if (!hasExpensiveSubselector || cacheResults === false || typeof WeakMap === "undefined") return function descendant(element) {
				let current = element;
				while (current = getElementParent(current, adapter)) if (next(current)) return true;
				return false;
			};
			const resultCache = /* @__PURE__ */ new WeakMap();
			return function cachedDescendant(element) {
				let current = element;
				let result;
				while (current = getElementParent(current, adapter)) {
					const cached = resultCache.get(current);
					if (cached === void 0) {
						result ??= { matches: false };
						result.matches = next(current);
						resultCache.set(current, result);
						if (result.matches) return true;
					} else {
						if (result) result.matches = cached.matches;
						return cached.matches;
					}
				}
				return false;
			};
		}
		case "_flexibleDescendant": return function flexibleDescendant(element) {
			let current = element;
			do {
				if (next(current)) return true;
				current = getElementParent(current, adapter);
			} while (current);
			return false;
		};
		case SelectorType.Parent: return function parent(element) {
			return adapter.getChildren(element).some((element) => adapter.isTag(element) && next(element));
		};
		case SelectorType.Child: return function child(element) {
			const parent = getElementParent(element, adapter);
			return parent !== null && next(parent);
		};
		case SelectorType.Sibling: return function sibling(element) {
			const siblings = adapter.getSiblings(element);
			for (const currentSibling of siblings) {
				if (equals(element, currentSibling)) break;
				if (adapter.isTag(currentSibling) && next(currentSibling)) return true;
			}
			return false;
		};
		case SelectorType.Adjacent:
			if (adapter.prevElementSibling) return function adjacent(element) {
				const previous = adapter.prevElementSibling(element);
				return previous != null && next(previous);
			};
			return function adjacent(element) {
				const siblings = adapter.getSiblings(element);
				let lastElement;
				for (const currentSibling of siblings) {
					if (equals(element, currentSibling)) break;
					if (adapter.isTag(currentSibling)) lastElement = currentSibling;
				}
				return !!lastElement && next(lastElement);
			};
		case SelectorType.Universal:
			if (selector.namespace != null && selector.namespace !== "*") throw new Error("Namespaced universal selectors are not yet supported by css-select");
			return next;
	}
}
//#endregion
//#region node_modules/css-select/dist/compile.js
var DESCENDANT_TOKEN = { type: SelectorType.Descendant };
var FLEXIBLE_DESCENDANT_TOKEN = { type: "_flexibleDescendant" };
var SCOPE_TOKEN = {
	type: SelectorType.Pseudo,
	name: "scope",
	data: null
};
function absolutize(token, { adapter }, context) {
	const hasContext = !!context?.every((element) => element === PLACEHOLDER_ELEMENT || adapter.isTag(element) && getElementParent(element, adapter) !== null);
	for (const t of token) {
		if (t.length > 0 && isTraversal(t[0]) && t[0].type !== SelectorType.Descendant) {} else if (hasContext && !t.some(includesScopePseudo)) t.unshift(DESCENDANT_TOKEN);
		else continue;
		t.unshift(SCOPE_TOKEN);
	}
}
/**
* Compile a parsed selector token into an executable query function.
* @param token Selector token(s) to compile.
* @param options Options that control this operation.
* @param compilationContext Compilation context for relative selector handling.
*/
function compileToken(token, options, compilationContext) {
	for (const rules of token) sortRules(rules);
	const { context = compilationContext, rootFunc: rootFunction = trueFunc } = options;
	const isArrayContext = Array.isArray(context);
	const finalContext = context && (Array.isArray(context) ? context : [context]);
	if (options.relativeSelector !== false) absolutize(token, options, finalContext);
	else if (token.some((t) => t.length > 0 && isTraversal(t[0]))) throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
	let shouldTestNextSiblings = false;
	let query = falseFunc;
	combineLoop: for (const rules of token) {
		if (rules.length >= 2) {
			const [first, second] = rules;
			if (first.type !== SelectorType.Pseudo || first.name !== "scope") {} else if (isArrayContext && second.type === SelectorType.Descendant) rules[1] = FLEXIBLE_DESCENDANT_TOKEN;
			else if (second.type === SelectorType.Adjacent || second.type === SelectorType.Sibling) shouldTestNextSiblings = true;
		}
		let next = rootFunction;
		let hasExpensiveSubselector = false;
		for (const rule of rules) {
			next = compileGeneralSelector(next, rule, options, finalContext, compileToken, hasExpensiveSubselector);
			if (getQuality(rule) === 0) hasExpensiveSubselector = true;
			if (next === falseFunc) continue combineLoop;
		}
		if (next === rootFunction) return rootFunction;
		query = query === falseFunc ? next : or(query, next);
	}
	query.shouldTestNextSiblings = shouldTestNextSiblings;
	return query;
}
function or(a, b) {
	return (element) => a(element) || b(element);
}
//#endregion
//#region node_modules/css-select/dist/index.js
var defaultEquals = (a, b) => a === b;
var defaultOptions = {
	adapter: {
		...dist_exports,
		isTag
	},
	equals: defaultEquals
};
function convertOptionFormats(options) {
	const finalOptions = options ?? defaultOptions;
	finalOptions.adapter ??= defaultOptions.adapter;
	finalOptions.equals ??= finalOptions.adapter?.equals ?? defaultEquals;
	return finalOptions;
}
/**
* Like `compile`, but does not add a check if elements are tags.
* @param selector Selector used to match elements.
* @param options Options that control this operation.
* @param context Context nodes used to scope selector matching.
*/
function _compileUnsafe(selector, options, context) {
	return compileToken(typeof selector === "string" ? parse$1(selector) : selector, convertOptionFormats(options), context);
}
function getSelectorFunction(searchFunction) {
	return function select(query, elements, options) {
		const convertedOptions = convertOptionFormats(options);
		if (typeof query !== "function") query = _compileUnsafe(query, convertedOptions, elements);
		const filteredElements = prepareContext(elements, convertedOptions.adapter, query.shouldTestNextSiblings);
		return searchFunction(query, filteredElements, convertedOptions);
	};
}
/**
* Normalize a query context and optionally include next siblings.
* @param elements Elements to test against sibling-dependent selectors.
* @param adapter Adapter implementation used for DOM operations.
* @param shouldTestNextSiblings Whether sibling combinators should include following siblings.
*/
function prepareContext(elements, adapter, shouldTestNextSiblings = false) {
	if (shouldTestNextSiblings) elements = appendNextSiblings(elements, adapter);
	return Array.isArray(elements) ? adapter.removeSubsets(elements) : adapter.getChildren(elements);
}
function appendNextSiblings(element, adapter) {
	const elements = Array.isArray(element) ? [...element] : [element];
	const elementsLength = elements.length;
	for (let index = 0; index < elementsLength; index++) {
		const nextSiblings = getNextSiblings(elements[index], adapter);
		elements.push(...nextSiblings);
	}
	return elements;
}
/**
* @template Node The generic Node type for the DOM adapter being used.
* @template ElementNode The Node type for elements for the DOM adapter being used.
* @param elems Elements to query. If it is an element, its children will be queried.
* @param query can be either a CSS selector string or a compiled query function.
* @param [options] options for querying the document.
* @see compile for supported selector queries.
* @returns All matching elements.
*/
var selectAll = getSelectorFunction((query, elements, options) => query === falseFunc || !elements || elements.length === 0 ? [] : findAll(query, elements, options));
/**
* @template Node The generic Node type for the DOM adapter being used.
* @template ElementNode The Node type for elements for the DOM adapter being used.
* @param elems Elements to query. If it is an element, its children will be queried.
* @param query can be either a CSS selector string or a compiled query function.
* @param [options] options for querying the document.
* @see compile for supported selector queries.
* @returns the first match, or null if there was no match.
*/
var selectOne = getSelectorFunction((query, elements, options) => query === falseFunc || !elements || elements.length === 0 ? null : findOne(query, elements, options));
//#endregion
//#region node_modules/htmlparser2/dist/Tokenizer.js
var CharCodes;
(function(CharCodes) {
	CharCodes[CharCodes["Tab"] = 9] = "Tab";
	CharCodes[CharCodes["NewLine"] = 10] = "NewLine";
	CharCodes[CharCodes["FormFeed"] = 12] = "FormFeed";
	CharCodes[CharCodes["CarriageReturn"] = 13] = "CarriageReturn";
	CharCodes[CharCodes["Space"] = 32] = "Space";
	CharCodes[CharCodes["ExclamationMark"] = 33] = "ExclamationMark";
	CharCodes[CharCodes["Number"] = 35] = "Number";
	CharCodes[CharCodes["Amp"] = 38] = "Amp";
	CharCodes[CharCodes["SingleQuote"] = 39] = "SingleQuote";
	CharCodes[CharCodes["DoubleQuote"] = 34] = "DoubleQuote";
	CharCodes[CharCodes["Dash"] = 45] = "Dash";
	CharCodes[CharCodes["Slash"] = 47] = "Slash";
	CharCodes[CharCodes["Zero"] = 48] = "Zero";
	CharCodes[CharCodes["Nine"] = 57] = "Nine";
	CharCodes[CharCodes["Semi"] = 59] = "Semi";
	CharCodes[CharCodes["Lt"] = 60] = "Lt";
	CharCodes[CharCodes["Eq"] = 61] = "Eq";
	CharCodes[CharCodes["Gt"] = 62] = "Gt";
	CharCodes[CharCodes["Questionmark"] = 63] = "Questionmark";
	CharCodes[CharCodes["UpperA"] = 65] = "UpperA";
	CharCodes[CharCodes["LowerA"] = 97] = "LowerA";
	CharCodes[CharCodes["UpperF"] = 70] = "UpperF";
	CharCodes[CharCodes["LowerF"] = 102] = "LowerF";
	CharCodes[CharCodes["UpperZ"] = 90] = "UpperZ";
	CharCodes[CharCodes["LowerZ"] = 122] = "LowerZ";
	CharCodes[CharCodes["LowerX"] = 120] = "LowerX";
	CharCodes[CharCodes["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
})(CharCodes || (CharCodes = {}));
/** All the states the tokenizer can be in. */
var State;
(function(State) {
	State[State["Text"] = 1] = "Text";
	State[State["BeforeTagName"] = 2] = "BeforeTagName";
	State[State["InTagName"] = 3] = "InTagName";
	State[State["InSelfClosingTag"] = 4] = "InSelfClosingTag";
	State[State["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
	State[State["InClosingTagName"] = 6] = "InClosingTagName";
	State[State["AfterClosingTagName"] = 7] = "AfterClosingTagName";
	State[State["BeforeAttributeName"] = 8] = "BeforeAttributeName";
	State[State["InAttributeName"] = 9] = "InAttributeName";
	State[State["AfterAttributeName"] = 10] = "AfterAttributeName";
	State[State["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
	State[State["InAttributeValueDq"] = 12] = "InAttributeValueDq";
	State[State["InAttributeValueSq"] = 13] = "InAttributeValueSq";
	State[State["InAttributeValueNq"] = 14] = "InAttributeValueNq";
	State[State["BeforeDeclaration"] = 15] = "BeforeDeclaration";
	State[State["InDeclaration"] = 16] = "InDeclaration";
	State[State["InProcessingInstruction"] = 17] = "InProcessingInstruction";
	State[State["BeforeComment"] = 18] = "BeforeComment";
	State[State["CDATASequence"] = 19] = "CDATASequence";
	State[State["DeclarationSequence"] = 20] = "DeclarationSequence";
	State[State["InSpecialComment"] = 21] = "InSpecialComment";
	State[State["InCommentLike"] = 22] = "InCommentLike";
	State[State["SpecialStartSequence"] = 23] = "SpecialStartSequence";
	State[State["InSpecialTag"] = 24] = "InSpecialTag";
	State[State["InPlainText"] = 25] = "InPlainText";
	State[State["InEntity"] = 26] = "InEntity";
})(State || (State = {}));
function isWhitespace(c) {
	return c === CharCodes.Space || c === CharCodes.NewLine || c === CharCodes.Tab || c === CharCodes.FormFeed || c === CharCodes.CarriageReturn;
}
function isEndOfTagSection(c) {
	return c === CharCodes.Slash || c === CharCodes.Gt || isWhitespace(c);
}
function isASCIIAlpha(c) {
	return c >= CharCodes.LowerA && c <= CharCodes.LowerZ || c >= CharCodes.UpperA && c <= CharCodes.UpperZ;
}
/**
* Quote style used for parsed attributes.
*/
var QuoteType;
(function(QuoteType) {
	QuoteType[QuoteType["NoValue"] = 0] = "NoValue";
	QuoteType[QuoteType["Unquoted"] = 1] = "Unquoted";
	QuoteType[QuoteType["Single"] = 2] = "Single";
	QuoteType[QuoteType["Double"] = 3] = "Double";
})(QuoteType || (QuoteType = {}));
/**
* Sequences used to match longer strings.
*
* We don't have `Script`, `Style`, or `Title` here. Instead, we re-use the *End
* sequences with an increased offset.
*/
var Sequences = {
	Empty: /* @__PURE__ */ new Uint8Array(0),
	Cdata: new Uint8Array([
		67,
		68,
		65,
		84,
		65,
		91
	]),
	CdataEnd: new Uint8Array([
		93,
		93,
		62
	]),
	CommentEnd: new Uint8Array([
		45,
		45,
		33,
		62
	]),
	Doctype: new Uint8Array([
		100,
		111,
		99,
		116,
		121,
		112,
		101
	]),
	IframeEnd: new Uint8Array([
		60,
		47,
		105,
		102,
		114,
		97,
		109,
		101
	]),
	NoembedEnd: new Uint8Array([
		60,
		47,
		110,
		111,
		101,
		109,
		98,
		101,
		100
	]),
	NoframesEnd: new Uint8Array([
		60,
		47,
		110,
		111,
		102,
		114,
		97,
		109,
		101,
		115
	]),
	Plaintext: new Uint8Array([
		60,
		47,
		112,
		108,
		97,
		105,
		110,
		116,
		101,
		120,
		116
	]),
	ScriptEnd: new Uint8Array([
		60,
		47,
		115,
		99,
		114,
		105,
		112,
		116
	]),
	StyleEnd: new Uint8Array([
		60,
		47,
		115,
		116,
		121,
		108,
		101
	]),
	TitleEnd: new Uint8Array([
		60,
		47,
		116,
		105,
		116,
		108,
		101
	]),
	TextareaEnd: new Uint8Array([
		60,
		47,
		116,
		101,
		120,
		116,
		97,
		114,
		101,
		97
	]),
	XmpEnd: new Uint8Array([
		60,
		47,
		120,
		109,
		112
	])
};
/**
* Maps the first lowercase character of an HTML tag name to the sequence
* used for special-tag detection.  All sequences share a common layout
* where index 2 is the first tag-name character, so matching always
* continues from offset 3.
*/
var specialStartSequences = /* @__PURE__ */ new Map([
	[Sequences.IframeEnd[2], Sequences.IframeEnd],
	[Sequences.NoembedEnd[2], Sequences.NoembedEnd],
	[Sequences.Plaintext[2], Sequences.Plaintext],
	[Sequences.ScriptEnd[2], Sequences.ScriptEnd],
	[Sequences.TitleEnd[2], Sequences.TitleEnd],
	[Sequences.XmpEnd[2], Sequences.XmpEnd]
]);
/**
* Tokenizer implementation used by `Parser`.
*/
var Tokenizer = class {
	cbs;
	/** The current state the tokenizer is in. */
	state = State.Text;
	/** The read buffer. */
	buffer = "";
	/** The beginning of the section that is currently being read. */
	sectionStart = 0;
	/** The index within the buffer that we are currently looking at. */
	index = 0;
	/** The start of the last entity. */
	entityStart = 0;
	/** Some behavior, eg. when decoding entities, is done while we are in another state. This keeps track of the other state type. */
	baseState = State.Text;
	/** For special parsing behavior inside of script and style tags. */
	isSpecial = false;
	/** Indicates whether the tokenizer has been paused. */
	running = true;
	/** The offset of the current buffer. */
	offset = 0;
	xmlMode;
	decodeEntities;
	recognizeSelfClosing;
	entityDecoder;
	constructor({ xmlMode = false, decodeEntities = true, recognizeSelfClosing = xmlMode }, cbs) {
		this.cbs = cbs;
		this.xmlMode = xmlMode;
		this.decodeEntities = decodeEntities;
		this.recognizeSelfClosing = recognizeSelfClosing;
		this.entityDecoder = new EntityDecoder(xmlMode ? xmlDecodeTree : htmlDecodeTree, (cp, consumed) => this.emitCodePoint(cp, consumed));
	}
	reset() {
		this.state = State.Text;
		this.buffer = "";
		this.sectionStart = 0;
		this.index = 0;
		this.baseState = State.Text;
		this.isSpecial = false;
		this.currentSequence = Sequences.Empty;
		this.sequenceIndex = 0;
		this.running = true;
		this.offset = 0;
	}
	write(chunk) {
		this.offset += this.buffer.length;
		this.buffer = chunk;
		this.parse();
	}
	end() {
		if (this.running) this.finish();
	}
	pause() {
		this.running = false;
	}
	resume() {
		this.running = true;
		if (this.index < this.buffer.length + this.offset) this.parse();
	}
	stateText(c) {
		if (c === CharCodes.Lt || !this.decodeEntities && this.fastForwardTo(CharCodes.Lt)) {
			if (this.index > this.sectionStart) this.cbs.ontext(this.sectionStart, this.index);
			this.state = State.BeforeTagName;
			this.sectionStart = this.index;
		} else if (this.decodeEntities && c === CharCodes.Amp) this.startEntity();
	}
	currentSequence = Sequences.Empty;
	sequenceIndex = 0;
	enterTagBody() {
		if (this.currentSequence === Sequences.Plaintext) {
			this.currentSequence = Sequences.Empty;
			this.state = State.InPlainText;
		} else if (this.isSpecial) {
			this.state = State.InSpecialTag;
			this.sequenceIndex = 0;
		} else this.state = State.Text;
	}
	/**
	* Match the opening tag name against an HTML text-only tag sequence.
	*
	* Some tags share an initial prefix (`script`/`style`, `title`/`textarea`,
	* `noembed`/`noframes`), so we may switch to an alternate sequence at the
	* first distinguishing byte.  On a successful full match we fall back to
	* the normal tag-name state; a later `>` will enter raw-text, RCDATA, or
	* plaintext mode based on `currentSequence` / `isSpecial`.
	* @param c Current character code point.
	*/
	stateSpecialStartSequence(c) {
		const lower = c | 32;
		if (this.sequenceIndex < this.currentSequence.length) {
			if (lower === this.currentSequence[this.sequenceIndex]) {
				this.sequenceIndex++;
				return;
			}
			if (this.sequenceIndex === 3) {
				if (this.currentSequence === Sequences.ScriptEnd && lower === Sequences.StyleEnd[3]) {
					this.currentSequence = Sequences.StyleEnd;
					this.sequenceIndex = 4;
					return;
				}
				if (this.currentSequence === Sequences.TitleEnd && lower === Sequences.TextareaEnd[3]) {
					this.currentSequence = Sequences.TextareaEnd;
					this.sequenceIndex = 4;
					return;
				}
			} else if (this.sequenceIndex === 4 && this.currentSequence === Sequences.NoembedEnd && lower === Sequences.NoframesEnd[4]) {
				this.currentSequence = Sequences.NoframesEnd;
				this.sequenceIndex = 5;
				return;
			}
		} else if (isEndOfTagSection(c)) {
			this.sequenceIndex = 0;
			this.state = State.InTagName;
			this.stateInTagName(c);
			return;
		}
		this.isSpecial = false;
		this.currentSequence = Sequences.Empty;
		this.sequenceIndex = 0;
		this.state = State.InTagName;
		this.stateInTagName(c);
	}
	stateCDATASequence(c) {
		if (c === Sequences.Cdata[this.sequenceIndex]) {
			if (++this.sequenceIndex === Sequences.Cdata.length) {
				this.state = State.InCommentLike;
				this.currentSequence = Sequences.CdataEnd;
				this.sequenceIndex = 0;
				this.sectionStart = this.index + 1;
			}
		} else {
			this.sequenceIndex = 0;
			if (this.xmlMode) {
				this.state = State.InDeclaration;
				this.stateInDeclaration(c);
			} else {
				this.state = State.InSpecialComment;
				this.stateInSpecialComment(c);
			}
		}
	}
	/**
	* When we wait for one specific character, we can speed things up
	* by skipping through the buffer until we find it.
	* @param c Current character code point.
	* @returns Whether the character was found.
	*/
	fastForwardTo(c) {
		while (++this.index < this.buffer.length + this.offset) if (this.buffer.charCodeAt(this.index - this.offset) === c) return true;
		this.index = this.buffer.length + this.offset - 1;
		return false;
	}
	/**
	* Emit a comment token and return to the text state.
	* @param offset Number of characters in the end sequence that have already been matched.
	*/
	emitComment(offset) {
		this.cbs.oncomment(this.sectionStart, this.index, offset);
		this.sequenceIndex = 0;
		this.sectionStart = this.index + 1;
		this.state = State.Text;
	}
	/**
	* Comments and CDATA end with `-->` and `]]>`.
	*
	* Their common qualities are:
	* - Their end sequences have a distinct character they start with.
	* - That character is then repeated, so we have to check multiple repeats.
	* - All characters but the start character of the sequence can be skipped.
	* @param c Current character code point.
	*/
	stateInCommentLike(c) {
		if (!this.xmlMode && this.currentSequence === Sequences.CommentEnd && this.sequenceIndex <= 1 && this.index === this.sectionStart + this.sequenceIndex && c === CharCodes.Gt) this.emitComment(this.sequenceIndex);
		else if (this.currentSequence === Sequences.CommentEnd && this.sequenceIndex === 2 && c === CharCodes.Gt) this.emitComment(2);
		else if (this.currentSequence === Sequences.CommentEnd && this.sequenceIndex === this.currentSequence.length - 1 && c !== CharCodes.Gt) this.sequenceIndex = Number(c === CharCodes.Dash);
		else if (c === this.currentSequence[this.sequenceIndex]) {
			if (++this.sequenceIndex === this.currentSequence.length) {
				if (this.currentSequence === Sequences.CdataEnd) this.cbs.oncdata(this.sectionStart, this.index, 2);
				else this.cbs.oncomment(this.sectionStart, this.index, 3);
				this.sequenceIndex = 0;
				this.sectionStart = this.index + 1;
				this.state = State.Text;
			}
		} else if (this.sequenceIndex === 0) {
			if (this.fastForwardTo(this.currentSequence[0])) this.sequenceIndex = 1;
		} else if (c !== this.currentSequence[this.sequenceIndex - 1]) this.sequenceIndex = 0;
	}
	/**
	* HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
	*
	* XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
	* We allow anything that wouldn't end the tag.
	* @param c Current character code point.
	*/
	isTagStartChar(c) {
		return this.xmlMode ? !isEndOfTagSection(c) : isASCIIAlpha(c);
	}
	/**
	* Scan raw-text / RCDATA content for the matching end tag.
	*
	* For RCDATA tags (`<title>`, `<textarea>`) entities are decoded inline.
	* For raw-text tags (`<script>`, `<style>`, etc.) we fast-forward to `<`.
	* @param c Current character code point.
	*/
	stateInSpecialTag(c) {
		if (this.sequenceIndex === this.currentSequence.length) {
			if (isEndOfTagSection(c)) {
				const endOfText = this.index - this.currentSequence.length;
				if (this.sectionStart < endOfText) {
					const actualIndex = this.index;
					this.index = endOfText;
					this.cbs.ontext(this.sectionStart, endOfText);
					this.index = actualIndex;
				}
				this.isSpecial = false;
				this.sectionStart = endOfText + 2;
				this.stateInClosingTagName(c);
				return;
			}
			this.sequenceIndex = 0;
		}
		if ((c | 32) === this.currentSequence[this.sequenceIndex]) this.sequenceIndex += 1;
		else if (this.sequenceIndex === 0) {
			if (this.currentSequence === Sequences.TitleEnd || this.currentSequence === Sequences.TextareaEnd) {
				if (this.decodeEntities && c === CharCodes.Amp) this.startEntity();
			} else if (this.fastForwardTo(CharCodes.Lt)) this.sequenceIndex = 1;
		} else this.sequenceIndex = Number(c === CharCodes.Lt);
	}
	stateBeforeTagName(c) {
		if (c === CharCodes.ExclamationMark) {
			this.state = State.BeforeDeclaration;
			this.sectionStart = this.index + 1;
		} else if (c === CharCodes.Questionmark) {
			if (this.xmlMode) {
				this.state = State.InProcessingInstruction;
				this.sequenceIndex = 0;
				this.sectionStart = this.index + 1;
			} else {
				this.state = State.InSpecialComment;
				this.sectionStart = this.index;
			}
		} else if (this.isTagStartChar(c)) {
			this.sectionStart = this.index;
			const special = this.xmlMode || this.cbs.isInForeignContext?.() ? void 0 : specialStartSequences.get(c | 32);
			if (special === void 0) this.state = State.InTagName;
			else {
				this.isSpecial = true;
				this.currentSequence = special;
				this.sequenceIndex = 3;
				this.state = State.SpecialStartSequence;
			}
		} else if (c === CharCodes.Slash) this.state = State.BeforeClosingTagName;
		else {
			this.state = State.Text;
			this.stateText(c);
		}
	}
	stateInTagName(c) {
		if (isEndOfTagSection(c)) {
			this.cbs.onopentagname(this.sectionStart, this.index);
			this.sectionStart = -1;
			this.state = State.BeforeAttributeName;
			this.stateBeforeAttributeName(c);
		}
	}
	stateBeforeClosingTagName(c) {
		if (isWhitespace(c)) {
			if (this.xmlMode) {} else {
				this.state = State.InSpecialComment;
				this.sectionStart = this.index;
			}
		} else if (c === CharCodes.Gt) {
			this.state = State.Text;
			if (!this.xmlMode) this.sectionStart = this.index + 1;
		} else {
			this.state = this.isTagStartChar(c) ? State.InClosingTagName : State.InSpecialComment;
			this.sectionStart = this.index;
		}
	}
	stateInClosingTagName(c) {
		if (isEndOfTagSection(c)) {
			this.cbs.onclosetag(this.sectionStart, this.index);
			this.sectionStart = -1;
			this.state = State.AfterClosingTagName;
			this.stateAfterClosingTagName(c);
		}
	}
	stateAfterClosingTagName(c) {
		if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
			this.state = State.Text;
			this.sectionStart = this.index + 1;
		}
	}
	stateBeforeAttributeName(c) {
		if (c === CharCodes.Gt) {
			this.cbs.onopentagend(this.index);
			this.enterTagBody();
			this.sectionStart = this.index + 1;
		} else if (c === CharCodes.Slash) this.state = State.InSelfClosingTag;
		else if (!isWhitespace(c)) {
			this.state = State.InAttributeName;
			this.sectionStart = this.index;
		}
	}
	/**
	* Handle `/` before `>` in an opening tag.
	*
	* In HTML mode, text-only tags ignore the self-closing flag and still enter
	* their raw-text/RCDATA/plaintext state unless self-closing tags are being
	* recognized. In XML mode, or for ordinary tags, the tokenizer returns to
	* regular text parsing after emitting the self-closing callback.
	* @param c Current character code point.
	*/
	stateInSelfClosingTag(c) {
		if (c === CharCodes.Gt) {
			this.cbs.onselfclosingtag(this.index);
			this.sectionStart = this.index + 1;
			if (!this.recognizeSelfClosing) {
				this.enterTagBody();
				return;
			}
			this.state = State.Text;
			this.isSpecial = false;
			this.currentSequence = Sequences.Empty;
		} else if (!isWhitespace(c)) {
			this.state = State.BeforeAttributeName;
			this.stateBeforeAttributeName(c);
		}
	}
	stateInAttributeName(c) {
		if (c === CharCodes.Eq || isEndOfTagSection(c)) {
			this.cbs.onattribname(this.sectionStart, this.index);
			this.sectionStart = this.index;
			this.state = State.AfterAttributeName;
			this.stateAfterAttributeName(c);
		}
	}
	stateAfterAttributeName(c) {
		if (c === CharCodes.Eq) this.state = State.BeforeAttributeValue;
		else if (c === CharCodes.Slash || c === CharCodes.Gt) {
			this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
			this.sectionStart = -1;
			this.state = State.BeforeAttributeName;
			this.stateBeforeAttributeName(c);
		} else if (!isWhitespace(c)) {
			this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
			this.state = State.InAttributeName;
			this.sectionStart = this.index;
		}
	}
	stateBeforeAttributeValue(c) {
		if (c === CharCodes.DoubleQuote) {
			this.state = State.InAttributeValueDq;
			this.sectionStart = this.index + 1;
		} else if (c === CharCodes.SingleQuote) {
			this.state = State.InAttributeValueSq;
			this.sectionStart = this.index + 1;
		} else if (!isWhitespace(c)) {
			this.sectionStart = this.index;
			this.state = State.InAttributeValueNq;
			this.stateInAttributeValueNoQuotes(c);
		}
	}
	handleInAttributeValue(c, quote) {
		if (c === quote || !this.decodeEntities && this.fastForwardTo(quote)) {
			this.cbs.onattribdata(this.sectionStart, this.index);
			this.sectionStart = -1;
			this.cbs.onattribend(quote === CharCodes.DoubleQuote ? QuoteType.Double : QuoteType.Single, this.index + 1);
			this.state = State.BeforeAttributeName;
		} else if (this.decodeEntities && c === CharCodes.Amp) this.startEntity();
	}
	stateInAttributeValueDoubleQuotes(c) {
		this.handleInAttributeValue(c, CharCodes.DoubleQuote);
	}
	stateInAttributeValueSingleQuotes(c) {
		this.handleInAttributeValue(c, CharCodes.SingleQuote);
	}
	stateInAttributeValueNoQuotes(c) {
		if (isWhitespace(c) || c === CharCodes.Gt) {
			this.cbs.onattribdata(this.sectionStart, this.index);
			this.sectionStart = -1;
			this.cbs.onattribend(QuoteType.Unquoted, this.index);
			this.state = State.BeforeAttributeName;
			this.stateBeforeAttributeName(c);
		} else if (this.decodeEntities && c === CharCodes.Amp) this.startEntity();
	}
	/**
	* Distinguish between CDATA, declarations, HTML comments, and HTML bogus
	* comments after `<!`.
	*
	* In HTML mode, only real comments and doctypes stay on declaration paths;
	* everything else becomes a bogus comment terminated by the next `>`.
	* @param c Current character code point.
	*/
	stateBeforeDeclaration(c) {
		if (c === CharCodes.OpeningSquareBracket) {
			this.state = State.CDATASequence;
			this.sequenceIndex = 0;
		} else if (this.xmlMode) this.state = c === CharCodes.Dash ? State.BeforeComment : State.InDeclaration;
		else if ((c | 32) === Sequences.Doctype[0]) {
			this.state = State.DeclarationSequence;
			this.currentSequence = Sequences.Doctype;
			this.sequenceIndex = 1;
		} else if (c === CharCodes.Gt) {
			this.cbs.oncomment(this.sectionStart, this.index, 0);
			this.state = State.Text;
			this.sectionStart = this.index + 1;
		} else if (c === CharCodes.Dash) this.state = State.BeforeComment;
		else this.state = State.InSpecialComment;
	}
	/**
	* Continue matching `doctype` after `<!d`.
	*
	* A full `doctype` match stays on the declaration path; any other name falls
	* back to an HTML bogus comment, which matches browser behavior for
	* non-doctype `<!...>` constructs.
	* @param c Current character code point.
	*/
	stateDeclarationSequence(c) {
		if (this.sequenceIndex === this.currentSequence.length) {
			this.state = State.InDeclaration;
			this.stateInDeclaration(c);
		} else if ((c | 32) === this.currentSequence[this.sequenceIndex]) this.sequenceIndex += 1;
		else if (c === CharCodes.Gt) {
			this.cbs.oncomment(this.sectionStart, this.index, 0);
			this.state = State.Text;
			this.sectionStart = this.index + 1;
		} else this.state = State.InSpecialComment;
	}
	stateInDeclaration(c) {
		if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
			this.cbs.ondeclaration(this.sectionStart, this.index);
			this.state = State.Text;
			this.sectionStart = this.index + 1;
		}
	}
	/**
	* XML processing instructions (`<?...?>`).
	*
	* In HTML mode `<?` is routed to `InSpecialComment` instead, so this
	* state is only reachable in XML mode.
	* @param c Current character code point.
	*/
	stateInProcessingInstruction(c) {
		if (c === CharCodes.Questionmark) this.sequenceIndex = 1;
		else if (c === CharCodes.Gt && this.sequenceIndex === 1) {
			this.cbs.onprocessinginstruction(this.sectionStart, this.index - 1);
			this.sequenceIndex = 0;
			this.state = State.Text;
			this.sectionStart = this.index + 1;
		} else this.sequenceIndex = Number(this.fastForwardTo(CharCodes.Questionmark));
	}
	stateBeforeComment(c) {
		if (c === CharCodes.Dash) {
			this.state = State.InCommentLike;
			this.currentSequence = Sequences.CommentEnd;
			this.sequenceIndex = 0;
			this.sectionStart = this.index + 1;
		} else if (this.xmlMode) this.state = State.InDeclaration;
		else if (c === CharCodes.Gt) {
			this.cbs.oncomment(this.sectionStart, this.index, 0);
			this.state = State.Text;
			this.sectionStart = this.index + 1;
		} else this.state = State.InSpecialComment;
	}
	stateInSpecialComment(c) {
		if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
			this.cbs.oncomment(this.sectionStart, this.index, 0);
			this.state = State.Text;
			this.sectionStart = this.index + 1;
		}
	}
	startEntity() {
		this.baseState = this.state;
		this.state = State.InEntity;
		this.entityStart = this.index;
		this.entityDecoder.startEntity(this.xmlMode ? DecodingMode.Strict : this.baseState === State.Text || this.baseState === State.InSpecialTag ? DecodingMode.Legacy : DecodingMode.Attribute);
	}
	stateInEntity() {
		const indexInBuffer = this.index - this.offset;
		const length = this.entityDecoder.write(this.buffer, indexInBuffer);
		if (length >= 0) {
			this.state = this.baseState;
			if (length === 0) this.index -= 1;
		} else {
			if (indexInBuffer < this.buffer.length && this.buffer.charCodeAt(indexInBuffer) === CharCodes.Amp) {
				this.state = this.baseState;
				this.index -= 1;
				return;
			}
			this.index = this.offset + this.buffer.length - 1;
		}
	}
	/**
	* Remove data that has already been consumed from the buffer.
	*/
	cleanup() {
		if (this.running && this.sectionStart !== this.index) {
			if (this.state === State.Text || this.state === State.InPlainText || this.state === State.InSpecialTag && this.sequenceIndex === 0) {
				this.cbs.ontext(this.sectionStart, this.index);
				this.sectionStart = this.index;
			} else if (this.state === State.InAttributeValueDq || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueNq) {
				this.cbs.onattribdata(this.sectionStart, this.index);
				this.sectionStart = this.index;
			}
		}
	}
	shouldContinue() {
		return this.index < this.buffer.length + this.offset && this.running;
	}
	/**
	* Iterates through the buffer, calling the function corresponding to the current state.
	*
	* States that are more likely to be hit are higher up, as a performance improvement.
	*/
	parse() {
		while (this.shouldContinue()) {
			const c = this.buffer.charCodeAt(this.index - this.offset);
			switch (this.state) {
				case State.Text:
					this.stateText(c);
					break;
				case State.InPlainText:
					this.index = this.buffer.length + this.offset - 1;
					break;
				case State.SpecialStartSequence:
					this.stateSpecialStartSequence(c);
					break;
				case State.InSpecialTag:
					this.stateInSpecialTag(c);
					break;
				case State.CDATASequence:
					this.stateCDATASequence(c);
					break;
				case State.DeclarationSequence:
					this.stateDeclarationSequence(c);
					break;
				case State.InAttributeValueDq:
					this.stateInAttributeValueDoubleQuotes(c);
					break;
				case State.InAttributeName:
					this.stateInAttributeName(c);
					break;
				case State.InCommentLike:
					this.stateInCommentLike(c);
					break;
				case State.InSpecialComment:
					this.stateInSpecialComment(c);
					break;
				case State.BeforeAttributeName:
					this.stateBeforeAttributeName(c);
					break;
				case State.InTagName:
					this.stateInTagName(c);
					break;
				case State.InClosingTagName:
					this.stateInClosingTagName(c);
					break;
				case State.BeforeTagName:
					this.stateBeforeTagName(c);
					break;
				case State.AfterAttributeName:
					this.stateAfterAttributeName(c);
					break;
				case State.InAttributeValueSq:
					this.stateInAttributeValueSingleQuotes(c);
					break;
				case State.BeforeAttributeValue:
					this.stateBeforeAttributeValue(c);
					break;
				case State.BeforeClosingTagName:
					this.stateBeforeClosingTagName(c);
					break;
				case State.AfterClosingTagName:
					this.stateAfterClosingTagName(c);
					break;
				case State.InAttributeValueNq:
					this.stateInAttributeValueNoQuotes(c);
					break;
				case State.InSelfClosingTag:
					this.stateInSelfClosingTag(c);
					break;
				case State.InDeclaration:
					this.stateInDeclaration(c);
					break;
				case State.BeforeDeclaration:
					this.stateBeforeDeclaration(c);
					break;
				case State.BeforeComment:
					this.stateBeforeComment(c);
					break;
				case State.InProcessingInstruction:
					this.stateInProcessingInstruction(c);
					break;
				case State.InEntity: this.stateInEntity();
			}
			this.index++;
		}
		this.cleanup();
	}
	finish() {
		if (this.state === State.InEntity) {
			this.entityDecoder.end();
			this.state = this.baseState;
		}
		this.handleTrailingData();
		this.cbs.onend();
	}
	handleTrailingCommentLikeData(endIndex) {
		if (this.state !== State.InCommentLike) return false;
		if (this.currentSequence === Sequences.CdataEnd) {
			if (this.xmlMode) {
				if (this.sectionStart < endIndex) this.cbs.oncdata(this.sectionStart, endIndex, 0);
			} else {
				const cdataStart = this.sectionStart - Sequences.Cdata.length - 1;
				this.cbs.oncomment(cdataStart, endIndex, 0);
			}
		} else {
			const offset = this.xmlMode ? 0 : Math.min(this.sequenceIndex, Sequences.CommentEnd.length - 1);
			this.cbs.oncomment(this.sectionStart, endIndex, offset);
		}
		return true;
	}
	handleTrailingMarkupDeclaration(endIndex) {
		if (this.xmlMode) switch (this.state) {
			case State.InSpecialComment:
			case State.BeforeComment:
			case State.CDATASequence:
			case State.DeclarationSequence:
			case State.InDeclaration:
				this.cbs.ontext(this.sectionStart, endIndex);
				return true;
			default: return false;
		}
		switch (this.state) {
			case State.BeforeDeclaration:
			case State.InSpecialComment:
			case State.BeforeComment:
			case State.CDATASequence:
				this.cbs.oncomment(this.sectionStart, endIndex, 0);
				return true;
			case State.DeclarationSequence:
				if (this.sequenceIndex !== Sequences.Doctype.length) this.cbs.oncomment(this.sectionStart, endIndex, 0);
				return true;
			case State.InDeclaration: return true;
			default: return false;
		}
	}
	/** Handle any trailing data. */
	handleTrailingData() {
		const endIndex = this.buffer.length + this.offset;
		if (this.handleTrailingCommentLikeData(endIndex) || this.handleTrailingMarkupDeclaration(endIndex)) return;
		if (this.sectionStart >= endIndex) return;
		switch (this.state) {
			case State.InTagName:
			case State.BeforeAttributeName:
			case State.BeforeAttributeValue:
			case State.AfterAttributeName:
			case State.InAttributeName:
			case State.InAttributeValueSq:
			case State.InAttributeValueDq:
			case State.InAttributeValueNq:
			case State.InClosingTagName: break;
			default: this.cbs.ontext(this.sectionStart, endIndex);
		}
	}
	emitCodePoint(cp, consumed) {
		if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
			if (this.sectionStart < this.entityStart) this.cbs.onattribdata(this.sectionStart, this.entityStart);
			this.sectionStart = this.entityStart + consumed;
			this.index = this.sectionStart - 1;
			this.cbs.onattribentity(cp);
		} else {
			if (this.sectionStart < this.entityStart) this.cbs.ontext(this.sectionStart, this.entityStart);
			this.sectionStart = this.entityStart + consumed;
			this.index = this.sectionStart - 1;
			this.cbs.ontextentity(cp, this.sectionStart);
		}
	}
};
//#endregion
//#region node_modules/htmlparser2/dist/Parser.js
var { fromCodePoint } = String;
var formTags = /* @__PURE__ */ new Set([
	"input",
	"option",
	"optgroup",
	"select",
	"button",
	"datalist",
	"textarea"
]);
var pTag = /* @__PURE__ */ new Set(["p"]);
var headingTags = /* @__PURE__ */ new Set([
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"p"
]);
var tableSectionTags = /* @__PURE__ */ new Set(["thead", "tbody"]);
var ddtTags = /* @__PURE__ */ new Set(["dd", "dt"]);
var rtpTags = /* @__PURE__ */ new Set(["rt", "rp"]);
var openImpliesClose = /* @__PURE__ */ new Map([
	["tr", /* @__PURE__ */ new Set([
		"tr",
		"th",
		"td"
	])],
	["th", /* @__PURE__ */ new Set(["th"])],
	["td", /* @__PURE__ */ new Set([
		"thead",
		"th",
		"td"
	])],
	["body", /* @__PURE__ */ new Set([
		"head",
		"link",
		"script"
	])],
	["a", /* @__PURE__ */ new Set(["a"])],
	["li", /* @__PURE__ */ new Set(["li"])],
	["p", pTag],
	["h1", headingTags],
	["h2", headingTags],
	["h3", headingTags],
	["h4", headingTags],
	["h5", headingTags],
	["h6", headingTags],
	["select", formTags],
	["input", formTags],
	["output", formTags],
	["button", formTags],
	["datalist", formTags],
	["textarea", formTags],
	["option", /* @__PURE__ */ new Set(["option"])],
	["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
	["dd", ddtTags],
	["dt", ddtTags],
	["address", pTag],
	["article", pTag],
	["aside", pTag],
	["blockquote", pTag],
	["details", pTag],
	["div", pTag],
	["dl", pTag],
	["fieldset", pTag],
	["figcaption", pTag],
	["figure", pTag],
	["footer", pTag],
	["form", pTag],
	["header", pTag],
	["hr", pTag],
	["main", pTag],
	["nav", pTag],
	["ol", pTag],
	["pre", pTag],
	["section", pTag],
	["table", pTag],
	["ul", pTag],
	["rt", rtpTags],
	["rp", rtpTags],
	["tbody", tableSectionTags],
	["tfoot", tableSectionTags]
]);
var DOCUMENT_TYPE = "doctype";
var voidElements = /* @__PURE__ */ new Set([
	"area",
	"base",
	"basefont",
	"br",
	"col",
	"command",
	"embed",
	"frame",
	"hr",
	"img",
	"input",
	"isindex",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
]);
var foreignContextElements = /* @__PURE__ */ new Set(["math", "svg"]);
/**
* Elements that can be used to integrate HTML content within foreign namespaces (e.g., SVG or MathML).
*
* Entries must use the SVG-adjusted casing (e.g. "foreignObject" not
* "foreignobject") since they are compared against adjusted tag names.
*/
var htmlIntegrationElements = /* @__PURE__ */ new Set([
	"mi",
	"mo",
	"mn",
	"ms",
	"mtext",
	"annotation-xml",
	"foreignObject",
	"desc",
	"title"
]);
var svgTagNameAdjustments = /* @__PURE__ */ new Map([
	["altglyph", "altGlyph"],
	["altglyphdef", "altGlyphDef"],
	["altglyphitem", "altGlyphItem"],
	["animatecolor", "animateColor"],
	["animatemotion", "animateMotion"],
	["animatetransform", "animateTransform"],
	["clippath", "clipPath"],
	["feblend", "feBlend"],
	["fecolormatrix", "feColorMatrix"],
	["fecomponenttransfer", "feComponentTransfer"],
	["fecomposite", "feComposite"],
	["feconvolvematrix", "feConvolveMatrix"],
	["fediffuselighting", "feDiffuseLighting"],
	["fedisplacementmap", "feDisplacementMap"],
	["fedistantlight", "feDistantLight"],
	["fedropshadow", "feDropShadow"],
	["feflood", "feFlood"],
	["fefunca", "feFuncA"],
	["fefuncb", "feFuncB"],
	["fefuncg", "feFuncG"],
	["fefuncr", "feFuncR"],
	["fegaussianblur", "feGaussianBlur"],
	["feimage", "feImage"],
	["femerge", "feMerge"],
	["femergenode", "feMergeNode"],
	["femorphology", "feMorphology"],
	["feoffset", "feOffset"],
	["fepointlight", "fePointLight"],
	["fespecularlighting", "feSpecularLighting"],
	["fespotlight", "feSpotLight"],
	["fetile", "feTile"],
	["feturbulence", "feTurbulence"],
	["foreignobject", "foreignObject"],
	["glyphref", "glyphRef"],
	["lineargradient", "linearGradient"],
	["radialgradient", "radialGradient"],
	["textpath", "textPath"]
]);
var ForeignContext;
(function(ForeignContext) {
	ForeignContext[ForeignContext["None"] = 0] = "None";
	ForeignContext[ForeignContext["Svg"] = 1] = "Svg";
	ForeignContext[ForeignContext["MathML"] = 2] = "MathML";
})(ForeignContext || (ForeignContext = {}));
var reNameEnd = /\s|\//;
/**
* Incremental parser implementation.
*/
var Parser = class {
	options;
	/** The start index of the last event. */
	startIndex = 0;
	/** The end index of the last event. */
	endIndex = 0;
	/**
	* Store the start index of the current open tag,
	* so we can update the start index for attributes.
	*/
	openTagStart = 0;
	tagname = "";
	attribname = "";
	attribvalue = "";
	attribs = null;
	stack = [];
	foreignContext;
	cbs;
	lowerCaseTagNames;
	lowerCaseAttributeNames;
	recognizeSelfClosing;
	/** We are parsing HTML. Inverse of the `xmlMode` option. */
	htmlMode;
	tokenizer;
	buffers = [];
	bufferOffset = 0;
	/** The index of the last written buffer. Used when resuming after a `pause()`. */
	writeIndex = 0;
	/** Indicates whether the parser has finished running / `.end` has been called. */
	ended = false;
	constructor(cbs, options = {}) {
		this.options = options;
		this.cbs = cbs ?? {};
		this.htmlMode = !this.options.xmlMode;
		this.lowerCaseTagNames = options.lowerCaseTags ?? this.htmlMode;
		this.lowerCaseAttributeNames = options.lowerCaseAttributeNames ?? this.htmlMode;
		this.recognizeSelfClosing = options.recognizeSelfClosing ?? !this.htmlMode;
		this.tokenizer = new (options.Tokenizer ?? Tokenizer)(this.options, this);
		this.foreignContext = [ForeignContext.None];
		this.cbs.onparserinit?.(this);
	}
	/**
	* @param start Start index for the current parser event.
	* @param endIndex End index for the current parser event.
	* @internal
	*/
	ontext(start, endIndex) {
		const data = this.getSlice(start, endIndex);
		this.endIndex = endIndex - 1;
		this.cbs.ontext?.(data);
		this.startIndex = endIndex;
	}
	/**
	* @param cp Current Unicode code point.
	* @param endIndex End index for the current parser event.
	* @internal
	*/
	ontextentity(cp, endIndex) {
		this.endIndex = endIndex - 1;
		this.cbs.ontext?.(fromCodePoint(cp));
		this.startIndex = endIndex;
	}
	/** @internal */
	isInForeignContext() {
		return this.foreignContext[0] !== ForeignContext.None;
	}
	/**
	* Checks if the current tag is a void element. Override this if you want
	* to specify your own additional void elements.
	* @param name Name of the pseudo selector.
	*/
	isVoidElement(name) {
		return this.htmlMode && voidElements.has(name);
	}
	/**
	* Read a tag name from the buffer.
	*
	* When `lowerCaseTagNames` is enabled (the default in HTML mode), the name
	* is lowercased and may be adjusted for SVG casing or the `image` → `img`
	* alias.
	* @param start Start index of the tag name in the buffer.
	* @param endIndex End index of the tag name in the buffer.
	*/
	readTagName(start, endIndex) {
		const name = this.lowerCaseTagNames ? this.getSlice(start, endIndex).toLowerCase() : this.getSlice(start, endIndex);
		if (!(this.lowerCaseTagNames && this.htmlMode)) return name;
		if (this.foreignContext[0] === ForeignContext.Svg) return svgTagNameAdjustments.get(name) ?? name;
		if (this.foreignContext.length > 1) {
			const adjusted = svgTagNameAdjustments.get(name);
			if (adjusted !== void 0 && this.stack.includes(adjusted)) return adjusted;
		}
		if (!this.isInForeignContext()) return name === "image" ? "img" : name;
		return name;
	}
	/**
	* @param start Start index for the current parser event.
	* @param endIndex End index for the current parser event.
	* @internal
	*/
	onopentagname(start, endIndex) {
		this.endIndex = endIndex;
		this.emitOpenTag(this.readTagName(start, endIndex));
	}
	emitOpenTag(name) {
		this.openTagStart = this.startIndex;
		this.tagname = name;
		if (this.htmlMode && name === "form" && this.stack.includes("form")) {
			this.tagname = "";
			return;
		}
		const impliesClose = this.htmlMode && openImpliesClose.get(name);
		if (impliesClose) while (this.stack.length > 0 && impliesClose.has(this.stack[0])) this.popElement(true);
		if (!this.isVoidElement(name)) {
			this.stack.unshift(name);
			if (this.htmlMode) {
				if (name === "svg") this.foreignContext.unshift(ForeignContext.Svg);
				else if (name === "math") this.foreignContext.unshift(ForeignContext.MathML);
				else if (htmlIntegrationElements.has(name)) this.foreignContext.unshift(ForeignContext.None);
			}
		}
		this.cbs.onopentagname?.(name);
		if (this.cbs.onopentag) this.attribs = {};
	}
	endOpenTag(isImplied) {
		this.startIndex = this.openTagStart;
		if (this.attribs) {
			this.cbs.onopentag?.(this.tagname, this.attribs, isImplied);
			this.attribs = null;
		}
		if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) this.cbs.onclosetag(this.tagname, true);
		this.tagname = "";
	}
	/**
	* @param endIndex End index for the current parser event.
	* @internal
	*/
	onopentagend(endIndex) {
		this.endIndex = endIndex;
		this.endOpenTag(false);
		this.startIndex = endIndex + 1;
	}
	/**
	* @param start Start index for the current parser event.
	* @param endIndex End index for the current parser event.
	* @internal
	*/
	onclosetag(start, endIndex) {
		this.endIndex = endIndex;
		const name = this.readTagName(start, endIndex);
		if (!this.isVoidElement(name)) {
			const pos = this.stack.indexOf(name);
			if (pos !== -1) {
				for (let index = 0; index < pos; index++) this.popElement(true);
				this.popElement(false);
			} else if (this.htmlMode && name === "p") {
				this.emitOpenTag("p");
				this.closeCurrentTag(true);
			}
		} else if (this.htmlMode && name === "br") {
			this.cbs.onopentagname?.("br");
			this.cbs.onopentag?.("br", {}, true);
			this.cbs.onclosetag?.("br", false);
		}
		this.startIndex = endIndex + 1;
	}
	/**
	* @param endIndex End index for the current parser event.
	* @internal
	*/
	onselfclosingtag(endIndex) {
		this.endIndex = endIndex;
		if (this.recognizeSelfClosing || this.isInForeignContext()) {
			this.closeCurrentTag(false);
			this.startIndex = endIndex + 1;
		} else this.onopentagend(endIndex);
	}
	/**
	* Pop the top element off the stack, emit a close event, and maintain
	* the foreign context stack.
	* @param implied Whether this close is implied (not from an explicit end tag).
	*/
	popElement(implied) {
		const element = this.stack.shift();
		if (this.htmlMode && (foreignContextElements.has(element) || htmlIntegrationElements.has(element))) this.foreignContext.shift();
		this.cbs.onclosetag?.(element, implied);
	}
	closeCurrentTag(isOpenImplied) {
		const name = this.tagname;
		this.endOpenTag(isOpenImplied);
		if (this.stack[0] === name) this.popElement(!isOpenImplied);
	}
	/**
	* @param start Start index for the current parser event.
	* @param endIndex End index for the current parser event.
	* @internal
	*/
	onattribname(start, endIndex) {
		this.startIndex = start;
		const name = this.getSlice(start, endIndex);
		this.attribname = this.lowerCaseAttributeNames ? name.toLowerCase() : name;
	}
	/**
	* @param start Start index for the current parser event.
	* @param endIndex End index for the current parser event.
	* @internal
	*/
	onattribdata(start, endIndex) {
		this.attribvalue += this.getSlice(start, endIndex);
	}
	/**
	* @param cp Current Unicode code point.
	* @internal
	*/
	onattribentity(cp) {
		this.attribvalue += fromCodePoint(cp);
	}
	/**
	* @param quote Quote type used for the current attribute.
	* @param endIndex End index for the current parser event.
	* @internal
	*/
	onattribend(quote, endIndex) {
		this.endIndex = endIndex;
		this.cbs.onattribute?.(this.attribname, this.attribvalue, quote === QuoteType.Double ? "\"" : quote === QuoteType.Single ? "'" : quote === QuoteType.NoValue ? void 0 : null);
		if (this.attribs && !Object.hasOwn(this.attribs, this.attribname)) this.attribs[this.attribname] = this.attribvalue;
		this.attribvalue = "";
	}
	getInstructionName(value) {
		const index = value.search(reNameEnd);
		let name = index < 0 ? value : value.substr(0, index);
		if (this.lowerCaseTagNames) name = name.toLowerCase();
		return name;
	}
	/**
	* @param start Start index for the current parser event.
	* @param endIndex End index for the current parser event.
	* @internal
	*/
	ondeclaration(start, endIndex) {
		this.endIndex = endIndex;
		const value = this.getSlice(start, endIndex);
		if (this.cbs.onprocessinginstruction) {
			const name = this.htmlMode ? this.lowerCaseTagNames ? DOCUMENT_TYPE : value.slice(0, 7) : this.getInstructionName(value);
			this.cbs.onprocessinginstruction(`!${name}`, `!${value}`);
		}
		this.startIndex = endIndex + 1;
	}
	/**
	* @param start Start index for the current parser event.
	* @param endIndex End index for the current parser event.
	* @internal
	*/
	onprocessinginstruction(start, endIndex) {
		this.endIndex = endIndex;
		const value = this.getSlice(start, endIndex);
		if (this.cbs.onprocessinginstruction) {
			const name = this.getInstructionName(value);
			this.cbs.onprocessinginstruction(`?${name}`, `?${value}`);
		}
		this.startIndex = endIndex + 1;
	}
	/**
	* @param start Start index for the current parser event.
	* @param endIndex End index for the current parser event.
	* @param offset Offset applied when computing parser indices.
	* @internal
	*/
	oncomment(start, endIndex, offset) {
		this.endIndex = endIndex;
		this.cbs.oncomment?.(this.getSlice(start, endIndex - offset));
		this.cbs.oncommentend?.();
		this.startIndex = endIndex + 1;
	}
	/**
	* @param start Start index for the current parser event.
	* @param endIndex End index for the current parser event.
	* @param offset Offset applied when computing parser indices.
	* @internal
	*/
	oncdata(start, endIndex, offset) {
		this.endIndex = endIndex;
		const value = this.getSlice(start, endIndex - offset);
		if (!this.htmlMode || this.options.recognizeCDATA) {
			this.cbs.oncdatastart?.();
			this.cbs.ontext?.(value);
			this.cbs.oncdataend?.();
		} else if (this.isInForeignContext()) this.cbs.ontext?.(value);
		else {
			this.cbs.oncomment?.(`[CDATA[${value}]]`);
			this.cbs.oncommentend?.();
		}
		this.startIndex = endIndex + 1;
	}
	/** @internal */
	onend() {
		if (this.cbs.onclosetag) {
			this.endIndex = this.startIndex;
			for (let index = 0; index < this.stack.length; index++) this.cbs.onclosetag(this.stack[index], true);
		}
		this.cbs.onend?.();
	}
	/**
	* Resets the parser to a blank state, ready to parse a new HTML document
	*/
	reset() {
		this.cbs.onreset?.();
		this.tokenizer.reset();
		this.tagname = "";
		this.attribname = "";
		this.attribvalue = "";
		this.attribs = null;
		this.stack.length = 0;
		this.startIndex = 0;
		this.endIndex = 0;
		this.cbs.onparserinit?.(this);
		this.buffers.length = 0;
		this.foreignContext.length = 0;
		this.foreignContext.unshift(ForeignContext.None);
		this.bufferOffset = 0;
		this.writeIndex = 0;
		this.ended = false;
	}
	/**
	* Resets the parser, then parses a complete document and
	* pushes it to the handler.
	* @param data Document to parse.
	*/
	parseComplete(data) {
		this.reset();
		this.end(data);
	}
	getSlice(start, end) {
		if (start === end) return "";
		while (start - this.bufferOffset >= this.buffers[0].length) this.shiftBuffer();
		let slice = this.buffers[0].slice(start - this.bufferOffset, end - this.bufferOffset);
		while (end - this.bufferOffset > this.buffers[0].length) {
			this.shiftBuffer();
			slice += this.buffers[0].slice(0, end - this.bufferOffset);
		}
		return slice;
	}
	shiftBuffer() {
		this.bufferOffset += this.buffers[0].length;
		this.writeIndex--;
		this.buffers.shift();
	}
	/**
	* Parses a chunk of data and calls the corresponding callbacks.
	* @param chunk Chunk to parse.
	*/
	write(chunk) {
		if (this.ended) {
			this.cbs.onerror?.(/* @__PURE__ */ new Error(".write() after done!"));
			return;
		}
		this.buffers.push(chunk);
		if (this.tokenizer.running) {
			this.tokenizer.write(chunk);
			this.writeIndex++;
		}
	}
	/**
	* Parses the end of the buffer and clears the stack, calls onend.
	* @param chunk Optional final chunk to parse.
	*/
	end(chunk) {
		if (this.ended) {
			this.cbs.onerror?.(/* @__PURE__ */ new Error(".end() after done!"));
			return;
		}
		if (chunk) this.write(chunk);
		this.ended = true;
		this.tokenizer.end();
	}
	/**
	* Pauses parsing. The parser won't emit events until `resume` is called.
	*/
	pause() {
		this.tokenizer.pause();
	}
	/**
	* Resumes parsing after `pause` was called.
	*/
	resume() {
		this.tokenizer.resume();
		while (this.tokenizer.running && this.writeIndex < this.buffers.length) this.tokenizer.write(this.buffers[this.writeIndex++]);
		if (this.ended) this.tokenizer.end();
	}
};
//#endregion
//#region node_modules/htmlparser2/dist/index.js
/**
* Parses the data, returns the resulting document.
* @param data The data that should be parsed.
* @param options Optional options for the parser and DOM handler.
*/
function parseDocument(data, options) {
	const handler = new DomHandler(void 0, options);
	new Parser(handler, options).end(data);
	return handler.root;
}
//#endregion
//#region node_modules/beasties/dist/index.mjs
var import_picocolors = /* @__PURE__ */ __toESM(require_picocolors(), 1);
/**
* Parse a textual CSS Stylesheet into a Stylesheet instance.
* Stylesheet is a mutable postcss AST with format similar to CSSOM.
* @see https://github.com/postcss/postcss/
* @private
*/
function parseStylesheet(stylesheet, options) {
	if (options?.safeParser) return (0, import_safe_parse.default)(stylesheet);
	return parse$2(stylesheet);
}
/**
* Serialize a postcss Stylesheet to a String of CSS.
* @private
* @param ast A Stylesheet to serialize, such as one returned from `parseStylesheet()`
*/
function serializeStylesheet(ast, options) {
	const cssParts = [];
	stringify(ast, (result, node, type) => {
		if (node?.type === "decl" && node.value.includes("</style>")) return;
		if (!options.compress) {
			cssParts.push(result);
			return;
		}
		if (node?.type === "comment") return;
		if (node?.type === "decl") {
			const prefix = node.prop + node.raws.between;
			cssParts.push(result.replace(prefix, prefix.trim()));
			return;
		}
		if (type === "start") {
			if (node?.type === "rule" && node.selectors) {
				if (node.selectors.length === 1) cssParts.push(node.selectors[0] ?? "", "{");
				else cssParts.push(node.selectors.join(","), "{");
			} else cssParts.push(result.trim());
			return;
		}
		if (type === "end" && result === "}" && node?.raws?.semicolon && (node.type === "rule" || node.type === "atrule")) {
			const lastChild = node.nodes?.[node.nodes.length - 1];
			const lastItemIdx = cssParts.length - 2;
			if (lastChild?.type === "decl" && lastItemIdx >= 0 && cssParts[lastItemIdx]) cssParts[lastItemIdx] = cssParts[lastItemIdx].slice(0, -1);
		}
		cssParts.push(result.trim());
	});
	return cssParts.join("");
}
/**
* Converts a walkStyleRules() iterator to mark nodes with `.$$remove=true` instead of actually removing them.
* This means they can be removed in a second pass, allowing the first pass to be nondestructive (eg: to preserve mirrored sheets).
* @private
* @param predicate   Invoked on each node in the tree. Return `false` to remove that node.
*/
function markOnly(predicate) {
	return (rule) => {
		const sel = "selectors" in rule ? rule.selectors : void 0;
		if (predicate(rule) === false) rule.$$remove = true;
		if ("selectors" in rule) {
			rule.$$markedSelectors = rule.selectors;
			rule.selectors = sel;
		}
		if (rule._other) rule._other.$$markedSelectors = rule._other.selectors;
	};
}
/**
* Apply filtered selectors to a rule from a previous markOnly run.
* @private
* @param rule The Rule to apply marked selectors to (if they exist).
*/
function applyMarkedSelectors(rule) {
	if (rule.$$markedSelectors) rule.selectors = rule.$$markedSelectors;
	if (rule._other) applyMarkedSelectors(rule._other);
}
/**
* Recursively walk all rules in a stylesheet.
* @private
* @param node       A Stylesheet or Rule to descend into.
* @param iterator   Invoked on each node in the tree. Return `false` to remove that node.
*/
function walkStyleRules(node, iterator) {
	if (!("nodes" in node)) return;
	node.nodes = node.nodes?.filter((rule) => {
		if (hasNestedRules(rule)) walkStyleRules(rule, iterator);
		rule._other = void 0;
		rule.filterSelectors = filterSelectors;
		return iterator(rule) !== false;
	});
}
/**
* Recursively walk all rules in two identical stylesheets, filtering nodes into one or the other based on a predicate.
* @private
* @param node       A Stylesheet or Rule to descend into.
* @param node2      A second tree identical to `node`
* @param iterator   Invoked on each node in the tree. Return `false` to remove that node from the first tree, true to remove it from the second.
*/
function walkStyleRulesWithReverseMirror(node, node2, iterator) {
	if (!node2) return walkStyleRules(node, iterator);
	[node.nodes, node2.nodes] = splitFilter(node.nodes, node2.nodes, (rule, index, _rules, rules2) => {
		const rule2 = rules2?.[index];
		if (hasNestedRules(rule)) {
			walkStyleRulesWithReverseMirror(rule, rule2, iterator);
			if ("nodes" in rule && rule.nodes?.length === 0 && isRemovableIfEmpty(rule)) return false;
		}
		rule._other = rule2;
		rule.filterSelectors = filterSelectors;
		return iterator(rule) !== false;
	});
	if (node2.nodes) node2.nodes = node2.nodes.filter((rule) => {
		if ("nodes" in rule && rule.nodes?.length === 0 && isRemovableIfEmpty(rule)) return false;
		return true;
	});
}
function hasNestedRules(rule) {
	return "nodes" in rule && !!rule.nodes?.length && (!("name" in rule) || rule.name !== "keyframes" && rule.name !== "-webkit-keyframes") && rule.nodes.some((n) => n.type === "rule" || n.type === "atrule");
}
function isRemovableIfEmpty(rule) {
	if (!("name" in rule) || rule.type !== "atrule") return false;
	return rule.name === "media" || rule.name === "supports";
}
function splitFilter(a, b, predicate) {
	const aOut = [];
	const bOut = [];
	for (let index = 0; index < a.length; index++) {
		const item = a[index];
		if (predicate(item, index, a, b)) aOut.push(item);
		else bOut.push(b?.[index] ?? item);
	}
	return [aOut, bOut];
}
function filterSelectors(predicate) {
	if (this._other) {
		const [a, b] = splitFilter(this.selectors, this._other.selectors, predicate);
		this.selectors = a;
		this._other.selectors = b;
	} else this.selectors = this.selectors.filter(predicate);
}
var MEDIA_TYPES = /* @__PURE__ */ new Set([
	"all",
	"print",
	"screen",
	"speech"
]);
var MEDIA_KEYWORDS = /* @__PURE__ */ new Set([
	"and",
	"not",
	","
]);
var MEDIA_FEATURES = new Set([
	"width",
	"aspect-ratio",
	"color",
	"color-index",
	"grid",
	"height",
	"monochrome",
	"orientation",
	"resolution",
	"scan"
].flatMap((feature) => [
	feature,
	`min-${feature}`,
	`max-${feature}`
]));
function validateMediaType(node) {
	const { type: nodeType, value: nodeValue } = node;
	if (nodeType === "media-type") return MEDIA_TYPES.has(nodeValue);
	else if (nodeType === "keyword") return MEDIA_KEYWORDS.has(nodeValue);
	else if (nodeType === "media-feature") return MEDIA_FEATURES.has(nodeValue);
}
/**
*
* This function performs a basic media query validation
* to ensure the values passed as part of the 'media' config
* is HTML safe and does not cause any injection issue
*
* @param query Media query to validate
*/
function validateMediaQuery(query) {
	const mediaTree = ("default" in import_dist.default ? import_dist.default.default : import_dist.default)(query);
	const nodeTypes = /* @__PURE__ */ new Set([
		"media-type",
		"keyword",
		"media-feature"
	]);
	const stack = [mediaTree];
	while (stack.length > 0) {
		const node = stack.pop();
		if (nodeTypes.has(node.type) && !validateMediaType(node)) return false;
		if (node.nodes) stack.push(...node.nodes);
	}
	return true;
}
var DIRECTIVE_RE = /^(beasties|critters):(.*)$/;
/**
* A comment which looks like a directive but uses an unknown namespace, e.g.
* `/* critter:include *\/`. Deliberately narrow: a single bare word followed by
* `include`/`exclude` and an optional `start`/`end`, and nothing else, so that
* license banners, sourcemap comments and ordinary prose never match.
*/
var DIRECTIVE_LOOKALIKE_RE = /^([\w-]+):(include|exclude)(?: (start|end))?$/;
var COMMANDS = /* @__PURE__ */ new Set([
	"include",
	"exclude",
	"include start",
	"include end",
	"exclude start",
	"exclude end"
]);
var SUPPORTED_DIRECTIVES = [...COMMANDS].map((command) => `beasties:${command}`).join(", ");
/**
* Interpret a CSS comment's text as a beasties directive.
*
* `text` is the comment body with the delimiters removed and whitespace
* trimmed, i.e. postcss' `Comment#text`. Comments beginning with `!` (legal
* comments preserved by minifiers) are not treated as directives.
*/
function parseDirective(text) {
	const match = text.match(DIRECTIVE_RE);
	if (match) {
		const command = match[2].trim();
		if (COMMANDS.has(command)) return {
			command,
			deprecated: match[1] === "critters"
		};
		return { warning: `Unknown comment directive "${text}". Supported directives are: ${SUPPORTED_DIRECTIVES}.` };
	}
	const lookalike = text.match(DIRECTIVE_LOOKALIKE_RE);
	if (lookalike) return { warning: `Ignoring unrecognised comment directive "${text}". Did you mean "beasties:${lookalike[3] ? `${lookalike[2]} ${lookalike[3]}` : lookalike[2]}"?` };
	return {};
}
var CRITTERS_DEPRECATION_WARNING = "Found deprecated \"critters:\" comment directives. Use the \"beasties:\" prefix instead, for example \"/* beasties:include start */\".";
var version = "0.5.4";
function buildCache(container) {
	container._classCache = /* @__PURE__ */ new Set();
	container._idCache = /* @__PURE__ */ new Set();
	const queue = [container];
	while (queue.length) {
		const node = queue.shift();
		if (node.hasAttribute?.("class")) node.getAttribute("class").trim().split(" ").forEach((cls) => {
			container._classCache.add(cls);
		});
		if (node.hasAttribute?.("id")) {
			const id = node.getAttribute("id").trim();
			container._idCache.add(id);
		}
		if ("children" in node) queue.push(...node.children.filter((child) => child.type === "tag"));
	}
}
/**
* Parse HTML into a mutable, serializable DOM Document.
* The DOM implementation is an htmlparser2 DOM enhanced with basic DOM mutation methods.
* @param html   HTML to parse into a Document instance
*/
function createDocument(html, logger) {
	const document = parseDocument(html, { decodeEntities: false });
	extendDocument(document);
	const parsedPrototype = Object.getPrototypeOf(document.children.find((child) => child.type === "tag") ?? Element.prototype);
	extendElement(parsedPrototype, logger);
	if (parsedPrototype !== Element.prototype) extendElement(Element.prototype, logger);
	let beastiesContainers = document.querySelectorAll("[data-beasties-container]");
	if (!beastiesContainers.length) {
		document.documentElement?.setAttribute("data-beasties-container", "");
		beastiesContainers = [document.documentElement || document];
	}
	document.beastiesContainers = beastiesContainers;
	for (const container of beastiesContainers) buildCache(container);
	return document;
}
/**
* Serialize a Document to an HTML String
*/
function serializeDocument(document) {
	return render(document, { decodeEntities: false });
}
/**
* Methods and descriptors to mix into Element.prototype
* @private
*/
var extendedMarker = Symbol.for("beasties.element-extended");
function extendElement(element, logger) {
	const appliedVersion = element[extendedMarker] ?? (Object.hasOwn(element, "nodeName") ? "an older version" : void 0);
	if (typeof appliedVersion === "string") {
		if (appliedVersion !== version) logger?.warn?.(`Multiple versions of beasties are patching the same \`domhandler\` instance (${appliedVersion} applied it, ${version} loaded after). Deduplicate beasties to a single version if you see unexpected DOM errors.`);
		return;
	}
	Object.defineProperties(element, {
		nodeName: { get() {
			return this.tagName.toUpperCase();
		} },
		id: {
			get() {
				return this.getAttribute("id");
			},
			set(value) {
				this.setAttribute("id", value);
			}
		},
		className: {
			get() {
				return this.getAttribute("class");
			},
			set(value) {
				this.setAttribute("class", value);
			}
		},
		insertBefore: { value(child, referenceNode) {
			if (!referenceNode) return this.appendChild(child);
			prepend(referenceNode, child);
			return child;
		} },
		appendChild: { value(child) {
			appendChild(this, child);
			return child;
		} },
		removeChild: { value(child) {
			removeElement(child);
		} },
		remove: { value() {
			removeElement(this);
		} },
		textContent: {
			get() {
				return getText(this);
			},
			set(text) {
				this.children = [];
				appendChild(this, new Text(text));
			}
		},
		setAttribute: { value(name, value) {
			this.attribs ??= {};
			value ??= "";
			this.attribs[name] = value;
		} },
		removeAttribute: { value(name) {
			if (this.attribs != null) delete this.attribs[name];
		} },
		getAttribute: { value(name) {
			return this.attribs != null && this.attribs[name];
		} },
		hasAttribute: { value(name) {
			return this.attribs != null && this.attribs[name] != null;
		} },
		getAttributeNode: { value(name) {
			const value = this.getAttribute(name);
			if (value != null) return {
				specified: true,
				value
			};
		} },
		exists: { value(sel) {
			return cachedQuerySelector(sel, this);
		} },
		querySelector: { value(sel) {
			return selectOne(sel, this);
		} },
		querySelectorAll: { value(sel) {
			return selectAll(sel, this);
		} }
	});
	Object.defineProperty(element, extendedMarker, {
		value: version,
		configurable: true
	});
}
function extendDocument(document) {
	Object.defineProperties(document, {
		nodeType: { get() {
			return 9;
		} },
		contentType: { get() {
			return "text/html";
		} },
		nodeName: { get() {
			return "#document";
		} },
		documentElement: { get() {
			return this.children.find((child) => "tagName" in child && String(child.tagName).toLowerCase() === "html");
		} },
		head: { get() {
			return this.querySelector("head");
		} },
		body: { get() {
			return this.querySelector("body");
		} },
		createElement: { value(name) {
			return new Element(name, {});
		} },
		createTextNode: { value(text) {
			return new Text(text);
		} },
		exists: { value(sel) {
			return cachedQuerySelector(sel, this);
		} },
		querySelector: { value(sel) {
			return selectOne(sel, this);
		} },
		querySelectorAll: { value(sel) {
			if (sel === ":root") return this;
			return selectAll(sel, this);
		} },
		beastiesContainer: { get() {
			return this.beastiesContainers?.[0];
		} }
	});
}
var selectorTokensCache = /* @__PURE__ */ new Map();
function cachedQuerySelector(sel, node) {
	let selectorTokens = selectorTokensCache.get(sel);
	if (selectorTokens === void 0) {
		selectorTokens = parseRelevantSelectors(sel);
		selectorTokensCache.set(sel, selectorTokens);
	}
	if (selectorTokens && node._classCache && node._idCache) {
		for (const token of selectorTokens) {
			if (token.name === "class" && !node._classCache.has(token.value)) return false;
			if (token.name === "id" && !node._idCache.has(token.value)) return false;
		}
		return true;
	}
	return !!selectOne(sel, node);
}
function parseRelevantSelectors(sel) {
	const tokens = parse$1(sel);
	const relevantTokens = [];
	for (let i = 0; i < tokens.length; i++) {
		const tokenGroup = tokens[i];
		if (tokenGroup?.length !== 1) return null;
		const token = tokenGroup[0];
		if (token?.type === "attribute" && (token.name === "class" || token.name === "id")) relevantTokens.push(token);
	}
	return relevantTokens.length > 0 ? relevantTokens : null;
}
/**
* Font family parsing shared by the compiler, the runtime and the DOM-based
* pipeline, so that families collected from `font-family` / `font`
* declarations can be compared with `@font-face` families regardless of
* quoting, escaping or case.
*/
var CSS_WIDE_KEYWORDS = /* @__PURE__ */ new Set([
	"inherit",
	"initial",
	"unset",
	"revert",
	"revert-layer"
]);
var HEX_ESCAPE_RE = /\\([0-9a-f]{1,6})[\t\n\f\r ]?/gi;
var CHAR_ESCAPE_RE = /\\(.)/g;
var WHITESPACE_RE$1 = /\s+/g;
var FONT_SIZE_RE = /^(?:[+-]?(?:\d+|\d*\.\d+)(?:[a-z]+|%)|calc\(|var\()/i;
var FONT_SIZE_KEYWORDS = /* @__PURE__ */ new Set([
	"xx-small",
	"x-small",
	"small",
	"medium",
	"large",
	"x-large",
	"xx-large",
	"xxx-large",
	"smaller",
	"larger"
]);
var UNICODE_RANGE_RE = /^u\+([0-9a-f]{1,6})(?:-([0-9a-f]{1,6}))?$/i;
var UNICODE_WILDCARD_RE = /^u\+([0-9a-f]{0,5})(\?{1,6})$/i;
/**
* Parse a `unicode-range` descriptor into flattened `[start, end, ...]`
* codepoint pairs, or `undefined` if any part of it isn't understood, in which
* case callers must treat the face as covering everything.
*/
function parseUnicodeRanges(value) {
	const ranges = [];
	for (const token of splitTopLevel(value)) {
		const part = token.trim();
		if (!part) continue;
		const wildcard = UNICODE_WILDCARD_RE.exec(part);
		if (wildcard) {
			const prefix = wildcard[1];
			const digits = wildcard[2].length;
			if (prefix.length + digits > 6) return;
			ranges.push(Number.parseInt(prefix + "0".repeat(digits), 16), Number.parseInt(prefix + "f".repeat(digits), 16));
			continue;
		}
		const range = UNICODE_RANGE_RE.exec(part);
		if (!range) return;
		const start = Number.parseInt(range[1], 16);
		const end = range[2] === void 0 ? start : Number.parseInt(range[2], 16);
		if (end < start) return;
		ranges.push(start, end);
	}
	return ranges.length > 0 ? ranges : void 0;
}
/**
* Whether any of a document's codepoints falls inside a face's `unicode-range`.
* Unknown ranges or unknown document text count as a match, so a face is only
* excluded when its subset is provably unused.
*/
function unicodeRangeUsed(ranges, chars) {
	if (!ranges || !chars) return true;
	for (const codepoint of chars) for (let i = 0; i < ranges.length; i += 2) if (codepoint >= ranges[i] && codepoint <= ranges[i + 1]) return true;
	return false;
}
var ENTITY_RE = /&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/iy;
var NAMED_ENTITIES = {
	amp: "&",
	apos: "'",
	gt: ">",
	lt: "<",
	nbsp: "\xA0",
	quot: "\""
};
function createTextCodepoints() {
	return {
		bmp: /* @__PURE__ */ new Uint8Array(65536),
		astral: /* @__PURE__ */ new Set(),
		complete: true
	};
}
/** Materialize collected codepoints, or `undefined` if some text was undecodable */
function toCodepointSet(text) {
	if (!text.complete) return;
	const chars = new Set(text.astral);
	for (let codepoint = 0; codepoint < text.bmp.length; codepoint++) if (text.bmp[codepoint]) chars.add(codepoint);
	return chars;
}
/**
* Add the codepoints of a run of (possibly entity-encoded) HTML text. An
* entity that can't be decoded clears `complete`, since the document then
* contains characters we can't account for.
*/
function addTextCodepoints(text, into) {
	const { bmp } = into;
	for (let index = 0; index < text.length; index++) {
		const code = text.charCodeAt(index);
		if (code === 38) {
			ENTITY_RE.lastIndex = index;
			const entity = ENTITY_RE.exec(text);
			if (entity) {
				const body = entity[1];
				if (body[0] === "#") {
					const codepoint = body[1] === "x" || body[1] === "X" ? Number.parseInt(body.slice(2), 16) : Number.parseInt(body.slice(1), 10);
					if (codepoint >= 0 && codepoint <= 65535) bmp[codepoint] = 1;
					else if (codepoint > 65535 && codepoint <= 1114111) into.astral.add(codepoint);
				} else {
					const decoded = NAMED_ENTITIES[body.toLowerCase()];
					if (decoded) bmp[decoded.charCodeAt(0)] = 1;
					else into.complete = false;
				}
				index = ENTITY_RE.lastIndex - 1;
				continue;
			}
		}
		if (code >= 55296 && code <= 56319 && index + 1 < text.length) {
			const low = text.charCodeAt(index + 1);
			if (low >= 56320 && low <= 57343) {
				into.astral.add((code - 55296) * 1024 + low - 56320 + 65536);
				index++;
				continue;
			}
		}
		bmp[code] = 1;
	}
}
/** Case-fold, unquote and unescape a single family name for comparison */
function normalizeFontFamily(family) {
	let value = family.trim();
	const quote = value[0];
	if ((quote === "\"" || quote === "'") && value.endsWith(quote) && value.length > 1) value = value.slice(1, -1);
	value = value.replace(HEX_ESCAPE_RE, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16))).replace(CHAR_ESCAPE_RE, "$1").replace(WHITESPACE_RE$1, " ").trim();
	return value.toLowerCase();
}
/**
* Extract normalized family names from the value of a `font-family` or `font`
* declaration. CSS-wide keywords and system font shorthands yield no families.
*/
function parseFontFamilies(prop, value) {
	const isShorthand = prop.toLowerCase() === "font";
	const segments = splitTopLevel(value);
	if (isShorthand) {
		const first = segments[0];
		if (first === void 0) return [];
		const tail = shorthandFamily(first);
		if (tail === void 0) return [];
		segments[0] = tail;
	}
	const families = [];
	for (const segment of segments) {
		const family = normalizeFontFamily(segment);
		if (family && !CSS_WIDE_KEYWORDS.has(family)) families.push(family);
	}
	return families;
}
/**
* The family portion of a `font` shorthand's first comma-separated segment, or
* `undefined` when the segment has no font-size and so declares no family
* (`font: inherit`, `font: menu`).
*/
function shorthandFamily(segment) {
	const tokens = segment.trim().replace(/\s*\/\s*/g, "/").split(/\s+/);
	for (let i = 0; i < tokens.length; i++) {
		const size = tokens[i].split("/")[0];
		if (FONT_SIZE_RE.test(size) || FONT_SIZE_KEYWORDS.has(size.toLowerCase())) return tokens.slice(i + 1).join(" ");
	}
}
/** Split a family list on top-level commas, ignoring those inside quotes or parens */
function splitTopLevel(value) {
	const segments = [];
	let start = 0;
	let depth = 0;
	let quote;
	for (let i = 0; i < value.length; i++) {
		const char = value[i];
		if (quote) {
			if (char === "\\") i++;
			else if (char === quote) quote = void 0;
			continue;
		}
		if (char === "\"" || char === "'") quote = char;
		else if (char === "(") depth++;
		else if (char === ")") depth = Math.max(0, depth - 1);
		else if (char === "," && depth === 0) {
			segments.push(value.slice(start, i));
			start = i + 1;
		}
	}
	segments.push(value.slice(start));
	return segments;
}
/**
* Conservative allowlist for re-emitting a `media` attribute value into
* generated JavaScript. `validateMediaQuery()` parses the query but tolerates
* quotes and semicolons, which would break out of the `onload` handler that the
* `media` and `js*` strategies build.
*
* @see https://github.com/angular/angular-cli/issues/33342
*/
var SAFE_MEDIA_RE = /^[\w\s\-(),:.]+$/;
function isSafeMediaValue(media) {
	return SAFE_MEDIA_RE.test(media);
}
var removePseudoClassesAndElementsPattern = /(?<!\\)::?[a-z-]+(?:\(.+\))?/gi;
var implicitUniversalPattern = /([>+~])\s*(?!\1)([>+~])/g;
var emptyCombinatorPattern = /([>+~])\s*(?=\1|$)/g;
var removeTrailingCommasPattern = /\(\s*,|,\s*\)/g;
var BEFORE_AFTER_PSEUDO_RE = /^::?(?:before|after)$/;
var UNEVALUABLE_SELECTOR_ERROR_RE = /^(?:unknown pseudo-class|pseudo-elements are not supported)/i;
/**
* Whether a selector matching error means the selector is valid CSS that cannot
* be evaluated statically (rather than a selector we failed to parse).
*/
function isUnevaluableSelectorError(message) {
	return UNEVALUABLE_SELECTOR_ERROR_RE.test(message);
}
/**
* Selectors that are considered critical regardless of whether they match an element in the document.
*/
function isAlwaysCriticalSelector(sel) {
	return sel === ":root" || sel === "html" || sel === "body" || sel[0] === ":" && BEFORE_AFTER_PSEUDO_RE.test(sel);
}
/**
* Strip pseudo-classes and pseudo-elements from a selector so it can be
* matched against the document, since we only care that the associated
* elements exist.
*/
function normalizeCssSelector(sel) {
	return sel.replace(removePseudoClassesAndElementsPattern, "").replace(removeTrailingCommasPattern, (match) => match.includes("(") ? "(" : ")").replace(implicitUniversalPattern, "$1 * $2").replace(emptyCombinatorPattern, "$1 *").trim();
}
var REMOTE_URL_RE = /^https?:\/\//;
var URL_RE_G = /url\((?:'([^']*)'|"([^"]*)"|([^()]*))\)/gi;
var ABSOLUTE_URL_RE = /^(?:[a-z][\w+.-]*:|\/\/|\/|#)/i;
/**
* Resolve a `url()` value that is relative to `baseHref` (the location of the
* stylesheet it was declared in) so that it can be used from the document instead.
*/
function resolveCssUrl(url, baseHref) {
	if (!url || ABSOLUTE_URL_RE.test(url)) return url;
	const base = baseHref.split("?")[0].split("#")[0];
	if (REMOTE_URL_RE.test(base) || base.startsWith("//")) try {
		const resolved = new URL(url, base.startsWith("//") ? `https:${base}` : base);
		return base.startsWith("//") ? resolved.href.replace(REMOTE_URL_RE, "//") : resolved.href;
	} catch {
		return url;
	}
	const dir = path.posix.dirname(base);
	if (dir === "." || dir === "") return url;
	return path.posix.join(dir, url);
}
function rewriteCssUrls(css, baseHref) {
	return css.replace(URL_RE_G, (match, singleQuoted, doubleQuoted, bare) => {
		const quote = singleQuoted !== void 0 ? "'" : doubleQuoted !== void 0 ? "\"" : "";
		const url = singleQuoted ?? doubleQuoted ?? bare?.trim() ?? "";
		const resolved = resolveCssUrl(url, baseHref);
		return resolved === url ? match : `url(${quote}${resolved}${quote})`;
	});
}
var LOG_LEVELS = [
	"trace",
	"debug",
	"info",
	"warn",
	"error",
	"silent"
];
var defaultLogger = {
	trace(msg) {
		console.trace(msg);
	},
	debug(msg) {
		console.debug(msg);
	},
	warn(msg) {
		console.warn(import_picocolors.default.yellow(msg));
	},
	error(msg) {
		console.error(import_picocolors.default.bold(import_picocolors.default.red(msg)));
	},
	info(msg) {
		console.info(import_picocolors.default.bold(import_picocolors.default.blue(msg)));
	},
	silent() {}
};
function createLogger(logLevel) {
	const logLevelIdx = LOG_LEVELS.indexOf(logLevel);
	return LOG_LEVELS.reduce((logger, type, index) => {
		if (index >= logLevelIdx) logger[type] = defaultLogger[type];
		else logger[type] = defaultLogger.silent;
		return logger;
	}, {});
}
var DEDUPE_WINDOW_MS = 6e4;
var DEDUPE_MAX_ENTRIES = 500;
var processSeen = /* @__PURE__ */ new Map();
/**
* Wrap a logger so that identical `warn`/`error` messages are only emitted once
* per scope. Server-side rendering constructs a Beasties instance per request,
* so the default scope is the process.
*/
function createDeduplicatingLogger(logger, scope) {
	if (scope === false) return logger;
	const seen = scope === "process" ? processSeen : /* @__PURE__ */ new Map();
	const shouldEmit = (level, message) => {
		const key = `${level}:${message}`;
		const now = Date.now();
		const last = seen.get(key);
		if (last !== void 0 && now - last < DEDUPE_WINDOW_MS) return false;
		if (seen.size >= DEDUPE_MAX_ENTRIES) seen.clear();
		seen.set(key, now);
		return true;
	};
	const deduped = { ...logger };
	for (const level of ["warn", "error"]) {
		const original = logger[level];
		if (!original) continue;
		deduped[level] = (message) => {
			if (shouldEmit(level, message)) original.call(logger, message);
		};
	}
	return deduped;
}
function isSubpath(basePath, currentPath) {
	return !path.relative(basePath, currentPath).startsWith("..");
}
var LEADING_SLASH_OR_QUERY_RE = /^\/(?!\/)|[?#].*$/g;
var PUBLIC_PATH_RE = /(^\/(?!\/)|\/$)/g;
var FONT_PROP_RE = /^font(?:-family)?$/i;
var NON_RENDERED_ELEMENTS = /* @__PURE__ */ new Set([
	"script",
	"style",
	"template",
	"noscript",
	"head",
	"title"
]);
var RENDERED_ATTRS = [
	"alt",
	"label",
	"placeholder",
	"title",
	"value"
];
var LEADING_SLASH_RE = /^\//;
var WHITESPACE_RE = /\s+/;
var URL_RE = /url\s*\(\s*(['"]?)(.+?)\1\s*\)/;
var DEFERRED_MEDIA_ATTR = "data-beasties-media";
var DEFERRED_MEDIA_SCRIPT = `document.querySelectorAll('link[${DEFERRED_MEDIA_ATTR}]').forEach(function(l){l.media=l.getAttribute('${DEFERRED_MEDIA_ATTR}');l.removeAttribute('${DEFERRED_MEDIA_ATTR}')})`;
var Beasties = class Beasties {
	#selectorCache = /* @__PURE__ */ new Map();
	#preloadedFonts = /* @__PURE__ */ new WeakMap();
	#documentChars = /* @__PURE__ */ new WeakMap();
	options;
	logger;
	fs;
	constructor(options = {}) {
		this.options = Object.assign({
			logLevel: "info",
			path: "",
			publicPath: "",
			reduceInlineStyles: true,
			pruneSource: false,
			additionalStylesheets: [],
			allowRules: [],
			dedupeWarnings: "process"
		}, options);
		this.logger = createDeduplicatingLogger(this.options.logger || createLogger(this.options.logLevel), this.options.dedupeWarnings === true ? "process" : this.options.dedupeWarnings);
	}
	/**
	* Read the contents of a file from the specified filesystem or disk
	*/
	readFile(filename) {
		const fs = this.fs;
		return new Promise((resolve, reject) => {
			const callback = (err, data) => {
				if (err) reject(err);
				else resolve(data.toString());
			};
			if (fs && fs.readFile) fs.readFile(filename, callback);
			else readFile(filename, "utf-8", callback);
		});
	}
	/**
	* Write content to a file
	*/
	writeFile(filename, data) {
		const fs = this.fs;
		return new Promise((resolve, reject) => {
			const callback = (err) => {
				if (err) reject(err);
				else resolve();
			};
			if (fs && fs.writeFile) fs.writeFile(filename, data, callback);
			else writeFile(filename, data, callback);
		});
	}
	/**
	* Apply critical CSS processing to the html
	*/
	async process(html) {
		const start = Date.now();
		const document = createDocument(html, this.logger);
		if (this.options.additionalStylesheets.length > 0) await this.embedAdditionalStylesheet(document);
		if (this.options.external !== false) {
			const externalSheets = [...document.querySelectorAll("link[rel=\"stylesheet\"]")];
			if (this.embedLinkedStylesheet !== Beasties.prototype.embedLinkedStylesheet) for (const link of externalSheets) await this.embedLinkedStylesheet(link, document);
			else {
				const sheets = await Promise.all(externalSheets.map((link) => this.fetchStylesheet(link, document)));
				for (const sheet of sheets) if (sheet) this.embedFetchedStylesheet(sheet, document);
			}
		}
		if (this.options.preload === "media-script") this.injectDeferredMediaScript(document);
		const styles = this.getAffectedStyleTags(document);
		for (const style of styles) this.processStyle(style, document);
		if (this.options.mergeStylesheets !== false && styles.length !== 0) this.mergeStylesheets(document);
		const output = serializeDocument(document);
		const end = Date.now();
		this.logger.info?.(`Time ${end - start}ms`);
		return output;
	}
	/**
	* Get the style tags that need processing
	*/
	getAffectedStyleTags(document) {
		const styles = [...document.querySelectorAll("style")];
		if (this.options.reduceInlineStyles === false) return styles.filter((style) => style.$$external);
		return styles;
	}
	/**
	* Append the single deferred-CSS activation script used by the `"media-script"`
	* strategy, if any link was actually deferred. The script body is invariant, so
	* it can be covered by a CSP hash as well as by `options.nonce`.
	*/
	injectDeferredMediaScript(document) {
		if (document.querySelectorAll(`link[${DEFERRED_MEDIA_ATTR}]`).length === 0) return;
		const script = document.createElement("script");
		this.applyNonce(document, script);
		script.textContent = DEFERRED_MEDIA_SCRIPT;
		document.body.appendChild(script);
	}
	#nonces = /* @__PURE__ */ new WeakMap();
	applyNonce(document, element) {
		if (!this.#nonces.has(document)) this.#nonces.set(document, typeof this.options.nonce === "function" ? this.options.nonce(document) : this.options.nonce);
		const nonce = this.#nonces.get(document);
		if (nonce) element.setAttribute("nonce", nonce);
	}
	mergeStylesheets(document) {
		const styles = this.getAffectedStyleTags(document);
		if (styles.length === 0) {
			this.logger.warn?.("Merging inline stylesheets into a single <style> tag skipped, no inline stylesheets to merge");
			return;
		}
		const first = styles[0];
		let sheet = first.textContent;
		for (let i = 1; i < styles.length; i++) {
			const node = styles[i];
			sheet += node.textContent;
			node.remove();
		}
		first.textContent = sheet;
	}
	/**
	* Given href, find the corresponding CSS asset
	*/
	async getCssAsset(href, _style) {
		const outputPath = this.options.path;
		const publicPath = this.options.publicPath;
		let normalizedPath = href.replace(LEADING_SLASH_OR_QUERY_RE, "");
		const pathPrefix = `${(publicPath || "").replace(PUBLIC_PATH_RE, "")}/`;
		if (normalizedPath.startsWith(pathPrefix) && !(pathPrefix === "/" && normalizedPath.startsWith("//"))) normalizedPath = normalizedPath.substring(pathPrefix.length).replace(LEADING_SLASH_RE, "");
		if (REMOTE_URL_RE.test(normalizedPath) || normalizedPath.startsWith("//")) {
			if (this.options.remote === true) try {
				const absoluteUrl = href.startsWith("//") ? `https:${href}` : href;
				const response = await fetch(absoluteUrl);
				if (!response.ok) {
					this.logger.warn?.(`Failed to fetch ${absoluteUrl} (${response.status})`);
					return;
				}
				return await response.text();
			} catch (error) {
				this.logger.warn?.(`Error fetching ${href}: ${error.message}`);
				return;
			}
			return;
		}
		const filename = path.resolve(outputPath, normalizedPath);
		if (!isSubpath(outputPath, filename)) return;
		let sheet;
		try {
			sheet = await this.readFile(filename);
		} catch {
			this.logger.warn?.(`Unable to locate stylesheet ${href} (resolved to ${filename}, using path: ${JSON.stringify(outputPath)}, publicPath: ${JSON.stringify(publicPath)}). If this file is not part of your build output, add data-beasties-skip to its <link> to skip it.`);
		}
		return sheet;
	}
	checkInlineThreshold(link, style, sheet) {
		if (this.options.inlineThreshold && sheet.length < this.options.inlineThreshold) {
			const href = style.$$name;
			style.$$reduce = false;
			this.logger.info?.(`\u001B[32mInlined all of ${href} (${sheet.length} was below the threshold of ${this.options.inlineThreshold})\u001B[39m`);
			link.remove();
			return true;
		}
		return false;
	}
	/**
	* Inline the stylesheets from options.additionalStylesheets (assuming it passes `options.filter`)
	*/
	async embedAdditionalStylesheet(document) {
		const styleSheetsIncluded = [];
		const sources = await Promise.all(this.options.additionalStylesheets.map((cssFile) => {
			if (styleSheetsIncluded.includes(cssFile)) return [];
			styleSheetsIncluded.push(cssFile);
			const style = document.createElement("style");
			this.applyNonce(document, style);
			style.$$external = true;
			style.$$name = cssFile;
			return this.getCssAsset(cssFile, style).then((sheet) => [sheet, style]);
		}));
		for (const [sheet, style] of sources) if (sheet) {
			style.textContent = sheet;
			document.head.appendChild(style);
		}
	}
	/**
	* Fetch CSS content for a linked stylesheet
	*/
	async fetchStylesheet(link, document) {
		if (link.hasAttribute("data-beasties-skip")) return;
		const href = link.getAttribute("href");
		if (!(href?.split("?")[0]?.split("#")[0])?.endsWith(".css")) return;
		const style = document.createElement("style");
		this.applyNonce(document, style);
		style.$$external = true;
		const sheet = await this.getCssAsset(href, style);
		if (!sheet) return;
		return {
			link,
			href,
			sheet,
			style
		};
	}
	/**
	* Embed a fetched stylesheet into the document
	*/
	embedFetchedStylesheet(data, document) {
		const { link, href, sheet, style } = data;
		style.textContent = sheet;
		style.$$name = href;
		style.$$links = [link];
		link.parentNode?.insertBefore(style, link);
		if (this.checkInlineThreshold(link, style, sheet)) return;
		let media = link.getAttribute("media");
		if (media && (!validateMediaQuery(media) || !isSafeMediaValue(media))) media = void 0;
		const preloadMode = this.options.preload;
		let cssLoaderPreamble = "function $loadcss(u,m,l){(l=document.createElement('link')).rel='stylesheet';l.href=u;document.head.appendChild(l)}";
		if (preloadMode === "js-lazy") cssLoaderPreamble = cssLoaderPreamble.replace("l.href", "l.media='print';l.onload=function(){l.media=m};l.href");
		if (preloadMode === false) return;
		let noscriptFallback = false;
		let updateLinkToPreload = false;
		const noscriptLink = link.cloneNode(false);
		if (preloadMode === "body") document.body.appendChild(link);
		else if (preloadMode === "js" || preloadMode === "js-lazy") {
			const script = document.createElement("script");
			this.applyNonce(document, script);
			script.setAttribute("data-href", href);
			script.setAttribute("data-media", media || "all");
			script.textContent = `${cssLoaderPreamble}$loadcss(document.currentScript.dataset.href,document.currentScript.dataset.media)`;
			link.parentNode.insertBefore(script, link.nextSibling);
			style.$$links.push(script);
			cssLoaderPreamble = "";
			noscriptFallback = true;
			updateLinkToPreload = true;
		} else if (preloadMode === "media-script") {
			link.setAttribute("media", "print");
			link.setAttribute(DEFERRED_MEDIA_ATTR, media || "all");
			noscriptFallback = true;
		} else if (preloadMode === "media") {
			link.setAttribute("media", "print");
			link.setAttribute("onload", `this.media='${media || "all"}'`);
			noscriptFallback = true;
		} else if (preloadMode === "swap-high") {
			link.setAttribute("rel", "alternate stylesheet preload");
			link.setAttribute("title", "styles");
			link.setAttribute("as", "style");
			link.setAttribute("onload", `this.title='';this.rel='stylesheet'`);
			noscriptFallback = true;
		} else if (preloadMode === "swap-low") {
			link.setAttribute("rel", "alternate stylesheet");
			link.setAttribute("title", "styles");
			link.setAttribute("onload", `this.title='';this.rel='stylesheet'`);
			noscriptFallback = true;
		} else if (preloadMode === "swap") {
			link.setAttribute("onload", "this.rel='stylesheet'");
			updateLinkToPreload = true;
			noscriptFallback = true;
		} else {
			const bodyLink = link.cloneNode(false);
			bodyLink.removeAttribute("id");
			document.body.appendChild(bodyLink);
			style.$$links.push(bodyLink);
			updateLinkToPreload = true;
		}
		if (this.options.noscriptFallback !== false && noscriptFallback && !href.includes("</noscript>")) {
			const noscript = document.createElement("noscript");
			noscriptLink.removeAttribute("id");
			noscript.appendChild(noscriptLink);
			link.parentNode.insertBefore(noscript, link.nextSibling);
			style.$$links.push(noscript);
		}
		if (updateLinkToPreload) {
			link.setAttribute("rel", "preload");
			link.setAttribute("as", "style");
		}
	}
	/**
	* Inline the target stylesheet referred to by a <link rel="stylesheet"> (assuming it passes `options.filter`)
	*/
	async embedLinkedStylesheet(link, document) {
		const sheet = await this.fetchStylesheet(link, document);
		if (sheet) this.embedFetchedStylesheet(sheet, document);
	}
	/**
	* Prune the source CSS files
	*/
	pruneSource(style, before, sheetInverse) {
		const minSize = this.options.minimumExternalSize;
		const name = style.$$name;
		const shouldInline = minSize && sheetInverse.length < minSize;
		if (shouldInline) this.logger.info?.(`\u001B[32mInlined all of ${name} (non-critical external stylesheet would have been ${sheetInverse.length}b, which was below the threshold of ${minSize})\u001B[39m`);
		if (shouldInline || !sheetInverse) {
			style.textContent = before;
			if (style.$$links) for (const link of style.$$links) link.parentNode?.removeChild(link);
		}
		return !!shouldInline;
	}
	/**
	* Parse the stylesheet within a <style> element, then reduce it to contain only rules used by the document.
	*/
	processStyle(style, document) {
		if (style.$$reduce === false) {
			if (style.$$name && style.textContent) style.textContent = rewriteCssUrls(style.textContent, style.$$name);
			return;
		}
		const name = style.$$name ? style.$$name.replace(LEADING_SLASH_RE, "") : "inline CSS";
		const options = this.options;
		const beastiesContainers = document.beastiesContainers;
		let keyframesMode = options.keyframes ?? "critical";
		if (keyframesMode === true) keyframesMode = "all";
		if (keyframesMode === false) keyframesMode = "none";
		let sheet = style.textContent;
		const before = sheet;
		if (!sheet) return;
		const ast = parseStylesheet(sheet, { safeParser: this.options.safeParser !== false });
		const astInverse = options.pruneSource ? parseStylesheet(sheet, { safeParser: this.options.safeParser !== false }) : null;
		const criticalFonts = /* @__PURE__ */ new Set();
		const unparseableSelectors = [];
		const criticalKeyframeNames = /* @__PURE__ */ new Set();
		let includeNext = false;
		let includeAll = false;
		let excludeNext = false;
		let excludeAll = false;
		let warnedCritters = false;
		const shouldPreloadFonts = options.fonts === true || options.preloadFonts === true;
		const shouldInlineFonts = options.fonts !== false && options.inlineFonts === true;
		walkStyleRules(ast, markOnly((rule) => {
			if (rule.type === "comment") {
				const { command, deprecated, warning } = parseDirective(rule.text);
				if (warning) this.logger.warn?.(warning);
				if (deprecated && !warnedCritters) {
					warnedCritters = true;
					this.logger.warn?.(CRITTERS_DEPRECATION_WARNING);
				}
				if (command) switch (command) {
					case "include":
						includeNext = true;
						break;
					case "exclude":
						excludeNext = true;
						break;
					case "include start":
						includeAll = true;
						break;
					case "include end":
						includeAll = false;
						break;
					case "exclude start":
						excludeAll = true;
						break;
					case "exclude end": excludeAll = false;
				}
			}
			if (rule.type === "rule") {
				if (includeNext) {
					includeNext = false;
					return true;
				}
				if (excludeNext) {
					excludeNext = false;
					return false;
				}
				if (includeAll) return true;
				if (excludeAll) return false;
				rule.filterSelectors?.((sel) => {
					if (options.allowRules.some((exp) => {
						if (exp instanceof RegExp) return exp.test(sel);
						return exp === sel;
					})) return true;
					if (isAlwaysCriticalSelector(sel)) return true;
					sel = this.normalizeCssSelector(sel);
					if (!sel) return false;
					try {
						return beastiesContainers.some((container) => container.exists(sel));
					} catch (e) {
						const message = e.message || String(e);
						if (isUnevaluableSelectorError(message)) this.logger.debug?.(`Cannot statically evaluate selector, excluding it from critical CSS: ${sel} (${message})`);
						else unparseableSelectors.push(`${sel} (${message})`);
						return false;
					}
				});
				if (!rule.selector) return false;
				if (rule.nodes) for (const decl of rule.nodes) {
					if (!("prop" in decl)) continue;
					if ((shouldInlineFonts || shouldPreloadFonts) && FONT_PROP_RE.test(decl.prop)) for (const family of parseFontFamilies(decl.prop, decl.value)) criticalFonts.add(family);
					if (decl.prop === "animation" || decl.prop === "animation-name") for (const name of decl.value.split(WHITESPACE_RE)) {
						const nameTrimmed = name.trim();
						if (nameTrimmed) criticalKeyframeNames.add(nameTrimmed);
					}
				}
			}
			if (rule.type === "atrule" && (rule.name === "font-face" || rule.name === "layer")) return;
			return ("nodes" in rule && rule.nodes?.some((rule) => !rule.$$remove)) ?? true;
		}));
		if (unparseableSelectors.length !== 0) {
			const single = unparseableSelectors.length === 1;
			this.logger.warn?.(`Could not parse ${single ? "1 selector" : `${unparseableSelectors.length} selectors`} in ${style.$$name || "inline styles"}; ${single ? "its rule was" : "their rules were"} left out of the critical CSS but still ${single ? "applies" : "apply"} once the full stylesheet loads:\n  ${unparseableSelectors.join("\n  ")}`);
		}
		const preloadedFonts = this.getPreloadedFonts(document);
		walkStyleRulesWithReverseMirror(ast, astInverse, (rule) => {
			if (rule.$$remove === true) return false;
			if ("selectors" in rule) applyMarkedSelectors(rule);
			if (rule.type === "atrule" && rule.name === "keyframes") {
				if (keyframesMode === "none") return false;
				if (keyframesMode === "all") return true;
				return criticalKeyframeNames.has(rule.params);
			}
			if (rule.type === "atrule" && rule.name === "font-face") {
				let family, src, ranges;
				let used = false;
				if (rule.nodes) {
					for (const decl of rule.nodes) {
						if (!("prop" in decl)) continue;
						if (decl.prop === "src") src = (decl.value.match(URL_RE) || [])[2];
						else if (decl.prop === "font-family") family = decl.value;
						else if (decl.prop === "unicode-range") ranges = parseUnicodeRanges(decl.value);
					}
					used = !!family && criticalFonts.has(normalizeFontFamily(family)) && (!ranges || unicodeRangeUsed(ranges, this.getDocumentChars(document)));
					if (used && src && shouldPreloadFonts) {
						const href = style.$$name ? resolveCssUrl(src.trim(), style.$$name) : src.trim();
						if (!preloadedFonts.has(href)) {
							preloadedFonts.add(href);
							const preload = document.createElement("link");
							preload.setAttribute("rel", "preload");
							preload.setAttribute("as", "font");
							preload.setAttribute("crossorigin", "anonymous");
							preload.setAttribute("href", href);
							document.head.appendChild(preload);
						}
					}
				}
				if (!shouldInlineFonts || !used) return false;
			}
		});
		sheet = serializeStylesheet(ast, { compress: this.options.compress !== false });
		if (style.$$name) sheet = rewriteCssUrls(sheet, style.$$name);
		if (sheet.trim().length === 0) {
			if (style.parentNode) style.remove();
			return;
		}
		let afterText = "";
		let styleInlinedCompletely = false;
		if (options.pruneSource) {
			const sheetInverse = serializeStylesheet(astInverse, { compress: this.options.compress !== false });
			styleInlinedCompletely = this.pruneSource(style, style.$$name ? rewriteCssUrls(before, style.$$name) : before, sheetInverse);
			if (styleInlinedCompletely) afterText = `, reducing non-inlined size ${sheetInverse.length / before.length * 100 | 0}% to ${formatSize(sheetInverse.length)}`;
			const cssFilePath = path.resolve(this.options.path, name);
			this.writeFile(cssFilePath, sheetInverse).then(() => this.logger.info?.(`${name} was successfully updated`)).catch((err) => this.logger.error?.(err));
		}
		if (!styleInlinedCompletely) style.textContent = sheet;
		const percent = sheet.length / before.length * 100 | 0;
		this.logger.info?.(`\u001B[32mInlined ${formatSize(sheet.length)} (${percent}% of original ${formatSize(before.length)}) of ${name}${afterText}.\u001B[39m`);
	}
	/**
	* Codepoints of a document's rendered text, or `undefined` when its text
	* could not be read exactly, which disables `unicode-range` filtering.
	*/
	getDocumentChars(document) {
		if (this.#documentChars.has(document)) return this.#documentChars.get(document);
		const text = createTextCodepoints();
		const queue = [document];
		while (queue.length > 0) {
			const node = queue.pop();
			if (node.type === "text") {
				addTextCodepoints(node.data, text);
				continue;
			}
			if (node.type === "tag") {
				if (NON_RENDERED_ELEMENTS.has(node.nodeName.toLowerCase())) continue;
				for (const attr of RENDERED_ATTRS) {
					const value = node.getAttribute(attr);
					if (value) addTextCodepoints(value, text);
				}
			}
			if ("children" in node) queue.push(...node.children);
		}
		const chars = toCodepointSet(text);
		this.#documentChars.set(document, chars);
		return chars;
	}
	/**
	* Font URLs already preloaded for a document, whether by beasties while
	* processing an earlier stylesheet or by the document itself.
	*/
	getPreloadedFonts(document) {
		let preloaded = this.#preloadedFonts.get(document);
		if (!preloaded) {
			preloaded = /* @__PURE__ */ new Set();
			for (const link of document.querySelectorAll("link[rel=\"preload\"][as=\"font\"]")) {
				const href = link.getAttribute("href");
				if (href) preloaded.add(href);
			}
			this.#preloadedFonts.set(document, preloaded);
		}
		return preloaded;
	}
	normalizeCssSelector(sel) {
		let normalizedSelector = this.#selectorCache.get(sel);
		if (normalizedSelector !== void 0) return normalizedSelector;
		normalizedSelector = normalizeCssSelector(sel);
		this.#selectorCache.set(sel, normalizedSelector);
		return normalizedSelector;
	}
};
function formatSize(size) {
	if (size <= 0) return "0 bytes";
	const abbreviations = [
		"bytes",
		"kB",
		"MB",
		"GB"
	];
	const index = Math.floor(Math.log(size) / Math.log(1024));
	const roundedSize = size / 1024 ** index;
	const fractionDigits = index === 0 ? 0 : 2;
	return `${roundedSize.toFixed(fractionDigits)} ${abbreviations[index]}`;
}
//#endregion
//#region node_modules/@angular/ssr/fesm2022/node.mjs
function getAllowedHostsFromEnv() {
	return getArrayFromEnv("NG_ALLOWED_HOSTS");
}
function getTrustProxyHeadersFromEnv() {
	return getArrayFromEnv("NG_TRUST_PROXY_HEADERS");
}
function getArrayFromEnv(envName) {
	const envValue = process.env[envName];
	if (!envValue) return;
	const values = [];
	for (const value of envValue.split(",")) {
		const trimmed = value.trim();
		if (trimmed.length > 0) values.push(trimmed);
	}
	return values;
}
function attachNodeGlobalErrorHandlers() {
	if (typeof Zone !== "undefined") return;
	const gThis = globalThis;
	if (gThis.ngAttachNodeGlobalErrorHandlersCalled) return;
	gThis.ngAttachNodeGlobalErrorHandlersCalled = true;
	process.on("unhandledRejection", (error) => console.error("unhandledRejection", error)).on("uncaughtException", (error) => console.error("uncaughtException", error));
}
var CommonEngineInlineCriticalCssProcessor = class {
	resourceCache = /* @__PURE__ */ new Map();
	async process(html, outputPath) {
		const processor = new Beasties({
			logger: {
				warn: (s) => console.warn(s),
				error: (s) => console.error(s),
				info: () => {}
			},
			logLevel: "warn",
			path: outputPath,
			publicPath: void 0,
			compress: false,
			pruneSource: false,
			reduceInlineStyles: false,
			mergeStylesheets: false,
			preload: "media-script",
			nonce: (document) => {
				const nonceElement = document.querySelector("[ngCspNonce], [ngcspnonce]");
				return nonceElement?.getAttribute("ngCspNonce") || nonceElement?.getAttribute("ngcspnonce");
			},
			noscriptFallback: true,
			inlineFonts: true
		});
		processor.readFile = async (path) => {
			let resourceContent = this.resourceCache.get(path);
			if (resourceContent === void 0) {
				resourceContent = await readFile$1(path, "utf-8");
				this.resourceCache.set(path, resourceContent);
			}
			return resourceContent;
		};
		return processor.process(html);
	}
};
var PERFORMANCE_MARK_PREFIX = "🅰️";
function printPerformanceLogs() {
	let maxWordLength = 0;
	const benchmarks = [];
	for (const { name, duration } of performance.getEntriesByType("measure")) {
		if (!name.startsWith(PERFORMANCE_MARK_PREFIX)) continue;
		const step = name.slice(4) + ":";
		if (step.length > maxWordLength) maxWordLength = step.length;
		benchmarks.push([step, `${duration.toFixed(1)}ms`]);
		performance.clearMeasures(name);
	}
	console.log("********** Performance results **********");
	for (const [step, value] of benchmarks) {
		const spaces = maxWordLength - step.length + 5;
		console.log(step + " ".repeat(spaces) + value);
	}
	console.log("*****************************************");
}
async function runMethodAndMeasurePerf(label, asyncMethod) {
	const labelName = `${PERFORMANCE_MARK_PREFIX}:${label}`;
	const startLabel = `start:${labelName}`;
	const endLabel = `end:${labelName}`;
	try {
		performance.mark(startLabel);
		return await asyncMethod();
	} finally {
		performance.mark(endLabel);
		performance.measure(labelName, startLabel, endLabel);
		performance.clearMarks(startLabel);
		performance.clearMarks(endLabel);
	}
}
function noopRunMethodAndMeasurePerf(label, asyncMethod) {
	return asyncMethod();
}
var SSG_MARKER_REGEXP = /ng-server-context=["']\w*\|?ssg\|?\w*["']/;
var CommonEngine = class {
	options;
	templateCache = /* @__PURE__ */ new Map();
	inlineCriticalCssProcessor = new CommonEngineInlineCriticalCssProcessor();
	pageIsSSG = /* @__PURE__ */ new Map();
	allowedHosts;
	constructor(options) {
		this.options = options;
		this.allowedHosts = new Set(getAllowedHostsFromEnv() ?? this.options?.allowedHosts ?? []);
		attachNodeGlobalErrorHandlers();
	}
	async render(opts) {
		const { url } = opts;
		if (url && URL$1.canParse(url)) {
			const urlObj = new URL$1(url);
			try {
				validateUrl(urlObj, this.allowedHosts);
			} catch (error) {
				console.error(`ERROR: ${error.message}Please provide a list of allowed hosts in the "allowedHosts" option in the "CommonEngine" constructor.`);
				throw error;
			}
		}
		const enablePerformanceProfiler = this.options?.enablePerformanceProfiler;
		const runMethod = enablePerformanceProfiler ? runMethodAndMeasurePerf : noopRunMethodAndMeasurePerf;
		let html = await runMethod("Retrieve SSG Page", () => this.retrieveSSGPage(opts));
		if (html === void 0) {
			html = await runMethod("Render Page", () => this.renderApplication(opts));
			if (opts.inlineCriticalCss !== false) html = await runMethod("Inline Critical CSS", () => this.inlineCriticalCss(html, opts));
		}
		if (enablePerformanceProfiler) printPerformanceLogs();
		return html;
	}
	inlineCriticalCss(html, opts) {
		const outputPath = opts.publicPath ?? (opts.documentFilePath ? dirname(opts.documentFilePath) : "");
		return this.inlineCriticalCssProcessor.process(html, outputPath);
	}
	async retrieveSSGPage(opts) {
		const { publicPath, documentFilePath, url } = opts;
		if (!publicPath || !documentFilePath || url === void 0) return;
		const { pathname } = new URL$1(url, "resolve://");
		const pagePath = join(publicPath, pathname, "index.html");
		const relativePath = relative(publicPath, pagePath);
		if (relativePath === ".." || relativePath.startsWith("../") || relativePath.startsWith("..\\") || isAbsolute(relativePath)) return;
		if (this.pageIsSSG.get(pagePath)) return fs.promises.readFile(pagePath, "utf-8");
		if (pagePath === resolve(documentFilePath) || !await exists(pagePath)) return;
		const content = await fs.promises.readFile(pagePath, "utf-8");
		if (SSG_MARKER_REGEXP.test(content)) {
			this.pageIsSSG.set(pagePath, true);
			return content;
		}
	}
	async renderApplication(opts) {
		const moduleOrFactory = this.options?.bootstrap ?? opts.bootstrap;
		if (!moduleOrFactory) throw new Error("A module or bootstrap option must be provided.");
		const extraProviders = [
			{
				provide: SERVER_CONTEXT,
				useValue: "ssr"
			},
			...opts.providers ?? [],
			...this.options?.providers ?? []
		];
		let document = opts.document;
		if (!document && opts.documentFilePath) document = await this.getDocument(opts.documentFilePath);
		const commonRenderingOptions = {
			url: opts.url,
			document,
			allowedHosts: ["*"]
		};
		return isBootstrapFn(moduleOrFactory) ? renderApplication(moduleOrFactory, {
			platformProviders: extraProviders,
			...commonRenderingOptions
		}) : renderModule(moduleOrFactory, {
			extraProviders,
			...commonRenderingOptions
		});
	}
	async getDocument(filePath) {
		let doc = this.templateCache.get(filePath);
		if (!doc) {
			doc = await fs.promises.readFile(filePath, "utf-8");
			this.templateCache.set(filePath, doc);
		}
		return doc;
	}
};
async function exists(path) {
	try {
		await fs.promises.access(path, fs.constants.F_OK);
		return true;
	} catch {
		return false;
	}
}
function isBootstrapFn(value) {
	return typeof value === "function" && !("ɵmod" in value);
}
var HTTP2_PSEUDO_HEADERS = /* @__PURE__ */ new Set([
	":method",
	":scheme",
	":authority",
	":path",
	":status"
]);
function createWebRequestFromNodeRequest(nodeRequest, trustProxyHeaders) {
	const trustProxyHeadersNormalized = normalizeTrustProxyHeaders(trustProxyHeaders);
	const { headers, method = "GET" } = nodeRequest;
	const withBody = method !== "GET" && method !== "HEAD";
	const referrer = headers.referer && URL.canParse(headers.referer) ? headers.referer : void 0;
	const controller = new AbortController();
	if (nodeRequest.aborted) controller.abort();
	else {
		const onAbort = () => controller.abort();
		nodeRequest.once("aborted", onAbort);
		nodeRequest.once("close", () => nodeRequest.off("aborted", onAbort));
	}
	return new Request(createRequestUrl(nodeRequest, trustProxyHeadersNormalized), {
		method,
		signal: controller.signal,
		headers: createRequestHeaders(headers),
		body: withBody ? nodeRequest : void 0,
		duplex: withBody ? "half" : void 0,
		referrer
	});
}
function createRequestHeaders(nodeHeaders) {
	const headers = new Headers();
	for (const [name, value] of Object.entries(nodeHeaders)) {
		if (HTTP2_PSEUDO_HEADERS.has(name)) continue;
		if (typeof value === "string") headers.append(name, value);
		else if (Array.isArray(value)) for (const item of value) headers.append(name, item);
	}
	return headers;
}
function createRequestUrl(nodeRequest, trustProxyHeaders) {
	const { headers, socket, url = "", originalUrl } = nodeRequest;
	const forwardedHeaderValue = getAllowedProxyHeaderValue(headers, "forwarded", trustProxyHeaders);
	const forwardedParams = parseForwardedHeader(forwardedHeaderValue);
	const protocol = forwardedParams.proto ?? getAllowedProxyHeaderValue(headers, "x-forwarded-proto", trustProxyHeaders) ?? ("encrypted" in socket && socket.encrypted ? "https" : "http");
	const hostname = forwardedParams.host ?? getAllowedProxyHeaderValue(headers, "x-forwarded-host", trustProxyHeaders) ?? headers.host ?? headers[":authority"];
	if (Array.isArray(hostname)) throw new Error("host value cannot be an array.");
	let hostnameWithPort = hostname;
	if (!hostname?.includes(":")) {
		const port = getAllowedProxyHeaderValue(headers, "x-forwarded-port", trustProxyHeaders);
		if (port) hostnameWithPort += `:${port}`;
	}
	return new URL(`${protocol}://${hostnameWithPort}${originalUrl ?? url}`);
}
function getAllowedProxyHeaderValue(headers, headerName, trustProxyHeaders) {
	return isProxyHeaderAllowed(headerName, trustProxyHeaders) ? getFirstHeaderValue(headers[headerName]) : void 0;
}
var AngularNodeAppEngine = class {
	angularAppEngine;
	trustProxyHeaders;
	constructor(options) {
		const appEngineOptions = {
			...options,
			allowedHosts: options?.allowedHosts ?? getAllowedHostsFromEnv(),
			trustProxyHeaders: options?.trustProxyHeaders ?? getTrustProxyHeadersFromEnv()
		};
		this.angularAppEngine = new AngularAppEngine(appEngineOptions);
		this.trustProxyHeaders = appEngineOptions.trustProxyHeaders;
		attachNodeGlobalErrorHandlers();
	}
	async handle(request, requestContext) {
		const webRequest = request instanceof Request ? request : createWebRequestFromNodeRequest(request, this.trustProxyHeaders);
		return this.angularAppEngine.handle(webRequest, requestContext);
	}
};
function createNodeRequestHandler(handler) {
	handler["__ng_node_request_handler__"] = true;
	return handler;
}
function isResponseDestroyedOrClosed(destination) {
	return destination.destroyed || destination.closed || destination.writableEnded || "stream" in destination && (!destination.stream || destination.stream.destroyed || destination.stream.closed);
}
async function writeResponseToNodeResponse(source, destination) {
	if (isResponseDestroyedOrClosed(destination)) return;
	const { status, headers, body } = source;
	destination.statusCode = status;
	let cookieHeaderSet = false;
	for (const [name, value] of headers.entries()) if (name === "set-cookie") {
		if (cookieHeaderSet) continue;
		destination.setHeader(name, headers.getSetCookie());
		cookieHeaderSet = true;
	} else destination.setHeader(name, value);
	if ("flushHeaders" in destination) destination.flushHeaders();
	if (!body) {
		if (!isResponseDestroyedOrClosed(destination)) destination.end();
		return;
	}
	let isClosed = isResponseDestroyedOrClosed(destination);
	const isDestroyedOrClosed = () => isClosed || isResponseDestroyedOrClosed(destination);
	let readerCancelled = false;
	const reader = body.getReader();
	const cancelReader = (error) => {
		if (readerCancelled) return;
		readerCancelled = true;
		isClosed = true;
		destination.off("close", cancelReader);
		destination.off("error", cancelReader);
		reader.cancel(error).catch((err) => {
			console.error(`An error occurred while writing the response body for: ${destination.req.url}.`, err);
		});
	};
	destination.once("close", cancelReader);
	destination.once("error", cancelReader);
	try {
		while (true) {
			if (isDestroyedOrClosed()) {
				cancelReader();
				break;
			}
			const { done, value } = await reader.read();
			if (isDestroyedOrClosed()) {
				cancelReader();
				break;
			}
			if (done) {
				destination.end();
				break;
			}
			if (destination.write(value) === false) await new Promise((resolve) => {
				if (isDestroyedOrClosed()) {
					resolve();
					return;
				}
				const onDrain = () => {
					destination.off("close", onClose);
					destination.off("error", onClose);
					resolve();
				};
				const onClose = () => {
					destination.off("drain", onDrain);
					destination.off("close", onClose);
					destination.off("error", onClose);
					cancelReader();
					resolve();
				};
				destination.once("drain", onDrain);
				destination.once("close", onClose);
				destination.once("error", onClose);
			});
		}
	} catch {
		if (!isDestroyedOrClosed()) destination.end("Internal server error.");
	} finally {
		destination.off("close", cancelReader);
		destination.off("error", cancelReader);
	}
}
function isMainModule(url) {
	return url.startsWith("file:") && argv[1] === fileURLToPath(url);
}
//#endregion
export { AngularNodeAppEngine, CommonEngine, createNodeRequestHandler, createWebRequestFromNodeRequest, isMainModule, writeResponseToNodeResponse };
