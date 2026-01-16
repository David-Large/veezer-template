// From: https://www.11ty.dev/docs/data-js/#example-exposing-environment-variables

/* This function exposes templates to the Environment Variable (ELEVENTY_ENV) set elsewhere. If none is set then
this defaults to 'development'. Note that I have set the variable to 'production' in the production branch
in the Cloudcannon configuration area (Build Options -> Command Line Options --> Environment Variables).

When running locally can set the variable in the Eleventy run command. For VS Code it would be:

$env:ELEVENTY_ENV="production"; npx @11ty/eleventy --serve

If leave the variable out of the run command (so just npx @11ty/eleventy --serve), it will default
to running 'development' version. */

module.exports = function() {
  return {
    environment: process.env.ELEVENTY_ENV || "development"
  };
};