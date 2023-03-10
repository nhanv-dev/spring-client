import {useState, useEffect} from 'react';
import Helmet from "../../../components/common/helmet";
import Layout from "../../../components/web/layout";
import {Link} from "react-router-dom";
import {publicRequest} from "../../../util/request-method";

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        publicRequest().get("/categories")
            .then((res) => {
                setCategories(res.data)
            })
            .catch(err => {
                setCategories([])
            })
    }, [])

    return (
        <Helmet title="Depot - Danh mục">
            <Layout>
                <div className=" py-8 bg-app-1">
                    <div className="container">
                        {categories.map((category, index) => (
                            <div className="mb-10" key={index}>
                                <div className="flex mb-3 items-center justify-center">
                                    <Link to={category.slug || '/'}
                                          className="uppercase font-bold text-lg text-primary">
                                        {category.title}
                                    </Link>
                                </div>
                                <SubCategories categories={category.subCategories}/>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

const SubCategories = ({categories}) => {
    return (
        <div className="grid grid-cols-6 mx-[-.5rem]">
            {categories.map((category, index) => {
                return (
                    <Link key={index} to={category.slug || "/"}
                          className="hover:text-primary hover:border-primary border-2 border-white transition-all min-h-[4rem] bg-white m-2 p-4 flex items-center justify-center text-center rounded-md text-md font-medium text-gray">
                        {category.title}
                    </Link>
                )
            })}
        </div>
    )
}

export default Categories;