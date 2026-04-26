// Sidebar.jsx
import { sideBarItems } from "../data/data";
import DesktopNav from "../ui/DesktopNav";

const SideBar = () => {
  return (
    <aside
      className="hidden md:block md:row-span-full
        bg-light-sidebarHeaderBackground 
        dark:bg-dark-sidebarHeaderBackground 
        dark:text-dark-text"
    >
      <DesktopNav links={sideBarItems} />
    </aside>
  );
};

export default SideBar;