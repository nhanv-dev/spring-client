import {createContext, useEffect, useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import TabProduct from "./TabProduct";
import TabDescription from "./TabDescription";
import TabOption from "./TabOption";
import {protectedRequest} from "../../../util/request-method";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {UilArrowLeft} from "@iconscout/react-unicons";
import {Loader} from "../../../router/Router";

export const PayloadContext = createContext({});

function ProductUpdating() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [payload, setPayload] = useState({});
    useEffect(() => {
        protectedRequest().get(`/products/${id}`)
            .then(res => {
                console.log(res)
                setPayload({
                    images: [...res.data.images],
                    product: {...res.data},
                    attributes: [...res.data.attributes].map(a => ({...a, attributeId: a.id})),
                    variants: [...res.data.variants].map(v => ({...v, ...v.deal, indexing: v.id})),
                })
            })
    }, [id])

    function formatVariants(variants) {
        return [...variants].map(v => {
            const attributeHash = v.options.map(o => o.name).join("_")
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
        if (payload.variants?.length > 0) {
            result.deal = {
                price: payload.variants[0].price,
                finalPrice: payload.variants[0].finalPrice,
                discountPercent: payload.variants[0].discountPercent
            }
        } else {
            result.deal = {
                price: product.price,
                finalPrice: product.finalPrice,
                discountPercent: product.discountPercent
            }
        }
        return {...result, orderCount: 0};
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
                toast.success('Cập nhật sản phẩm thành công', {
                    position: "top-right",
                    autoClose: 800,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate("/kenh-ban-hang/san-pham")
                }, 1400)
            })
            .catch(err => {
                console.log(err)
                toast.error('Đăng bán sản phẩm thất bại', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }

    if (!payload?.product?.id) {
        return (<Loader/>)
    }
    return (
        <Helmet title="Depot - Cập nhật sản phẩm">
            <Layout>
                <ToastContainer className="font-medium text-md"/>
                <div className="mb-3">
                    <button onClick={() => navigate(-1)}
                            className="font-medium text-base flex items-center gap-1 justify-start transition-all hover:text-primary text-black">
                        <UilArrowLeft className="w-[20px] h-[20px]"/>
                        Quay lại
                    </button>
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