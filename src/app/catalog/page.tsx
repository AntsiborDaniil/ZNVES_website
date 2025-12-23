import CatalogPage from "../../components/CatalogPage/CatalogPage";
import {
    catalogProducts as catalogProductsData,
    newInProducts as newInProductsData,
    toCatalogProduct,
} from "../../data/products";

const Catalog = () => {
    const allProducts = [
        ...catalogProductsData.map(toCatalogProduct),
        ...newInProductsData.map(toCatalogProduct),
    ];

    return <CatalogPage title="CATALOG" products={allProducts} />;
};

export default Catalog;
