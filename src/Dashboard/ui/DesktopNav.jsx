import SidebarItem from "../ui/SidebarItem";

const DesktopNav = ({ links }) => {
    return (
        <ul
            className="flex flex-col justify-between items-start p-3 gap-15
        h-[30%]"
        >
            {links.map((item, index) => (
                <SidebarItem item={item} index={index} key={index} />
            ))}
        </ul>
    );
};

export default DesktopNav;
