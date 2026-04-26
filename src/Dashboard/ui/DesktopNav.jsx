
import SidebarItem from "../ui/SidebarItem";

const DesktopNav = ({ links }) => {
  return (
    <ul className="flex flex-col items-start p-3 gap-4 h-full">
      {links.map((item) => (
        <SidebarItem item={item} key={item.dest} />
      ))}
    </ul>
  );
};

export default DesktopNav;