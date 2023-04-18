import {createContext, useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import TabProduct from "./TabProduct";
import TabDescription from "./TabDescription";
import TabOption from "./TabOption";
import {protectedRequest} from "../../../util/request-method";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import ToastCustom from "../../../components/common/toast-custom";

export const PayloadContext = createContext({});

function ProductCreating() {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [payload, setPayload] = useState({
        images: [],
        product: {},
        attributes: [],
        variants: [],
    });

    function formatVariants(variants) {
        return [...variants].map(v => {
            const attributeHash = v.options.map(o => o.name).join(" + ")
            const skuUser = v.options.map(o => o.name).join(" + ")
            const deal = {
                price: v.price,
                finalPrice: v.finalPrice,
                discountPercent: v.discountPercent,
            }
            return {
                deal, skuUser, attributeHash, options: v.options, quantity: v.quantity
            }
        })
    }

    function formatProduct(product) {
        const result = {...product};
        result.keywords = result.keywords.split(",").filter(k => !!k).join(",");
        return {...result, orderCount: 0, isDeleted: false};
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            ...formatProduct(payload.product),
            images: [...payload.images].filter(image => !!image.url),
            attributes: [...payload.attributes],
            variants: formatVariants(payload.variants),
        }
        protectedRequest().post("/shops/products", data)
            .then(res => {
                toast.success('Đăng bán sản phẩm thành công');
                setTimeout(() => {
                    toast.dismiss();
                    navigate("/kenh-ban-hang/san-pham");
                }, 1000)
            })
            .catch(err => {
                toast.error('Đăng bán sản phẩm thất bại');
            })
    }

    return (
        <Helmet title="Depot - Đăng bán sản phẩm">
            <Layout>
                <ToastCustom/>
                <PayloadContext.Provider value={{payload, setPayload}}>
                    <Box className="rounded-md bg-white shadow-md mb-6">
                        <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}
                              sx={{
                                  '.Mui-selected': {
                                      color: '#1976d2',
                                      background: '#0060ff1f',
                                  },
                                  'button': {
                                      color: "#38383d",
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
                </PayloadContext.Provider>
            </Layout>
        </Helmet>
    );
}


function TabPanel(props) {
    const {children, value, index} = props;

    return (
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