import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Skeleton } from 'antd';
import AnimatedImageContainer
    from '@/components/ui/images/animated-image-container/animated-image-container.tsx';
import css from './prooduct-card-slider.module.scss';
import 'swiper/css';
import { cn } from '@/utils/react.helper.ts';


export interface IProductCardSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    images: string[];
    size: [ number, number ];
}

const ProductCardSlider: React.FC<IProductCardSliderProps> = (props) => {
    const { images, size, className } = props;

    return (
        <Swiper
            className={ cn(css.container, className) }
            slidesPerView={ 1 }
            spaceBetween={ 10 }
            pagination={ {
                clickable: true,
            } }
            grabCursor={ true }
            loop
            modules={ [ Pagination ] }
        >
            {
                images.length
                ? images.map((slide, index) =>
                    <SwiperSlide
                        className={ css.slide }
                        key={ index }>
                        <AnimatedImageContainer
                            src={ slide }
                            w={ size[0] }
                            h={ size[1] }
                            seconds={ 10 }
                        />
                    </SwiperSlide>,
                )
                : <Skeleton.Image active={ true }/>
            }
        </Swiper>
    )
        ;
};

export default React.memo(ProductCardSlider);