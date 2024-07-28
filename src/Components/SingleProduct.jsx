import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../store/productSlice';
import StatusCode from '../utils/StatusCode';
import { add } from '../store/cartSlice';
import Toast, { Toaster } from 'react-hot-toast';
import { Button, Rating } from '@mui/material';
import { CiShoppingCart } from 'react-icons/ci';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) =>
    state.products.data.find((product) => product.id === parseInt(id))
  );

  const status = useSelector((state) => state.products.status);

  // Retrieve cart items and calculate the total number of items in the cart
  const cartProducts = useSelector((state) => state.cart);
  const currentProductInCart = cartProducts.find((item) => item.id === parseInt(id));
  const currentProductCount = currentProductInCart ? currentProductInCart.quantity : 0;

  const addToCart = () => {
    dispatch(add(product));
    Toast.success("Added to cart");
  };

  const goToCart = () => {
    navigate('/cart'); // Navigate to the cart page
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
    <div className="flex items-center py-24 flex-col md:flex-row lg:px-4 md:px-4 relative">
      <Toaster />

      {/* Cart Icon with Navigation */}
      <div className="absolute top-4 right-4 flex items-center cursor-pointer" onClick={goToCart}>
        <CiShoppingCart className="text-2xl" />
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
          {currentProductCount}
        </span>
      </div>

      <InnerImageZoom
        src={product.image}
        zoomSrc={product.image}
        alt={product.title}
        className='cursor-pointer border p-4w-[94vw]'
        zoomType="hover"
      />

      <section className='flex-col pl-16 text-sm md:text-lg pt-4 m-auto'>
        <h1 className='font-semibold md:text-xl md:px-4 pb-5 text-sm'>{product.title}</h1>
        <p className='pb-2'>{product.description}</p>
        <Rating name="read-only" value={5} readOnly />
        <p className='font-semibold text-xl'>Price: ${product.price}</p>
        <section className='flex'>
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
