import { i as __toESM } from "./rolldown-runtime-B4iAMlE-.js";
import { Ac as InjectionToken, Bn as LOCALE_ID, E as annotateForHydration, F as createPlatformFactory, Fl as ɵɵinject, Fn as Injectable, Hc as PLATFORM_INITIALIZER, Hl as require_cjs, Ki as setDocument, Li as resetCompiledComponents, Ml as ɵɵdefineInjector, Mn as IS_HYDRATION_DOM_REUSE_ENABLED, Pn as Inject, Sc as EnvironmentInjector, Sl as provideEnvironmentInitializer, Vc as PLATFORM_ID, Wi as setClassMetadata, Yc as TransferState, ao as ɵɵdefineNgModule, b as REQUEST_CONTEXT, cr as SSR_CONTENT_INTEGRITY_MARKER, fl as inject, fn as Console$1, gc as CSP_NONCE, ht as stopMeasuring, ir as Renderer2, jc as Injector, jl as ɵɵdefineInjectable, kc as INTERNAL_APPLICATION_ERROR_HANDLER, mc as APP_ID, mr as TESTABILITY, mt as startMeasuring, on as Compiler, ot as platformCore, qc as RuntimeError, qn as NgModule, qr as createEnvironmentInjector, s as ENABLE_ROOT_COMPONENT_BOOTSTRAP, tn as ApplicationRef, vc as DOCUMENT, vl as makeEnvironmentProviders, wl as runInInjectionContext, x as RESPONSE_INIT, y as REQUEST, yr as Testability } from "./core-YAiL6VzY.js";
import { c as setRootDomAdapter, o as PlatformLocation, s as getDOM, t as XhrFactory } from "./_xhr-chunk-D1VhyC1-.js";
import { At as APP_BASE_HREF, i as NullViewportScroller, l as ViewportScroller, o as PLATFORM_SERVER_ID } from "./common-DDpEhNlW.js";
import { a as HTTP_FETCH_MAX_RESPONSE_SIZE, s as HTTP_ROOT_INTERCEPTOR_FNS } from "./http-B4i8Co3n.js";
import { A as EventManagerPlugin, O as EVENT_MANAGER_PLUGINS, b as BrowserModule, v as BrowserDomAdapter } from "./platform-browser-D6wfkoY-.js";
import { t as index } from "./bundled-domino-1lz1wH_B.js";
import { M as ActivatedRoute, kt as loadChildren, lt as Router, nt as ROUTES } from "./router-CtbVToL0.js";
//#region node_modules/@angular/ssr/fesm2022/_validation-chunk.mjs
var TRUST_ALL_PROXY_HEADERS = "*";
var HOST_HEADERS_TO_VALIDATE = ["host", "x-forwarded-host"];
var VALID_PORT_REGEX = /^\d+$/;
var VALID_PROTO_REGEX = /^https?$/i;
var VALID_PREFIX_REGEX = /^\/([a-z0-9_-]+\/)*[a-z0-9_-]*$/i;
function getFirstHeaderValue(value) {
	return value?.toString().split(",", 1)[0]?.trim();
}
function validateRequest(request, allowedHosts, disableHostCheck) {
	validateHeaders(request, allowedHosts, disableHostCheck);
	if (!disableHostCheck) validateUrl(new URL(request.url), allowedHosts);
}
function validateUrl(url, allowedHosts) {
	const { hostname } = url;
	if (!isHostAllowed$1(hostname, allowedHosts)) throw new Error(`URL with hostname "${hostname}" is not allowed.`);
}
function sanitizeRequestHeaders(request, trustProxyHeaders) {
	let headersDeleted = false;
	const headers = new Headers();
	for (const [key, value] of request.headers) {
		const lowerKey = key.toLowerCase();
		if ((lowerKey === "forwarded" || lowerKey.startsWith("x-forwarded-")) && !isProxyHeaderAllowed(lowerKey, trustProxyHeaders)) {
			console.warn(`Received "${key}" header but "trustProxyHeaders" was not set up to allow it.\nFor more information, see https://angular.dev/best-practices/security#configuring-trusted-proxy-headers`);
			headersDeleted = true;
		} else headers.set(key, value);
	}
	return headersDeleted ? new Request(request, { headers }) : request;
}
function verifyHostAllowed(headerName, headerValue, allowedHosts) {
	const url = `http://${headerValue}`;
	if (!URL.canParse(url)) throw new Error(`Header "${headerName}" contains an invalid value and cannot be parsed.`);
	const { hostname, pathname, search, hash, username, password } = new URL(url);
	if (pathname !== "/" || search || hash || username || password) throw new Error(`Header "${headerName}" with value "${headerValue}" contains characters that are not allowed.`);
	if (!isHostAllowed$1(hostname, allowedHosts)) throw new Error(`Header "${headerName}" with value "${headerValue}" is not allowed.`);
}
function isHostAllowed$1(hostname, allowedHosts) {
	if (allowedHosts.has("*") || allowedHosts.has(hostname)) return true;
	for (const allowedHost of allowedHosts) {
		if (!allowedHost.startsWith("*.")) continue;
		const domain = allowedHost.slice(1);
		if (hostname.endsWith(domain)) return true;
	}
	return false;
}
function validateHeaders(request, allowedHosts, disableHostCheck) {
	const headers = request.headers;
	for (const headerName of HOST_HEADERS_TO_VALIDATE) {
		const headerValue = getFirstHeaderValue(headers.get(headerName));
		if (headerValue && !disableHostCheck) verifyHostAllowed(headerName, headerValue, allowedHosts);
	}
	const forwarded = headers.get("forwarded");
	if (forwarded) {
		const forwardedParams = parseForwardedHeader(forwarded);
		if (forwardedParams.host && !disableHostCheck) verifyHostAllowed("Forwarded \"host\"", forwardedParams.host, allowedHosts);
		if (forwardedParams.proto && !VALID_PROTO_REGEX.test(forwardedParams.proto)) throw new Error("Header \"forwarded\" proto parameter must be either \"http\" or \"https\".");
	}
	const xForwardedPort = getFirstHeaderValue(headers.get("x-forwarded-port"));
	if (xForwardedPort && !VALID_PORT_REGEX.test(xForwardedPort)) throw new Error("Header \"x-forwarded-port\" must be a numeric value.");
	const xForwardedProto = getFirstHeaderValue(headers.get("x-forwarded-proto"));
	if (xForwardedProto && !VALID_PROTO_REGEX.test(xForwardedProto)) throw new Error("Header \"x-forwarded-proto\" must be either \"http\" or \"https\".");
	const xForwardedPrefix = getFirstHeaderValue(headers.get("x-forwarded-prefix"));
	if (xForwardedPrefix && !VALID_PREFIX_REGEX.test(xForwardedPrefix)) throw new Error("Header \"x-forwarded-prefix\" is invalid. It must start with a \"/\" and contain only alphanumeric characters, hyphens, and underscores, separated by single slashes.");
}
function isProxyHeaderAllowed(headerName, trustProxyHeaders) {
	return trustProxyHeaders.has(TRUST_ALL_PROXY_HEADERS) || trustProxyHeaders.has(headerName.toLowerCase());
}
function normalizeTrustProxyHeaders(trustProxyHeaders) {
	if (!trustProxyHeaders) return /* @__PURE__ */ new Set();
	if (trustProxyHeaders === true) return /* @__PURE__ */ new Set([TRUST_ALL_PROXY_HEADERS]);
	const normalizedTrustedProxyHeaders = /* @__PURE__ */ new Set();
	for (const header of trustProxyHeaders) {
		const lowerHeader = header.toLowerCase();
		if (lowerHeader === TRUST_ALL_PROXY_HEADERS) throw new Error(`"${TRUST_ALL_PROXY_HEADERS}" is not allowed as a value for the "trustProxyHeaders" option.`);
		if (!(lowerHeader === "forwarded" || lowerHeader.startsWith("x-forwarded-"))) throw new Error(`"${header}" is not a valid proxy header. Trusted proxy headers must be "forwarded" or start with "x-forwarded-".`);
		normalizedTrustedProxyHeaders.add(lowerHeader);
	}
	return normalizedTrustedProxyHeaders;
}
function parseForwardedHeader(headerValue) {
	if (!headerValue) return {};
	const params = {};
	let inQuotes = false;
	let escaped = false;
	let currentKey = "";
	let currentValue = "";
	let isParsingValue = false;
	let isKeyEnded = false;
	let isParsingValueEnded = false;
	for (const char of headerValue) {
		if (escaped) {
			escaped = false;
			if (isParsingValue) currentValue += char;
			else currentKey += char;
			continue;
		}
		if (char === "\\") {
			if (inQuotes) escaped = true;
			else if (isParsingValue) currentValue += char;
			else currentKey += char;
			continue;
		}
		if (char === "\"") {
			inQuotes = !inQuotes;
			continue;
		}
		if (inQuotes) {
			if (isParsingValue) currentValue += char;
			else currentKey += char;
			continue;
		}
		if (char === ",") {
			addParam(currentKey, currentValue, isParsingValue, params);
			break;
		}
		if (char === ";") {
			addParam(currentKey, currentValue, isParsingValue, params);
			currentKey = "";
			currentValue = "";
			isParsingValue = false;
			isKeyEnded = false;
			isParsingValueEnded = false;
			continue;
		}
		if (char === "=") {
			if (!isParsingValue) isParsingValue = true;
			else currentValue += char;
			continue;
		}
		if (char === " " || char === "	") {
			if (isParsingValue) {
				if (currentValue.length > 0) isParsingValueEnded = true;
			} else if (currentKey.length > 0) isKeyEnded = true;
			continue;
		}
		if (isParsingValue) {
			if (!isParsingValueEnded) currentValue += char;
		} else if (isKeyEnded) {
			currentKey = char;
			isKeyEnded = false;
		} else currentKey += char;
	}
	if (currentKey || currentValue || isParsingValue) addParam(currentKey, currentValue, isParsingValue, params);
	return params;
}
function addParam(key, value, hasValue, params) {
	if (!hasValue) return;
	const trimmedKey = key.trim().toLowerCase();
	if (trimmedKey) params[trimmedKey] = value;
}
//#endregion
//#region node_modules/@angular/platform-server/fesm2022/_server-chunk.mjs
/**
* @license Angular v22.2.1
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
var import_cjs = require_cjs();
function setDomTypes() {
	Object.assign(globalThis, index.impl);
	globalThis["KeyboardEvent"] = index.impl.Event;
}
function parseDocument(html, url = "/") {
	return index.createWindow(html, url).document;
}
function serializeDocument(doc) {
	return doc.serialize();
}
var DominoAdapter = class DominoAdapter extends BrowserDomAdapter {
	static makeCurrent() {
		setDomTypes();
		setRootDomAdapter(new DominoAdapter());
	}
	supportsDOMEvents = false;
	static defaultDoc;
	createHtmlDocument() {
		return parseDocument("<html><head><title>fakeTitle</title></head><body></body></html>");
	}
	getDefaultDocument() {
		if (!DominoAdapter.defaultDoc) DominoAdapter.defaultDoc = index.createDocument();
		return DominoAdapter.defaultDoc;
	}
	isElementNode(node) {
		return node ? node.nodeType === DominoAdapter.defaultDoc.ELEMENT_NODE : false;
	}
	isShadowRoot(node) {
		return node.shadowRoot == node;
	}
	getGlobalEventTarget(doc, target) {
		if (target === "window") return doc.defaultView;
		if (target === "document") return doc;
		if (target === "body") return doc.body;
		return null;
	}
	getBaseHref(doc) {
		const length = doc.head.children.length;
		for (let i = 0; i < length; i++) {
			const child = doc.head.children[i];
			if (child.tagName === "BASE") return child.getAttribute("href") || "";
		}
		return "";
	}
	dispatchEvent(el, evt) {
		el.dispatchEvent(evt);
		const win = (el.ownerDocument || el).defaultView;
		if (win) win.dispatchEvent(evt);
	}
	getUserAgent() {
		return "Fake user agent";
	}
	getCookie(name) {
		throw new RuntimeError(5700, (typeof ngDevMode === "undefined" || ngDevMode) && "getCookie has not been implemented");
	}
};
var INITIAL_CONFIG = new InjectionToken("Server.INITIAL_CONFIG");
var BEFORE_APP_SERIALIZED = new InjectionToken("Server.RENDER_MODULE_HOOK");
var ENABLE_DOM_EMULATION = new InjectionToken("ENABLE_DOM_EMULATION");
var PlatformState = class PlatformState {
	_doc;
	_enableDomEmulation = enableDomEmulation(inject(Injector));
	constructor(_doc) {
		this._doc = _doc;
	}
	renderToString() {
		if (ngDevMode && !this._enableDomEmulation && !window?.document) throw new RuntimeError(5704, (typeof ngDevMode === "undefined" || ngDevMode) && "Disabled DOM emulation should only run in browser environments");
		const measuringLabel = "renderToString";
		startMeasuring(measuringLabel);
		const rendered = this._enableDomEmulation ? serializeDocument(this._doc) : this._doc.documentElement.outerHTML;
		stopMeasuring(measuringLabel);
		return rendered;
	}
	getDocument() {
		return this._doc;
	}
	static ɵfac = function PlatformState_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || PlatformState)(ɵɵinject(DOCUMENT));
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: PlatformState,
		factory: PlatformState.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformState, [{ type: Injectable }], () => [{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [DOCUMENT]
		}]
	}], null);
})();
function enableDomEmulation(injector) {
	return injector.get(ENABLE_DOM_EMULATION, true);
}
var HTTP_OR_HTTPS_PROTOCOL_REGEXP = /^https?:/i;
var HTTP_OR_HTTPS_NO_AUTHORITY_REGEXP = /^https?:(?![/\\]{2})/i;
function resolveUrl(urlStr, origin, options = {}) {
	const originUrl = typeof origin === "string" ? new URL("/", origin) : origin;
	if (!urlStr) return originUrl || null;
	let resolved;
	if (!originUrl || !HTTP_OR_HTTPS_NO_AUTHORITY_REGEXP.test(urlStr)) try {
		resolved = new URL(urlStr);
	} catch {}
	const { allowProtocolRelative = false, allowOriginChange = true } = options;
	if (resolved) {
		if (isDisallowedProtocolRelative(resolved, allowProtocolRelative)) throwProtocolRelativeUrlError(urlStr);
		if (originUrl && !isSafeOriginChange(resolved, originUrl, urlStr, allowOriginChange)) throwSuspiciousUrlError(urlStr);
		return resolved;
	}
	if (!URL.canParse(urlStr, "http://fake")) throw new RuntimeError(5701, typeof ngDevMode === "undefined" || ngDevMode ? `Invalid URL: ${urlStr}` : urlStr);
	if (!originUrl) return null;
	if (urlStr.startsWith("//")) {
		if (!allowProtocolRelative) throwProtocolRelativeUrlError(urlStr);
		return new URL(urlStr, origin);
	}
	resolved = new URL(urlStr, origin);
	if (isDisallowedProtocolRelative(resolved, allowProtocolRelative)) throwProtocolRelativeUrlError(urlStr);
	if (!isSafeOriginChange(resolved, originUrl, urlStr, allowOriginChange)) throwSuspiciousUrlError(urlStr);
	return resolved;
}
function isDisallowedProtocolRelative(resolved, allowProtocolRelative) {
	return !allowProtocolRelative && resolved.pathname.startsWith("//");
}
function throwProtocolRelativeUrlError(urlStr) {
	throw new RuntimeError(5702, typeof ngDevMode === "undefined" || ngDevMode ? `Protocol relative URLs are not allowed in this context. URL: ${urlStr}` : urlStr);
}
function throwSuspiciousUrlError(urlStr) {
	throw new RuntimeError(-5703, typeof ngDevMode === "undefined" || ngDevMode ? `URL ${urlStr} changed origin unexpectedly. This is suspicious and may indicate a security bypass attempt.` : urlStr);
}
function isSafeOriginChange(resolved, origin, urlStr, allowOriginChange) {
	if (origin.origin === resolved.origin) return true;
	if (!allowOriginChange) return false;
	return HTTP_OR_HTTPS_PROTOCOL_REGEXP.test(urlStr) && !HTTP_OR_HTTPS_NO_AUTHORITY_REGEXP.test(urlStr);
}
var ServerXhr = class ServerXhr {
	xhrImpl;
	async ɵloadImpl() {
		if (!this.xhrImpl) {
			if (typeof ngDevMode === "undefined" || ngDevMode) console.warn("XHR support in `@angular/platform-server` is deprecated and will be removed in Angular 23. It has known security and performance issues in server environments, such as forwarding `Authorization` headers on cross-origin redirects and susceptibility to denial-of-service (DoS) via redirect loops. Please use the HttpClient fetch backend instead, which is the default since Angular 22.");
			const { default: xhr } = await import("./xhr2-BDl7dY5v.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1));
			this.xhrImpl = xhr;
		}
	}
	build() {
		const impl = this.xhrImpl;
		if (!impl) throw new RuntimeError(5705, (typeof ngDevMode === "undefined" || ngDevMode) && "Unexpected state in ServerXhr: XHR implementation is not loaded.");
		return new impl.XMLHttpRequest();
	}
	static ɵfac = function ServerXhr_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ServerXhr)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: ServerXhr,
		factory: ServerXhr.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerXhr, [{ type: Injectable }], null, null);
})();
var URL_SCHEMA_REGEXP = /^(?:[a-zA-Z][a-zA-Z0-9+\-.]*:)/;
function relativeUrlsTransformerInterceptorFn(request, next) {
	if (URL_SCHEMA_REGEXP.test(request.url) && !HTTP_OR_HTTPS_NO_AUTHORITY_REGEXP.test(request.url)) return next(request);
	const platformLocation = inject(PlatformLocation);
	const { href, protocol, hostname, port } = platformLocation;
	if (!protocol.startsWith("http")) return next(request);
	let urlPrefix = `${protocol}//${hostname}`;
	if (port) urlPrefix += `:${port}`;
	const baseHref = platformLocation.getBaseHrefFromDOM() || href;
	const baseUrl = new URL(baseHref, urlPrefix);
	const parsedUrl = resolveUrl(request.url, baseUrl, { allowProtocolRelative: true });
	return next(request.clone({ url: parsedUrl.toString() }));
}
var SERVER_HTTP_PROVIDERS = [{
	provide: XhrFactory,
	useClass: ServerXhr
}, {
	provide: HTTP_ROOT_INTERCEPTOR_FNS,
	useValue: relativeUrlsTransformerInterceptorFn,
	multi: true
}];
var ServerPlatformLocation = class ServerPlatformLocation {
	href = "/";
	hostname = "/";
	protocol = "/";
	port = "/";
	pathname = "/";
	search = "";
	hash = "";
	_hashUpdate = new import_cjs.Subject();
	_doc = inject(DOCUMENT);
	origin = this._doc.location.origin;
	constructor() {
		const config = inject(INITIAL_CONFIG, { optional: true });
		if (!config) return;
		if (config.url) {
			const { protocol, hostname, port, pathname, search, hash, href, origin } = resolveUrl(config.url, this.origin);
			this.protocol = protocol;
			this.hostname = hostname;
			this.port = port;
			this.pathname = pathname;
			this.search = search;
			this.hash = hash;
			this.href = href;
			this.origin = origin;
		}
	}
	getBaseHrefFromDOM() {
		return getDOM().getBaseHref(this._doc);
	}
	onPopState(fn) {
		return () => {};
	}
	onHashChange(fn) {
		const subscription = this._hashUpdate.subscribe(fn);
		return () => subscription.unsubscribe();
	}
	get url() {
		return `${this.pathname}${this.search}${this.hash}`;
	}
	setHash(value, oldUrl) {
		if (this.hash === value) return;
		this.hash = value;
		const newUrl = this.url;
		queueMicrotask(() => this._hashUpdate.next({
			type: "hashchange",
			state: null,
			oldUrl,
			newUrl
		}));
	}
	replaceState(state, title, newUrl) {
		const oldUrl = this.url;
		const { pathname, search, hash, href, protocol } = resolveUrl(newUrl, this.origin, { allowOriginChange: false });
		const writableThis = this;
		writableThis.pathname = pathname;
		writableThis.search = search;
		writableThis.href = href;
		writableThis.protocol = protocol;
		this.setHash(hash, oldUrl);
	}
	pushState(state, title, newUrl) {
		this.replaceState(state, title, newUrl);
	}
	forward() {
		throw new Error("Not implemented");
	}
	back() {
		throw new Error("Not implemented");
	}
	getState() {}
	static ɵfac = function ServerPlatformLocation_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ServerPlatformLocation)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: ServerPlatformLocation,
		factory: ServerPlatformLocation.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerPlatformLocation, [{ type: Injectable }], () => [], null);
})();
var ServerEventManagerPlugin = class ServerEventManagerPlugin extends EventManagerPlugin {
	doc;
	constructor(doc) {
		super(doc);
		this.doc = doc;
	}
	supports(eventName) {
		return true;
	}
	addEventListener(element, eventName, handler, options) {
		return getDOM().onAndCancel(element, eventName, handler, options);
	}
	static ɵfac = function ServerEventManagerPlugin_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ServerEventManagerPlugin)(ɵɵinject(DOCUMENT));
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: ServerEventManagerPlugin,
		factory: ServerEventManagerPlugin.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerEventManagerPlugin, [{ type: Injectable }], () => [{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [DOCUMENT]
		}]
	}], null);
})();
var TRANSFER_STATE_STATUS = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "TRANSFER_STATE_STATUS" : "", { factory: () => ({ serialized: false }) });
var TRANSFER_STATE_SERIALIZATION_PROVIDERS = [{
	provide: BEFORE_APP_SERIALIZED,
	useFactory: serializeTransferStateFactory,
	multi: true
}];
function createScript(doc, textContent, nonce) {
	const script = doc.createElement("script");
	script.textContent = textContent;
	if (nonce) script.setAttribute("nonce", nonce);
	return script;
}
function warnIfStateTransferHappened(injector) {
	const transferStateStatus = injector.get(TRANSFER_STATE_STATUS);
	if (transferStateStatus.serialized) console.warn("Angular detected an incompatible configuration, which causes duplicate serialization of the server-side application state.\n\nThis can happen if the server providers have been provided more than once using different mechanisms. For example:\n\n  imports: [ServerModule], // Registers server providers\n  providers: [provideServerRendering()] // Also registers server providers\n\nTo fix this, ensure that the `provideServerRendering()` function is the only provider used and remove the other(s).");
	transferStateStatus.serialized = true;
}
function serializeTransferStateFactory() {
	const doc = inject(DOCUMENT);
	const appId = inject(APP_ID);
	const transferStore = inject(TransferState);
	const injector = inject(Injector);
	return () => {
		const measuringLabel = "serializeTransferStateFactory";
		startMeasuring(measuringLabel);
		const content = transferStore.toJson();
		if (transferStore.isEmpty) return;
		if (typeof ngDevMode !== "undefined" && ngDevMode) warnIfStateTransferHappened(injector);
		const script = createScript(doc, content, null);
		script.id = appId + "-state";
		script.setAttribute("type", "application/json");
		doc.body.appendChild(script);
		stopMeasuring(measuringLabel);
	};
}
var INTERNAL_SERVER_PLATFORM_PROVIDERS = [
	{
		provide: DOCUMENT,
		useFactory: _document
	},
	{
		provide: PLATFORM_ID,
		useValue: PLATFORM_SERVER_ID
	},
	{
		provide: PLATFORM_INITIALIZER,
		useFactory: initDominoAdapter,
		multi: true
	},
	{
		provide: PlatformLocation,
		useClass: ServerPlatformLocation,
		deps: []
	},
	{
		provide: PlatformState,
		deps: [DOCUMENT]
	}
];
function initDominoAdapter() {
	const _enableDomEmulation = enableDomEmulation(inject(Injector));
	return () => {
		if (_enableDomEmulation) DominoAdapter.makeCurrent();
		else BrowserDomAdapter.makeCurrent();
	};
}
var PLATFORM_SERVER_PROVIDERS = [
	TRANSFER_STATE_SERIALIZATION_PROVIDERS,
	[{
		provide: EVENT_MANAGER_PLUGINS,
		multi: true,
		useClass: ServerEventManagerPlugin
	}],
	SERVER_HTTP_PROVIDERS,
	{
		provide: Testability,
		useValue: null
	},
	{
		provide: TESTABILITY,
		useValue: null
	},
	{
		provide: ViewportScroller,
		useClass: NullViewportScroller
	}
];
var ServerModule = class ServerModule {
	static ɵfac = function ServerModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ServerModule)();
	};
	static ɵmod = /*@__PURE__*/ ɵɵdefineNgModule({
		type: ServerModule,
		exports: [BrowserModule]
	});
	static ɵinj = /*@__PURE__*/ ɵɵdefineInjector({
		providers: PLATFORM_SERVER_PROVIDERS,
		imports: [BrowserModule]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerModule, [{
		type: NgModule,
		args: [{
			exports: [BrowserModule],
			providers: PLATFORM_SERVER_PROVIDERS
		}]
	}], null, null);
})();
function _document() {
	const injector = inject(Injector);
	const config = injector.get(INITIAL_CONFIG, null);
	const _enableDomEmulation = enableDomEmulation(injector);
	let document;
	if (config && config.document) document = typeof config.document === "string" ? _enableDomEmulation ? parseDocument(config.document, config.url !== void 0 ? resolveUrl(config.url, "http://localhost").href : void 0) : window.document : config.document;
	else document = getDOM().createHtmlDocument();
	setDocument(document);
	return document;
}
function platformServer(extraProviders) {
	return createPlatformFactory(platformCore, "server", INTERNAL_SERVER_PLATFORM_PROVIDERS)(extraProviders);
}
//#endregion
//#region node_modules/@angular/platform-server/fesm2022/platform-server.mjs
/**
* @license Angular v22.2.1
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
function provideServerRendering$1(options) {
	const providers = [...PLATFORM_SERVER_PROVIDERS];
	if (options?.maxResponseBodySize) providers.push({
		provide: HTTP_FETCH_MAX_RESPONSE_SIZE,
		useValue: options.maxResponseBodySize
	});
	return makeEnvironmentProviders(providers);
}
var EVENT_DISPATCH_SCRIPT_ID = "ng-event-dispatch-contract";
function createServerPlatform(options) {
	const extraProviders = options.platformProviders ?? [];
	const measuringLabel = "createServerPlatform";
	startMeasuring(measuringLabel);
	const { document, url } = options;
	const platform = platformServer([{
		provide: INITIAL_CONFIG,
		useValue: {
			document,
			url
		}
	}, extraProviders]);
	stopMeasuring(measuringLabel);
	return platform;
}
function findEventDispatchScript(doc) {
	return doc.getElementById(EVENT_DISPATCH_SCRIPT_ID);
}
function removeEventDispatchScript(doc) {
	findEventDispatchScript(doc)?.remove();
}
function prepareForHydration(platformState, applicationRef) {
	const measuringLabel = "prepareForHydration";
	startMeasuring(measuringLabel);
	const environmentInjector = applicationRef.injector;
	const doc = platformState.getDocument();
	if (!environmentInjector.get(IS_HYDRATION_DOM_REUSE_ENABLED, false)) {
		removeEventDispatchScript(doc);
		return;
	}
	appendSsrContentIntegrityMarker(doc);
	const eventTypesToReplay = annotateForHydration(applicationRef, doc);
	if (eventTypesToReplay.regular.size || eventTypesToReplay.capture.size) insertEventRecordScript(environmentInjector.get(APP_ID), doc, eventTypesToReplay, environmentInjector.get(CSP_NONCE, null));
	else removeEventDispatchScript(doc);
	stopMeasuring(measuringLabel);
}
function appendSsrContentIntegrityMarker(doc) {
	const comment = doc.createComment(SSR_CONTENT_INTEGRITY_MARKER);
	doc.body.firstChild ? doc.body.insertBefore(comment, doc.body.firstChild) : doc.body.append(comment);
}
function appendServerContextInfo(applicationRef) {
	const injector = applicationRef.injector;
	let serverContext = sanitizeServerContext(injector.get(SERVER_CONTEXT, DEFAULT_SERVER_CONTEXT));
	applicationRef.components.forEach((componentRef) => {
		const renderer = componentRef.injector.get(Renderer2);
		const element = componentRef.location.nativeElement;
		if (element) renderer.setAttribute(element, "ng-server-context", serverContext);
	});
}
function insertEventRecordScript(appId, doc, eventTypesToReplay, nonce) {
	const measuringLabel = "insertEventRecordScript";
	startMeasuring(measuringLabel);
	const { regular, capture } = eventTypesToReplay;
	const eventDispatchScript = findEventDispatchScript(doc);
	if (eventDispatchScript) {
		const replayScript = createScript(doc, `window.__jsaction_bootstrap(document.body,"${appId}",${JSON.stringify(Array.from(regular))},${JSON.stringify(Array.from(capture))});`, nonce);
		eventDispatchScript.after(replayScript);
	}
	stopMeasuring(measuringLabel);
}
async function renderInternal(platformRef, applicationRef) {
	const platformState = platformRef.injector.get(PlatformState);
	prepareForHydration(platformState, applicationRef);
	appendServerContextInfo(applicationRef);
	const environmentInjector = applicationRef.injector;
	const errorHandler = environmentInjector.get(INTERNAL_APPLICATION_ERROR_HANDLER);
	const callbacks = environmentInjector.get(BEFORE_APP_SERIALIZED, null);
	if (callbacks) {
		const asyncCallbacks = [];
		for (const callback of callbacks) try {
			const callbackResult = callback();
			if (callbackResult) asyncCallbacks.push(callbackResult);
		} catch (e) {
			errorHandler(e);
		}
		if (asyncCallbacks.length) {
			for (const result of await Promise.allSettled(asyncCallbacks)) if (result.status === "rejected") errorHandler(result.reason);
		}
	}
	return platformState.renderToString();
}
function asyncDestroyPlatform$1(platformRef) {
	return new Promise((resolve) => {
		setTimeout(() => {
			platformRef.destroy();
			resolve();
		}, 0);
	});
}
var DEFAULT_SERVER_CONTEXT = "other";
var SERVER_CONTEXT = new InjectionToken("SERVER_CONTEXT");
function sanitizeServerContext(serverContext) {
	const context = serverContext.replace(/[^a-zA-Z0-9\-]/g, "");
	return context.length > 0 ? context : DEFAULT_SERVER_CONTEXT;
}
async function renderModule(moduleType, options) {
	const { document, url, extraProviders: platformProviders, allowedHosts } = options;
	validateAllowedHosts(url, allowedHosts);
	const platformRef = createServerPlatform({
		document,
		url,
		platformProviders
	});
	try {
		const applicationRef = (await platformRef.bootstrapModule(moduleType)).injector.get(ApplicationRef);
		const measuringLabel = "whenStable";
		startMeasuring(measuringLabel);
		await applicationRef.whenStable();
		stopMeasuring(measuringLabel);
		return await renderInternal(platformRef, applicationRef);
	} finally {
		await asyncDestroyPlatform$1(platformRef);
	}
}
async function renderApplication(bootstrap, options) {
	const renderAppLabel = "renderApplication";
	const bootstrapLabel = "bootstrap";
	const _renderLabel = "_render";
	const { url, allowedHosts } = options;
	validateAllowedHosts(url, allowedHosts);
	startMeasuring(renderAppLabel);
	const platformRef = createServerPlatform(options);
	try {
		startMeasuring(bootstrapLabel);
		const applicationRef = await bootstrap({ platformRef });
		stopMeasuring(bootstrapLabel);
		startMeasuring(_renderLabel);
		const measuringLabel = "whenStable";
		startMeasuring(measuringLabel);
		await applicationRef.whenStable();
		stopMeasuring(measuringLabel);
		const rendered = await renderInternal(platformRef, applicationRef);
		stopMeasuring(_renderLabel);
		return rendered;
	} finally {
		await asyncDestroyPlatform$1(platformRef);
		stopMeasuring(renderAppLabel);
	}
}
function validateAllowedHosts(url, allowedHosts) {
	if (typeof url === "string") {
		const parsedUrl = resolveUrl(url);
		if (parsedUrl !== null) {
			const hostname = parsedUrl.hostname;
			if (!isHostAllowed(hostname, new Set(allowedHosts))) throw new RuntimeError(5706, typeof ngDevMode === "undefined" || ngDevMode ? `Host ${url} is not allowed. You can configure \`allowedHosts\` option.` : url);
		}
	}
}
function isHostAllowed(hostname, allowedHosts) {
	if (allowedHosts.has("*") || allowedHosts.has(hostname)) return true;
	for (const allowedHost of allowedHosts) {
		if (!allowedHost.startsWith("*.")) continue;
		const domain = allowedHost.slice(1);
		if (hostname.endsWith(domain)) return true;
	}
	return false;
}
//#endregion
//#region node_modules/beasties/dist/plan-DLQRCYVX.mjs
var HEX_ESCAPE_RE = /\\([0-9a-f]{1,6})[\t\n\f\r ]?/gi;
var CHAR_ESCAPE_RE = /\\(.)/g;
var WHITESPACE_RE$1 = /\s+/g;
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
var ATTR_ACTIONS = [
	"exists",
	"equals",
	"element",
	"start",
	"end",
	"any",
	"hyphen"
];
/** Whether a value is a compact plan rather than a `CompiledSheet` */
function isCompactPlan(plan) {
	return Array.isArray(plan) && plan[0] === 1;
}
//#endregion
//#region node_modules/beasties/dist/runtime.mjs
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
function decodePlan(plan) {
	const [, href, size, pool, wraps, rules] = plan;
	const deref = (value) => typeof value === "number" ? pool[value - 1] : value;
	const derefAll = (values) => values.map(deref);
	const wrapChains = wraps.map(derefAll);
	return {
		href: href === 0 ? void 0 : href,
		size,
		warnings: [],
		rules: rules.map((rule) => decodeRule(rule, deref, derefAll, wrapChains))
	};
}
function decodeRule(compact, deref, derefAll, wrapChains) {
	const flags = compact[0];
	let cursor = 1;
	const next = () => compact[cursor++];
	const rule = {};
	if (flags & 1) {
		const selectors = next();
		rule.selectors = Array.isArray(selectors) ? derefAll(selectors) : [deref(selectors)];
		rule.body = deref(next());
	}
	if (flags & 2) rule.css = deref(next());
	if (flags & 4) rule.match = next().map((condition, index) => decodeMatch(condition, rule.selectors?.[index], deref, derefAll));
	if (flags & 8) rule.always = true;
	if (flags & 16) rule.wrap = wrapChains[next()];
	if (flags & 32) rule.fontsUsed = derefAll(next());
	if (flags & 64) rule.keyframesUsed = derefAll(next());
	if (flags & 128) {
		const [family, src, ranges] = next();
		rule.fontFace = {
			family: family === 0 ? void 0 : deref(family),
			src: src === 0 ? void 0 : deref(src),
			ranges
		};
	}
	if (flags & 256) rule.keyframes = deref(next());
	return rule;
}
function decodeMatch(compact, selector, deref, derefAll) {
	if (compact === 0) return true;
	if (compact === 1) return { classes: [selector.slice(1)] };
	if (compact === 2) return { ids: [selector.slice(1)] };
	if (compact === 3) return { tags: [selector.toLowerCase()] };
	if (typeof compact[0] === "string") return { program: decodeProgram(compact, deref, derefAll) };
	const [classes, ids, tags, attrs] = compact;
	const condition = {};
	if (classes !== 0) condition.classes = derefAll(classes);
	if (ids !== 0) condition.ids = derefAll(ids);
	if (tags !== 0) condition.tags = derefAll(tags);
	if (attrs !== 0) condition.attrs = derefAll(attrs);
	return condition;
}
function decodeProgram(compact, deref, derefAll) {
	const [combinators, compounds] = compact;
	return {
		combinators: [...combinators],
		compounds: compounds.map((compound) => decodeCompound(compound, deref, derefAll))
	};
}
function decodeCompound(compact, deref, derefAll) {
	if (!Array.isArray(compact)) return { classes: [deref(compact)] };
	const [tag, classes, ids, attrs] = compact;
	const compound = {};
	if (tag !== 0) compound.tag = deref(tag);
	if (classes !== 0) compound.classes = derefAll(classes);
	if (ids !== 0) compound.ids = derefAll(ids);
	if (attrs !== 0) compound.attrs = attrs.map(([name, action, value, ignoreCase]) => {
		const test = {
			name: deref(name),
			action: ATTR_ACTIONS[action]
		};
		if (value !== 0) test.value = deref(value);
		if (ignoreCase) test.ignoreCase = true;
		return test;
	});
	return compound;
}
var VOID_ELEMENTS = /* @__PURE__ */ new Set([
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
]);
var RAW_TEXT_ELEMENTS = /* @__PURE__ */ new Set([
	"script",
	"style",
	"textarea",
	"title",
	"xmp"
]);
/** Raw text elements whose contents are still rendered as page text */
var RENDERED_RAW_TEXT_ELEMENTS = /* @__PURE__ */ new Set(["textarea", "xmp"]);
/** Attributes whose value can be rendered as text */
var RENDERED_ATTRS = /* @__PURE__ */ new Set([
	"alt",
	"label",
	"placeholder",
	"title",
	"value"
]);
var TAG_START_RE = /[a-z]/;
var TAG_NAME_END_RE = /[\s/>]/;
var ATTR_NAME_END_RE = /[\s=/>]/;
var WHITESPACE_RE = /\s/;
var CLASS_SPLIT_RE = /\s+/;
function createTokens() {
	return {
		tags: /* @__PURE__ */ new Set(),
		classes: /* @__PURE__ */ new Set(),
		ids: /* @__PURE__ */ new Set(),
		attrs: /* @__PURE__ */ new Set()
	};
}
function preparePrograms(programs) {
	const prepared = {
		programs,
		flat: [],
		byClass: /* @__PURE__ */ new Map(),
		byId: /* @__PURE__ */ new Map(),
		byTag: /* @__PURE__ */ new Map(),
		byAttr: /* @__PURE__ */ new Map(),
		universal: []
	};
	for (let p = 0; p < programs.length; p++) {
		const { compounds, combinators } = programs[p];
		const start = prepared.flat.length;
		for (let c = 0; c < compounds.length; c++) prepared.flat.push({
			test: compounds[c],
			edge: combinators[c] ?? null,
			last: c === compounds.length - 1,
			program: p
		});
		const first = compounds[0];
		if (first.classes?.length) pushIndex(prepared.byClass, first.classes[0], start);
		else if (first.ids?.length) pushIndex(prepared.byId, first.ids[0], start);
		else if (first.tag) pushIndex(prepared.byTag, first.tag, start);
		else if (first.attrs?.length) pushIndex(prepared.byAttr, first.attrs[0].name, start);
		else prepared.universal.push(start);
	}
	return prepared;
}
function pushIndex(map, key, position) {
	const list = map.get(key);
	if (list) list.push(position);
	else map.set(key, [position]);
}
function getAttrValue(element, name) {
	for (const [attrName, value] of element.attrs) if (attrName === name) return value ?? "";
}
function matchesAttr(test, element) {
	let value = getAttrValue(element, test.name);
	if (value === void 0) return false;
	if (test.action === "exists") return true;
	let expected = test.value ?? "";
	if (test.ignoreCase) {
		value = value.toLowerCase();
		expected = expected.toLowerCase();
	}
	switch (test.action) {
		case "equals": return value === expected;
		case "element": return expected.length > 0 && value.split(CLASS_SPLIT_RE).includes(expected);
		case "start": return expected.length > 0 && value.startsWith(expected);
		case "end": return expected.length > 0 && value.endsWith(expected);
		case "any": return expected.length > 0 && value.includes(expected);
		case "hyphen": return value === expected || value.startsWith(`${expected}-`);
	}
	return false;
}
function matchesCompound(test, element) {
	if (test.tag && test.tag !== element.tag) return false;
	if (test.ids) {
		for (const id of test.ids) if (element.id !== id) return false;
	}
	if (test.classes) {
		for (const cls of test.classes) if (!element.classes.includes(cls)) return false;
	}
	if (test.attrs) {
		for (const attr of test.attrs) if (!matchesAttr(attr, element)) return false;
	}
	return true;
}
function createFrame(container, desc, child) {
	return {
		container,
		desc,
		child,
		adjacent: [],
		sibling: []
	};
}
function scanHtml(html, programs, options = {}) {
	const collectText = options.chars !== false;
	const lower = html.toLowerCase();
	const all = createTokens();
	const contained = createTokens();
	const text = createTextCodepoints();
	const collectChars = collectText ? (run) => addTextCodepoints(run, text) : () => {};
	const prepared = programs && programs.length > 0 ? preparePrograms(programs) : void 0;
	const matchedAll = prepared ? Array.from({ length: prepared.programs.length }).fill(false) : [];
	const matchedContained = prepared ? Array.from({ length: prepared.programs.length }).fill(false) : [];
	const candidateSet = /* @__PURE__ */ new Set();
	let containerFound = false;
	const frames = [createFrame(false, [], [])];
	let i = 0;
	const length = html.length;
	while (i < length) {
		const textStart = i;
		i = lower.indexOf("<", i);
		if (i === -1) {
			collectChars(html.slice(textStart));
			break;
		}
		if (i > textStart) collectChars(html.slice(textStart, i));
		const next = lower[i + 1];
		if (next === "/") {
			const end = lower.indexOf(">", i);
			if (end === -1) break;
			if (frames.length > 1) frames.pop();
			i = end + 1;
			continue;
		}
		if (next === "!") {
			if (lower.startsWith("<!--", i)) {
				const end = lower.indexOf("-->", i + 4);
				i = end === -1 ? length : end + 3;
			} else {
				const end = lower.indexOf(">", i);
				i = end === -1 ? length : end + 1;
			}
			continue;
		}
		if (next === "?") {
			const end = lower.indexOf(">", i);
			i = end === -1 ? length : end + 1;
			continue;
		}
		if (!next || !TAG_START_RE.test(next)) {
			i++;
			continue;
		}
		let pos = i + 1;
		while (pos < length && !TAG_NAME_END_RE.test(lower[pos])) pos++;
		const tagName = lower.slice(i + 1, pos);
		const element = {
			tag: tagName,
			id: null,
			classes: [],
			attrs: []
		};
		let isContainer = false;
		let selfClosing = false;
		while (pos < length) {
			while (pos < length && WHITESPACE_RE.test(lower[pos])) pos++;
			if (lower[pos] === "/") {
				selfClosing = true;
				pos++;
				continue;
			}
			if (lower[pos] === ">" || pos >= length) break;
			selfClosing = false;
			const nameStart = pos;
			while (pos < length && !ATTR_NAME_END_RE.test(lower[pos])) pos++;
			const attrName = lower.slice(nameStart, pos);
			let value = null;
			while (pos < length && WHITESPACE_RE.test(lower[pos])) pos++;
			if (lower[pos] === "=") {
				pos++;
				while (pos < length && WHITESPACE_RE.test(lower[pos])) pos++;
				const quote = lower[pos];
				if (quote === "\"" || quote === "'") {
					const valueEnd = lower.indexOf(quote, pos + 1);
					value = html.slice(pos + 1, valueEnd === -1 ? length : valueEnd);
					pos = valueEnd === -1 ? length : valueEnd + 1;
				} else {
					const valueStart = pos;
					while (pos < length && !WHITESPACE_RE.test(lower[pos]) && lower[pos] !== ">") pos++;
					value = html.slice(valueStart, pos);
				}
			}
			if (attrName) {
				element.attrs.push([attrName, value]);
				if (value !== null && RENDERED_ATTRS.has(attrName)) collectChars(value);
				if (attrName === "data-beasties-container") {
					isContainer = true;
					containerFound = true;
				} else if (attrName === "class" && value !== null) {
					for (const cls of value.trim().split(CLASS_SPLIT_RE)) if (cls) element.classes.push(cls);
				} else if (attrName === "id" && value !== null) element.id = value.trim() || null;
			}
		}
		const frame = frames[frames.length - 1];
		const insideContainer = frame.container || isContainer;
		collectElement(all, element);
		if (insideContainer) collectElement(contained, element);
		let descOut;
		let childOut;
		if (prepared) {
			const strictlyInside = frame.container;
			candidateSet.clear();
			for (const list of [
				frame.desc,
				frame.child,
				frame.adjacent,
				frame.sibling
			]) for (const encoded of list) candidateSet.add(encoded);
			addAnchoredStarts(candidateSet, prepared, element);
			const adjacentOut = [];
			frame.adjacent = adjacentOut;
			for (const encoded of candidateSet) {
				const position = encoded >> 1;
				const compound = prepared.flat[position];
				if (!matchesCompound(compound.test, element)) continue;
				const chainContained = (encoded & 1) === 1 && strictlyInside;
				if (compound.last) {
					matchedAll[compound.program] = true;
					if (chainContained) matchedContained[compound.program] = true;
					continue;
				}
				const nextEncoded = position + 1 << 1 | (chainContained ? 1 : 0);
				switch (compound.edge) {
					case " ":
						(descOut ??= []).push(nextEncoded);
						break;
					case ">":
						(childOut ??= []).push(nextEncoded);
						break;
					case "+":
						adjacentOut.push(nextEncoded);
						break;
					case "~": frame.sibling.push(nextEncoded);
				}
			}
		} else frame.adjacent = [];
		const isVoid = VOID_ELEMENTS.has(tagName) || selfClosing;
		const isRawText = RAW_TEXT_ELEMENTS.has(tagName);
		if (!isVoid && !isRawText) frames.push(createFrame(insideContainer, descOut ? frame.desc.concat(descOut) : frame.desc, childOut ?? []));
		i = lower[pos] === ">" ? pos + 1 : pos;
		if (!isVoid && isRawText) {
			const close = lower.indexOf(`</${tagName}`, i);
			if (close === -1) break;
			if (RENDERED_RAW_TEXT_ELEMENTS.has(tagName)) collectChars(html.slice(i, close));
			const end = lower.indexOf(">", close);
			i = end === -1 ? length : end + 1;
		}
	}
	const tokens = containerFound ? contained : all;
	if (collectText) tokens.chars = toCodepointSet(text);
	if (prepared) {
		const matched = containerFound ? matchedContained : matchedAll;
		tokens.matchedPrograms = /* @__PURE__ */ new Map();
		for (let p = 0; p < prepared.programs.length; p++) tokens.matchedPrograms.set(prepared.programs[p], matched[p]);
	}
	return tokens;
}
function collectElement(tokens, element) {
	tokens.tags.add(element.tag);
	if (element.id) tokens.ids.add(element.id);
	for (const cls of element.classes) tokens.classes.add(cls);
	for (const [name] of element.attrs) tokens.attrs.add(name);
}
function addAnchoredStarts(candidates, prepared, element) {
	for (const cls of element.classes) {
		const starts = prepared.byClass.get(cls);
		if (starts) for (const position of starts) candidates.add(position << 1 | 1);
	}
	if (element.id) {
		const starts = prepared.byId.get(element.id);
		if (starts) for (const position of starts) candidates.add(position << 1 | 1);
	}
	const tagStarts = prepared.byTag.get(element.tag);
	if (tagStarts) for (const position of tagStarts) candidates.add(position << 1 | 1);
	for (const [name] of element.attrs) {
		const starts = prepared.byAttr.get(name);
		if (starts) for (const position of starts) candidates.add(position << 1 | 1);
	}
	for (const position of prepared.universal) candidates.add(position << 1 | 1);
}
function matchesCondition(condition, tokens) {
	if (condition === true) return true;
	if (condition.program) {
		const exact = tokens.matchedPrograms?.get(condition.program);
		if (exact !== void 0) return exact;
	}
	if (condition.classes) {
		for (const cls of condition.classes) if (!tokens.classes.has(cls)) return false;
	}
	if (condition.ids) {
		for (const id of condition.ids) if (!tokens.ids.has(id)) return false;
	}
	if (condition.tags) {
		for (const tag of condition.tags) if (!tokens.tags.has(tag)) return false;
	}
	if (condition.attrs) {
		for (const attr of condition.attrs) if (!tokens.attrs.has(attr)) return false;
	}
	return true;
}
/** Collect structural programs referenced by the compiled sheets */
function collectPrograms(sheets) {
	const programs = [];
	for (const sheet of sheets) for (const rule of sheet.rules) {
		if (!rule.match) continue;
		for (const condition of rule.match) if (condition !== true && condition.program) programs.push(condition.program);
	}
	return programs;
}
/**
* Evaluate a compiled sheet against scanned document tokens, producing the
* critical CSS subset.
*/
function renderCriticalCss(sheet, tokens, options = {}) {
	let keyframesMode = options.keyframes ?? "critical";
	if (keyframesMode === true) keyframesMode = "all";
	if (keyframesMode === false) keyframesMode = "none";
	const shouldPreloadFonts = options.fonts === true || options.preloadFonts === true;
	const shouldInlineFonts = options.fonts !== false && options.inlineFonts === true;
	const rules = sheet.rules;
	const texts = Array.from({ length: rules.length }).fill(null);
	const inverseTexts = options.inverse ? Array.from({ length: rules.length }).fill(null) : void 0;
	const criticalFonts = /* @__PURE__ */ new Set();
	const criticalKeyframeNames = /* @__PURE__ */ new Set();
	const fontPreloads = [];
	const preloadedFonts = /* @__PURE__ */ new Set();
	for (let i = 0; i < rules.length; i++) {
		const rule = rules[i];
		if (rule.fontFace) continue;
		if (rule.keyframes !== void 0) continue;
		const text = ruleText(rule, tokens);
		if (inverseTexts) inverseTexts[i] = ruleText(rule, tokens, true);
		if (text === null) continue;
		texts[i] = text;
		if (rule.fontsUsed) for (const family of rule.fontsUsed) criticalFonts.add(normalizeFontFamily(family));
		if (rule.keyframesUsed) for (const name of rule.keyframesUsed) criticalKeyframeNames.add(name);
	}
	for (let i = 0; i < rules.length; i++) {
		const rule = rules[i];
		if (rule.keyframes !== void 0) {
			if (keyframesMode !== "none" && (keyframesMode === "all" || criticalKeyframeNames.has(rule.keyframes))) texts[i] = rule.css ?? "";
			else if (inverseTexts) inverseTexts[i] = rule.css ?? "";
			continue;
		}
		if (rule.fontFace) {
			const { family, src, ranges } = rule.fontFace;
			const used = !!family && criticalFonts.has(normalizeFontFamily(family)) && unicodeRangeUsed(ranges, tokens.chars);
			if (used && src && shouldPreloadFonts && !preloadedFonts.has(src)) {
				preloadedFonts.add(src);
				fontPreloads.push(src.trim());
			}
			if (shouldInlineFonts && used) texts[i] = rule.css ?? "";
			else if (inverseTexts) inverseTexts[i] = rule.css ?? "";
		}
	}
	const result = {
		css: assemble(texts, rules),
		fontPreloads
	};
	if (inverseTexts) result.inverseCss = assemble(inverseTexts, rules);
	return result;
}
/** Emit every rule in the sheet, as when a stylesheet is inlined in full */
function renderFullCss(sheet) {
	return assemble(sheet.rules.map(wholeRuleText), sheet.rules);
}
function wholeRuleText(rule) {
	if (rule.css !== void 0) return rule.css;
	return rule.selectors ? rule.selectors.join(",") + rule.body : "";
}
/** Join rule texts, opening and closing at-rule wrappers as needed */
function assemble(texts, rules) {
	const out = [];
	let openWrap = [];
	for (let i = 0; i < texts.length; i++) {
		const text = texts[i];
		if (text == null) continue;
		const wrap = rules[i].wrap ?? [];
		let common = 0;
		while (common < openWrap.length && common < wrap.length && openWrap[common] === wrap[common]) common++;
		for (let j = openWrap.length; j > common; j--) out.push("}");
		for (let j = common; j < wrap.length; j++) out.push(wrap[j]);
		openWrap = wrap;
		out.push(text);
	}
	for (let j = openWrap.length; j > 0; j--) out.push("}");
	return out.join("");
}
/**
* The rule's text as inlined, or `null` when it isn't. With `invert`, returns
* the complement instead: what the external stylesheet still has to provide.
*/
function ruleText(rule, tokens, invert = false) {
	if (rule.always) return invert ? null : wholeRuleText(rule);
	if (!rule.match) return invert ? null : rule.css ?? null;
	const body = rule.body;
	if (rule.selectors && body !== void 0) {
		const kept = rule.selectors.filter((_, index) => matchesCondition(rule.match[index], tokens) !== invert);
		if (kept.length === 0) return null;
		return kept.join(",") + body;
	}
	if (rule.match.some((condition) => matchesCondition(condition, tokens)) !== invert) return rule.css ?? "";
	return null;
}
var DEFAULT_CACHE_SIZE = 100;
/**
* Fingerprint the scanned tokens. Token sets iterate in insertion order,
* which is deterministic for a given document shape; a differently-ordered
* but equal set only costs a cache miss, never a wrong hit.
*/
function fingerprintTokens(tokens) {
	const parts = [];
	for (const set of [
		tokens.tags,
		tokens.classes,
		tokens.ids,
		tokens.attrs
	]) {
		for (const token of set) parts.push(token);
		parts.push("\n");
	}
	if (tokens.chars) parts.push(Array.from(tokens.chars).join(","));
	parts.push("\n");
	if (tokens.matchedPrograms) for (const matched of tokens.matchedPrograms.values()) parts.push(matched ? "1" : "0");
	return parts.join(" ");
}
var CSS_HREF_RE = /\.css(?:[?#]|$)/i;
var LINK_TAG_RE = /<link\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi;
var REL_STYLESHEET_RE = /\brel\s*=\s*(?:"stylesheet"|'stylesheet'|stylesheet(?=[\s>]))/i;
var REL_PRELOAD_RE = /\brel\s*=\s*(?:"preload"|'preload'|preload(?=[\s>]))/i;
var AS_FONT_RE = /\bas\s*=\s*(?:"font"|'font'|font(?=[\s>]))/i;
var CSS_LOADER_PREAMBLE = "function $loadcss(u,m,l){(l=document.createElement('link')).rel='stylesheet';l.href=u;document.head.appendChild(l)}";
var CSS_LOADER_LAZY_PREAMBLE = CSS_LOADER_PREAMBLE.replace("l.href", "l.media='print';l.onload=function(){l.media=m};l.href");
var CSS_LOADER_INVOKE = "$loadcss(document.currentScript.dataset.href,document.currentScript.dataset.media)";
var DEFERRED_MEDIA_ATTR = "data-beasties-media";
var DEFERRED_MEDIA_SCRIPT = `document.querySelectorAll('link[${DEFERRED_MEDIA_ATTR}]').forEach(function(l){l.media=l.getAttribute('${DEFERRED_MEDIA_ATTR}');l.removeAttribute('${DEFERRED_MEDIA_ATTR}')})`;
function attrValueRegex(name) {
	return new RegExp(`(^|\\s)(${name})\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`, "i");
}
function attrNameRegex(name) {
	return new RegExp(`(^|\\s)${name}(?=[\\s/>=])`, "i");
}
function escapeAttr(value) {
	return value.replace(/"/g, "&quot;");
}
/** Get a (raw, un-decoded) attribute value from a tag string */
function getAttr(tag, name) {
	const match = tag.match(attrValueRegex(name));
	if (match) {
		const raw = match[3];
		if (raw[0] === "\"" || raw[0] === "'") return raw.slice(1, -1);
		return raw;
	}
	return attrNameRegex(name).test(tag) ? "" : null;
}
/** Set an attribute in a tag string, replacing in place or appending before `>` */
function setAttr(tag, name, value) {
	const valueRe = attrValueRegex(name);
	if (valueRe.test(tag)) return tag.replace(valueRe, `$1$2="${escapeAttr(value)}"`);
	const nameRe = attrNameRegex(name);
	if (nameRe.test(tag)) return tag.replace(nameRe, `$1${name}="${escapeAttr(value)}"`);
	if (!tag.endsWith(">")) return tag;
	let cut = tag.length - 1;
	if (tag[cut - 1] === "/") cut--;
	while (cut > 0 && WHITESPACE_RE.test(tag[cut - 1])) cut--;
	return `${tag.slice(0, cut)} ${name}="${escapeAttr(value)}"${tag.slice(cut)}`;
}
/** Remove an attribute from a tag string */
function removeAttr(tag, name) {
	return tag.replace(attrValueRegex(name), "").replace(attrNameRegex(name), "");
}
function toPreload(tag) {
	return setAttr(setAttr(tag, "rel", "preload"), "as", "style");
}
function normalizeHref(href) {
	const query = href.indexOf("?");
	const hash = href.indexOf("#");
	let end = href.length;
	if (query !== -1) end = query;
	if (hash !== -1 && hash < end) end = hash;
	let start = 0;
	if (href[0] === "." && href[1] === "/") start = 2;
	else if (href[0] === "/") start = 1;
	return href.slice(start, end);
}
function sheetForHref(sheets, href) {
	const normalized = normalizeHref(href);
	return sheets.find((sheet) => {
		if (!sheet.href) return false;
		const sheetHref = normalizeHref(sheet.href);
		return normalized === sheetHref || normalized.endsWith(`/${sheetHref}`);
	});
}
function applyEdits(html, edits) {
	edits.sort((a, b) => a.start - b.start || a.end - b.end);
	let out = "";
	let cursor = 0;
	for (const edit of edits) {
		if (edit.start < cursor) continue;
		out += html.slice(cursor, edit.start) + edit.text;
		cursor = edit.end;
	}
	return out + html.slice(cursor);
}
function createProcessor(plans, options = {}) {
	const sheets = plans.map((plan) => isCompactPlan(plan) ? decodePlan(plan) : plan);
	const programs = collectPrograms(sheets);
	const scanOptions = { chars: sheets.some((sheet) => sheet.rules.some((rule) => rule.fontFace?.ranges)) };
	const cacheSize = options.cache === false ? 0 : typeof options.cache === "object" ? options.cache.maxSize ?? DEFAULT_CACHE_SIZE : DEFAULT_CACHE_SIZE;
	const cache = cacheSize > 0 ? /* @__PURE__ */ new Map() : void 0;
	const renderOptions = {
		...options,
		inverse: !!options.minimumExternalSize
	};
	const fullCssCache = /* @__PURE__ */ new Map();
	function fullCss(sheet) {
		let css = fullCssCache.get(sheet);
		if (css === void 0) {
			css = renderFullCss(sheet);
			fullCssCache.set(sheet, css);
		}
		return css;
	}
	/**
	* Whether the whole stylesheet should be inlined, making its `<link>`
	* unnecessary: either it is small enough outright, or what would be left for
	* it to serve is small enough that the request isn't worth saving.
	*/
	function inlineInFull(sheet, critical) {
		if (options.inlineThreshold && sheet.size < options.inlineThreshold) return true;
		if (options.minimumExternalSize && critical.inverseCss !== void 0) return critical.inverseCss.length < options.minimumExternalSize;
		return false;
	}
	function renderSheet(sheet, tokens, key) {
		if (!cache || key === void 0) return renderCriticalCss(sheet, tokens, renderOptions);
		let bySheet = cache.get(key);
		if (bySheet) {
			cache.delete(key);
			cache.set(key, bySheet);
		} else {
			bySheet = /* @__PURE__ */ new Map();
			cache.set(key, bySheet);
			if (cache.size > cacheSize) cache.delete(cache.keys().next().value);
		}
		let result = bySheet.get(sheet);
		if (!result) {
			result = renderCriticalCss(sheet, tokens, renderOptions);
			bySheet.set(sheet, result);
		}
		return result;
	}
	function skippedSheets(html) {
		let skipped;
		for (const match of html.matchAll(LINK_TAG_RE)) {
			const tag = match[0];
			if (!REL_STYLESHEET_RE.test(tag) || getAttr(tag, "data-beasties-skip") === null) continue;
			const href = getAttr(tag, "href");
			const sheet = href ? sheetForHref(sheets, href) : void 0;
			if (sheet) (skipped ??= /* @__PURE__ */ new Set()).add(sheet);
		}
		return skipped;
	}
	function extract(html) {
		const tokens = scanHtml(html, programs, scanOptions);
		const key = cache ? fingerprintTokens(tokens) : void 0;
		const skipped = skippedSheets(html);
		const css = [];
		const fontPreloads = [];
		for (const sheet of sheets) {
			if (skipped?.has(sheet)) continue;
			const result = renderSheet(sheet, tokens, key);
			css.push(inlineInFull(sheet, result) ? fullCss(sheet) : result.css);
			fontPreloads.push(...result.fontPreloads);
		}
		return {
			css: css.join(""),
			fontPreloads
		};
	}
	function process(html, processOptions) {
		const tokens = scanHtml(html, programs, scanOptions);
		const key = cache ? fingerprintTokens(tokens) : void 0;
		const strategy = options.preload;
		const nonce = processOptions?.nonce ?? options.nonce;
		const nonceAttr = nonce ? ` nonce="${escapeAttr(nonce)}"` : "";
		let firstLinkIndex = -1;
		const edits = [];
		const bodyAppends = [];
		let deferredMedia = false;
		const criticalParts = [];
		const fontPreloads = /* @__PURE__ */ new Set();
		const existingFontPreloads = /* @__PURE__ */ new Set();
		let isFirstSheet = true;
		for (const match of html.matchAll(LINK_TAG_RE)) {
			const tag = match[0];
			if (!REL_STYLESHEET_RE.test(tag)) {
				if (REL_PRELOAD_RE.test(tag) && AS_FONT_RE.test(tag)) {
					const preloaded = getAttr(tag, "href");
					if (preloaded) existingFontPreloads.add(preloaded);
				}
				continue;
			}
			if (getAttr(tag, "data-beasties-skip") !== null) continue;
			const href = getAttr(tag, "href");
			if (!href) continue;
			const sheet = sheetForHref(sheets, href);
			if (!sheet) {
				if (CSS_HREF_RE.test(href)) options.logger?.warn?.(`Unable to locate stylesheet: ${href}`);
				continue;
			}
			const result = renderSheet(sheet, tokens, key);
			const wholeSheet = inlineInFull(sheet, result);
			criticalParts.push(wholeSheet ? fullCss(sheet) : result.css);
			for (const preload of result.fontPreloads) fontPreloads.add(preload);
			const start = match.index;
			const end = start + tag.length;
			if (firstLinkIndex === -1) firstLinkIndex = start;
			if (wholeSheet) {
				edits.push({
					start,
					end,
					text: ""
				});
				continue;
			}
			if (strategy === false) continue;
			const rawMedia = getAttr(tag, "media");
			const media = rawMedia && isSafeMediaValue(rawMedia) ? rawMedia : void 0;
			let newTag = tag;
			let noscriptFallback = false;
			let scriptAfter;
			if (strategy === "body") {
				bodyAppends.push(tag);
				newTag = "";
			} else if (strategy === "media-script") {
				newTag = setAttr(setAttr(tag, "media", "print"), DEFERRED_MEDIA_ATTR, media || "all");
				deferredMedia = true;
				noscriptFallback = true;
			} else if (strategy === "media") {
				newTag = setAttr(setAttr(tag, "media", "print"), "onload", `this.media='${media || "all"}'`);
				noscriptFallback = true;
			} else if (strategy === "swap") {
				newTag = toPreload(setAttr(tag, "onload", "this.rel='stylesheet'"));
				noscriptFallback = true;
			} else if (strategy === "swap-high") {
				newTag = setAttr(setAttr(setAttr(setAttr(tag, "rel", "alternate stylesheet preload"), "title", "styles"), "as", "style"), "onload", "this.title='';this.rel='stylesheet'");
				noscriptFallback = true;
			} else if (strategy === "swap-low") {
				newTag = setAttr(setAttr(setAttr(tag, "rel", "alternate stylesheet"), "title", "styles"), "onload", "this.title='';this.rel='stylesheet'");
				noscriptFallback = true;
			} else if (strategy === "js" || strategy === "js-lazy") {
				const preamble = isFirstSheet ? strategy === "js-lazy" ? CSS_LOADER_LAZY_PREAMBLE : CSS_LOADER_PREAMBLE : "";
				scriptAfter = `<script${nonceAttr} data-href="${escapeAttr(href)}" data-media="${escapeAttr(media || "all")}">${preamble}${CSS_LOADER_INVOKE}<\/script>`;
				newTag = toPreload(tag);
				noscriptFallback = true;
			} else {
				bodyAppends.push(removeAttr(tag, "id"));
				newTag = toPreload(tag);
			}
			if (options.noscriptFallback !== false && noscriptFallback && !href.includes("</noscript>")) edits.push({
				start: end,
				end,
				text: `<noscript>${removeAttr(tag, "id")}</noscript>`
			});
			if (scriptAfter) edits.push({
				start: end,
				end,
				text: scriptAfter
			});
			if (newTag !== tag) edits.push({
				start,
				end,
				text: newTag
			});
			isFirstSheet = false;
		}
		for (const preloaded of existingFontPreloads) fontPreloads.delete(preloaded);
		const critical = criticalParts.join("");
		if (!critical && fontPreloads.size === 0 && edits.length === 0 && bodyAppends.length === 0) return html;
		const headInsertions = [];
		for (const preload of fontPreloads) headInsertions.push(`<link rel="preload" as="font" crossorigin="anonymous" href="${escapeAttr(preload)}">`);
		if (critical) headInsertions.push(`<style${nonceAttr}>${critical}</style>`);
		if (deferredMedia) bodyAppends.push(`<script${nonceAttr}>${DEFERRED_MEDIA_SCRIPT}<\/script>`);
		if (headInsertions.length > 0) {
			let insertAt = firstLinkIndex;
			if (insertAt === -1) insertAt = html.match(/<\/head\s*>/i)?.index ?? 0;
			edits.push({
				start: insertAt,
				end: insertAt,
				text: headInsertions.join("")
			});
		}
		if (bodyAppends.length > 0) {
			const bodyClose = lastIndexOfRe(html, /<\/body\s*>/gi);
			const insertAt = bodyClose === -1 ? html.length : bodyClose;
			edits.push({
				start: insertAt,
				end: insertAt,
				text: bodyAppends.join("")
			});
		}
		return applyEdits(html, edits);
	}
	return {
		process,
		extract
	};
}
function lastIndexOfRe(html, re) {
	let last = -1;
	for (const match of html.matchAll(re)) last = match.index;
	return last;
}
//#endregion
//#region node_modules/@angular/ssr/fesm2022/ssr.mjs
var ServerAssets = class {
	manifest;
	constructor(manifest) {
		this.manifest = manifest;
	}
	getServerAsset(path) {
		const asset = this.manifest.assets[path];
		if (!asset) throw new Error(`Server asset '${path}' does not exist.`);
		return asset;
	}
	hasServerAsset(path) {
		return !!this.manifest.assets[path];
	}
	getIndexServerHtml() {
		return this.getServerAsset("index.server.html");
	}
};
var IGNORED_LOGS = /* @__PURE__ */ new Set(["Angular is running in development mode."]);
var Console = class extends Console$1 {
	log(message) {
		if (!IGNORED_LOGS.has(message)) super.log(message);
	}
};
var angularAppManifest;
function setAngularAppManifest(manifest) {
	angularAppManifest = manifest;
}
function getAngularAppManifest() {
	if (!angularAppManifest) throw new Error("Angular app manifest is not set. Please ensure you are using the '@angular/build:application' builder to build your server application.");
	return angularAppManifest;
}
var angularAppEngineManifest;
function setAngularAppEngineManifest(manifest) {
	angularAppEngineManifest = manifest;
}
function getAngularAppEngineManifest() {
	if (!angularAppEngineManifest) throw new Error("Angular app engine manifest is not set. Please ensure you are using the '@angular/build:application' builder to build your server application.");
	return angularAppEngineManifest;
}
function stripTrailingSlash(url) {
	return url.length > 1 && url.at(-1) === "/" ? url.slice(0, -1) : url;
}
function stripLeadingSlash(url) {
	return url.length > 1 && url[0] === "/" ? url.slice(1) : url;
}
function addLeadingSlash(url) {
	return url[0] === "/" ? url : `/${url}`;
}
function addTrailingSlash(url) {
	return url.at(-1) === "/" ? url : `${url}/`;
}
function joinUrlParts(...parts) {
	const normalizedParts = [];
	for (const part of parts) {
		if (part === "") continue;
		let start = 0;
		let end = part.length;
		while (start < end && part[start] === "/") start++;
		while (end > start && part[end - 1] === "/") end--;
		if (start < end) normalizedParts.push(part.slice(start, end));
	}
	return addLeadingSlash(normalizedParts.join("/"));
}
function stripIndexHtmlFromURL(url) {
	if (url.pathname.endsWith("/index.html")) {
		const modifiedURL = new URL(url);
		modifiedURL.pathname = modifiedURL.pathname.slice(0, -11);
		return modifiedURL;
	}
	return url;
}
function buildPathWithParams(toPath, fromPath) {
	if (toPath[0] !== "/") throw new Error(`Invalid toPath: The string must start with a '/'. Received: '${toPath}'`);
	if (fromPath[0] !== "/") throw new Error(`Invalid fromPath: The string must start with a '/'. Received: '${fromPath}'`);
	if (!toPath.includes("/*")) return toPath;
	const fromPathParts = fromPath.split("/");
	const toPathParts = toPath.split("/");
	return joinUrlParts(...toPathParts.map((part, index) => toPathParts[index] === "*" ? fromPathParts[index] : part));
}
var MATRIX_PARAMS_REGEX = /;[^/]+/g;
function stripMatrixParams(pathname) {
	return pathname.includes(";") ? pathname.replace(MATRIX_PARAMS_REGEX, "") : pathname;
}
async function renderAngular(html, bootstrap, url, platformProviders, serverContext) {
	const urlToRender = stripIndexHtmlFromURL(url);
	const platformRef = platformServer([
		{
			provide: INITIAL_CONFIG,
			useValue: {
				url: urlToRender.href,
				document: html
			}
		},
		{
			provide: SERVER_CONTEXT,
			useValue: serverContext
		},
		{
			provide: Console$1,
			useFactory: () => new Console()
		},
		...platformProviders
	]);
	let redirectTo;
	let hasNavigationError = true;
	try {
		let applicationRef;
		if (isNgModule(bootstrap)) applicationRef = (await platformRef.bootstrapModule(bootstrap)).injector.get(ApplicationRef);
		else applicationRef = await bootstrap({ platformRef });
		await applicationRef.whenStable();
		if (applicationRef.destroyed) return { hasNavigationError: true };
		const envInjector = applicationRef.injector;
		const routerIsProvided = !!envInjector.get(ActivatedRoute, null);
		const router = envInjector.get(Router);
		const lastSuccessfulNavigation = router.lastSuccessfulNavigation();
		if (!routerIsProvided) hasNavigationError = false;
		else if (lastSuccessfulNavigation?.finalUrl) {
			hasNavigationError = false;
			const requestPrefix = envInjector.get(APP_BASE_HREF, null, { optional: true }) ?? envInjector.get(REQUEST, null, { optional: true })?.headers.get("X-Forwarded-Prefix");
			const { pathname, search, hash } = envInjector.get(PlatformLocation);
			const finalUrl = constructSerializedUrl(router, {
				pathname,
				search,
				hash
			}, requestPrefix);
			if (constructSerializedUrl(router, urlToRender, requestPrefix) !== finalUrl) redirectTo = [
				pathname,
				search,
				hash
			].join("");
		}
		return {
			destroy: () => void asyncDestroyPlatform(platformRef),
			hasNavigationError,
			redirectTo,
			content: () => new Promise((resolve, reject) => {
				setTimeout(() => {
					renderInternal(platformRef, applicationRef).then(resolve).catch(reject).finally(() => void asyncDestroyPlatform(platformRef));
				}, 0);
			})
		};
	} catch (error) {
		await asyncDestroyPlatform(platformRef);
		throw error;
	} finally {
		if (hasNavigationError || redirectTo) asyncDestroyPlatform(platformRef);
	}
}
function isNgModule(value) {
	return "ɵmod" in value;
}
function asyncDestroyPlatform(platformRef) {
	if (platformRef.destroyed) return Promise.resolve();
	return new Promise((resolve) => {
		setTimeout(() => {
			if (!platformRef.destroyed) platformRef.destroy();
			resolve();
		}, 0);
	});
}
function constructSerializedUrl(router, url, prefix) {
	const { pathname, hash, search } = url;
	const urlParts = [];
	if (prefix && !addTrailingSlash(pathname).startsWith(addTrailingSlash(prefix))) urlParts.push(joinUrlParts(prefix, pathname));
	else urlParts.push(stripTrailingSlash(pathname));
	urlParts.push(search, hash);
	const urlTree = router.parseUrl(urlParts.join(""));
	return router.serializeUrl(urlTree);
}
function promiseWithAbort(promise, signal, errorMessagePrefix) {
	return new Promise((resolve, reject) => {
		const abortHandler = () => {
			reject(new DOMException(`${errorMessagePrefix} was aborted.\n${signal.reason}`, "AbortError"));
		};
		if (signal.aborted) {
			abortHandler();
			return;
		}
		signal.addEventListener("abort", abortHandler, { once: true });
		promise.then(resolve).catch(reject).finally(() => {
			signal.removeEventListener("abort", abortHandler);
		});
	});
}
var VALID_REDIRECT_RESPONSE_CODES = /* @__PURE__ */ new Set([
	301,
	302,
	303,
	307,
	308
]);
function isValidRedirectResponseCode(code) {
	return VALID_REDIRECT_RESPONSE_CODES.has(code);
}
function createRedirectResponse(location, status = 302, headers) {
	if (ngDevMode && !isValidRedirectResponseCode(status)) throw new Error(`Invalid redirect status code: ${status}. Please use one of the following redirect response codes: ${[...VALID_REDIRECT_RESPONSE_CODES.values()].join(", ")}.`);
	const resHeaders = headers instanceof Headers ? headers : new Headers(headers);
	if (ngDevMode && resHeaders.has("location")) console.warn(`Location header "${resHeaders.get("location")}" will be ignored and set to "${location}".`);
	const varyArray = resHeaders.get("Vary")?.split(",") ?? [];
	const varySet = /* @__PURE__ */ new Set(["X-Forwarded-Prefix"]);
	for (const vary of varyArray) {
		const value = vary.trim();
		if (value) varySet.add(value);
	}
	resHeaders.set("Vary", [...varySet].join(", "));
	resHeaders.set("Location", location);
	return new Response(null, {
		status,
		headers: resHeaders
	});
}
var APP_SHELL_ROUTE = "ng-app-shell";
var ServerRenderingFeatureKind;
(function(ServerRenderingFeatureKind) {
	ServerRenderingFeatureKind[ServerRenderingFeatureKind["AppShell"] = 0] = "AppShell";
	ServerRenderingFeatureKind[ServerRenderingFeatureKind["ServerRoutes"] = 1] = "ServerRoutes";
})(ServerRenderingFeatureKind || (ServerRenderingFeatureKind = {}));
var RenderMode;
(function(RenderMode) {
	RenderMode[RenderMode["Server"] = 0] = "Server";
	RenderMode[RenderMode["Client"] = 1] = "Client";
	RenderMode[RenderMode["Prerender"] = 2] = "Prerender";
})(RenderMode || (RenderMode = {}));
var PrerenderFallback;
(function(PrerenderFallback) {
	PrerenderFallback[PrerenderFallback["Server"] = 0] = "Server";
	PrerenderFallback[PrerenderFallback["Client"] = 1] = "Client";
	PrerenderFallback[PrerenderFallback["None"] = 2] = "None";
})(PrerenderFallback || (PrerenderFallback = {}));
var SERVER_ROUTES_CONFIG = new InjectionToken("SERVER_ROUTES_CONFIG");
function withRoutes(routes) {
	const config = { routes };
	return {
		ɵkind: ServerRenderingFeatureKind.ServerRoutes,
		ɵproviders: [{
			provide: SERVER_ROUTES_CONFIG,
			useValue: config
		}]
	};
}
function withAppShell(component) {
	const routeConfig = { path: APP_SHELL_ROUTE };
	if ("ɵcmp" in component) routeConfig.component = component;
	else routeConfig.loadComponent = component;
	return {
		ɵkind: ServerRenderingFeatureKind.AppShell,
		ɵproviders: [{
			provide: ROUTES,
			useValue: routeConfig,
			multi: true
		}, provideEnvironmentInitializer(() => {
			const config = inject(SERVER_ROUTES_CONFIG);
			config.appShellRoute = APP_SHELL_ROUTE;
		})]
	};
}
function provideServerRendering(...args) {
	let options;
	let features;
	if (hasOptions(args)) {
		const [first, ...rest] = args;
		options = first;
		features = rest;
	} else features = args;
	const providers = [provideServerRendering$1(options)];
	let hasAppShell = false;
	let hasServerRoutes = false;
	for (const { ɵkind, ɵproviders } of features) {
		hasAppShell ||= ɵkind === ServerRenderingFeatureKind.AppShell;
		hasServerRoutes ||= ɵkind === ServerRenderingFeatureKind.ServerRoutes;
		providers.push(...ɵproviders);
	}
	if (!hasServerRoutes && hasAppShell) throw new Error("Configuration error: found 'withAppShell()' without 'withRoutes()' in the same call to 'provideServerRendering()'.The 'withAppShell()' function requires 'withRoutes()' to be used.");
	return makeEnvironmentProviders(providers);
}
function hasOptions(args) {
	const value = args[0];
	return !!value && typeof value === "object" && !("ɵkind" in value);
}
var RouteTree = class RouteTree {
	root = this.createEmptyRouteTreeNode();
	insert(route, metadata) {
		let node = this.root;
		const segments = this.getPathSegments(route);
		const normalizedSegments = [];
		for (const segment of segments) {
			const normalizedSegment = segment[0] === ":" ? "*" : segment;
			let childNode = node.children.get(normalizedSegment);
			if (!childNode) {
				childNode = this.createEmptyRouteTreeNode();
				node.children.set(normalizedSegment, childNode);
			}
			node = childNode;
			normalizedSegments.push(normalizedSegment);
		}
		node.metadata = {
			...metadata,
			route: addLeadingSlash(normalizedSegments.join("/"))
		};
	}
	match(route) {
		const segments = this.getPathSegments(route);
		return this.traverseBySegments(segments)?.metadata;
	}
	toObject() {
		return Array.from(this.traverse());
	}
	static fromObject(value) {
		const tree = new RouteTree();
		for (const { route, ...metadata } of value) tree.insert(route, metadata);
		return tree;
	}
	*traverse(node = this.root) {
		if (node.metadata) yield node.metadata;
		for (const childNode of node.children.values()) yield* this.traverse(childNode);
	}
	getPathSegments(route) {
		return route.split("/").filter(Boolean).map(decodeURIComponent);
	}
	traverseBySegments(segments, node = this.root, currentIndex = 0) {
		if (currentIndex >= segments.length) return node.metadata ? node : node.children.get("**");
		if (!node.children.size) return;
		const segment = segments[currentIndex];
		const exactMatch = node.children.get(segment);
		if (exactMatch) {
			const match = this.traverseBySegments(segments, exactMatch, currentIndex + 1);
			if (match) return match;
		}
		const wildcardMatch = node.children.get("*");
		if (wildcardMatch) {
			const match = this.traverseBySegments(segments, wildcardMatch, currentIndex + 1);
			if (match) return match;
		}
		return node.children.get("**");
	}
	createEmptyRouteTreeNode() {
		return { children: /* @__PURE__ */ new Map() };
	}
};
var IS_DISCOVERING_ROUTES = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "IS_DISCOVERING_ROUTES" : "", {
	providedIn: "platform",
	factory: () => false
});
var MODULE_PRELOAD_MAX = 10;
var CATCH_ALL_REGEXP = /\/(\*\*)$/;
var URL_PARAMETER_REGEXP = /(?<!\\):([^/]+)/;
var URL_PARAMETER_GLOBAL_REGEXP = new RegExp(URL_PARAMETER_REGEXP, "g");
async function* handleRoute(options) {
	try {
		const { metadata, currentRoutePath, route, compiler, parentInjector, serverConfigRouteTree, entryPointToBrowserMapping, invokeGetPrerenderParams, includePrerenderFallbackRoutes } = options;
		const { redirectTo, loadChildren: loadChildren$1, loadComponent, children, ɵentryName } = route;
		if (ɵentryName && loadComponent) appendPreloadToMetadata(ɵentryName, entryPointToBrowserMapping, metadata);
		if (metadata.renderMode === RenderMode.Prerender) yield* handleSSGRoute(serverConfigRouteTree, typeof redirectTo === "string" ? redirectTo : void 0, metadata, parentInjector, invokeGetPrerenderParams, includePrerenderFallbackRoutes);
		else if (redirectTo !== void 0) {
			if (metadata.status && !isValidRedirectResponseCode(metadata.status)) yield { error: `The '${metadata.status}' status code is not a valid redirect response code. Please use one of the following redirect response codes: ${[...VALID_REDIRECT_RESPONSE_CODES.values()].join(", ")}.` };
			else if (typeof redirectTo === "string") yield {
				...metadata,
				redirectTo: resolveRedirectTo(metadata.route, redirectTo)
			};
			else yield metadata;
		} else yield metadata;
		if (children?.length) yield* traverseRoutesConfig({
			...options,
			routes: children,
			parentRoute: currentRoutePath,
			parentPreloads: metadata.preload
		});
		if (loadChildren$1) {
			if (ɵentryName) appendPreloadToMetadata(ɵentryName, entryPointToBrowserMapping, metadata);
			const routeInjector = route.providers ? createEnvironmentInjector(route.providers, parentInjector.get(EnvironmentInjector), `Route: ${route.path}`) : parentInjector;
			const loadedChildRoutes = await loadChildren(route, compiler, routeInjector);
			if (loadedChildRoutes) {
				const { routes: childRoutes, injector = routeInjector } = loadedChildRoutes;
				yield* traverseRoutesConfig({
					...options,
					routes: childRoutes,
					parentInjector: injector,
					parentRoute: currentRoutePath,
					parentPreloads: metadata.preload
				});
			}
		}
	} catch (error) {
		yield { error: `Error in handleRoute for '${options.currentRoutePath}': ${error.message}` };
	}
}
async function* traverseRoutesConfig(options) {
	const { routes: routeConfigs, parentPreloads, parentRoute, serverConfigRouteTree } = options;
	for (const route of routeConfigs) {
		const { matcher, path = matcher ? "**" : "" } = route;
		const currentRoutePath = joinUrlParts(parentRoute, path);
		if (matcher && serverConfigRouteTree) {
			const matches = [];
			for (const matchedMetaData of serverConfigRouteTree.traverse()) if (matchedMetaData.route.startsWith(currentRoutePath)) matches.push(matchedMetaData);
			if (!matches.length) {
				const matchedMetaData = serverConfigRouteTree.match(currentRoutePath);
				if (matchedMetaData) matches.push(matchedMetaData);
			}
			for (const matchedMetaData of matches) {
				matchedMetaData.presentInClientRouter = true;
				if (matchedMetaData.renderMode === RenderMode.Prerender) {
					yield { error: `The route '${stripLeadingSlash(currentRoutePath)}' is set for prerendering but has a defined matcher. Routes with matchers cannot use prerendering. Please specify a different 'renderMode'.` };
					continue;
				}
				yield* handleRoute({
					...options,
					currentRoutePath,
					route,
					metadata: {
						...matchedMetaData,
						preload: parentPreloads,
						route: matchedMetaData.route,
						presentInClientRouter: void 0
					}
				});
			}
			if (!matches.length) yield { error: `The route '${stripLeadingSlash(currentRoutePath)}' has a defined matcher but does not match any route in the server routing configuration. Please ensure this route is added to the server routing configuration.` };
			continue;
		}
		let matchedMetaData;
		if (serverConfigRouteTree) {
			matchedMetaData = serverConfigRouteTree.match(currentRoutePath);
			if (!matchedMetaData) {
				yield { error: `The '${stripLeadingSlash(currentRoutePath)}' route does not match any route defined in the server routing configuration. Please ensure this route is added to the server routing configuration.` };
				continue;
			}
			matchedMetaData.presentInClientRouter = true;
		}
		yield* handleRoute({
			...options,
			metadata: {
				renderMode: RenderMode.Prerender,
				...matchedMetaData,
				preload: parentPreloads,
				route: path === "" ? addTrailingSlash(currentRoutePath) : currentRoutePath,
				presentInClientRouter: void 0
			},
			currentRoutePath,
			route
		});
	}
}
function appendPreloadToMetadata(entryName, entryPointToBrowserMapping, metadata) {
	const existingPreloads = metadata.preload ?? [];
	if (!entryPointToBrowserMapping || existingPreloads.length >= MODULE_PRELOAD_MAX) return;
	const preload = entryPointToBrowserMapping[entryName];
	if (!preload?.length) return;
	const combinedPreloads = new Set(existingPreloads);
	for (const href of preload) {
		combinedPreloads.add(href);
		if (combinedPreloads.size === MODULE_PRELOAD_MAX) break;
	}
	metadata.preload = Array.from(combinedPreloads);
}
async function* handleSSGRoute(serverConfigRouteTree, redirectTo, metadata, parentInjector, invokeGetPrerenderParams, includePrerenderFallbackRoutes) {
	if (metadata.renderMode !== RenderMode.Prerender) throw new Error(`'handleSSGRoute' was called for a route which rendering mode is not prerender.`);
	const { route: currentRoutePath, fallback, ...meta } = metadata;
	const getPrerenderParams = "getPrerenderParams" in meta ? meta.getPrerenderParams : void 0;
	if ("getPrerenderParams" in meta) delete meta["getPrerenderParams"];
	if (redirectTo !== void 0) meta.redirectTo = resolveRedirectTo(currentRoutePath, redirectTo);
	const isCatchAllRoute = CATCH_ALL_REGEXP.test(currentRoutePath);
	if (isCatchAllRoute && !getPrerenderParams || !isCatchAllRoute && !URL_PARAMETER_REGEXP.test(currentRoutePath)) {
		yield {
			...meta,
			route: currentRoutePath
		};
		return;
	}
	if (invokeGetPrerenderParams) {
		if (!getPrerenderParams) {
			yield { error: `The '${stripLeadingSlash(currentRoutePath)}' route uses prerendering and includes parameters, but 'getPrerenderParams' is missing. Please define 'getPrerenderParams' function for this route in your server routing configuration or specify a different 'renderMode'.` };
			return;
		}
		if (serverConfigRouteTree) {
			const catchAllRoutePath = isCatchAllRoute ? currentRoutePath : joinUrlParts(currentRoutePath, "**");
			const match = serverConfigRouteTree.match(catchAllRoutePath);
			if (match && match.renderMode === RenderMode.Prerender && !("getPrerenderParams" in match)) serverConfigRouteTree.insert(catchAllRoutePath, {
				...match,
				presentInClientRouter: true,
				getPrerenderParams
			});
		}
		const parameters = await runInInjectionContext(parentInjector, () => getPrerenderParams());
		try {
			for (const params of parameters) {
				const replacer = handlePrerenderParamsReplacement(params, currentRoutePath);
				const routeWithResolvedParams = currentRoutePath.replace(URL_PARAMETER_GLOBAL_REGEXP, replacer).replace(CATCH_ALL_REGEXP, replacer);
				yield {
					...meta,
					route: routeWithResolvedParams,
					redirectTo: redirectTo === void 0 ? void 0 : resolveRedirectTo(routeWithResolvedParams, redirectTo)
				};
			}
		} catch (error) {
			yield { error: `${error.message}` };
			return;
		}
	}
	if (includePrerenderFallbackRoutes && (fallback !== PrerenderFallback.None || !invokeGetPrerenderParams)) yield {
		...meta,
		route: currentRoutePath,
		renderMode: fallback === PrerenderFallback.Client ? RenderMode.Client : RenderMode.Server
	};
}
function handlePrerenderParamsReplacement(params, currentRoutePath) {
	return (match) => {
		const parameterName = match.slice(1);
		const value = params[parameterName];
		if (typeof value !== "string") throw new Error(`The 'getPrerenderParams' function defined for the '${stripLeadingSlash(currentRoutePath)}' route returned a non-string value for parameter '${parameterName}'. Please make sure the 'getPrerenderParams' function returns values for all parameters specified in this route.`);
		return parameterName === "**" ? `/${value}` : value;
	};
}
function resolveRedirectTo(routePath, redirectTo) {
	if (redirectTo[0] === "/") return redirectTo;
	const segments = routePath.replace(URL_PARAMETER_GLOBAL_REGEXP, "*").split("/");
	segments.pop();
	return joinUrlParts(...segments, redirectTo);
}
function buildServerConfigRouteTree({ routes, appShellRoute }) {
	const serverRoutes = [...routes];
	if (appShellRoute !== void 0) serverRoutes.unshift({
		path: appShellRoute,
		renderMode: RenderMode.Prerender
	});
	const serverConfigRouteTree = new RouteTree();
	const errors = [];
	for (const { path, ...metadata } of serverRoutes) {
		if (path[0] === "/") {
			errors.push(`Invalid '${path}' route configuration: the path cannot start with a slash.`);
			continue;
		}
		if ("getPrerenderParams" in metadata && (path.includes("/*/") || path.endsWith("/*"))) {
			errors.push(`Invalid '${path}' route configuration: 'getPrerenderParams' cannot be used with a '*' route.`);
			continue;
		}
		serverConfigRouteTree.insert(path, metadata);
	}
	return {
		serverConfigRouteTree,
		errors
	};
}
async function getRoutesFromAngularRouterConfig(bootstrap, document, url, invokeGetPrerenderParams = false, includePrerenderFallbackRoutes = true, entryPointToBrowserMapping = void 0) {
	const { protocol, host } = url;
	const platformRef = platformServer([
		{
			provide: INITIAL_CONFIG,
			useValue: {
				document,
				url: `${protocol}//${host}/`
			}
		},
		{
			provide: Console$1,
			useFactory: () => new Console()
		},
		{
			provide: ENABLE_ROOT_COMPONENT_BOOTSTRAP,
			useValue: false
		},
		{
			provide: IS_DISCOVERING_ROUTES,
			useValue: true
		}
	]);
	try {
		let applicationRef;
		if (isNgModule(bootstrap)) applicationRef = (await platformRef.bootstrapModule(bootstrap)).injector.get(ApplicationRef);
		else applicationRef = await bootstrap({ platformRef });
		const injector = applicationRef.injector;
		const router = injector.get(Router);
		router.navigationTransitions.afterPreactivation()?.next?.();
		await applicationRef.whenStable();
		const errors = [];
		const rawBaseHref = injector.get(APP_BASE_HREF, null, { optional: true }) ?? injector.get(PlatformLocation).getBaseHrefFromDOM();
		const { pathname: baseHref } = new URL(rawBaseHref, "http://localhost");
		const compiler = injector.get(Compiler);
		const serverRoutesConfig = injector.get(SERVER_ROUTES_CONFIG, null, { optional: true });
		let serverConfigRouteTree;
		if (serverRoutesConfig) {
			const result = buildServerConfigRouteTree(serverRoutesConfig);
			serverConfigRouteTree = result.serverConfigRouteTree;
			errors.push(...result.errors);
		}
		if (errors.length) return {
			baseHref,
			routes: [],
			errors
		};
		const routesResults = [];
		if (router.config.length) {
			const traverseRoutes = traverseRoutesConfig({
				routes: router.config,
				compiler,
				parentInjector: injector,
				parentRoute: "",
				serverConfigRouteTree,
				invokeGetPrerenderParams,
				includePrerenderFallbackRoutes,
				entryPointToBrowserMapping
			});
			const seenRoutes = /* @__PURE__ */ new Set();
			for await (const routeMetadata of traverseRoutes) {
				if ("error" in routeMetadata) {
					errors.push(routeMetadata.error);
					continue;
				}
				const routePath = routeMetadata.route;
				if (!seenRoutes.has(routePath)) {
					routesResults.push(routeMetadata);
					seenRoutes.add(routePath);
				}
			}
			await new Promise((resolve) => setTimeout(resolve, 0));
			if (serverConfigRouteTree) for (const { route, presentInClientRouter } of serverConfigRouteTree.traverse()) {
				if (presentInClientRouter || route.endsWith("/**")) continue;
				errors.push(`The '${stripLeadingSlash(route)}' server route does not match any routes defined in the Angular routing configuration (typically provided as a part of the 'provideRouter' call). Please make sure that the mentioned server route is present in the Angular routing configuration.`);
			}
		} else {
			const rootRouteMetadata = serverConfigRouteTree?.match("") ?? {
				route: "",
				renderMode: RenderMode.Prerender
			};
			routesResults.push({
				...rootRouteMetadata,
				route: ""
			});
		}
		return {
			baseHref,
			routes: routesResults,
			errors,
			appShellRoute: serverRoutesConfig?.appShellRoute
		};
	} finally {
		platformRef.destroy();
	}
}
function extractRoutesAndCreateRouteTree(options) {
	const { url, manifest = getAngularAppManifest(), invokeGetPrerenderParams = false, includePrerenderFallbackRoutes = true, signal } = options;
	async function extract() {
		const routeTree = new RouteTree();
		const document = await new ServerAssets(manifest).getIndexServerHtml().text();
		const { baseHref, appShellRoute, routes, errors } = await getRoutesFromAngularRouterConfig(await manifest.bootstrap(), document, url, invokeGetPrerenderParams, includePrerenderFallbackRoutes, manifest.entryPointToBrowserMapping);
		for (const { route, ...metadata } of routes) {
			if (metadata.redirectTo !== void 0) metadata.redirectTo = joinUrlParts(baseHref, metadata.redirectTo);
			for (const [key, value] of Object.entries(metadata)) if (value === void 0) delete metadata[key];
			const fullRoute = joinUrlParts(baseHref, route);
			routeTree.insert(fullRoute, metadata);
		}
		return {
			appShellRoute,
			routeTree,
			errors
		};
	}
	return signal ? promiseWithAbort(extract(), signal, "Routes extraction") : extract();
}
var Hooks = class {
	store = /* @__PURE__ */ new Map();
	async run(name, context) {
		const hooks = this.store.get(name);
		switch (name) {
			case "html:transform:pre": {
				if (!hooks) return context.html;
				const ctx = { ...context };
				for (const hook of hooks) ctx.html = await hook(ctx);
				return ctx.html;
			}
			default: throw new Error(`Running hook "${name}" is not supported.`);
		}
	}
	on(name, handler) {
		const hooks = this.store.get(name);
		if (hooks) hooks.push(handler);
		else this.store.set(name, [handler]);
	}
	has(name) {
		return !!this.store.get(name)?.length;
	}
};
var ServerRouter = class ServerRouter {
	routeTree;
	constructor(routeTree) {
		this.routeTree = routeTree;
	}
	static #extractionPromise;
	static from(manifest, url) {
		if (manifest.routes) {
			const routeTree = RouteTree.fromObject(manifest.routes);
			return Promise.resolve(new ServerRouter(routeTree));
		}
		ServerRouter.#extractionPromise ??= extractRoutesAndCreateRouteTree({
			url,
			manifest
		}).then(({ routeTree, errors }) => {
			if (errors.length > 0) throw new Error("Error(s) occurred while extracting routes:\n" + errors.map((error) => `- ${error}`).join("\n"));
			return new ServerRouter(routeTree);
		}).finally(() => {
			ServerRouter.#extractionPromise = void 0;
		});
		return ServerRouter.#extractionPromise;
	}
	match(url) {
		let { pathname } = stripIndexHtmlFromURL(url);
		pathname = stripMatrixParams(pathname);
		return this.routeTree.match(pathname);
	}
};
var WELL_KNOWN_NON_ANGULAR_URLS = /* @__PURE__ */ new Set(["/favicon.ico", "/.well-known/appspecific/com.chrome.devtools.json"]);
var SERVER_CONTEXT_VALUE = {
	[RenderMode.Prerender]: "ssg",
	[RenderMode.Server]: "ssr",
	[RenderMode.Client]: ""
};
var AngularServerApp = class {
	options;
	allowStaticRouteRender;
	hooks;
	constructor(options = {}) {
		this.options = options;
		this.allowStaticRouteRender = this.options.allowStaticRouteRender ?? false;
		this.hooks = options.hooks ?? new Hooks();
	}
	manifest = getAngularAppManifest();
	assets = new ServerAssets(this.manifest);
	router;
	inlineCriticalCssProcessor;
	boostrap;
	textEncoder = new TextEncoder();
	async handle(request, requestContext) {
		const url = new URL(request.url);
		if (WELL_KNOWN_NON_ANGULAR_URLS.has(url.pathname)) return null;
		this.router ??= await ServerRouter.from(this.manifest, url);
		const matchedRoute = this.router.match(url);
		if (!matchedRoute) return null;
		const { redirectTo, status, renderMode, headers } = matchedRoute;
		if (redirectTo !== void 0) return createRedirectResponse(joinUrlParts(request.headers.get("X-Forwarded-Prefix") ?? "", buildPathWithParams(redirectTo, url.pathname)), status, headers);
		if (renderMode === RenderMode.Prerender) {
			const response = await this.handleServe(request, matchedRoute);
			if (response) return response;
		}
		return promiseWithAbort(this.handleRendering(request, matchedRoute, requestContext), request.signal, `Request for: ${request.url}`);
	}
	async handleServe(request, matchedRoute) {
		const { headers, renderMode } = matchedRoute;
		if (renderMode !== RenderMode.Prerender) return null;
		const { method } = request;
		if (method !== "GET" && method !== "HEAD") return null;
		const assetPath = this.buildServerAssetPathFromRequest(request);
		const { manifest: { locale }, assets } = this;
		if (!assets.hasServerAsset(assetPath)) return null;
		const { text, hash, size } = assets.getServerAsset(assetPath);
		const etag = `"${hash}"`;
		return request.headers.get("if-none-match") === etag ? new Response(void 0, {
			status: 304,
			statusText: "Not Modified"
		}) : new Response(await text(), { headers: {
			"Content-Length": size.toString(),
			"ETag": etag,
			"Content-Type": "text/html;charset=UTF-8",
			...locale !== void 0 ? { "Content-Language": locale } : {},
			...headers
		} });
	}
	async handleRendering(request, matchedRoute, requestContext) {
		const { renderMode, headers, status, preload } = matchedRoute;
		if (!this.allowStaticRouteRender && renderMode === RenderMode.Prerender) return null;
		const url = new URL(request.url);
		const platformProviders = [];
		const { manifest: { bootstrap, locale }, assets } = this;
		const responseInit = {
			status,
			headers: new Headers({
				"Content-Type": "text/html;charset=UTF-8",
				...locale !== void 0 ? { "Content-Language": locale } : {},
				...headers
			})
		};
		if (renderMode === RenderMode.Server) platformProviders.push({
			provide: REQUEST,
			useValue: request
		}, {
			provide: REQUEST_CONTEXT,
			useValue: requestContext
		}, {
			provide: RESPONSE_INIT,
			useValue: responseInit
		});
		else if (renderMode === RenderMode.Client) {
			let html = await this.assets.getServerAsset("index.csr.html").text();
			html = await this.runTransformsOnHtml(html, url, preload);
			return new Response(html, responseInit);
		}
		if (locale !== void 0) platformProviders.push({
			provide: LOCALE_ID,
			useValue: locale
		});
		this.boostrap ??= await bootstrap();
		let html = await assets.getIndexServerHtml().text();
		html = await this.runTransformsOnHtml(html, url, preload);
		const result = await renderAngular(html, this.boostrap, url, platformProviders, SERVER_CONTEXT_VALUE[renderMode]);
		if (result.hasNavigationError) return null;
		if (result.redirectTo) return createRedirectResponse(result.redirectTo, responseInit.status, responseInit.headers);
		if (renderMode === RenderMode.Prerender) {
			const renderedHtml = await result.content();
			const finalHtml = this.inlineCriticalCss(renderedHtml);
			return new Response(finalHtml, responseInit);
		}
		const stream = new ReadableStream({
			start: async (controller) => {
				try {
					let renderedHtml = await result.content();
					renderedHtml = this.inlineCriticalCss(renderedHtml);
					controller.enqueue(this.textEncoder.encode(renderedHtml));
					controller.close();
				} catch (error) {
					result.destroy();
					controller.error(error);
				}
			},
			cancel: () => {
				result.destroy();
			}
		});
		return new Response(stream, responseInit);
	}
	inlineCriticalCss(html) {
		const { criticalCssPlans, nonce } = this.manifest;
		if (!criticalCssPlans?.length) return html;
		try {
			this.inlineCriticalCssProcessor ??= createProcessor([...criticalCssPlans], {
				preload: "media-script",
				nonce,
				preloadFonts: true,
				inlineFonts: true,
				noscriptFallback: true,
				cache: true,
				logger: { warn: console.warn }
			}).process;
			return this.inlineCriticalCssProcessor(html);
		} catch (error) {
			console.error("An error occurred while inlining critical CSS.", error);
			return html;
		}
	}
	buildServerAssetPathFromRequest(request) {
		let { pathname: assetPath } = new URL(request.url);
		try {
			assetPath = decodeURIComponent(assetPath);
		} catch {}
		if (!assetPath.endsWith("/index.html")) assetPath = joinUrlParts(assetPath, "index.html");
		const { baseHref } = this.manifest;
		if (baseHref.length > 1 && assetPath.startsWith(baseHref)) assetPath = assetPath.slice(baseHref.length);
		return stripLeadingSlash(assetPath);
	}
	async runTransformsOnHtml(html, url, preload) {
		if (this.hooks.has("html:transform:pre")) html = await this.hooks.run("html:transform:pre", {
			html,
			url
		});
		if (preload?.length) html = appendPreloadHintsToHtml(html, preload);
		return html;
	}
};
var angularServerApp;
function getOrCreateAngularServerApp(options) {
	return angularServerApp ??= new AngularServerApp(options);
}
function destroyAngularServerApp() {
	if (typeof ngDevMode === "undefined" || ngDevMode) resetCompiledComponents();
	angularServerApp = void 0;
}
function appendPreloadHintsToHtml(html, preload) {
	const bodyCloseIdx = html.lastIndexOf("</body>");
	if (bodyCloseIdx === -1) return html;
	return [
		html.slice(0, bodyCloseIdx),
		...preload.map((val) => `<link rel="modulepreload" href="${val}">`),
		html.slice(bodyCloseIdx)
	].join("\n");
}
function getPotentialLocaleIdFromUrl(url, basePath) {
	const { pathname } = url;
	let start = basePath.length;
	if (pathname[start] === "/") start++;
	let end = pathname.indexOf("/", start);
	if (end === -1) end = pathname.length;
	return pathname.slice(start, end);
}
function parseLanguageHeader(header) {
	if (header === "*") return /* @__PURE__ */ new Map([["*", 1]]);
	const parsedValues = header.split(",").map((item) => {
		const [locale, qualityValue] = item.split(";", 2).map((v) => v.trim());
		let quality = qualityValue?.startsWith("q=") ? parseFloat(qualityValue.slice(2)) : void 0;
		if (typeof quality !== "number" || isNaN(quality) || quality < 0 || quality > 1) quality = 1;
		return [locale, quality];
	}).sort(([_localeA, qualityA], [_localeB, qualityB]) => qualityB - qualityA);
	return new Map(parsedValues);
}
function getPreferredLocale(header, supportedLocales) {
	if (supportedLocales.length < 2) return supportedLocales[0];
	const parsedLocales = parseLanguageHeader(header);
	if (parsedLocales.size === 0 || parsedLocales.size === 1 && parsedLocales.has("*")) return supportedLocales[0];
	const normalizedSupportedLocales = /* @__PURE__ */ new Map();
	for (const locale of supportedLocales) normalizedSupportedLocales.set(normalizeLocale(locale), locale);
	let bestMatch;
	const qualityZeroNormalizedLocales = /* @__PURE__ */ new Set();
	for (const [locale, quality] of parsedLocales) {
		const normalizedLocale = normalizeLocale(locale);
		if (quality === 0) {
			qualityZeroNormalizedLocales.add(normalizedLocale);
			continue;
		}
		if (normalizedSupportedLocales.has(normalizedLocale)) return normalizedSupportedLocales.get(normalizedLocale);
		if (bestMatch !== void 0) continue;
		const [languagePrefix] = normalizedLocale.split("-", 1);
		for (const supportedLocale of normalizedSupportedLocales.keys()) if (supportedLocale.startsWith(languagePrefix)) {
			bestMatch = normalizedSupportedLocales.get(supportedLocale);
			break;
		}
	}
	if (bestMatch !== void 0) return bestMatch;
	for (const [normalizedLocale, locale] of normalizedSupportedLocales) if (!qualityZeroNormalizedLocales.has(normalizedLocale)) return locale;
}
function normalizeLocale(locale) {
	return locale.toLowerCase();
}
var AngularAppEngine = class AngularAppEngine {
	static ɵallowStaticRouteRender = false;
	static ɵdisableAllowedHostsCheck = false;
	static ɵhooks = new Hooks();
	manifest = getAngularAppEngineManifest();
	allowedHosts;
	supportedLocales = Object.keys(this.manifest.supportedLocales);
	trustProxyHeaders;
	entryPointsCache = /* @__PURE__ */ new Map();
	constructor(options) {
		this.allowedHosts = this.getAllowedHosts(options);
		this.trustProxyHeaders = normalizeTrustProxyHeaders(options?.trustProxyHeaders);
	}
	getAllowedHosts(options) {
		const allowedHosts = /* @__PURE__ */ new Set([...options?.allowedHosts ?? [], ...this.manifest.allowedHosts]);
		if (allowedHosts.has("*")) console.warn("Allowing all hosts via \"*\" is a security risk. This configuration should only be used when validation for \"Host\" and \"X-Forwarded-Host\" headers is performed in another layer, such as a load balancer or reverse proxy. For more information see: https://angular.dev/best-practices/security#preventing-server-side-request-forgery-ssrf");
		return allowedHosts;
	}
	async handle(request, requestContext) {
		const allowedHost = this.allowedHosts;
		const securedRequest = sanitizeRequestHeaders(request, this.trustProxyHeaders);
		try {
			validateRequest(securedRequest, allowedHost, AngularAppEngine.ɵdisableAllowedHostsCheck);
		} catch (error) {
			return this.handleValidationError(securedRequest.url, error);
		}
		const serverApp = await this.getAngularServerAppForRequest(securedRequest);
		if (serverApp) return serverApp.handle(securedRequest, requestContext);
		if (this.supportedLocales.length > 1) return this.redirectBasedOnAcceptLanguage(securedRequest);
		return null;
	}
	redirectBasedOnAcceptLanguage(request) {
		const { basePath, supportedLocales } = this.manifest;
		const { pathname } = new URL(request.url);
		if (pathname !== basePath) return null;
		const preferredLocale = getPreferredLocale(request.headers.get("Accept-Language") || "*", this.supportedLocales);
		if (preferredLocale) {
			const subPath = supportedLocales[preferredLocale];
			if (subPath !== void 0) return createRedirectResponse(joinUrlParts(request.headers.get("X-Forwarded-Prefix") ?? "", pathname, subPath), 302, { "Vary": "Accept-Language" });
		}
		return null;
	}
	async getAngularServerAppForRequest(request) {
		const url = new URL(request.url);
		const entryPoint = await this.getEntryPointExportsForUrl(url);
		if (!entryPoint) return null;
		const ɵgetOrCreateAngularServerApp = entryPoint.ɵgetOrCreateAngularServerApp;
		return ɵgetOrCreateAngularServerApp({
			allowStaticRouteRender: AngularAppEngine.ɵallowStaticRouteRender,
			hooks: AngularAppEngine.ɵhooks
		});
	}
	getEntryPointExports(potentialLocale) {
		const cachedEntryPoint = this.entryPointsCache.get(potentialLocale);
		if (cachedEntryPoint) return cachedEntryPoint;
		const { entryPoints } = this.manifest;
		const entryPoint = entryPoints[potentialLocale];
		if (!entryPoint) return;
		const entryPointExports = entryPoint();
		this.entryPointsCache.set(potentialLocale, entryPointExports);
		return entryPointExports;
	}
	getEntryPointExportsForUrl(url) {
		const { basePath, supportedLocales } = this.manifest;
		if (this.supportedLocales.length === 1) return this.getEntryPointExports(supportedLocales[this.supportedLocales[0]]);
		const potentialLocale = getPotentialLocaleIdFromUrl(url, basePath);
		return this.getEntryPointExports(potentialLocale) ?? this.getEntryPointExports("");
	}
	handleValidationError(url, error) {
		const errorMessage = error.message;
		console.error(`ERROR: Bad Request ("${url}").\n` + errorMessage + "\n\nFor more information, see https://angular.dev/best-practices/security#preventing-server-side-request-forgery-ssrf");
		return new Response(errorMessage, {
			status: 400,
			statusText: "Bad Request",
			headers: { "Content-Type": "text/plain" }
		});
	}
};
function createRequestHandler(handler) {
	handler["__ng_request_handler__"] = true;
	return handler;
}
//#endregion
export { validateUrl as S, renderModule as _, createRequestHandler as a, normalizeTrustProxyHeaders as b, getOrCreateAngularServerApp as c, setAngularAppEngineManifest as d, setAngularAppManifest as f, renderApplication as g, SERVER_CONTEXT as h, RenderMode as i, getRoutesFromAngularRouterConfig as l, withRoutes as m, IS_DISCOVERING_ROUTES as n, destroyAngularServerApp as o, withAppShell as p, PrerenderFallback as r, extractRoutesAndCreateRouteTree as s, AngularAppEngine as t, provideServerRendering as u, getFirstHeaderValue as v, parseForwardedHeader as x, isProxyHeaderAllowed as y };
