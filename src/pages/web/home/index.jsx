import {useEffect, useState} from "react";
import Layout from "../../../components/web/layout";
import {Link} from "react-router-dom";
import Helmet from "../../../components/common/helmet";
import ProductCard from "../../../components/web/product-card";
import {Grid} from "@mui/material";
import {productSample} from "../../../constant/ProductSample";
import * as Icon from "@iconscout/react-unicons";
import FilterSection, {
    FILTER_BY_COLOR, FILTER_BY_MATERIAL, FILTER_BY_PRICE, FILTER_BY_RATING, FILTER_BY_SERVICE, FILTER_BY_SIZE
} from "../../../components/web/filter-section";
import SidebarCategory from "../../../components/web/sidebar-category";
import Pagination from "../../../components/web/pagination";

function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems([productSample, productSample, productSample, productSample, productSample, productSample, productSample, productSample,])
    }, [])

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
                                    <Pagination currentPage={1} totalPage={5}/>
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
