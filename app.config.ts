import { defineConfig } from "@solidjs/start/config";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
  extensions: ["mdx"],
  vite: {
    plugins: [
      tailwindcss(),
      tanstackRouter({ target: "solid" }),
      {
        enforce: "pre" as const,
        ...mdx({
          jsxImportSource: "solid-jsx",
          providerImportSource: "solid-mdx",
          remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: {
                  dark: "github-dark",
                  light: "github-light",
                },
              },
            ],
          ],
        }),
      },
    ],
  },
});
