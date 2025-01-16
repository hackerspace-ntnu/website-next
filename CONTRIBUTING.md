# Contributing

## Getting Started

### Development setup

Make sure you have Bun installed on your machine. If you don't have it, you can download it [here](https://bun.sh/docs/installation). Here is some information about Bun in Next.js: [Build an app with Next.js and Bun](https://bun.sh/guides/ecosystem/nextjs).

#### Dependencies

First, install dependencies:

```bash
bun install
```

> [!NOTE]
> When you merge with the `dev` branch you may need to rerun `bun install` in case there are new dependencies added by other contributors.

#### Environment variables

Then you need to setup environment variables by creating a `.env` file in the root of the project.
Fill the `.env` file with all variables from the `.env.example` file. You can supply an empty string as the value for variables that you do not need to set for the things you are using.
For example, if you are not working on Feide, you do not need to set the FEIDE_CLIENT_ID, FEIDE_CLIENT_SECRET, etc...

When finished setting the file up it should be on this form:

```bash
NODE_ENV="development"
NODE_OPTIONS="--max_old_space_size=16384"
NEXT_TELEMETRY_DISABLED="true"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="user"
# and so on...
```

If you have not defined an environment variable you will get an error on this form when you start the dev server:

```bash
❌ Invalid environment variables: { DB_PORT: [ 'Required' ] }
```

Here I had forgotten to set the DB_PORT variable.

> [!NOTE]
> When you merge with the `dev` branch you may need to update the `.env` file in case there are new environment variables added or modified by other contributors.

#### Docker

Next we are gonna setup the database and storage server to run locally. To achieve this we need to install Docker.

- To install Docker on Linux you can follow the guide [here](https://docs.docker.com/engine/install/) based on your distribution.
- For windows you can install Docker Desktop from [here](https://docs.docker.com/desktop/setup/install/windows-install/). I do not recommend using Docker Desktop as it is very heavy and slow to run + it has a non-commercial license. If you are using windows and know of a better solution please update this guide.
- For MacOS you can use [Colima](https://github.com/abiosoft/colima) as a Docker runtime. Just install it using [homebrew](https://brew.sh). You can also use Docker Desktop [here](https://docs.docker.com/desktop/setup/install/mac-install/) if you prefer, but that is not recommended.

    ```bash
    # MacOS only
    brew install colima docker
    # Start colima
    colima start
    ```

Then we need to install Docker Compose.

- For Linux follow the plugin guide for your distro [here](https://docs.docker.com/compose/install/linux/).
- For Windows I have no idea, please update this guide.
- For MacOS you can install Docker Compose using homebrew.

    ```bash
    # MacOS only
    brew install docker-compose
    ```

#### Database and storage server

When you have installed Docker and Docker Compose you can start the database and storage server by running:

```bash
bun run dev:setup
```

Now this command is a fancy all in one command that restarts and resets both the database and storage server pushes any new migrations and seeds the database. If you prefer to use the individual commands they will be outlined below.

You can stop both with:

```bash
bun run dev:stop
```

> [!TIP]
> In the future we may add a way to SSH tunnel and use the database and storage server for the staging solution locally. This is only beneficial if you are only working on the frontend and do not need to modify the database.

Now for a more indept guide on all the scripts for the database and storage server. First the basics that they both have in common. Now remember that you in theory only need the fancy command above if you are not doing any debugging. It just runs these other scripts for you under the hood.

To start the database and storage server you can run:

```bash
bun run db:start
# or
bun run s3:start
```

To stop the database and storage server you can run:

```bash
bun run db:stop
# or
bun run s3:stop
```

To delete all the data for the database and storage server you can run:

```bash
bun run db:delete
# or
bun run s3:delete
```

To print the logs continuely from the database and storage server you can run:

```bash
bun run db:logs
# or
bun run s3:logs
```

For migrations we have multiple commands to help us. First to quickly create migrations based on a change you have made to the tables (and not store it) and apply it to the running database you can run:

```bash
bun run db:push
```

This is the command `dev:setup` uses under the hood to push the migrations to the database.

If you have finished making changes to the database and want to create and store the migration you can run:

```bash
bun run db:generate
```

This will generate new migrations into the `@/server/db/migrations` directory.

If you want to run the generated migrations on your database you can run:

```bash
bun run db:migrate
```

We also have a command that seeds the database (fills it up with mock data). This command runs the `@/server/db/seed.ts` file, which needs to be updated when we need data to be available in the database. You can run it with:

```bash
bun run db:seed
```

Lastly we have a very useful command that starts an interactive web server where you can look at the database and run queries on it. This is very useful for debugging and testing. You can use it with:

```bash
bun run db:studio
```

This lets you access the database locally on: <https://local.drizzle.studio>

If you want to access the storage server locally in a web browser you can always access it on: <http://localhost:9001> when it is running. The password and username is what you have defined in the `.env` file.

#### Development server

Then you can run the development server and see the website:

```bash
bun dev --turbo
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

When you build the project, you pre-render all the Server Side Generated (SSG) pages. This makes the site load faster and perform better and behave like it will when it is deployed. When serving the built project it will not hot reload when you make changes to the code like it does in development mode.

You can build the project with the following command:

```bash
bun run build
```

To serve the build locally, run:

```bash
bun run start
```

### Check linting and formatting

To check linting and formatting you run the respective command:

```bash
bun lint
```

## Commit messages

We are using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages. This is to ensure that we have a consistent way of writing commit messages to make it easier to understand what has been changed and why. Try to follow the guidelines as closely as possible. You can also use [the recommended vscode extension](.vscode/extensions.json) to help you write the commit messages.

## Code quality

- To keep the code as consistent as possible use functions for react components or hooks instead of const variables with arrow function syntax. An exception is when using the forwardRef hook or when creating compound components.
- Only use default export for pages or layouts etc. since it is required by Next.js. For everything else use named exports. This is to make it easier to find the components in the codebase or change them without ending up with different names for the same component.
- Use `type` instead of `interface` for typescript types. This is to keep the code consistent and to make it easier to read. Also `type` is more flexible than `interface` since it can be used for unions and intersections.
- When using custom icons that are not provided by lucide, make sure to add them as React Components (SVGs) to the `components/assets/icons` directory. This improves performance since the icons are handled as vectors and not as images.
- For internationalization use the `useTranslations` and `getTranslations` (for async components) hooks from `next-intl`.
  - For client components pass the translations as props using the `t` prop for consistency.
  - On the backend when returning error messages, you can just return the key to the translation as the error message and it will be formatted correctly.
  - In the backend context (ctx) the locale is stored in `ctx.locale` and translations can be accessed using `ctx.getTranslations()`.

### Naming conventions

- All layout components should end with Layout. For example: `DefaultLayout`.
- All page components should end with Page to make it clear it is a whole page. For example: `AboutPage`.

## Useful resources

Here is a list of documentations that will help you contribute to the project:

### Front-end

- [React](https://react.dev/reference/react) - Library for building user interfaces
- [Next.js](https://nextjs.org/docs) - Framework for routing and server-side rendering
- [Next-intl](https://next-intl-docs.vercel.app/) - Internationalization library
- [nuqs](https://nuqs.47ng.com/docs/installation) - Easy to use query params
- [Plate](https://platejs.org) - Tool for rich text editing
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/overview) - TRPC wraps Tanstack Query which is how we fetch data from the backend
- [Tanstack Table](https://tanstack.com/table/latest/docs/introduction) - For dynamic tables with filtering, sorting, pagination etc
- [Tanstack Form](https://tanstack.com/form/latest/docs/overview) - When we need to handle form validation

#### Styling

- [Tailwind CSS](https://tailwindcss.com/docs) - Styling library
  - [Fluid for Tailwind](https://fluid.tw/#basic-usage) - Fluid scale utility breakpoints
  - [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) - Animation utility classes
- [Class Variance Authority](https://beta.cva.style/) - Tool for creating style variants in our UI components
- [shadcn/ui](https://ui.shadcn.com/docs) - Reusable UI components
  - [Radix UI Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) - Primitives library that shadcn/ui is built on, great documentation if you need to access the underlying components
- [Aceternity/ui](https://ui.aceternity.com/components) - More fancy components that can be used (matches shadcn/ui)
- [tsparticles](https://github.com/tsparticles/react) - Cool particles library we can use as backgrounds
- [Lucide](https://lucide.dev/icons/) - Icons library

### Back-end

- [TRPC](https://trpc.io/docs) - Tool for creating API endpoints as functions
- [Lucia](https://lucia-auth.com) - Authentication library
- [Drizzle](https://orm.drizzle.team/docs/overview) - ORM for interacting with the database (Postgres under the hood)
- [s3-client](https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-s3) - AWS S3 client for uploading files

### Infrastructure

- [Docker](https://docs.docker.com/get-started/) - Containerization tool for the application, database and storage
- [Docker Compose](https://docs.docker.com/compose/) - Tool for running multi-container applications
- [Colima](https://github.com/abiosoft/colima) - Container runtime for docker, I recommend this over Docker Desktop because of performance and license
- [nginx](https://nginx.org/en/docs/) - Reverse proxy for routing requests to the correct service

### Other

- [Mozilla](https://developer.mozilla.org/en-US/) - Great resource for looking up documentation for web technologies
- [Can I use](https://caniuse.com/) - Check browser support for different web technologies (especially useful for CSS)

## Development Environment

### VS Code

#### Recommended Extensions

- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)

#### Issues

- If you are experiencing issues with types, you can restart the typescript server by pressing `cmd + shift + p` and then type `TypeScript: Restart TS Server` (You need to have a typescript file open for this to work).
- You can also try restarting the whole editor by pressing `cmd + shift + p` and then type `Developer: Reload Window`.

On windows you can use `ctrl` instead of `cmd`.

## GitHub

- For branch names, use kebab-case (e.g. about-us-page)
