import {useEffect, useState} from "react";
import Layout from "../../components/web/layout";
import Helmet from "../../components/common/helmet";
import {Container, Grid} from "@mui/material";
import ProductCard from "../../components/web/product-card/ProductCard";
import {productSample} from "../../constant/ProductSample";


function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems([
            productSample, productSample, productSample, productSample,
            productSample, productSample, productSample, productSample,
        ])
    }, [])

    return (
        <Helmet title="Shopio - Trang chủ">
            <Layout>
                <div className="bg-background-1 py-10">
                    <div className="container">
                        <Grid container spacing={2}>
                            {items?.map((item, index) => (
                                <Grid item xs={2} key={index}>
                                    <ProductCard item={item}/>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}


export default Home;
