import {useContext, useEffect, useState} from 'react';
import Editor from "./Editor";
import {PayloadContext} from "./index";

function TabDescription() {
    const {payload, setPayload} = useContext(PayloadContext);
    const [description, setDescription] = useState('');
    const [shortDescription, setShortDescription] = useState('');

    useEffect(() => {
        setPayload(prev => {
            if (!prev.product) prev.product = {};
            prev.product.shortDescription = shortDescription;
            return prev;
        })
    }, [shortDescription])

    useEffect(() => {
        setPayload(prev => {
            if (!prev.product) prev.product = {};
            prev.product.description = description;
            return prev;
        })
    }, [description])

    useEffect(() => {
        if (!payload.product) return;
        setDescription(payload.product?.description || '');
        setShortDescription(payload.product?.shortDescription || '');
    }, [])

    return (
        <div className="flex flex-wrap gap-6">
            <div className="w-5/12">
                <div className="h-full rounded-md bg-white p-5 shadow-md">
                    <p className="mb-2 text-md font-semibold">Mô tả sản phẩm</p>
                    <Editor value={shortDescription} setValue={setShortDescription}/>
                </div>
            </div>
            <div className="flex-1">
                <div className="h-full rounded-md bg-white p-5 shadow-md">
                    <p className="mb-2 text-md font-semibold">Chi tiết sản phẩm</p>
                    <Editor value={description} setValue={setDescription}/>
                </div>
            </div>
        </div>
    );
}

export default TabDescription;