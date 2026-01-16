---
_schema: default
title: GSAP Animations
tags: documentation
permalink: /documentation/javascript/gsap-animations/
url: /documentation/javascript/gsap-animations/
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
Apart from some simple CSS animations, the majority of animations are done with <a href="https://gsap.com/" target="_blank" rel="noopener">GSAP</a> (a javascript animation library). Almost all of them are linked to GSAP ScrollTrigger. They include basic animations like slide up or slide down and generally tied in with a fade-in using opacity (or autoAlpha which is a special GSAP managed merge of visibility and opacity CSS properties). The GSAP ScrollSmoother plugin ias also used, primarily to more easily add smooth parallax effects.

All of the Bookshop components are wrapped in an outer `section` or `div` element (usually with the Bulma class of `.section` but this is not a requirement to set up the animation).

On this outer element, if elements nested within it are to have GSAP applied, a class of `.use-gsap` is added. Any elements that are to be animated inside of the section are given the `.gsap-element-wrapper` class. Then on this class there are data attributes:

* data-gsap-animation-name *(string)*
* data-gsap-delay *(number)*
* data-gsap-duration *(number)*

```
<section class="section use-gsap">
  ...
    <div class="gsap-element-wrapper" data-gsap-animation-name="slide-down-from-top" data-gsap-delay="0.5" data-gsap-duration="0.5">
      ...
    </div>
  ...
</section>
```

By default, any elements that have the `.gsap-element-wrapper` applied start out with either:

1. A very low opacity (0.01 rather than 0) and fade in.
2. An opacity of 0 and autoAlpha (GSAP) is applied.

I found conflicting ideas on what work best for SEO and PageSpeed results. I've elected to go with using the autoAlpha approach (see the Opacity and Transforms section below).

If you are interested in the pros and cons of ways to animate opacity, [here is a compilation of AI generated thoughts on it](/documentation/javascript/gsap-animations-optimisation/).

### Binding animations to the content sections

Within `js/fetch.js`, all of the sections that contain the `.use-gsap` class are iterated over and once all of the images contained within those sections are loaded, the GSAP functions are bound to the `.gsap-element-wrapper` elements.

### Staggered animations

There are a few animations that are best run using the `ScrollTrigger.batch()` method. The Gallery and Flip Card components use this.

```
<section class="gsap-batch-stagger">
  ...
    (the stagger animations are applied to the 'img' elements)
  ...
</section>
```

### The GSAP functions

These can be found in `js/gsap/gsap-functions.js`.

The `initGsap` module (from `js/gsap/init-gsap.js`) binds the `.gsap-element-wrapper` elements to their respective GSAP functions in `js/gsap/gsap.functions.js`.

The `initGsapBatchStagger` module (from `js/gsap/init-gsap-batch-stagger.js`) does the same for the `.gsap-batch-stagger` elements.

### GSAP and Layout Shift

One of the biggest things to consider with GSAP is that it doesn't play well when there is layout shift. One of the biggest problems is when the browser has no idea of the final space an image will occupy prior to it being fully loaded.

GSAP will set things like ScrollTrigger positions when it is first initiated. If this happens before an image(s) is loaded the trigger positions will be in the wrong place - often in much higher vertical positions on the page. On a long page with ScrollTrigger animations set to start as sections are scrolled into the viewport, because of this positioning dicrepancey, the animations have already triggered and run and not seen by the user.

Providing width and height attributes on the images, aspect ratios for containers, etc, avoids this.

### Opacity and Transforms

In early versions of the template, the opacity of the elements to be animated-in was set via the CSS (`opacity: 0.01`).

Also any initial transforms (to get elements to their initial X, Y or scale starting points) were also set via the CSS.

Now, instead of setting opacity directly in the CSS, the elements to be animated-in have `visibility: hidden` in the CSS and in GSAP `autoAlpha: 1` (autoAlpha removes `visibility: hidden` once opacity &gt; 0 and brings opacity up to 1 seamlessly).

There are various pros and cons of this approach including how this affects the LCP (Largest Contentful Paint) performance. [See more discussion on this here](/documentation/javascript/gsap-animations-optimisation/).