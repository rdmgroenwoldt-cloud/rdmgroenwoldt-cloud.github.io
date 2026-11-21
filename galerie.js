// Galerie-Daten: pro Tier bzw. Rettungsaktion ein Eintrag.
// kategorie: "tiere" (Tiervorstellung), "rettung" (Rettungsaktion), "zuhause" (Happy End), "erinnerung" (verloren)
// bild: Pfad unter assets/galerie/ – leer lassen, solange kein Foto da ist.
const GALERIE = [
  { kategorie: "tiere", titel: "Zumala & ihre 7 Kitten", zeile: "8 Katzen · mit ihnen hat alles angefangen", text: "Mit Zumala und ihren sieben Kleinen hat Dar Al-Rahma Cat Rescue angefangen.", bild: "", pate: "" },
  { kategorie: "tiere", titel: "Emmy", zeile: "Jungkatze", text: "Emmy ist eine junge Katze, die allein zu uns gekommen ist.", bild: "", pate: "" },
  { kategorie: "rettung", titel: "Mutter & 5 Kitten", zeile: "aus den Trümmern · noch ohne Namen", text: "Zwischen den Trümmern gefunden: eine Katzenmutter mit fünf Kitten. Sie hat noch keinen Namen – wer gibt ihr einen? (Namenspatenschaft)", bild: "", pate: "" },
  { kategorie: "zuhause", titel: "Wieder zu Hause", zeile: "Happy End", text: "Eine gefundene Katze hatte noch ein Zuhause: Wir konnten ihren Besitzer finden, und er hat sie wieder zu sich genommen.", bild: "", pate: "" },
  { kategorie: "erinnerung", titel: "In Erinnerung", zeile: "Babykatze · aus den Trümmern", text: "Eine kleine Katze, die wir zwischen den Trümmern gefunden haben, hat es leider nicht geschafft. Wir denken an sie.", bild: "", pate: "" },
  { kategorie: "tiere", titel: "Unsere Hunde", zeile: "einzelne Hunde werden mitversorgt", text: "Neben den Katzen versorgen wir auch einzelne Hunde. Vorstellung folgt.", bild: "", pate: "" }
];

(function () {
  const ziel = document.getElementById("galerie");
  if (!ziel) return;
  const dlg = document.getElementById("galerie-dialog");

  GALERIE.forEach((e, i) => {
    const f = document.createElement("figure");
    f.dataset.kategorie = e.kategorie;
    if (e.kategorie === "erinnerung") f.classList.add("gedenken");
    f.tabIndex = 0;
    const b = document.createElement("div");
    b.className = "bild" + (e.bild ? "" : " leer");
    if (e.bild) b.style.backgroundImage = "url('" + e.bild + "')";
    else b.innerHTML = "<span>Foto folgt</span>";
    const c = document.createElement("figcaption");
    c.innerHTML = "<b></b><small></small>";
    c.querySelector("b").textContent = e.titel;
    c.querySelector("small").textContent = e.zeile;
    f.append(b, c);
    const oeffnen = () => {
      const db = dlg.querySelector(".bild");
      db.style.backgroundImage = e.bild ? "url('" + e.bild + "')" : "";
      db.style.display = e.bild ? "" : "none";
      dlg.querySelector("h3").textContent = e.titel;
      dlg.querySelector(".zeile").textContent = e.zeile + (e.pate ? " · Pate: " + e.pate : "");
      dlg.querySelector(".beschreibung").textContent = e.text;
      dlg.showModal();
    };
    f.addEventListener("click", oeffnen);
    f.addEventListener("keydown", (ev) => { if (ev.key === "Enter") oeffnen(); });
    ziel.appendChild(f);
  });

  document.querySelectorAll(".filter button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter button").forEach((x) => x.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      const k = btn.dataset.k;
      ziel.querySelectorAll("figure").forEach((f) => { f.hidden = k !== "alle" && f.dataset.kategorie !== k; });
    });
  });
  dlg.querySelector("button").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (ev) => { if (ev.target === dlg) dlg.close(); });
})();
