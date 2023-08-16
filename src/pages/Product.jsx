import {Layout} from "../components/layout/Layout.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {GoBackBtn} from "../components/buttons/GoBackBtn.jsx";
import {BlockWrapper} from "../components/layout/BlockWrapper.jsx";
import {Heading1} from "../components/headings/Heading1.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchProduct} from "../store/reducers/ActionCreator.js";
import {setProduct} from "../store/reducers/ProductSlice.js";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import {Loader} from "../components/Loader.jsx";
import {RemoveIcon} from "../components/icons/RemoveIcon.jsx";
import {AddIcon} from "../components/icons/AddIcon.jsx";
import {add, remove, toggleShowBasketItems} from "../store/reducers/BasketSlice.js";
import {BasketIcon} from "../components/icons/BasketIcon.jsx";
import {Drawer} from "../components/Drawer.jsx";

export const Product = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.productReducer);
  const { product, isSuccess, isLoading, error } = useSelector(state => state.singleProductReducer);
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const navigateBack = () =>  navigate(-1);
  const { products: basketProducts } = useSelector(state => state.basketReducer);

  const handleProductIncrease = (product) => {
    dispatch(add(product))
  }

  const handleProductDecrease = (title) => {
    dispatch(remove(title))
  }

  const handleProductIncreaseByTitle = (title) => {
    dispatch(add(title))
  }

  useEffect(() => {
    if (!products.length) dispatch(fetchProduct(productId))
    else dispatch(setProduct(products.find(product => product.id === parseInt(productId))))
  }, [])

  return <Layout>
    <div className='block'>
      <Drawer/>
      <GoBackBtn navigateBack={navigateBack}/>
      { Object.keys(basketProducts).length ? <div onClick={() => dispatch(toggleShowBasketItems())}>
        <BasketIcon />
      </div> : null }
      <div className='w-5/12 mx-auto'>
        { isLoading && <Loader />}
        { error && <h1>{ error }</h1> }
        { isSuccess || product ? <>
          <BlockWrapper>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
              { product?.images.map(src => <SwiperSlide key={src}>
                <img src={src} className='object-cover h-[350px] mx-auto' alt='image'/>
              </SwiperSlide>) }
            </Swiper>
          </BlockWrapper>
          <BlockWrapper  className='my-4'>
            <div className='flex justify-between'>
              <Heading1 title={`${product?.title}`} light={true} />
              <Heading1 title={`$${product?.price}`} />
            </div>
            <p className="mb-8 text-gray-500 dark:text-gray-400">{ product?.description }</p>

            <div className='flex justify-center'>
              { !basketProducts.hasOwnProperty(product.title) ?
                  <button
                      onClick={() => handleProductIncrease(product)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to Basket</button> :
                  <div className='flex items-center'>
                    <RemoveIcon onClick={() => handleProductDecrease(product.title)} />
                    <span className='mx-4 text-lg'>{ basketProducts[product.title]?.length }</span>
                    <AddIcon onClick={() => handleProductIncreaseByTitle(product.title)} />
                  </div>
              }
            </div>
          </BlockWrapper>
        </> : null }
      </div>
    </div>
  </Layout>;
};
