import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import Layout from "../../../components/web/layout";
import Helmet from "../../../components/common/helmet";
import ProductCard from "../../../components/web/product-card";
import {publicRequest} from "../../../util/request-method";
import CustomPagination from "../../../components/web/custom-pagination";
import {Grid} from "@mui/material";

function Home() {
    const [queryParameters] = useSearchParams();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(parseInt(queryParameters.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        publicRequest().get(`/products?page=${page}`)
            .then(res => {
                setItems(res.data.content)
                setTotalPages(res.data.totalPages)
                window.scrollTo(0, 0);
            })
    }, [page])

    return (
        <Helmet title="Depot - Trang chủ">
            <Layout>
                <div className="bg-app-1 py-10">
                    {items.length > 0 &&
                        <div className="container">
                            <Grid container spacing={2}>
                                {items?.map((item, index) => (
                                    <Grid item xl={12 / 6} md={12 / 4} xs={12 / 2} key={index}
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
