import { NavLink } from "react-router-dom";

const SidebarItem = ({ item, closeNavBar}) => {
    const Icon = item.icon;
    const label = item.text;
    const link = item.dest;
    return (
        <li
            className="list-none w-full rounded-md overflow-hidden text-md
        font-bold hover:border-b-[1.5px] hover:border-b-light-iconColor
        dark:hover:border-b-dark-iconColor"
        onClick={closeNavBar}>
            <NavLink
                to={link}
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
                className={({ isActive }) =>
                    `flex gap-2 items-center justify-start p-2 w-full block ${
                        isActive
                            ? "bg-light-sectionBackground dark:bg-dark-cardBackground"
                            : ""
                    }`
                }
                end
            >
                <Icon className="text-light-iconColor dark:text-dark-iconColor text-xl" />
                {label}
            </NavLink>
        </li>
    );
};

export default SidebarItem;
