// Newtons Wiege (Demonstration von Impuls- und Energieerhaltung)
// Java-Applet (04.11.1997) umgewandelt
// 18.04.2014 - 11.09.2015

// ****************************************************************************
// * Autor: Walter Fendt (www.walter-fendt.de)                                *
// * Dieses Programm darf - auch in ver�nderter Form - f�r nicht-kommerzielle *
// * Zwecke verwendet und weitergegeben werden, solange dieser Hinweis nicht  *
// * entfernt wird.                                                           *
// **************************************************************************** 

// Konstanten:

var colorBackground = "#ffff00";                 // Hintergrundfarbe
var color1 = "#c0c0c0";                          // Farbe f�r Gestell (hellgrau)
var color2 = "#808080";                          // Farbe f�r Gestell (dunkelgrau)
var color3 = "#a0a0a0";                          // Farbe f�r Gestell (mittelgrau)
var colorBall = "#ffffff";                       // Farbe f�r Kugeln

var text01 = "\u0421\u0431\u0440\u043e\u0441";             // Zur�ck
var text02 = "\u0421\u0442\u0430\u0440\u0442";             // Start
var text03 = "\u0427\u0438\u0441\u043b\u043e \u0448\u0430\u0440\u043e\u0432:"; // Zahl der ausgelenkten Kugeln

var A = 120, B = 80, C = 200;                    // Abmessungen in x-, y- und z-Richtung 
var D = 10;                                      // Dicke
var R = 20;                                      // Radius der Pendelk�rper
var L = 150;                                     // Pendell�nge
var AMPL = 0.4;                                  // Amplitude (Bogenma�)
var T = 2;                                       // Schwingungsdauer (s)
var phi = 58 * Math.PI / 180;                        // Azimutwinkel (Bogenma�)  
var theta = 20 * Math.PI / 180;                      // H�henwinkel (Bogenma�)
var u0, v0;                                      // Bildschirmmitte (Pixel)  
var a1, a2, b1, b2, b3;                          // Koeffizienten f�r Projektion
var poly1, poly2, poly3, poly4,                  // Arrays f�r Bildschirmkoordinaten der Polygonecken
  poly5, poly6, poly7, poly8;
var s1, s2;                                      // Arrays f�r Bildschirmkoordinaten der Aufh�ngepunkte 
var canvas, ctx;                                 // Zeichenfl�che, Grafikkontext
var bu1, bu2;                                    // Schaltkn�pfe
var ch;                                          // Auswahlliste

// Ver�nderliche Attribute:

var on;                                          // Flag f�r Bewegung
var t0;                                          // Anfangszeitpunkt (s)
var t;                                           // Aktuelle Zeit (s)
var sin, cos;                                    // Trigonometrische Werte des Phasenwinkels

// Element der Schaltfl�che (aus HTML-Datei):
// id ..... ID im HTML-Befehl
// text ... Text (optional)

function getElement(id, text) {
  var e = document.getElementById(id);           // Element
  if (text) e.innerHTML = text;                  // Text festlegen, falls definiert
  return e;                                      // R�ckgabewert
}

// Start:

function start() {
  canvas = getElement("cv");                     // Zeichenfl�che
  u0 = canvas.width / 2; v0 = 300;                 // Bildschirmmitte
  ctx = canvas.getContext("2d");                 // Grafikkontext
  bu1 = getElement("bu1", text01);                // Resetknopf
  bu2 = getElement("bu2", text02);                // Startknopf
  getElement("number", text03);                   // Erkl�render Text (Zahl der ausgelenkten Kugeln)
  ch = getElement("ch");                         // Auswahlliste
  ch.selectedIndex = 0;                          // Eine Kugel ausgelenkt

  on = false;                                    // Animation abgeschaltet
  t0 = new Date();                               // Anfangszeitpunkt
  setInterval(paint, 40);                         // Timer-Intervall 0,040 s  
  calcCoeff();                                   // Koeffizienten f�r Projektion
  initPolygons();                                // Polygone festlegen
  coordsSuspension();                            // Aufh�ngepunkte ermitteln
  paint();                                       // Zeichnen

  bu1.onclick = reactionButton1;                 // Reaktion auf Resetknopf
  bu2.onclick = reactionButton2;                 // Reaktion auf Startknopf
  ch.onchange = reactionChoice;                  // Reaktion auf Auswahl

} // Ende der Methode start

// Reaktion auf Resetknopf:

function reactionButton1() { on = false; t = 0; }

// Reaktion auf Startknopf:

function reactionButton2() { on = true; t0 = new Date(); }

// Reaktion auf Auswahl:

function reactionChoice() { on = false; t = 0; }

//-----------------------------------------------------------------------------

// Koeffizienten f�r Projektion berechnen:
// Seiteneffekt a1, a2, b1, b2, b3

function calcCoeff() {
  a1 = -Math.sin(phi); a2 = Math.cos(phi);
  b1 = -Math.sin(theta) * a2; b2 = Math.sin(theta) * a1; b3 = Math.cos(theta);
}

// Waagrechte Bildschirmkoordinate:

function screenU(x, y) {
  return u0 + a1 * x + a2 * y;
}

// Senkrechte Bildschirmkoordinate:

function screenV(x, y, z) {
  return v0 - b1 * x - b2 * y - b3 * z;
}

// Polygonecke festlegen:
// p ......... Array f�r Bildschirmkoordinaten der Polygonecken
// i ......... Index der Ecke
// x, y, z ... Koordinaten im Raum

function setPoint(p, i, x, y, z) {
  p[i] = { u: screenU(x, y), v: screenV(x, y, z) };
}

// Polygone f�r Gestell festlegen:
// Seiteneffekt poly1 bis poly8

function initPolygons() {
  poly1 = new Array(8);                          // U-f�rmige Fl�che (links)
  setPoint(poly1, 0, A + D, -B - D, C + 2 * D);
  setPoint(poly1, 1, A + D, -B - D, 0);
  setPoint(poly1, 2, A + D, B + D, 0);
  setPoint(poly1, 3, A + D, B + D, C + 2 * D);
  setPoint(poly1, 4, A + D, B, C + 2 * D);
  setPoint(poly1, 5, A + D, B, D);
  setPoint(poly1, 6, A + D, -B, D);
  setPoint(poly1, 7, A + D, -B, C + 2 * D);
  poly2 = new Array(4);                          // Rechtecksfl�che (hinten)
  setPoint(poly2, 0, A + D, -B - D, C + 2 * D);
  setPoint(poly2, 1, A + D, -B, C + 2 * D);
  setPoint(poly2, 2, -A - D, -B, C + 2 * D);
  setPoint(poly2, 3, -A - D, -B - D, C + 2 * D);
  poly3 = new Array(8)                           // U-f�rmige Fl�che (hinten)
  setPoint(poly3, 0, A + D, -B, C + 2 * D);
  setPoint(poly3, 1, A + D, -B, D);
  setPoint(poly3, 2, A, -B, D);
  setPoint(poly3, 3, A, -B, C + D);
  setPoint(poly3, 4, -A, -B, C + D);
  setPoint(poly3, 5, -A, -B, D);
  setPoint(poly3, 6, -A - D, -B, D);
  setPoint(poly3, 7, -A - D, -B, C + 2 * D);
  poly4 = new Array(4);                          // Rechtecksfl�che (links unten)
  setPoint(poly4, 0, A + D, -B, D);
  setPoint(poly4, 1, A + D, B, D);
  setPoint(poly4, 2, A, B, D);
  setPoint(poly4, 3, A, -B, D);
  poly5 = new Array(8);                          // U-f�rmige Fl�che (vorne)
  setPoint(poly5, 0, A + D, B + D, 0);
  setPoint(poly5, 1, A, B + D, 0);
  setPoint(poly5, 2, A, B + D, C + D);
  setPoint(poly5, 3, -A, B + D, C + D);
  setPoint(poly5, 4, -A, B + D, 0);
  setPoint(poly5, 5, -A - D, B + D, 0);
  setPoint(poly5, 6, -A - D, B + D, C + 2 * D);
  setPoint(poly5, 7, A + D, B + D, C + 2 * D);
  poly6 = new Array(4);                          // Rechtecksfl�che (vorne oben)
  setPoint(poly6, 0, A + D, B, C + 2 * D);
  setPoint(poly6, 1, A + D, B + D, C + 2 * D);
  setPoint(poly6, 2, -A - D, B + D, C + 2 * D);
  setPoint(poly6, 3, -A - D, B, C + 2 * D);
  poly7 = new Array(8);                          // U-f�rmige Fl�che (rechts)
  setPoint(poly7, 0, -A, -B - D, C + D);
  setPoint(poly7, 1, -A, -B - D, 0);
  setPoint(poly7, 2, -A, B + D, 0);
  setPoint(poly7, 3, -A, B + D, C + D);
  setPoint(poly7, 4, -A, B, C + D);
  setPoint(poly7, 5, -A, B, D);
  setPoint(poly7, 6, -A, -B, D);
  setPoint(poly7, 7, -A, -B, C + D);
  poly8 = new Array(4);                          // Rechtecksfl�che (rechts unten)
  setPoint(poly8, 0, -A, -B, D);
  setPoint(poly8, 1, -A, B, D);
  setPoint(poly8, 2, -A - D, B, D);
  setPoint(poly8, 3, -A - D, -B, D);
}

// Bildschirmkoordinaten der Aufh�ngepunkte ermitteln:
// Seiteneffekt s1, s2;

function coordsSuspension() {
  s1 = new Array(5);                             // Array f�r Aufh�ngepunkte hinten
  s2 = new Array(5);                             // Array f�r Aufh�ngepunkte vorne
  for (var i = 0; i < 5; i++) {                      // F�r alle f�nf Pendel ...
    var x0 = -4 * R + i * 2 * R, y0 = B + D / 2, z0 = C + D;   // Koordinaten im Raum
    s1[i] = { u: screenU(x0, -y0), v: screenV(x0, -y0, z0) };  // Bildschirmkoordinaten f�r hintere Aufh�ngung
    s2[i] = { u: screenU(x0, y0), v: screenV(x0, y0, z0) };    // Bildschirmkoordinaten f�r vordere Aufh�ngung
  }
}

//-----------------------------------------------------------------------------

// Polygon zeichnen:
// p ... Array mit Koordinaten der Ecken
// c ... F�llfarbe

function drawPolygon(p, c) {
  ctx.beginPath();                               // Neuer Pfad
  ctx.strokeStyle = "#000000";                   // Linienfarbe schwarz
  ctx.fillStyle = c;                             // F�llfarbe
  ctx.lineWidth = 1;                             // Liniendicke
  ctx.moveTo(p[0].u, p[0].v);                     // Zur ersten Ecke
  for (var i = 1; i < p.length; i++)                 // F�r alle weiteren Ecken ... 
    ctx.lineTo(p[i].u, p[i].v);                   // Linie zum Pfad hinzuf�gen
  ctx.closePath();                               // Zur�ck zum Ausgangspunkt
  ctx.fill(); ctx.stroke();                      // Polygon ausf�llen und Rand zeichnen   
}

// Linie zum Pfad hinzuf�gen:
// p ...... Punkt (Bildschirmkoordinaten, gegeben als Objekt mit Attributen u und v)
// u, v ... Bildschirmkoordinaten des zweiten Punkts

function addLine(p, u, v) {
  ctx.moveTo(p.u, p.v); ctx.lineTo(u, v);
}

// Einzelnes Pendel zeichnen:
// i ... Index (0 bis 4)

function drawPendulum(i) {
  var k = ch.selectedIndex + 1;                    // Zahl der ausgelenkten Kugeln
  var x0 = -4 * R + i * 2 * R;                           // Mittlere x-Koordinate des Kugelmittelpunkts
  var y0 = B + D / 2;                                // y-Koordinate Aufh�ngungen (Betrag)
  var z0 = C + D;                                  // z-Koordinate Aufh�ngungen
  var moving = ((t < 0.25 * T || t >= 0.75 * T) && i < k)
    || (t >= 0.25 * T && t < 0.75 * T && i >= 5 - k);  // Bedingung f�r bewegte Kugel 
  var px = (moving ? x0 - L * sin : x0);             // x-Koordinate Kugelmittelpunkt
  var pz = (moving ? z0 - L * cos : z0 - L);           // z-Koordinate Kugelmittelpunkt	
  var u0 = screenU(px, 0), v0 = screenV(px, 0, pz); // Bildschirmkoordinaten Kugelmittelpunkt
  ctx.beginPath();                               // Neuer Pfad
  ctx.lineStyle = "#000000";                     // Linienfarbe schwarz
  ctx.lineWidth = 1;                             // Liniendicke
  addLine(s1[i], u0, v0);                          // Hinterer Faden
  addLine(s2[i], u0, v0);                          // Vorderer Faden
  ctx.stroke();                                  // F�den zeichnen
  ctx.beginPath();                               // Neuer Pfad
  ctx.fillStyle = colorBall;                     // F�llfarbe
  ctx.arc(u0, v0, R, 0, 2 * Math.PI, true);             // Kreis f�r Pendelk�rper vorbereiten
  ctx.fill(); ctx.stroke();                      // Pendelk�rper zeichnen
}

// Kleine Korrektur f�r Polygon poly3: Die F�den der hinteren Aufh�ngungen ragen etwas ins Polygon hinein.

function correctPolygon() {
  var u1 = screenU(A, -B), v1 = screenV(A, -B, C + D + 2);
  var u2 = screenU(-A, -B), v2 = screenV(-A, -B, C + D + 2);
  ctx.beginPath();
  ctx.strokeStyle = color2;
  ctx.lineWidth = 2;
  ctx.moveTo(u1, v1); ctx.lineTo(u2, v2);
  ctx.stroke();
}

// Grafikausgabe:

function paint() {
  ctx.fillStyle = colorBackground;               // Hintergrundfarbe
  ctx.fillRect(0, 0, canvas.width, canvas.height);  // Hintergrund ausf�llen
  t = (on ? (new Date() - t0) / 1000 : 0);           // Aktuelle Zeit (s)
  while (t >= T) t -= T;                         // 0 <= t < T erzwingen
  var phi = AMPL * Math.cos(2 * Math.PI / T * t);        // Phasenwinkel (Bogenma�)
  sin = Math.sin(phi); cos = Math.cos(phi);      // Trigonometrische Werte aktualisieren  
  drawPolygon(poly8, color3);                     // Rechtecksfl�che (rechts unten)
  drawPolygon(poly7, color1);                     // U-f�rmige Fl�che (rechts)
  drawPolygon(poly3, color2);                     // U-f�rmige Fl�che (hinten)
  for (var i = 0; i < 5; i++) drawPendulum(i);       // Pendel
  drawPolygon(poly6, color3);                     // Rechtecksfl�che (vorne oben)
  drawPolygon(poly4, color3);                     // Rechtecksfl�che (links unten)
  drawPolygon(poly2, color3);                     // Rechtecksfl�che (hinten oben)
  drawPolygon(poly1, color1);                     // U-f�rmige Fl�che (links)
  drawPolygon(poly5, color2);                     // U-f�rmige Fl�che (vorne)
  correctPolygon();                              // Kleine Korrektur
}

document.addEventListener("DOMContentLoaded", start, false);