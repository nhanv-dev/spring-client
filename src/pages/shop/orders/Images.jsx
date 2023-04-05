import React, {useState, useRef} from 'react';
import * as Icon from "@iconscout/react-unicons";
import ImageNotFound from "../../../assets/images/image-not-found.jpg";

function Images({images}) {
    const [active, setActive] = useState(0);
    const imageRef = useRef(null);

    const scroll = (scrollOffset) => {
        imageRef.current.scrollLeft += scrollOffset;
    }

    return (
        <div className="w-full">
            <div className="mb-3 w-full">
                <div
                    className="group relative w-full h-[350px] overflow-hidden border border-border rounded-md flex items-center justify-center">
                    <div
                        style={{backgroundImage: `url(${(images && images[active]) ? images[active].url : ImageNotFound})`}}
                        className="h-full bg-cover bg-center w-full rounded-md relative "/>
                    <div className="absolute right-[10px] top-[10px] z-10">
                        <button
                            className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-primary-bg">
                            <Icon.UilExpandRight className="text-primary w-[18px] h-[18px]"/>
                        </button>
                    </div>
                </div>
            </div>
            {images.length > 0 ? (
                <div className="relative flex justify-center">
                    {images.length > 4 &&
                        <button onClick={() => scroll(-100)}
                                className="absolute left-[-16px] top-[50%] translate-y-[-50%] z-10 w-[32px] h-[32px] flex items-center justify-center rounded-full bg-primary-bg">
                            <Icon.UilAngleLeftB className="text-primary w-[18px] h-[18px]"/>
                        </button>
                    }
                    <div ref={imageRef}
                         className="scroll-smooth w-full flex gap-[10px] items-center justify-start w-full overflow-hidden">
                        {images?.map((image, index) => (
                            <div key={index} className={`${active===index? 'border-primary' : 'border-[transparent]'} border-2 relative rounded-md min-w-[64px] min-h-[64px] max-w-[64px] max-h-[64px] transition-all`}>
                                <button
                                    onClick={() => setActive(index)}
                                    style={{backgroundImage: `url(${image.url || ImageNotFound})`}}
                                    className={`rounded-md bg-cover bg-center overflow-hidden transition-all outline-none min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] bg-cover bg-center `}>
                                </button>
                            </div>
                        ))}
                    </div>
                    {images.length > 4 &&
                        <button onClick={() => scroll(160)}
                                className="absolute right-[-16px] top-[50%] translate-y-[-50%] z-10 w-[32px] h-[32px] flex items-center justify-center rounded-full bg-primary-bg">
                            <Icon.UilAngleRightB className="text-primary w-[18px] h-[18px]"/>
                        </button>
                    }
                </div>
            ) : (
                <div className="relative flex justify-center">
                    <div ref={imageRef}
                         className="scroll-smooth w-full flex gap-[10px] items-center justify-start w-full overflow-hidden">
                        <div className="relative">
                            <button
                                style={{backgroundImage: `url(${ImageNotFound})`}}
                                className={`bg-cover bg-center overflow-hidden transition-all outline-none min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] bg-cover bg-center rounded-md border-2 border-2 border-primary`}>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Images;