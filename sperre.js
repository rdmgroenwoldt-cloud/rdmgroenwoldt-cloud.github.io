// Zugangssperre (Kim 22.11.2026): Die Seite ist noch nicht öffentlich und nur mit Passwort zu sehen.
// Wichtig: Das ist ein Sichtschutz im Browser, keine Server-Sperre. Im Code steht nur ein Prüfwert
// (SHA-256 von "dar-al-rahma|" + Passwort), nicht das Passwort selbst.
(function () {
  "use strict";
  var PRUEFWERT = "43bfab2a0c8208f4de23d45665fe042613d0bbbeb90e9a0e065b745d58b5d070";
  var SCHLUESSEL = "dar-zugang";
  try { if (localStorage.getItem(SCHLUESSEL) === PRUEFWERT) return; } catch (e) { /* ohne Speicher: jedes Mal fragen */ }

  var html = document.documentElement;
  html.classList.add("gesperrt");
  var stil = document.createElement("style");
  stil.textContent =
    "html.gesperrt body>*:not(#sperre){display:none!important}" +
    "html.gesperrt body{overflow:hidden}" +
    "#sperre{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:16px;background:radial-gradient(ellipse at 50% 20%,#2a200e 0%,#0b0a08 70%);font-family:Inter,'Segoe UI',system-ui,sans-serif;color:#efe8da}" +
    "#sperre form{width:min(380px,100%);background:#15130f;border:1px solid #4a3f2b;border-top:3px solid #d4a84b;border-radius:14px;padding:28px 24px;text-align:center;box-shadow:0 24px 70px rgba(0,0,0,.6)}" +
    "#sperre img{display:block;width:72px;height:72px;border-radius:50%;object-fit:cover;margin:0 auto 10px}" +
    "#sperre h1{font:600 30px 'Cormorant Garamond',Georgia,serif;color:#f0cf7a;margin:0 0 6px}" +
    "#sperre p{margin:0 0 18px;color:#b5a993;font-size:15px;line-height:1.5}" +
    "#sperre input{width:100%;box-sizing:border-box;background:#1e1b15;border:1px solid #4a3f2b;color:#efe8da;border-radius:10px;padding:12px 14px;font-size:16px;margin-bottom:12px}" +
    "#sperre input:focus{outline:2px solid #d4a84b;outline-offset:1px}" +
    "#sperre button{width:100%;border:0;border-radius:999px;padding:12px;font:600 16px Inter,system-ui,sans-serif;color:#1a1408;background:linear-gradient(135deg,#f0cf7a,#d4a84b);cursor:pointer}" +
    "#sperre .fehler{min-height:20px;margin:10px 0 0;color:#e08a73;font-size:14px}";
  (document.head || html).appendChild(stil);

  async function pruefwert(text) {
    var daten = new TextEncoder().encode("dar-al-rahma|" + text);
    var h = await crypto.subtle.digest("SHA-256", daten);
    return Array.prototype.map.call(new Uint8Array(h), function (b) { return b.toString(16).padStart(2, "0"); }).join("");
  }

  function zeigen() {
    var box = document.createElement("div");
    box.id = "sperre";
    box.innerHTML =
      '<form autocomplete="off">' +
      '<img src="assets/logo-center.jpg" alt="">' +
      "<h1>Dar Al-Rahma</h1>" +
      "<p>Diese Seite ist noch nicht öffentlich.<br>Bitte gib das Passwort ein.</p>" +
      '<input type="password" name="pw" aria-label="Passwort" placeholder="Passwort" required autofocus>' +
      '<button type="submit">Öffnen</button>' +
      '<p class="fehler" role="alert"></p>' +
      "</form>";
    document.body.appendChild(box);
    var form = box.querySelector("form");
    form.addEventListener("submit", async function (ev) {
      ev.preventDefault();
      var meldung = box.querySelector(".fehler");
      if (!(window.crypto && crypto.subtle)) { meldung.textContent = "Dein Browser unterstützt die Prüfung nicht."; return; }
      var wert = await pruefwert(form.pw.value);
      if (wert !== PRUEFWERT) { meldung.textContent = "Das Passwort stimmt nicht."; form.pw.select(); return; }
      try { localStorage.setItem(SCHLUESSEL, PRUEFWERT); } catch (e) { /* dann gilt es nur für diese Seite */ }
      box.remove();
      html.classList.remove("gesperrt");
    });
  }
  if (document.body) zeigen(); else document.addEventListener("DOMContentLoaded", zeigen);
})();
