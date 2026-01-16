/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FILE: non-fetch.js

DESCRIPTION: Used when not wanting to use Fetch API to load content. This file just
initialises all the modules normally (once on page initial page load).
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/



import {
  initModules
} from './init-modules.js';



/* The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed,
without waiting for stylesheets, images, and subframes to finish loading. */
document.addEventListener('DOMContentLoaded', () => {

  initModules();

  if (window.location.pathname.startsWith('/documentation')) {
	  document.body.classList.add('documentation-wrapper');
  } else {
	  document.body.classList.remove('documentation-wrapper');
  }
  
});