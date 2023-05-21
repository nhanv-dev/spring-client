import {useCallback, useEffect, useState} from "react";
import {
    ORDER_CANCELLED,
    ORDER_COMPLETED,
    ORDER_CONFIRMED,
    ORDER_PENDING,
    ORDER_SHIPPING
} from "../../../constant/StatusOrder";
import {Step, StepContent, StepLabel, Stepper} from "@mui/material";
import {formatLongDate} from "../../../util/format";
import {toast} from "react-hot-toast";
import orderService from "../../../service/OrderService";


const StatusStepper = ({order, orderStatus, setOrder, setOrders}) => {
    const [list, setList] = useState([]);
    const [isCancelled, setIsCancelled] = useState(null);
    const [cancelledOrder, setCancelledOrder] = useState(null);
    const [lastStatusBeforeCancel, setLastStatusBeforeCancel] = useState(null);

    useEffect(() => {
        setList(orderStatus.filter(s => s.status !== ORDER_CANCELLED));
    }, [orderStatus])

    useEffect(() => {
        const status = getHistoryStatus(ORDER_CANCELLED);
        setIsCancelled(status);
    }, [order])

    useEffect(() => {
        let status = null;
        order.statusHistory.forEach(item => {
            if (!status) return status = {...item};
            if (item.orderStatus.status !== ORDER_CANCELLED && item.id > status.id) {
                status = {...item};
            }
        })
        setLastStatusBeforeCancel(status);
    }, [order, list])

    useEffect(() => {
        if (!isCancelled || !order) return;
        orderService.getCancelledOrder({orderId: order.id})
            .then(res => {
                setCancelledOrder(res.data)
            })
            .catch(err => {
                setCancelledOrder(null)
            })
    }, [order, isCancelled])

    const handleNext = (status, orderId) => {
        if (isCancelled || order.orderStatus.status === ORDER_CANCELLED) {
            toast.error('Không thể thay đổi trạng thái đơn hàng này.')
            return;
        }
        orderService.changeStatusOrder({status, orderId})
            .then(res => {
                if (typeof setOrders === 'function') {
                    setOrders(prev => {
                        const list = prev.map(order => {
                            if (order.id !== res.data.id) return {...order};
                            return {...res.data}
                        })
                        return [...list]
                    })
                }
                if (typeof setOrder === 'function') {
                    setOrder(res.data)
                }
                toast.success('Cập nhật trạng thái đơn hàng thành công')
            })
            .catch(err => {
                toast.error('Cập nhật trạng thái đơn hàng thất bại')
            })
    };
    const getHistoryStatus = (status) => {
        const getStatus = (status) => {
            const index = order.statusHistory.findIndex(statusHistory => status === statusHistory.orderStatus.status);
            if (index === -1) return null;
            return order.statusHistory[index];
        }
        switch (status) {
            case ORDER_CANCELLED:
                return getStatus(ORDER_CANCELLED);
            case ORDER_PENDING:
                return getStatus(ORDER_PENDING);
            case ORDER_CONFIRMED:
                return getStatus(ORDER_CONFIRMED);
            case ORDER_SHIPPING:
                return getStatus(ORDER_SHIPPING);
            case ORDER_COMPLETED:
                return getStatus(ORDER_COMPLETED);
            default:
                return null;
        }
    }
    const getNextStatus = (status) => {
        switch (status) {
            case ORDER_PENDING:
                return orderStatus.filter(s => s.status === ORDER_CONFIRMED)[0];
            case ORDER_CONFIRMED:
                return orderStatus.filter(s => s.status === ORDER_SHIPPING)[0];
            case ORDER_SHIPPING:
                return orderStatus.filter(s => s.status === ORDER_COMPLETED)[0];
            default:
                return null;
        }
    }

    return (
        <Stepper orientation="vertical">
            {list.map((status, i) => {
                const history = getHistoryStatus(status.status);
                const nextStatus = getNextStatus(status.status);
                const isCompletedNext = getHistoryStatus(nextStatus?.status);
                const isCompleted = order.orderStatus.status === ORDER_COMPLETED;

                return (
                    <Step key={status.id} expanded={!!history} active={!!history}
                          completed={!!isCompleted || !!isCompletedNext}>
                        <StepLabel>
                            <div className="font-semibold text-md">
                                {status.title}
                            </div>
                        </StepLabel>
                        <StepContent>
                            <p className="font-medium text-sm text-black-2 opacity-80 mb-2">
                                {status.description}
                            </p>
                            {history &&
                                <p className="font-semibold text-sm text-black-2 mb-2">
                                    {status.labelCreatedAt} <span className="text-primary font-semibold">
                                         {formatLongDate(history.createdAt)}
                                    </span>
                                </p>
                            }
                            {(!isCompleted && !isCompletedNext && !isCancelled) &&
                                <button onClick={() => handleNext(list[i + 1].status, order.id)}
                                        className="min-w-max bg-primary-bg text-primary rounded-md outline-none px-3 py-2 font-semibold text-sm">
                                    {status.labelConfirm}
                                </button>
                            }
                            {(!!isCancelled && lastStatusBeforeCancel?.orderStatus.id === status.id) &&
                                <div className={"bg-app-1 p-3 rounded-md text-secondary"}>
                                    <p className={"font-bold text-md mb-2 text-danger"}>
                                        {isCancelled.orderStatus.description}
                                    </p>
                                    {cancelledOrder &&
                                        <div className={"mb-3 font-medium text-md"}>
                                            Lý do: {cancelledOrder.note}
                                        </div>
                                    }
                                    <p className="font-semibold text-sm">
                                        {isCancelled.orderStatus.labelCreatedAt} <span
                                        className="text-danger font-semibold">
                                         {formatLongDate(isCancelled.createdAt)}
                                        </span>
                                    </p>
                                </div>
                            }
                        </StepContent>
                    </Step>
                )
            })}
        </Stepper>
    )
}

export default StatusStepper