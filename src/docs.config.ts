export interface DocItem {
  title: string;
  slug: string;
}

export interface DocCategory {
  title: string;
  items: DocItem[];
}

export interface DocsConfig {
  title: string;
  tagline: string;
  sidebar: DocCategory[];
}

export const docsConfig: DocsConfig = {
  title: "Natee Docs",
  tagline: "Documentation boilerplate for Natee projects — open source & free to collaborate",
  sidebar: [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", slug: "getting-started/introduction" },
        { title: "Installation", slug: "getting-started/installation" },
        { title: "Project Structure", slug: "getting-started/project-structure" },
      ],
    },
    {
      title: "Guides",
      items: [
        { title: "Markdown Features", slug: "guides/markdown-features" },
        { title: "Using Components", slug: "guides/components" },
      ],
    },
    {
      title: "API Reference",
      items: [
        { title: "Configuration", slug: "api/configuration" },
      ],
    },
  ],
};
