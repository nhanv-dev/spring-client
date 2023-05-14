import {Pagination} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";


const CustomPagination = ({count, page, handleChange}) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            <Pagination count={count} page={page} onChange={(e, page) => {
                navigate(`${location.pathname}?page=${page}`)
                handleChange(page)
            }} color={"primary"} showFirstButton showLastButton/>
        </div>
    )
}

export default CustomPagination;