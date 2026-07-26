const P = globalThis, I = P.ShadowRoot && (P.ShadyCSS === void 0 || P.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, L = /* @__PURE__ */ Symbol(), F = /* @__PURE__ */ new WeakMap();
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
  const e = o.length === 1 ? o[0] : t.reduce((s, i, r) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[r + 1], o[0]);
  return new st(e, o, L);
}, dt = (o, t) => {
  if (I) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = P.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, o.appendChild(s);
  }
}, V = I ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return lt(e);
})(o) : o;
const { is: ht, defineProperty: pt, getOwnPropertyDescriptor: ut, getOwnPropertyNames: mt, getOwnPropertySymbols: gt, getPrototypeOf: bt } = Object, z = globalThis, q = z.trustedTypes, ft = q ? q.emptyScript : "", _t = z.reactiveElementPolyfillSupport, w = (o, t) => o, R = { toAttribute(o, t) {
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
} }, it = (o, t) => !ht(o, t), G = { attribute: !0, type: String, converter: R, reflect: !1, useDefault: !1, hasChanged: it };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), z.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = G) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && pt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = ut(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const l = i?.call(this);
      r?.call(this, n), this.requestUpdate(t, l, s);
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
      for (const i of s) e.unshift(V(i));
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
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : R).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : R;
      this._$Em = i;
      const l = n.fromAttribute(e, r.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (r = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? it)(r, e) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: r }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [i, r] of this._$Ep) this[i] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, r] of s) {
        const { wrapped: n } = r, l = this[i];
        n !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, r, l);
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
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[w("elementProperties")] = /* @__PURE__ */ new Map(), x[w("finalized")] = /* @__PURE__ */ new Map(), _t?.({ ReactiveElement: x }), (z.reactiveElementVersions ??= []).push("2.1.2");
const j = globalThis, K = (o) => o, O = j.trustedTypes, Z = O ? O.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, rt = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, ot = "?" + b, $t = `<${ot}>`, $ = document, S = () => $.createComment(""), C = (o) => o === null || typeof o != "object" && typeof o != "function", B = Array.isArray, xt = (o) => B(o) || typeof o?.[Symbol.iterator] == "function", H = `[ 	
\f\r]`, A = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, J = /-->/g, X = />/g, f = RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Q = /'/g, Y = /"/g, nt = /^(?:script|style|textarea|title)$/i, yt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), c = yt(1), y = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), tt = /* @__PURE__ */ new WeakMap(), _ = $.createTreeWalker($, 129);
function at(o, t) {
  if (!B(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Z !== void 0 ? Z.createHTML(t) : t;
}
const vt = (o, t) => {
  const e = o.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = A;
  for (let l = 0; l < e; l++) {
    const a = o[l];
    let p, u, d = -1, m = 0;
    for (; m < a.length && (n.lastIndex = m, u = n.exec(a), u !== null); ) m = n.lastIndex, n === A ? u[1] === "!--" ? n = J : u[1] !== void 0 ? n = X : u[2] !== void 0 ? (nt.test(u[2]) && (i = RegExp("</" + u[2], "g")), n = f) : u[3] !== void 0 && (n = f) : n === f ? u[0] === ">" ? (n = i ?? A, d = -1) : u[1] === void 0 ? d = -2 : (d = n.lastIndex - u[2].length, p = u[1], n = u[3] === void 0 ? f : u[3] === '"' ? Y : Q) : n === Y || n === Q ? n = f : n === J || n === X ? n = A : (n = f, i = void 0);
    const g = n === f && o[l + 1].startsWith("/>") ? " " : "";
    r += n === A ? a + $t : d >= 0 ? (s.push(p), a.slice(0, d) + rt + a.slice(d) + b + g) : a + b + (d === -2 ? l : g);
  }
  return [at(o, r + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class k {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, n = 0;
    const l = t.length - 1, a = this.parts, [p, u] = vt(t, e);
    if (this.el = k.createElement(p, s), _.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = _.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(rt)) {
          const m = u[n++], g = i.getAttribute(d).split(b), N = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: r, name: N[2], strings: g, ctor: N[1] === "." ? wt : N[1] === "?" ? Et : N[1] === "@" ? St : U }), i.removeAttribute(d);
        } else d.startsWith(b) && (a.push({ type: 6, index: r }), i.removeAttribute(d));
        if (nt.test(i.tagName)) {
          const d = i.textContent.split(b), m = d.length - 1;
          if (m > 0) {
            i.textContent = O ? O.emptyScript : "";
            for (let g = 0; g < m; g++) i.append(d[g], S()), _.nextNode(), a.push({ type: 2, index: ++r });
            i.append(d[m], S());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ot) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(b, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += b.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = $.createElement("template");
    return s.innerHTML = t, s;
  }
}
function v(o, t, e = o, s) {
  if (t === y) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const r = C(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(o), i._$AT(o, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = v(o, i._$AS(o, t.values), i, s)), t;
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? $).importNode(e, !0);
    _.currentNode = i;
    let r = _.nextNode(), n = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let p;
        a.type === 2 ? p = new M(r, r.nextSibling, this, t) : a.type === 1 ? p = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (p = new Ct(r, this, t)), this._$AV.push(p), a = s[++l];
      }
      n !== a?.index && (r = _.nextNode(), n++);
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
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = v(this, t, e), C(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== y && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : xt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && C(this._$AH) ? this._$AA.nextSibling.data = t : this.T($.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = k.createElement(at(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const r = new At(i, this), n = r.u(this.options);
      r.p(e), this.T(n), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = tt.get(t.strings);
    return e === void 0 && tt.set(t.strings, e = new k(t)), e;
  }
  k(t) {
    B(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new M(this.O(S()), this.O(S()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
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
class U {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = v(this, t, e, 0), n = !C(t) || t !== this._$AH && t !== y, n && (this._$AH = t);
    else {
      const l = t;
      let a, p;
      for (t = r[0], a = 0; a < r.length - 1; a++) p = v(this, l[s + a], e, a), p === y && (p = this._$AH[a]), n ||= !C(p) || p !== this._$AH[a], p === h ? t = h : t !== h && (t += (p ?? "") + r[a + 1]), this._$AH[a] = p;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class wt extends U {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Et extends U {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class St extends U {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = v(this, t, e, 0) ?? h) === y) return;
    const s = this._$AH, i = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== h && (s === h || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
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
  let i = s._$litPart$;
  if (i === void 0) {
    const r = e?.renderBefore ?? null;
    s._$litPart$ = i = new M(t.insertBefore(S(), r), r, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
const W = globalThis;
class E extends x {
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
    return y;
  }
}
E._$litElement$ = !0, E.finalized = !0, W.litElementHydrateSupport?.({ LitElement: E });
const Nt = W.litElementPolyfillSupport;
Nt?.({ LitElement: E });
(W.litElementVersions ??= []).push("4.2.2");
const Pt = ct`
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

  .status-stack {
    position: relative;
    left: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
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
`, Ot = "0.2.2", Tt = /* @__PURE__ */ new Set(["heating", "cooling", "drying", "fan"]), et = {
  off: { label: "Spento", icon: "⏻", color: "#94a3b8" },
  heat: { label: "Caldo", icon: "♨", color: "#f97316" },
  cool: { label: "Freddo", icon: "❄", color: "#1d4ed8" },
  dry: { label: "Deumidifica", icon: "💧", color: "#10b981" },
  fan_only: { label: "Ventola", icon: "✣", color: "#0891b2" },
  auto: { label: "Auto", icon: "A", color: "#8b5cf6" },
  heat_cool: { label: "Auto", icon: "↕", color: "#8b5cf6" }
}, zt = {
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
}, Ut = {
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
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"]
}, Ht = {
  none: { label: "Manuale", icon: "✋", color: "#c026d3" },
  home: { label: "Casa", icon: "⌂", color: "#1d4ed8" },
  away: { label: "Assente", icon: "↗", color: "#94a3b8" },
  sleep: { label: "Notte", icon: "☾", color: "#8b5cf6" },
  comfort: { label: "Comfort", icon: "♥", color: "#10b981" },
  eco: { label: "Eco", icon: "♻", color: "#16a34a" }
}, T = class T extends E {
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
        status_entity: "Sensore di stato avanzato",
        border_mode: "Bordo della card",
        temperature_step: "Incremento temperatura"
      })[t.name ?? ""] ?? t.name,
      computeHelper: (t) => t.name === "power_entity" ? "Usato soltanto quando il modulo consumo è attivo." : t.name === "status_entity" ? "Opzionale. Se assente, viene usato lo stato del climatizzatore." : void 0
    };
  }
  static getStubConfig(t, e) {
    return {
      entity: e.find((i) => i.startsWith("climate.")) ?? Object.keys(t.states).find(
        (i) => i.startsWith("climate.")
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
      return c`<ha-card><div class="warning">Caricamento…</div></ha-card>`;
    const t = this.hass.states[this._config.entity];
    if (!t)
      return c`<ha-card>
        <div class="warning">
          Entità ${this._config.entity} non disponibile
        </div>
      </ha-card>`;
    const e = t.state, s = et[e]?.color ?? "#94a3b8", i = this._config.border_mode === "state", r = i && e !== "off" ? `0 0 18px color-mix(in srgb, ${s} 58%, transparent)` : "0 4px 14px rgba(0,0,0,0.10)";
    return c`
      <ha-card
        style=${`--tm-border-color:${i ? s : "var(--tm-neutral-border)"};--tm-card-shadow:${r};`}
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
    return c`
      <div
        class="button-grid"
        style=${`--columns:${Math.min(s.length, 5)}`}
      >
        ${s.map((i) => {
      const r = et[i] ?? {
        label: this._humanize(i),
        icon: "●",
        color: "#64748b"
      };
      return c`
            <button
              class="mode-button ${t.state === i ? "active" : ""}"
              style=${`--button-color:${r.color}`}
              title=${`Imposta ${r.label}`}
              @click=${() => this._setHvacMode(i)}
            >
              <span class="mode-icon">${r.icon}</span>
              ${r.label}
            </button>
          `;
    })}
      </div>
    `;
  }
  _renderDisplay(t) {
    const e = t.state, s = String(t.attributes.hvac_action ?? ""), i = Tt.has(s), r = e !== "off" && s === "idle", n = e === "off", l = this._config.status_entity ? this.hass.states[this._config.status_entity] : void 0, a = this.hass.themes?.darkMode === !0, u = (a ? {
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
    })[e] ?? (a ? "#334155" : "#cbd5e1");
    return c`
      <div
        class="lcd-panel ${a ? "dark" : ""}"
        style=${`--lcd-background:${u}`}
      >
        <div class="lcd-values ${this._config.status_entity ? "external" : ""}">
          <div class="lcd-reading current">
            <span class="lcd-reading-label">AMBIENTE</span>
            ${this._renderTemperature(t.attributes.current_temperature)}
          </div>
          ${this._config.status_entity ? h : c`
                <div class="status-stack">
                  ${this._renderStatus("ON", i, !0)}
                  ${this._renderStatus("IDLE", r, !0)}
                  ${this._renderStatus("OFF", n, !1)}
                </div>
              `}
          <div class="lcd-reading target">
            <span class="lcd-reading-label">TARGET</span>
            ${this._renderTemperature(t.attributes.temperature)}
          </div>
        </div>
        ${this._config.status_entity ? c`
              <div
                class="lcd-external-status"
                title=${l ? this._humanize(l.state) : "Sensore non disponibile"}
              >
                ${this._renderMatrixWord(
      l ? this._humanize(l.state).toUpperCase() : "NON DISPONIBILE"
    )}
              </div>
            ` : h}
      </div>
    `;
  }
  _renderTemperature(t) {
    const e = Number(t), s = Number.isFinite(e) ? e.toFixed(1) : "--";
    return c`
      <span class="lcd-display">
        ${[...s].map(
      (i) => i === "." ? c`<i class="lcd-dot"></i>` : this._renderDigit(i)
    )}
        <i class="lcd-degree"></i>
      </span>
    `;
  }
  _renderDigit(t) {
    const e = zt[t] ?? "";
    return c`
      <span class="lcd-digit">
        ${[..."abcdefg"].map(
      (s) => c`<i
              class="lcd-segment ${s} ${e.includes(s) ? "on" : ""}"
            ></i>`
    )}
      </span>
    `;
  }
  _renderStatus(t, e, s) {
    return c`
      <span class="status-box ${e ? "active" : ""} ${e && s ? "blink" : ""}">
        <span class="matrix-word">
          ${[...t].map((i) => this._renderMatrixChar(i))}
        </span>
      </span>
    `;
  }
  _renderMatrixChar(t) {
    const e = (Ut[t] ?? Array(7).fill("00000")).join("");
    return c`
      <span class="matrix-char">
        ${[...e].map(
      (s) => c`<i class="matrix-pixel ${s === "1" ? "on" : ""}"></i>`
    )}
      </span>
    `;
  }
  _renderTemperatureControls(t) {
    return c`
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
      return h;
    const e = this._stringArray(t.attributes.preset_modes);
    if (e.length === 0)
      return h;
    const s = String(t.attributes.preset_mode ?? "");
    return c`
      <div
        class="button-grid"
        style=${`--columns:${Math.min(e.length, 5)}`}
      >
        ${e.map((i) => {
      const r = Ht[i] ?? {
        label: this._humanize(i),
        icon: "◆",
        color: "#64748b"
      };
      return c`
            <button
              class=${s === i ? "active" : ""}
              style=${`--button-color:${r.color}`}
              @click=${() => this._setPreset(i)}
            >
              <span class="preset-icon">${r.icon}</span>
              <span>${r.label}</span>
            </button>
          `;
    })}
      </div>
    `;
  }
  _renderConsumption() {
    if (!this._config.show_consumption || !this._config.power_entity)
      return h;
    const t = this.hass.states[this._config.power_entity], e = Number(t?.state), s = Number.isFinite(e) && e > 20, i = String(t?.attributes.unit_of_measurement ?? ""), r = Number.isFinite(e) ? e : 0, n = Math.min(1, Math.max(0, (r - 20) / 1480)), l = Math.round(120 * (1 - n)), a = this.hass.themes?.darkMode === !0, p = r <= 20 ? a ? "#374151" : "#d1d5db" : a ? `hsl(${l} 62% 28%)` : `hsl(${l} 72% 78%)`;
    return c`
      <div
        class="consumption ${s ? "active" : ""} ${a ? "dark" : ""}"
        style=${`--consumption-background:${p}`}
      >
        <span class="consumption-icon">⚡</span>
        <span class="consumption-label">
          ${this._renderMatrixWord("CONSUMO")}
        </span>
        <span class="consumption-value">
          ${t ? c`${this._renderLcdNumber(t.state)}
                <span class="consumption-unit">${i}</span>` : c`<span class="unavailable">Non disponibile</span>`}
        </span>
      </div>
    `;
  }
  _renderLcdNumber(t) {
    const e = Number(t), s = Number.isFinite(e) ? String(Math.round(e * 10) / 10) : "--";
    return c`
      <span class="lcd-display lcd-number">
        ${[...s].map(
      (i) => i === "." ? c`<i class="lcd-dot"></i>` : this._renderDigit(i)
    )}
      </span>
    `;
  }
  _renderMatrixWord(t) {
    return c`
      <span class="matrix-word">
        ${[...t].map(
      (e) => e === " " ? c`<span class="matrix-space"></span>` : this._renderMatrixChar(e)
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
    const i = Number(this._config.temperature_step), r = Number(t.attributes.target_temp_step), n = Number.isFinite(i) ? i : Number.isFinite(r) ? r : 0.5, l = Math.round((s + e * n) * 10) / 10;
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
T.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 }
}, T.styles = Pt;
let D = T;
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
  `%c THERMOMATRIX-CARD %c v${Ot} `,
  "color:white;background:#172554;font-weight:700",
  "color:#172554;background:#bfdbfe"
);
export {
  D as ThermoMatrixCard
};
