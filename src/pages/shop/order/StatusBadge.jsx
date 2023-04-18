import React from 'react';
import {
    ORDER_CANCELLED,
    ORDER_COMPLETED,
    ORDER_CONFIRMED,
    ORDER_PENDING,
    ORDER_SHIPPING
} from "../../../constant/StatusOrder";

const StatusBadge = ({orderStatus}) => {
    return (
        <div>
            {orderStatus.status === ORDER_PENDING &&
                <div
                    className="min-w-max select-none flex items-center justify-center gap-2 font-bold text-sm text-warning rounded-full bg-warning-bg px-4 py-1">
                    {orderStatus.title}
                </div>
            }
            {orderStatus.status === ORDER_CONFIRMED &&
                <div
                    className="min-w-max select-none flex items-center justify-center gap-2 font-bold text-sm text-info rounded-full bg-info-bg px-4 py-1">
                    {orderStatus.title}
                </div>
            }
            {orderStatus.status === ORDER_SHIPPING &&
                <div
                    className="min-w-max select-none flex items-center justify-center gap-2 font-bold text-sm text-info rounded-full bg-info-bg px-4 py-1">
                    {orderStatus.title}
                </div>
            }
            {orderStatus.status === ORDER_COMPLETED &&
                <div
                    className="min-w-max select-none flex items-center justify-center gap-2 font-bold text-sm text-success rounded-full bg-success-bg px-4 py-1">
                    {orderStatus.title}
                </div>
            }
            {orderStatus.status === ORDER_CANCELLED &&
                <div
                    className="min-w-max select-none flex items-center justify-center gap-2 font-bold text-sm text-danger rounded-full bg-danger-bg px-4 py-1">
                    {orderStatus.title}
                </div>
            }
        </div>
    );
};

export default StatusBadge;