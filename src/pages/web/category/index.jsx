import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Helmet from "../../../components/common/helmet";
import Layout from "../../../components/web/layout";
import ProductCard from "../../../components/web/product-card";
import {publicRequest} from "../../../util/request-method";
import {Grid} from "@mui/material";
import Pagination from "../../../components/web/pagination";
import SidebarCategory from "../../../components/web/sidebar-category";

function Category() {
    const {slug} = useParams();
    const [category, setCategory] = useState(null);
    const [items, setItems] = useState([])

    useEffect(() => {
        publicRequest().get(`/category/${slug}`).then(response => {
            setCategory(response.data.category)
        })
    }, [slug])

    useEffect(() => {
        if (!category) return;
        publicRequest().get(`/products/all`)
            .then(res => {
                setItems(res.data)
            })
    }, [category])

    return (
        <Helmet title={`Depot - ${category?.name || 'Danh mục'}`}>
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

export default Category;