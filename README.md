# Building an UI Component-Library with Vue, Tailwind and Storybook

> Talk at VueConf.us 2021 by Anton Reindl

## About

In our talk we present why it's a good idea to distill user interface components from your project into your component library. With the modern tools available, it's easier than ever.

---

## 🚨 Update in August 2021

A lot of things happened during the last couple of months. We've been working on a new version of our component library, which is actively used in our development and ever-growing. However, one month ago we have completely refactored the library due to the change from PostCSS 7 to 8. As you might know, not all parts of the Vue.js ecosystem are fully compatible with PostCSS 8 and Webpack 4 yet. There is a lot of development going on and we constantly ran into new issues (node-sass, PostCSS-loader,...) and ongoing problems with our dependencies. Yet we needed (and wanted) to use the latest versions of Tailwind v.2.2.

To separate concerns and break up our large repo into a few smaller ones, refactoring was necessary. We ended up with a slightly more exotic structure.

1. We switched to a monorepo powered by [Lerna](https://lerna.js.org/. It contains three core packages:
   a. library - the library itself (a Vue 2 SPA)
   b. build process - creates a production build of the library and the scss file
   c. docs - [Storybook](https://storybook.js.org/)
2. The library is now running on Vite with PostCSS 8 – it's extremely fast and we love it. It supports the latest Tailwind versions.
3. The build process was more or less untouched. It loads the components from the library and creates an SCSS file plus the production build.
4. Docs is also on the latest version of Storybook now and working like a charm. Each component has accompanying story which is loaded from the library package. We also purge the css of Tailwind.

So it is perfectly working for us at the moment. We consume the components in a Nuxt.js-App and keep extending the library weekly.

Are you interested in the new version? Please let us know and [create an issue](https://github.com/areindl/vueconf-build-a-component-library/issues/new) in this repo. We might open source the boilerplate code for you.

---

# Contents

1. [Slides](): our introductory presentation about building your own UI Component-Library with Vue, Tailwind and Storybook.

2. Code Examples:

   a) [rollup.config.js](https://github.com/areindl/vueconf-build-a-component-library/blob/main/examples/rollup.config.js): We altered the original [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup) config to also bundle up SCSS files and only export ES modules.

   b) [tailwind.config.js](https://github.com/areindl/vueconf-build-a-component-library/blob/main/examples/tailwind.config.js): In your consuming project / product you can import the tailwind.config.js from your library and extend it to your needs. This file is just an exanmple. It's show how easy to can extend your library on your project.

   c) [app.scss](https://github.com/areindl/vueconf-build-a-component-library/blob/main/examples/app.scss): In your consuming project / product you can import the libary.scss from your library and extend it to your needs. This file is just an example.

## Next Steps

- ~~We will continue to develop our own component library further. We might create a monorepo to seperate Storybook and to simplify dependencies (Post CSS 8 issue)~~ -> ✅ DONE!
- ~~Switch to Tailwind's new Just-in-time compiler~~ -> ✅ DONE!
- We will pubslish an article on Dev.to which goes to more detail and provide boilerplate repository

## Acknowledgement

Thanks to my collegues at [Mindfuel](htttps://mindfuel.ai) and especially [David Brehm](https://github.com/David-Brehm) for their help on this topic.

Big thanks to [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup) built by [mgdodge](https://github.com/mgdodge) which offers a tremendous help in quick-starting library development with Vue and the awesome people at [Tailwind Labs](https://tailwindcss.com) for creating a great utility-first framework.
