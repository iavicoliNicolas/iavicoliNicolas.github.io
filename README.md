# Nicolás Iavicoli Dulcet — portfolio

Static personal site for GitHub Pages. English is the default. A Spanish toggle is stored in the browser (`localStorage` key `portfolio-lang`). The theme follows the system setting until someone chooses light or dark (`portfolio-theme`).

Live URL, once Pages is enabled: <https://iavicolinicolas.github.io/>

## What a recruiter sees

The first screen is the name, the role (trainee/junior software developer and automation builder), the stack (JavaScript, Python, PHP, SQL, Java), Mar del Plata, and buttons for contact, GitHub, LinkedIn, and the CV.

## Edit the copy

All visitor-facing sentences live in [`js/i18n.js`](js/i18n.js), under `en` and `es`. Keys match.

English is also written into [`index.html`](index.html) so the page still reads if JavaScript does not run. If you change an English string, change it in both files. The elements are marked with `data-i18n="the.key"`. Alt text uses `data-i18n-alt`. A few labels use `data-i18n-aria`.

Spanish only needs an edit in `js/i18n.js`. The page applies that dictionary on load.

Technology names in the skill groups and project tags are the same in both languages. They are the lists in `index.html`, not dictionary keys.

## CV

Two PDFs, chosen by the language on the page:

- `assets/cv-nicolas-iavicoli-en.pdf` is the English CV. **Download CV** uses it while the interface is in English, including when JavaScript is off.
- `assets/cv-nicolas-iavicoli.pdf` is the Spanish CV. The same button switches to it when the language is Spanish.

A smaller link next to the button offers the other language. The hero and the contact section both do this. Keep these filenames. Replace a file in place when that CV changes.

## Portrait and project images

- `assets/avatar.png` is the GitHub avatar from <https://avatars.githubusercontent.com/u/82724197?v=4>.
- `assets/projects/` holds screenshots copied from the project repositories (Z.E.U.S., Delivery App API, WiFi Sonar, Platea). VMX25 has no interface screenshot; the card shows the sample program from that repository (`ADD LAR , 5` / `STOP`).

## Pages

GitHub Pages should serve this repository from the **default branch** (`main`) and the **root** folder. [`.nojekyll`](.nojekyll) is here so Pages does not run Jekyll.

After this merges:

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/ (root)**.
4. Save.

The site has no build step. `index.html`, `css/`, `js/`, and `assets/` are the site.

## Fonts

Fraunces and Outfit are self-hosted in `assets/fonts/` under the SIL Open Font License. The license texts are `OFL-fraunces.txt` and `OFL-outfit.txt`.
