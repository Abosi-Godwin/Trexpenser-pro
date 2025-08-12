import { createContext, useContext, useState } from "react";
 
import Button from "../features/Form/Button";
import MenuIcon from "./MenuIcon";
import DeleteDataForm from "../features/Form/DeleteTransactionForm";

const MenuContext = createContext({});

const useMenuContext = () => {
    const menuCardContext = useContext(MenuContext);

    if (!menuCardContext) {
        throw new Error("Context is used outside the parent");
    }
    return menuCardContext;
};

const MenuCard = ({ children, data, type }) => {
    const [openMenu, setOpenMenu] = useState(false);

    const handleOpenMenu = () => {
        setOpenMenu(prev => !prev);
    };

    return (
        <MenuContext.Provider
            value={{ openMenu, handleOpenMenu, setOpenMenu, data, type }}
        >
            {children}
        </MenuContext.Provider>
    );
};

const MenuLists = () => {
    const { openMenu, data, type } = useMenuContext();
    const [openDeleteForm, setOpenDeleteForm] = useState(false);

    const handleOpenForm = () => {
        setOpenDeleteForm(prev => !prev);
    };
    return (
        <div
            className={`${openMenu ? "block" : "hidden"} absolute
        bg-light-sectionBackground dark:bg-dark-sectionBackground p-2 rounded-md z-[1000] right-10`}
        >
            {openDeleteForm && (
                <DeleteDataForm
                    data={data}
                    type={type}
                    onCloseForm={handleOpenForm}
                />
            )}
            <Button
                className="bg-light-iconColor text-white  p-1 rounded-md
                text-center font-bold mb-1"
                text="Edit"
            />
            <Button
                className="bg-red-700 text-white  p-1 rounded-md text-center
                font-bold ml-3"
                text="Delete"
                onButtonClick={handleOpenForm}
            />
        </div>
    );
};
const MenuIcons = () => {
    const { openMenu, handleOpenMenu } = useMenuContext();

    return <MenuIcon open={openMenu} menuHandle={handleOpenMenu} />;
};

MenuCard.Icon = MenuIcons;
MenuCard.Options = MenuLists;

export default MenuCard;
