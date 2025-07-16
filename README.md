# board-games-library

A web app for storing and organising your board game collection.

## Development setup

This repository contains two directories:

- `client` &ndash; React frontend built with [Vite](https://vitejs.dev/) and Tailwind CSS.
- `server` &ndash; Express proxy server used to query the BoardGameGeek API.

Both folders contain their own `package.json`. Install dependencies in each folder and run the development servers separately.

```bash
cd client && npm install
npm run dev
```

```bash
cd server && npm install
npm run dev
```

The frontend dev server proxies API requests starting with `/api` to `http://localhost:3001`.

## Stage&nbsp;1 plan

1. **Search** &ndash; Allow users to search for board games using BoardGameGeek's API. The server exposes `/api/search?q=<term>` which converts the XML response to JSON.
2. **Library management** &ndash; Enable selecting games from search results and storing them in `localStorage`.
3. **Library view** &ndash; Display the saved list of games on a dedicated page.
4. **Styling** &ndash; Use Tailwind CSS for basic layout and style.

Later stages will introduce authentication and a persistent database for storing each user's library.

## Recommended CSS framework

[Tailwind CSS](https://tailwindcss.com/) is used for rapid styling and utility classes.
