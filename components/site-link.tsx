import type { AnchorHTMLAttributes, ReactNode } from 'react';

const siteBase = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function sitePath(path: string) {
  if (!path.startsWith('/')) return path;
  const cleanPath = path === '/' ? '/' : `${path.replace(/\/$/, '')}.html`;
  return `${siteBase}${cleanPath}`;
}

export function SiteLink({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }) {
  return <a href={sitePath(href)} {...props}>{children}</a>;
}
