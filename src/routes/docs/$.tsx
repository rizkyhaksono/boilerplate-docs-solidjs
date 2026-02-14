import { createFileRoute } from "@tanstack/solid-router"
import { lazy, Suspense, createMemo } from "solid-js"
import { MDXProvider } from "solid-mdx"
import DocLayout from "~/components/DocLayout"
import { mdxComponents } from "~/components/mdx-components"

// Eagerly import all MDX docs
const docs: Record<string, ReturnType<typeof lazy>> = {
  "getting-started/introduction": lazy(() => import("~/content/docs/getting-started/introduction.mdx")),
  "getting-started/installation": lazy(() => import("~/content/docs/getting-started/installation.mdx")),
  "getting-started/project-structure": lazy(() => import("~/content/docs/getting-started/project-structure.mdx")),
  "guides/markdown-features": lazy(() => import("~/content/docs/guides/markdown-features.mdx")),
  "guides/components": lazy(() => import("~/content/docs/guides/components.mdx")),
  "api/configuration": lazy(() => import("~/content/docs/api/configuration.mdx")),
}

export const Route = createFileRoute("/docs/$")({
  component: DocPage,
})

function DocPage() {
  const params = Route.useParams()
  const slug = createMemo(() => params()._splat || "getting-started/introduction")
  const DocComponent = createMemo(() => docs[slug()])

  return (
    <MDXProvider components={mdxComponents}>
      <DocLayout slug={slug()}>
        <Suspense
          fallback={
            <div class="flex items-center justify-center py-20">
              <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>
          }
        >
          {DocComponent() ? (
            <>{DocComponent()!({})} </>
          ) : (
            <div class="prose">
              <h1>404 - Page Not Found</h1>
              <p>
                The document at <code>{slug()}</code> could not be found.
              </p>
              <a href="/docs/getting-started/introduction">Go to introduction →</a>
            </div>
          )}
        </Suspense>
      </DocLayout>
    </MDXProvider>
  )
}
