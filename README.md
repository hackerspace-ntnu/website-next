## Getting Started

Here is a list of documentation to help you get started:

### Frontend

- [React](https://react.dev/reference/react) - Library for building user interfaces
- [Next.js](https://nextjs.org/docs) - Framework for routing and server-side rendering
- [Next-intl](https://next-intl-docs.vercel.app/) - Internationalization library
- [nuqs](https://nuqs.47ng.com/docs/installation) - Easy to use query params
- [BlockNote](https://www.blocknotejs.org/docs) - Tool for markdown textboxes
- [React Hook Form](https://react-hook-form.com/get-started) - When we need to handle form validation
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/overview) - TRPC wraps Tanstack Query which is how we fetch data from the backend

#### Styling

- [Tailwind CSS](https://tailwindcss.com/docs) - Styling library
  - [Fluid for Tailwind](https://fluid.tw/#basic-usage) - Fluid scale utility breakpoints
  - [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) - Animation utility classes
  - [tailwind-scrollbar](https://github.com/adoxography/tailwind-scrollbar) - Customize scrollbar with tailwind
- [Class Variance Authority](https://beta.cva.style/) - Tool for creating style variants in our UI components
- [shadcn/ui](https://ui.shadcn.com/docs) - Reusable UI components
  - [Radix UI Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) - Primitives library that shadcn/ui is built on, great documentation if you need to access the underlying components
- [Aceternity/ui](https://ui.aceternity.com/components) - More fancy components that can be used (matches shadcn/ui)
- [tsparticles](https://github.com/tsparticles/react) - Cool particles library we can use as backgrounds
- [Lucide](https://lucide.dev/icons/) - Icons library

### Backend

- [TRPC](https://trpc.io/docs) - Tool for creating API endpoints as functions
- [Lucia](https://lucia-auth.com) - Authentication library
- [Drizzle](https://orm.drizzle.team/docs/overview) - ORM for interacting with the database (Postgres under the hood)
- [s3-client](https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-s3) - AWS S3 client for uploading files

### Infrastructure

- [Docker](https://docs.docker.com/get-started/) - Containerization tool for the application, database and storage
- [Colima](https://github.com/abiosoft/colima) - Container runtime for docker, I recommend this over Docker Desktop because of performance and license
- [Docker Compose](https://docs.docker.com/compose/) - Tool for running multi-container applications
- [nginx](https://nginx.org/en/docs/) - Reverse proxy for routing requests to the correct service

### Other resources

- [Mozilla](https://developer.mozilla.org/en-US/) - Great resource for looking up documentation for web technologies
- [Can I use](htt ps://caniuse.com/) - Check browser support for different web technologies (especially useful for CSS)

## Icons

- When using custom icons that are not provided by lucide, make sure to add them as SVGs to the `components/assets/icons` folder. This improves performance since the icons are handled as vectors and not as images.

## Quirks to keep in mind

- When you want to link to a new internal page use the `<Link>` component from `@/lib/navigation` instead of the normal anchortag `<a>`. This will ensure that the page is loaded with the correct locale. If you want to link to external resources or other media, use the built-in `<Link>` component from Next.js. Remember to add `prefetch={false}` to the `<Link>` component if the page is not visited often.
  - If you need to use both `<Link>` components from `@/lib/navigation` and Next.js, make sure to import the Next.js `<Link>` component as `ExternalLink` to avoid naming conflicts.
- Remember to surround Links with the `Button` UI component. This will provide some basic styling and accessibility features for keyboard navigation even if it is not supposed to look like a button.
- For internationalization use the `useTranslations` hook from `next-intl`. For client components you can pass the translations as props.

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

## Build

When you build the project, you pre-render all the Server Side Generated (SSG) pages. This makes the site load faster and perform better and behave like it will when it is deployed. When serving the built project it will not hot reload when you make changes to the code like it does in development mode.

You can build the project with the following command:

```bash
bun run build
```

Then setup environment variables by copying the `.env.example` file to `.env` and fill in the values. `.env` files are used to store sensitive information like API keys and database credentials and it will not be committed to the repository.

To serve the build locally, run:

```bash
bun run start
```

## Check linting and formatting

To check linting and formatting you run the respective command:

```bash
bun lint
```

If you are using vscode and are experiencing issues with types, you can restart the typescript server by pressing `cmd + shift + p` and then type `TypeScript: Restart TS Server` (You need to have a typescript file open for this to work).

You can also try restarting the whole editor by pressing `cmd + shift + p` and then type `Developer: Reload Window`.

On windows you can use `ctrl` instead of `cmd`.

## Commit messages

We are using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages. This is to ensure that we have a consistent way of writing commit messages to make it easier to understand what has been changed and why. Try to follow the guidelines as closely as possible. You can also use [the recommended vscode extension](.vscode/extensions.json) to help you write the commit messages.

## Code quality

- To keep the code as consistent as possible use functions for react components or hooks instead of const variables with arrow function syntax. An exception is when using the forwardRef hook or when creating compound components.
- Only use default export for pages or layouts etc. since it is required by Next.js. For everything else use named exports. This is to make it easier to find the components in the codebase or change them without ending up with different names for the same component.
- Use `type` instead of `interface` for typescript types. This is to keep the code consistent and to make it easier to read. Also `type` is more flexible than `interface` since it can be used for unions and intersections.

### Naming conventions

- All layout components should end with Layout. For example: `DefaultLayout`.
- All page components should end with Page to make it clear it is a whole page. For example: `AboutPage`.
