"use client";

import Link, { type LinkProps as NextLinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { forwardRef, useEffect } from "react";

type To = string;

type BaseAnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export interface LinkProps extends BaseAnchorProps {
  to: To;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean | null;
}

export type NavLinkProps = LinkProps & {
  className?: string | ((state: { isActive: boolean; isPending: boolean }) => string);
};

export function useNavigate() {
  const router = useRouter();

  return (to: To, options?: { replace?: boolean; scroll?: boolean }) => {
    if (options?.replace) {
      router.replace(to, { scroll: options.scroll });
      return;
    }

    router.push(to, { scroll: options?.scroll });
  };
}

export function useLocation() {
  const pathname = usePathname();

  return { pathname: pathname ?? "/" };
}

export const Outlet = () => null;

export function Navigate({ to, replace = false }: { to: To; replace?: boolean }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, replace, to]);

  return null;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, className, ...props }, ref) => {
    const pathname = usePathname() ?? "/";
    const isActive = pathname === to;
    const resolvedClassName = typeof className === "function"
      ? (className as (state: { isActive: boolean; isPending: boolean }) => string)({ isActive, isPending: false })
      : className;

    return <CompatLink ref={ref} to={to} className={resolvedClassName} {...props} />;
  },
);

NavLink.displayName = "NavLink";

const CompatLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, replace, scroll, prefetch, ...props }, ref) => {
    const nextProps: Pick<NextLinkProps, "href" | "replace" | "scroll" | "prefetch"> = {
      href: to,
      replace,
      scroll,
      prefetch: prefetch ?? undefined,
    };

    return <Link ref={ref} {...nextProps} {...props} />;
  },
);

CompatLink.displayName = "CompatLink";

export { CompatLink as Link };
