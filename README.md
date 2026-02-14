# Natee Docs

A modern, high-performance documentation boilerplate built with SolidStart, MDX, Tailwind CSS, and DaisyUI. Designed for speed, simplicity, and easy customization.

## Features

- **SolidStart**: Powered by SolidJS for fine-grained reactivity and minimal overhead.
- **MDX Support**: Write documentation using MDX with full component support, syntax highlighting, and GitHub Flavored Markdown.
- **Modern Styling**: Built with Tailwind CSS v4 and DaisyUI v5, featuring dark mode support and responsive layouts.
- **Client-Side Search**: Integrated search functionality with keyboard shortcuts (Ctrl+K).
- **SEO Optimized**: Includes meta tags, OpenGraph support, and semantic HTML structure.
- **Extensible Architecture**: Easy to customize and extend with consistent component patterns.

## Getting Started

### Prerequisites

- Node.js >= 22
- Bun (recommended) or NPM/Yarn/PNPM

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rizkyhaksono/boilerplate-docs-solidjs.git
   cd boilerplate-docs-solidjs
   ```

2. Install dependencies:

   ```bash
   bun install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   bun run dev
   # or
   npm run dev
   ```

Open http://localhost:3000 to view your documentation site.

## key Configuration

The main configuration file is located at `src/docs.config.ts`. Here you can customize:

- Site title and tagline
- Sidebar navigation structure
- Documentation categories and items

## Deployment

Build the application for production:

```bash
bun run build
# or
npm run build
```

Start the production server:

```bash
bun run start
# or
npm start
```

## innovative Technology Stack

- [SolidStart](https://start.solidjs.com) - The Solid app meta-framework
- [SolidJS](https://www.solidjs.com) - UI library
- [MDX](https://mdxjs.com) - Markdown for the component era
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com) - Component library for Tailwind CSS
- [TanStack Router](https://tanstack.com/router) - Type-safe routing

## License

MIT
