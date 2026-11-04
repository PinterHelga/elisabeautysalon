# Eliza Beauty Salon – design system („A tükör előtt”)

Ez a fájl a további oldalak (Kezelések, Rólunk, Kapcsolat, Adatkezelési tájékoztató) elkészítésének szabálykönyve. A kész, jóváhagyott kezdőoldalból (`public/index.html`) készült, és azt rögzíti, ami ott ténylegesen működik.

- **Elsőbbség:** ha ez a fájl és a gyökérben lévő eredeti `design-system.md` eltér, **ez a fájl érvényes**. Az eredeti az ügyfél kiinduló anyaga, változatlanul megtartjuk.
- **Forráskód-referencia:** minden itt leírt osztály, token és mozgás megtalálható a `public/index.html` `<style>` és `<script>` blokkjában. Új oldalnál onnan másolj, ne írd újra.
- **Tartalom:** a szövegek a `szovegek.md`-ből jönnek, legfeljebb rövidítve. Új állítás (ár, szám, ígéret, vélemény) nem kerülhet be. A hang **tegeződő**, Eliza egyes szám első személyben beszél. Em dash (—) nem kerül a szövegekbe.

---

## 1. Hangulat és alapelv

Csendes luxus: nőies, elegáns, nyugodt, prémium, de barátságos. Sok krém színű levegő, finom homokarany vonalak, rózsafa kiemelés.

**A vezérmotívum a szalon kerek, aranykeretes tükre.** Ebből jön minden forma: **boltív** (álló képek, díszek), **kör** (portrék, ikonkeretek, pecsét, vélemény-tükör) és **vékony homokarany körvonal** (keretek, díszvonalak). Új elem tervezésekor az első kérdés: boltív, kör vagy vonal legyen?

**Ne legyen:** csillogás, rózsaszín giccs, neon, színátmenet mint díszítés, sötét mód, zsúfolt kártyarács, erős árnyék, karusszel, felugró ablak.

---

## 2. Színek

| Token (CSS-változó) | Hex | Szerep |
|---|---|---|
| `--color-brand-primary` | `#8E4A5A` | Rózsafa: gombok, linkek, kickerek, ikonok, számok |
| `--color-brand-secondary` | `#6E3644` | Sötét rózsafa: gomb hover, aktív állapot |
| `--color-brand-accent` | `#C9A27E` | Homokarany: **csak** vonalak, körvonalak, díszek; sötét háttéren szöveg is lehet |
| `--color-brand-bg` | `#FAF6F2` | Krém: az oldal alapháttere |
| `--color-brand-surface` | `#F1E6DF` | Púder: kiemelt panel (bemutatkozás), hírlevél-sáv, kép-helykitöltő |
| `--color-brand-text` | `#2E2626` | Sötét kakaó: szöveg, lábléc, felhívás-boltív háttere |
| `--color-brand-muted` | `#6B5F5C` | Szürkésbarna: leírások, bekezdések, űrlapcímkék |
| `--line` | `#E3D6CF` | Halvány púder: elválasztók, mezőkeretek |

**Szabályok**
- Homokarany világos háttéren **soha nem szövegszín** (kontraszt-hiba). Sötét kakaón igen (lábléc-címek, lábléc-logó, telefonszám a felhívásban).
- Fehér (`#fff`) csak űrlapmezőn, a gombszövegen és a hover-háttereken.
- Sötét kakaó szakaszból oldalanként **legfeljebb egy** legyen a lábléc mellett (felhívás-boltív).
- Szöveg sötét háttéren: `rgba(250,246,242,.84)`, finom vonal sötét háttéren: `rgba(250,246,242,.14)`.

---

## 3. Tipográfia

**Betűtípusok** (Google Fonts, latin-ext):
- **Cormorant Garamond** 400/500/600 és dőlt 400/500: címsorok, idézetek, nagy számok, aláírás-jellegű szövegek.
- **Jost** 300/400/500: törzsszöveg, gombok, kickerek, menü, címkék.

| Osztály | Betű | Méret (clamp) | Sormagasság | Betűköz |
|---|---|---|---|---|
| `.h1` | Cormorant 500 | 40 → 64 px | 1,1 | −0,022em |
| `.h2` | Cormorant 500 | 32 → 44 px | 1,15 | −0,015em |
| `.h3` | Cormorant 600 | 24 → 28 px | 1,2 | −0,005em |
| `.kicker` | Jost 500, NAGYBETŰ | 13 → 14 px | 1,4 | 0,08em, rózsafa |
| törzs (`body`) | Jost 400 | 16 → 18 px | 1,5 | – |
| `.lede` | törzs, szürkésbarna | – | – | – |
| `.small` | Jost 400 | 14 → 15 px | 1,5 | – |
| `.quote` | Cormorant dőlt 400 | 22 → 29 px (kiemelt: 24 → 36 px) | 1,38–1,42 | – |
| gomb | Jost 500, NAGYBETŰ | 15 px | 1 | 0,08em |

**Szabályok**
- Folyó szöveg max. **680 px** (`.measure`), bekezdés a hero-ban max. 34rem.
- A **kicker csak szakaszcím fölé** kerül, és nem minden szakaszra: ahol van boltív-dísz, ott kicker nélkül is jó.
- A hero kickerét két oldalon **36 px-es homokarany vonal** kíséri (`::before` és `::after`). Más kickereknél nincs vonal.
- Egy sorban lévő, egyenrangú címek (pl. folyamat-lépések) **egy sorba férjenek** (`white-space:nowrap` + a hasábszélességhez igazított méret), hogy a kártyák egyformák legyenek.
- Ha egy szövegblokk mellett/fölött űrlapmezők állnak, és a jobb széleik egy vonalba kerülnek, a bekezdés **sorkizárt** legyen (`text-align:justify; hyphens:auto`).
- Számoknál `font-variant-numeric:lining-nums tabular-nums`.
- Magyar „idézőjelek”, nem törő szóköz a számok és mértékegységek, címek elemei között (`1092&nbsp;Budapest`).

---

## 4. Térköz és elrendezés

| Token | Érték | Mire |
|---|---|---|
| `--wrap` | 1200 px | tartalom max. szélessége (`.wrap`) |
| `--pad-x` | 20 → 48 px | oldalsó margó |
| `--sec-gap` | 40 → 64 px | **szakasz felső és alsó térköze**: két szakasz között ennek kétszerese (~80–128 px) |
| `--sec-y` | 64 → 128 px | csak szorzóként a hero és néhány egyedi szakasz finomhangolásához |

- Alapegység 8 px. Belső térközök: 8, 12, 16, 24, 32, 44, 56, 72, 80.
- **Üres sáv két szakasz között legfeljebb ~130 px** desktopon (a felhasználó többször kérte a szűkítést). Ha valami üresnek hat, inkább szűkíts.
- Egy szakasz tartalma: `section.section > .wrap > (.sec-head.center.measure) + tartalom`.
- Rácsok: két hasábos tartalom `5fr 7fr` (kép + szöveg), előnyök 2 × 2, kezelések 3 hasáb (a középső 64 px-szel lejjebb), folyamat 4 hasáb.
- **Töréspontok:** 960 px (menü → mobilmenü, lábléc 2 hasáb), 900 px (hero, bemutatkozás, folyamat egy hasáb), 860 px (kezelések, hírlevél), 820 px (előnyök), 760 px (tükör-vélemény boltívvé alakul), 520/420 px (apró igazítások). Mobilon 375 px-ig nincs vízszintes túlcsordulás.

---

## 5. Formák és motívumok

| Elem | Leírás | Osztály / megoldás |
|---|---|---|
| **Boltív-kép** | Álló kép, félkör tető, 16 px-es alsó sarkok | `.arch` (5:7) vagy `.treat .arch` (3:4) |
| **Boltív-körvonal** | Vékony homokarany boltív a kép mögött, eltolva (hero: 22 px jobbra fel, hírlevél: 18 px balra le) | `svg.arch-outline` + `vector-effect:non-scaling-stroke` |
| **Kör-kép** | Kerek portré, púder helykitöltő háttérrel | `.circle` |
| **Halo** | Kör-kép körüli vékony homokarany gyűrű (−12/−18 px) | `.halo` (**soha ne `.ring`**, lásd 9. pont) |
| **Tükör** | 600 px-es kettős homokarany kör, finom tükörfény, a peremén 96 s alatt körbefutó aranygömb | `.mirror` + `.orbit` |
| **Boltív-dísz** | Szakaszelválasztó: kis boltív két 56 px-es vonal között | `.ornament` |
| **Kis boltív-jel** | Szakasz tetején álló 52–56 px-es boltív (Magdi-vélemény, időpontkérő) | `.solo-arch`, `.book-top` |
| **Garancia-pecsét** | 176 px-es kör, körbefutó felirat (SVG `textPath`), közepén „50%” | `.seal` |
| **Ikonkör** | 64 px-es kör homokarany kerettel, benne vonalas ikon | `.benefit .ico` |
| **Tükör-pötty** | 6 px-es homokarany kör a menüpont alatt (aktív: kitöltött) | `.hdr-nav a::after` |
| **Felhívás-boltív** | Teljes szélességű kakaó boltív, tetején félig kilógó kör-fotó 8 px-es kakaó kerettel | `.cta-sec`, `.cta-arch`, `.cta-photo` |

**Lekerekítések:** kártya, panel, kép alsó sarka 16 px. Űrlapmező 12 px. Gomb, kör alakú gomb 999 px / 50%.
**Árnyék:** alapból nincs. Egyetlen kivétel a lebegő aláírás-kártya: `0 1px 0 var(--line), 0 18px 40px -28px rgba(46,38,38,.35)`.

---

## 6. Komponensek

**Gombok**
- `.btn.btn-primary`: rózsafa kapszula, fehér szöveg, 16 × 32 px, hoverre sötét rózsafa, átsuhanó „tükörcsillanás” (`::after`).
- `.btn.btn-secondary`: átlátszó, 1 px rózsafa keret, hoverre kitöltődik.
- `.textlink`: nagybetűs rózsafa szöveglink, hoverre kirajzolódó aláhúzás, mellette 30 px-es kör nyíllal (`.halo` + `#i-arrow`).
- `.circle-btn`: 46 px-es kör ikon-gomb (telefon a fejlécben).
- Elsődleges CTA szövege mindenhol: **„Időpontot kérek”** → `#idopont`. Másodlagos: „Megnézem a kezeléseket”.

**Fejléc** (`.site-header`): fix, 104 px magas, görgetésre 76 px, krém üveghatású háttér (`blur(14px)`) és alsó vonal. Logó: `logo-fejlec.svg` (64 → 50 px). Jobbra telefon (≥1180 px teljes szám, alatta kör-gomb) + „Időpontot kérek” gomb. 960 px alatt mobilmenü: teljes képernyős krém lap, középen nagy homokarany boltív, Cormorant 38 px-es menüpontok. Aktív oldal: `aria-current="page"`.

**Hero** (aloldalakon is ez a minta): bal hasáb kicker (két vonallal) + H1 + bevezető + CTA-k, jobb hasábban boltív-kép eltolt körvonallal és lebegő aláírás-kártyával (`.sig`). Aloldalon a kép lehet kisebb, de a szerkezet maradjon.

**Tükör-vélemény** (`.mirror`): egyetlen kiemelt vélemény, középre zárva, dőlt Cormorant, alatta `.cite` (28 px-es vonal + NAGYBETŰS név). **Nincs külön dekoratív idézőjel**, csak a szövegben lévő „…”. Desktopon a tartalom 32 px-szel lejjebb tolva (optikai közép). Mobilon boltívvé alakul.

**Csendes vélemény** (`.solo`): második vélemény, kis boltív-jel fölötte, nagyobb dőlt idézet, sok levegő.

**Előnyök** (`.benefits`): 2 × 2 rács, ikonkör + H3 + szürkésbarna szöveg, középre zárva. Az első sor alatt a szövegoszlop szélességű `--line` vonal (függőleges vonal nincs). A metszéspontban a garancia-pecsét.

**Bemutatkozó panel** (`.intro-grid`): balra kör-fotó halóval, ami rálóg a púder panelre. A panelben H2, szöveg, számsor (`.stats`: nagy rózsafa Cormorant számok, homokarany függőleges elválasztó) és `.textlink`.

**Kezelés-kártya** (`.treat`): boltív-kép (3:4), H3, rövid leírás, az egész kártya link. Hoverre a kép 4%-ot nagyít, és **csak ekkor** jelenik meg az eltolt körvonal (nyugalmi állapotban `opacity:0`).

**Folyamat** (`.steps`): 4 hasáb, 72 px-es számozott körök, köztük kirajzolódó homokarany vonal, címek egy sorban. Mobilon függőleges idővonal. Számozás csak valódi sorrendnél.

**Felhívás** (`.cta-sec`): kakaó boltív, tetején kör-fotó, krém H2, szöveg, „Időpontot kérek” + telefonsor homokarany számmal.

**GYIK** (`.faq`): max. 780 px, vonalakkal elválasztott sorok, Cormorant kérdés, jobbra 40 px-es kör plusz/mínusz kapcsoló (nyitva kitöltött rózsafa, 180°-ot fordul). Akkordeon `grid-template-rows` animációval.

**Űrlap** (`.form`, `.field`): címke felül (14 px, szürkésbarna), fehér mező, 1 px `--line` keret, 12 px lekerekítés, 15 × 18 px belső térköz; fókuszra rózsafa keret + `0 0 0 3px rgba(142,74,90,.12)`. Jelölőnégyzet: `accent-color` rózsafa. Elküldés után `.form-done` doboz: kör pipával és dőlt Cormorant „Köszönöm, hamarosan jelentkezem!”. Időpontkérő mezők: Teljes név, E-mail cím, Üzenet. Gomb: „Küldés”.

**Lábléc** (`.site-footer`): kakaó háttér, 4 hasáb (bemutatkozás · Elérhetőség · Nyitvatartás · Oldalak). A logó **homokarany** (`logo-fejlec-arany.svg`, 72 px), a hasábcímek Jost 13 px NAGYBETŰS homokarany, a linkek krém színűek, hoverre homokarany. Az alsó sor: „© Eliza Beauty Salon – Minden jog fenntartva!” + „Adatkezelési tájékoztató”. Közösségi ikonok nincsenek.

**Ikonok:** saját vonalas SVG szimbólumok (`#i-phone`, `#i-arrow`, `#i-pin`, `#i-mail`, `#i-clock`, `#i-check`), 1,3 px vonal, lekerekített végek, `currentColor`. Új ikon ugyanebben a stílusban (Lucide-szerű, vékony).

---

## 7. Képek

- Formátum **WebP**, leghosszabb oldal **max. 1200 px**, minőség ~80%. Egy kép 25–75 KB. Az éles képek helye: `public/images/`.
- Az eredeti fotók a `Fotók/` mappában vannak. Új kép: onnan méretezd és konvertáld, majd tedd a `public/images/` mappába.
- Hangulat: meleg, természetes fény, krém és bézs környezet, sok bőrtónus.
- Minden kép `object-fit:cover`, a fókuszpontot `object-position`-nel állítsd. Az első képernyőn kívüli képek `loading="lazy"`.
- **Licenc:** a szérum- és krémfotókon (`szerum-cseppentve`, `nyak-krem` stb.) Unsplash+ vízjel van. Élesítés előtt licencelni vagy cserélni kell.

---

## 8. Mozgás

Lassú, selymes mozgás, soha nem pattogó. Görbék: `--ease-out: cubic-bezier(.22,.61,.36,1)`, `--ease-silk: cubic-bezier(.16,1,.3,1)`. Tipikus időtartam 0,5–1,8 s.

| Felfedés (`data-reveal`) | Hatás | Mire |
|---|---|---|
| `rise` | 28 px-ről felúszik | szövegblokkok, kártyák |
| `mist` | homályból kitisztul („bepárásodott tükör”) | vélemények |
| `unveil` | alulról feltáruló kép | boltív-képek |
| `iris` | középről kinyíló kör | kör-képek, pecsét |
| `draw` | kirajzolódó homokarany vonal | díszek, körvonalak |
| `frame` | a tükör kerete lassan megjelenik | `.mirror` |

- Késleltetés: `style="--d:.15s"` (lépcsőzetesen 0,15 s-onként).
- Hero: lépcsőzetes belépés a `.loaded` osztállyal (sorok alulról, kép feltárul, körvonal kirajzolódik).
- Önállóan mozgó elem oldalanként legfeljebb egy-kettő: tükör-gömb (96 s), pecsét felirata (120 s), hero-körvonal lebegése (14 s).
- `prefers-reduced-motion` esetén minden mozgás kikapcsol, minden elem azonnal látszik.
- **Fontos (JS):** az `iris` és `unveil` elem induláskor `clip-path`-szal teljesen rejtett, ezért az IntersectionObserver nem érzékeli. A meglévő szkript egy láthatatlan helyettesítő elemet figyel a helyükön. Ezt a megoldást vidd át minden új oldalra, különben a képek nem jelennek meg.

---

## 9. Tanulságok a kezdőoldalból (ne ismételd meg)

1. **Tailwind-ütközés:** a Tailwind Play CDN-nek vannak beépített osztálynevei (`ring`, `shadow`, `border`, `container` stb.). Saját osztálynak ne adj ilyen nevet. A `.ring` kék fényt rajzolt a körök köré, ezért lett `.halo`.
2. **`nth-child` helyett `nth-of-type`**, ha a rácsban más elem is van (a pecsét miatt csúsztak el az előnyök vonalai).
3. **Díszítő körvonal nyugalmi állapotban** csak akkor látszódjon, ha pontosan illeszkedik. Ha csak hoverre van értelme, alapból `opacity:0`.
4. **Logó:** a fejlécben és a láblécben a `logo-fejlec*.svg` változatokat használd, nagyobb „BEAUTY SALON” felirattal. Az eredeti `logo.svg`-ben ez olvashatatlanul kicsi.
5. **Felesleges dísz helyett levegő:** a felhasználó kivette a bordó idézőjel-díszt és a lábléc „E” boltívét. Kevesebb dísz a jó irány.
6. Kép körüli keret **egyszínű** maradjon (a kétszínű, félbe vágott keret nem tetszett).

---

## 10. Új aloldal ellenőrzőlista

- [ ] Fejléc, mobilmenü, időpontkérő szakasz (`#idopont`) és lábléc a `public/index.html`-ből másolva, `aria-current="page"` a saját menüpontján.
- [ ] Hero a 6. pont mintája szerint (kicker két vonallal, H1, bevezető, CTA, boltív-kép).
- [ ] Csak a 2. pont színei, a 3. pont osztályai, `--sec-gap` térközök.
- [ ] Szöveg a `szovegek.md`-ből, tegeződve, em dash nélkül, új állítás nélkül.
- [ ] Képek WebP-ben a `public/images/` mappában, max. 1200 px.
- [ ] Felfedések működnek görgetéssel, kézi beavatkozás nélkül (az `iris`/`unveil` helyettesítő-figyelővel).
- [ ] 375 px-en nincs vízszintes túlcsordulás, a címek nem törnek csúnyán.
- [ ] Linkek: `index.html`, `kezelesek.html`, `rolunk.html`, `kapcsolat.html`, `adatkezeles.html` (mind a `public/` mappában).
- [ ] Közös CSS/JS: ha a második aloldal is elkészül, érdemes a közös stílust és szkriptet külön fájlba (`public/css/site.css`, `public/js/site.js`) kiszervezni, hogy ne fusson szét.
