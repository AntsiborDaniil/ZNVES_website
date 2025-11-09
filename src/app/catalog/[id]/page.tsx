import { notFound } from "next/navigation";
import ProductPageView from "../../../components/ProductPage/ProductPageView";
import {
    catalogProducts,
    newInProducts,
    getProductById,
} from "../../../data/products";

type ProductPageProps = {
    params: {
        id: string;
    };
};

export const dynamicParams = false;

export const generateStaticParams = () => {
    const allProducts = [...catalogProducts, ...newInProducts];

    return allProducts.map((product) => ({
        id: product.id.toString(),
    }));
};

const ProductPage = ({ params }: ProductPageProps) => {
    const productId = Number(params.id);

    if (Number.isNaN(productId)) {
        notFound();
    }

    const product = getProductById(productId);

    if (!product) {
        notFound();
    }

    return <ProductPageView product={product} />;
};

export default ProductPage;
