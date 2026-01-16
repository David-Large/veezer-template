---
_schema: default
title: CSS, Setting a Theme
tags: documentation
permalink: /documentation/style-and-theme/css-setting-a-theme/
url: /documentation/style-and-theme/css-setting-a-theme/
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
This template uses <a href="https://bulma.io/" target="_blank" rel="noopener"><strong>Bulma</strong></a>. It's a clean and easy to use Flexbox-based framework. It's also Javascript free leaving it up to the developer to interact with it however they want.

### Theming

The data file `_date/theme.json` can be edited with the  CloudCannon Data Editor. At build time this is used to create a `css/variables.scss` file.

The themes consist of font and colour related schemes for various items:

* Primary (body text) and secondary (heading) fonts
* Main navigation bar colours
* Footer  colours
* Preloader (page load indicator) colour
* General colour schemes (non Bookshop component pages)
* Bookshop component colour schemes

#### Selecting Bookshop component themes in the editor

When adding a component with the CloudCannon Visual Editor, a select field allows the choice of a colour scheme to apply to that component:

* Light
* Lighter
* Lightest
* Dark
* Darker
* Darkest
* Alternate 1
* Alternate 2
* Alternate 3

Whatever the scheme chosen, the background, text, heading, button, etc. colours to be applied to that component are preset. This helps to ensure some continuity of colour palette through the site.

During the prebuild phase,  `/js/fetch-theme.js` is run and it parses the editable data file `_data/theme.json` to create `css/variables.scss` (based on the default `css/variables-default.scss` file).