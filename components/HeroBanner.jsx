import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BiArrowBack } from "react-icons/bi";

const HeroBanner = () => {
    return (
        <div className="relative text-white text-[20px] w-full max-w-7xl mx-auto">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                renderArrowPrev={() => (
                    <div className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90">
                        <BiArrowBack className="text-sm md:text-lg" />
                    </div>
                )}
                renderArrowNext={(clickhandler, hasPrev) => (
                    <div onClick={clickhandler} className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90">
                        <BiArrowBack className="text-sm md:text-lg rotate-180" />
                    </div>
                )}
            >
                {CarouselData.map((item) => (
                    <div key={item?.id}>
                        <img src={item?.banner} className="aspect-[16/10] md:aspect-auto object-cover" />

                        <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/90 text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">Shop Now</div>
                    </div>))}
            </Carousel>
        </div>
    );
};

export default HeroBanner;


const CarouselData = [
    {
        id: 11,
        banner: "/slide-1.png"
    },
    {
        id: 12,
        banner: "/slide-2.png"
    },
    {
        id: 13,
        banner: "/slide-3.png"
    },
]