# Veezer Template

Veezer is a website template using Eleventy and designed to work in the CloudCannon environment. There are plenty of improvements to be made to it and would best suit someone that wants to tinker and experiment, and selectively use parts of the codebase rather than use it as-is.

Browse a <a href="https://brisk-bunny.cloudvent.net/" target="_blank" rel="noopener">live demo</a>.

View <a href="https://brisk-bunny.cloudvent.net/documentation/" target="_blank" rel="noopener">documentation</a>.

## Features

* Optimised for editing in CloudCannon
* Uses Bookshop components for page building
* Partial page reloading (via Fetch API)
* Animations with GSAP (javascript animation library)
* Blog with pagination and category pages
* Events section
* Configurable forms, navigation and footer sections
* Configurable theme colours and fonts
* Vanilla javascript (no frameworks)
* Image optimisation (Imagekit, wsrv.nl)
* Development documentation built into the site

## **Development (local)**

1. Run `npm i` to install the modules.
2. Run `npm run start` to build and watch the site.

This will create a `_site` folder, containing the output files. Any changes made to source files updates these output files. By default the site's output files are hosted at `http://localhost:8080`

## **Building (CloudCannon)**

1. Run `npm i` to install the modules.
2. Run `npm run build` to build the site.

This will create a `_site` folder, containing the output files.

\*In order to use image optimisation, use run `npm run build-production`<br>This sets `ELEVENTY_ENV=production` which is checked for in the liquid templates.

*\*This template is designed to be edited in CloudCannon as a 'development' site. In the development site, image optimisation is not applied so you don't get the broken CDN image problems. This development site can then publish to a 'production' branch site (where the variable `ELEVENTY_ENV=production` is set) and image transformations are applied.*

*For more detail on this, please see the documentation on* <a href="/documentation/image-handling/" target="_blank" rel="noopener"><em>image handling</em></a>*.*

---

View Veezer <a href="https://brisk-bunny.cloudvent.net/documentation/" target="_blank" rel="noopener">documentation</a>.