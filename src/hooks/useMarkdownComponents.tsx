import { useMemo, ReactNode } from 'react';

type ProcessChildrenFn = (children: ReactNode, keyPrefix?: string) => ReactNode;

export const useMarkdownComponents = (processChildren: ProcessChildrenFn) => {
  const components = useMemo(
    () => ({
      h1: ({ children }: { children: ReactNode }) => (
        <h1 className="text-2xl font-serif font-semibold text-slate-900 mb-6 mt-8 tracking-tight text-center">
          {children}
        </h1>
      ),
      h2: ({ children }: { children: ReactNode }) => (
        <h2 className="text-xs font-sans font-semibold text-slate-500 uppercase tracking-[0.2em] mb-4 mt-10 first:mt-0">
          {children}
        </h2>
      ),
      h3: ({ children }: { children: ReactNode }) => (
        <h3 className="text-lg font-serif font-medium text-slate-800 mb-3 mt-6">
          {children}
        </h3>
      ),
      p: ({ children }: { children: ReactNode }) => (
        <p className="mb-4 text-base leading-7 text-slate-700">
          {processChildren(children)}
        </p>
      ),
      strong: ({ children }: { children: ReactNode }) => (
        <strong className="font-semibold text-slate-900">{children}</strong>
      ),
      em: ({ children }: { children: ReactNode }) => (
        <em className="font-serif italic">{children}</em>
      ),
      blockquote: ({ children }: { children: ReactNode }) => (
        <blockquote className="border-l-2 border-slate-300 pl-6 py-2 my-6 font-serif text-slate-600 bg-slate-50/50 rounded-r-lg">
          {children}
        </blockquote>
      ),
      ul: ({ children }: { children: ReactNode }) => (
        <ul className="mb-4 space-y-2 list-disc list-outside ml-6">
          {children}
        </ul>
      ),
      ol: ({ children }: { children: ReactNode }) => (
        <ol className="mb-4 space-y-2 list-decimal list-outside ml-6">
          {children}
        </ol>
      ),
      li: ({ children }: { children: ReactNode }) => (
        <li className="text-base leading-7 text-slate-700">
          {processChildren(children)}
        </li>
      ),
      hr: () => <hr className="my-8 border-slate-200" />,
    }),
    [processChildren]
  );

  return components;
};
