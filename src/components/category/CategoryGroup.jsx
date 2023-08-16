import {Heading5} from "../headings/Heading5.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCategories} from "../../store/reducers/ActionCreator.js";
import {CategoryItem} from "./CategoryItem.jsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';

export const CategoryGroup = () => {
    const dispatch = useDispatch();
    const { categories, isLoading, error } = useSelector(state => state.categoryReducer);

    useEffect(() => {
        if (!categories.length) dispatch(fetchCategories())
    }, [])

    return <>
        <Heading5 title='Categories' />
        <div className='flex flex-wrap gap-2'>
            { isLoading && <h1>Loading...</h1> }
            { error && <h1>{ error }</h1> }
            <Swiper
                slidesPerView={10}
                spaceBetween={5}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper"
            >
                { categories && (isLoading === false) &&  <SwiperSlide className={'!w-fit'}><CategoryItem name={'all'}/></SwiperSlide>}
                { categories.map(category => <SwiperSlide key={category}  className={'!w-fit'}><CategoryItem name={category}/></SwiperSlide>) }
            </Swiper>
        </div>
    </>
}