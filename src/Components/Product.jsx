import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { add } from '../store/cartSlice';
import { getProducts } from '../store/productSlice';
import StatusCode from '../utils/StatusCode';
import Toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';

const notify = () => Toast.success("Product added");

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector(state => state.products);
  // const cartProducts = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const addToCart = (product) => {
    dispatch(add(product));
    notify();
  };

  if (status === StatusCode.LOADING) {
    return <>Loading ...</>;
  }

  if (status === StatusCode.ERROR) {
    return <label className='m-auto'>Error in fetching the data from Api</label>;
  }

  return (
    <>
      <Toaster />
      {products.length > 0 ? (
        <div className="flex flex-wrap flex-col lg:flex-row justify-center pt-6 px-5">
          {products.map(product => (
            // <Link to={`/product/${product.id}` } key={product.id}>
              <div className="w-1/4   flex-wrap  p-2 border border-gray-600 " key={product.id}>

                <img
                  src={product.image}
                  className="h-52 w-full border-b-4 overflow-hidden border-b-yellow-800 hover:cursor-pointer hover:scale-105 ease-in-out duration-300"
                  alt={product.title}
                />

                <h1 className="font-bold mt-2">{product.title}</h1>
                <p className="text-lg font-semibold mt-2">
                  Price: <code>{product.price}$</code>
                </p>
                <button onClick={() => addToCart(product)} className="items-center px-4 py-2 border-2 hover:scale-105 transition duration-300 bg-stone-500 hover:bg-gray-100">
                  Add to Cart
                </button>
              </div>
            // </Link>
          ))}
        </div>
      ) : (
        <BarLoader className='m-auto top-80' />
      )}
    </>
  );
};

export default Product;
