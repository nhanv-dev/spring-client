import Helmet from "../../../components/common/helmet";
import Layout from "../../../components/web/layout";
import {Link} from "react-router-dom";
import PlaceOrder from "../../../assets/images/place-order.gif";

function PlaceOrderSuccess() {

    return (
        <Helmet title={"Depot - Đặt hàng thành công"}>
            <Layout>
                <div className="bg-app-1">
                    <div className="flex items-center justify-center py-[60px]">
                        <div className="bg-white md:w-[500px] rounded-xl p-5 shadow-md">
                            <img src={PlaceOrder} alt="Place order success" className="h-[200px] mx-auto"/>
                            <div className="flex flex-col items-center justify-center relative top-[-30px]">
                                <p className="text-2xl font-bold text-success mb-3">
                                    Bạn đã đặt hàng thành công
                                </p>
                                <p className="max-w-[350px] text-md text-black-2 font-medium text-center mb-8">
                                  <span>Đơn đặt hàng của bạn đã được gửi đến cửa hàng.
                                    Bạn có thể theo dõi tiến độ xử lý đơn hàng </span>
                                    <Link to={"/nguoi-dung/don-dat-hang"} className="text-primary underline">tại
                                        đây</Link>.
                                </p>
                                <Link to={"/trang-chu"}
                                      className="bg-primary text-white font-semibold text-md rounded-full py-2 px-5">
                                    Tiếp tục mua sắm
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

export default PlaceOrderSuccess;