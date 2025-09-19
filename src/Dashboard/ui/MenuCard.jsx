import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { FaEllipsisVertical, FaXmark } from "react-icons/fa6";
import Button from "../features/Form/Button";
import DeleteDataForm from "../features/Form/DeleteTransactionForm";

import AddSavingsForm from "../features/savings/AddSavings";
import BudgetForm from "../features/budgets/BudgetForm";
import TransactionForm from "../features/Form/TransactionForm";

const MenuContext = createContext({});

const useMenuContext = () => {
    const menuCardContext = useContext(MenuContext);

    if (!menuCardContext) {
        throw new Error("Context is used outside the parent");
    }
    return menuCardContext;
};

const MenuCard = ({ children, data, type, portalRef }) => {
    const [position, setPosition] = useState({});
    const [openId, setOpenId] = useState("");
    const open = id => setOpenId(id);
    const close = () => {
        setOpenId("");
    };

    return (
        <MenuContext.Provider
            value={{
                openId,
                open,
                setOpenId,
                data,
                type,
                close,
                position,
                setPosition,
                portalRef
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

const MenuIcons = ({ id, type }) => {
    const { openId, open, close, setPosition, portalRef } = useMenuContext();

    const handleIconClick = event => {
        const iconRect = event.target.closest("div").getBoundingClientRect();

        const containerRect = portalRef.current.getBoundingClientRect();

        setPosition({
            x:
                iconRect.x -
                containerRect.x -
                containerRect.width +
                iconRect.width +
                10,
            y:
                type === "transaction"
                    ? iconRect.bottom - containerRect.y
                    : iconRect.bottom - iconRect.heigth
        });

        const emptyId = openId === "";
        const anotherId = openId !== id;

        emptyId || anotherId ? open(id) : close();
    };

    return (
        <div
            className="p-2 bg-light-sectionBackground
            dark:bg-dark-sectionBackground rounded-md w-fit"
            onClick={handleIconClick}
        >
            {!openId ? <FaEllipsisVertical /> : <FaXmark />}
        </div>
    );
};

const MenuLists = ({ id }) => {
    const { openId, data, type, position, portalRef } = useMenuContext();

    const xPosition = Math.round(position.x);
    const yPosition = Math.round(position.y);

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

    if (!portalRef.current) return;

    return createPortal(
        <div
            className={`${openId ? "block" : "hidden"} absolute 
        bg-light-sectionBackground dark:bg-dark-sectionBackground p-2 rounded-md
        right-[${xPosition}px]
       top-[${yPosition}px]`}
        >
            {openDeleteForm && (
                <DeleteDataForm
                    data={data}
                    type={type}
                    onCloseForm={handleDelForm}
                />
            )}
            {openEditTransForm && (
                <TransactionForm
                    data={data}
                    isEdit={true}
                    onCloseForm={handleEditForm}
                />
            )}
            {openEditSaviForm && (
                <AddSavingsForm
                    data={data}
                    isEdit={true}
                    onCloseForm={handleEditForm}
                />
            )}

            {openEditBudgetForm && (
                <BudgetForm
                    data={data}
                    type={type}
                    isEdit={true}
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
        </div>,
        portalRef.current
    );
};

MenuCard.Toggle = MenuIcons;
MenuCard.Options = MenuLists;

export default MenuCard;
