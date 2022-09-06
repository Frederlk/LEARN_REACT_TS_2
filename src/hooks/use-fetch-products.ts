import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { IProduct } from "../models";

export const useFetchProducts = (link: string) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const addProduct = (product: IProduct) => {
        setProducts((prev) => [...prev, product]);
    };

    const fetchProducts = async () => {
        try {
            setError("");
            setLoading(true);
            const res = await axios.get<IProduct[]>(link);
            setLoading(false);
            setProducts(res.data);
            setLoading(false);
        } catch (e: unknown) {
            setLoading(false);
            const error = e as AxiosError;
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, addProduct, loading, error };
};
