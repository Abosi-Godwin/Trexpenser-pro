
import { NavLink } from "react-router-dom";

const SidebarItem = ({ item, closeNavBar }) => {
  const Icon = item.icon;

  return (
    <li
      className="list-none w-full rounded-md overflow-hidden font-bold 
        hover:border-b-[1.5px] hover:border-b-light-iconColor
        dark:hover:border-b-dark-iconColor"
      onClick={closeNavBar}
    >
      <NavLink
        to={item.dest}
        end
        className={({ isActive }) =>
          `flex gap-2 items-center justify-start p-2 w-full text-sm
          ${isActive
            ? "bg-light-sectionBackground dark:bg-dark-cardBackground"
            : ""
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              aria-hidden="true"
              className="text-light-iconColor dark:text-dark-iconColor text-xl flex-shrink-0"
            />
            <span aria-current={isActive ? "page" : undefined}>
              {item.text}
            </span>
          </>
        )}
      </NavLink>
    </li>
  );
};

export default SidebarItem;