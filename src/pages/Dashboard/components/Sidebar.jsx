import { sideBarItems } from "../../../data/data";
import DesktopNav from "../ui/DesktopNav";

const SideBar = () => {
    return (
        <aside className="hidden row-span-full bg-light-sidebarHeaderBackground md:block dark:bg-dark-sidebarHeaderBackground dark:text-dark-text">
            <DesktopNav links={sideBarItems} />
        </aside>
    );
};

export default SideBar;
