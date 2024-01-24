## Getting Started

Here is a list of documentation to help you get started:

- [React](https://react.dev/reference/react) - Library for building user interfaces
- [Next.js](https://nextjs.org/docs) - Framework for routing and server-side rendering
- [Next-intl](https://next-intl-docs.vercel.app/) - Internationalization library
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling library
- [Class Variance Authority](https://beta.cva.style/) - Tool for creating style variants in our UI components
- [Shadcn/ui](https://ui.shadcn.com/docs) - Reusable UI components
  - [Radix UI Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) - Primitives library that Shadcn/ui is built on, great documentation if you need to access the underlying components
- [Lucide](https://lucide.dev/icons/) - Icons library

### Other resources

- [Mozilla](https://developer.mozilla.org/en-US/) - Great resource for looking up documentation for web technologies
- [Can I use](https://caniuse.com/) - Check browser support for different web technologies (especially useful for CSS)

## Icons

- When using custom icons that are not provided by lucide, make sure to add them as SVGs to the `components/assets/icons` folder. This improves performance since the icons are handled as vectors and not as images.

## Quirks to keep in mind

- When you want to link to a new internal page use the `<Link>` component from `@/lib/navigation` instead of the normal anchortag `<a>`. This will ensure that the page is loaded with the correct locale. If you want to link to external resources or other media, use the built-in `<Link>` component from Next.js. Remember to add `prefetch={false}` to the `<Link>` component if the page is not visited often.
  - If you need to use both `<Link>` components from `@/lib/navigation` and Next.js, make sure to import the Next.js `<Link>` component as `ExternalLink` to avoid naming conflicts.
- Remember to surround Links with the `Button` ui component. This will provide some basic styling and accessibility features for keyboard navigation even if it is not supposed to look like a button.
- For interationalization use the `useTranslations` hook from `next-intl`. For client components you can pass the translations as props.

## Development setup

Make sure you have Bun installed on your machine. If you don't have it, you can download it [here](https://bun.sh/docs/installation).

If you can't install Bun, you can always use [Node.js](https://nodejs.org/en/) with the `npm` command instead, but it will not be as fast as Bun.

First, install dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Commit messages

We are using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages. This is to ensure that we have a consistent way of writing commit messages to make it easier to understand what has been changed and why. Try to follow the guidelines as closely as possible. You can also use [the recommended vscode extension](.vscode/extensions.json) to help you write the commit messages.

## Code quality

- To keep the code as consistent as possible use functions for react components or hooks instead of const variables with arrow function syntax. An exception is when using the forwardRef hook or when creating compound components.
- Only use default export for pages or layouts etc. since it is required by Next.js. For everything else use named exports. This is to make it easier to find the components in the codebase or change them without ending up with different names for the same component.
- Use `type` instead of `interface` for typescript types. This is to keep the code consistent and to make it easier to read. Aldso `type` is more flexible than `interface` since it can be used for unions and intersections.
