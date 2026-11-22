// Aktuelles: neueste Meldung oben. Pro Meldung ein Eintrag.
// bereich: "tierschutz", "kinderhilfe", "gala", "center"
const AKTUELLES = [
  { datum: "2026-11-17", bereich: "center", titel: "Medical Point North Gaza im Netzwerk", text: "Wir stellen den Medical Point in Beit Lahia vor: Notfallversorgung in einer Notunterkunft, die Schwerverletzte stabilisiert, bis der Krankenwagen nach 30 bis 45 Minuten eintrifft.", link: "projekte.html#medical-point" },
  { datum: "2026-11-17", bereich: "center", titel: "Gründung einer gemeinnützigen UG in Vorbereitung", text: "Unsere Projekte werden bisher von Privatpersonen getragen. Damit sie ein festes Dach bekommen, bereiten wir die Gründung einer gemeinnützigen UG vor. Der Satzungsentwurf liegt vor und wird rechtlich geprüft.", link: "gruendung.html" },
  { datum: "2026-11-17", bereich: "tierschutz", titel: "15 Katzen bei Cat Rescue", text: "Cat Rescue versorgt 15 Katzen – Sumada mit ihren sieben Kitten, eine getigerte Katzenmutter mit fünf Kitten aus den Trümmern und eine schwarz-weiße Katze – dazu einzelne Hunde. Eine Katze konnten wir ihrem Besitzer zurückgeben; eine kleine Katze haben wir verloren. Alle Katzen mit Foto und Namen gibt es jetzt auf der Seite der Tiere.", link: "tiere.html" },
  { datum: "2026-11-17", bereich: "tierschutz", titel: "Winterfest machen", text: "Unser teilweise zerstörtes Haus in Nord-Gaza soll so gut wie möglich gegen Regen und Kälte gesichert werden. Katzenbereich und Quarantänebereich sind eingerichtet.", link: "tierschutz.html" },
  { datum: "2026-11-17", bereich: "gala", titel: "International Charity Gala 2027 in Vorbereitung", text: "Für die geplante Gala in Frankfurt suchen wir Mitwirkende in elf Arbeitsbereichen – von Eventproduktion bis Kultur.", link: "gala.html" },
  { datum: "2026-11-17", bereich: "kinderhilfe", titel: "Kids4Hope wird Teil von Dar Al-Rahma", text: "Hasan und sein Team begleiten 140 Waisenkinder in Gaza beim Lernen. Hasan hat zugestimmt: Mit der Gründung der gUG wird Kids4Hope ein eigenes Projekt von Dar Al-Rahma, und er bleibt Projektleiter vor Ort.", link: "kinderhilfe.html" }
];

const AKTUELLES_UE = {
  en: [
    ["Medical Point North Gaza joins the network", "We introduce the Medical Point in Beit Lahia: emergency care in a shelter that stabilises the seriously injured until the ambulance arrives after 30 to 45 minutes."],
    ["Founding of a non-profit UG in preparation", "So far our projects have been carried by private individuals. To give them a firm home, we are preparing the founding of a non-profit UG. The draft articles of association are ready and are being reviewed legally."],
    ["15 cats at Cat Rescue", "Cat Rescue cares for 15 cats – Sumada with her seven kittens, a tabby mother cat with five kittens from the rubble and a black-and-white cat – plus a few dogs. We were able to return one cat to her owner; we lost one little cat. All cats with photo and name can now be found on the animals page."],
    ["Getting ready for winter", "We want to protect our partly destroyed house in North Gaza as well as possible against rain and cold. The cat area and the quarantine area have been set up."],
    ["International Charity Gala 2027 in preparation", "For the planned gala in Frankfurt we are looking for volunteers in eleven areas – from event production to culture."],
    ["Kids4Hope becomes part of Dar Al-Rahma", "Hasan and his team accompany 140 orphaned children in Gaza in their learning. Hasan has agreed: with the founding of the gUG, Kids4Hope becomes a project of Dar Al-Rahma in its own right, and he remains project leader on site."]
  ],
  ar: [
    ["النقطة الطبية في شمال غزة تنضم إلى الشبكة", "نقدّم النقطة الطبية في بيت لاهيا: رعاية طارئة داخل مركز إيواء تُثبّت حالة المصابين بجروح خطيرة إلى أن تصل سيارة الإسعاف بعد 30 إلى 45 دقيقة."],
    ["التحضير لتأسيس شركة (UG) غير ربحية", "حتى الآن يتحمّل أفراد مشاريعنا بصفتهم الشخصية. ولكي تحصل على مظلّة ثابتة نُحضّر لتأسيس شركة (UG) غير ربحية. مسوّدة النظام الأساسي جاهزة وتخضع للمراجعة القانونية."],
    ["15 قطة لدى Cat Rescue", "تعتني Cat Rescue بـ 15 قطة – سمادا مع صغارها السبعة، وقطة أم مخططة مع صغارها الخمسة أُنقذوا من تحت الأنقاض، وقطة سوداء وبيضاء – إضافة إلى بعض الكلاب. تمكّنا من إعادة قطة إلى صاحبها، وفقدنا قطة صغيرة. يمكنكم الآن رؤية جميع القطط بالصور والأسماء في صفحة الحيوانات."],
    ["الاستعداد للشتاء", "نريد تأمين بيتنا المتضرر جزئيًا في شمال غزة قدر الإمكان ضد المطر والبرد. وقد جُهّز قسم القطط وقسم الحجر الصحي."],
    ["التحضير لحفل الجالا الخيري الدولي 2027", "لحفل الجالا المخطَّط له في فرانكفورت نبحث عن متطوعين في أحد عشر مجالًا – من إنتاج الفعاليات إلى الثقافة."],
    ["Kids4Hope تصبح جزءًا من دار الرحمة", "يرافق حسن وفريقه 140 طفلًا يتيمًا في غزة في دراستهم. وقد وافق حسن: مع تأسيس الشركة غير الربحية (gUG) تصبح Kids4Hope مشروعًا قائمًا بذاته ضمن دار الرحمة، ويبقى هو مسؤول المشروع في الميدان."]
  ]
};
const AKTUELLES_TXT = {
  de: { mehr: "Weiterlesen →", loc: "de-DE", namen: { tierschutz: "Tierschutz", kinderhilfe: "Kinderhilfe", gala: "Gala 2027", center: "Dar Al-Rahma", medical: "Medical Point" } },
  en: { mehr: "Read more →", loc: "en-GB", namen: { tierschutz: "Animal welfare", kinderhilfe: "Children's aid", gala: "Gala 2027", center: "Dar Al-Rahma", medical: "Medical Point" } },
  ar: { mehr: "اقرأ المزيد ←", loc: "ar-u-nu-latn", namen: { tierschutz: "رعاية الحيوانات", kinderhilfe: "مساعدة الأطفال", gala: "حفل 2027", center: "دار الرحمة", medical: "النقطة الطبية" } }
};

(function () {
  const ziel = document.getElementById("aktuelles");
  if (!ziel) return;
  const max = parseInt(ziel.dataset.max || "0", 10);
  const sp = (document.documentElement.lang || "de").slice(0, 2);
  const tx = AKTUELLES_TXT[sp] || AKTUELLES_TXT.de;
  const ue = AKTUELLES_UE[sp];
  const namen = tx.namen;
  const liste = max ? AKTUELLES.slice(0, max) : AKTUELLES;
  liste.forEach((m) => {
    const idx = AKTUELLES.indexOf(m);
    if (ue && ue[idx]) m = { ...m, titel: ue[idx][0], text: ue[idx][1] };
    const a = document.createElement("a");
    a.className = "karte";
    a.href = m.link || "#";
    a.style.textDecoration = "none";
    a.style.color = "inherit";
    const d = new Date(m.datum + "T12:00:00");
    const zeile = document.createElement("div");
    zeile.className = "ort";
    zeile.textContent = d.toLocaleDateString(tx.loc, { day: "2-digit", month: "long", year: "numeric" }) + " · " + (namen[m.bereich] || "");
    const h = document.createElement("h4");
    h.textContent = m.titel;
    const p = document.createElement("p");
    p.textContent = m.text;
    const mehr = document.createElement("span");
    mehr.className = "mehr";
    mehr.textContent = tx.mehr;
    a.append(zeile, h, p, mehr);
    ziel.appendChild(a);
  });
})();
