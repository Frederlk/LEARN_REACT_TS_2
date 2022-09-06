import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { IProduct } from "../models";
import Error from "./Error";

type CreateProductProps = {
    onCreate: (product: IProduct) => void;
};

const productData: IProduct = {
    title: "test product",
    price: 13.5,
    description: "lorem ipsum set",
    image: "https://i.pravatar.cc",
    category: "electronic",
    rating: {
        rate: 42,
        count: 41,
    },
};

const CreateProduct = ({ onCreate }: CreateProductProps) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (value.trim().length === 0) {
            setError("Please enter valued title");
            return;
        }

        productData.title = value;
        const response = await axios.post<IProduct>("https://fakestoreapi.com/products", productData);

        setValue("");
        onCreate(response.data);
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return (
        <form onSubmit={submitHandler}>
            <input
                autoComplete="off"
                type="text"
                name="product"
                value={value}
                className="py-2 px-4 my-2 border product title w-full"
                onChange={changeHandler}
            />

            {error && <Error error={error} />}

            <button type="submit" className="py-2 px-4 border bg-yellow-400">
                Create
            </button>
        </form>
    );
};

export default CreateProduct;
