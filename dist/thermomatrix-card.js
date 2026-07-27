const P = globalThis, D = P.ShadowRoot && (P.ShadyCSS === void 0 || P.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = /* @__PURE__ */ Symbol(), V = /* @__PURE__ */ new WeakMap();
let ot = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== F) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (D && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = V.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && V.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ht = (r) => new ot(typeof r == "string" ? r : r + "", void 0, F), pt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new ot(e, r, F);
}, ut = (r, t) => {
  if (D) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = P.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, q = D ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ht(e);
})(r) : r;
const { is: mt, defineProperty: bt, getOwnPropertyDescriptor: gt, getOwnPropertyNames: ft, getOwnPropertySymbols: _t, getPrototypeOf: $t } = Object, R = globalThis, G = R.trustedTypes, xt = G ? G.emptyScript : "", yt = R.reactiveElementPolyfillSupport, A = (r, t) => r, L = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? xt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, nt = (r, t) => !mt(r, t), K = { attribute: !0, type: String, converter: L, reflect: !1, useDefault: !1, hasChanged: nt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), R.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = K) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && bt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = gt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const c = i?.call(this);
      o?.call(this, n), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? K;
  }
  static _$Ei() {
    if (this.hasOwnProperty(A("elementProperties"))) return;
    const t = $t(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(A("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(A("properties"))) {
      const e = this.properties, s = [...ft(e), ..._t(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(q(i));
    } else t !== void 0 && e.push(q(t));
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
    return ut(t, this.constructor.elementStyles), t;
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
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : L).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : L;
      this._$Em = i;
      const c = n.fromAttribute(e, o.type);
      this[i] = c ?? this._$Ej?.get(i) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (o = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? nt)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: o }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, o] of s) {
        const { wrapped: n } = o, c = this[i];
        n !== !0 || this._$AL.has(i) || c === void 0 || this.C(i, void 0, o, c);
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
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[A("elementProperties")] = /* @__PURE__ */ new Map(), x[A("finalized")] = /* @__PURE__ */ new Map(), yt?.({ ReactiveElement: x }), (R.reactiveElementVersions ??= []).push("2.1.2");
const W = globalThis, Y = (r) => r, T = W.trustedTypes, Z = T ? T.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, at = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, lt = "?" + g, vt = `<${lt}>`, $ = document, S = () => $.createComment(""), C = (r) => r === null || typeof r != "object" && typeof r != "function", B = Array.isArray, wt = (r) => B(r) || typeof r?.[Symbol.iterator] == "function", H = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, J = /-->/g, X = />/g, f = RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Q = /'/g, tt = /"/g, ct = /^(?:script|style|textarea|title)$/i, At = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), l = At(1), y = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), et = /* @__PURE__ */ new WeakMap(), _ = $.createTreeWalker($, 129);
function dt(r, t) {
  if (!B(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Z !== void 0 ? Z.createHTML(t) : t;
}
const Et = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = w;
  for (let c = 0; c < e; c++) {
    const a = r[c];
    let h, u, d = -1, m = 0;
    for (; m < a.length && (n.lastIndex = m, u = n.exec(a), u !== null); ) m = n.lastIndex, n === w ? u[1] === "!--" ? n = J : u[1] !== void 0 ? n = X : u[2] !== void 0 ? (ct.test(u[2]) && (i = RegExp("</" + u[2], "g")), n = f) : u[3] !== void 0 && (n = f) : n === f ? u[0] === ">" ? (n = i ?? w, d = -1) : u[1] === void 0 ? d = -2 : (d = n.lastIndex - u[2].length, h = u[1], n = u[3] === void 0 ? f : u[3] === '"' ? tt : Q) : n === tt || n === Q ? n = f : n === J || n === X ? n = w : (n = f, i = void 0);
    const b = n === f && r[c + 1].startsWith("/>") ? " " : "";
    o += n === w ? a + vt : d >= 0 ? (s.push(h), a.slice(0, d) + at + a.slice(d) + g + b) : a + g + (d === -2 ? c : b);
  }
  return [dt(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class k {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const c = t.length - 1, a = this.parts, [h, u] = Et(t, e);
    if (this.el = k.createElement(h, s), _.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = _.nextNode()) !== null && a.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(at)) {
          const m = u[n++], b = i.getAttribute(d).split(g), N = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: o, name: N[2], strings: b, ctor: N[1] === "." ? Ct : N[1] === "?" ? kt : N[1] === "@" ? Mt : z }), i.removeAttribute(d);
        } else d.startsWith(g) && (a.push({ type: 6, index: o }), i.removeAttribute(d));
        if (ct.test(i.tagName)) {
          const d = i.textContent.split(g), m = d.length - 1;
          if (m > 0) {
            i.textContent = T ? T.emptyScript : "";
            for (let b = 0; b < m; b++) i.append(d[b], S()), _.nextNode(), a.push({ type: 2, index: ++o });
            i.append(d[m], S());
          }
        }
      } else if (i.nodeType === 8) if (i.data === lt) a.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(g, d + 1)) !== -1; ) a.push({ type: 7, index: o }), d += g.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = $.createElement("template");
    return s.innerHTML = t, s;
  }
}
function v(r, t, e = r, s) {
  if (t === y) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = C(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = v(r, i._$AS(r, t.values), i, s)), t;
}
class St {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? $).importNode(e, !0);
    _.currentNode = i;
    let o = _.nextNode(), n = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let h;
        a.type === 2 ? h = new M(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new Nt(o, this, t)), this._$AV.push(h), a = s[++c];
      }
      n !== a?.index && (o = _.nextNode(), n++);
    }
    return _.currentNode = $, i;
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
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = v(this, t, e), C(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== y && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : wt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && C(this._$AH) ? this._$AA.nextSibling.data = t : this.T($.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = k.createElement(dt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const o = new St(i, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = et.get(t.strings);
    return e === void 0 && et.set(t.strings, e = new k(t)), e;
  }
  k(t) {
    B(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new M(this.O(S()), this.O(S()), this, this.options)) : s = e[i], s._$AI(o), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Y(t).nextSibling;
      Y(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = v(this, t, e, 0), n = !C(t) || t !== this._$AH && t !== y, n && (this._$AH = t);
    else {
      const c = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++) h = v(this, c[s + a], e, a), h === y && (h = this._$AH[a]), n ||= !C(h) || h !== this._$AH[a], h === p ? t = p : t !== p && (t += (h ?? "") + o[a + 1]), this._$AH[a] = h;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ct extends z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class kt extends z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Mt extends z {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = v(this, t, e, 0) ?? p) === y) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Nt {
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
const Ot = W.litHtmlPolyfillSupport;
Ot?.(k, M), (W.litHtmlVersions ??= []).push("3.3.3");
const Pt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = i = new M(t.insertBefore(S(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
const j = globalThis;
let E = class extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Pt(e, this.renderRoot, this.renderOptions);
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
E._$litElement$ = !0, E.finalized = !0, j.litElementHydrateSupport?.({ LitElement: E });
const Tt = j.litElementPolyfillSupport;
Tt?.({ LitElement: E });
(j.litElementVersions ??= []).push("4.2.2");
const Ut = (r) => (...t) => ({ _$litDirective$: r, values: t });
let Rt = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
const zt = {}, Ht = (r, t = zt) => r._$AH = t;
const st = Ut(class extends Rt {
  constructor() {
    super(...arguments), this.key = p;
  }
  render(r, t) {
    return this.key = r, t;
  }
  update(r, [t, e]) {
    return t !== this.key && (Ht(r), this.key = t), e;
  }
}), Lt = pt`
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
    animation: wheel-roll 5s cubic-bezier(0.16, 0.72, 0.22, 1)
      var(--wheel-delay) both;
    will-change: transform;
  }

  .wheel-strip > i {
    display: flex;
    width: 100%;
    height: 14px;
    flex: 0 0 14px;
    align-items: center;
    justify-content: center;
    font-style: normal;
    opacity: 0.28;
  }

  .wheel-strip > i.selected {
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
    .external-status-slide,
    .status-box.active.blink .matrix-word {
      animation: none;
    }
  }
`, It = "0.4.2", Dt = /* @__PURE__ */ new Set(["heating", "cooling", "drying", "fan"]), it = ["-", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"], rt = {
  off: { icon: "mdi:power", color: "#94a3b8" },
  heat: { icon: "mdi:fire", color: "#f97316" },
  cool: { icon: "mdi:snowflake", color: "#1d4ed8" },
  dry: { icon: "mdi:water-percent", color: "#10b981" },
  fan_only: { icon: "mdi:fan", color: "#0891b2" },
  auto: { icon: "mdi:thermostat-auto", color: "#8b5cf6" },
  heat_cool: { icon: "mdi:autorenew", color: "#8b5cf6" }
}, Ft = {
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
}, Wt = {
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
}, Bt = {
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
          name: "status_display",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "wheel", label: "Alphabet wheel" },
                { value: "indicators", label: "ON / IDLE / OFF indicators" }
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
        status_display: "Status display",
        temperature_step: "Temperature step"
      })[t.name ?? ""] ?? t.name,
      computeHelper: (t) => t.name === "power_entity" ? "Used only when the power module is enabled." : t.name === "status_entity" ? "Optional. Replaces ON, IDLE and OFF inside the LCD." : void 0
    };
  }
  static getStubConfig(t, e) {
    return {
      entity: e.find((i) => i.startsWith("climate.")) ?? Object.keys(t.states).find(
        (i) => i.startsWith("climate.")
      ) ?? "",
      show_presets: !0,
      show_consumption: !1,
      border_mode: "state",
      language: "auto",
      hvac_button_labels: "auto",
      preset_button_labels: "auto",
      status_display: "wheel"
    };
  }
  setConfig(t) {
    if (!t?.entity)
      throw new Error("ThermoMatrix Card requires a climate entity.");
    if (!t.entity.startsWith("climate."))
      throw new Error("The configured entity must use the climate domain.");
    this._config = {
      ...t,
      show_presets: t.show_presets ?? !0,
      show_consumption: t.show_consumption ?? !1,
      border_mode: t.border_mode ?? "state",
      language: t.language ?? "auto",
      hvac_button_labels: t.hvac_button_labels ?? "auto",
      preset_button_labels: t.preset_button_labels ?? "auto",
      status_display: t.status_display ?? "wheel"
    };
  }
  firstUpdated() {
    this._labelResizeObserver = new ResizeObserver(
      () => this._scheduleLabelSync()
    ), this._labelResizeObserver.observe(this), this._scheduleLabelSync();
  }
  updated(t) {
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
    const t = this.hass.states[this._config.entity];
    if (!t)
      return l`<ha-card>
        <div class="warning">
          ${this._config.entity}: ${this._t("unavailable")}
        </div>
      </ha-card>`;
    const e = t.state, s = rt[e]?.color ?? "#94a3b8", i = this._config.border_mode === "state", o = i && e !== "off" ? `0 0 18px color-mix(in srgb, ${s} 58%, transparent)` : "0 4px 14px rgba(0,0,0,0.10)";
    return l`
      <ha-card
        style=${`--tm-border-color:${i ? s : "var(--tm-neutral-border)"};--tm-card-shadow:${o};`}
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
    return l`
      <div
        class="button-grid button-grid-modes label-${this._config.hvac_button_labels ?? "auto"}"
        style=${`--columns:${Math.min(s.length, 5)}`}
      >
        ${s.map((i) => {
      const o = rt[i] ?? {
        icon: "mdi:radiobox-blank",
        color: "#64748b"
      }, n = this._translateValue(i);
      return l`
            <button
              class="mode-button ${t.state === i ? "active" : ""}"
              style=${`--button-color:${o.color}`}
              title=${n}
              aria-label=${n}
              @click=${() => this._setHvacMode(i)}
            >
              <ha-icon class="mode-icon" icon=${o.icon}></ha-icon>
              <span class="button-label">${n}</span>
            </button>
          `;
    })}
      </div>
    `;
  }
  _renderDisplay(t) {
    const e = t.state, s = String(t.attributes.hvac_action ?? ""), i = e === "off" ? "OFF" : s === "idle" ? "IDLE" : (Dt.has(s), "ON"), o = i === "ON", n = i === "IDLE", c = i === "OFF", a = this._config.status_entity ? this.hass.states[this._config.status_entity] : void 0, h = this.hass.themes?.darkMode === !0, d = (h ? {
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
    })[e] ?? (h ? "#334155" : "#cbd5e1");
    return l`
      <div
        class="lcd-panel ${h ? "dark" : ""}"
        style=${`--lcd-background:${d}`}
      >
        <div class="lcd-values ${this._config.status_entity ? "external" : ""}">
          <div class="lcd-reading current">
            <span class="lcd-reading-label">${this._t("environment")}</span>
            ${this._renderTemperature(t.attributes.current_temperature)}
          </div>
          ${this._config.status_entity ? p : this._config.status_display === "indicators" ? l`
                  <div class="status-stack">
                    ${this._renderStatusIndicator("ON", o, !0)}
                    ${this._renderStatusIndicator("IDLE", n, !0)}
                    ${this._renderStatusIndicator("OFF", c, !1)}
                  </div>
                ` : l`${this._renderStatusWheel(i)}`}
          <div class="lcd-reading target">
            <span class="lcd-reading-label">${this._t("target")}</span>
            ${this._renderTemperature(t.attributes.temperature)}
          </div>
        </div>
        ${this._config.status_entity ? l`
              <div
                class="lcd-external-status"
                title=${a ? this._humanize(a.state) : this._t("unavailable")}
              >
                ${this._renderExternalStatus(
      a ? this._humanize(a.state).toUpperCase() : this._t("unavailable").toUpperCase()
    )}
              </div>
            ` : p}
      </div>
    `;
  }
  _renderTemperature(t) {
    const e = Number(t), s = Number.isFinite(e) ? e.toFixed(1) : "--";
    return l`
      <span class="lcd-display">
        ${[...s].map(
      (i) => i === "." ? l`<i class="lcd-dot"></i>` : this._renderDigit(i)
    )}
        <i class="lcd-degree"></i>
      </span>
    `;
  }
  _renderDigit(t) {
    const e = Ft[t] ?? "";
    return l`
      <span class="lcd-digit">
        ${[..."abcdefg"].map(
      (s) => l`<i
              class="lcd-segment ${s} ${e.includes(s) ? "on" : ""}"
            ></i>`
    )}
      </span>
    `;
  }
  _renderStatusWheel(t) {
    return l`
      <div class="status-wheel" role="status" aria-label=${t}>
        ${[...t === "IDLE" ? t : t === "OFF" ? "-OFF" : "--ON"].map(
      (s, i) => st(
        `${t}-${i}`,
        this._renderWheelReel(s, i)
      )
    )}
      </div>
    `;
  }
  _renderStatusIndicator(t, e, s) {
    return l`
      <span class="status-box ${e ? "active" : ""} ${e && s ? "blink" : ""}">
        <span class="matrix-word">
          ${[...t].map((i) => this._renderMatrixChar(i))}
        </span>
      </span>
    `;
  }
  _renderWheelReel(t, e) {
    const s = Math.max(0, it.indexOf(t));
    return l`
      <span class="wheel-window" aria-hidden="true">
        <span
          class="wheel-strip"
          style=${`--wheel-offset:${6 - s * 14}px;--wheel-delay:${e * 55}ms`}
        >
          ${it.map(
      (i) => l`<i class=${i === t ? "selected" : ""}>
                ${this._renderMatrixChar(i)}
              </i>`
    )}
        </span>
      </span>
    `;
  }
  _renderExternalStatus(t) {
    return st(
      t,
      l`<span class="external-status-slide">
        ${this._renderMatrixWord(t)}
      </span>`
    );
  }
  _renderMatrixChar(t) {
    const e = (Wt[t] ?? Array(7).fill("00000")).join("");
    return l`
      <span class="matrix-char">
        ${[...e].map(
      (s) => l`<i class="matrix-pixel ${s === "1" ? "on" : ""}"></i>`
    )}
      </span>
    `;
  }
  _renderTemperatureControls(t) {
    return l`
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
      return p;
    const e = this._stringArray(t.attributes.preset_modes);
    if (e.length === 0)
      return p;
    const s = String(t.attributes.preset_mode ?? "");
    return l`
      <div
        class="button-grid button-grid-presets label-${this._config.preset_button_labels ?? "auto"}"
        style=${`--columns:${Math.min(e.length, 5)}`}
      >
        ${e.map((i) => {
      const o = Bt[i] ?? {
        icon: "mdi:bookmark-outline",
        color: "#64748b"
      }, n = this._translateValue(i);
      return l`
            <button
              class=${s === i ? "active" : ""}
              style=${`--button-color:${o.color}`}
              title=${n}
              aria-label=${n}
              @click=${() => this._setPreset(i)}
            >
              <ha-icon class="preset-icon" icon=${o.icon}></ha-icon>
              <span class="button-label">${n}</span>
            </button>
          `;
    })}
      </div>
    `;
  }
  _renderConsumption() {
    if (!this._config.show_consumption || !this._config.power_entity)
      return p;
    const t = this.hass.states[this._config.power_entity], e = Number(t?.state), s = Number.isFinite(e) && e > 20, i = String(t?.attributes.unit_of_measurement ?? ""), o = Number.isFinite(e) ? e : 0, n = Math.min(1, Math.max(0, (o - 20) / 1480)), c = Math.round(120 * (1 - n)), a = this.hass.themes?.darkMode === !0, h = o <= 20 ? a ? "#374151" : "#d1d5db" : a ? `hsl(${c} 62% 28%)` : `hsl(${c} 72% 78%)`;
    return l`
      <div
        class="consumption ${s ? "active" : ""} ${a ? "dark" : ""}"
        style=${`--consumption-background:${h}`}
      >
        <span class="consumption-icon">⚡</span>
        <span class="consumption-label">
          ${this._renderMatrixWord(this._t("consumption").toUpperCase())}
        </span>
        <span class="consumption-value">
          ${t ? l`${this._renderLcdNumber(t.state)}
                <span class="consumption-unit">${i}</span>` : l`<span class="unavailable">${this._t("unavailable")}</span>`}
        </span>
      </div>
    `;
  }
  _renderLcdNumber(t) {
    const e = Number(t), s = Number.isFinite(e) ? String(Math.round(e * 10) / 10) : "--";
    return l`
      <span class="lcd-display lcd-number">
        ${[...s].map(
      (i) => i === "." ? l`<i class="lcd-dot"></i>` : this._renderDigit(i)
    )}
      </span>
    `;
  }
  _renderMatrixWord(t) {
    return l`
      <span class="matrix-word">
        ${[...t].map(
      (e) => e === " " ? l`<span class="matrix-space"></span>` : this._renderMatrixChar(e)
    )}
      </span>
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
    const i = Number(this._config.temperature_step), o = Number(t.attributes.target_temp_step), n = Number.isFinite(i) ? i : Number.isFinite(o) ? o : 0.5, c = Math.round((s + e * n) * 10) / 10;
    await this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: c
    });
  }
  _stringArray(t) {
    return Array.isArray(t) ? t.filter((e) => typeof e == "string") : [];
  }
  _humanize(t) {
    return t.replaceAll("_", " ").replace(/\b\w/g, (e) => e.toUpperCase());
  }
  _language() {
    const t = this._config.language ?? "auto", e = t === "auto" ? String(this.hass.locale?.language ?? "en").toLowerCase().split("-")[0] : t;
    return e in O ? e : "en";
  }
  _t(t) {
    return O[this._language()][t] ?? O.en[t];
  }
  _translateValue(t) {
    return t in O.en ? this._t(t) : this._humanize(t);
  }
  _scheduleLabelSync() {
    this._labelSyncFrame !== void 0 && cancelAnimationFrame(this._labelSyncFrame), this._labelSyncFrame = requestAnimationFrame(() => {
      this._labelSyncFrame = void 0, this._syncAutoLabels();
    });
  }
  _syncAutoLabels() {
    this.renderRoot.querySelectorAll(".button-grid.label-auto").forEach((t) => {
      const s = [...t.querySelectorAll("button")].some((i) => {
        const o = i.querySelector(".button-label");
        if (!o)
          return !1;
        const n = i.getBoundingClientRect().width - 20;
        return o.scrollWidth > n;
      });
      t.classList.toggle("labels-compact", s);
    });
  }
};
U.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 }
}, U.styles = Lt;
let I = U;
customElements.get("thermomatrix-card") || customElements.define("thermomatrix-card", I);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "thermomatrix-card",
  name: "ThermoMatrix Card",
  description: "Termostato LCD modulare per entità climate",
  preview: !0,
  getEntitySuggestion: (r, t) => t.startsWith("climate.") ? {
    entity: t,
    show_presets: !0,
    border_mode: "state"
  } : null
});
console.info(
  `%c THERMOMATRIX-CARD %c v${It} `,
  "color:white;background:#172554;font-weight:700",
  "color:#172554;background:#bfdbfe"
);
export {
  I as ThermoMatrixCard
};
