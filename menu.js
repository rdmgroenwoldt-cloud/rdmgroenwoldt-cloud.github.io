// Gemeinsamer Kopf (Menü), Projektleiste und Fuß für alle Seiten.
// Neue Seite des Hauses Dar Al-Rahma? Im MENU eintragen.
// Neue Seite eines Projekts? Im passenden BEREICH unter "seiten" eintragen.

// ---------- Haus Dar Al-Rahma: Hauptmenü ----------
const MENU = [
  { titel: "Über uns", unter: [
    { titel: "Wer wir sind", url: "ueber-uns.html" },
    { titel: "Leitbild & Kreislauf", url: "leitbild.html" },
    { titel: "Unsere Ziele", url: "ziele.html" },
    { titel: "Gründung der gUG", url: "gruendung.html" },
    { titel: "Transparenz", url: "transparenz.html" },
    { titel: "Häufige Fragen", url: "faq.html" }
  ]},
  { titel: "Projekte", unter: [
    { titel: "Alle Projekte im Netzwerk", url: "projekte.html" },
    { gruppe: "Projekte, die wir begleiten" },
    { titel: "Medical Point North Gaza", url: "medical-point.html" },
    { titel: "Kids4Hope", url: "kids4hope.html" },
    { titel: "Gazahilfspool – Familienpatenschaften", url: "gazahilfspool.html" },
    { titel: "Dar Al-Rahma Cat Rescue", url: "tierschutz.html" },
    { gruppe: "Sammelbereiche" },
    { titel: "Children's Relief – Kinderprojekte", url: "kinderhilfe.html" },
    { gruppe: "Arbeitsbereiche im Aufbau" },
    { titel: "Mensch & Tier: seelische Hilfe", url: "mensch-und-tier.html" },
    { titel: "Kultur & Identität", url: "kultur.html" },
    { titel: "Inklusion & Integration", url: "inklusion.html" }
  ]},
  { titel: "Lage in Gaza", unter: [
    { titel: "Warum Nord-Gaza", url: "nord-gaza.html" },
    { titel: "Zahlen & Fakten", url: "fakten.html" },
    { titel: "Humanitäre & medizinische Lage", url: "humanitaere-hilfe.html" }
  ]},
  { titel: "Veranstaltungen", unter: [
    { titel: "International Charity Gala 2027", url: "gala.html" },
    { titel: "Weitere Veranstaltungen", url: "veranstaltungen.html" }
  ]},
  { titel: "Aktuelles", url: "aktuelles.html" },
  { titel: "Helfen", unter: [
    { titel: "Projekte unterstützen", url: "spenden.html" },
    { titel: "Wunschkalender „Paws of Hope“", url: "wunschkalender.html" },
    { titel: "Mitmachen & Zusammenarbeit", url: "mitmachen.html" },
    { titel: "Kontakt", url: "kontakt.html" }
  ]}
];

// ---------- Projekte: eigene Bereiche mit Logo, Unterseiten und Kanälen ----------
const BEREICHE = {
  catrescue: {
    name: "Dar Al-Rahma Cat Rescue",
    zusatz: "Tierschutz Nord-Gaza",
    logo: "assets/logo-cat-rescue.jpg",
    seiten: [
      { titel: "Übersicht", url: "tierschutz.html" },
      { titel: "Die Tiere", url: "tiere.html" },
      { titel: "Tiere in Gaza", url: "tiere-in-gaza.html" },
      { titel: "Patenschaften", url: "patenschaft.html" },
      { titel: "Wunschkalender", url: "wunschkalender.html" },
      { titel: "Unterstützen", url: "spenden.html#catrescue" }
    ],
    sozial: [
      { titel: "Instagram", url: "https://www.instagram.com/daralrahmacatrescue/" },
      { titel: "TikTok", url: "https://www.tiktok.com/@daralrahmacatrescue" }
    ]
  },
  kinder: {
    name: "Dar Al-Rahma Children's Relief",
    zusatz: "Sammelbereich für Kinderprojekte",
    logo: "assets/logo-childrens-relief-vorlaeufig.jpg",
    seiten: [
      { titel: "Übersicht", url: "kinderhilfe.html" },
      { titel: "Unterstützen", url: "spenden.html#kids4hope" }
    ],
    sozial: []
  },
  kids4hope: {
    name: "Kids4Hope",
    zusatz: "Together for a brighter tomorrow",
    logo: "assets/kids4hope/logo.png",
    hell: true,
    seiten: [
      { titel: "Übersicht", url: "kids4hope.html" },
      { titel: "Unterstützen", url: "spenden.html#kids4hope" }
    ],
    sozial: [
      { titel: "kids4hope.com", url: "https://kids4hope.com/" }
    ]
  },
  gazahilfspool: {
    name: "Gazahilfspool",
    zusatz: "Familienpatenschaften in Gaza",
    logo: null,
    seiten: [
      { titel: "Übersicht", url: "gazahilfspool.html" },
      { titel: "Unterstützen", url: "spenden.html#gazahilfspool" }
    ],
    sozial: []
  },
  medical: {
    name: "Medical Point North Gaza",
    zusatz: "Notfallversorgung Nord-Gaza",
    logo: "assets/logo-medical-point.png",
    hell: true,
    seiten: [
      { titel: "Übersicht", url: "medical-point.html" },
      { titel: "Unterstützen", url: "spenden.html#medicalpoint" }
    ],
    sozial: []
  }
};

(function () {
  const hier = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const aktuell = (url) => (url === hier ? ' aria-current="page"' : "");

  // Zu welchem Projekt gehört diese Seite? (Spenden-Seite gehört zum Haus)
  let bereichKey = null;
  for (const [k, b] of Object.entries(BEREICHE)) {
    if (b.seiten.some((s) => s.url === hier)) { bereichKey = k; break; }
  }
  const bereich = bereichKey ? BEREICHE[bereichKey] : null;

  const punkte = MENU.map((p, i) => {
    if (!p.unter) return `<li><a href="${p.url}"${aktuell(p.url)}>${esc(p.titel)}</a></li>`;
    const aktiv = p.unter.some((u) => u.url === hier) || (p.titel === "Projekte" && bereich);
    const unter = p.unter.map((u) => u.gruppe
      ? `<li class="gruppe">${esc(u.gruppe)}</li>`
      : `<li><a href="${u.url}"${aktuell(u.url) || (bereich && u.url === bereich.seiten[0].url ? ' class="im-bereich"' : "")}>${esc(u.titel)}</a></li>`).join("");
    return `<li class="hat-unter${aktiv ? " aktiv" : ""}"><button type="button" aria-expanded="false" aria-controls="um${i}">${esc(p.titel)} <span aria-hidden="true">▾</span></button><ul id="um${i}" class="untermenue">${unter}</ul></li>`;
  }).join("");

  const sozialKnoepfe = (liste, klein) => liste.map((s) =>
    `<a class="btn btn-sozial${klein ? " klein" : ""}" href="${s.url}" target="_blank" rel="noopener">${esc(s.titel)}</a>`).join("");

  const leiste = bereich ? `
<div class="projektleiste">
  <div class="wrap pl-zeile">
    <a class="pl-marke" href="${bereich.seiten[0].url}">${bereich.logo ? `<img src="${bereich.logo}" alt=""${bereich.hell ? ' class="hell"' : ""}>` : ""}<span><b>${esc(bereich.name)}</b><small>${esc(bereich.zusatz)} · begleitet von Dar Al-Rahma</small></span></a>
    <nav class="pl-nav" aria-label="Projekt ${esc(bereich.name)}">${bereich.seiten.map((s) => `<a href="${s.url}"${aktuell(s.url)}>${esc(s.titel)}</a>`).join("")}</nav>
    ${bereich.sozial.length ? `<div class="pl-sozial">${sozialKnoepfe(bereich.sozial, true)}</div>` : ""}
  </div>
</div>` : "";

  const kopf = document.getElementById("kopf");
  if (kopf) {
    kopf.outerHTML = `
<div class="draft">Entwurf · noch nicht veröffentlicht · Spendenlinks, Kontakt und Impressum folgen</div>
<div class="gruendungsband">Die gemeinnützige UG ist in Vorbereitung – bis dahin unterstützt du die Projekte direkt. <a href="gruendung.html">Mehr erfahren</a></div>
<header>
  <div class="wrap kopfzeile">
    <a class="brand" href="index.html"><img src="assets/logo-center.jpg" alt=""><span>Dar Al-Rahma<small>Netzwerk der Barmherzigkeit</small></span></a>
    <button type="button" class="menueknopf" aria-expanded="false" aria-controls="hauptmenue">Menü</button>
    <nav aria-label="Hauptmenü"><ul id="hauptmenue" class="hauptmenue">${punkte}<li><a class="btn voll menue-spenden" href="spenden.html">Spenden</a></li></ul></nav>
  </div>
</header>${leiste}`;
  }

  const fuss = document.getElementById("fuss");
  if (fuss) {
    const spalte = (titel) => {
      const p = MENU.find((m) => m.titel === titel);
      return (p && p.unter ? p.unter : []).filter((u) => u.url).map((u) => `<a href="${u.url}">${esc(u.titel)}</a>`).join("");
    };
    fuss.outerHTML = `
<footer>
  <div class="wrap">
  ${bereich ? `<div class="fuss-projekt">${bereich.logo ? `<img src="${bereich.logo}" alt="Logo ${esc(bereich.name)}"${bereich.hell ? ' class="hell"' : ""}>` : ""}<div><b>${esc(bereich.name)}</b><br>ein eigenständiges Projekt, begleitet und unterstützt von Dar Al-Rahma</div>${bereich.sozial.length ? `<div class="sozial">${sozialKnoepfe(bereich.sozial, true)}</div>` : ""}</div>` : ""}
    <div class="fuss-raster">
      <div class="fuss-marke"><img src="assets/logo-center-siegel.jpg" alt="Siegel Dar Al-Rahma Center"><p>Dar Al-Rahma ist ein Netzwerk: Wir begleiten und unterstützen bestehende Projekte vor Ort und verbinden sie miteinander – denn gemeinsam ist man stark.</p></div>
      <div><h4>Projekte im Netzwerk</h4>${spalte("Projekte")}</div>
      <div><h4>Über uns</h4>${spalte("Über uns")}</div>
      <div><h4>Helfen</h4>${spalte("Helfen")}<a href="aktuelles.html">Aktuelles</a><a href="gala.html">Gala 2027</a></div>
    </div>
    <div class="fuss-unten"><span>Dar Al-Rahma Center · Gründung einer gemeinnützigen UG in Vorbereitung</span><span><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a></span></div>
  </div>
</footer>`;
  }

  // Bedienung: Handy-Menü und Untermenüs
  const knopf = document.querySelector(".menueknopf");
  const haupt = document.getElementById("hauptmenue");
  if (knopf) knopf.addEventListener("click", () => {
    const auf = knopf.getAttribute("aria-expanded") !== "true";
    knopf.setAttribute("aria-expanded", auf);
    haupt.classList.toggle("offen", auf);
  });
  const alleZu = () => document.querySelectorAll(".hat-unter.offen").forEach((li) => { li.classList.remove("offen"); li.querySelector("button").setAttribute("aria-expanded", "false"); });
  document.querySelectorAll(".hat-unter > button").forEach((b) => {
    b.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const auf = b.getAttribute("aria-expanded") !== "true";
      alleZu();
      b.setAttribute("aria-expanded", auf);
      b.parentElement.classList.toggle("offen", auf);
    });
  });
  document.addEventListener("click", alleZu);
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") alleZu(); });
})();

// ---------- Moderne Bedienelemente (gelten auf allen Seiten) ----------
(function () {
  // Banner-Slider: <div class="banner"> mit mehreren .folie, Punkte werden erzeugt
  document.querySelectorAll(".banner").forEach((banner) => {
    const folien = [...banner.querySelectorAll(".folie")];
    if (folien.length < 2) { folien.forEach((f) => f.classList.add("an")); return; }
    const leiste = document.createElement("div");
    leiste.className = "punkte";
    let nr = 0, uhr;
    const zeige = (i) => {
      nr = (i + folien.length) % folien.length;
      folien.forEach((f, k) => f.classList.toggle("an", k === nr));
      leiste.querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-current", k === nr));
    };
    folien.forEach((f, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Bild " + (i + 1) + " zeigen");
      b.addEventListener("click", () => { zeige(i); neu(); });
      leiste.appendChild(b);
    });
    banner.appendChild(leiste);
    const neu = () => { clearInterval(uhr); if (!matchMedia("(prefers-reduced-motion: reduce)").matches) uhr = setInterval(() => zeige(nr + 1), 6500); };
    zeige(0); neu();
  });

  // Wendekarten: am Handy per Tippen drehen, per Tastatur mit Enter
  document.querySelectorAll(".wende").forEach((k) => {
    k.addEventListener("click", (ev) => { if (!ev.target.closest("a")) k.classList.toggle("gedreht"); });
    k.addEventListener("keydown", (ev) => { if (ev.key === "Enter" && !ev.target.closest("a")) k.classList.toggle("gedreht"); });
  });

  // Einblenden beim Scrollen
  const teile = document.querySelectorAll(".zeigen");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((eintraege) => eintraege.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("da"); io.unobserve(e.target); } }), { threshold: .12 });
    teile.forEach((t) => io.observe(t));
    setTimeout(() => teile.forEach((t) => t.classList.add("da")), 2500);
  } else teile.forEach((t) => t.classList.add("da"));

  // Galerien als Karussell: Pfeile + Zähler (wischen geht immer)
  document.querySelectorAll(".mosaik").forEach((m) => {
    const karten = [...m.children];
    if (karten.length < 2 || m.parentElement.classList.contains("gal-huelle")) return;
    const huelle = document.createElement("div");
    huelle.className = "gal-huelle";
    m.before(huelle); huelle.append(m);
    const pfeil = (seite, zeichen, text) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "gal-pfeil " + seite; b.textContent = zeichen; b.setAttribute("aria-label", text);
      b.addEventListener("click", () => m.scrollBy({ left: (seite === "links" ? -1 : 1) * m.clientWidth * 0.9, behavior: "smooth" }));
      huelle.append(b); return b;
    };
    const li = pfeil("links", "‹", "Vorherige Bilder"), re = pfeil("rechts", "›", "Weitere Bilder");
    const z = document.createElement("p"); z.className = "gal-zaehler"; huelle.after(z);
    const stand = () => {
      const breite = karten[0].getBoundingClientRect().width + parseFloat(getComputedStyle(m).columnGap || 0);
      const sichtbar = Math.max(1, Math.round(m.clientWidth / breite));
      const erstes = Math.min(karten.length, Math.round(m.scrollLeft / breite) + 1);
      const letztes = Math.min(karten.length, erstes + sichtbar - 1);
      z.innerHTML = `<b>${erstes}${letztes > erstes ? "–" + letztes : ""}</b> von ${karten.length} Bildern · wischen oder Pfeile`;
      li.disabled = m.scrollLeft < 8;
      re.disabled = m.scrollLeft + m.clientWidth >= m.scrollWidth - 8;
    };
    m.addEventListener("scroll", () => requestAnimationFrame(stand), { passive: true });
    window.addEventListener("resize", stand);
    // Karussell in zugeklappten Bereichen erst beim Öffnen vermessen
    const klapp = m.closest("details"); if (klapp) klapp.addEventListener("toggle", stand);
    stand();
  });

  // Fotogalerie (.mosaik) mit Großansicht; sensible Bilder erst nach Klick
  const mosaike = document.querySelectorAll(".mosaik, .bildgruppe");
  if (!mosaike.length) return;
  const gb = document.createElement("div");
  gb.className = "grossbild";
  gb.setAttribute("role", "dialog");
  gb.setAttribute("aria-modal", "true");
  gb.innerHTML = '<button type="button" class="zu" aria-label="Schließen">×</button><button type="button" class="zurueck" aria-label="Vorheriges Bild">‹</button><img alt=""><button type="button" class="vor" aria-label="Nächstes Bild">›</button><div class="text-unten"></div>';
  document.body.appendChild(gb);
  let liste = [], pos = 0, zuletzt = null;
  const bild = gb.querySelector("img"), txt = gb.querySelector(".text-unten");
  const zeige = (i) => {
    pos = (i + liste.length) % liste.length;
    const b = liste[pos];
    bild.src = b.dataset.gross || b.querySelector("img").src;
    bild.alt = b.querySelector("img").alt;
    txt.textContent = b.dataset.text || b.querySelector("img").alt;
  };
  const zu = () => { gb.classList.remove("offen"); document.body.style.overflow = ""; if (zuletzt) zuletzt.focus(); };
  mosaike.forEach((m) => {
    const knoepfe = [...m.querySelectorAll("button")].filter((b) => b.querySelector("img"));
    knoepfe.forEach((b) => b.addEventListener("click", () => {
      if (b.classList.contains("sensibel") && !b.classList.contains("frei")) { b.classList.add("frei"); return; }
      liste = knoepfe.filter((x) => !x.classList.contains("sensibel") || x.classList.contains("frei"));
      zuletzt = b;
      zeige(liste.indexOf(b));
      gb.classList.add("offen");
      document.body.style.overflow = "hidden";
      gb.querySelector(".zu").focus();
    }));
  });
  gb.querySelector(".zu").addEventListener("click", zu);
  gb.querySelector(".vor").addEventListener("click", () => zeige(pos + 1));
  gb.querySelector(".zurueck").addEventListener("click", () => zeige(pos - 1));
  gb.addEventListener("click", (ev) => { if (ev.target === gb) zu(); });
  document.addEventListener("keydown", (ev) => {
    if (!gb.classList.contains("offen")) return;
    if (ev.key === "Escape") zu();
    if (ev.key === "ArrowRight") zeige(pos + 1);
    if (ev.key === "ArrowLeft") zeige(pos - 1);
  });
})();

// ---------- Zahlen zählen beim Hinscrollen hoch ----------
(function () {
  const ziele = document.querySelectorAll(".zahlenband b, .wende.klein .wende-vorne b, .zahl");
  if (!ziele.length || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const teile = [];
  ziele.forEach((el) => {
    const text = el.textContent;
    // Datumsangaben (12.01.2026) und Spannen (30–45) bleiben stehen
    if (/\d+\.\d+\.\d{4}/.test(text) || /\d\s*[–-]\s*\d/.test(text)) return;
    const m = text.match(/\d[\d.]*(,\d+)?/);
    if (!m) return;
    const roh = m[0];
    const komma = roh.includes(",") ? roh.split(",")[1].length : 0;
    const wert = parseFloat(roh.replace(/\./g, "").replace(",", "."));
    if (!isFinite(wert) || wert === 0) return;
    const vor = text.slice(0, m.index), nach = text.slice(m.index + roh.length);
    const tausender = roh.includes(".") || wert >= 10000;
    const fmt = (z) => z.toLocaleString("de-DE", { minimumFractionDigits: komma, maximumFractionDigits: komma, useGrouping: tausender });
    teile.push({ el, vor, nach, wert, fmt, ende: text });
    el.textContent = vor + fmt(0) + nach;
  });
  const lauf = (t) => {
    const dauer = 1800, start = performance.now();
    const schritt = (jetzt) => {
      const p = Math.min(1, (jetzt - start) / dauer);
      const e = 1 - Math.pow(1 - p, 3);
      t.el.textContent = p < 1 ? t.vor + t.fmt(t.wert * e) + t.nach : t.ende;
      if (p < 1) requestAnimationFrame(schritt);
    };
    requestAnimationFrame(schritt);
  };
  if (!("IntersectionObserver" in window)) { teile.forEach((t) => (t.el.textContent = t.ende)); return; }
  const io = new IntersectionObserver((eintraege) => eintraege.forEach((e) => {
    if (!e.isIntersecting) return;
    const t = teile.find((x) => x.el === e.target);
    if (t) lauf(t);
    io.unobserve(e.target);
  }), { threshold: 0.5 });
  teile.forEach((t) => io.observe(t.el));
})();

// ---------- Sternenhimmel (Hintergrund aller Seiten + Nachthimmel-Bereiche) ----------
(function () {
  const ruhig = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function himmel(canvas, opt) {
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = 1, sterne = [], schnuppen = [], eigene = [], laeuft = true;
    const farben = opt.farben;
    const neu = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const anzahl = Math.round((w * h) / opt.dichte);
      sterne = Array.from({ length: anzahl }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() < 0.08 ? 1.4 + Math.random() * 1.2 : 0.4 + Math.random() * 0.9,
        p: Math.random() * Math.PI * 2, s: 0.4 + Math.random() * 1.4,
        f: farben[Math.floor(Math.random() * farben.length)]
      }));
    };
    const funkeln = (x, y, r, a, f) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
      g.addColorStop(0, `rgba(${f},${a * 0.55})`); g.addColorStop(1, `rgba(${f},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(${f},${a * 0.7})`; ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(x - r * 5, y); ctx.lineTo(x + r * 5, y); ctx.moveTo(x, y - r * 5); ctx.lineTo(x, y + r * 5); ctx.stroke();
    };
    const zeichne = (t) => {
      ctx.clearRect(0, 0, w, h);
      if (opt.milchstrasse) {
        const g = ctx.createLinearGradient(w * 0.15, h, w * 0.85, 0);
        g.addColorStop(0, "rgba(240,207,122,0)"); g.addColorStop(0.5, "rgba(240,207,122,0.06)"); g.addColorStop(1, "rgba(240,207,122,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      }
      for (const s of sterne) {
        const a = ruhig ? 0.8 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t / 1000 * s.s + s.p));
        ctx.fillStyle = `rgba(${s.f},${a})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
        if (s.r > 1.4) funkeln(s.x, s.y, s.r, a, s.f);
      }
      for (const e of eigene) {
        const alter = (t - e.t0) / 1000, a = Math.min(1, alter * 2);
        const puls = 0.75 + 0.25 * Math.sin(t / 400 + e.p);
        ctx.fillStyle = `rgba(255,214,120,${a})`;
        ctx.beginPath(); ctx.arc(e.x, e.y, 2.2 * puls, 0, Math.PI * 2); ctx.fill();
        funkeln(e.x, e.y, 2.4 * puls, a, "255,214,120");
      }
      if (!ruhig && Math.random() < opt.schnuppe) {
        schnuppen.push({ x: Math.random() * w * 0.8 + w * 0.2, y: Math.random() * h * 0.4, vx: -(4 + Math.random() * 4), vy: 1.6 + Math.random() * 1.6, l: 1 });
      }
      schnuppen = schnuppen.filter((s) => s.l > 0);
      for (const s of schnuppen) {
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14);
        g.addColorStop(0, `rgba(255,255,255,${s.l})`); g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14); ctx.stroke();
        s.x += s.vx; s.y += s.vy; s.l -= 0.012;
      }
      if (laeuft && !ruhig) requestAnimationFrame(zeichne);
    };
    neu();
    window.addEventListener("resize", () => { neu(); if (ruhig) zeichne(0); });
    document.addEventListener("visibilitychange", () => {
      const vorher = laeuft; laeuft = !document.hidden;
      if (laeuft && !vorher && !ruhig) requestAnimationFrame(zeichne);
    });
    requestAnimationFrame(zeichne);
    return {
      stern(x, y) { eigene.push({ x, y, t0: performance.now(), p: Math.random() * 6 }); if (ruhig) zeichne(performance.now() + 1000); return eigene.length; }
    };
  }

  // 1) Dezenter Sternenhimmel hinter allen Seiten
  const hg = document.createElement("canvas");
  hg.className = "sternenhimmel";
  hg.setAttribute("aria-hidden", "true");
  document.body.prepend(hg);
  himmel(hg, { dichte: 4000, schnuppe: 0.0025, milchstrasse: false, farben: ["255,255,255", "255,236,190", "240,207,122"] });

  // 1b) Sterne über Bildern (z. B. Startseiten-Banner): <canvas class="sterne-ueber">
  document.querySelectorAll("canvas.sterne-ueber").forEach((c) => {
    himmel(c, { dichte: 1800, schnuppe: 0.012, milchstrasse: true, farben: ["255,255,255", "255,236,190", "240,207,122"] });
  });

  // 2) Nachthimmel-Bereiche (z. B. Kids4Hope): <div class="nachthimmel"><canvas></canvas>…</div>
  document.querySelectorAll(".nachthimmel").forEach((bereich) => {
    const c = bereich.querySelector("canvas");
    if (!c) return;
    const schwarz = bereich.classList.contains("schwarz");
    const hm = himmel(c, { dichte: 2600, schnuppe: 0.008, milchstrasse: !schwarz, farben: ["255,255,255", "255,236,190", "240,207,122"] });
    const zaehler = bereich.querySelector("[data-sterne]");
    let anzahl = 0;
    c.addEventListener("click", (ev) => {
      const r = c.getBoundingClientRect();
      hm.stern(ev.clientX - r.left, ev.clientY - r.top);
      anzahl++;
      if (zaehler) zaehler.textContent = anzahl;
    });
    const knopf = bereich.querySelector("[data-stern-knopf]");
    if (knopf) knopf.addEventListener("click", () => {
      const r = c.getBoundingClientRect();
      hm.stern(r.width * (0.15 + Math.random() * 0.7), r.height * (0.08 + Math.random() * 0.35));
      anzahl++;
      if (zaehler) zaehler.textContent = anzahl;
    });
  });
})();
