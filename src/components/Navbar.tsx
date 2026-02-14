import { Link } from "@tanstack/solid-router"
import { createSignal } from "solid-js"
import { docsConfig } from "~/docs.config"
import ThemeToggle from "./ThemeToggle"
import SearchDialog from "./SearchDialog"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = createSignal(false)

  return (
    <div class="navbar bg-base-100/80 backdrop-blur-lg border-b border-base-200 sticky top-0 z-50 px-4 lg:px-8">
      {/* Mobile menu button */}
      <div class="flex-none lg:hidden">
        <button class="btn btn-ghost btn-square btn-sm" onClick={() => setMobileOpen(!mobileOpen())} aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen() ? <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /> : <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Logo */}
      <div class="flex-1">
        <Link to="/" class="flex items-center gap-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span>{docsConfig.title}</span>
        </Link>
      </div>

      {/* Desktop nav */}
      <div class="hidden lg:flex items-center gap-2">
        <SearchDialog />
        <Link to="/docs/$" params={{ _splat: "getting-started/introduction" }} class="btn btn-ghost btn-sm font-medium">
          Docs
        </Link>
        <a href="https://github.com/rizkyhaksono/boilerplate-docs-solidjs" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm font-medium">
          GitHub
        </a>
        <div class="divider divider-horizontal mx-0" />
        <ThemeToggle />
      </div>

      {/* Mobile dropdown */}
      {mobileOpen() && (
        <div class="absolute top-full left-0 right-0 bg-base-100 border-b border-base-200 shadow-lg lg:hidden p-4 flex flex-col gap-2">
          <Link to="/docs/$" params={{ _splat: "getting-started/introduction" }} class="btn btn-ghost btn-sm justify-start" onClick={() => setMobileOpen(false)}>
            Docs
          </Link>
          <a href="https://github.com/rizkyhaksono/boilerplate-docs-solidjs" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm justify-start">
            GitHub
          </a>
          <div class="divider my-0" />
          <div class="flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  )
}
