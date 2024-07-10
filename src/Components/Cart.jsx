import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove } from '../store/cartSlice'
import { CiShoppingCart } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import Toast,{Toaster} from 'react-hot-toast'
const Cart = () => {
  const cartProducts = useSelector(state => state.cart)
  const dispatch = useDispatch();
  const removeProduct = () => Toast.success("Product removed");
  const removeToCart = (id) => {
    dispatch(remove(id));
    removeProduct();
  }


  return (
    <div>
      <Toaster/>
      <div className='flex flex-wrap justify-center  '>
        

        {cartProducts.map((product, index) => (
          <div key={product.id} className=" p-2 border border-gray-600 w-72 ">
            <div className="overflow-hidden">
              <img
                src={product.image}
                className="h-52 w-full   border-b-4 border-b-yellow-800 hover:cursor-pointer hover:scale-105 ease-in-out duration-300"
                alt={product.title}
              />
            </div>
            <h1 className="font-bold mt-2">{product.title}</h1>
            <p className="text-lg font-semibold mt-2">
              Price : <code>{product.price}$</code>
            </p>
            <p>{product.reviews}</p>
            <button onClick={() => removeToCart(product.id)} className="items-center px-4 py-2 border-2  hover:scale-105 transition duration-300 bg-stone-500 hover:bg-gray-100">
              Remove from Cart
            </button>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Cart
