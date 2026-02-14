import { type JSX, type Component } from "solid-js"

/** Custom MDX component overrides for Docusaurus-like styling */
export const mdxComponents: Record<string, Component<any>> = {
  // Admonition-style components
  Tip: (props: { children: JSX.Element; title?: string }) => (
    <div class="admonition admonition-tip">
      <p class="font-semibold mb-1">{props.title || "💡 Tip"}</p>
      <div class="text-base-content">{props.children}</div>
    </div>
  ),
  Note: (props: { children: JSX.Element; title?: string }) => (
    <div class="admonition admonition-note">
      <p class="font-semibold mb-1">{props.title || "ℹ️ Note"}</p>
      <div class="text-base-content">{props.children}</div>
    </div>
  ),
  Warning: (props: { children: JSX.Element; title?: string }) => (
    <div class="admonition admonition-warning">
      <p class="font-semibold mb-1">{props.title || "⚠️ Warning"}</p>
      <div class="text-base-content">{props.children}</div>
    </div>
  ),
  Danger: (props: { children: JSX.Element; title?: string }) => (
    <div class="admonition admonition-danger">
      <p class="font-semibold mb-1">{props.title || "🚨 Danger"}</p>
      <div class="text-base-content">{props.children}</div>
    </div>
  ),

  // Tabs component
  Tabs: (props: { children: JSX.Element }) => <div class="tabs tabs-bordered my-4">{props.children}</div>,
  Tab: (props: { children: JSX.Element; label: string }) => <div class="tab-content p-4">{props.children}</div>,
}
