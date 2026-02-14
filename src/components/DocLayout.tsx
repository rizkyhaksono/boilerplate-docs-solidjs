import { createSignal, createMemo, Show, type JSX } from "solid-js"
import { Link } from "@tanstack/solid-router"
import Sidebar from "./Sidebar"
import TableOfContents from "./TableOfContents"
import Footer from "./Footer"
import { docsConfig, type DocItem } from "~/docs.config"

interface DocLayoutProps {
  slug: string
  children: JSX.Element
}

export default function DocLayout(props: DocLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = createSignal(false)

  const prevNext = createMemo(() => {
    const allItems: DocItem[] = []
    for (const cat of docsConfig.sidebar) {
      allItems.push(...cat.items)
    }
    const idx = allItems.findIndex((item) => item.slug === props.slug)
    return {
      prev: idx > 0 ? allItems[idx - 1] : null,
      next: idx < allItems.length - 1 ? allItems[idx + 1] : null,
    }
  })

  return (
    <div class="min-h-screen flex flex-col">
      <div class="flex-1 max-w-[90rem] mx-auto w-full px-4 lg:px-8">
        <div class="flex gap-8 py-8">
          {/* Desktop sidebar */}
          <aside class="hidden lg:block w-64 shrink-0">
            <div class="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
              <Sidebar currentSlug={props.slug} />
            </div>
          </aside>

          {/* Mobile sidebar overlay */}
          <Show when={sidebarOpen()}>
            <div class="fixed inset-0 z-40 lg:hidden">
              <div class="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <div class="relative w-72 h-full bg-base-100 shadow-xl overflow-y-auto p-4">
                <div class="flex justify-end mb-4">
                  <button class="btn btn-ghost btn-sm btn-circle" onClick={() => setSidebarOpen(false)}>
                    ✕
                  </button>
                </div>
                <Sidebar currentSlug={props.slug} onNavigate={() => setSidebarOpen(false)} />
              </div>
            </div>
          </Show>

          {/* Mobile sidebar toggle */}
          <button class="fixed bottom-4 right-4 z-30 lg:hidden btn btn-primary btn-circle shadow-lg" onClick={() => setSidebarOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>

          {/* Main content */}
          <main class="flex-1 min-w-0">
            <article class="prose" data-doc-content>
              {props.children}
            </article>

            {/* Previous / Next navigation */}
            <div class="flex justify-between mt-12 pt-6 border-t border-base-200">
              <div>
                <Show when={prevNext().prev}>
                  {(prev) => (
                    <Link to={`/docs/${prev().slug}`} class="group flex flex-col items-start gap-1 hover:no-underline">
                      <span class="text-xs text-base-content/50 uppercase tracking-wider">Previous</span>
                      <span class="text-sm font-medium text-primary group-hover:underline">← {prev().title}</span>
                    </Link>
                  )}
                </Show>
              </div>
              <div>
                <Show when={prevNext().next}>
                  {(next) => (
                    <Link to={`/docs/${next().slug}`} class="group flex flex-col items-end gap-1 hover:no-underline">
                      <span class="text-xs text-base-content/50 uppercase tracking-wider">Next</span>
                      <span class="text-sm font-medium text-primary group-hover:underline">{next().title} →</span>
                    </Link>
                  )}
                </Show>
              </div>
            </div>
          </main>

          {/* Table of Contents */}
          <TableOfContents />
        </div>
      </div>

      <Footer />
    </div>
  )
}
