import { Link } from "@tanstack/solid-router"
import { For, createSignal, createMemo } from "solid-js"
import { docsConfig, type DocCategory } from "~/docs.config"

interface SidebarProps {
  currentSlug?: string
  onNavigate?: () => void
}

export default function Sidebar(props: SidebarProps) {
  return (
    <nav class="w-full" aria-label="Documentation sidebar">
      <For each={docsConfig.sidebar}>{(category) => <SidebarCategory category={category} currentSlug={props.currentSlug} onNavigate={props.onNavigate} />}</For>
    </nav>
  )
}

function SidebarCategory(props: { category: DocCategory; currentSlug?: string; onNavigate?: () => void }) {
  const [open, setOpen] = createSignal(true)

  const hasActive = createMemo(() => props.category.items.some((item) => item.slug === props.currentSlug))

  return (
    <div class="mb-4">
      <button
        class="flex items-center justify-between w-full text-sm font-semibold text-base-content/70 uppercase tracking-wider py-2 px-3 hover:text-base-content transition-colors rounded-lg hover:bg-base-200/50"
        onClick={() => setOpen(!open())}
      >
        <span>{props.category.title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class={`h-4 w-4 transition-transform duration-200 ${open() ? "rotate-90" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {open() && (
        <ul class="mt-1 ml-2 border-l-2 border-base-200">
          <For each={props.category.items}>
            {(item) => {
              const isActive = createMemo(() => item.slug === props.currentSlug)
              return (
                <li>
                  <Link
                    to="/docs/$"
                    params={{ _splat: item.slug }}
                    class={`block py-1.5 px-4 text-sm transition-all duration-150 border-l-2 -ml-[2px] hover:text-primary hover:border-primary ${
                      isActive() ? "text-primary border-primary font-medium bg-primary/5" : "text-base-content/60 border-transparent"
                    }`}
                    onClick={() => props.onNavigate?.()}
                  >
                    {item.title}
                  </Link>
                </li>
              )
            }}
          </For>
        </ul>
      )}
    </div>
  )
}
