---
_schema: default
title: GSAP Animations - Optimisation
tags: documentation
permalink: /documentation/javascript/gsap-animations-optimisation/
url: /documentation/javascript/gsap-animations-optimisation/
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
&nbsp;

---

**WARNING: If you haven't already seen it, the more important page to look over is** [**GSAP Animations**](/documentation/javascript/gsap-animations/)**. The information below is basically an AI stream of consciousness and should only be read if you are really, really interested or have nothing better to do :)**

---

### Starting Opacity

I wanted to know if I should avoid using an opacity of 0 for elements that should be animated-in. This leads into the question of using the GSAP `autoAlpha` property which uses `visibility: hidden` and then animates in from `opacity: 0`

> ***Using GSAP should I animate opacity from say 0.01 to 1 instead of 0 to 1 for best SEO?***

&nbsp;

#### AI (Gemini) result \#1:

No, animating from `opacity: 0.01` to `1` instead of `0` to `1` is **unnecessary for SEO** and could potentially have minor performance or accessibility side effects.

**Key Considerations**

* **SEO:** Google treats content with `opacity: 0` as present on the page, so using `0` has no negative SEO impact on ranking.
* **Performance & LCP:** Animating from `opacity: 0` is performant as it only affects compositing and doesn't trigger layout recalculations. However, elements with `opacity: 0` are not considered as candidates for the Largest Contentful Paint (LCP) metric until their opacity becomes greater than 0. This is generally a good thing, ensuring the actual visible content is measured for LCP.
* **Accessibility:** Content with `opacity: 0` is still in the DOM and readable by screen readers, which is important for accessibility. Animating from `0.01` would not change this.
* **GSAP Best Practice (`autoAlpha`):** For the best results, GSAP offers a special property called `autoAlpha` that intelligently handles both `opacity` and `visibility`.
  * It animates `opacity` as requested.
  * When the opacity reaches `0`, it automatically sets `visibility` to `hidden` to improve rendering performance and prevent user interaction (like clicks or keyboard tabbing) on the invisible element.
  * When animating from `0` to `1`, it sets `visibility` to `visible` at the start.

**Recommendation**

Use the GSAP `autoAlpha` property for all your fade animations:

**javascript**

```
// Fade in from transparent to fully visible
gsap.from("#myElement", { duration: 1, autoAlpha: 0 });

// or fade out
gsap.to("#myElement", { duration: 1, autoAlpha: 0 });
```

This provides optimal performance, handles accessibility concerns appropriately, and is completely fine for SEO.

&nbsp;

#### AI (Gemini) result \#2:

No, changing the starting opacity from `0` to `0.01` will not significantly improve your SEO, and animating from `opacity: 0` to `1` is generally fine. The primary SEO concern with hidden elements relates to essential content (like H1 tags or main keywords) being hidden from users and search engines on initial page load, not the specific starting value of the opacity during a transition.

**Key SEO Considerations for Animations**

* **Content Accessibility:** Google can render JavaScript and CSS, so it can see content that fades in with animation. The main issue arises if the content is hidden using `display: none` or `visibility: hidden` in the initial HTML/CSS, and only revealed by user interaction, making it potentially less valuable to search engines than immediately visible content.
* **Performance (Core Web Vitals):** The most significant SEO impact of animations comes from their effect on page performance metrics, specifically Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).
  * **LCP:** Elements with an `opacity: 0` are not considered LCP candidates by the browser. If your primary content (e.g., a main heading or hero image) starts at `opacity: 0` and then fades in, the browser might delay the LCP measurement until the element becomes visible (or later when another event triggers a repaint, such as a web font loading), potentially hurting your page speed score.
  * **Fixing LCP Delays:** Using a non-zero starting opacity like `0.01` or `0.1` *can* make the element an LCP candidate from the start, potentially resulting in a better LCP score if the animation is fast.
* **User Experience (UX):** Animations should enhance UX, not detract from it. Overly long or complex animations can annoy users, increase bounce rates, and negatively impact your rankings.
* **Use GSAP's `autoAlpha`:** A useful tool in the GSAP library is `autoAlpha`. This property is designed for smooth transitions by automatically switching the `visibility` to `hidden` when opacity reaches 0 (or vice versa), which is more performant than just animating opacity alone, without triggering the SEO issues associated with `display: none`.

**Summary**

For SEO, focus on ensuring your main content is available and accessible in the initial HTML load. Animating opacity, whether from 0 or 0.01, is generally acceptable. The choice of `0.01` is a technical tweak to potentially optimize Core Web Vitals performance, not to "trick" search engines into seeing hidden content.

You can test how Google sees your page using the Google PageSpeed Insights or the "Fetch as Googlebot" (now part of the URL Inspection tool in Google Search Console) tools.

&nbsp;

#### AI (Gemini) result \#3 - more about LCP effects:

Using `autoAlpha` with a starting value of `0` generally **helps** with LCP (Largest Contentful Paint) by preventing the element from being considered an LCP candidate initially, but this only works correctly if the element is **not** defined as an LCP element in the first place. Animating an element from `opacity: 0.01` to `1` may cause LCP issues.

**autoAlpha vs. opacity for LCP**

<table><tbody><tr><th><p><strong>Feature</strong></p></th><th><p><strong><code>autoAlpha</code></strong></p></th><th><p><strong><code>opacity: 0.01</code> to <code>1</code></strong></p></th></tr><tr><td><p><strong>Initial State</strong></p></td><td><p>Sets <code>opacity</code> to <code>0</code> and <code>visibility</code> to <code>hidden</code>.</p></td><td><p>Sets <code>opacity</code> to a non-zero value, so the browser treats the element as visible from the start.</p></td></tr><tr><td><p><strong>LCP Behavior</strong></p></td><td><p>Elements with <code>visibility: hidden</code> are <strong>ignored</strong> by the LCP algorithm, even if their <code>opacity</code> is animated later. This is a good thing if the element should not count towards LCP.</p></td><td><p>A non-zero opacity (like <code>0.01</code>) forces the browser to consider the element a valid LCP candidate on its initial render. The browser has to process and render the image data immediately, which can potentially delay LCP if the image is large.</p></td></tr><tr><td><p><strong>Performance</strong></p></td><td><p>Toggles <code>visibility</code> which can improve browser rendering performance when the element is hidden (prevents unnecessary drawing and click events).</p></td><td><p>The element remains "visible" to the browser even when nearly transparent, so it still occupies resources for rendering and can capture mouse events.</p></td></tr><tr><td><p><strong>Best Use Case</strong></p></td><td><p>Recommended by GSAP for fading in/out to properly hide elements and prevent a "flash of unstyled content" (FOUC) if CSS isn't applied before JavaScript runs.</p></td><td><p>Generally used for specific scenarios where the element absolutely must be treated as "visible" for LCP calculations or a specific visual effect.</p></td></tr></tbody></table>

**Recommendations**

* **For LCP elements (e.g., hero image, main heading):** It is best to avoid animating these from an initial state of `opacity: 0` (or `autoAlpha: 0`) if you want them to be measured quickly. The element should be visible and ready on page load without animation to achieve a good LCP score.
* **For non-LCP elements:** Use `autoAlpha` for standard fade-ins and fade-outs. It is more robust than just `opacity` because it manages the `visibility` property effectively, improving rendering performance and user interaction issues (like transparent, but still clickable, elements).
* To prevent a FOUC when using GSAP, set the initial `visibility: hidden;` in your CSS and use GSAP's `autoAlpha: 1` to fade it in.

&nbsp;

### More on LCP

**AI (Gemini) result:**

Using `visibility: hidden` on elements that are meant to be the main content and then animating them in with GSAP **will negatively affect your Largest Contentful Paint (LCP)**.

The LCP metric measures when the largest *visible* element in the viewport is rendered. By initially hiding the main content, the browser cannot register the LCP until your JavaScript runs and makes the element visible. This delays the time the browser perceives the page as visually ready, thus resulting in a poor LCP score.

**Why this approach hurts LCP:**

* **Delayed Visibility**: Content with `visibility: hidden` is ignored by the LCP algorithm because it is not considered "visually ready" to the user.
* **JavaScript Dependency**: The LCP is blocked until the GSAP animation script loads, executes, and changes the visibility (or `autoAlpha`) property. Any delay in the script will delay the LCP.
* **SEO Impact**: Hiding significant page content initially can also impact SEO, as search engines might think the main content isn't immediately available.

**Recommended Solutions:**

* **Avoid Hiding LCP Elements**: The primary solution is to ensure your LCP element (e.g., hero image, main headline) is visible and in its final position in the initial HTML and CSS, without needing an entry animation that hides it first.
* **Animate Less Critical Elements**: If you must use animations, apply them to less critical elements, or ensure they don't block the rendering of the primary content.
* **Use `autoAlpha` Strategically**: If you need to prevent a Flash of Unstyled Content (FOUC), you can use GSAP's `autoAlpha` property. This is identical to `opacity` but automatically sets `visibility: hidden` when the opacity is 0 and `visibility: inherit` (making it visible) when the opacity is greater than 0. However, this still requires the JavaScript to run to trigger the visibility change.
* **Placeholder Content**: Use a fast-loading placeholder (like a solid color block) in place of the element that will be animated in, to ensure there is *something* visible for an early LCP measurement.
* **Trigger on User Interaction**: Consider starting the animation on a user interaction rather than automatically on page load to separate the LCP metric from the animation timing.

Ultimately, the best practice for good LCP is to make your most important content available and visible from the very first paint.

&nbsp;

### Setting Initial Transform Cordinates for GSAP Animations

*From:* <a href="https://gsap.com/community/forums/topic/22921-set-initial-transform-coordinates-in-css-or-set-using-gsap/" target="_blank" rel="noopener"><em>https://gsap.com/community/forums/topic/22921-set-initial-transform-coordinates-in-css-or-set-using-gsap/</em></a>

**QUESTION:**

So pretty simple question. I'm observing some elements and fading/sliding them in as that part of the page is intersected. Is it more performant/better practice on page load to:

Set elements in CSS with a transform value e.g `transform: translateY(100px)` and then animate to `y:0` with GSAP

...or...

Set elements with `gsap.set(element, {y:100})` and then animate to `y:0`

From what I understand any change to the DOM results in a repaint and it seems to me that setting with gsap would cause such a change whereas if the initial values of the elements are already set as in (a) then that won't happen.

**ANSWER:**

It is better practice on page load to set elements with `gsap.set(element, {y:100})` and then animate to `y:0`, no question. This is because we highly recommend that all transforms on elements that are animated with GSAP be set with GSAP as well so that GSAP has access to all the related information for that element. Let me explain why:

If you have an element that is 1,000px tall and you set `transform: translateY(10%)` on the element, it would be 100px down (like your example). However, the browser would report this value as 100px, not 10%! So GSAP would have no knowledge that you are using percents. This mismatch could cause issues depending on how you're wanting to animate the element. If you do `gsap.set(element, {yPercent: 10})` then GSAP will have all the correct information about the position of that element.

Repainting is generally not an issue. Causing the layout to update/reflow is generally the larger issue. If you just use transforms, your element won't cause a reflow. Using other properties, like if you were using top in this case, would cause reflow. So you don't have anything to worry about in terms of performance. Even if you were using a property that caused reflow, just causing it once on page load generally isn't an issue performance wise. There's lots of reflow that happens as the page is getting set up.