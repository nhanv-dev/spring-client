import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import Layout from "../../../components/web/layout";
import Helmet from "../../../components/common/helmet";
import ProductCard from "../../../components/web/product-card";
import CustomPagination from "../../../components/web/custom-pagination";
import {Grid} from "@mui/material";
import categoryService from "../../../service/CategoryService";
import {UilAngleRight} from "@iconscout/react-unicons";
import productService from "../../../service/ProductService";


function Home() {
    const [queryParameters] = useSearchParams();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(parseInt(queryParameters.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoryService.getCategory({page: 1, limit: 20, type: 'short'})
            .then(res => {
                setCategories(res.data.content)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        productService.getProduct({page: page - 1, size: 24})
            .then(res => {
                setItems(res.data.content)
                setTotalPages(res.data.totalPages)
            })
            .catch(err => {
                console.log(err)
                setItems([])
                setTotalPages(1)
            })
    }, [page])


    return (
        <Helmet title="Depot - Trang chủ">
            <Layout>
                <div className="bg-app-1 py-10">
                    {categories.length > 0 &&
                        <div className="container mb-10">
                            <div className="rounded-md p-5 bg-white">
                                <div className="mb-5 flex items-center justify-between gap-3">
                                    <h5 className="font-bold text-base text-black-1">
                                        Danh mục sản phẩm
                                    </h5>
                                    <Link to={'/danh-muc'}
                                          className="flex items-center justify-end gap-1 font-semibold text-md text-primary">
                                        Xem tất cả
                                        <UilAngleRight size={'24px'}/>
                                    </Link>
                                </div>
                                <Grid container spacing={0} className={"border-l border-b border-border-1"}>
                                    {categories?.map((category) => (
                                        <Grid item key={category.id} lg={12 / 10} md={12 / 4} xs={12 / 4}
                                              className="min-h-full">
                                            <Link to={`/danh-muc/${category.slug}`}
                                                  className="min-h-[120px] p-1 border-r border-t border-border-1 text-black-2 hover:text-primary transition-all h-full flex flex-col items-center justify-center">
                                                <div className="flex-1 flex items-center justify-center min-h-[80px]">
                                                    <img src={category.icon} alt={'icon category'}
                                                         className={"max-w-[45px] max-h-[45px] min-w-[45px] min-h-[45px]"}/>
                                                </div>
                                                <p className="font-semibold text-sm text-center flex-1">
                                                    {category.title}
                                                </p>
                                            </Link>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </div>
                    }
                    {items.length > 0 &&
                        <div className="container">
                            <div
                                className="p-3 rounded-t-md bg-white flex items-center justify-center w-full mb-4 border-b-4 border-b-primary">
                                <p className="font-bold text-primary text-lg capitalize">Gợi ý hôm nay</p>
                            </div>
                            <Grid container spacing={2}>
                                {items?.map((item, index) => (
                                    <Grid item lg={12 / 6} md={12 / 4} xs={12 / 2} key={index}
                                          className="min-h-full">
                                        <ProductCard item={item}/>
                                    </Grid>
                                ))}
                            </Grid>
                            <div className="flex items-center justify-center w-full mt-10">
                                {parseInt(totalPages) &&
                                    <CustomPagination count={parseInt(totalPages)}
                                                      page={parseInt(page)}
                                                      handleChange={setPage}/>
                                }
                            </div>
                        </div>
                    }
                </div>
            </Layout>
        </Helmet>
    );
}


export default Home;
