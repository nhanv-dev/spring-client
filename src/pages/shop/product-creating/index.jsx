import {createContext, useEffect, useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import TabProduct from "./TabProduct";
import TabDescription from "./TabDescription";
import TabOption from "./TabOption";
import TabDiscount from "./TabDiscount";
import {protectedRequest} from "../../../util/request-method";

export const PayloadContext = createContext({});

function ProductCreating() {
    const [value, setValue] = useState(0);
    const [payload, setPayload] = useState({
        images: [],
        product: {},
        attributes: [],
        variants: [],
    });

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            ...payload.product, orderCount: 0,
            images: [...payload.images].filter(image => !!image.url),
            discount: {
                price: payload.product.price,
                finalPrice: payload.product.finalPrice,
                discountPercent: payload.product.discountPercent,
            },
        }
        console.log(data)
        protectedRequest().post("/products", data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Helmet title="Depot - Đăng bán sản phẩm">
            <Layout>
                <PayloadContext.Provider value={{payload, setPayload}}>
                    <Box className="rounded-md bg-white shadow-md mb-6">
                        <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}
                              sx={{
                                  '.Mui-selected': {
                                      color: '#1976d2',
                                      background: '#0060ff1f',
                                  },
                                  'button': {
                                      fontWeight: '600',
                                      fontSize: '.85rem',
                                      textTransform: 'none',
                                      borderRadius: '0.375rem 0.375rem 0 0',
                                      padding: '8px 24px',
                                      letterSpacing: 'normal',
                                  }
                              }}>
                            <Tab label="Thông tin chung" {...allProps(0)}/>
                            <Tab label="Mô tả & Chi tiết sản phẩm" {...allProps(1)} />
                            <Tab label="Tùy chọn sản phẩm" {...allProps(2)} />
                            <Tab label="Giảm giá" {...allProps(3)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0} component="div">
                        <TabProduct handleSubmit={handleSubmit}/>
                    </TabPanel>
                    <TabPanel value={value} index={1} component="div">
                        <TabDescription/>
                    </TabPanel>
                    <TabPanel value={value} index={2} component="div">
                        <TabOption/>
                    </TabPanel>
                    <TabPanel value={value} index={3} component="div">
                        <TabDiscount/>
                    </TabPanel>
                </PayloadContext.Provider>
            </Layout>
        </Helmet>
    );
}


function TabPanel(props) {
    const {children, value, index} = props;

    return (
        // eslint-disable-next-line jsx-a11y/aria-role
        <div role="tab-panel"
             hidden={value !== index}
             id={`simple-tab-panel-${index}`}
             aria-labelledby={`simple-tab-${index}`}>
            {value === index && (
                <Typography component={"div"}>{children}</Typography>
            )}
        </div>
    );
}

function
allProps(index) {
    return {id: `simple-tab-${index}`, 'aria-controls': `simple-tab-panel-${index}`};
}

export default ProductCreating;