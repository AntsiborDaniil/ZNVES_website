import CatalogPage from "../../components/CatalogPage/CatalogPage";
import { newInProducts as newInProductsData } from "../../data/products";

const NewIn = () => {
    return <CatalogPage title="NEW IN" products={newInProductsData} />;
};

export default NewIn;
