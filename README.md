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

## Commit messages

We are using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages. This is to ensure that we have a consistent way of writing commit messages and to make it easier to generate changelogs. Try to follow the guidelines as closely as possible.
