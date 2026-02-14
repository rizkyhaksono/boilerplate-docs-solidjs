import { docsConfig } from "~/docs.config"

export default function Footer() {
  return (
    <footer class="bg-base-200/50 border-t border-base-200">
      <div class="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 class="text-lg font-bold text-base-content mb-2">{docsConfig.title}</h3>
            <p class="text-sm text-base-content/60">{docsConfig.tagline}</p>
          </div>

          {/* Docs */}
          <div>
            <h4 class="text-sm font-semibold text-base-content uppercase tracking-wider mb-3">Docs</h4>
            <ul class="space-y-2">
              <li>
                <a href="/docs/getting-started/introduction" class="text-sm text-base-content/60 hover:text-primary transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="/docs/guides/markdown-features" class="text-sm text-base-content/60 hover:text-primary transition-colors">
                  Guides
                </a>
              </li>
              <li>
                <a href="/docs/api/configuration" class="text-sm text-base-content/60 hover:text-primary transition-colors">
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 class="text-sm font-semibold text-base-content uppercase tracking-wider mb-3">Community</h4>
            <ul class="space-y-2">
              <li>
                <a href="https://github.com/rizkyhaksono/boilerplate-docs-solidjs" target="_blank" rel="noopener noreferrer" class="text-sm text-base-content/60 hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://discord.gg/natee" target="_blank" rel="noopener noreferrer" class="text-sm text-base-content/60 hover:text-primary transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="divider"></div>

        <div class="text-center text-sm text-base-content/40">
          <p>
            Copyright © {new Date().getFullYear()} {docsConfig.title}. Built with SolidJS.
          </p>
        </div>
      </div>
    </footer>
  )
}
