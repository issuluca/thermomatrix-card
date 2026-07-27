const P = globalThis, I = P.ShadowRoot && (P.ShadyCSS === void 0 || P.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = /* @__PURE__ */ Symbol(), j = /* @__PURE__ */ new WeakMap();
let re = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== F) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (I && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = j.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && j.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const he = (o) => new re(typeof o == "string" ? o : o + "", void 0, F), pe = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((s, i, r) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[r + 1], o[0]);
  return new re(t, o, F);
}, ue = (o, e) => {
  if (I) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = P.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, o.appendChild(s);
  }
}, q = I ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return he(t);
})(o) : o;
const { is: me, defineProperty: be, getOwnPropertyDescriptor: ge, getOwnPropertyNames: fe, getOwnPropertySymbols: _e, getPrototypeOf: $e } = Object, R = globalThis, G = R.trustedTypes, xe = G ? G.emptyScript : "", ye = R.reactiveElementPolyfillSupport, w = (o, e) => o, L = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? xe : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch {
        t = null;
      }
  }
  return t;
} }, ne = (o, e) => !me(o, e), K = { attribute: !0, type: String, converter: L, reflect: !1, useDefault: !1, hasChanged: ne };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), R.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let x = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = K) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && be(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: r } = ge(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: i, set(n) {
      const c = i?.call(this);
      r?.call(this, n), this.requestUpdate(e, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? K;
  }
  static _$Ei() {
    if (this.hasOwnProperty(w("elementProperties"))) return;
    const e = $e(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(w("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(w("properties"))) {
      const t = this.properties, s = [...fe(t), ..._e(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, i] of t) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) t.unshift(q(i));
    } else e !== void 0 && t.push(q(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ue(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : L).toAttribute(t, s.type);
      this._$Em = e, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : L;
      this._$Em = i;
      const c = n.fromAttribute(t, r.type);
      this[i] = c ?? this._$Ej?.get(i) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, r) {
    if (e !== void 0) {
      const n = this.constructor;
      if (i === !1 && (r = this[e]), s ??= n.getPropertyOptions(e), !((s.hasChanged ?? ne)(r, t) || s.useDefault && s.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: r }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), r !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, r] of this._$Ep) this[i] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, r] of s) {
        const { wrapped: n } = r, c = this[i];
        n !== !0 || this._$AL.has(i) || c === void 0 || this.C(i, void 0, r, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[w("elementProperties")] = /* @__PURE__ */ new Map(), x[w("finalized")] = /* @__PURE__ */ new Map(), ye?.({ ReactiveElement: x }), (R.reactiveElementVersions ??= []).push("2.1.2");
const W = globalThis, Y = (o) => o, T = W.trustedTypes, Z = T ? T.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, ae = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, le = "?" + g, ve = `<${le}>`, $ = document, S = () => $.createComment(""), C = (o) => o === null || typeof o != "object" && typeof o != "function", B = Array.isArray, Ae = (o) => B(o) || typeof o?.[Symbol.iterator] == "function", z = `[ 	
\f\r]`, A = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, J = /-->/g, X = />/g, f = RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Q = /'/g, ee = /"/g, ce = /^(?:script|style|textarea|title)$/i, we = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), l = we(1), y = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), te = /* @__PURE__ */ new WeakMap(), _ = $.createTreeWalker($, 129);
function de(o, e) {
  if (!B(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Z !== void 0 ? Z.createHTML(e) : e;
}
const Ee = (o, e) => {
  const t = o.length - 1, s = [];
  let i, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = A;
  for (let c = 0; c < t; c++) {
    const a = o[c];
    let p, u, d = -1, m = 0;
    for (; m < a.length && (n.lastIndex = m, u = n.exec(a), u !== null); ) m = n.lastIndex, n === A ? u[1] === "!--" ? n = J : u[1] !== void 0 ? n = X : u[2] !== void 0 ? (ce.test(u[2]) && (i = RegExp("</" + u[2], "g")), n = f) : u[3] !== void 0 && (n = f) : n === f ? u[0] === ">" ? (n = i ?? A, d = -1) : u[1] === void 0 ? d = -2 : (d = n.lastIndex - u[2].length, p = u[1], n = u[3] === void 0 ? f : u[3] === '"' ? ee : Q) : n === ee || n === Q ? n = f : n === J || n === X ? n = A : (n = f, i = void 0);
    const b = n === f && o[c + 1].startsWith("/>") ? " " : "";
    r += n === A ? a + ve : d >= 0 ? (s.push(p), a.slice(0, d) + ae + a.slice(d) + g + b) : a + g + (d === -2 ? c : b);
  }
  return [de(o, r + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class M {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let r = 0, n = 0;
    const c = e.length - 1, a = this.parts, [p, u] = Ee(e, t);
    if (this.el = M.createElement(p, s), _.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = _.nextNode()) !== null && a.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(ae)) {
          const m = u[n++], b = i.getAttribute(d).split(g), N = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: r, name: N[2], strings: b, ctor: N[1] === "." ? Ce : N[1] === "?" ? Me : N[1] === "@" ? ke : H }), i.removeAttribute(d);
        } else d.startsWith(g) && (a.push({ type: 6, index: r }), i.removeAttribute(d));
        if (ce.test(i.tagName)) {
          const d = i.textContent.split(g), m = d.length - 1;
          if (m > 0) {
            i.textContent = T ? T.emptyScript : "";
            for (let b = 0; b < m; b++) i.append(d[b], S()), _.nextNode(), a.push({ type: 2, index: ++r });
            i.append(d[m], S());
          }
        }
      } else if (i.nodeType === 8) if (i.data === le) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(g, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += g.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const s = $.createElement("template");
    return s.innerHTML = e, s;
  }
}
function v(o, e, t = o, s) {
  if (e === y) return e;
  let i = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const r = C(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(o), i._$AT(o, t, s)), s !== void 0 ? (t._$Co ??= [])[s] = i : t._$Cl = i), i !== void 0 && (e = v(o, i._$AS(o, e.values), i, s)), e;
}
class Se {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: s } = this._$AD, i = (e?.creationScope ?? $).importNode(t, !0);
    _.currentNode = i;
    let r = _.nextNode(), n = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let p;
        a.type === 2 ? p = new k(r, r.nextSibling, this, e) : a.type === 1 ? p = new a.ctor(r, a.name, a.strings, this, e) : a.type === 6 && (p = new Ne(r, this, e)), this._$AV.push(p), a = s[++c];
      }
      n !== a?.index && (r = _.nextNode(), n++);
    }
    return _.currentNode = $, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, s, i) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = v(this, e, t), C(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== y && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ae(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && C(this._$AH) ? this._$AA.nextSibling.data = e : this.T($.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = M.createElement(de(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const r = new Se(i, this), n = r.u(this.options);
      r.p(t), this.T(n), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = te.get(e.strings);
    return t === void 0 && te.set(e.strings, t = new M(e)), t;
  }
  k(e) {
    B(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const r of e) i === t.length ? t.push(s = new k(this.O(S()), this.O(S()), this, this.options)) : s = t[i], s._$AI(r), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const s = Y(e).nextSibling;
      Y(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(e, t = this, s, i) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) e = v(this, e, t, 0), n = !C(e) || e !== this._$AH && e !== y, n && (this._$AH = e);
    else {
      const c = e;
      let a, p;
      for (e = r[0], a = 0; a < r.length - 1; a++) p = v(this, c[s + a], t, a), p === y && (p = this._$AH[a]), n ||= !C(p) || p !== this._$AH[a], p === h ? e = h : e !== h && (e += (p ?? "") + r[a + 1]), this._$AH[a] = p;
    }
    n && !i && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ce extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class Me extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class ke extends H {
  constructor(e, t, s, i, r) {
    super(e, t, s, i, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = v(this, e, t, 0) ?? h) === y) return;
    const s = this._$AH, i = e === h && s !== h || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== h && (s === h || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ne {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    v(this, e);
  }
}
const Oe = W.litHtmlPolyfillSupport;
Oe?.(M, k), (W.litHtmlVersions ??= []).push("3.3.3");
const Pe = (o, e, t) => {
  const s = t?.renderBefore ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = t?.renderBefore ?? null;
    s._$litPart$ = i = new k(e.insertBefore(S(), r), r, void 0, t ?? {});
  }
  return i._$AI(o), i;
};
const V = globalThis;
let E = class extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Pe(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return y;
  }
};
E._$litElement$ = !0, E.finalized = !0, V.litElementHydrateSupport?.({ LitElement: E });
const Te = V.litElementPolyfillSupport;
Te?.({ LitElement: E });
(V.litElementVersions ??= []).push("4.2.2");
const Ue = (o) => (...e) => ({ _$litDirective$: o, values: e });
let Re = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, s) {
    this._$Ct = e, this._$AM = t, this._$Ci = s;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
const He = {}, ze = (o, e = He) => o._$AH = e;
const se = Ue(class extends Re {
  constructor() {
    super(...arguments), this.key = h;
  }
  render(o, e) {
    return this.key = o, e;
  }
  update(o, [e, t]) {
    return e !== this.key && (ze(o), this.key = e), t;
  }
}), Le = pe`
  :host {
    display: block;
    --tm-heat: #f97316;
    --tm-cool: #1d4ed8;
    --tm-dry: #10b981;
    --tm-fan: #0891b2;
    --tm-off: #94a3b8;
    --tm-neutral-border: rgba(156, 163, 175, 0.45);
    color: var(--primary-text-color);
  }

  ha-card {
    min-height: 420px;
    padding: 18px 20px;
    overflow: hidden;
    border: 2px solid var(--tm-border-color, var(--tm-neutral-border));
    border-radius: 18px;
    box-shadow: var(--tm-card-shadow, 0 4px 14px rgba(0, 0, 0, 0.1));
    box-sizing: border-box;
    background: var(--ha-card-background, var(--card-background-color));
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .layout {
    display: grid;
    gap: 10px;
  }

  .button-grid {
    display: grid;
    grid-template-columns: repeat(var(--columns, 1), minmax(0, 1fr));
    gap: 8px;
  }

  button {
    position: relative;
    min-width: 0;
    min-height: 50px;
    padding: 7px 8px;
    border: 2px solid var(--tm-neutral-border);
    border-radius: 14px;
    box-sizing: border-box;
    color: var(--primary-text-color);
    background: transparent;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease,
      box-shadow 0.2s ease, transform 0.1s ease;
  }

  button:active {
    transform: scale(0.97);
  }

  button.active {
    border-color: var(--button-color);
    background: color-mix(in srgb, var(--button-color) 38%, transparent);
    box-shadow: 0 0 15px
      color-mix(in srgb, var(--button-color) 55%, transparent);
  }

  .mode-button {
    min-height: 58px;
  }

  .mode-icon {
    display: block;
    margin-bottom: 3px;
    font-size: 20px;
    line-height: 1;
  }

  .label-hide .button-label,
  .label-auto.labels-compact .button-label {
    position: absolute;
    width: max-content;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .label-hide .mode-icon,
  .label-auto.labels-compact .mode-icon,
  .label-hide .preset-icon,
  .label-auto.labels-compact .preset-icon {
    margin-bottom: 0;
  }

  .lcd-panel {
    width: 100%;
    padding: 14px;
    border: 2px solid color-mix(in srgb, currentColor 34%, transparent);
    border-radius: 14px;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2),
      0 3px 10px rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    color: #111827;
    background: var(--lcd-background);
    transition: background 0.3s ease, color 0.3s ease;
  }

  .lcd-panel.dark {
    color: #f8fafc;
  }

  .lcd-values {
    display: grid;
    grid-template-columns: minmax(0, 1.12fr) 54px minmax(0, 0.66fr);
    gap: 8px;
    align-items: center;
  }

  .lcd-values.external {
    grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.66fr);
    gap: 18px;
  }

  .lcd-reading {
    min-width: 0;
  }

  .lcd-reading.current {
    font-size: clamp(44px, 13vw, 54px);
    text-align: left;
  }

  .lcd-reading.target {
    font-size: clamp(26px, 7.2vw, 30px);
    text-align: right;
  }

  .lcd-reading-label {
    display: block;
    margin-bottom: 7px;
    font: 700 10px/1 sans-serif;
    letter-spacing: 0.06em;
    opacity: 0.68;
  }

  .lcd-display {
    display: inline-flex;
    align-items: flex-end;
    gap: 0.055em;
    height: 1em;
  }

  .lcd-digit {
    position: relative;
    display: inline-block;
    width: 0.58em;
    height: 1em;
  }

  .lcd-segment {
    position: absolute;
    display: block;
    border-radius: 0.035em;
    background: currentColor;
    opacity: 0.1;
  }

  .lcd-segment.on {
    opacity: 1;
  }

  .lcd-segment.a,
  .lcd-segment.d,
  .lcd-segment.g {
    left: 0.105em;
    width: 0.37em;
    height: 0.105em;
    clip-path: polygon(
      9% 0,
      91% 0,
      100% 50%,
      91% 100%,
      9% 100%,
      0 50%
    );
  }

  .lcd-segment.a {
    top: 0.02em;
  }
  .lcd-segment.g {
    top: 0.462em;
  }
  .lcd-segment.d {
    bottom: 0.02em;
  }

  .lcd-segment.b,
  .lcd-segment.c,
  .lcd-segment.e,
  .lcd-segment.f {
    width: 0.105em;
    height: 0.35em;
    clip-path: polygon(
      50% 0,
      100% 9%,
      100% 91%,
      50% 100%,
      0 91%,
      0 9%
    );
  }

  .lcd-segment.b {
    top: 0.09em;
    right: 0.025em;
  }
  .lcd-segment.c {
    right: 0.025em;
    bottom: 0.09em;
  }
  .lcd-segment.e {
    bottom: 0.09em;
    left: 0.025em;
  }
  .lcd-segment.f {
    top: 0.09em;
    left: 0.025em;
  }

  .lcd-dot {
    width: 0.1em;
    height: 0.1em;
    margin: 0 0.015em 0.02em;
    border-radius: 50%;
    background: currentColor;
  }

  .lcd-degree {
    width: 0.2em;
    height: 0.2em;
    margin: 0 0 0.75em 0.015em;
    border: 0.045em solid currentColor;
    border-radius: 50%;
    box-sizing: border-box;
  }

  .status-wheel {
    position: relative;
    left: 4px;
    display: grid;
    grid-template-columns: repeat(4, 11px);
    gap: 2px;
    width: 54px;
    height: 30px;
    padding: 1px 2px;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, currentColor 58%, transparent);
    border-radius: 4px;
    box-sizing: border-box;
    background: color-mix(in srgb, currentColor 10%, transparent);
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.18),
      0 0 7px color-mix(in srgb, currentColor 24%, transparent);
  }

  .wheel-window {
    position: relative;
    height: 26px;
    overflow: hidden;
    border-right: 1px solid color-mix(in srgb, currentColor 18%, transparent);
    mask-image: linear-gradient(
      to bottom,
      transparent 0,
      black 28%,
      black 72%,
      transparent 100%
    );
  }

  .wheel-window:last-child {
    border-right: 0;
  }

  .wheel-strip {
    position: absolute;
    inset: 0 auto auto 0;
    display: flex;
    width: 100%;
    flex-direction: column;
    transform: translateY(var(--wheel-offset));
    animation: wheel-roll 2s cubic-bezier(0.16, 0.72, 0.22, 1)
      var(--wheel-delay) both;
    will-change: transform;
  }

  .wheel-strip i {
    display: flex;
    width: 100%;
    height: 14px;
    flex: 0 0 14px;
    align-items: center;
    justify-content: center;
    font-style: normal;
    opacity: 0.28;
  }

  .wheel-strip i.selected {
    opacity: 1;
  }

  .wheel-strip .matrix-char {
    --matrix-pixel-size: 1.25px;
    --matrix-pixel-gap: 0.4px;
  }

  @keyframes wheel-roll {
    from {
      transform: translateY(6px);
    }
    to {
      transform: translateY(var(--wheel-offset));
    }
  }

  .lcd-external-status {
    display: flex;
    width: 100%;
    min-height: 28px;
    margin-top: 9px;
    padding-top: 7px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-top: 1px solid color-mix(in srgb, currentColor 28%, transparent);
    box-sizing: border-box;
    text-align: center;
  }

  .lcd-external-status .matrix-word {
    max-width: 100%;
    justify-content: center;
    gap: 1.4px;
    --matrix-pixel-size: 1.05px;
    --matrix-pixel-gap: 0.42px;
  }

  .external-status-slide {
    display: inline-flex;
    max-width: 100%;
    animation: external-status-roll 560ms cubic-bezier(0.2, 0.72, 0.22, 1)
      both;
  }

  @keyframes external-status-roll {
    from {
      opacity: 0;
      transform: perspective(80px) translateY(18px) rotateX(-42deg);
    }
    to {
      opacity: 1;
      transform: perspective(80px) translateY(0) rotateX(0);
    }
  }

  .matrix-word {
    display: inline-flex;
    gap: 2px;
  }

  .matrix-char {
    display: grid;
    grid-template-columns: repeat(5, var(--matrix-pixel-size, 1.4px));
    grid-template-rows: repeat(7, var(--matrix-pixel-size, 1.4px));
    gap: var(--matrix-pixel-gap, 0.55px);
  }

  .matrix-pixel {
    width: var(--matrix-pixel-size, 1.4px);
    height: var(--matrix-pixel-size, 1.4px);
    border-radius: 0.3px;
    background: currentColor;
    opacity: 0.1;
  }

  .matrix-pixel.on {
    opacity: 1;
  }

  .temperature-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .temperature-controls button {
    min-height: 30px;
    padding: 2px 8px;
    border-width: 1px;
    border-radius: 10px;
    background: color-mix(
      in srgb,
      var(--primary-text-color) 8%,
      transparent
    );
    box-shadow: none;
    font-size: 19px;
    line-height: 1;
  }

  .consumption {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 10px;
    align-items: center;
    min-height: 58px;
    padding: 7px 14px;
    border: 2px solid var(--tm-neutral-border);
    border-radius: 14px;
    box-sizing: border-box;
    color: #111827;
    background: var(--consumption-background);
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.18),
      0 3px 10px rgba(0, 0, 0, 0.1);
    transition: background 0.35s ease, border-color 0.35s ease;
  }

  .consumption.active {
    border-color: color-mix(in srgb, currentColor 34%, transparent);
  }

  .consumption.dark {
    color: #f8fafc;
  }

  .consumption-icon {
    font-size: 18px;
  }

  .consumption-label {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    opacity: 0.72;
  }

  .preset-icon {
    display: block;
    margin-bottom: 3px;
    font-size: 17px;
    line-height: 1;
  }

  .consumption-value {
    display: inline-flex;
    align-items: flex-end;
    gap: 6px;
    font-size: 29px;
    line-height: 1;
  }

  .consumption-unit {
    padding-bottom: 2px;
    font: 800 11px/1 Arial, sans-serif;
    letter-spacing: 0.06em;
  }

  .unavailable {
    font: 700 11px/1.2 Arial, sans-serif;
  }

  .lcd-number {
    font-size: 29px;
  }

  .matrix-space {
    display: inline-block;
    width: 4px;
  }

  .brand {
    margin-top: 4px;
    overflow: hidden;
    color: var(--secondary-text-color);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.16em;
    line-height: 1.2;
    text-align: center;
    text-overflow: ellipsis;
    text-shadow: 0 -1px 0 var(--ha-card-background),
      0 1px 0 color-mix(in srgb, var(--primary-text-color) 28%, transparent);
    text-transform: uppercase;
    white-space: nowrap;
  }

  .warning {
    padding: 16px;
    color: var(--error-color, #db4437);
    text-align: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .wheel-strip,
    .external-status-slide {
      animation: none;
    }
  }
`, De = "0.4.1", Ie = /* @__PURE__ */ new Set(["heating", "cooling", "drying", "fan"]), ie = ["-", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"], oe = {
  off: { icon: "mdi:power", color: "#94a3b8" },
  heat: { icon: "mdi:fire", color: "#f97316" },
  cool: { icon: "mdi:snowflake", color: "#1d4ed8" },
  dry: { icon: "mdi:water-percent", color: "#10b981" },
  fan_only: { icon: "mdi:fan", color: "#0891b2" },
  auto: { icon: "mdi:thermostat-auto", color: "#8b5cf6" },
  heat_cool: { icon: "mdi:autorenew", color: "#8b5cf6" }
}, Fe = {
  0: "abcdef",
  1: "bc",
  2: "abdeg",
  3: "abcdg",
  4: "bcfg",
  5: "acdfg",
  6: "acdefg",
  7: "abc",
  8: "abcdefg",
  9: "abcdfg",
  "-": "g"
}, We = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  G: ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  J: ["00111", "00010", "00010", "00010", "10010", "10010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"]
}, Be = {
  none: { icon: "mdi:hand-back-right", color: "#c026d3" },
  home: { icon: "mdi:home", color: "#1d4ed8" },
  away: { icon: "mdi:bag-checked", color: "#94a3b8" },
  sleep: { icon: "mdi:sleep", color: "#8b5cf6" },
  comfort: { icon: "mdi:sofa", color: "#10b981" },
  eco: { icon: "mdi:leaf", color: "#16a34a" }
}, O = {
  en: { loading: "Loading…", unavailable: "Unavailable", environment: "ROOM", target: "TARGET", consumption: "POWER", off: "Off", heat: "Heat", cool: "Cool", dry: "Dry", fan_only: "Fan", auto: "Auto", heat_cool: "Auto", none: "Manual", home: "Home", away: "Away", sleep: "Sleep", comfort: "Comfort", eco: "Eco" },
  it: { loading: "Caricamento…", unavailable: "Non disponibile", environment: "AMBIENTE", target: "TARGET", consumption: "CONSUMO", off: "Spento", heat: "Caldo", cool: "Freddo", dry: "Deumidifica", fan_only: "Ventola", auto: "Auto", heat_cool: "Auto", none: "Manuale", home: "Casa", away: "Assente", sleep: "Notte", comfort: "Comfort", eco: "Eco" },
  es: { loading: "Cargando…", unavailable: "No disponible", environment: "AMBIENTE", target: "OBJETIVO", consumption: "CONSUMO", off: "Apagado", heat: "Calor", cool: "Frío", dry: "Deshumidificar", fan_only: "Ventilador", auto: "Auto", heat_cool: "Auto", none: "Manual", home: "Casa", away: "Ausente", sleep: "Noche", comfort: "Confort", eco: "Eco" },
  fr: { loading: "Chargement…", unavailable: "Indisponible", environment: "AMBIANCE", target: "CIBLE", consumption: "PUISSANCE", off: "Arrêt", heat: "Chauffage", cool: "Froid", dry: "Déshumidifier", fan_only: "Ventilateur", auto: "Auto", heat_cool: "Auto", none: "Manuel", home: "Maison", away: "Absent", sleep: "Nuit", comfort: "Confort", eco: "Éco" },
  de: { loading: "Laden…", unavailable: "Nicht verfügbar", environment: "RAUM", target: "ZIEL", consumption: "LEISTUNG", off: "Aus", heat: "Heizen", cool: "Kühlen", dry: "Entfeuchten", fan_only: "Lüfter", auto: "Auto", heat_cool: "Auto", none: "Manuell", home: "Zuhause", away: "Abwesend", sleep: "Nacht", comfort: "Komfort", eco: "Eco" },
  pt: { loading: "A carregar…", unavailable: "Indisponível", environment: "AMBIENTE", target: "ALVO", consumption: "CONSUMO", off: "Desligado", heat: "Aquecer", cool: "Arrefecer", dry: "Desumidificar", fan_only: "Ventoinha", auto: "Auto", heat_cool: "Auto", none: "Manual", home: "Casa", away: "Ausente", sleep: "Noite", comfort: "Conforto", eco: "Eco" }
}, U = class U extends E {
  static getConfigForm() {
    return {
      schema: [
        {
          name: "entity",
          required: !0,
          selector: { entity: { domain: "climate" } }
        },
        { name: "name", selector: { text: {} } },
        { name: "show_presets", selector: { boolean: {} } },
        { name: "show_consumption", selector: { boolean: {} } },
        {
          name: "power_entity",
          selector: { entity: { domain: "sensor" } }
        },
        {
          name: "status_entity",
          selector: { entity: {} }
        },
        {
          name: "language",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "auto", label: "Automatic (Home Assistant)" },
                { value: "en", label: "English" },
                { value: "it", label: "Italiano" },
                { value: "es", label: "Español" },
                { value: "fr", label: "Français" },
                { value: "de", label: "Deutsch" },
                { value: "pt", label: "Português" }
              ]
            }
          }
        },
        {
          name: "border_mode",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "state", label: "State color" },
                { value: "neutral", label: "Neutral" }
              ]
            }
          }
        },
        {
          name: "hvac_button_labels",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "auto", label: "Automatic" },
                { value: "show", label: "Always show" },
                { value: "hide", label: "Icons only" }
              ]
            }
          }
        },
        {
          name: "preset_button_labels",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "auto", label: "Automatic" },
                { value: "show", label: "Always show" },
                { value: "hide", label: "Icons only" }
              ]
            }
          }
        },
        {
          name: "temperature_step",
          selector: {
            number: { min: 0.1, max: 5, step: 0.1, mode: "box" }
          }
        }
      ],
      computeLabel: (e) => ({
        entity: "Climate entity",
        name: "Custom name",
        show_presets: "Show presets",
        show_consumption: "Show power consumption",
        power_entity: "Power sensor",
        status_entity: "Advanced status sensor",
        language: "Language",
        border_mode: "Card border",
        hvac_button_labels: "HVAC button labels",
        preset_button_labels: "Preset button labels",
        temperature_step: "Temperature step"
      })[e.name ?? ""] ?? e.name,
      computeHelper: (e) => e.name === "power_entity" ? "Used only when the power module is enabled." : e.name === "status_entity" ? "Optional. Replaces ON, IDLE and OFF inside the LCD." : void 0
    };
  }
  static getStubConfig(e, t) {
    return {
      entity: t.find((i) => i.startsWith("climate.")) ?? Object.keys(e.states).find(
        (i) => i.startsWith("climate.")
      ) ?? "",
      show_presets: !0,
      show_consumption: !1,
      border_mode: "state",
      language: "auto",
      hvac_button_labels: "auto",
      preset_button_labels: "auto"
    };
  }
  setConfig(e) {
    if (!e?.entity)
      throw new Error("ThermoMatrix Card requires a climate entity.");
    if (!e.entity.startsWith("climate."))
      throw new Error("The configured entity must use the climate domain.");
    this._config = {
      ...e,
      show_presets: e.show_presets ?? !0,
      show_consumption: e.show_consumption ?? !1,
      border_mode: e.border_mode ?? "state",
      language: e.language ?? "auto",
      hvac_button_labels: e.hvac_button_labels ?? "auto",
      preset_button_labels: e.preset_button_labels ?? "auto"
    };
  }
  firstUpdated() {
    this._labelResizeObserver = new ResizeObserver(
      () => this._scheduleLabelSync()
    ), this._labelResizeObserver.observe(this), this._scheduleLabelSync();
  }
  updated(e) {
    this._scheduleLabelSync();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._labelResizeObserver?.disconnect(), this._labelSyncFrame !== void 0 && cancelAnimationFrame(this._labelSyncFrame);
  }
  getCardSize() {
    return this._config?.show_consumption ? 9 : 8;
  }
  render() {
    if (!this.hass || !this._config)
      return l`<ha-card><div class="warning">${this._t("loading")}</div></ha-card>`;
    const e = this.hass.states[this._config.entity];
    if (!e)
      return l`<ha-card>
        <div class="warning">
          ${this._config.entity}: ${this._t("unavailable")}
        </div>
      </ha-card>`;
    const t = e.state, s = oe[t]?.color ?? "#94a3b8", i = this._config.border_mode === "state", r = i && t !== "off" ? `0 0 18px color-mix(in srgb, ${s} 58%, transparent)` : "0 4px 14px rgba(0,0,0,0.10)";
    return l`
      <ha-card
        style=${`--tm-border-color:${i ? s : "var(--tm-neutral-border)"};--tm-card-shadow:${r};`}
      >
        <div class="layout">
          ${this._renderModes(e)} ${this._renderDisplay(e)}
          ${this._renderTemperatureControls(e)}
          ${this._renderPresets(e)}
          ${this._renderConsumption()}
          <div class="brand">
            ${this._config.name ?? e.attributes.friendly_name ?? "ThermoMatrix"}
          </div>
        </div>
      </ha-card>
    `;
  }
  _renderModes(e) {
    const t = this._stringArray(e.attributes.hvac_modes), s = t.length > 0 ? t : [e.state];
    return l`
      <div
        class="button-grid button-grid-modes label-${this._config.hvac_button_labels ?? "auto"}"
        style=${`--columns:${Math.min(s.length, 5)}`}
      >
        ${s.map((i) => {
      const r = oe[i] ?? {
        icon: "mdi:radiobox-blank",
        color: "#64748b"
      }, n = this._translateValue(i);
      return l`
            <button
              class="mode-button ${e.state === i ? "active" : ""}"
              style=${`--button-color:${r.color}`}
              title=${n}
              aria-label=${n}
              @click=${() => this._setHvacMode(i)}
            >
              <ha-icon class="mode-icon" icon=${r.icon}></ha-icon>
              <span class="button-label">${n}</span>
            </button>
          `;
    })}
      </div>
    `;
  }
  _renderDisplay(e) {
    const t = e.state, s = String(e.attributes.hvac_action ?? ""), i = t === "off" ? "OFF" : s === "idle" ? "IDLE" : (Ie.has(s), "ON"), r = this._config.status_entity ? this.hass.states[this._config.status_entity] : void 0, n = this.hass.themes?.darkMode === !0, a = (n ? {
      heat: "#9a3412",
      cool: "#172554",
      dry: "#065f46",
      fan_only: "#155e75",
      off: "#374151"
    } : {
      heat: "#fed7aa",
      cool: "#bfdbfe",
      dry: "#a7f3d0",
      fan_only: "#a5f3fc",
      off: "#d1d5db"
    })[t] ?? (n ? "#334155" : "#cbd5e1");
    return l`
      <div
        class="lcd-panel ${n ? "dark" : ""}"
        style=${`--lcd-background:${a}`}
      >
        <div class="lcd-values ${this._config.status_entity ? "external" : ""}">
          <div class="lcd-reading current">
            <span class="lcd-reading-label">${this._t("environment")}</span>
            ${this._renderTemperature(e.attributes.current_temperature)}
          </div>
          ${this._config.status_entity ? h : l`
                ${this._renderStatusWheel(i)}
              `}
          <div class="lcd-reading target">
            <span class="lcd-reading-label">${this._t("target")}</span>
            ${this._renderTemperature(e.attributes.temperature)}
          </div>
        </div>
        ${this._config.status_entity ? l`
              <div
                class="lcd-external-status"
                title=${r ? this._humanize(r.state) : this._t("unavailable")}
              >
                ${this._renderExternalStatus(
      r ? this._humanize(r.state).toUpperCase() : this._t("unavailable").toUpperCase()
    )}
              </div>
            ` : h}
      </div>
    `;
  }
  _renderTemperature(e) {
    const t = Number(e), s = Number.isFinite(t) ? t.toFixed(1) : "--";
    return l`
      <span class="lcd-display">
        ${[...s].map(
      (i) => i === "." ? l`<i class="lcd-dot"></i>` : this._renderDigit(i)
    )}
        <i class="lcd-degree"></i>
      </span>
    `;
  }
  _renderDigit(e) {
    const t = Fe[e] ?? "";
    return l`
      <span class="lcd-digit">
        ${[..."abcdefg"].map(
      (s) => l`<i
              class="lcd-segment ${s} ${t.includes(s) ? "on" : ""}"
            ></i>`
    )}
      </span>
    `;
  }
  _renderStatusWheel(e) {
    return l`
      <div class="status-wheel" role="status" aria-label=${e}>
        ${[...e === "IDLE" ? e : e === "OFF" ? "-OFF" : "--ON"].map(
      (s, i) => se(
        `${e}-${i}`,
        this._renderWheelReel(s, i)
      )
    )}
      </div>
    `;
  }
  _renderWheelReel(e, t) {
    const s = Math.max(0, ie.indexOf(e));
    return l`
      <span class="wheel-window" aria-hidden="true">
        <span
          class="wheel-strip"
          style=${`--wheel-offset:${6 - s * 14}px;--wheel-delay:${t * 55}ms`}
        >
          ${ie.map(
      (i) => l`<i class=${i === e ? "selected" : ""}>
                ${this._renderMatrixChar(i)}
              </i>`
    )}
        </span>
      </span>
    `;
  }
  _renderExternalStatus(e) {
    return se(
      e,
      l`<span class="external-status-slide">
        ${this._renderMatrixWord(e)}
      </span>`
    );
  }
  _renderMatrixChar(e) {
    const t = (We[e] ?? Array(7).fill("00000")).join("");
    return l`
      <span class="matrix-char">
        ${[...t].map(
      (s) => l`<i class="matrix-pixel ${s === "1" ? "on" : ""}"></i>`
    )}
      </span>
    `;
  }
  _renderTemperatureControls(e) {
    return l`
      <div class="temperature-controls">
        <button title="Diminuisci temperatura" @click=${() => this._step(e, -1)}>
          −
        </button>
        <button title="Aumenta temperatura" @click=${() => this._step(e, 1)}>
          +
        </button>
      </div>
    `;
  }
  _renderPresets(e) {
    if (!this._config.show_presets)
      return h;
    const t = this._stringArray(e.attributes.preset_modes);
    if (t.length === 0)
      return h;
    const s = String(e.attributes.preset_mode ?? "");
    return l`
      <div
        class="button-grid button-grid-presets label-${this._config.preset_button_labels ?? "auto"}"
        style=${`--columns:${Math.min(t.length, 5)}`}
      >
        ${t.map((i) => {
      const r = Be[i] ?? {
        icon: "mdi:bookmark-outline",
        color: "#64748b"
      }, n = this._translateValue(i);
      return l`
            <button
              class=${s === i ? "active" : ""}
              style=${`--button-color:${r.color}`}
              title=${n}
              aria-label=${n}
              @click=${() => this._setPreset(i)}
            >
              <ha-icon class="preset-icon" icon=${r.icon}></ha-icon>
              <span class="button-label">${n}</span>
            </button>
          `;
    })}
      </div>
    `;
  }
  _renderConsumption() {
    if (!this._config.show_consumption || !this._config.power_entity)
      return h;
    const e = this.hass.states[this._config.power_entity], t = Number(e?.state), s = Number.isFinite(t) && t > 20, i = String(e?.attributes.unit_of_measurement ?? ""), r = Number.isFinite(t) ? t : 0, n = Math.min(1, Math.max(0, (r - 20) / 1480)), c = Math.round(120 * (1 - n)), a = this.hass.themes?.darkMode === !0, p = r <= 20 ? a ? "#374151" : "#d1d5db" : a ? `hsl(${c} 62% 28%)` : `hsl(${c} 72% 78%)`;
    return l`
      <div
        class="consumption ${s ? "active" : ""} ${a ? "dark" : ""}"
        style=${`--consumption-background:${p}`}
      >
        <span class="consumption-icon">⚡</span>
        <span class="consumption-label">
          ${this._renderMatrixWord(this._t("consumption").toUpperCase())}
        </span>
        <span class="consumption-value">
          ${e ? l`${this._renderLcdNumber(e.state)}
                <span class="consumption-unit">${i}</span>` : l`<span class="unavailable">${this._t("unavailable")}</span>`}
        </span>
      </div>
    `;
  }
  _renderLcdNumber(e) {
    const t = Number(e), s = Number.isFinite(t) ? String(Math.round(t * 10) / 10) : "--";
    return l`
      <span class="lcd-display lcd-number">
        ${[...s].map(
      (i) => i === "." ? l`<i class="lcd-dot"></i>` : this._renderDigit(i)
    )}
      </span>
    `;
  }
  _renderMatrixWord(e) {
    return l`
      <span class="matrix-word">
        ${[...e].map(
      (t) => t === " " ? l`<span class="matrix-space"></span>` : this._renderMatrixChar(t)
    )}
      </span>
    `;
  }
  async _setHvacMode(e) {
    await this.hass.callService("climate", "set_hvac_mode", {
      entity_id: this._config.entity,
      hvac_mode: e
    });
  }
  async _setPreset(e) {
    await this.hass.callService("climate", "set_preset_mode", {
      entity_id: this._config.entity,
      preset_mode: e
    });
  }
  async _step(e, t) {
    const s = Number(e.attributes.temperature);
    if (!Number.isFinite(s))
      return;
    const i = Number(this._config.temperature_step), r = Number(e.attributes.target_temp_step), n = Number.isFinite(i) ? i : Number.isFinite(r) ? r : 0.5, c = Math.round((s + t * n) * 10) / 10;
    await this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: c
    });
  }
  _stringArray(e) {
    return Array.isArray(e) ? e.filter((t) => typeof t == "string") : [];
  }
  _humanize(e) {
    return e.replaceAll("_", " ").replace(/\b\w/g, (t) => t.toUpperCase());
  }
  _language() {
    const e = this._config.language ?? "auto", t = e === "auto" ? String(this.hass.locale?.language ?? "en").toLowerCase().split("-")[0] : e;
    return t in O ? t : "en";
  }
  _t(e) {
    return O[this._language()][e] ?? O.en[e];
  }
  _translateValue(e) {
    return e in O.en ? this._t(e) : this._humanize(e);
  }
  _scheduleLabelSync() {
    this._labelSyncFrame !== void 0 && cancelAnimationFrame(this._labelSyncFrame), this._labelSyncFrame = requestAnimationFrame(() => {
      this._labelSyncFrame = void 0, this._syncAutoLabels();
    });
  }
  _syncAutoLabels() {
    this.renderRoot.querySelectorAll(".button-grid.label-auto").forEach((e) => {
      const s = [...e.querySelectorAll("button")].some((i) => {
        const r = i.querySelector(".button-label");
        if (!r)
          return !1;
        const n = i.getBoundingClientRect().width - 20;
        return r.scrollWidth > n;
      });
      e.classList.toggle("labels-compact", s);
    });
  }
};
U.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 }
}, U.styles = Le;
let D = U;
customElements.get("thermomatrix-card") || customElements.define("thermomatrix-card", D);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "thermomatrix-card",
  name: "ThermoMatrix Card",
  description: "Termostato LCD modulare per entità climate",
  preview: !0,
  getEntitySuggestion: (o, e) => e.startsWith("climate.") ? {
    entity: e,
    show_presets: !0,
    border_mode: "state"
  } : null
});
console.info(
  `%c THERMOMATRIX-CARD %c v${De} `,
  "color:white;background:#172554;font-weight:700",
  "color:#172554;background:#bfdbfe"
);
export {
  D as ThermoMatrixCard
};
