import {useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import Layout from "../../../components/web/layout";
import Helmet from "../../../components/common/helmet";
import ProductCard from "../../../components/web/product-card";
import SidebarCategory from "../../../components/web/sidebar-category";
import {Grid, Pagination} from "@mui/material";
import productService from "../../../service/ProductService";
import shopService from "../../../service/ShopService";
import ShopCard from "../../../components/web/shop-card";
import {UilAngleRight} from "@iconscout/react-unicons";

const TYPE_ALL = 'tat-ca'
const TYPE_PRODUCT = 'san-pham'
const TYPE_SHOP = 'cua-hang'

function Searching() {
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const containerRef = useRef();

    useEffect(() => {
        setSearch(searchParams.get("s"))
        setType(searchParams.get("t"))
        const top = containerRef.current.offsetTop;
        window.scrollTo(0, top);
    }, [searchParams])

    return (
        <Helmet title={`Depot - ${search || 'Danh mục'}`}>
            <Layout>
                <div className="bg-app-1 py-10">
                    <div className="container">
                        <Grid container spacing={2}>
                            <Grid item xs={2.2}><SidebarCategory/></Grid>
                            <Grid item xs={12 - 2.2} ref={containerRef}>
                                {(type === TYPE_ALL || type === TYPE_SHOP) &&
                                    <SearchingShop search={search} type={type}/>
                                }
                                {(type === TYPE_ALL || type === TYPE_PRODUCT) &&
                                    <SearchingProduct search={search}/>
                                }
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

const SearchingShop = ({type, search}) => {
    const [searchParams] = useSearchParams();
    const [shops, setShops] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);

    useEffect(() => {
        if (!search) return;
        const currentPage = type === TYPE_SHOP ? page : 1;
        shopService.searchShop({page: currentPage - 1, size: 5, search})
            .then(res => {
                setShops(res.data.content);
                setPagination({
                    size: res.data.size,
                    page: res.data.number,
                    numberOfElements: res.data.numberOfElements,
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages,
                    loaded: true
                })
            })
            .catch(err => {
                setShops([]);
                setPagination(null);
            })
    }, [page, search])

    return (
        <div className="mb-8">
            <div className="mb-4 flex items-end gap-5 justify-between">
                <div className=" font-medium text-base">
                    <p className={"inline"}>Shop liên quan đến '{search}' </p>
                    <div className="inline font-medium text-md text-gray">
                        (Tìm thấy <p
                        className="inline font-semibold text-red text-base">{pagination?.totalElements || 0}</p> kết
                        quả)
                    </div>
                </div>
                <Link to={`/tim-kiem?s=${search}&t=cua-hang`}
                      className={"flex items-center gap-2text-black-2 font-medium text-md hover:text-primary transition-all"}>
                    Thêm kết quả
                    <UilAngleRight/>
                </Link>
            </div>
            {shops.map(shop => (
                <div key={shop.id} className="mb-4">
                    <ShopCard shop={shop}/>
                </div>
            ))}
            {(pagination && type === TYPE_SHOP) &&
                <div className="flex items-center justify-center w-full mt-10">
                    <CustomPagination
                        count={parseInt(pagination.totalPages)}
                        page={parseInt(pagination.page + 1)}
                        handleChange={setPage}/>
                </div>
            }
        </div>
    )
}

const SearchingProduct = ({search}) => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [filterSections] = useState([
        {title: 'Phổ biến'},
        {title: 'Bán chạy'},
        {title: 'Hàng mới'},
        {title: 'Giá thấp đến cao'},
        {title: 'Giá cao đến thấp'},
    ]);
    const [activeFilter, setActiveFilter] = useState(0);
    const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);

    useEffect(() => {
        if (!search) return;
        productService.searchProduct({page: page - 1, size: 30, search})
            .then(res => {
                setProducts(res.data.content);
                setPagination({
                    size: res.data.size,
                    page: res.data.number,
                    numberOfElements: res.data.numberOfElements,
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages,
                    loaded: true
                })
            })
            .catch(err => {
                setProducts([]);
                setPagination(null);
            })
    }, [page, search])

    return (
        <div>
            <div className="mb-4 font-medium text-base">
                <p className={"inline"}>Kết quả tìm kiếm cho từ khoá '{search}' </p>
                <div className="inline font-medium text-md text-gray">
                    (Tìm thấy <div
                    className="inline font-semibold text-red text-base">{pagination?.totalElements || 0}</div> sản phẩm)
                </div>
            </div>
            <div className="mb-5 p-5 pb-3.5 shadow bg-white rounded-md">
                <div className="flex items-center gap-6 justify-between mb-2">
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
                </div>

            </div>
            {products.length <= 0 && <ProductNotFound/>}
            {products.length > 0 &&
                <div>
                    <Grid container spacing={2}>
                        {products?.map((item, index) => (
                            <Grid item lg={12 / 5} md={12 / 4} xs={12 / 2} key={index}
                                  className="min-h-full">
                                <ProductCard item={item}/>
                            </Grid>
                        ))}
                    </Grid>
                    {pagination &&
                        <div className="flex items-center justify-center w-full mt-10">
                            <CustomPagination
                                count={parseInt(pagination.totalPages)}
                                page={parseInt(pagination.page + 1)}
                                handleChange={setPage}/>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

const CustomPagination = ({count, page, handleChange}) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    return (
        <div>
            <Pagination count={count} page={page} onChange={(e, page) => {
                const search = searchParams.get("s");
                const type = searchParams.get("t");
                navigate(`${location.pathname}?s=${search}&t=${type}&page=${page}`)
                handleChange(page)
            }} color={"primary"} showFirstButton showLastButton/>
        </div>
    )
}
const ProductNotFound = () => {
    return (
        <div className="mt-[120px] flex items-center justify-center">
            <div
                className="flex items-center justify-center bg-app-2 rounded-full p-8 w-[300px] h-[300px]">
                <img alt="product empty"
                     className="h-full rounded-full"
                     src="https://th.bing.com/th/id/R.9bcb4cee4917034baeb52743304a0f63?rik=%2bsFtfJsfzeV%2fpA&riu=http%3a%2f%2fwww.swadeshimart.in%2fimages%2fno-products-found.png&ehk=ah%2fEy80CotuZzqnYuPTXhz8mgmFfiKPEV7MThdqxzok%3d&risl=&pid=ImgRaw&r=0"
                />
            </div>
        </div>
    )
}


export default Searching;
