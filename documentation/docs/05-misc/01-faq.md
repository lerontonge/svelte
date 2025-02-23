---
title: Frequently asked questions
---

## I'm new to Svelte. Where should I start?

We think the best way to get started is playing through the interactive [tutorial](/tutorial). Each step there is mainly focused on one specific aspect and is easy to follow. You'll be editing and running real Svelte components right in your browser.

Five to ten minutes should be enough to get you up and running. An hour and a half should get you through the entire tutorial.

## Where can I get support?

If your question is about certain syntax, the [API page](https://svelte.dev/docs) is a good place to start.

Stack Overflow is a popular forum to ask code-level questions or if you’re stuck with a specific error. Read through the existing questions tagged with [Svelte](https://stackoverflow.com/questions/tagged/svelte+or+svelte-3) or [ask your own](https://stackoverflow.com/questions/ask?tags=svelte)!

There are online forums and chats which are a great place for discussion about best practices, application architecture or just to get to know fellow Svelte users. [Our Discord](https://svelte.dev/chat) or [the Reddit channel](https://www.reddit.com/r/sveltejs/) are examples of that. If you have an answerable code-level question, Stack Overflow is usually a better fit.

## Are there any third-party resources?

Svelte Society maintains a [list of books and videos](https://sveltesociety.dev/resources).

## How can I get VS Code to syntax-highlight my .svelte files?

There is an [official VS Code extension for Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Is there a tool to automatically format my .svelte files?

You can use prettier with the [prettier-plugin-svelte](https://www.npmjs.com/package/prettier-plugin-svelte) plugin.

## How do I document my components?

In editors which use the Svelte Language Server you can document Components, functions and exports using specially formatted comments.

````svelte
<script>
	/** What should we call the user? */
	export let name = 'world';
</script>

<!--
@component
Here's some documentation for this component.
It will show up on hover.

- You can use markdown here.
- You can also use code blocks here.
- Usage:
  ```tsx
  <main name="Arethra">
  ```
-->
<main>
	<h1>
		Hello, {name}
	</h1>
</main>
````

Note: The `@component` is necessary in the HTML comment which describes your component.

## What about TypeScript support?

You need to install a preprocessor such as [svelte-preprocess](https://github.com/sveltejs/svelte-preprocess). You can run type checking from the command line with [svelte-check](https://www.npmjs.com/package/svelte-check).

To declare the type of a reactive variable in a Svelte template, you should use the following syntax:

```ts
const count: number = 100;

// ---cut---
let x: number;
$: x = count + 1;
```

To import a type or interface make sure to use [TypeScript's `type` modifier](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export):

```ts
// @filename: SomeFile.ts
export interface SomeInterface {
	foo: string;
}

// @filename: index.ts
// ---cut---
import type { SomeInterface } from './SomeFile';
```

You must use the `type` modifier because `svelte-preprocess` doesn't know whether an import is a type or a value — it only transpiles one file at a time without knowledge of the other files and therefore can't safely erase imports which only contain types without this modifier present.

## Does Svelte scale?

There will be a blog post about this eventually, but in the meantime, check out [this issue](https://github.com/sveltejs/svelte/issues/2546).

## Is there a UI component library?

There are several UI component libraries as well as standalone components. Find them under the [components section](https://sveltesociety.dev/components) of the Svelte Society website.

## How do I test Svelte apps?

How your application is structured and where logic is defined will determine the best way to ensure it is properly tested. It is important to note that not all logic belongs within a component - this includes concerns such as data transformation, cross-component state management, and logging, among others. Remember that the Svelte library has its own test suite, so you do not need to write tests to validate implementation details provided by Svelte.

A Svelte application will typically have three different types of tests: Unit, Component, and End-to-End (E2E).

_Unit Tests_: Focus on testing business logic in isolation. Often this is validating individual functions and edge cases. By minimizing the surface area of these tests they can be kept lean and fast, and by extracting as much logic as possible from your Svelte components more of your application can be covered using them. When creating a new SvelteKit project, you will be asked whether you would like to setup [Vitest](https://vitest.dev/) for unit testing. There are a number of other test runners that could be used as well.

_Component Tests_: Validating that a Svelte component mounts and interacts as expected throughout its lifecycle requires a tool that provides a Document Object Model (DOM). Components can be compiled (since Svelte is a compiler and not a normal library) and mounted to allow asserting against element structure, listeners, state, and all the other capabilities provided by a Svelte component. Tools for component testing range from an in-memory implementation like jsdom paired with a test runner like [Vitest](https://vitest.dev/) to solutions that leverage an actual browser to provide a visual testing capability such as [Playwright](https://playwright.dev/docs/test-components) or [Cypress](https://www.cypress.io/).

_End-to-End Tests_: To ensure your users are able to interact with your application it is necessary to test it as a whole in a manner as close to production as possible. This is done by writing end-to-end (E2E) tests which load and interact with a deployed version of your application in order to simulate how the user will interact with your application. When creating a new SvelteKit project, you will be asked whether you would like to setup [Playwright](https://playwright.dev/) for end-to-end testing. There are many other E2E test libraries available for use as well.

Some resources for getting started with testing:

- [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/example/)
- [Svelte Component Testing in Cypress](https://docs.cypress.io/guides/component-testing/svelte/overview)
- [Example using vitest](https://github.com/vitest-dev/vitest/tree/main/examples/svelte)
- [Example using uvu test runner with JSDOM](https://github.com/lukeed/uvu/tree/master/examples/svelte)
- [Test Svelte components using Vitest & Playwright](https://davipon.hashnode.dev/test-svelte-component-using-vitest-playwright)
- [Component testing with WebdriverIO](https://webdriver.io/docs/component-testing/svelte)

## Is there a router?

The official routing library is [SvelteKit](https://kit.svelte.dev/). SvelteKit provides a filesystem router, server-side rendering (SSR), and hot module reloading (HMR) in one easy-to-use package. It shares similarities with Next.js for React.

However, you can use any router library. A lot of people use [page.js](https://github.com/visionmedia/page.js). There's also [navaid](https://github.com/lukeed/navaid), which is very similar. And [universal-router](https://github.com/kriasoft/universal-router), which is isomorphic with child routes, but without built-in history support.

If you prefer a declarative HTML approach, there's the isomorphic [svelte-routing](https://github.com/EmilTholin/svelte-routing) library and a fork of it called [svelte-navigator](https://github.com/mefechoel/svelte-navigator) containing some additional functionality.

If you need hash-based routing on the client side, check out [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router) or [abstract-state-router](https://github.com/TehShrike/abstract-state-router/).

[Routify](https://routify.dev) is another filesystem-based router, similar to SvelteKit's router. Version 3 supports Svelte's native SSR.

You can see a [community-maintained list of routers on sveltesociety.dev](https://sveltesociety.dev/components#routers).

## Is Svelte v2 still available?

New features aren't being added to it, and bugs will probably only be fixed if they are extremely nasty or present some sort of security vulnerability.

The documentation is still available [here](https://v2.svelte.dev/guide).

## How do I do hot module reloading?

We recommend using [SvelteKit](https://kit.svelte.dev/), which supports HMR out of the box and is built on top of [Vite](https://vitejs.dev/) and [svelte-hmr](https://github.com/sveltejs/svelte-hmr). There are also community plugins for [rollup](https://github.com/rixo/rollup-plugin-svelte-hot) and [webpack](https://github.com/sveltejs/svelte-loader).
