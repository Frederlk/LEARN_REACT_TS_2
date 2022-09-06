import { IProduct } from "../models";
import { useState } from "react";

interface ProductProps {
    product: IProduct;
}

const Products = ({ product }: ProductProps) => {
    const [details, setDetails] = useState(false);

    return (
        <article className="border py-2 px-4 rounded flex flex-col items-center mb-2">
            <img className="w-1/6" src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <span>{product.price}</span>
            <button
                onClick={() => setDetails((prev) => !prev)}
                className={`py-2 px-4 border ${details ? "bg-blue-100" : "bg-yellow-400"}`}>
                {details ? "Hide" : "Show"} Details
            </button>
            {details && (
                <div>
                    <p>{product.description}</p>
                    <p>
                        Rate: <span style={{ fontWeight: "700" }}> {product?.rating?.rate}</span> | Count:
                        <span style={{ fontWeight: "700" }}> {product?.rating?.count}</span>
                    </p>
                </div>
            )}
        </article>
    );
};

export default Products;
