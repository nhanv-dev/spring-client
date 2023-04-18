import {createContext, useEffect, useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import TabProduct from "./TabProduct";
import TabDescription from "./TabDescription";
import TabOption from "./TabOption";
import {protectedRequest} from "../../../util/request-method";
import {toast} from "react-hot-toast";
import {Link, useNavigate, useParams} from "react-router-dom";
import {UilArrowLeft, UilArrowRight} from "@iconscout/react-unicons";
import {Loader} from "../../../router/Router";
import ToastCustom from "../../../components/common/toast-custom";

export const PayloadContext = createContext({});

function ProductUpdating() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [payload, setPayload] = useState({});

    useEffect(() => {
        protectedRequest().get(`/shops/products/${id}`)
            .then(res => {
                const images = [...res.data.images];
                const product = {...res.data};
                const attributes = res.data?.attributes?.map(a => ({...a, attributeId: a.id}));
                const variants = res.data?.variants?.map(v => ({...v, ...v.deal, indexing: v.id}));
                setPayload({images, product, attributes, variants})
            })
    }, [id])

    function formatVariants(variants) {
        if (!variants) return null;
        return [...variants].map(v => {
            const attributeHash = v.options.map(o => o.name).join(" + ")
            const deal = {
                price: v.price,
                finalPrice: v.finalPrice,
                discountPercent: v.discountPercent,
            }
            return {
                deal, attributeHash, options: v.options, quantity: v.quantity
            }
        })
    }

    function formatProduct(product) {
        const result = {...product};
        result.keywords = result.keywords.split(",").filter(k => !!k).join(",");
        return {...result};
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            ...formatProduct(payload.product),
            images: [...payload.images].filter(image => !!image.url),
            attributes: payload.attributes,
            variants: formatVariants(payload.variants),
        }
        console.log(data)
        protectedRequest().put(`/shops/products/${data.id}`, data)
            .then(res => {
                toast.success('Cập nhật sản phẩm thành công');
                setTimeout(() => {
                    toast.dismiss();
                    navigate("/kenh-ban-hang/san-pham");
                }, 1000)
            })
            .catch(err => {
                toast.error('Cập nhật sản phẩm thất bại');
            })
    }

    if (!payload?.product?.id) {
        return (<Loader/>)
    }
    return (
        <Helmet title="Depot - Cập nhật sản phẩm">
            <Layout>
                <ToastCustom/>
                <div className="mb-3 flex justify-between items-center gap-3">
                    <button onClick={() => navigate(-1)}
                            className="font-semibold text-md flex items-center gap-1 justify-start transition-all hover:text-primary text-black">
                        <UilArrowLeft className="w-[20px] h-[20px]"/>
                        Quay lại
                    </button>
                    <Link to={`/san-pham/${payload?.product?.slug}`} target="_blank"
                          className="font-semibold text-md flex items-center gap-1 justify-start transition-all hover:text-primary text-black">
                        Xem sản phẩm
                        <UilArrowRight className="w-[20px] h-[20px]"/>
                    </Link>
                </div>
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

export default ProductUpdating;