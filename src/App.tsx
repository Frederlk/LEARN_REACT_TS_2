import { useContext } from "react";

import CreateProduct from "./components/CreateProduct";
import Error from "./components/Error";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import Products from "./components/Products";
import { ModalContext } from "./context/ModalContext";
import { useFetchProducts } from "./hooks/use-fetch-products";
import { IProduct } from "./models";

const App = () => {
    const { products, addProduct, loading, error } = useFetchProducts(
        "https://fakestoreapi.com/products?limit=5"
    );

    const { modal, open, close } = useContext(ModalContext);

    const createHandler = (product: IProduct) => {
        close();
        addProduct(product);
    };

    return (
        <div className="container mx-auto max-w-2xl pt-5">
            {loading && <Loader />}
            {error && <Error error={error} />}
            {products.length !== 0 &&
                products.map((product) => <Products key={product.id} product={product} />)}
            {modal && (
                <Modal title="Create new product" onClose={close}>
                    <CreateProduct onCreate={createHandler} />
                </Modal>
            )}

            <button
                type="button"
                onClick={open}
                className="fixed bottom-5 right-5 text-white bg-red-700 text-2xl py-2 px-10">
                Open Modal
            </button>
        </div>
    );
};

export default App;
