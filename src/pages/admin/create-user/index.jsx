import React, {useState} from 'react';
import Helmet from "../../../components/common/helmet";
import {useNavigate} from "react-router-dom";
import {publicRequest} from "../../../util/request-method";
import Layout from "../../../components/admin/layout";

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    function handleSubmit() {
        if (!email || !password || !name || !phoneNumber) return;
        publicRequest().post("/auth/sign-up", {email, password, name, phoneNumber})
            .then(res => {
                if (res.status === 200) navigate("/dang-nhap")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Helmet title="Depot - Quản trị - Tạo tài khoản">
            <Layout>
                <div className="bg-white p-5 rounded-md">

                </div>
            </Layout>
        </Helmet>
    );
}

export default SignUp;