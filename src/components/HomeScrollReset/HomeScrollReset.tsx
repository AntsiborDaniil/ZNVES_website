"use client";

import { useScrollRestoration } from "../../hooks/useScrollRestoration";

/** Сброс скролла на главной (hero больше не client). */
const HomeScrollReset = () => {
  useScrollRestoration();
  return null;
};

export default HomeScrollReset;
