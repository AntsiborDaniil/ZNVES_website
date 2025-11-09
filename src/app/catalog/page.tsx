import CatalogPage from "../../components/CatalogPage/CatalogPage";
import { catalogProducts as catalogProductsData } from "../../data/products";

const Catalog = () => {
    return <CatalogPage title="CATALOG" products={catalogProductsData} />;
};

export default Catalog;
