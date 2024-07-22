import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../store/productSlice';
import StatusCode from '../utils/StatusCode';
import { add } from '../store/cartSlice';
import Toast, { Toaster } from 'react-hot-toast';
import { Button, Rating } from '@mui/material';


const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.data.find((product) => product.id === parseInt(id))
  );

  // console.log("SingleProduct:", product);
  const status = useSelector((state) => state.products.status);
  const addToCart = () => {
    dispatch(add(product));
    Toast.success("Added to cart");
  };

  useEffect(() => {
    if (!product) {
      dispatch(getProducts());
    }
  }, [dispatch, product]);

  if (status === StatusCode.LOADING) {
    return <div className='flex justify-center text-center items-center'>Loading...</div>;
  }

  if (status === StatusCode.ERROR) {
    return <>Error loading product details.</>;
  }

  if (!product) {
    return <div className='text-5xl'>No product found</div>;
  }

  return (
    <div className="flex items-center py-24 flex-col md:flex-row lg:px-4 md:px-4">
      <Toaster />
      <img src={product.image} alt={product.title} className='size-52  lg:size-96 md:size-80 cursor-pointer border  p-4' />
      <section className='flex-col  pl-16 text-sm md:text-lg pt-4 m-auto '>
        <h1 className='font-semibold md:text-xl md:px-4  pb-5 text-sm '>{product.title}
        </h1>
        <p className='pb-2'>{product.description}</p>
          <Rating name="read-only" value={5} readOnly />
        <p className='font-semibold text-xl '>Price: ${product.price}</p>
        <section className='flex '>
          <Button
            type="button"
            variant='contained'
            onClick={addToCart}
          >
            Buy Now
          </Button>
        </section>
      </section>
    </div>
  );
};

export default SingleProduct;
