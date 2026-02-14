import { Outlet, createRootRoute } from "@tanstack/solid-router"
import { Suspense } from "solid-js"
import Navbar from "~/components/Navbar"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div class="min-h-screen bg-base-100 text-base-content">
      <Navbar />
      <Suspense
        fallback={
          <div class="flex items-center justify-center min-h-[60vh]">
            <span class="loading loading-spinner loading-lg text-primary"></span>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  )
}
