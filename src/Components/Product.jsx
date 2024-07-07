import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { CiShoppingCart } from 'react-icons/ci';
import { add } from '../store/cartSlice';
import { getProducts } from '../store/productSlice';
import StatusCode from '../utils/StatusCode';
import { Link } from 'react-router-dom';
import Toast,{Toaster} from "react-hot-toast";
const notify=()=>Toast("Product added")

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector(state => state.products);
  const cartProducts = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const addToCart = (product) => {
    dispatch(add(product));
    
  };

  if (status === StatusCode.LOADING) {
    return <>Loading ...</>;
  }

  if (status === StatusCode.ERROR) {
    return <>Error</>;
  }

  return (
    <>
      
      {products.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-center pt-6">
          {products.map(product => (
            <div key={product.id} className="w-1/5 p-2 border border-gray-600">
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  className="h-52 w-full border-b-4 border-b-yellow-800 hover:cursor-pointer hover:scale-105 ease-in-out duration-300"
                  alt={product.title}
                />
              </div>
              <h1 className="font-bold mt-2">{product.title}</h1>
              <p className="text-lg font-semibold mt-2">
                Price: <code>{product.price}$</code>
              </p>
              <button onClick={() => addToCart(product)}  className="items-center px-4 py-2 border-2 hover:scale-105 transition duration-300 bg-stone-500 hover:bg-gray-100">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <BarLoader className='m-auto top-80' />
      )}
    </>
  );
};

export default Product;
