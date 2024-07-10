import React from 'react'
import { useSelector, useDispatch,useEffect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../store/productSlice';
const { data: product, status } = useSelector(state => state.ProductDetails)
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productFromState = useSelector((state) => state.products.find((product) => product.id === parseInt(id)));
  useEffect(() => {
    dispatch(getProducts(id) )
  },[dispatch,id])
  if (!productFromState)
    return <><label>Product not found</label></>
  return (
    <div>
      <h1>{product.name}</h1>
      <label htmlFor="productDescription ">{productFromState.description}</label>
      <label htmlFor="prductPrice ">{productFromState.price}$</label>
    </div>
  )
}

export default ProductDetails