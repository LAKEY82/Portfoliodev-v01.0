import { createContext, useContext } from "react";

/** Becomes true once the preloader starts revealing the page; entrance animations wait for it. */
export const SiteReadyContext = createContext(false);

export const useSiteReady = () => useContext(SiteReadyContext);
