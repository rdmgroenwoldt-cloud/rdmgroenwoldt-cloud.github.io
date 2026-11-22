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

(async function () {
  const raster = document.getElementById("paten-raster");
  if (!raster) return;
  // Stand aus der Spenden-Zentrale: data-api am Raster (oder ?paten-api= nur lokal). Ohne Server gelten die Werte oben.
  const api = raster.dataset.api || (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? new URLSearchParams(location.search).get("paten-api") : "");
  if (api) {
    try {
      const r = await fetch(api, { cache: "no-store" });
      const j = r.ok ? await r.json() : null;
      (j && Array.isArray(j.tiere) ? j.tiere : []).forEach((t) => {
        const k = PATENKATZEN.find((x) => x.id === t.id);
        if (k && t.bedarf > 0) { k.bedarf = +t.bedarf; k.schon = Math.max(0, +t.schon || 0); }
      });
    } catch (e) { /* Server nicht erreichbar: Karten bleiben mit den Grundwerten bedienbar */ }
  }
  const PS_SPRACHE = (document.documentElement.lang || "de").slice(0, 2);
  const PS_WURZEL = PS_SPRACHE === "de" ? "" : "../";
  const PS_T = {
    de: { pate: "Pate werden", waehlen: "Auswählen", gewaehlt: "Ausgewählt", entfernen: "entfernen", rest: "es fehlen dann noch", gedeckt: "damit ist alles gedeckt", imMonat: "im Monat", ganz: "ganz", von: "von", teil: "teilweise mit Paten", sucht: "sucht Paten", monatsbetrag: "Monatsbetrag für", seite: "Seite", hallo: "Hallo Cat Rescue, ich möchte Pate werden:", zusammen: "Zusammen" },
    en: { pate: "Become a sponsor", waehlen: "Select", gewaehlt: "Selected", entfernen: "remove", rest: "then still missing", gedeckt: "that covers everything", imMonat: "per month", ganz: "full", von: "of", teil: "partly sponsored", sucht: "looking for sponsors", monatsbetrag: "Monthly amount for", seite: "Page", hallo: "Hello Cat Rescue, I would like to become a sponsor:", zusammen: "Total" },
    ar: { pate: "كن كافلًا", waehlen: "اختيار", gewaehlt: "تم الاختيار", entfernen: "إزالة", rest: "سيبقى ناقصًا", gedeckt: "وبذلك تتم تغطية كل شيء", imMonat: "شهريًا", ganz: "كامل", von: "من", teil: "لها كفلاء جزئيًا", sucht: "تبحث عن كفلاء", monatsbetrag: "المبلغ الشهري لـ", seite: "صفحة", hallo: "مرحبًا Cat Rescue، أرغب في أن أصبح كافلًا:", zusammen: "المجموع" }
  };
  const ps = (k) => (PS_T[PS_SPRACHE] || PS_T.de)[k] ?? PS_T.de[k];
  const PS_KATZEN = {
    sumada: { en: ["Mother cat · 7 kittens", "Cat Rescue's first mother cat. It all began with her."], ar: ["قطة أم · 7 صغار", "أول قطة أم لدى Cat Rescue. ومعها بدأ كل شيء."] },
    mutter: { en: ["Mother cat · 5 kittens · still unnamed", "Rescued from the rubble with five kittens. As her sponsor, you get to give her a name."], ar: ["قطة أم · 5 صغار · بلا اسم بعد", "أُنقذت من تحت الأنقاض مع صغارها الخمسة. وبصفتك كافلًا لها يمكنك أن تمنحها اسمًا."] },
    schwarzweiss: { en: ["came alone · still unnamed", "Yellow-green eyes, white paws – and still no name. Who will give her one?"], ar: ["جاءت وحدها · بلا اسم بعد", "عيون صفراء مخضرّة وأقدام بيضاء – وما زالت بلا اسم. من يمنحها اسمًا؟"] },
    ashanti: { en: ["Kitten of Sumada", "Tricolour and curious – she wears a necklace in the colours of Palestine."], ar: ["من صغار سمادا", "ثلاثية الألوان وفضولية – تضع قلادة بألوان فلسطين."] },
    lima: { en: ["Kitten of Sumada", "Tricolour, with big ears and watchful eyes."], ar: ["من صغار سمادا", "ثلاثية الألوان، بأذنين كبيرتين ونظرة يقظة."] },
    palestine: { en: ["Kitten of Sumada", "White and red, and always off exploring."], ar: ["من صغار سمادا", "بيضاء وحمراء، وفي رحلة استكشاف دائمًا."] },
    zaytouna: { en: ["Kitten of Sumada", "Loves to sit up on the wooden shelf."], ar: ["من صغار سمادا", "تحب الجلوس في أعلى الرف الخشبي."] },
    nadija: { en: ["Kitten of Sumada", "Red tabby, loves lying on the red rug."], ar: ["من صغار سمادا", "حمراء مخططة، تحب الاستلقاء على السجادة الحمراء."] },
    latifa: { en: ["Kitten of Sumada", "White and red, with bright eyes."], ar: ["من صغار سمادا", "بيضاء وحمراء، بعينين فاتحتين."] },
    cataleya: { en: ["Kitten of Sumada", "With a long, curled tail."], ar: ["من صغار سمادا", "بذيل طويل ملتف."] },
    elsa: { en: ["Kitten of the tabby mother", "Light red and white, with pale blue eyes."], ar: ["من صغار الأم المخططة", "أحمر فاتح وأبيض، بعينين زرقاوين فاتحتين."] },
    luna: { en: ["Kitten of the tabby mother", "Grey and white, with blue eyes and a pink nose."], ar: ["من صغار الأم المخططة", "رمادية وبيضاء، بعينين زرقاوين وأنف وردي."] },
    subaia: { en: ["Kitten of the tabby mother", "Tricolour – her face half dark, half red."], ar: ["من صغار الأم المخططة", "ثلاثية الألوان – وجهها نصفه داكن ونصفه أحمر."] },
    mulan: { en: ["Kitten of the tabby mother", "Red and white, and brave."], ar: ["من صغار الأم المخططة", "حمراء وبيضاء وشجاعة."] },
    hind: { en: ["Kitten of the tabby mother", "Light cream-coloured, the smallest of the family."], ar: ["من صغار الأم المخططة", "بلون كريمي فاتح، أصغر أفراد العائلة."] }
  };
  PATENKATZEN.forEach((k) => { const u = PS_KATZEN[k.id]?.[PS_SPRACHE]; if (u) { k.zeile = u[0]; k.text = u[1]; } });
  const PS_NAMEN = { "Getigerte Mutter": { en: "Tabby mother", ar: "الأم المخططة" }, "Schwarz-weiße Katze": { en: "Black-and-white cat", ar: "القطة السوداء والبيضاء" } };
  PATENKATZEN.forEach((k) => { const u = PS_NAMEN[k.name]?.[PS_SPRACHE]; if (u) k.name = u; });
  const auswahl = {}; // id -> Betrag
  const euro = (z) => PS_SPRACHE === "en" ? "€" + z.toLocaleString("en-GB") : z.toLocaleString(PS_SPRACHE === "ar" ? "en-GB" : "de-DE") + " €";

  PATENKATZEN.forEach((k) => {
    const karte = document.createElement("article");
    karte.className = "patenkarte zeigen";
    karte.dataset.gruppe = k.gruppe.join(" ");
    const stufen = [5, 10, 20].filter((b) => b < k.bedarf);
    karte.innerHTML = `
      <button type="button" class="bild" data-gross="${PS_WURZEL}assets/katzen/${k.id}-gross.jpg" data-text="${k.name} – ${k.text}"><img src="${PS_WURZEL}assets/katzen/${k.id}.jpg" alt="${k.name}" loading="lazy"></button>
      <div class="inhalt">
        <span class="status">${k.schon > 0 ? ps("teil") : ps("sucht")}</span>
        <h3>${k.name}</h3>
        <div class="zeile">${k.zeile}</div>
        <div class="fortschritt" aria-hidden="true"><i style="width:${Math.min(100, (k.schon / k.bedarf) * 100)}%"></i></div>
        <div class="fortschritt-text">${euro(k.schon)} ${ps("von")} ${euro(k.bedarf)} ${ps("imMonat")}</div>
        <div class="wahl" hidden>
          <div class="betraege" role="group" aria-label="${ps("monatsbetrag")} ${k.name}">
            ${stufen.map((b) => `<button type="button" data-b="${b}" aria-pressed="${b === 10}">${euro(b)}</button>`).join("")}
            <button type="button" data-b="${k.bedarf}" aria-pressed="false">${euro(k.bedarf)} (${ps("ganz")})</button>
          </div>
          <div class="wahl-text"><b data-betrag>${euro(10)}</b> ${ps("imMonat")} <small data-rest></small></div>
        </div>
        <button type="button" class="btn" data-waehlen>${ps("pate")}</button>
      </div>`;
    let betrag = 10, offen = false;
    const wahl = karte.querySelector(".wahl");
    const knopf = karte.querySelector("[data-waehlen]");
    const zeigeBetrag = () => {
      karte.querySelector("[data-betrag]").textContent = euro(betrag);
      const rest = k.bedarf - k.schon - betrag;
      karte.querySelector("[data-rest]").textContent = rest > 0 ? "· " + ps("rest") + " " + euro(rest) : "· " + ps("gedeckt");
      karte.querySelectorAll(".betraege button").forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.b === betrag)));
      if (auswahl[k.id] !== undefined) { auswahl[k.id] = betrag; knopf.textContent = ps("gewaehlt") + " · " + euro(betrag) + " – " + ps("entfernen"); aktualisieren(); }
    };
    zeigeBetrag();
    karte.querySelectorAll(".betraege button").forEach((b) => b.addEventListener("click", () => { betrag = +b.dataset.b; zeigeBetrag(); }));
    knopf.addEventListener("click", () => {
      if (!offen && auswahl[k.id] === undefined) { offen = true; wahl.hidden = false; knopf.classList.add("voll"); knopf.textContent = ps("waehlen"); return; }
      if (auswahl[k.id] === undefined) { auswahl[k.id] = betrag; karte.classList.add("gewaehlt"); knopf.textContent = ps("gewaehlt") + " · " + euro(betrag) + " – " + ps("entfernen"); }
      else { delete auswahl[k.id]; karte.classList.remove("gewaehlt"); offen = false; wahl.hidden = true; knopf.classList.remove("voll"); knopf.textContent = ps("pate"); }
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
        b.type = "button"; b.setAttribute("aria-label", ps("seite") + " " + (i + 1));
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
    return ps("hallo") + "\n" + ids.map((id) => "- " + PATENKATZEN.find((k) => k.id === id).name + ": " + euro(auswahl[id]) + " " + ps("imMonat")).join("\n") + "\n" + ps("zusammen") + ": " + euro(summe) + " " + ps("imMonat");
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
      li.innerHTML = `<span>${k.name} – ${euro(auswahl[id])} ${ps("imMonat")}</span>`;
      const weg = document.createElement("button");
      weg.type = "button"; weg.textContent = ps("entfernen");
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
