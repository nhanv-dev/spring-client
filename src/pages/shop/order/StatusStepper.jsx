import {useEffect, useState} from "react";
import {ORDER_CANCELLED, ORDER_COMPLETED} from "../../../constant/StatusOrder";
import {protectedRequest} from "../../../util/request-method";
import {Step, StepContent, StepLabel, Stepper} from "@mui/material";
import {formatLongDate} from "../../../util/format";
import {toast} from "react-hot-toast";

const StatusStepper = ({order, orderStatus, setOrder, setOrders}) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(orderStatus.filter(s => s.status !== ORDER_CANCELLED))
    }, [orderStatus])

    const handleNext = (status, orderId) => {
        protectedRequest().put(`/shops/orders/${order.id}`, {status, orderId})
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

    return (
        <Stepper orientation="vertical">
            {list.map((status, i) => {
                const index = order.statusHistory.findIndex(h => status.id === h.orderStatus.id);
                const history = index !== -1 ? order.statusHistory[index] : null;
                const isCompleted = order.orderStatus.status === ORDER_COMPLETED || status.id < order.orderStatus.id;
                const isActive = index !== -1;
                return (
                    <Step key={status.id} expanded={!!history} active={history != null} completed={isCompleted}>
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
                            {(history && order.orderStatus.id === status.id && order.orderStatus.status !== ORDER_COMPLETED) &&
                                <button onClick={() => handleNext(list[i + 1].status, order.id)}
                                        className="min-w-max bg-primary-bg text-primary rounded-md outline-none px-3 py-2 font-semibold text-sm">
                                    {status.labelConfirm}
                                </button>
                            }
                        </StepContent>
                    </Step>
                )
            })}
        </Stepper>
    )
}

export default StatusStepper