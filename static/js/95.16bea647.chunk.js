/*! For license information please see 95.16bea647.chunk.js.LICENSE.txt */
(self.webpackChunkbank_launchpad = self.webpackChunkbank_launchpad || []).push([
    [95], {
        9122: (t, e, n) => {
            "use strict";

            function r() {
                return (null === n.g || void 0 === n.g ? void 0 : n.g.crypto) || (null === n.g || void 0 === n.g ? void 0 : n.g.msCrypto) || {}
            }

            function o() {
                const t = r();
                return t.subtle || t.webkitSubtle
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.isBrowserCryptoAvailable = e.getSubtleCrypto = e.getBrowerCrypto = void 0, e.getBrowerCrypto = r, e.getSubtleCrypto = o, e.isBrowserCryptoAvailable = function() {
                return !!r() && !!o()
            }
        },
        54683: (t, e) => {
            "use strict";

            function n() {
                return "undefined" === typeof document && "undefined" !== typeof navigator && "ReactNative" === navigator.product
            }

            function r() {
                return "undefined" !== typeof process && "undefined" !== typeof process.versions && "undefined" !== typeof process.versions.node
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.isBrowser = e.isNode = e.isReactNative = void 0, e.isReactNative = n, e.isNode = r, e.isBrowser = function() {
                return !n() && !r()
            }
        },
        67323: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            const r = n(37856);
            r.__exportStar(n(9122), e), r.__exportStar(n(54683), e)
        },
        37856: (t, e, n) => {
            "use strict";
            n.r(e), n.d(e, {
                __assign: () => i,
                __asyncDelegator: () => w,
                __asyncGenerator: () => g,
                __asyncValues: () => R,
                __await: () => b,
                __awaiter: () => f,
                __classPrivateFieldGet: () => x,
                __classPrivateFieldSet: () => P,
                __createBinding: () => p,
                __decorate: () => a,
                __exportStar: () => h,
                __extends: () => o,
                __generator: () => l,
                __importDefault: () => O,
                __importStar: () => E,
                __makeTemplateObject: () => _,
                __metadata: () => u,
                __param: () => c,
                __read: () => y,
                __rest: () => s,
                __spread: () => v,
                __spreadArrays: () => m,
                __values: () => d
            });
            var r = function(t, e) {
                return r = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(t, e) {
                    t.__proto__ = e
                } || function(t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                }, r(t, e)
            };

            function o(t, e) {
                function n() {
                    this.constructor = t
                }
                r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
            }
            var i = function() {
                return i = Object.assign || function(t) {
                    for (var e, n = 1, r = arguments.length; n < r; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }, i.apply(this, arguments)
            };

            function s(t, e) {
                var n = {};
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
                if (null != t && "function" === typeof Object.getOwnPropertySymbols) {
                    var o = 0;
                    for (r = Object.getOwnPropertySymbols(t); o < r.length; o++) e.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[o]) && (n[r[o]] = t[r[o]])
                }
                return n
            }

            function a(t, e, n, r) {
                var o, i = arguments.length,
                    s = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
                if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r);
                else
                    for (var a = t.length - 1; a >= 0; a--)(o = t[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
                return i > 3 && s && Object.defineProperty(e, n, s), s
            }

            function c(t, e) {
                return function(n, r) {
                    e(n, r, t)
                }
            }

            function u(t, e) {
                if ("object" === typeof Reflect && "function" === typeof Reflect.metadata) return Reflect.metadata(t, e)
            }

            function f(t, e, n, r) {
                return new(n || (n = Promise))((function(o, i) {
                    function s(t) {
                        try {
                            c(r.next(t))
                        } catch (e) {
                            i(e)
                        }
                    }

                    function a(t) {
                        try {
                            c(r.throw(t))
                        } catch (e) {
                            i(e)
                        }
                    }

                    function c(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value, e instanceof n ? e : new n((function(t) {
                            t(e)
                        }))).then(s, a)
                    }
                    c((r = r.apply(t, e || [])).next())
                }))
            }

            function l(t, e) {
                var n, r, o, i, s = {
                    label: 0,
                    sent: function() {
                        if (1 & o[0]) throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return i = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                }, "function" === typeof Symbol && (i[Symbol.iterator] = function() {
                    return this
                }), i;

                function a(i) {
                    return function(a) {
                        return function(i) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; s;) try {
                                if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                                switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                    case 0:
                                    case 1:
                                        o = i;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: i[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++, r = i[1], i = [0];
                                        continue;
                                    case 7:
                                        i = s.ops.pop(), s.trys.pop();
                                        continue;
                                    default:
                                        if (!(o = (o = s.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                            s.label = i[1];
                                            break
                                        }
                                        if (6 === i[0] && s.label < o[1]) {
                                            s.label = o[1], o = i;
                                            break
                                        }
                                        if (o && s.label < o[2]) {
                                            s.label = o[2], s.ops.push(i);
                                            break
                                        }
                                        o[2] && s.ops.pop(), s.trys.pop();
                                        continue
                                }
                                i = e.call(t, s)
                            } catch (a) {
                                i = [6, a], r = 0
                            } finally {
                                n = o = 0
                            }
                            if (5 & i[0]) throw i[1];
                            return {
                                value: i[0] ? i[1] : void 0,
                                done: !0
                            }
                        }([i, a])
                    }
                }
            }

            function p(t, e, n, r) {
                void 0 === r && (r = n), t[r] = e[n]
            }

            function h(t, e) {
                for (var n in t) "default" === n || e.hasOwnProperty(n) || (e[n] = t[n])
            }

            function d(t) {
                var e = "function" === typeof Symbol && Symbol.iterator,
                    n = e && t[e],
                    r = 0;
                if (n) return n.call(t);
                if (t && "number" === typeof t.length) return {
                    next: function() {
                        return t && r >= t.length && (t = void 0), {
                            value: t && t[r++],
                            done: !t
                        }
                    }
                };
                throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }

            function y(t, e) {
                var n = "function" === typeof Symbol && t[Symbol.iterator];
                if (!n) return t;
                var r, o, i = n.call(t),
                    s = [];
                try {
                    for (;
                        (void 0 === e || e-- > 0) && !(r = i.next()).done;) s.push(r.value)
                } catch (a) {
                    o = {
                        error: a
                    }
                } finally {
                    try {
                        r && !r.done && (n = i.return) && n.call(i)
                    } finally {
                        if (o) throw o.error
                    }
                }
                return s
            }

            function v() {
                for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(y(arguments[e]));
                return t
            }

            function m() {
                for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
                var r = Array(t),
                    o = 0;
                for (e = 0; e < n; e++)
                    for (var i = arguments[e], s = 0, a = i.length; s < a; s++, o++) r[o] = i[s];
                return r
            }

            function b(t) {
                return this instanceof b ? (this.v = t, this) : new b(t)
            }

            function g(t, e, n) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var r, o = n.apply(t, e || []),
                    i = [];
                return r = {}, s("next"), s("throw"), s("return"), r[Symbol.asyncIterator] = function() {
                    return this
                }, r;

                function s(t) {
                    o[t] && (r[t] = function(e) {
                        return new Promise((function(n, r) {
                            i.push([t, e, n, r]) > 1 || a(t, e)
                        }))
                    })
                }

                function a(t, e) {
                    try {
                        (n = o[t](e)).value instanceof b ? Promise.resolve(n.value.v).then(c, u) : f(i[0][2], n)
                    } catch (r) {
                        f(i[0][3], r)
                    }
                    var n
                }

                function c(t) {
                    a("next", t)
                }

                function u(t) {
                    a("throw", t)
                }

                function f(t, e) {
                    t(e), i.shift(), i.length && a(i[0][0], i[0][1])
                }
            }

            function w(t) {
                var e, n;
                return e = {}, r("next"), r("throw", (function(t) {
                    throw t
                })), r("return"), e[Symbol.iterator] = function() {
                    return this
                }, e;

                function r(r, o) {
                    e[r] = t[r] ? function(e) {
                        return (n = !n) ? {
                            value: b(t[r](e)),
                            done: "return" === r
                        } : o ? o(e) : e
                    } : o
                }
            }

            function R(t) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var e, n = t[Symbol.asyncIterator];
                return n ? n.call(t) : (t = d(t), e = {}, r("next"), r("throw"), r("return"), e[Symbol.asyncIterator] = function() {
                    return this
                }, e);

                function r(n) {
                    e[n] = t[n] && function(e) {
                        return new Promise((function(r, o) {
                            (function(t, e, n, r) {
                                Promise.resolve(r).then((function(e) {
                                    t({
                                        value: e,
                                        done: n
                                    })
                                }), e)
                            })(r, o, (e = t[n](e)).done, e.value)
                        }))
                    }
                }
            }

            function _(t, e) {
                return Object.defineProperty ? Object.defineProperty(t, "raw", {
                    value: e
                }) : t.raw = e, t
            }

            function E(t) {
                if (t && t.__esModule) return t;
                var e = {};
                if (null != t)
                    for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                return e.default = t, e
            }

            function O(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }

            function x(t, e) {
                if (!e.has(t)) throw new TypeError("attempted to get private field on non-instance");
                return e.get(t)
            }

            function P(t, e, n) {
                if (!e.has(t)) throw new TypeError("attempted to set private field on non-instance");
                return e.set(t, n), n
            }
        },
        10159: (t, e, n) => {
            "use strict";
            n.d(e, {
                k: () => u,
                Z: () => f
            });
            var r = n(47465),
                o = n(84255),
                i = n.n(o),
                s = n(75457),
                a = n(28477);
            const c = {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST"
            };
            class u {
                constructor(t) {
                    let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (this.url = t, this.disableProviderPing = e, this.events = new r.EventEmitter, this.isAvailable = !1, this.registering = !1, !(0, a.isHttpUrl)(t)) throw new Error("Provided URL is not compatible with HTTP connection: ".concat(t));
                    this.url = t, this.disableProviderPing = e
                }
                get connected() {
                    return this.isAvailable
                }
                get connecting() {
                    return this.registering
                }
                on(t, e) {
                    this.events.on(t, e)
                }
                once(t, e) {
                    this.events.once(t, e)
                }
                off(t, e) {
                    this.events.off(t, e)
                }
                removeListener(t, e) {
                    this.events.removeListener(t, e)
                }
                async open() {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.url;
                    await this.register(t)
                }
                async close() {
                    if (!this.isAvailable) throw new Error("Connection already closed");
                    this.onClose()
                }
                async send(t, e) {
                    this.isAvailable || await this.register();
                    try {
                        const e = (0, s.u)(t),
                            n = await i()(this.url, Object.assign(Object.assign({}, c), {
                                body: e
                            })),
                            r = await n.json();
                        this.onPayload({
                            data: r
                        })
                    } catch (n) {
                        this.onError(t.id, n)
                    }
                }
                async register() {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.url;
                    if (!(0, a.isHttpUrl)(t)) throw new Error("Provided URL is not compatible with HTTP connection: ".concat(t));
                    if (this.registering) {
                        const t = this.events.getMaxListeners();
                        return (this.events.listenerCount("register_error") >= t || this.events.listenerCount("open") >= t) && this.events.setMaxListeners(t + 1), new Promise(((t, e) => {
                            this.events.once("register_error", (t => {
                                this.resetMaxListeners(), e(t)
                            })), this.events.once("open", (() => {
                                if (this.resetMaxListeners(), "undefined" === typeof this.isAvailable) return e(new Error("HTTP connection is missing or invalid"));
                                t()
                            }))
                        }))
                    }
                    this.url = t, this.registering = !0;
                    try {
                        if (!this.disableProviderPing) {
                            const e = (0, s.u)({
                                id: 1,
                                jsonrpc: "2.0",
                                method: "test",
                                params: []
                            });
                            await i()(t, Object.assign(Object.assign({}, c), {
                                body: e
                            }))
                        }
                        this.onOpen()
                    } catch (e) {
                        const t = this.parseError(e);
                        throw this.events.emit("register_error", t), this.onClose(), t
                    }
                }
                onOpen() {
                    this.isAvailable = !0, this.registering = !1, this.events.emit("open")
                }
                onClose() {
                    this.isAvailable = !1, this.registering = !1, this.events.emit("close")
                }
                onPayload(t) {
                    if ("undefined" === typeof t.data) return;
                    const e = "string" === typeof t.data ? (0, s.D)(t.data) : t.data;
                    this.events.emit("payload", e)
                }
                onError(t, e) {
                    const n = this.parseError(e),
                        r = n.message || n.toString(),
                        o = (0, a.formatJsonRpcError)(t, r);
                    this.events.emit("payload", o)
                }
                parseError(t) {
                    let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.url;
                    return (0, a.parseConnectionError)(t, e, "HTTP")
                }
                resetMaxListeners() {
                    this.events.getMaxListeners() > 10 && this.events.setMaxListeners(10)
                }
            }
            const f = u
        },
        42829: (t, e, n) => {
            "use strict";
            n.d(e, {
                r: () => i
            });
            var r = n(47465),
                o = n(28477);
            class i extends o.IJsonRpcProvider {
                constructor(t) {
                    super(t), this.events = new r.EventEmitter, this.hasRegisteredEventListeners = !1, this.connection = this.setConnection(t), this.connection.connected && this.registerEventListeners()
                }
                async connect() {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.connection;
                    await this.open(t)
                }
                async disconnect() {
                    await this.close()
                }
                on(t, e) {
                    this.events.on(t, e)
                }
                once(t, e) {
                    this.events.once(t, e)
                }
                off(t, e) {
                    this.events.off(t, e)
                }
                removeListener(t, e) {
                    this.events.removeListener(t, e)
                }
                async request(t, e) {
                    return this.requestStrict((0, o.formatJsonRpcRequest)(t.method, t.params || [], t.id || (0, o.getBigIntRpcId)().toString()), e)
                }
                async requestStrict(t, e) {
                    return new Promise((async (n, r) => {
                        if (!this.connection.connected) try {
                            await this.open()
                        } catch (i) {
                            r(i)
                        }
                        this.events.on("".concat(t.id), (t => {
                            (0, o.isJsonRpcError)(t) ? r(t.error): n(t.result)
                        }));
                        try {
                            await this.connection.send(t, e)
                        } catch (i) {
                            r(i)
                        }
                    }))
                }
                setConnection() {
                    return arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.connection
                }
                onPayload(t) {
                    this.events.emit("payload", t), (0, o.isJsonRpcResponse)(t) ? this.events.emit("".concat(t.id), t) : this.events.emit("message", {
                        type: t.method,
                        data: t.params
                    })
                }
                onClose(t) {
                    t && 3e3 === t.code && this.events.emit("error", new Error("WebSocket connection closed abnormally with code: ".concat(t.code, " ").concat(t.reason ? "(".concat(t.reason, ")") : ""))), this.events.emit("disconnect")
                }
                async open() {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.connection;
                    this.connection === t && this.connection.connected || (this.connection.connected && this.close(), "string" === typeof t && (await this.connection.open(t), t = this.connection), this.connection = this.setConnection(t), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"))
                }
                async close() {
                    await this.connection.close()
                }
                registerEventListeners() {
                    this.hasRegisteredEventListeners || (this.connection.on("payload", (t => this.onPayload(t))), this.connection.on("close", (t => this.onClose(t))), this.connection.on("error", (t => this.events.emit("error", t))), this.connection.on("register_error", (t => this.onClose())), this.hasRegisteredEventListeners = !0)
                }
            }
        },
        38040: (t, e, n) => {
            "use strict";
            n.d(e, {
                XR: () => o,
                x0: () => s
            });
            class r {}
            class o extends r {
                constructor(t) {
                    super()
                }
            }
            class i extends r {
                constructor() {
                    super()
                }
            }
            class s extends i {
                constructor(t) {
                    super()
                }
            }
        },
        60476: (t, e, n) => {
            "use strict";
            n.d(e, {
                CA: () => o,
                JV: () => a,
                O4: () => r,
                dQ: () => i,
                xK: () => s
            });
            const r = "INTERNAL_ERROR",
                o = "SERVER_ERROR",
                i = [-32700, -32600, -32601, -32602, -32603],
                s = {
                    PARSE_ERROR: {
                        code: -32700,
                        message: "Parse error"
                    },
                    INVALID_REQUEST: {
                        code: -32600,
                        message: "Invalid Request"
                    },
                    METHOD_NOT_FOUND: {
                        code: -32601,
                        message: "Method not found"
                    },
                    INVALID_PARAMS: {
                        code: -32602,
                        message: "Invalid params"
                    },
                    [r]: {
                        code: -32603,
                        message: "Internal error"
                    },
                    [o]: {
                        code: -32e3,
                        message: "Server error"
                    }
                },
                a = o
        },
        15812: (t, e, n) => {
            "use strict";
            var r = n(67323);
            n.o(r, "IJsonRpcProvider") && n.d(e, {
                IJsonRpcProvider: function() {
                    return r.IJsonRpcProvider
                }
            }), n.o(r, "formatJsonRpcError") && n.d(e, {
                formatJsonRpcError: function() {
                    return r.formatJsonRpcError
                }
            }), n.o(r, "formatJsonRpcRequest") && n.d(e, {
                formatJsonRpcRequest: function() {
                    return r.formatJsonRpcRequest
                }
            }), n.o(r, "formatJsonRpcResult") && n.d(e, {
                formatJsonRpcResult: function() {
                    return r.formatJsonRpcResult
                }
            }), n.o(r, "getBigIntRpcId") && n.d(e, {
                getBigIntRpcId: function() {
                    return r.getBigIntRpcId
                }
            }), n.o(r, "isHttpUrl") && n.d(e, {
                isHttpUrl: function() {
                    return r.isHttpUrl
                }
            }), n.o(r, "isJsonRpcError") && n.d(e, {
                isJsonRpcError: function() {
                    return r.isJsonRpcError
                }
            }), n.o(r, "isJsonRpcRequest") && n.d(e, {
                isJsonRpcRequest: function() {
                    return r.isJsonRpcRequest
                }
            }), n.o(r, "isJsonRpcResponse") && n.d(e, {
                isJsonRpcResponse: function() {
                    return r.isJsonRpcResponse
                }
            }), n.o(r, "isJsonRpcResult") && n.d(e, {
                isJsonRpcResult: function() {
                    return r.isJsonRpcResult
                }
            }), n.o(r, "isLocalhostUrl") && n.d(e, {
                isLocalhostUrl: function() {
                    return r.isLocalhostUrl
                }
            }), n.o(r, "isReactNative") && n.d(e, {
                isReactNative: function() {
                    return r.isReactNative
                }
            }), n.o(r, "isWsUrl") && n.d(e, {
                isWsUrl: function() {
                    return r.isWsUrl
                }
            }), n.o(r, "payloadId") && n.d(e, {
                payloadId: function() {
                    return r.payloadId
                }
            })
        },
        41154: (t, e, n) => {
            "use strict";
            n.d(e, {
                CX: () => a,
                L2: () => s,
                by: () => i,
                i5: () => o
            });
            var r = n(60476);

            function o(t) {
                return r.dQ.includes(t)
            }

            function i(t) {
                return Object.keys(r.xK).includes(t) ? r.xK[t] : r.xK[r.JV]
            }

            function s(t) {
                const e = Object.values(r.xK).find((e => e.code === t));
                return e || r.xK[r.JV]
            }

            function a(t, e, n) {
                return t.message.includes("getaddrinfo ENOTFOUND") || t.message.includes("connect ECONNREFUSED") ? new Error("Unavailable ".concat(n, " RPC url at ").concat(e)) : t
            }
        },
        810: (t, e, n) => {
            "use strict";
            n.d(e, {
                CS: () => s,
                RI: () => u,
                o0: () => i,
                sT: () => a,
                tm: () => c
            });
            var r = n(41154),
                o = n(60476);

            function i() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3;
                return Date.now() * Math.pow(10, t) + Math.floor(Math.random() * Math.pow(10, t))
            }

            function s() {
                return BigInt(i(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 6))
            }

            function a(t, e, n) {
                return {
                    id: n || i(),
                    jsonrpc: "2.0",
                    method: t,
                    params: e
                }
            }

            function c(t, e) {
                return {
                    id: t,
                    jsonrpc: "2.0",
                    result: e
                }
            }

            function u(t, e, n) {
                return {
                    id: t,
                    jsonrpc: "2.0",
                    error: f(e, n)
                }
            }

            function f(t, e) {
                return "undefined" === typeof t ? (0, r.by)(o.O4) : ("string" === typeof t && (t = Object.assign(Object.assign({}, (0, r.by)(o.CA)), {
                    message: t
                })), "undefined" !== typeof e && (t.data = e), (0, r.i5)(t.code) && (t = (0, r.L2)(t.code)), t)
            }
        },
        28477: (t, e, n) => {
            "use strict";
            n.d(e, {
                IJsonRpcProvider: () => s.x0,
                formatJsonRpcError: () => i.RI,
                formatJsonRpcRequest: () => i.sT,
                formatJsonRpcResult: () => i.tm,
                getBigIntRpcId: () => i.CS,
                isHttpUrl: () => a.jK,
                isJsonRpcError: () => c.jg,
                isJsonRpcRequest: () => c.DW,
                isJsonRpcResponse: () => c.u,
                isJsonRpcResult: () => c.k4,
                isLocalhostUrl: () => a.JF,
                isWsUrl: () => a.UZ,
                parseConnectionError: () => r.CX,
                payloadId: () => i.o0
            });
            n(60476);
            var r = n(41154),
                o = n(15812);
            n.o(o, "IJsonRpcProvider") && n.d(e, {
                IJsonRpcProvider: function() {
                    return o.IJsonRpcProvider
                }
            }), n.o(o, "formatJsonRpcError") && n.d(e, {
                formatJsonRpcError: function() {
                    return o.formatJsonRpcError
                }
            }), n.o(o, "formatJsonRpcRequest") && n.d(e, {
                formatJsonRpcRequest: function() {
                    return o.formatJsonRpcRequest
                }
            }), n.o(o, "formatJsonRpcResult") && n.d(e, {
                formatJsonRpcResult: function() {
                    return o.formatJsonRpcResult
                }
            }), n.o(o, "getBigIntRpcId") && n.d(e, {
                getBigIntRpcId: function() {
                    return o.getBigIntRpcId
                }
            }), n.o(o, "isHttpUrl") && n.d(e, {
                isHttpUrl: function() {
                    return o.isHttpUrl
                }
            }), n.o(o, "isJsonRpcError") && n.d(e, {
                isJsonRpcError: function() {
                    return o.isJsonRpcError
                }
            }), n.o(o, "isJsonRpcRequest") && n.d(e, {
                isJsonRpcRequest: function() {
                    return o.isJsonRpcRequest
                }
            }), n.o(o, "isJsonRpcResponse") && n.d(e, {
                isJsonRpcResponse: function() {
                    return o.isJsonRpcResponse
                }
            }), n.o(o, "isJsonRpcResult") && n.d(e, {
                isJsonRpcResult: function() {
                    return o.isJsonRpcResult
                }
            }), n.o(o, "isLocalhostUrl") && n.d(e, {
                isLocalhostUrl: function() {
                    return o.isLocalhostUrl
                }
            }), n.o(o, "isReactNative") && n.d(e, {
                isReactNative: function() {
                    return o.isReactNative
                }
            }), n.o(o, "isWsUrl") && n.d(e, {
                isWsUrl: function() {
                    return o.isWsUrl
                }
            }), n.o(o, "payloadId") && n.d(e, {
                payloadId: function() {
                    return o.payloadId
                }
            });
            var i = n(810),
                s = n(75602),
                a = n(79493),
                c = n(806)
        },
        75602: (t, e, n) => {
            "use strict";
            n.d(e, {
                x0: () => r.x0
            });
            var r = n(38040)
        },
        79493: (t, e, n) => {
            "use strict";
            n.d(e, {
                JF: () => c,
                UZ: () => a,
                jK: () => s
            });
            const r = "^https?:",
                o = "^wss?:";

            function i(t, e) {
                const n = function(t) {
                    const e = t.match(new RegExp(/^\w+:/, "gi"));
                    if (e && e.length) return e[0]
                }(t);
                return "undefined" !== typeof n && new RegExp(e).test(n)
            }

            function s(t) {
                return i(t, r)
            }

            function a(t) {
                return i(t, o)
            }

            function c(t) {
                return new RegExp("wss?://localhost(:d{2,5})?").test(t)
            }
        },
        806: (t, e, n) => {
            "use strict";

            function r(t) {
                return "object" === typeof t && "id" in t && "jsonrpc" in t && "2.0" === t.jsonrpc
            }

            function o(t) {
                return r(t) && "method" in t
            }

            function i(t) {
                return r(t) && (s(t) || a(t))
            }

            function s(t) {
                return "result" in t
            }

            function a(t) {
                return "error" in t
            }
            n.d(e, {
                DW: () => o,
                jg: () => a,
                k4: () => s,
                u: () => i
            })
        },
        75457: (t, e, n) => {
            "use strict";
            n.d(e, {
                D: () => i,
                u: () => s
            });
            const r = t => JSON.stringify(t, ((t, e) => "bigint" === typeof e ? e.toString() + "n" : e)),
                o = t => {
                    const e = t.replace(/([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g, '$1"$2n"$3');
                    return JSON.parse(e, ((t, e) => "string" === typeof e && e.match(/^\d+n$/) ? BigInt(e.substring(0, e.length - 1)) : e))
                };

            function i(t) {
                if ("string" !== typeof t) throw new Error("Cannot safe json parse value of type ".concat(typeof t));
                try {
                    return o(t)
                } catch (e) {
                    return t
                }
            }

            function s(t) {
                return "string" === typeof t ? t : r(t) || ""
            }
        },
        84255: function(t, e) {
            var n = "undefined" !== typeof self ? self : this,
                r = function() {
                    function t() {
                        this.fetch = !1, this.DOMException = n.DOMException
                    }
                    return t.prototype = n, new t
                }();
            ! function(t) {
                ! function(e) {
                    var n = "URLSearchParams" in t,
                        r = "Symbol" in t && "iterator" in Symbol,
                        o = "FileReader" in t && "Blob" in t && function() {
                            try {
                                return new Blob, !0
                            } catch (t) {
                                return !1
                            }
                        }(),
                        i = "FormData" in t,
                        s = "ArrayBuffer" in t;
                    if (s) var a = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                        c = ArrayBuffer.isView || function(t) {
                            return t && a.indexOf(Object.prototype.toString.call(t)) > -1
                        };

                    function u(t) {
                        if ("string" !== typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
                        return t.toLowerCase()
                    }

                    function f(t) {
                        return "string" !== typeof t && (t = String(t)), t
                    }

                    function l(t) {
                        var e = {
                            next: function() {
                                var e = t.shift();
                                return {
                                    done: void 0 === e,
                                    value: e
                                }
                            }
                        };
                        return r && (e[Symbol.iterator] = function() {
                            return e
                        }), e
                    }

                    function p(t) {
                        this.map = {}, t instanceof p ? t.forEach((function(t, e) {
                            this.append(e, t)
                        }), this) : Array.isArray(t) ? t.forEach((function(t) {
                            this.append(t[0], t[1])
                        }), this) : t && Object.getOwnPropertyNames(t).forEach((function(e) {
                            this.append(e, t[e])
                        }), this)
                    }

                    function h(t) {
                        if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
                        t.bodyUsed = !0
                    }

                    function d(t) {
                        return new Promise((function(e, n) {
                            t.onload = function() {
                                e(t.result)
                            }, t.onerror = function() {
                                n(t.error)
                            }
                        }))
                    }

                    function y(t) {
                        var e = new FileReader,
                            n = d(e);
                        return e.readAsArrayBuffer(t), n
                    }

                    function v(t) {
                        if (t.slice) return t.slice(0);
                        var e = new Uint8Array(t.byteLength);
                        return e.set(new Uint8Array(t)), e.buffer
                    }

                    function m() {
                        return this.bodyUsed = !1, this._initBody = function(t) {
                            var e;
                            this._bodyInit = t, t ? "string" === typeof t ? this._bodyText = t : o && Blob.prototype.isPrototypeOf(t) ? this._bodyBlob = t : i && FormData.prototype.isPrototypeOf(t) ? this._bodyFormData = t : n && URLSearchParams.prototype.isPrototypeOf(t) ? this._bodyText = t.toString() : s && o && ((e = t) && DataView.prototype.isPrototypeOf(e)) ? (this._bodyArrayBuffer = v(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : s && (ArrayBuffer.prototype.isPrototypeOf(t) || c(t)) ? this._bodyArrayBuffer = v(t) : this._bodyText = t = Object.prototype.toString.call(t) : this._bodyText = "", this.headers.get("content-type") || ("string" === typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : n && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
                        }, o && (this.blob = function() {
                            var t = h(this);
                            if (t) return t;
                            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                            if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                            if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                            return Promise.resolve(new Blob([this._bodyText]))
                        }, this.arrayBuffer = function() {
                            return this._bodyArrayBuffer ? h(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(y)
                        }), this.text = function() {
                            var t = h(this);
                            if (t) return t;
                            if (this._bodyBlob) return function(t) {
                                var e = new FileReader,
                                    n = d(e);
                                return e.readAsText(t), n
                            }(this._bodyBlob);
                            if (this._bodyArrayBuffer) return Promise.resolve(function(t) {
                                for (var e = new Uint8Array(t), n = new Array(e.length), r = 0; r < e.length; r++) n[r] = String.fromCharCode(e[r]);
                                return n.join("")
                            }(this._bodyArrayBuffer));
                            if (this._bodyFormData) throw new Error("could not read FormData body as text");
                            return Promise.resolve(this._bodyText)
                        }, i && (this.formData = function() {
                            return this.text().then(w)
                        }), this.json = function() {
                            return this.text().then(JSON.parse)
                        }, this
                    }
                    p.prototype.append = function(t, e) {
                        t = u(t), e = f(e);
                        var n = this.map[t];
                        this.map[t] = n ? n + ", " + e : e
                    }, p.prototype.delete = function(t) {
                        delete this.map[u(t)]
                    }, p.prototype.get = function(t) {
                        return t = u(t), this.has(t) ? this.map[t] : null
                    }, p.prototype.has = function(t) {
                        return this.map.hasOwnProperty(u(t))
                    }, p.prototype.set = function(t, e) {
                        this.map[u(t)] = f(e)
                    }, p.prototype.forEach = function(t, e) {
                        for (var n in this.map) this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this)
                    }, p.prototype.keys = function() {
                        var t = [];
                        return this.forEach((function(e, n) {
                            t.push(n)
                        })), l(t)
                    }, p.prototype.values = function() {
                        var t = [];
                        return this.forEach((function(e) {
                            t.push(e)
                        })), l(t)
                    }, p.prototype.entries = function() {
                        var t = [];
                        return this.forEach((function(e, n) {
                            t.push([n, e])
                        })), l(t)
                    }, r && (p.prototype[Symbol.iterator] = p.prototype.entries);
                    var b = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

                    function g(t, e) {
                        var n = (e = e || {}).body;
                        if (t instanceof g) {
                            if (t.bodyUsed) throw new TypeError("Already read");
                            this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new p(t.headers)), this.method = t.method, this.mode = t.mode, this.signal = t.signal, n || null == t._bodyInit || (n = t._bodyInit, t.bodyUsed = !0)
                        } else this.url = String(t);
                        if (this.credentials = e.credentials || this.credentials || "same-origin", !e.headers && this.headers || (this.headers = new p(e.headers)), this.method = function(t) {
                                var e = t.toUpperCase();
                                return b.indexOf(e) > -1 ? e : t
                            }(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.signal = e.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
                        this._initBody(n)
                    }

                    function w(t) {
                        var e = new FormData;
                        return t.trim().split("&").forEach((function(t) {
                            if (t) {
                                var n = t.split("="),
                                    r = n.shift().replace(/\+/g, " "),
                                    o = n.join("=").replace(/\+/g, " ");
                                e.append(decodeURIComponent(r), decodeURIComponent(o))
                            }
                        })), e
                    }

                    function R(t) {
                        var e = new p;
                        return t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach((function(t) {
                            var n = t.split(":"),
                                r = n.shift().trim();
                            if (r) {
                                var o = n.join(":").trim();
                                e.append(r, o)
                            }
                        })), e
                    }

                    function _(t, e) {
                        e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new p(e.headers), this.url = e.url || "", this._initBody(t)
                    }
                    g.prototype.clone = function() {
                        return new g(this, {
                            body: this._bodyInit
                        })
                    }, m.call(g.prototype), m.call(_.prototype), _.prototype.clone = function() {
                        return new _(this._bodyInit, {
                            status: this.status,
                            statusText: this.statusText,
                            headers: new p(this.headers),
                            url: this.url
                        })
                    }, _.error = function() {
                        var t = new _(null, {
                            status: 0,
                            statusText: ""
                        });
                        return t.type = "error", t
                    };
                    var E = [301, 302, 303, 307, 308];
                    _.redirect = function(t, e) {
                        if (-1 === E.indexOf(e)) throw new RangeError("Invalid status code");
                        return new _(null, {
                            status: e,
                            headers: {
                                location: t
                            }
                        })
                    }, e.DOMException = t.DOMException;
                    try {
                        new e.DOMException
                    } catch (x) {
                        e.DOMException = function(t, e) {
                            this.message = t, this.name = e;
                            var n = Error(t);
                            this.stack = n.stack
                        }, e.DOMException.prototype = Object.create(Error.prototype), e.DOMException.prototype.constructor = e.DOMException
                    }

                    function O(t, n) {
                        return new Promise((function(r, i) {
                            var s = new g(t, n);
                            if (s.signal && s.signal.aborted) return i(new e.DOMException("Aborted", "AbortError"));
                            var a = new XMLHttpRequest;

                            function c() {
                                a.abort()
                            }
                            a.onload = function() {
                                var t = {
                                    status: a.status,
                                    statusText: a.statusText,
                                    headers: R(a.getAllResponseHeaders() || "")
                                };
                                t.url = "responseURL" in a ? a.responseURL : t.headers.get("X-Request-URL");
                                var e = "response" in a ? a.response : a.responseText;
                                r(new _(e, t))
                            }, a.onerror = function() {
                                i(new TypeError("Network request failed"))
                            }, a.ontimeout = function() {
                                i(new TypeError("Network request failed"))
                            }, a.onabort = function() {
                                i(new e.DOMException("Aborted", "AbortError"))
                            }, a.open(s.method, s.url, !0), "include" === s.credentials ? a.withCredentials = !0 : "omit" === s.credentials && (a.withCredentials = !1), "responseType" in a && o && (a.responseType = "blob"), s.headers.forEach((function(t, e) {
                                a.setRequestHeader(e, t)
                            })), s.signal && (s.signal.addEventListener("abort", c), a.onreadystatechange = function() {
                                4 === a.readyState && s.signal.removeEventListener("abort", c)
                            }), a.send("undefined" === typeof s._bodyInit ? null : s._bodyInit)
                        }))
                    }
                    O.polyfill = !0, t.fetch || (t.fetch = O, t.Headers = p, t.Request = g, t.Response = _), e.Headers = p, e.Request = g, e.Response = _, e.fetch = O, Object.defineProperty(e, "__esModule", {
                        value: !0
                    })
                }({})
            }(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
            var o = r;
            (e = o.fetch).default = o.fetch, e.fetch = o.fetch, e.Headers = o.Headers, e.Request = o.Request, e.Response = o.Response, t.exports = e
        },
        47465: t => {
            "use strict";
            var e, n = "object" === typeof Reflect ? Reflect : null,
                r = n && "function" === typeof n.apply ? n.apply : function(t, e, n) {
                    return Function.prototype.apply.call(t, e, n)
                };
            e = n && "function" === typeof n.ownKeys ? n.ownKeys : Object.getOwnPropertySymbols ? function(t) {
                return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
            } : function(t) {
                return Object.getOwnPropertyNames(t)
            };
            var o = Number.isNaN || function(t) {
                return t !== t
            };

            function i() {
                i.init.call(this)
            }
            t.exports = i, t.exports.once = function(t, e) {
                return new Promise((function(n, r) {
                    function o(n) {
                        t.removeListener(e, i), r(n)
                    }

                    function i() {
                        "function" === typeof t.removeListener && t.removeListener("error", o), n([].slice.call(arguments))
                    }
                    y(t, e, i, {
                        once: !0
                    }), "error" !== e && function(t, e, n) {
                        "function" === typeof t.on && y(t, "error", e, n)
                    }(t, o, {
                        once: !0
                    })
                }))
            }, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._eventsCount = 0, i.prototype._maxListeners = void 0;
            var s = 10;

            function a(t) {
                if ("function" !== typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t)
            }

            function c(t) {
                return void 0 === t._maxListeners ? i.defaultMaxListeners : t._maxListeners
            }

            function u(t, e, n, r) {
                var o, i, s, u;
                if (a(n), void 0 === (i = t._events) ? (i = t._events = Object.create(null), t._eventsCount = 0) : (void 0 !== i.newListener && (t.emit("newListener", e, n.listener ? n.listener : n), i = t._events), s = i[e]), void 0 === s) s = i[e] = n, ++t._eventsCount;
                else if ("function" === typeof s ? s = i[e] = r ? [n, s] : [s, n] : r ? s.unshift(n) : s.push(n), (o = c(t)) > 0 && s.length > o && !s.warned) {
                    s.warned = !0;
                    var f = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                    f.name = "MaxListenersExceededWarning", f.emitter = t, f.type = e, f.count = s.length, u = f, console && console.warn && console.warn(u)
                }
                return t
            }

            function f() {
                if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
            }

            function l(t, e, n) {
                var r = {
                        fired: !1,
                        wrapFn: void 0,
                        target: t,
                        type: e,
                        listener: n
                    },
                    o = f.bind(r);
                return o.listener = n, r.wrapFn = o, o
            }

            function p(t, e, n) {
                var r = t._events;
                if (void 0 === r) return [];
                var o = r[e];
                return void 0 === o ? [] : "function" === typeof o ? n ? [o.listener || o] : [o] : n ? function(t) {
                    for (var e = new Array(t.length), n = 0; n < e.length; ++n) e[n] = t[n].listener || t[n];
                    return e
                }(o) : d(o, o.length)
            }

            function h(t) {
                var e = this._events;
                if (void 0 !== e) {
                    var n = e[t];
                    if ("function" === typeof n) return 1;
                    if (void 0 !== n) return n.length
                }
                return 0
            }

            function d(t, e) {
                for (var n = new Array(e), r = 0; r < e; ++r) n[r] = t[r];
                return n
            }

            function y(t, e, n, r) {
                if ("function" === typeof t.on) r.once ? t.once(e, n) : t.on(e, n);
                else {
                    if ("function" !== typeof t.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
                    t.addEventListener(e, (function o(i) {
                        r.once && t.removeEventListener(e, o), n(i)
                    }))
                }
            }
            Object.defineProperty(i, "defaultMaxListeners", {
                enumerable: !0,
                get: function() {
                    return s
                },
                set: function(t) {
                    if ("number" !== typeof t || t < 0 || o(t)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
                    s = t
                }
            }), i.init = function() {
                void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
            }, i.prototype.setMaxListeners = function(t) {
                if ("number" !== typeof t || t < 0 || o(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
                return this._maxListeners = t, this
            }, i.prototype.getMaxListeners = function() {
                return c(this)
            }, i.prototype.emit = function(t) {
                for (var e = [], n = 1; n < arguments.length; n++) e.push(arguments[n]);
                var o = "error" === t,
                    i = this._events;
                if (void 0 !== i) o = o && void 0 === i.error;
                else if (!o) return !1;
                if (o) {
                    var s;
                    if (e.length > 0 && (s = e[0]), s instanceof Error) throw s;
                    var a = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
                    throw a.context = s, a
                }
                var c = i[t];
                if (void 0 === c) return !1;
                if ("function" === typeof c) r(c, this, e);
                else {
                    var u = c.length,
                        f = d(c, u);
                    for (n = 0; n < u; ++n) r(f[n], this, e)
                }
                return !0
            }, i.prototype.addListener = function(t, e) {
                return u(this, t, e, !1)
            }, i.prototype.on = i.prototype.addListener, i.prototype.prependListener = function(t, e) {
                return u(this, t, e, !0)
            }, i.prototype.once = function(t, e) {
                return a(e), this.on(t, l(this, t, e)), this
            }, i.prototype.prependOnceListener = function(t, e) {
                return a(e), this.prependListener(t, l(this, t, e)), this
            }, i.prototype.removeListener = function(t, e) {
                var n, r, o, i, s;
                if (a(e), void 0 === (r = this._events)) return this;
                if (void 0 === (n = r[t])) return this;
                if (n === e || n.listener === e) 0 === --this._eventsCount ? this._events = Object.create(null) : (delete r[t], r.removeListener && this.emit("removeListener", t, n.listener || e));
                else if ("function" !== typeof n) {
                    for (o = -1, i = n.length - 1; i >= 0; i--)
                        if (n[i] === e || n[i].listener === e) {
                            s = n[i].listener, o = i;
                            break
                        }
                    if (o < 0) return this;
                    0 === o ? n.shift() : function(t, e) {
                        for (; e + 1 < t.length; e++) t[e] = t[e + 1];
                        t.pop()
                    }(n, o), 1 === n.length && (r[t] = n[0]), void 0 !== r.removeListener && this.emit("removeListener", t, s || e)
                }
                return this
            }, i.prototype.off = i.prototype.removeListener, i.prototype.removeAllListeners = function(t) {
                var e, n, r;
                if (void 0 === (n = this._events)) return this;
                if (void 0 === n.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== n[t] && (0 === --this._eventsCount ? this._events = Object.create(null) : delete n[t]), this;
                if (0 === arguments.length) {
                    var o, i = Object.keys(n);
                    for (r = 0; r < i.length; ++r) "removeListener" !== (o = i[r]) && this.removeAllListeners(o);
                    return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
                }
                if ("function" === typeof(e = n[t])) this.removeListener(t, e);
                else if (void 0 !== e)
                    for (r = e.length - 1; r >= 0; r--) this.removeListener(t, e[r]);
                return this
            }, i.prototype.listeners = function(t) {
                return p(this, t, !0)
            }, i.prototype.rawListeners = function(t) {
                return p(this, t, !1)
            }, i.listenerCount = function(t, e) {
                return "function" === typeof t.listenerCount ? t.listenerCount(e) : h.call(t, e)
            }, i.prototype.listenerCount = h, i.prototype.eventNames = function() {
                return this._eventsCount > 0 ? e(this._events) : []
            }
        },
        45559: t => {
            "use strict";
            t.exports = function() {
                throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")
            }
        }
    }
]);
//# sourceMappingURL=95.16bea647.chunk.js.map