import { createContext, useContext } from "react";

/**
 * Which page is rendering the shared chrome (header, menu, footer). On the home page the
 * section links are in-page anchors (#about); on other pages they point back home (/#about).
 */
export const PageContext = createContext<{ home: boolean }>({ home: true });

export const useIsHome = () => useContext(PageContext).home;

/** Resolve a home-page section anchor ("#about") for the current page. */
export function useNavHref() {
  const home = useIsHome();
  return (hash: string) => (home ? hash : `/${hash}`);
}
