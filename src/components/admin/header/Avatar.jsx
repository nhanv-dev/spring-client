
function Header() {
    return (
        <div className="flex items-center justify-start gap-8">
            <button
                className="h-[42px] w-[42px] flex items-center justify-center overflow-hidden rounded-full border-2 border-[#EBEDF5]">
                <img className="h-full w-auto"
                     src="https://cdn.iconscout.com/profile-photo/large/tn-vapp-1868932.jpg?w=100&h=100&updated_at=1664031823"
                     alt="avatar"/>
            </button>
        </div>
    );
}

export default Header;