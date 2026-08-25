import type { ReactNode } from "react";
import PreloadCatalogFilters from "../../components/PreloadCatalogFilters/PreloadCatalogFilters";

export default function CatalogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PreloadCatalogFilters />
      {children}
    </>
  );
}
