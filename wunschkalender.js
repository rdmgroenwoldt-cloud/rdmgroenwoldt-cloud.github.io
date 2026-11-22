// Paws of Hope – interaktiver Wunschkalender (Prototyp)
// Jeder Bildbereich (bereiche.png, Rot-Kanal = Bereichsnummer) gehört zu einem Wunsch.
// Fortschritt = bestätigte Spenden / Ziel. Der Bereich färbt sich Kreuzstich für Kreuzstich ein.
(function () {
  "use strict";
  const T = {
    de: {
      titel: "Paws of Hope", unter: "Every Paw Deserves a Chance – jeder erfüllte Wunsch stickt ein Stück dieses Bildes farbig.",
      demoband: "Prototyp mit DEMO-Wünschen – alle Bedarfe, Preise und Beträge sind Beispiele. Es werden keine echten Spenden angezeigt.",
      zustand: "Vorschau-Zustand", z1: "Noch nichts finanziert", z2: "Teilweise finanziert", z3: "Einzelne Wünsche erfüllt", z4: "Kunstwerk vollendet",
      erfuellt: "Wünsche erfüllt", von: "von", gesammelt: "gesammelt", ziel: "Ziel", tippen: "Tippe auf einen Teil des Bildes, um den Wunsch dahinter zu sehen.",
      menge: "Benötigt", kosten: "Spendenziel", finanziert: "Bereits finanziert", fehlt: "Es fehlen noch", erfuellen: "Diesen Wunsch erfüllen",
      erfuelltText: "Dieser Wunsch ist erfüllt – danke!", demo: "Demo-Wunsch", bereich: "Bildbereich", schliessen: "Schließen",
      spendeHinweis: "Die sichere Spendenanbindung wird gerade vorbereitet. Bis dahin: Spenden direkt an Cat Rescue – mit dem Hinweis auf diesen Wunsch.",
      zuSpenden: "Zu den Spendenwegen", liste: "Alle Wünsche als Liste", fertig: "Das Kunstwerk ist vollendet!",
      fertigText: "Alle Wünsche sind erfüllt. Das fertige Motiv kommt in die Galerie – und ein neues Kunstwerk beginnt.",
      galerie: "Galerie der vollendeten Kunstwerke", galerieLeer: "Noch kein Kunstwerk vollendet. Das erste fertige Motiv erscheint hier.",
      neu: "Geplante nächste Motive", offen: "offen", teil: "teilweise", voll: "erfüllt",
      kat: { futter: "Katzenfutter", impfung: "Impfungen", wurm: "Entwurmung", floh: "Floh- und Zeckenschutz", notfall: "Tierärztliche Notfälle", medizin: "Medikamente", streu: "Katzenstreu", unterkunft: "Unterbringung" }
    },
    en: {
      titel: "Paws of Hope", unter: "Every Paw Deserves a Chance – every fulfilled wish stitches a piece of this picture into colour.",
      demoband: "Prototype with DEMO wishes – all needs, prices and amounts are examples. No real donations are shown.",
      zustand: "Preview state", z1: "Nothing funded yet", z2: "Partly funded", z3: "Some wishes fulfilled", z4: "Artwork complete",
      erfuellt: "wishes fulfilled", von: "of", gesammelt: "raised", ziel: "goal", tippen: "Tap a part of the picture to see the wish behind it.",
      menge: "Needed", kosten: "Goal", finanziert: "Already funded", fehlt: "Still missing", erfuellen: "Fulfil this wish",
      erfuelltText: "This wish is fulfilled – thank you!", demo: "Demo wish", bereich: "Picture area", schliessen: "Close",
      spendeHinweis: "Secure online donations are being prepared. Until then, please donate directly to Cat Rescue and mention this wish.",
      zuSpenden: "Ways to donate", liste: "All wishes as a list", fertig: "The artwork is complete!",
      fertigText: "All wishes are fulfilled. The finished picture moves to the gallery – and a new artwork begins.",
      galerie: "Gallery of completed artworks", galerieLeer: "No artwork completed yet. The first finished picture will appear here.",
      neu: "Planned next motifs", offen: "open", teil: "partly", voll: "fulfilled",
      kat: { futter: "Cat food", impfung: "Vaccinations", wurm: "Deworming", floh: "Flea and tick protection", notfall: "Veterinary emergencies", medizin: "Medicine", streu: "Cat litter", unterkunft: "Shelter" },
      titelKat: { futter: "Cat food for one month", impfung: "Vaccination against feline distemper", wurm: "Deworming", floh: "Flea and tick protection", notfall: "Veterinary emergency", medizin: "Medicine", streu: "Cat litter", unterkunft: "Shelter" }
    },
    ar: {
      titel: "Paws of Hope", unter: "كل مخلب يستحق فرصة – كل أمنية تتحقق تُطرّز جزءًا من هذه الصورة بالألوان.",
      demoband: "نموذج أولي بأمنيات تجريبية – جميع الاحتياجات والأسعار والمبالغ أمثلة. لا تُعرض تبرعات حقيقية.",
      zustand: "حالة المعاينة", z1: "لم يُموَّل شيء بعد", z2: "مموَّل جزئيًا", z3: "تحققت بعض الأمنيات", z4: "اكتملت اللوحة",
      erfuellt: "أمنيات تحققت", von: "من", gesammelt: "تم جمعه", ziel: "الهدف", tippen: "اضغط على جزء من الصورة لترى الأمنية التي خلفه.",
      menge: "المطلوب", kosten: "هدف التبرع", finanziert: "تم تمويله", fehlt: "المتبقي", erfuellen: "حقّق هذه الأمنية",
      erfuelltText: "تحققت هذه الأمنية – شكرًا لك!", demo: "أمنية تجريبية", bereich: "جزء الصورة", schliessen: "إغلاق",
      spendeHinweis: "يجري تجهيز التبرع الآمن عبر الإنترنت. حتى ذلك الحين، تبرّع مباشرة لـ Cat Rescue مع ذكر هذه الأمنية.",
      zuSpenden: "طرق التبرع", liste: "كل الأمنيات كقائمة", fertig: "اكتملت اللوحة!",
      fertigText: "تحققت جميع الأمنيات. تنتقل الصورة المكتملة إلى المعرض – وتبدأ لوحة جديدة.",
      galerie: "معرض اللوحات المكتملة", galerieLeer: "لم تكتمل أي لوحة بعد. ستظهر أول صورة مكتملة هنا.",
      neu: "الزخارف القادمة", offen: "مفتوحة", teil: "جزئيًا", voll: "تحققت",
      kat: { futter: "طعام القطط", impfung: "التطعيمات", wurm: "علاج الديدان", floh: "الحماية من البراغيث والقراد", notfall: "حالات بيطرية طارئة", medizin: "أدوية", streu: "رمل القطط", unterkunft: "المأوى" },
      titelKat: { futter: "طعام قطة لمدة شهر", impfung: "تطعيم ضد طاعون القطط", wurm: "علاج الديدان", floh: "حماية من البراغيث والقراد", notfall: "حالة بيطرية طارئة", medizin: "أدوية", streu: "رمل القطط", unterkunft: "المأوى" }
    }
  };
  const WK_SEITE = (document.documentElement.lang || "de").slice(0, 2);
  const WK_WURZEL = WK_SEITE === "de" ? "" : "../";
  const wkPfad = (x) => (typeof x === "string" && x && !/^([a-z][a-z0-9+.-]*:|\/|\.\.\/)/i.test(x)) ? WK_WURZEL + x : x;
  let sprache = T[WK_SEITE] ? WK_SEITE : "de";
  try { const s = localStorage.getItem("wk-sprache"); if (s && T[s]) sprache = s; } catch (e) {}
  const t = (k) => T[sprache][k] ?? T.de[k];
  const esc = (x) => String(x ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const euro = (z) => new Intl.NumberFormat(sprache === "ar" ? "ar" : sprache === "en" ? "en-GB" : "de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(z);

  const leinwand = document.getElementById("wk-bild");
  const rahmen = document.getElementById("wk-buehne");
  if (!leinwand) return;
  const ctx = leinwand.getContext("2d", { willReadFrequently: true });
  const ueber = document.getElementById("wk-rand");
  const uctx = ueber.getContext("2d");
  let W = 0, H = 0, farbe, grau, ausgabe, label, daten, bereichInfo = {}, pixel = {}, kanten = {}, schwelle = {};
  let anzeige = {};   // aktuell gezeigter Fortschritt je Bereich (0..1)
  let modus = "z2";
  const ruhig = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function laden(src) { return new Promise((ok, fehler) => { const i = new Image(); i.crossOrigin = "anonymous"; i.onload = () => ok(i); i.onerror = fehler; i.src = src; }); }
  function bildDaten(img) { const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight; const x = c.getContext("2d"); x.drawImage(img, 0, 0); return x.getImageData(0, 0, c.width, c.height); }

  // Wert je Wunsch nach Vorschau-Zustand (Demo) oder bestätigten Spenden (echt)
  function wert(w) {
    if (!daten.kunstwerk.demo) return w.bestaetigt;
    if (modus === "z1") return 0;
    if (modus === "z4") return w.ziel;
    if (modus === "z2") return w.beispiel >= w.ziel ? Math.round(w.ziel * 0.6) : w.beispiel;
    return w.beispiel; // z3: Mischung aus offen, teilweise und erfüllt
  }

  async function start() {
    // Datenquelle: eigener Server (data-api) – sonst die mitgelieferte Demo-Datei
    const api = apiAdresse;
    daten = null;
    if (api) {
      try { const r = await fetch(api, { cache: "no-store" }); if (r.ok) { daten = await r.json(); if (!daten.kunstwerk) daten = null; } } catch (e) { daten = null; }
      if (daten && daten.kunstwerk.bereichsliste) daten.kunstwerk.bereichsliste.forEach((x) => { bereichNamen[x.id] = x; bereichBox[x.id] = x.box; });
    }
    // Server eingestellt, aber nicht erreichbar: ehrliche Meldung statt stiller Demo-Daten
    if (api && !daten) { rahmen.classList.add("fehler"); rahmen.setAttribute("data-meldung", "Die Daten sind gerade nicht erreichbar. Bitte später noch einmal versuchen."); return; }
    if (!daten) daten = await (await fetch(WK_WURZEL + "assets/wunsch/wuensche.json?v=" + Date.now())).json();
    try { const lokal = localStorage.getItem("wk-verwaltung"); if (lokal && location.hostname.match(/localhost|127\.0\.0\.1|^$/)) daten = JSON.parse(lokal); } catch (e) {}
    const [bild, karte] = await Promise.all([laden(wkPfad(daten.kunstwerk.bild)), laden(wkPfad(daten.kunstwerk.bereiche))]);
    W = bild.naturalWidth; H = bild.naturalHeight;
    leinwand.width = ueber.width = W; leinwand.height = ueber.height = H;
    farbe = bildDaten(bild); const k = bildDaten(karte);
    label = new Uint8Array(W * H);
    for (let i = 0; i < W * H; i++) label[i] = k.data[i * 4];
    // Graufassung: warmes Beige-Grau (Leinen bleibt Leinen)
    grau = new Uint8ClampedArray(farbe.data.length);
    for (let i = 0; i < W * H; i++) {
      const r = farbe.data[i * 4], g = farbe.data[i * 4 + 1], b = farbe.data[i * 4 + 2];
      const l = 0.3 * r + 0.59 * g + 0.11 * b;
      const hell = 0.55 * l + 0.45 * 205; // weicher, heller
      grau[i * 4] = hell + 14; grau[i * 4 + 1] = hell + 8; grau[i * 4 + 2] = hell - 4; grau[i * 4 + 3] = 255;
    }
    // Pixel je Bereich, Kreuzstich-Schwellen (6-px-Zellen, zufällige Reihenfolge), Kanten
    const zelle = 6;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x, id = label[i];
      if (!id) continue;
      (pixel[id] ||= []).push(i);
      const zx = (x / zelle) | 0, zy = (y / zelle) | 0;
      let hsh = (zx * 73856093) ^ (zy * 19349663) ^ (id * 83492791); hsh = ((hsh >>> 0) % 10007) / 10007;
      (schwelle[id] ||= []).push(hsh);
      if ((x > 0 && label[i - 1] !== id) || (x < W - 1 && label[i + 1] !== id) || (y > 0 && label[i - W] !== id) || (y < H - 1 && label[i + W] !== id)) (kanten[id] ||= []).push(i);
    }
    ausgabe = ctx.createImageData(W, H);
    ausgabe.data.set(farbe.data);               // Leinen und alles ohne Bereich: Original
    daten.wuensche.forEach((w) => { bereichInfo[w.bereich] = w; anzeige[w.bereich] = 0; malen(w.bereich, 0); });
    ctx.putImageData(ausgabe, 0, 0);
    if (!daten.kunstwerk.demo) { document.querySelectorAll(".wk-demo,[data-zustand]").forEach((e) => (e.closest(".wk-box") || e).hidden = true); }
    texte(); liste(); galerie(); zustandSetzen(modus, true);
    rahmen.classList.add("geladen");
  }

  function malen(id, p) {
    const px = pixel[id], sw = schwelle[id], d = ausgabe.data, f = farbe.data;
    if (!px) return;
    for (let n = 0; n < px.length; n++) {
      const i = px[n] * 4, an = sw[n] < p;
      const q = an ? f : grau;
      d[i] = q[i]; d[i + 1] = q[i + 1]; d[i + 2] = q[i + 2];
    }
  }

  // Sanfte Animation: Kreuzstiche erscheinen nacheinander
  let laeuft = null;
  function animieren(ziele) {
    if (laeuft) cancelAnimationFrame(laeuft);
    const start = performance.now(), dauer = ruhig ? 1 : 1800, von = { ...anzeige };
    const schritt = (jetzt) => {
      const k = Math.min(1, (jetzt - start) / dauer), e = 1 - Math.pow(1 - k, 3);
      for (const id in ziele) {
        const p = von[id] + (ziele[id] - von[id]) * e;
        if (Math.abs(p - anzeige[id]) > 0.001 || k === 1) { anzeige[id] = p; malen(+id, p); }
      }
      ctx.putImageData(ausgabe, 0, 0);
      if (k < 1) laeuft = requestAnimationFrame(schritt); else laeuft = null;
    };
    laeuft = requestAnimationFrame(schritt);
  }

  function zustandSetzen(m, sofort) {
    modus = m;
    document.querySelectorAll("[data-zustand]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.zustand === m)));
    const ziele = {};
    daten.wuensche.forEach((w) => { ziele[w.bereich] = Math.min(1, wert(w) / w.ziel); });
    animieren(ziele);
    summen(); liste();
    const fertig = daten.wuensche.every((w) => wert(w) >= w.ziel);
    document.getElementById("wk-fertig").hidden = !fertig;
  }

  function summen() {
    const ges = daten.wuensche.reduce((s, w) => s + w.ziel, 0), ist = daten.wuensche.reduce((s, w) => s + Math.min(w.ziel, wert(w)), 0);
    const erf = daten.wuensche.filter((w) => wert(w) >= w.ziel).length;
    document.getElementById("wk-erfuellt").textContent = `${erf} ${t("von")} ${daten.wuensche.length}`;
    document.getElementById("wk-summe").textContent = `${euro(ist)} ${t("von")} ${euro(ges)}`;
    document.getElementById("wk-balken").style.width = (ges ? (ist / ges) * 100 : 0) + "%";
  }

  // Bereich unter dem Zeiger finden (mit Suche im Umkreis, falls zwischen zwei Stichen getippt)
  function bereichBei(ev) {
    const r = leinwand.getBoundingClientRect();
    const x = Math.round((ev.clientX - r.left) * W / r.width), y = Math.round((ev.clientY - r.top) * H / r.height);
    if (x < 0 || y < 0 || x >= W || y >= H) return 0;
    if (label[y * W + x]) return label[y * W + x];
    for (let rad = 2; rad <= 14; rad += 2) for (let dy = -rad; dy <= rad; dy += 2) for (let dx = -rad; dx <= rad; dx += 2) {
      const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue;
      const id = label[yy * W + xx]; if (id) return id;
    }
    return 0;
  }
  let hoverId = 0;
  function umranden(id) {
    if (id === hoverId) return; hoverId = id;
    uctx.clearRect(0, 0, W, H);
    if (!id || !kanten[id]) { leinwand.style.cursor = "default"; return; }
    leinwand.style.cursor = "pointer";
    const img = uctx.createImageData(W, H), d = img.data;
    for (const i of kanten[id]) { d[i * 4] = 240; d[i * 4 + 1] = 207; d[i * 4 + 2] = 122; d[i * 4 + 3] = 255; }
    for (const i of pixel[id]) if (!d[i * 4 + 3]) { d[i * 4] = 255; d[i * 4 + 1] = 240; d[i * 4 + 2] = 200; d[i * 4 + 3] = 38; }
    uctx.putImageData(img, 0, 0);
  }
  leinwand.addEventListener("pointermove", (ev) => { if (ev.pointerType === "mouse") umranden(bereichBei(ev)); });
  leinwand.addEventListener("pointerleave", () => umranden(0));
  leinwand.addEventListener("click", (ev) => { const id = bereichBei(ev); if (id) oeffnen(id); });

  // Pop-up
  const dlg = document.getElementById("wk-dialog");
  // Übersetzte Felder (titel_en, beschreibung_ar …) haben Vorrang; sonst Rückfall auf Deutsch bzw. Kategorienamen
  const feld = (o, k) => (o && (o[k + "_" + sprache] || (sprache === "de" ? o[k] : ""))) || "";
  function bName(id) { const x = bereichNamen[id]; return !x ? "" : typeof x === "string" ? x : (x["name_" + sprache] || x.name || ""); }
  function wunschTitel(w) { return feld(w, "titel") || T[sprache].titelKat?.[w.kategorie] || w.titel; }
  function oeffnen(id) {
    const w = bereichInfo[id]; if (!w) return;
    const b = Math.min(w.ziel, wert(w)), fehlt = Math.max(0, w.ziel - b), p = Math.round((b / w.ziel) * 100);
    const name = daten.bereiche?.[id] || "";
    dlg.querySelector(".wk-d-kat").textContent = t("kat")[w.kategorie] + (w.demo ? " · " + t("demo") : "");
    dlg.querySelector(".wk-d-titel").textContent = wunschTitel(w);
    dlg.querySelector(".wk-d-text").textContent = feld(w, "beschreibung");
    dlg.querySelector(".wk-d-text").hidden = !feld(w, "beschreibung");
    dlg.querySelector(".wk-d-menge").textContent = feld(w, "menge") || w.menge;
    dlg.querySelector(".wk-d-ziel").textContent = euro(w.ziel);
    dlg.querySelector(".wk-d-ist").textContent = euro(b);
    dlg.querySelector(".wk-d-fehlt").textContent = euro(fehlt);
    dlg.querySelector(".wk-d-prozent").textContent = p + " %";
    const balken = dlg.querySelector(".wk-d-balken i"); balken.style.width = "0%"; requestAnimationFrame(() => requestAnimationFrame(() => (balken.style.width = p + "%")));
    dlg.querySelector(".wk-d-bereich").textContent = t("bereich") + ": " + (bName(id) || "#" + id);
    const knopf = dlg.querySelector(".wk-d-knopf"), hinweis = dlg.querySelector(".wk-d-hinweis");
    hinweis.hidden = true;
    if (fehlt <= 0) { knopf.hidden = true; dlg.querySelector(".wk-d-danke").hidden = false; }
    else { knopf.hidden = false; dlg.querySelector(".wk-d-danke").hidden = true; knopf.onclick = () => { hinweis.hidden = false; }; }
    // Vorschau des Bereichs: Ausschnitt
    const vor = dlg.querySelector(".wk-d-vorschau"), bx = bereichBox[id];
    if (bx && vor) {
      const [x0, y0, x1, y1] = bx, pad = 10, bw = x1 - x0 + pad * 2, bh = y1 - y0 + pad * 2;
      vor.width = bw; vor.height = bh;
      const vc = vor.getContext("2d"); vc.clearRect(0, 0, bw, bh);
      vc.drawImage(leinwand, x0 - pad, y0 - pad, bw, bh, 0, 0, bw, bh);
    }
    dlg.showModal();
    umranden(id);
  }
  dlg.querySelector(".wk-d-zu").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (ev) => { if (ev.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => umranden(0));

  // Liste (barrierearm: alle Wünsche auch ohne Bild erreichbar)
  let bereichNamen = {}, bereichBox = {};
  const apiAdresse = document.getElementById("wunschkalender").dataset.api || (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? new URLSearchParams(location.search).get("api") : "");
  if (!apiAdresse) fetch(WK_WURZEL + "assets/wunsch/bereiche.json?v=" + Date.now()).then((r) => r.json()).then((b) => b.forEach((x) => { bereichNamen[x.id] = x; bereichBox[x.id] = x.box; }));
  function liste() {
    const ziel = document.getElementById("wk-liste"); if (!ziel || !daten) return;
    const gruppen = {};
    daten.wuensche.forEach((w) => (gruppen[w.kategorie] ||= []).push(w));
    ziel.innerHTML = "";
    Object.keys(t("kat")).forEach((k) => {
      const ws = gruppen[k]; if (!ws) return;
      const erf = ws.filter((w) => wert(w) >= w.ziel).length;
      const d = document.createElement("details"); d.className = "klapp";
      d.innerHTML = `<summary>${esc(t("kat")[k])}<small>${erf} ${esc(t("von"))} ${ws.length} ${esc(t("erfuellt"))}</small></summary><div class="klapp-inhalt"><ul class="wk-zeilen"></ul></div>`;
      const ul = d.querySelector("ul");
      ws.forEach((w) => {
        const li = document.createElement("li"), b = Math.min(w.ziel, wert(w));
        const status = b >= w.ziel ? t("voll") : b > 0 ? t("teil") : t("offen");
        li.innerHTML = `<button type="button"><span>${esc(wunschTitel(w))}<small>${esc(bName(w.bereich))}</small></span><span class="wk-st">${esc(euro(b))} / ${esc(euro(w.ziel))} · ${esc(status)}</span></button>`;
        li.querySelector("button").addEventListener("click", () => oeffnen(w.bereich));
        ul.appendChild(li);
      });
      ziel.appendChild(d);
    });
  }
  function galerie() {
    const g = document.getElementById("wk-galerie"); if (!g) return;
    const fertig = daten.galerie || daten.archiv || [];
    g.textContent = fertig.length ? "" : t("galerieLeer");
  }
  function texte() {
    document.documentElement.lang = sprache;
    const bereich = document.getElementById("wunschkalender");
    bereich.dir = dlg.dir = sprache === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("main [data-t]").forEach((e) => (e.textContent = t(e.dataset.t)));
    document.querySelectorAll("[data-sprache]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.sprache === sprache)));
  }
  document.querySelectorAll("[data-sprache]").forEach((b) => b.addEventListener("click", () => {
    sprache = b.dataset.sprache; try { localStorage.setItem("wk-sprache", sprache); } catch (e) {}
    texte(); summen(); liste(); galerie();
  }));
  document.querySelectorAll("[data-zustand]").forEach((b) => b.addEventListener("click", () => zustandSetzen(b.dataset.zustand)));
  start().catch((e) => { console.error(e); rahmen.classList.add("fehler"); });
})();
