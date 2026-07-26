const N = globalThis, I = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, L = /* @__PURE__ */ Symbol(), F = /* @__PURE__ */ new WeakMap();
let st = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== L) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (I && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = F.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && F.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const lt = (o) => new st(typeof o == "string" ? o : o + "", void 0, L), ct = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((s, r, i) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + o[i + 1], o[0]);
  return new st(e, o, L);
}, dt = (o, t) => {
  if (I) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = N.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, o.appendChild(s);
  }
}, V = I ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return lt(e);
})(o) : o;
const { is: ht, defineProperty: pt, getOwnPropertyDescriptor: ut, getOwnPropertyNames: mt, getOwnPropertySymbols: gt, getPrototypeOf: bt } = Object, U = globalThis, q = U.trustedTypes, ft = q ? q.emptyScript : "", _t = U.reactiveElementPolyfillSupport, w = (o, t) => o, z = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? ft : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, rt = (o, t) => !ht(o, t), G = { attribute: !0, type: String, converter: z, reflect: !1, useDefault: !1, hasChanged: rt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), U.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let y = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = G) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && pt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: i } = ut(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const l = r?.call(this);
      i?.call(this, n), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? G;
  }
  static _$Ei() {
    if (this.hasOwnProperty(w("elementProperties"))) return;
    const t = bt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(w("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(w("properties"))) {
      const e = this.properties, s = [...mt(e), ...gt(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(V(r));
    } else t !== void 0 && e.push(V(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return dt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const i = (s.converter?.toAttribute !== void 0 ? s.converter : z).toAttribute(e, s.type);
      this._$Em = t, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const i = s.getPropertyOptions(r), n = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : z;
      this._$Em = r;
      const l = n.fromAttribute(e, i.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, i) {
    if (t !== void 0) {
      const n = this.constructor;
      if (r === !1 && (i = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? rt)(i, e) || s.useDefault && s.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: i }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), i !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, i] of this._$Ep) this[r] = i;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, i] of s) {
        const { wrapped: n } = i, l = this[r];
        n !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, i, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[w("elementProperties")] = /* @__PURE__ */ new Map(), y[w("finalized")] = /* @__PURE__ */ new Map(), _t?.({ ReactiveElement: y }), (U.reactiveElementVersions ??= []).push("2.1.2");
const j = globalThis, K = (o) => o, T = j.trustedTypes, Z = T ? T.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, it = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, ot = "?" + b, $t = `<${ot}>`, $ = document, S = () => $.createComment(""), C = (o) => o === null || typeof o != "object" && typeof o != "function", B = Array.isArray, yt = (o) => B(o) || typeof o?.[Symbol.iterator] == "function", R = `[ 	
\f\r]`, A = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, J = /-->/g, X = />/g, f = RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Q = /'/g, Y = /"/g, nt = /^(?:script|style|textarea|title)$/i, xt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), p = xt(1), x = /* @__PURE__ */ Symbol.for("lit-noChange"), d = /* @__PURE__ */ Symbol.for("lit-nothing"), tt = /* @__PURE__ */ new WeakMap(), _ = $.createTreeWalker($, 129);
function at(o, t) {
  if (!B(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Z !== void 0 ? Z.createHTML(t) : t;
}
const vt = (o, t) => {
  const e = o.length - 1, s = [];
  let r, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = A;
  for (let l = 0; l < e; l++) {
    const a = o[l];
    let h, u, c = -1, m = 0;
    for (; m < a.length && (n.lastIndex = m, u = n.exec(a), u !== null); ) m = n.lastIndex, n === A ? u[1] === "!--" ? n = J : u[1] !== void 0 ? n = X : u[2] !== void 0 ? (nt.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = f) : u[3] !== void 0 && (n = f) : n === f ? u[0] === ">" ? (n = r ?? A, c = -1) : u[1] === void 0 ? c = -2 : (c = n.lastIndex - u[2].length, h = u[1], n = u[3] === void 0 ? f : u[3] === '"' ? Y : Q) : n === Y || n === Q ? n = f : n === J || n === X ? n = A : (n = f, r = void 0);
    const g = n === f && o[l + 1].startsWith("/>") ? " " : "";
    i += n === A ? a + $t : c >= 0 ? (s.push(h), a.slice(0, c) + it + a.slice(c) + b + g) : a + b + (c === -2 ? l : g);
  }
  return [at(o, i + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class k {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let i = 0, n = 0;
    const l = t.length - 1, a = this.parts, [h, u] = vt(t, e);
    if (this.el = k.createElement(h, s), _.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = _.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(it)) {
          const m = u[n++], g = r.getAttribute(c).split(b), P = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: i, name: P[2], strings: g, ctor: P[1] === "." ? wt : P[1] === "?" ? Et : P[1] === "@" ? St : H }), r.removeAttribute(c);
        } else c.startsWith(b) && (a.push({ type: 6, index: i }), r.removeAttribute(c));
        if (nt.test(r.tagName)) {
          const c = r.textContent.split(b), m = c.length - 1;
          if (m > 0) {
            r.textContent = T ? T.emptyScript : "";
            for (let g = 0; g < m; g++) r.append(c[g], S()), _.nextNode(), a.push({ type: 2, index: ++i });
            r.append(c[m], S());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ot) a.push({ type: 2, index: i });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(b, c + 1)) !== -1; ) a.push({ type: 7, index: i }), c += b.length - 1;
      }
      i++;
    }
  }
  static createElement(t, e) {
    const s = $.createElement("template");
    return s.innerHTML = t, s;
  }
}
function v(o, t, e = o, s) {
  if (t === x) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const i = C(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== i && (r?._$AO?.(!1), i === void 0 ? r = void 0 : (r = new i(o), r._$AT(o, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r), r !== void 0 && (t = v(o, r._$AS(o, t.values), r, s)), t;
}
class At {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? $).importNode(e, !0);
    _.currentNode = r;
    let i = _.nextNode(), n = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let h;
        a.type === 2 ? h = new M(i, i.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(i, a.name, a.strings, this, t) : a.type === 6 && (h = new Ct(i, this, t)), this._$AV.push(h), a = s[++l];
      }
      n !== a?.index && (i = _.nextNode(), n++);
    }
    return _.currentNode = $, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class M {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = v(this, t, e), C(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : yt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && C(this._$AH) ? this._$AA.nextSibling.data = t : this.T($.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = k.createElement(at(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const i = new At(r, this), n = i.u(this.options);
      i.p(e), this.T(n), this._$AH = i;
    }
  }
  _$AC(t) {
    let e = tt.get(t.strings);
    return e === void 0 && tt.set(t.strings, e = new k(t)), e;
  }
  k(t) {
    B(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const i of t) r === e.length ? e.push(s = new M(this.O(S()), this.O(S()), this, this.options)) : s = e[r], s._$AI(i), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = K(t).nextSibling;
      K(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, i) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = i, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, r) {
    const i = this.strings;
    let n = !1;
    if (i === void 0) t = v(this, t, e, 0), n = !C(t) || t !== this._$AH && t !== x, n && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = i[0], a = 0; a < i.length - 1; a++) h = v(this, l[s + a], e, a), h === x && (h = this._$AH[a]), n ||= !C(h) || h !== this._$AH[a], h === d ? t = d : t !== d && (t += (h ?? "") + i[a + 1]), this._$AH[a] = h;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class wt extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Et extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class St extends H {
  constructor(t, e, s, r, i) {
    super(t, e, s, r, i), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = v(this, t, e, 0) ?? d) === x) return;
    const s = this._$AH, r = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, i = t !== d && (s === d || r);
    r && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ct {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    v(this, t);
  }
}
const kt = j.litHtmlPolyfillSupport;
kt?.(k, M), (j.litHtmlVersions ??= []).push("3.3.3");
const Mt = (o, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const i = e?.renderBefore ?? null;
    s._$litPart$ = r = new M(t.insertBefore(S(), i), i, void 0, e ?? {});
  }
  return r._$AI(o), r;
};
const W = globalThis;
class E extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Mt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return x;
  }
}
E._$litElement$ = !0, E.finalized = !0, W.litElementHydrateSupport?.({ LitElement: E });
const Pt = W.litElementPolyfillSupport;
Pt?.({ LitElement: E });
(W.litElementVersions ??= []).push("4.2.2");
const Nt = ct`
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

  .status-stack {
    position: relative;
    left: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .status-box {
    width: 50px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid currentColor;
    border-radius: 3px;
    box-sizing: border-box;
    opacity: 0.24;
  }

  .status-box.active {
    background: color-mix(in srgb, currentColor 13%, transparent);
    box-shadow: inset 0 0 0 1px currentColor,
      0 0 8px color-mix(in srgb, currentColor 42%, transparent);
    opacity: 1;
  }

  .status-box.active.blink .matrix-word {
    animation: status-text-blink 1.15s ease-in-out infinite;
  }

  @keyframes status-text-blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.22;
    }
  }

  .matrix-word {
    display: inline-flex;
    gap: 2px;
  }

  .matrix-char {
    display: grid;
    grid-template-columns: repeat(5, 1.4px);
    grid-template-rows: repeat(7, 1.4px);
    gap: 0.55px;
  }

  .matrix-pixel {
    width: 1.4px;
    height: 1.4px;
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
    min-height: 40px;
    border-width: 1px;
    border-radius: 10px;
    background: color-mix(
      in srgb,
      var(--primary-text-color) 8%,
      transparent
    );
    box-shadow: none;
    font-size: 24px;
  }

  .consumption {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 8px;
    align-items: center;
    min-height: 46px;
    padding: 0 14px;
    border: 2px solid var(--tm-neutral-border);
    border-radius: 14px;
    box-sizing: border-box;
    font-size: 12px;
    font-weight: 700;
  }

  .consumption.active {
    border-color: #0ea5e9;
    background: rgba(14, 165, 233, 0.22);
    box-shadow: 0 0 12px rgba(14, 165, 233, 0.42);
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
`, Tt = "0.1.0", Ot = /* @__PURE__ */ new Set(["heating", "cooling", "drying", "fan"]), et = {
  off: { label: "Spento", icon: "⏻", color: "#94a3b8" },
  heat: { label: "Caldo", icon: "♨", color: "#f97316" },
  cool: { label: "Freddo", icon: "❄", color: "#1d4ed8" },
  dry: { label: "Dry", icon: "◉", color: "#10b981" },
  fan_only: { label: "Ventola", icon: "✣", color: "#0891b2" },
  auto: { label: "Auto", icon: "A", color: "#8b5cf6" },
  heat_cool: { label: "Auto", icon: "↕", color: "#8b5cf6" }
}, Ut = {
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
}, Ht = {
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"]
}, Rt = {
  none: { label: "Manuale", color: "#c026d3" },
  home: { label: "Home", color: "#1d4ed8" },
  away: { label: "Away", color: "#94a3b8" },
  sleep: { label: "Sleep", color: "#8b5cf6" },
  comfort: { label: "Comfort", color: "#10b981" },
  eco: { label: "Eco", color: "#16a34a" }
}, O = class O extends E {
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
          name: "border_mode",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "state", label: "Colorato secondo lo stato" },
                { value: "neutral", label: "Neutro" }
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
      computeLabel: (t) => ({
        entity: "Climatizzatore",
        name: "Nome personalizzato",
        show_presets: "Mostra preset",
        show_consumption: "Mostra consumo",
        power_entity: "Sensore di consumo",
        border_mode: "Bordo della card",
        temperature_step: "Incremento temperatura"
      })[t.name ?? ""] ?? t.name,
      computeHelper: (t) => t.name === "power_entity" ? "Usato soltanto quando il modulo consumo è attivo." : void 0
    };
  }
  static getStubConfig(t, e) {
    return {
      entity: e.find((r) => r.startsWith("climate.")) ?? Object.keys(t.states).find(
        (r) => r.startsWith("climate.")
      ) ?? "",
      show_presets: !0,
      show_consumption: !1,
      border_mode: "state"
    };
  }
  setConfig(t) {
    if (!t?.entity)
      throw new Error("ThermoMatrix Card richiede un'entità climate.");
    if (!t.entity.startsWith("climate."))
      throw new Error("L'entità configurata deve appartenere al dominio climate.");
    this._config = {
      ...t,
      show_presets: t.show_presets ?? !0,
      show_consumption: t.show_consumption ?? !1,
      border_mode: t.border_mode ?? "state"
    };
  }
  getCardSize() {
    return this._config?.show_consumption ? 9 : 8;
  }
  render() {
    if (!this.hass || !this._config)
      return p`<ha-card><div class="warning">Caricamento…</div></ha-card>`;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return p`<ha-card>
        <div class="warning">
          Entità ${this._config.entity} non disponibile
        </div>
      </ha-card>`;
    const e = t.state, s = et[e]?.color ?? "#94a3b8", r = this._config.border_mode === "state", i = r && e !== "off" ? `0 0 18px color-mix(in srgb, ${s} 58%, transparent)` : "0 4px 14px rgba(0,0,0,0.10)";
    return p`
      <ha-card
        style=${`--tm-border-color:${r ? s : "var(--tm-neutral-border)"};--tm-card-shadow:${i};`}
      >
        <div class="layout">
          ${this._renderModes(t)} ${this._renderDisplay(t)}
          ${this._renderTemperatureControls(t)}
          ${this._renderPresets(t)}
          ${this._renderConsumption()}
          <div class="brand">
            ${this._config.name ?? t.attributes.friendly_name ?? "ThermoMatrix"}
          </div>
        </div>
      </ha-card>
    `;
  }
  _renderModes(t) {
    const e = this._stringArray(t.attributes.hvac_modes), s = e.length > 0 ? e : [t.state];
    return p`
      <div
        class="button-grid"
        style=${`--columns:${Math.min(s.length, 5)}`}
      >
        ${s.map((r) => {
      const i = et[r] ?? {
        label: this._humanize(r),
        icon: "●",
        color: "#64748b"
      };
      return p`
            <button
              class="mode-button ${t.state === r ? "active" : ""}"
              style=${`--button-color:${i.color}`}
              title=${`Imposta ${i.label}`}
              @click=${() => this._setHvacMode(r)}
            >
              <span class="mode-icon">${i.icon}</span>
              ${i.label}
            </button>
          `;
    })}
      </div>
    `;
  }
  _renderDisplay(t) {
    const e = t.state, s = String(t.attributes.hvac_action ?? ""), r = Ot.has(s), i = e !== "off" && s === "idle", n = e === "off", l = this.hass.themes?.darkMode === !0, h = (l ? {
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
    })[e] ?? (l ? "#334155" : "#cbd5e1");
    return p`
      <div
        class="lcd-panel ${l ? "dark" : ""}"
        style=${`--lcd-background:${h}`}
      >
        <div class="lcd-values">
          <div class="lcd-reading current">
            <span class="lcd-reading-label">AMBIENTE</span>
            ${this._renderTemperature(t.attributes.current_temperature)}
          </div>
          <div class="status-stack">
            ${this._renderStatus("ON", r, !0)}
            ${this._renderStatus("IDLE", i, !0)}
            ${this._renderStatus("OFF", n, !1)}
          </div>
          <div class="lcd-reading target">
            <span class="lcd-reading-label">TARGET</span>
            ${this._renderTemperature(t.attributes.temperature)}
          </div>
        </div>
      </div>
    `;
  }
  _renderTemperature(t) {
    const e = Number(t), s = Number.isFinite(e) ? e.toFixed(1) : "--";
    return p`
      <span class="lcd-display">
        ${[...s].map(
      (r) => r === "." ? p`<i class="lcd-dot"></i>` : this._renderDigit(r)
    )}
        <i class="lcd-degree"></i>
      </span>
    `;
  }
  _renderDigit(t) {
    const e = Ut[t] ?? "";
    return p`
      <span class="lcd-digit">
        ${[..."abcdefg"].map(
      (s) => p`<i
              class="lcd-segment ${s} ${e.includes(s) ? "on" : ""}"
            ></i>`
    )}
      </span>
    `;
  }
  _renderStatus(t, e, s) {
    return p`
      <span class="status-box ${e ? "active" : ""} ${e && s ? "blink" : ""}">
        <span class="matrix-word">
          ${[...t].map((r) => this._renderMatrixChar(r))}
        </span>
      </span>
    `;
  }
  _renderMatrixChar(t) {
    const e = (Ht[t] ?? Array(7).fill("00000")).join("");
    return p`
      <span class="matrix-char">
        ${[...e].map(
      (s) => p`<i class="matrix-pixel ${s === "1" ? "on" : ""}"></i>`
    )}
      </span>
    `;
  }
  _renderTemperatureControls(t) {
    return p`
      <div class="temperature-controls">
        <button title="Diminuisci temperatura" @click=${() => this._step(t, -1)}>
          −
        </button>
        <button title="Aumenta temperatura" @click=${() => this._step(t, 1)}>
          +
        </button>
      </div>
    `;
  }
  _renderPresets(t) {
    if (!this._config.show_presets)
      return d;
    const e = this._stringArray(t.attributes.preset_modes);
    if (e.length === 0)
      return d;
    const s = String(t.attributes.preset_mode ?? "");
    return p`
      <div
        class="button-grid"
        style=${`--columns:${Math.min(e.length, 5)}`}
      >
        ${e.map((r) => {
      const i = Rt[r] ?? {
        label: this._humanize(r),
        color: "#64748b"
      };
      return p`
            <button
              class=${s === r ? "active" : ""}
              style=${`--button-color:${i.color}`}
              @click=${() => this._setPreset(r)}
            >
              ${i.label}
            </button>
          `;
    })}
      </div>
    `;
  }
  _renderConsumption() {
    if (!this._config.show_consumption || !this._config.power_entity)
      return d;
    const t = this.hass.states[this._config.power_entity], e = Number(t?.state), s = Number.isFinite(e) && e > 5, r = String(t?.attributes.unit_of_measurement ?? "");
    return p`
      <div class="consumption ${s ? "active" : ""}">
        <span>⚡</span>
        <span>Consumo attuale</span>
        <span>${t ? `${t.state} ${r}`.trim() : "Non disponibile"}</span>
      </div>
    `;
  }
  async _setHvacMode(t) {
    await this.hass.callService("climate", "set_hvac_mode", {
      entity_id: this._config.entity,
      hvac_mode: t
    });
  }
  async _setPreset(t) {
    await this.hass.callService("climate", "set_preset_mode", {
      entity_id: this._config.entity,
      preset_mode: t
    });
  }
  async _step(t, e) {
    const s = Number(t.attributes.temperature);
    if (!Number.isFinite(s))
      return;
    const r = Number(this._config.temperature_step), i = Number(t.attributes.target_temp_step), n = Number.isFinite(r) ? r : Number.isFinite(i) ? i : 0.5, l = Math.round((s + e * n) * 10) / 10;
    await this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: l
    });
  }
  _stringArray(t) {
    return Array.isArray(t) ? t.filter((e) => typeof e == "string") : [];
  }
  _humanize(t) {
    return t.replaceAll("_", " ").replace(/\b\w/g, (e) => e.toUpperCase());
  }
};
O.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 }
}, O.styles = Nt;
let D = O;
customElements.get("thermomatrix-card") || customElements.define("thermomatrix-card", D);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "thermomatrix-card",
  name: "ThermoMatrix Card",
  description: "Termostato LCD modulare per entità climate",
  preview: !0,
  getEntitySuggestion: (o, t) => t.startsWith("climate.") ? {
    entity: t,
    show_presets: !0,
    border_mode: "state"
  } : null
});
console.info(
  `%c THERMOMATRIX-CARD %c v${Tt} `,
  "color:white;background:#172554;font-weight:700",
  "color:#172554;background:#bfdbfe"
);
export {
  D as ThermoMatrixCard
};
//# sourceMappingURL=thermomatrix-card.js.map
