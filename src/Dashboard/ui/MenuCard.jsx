import { createContext, useContext, useState } from "react";

import Button from "../features/Form/Button";
import MenuIcon from "./MenuIcon";
import DeleteDataForm from "../features/Form/DeleteTransactionForm";
import EditTransaction from "../features/Form/EditTransaction";
import EditSavings from "../features/Form/EditSavings";
import EditBudgetForm from "../features/budgets/EditBudgetForm";

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
    const [openEditTransForm, setOpenEditTransForm] = useState(false);

    const [openEditSaviForm, setOpenEditSaviForm] = useState(false);
    const [openEditBudgetForm, setOpenEditBudgetForm] = useState(false);

    const handleDelForm = () => {
        setOpenDeleteForm(prev => !prev);
    };

    const handleEditForm = () => {
        if (type === "savings") {
            setOpenEditSaviForm(prev => !prev);
        }
        if (type === "transaction") {
            setOpenEditTransForm(prev => !prev);
        }
        if (type === "budget") {
          
            setOpenEditBudgetForm(prev => !prev);
        }
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
                    onCloseForm={handleDelForm}
                />
            )}
            {openEditTransForm && (
                <EditTransaction
                    data={data}
                    type={type}
                    onCloseForm={handleEditForm}
                />
            )}
            {openEditSaviForm && (
                <EditSavings
                    data={data}
                    type={type}
                    onCloseForm={handleEditForm}
                />
            )}
            {openEditBudgetForm && (
                <EditBudgetForm
                    data={data}
                    type={type}
                    onCloseForm={handleEditForm}
                />
            )}
            <Button
                className="bg-light-iconColor text-white  p-1 rounded-md
                text-center font-bold mb-1"
                text="Edit"
                onButtonClick={handleEditForm}
            />
            <Button
                className="bg-red-700 text-white  p-1 rounded-md text-center
                font-bold ml-3"
                text="Delete"
                onButtonClick={handleDelForm}
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
