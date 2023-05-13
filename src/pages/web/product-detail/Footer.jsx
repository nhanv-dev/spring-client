import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {formatCurrency} from "../../../util/format";
import {Link} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons";
import ImageNotFound from "../../../assets/images/image-not-found.jpg";

function Footer({product}) {
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const onScroll = (e) => {
            setScrollTop(e.target.documentElement.scrollTop);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop])

    return (
        <>
            {product &&
                <div
                    className={`bg-white fixed bottom-[0] py-2 z-50 left-0 right-0 overflow-hidden ${scrollTop >= 100 ? '' : 'hidden'}`}
                    style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
                    <div className="container relative flex items-center justify-between gap-6">
                        <div className="flex-1 flex items-center gap-8">
                            <div className="relative flex items-start min-w-[400px] justify-start gap-3">
                                <div style={{backgroundImage: `url(${product.images[0]?.url || ImageNotFound})`}}
                                     className="border min-w-[65px] min-h-[65px] overflow-hidden rounded-md border-border-1 bg-origin-content bg-center bg-cover bg-no-repeat">
                                </div>
                                <div className="">
                                    <p className="text-ellipsis font-medium line-clamp-1 overflow-hidden text-tiny leading-6">
                                        {product.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-start min-h-[65px] min-w-max">
                            <div className="font-medium text-base text-black-2 leading-6">Tạm tính</div>
                            <div className="font-semibold text-lg text-danger">
                                {formatCurrency(300000)}
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <Link to={`/cua-hang/${product?.shop?.slug}/san-pham`}
                                  className="flex items-center justify-center min-w-max rounded-md w-[40px] h-[40px] p-3  bg-[#e7e8ea] text-[#3f4b53] hover:bg-[#F3F3F3] active:bg-[#e7e8ea] ">
                                <Icon.UilStore className="w-[20px] h-[20px] text-[#3f4b53]"/>
                            </Link>
                            <Link to="/gio-hang"
                                  className="flex items-center justify-center min-w-max rounded-md w-[40px] h-[40px] p-3 bg-[#e7e8ea] text-[#3f4b53] hover:bg-[#F3F3F3] active:bg-[#e7e8ea] ">
                                <Icon.UilShoppingBag className="w-[20px] h-[20px] text-[#3f4b53]"/>
                            </Link>
                            <button
                                className="flex rounded-md items-center justify-center flex-1 px-4 h-[40px] min-w-[400px] max-w-[400px] bg-primary text-white hover:bg-primary-hover active:bg-primary ">
                                <span className="font-bold text-md">Mua ngay</span>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Footer;