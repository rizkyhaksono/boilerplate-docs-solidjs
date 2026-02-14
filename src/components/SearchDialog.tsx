import { createSignal, For } from "solid-js"
import { docsConfig } from "~/docs.config"

export default function SearchDialog() {
  const [open, setOpen] = createSignal(false)
  const [query, setQuery] = createSignal("")

  const results = () => {
    const q = query().toLowerCase().trim()
    if (!q) return []
    const items: Array<{ title: string; slug: string; category: string }> = []
    for (const cat of docsConfig.sidebar) {
      for (const item of cat.items) {
        if (item.title.toLowerCase().includes(q)) {
          items.push({ ...item, category: cat.title })
        }
      }
    }
    return items
  }

  // Keyboard shortcut
  if (typeof window !== "undefined") {
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    })
  }

  return (
    <>
      {/* Search trigger button */}
      <button class="btn btn-ghost btn-sm gap-2 text-base-content/60 border border-base-300 hover:border-base-content/30 px-3" onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span class="hidden sm:inline text-sm">Search...</span>
        <kbd class="kbd kbd-sm hidden sm:inline-flex">⌘K</kbd>
      </button>

      {/* Modal */}
      {open() && (
        <div class="fixed inset-0 z-[100]">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div class="relative max-w-lg mx-auto mt-[15vh]">
            <div class="bg-base-100 rounded-xl shadow-2xl border border-base-200 overflow-hidden">
              {/* Search input */}
              <div class="flex items-center gap-3 px-4 border-b border-base-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-base-content/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search documentation..." class="input input-ghost w-full focus:outline-none border-none pl-0" value={query()} onInput={(e) => setQuery(e.currentTarget.value)} autofocus />
                <kbd class="kbd kbd-sm">Esc</kbd>
              </div>

              {/* Results */}
              <div class="max-h-80 overflow-y-auto p-2">
                {query().trim() === "" ? (
                  <div class="text-center py-8 text-base-content/40 text-sm">Type to search documentation...</div>
                ) : results().length === 0 ? (
                  <div class="text-center py-8 text-base-content/40 text-sm">No results found for "{query()}"</div>
                ) : (
                  <For each={results()}>
                    {(result) => (
                      <a href={`/docs/${result.slug}`} class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-base-200 transition-colors" onClick={() => setOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <p class="text-sm font-medium text-base-content">{result.title}</p>
                          <p class="text-xs text-base-content/50">{result.category}</p>
                        </div>
                      </a>
                    )}
                  </For>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
