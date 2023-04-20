Build this as part of a interview process.

## Below are the detailed requirements for the assignment:

## Requirements:
Use Next.js with React for the project.
Utilize the 'pages' directory for the project structure.
Retrieve data from the GraphQL API: https://graphql-pokemon2.vercel.app/.
API documentation: https://wayfair.github.io/dociql/.
Use Apollo Client library to fetch data from the API.
Host the application on Vercel (free hosting).


## Features:

### Homepage:
List all available Pokemon with pagination (20 Pokemon per page).
Display each Pokemon's image, number, name, and types.
Refer to https://www.pokemon.com/us/pokedex/ for layout inspiration.
Statically render the first three paginated pages at build time.
Render the remaining pages in real-time.
### Pokemon detail page:
Display name, image, height, weight, classification, type, weakness, and resistance of the Pokemon.
Include a button to open a popup showing the Pokemon's evolutions.
Query evolution data only when the button is clicked, not beforehand.
Refer to https://www.pokemon.com/us/pokedex/bulbasaur for an example of a Pokemon detail page.
Statically render the detail pages for the first 20 Pokemon at build time.

### Submission:
Provide a link to the deployed Vercel application.
Upload the code to a public GitHub repository and share the link.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
