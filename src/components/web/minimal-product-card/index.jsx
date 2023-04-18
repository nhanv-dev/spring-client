import {Link} from "react-router-dom";
import {formatCurrency} from "../../../util/format";

function MinimalProductCard({item}) {

    return (
        <div className="cursor-pointer relative group w-full rounded-md bg-white p-2 min-w-[135px] h-[220px]">
            <Link to={`/san-pham/${item.slug}`} className="w-full flex items-center justify-center mb-2">
                <img src={item.images[0]?.url || imageNotFound} alt={item.name} className="rounded-md"/>
            </Link>
            <Link to={`/san-pham/${item.slug}`} className="block ">
                <p className="hover:text-primary text-sm font-semibold text-black line-clamp-2 mb-2">
                    {item.name}
                </p>
                <p className="text-base font-bold text-red">
                    {formatCurrency(item.deal.finalPrice || item.deal.price)}
                </p>
            </Link>
        </div>
    );
}

const imageNotFound = '';
export default MinimalProductCard;