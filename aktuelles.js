// Aktuelles: neueste Meldung oben. Pro Meldung ein Eintrag.
// bereich: "tierschutz", "kinderhilfe", "gala", "center"
const AKTUELLES = [
  { datum: "2026-11-17", bereich: "center", titel: "Medical Point North Gaza im Netzwerk", text: "Wir stellen den Medical Point in Beit Lahia vor: Notfallversorgung in einer Notunterkunft, die Schwerverletzte stabilisiert, bis der Krankenwagen nach 30 bis 45 Minuten eintrifft.", link: "medical-point.html" },
  { datum: "2026-11-17", bereich: "center", titel: "Gründung einer gemeinnützigen UG in Vorbereitung", text: "Unsere Projekte werden bisher von Privatpersonen getragen. Damit sie ein festes Dach bekommen, bereiten wir die Gründung einer gemeinnützigen UG vor. Der Satzungsentwurf liegt vor und wird rechtlich geprüft.", link: "gruendung.html" },
  { datum: "2026-11-17", bereich: "tierschutz", titel: "15 Katzen bei Cat Rescue", text: "Cat Rescue versorgt 15 Katzen – Sumada mit ihren sieben Kitten, eine getigerte Katzenmutter mit fünf Kitten aus den Trümmern und eine schwarz-weiße Katze – dazu einzelne Hunde. Eine Katze konnten wir ihrem Besitzer zurückgeben; eine kleine Katze haben wir verloren. Alle Katzen mit Foto und Namen gibt es jetzt auf der Seite der Tiere.", link: "tiere.html" },
  { datum: "2026-11-17", bereich: "tierschutz", titel: "Winterfest machen", text: "Unser teilweise zerstörtes Haus in Nord-Gaza soll so gut wie möglich gegen Regen und Kälte gesichert werden. Katzenbereich und Quarantänebereich sind eingerichtet.", link: "tierschutz.html" },
  { datum: "2026-11-17", bereich: "gala", titel: "International Charity Gala 2027 in Vorbereitung", text: "Für die geplante Gala in Frankfurt suchen wir Mitwirkende in elf Arbeitsbereichen – von Eventproduktion bis Kultur.", link: "gala.html" },
  { datum: "2026-11-17", bereich: "kinderhilfe", titel: "Kids4Hope wird Teil von Dar Al-Rahma", text: "Hasan und sein Team begleiten 140 Waisenkinder in Gaza beim Lernen. Hasan hat zugestimmt: Mit der Gründung der gUG wird Kids4Hope ein eigenes Projekt von Dar Al-Rahma, und er bleibt Projektleiter vor Ort.", link: "kinderhilfe.html" }
];

(function () {
  const ziel = document.getElementById("aktuelles");
  if (!ziel) return;
  const max = parseInt(ziel.dataset.max || "0", 10);
  const namen = { tierschutz: "Tierschutz", kinderhilfe: "Kinderhilfe", gala: "Gala 2027", center: "Dar Al-Rahma", medical: "Medical Point" };
  const liste = max ? AKTUELLES.slice(0, max) : AKTUELLES;
  liste.forEach((m) => {
    const a = document.createElement("a");
    a.className = "karte";
    a.href = m.link || "#";
    a.style.textDecoration = "none";
    a.style.color = "inherit";
    const d = new Date(m.datum + "T12:00:00");
    const zeile = document.createElement("div");
    zeile.className = "ort";
    zeile.textContent = d.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" }) + " · " + (namen[m.bereich] || "");
    const h = document.createElement("h4");
    h.textContent = m.titel;
    const p = document.createElement("p");
    p.textContent = m.text;
    const mehr = document.createElement("span");
    mehr.className = "mehr";
    mehr.textContent = "Weiterlesen →";
    a.append(zeile, h, p, mehr);
    ziel.appendChild(a);
  });
})();
