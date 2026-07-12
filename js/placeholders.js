/* Inline-SVG placeholder gallery for the IMPORT PLACEHOLDER modal.
   Every image is a scalable SVG encoded as a data: URI — tiny and fully
   offline (works behind school firewalls and on GitHub Pages).
   Edit / add items freely: give a name, size and an svg() body. */
(function () {
  "use strict";

  // Build a data: URI from raw SVG markup.
  function uri(svg) {
    return "data:image/svg+xml," + encodeURIComponent(svg.replace(/\s+/g, " ").trim());
  }

  function box(w, h, label, bg, fg) {
    bg = bg || "#c7c9d9"; fg = fg || "#5a5e78";
    return uri(
      "<svg xmlns='http://www.w3.org/2000/svg' width='" + w + "' height='" + h + "'>" +
      "<rect width='100%' height='100%' fill='" + bg + "'/>" +
      "<path d='M0 0 L" + w + " " + h + " M" + w + " 0 L0 " + h + "' stroke='" + fg + "' stroke-width='1' opacity='0.35'/>" +
      "<text x='50%' y='50%' fill='" + fg + "' font-family='sans-serif' font-size='" +
      Math.round(Math.min(w, h) / 8) + "' text-anchor='middle' dominant-baseline='middle'>" +
      label + "</text></svg>");
  }

  window.PLACEHOLDERS = [
    { name: "Image 640×360", w: 640, h: 360,
      uri: box(640, 360, "IMAGE 640×360") },
    { name: "Square 400×400", w: 400, h: 400,
      uri: box(400, 400, "400×400") },
    { name: "Banner 1200×300", w: 1200, h: 300,
      uri: box(1200, 300, "BANNER 1200×300", "#241a44", "#9dfcff") },
    { name: "Avatar", w: 160, h: 160,
      uri: uri("<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
        "<rect width='160' height='160' fill='#e7e9f5'/>" +
        "<circle cx='80' cy='62' r='30' fill='#9aa0c4'/>" +
        "<path d='M30 150 a50 50 0 0 1 100 0 z' fill='#9aa0c4'/></svg>") },
    { name: "Logo 220×80", w: 220, h: 80,
      uri: uri("<svg xmlns='http://www.w3.org/2000/svg' width='220' height='80'>" +
        "<rect width='220' height='80' rx='12' fill='#0b0b18'/>" +
        "<circle cx='42' cy='40' r='20' fill='#ff4fd8'/>" +
        "<text x='78' y='50' fill='#9dfcff' font-family='sans-serif' font-size='26' font-weight='700'>LOGO</text></svg>") },
    { name: "Icon (star)", w: 96, h: 96,
      uri: uri("<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'>" +
        "<rect width='96' height='96' rx='16' fill='#15162a'/>" +
        "<path d='M48 16 L58 40 L84 42 L64 60 L70 86 L48 72 L26 86 L32 60 L12 42 L38 40 Z' fill='#febc2e'/></svg>") },
    { name: "Gradient 400×300", w: 400, h: 300,
      uri: uri("<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>" +
        "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
        "<stop offset='0' stop-color='#ff4fd8'/><stop offset='1' stop-color='#00e5ff'/></linearGradient></defs>" +
        "<rect width='400' height='300' fill='url(#g)'/></svg>") },
    { name: "Card photo 300×200", w: 300, h: 200,
      uri: box(300, 200, "PHOTO", "#b8c3d9", "#4d5878") }
  ];
})();
