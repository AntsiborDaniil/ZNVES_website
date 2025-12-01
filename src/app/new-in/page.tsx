"use client";

import CatalogPage from "../../components/CatalogPage/CatalogPage";
import { useCatalogProducts } from "../../hooks/useCatalogProducts";

const NewIn = () => {
  const { data: products = [] } = useCatalogProducts({
    is_new: true,
  });

  return <CatalogPage title="NEW IN" products={products} />;
};

export default NewIn;
