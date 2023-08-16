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

export const Product = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.productReducer);
  const { product, isLoading, error } = useSelector(state => state.singleProductReducer);
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const navigateBack = () =>  navigate(-1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (!products.length) dispatch(fetchProduct(productId))
    else dispatch(setProduct(products.find(product => product.id === parseInt(productId))))
  }, [])

  return <Layout>
    <div className='block'>
      <GoBackBtn navigateBack={navigateBack}/>
      <div className='w-5/12 mx-auto'>
        <BlockWrapper className='mb-4'>
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
        <BlockWrapper>
          <div className='flex justify-between'>
            <Heading1 title={`${product?.title}`} light={true} />
            <Heading1 title={`$${product?.price}`} />
          </div>
          <p className="mb-3 text-gray-500 dark:text-gray-400">{ product?.description }</p>
        </BlockWrapper>
      </div>
    </div>
  </Layout>;
};
