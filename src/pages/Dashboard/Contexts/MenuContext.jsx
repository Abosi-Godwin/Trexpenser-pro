import { createContext, useContext, useState } from "react";
import { FaEllipsis, FaXmark } from "react-icons/fa6";
import Button from "../ui/Button";
import { useAuth } from "../../../contexts/AuthContext";
const MenuContext = createContext({});

const useMenuContext = () => {
    const menuCardContext = useContext(MenuContext);

    if (!menuCardContext) {
        throw new Error("Context is used outside the parent");
    }
    return menuCardContext;
};

const MenuCard = ({ children }) => {
    const [openMenu, setOpenMenu] = useState(false);

    const handleOpenMenu = () => {
        setOpenMenu(prev => !prev);
    };

    return (
        <MenuContext.Provider value={{ openMenu, handleOpenMenu, setOpenMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

export default MenuCard;

const MenuLists = ({ transactionId }) => {
    const { openMenu } = useMenuContext();
    const { deleteTransaction, isdeletingTransaction } = useAuth();

    const handleItemDelete = () => {
        deleteTransaction(transactionId);
    };
    return (
        <div
            className={`${openMenu ? "block" : "hidden"} absolute
        bg-light-sectionBackground dark:bg-dark-sectionBackground p-2 rounded-md z-[1000] right-10`}
        >
            <Button
                className="bg-light-iconColor text-white  p-1 rounded-md
                text-center font-bold mb-1"
                text="Edit"
            />
            <Button
                className="bg-red-700 text-white  p-1 rounded-md text-center
                font-bold ml-3"
                text="Delete"
                loader={isdeletingTransaction}
                onButtonClick={handleItemDelete}
            />
        </div>
    );
};
const MenuIcons = () => {
    const { openMenu, handleOpenMenu } = useMenuContext();
    return (
        <div
            className="p-2 bg-light-sectionBackground dark:bg-dark-sectionBackground rounded-md w-fit
                                "
            onClick={handleOpenMenu}
        >
            {!openMenu ? <FaEllipsis /> : <FaXmark />}
        </div>
    );
};

MenuCard.Icon = MenuIcons;
MenuCard.Options = MenuLists;
