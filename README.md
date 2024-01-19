## Getting Started

Here is a list of documentation to help you get started:

- [Next.js](https://nextjs.org/docs) - Framework for routing and server-side rendering
- [React](https://react.dev/reference/react) - Library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling library
- [Shadcn/ui](https://ui.shadcn.com/docs) - Reusable UI components
- [Lucide](https://lucide.dev/icons/) - Icons library
- [Next-intl](https://next-intl-docs.vercel.app/) - Internationalization library

## Quirks to keep in mind

- When you want to link to a new internal page use the `<Link>` component from `@/lib/navigation` instead of the normal anchortag `<a>`. This will ensure that the page is loaded with the correct locale. If you want to link to external resources or other media, use the built-in `<Link>` component from Next.js. Remember to add `prefetch={false}` to the `<Link>` component if the page is not visited often.

## Developmen`

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
