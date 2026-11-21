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
      { titel: "Patenschaft & Namensgebung", url: "patenschaft.html" },
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
    const knoepfe = [...m.querySelectorAll("button")];
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
