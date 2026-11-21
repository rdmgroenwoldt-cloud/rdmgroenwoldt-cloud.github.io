// Katzen-Patenschaften: Karten, Betragswahl, Auswahl-Leiste
// bedarf = vorgeschlagener Monatsbetrag (€), schon = bereits zugesagt (€)
const PATENKATZEN = [
  { id: "sumada", name: "Sumada", zeile: "Mutterkatze · 7 Kitten", text: "Die erste Mutterkatze von Cat Rescue. Mit ihr hat alles angefangen.", gruppe: ["mutter"], bedarf: 25, schon: 0 },
  { id: "mutter", name: "Getigerte Mutter", zeile: "Mutterkatze · 5 Kitten · noch ohne Namen", text: "Aus den Trümmern gerettet, mit fünf Kitten. Als Pate darfst du ihr einen Namen geben.", gruppe: ["mutter", "ohne-namen"], bedarf: 25, schon: 0 },
  { id: "schwarzweiss", name: "Schwarz-weiße Katze", zeile: "kam allein · noch ohne Namen", text: "Gelbgrüne Augen, weiße Pfoten – und noch ohne Namen. Wer gibt ihr einen?", gruppe: ["ohne-namen"], bedarf: 25, schon: 0 },
  { id: "ashanti", name: "Ashanti", zeile: "Kitten von Sumada", text: "Dreifarbig und neugierig – trägt eine Kette in den Farben Palästinas.", gruppe: ["kitten"], bedarf: 25, schon: 0 },
  { id: "lima", name: "Lima", zeile: "Kitten von Sumada", text: "Dreifarbig, mit großen Ohren und wachem Blick.", gruppe: ["kitten"], bedarf: 25, schon: 0 },
  { id: "palestine", name: "Palestine", zeile: "Kitten von Sumada", text: "Weiß-rot und immer auf Entdeckungstour.", gruppe: ["kitten"], bedarf: 25, schon: 0 },
  { id: "zaytouna", name: "Zaytouna", zeile: "Kitten von Sumada", text: "Sitzt am liebsten oben auf dem Holzregal.", gruppe: ["kitten"], bedarf: 25, schon: 0 },
  { id: "nadija", name: "Nadija", zeile: "Kitten von Sumada", text: "Rot getigert, liegt gern auf dem roten Teppich.", gruppe: ["kitten"], bedarf: 25, schon: 0 },
  { id: "latifa", name: "Latifa", zeile: "Kitten von Sumada", text: "Weiß-rot, mit hellen Augen.", gruppe: ["kitten"], bedarf: 25, schon: 0 },
  { id: "cataleya", name: "Cataleya", zeile: "Kitten von Sumada", text: "Mit langem, geringeltem Schwanz.", gruppe: ["kitten"], bedarf: 25, schon: 0 },
  { id: "elsa", name: "Elsa", zeile: "Kitten der getigerten Mutter", text: "Hell rot-weiß, mit hellblauen Augen.", gruppe: ["kitten"], bedarf: 25, schon: 0 },
  { id: "luna", name: "Luna", zeile: "Kitten der getigerten Mutter", text: "Grau-weiß, mit blauen Augen und rosa Nase.", gruppe: ["kitten"], bedarf: 25, schon: 0 },
  { id: "subaia", name: "Subaia", zeile: "Kitten der getigerten Mutter", text: "Dreifarbig – das Gesicht halb dunkel, halb rot.", gruppe: ["kitten"], bedarf: 25, schon: 0 },
  { id: "mulan", name: "Mulan", zeile: "Kitten der getigerten Mutter", text: "Rot-weiß und mutig.", gruppe: ["kitten"], bedarf: 25, schon: 0 },
  { id: "hind", name: "Hind", zeile: "Kitten der getigerten Mutter", text: "Hell cremefarben, die Kleinste der Familie.", gruppe: ["kitten"], bedarf: 25, schon: 0 }
];

(function () {
  const raster = document.getElementById("paten-raster");
  if (!raster) return;
  const auswahl = {}; // id -> Betrag
  const euro = (z) => z.toLocaleString("de-DE") + " €";

  PATENKATZEN.forEach((k) => {
    const karte = document.createElement("article");
    karte.className = "patenkarte zeigen";
    karte.dataset.gruppe = k.gruppe.join(" ");
    const stufen = [5, 10, 20].filter((b) => b < k.bedarf);
    karte.innerHTML = `
      <div class="kopf">
        <button type="button" data-gross="assets/katzen/${k.id}-gross.jpg" data-text="${k.name}"><img src="assets/katzen/${k.id}.jpg" alt="${k.name}" loading="lazy"></button>
        <div><span class="status">${k.schon > 0 ? "teilweise mit Paten" : "noch ohne Paten"}</span><h3>${k.name}</h3><div class="zeile">${k.zeile}</div></div>
      </div>
      <p>${k.text}</p>
      <div class="fortschritt" aria-hidden="true"><i style="width:${Math.min(100, (k.schon / k.bedarf) * 100)}%"></i></div>
      <div class="fortschritt-text"><span>${euro(k.schon)} von ${euro(k.bedarf)} im Monat</span><span>${k.schon > 0 ? "" : "noch kein Pate"}</span></div>
      <div class="betraege" role="group" aria-label="Monatsbetrag für ${k.name}">
        ${stufen.map((b) => `<button type="button" data-b="${b}" aria-pressed="${b === 10}">${b} €</button>`).join("")}
        <button type="button" class="voll" data-b="${k.bedarf}" aria-pressed="false">Vollpatenschaft · ${euro(k.bedarf)} mtl.</button>
      </div>
      <div class="wahl-text"><b data-betrag>10 €</b> / Monat <small data-rest>· danach fehlen noch ${euro(k.bedarf - k.schon - 10)}</small></div>
      <button type="button" class="btn voll" data-waehlen>Pate werden →</button>`;
    let betrag = 10;
    const zeigeBetrag = () => {
      karte.querySelector("[data-betrag]").textContent = euro(betrag);
      const rest = k.bedarf - k.schon - betrag;
      karte.querySelector("[data-rest]").textContent = rest > 0 ? "· danach fehlen noch " + euro(rest) : "· damit ist der Bedarf gedeckt";
      karte.querySelectorAll(".betraege button").forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.b === betrag)));
      if (auswahl[k.id] !== undefined) { auswahl[k.id] = betrag; aktualisieren(); }
    };
    karte.querySelectorAll(".betraege button").forEach((b) => b.addEventListener("click", () => { betrag = +b.dataset.b; zeigeBetrag(); }));
    const knopf = karte.querySelector("[data-waehlen]");
    knopf.addEventListener("click", () => {
      if (auswahl[k.id] === undefined) { auswahl[k.id] = betrag; karte.classList.add("gewaehlt"); knopf.textContent = "Ausgewählt ✓ (entfernen)"; }
      else { delete auswahl[k.id]; karte.classList.remove("gewaehlt"); knopf.textContent = "Pate werden →"; }
      aktualisieren();
    });
    raster.appendChild(karte);
  });

  // Karussell: je eine „Seite“ (3 Karten am PC, 2 am Tablet, 1 am Handy) weiterwischen
  const links = document.querySelector(".karussell-pfeil.links"), rechts = document.querySelector(".karussell-pfeil.rechts");
  const punkte = document.getElementById("karussell-punkte");
  const seite = () => raster.clientWidth + 20;
  const seitenZahl = () => Math.max(1, Math.ceil((raster.scrollWidth - 4) / seite()));
  function karussell() {
    const n = seitenZahl(), akt = Math.round(raster.scrollLeft / seite());
    if (punkte.children.length !== n) {
      punkte.innerHTML = "";
      for (let i = 0; i < n; i++) {
        const b = document.createElement("button");
        b.type = "button"; b.setAttribute("aria-label", "Seite " + (i + 1));
        b.addEventListener("click", () => raster.scrollTo({ left: i * seite() }));
        punkte.appendChild(b);
      }
    }
    [...punkte.children].forEach((b, i) => b.setAttribute("aria-current", String(i === akt)));
    if (links) links.disabled = raster.scrollLeft < 10;
    if (rechts) rechts.disabled = raster.scrollLeft + raster.clientWidth >= raster.scrollWidth - 10;
  }
  if (links) links.addEventListener("click", () => raster.scrollBy({ left: -seite() }));
  if (rechts) rechts.addEventListener("click", () => raster.scrollBy({ left: seite() }));
  raster.addEventListener("scroll", () => requestAnimationFrame(karussell), { passive: true });
  window.addEventListener("resize", karussell);
  setTimeout(karussell, 50);

  // Filter
  document.querySelectorAll(".paten-filter button").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll(".paten-filter button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    raster.querySelectorAll(".patenkarte").forEach((k) => { k.hidden = b.dataset.f !== "alle" && !k.dataset.gruppe.split(" ").includes(b.dataset.f); });
    raster.scrollTo({ left: 0 }); punkte.innerHTML = ""; setTimeout(karussell, 50);
  }));

  // Auswahl-Leiste und Abschluss
  const leiste = document.getElementById("auswahl-leiste");
  const abschluss = document.getElementById("abschluss");
  const liste = document.getElementById("abschluss-liste");
  function text() {
    const ids = Object.keys(auswahl);
    const summe = ids.reduce((s, id) => s + auswahl[id], 0);
    return "Hallo Cat Rescue, ich möchte Pate werden:\n" + ids.map((id) => "- " + PATENKATZEN.find((k) => k.id === id).name + ": " + euro(auswahl[id]) + " im Monat").join("\n") + "\nZusammen: " + euro(summe) + " im Monat";
  }
  function aktualisieren() {
    const ids = Object.keys(auswahl);
    const summe = ids.reduce((s, id) => s + auswahl[id], 0);
    document.getElementById("leiste-anzahl").textContent = ids.length;
    document.getElementById("leiste-summe").textContent = euro(summe);
    leiste.classList.toggle("da", ids.length > 0);
    abschluss.hidden = ids.length === 0;
    document.getElementById("abschluss-summe").textContent = euro(summe);
    liste.innerHTML = "";
    ids.forEach((id) => {
      const k = PATENKATZEN.find((x) => x.id === id);
      const li = document.createElement("li");
      li.innerHTML = `<span>${k.name} – ${euro(auswahl[id])} im Monat</span>`;
      const weg = document.createElement("button");
      weg.type = "button"; weg.textContent = "entfernen";
      weg.addEventListener("click", () => raster.querySelectorAll(".patenkarte").forEach((karte) => { if (karte.querySelector("h3").textContent === k.name) karte.querySelector("[data-waehlen]").click(); }));
      li.appendChild(weg);
      liste.appendChild(li);
    });
  }
  const kopieren = document.getElementById("auswahl-kopieren");
  if (kopieren) kopieren.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(text()); document.getElementById("kopiert-hinweis").hidden = false; } catch (e) { /* Zwischenablage nicht verfügbar */ }
  });
})();
