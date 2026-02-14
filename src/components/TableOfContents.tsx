import { onMount, onCleanup, createSignal, For, createEffect } from "solid-js"

interface TocItem {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = createSignal<TocItem[]>([])
  const [activeId, setActiveId] = createSignal("")

  onMount(() => {
    // Collect headings from the content area
    const updateHeadings = () => {
      const contentEl = document.querySelector("[data-doc-content]")
      if (!contentEl) return

      const elements = contentEl.querySelectorAll("h2, h3")
      const items: TocItem[] = []
      elements.forEach((el) => {
        if (el.id) {
          items.push({
            id: el.id,
            text: el.textContent || "",
            level: parseInt(el.tagName[1]),
          })
        }
      })
      setHeadings(items)
    }

    // Small delay to let MDX content render
    setTimeout(updateHeadings, 100)

    // Intersection observer for scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      },
    )

    setTimeout(() => {
      const contentEl = document.querySelector("[data-doc-content]")
      if (!contentEl) return
      const elements = contentEl.querySelectorAll("h2, h3")
      elements.forEach((el) => {
        if (el.id) observer.observe(el)
      })
    }, 200)

    onCleanup(() => observer.disconnect())
  })

  return (
    <div class="hidden xl:block w-56 shrink-0">
      <div class="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
        {headings().length > 0 && (
          <>
            <p class="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-3">On this page</p>
            <ul class="space-y-1 border-l-2 border-base-200">
              <For each={headings()}>
                {(heading) => (
                  <li>
                    <a
                      href={`#${heading.id}`}
                      class={`block text-sm py-1 transition-colors duration-150 border-l-2 -ml-[2px] ${heading.level === 3 ? "pl-6" : "pl-4"} ${
                        activeId() === heading.id ? "text-primary border-primary font-medium" : "text-base-content/50 border-transparent hover:text-base-content hover:border-base-300"
                      }`}
                    >
                      {heading.text}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
