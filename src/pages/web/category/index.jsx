import {useEffect, useRef, useState} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import Layout from "../../../components/web/layout";
import Helmet from "../../../components/common/helmet";
import ProductCard from "../../../components/web/product-card";
import SidebarCategory from "../../../components/web/sidebar-category";
import {publicRequest} from "../../../util/request-method";
import CustomPagination from "../../../components/web/custom-pagination";
import {Grid} from "@mui/material";
import {UilAngleLeft, UilAngleRight, UilAngleRightB, UilPlusCircle} from "@iconscout/react-unicons";
import productService from "../../../service/ProductService";
import categoryService from "../../../service/CategoryService";


function Category() {
    const {slug} = useParams();
    const [queryParameters] = useSearchParams();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(parseInt(queryParameters.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState({});
    const [activeCategory, setActiveCategory] = useState({});
    const [filterSections] = useState([
        {title: 'Phổ biến'},
        {title: 'Bán chạy'},
        {title: 'Hàng mới'},
        {title: 'Giá thấp đến cao'},
        {title: 'Giá cao đến thấp'},
    ]);
    const [activeFilter, setActiveFilter] = useState(0);
    const categoryRef = useRef();
    const [scrollCate, setScrollCate] = useState(0);
    const [maxScrollCate, setMaxScrollCate] = useState();

    useEffect(() => {
        categoryService.getCategoryBySlug({slug})
            .then(res => {
                setCategory(res.data)
                setActiveCategory(() => {
                    if (res.data.slug === slug)
                        return {...res.data}
                    return res.data.subCategories.filter(i => i.slug === slug)[0]
                })
            })
    }, [slug])

    useEffect(() => {
        productService.getProductByCategorySlug({page, slugCategory: slug})
            .then(res => {
                setItems(res.data.content)
                setTotalPages(res.data.totalPages)
                window.scrollTo(0, 0);
            })
    }, [page, slug])

    useEffect(() => {
        setMaxScrollCate(categoryRef?.current?.clientWidth)
    }, [slug, categoryRef])

    function scrollCategory(scrollOffset) {
        const scroll = categoryRef.current.scrollLeft + scrollOffset;
        if (scroll + scrollOffset >= maxScrollCate)
            setScrollCate(maxScrollCate);
        else
            setScrollCate(scroll);
        categoryRef.current.scrollLeft = scroll
    }

    return (
        <Helmet title={`Depot - ${activeCategory?.title || 'Danh mục'}`}>
            <Layout>
                <div className="bg-app-1 py-6">
                    <div className="container">
                        <Grid container spacing={2}>
                            <Grid item xs={2.2}><SidebarCategory/></Grid>
                            <Grid item xs={12 - 2.2}>
                                <div className="mb-5 p-5 pb-3.5 shadow bg-white rounded-md">
                                    <div className="mb-3">
                                        <div
                                            className="text-sm mb-2 font-medium text-black-2 flex items-center justify-start gap-2">
                                            <Link to={"/trang-chu"}
                                                  className="hover:text-primary text-black-2 transition-all">
                                                Trang Chủ
                                            </Link>
                                            {activeCategory &&
                                                <>
                                                    {activeCategory.subCategories?.length > 0 ?
                                                        <>
                                                            <UilAngleRightB className={"w-[16px] h-[16px]"}/>
                                                            <Link to={`/danh-muc/${activeCategory.slug}`}
                                                                  className="hover:text-primary text-black-2 transition-all">
                                                                {activeCategory.title}
                                                            </Link>
                                                        </> :
                                                        <>
                                                            <UilAngleRightB className={"w-[16px] h-[16px]"}/>
                                                            <Link to={`/danh-muc/${category.slug}`}
                                                                  className="hover:text-primary text-black-2 transition-all">
                                                                {category.title}
                                                            </Link>
                                                            <UilAngleRightB className={"w-[16px] h-[16px]"}/>
                                                            <Link to={`/danh-muc/${activeCategory.slug}`}
                                                                  className="hover:text-primary text-black-2 transition-all">
                                                                {activeCategory.title}
                                                            </Link>
                                                        </>
                                                    }
                                                </>
                                            }
                                        </div>
                                        <div>
                                            <span className="font-medium text-base">{activeCategory.title} </span>
                                            <span className="font-medium text-md text-gray">
                                                (Tìm thấy <span
                                                className="font-semibold text-red text-base">
                                                    {items.length}
                                                </span> sản phẩm)
                                            </span>
                                        </div>
                                    </div>
                                    {category && (
                                        <div className="relative w-full bg-white mb-3">
                                            {scrollCate > 0 &&
                                                <div
                                                    className={`absolute left-0 top-0 bottom-0 flex items-center justify-center w-[60px]`}
                                                    style={{
                                                        background: 'linear-gradient(to left, rgba(255,255,255,0.7) 50%, #fff 75%)'
                                                    }}>
                                                    <button onClick={() => scrollCategory(-200)}
                                                            className={` p-1.5 bg-primary-bg border-none outline-none text-primary rounded-full`}>
                                                        <UilAngleLeft className={"w-[18px] h-[18px]"}/>
                                                    </button>
                                                </div>
                                            }
                                            {scrollCate < maxScrollCate &&
                                                <div
                                                    className={`absolute right-0 top-0 bottom-0 flex items-center justify-center w-[60px]`}
                                                    style={{
                                                        background: 'linear-gradient(to left, #fff 50%, rgba(255,255,255,0.7) 75%)'
                                                    }}>
                                                    <button onClick={() => scrollCategory(200)}
                                                            className={`p-1.5 bg-primary-bg border-none outline-none text-primary rounded-full`}>
                                                        <UilAngleRight className={"w-[18px] h-[18px]"}/>
                                                    </button>
                                                </div>
                                            }
                                            <div ref={categoryRef} className="scroll-smooth overflow-hidden">
                                                <div className="flex gap-3 items-center">
                                                    <Link to={`/danh-muc/${category?.slug}`}
                                                          className={`${slug === category.slug ? "bg-primary-bg text-primary" : "bg-[#e7e8ea] text-black-1 border-[#e7e8ea] hover:text-primary"} border-2 block min-w-max py-1.5 px-4 rounded-md font-semibold text-sm transition-all`}>
                                                        {category?.title}
                                                    </Link>
                                                    {category?.subCategories?.map(sub => (
                                                        <Link to={`/danh-muc/${sub.slug}`} key={sub.id}
                                                              className={`${slug === sub.slug ? "bg-primary-bg text-primary" : "bg-[#e7e8ea] text-black-1 border-[#e7e8ea] hover:text-primary"} border-2 block min-w-max py-1.5 px-4 rounded-md font-semibold text-sm transition-all`}>
                                                            {sub.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className="border-t border-t-border flex items-center gap-6 justify-between mb-2 pt-3">
                                        <div className="flex items-center justify-start gap-x-8">
                                            {filterSections.map((filter, i) => (
                                                <button type={"button"} key={i} onClick={() => {
                                                    setActiveFilter(i)
                                                }}
                                                        className={`${i === activeFilter ? 'text-primary font-semibold after:opacity-100' : 'text-black-1 font-medium after:opacity-0'} after:transition-all after:absolute after:bottom-[-5px] after:left-[50%] after:translate-x-[-50%] after:w-[30%] after:h-[4px] after:bg-primary after:rounded-full relative text-md transition-all`}>
                                                    {filter.title}
                                                </button>
                                            ))}
                                        </div>
                                        <div>

                                        </div>
                                    </div>

                                </div>
                                {items.length > 0 ?
                                    <>
                                        <Grid container spacing={2}>
                                            {items?.map((item, index) => (
                                                <Grid item xl={12 / 5} md={12 / 4} xs={12 / 2} key={index}
                                                      className="min-h-full">
                                                    <ProductCard item={item}/>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        {(parseInt(totalPages) && parseInt(page)) &&
                                            <div className="flex items-center justify-center w-full mt-10">
                                                <CustomPagination
                                                    count={parseInt(totalPages)}
                                                    page={parseInt(page)}
                                                    handleChange={setPage}/>
                                            </div>
                                        }
                                    </> :
                                    <div className="mt-[120px] flex items-center justify-center">
                                        <div
                                            className="flex items-center justify-center bg-app-2 rounded-full p-8 w-[300px] h-[300px]">
                                            <img alt="product empty"
                                                 className="h-full rounded-full"
                                                 src="https://th.bing.com/th/id/R.9bcb4cee4917034baeb52743304a0f63?rik=%2bsFtfJsfzeV%2fpA&riu=http%3a%2f%2fwww.swadeshimart.in%2fimages%2fno-products-found.png&ehk=ah%2fEy80CotuZzqnYuPTXhz8mgmFfiKPEV7MThdqxzok%3d&risl=&pid=ImgRaw&r=0"
                                            />
                                        </div>
                                    </div>
                                }
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Layout>
        </Helmet>
    )
        ;
}


export default Category;
