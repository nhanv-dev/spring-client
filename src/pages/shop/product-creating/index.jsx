import {useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import Images from "./Images";
import {formatCurrency, formatLongDate} from "../../../util/format";
import Editor from "./Editor";
import * as Icon from "@iconscout/react-unicons";
import ModalCategory from "./ModalCategory";
import ProductVariants from "./ProductVariants";
import ProductAttributes from "./ProductAttributes";
import {Box, Tab, Tabs, Typography} from "@mui/material";

function ProductCreating() {
    const [images, setImages] = useState([]);
    const [product, setProduct] = useState({});
    const [attributes, setAttributes] = useState([]);
    const [variants, setVariants] = useState([])
    const [showCategory, setShowCategory] = useState(false);
    const [showSubCategory, setShowSubCategory] = useState(false);
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();
    const [value, setValue] = useState(0);
    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            product: product,
            attributes: attributes,
            variants: variants,
        }
        console.log(payload)
    }

    return (
        <Helmet title="Depot - Đăng bán sản phẩm">
            <Layout>
                <Box sx={{
                    background: 'white',
                    borderRadius: '.375rem',
                    overflow: 'hidden'
                }}>
                    <Tabs value={value} onChange={handleChangeTabs}
                          sx={{
                              '.Mui-selected': {
                                  fontWeight: '500'
                              }
                          }}>
                        <Tab label="Thông tin" {...allProps(0)} />
                        <Tab label="Mô tả" {...allProps(1)} />
                        <Tab label="Tùy chọn" {...allProps(2)} />
                        <Tab label="Tùy chọn" {...allProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0} component="div">
                    <div className="flex flex-wrap gap-6">
                        <div className="w-4/12 min-h-full">
                            <div className="h-full rounded-md bg-white p-5 shadow-md">
                                <Images images={images} setImages={setImages}/>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="rounded-md bg-white p-5 shadow-md">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center">
                                        <h5 className="font-bold text-base">
                                            Thông tin sản phẩm
                                        </h5>
                                    </div>
                                    {
                                        product.updatedAt &&
                                        <p className="font-medium text-tiny text-[#6f787e]">
                                            Cập nhật lần cuối: {formatLongDate(product.updatedAt)}
                                        </p>
                                    }
                                </div>
                                <div className="mb-5">
                                    <p className="mb-2 text-md font-semibold">Tên sản phẩm</p>
                                    <div className="shadow-md bg-white w-full mb-4 rounded-md p-3">
                                        <input type="text" value={product?.name} placeholder="Tên sản phẩm"
                                               onChange={(e) => setProduct(prev => ({
                                                   ...prev,
                                                   name: e.target.value
                                               }))}
                                               className="text-black-1 font-medium text-md w-full outline-none"/>
                                    </div>
                                </div>
                                <div className="mb-7">
                                    <ModalCategory category={category}
                                                   setCategory={setCategory}
                                                   subCategory={subCategory}
                                                   setSubCategory={setSubCategory}
                                                   showCategory={showCategory}
                                                   showSubCategory={showSubCategory}
                                                   setShowCategory={setShowCategory}
                                                   setShowSubCategory={setShowSubCategory}/>
                                    <p className="mb-2 text-md font-semibold">Loại sản phẩm</p>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setShowCategory(true)}
                                                className="flex items-center justify-between gap-3 min-w-max max-w-[300px] shadow-md bg-white rounded-md p-3">
                                            <p className="flex-1 text-black-1 font-medium text-md w-full outline-none">
                                                {category?.title || 'Chọn loại sản phẩm'}
                                            </p>
                                            <Icon.UilEditAlt
                                                className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                        </button>
                                        <Icon.UilAngleRightB
                                            className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                        <button onClick={() => setShowSubCategory(true)}
                                                className="flex items-center justify-between gap-3 min-w-max max-w-[300px] shadow-md bg-white rounded-md p-3">
                                            <p className="flex-1 text-black-1 font-medium text-md w-full outline-none">
                                                {subCategory?.title || 'Chọn loại sản phẩm'}
                                            </p>
                                            <Icon.UilEditAlt
                                                className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full p-5 bg-app-1 rounded-md mb-5">
                                    <div className="w-full">
                                        <h5 className="mb-1 font-semibold text-md">
                                            Tùy chỉnh giá & số lượng sản phẩm</h5>
                                        <p className="mb-2 font-medium text-sm text-black-1">
                                            * Tổng số lượng sản phẩm của các option sản phẩm khác nhau.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <div className="basis-2/12">
                                            <p className="mb-2 text-md font-semibold">Số lượng</p>
                                            <div className="shadow-md bg-white w-full rounded-md p-3">
                                                <input type="number" value={product?.quantity}
                                                       onChange={(e) => setProduct((prev) => ({
                                                           ...prev, quantity: e.target.value
                                                       }))}
                                                       className="text-black-1 font-medium text-md w-full outline-none"/>
                                            </div>
                                        </div>
                                        <div className="basis-3/12">
                                            <p className="mb-2 text-md font-semibold">Giá gốc</p>
                                            <div className="shadow-md bg-white w-full rounded-md p-3">
                                                <input type="number" value={product?.price}
                                                       onChange={(e) => setProduct((prev) => ({
                                                           ...prev, price: e.target.value
                                                       }))}
                                                       className="text-black-1 font-medium text-md w-full outline-none"/>
                                            </div>
                                        </div>
                                        <div className="basis-3/12">
                                            <p className="mb-2 text-md font-semibold">Giá bán</p>
                                            <div className="shadow-md bg-white w-full rounded-md p-3">
                                                <input type="number" value={product?.price}
                                                       onChange={(e) => setProduct((prev) => ({
                                                           ...prev, finalPrice: e.target.value
                                                       }))}
                                                       className="text-black-1 font-medium text-md w-full outline-none"/>
                                            </div>
                                        </div>
                                        <div className="basis-2/12">
                                            <p className="mb-2 text-md font-semibold">Giảm giá</p>
                                            <div
                                                className="flex items-center justify-between shadow-md bg-white w-full rounded-md p-3">
                                                <input type="number" value={product?.discountPercent}
                                                       onChange={(e) => setProduct(prev => ({
                                                           ...prev, discountPercent: e.target.value
                                                       }))}
                                                       className="text-black-1 font-medium text-md w-full outline-none"/>
                                                <p className="text-black-1 font-semibold text-md">%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex items-center justify-end gap-3">
                                    <button onClick={handleSubmit}
                                            className="outline-none flex items-center justify-center gap-2 p-2 rounded-md border-2 border-[#1CAC93] text-[#1CAC93] font-semibold text-tiny">
                                        <Icon.UilSave className="w-[20px] h-[20px]"/>
                                        <span className="leading-3">Đăng sản phẩm</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} component="div">
                    <div className="flex flex-wrap gap-6">
                        <div className="w-5/12">
                            <div className="h-full rounded-md bg-white p-5 shadow-md">
                                <p className="mb-2 text-md font-semibold">Mô tả sản phẩm</p>
                                <Editor product={product} value={"description"} setProduct={setProduct}/>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="h-full rounded-md bg-white p-5 shadow-md">
                                <p className="mb-2 text-md font-semibold">Chi tiết sản phẩm</p>
                                <Editor product={product} value={"shortDescription"} setProduct={setProduct}/>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2} component="div">
                    <div className="flex flex-wrap gap-6">
                        <div className="w-4/12">
                            <ProductAttributes
                                attributes={attributes} setAttributes={setAttributes}
                            />
                        </div>
                        <div className="flex-1">
                            <ProductVariants
                                attributes={attributes} setAttributes={setAttributes}
                                variants={variants} setVariants={setVariants}
                            />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3} component="div">
                    <div className="flex flex-wrap gap-6">
                        <div className="w-4/12">
                            <ProductAttributes
                                attributes={attributes} setAttributes={setAttributes}
                            />
                        </div>
                        <div className="flex-1">
                            <ProductVariants
                                attributes={attributes} setAttributes={setAttributes}
                                variants={variants} setVariants={setVariants}
                            />
                        </div>
                    </div>
                </TabPanel>
            </Layout>
        </Helmet>
    );
}


function TabPanel(props) {
    const {children, value, index} = props;

    return (
        <div role="tabpanel"
             hidden={value !== index}
             id={`simple-tabpanel-${index}`}
             aria-labelledby={`simple-tab-${index}`}>
            {value === index && (
                <Box sx={{py: 3}}>
                    <Typography component={"div"}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function allProps(index) {
    return {
        id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`
    };
}

export default ProductCreating;