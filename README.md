# Building an UI Component-Library with Vue, Tailwind and Storybook

Talk at VueConf.us 2021 by Anton Reindl

## About

In our talk we present why it's a good idea to distill user interface components from your project into your component library. With the modern tools available, it's easier than ever.

## Contents

1. [Slides](): our introductory presentation about building your own UI Component-Library with Vue, Tailwind and Storybook.

2. Code Examples:

   a) [rollup.config.js](): We altered the original [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup) config to also bundle up SCSS files and only export ES modules.

   b) [tailwind.config.js](): In your consuming project / product you can import the tailwind.config.js from your library and extend it to your needs. This file is just an exanmple. It's show how easy to can extend your library on your project.

   c) [app.scss](): In your consuming project / product you can import the libary.scss from your library and extend it to your needs. This file is just an example.

## Next Steps

- We will continue to develop our own component library further. We might create a monorepo to seperate Storybook to simplify dependencies (Post CSS 8 issue)
- Switch to Tailwind's new Just-in-time compiler
- We will pubslish an article on Dev.to which goes to more detail and provide boilerplate repository

## Acknowledgement

Thanks to my collegues [Mindfuel](htttps://mindfuel.ai) and especially [David Brehm](https://github.com/David-Brehm) for their help on this topic.

Big thanks to [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup) built by [mgdodge](https://github.com/mgdodge) which offers a tremendous help in quick-starting library development with Vue and the awesome people at [Tailwind Labs](https://tailwindcss.com) for creating a great utility-first framework.
