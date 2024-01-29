// Fadenpendel
// Java-Applet (21.05.1998) umgewandelt
// 14.09.2014 - 13.08.2023

// ****************************************************************************
// **************************************************************************** 

// Sprachabh�ngige Texte sind einer eigenen Datei (zum Beispiel pendulum_de.js) abgespeichert.

// Farben:

var colorBackground = "#ffffff";                           // Hintergrundfarbe
var colorClock1 = "#808080";                               // Farbe der Digitaluhr (au�en)
var colorClock2 = "#000000";                               // Hintergrundfarbe der Anzeige
var colorClock3 = "#ff0000";                               // Farbe der Ziffern
var colorElongation = "#ff0000";                           // Farbe f�r Elongation
var colorVelocity = "#ff00ff";                             // Farbe f�r Geschwindigkeit
var colorAcceleration = "#0000ff";                         // Farbe f�r Beschleunigung
var colorForce = "#008020";                                // Farbe f�r Kraft
var colorBody = "#ffffff";                                 // Farbe des Pendelk�rpers

// Sonstige Konstanten:

var DEG = Math.PI / 180;                                     // Winkelgrad
var ax = 120, ay = 30;                                     // Position der Aufh�ngung (Pixel)
var xD = 260;                                              // x-Koordinate Ursprung
var yD1 = 180, yD2 = 165;                                  // y-Koordinate Ursprung
var FONT1 = "normal normal bold 12px sans-serif";          // Zeichensatz
var tPix = 20;                                             // Umrechnungsfaktor (Pixel pro s)

var text01 = "Сброс";             // Zur�ck
var text02 = ["Старт", "Пауза", "Продолжить"];
var text03 = "Замедленное движение";                         // Zeitlupe (2)
var text04 = "Длина маятника:";              // Pendell�nge (2)
var text05x = "Гравитационное";                                // Fallbeschleunigung (2)
var text05 = "ускорение:";        // Fallbeschleunigung (3)
var text06 = "Масса:";                                // Masse
var text07 = "Амплитуда:";        // Amplitude
var text08 = "Отклонение";   // Elongation
var text09 = "Скорость";               // Geschwindigkeit
var text10 = "Ускорение";         // Beschleunigung
var text11 = "Сила";                                       // Kraft
var text12 = "Энергия";                     // Energie

// Symbole und Einheiten:

var decimalSeparator = ",";                                // Dezimaltrennzeichen (Komma/Punkt)

var meter = "м";
var meterPerSecond2 = "м/с&sup2;";
var kilogram = "кг";
var degree = "&deg; (градусов)";

var text13 = "Максимум";               // Maximum
var text14 = "Отклонение";   // Elongation
var text15 = "Скорость";               // Geschwindigkeit
var text16 = "Ускорение (объекта)";  // Beschleunigung, tangentiale Komponente (3)
var text17 = "Сила (объекта)";  // Kraft, tangentiale Komponente (3)
var text18 = "Потенциальная энергия";                                         // Potentielle Energie (2)
var text19 = "Кинетическая энергия";                                         // Kinetische Energie (2)
var text20 = "Полная энергия";                     // Gesamtenergie (2)
var text21 = "(с)";                                   // Einheit f�r Zeitachse (s)
var text22 = "(м)";                                   // Einheit f�r senkrechte Achse (m)
var text23 = "(м/с)";                            // Einheit f�r senkrechte Achse (m/s)
var text24 = "(м/с²)";                      // Einheit f�r senkrechte Achse (m/s�)
var text25 = "(Н)";                                   // Einheit f�r senkrechte Achse (N)
var text26 = "(Дж)";                             // Einheit f�r senkrechte Achse (J)
var text27 = "Период колебаний";         // Schwingungsdauer (2)

// Symbole und Einheiten:

var symbolTime = "t";                                      // Symbol f�r Zeit
var symbolElongation = "s";                                // Symbol f�r Elongation
var symbolVelocity = "v";                                  // Symbol f�r Geschwindigkeit
var symbolAcceleration = "a";                              // Symbol f�r Beschleunigung
var symbolTangential = "tang";                             // Symbol f�r tangential
var symbolForce = "F";                                     // Symbol f�r Kraft
var symbolEnergy = "E";                                    // Symbol f�r Energie
var symbolPotential = "pot";                               // Symbol f�r potentiell
var symbolKinetic = "kin";                                 // Symbol f�r kinetisch
var second = "с";
var meterUnicode = "м";
var meterPerSecond = "м/с";
var meterPerSecond2Unicode = "м/с²";
var newton = "Н";
var joule = "Дж";


// Attribute:

var canvas, ctx;                                           // Zeichenfl�che, Grafikkontext
var width, height;                                         // Abmessungen der Zeichenfl�che (Pixel)
var bu1, bu2;                                              // Schaltkn�pfe (Reset, Start/Pause/Weiter)
var cbSlow;                                                // Optionsfeld Zeitlupe
var ipL, ipG, ipM, ipA;                                    // Eingabefelder
var rbY, rbV, rbA, rbF, rbE;                               // Radiobuttons
var on;                                                    // Flag f�r Bewegung
var slow;                                                  // Flag f�r Zeitlupe
var t0;                                                    // Anfangszeitpunkt
var t;                                                     // Aktuelle Zeit (s)
var tU;                                                    // Zeit f�r Diagramm-Ursprung (s)
var l;                                                     // Pendell�nge (m)
var lPix;                                                  // Pendell�nge (Pixel)
var g;                                                     // Fallbeschleunigung (m/s�)
var m;                                                     // Masse (kg)
var omega;                                                 // Kreisfrequenz (rad/s)
var tPer;                                                  // Schwingungsdauer (s)
var phi;                                                   // Phasenwinkel (Bogenma�)
var sinPhi, cosPhi;                                        // Trigonometrische Werte
var alpha0;                                                // Maximaler Auslenkungswinkel (Bogenma�)
var alpha;                                                 // Momentaner Auslenkungswinkel (Bogenma�)
var sinAlpha, cosAlpha;                                    // Trigonometrische Werte
var yPix;                                                  // Umrechnungsfaktor (Pixel pro SI-Einheit)
var px, py;                                                // Position des Pendelk�rpers (Pixel)
var nrSize;                                                // Nummer der betrachteten Gr��e

// Element der Schaltfl�che (aus HTML-Datei):
// id ..... ID im HTML-Befehl
// text ... Text (optional)

function getElement(id, text) {
  var e = document.getElementById(id);                     // Element
  if (text) e.innerHTML = text;                            // Text festlegen, falls definiert
  return e;                                                // R�ckgabewert
}

// Start:

function start() {
  canvas = getElement("cv");                               // Zeichenfl�che
  width = canvas.width; height = canvas.height;            // Abmessungen (Pixel)
  ctx = canvas.getContext("2d");                           // Grafikkontext
  bu1 = getElement("bu1", text01);                          // Resetknopf
  bu2 = getElement("bu2", text02[0]);                       // Startknopf
  bu2.state = 0;                                           // Anfangszustand (vor Start der Animation)
  cbSlow = getElement("cbSlow");                           // Optionsfeld (Zeitlupe)
  cbSlow.checked = false;                                  // Zeitlupe abgeschaltet
  getElement("lbSlow", text03);                             // Erk�render Text (Zeitlupe)
  getElement("ipLa", text04);                               // Erkl�render Text (Pendell�nge)
  ipL = getElement("ipLb");                                // Eingabefeld (Pendell�nge)
  getElement("ipLc", meter);                                // Einheit (Pendell�nge)
  var ipgx = getElement("ipGx");                           // Zus�tzliche Zeile (Fallbeschleunigung)
  if (ipgx) ipgx.innerHTML = text05x;                      // Erkl�render Text, zus�tzliche Zeile (Fallbeschleunigung)
  getElement("ipGa", text05);                               // Erkl�render Text (Fallbeschleunigung)
  ipG = getElement("ipGb");                                // Eingabefeld (Fallbeschleunigung)
  getElement("ipGc", meterPerSecond2);                      // Einheit (Fallbeschleunigung)
  getElement("ipMa", text06);                               // Erkl�render Text (Masse)
  ipM = getElement("ipMb");                                // Eingabefeld (Masse)
  getElement("ipMc", kilogram);                             // Einheit (Masse)
  getElement("ipAa", text07);                               // Erkl�render Text (Amplitude)
  ipA = getElement("ipAb");                                // Eingabefeld (Amplitude)
  getElement("ipAc", degree);                               // Einheit (Amplitude)
  rbY = getElement("rbY");                                 // Radiobutton (Elongation)
  getElement("lbY", text08);                                // Erkl�render Text (Elongation)
  rbY.checked = true;                                      // Radiobutton ausw�hlen
  rbV = getElement("rbV");                                 // Radiobutton (Geschwindigkeit)
  getElement("lbV", text09);                                // Erkl�render Text (Geschwindigkeit)
  rbA = getElement("rbA");                                 // Radiobutton (Beschleunigung)
  getElement("lbA", text10);                                // Erkl�render Text (Beschleunigung)
  rbF = getElement("rbF");                                 // Radiobutton (Kraft)
  getElement("lbF", text11);                                // Erkl�render Text (Kraft)
  rbE = getElement("rbE");                                 // Radiobutton (Energie)
  getElement("lbE", text12);                                // Erkl�render Text (Energie)

  l = 5;                                                   // Anfangswert Pendell�nge (m)
  g = 9.81;                                                // Anfangswert Fallbeschleunigung (m/s�)
  m = 1;                                                   // Anfangswert Masse (kg)
  alpha0 = 10 * DEG;                                         // Anfangswert Winkelamplitude (Bogenma�) 
  updateInput();                                           // Eingabefelder aktualisieren 
  calculation();                                           // Berechnungen (Seiteneffekt!)
  focus(ipL);                                              // Fokus f�r erstes Eingabefeld    
  on = false;                                              // Animation abgeschaltet
  slow = false;                                            // Zeitlupe abgeschaltet
  t = 0;                                                   // Aktuelle Zeit (s)
  t0 = new Date();                                         // Anfangszeitpunkt
  setInterval(paint, 40);                                   // Timer-Intervall 0,040 s

  bu1.onclick = reactionReset;                             // Reaktion auf Resetknopf
  bu2.onclick = reactionStart;                             // Reaktion auf Startknopf
  cbSlow.onclick = reactionSlow;                           // Reaktion auf Optionsfeld Zeitlupe
  ipL.onkeydown = reactionEnter;                           // Reaktion auf Enter-Taste (Eingabe Pendell�nge)
  ipG.onkeydown = reactionEnter;                           // Reaktion auf Enter-Taste (Eingabe Fallbeschleunigung)
  ipM.onkeydown = reactionEnter;                           // Reaktion auf Enter-Taste (Eingabe Masse)
  ipA.onkeydown = reactionEnter;                           // Reaktion auf Enter-Taste (Eingabe Amplitude)
  ipL.onblur = reaction;                                   // Reaktion auf Verlust des Fokus (Eingabe Pendell�nge)
  ipG.onblur = reaction;                                   // Reaktion auf Verlust des Fokus (Eingabe Fallbeschleunigung)
  ipM.onblur = reaction;                                   // Reaktion auf Verlust des Fokus (Eingabe Masse)
  ipA.onblur = reaction;                                   // Reaktion auf Verlust des Fokus (Eingabe Amplitude)
  rbY.onclick = reactionRadioButton;                       // Reaktion auf Radiobutton Elongation
  rbV.onclick = reactionRadioButton;                       // Reaktion auf Radiobutton Geschwindigkeit
  rbA.onclick = reactionRadioButton;                       // Reaktion auf Radiobutton Beschleunigung
  rbF.onclick = reactionRadioButton;                       // Reaktion auf Radiobutton Kraft
  rbE.onclick = reactionRadioButton;                       // Reaktion auf Radiobutton Energie
  nrSize = 0;                                              // Elongation ausgew�hlt  

} // Ende der Methode start

// Zustandsfestlegung f�r Schaltknopf Start/Pause/Weiter:

function setButton2State(st) {
  bu2.state = st;                                          // Zustand speichern
  bu2.innerHTML = text02[st];                              // Text aktualisieren
}

// Umschalten des Schaltknopfs Start/Pause/Weiter:

function switchButton2() {
  var st = bu2.state;                                      // Momentaner Zustand
  if (st == 0) st = 1;                                     // Falls Ausgangszustand, starten
  else st = 3 - st;                                          // Wechsel zwischen Animation und Unterbrechung
  setButton2State(st);                                     // Neuen Zustand speichern, Text �ndern
}

// Aktivierung bzw. Deaktivierung der Eingabefelder:
// p ... Flag f�r m�gliche Eingabe

function enableInput(p) {
  ipL.readOnly = !p;                                       // Eingabefeld f�r Pendell�nge
  ipG.readOnly = !p;                                       // Eingabefeld f�r Fallbeschleunigung
  ipM.readOnly = !p;                                       // Eingabefeld f�r Masse
  ipA.readOnly = !p;                                       // Eingabefeld f�r Winkelamplitude
}

// Reaktion auf Resetknopf:
// Seiteneffekt t, tU, on, slow

function reactionReset() {
  setButton2State(0);                                      // Zustand des Schaltknopfs Start/Pause/Weiter
  enableInput(true);                                       // Eingabefelder aktivieren
  t = tU = 0;                                              // Zeitvariable zur�cksetzen
  on = false;                                              // Animation abgeschaltet
  slow = cbSlow.checked;                                   // Flag f�r Zeitlupe
  reaction();                                              // Eingegebene Werte �bernehmen, rechnen, neu zeichnen
  focus(ipL);                                              // Fokus f�r erstes Eingabefeld
}

// Reaktion auf den Schaltknopf Start/Pause/Weiter:
// Seiteneffekt t, tU, on, slow, l, g, m, alpha0, omega, tPer, lPix, phi, sinPhi, cosPhi, alpha, sinAlpha, cosAlpha, px, py

function reactionStart() {
  if (bu2.state != 1) t0 = new Date();                     // Falls Animation angeschaltet, neuer Anfangszeitpunkt
  switchButton2();                                         // Zustand des Schaltknopfs �ndern
  enableInput(false);                                      // Eingabefelder deaktivieren
  on = (bu2.state == 1);                                   // Flag f�r Animation
  slow = cbSlow.checked;                                   // Flag f�r Zeitlupe
  reaction();                                              // Eingegebene Werte �bernehmen, rechnen, neu zeichnen
}

// Reaktion auf Optionsfeld Zeitlupe:
// Seiteneffekt slow

function reactionSlow() {
  slow = cbSlow.checked;                                   // Flag setzen
}

// Hilfsroutine: Eingabe �bernehmen, rechnen, neu zeichnen
// Seiteneffekt l, g, m, alpha0, omega, tPer, lPix

function reaction() {
  input();                                                 // Eingegebene Werte �bernehmen (eventuell korrigiert)
  calculation();                                           // Berechnungen
  paint();                                                 // Neu zeichnen
}

// Reaktion auf Tastendruck (nur auf Enter-Taste):

function reactionEnter(e) {
  var enter = (e.key == "Enter" || e.code == "Enter");     // Flag f�r Enter-Taste
  if (!enter) return;                                      // Falls andere Taste, abbrechen
  reaction();                                              // Daten �bernehmen, rechnen, neu zeichnen
}

// Fokus f�r Eingabefeld, Cursor am Ende:
// ip ... Eingabefeld

function focus(ip) {
  ip.focus();                                              // Fokus f�r Eingabefeld
  var n = ip.value.length;                                 // L�nge der Zeichenkette
  ip.setSelectionRange(n, n);                               // Cursor setzen
}

// Reaktion auf Radiobutton:
// Seiteneffekt nrSize

function reactionRadioButton() {
  if (rbY.checked) nrSize = 0;                             // Entweder Elongation ...
  else if (rbV.checked) nrSize = 1;                        // ... oder Geschwindigkeit ...
  else if (rbA.checked) nrSize = 2;                        // ... oder Beschleunigung ...
  else if (rbF.checked) nrSize = 3;                        // ... oder Kraft ...
  else nrSize = 4;                                         // ... oder Energie ausw�hlen
}

//-------------------------------------------------------------------------------------------------

// Berechnungen:
// Seiteneffekt omega, tPer, lPix

function calculation() {
  omega = Math.sqrt(g / l);                                  // Kreisfrequenz (rad/s)
  tPer = 2 * Math.PI / omega;                                  // Schwingungsdauer (s)
  lPix = 25 * l;                                             // Pendell�nge (Pixel)
}

// Umwandlung einer Zahl in eine Zeichenkette:
// n ..... Gegebene Zahl
// d ..... Zahl der Stellen
// fix ... Flag f�r Nachkommastellen (im Gegensatz zu g�ltigen Ziffern)

function ToString(n, d, fix) {
  var s = (fix ? n.toFixed(d) : n.toPrecision(d));         // Zeichenkette mit Dezimalpunkt
  return s.replace(".", decimalSeparator);                  // Eventuell Punkt durch Komma ersetzen
}

// Eingabe einer Zahl
// ef .... Eingabefeld
// d ..... Zahl der Stellen
// fix ... Flag f�r Nachkommastellen (im Gegensatz zu g�ltigen Ziffern)
// min ... Minimum des erlaubten Bereichs
// max ... Maximum des erlaubten Bereichs
// R�ckgabewert: Zahl oder NaN

function inputNumber(ef, d, fix, min, max) {
  var s = ef.value;                                        // Zeichenkette im Eingabefeld
  s = s.replace(",", ".");                                  // Eventuell Komma in Punkt umwandeln
  var n = Number(s);                                       // Umwandlung in Zahl, falls m�glich
  if (isNaN(n)) n = 0;                                     // Sinnlose Eingaben als 0 interpretieren 
  if (n < min) n = min;                                    // Falls Zahl zu klein, korrigieren
  if (n > max) n = max;                                    // Falls Zahl zu gro�, korrigieren
  ef.value = ToString(n, d, fix);                            // Eingabefeld eventuell korrigieren
  return n;                                                // R�ckgabewert
}

// Gesamte Eingabe:
// Seiteneffekt l, g, m, alpha0

function input() {
  var ae = document.activeElement;                         // Aktives Element
  l = inputNumber(ipL, 3, true, 0.5, 10);                      // Pendell�nge (m)
  g = inputNumber(ipG, 2, true, 1, 100);                       // Fallbeschleunigung (m/s�)
  m = inputNumber(ipM, 3, true, 1, 10);                        // Masse (kg)
  alpha0 = DEG * inputNumber(ipA, 1, true, 2, 20);               // Winkelamplitude (Bogenma�)
  if (ae == ipL) focus(ipG);                               // Fokus f�r n�chstes Eingabefeld
  if (ae == ipG) focus(ipM);                               // Fokus f�r n�chstes Eingabefeld
  if (ae == ipM) focus(ipA);                               // Fokus f�r n�chstes Eingabefeld
  if (ae == ipA) ipA.blur();                               // Fokus abgegeben
}

// Aktualisierung der Eingabefelder:

function updateInput() {
  ipL.value = ToString(l, 3, true);                          // Eingabefeld f�r Pendell�nge (m)
  ipG.value = ToString(g, 2, true);                          // Eingabefeld f�r Fallbeschleunigung (m/s�)
  ipM.value = ToString(m, 3, true);                          // Eingabefeld f�r Masse (kg)
  ipA.value = ToString(alpha0 / DEG, 1, true);                 // Eingabefeld f�r Winkelamplitude (�)
}

//-------------------------------------------------------------------------------------------------

// Neuer Pfad mit Standardwerten:

function newPath() {
  ctx.beginPath();                                         // Neuer Pfad
  ctx.strokeStyle = "#000000";                             // Linienfarbe schwarz
  ctx.lineWidth = 1;                                       // Liniendicke 1
}

// Rechteck mit schwarzem Rand:
// (x,y) ... Koordinaten der Ecke links oben (Pixel)
// w ....... Breite (Pixel)
// h ....... H�he (Pixel)
// c ....... F�llfarbe (optional)

function rectangle(x, y, w, h, c) {
  if (c) ctx.fillStyle = c;                                // F�llfarbe
  newPath();                                               // Neuer Pfad
  ctx.fillRect(x, y, w, h);                                   // Rechteck ausf�llen
  ctx.strokeRect(x, y, w, h);                                 // Rand zeichnen
}

// Kreisscheibe mit schwarzem Rand:
// (x,y) ... Mittelpunktskoordinaten (Pixel)
// r ....... Radius (Pixel)
// c ....... F�llfarbe (optional)

function circle(x, y, r, c) {
  if (c) ctx.fillStyle = c;                                // F�llfarbe
  newPath();                                               // Neuer Pfad
  ctx.arc(x, y, r, 0, 2 * Math.PI, true);                         // Kreis vorbereiten
  ctx.fill();                                              // Kreis ausf�llen
  ctx.stroke();                                            // Rand zeichnen
}

// Pendel zeichnen:
// Seiteneffekt alpha, sinAlpha, cosAlpha, px, py

function pendulum() {
  alpha = alpha0 * cosPhi;                                   // Auslenkung (Bogenma�)                      
  sinAlpha = Math.sin(alpha);                              // Sinuswert 
  cosAlpha = Math.cos(alpha);                              // Cosinuswert
  px = ax + lPix * sinAlpha;                                   // x-Koordinate des Pendelk�rpers (Pixel)
  py = ay + lPix * cosAlpha;                                   // y-Koordinate des Pendelk�rpers (Pixel)
  newPath();                                               // Neuer Pfad mit Standardwerten
  ctx.moveTo(ax, ay);                                       // Anfangspunkt (Aufh�ngung)
  ctx.lineTo(px, py);                                       // Weiter zum Mittelpunkt des Pendelk�rpers
  ctx.closePath();                                         // Pfad schlie�en
  ctx.stroke();                                            // Linie f�r Schnur zeichnen
  circle(px, py, 5, colorBody);                               // Pendelk�rper
}

// Digitaluhr zeichnen:

function clock(x, y) {
  rectangle(x - 60, y - 16, 120, 32, colorClock1);                 // Geh�use
  rectangle(x - 50, y - 10, 100, 20, colorClock2);                 // Hintergrund der Anzeige
  ctx.fillStyle = "#ff0000";                               // Farbe f�r Ziffern
  ctx.font = "normal normal bold 16px monospace";          // Zeichensatz
  ctx.textAlign = "center";                                // Zentrierte Ausgabe
  var n = Math.floor(t / 1000);                              // Zahl der Zeitabschnitte zu je 1000 s
  var s = (t - n * 1000).toFixed(3) + " " + second;                // Zeitangabe (Einheit s, alle 1000 s Neuanfang)
  s = s.replace(".", decimalSeparator);                     // Eventuell Punkt durch Komma ersetzen
  while (s.length < 9) s = " " + s;                          // Eventuell Leerzeichen am Anfang erg�nzen
  ctx.fillText(s, x, y + 5);                                   // Ausgabe der Zeit
}

// Pfeil zeichnen:
// x1, y1 ... Anfangspunkt
// x2, y2 ... Endpunkt
// w ........ Liniendicke (optional)
// Zu beachten: Die Farbe wird durch ctx.strokeStyle bestimmt.

function arrow(x1, y1, x2, y2, w) {
  if (!w) w = 1;                                           // Falls Liniendicke nicht definiert, Defaultwert                          
  var dx = x2 - x1, dy = y2 - y1;                              // Vektorkoordinaten
  var length = Math.sqrt(dx * dx + dy * dy);                     // L�nge
  if (length == 0) return;                                 // Abbruch, falls L�nge 0
  dx /= length; dy /= length;                              // Einheitsvektor
  var s = 2.5 * w + 7.5;                                       // L�nge der Pfeilspitze 
  var xSp = x2 - s * dx, ySp = y2 - s * dy;                        // Hilfspunkt f�r Pfeilspitze         
  var h = 0.5 * w + 3.5;                                       // Halbe Breite der Pfeilspitze
  var xSp1 = xSp - h * dy, ySp1 = ySp + h * dx;                    // Ecke der Pfeilspitze
  var xSp2 = xSp + h * dy, ySp2 = ySp - h * dx;                    // Ecke der Pfeilspitze
  xSp = x2 - 0.6 * s * dx; ySp = y2 - 0.6 * s * dy;                    // Einspringende Ecke der Pfeilspitze
  ctx.beginPath();                                         // Neuer Pfad
  ctx.lineWidth = w;                                       // Liniendicke
  ctx.moveTo(x1, y1);                                       // Anfangspunkt
  if (length < 5) ctx.lineTo(x2, y2);                       // Falls kurzer Pfeil, weiter zum Endpunkt, ...
  else ctx.lineTo(xSp, ySp);                                // ... sonst weiter zur einspringenden Ecke
  ctx.stroke();                                            // Linie zeichnen
  if (length < 5) return;                                  // Falls kurzer Pfeil, keine Spitze
  ctx.beginPath();                                         // Neuer Pfad f�r Pfeilspitze
  ctx.fillStyle = ctx.strokeStyle;                         // F�llfarbe wie Linienfarbe
  ctx.moveTo(xSp, ySp);                                     // Anfangspunkt (einspringende Ecke)
  ctx.lineTo(xSp1, ySp1);                                   // Weiter zum Punkt auf einer Seite
  ctx.lineTo(x2, y2);                                       // Weiter zur Spitze
  ctx.lineTo(xSp2, ySp2);                                   // Weiter zum Punkt auf der anderen Seite
  ctx.closePath();                                         // Zur�ck zum Anfangspunkt
  ctx.fill();                                              // Pfeilspitze zeichnen 
}

// Vektorpfeil vom Pendelk�rper aus:
// r ..... L�nge des Pfeils
// phi ... Winkel gegen�ber der Waagrechten (Bogenma�, Gegenuhrzeigersinn)

function arrowPendulum(r, phi) {
  var x = px + r * Math.cos(phi);                              // x-Koordinate der Pfeilspitze
  var y = py - r * Math.sin(phi);                              // y-Koordinate der Pfeilspitze 
  arrow(px, py, x, y, 3);                                      // Pfeil zeichnen
}

// Text ausrichten (Zeichensatz FONT1):
// s ....... Zeichenkette
// t ....... Typ (0 f�r linksb�ndig, 1 f�r zentriert, 2 f�r rechtsb�ndig)
// (x,y) ... Position (Pixel)

function alignText(s, t, x, y) {
  ctx.font = FONT1;                                        // Zeichensatz
  if (t == 0) ctx.textAlign = "left";                      // Je nach Wert von t linksb�ndig ...
  else if (t == 1) ctx.textAlign = "center";               // ... oder zentriert ...
  else ctx.textAlign = "right";                            // ... oder rechtsb�ndig
  ctx.fillText(s, x, y);                                     // Text ausgeben
}

// Waagrechte Achse (mit Beschriftung und Ticks) f�r Diagramm:
// (x,y) ... Ursprung (Pixel)

function horizontalAxis(x, y) {
  ctx.strokeStyle = "#000000";                             // Linienfarbe schwarz 
  arrow(x - 20, y, x + 240, y);                                   // Pfeil zeichnen
  alignText(symbolTime, 1, x + 230, y + 15);                      // Beschriftung (t)
  alignText(text21, 1, x + 230, y + 27);                          // Beschriftung (in s)  
  var t0 = Math.ceil(tU);                                  // Zeit (s) f�r ersten Tick
  var x0 = Math.round(x + tPix * (t0 - tU));                     // x-Koordinate des ersten Ticks             
  for (i = 0; i <= 10; i++) {                                  // F�r alle Ticks ...
    var xs = x0 + i * tPix;                                    // x-Koordinate berechnen
    ctx.moveTo(xs, y - 3); ctx.lineTo(xs, y + 3);                // Tick vorbereiten
    if (xs >= x + 5 && xs <= x + 215                           // Falls Tick nicht zu weit links oder zu weit rechts ... 
      && (t0 + i <= 100 || (t0 + i) % 2 == 0))                     // und Zeit (s) kleiner als 100 oder geradzahlig ...
      alignText("" + (t0 + i), 1, xs, y + 13);                      // ... Tick beschriften
  }
  ctx.stroke();                                            // Ticks zeichnen
}

// Senkrechte Achse (mit Beschriftung und Ticks) f�r Diagramm:
// (x,y) ... Ursprung (Pixel)
// yLow .... Unteres Ende der Achse (Pixel)
// yHigh ... Oberes Ende der Achse (Pixel)
// maxSI ... Maximalwert (SI-Einheit)
// Seiteneffekt yPix

function verticalAxis(x, y, yLow, yHigh, maxSI) {
  var pot10 = Math.pow(10, Math.floor(Math.log(maxSI) / Math.LN10));    // N�chstkleinere Zehnerpotenz zu maxSI
  var q = maxSI / pot10;                                     // Verh�ltnis (zwischen 1 und 10)
  var n;                                                   // Zahl der Ticks
  if (q > 5) n = 10; else if (q > 2) n = 5; else n = 2;    // "Glatter" Wert f�r Zahl der Ticks 
  ctx.strokeStyle = "#000000";                             // Linienfarbe schwarz
  arrow(x, yLow, x, yHigh);                                   // Pfeil zeichnen
  var n0 = (nrSize < 4 ? -n : 0);                            // Nummer des untersten Ticks 
  ctx.beginPath();                                         // Neuer Pfad                       
  for (i = n0; i <= n; i++) {                                  // F�r alle Ticks ...
    var ys = y - i * 100 / n;                                    // y-Koordinate des Ticks
    ctx.moveTo(x - 3, ys); ctx.lineTo(x + 3, ys);                // Tick vorbereiten
    var s = Number(i * pot10).toPrecision(1);                // Zeichenkette f�r Beschriftung 
    if (Math.abs(i * pot10) >= 10)                           // Falls n�tig ...
      s = "" + Math.round(i * pot10);                          // ... Zehnerpotenzschreibweise verhindern
    s = s.replace(".", decimalSeparator);                   // Eventuell Punkt in Komma verwandeln
    if ((n < 10 || i % 2 == 0) && i != 0)                    // Falls sinnvoll ... 
      alignText(s, 2, x - 3, ys + 4);                             // ... Tick beschriften
  }
  ctx.stroke();                                            // Ticks zeichnen
  yPix = 100 / n / pot10;                                      // Umrechnungsfaktor aktualisieren
}

// Sinuskurve (N�herung durch Polygonzug):
// (x,y) ... Nullpunkt (Pixel)
// per ..... Periode (Pixel)
// ampl .... Amplitude (Pixel)
// xMin .... Minimaler x-Wert (Pixel)
// xMax .... Maximaler x-Wert (Pixel)

function sinus(x, y, per, ampl, xMin, xMax) {
  var omega = 2 * Math.PI / per;                               // Hilfsgr��e
  newPath();                                               // Neuer Pfad (Standardwerte)
  var xx = xMin;                                           // x-Koordinate f�r linken Rand
  ctx.moveTo(xx, y - ampl * Math.sin(omega * (xx - x)));            // Anfangspunkt 
  while (xx < xMax) {                                      // Solange rechter Rand noch nicht erreicht ...
    xx++;                                                  // x-Koordinate erh�hen
    ctx.lineTo(xx, y - ampl * Math.sin(omega * (xx - x)));          // Neue Teilstrecke vorbereiten
  }
  ctx.stroke();                                            // Polygonzug f�r Kurve zeichnen
}

// Diagramm zeichnen:

function diagram(type, x, y, yMax) {
  horizontalAxis(x, y);                                     // Waagrechte Achse mit Beschriftung und Ticks
  verticalAxis(x, y, y + 120, y - 135, yMax);                      // Senkrechte Achse mit Beschriftung und Ticks   
  sinus(x - type * tPer * 5 - tU * tPix, y, tPer * tPix, yMax * yPix, x, x + 200);   // Sinuskurve  
}

// Markierung in Diagramm f�r momentanen Wert:
// val .... Zahlenwert (SI-Einheit)
// x, y ... Ursprung
// c ...... Farbe

function drawMomVal(val, x, y, c) {
  x += (t - tU) * tPix; y -= val * yPix;                         // Mittelpunktskoordinaten (Pixel)
  circle(x, y, 2, c);                                         // Kleiner Kreis mit Rand
}

// Ausgabe eines Zahlenwerts:
// s ........ Bezeichnung der Gr��e
// v ........ Zahlenwert
// u ........ Einheit
// n ........ Zahl der g�ltigen Ziffern
// (x1,y) ... Position des Texts (Pixel)
// (x2,y) ... Position des Zahlenwerts (Pixel)

function writeValue(s, v, u, n, x1, x2, y) {
  alignText(s + ":", 0, x1, y);                                 // Bezeichnung der Gr��e
  s = v.toPrecision(n);                                    // Runden mit gew�nschter Genauigkeit
  s = s.replace(".", decimalSeparator);                     // Eventuell Komma statt Punkt
  alignText(s + " " + u, 0, x2, y);                               // Zahl mit Einheit
}

// Zentrierter Text mit Index:
// s1 ...... Normaler Text
// s2 ...... Index
// (x,y) ... Position

function centerTextIndex(s1, s2, x, y) {
  var w1 = ctx.measureText(s1).width;                      // Breite von s1 (Pixel) 
  var w2 = ctx.measureText(s2).width;                      // Breite von s2 (Pixel)
  var x0 = x - (w1 + w2) / 2;                                    // x-Koordinate der Mitte
  alignText(s1, 0, x0, y);                                    // Normalen Text ausgeben
  alignText(s2, 0, x0 + w1 + 1, y + 5);                             // Index ausgeben
}

// Zeichnung zur Elongation:
// Diagramm f�r Zeitabh�ngigkeit der Elongation, Kreisbogen f�r Elongation, Zahlenwerte

function drawElongation() {
  var sMax = l * alpha0;                                     // Maximaler Betrag der Elongation (m)
  var s = sMax * cosPhi;                                     // Momentaner Wert der Elongation (m) 
  diagram(1, xD, yD1, sMax);                                  // Diagramm zeichnen
  alignText(symbolElongation, 1, xD - 25, yD1 - 130);             // Beschriftung (Symbol f�r Elongation)
  alignText(text22, 1, xD - 25, yD1 - 118);                       // Beschriftung (Einheit m)
  ctx.beginPath();                                         // Neuer Pfad
  ctx.lineWidth = 3;                                       // Liniendicke
  ctx.strokeStyle = colorElongation;                       // Farbe f�r Kreisbogen
  var pos = (alpha >= 0);                                  // Flag f�r Auslenkung nach rechts
  var w0 = (pos ? Math.PI / 2 : Math.PI / 2 - alpha);            // Startwinkel f�r Kreisbogen (Bogenma�)
  var w1 = (pos ? Math.PI / 2 - alpha : Math.PI / 2);            // Endwinkel f�r Kreisbogen (Bogenma�)
  ctx.arc(ax, ay, lPix, w0, w1, true);                          // Kreisbogen vorbereiten
  ctx.stroke();                                            // Kreisbogen zeichnen
  drawMomVal(s, xD, yD1, colorElongation);                    // Momentanen Wert im Diagramm markieren 
  ctx.fillStyle = colorElongation;                         // Farbe f�r Elongation (Zahlenwerte)  
  writeValue(text14, s, meterUnicode, 3, xD, xD + 200, height - 50); // Momentanen Wert angeben
  writeValue("(" + text13, sMax, meterUnicode + ")", 3, xD, xD + 200, height - 30);  // Maximalen Wert angeben
}

// Zeichnung zur Geschwindigkeit:
// Diagramm f�r Zeitabh�ngigkeit der Geschwindigkeit, Pfeil f�r Geschwindigkeitsvektor, Zahlenwerte

function drawVelocity() {
  var vMax = l * alpha0 * omega;                               // Maximaler Betrag der Geschwindigkeit (m/s)
  var v = -vMax * sinPhi;                                    // Momentaner Wert der Geschwindigkeit (m/s)
  diagram(2, xD, yD1, vMax);                                  // Diagramm zeichnen
  alignText(symbolVelocity, 1, xD - 28, yD1 - 130);               // Beschriftung (Symbol f�r Geschwindigkeit)
  alignText(text23, 1, xD - 28, yD1 - 118);                       // Beschriftung (Einheit m/s)
  ctx.strokeStyle = colorVelocity;                         // Farbe f�r Geschwindigkeit
  arrowPendulum(v * yPix, alpha0 * cosPhi);                     // Vektorpfeil f�r Geschwindigkeit
  drawMomVal(v, xD, yD1);                                    // Momentanen Wert im Diagramm markieren
  ctx.fillStyle = colorVelocity;                           // Farbe f�r Geschwindigkeit (Zahlenwerte)    
  writeValue(text15, v, meterPerSecond, 3, xD, xD + 200, height - 50);    // Momentanen Wert angeben
  writeValue("(" + text13, vMax, meterPerSecond + ")", 3, xD, xD + 200, height - 30);   // Maximalen Wert angeben
}

// Zeichnung zur Tangentialbeschleunigung:
// Diagramm f�r Zeitabh�ngigkeit der Beschleunigung, Pfeil f�r Beschleunigungsvektor, Zahlenwerte

function drawAcceleration() {
  var aMax = l * alpha0 * omega * omega;                         // Maximaler Betrag der Tangentialbeschleunigung (m/s�)
  var a = -aMax * cosPhi;                                    // Momentaner Wert der Tangentialbeschleunigung (m/s�)
  diagram(3, xD, yD1, aMax);                                  // Diagramm zeichnen
  centerTextIndex(symbolAcceleration, symbolTangential, xD - 30, yD1 - 130);     // Beschriftung (Symbol f�r Tangentialbeschleunigung) 
  alignText(text24, 1, xD - 30, yD1 - 113);                       // Beschriftung (Einheit m/s�)
  ctx.strokeStyle = colorAcceleration;                     // Farbe f�r Beschleunigung
  arrowPendulum(a * yPix, alpha0 * cosPhi);                     // Vektorpfeil f�r Tangentialbeschleunigung
  drawMomVal(a, xD, yD1);                                    // Momentanen Wert im Diagramm markieren
  ctx.fillStyle = colorAcceleration;                       // Farbe f�r Beschleunigung (Zahlenwerte) 
  var mps2 = meterPerSecond2Unicode;
  writeValue(text16, a, mps2, 3, xD - 30, xD + 220, height - 50);     // Momentanen Wert angeben
  writeValue("(" + text13, aMax, mps2 + ")", 3, xD - 30, xD + 220, height - 30); // Maximalen Wert angeben
}

// Zeichnung zur Tangentialkraft:
// Diagramm f�r Zeitabh�ngigkeit der Kraft, Pfeil f�r Kraftvektor, Zahlenwerte

function drawForce() {
  var fMax = m * l * alpha0 * omega * omega;                       // Maximaler Betrag der Tangentialkraft (N)
  var f = -fMax * cosPhi;                                    // Momentaner Wert der Tangentialkraft (N)
  diagram(3, xD, yD1, fMax);                                  // Diagramm zeichnen
  centerTextIndex(symbolForce, symbolTangential, xD - 30, yD1 - 130);  // Beschriftung (Symbol f�r Tangentialkraft)
  alignText(text25, 1, xD - 30, yD1 - 113);                       // Beschriftung (Einheit N) 
  ctx.strokeStyle = colorForce;                            // Farbe f�r Kraft
  arrowPendulum(f * yPix, alpha0 * cosPhi);                     // Vektorpfeil f�r Tangentialkraft
  drawMomVal(f, xD, yD1);                                    // Momentanen Wert im Diagramm markieren
  ctx.fillStyle = colorForce;                              // Farbe f�r Kraft (Zahlenwerte)    
  writeValue(text17, f, newton, 3, xD - 30, xD + 220, height - 50);    // Momentanen Wert angeben
  writeValue("(" + text13, fMax, newton + ")", 3, xD - 30, xD + 220, height - 30);   // Maximalen Wert angeben
}

// Diagramm f�r Zeitabh�ngigkeit der potentiellen und kinetischen Energie:
// (x,y) .... Ursprung (Pixel)
// e ........ Gesamtenergie (J)

function diagramEnergy(x, y, e) {
  horizontalAxis(x, y);                                     // Waagrechte Achse mit Beschriftung und Ticks
  verticalAxis(x, y, y + 20, y - 125, e);                          // Senkrechte Achse mit Beschriftung und Ticks
  var x1 = x + 200;                                          // x-Koordinate f�r rechten Rand (Pixel)
  var y1 = y - e * yPix;                                       // y-Koordinate f�r Gesamtenergie (Pixel)
  ctx.beginPath();                                         // Neuer Pfad
  ctx.moveTo(x, y1); ctx.lineTo(x1, y1);                     // Waagrechte Linie f�r Gesamtenergie vorbereiten
  ctx.stroke();                                            // Linie zeichnen
  var xx = x - tU * tPix;                                      // x-Koordinate des verschobenen Ursprungs (Pixel)
  var per = tPer * 10;                                       // Periode f�r Sinuskurven (Pixel)
  var ampl = e * yPix / 2;                                     // Amplitude f�r Sinuskurven (Pixel)
  sinus(xx - tPer * 2.5, y - ampl, per, ampl, x, x + 200);              // Sinuskurve f�r potentielle Energie
  sinus(xx - tPer * 7.5, y - ampl, per, ampl, x, x + 200);              // Sinuskurve f�r kinetische Energie
}

// Zeichnung f�r Energie:

function drawEnergy() {
  var e = l * alpha0 * omega; e = m * e * e / 2;                     // Gesamtenergie (J)
  var part = cosPhi * cosPhi;                                // Bruchteil f�r potentielle Energie
  var eP = e * part, eK = e - eP;                              // Potentielle und kinetische Energie (J)
  diagramEnergy(xD, yD2, e);                                 // Diagramm f�r Zeitabh�ngigkeit der beiden Energieformen 
  centerTextIndex(symbolEnergy, symbolPotential, xD - 30, yD2 - 125);  // Beschriftung links (potentielle Energie) 
  alignText(text26, 1, xD - 30, yD2 - 108);                       // Beschriftung links (Einheit J)
  centerTextIndex(symbolEnergy, symbolKinetic, xD + 30, yD2 - 125);    // Beschriftung rechts (kinetische Energie)
  alignText(text26, 1, xD + 30, yD2 - 108);                       // Beschriftung rechts (Einheit J)
  ctx.fillStyle = colorElongation;                         // Farbe f�r potentielle Energie (bzw. Elongation)
  writeValue(text18, eP, joule, 3, xD, xD + 200, height - 70);       // Momentaner Wert der potentiellen Energie    
  ctx.fillStyle = colorVelocity;                           // Farbe f�r kinetische Energie
  writeValue(text19, eK, joule, 3, xD, xD + 200, height - 50);       // Momentaner Wert der kinetischen Energie
  ctx.fillStyle = "#000000";                               // Farbe f�r Gesamtenergie
  writeValue(text20, e, joule, 3, xD, xD + 200, height - 30);        // Wert der Gesamtenergie
  var dy = part * 100;                                       // H�he des Rechtecks f�r potentielle Energie (Pixel)
  rectangle(300, 205, 50, dy, colorElongation);                // Rechteck f�r potentielle Energie
  if (part > 0.001 || on)                                  // Falls potentielle Energie nicht zu klein ...
    alignText(text18, 0, 360, 220);                           // ... Beschriftung potentielle Energie
  rectangle(300, 205 + dy, 50, 100 - dy, colorVelocity);           // Rechteck f�r kinetische Energie
  if (part < 0.999 || on)                                  // Falls kinetische Energie nicht zu klein ... 
    alignText(text19, 0, 360, 300);                           // ... Beschriftung potentielle Energie
  drawMomVal(eP, xD, yD2, colorElongation);                   // Markierung f�r momentane potentielle Energie
  drawMomVal(eK, xD, yD2, colorVelocity);                     // Markierung f�r momentane kinetische Energie
}

// Grafikausgabe:
// Seiteneffekt t, tU, phi, sinPhi, cosPhi, alpha, sinAlpha, cosAlpha, px, py

function paint() {
  ctx.fillStyle = colorBackground;                         // Hintergrundfarbe
  ctx.fillRect(0, 0, width, height);                          // Hintergrund ausf�llen
  rectangle(ax - 50, ay - 5, 100, 5, "#000000");                   // Aufh�ngung (Decke)
  if (on) {                                                // Falls Animation angeschaltet ...
    var t1 = new Date();                                   // ... Aktuelle Zeit
    var dt = (t1 - t0) / 1000;                                 // ... L�nge des Zeitintervalls (s)
    if (slow) dt /= 10;                                    // ... Falls Zeitlupe, Zeitintervall durch 10 dividieren
    t += dt;                                               // ... Zeitvariable aktualisieren
    t0 = t1;                                               // ... Neuer Anfangszeitpunkt
  }
  tU = (t < 5 ? 0 : t - 5);                                    // Zeit f�r Diagramm-Ursprung (s)
  phi = omega * t;                                           // Phasenwinkel (Bogenma�) 
  sinPhi = Math.sin(phi); cosPhi = Math.cos(phi);          // Trigonometrische Werte
  pendulum();                                              // Pendel zeichnen
  clock(ax, 340);                                           // Digitaluhr zeichnen
  switch (nrSize) {                                        // Je nach betrachteter Gr��e ...
    case 0: drawElongation(); break;                       // ... Zeichnung zur Elongation
    case 1: drawVelocity(); break;                         // ... Zeichnung zur Geschwindigkeit
    case 2: drawAcceleration(); break;                     // ... Zeichnung zur Tangentialbeschleunigung
    case 3: drawForce(); break;                            // ... Zeichnung zur Tangentialkraft
    case 4: drawEnergy(); break;                           // ... Zeichnung zur Energie
  }
  var s = text27 + ":  " + tPer.toPrecision(3) + " " + second;     // Zeichenkette f�r Schwingungsdauer
  s = s.replace(".", decimalSeparator);                     // Eventuell Komma statt Punkt
  ctx.fillStyle = "#000000";                               // Farbe f�r Text
  alignText(s, 1, ax, height - 30);                             // Zeichenkette f�r Schwingungsdauer ausgeben
}

document.addEventListener("DOMContentLoaded", start, false); // Nach dem Laden der Seite Start-Methode aufrufen