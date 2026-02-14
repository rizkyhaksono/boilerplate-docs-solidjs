declare module "solid-mdx" {
  import { PropsWithChildren, JSX, Context } from "solid-js";
  export const MDXContext: Context<{
    [k: string]: (props: any) => JSX.Element;
  }>;
  export const MDXProvider: (
    props: PropsWithChildren<{
      components: {
        [k: string]: (props: any) => JSX.Element;
      };
    }>
  ) => JSX.Element;
  export const useMDXComponents: () => {
    [k: string]: (props: any) => JSX.Element;
  };
}

declare module "*.mdx" {
  import type { Component } from "solid-js";
  const component: Component;
  export default component;
  export const frontmatter: Record<string, any>;
}
