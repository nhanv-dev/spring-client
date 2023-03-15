import UserSidebar from "../manage-user-sidebar";
import Layout from "../layout";

function UserLayout({children}) {
    return (
        <Layout>
            <div className="bg-app-1">
                <div className="container py-8">
                    <div className="flex items-start gap-5">
                        <UserSidebar/>
                        <div className="flex-1">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserLayout;