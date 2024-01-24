## Getting Started

Here is a list of documentation to help you get started:

- [Next.js](https://nextjs.org/docs) - Framework for routing and server-side rendering
- [React](https://react.dev/reference/react) - Library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling library
- [Shadcn/ui](https://ui.shadcn.com/docs) - Reusable UI components
- [Lucide](https://lucide.dev/icons/) - Icons library
- [Next-intl](https://next-intl-docs.vercel.app/) - Internationalization library

## Icons

- When using custom icons that are not provided by lucide, make sure to add them as SVGs to the `components/assets/icons` folder. This improves performance since the icons are handled as vectors and not as images.

## Quirks to keep in mind

- When you want to link to a new internal page use the `<Link>` component from `@/lib/navigation` instead of the normal anchortag `<a>`. This will ensure that the page is loaded with the correct locale. If you want to link to external resources or other media, use the built-in `<Link>` component from Next.js. Remember to add `prefetch={false}` to the `<Link>` component if the page is not visited often.
- Remember to surround Links with the `Button` ui component. This will provide some basic styling and accessibility features for keyboard navigation even if it is not supposed to look like a button.

## Development setup

Make sure you have Bun installed on your machine. If you don't have it, you can download it [here](https://bun.sh/docs/installation).

First, install dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

When you build the project, you prerender all the Server Side Generated (SSG) pages. This makes the site load faster and perform better and behave like it will when it is deployed. When serving the built project it will not hot reload when you make changes to the code like it does in development mode.

You can build the project with the following command:

```bash
bun run build
```

Then to serve the build locally, run:

```bash
bun run start
```

## Check linting, formatting and types

To check linting, formatting or types you run the respective command:

Linting:

```bash
bun run lint
```

Formatting:

```bash
bun run format
```

Types:

```bash
bun run type
```

If you are using vscode and are experiencing issues with types, you can restart the typescript server by pressing `cmd + shift + p` and then type `TypeScript: Restart TS Server` (You need to have a typescript file open for this to work).

You can also try restarting the whole editor by pressing `cmd + shift + p` and then type `Developer: Reload Window`.

On windows you can use `ctrl` instead of `cmd`.

## Commit messages

We are using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages. This is to ensure that we have a consistent way of writing commit messages and to make it easier to generate changelogs. Try to follow the guidelines as closely as possible.

## Code quality

- In react we want to use functions instead of const variables with arrow function syntax to keep the code as consistant as possible. An exception is when using the forwardRef hook, then we need to use the arrow function syntax.
- Only use default export for pages or layouts etc. For components we want to use named exports. This is to make it easier to find the components in the codebase.
