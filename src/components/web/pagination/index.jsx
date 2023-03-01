import {Link} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons";

const Pagination = ({currentPage, totalPage}) => {
    return (
        <div className="flex items-center gap-3">
            <Link to={`a`}
                  className="bg-secondary-hover hover:bg-primary-1-hover hover:text-primary font-semibold text-md w-[32px] h-[32px] flex items-center justify-center rounded-full">
                <Icon.UilAngleLeft/>
            </Link>
            {Array.from({length: totalPage}).map((e, index) => (
                <Link to={`a`}
                      className="bg-primary-1-hover text-primary font-semibold text-md w-[32px] h-[32px] flex items-center justify-center rounded-full">
                    {index + 1}
                </Link>
            ))}
            <Link to={`${window.location.href}?page=${currentPage++}`}
                  className="bg-primary-1-hover text-primary font-semibold text-md w-[32px] h-[32px] flex items-center justify-center rounded-full">
                <Icon.UilAngleRight/>
            </Link>
        </div>
    )
}

export default Pagination;