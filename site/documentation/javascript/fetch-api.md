---
_schema: default
title: Fetch API
tags: documentation
permalink: /documentation/javascript/fetch-api/
url: /documentation/javascript/fetch-api/
layout: layouts/documentation.liquid
date: 2026-01-13T00:00:00+13:00
seo:
  meta_title:
  meta_description:
  canonical_url:
  meta_image:
  author_twitter_handle:
  open_graph_type:
  no_index: true
is_section_summary_page: false
navigation_group_docs:
_inputs:
  date:
    comment: Date page last updated.
  is_section_summary_page:
    type: checkbox
    comment: Check if this is a section summary page for documentation.
  navigation_group_docs:
    type: select
    hidden: '!is_section_summary_page'
    comment: >-
      Pulled from on any sub-navigation group titles added in the documentation
      nav file of the data folder ('_data/nav-docs.json') - e.g. 'javascript' if
      this is a summary page for the 'javascript' section).
    options:
      values: data.nav-docs.items[*].sub_navigation_group_title
  tags:
    hidden: true
---
The template uses the Fetch Javascript API to perform partial page refreshes rather than a full page reload. This behaviour can be turned off via a checkbox in the `_data/site.json` data file (the template will then load the `js/non-fetch.js` file rather than the `js/fetch.js` file).

The related files are:

**fetch.js**<br>Contains code to handle:

* Fetching new page content via Fetch API calls
* Updating the browser history, updating meta tags, navigation menu active states
* Initialising the javascript modules that handle GSAP animations
* Initialising the javascript modules that relate to Bookshop components (FAQs, image carousels and sliders, etc.)
* Initialises any Fullscreen Lightgallery instances.

**non-fetch.js**<br>This just imports all the modules that same as fetch.js without the partial page refresh handling.

### Refresh target

The `<main>` element is the targeted wrapper for the content replacement from the Fetch API result:

```
<main>
  (content in here is replaced after the Fetch API call)
</main>
```

### Javascript on initial page load

Any content that is outside of the refreshed content container only needs to be loaded/run once on the initial page load. This loading is done in the main template. This includes the third-party tools:

* Lightgallery
* GSAP
* Air Datepicker

> *Because these tools work on refreshed page content, although the main code is loaded just the once, their initialisation code is incorporated into modules that re-initialise after a page refresh (Fetch API call).*

Any code that acts on the main navigation bar, page loader, etc. (so outside of the `<main>` element) is also just loaded once on intial page load:

* script.js