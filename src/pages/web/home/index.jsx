import {useEffect, useState} from "react";
import Layout from "../../../components/web/layout";
import Helmet from "../../../components/common/helmet";
import ProductCard from "../../../components/web/product-card";
import {Grid} from "@mui/material";
import {productSample} from "../../../constant/ProductSample";
import SidebarCategory from "../../../components/web/sidebar-category";
import Pagination from "../../../components/web/pagination";
import {publicRequest} from "../../../util/request-method";

function Home() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pageable, setPageable] = useState();

    useEffect(() => {
        publicRequest().get(`/products?page=${page}`)
            .then(res => {
                setPageable({
                    totalPages: res.data.totalPages,
                    currentPage: res.data?.pageable?.pageNumber
                })
                setItems(res.data.content)
            })
    }, [page])

    return (
        <Helmet title="Depot - Trang chủ">
            <Layout>
                <div className="bg-app-1 py-10">
                    <div className="container">
                        <Grid container spacing={2}>
                            <Grid item xs={2.2}> <SidebarCategory/> </Grid>
                            <Grid item xs={12 - 2.2}>
                                <Grid container spacing={2}>
                                    {items?.map((item, index) => (
                                        <Grid item xl={12 / 5} md={12 / 4} xs={12 / 2} key={index}>
                                            <ProductCard item={item}/>
                                        </Grid>))}
                                </Grid>
                                <div className="flex items-center justify-center w-full mt-10">
                                    <Pagination currentPage={pageable?.currentPage} totalPages={pageable?.totalPages}
                                                handleChangePage={setPage}/>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}


export default Home;
