import MenuCard from "../contexts/MenuContext";
/*
export const RecentItemMenuCard = ({ transaction }) => {
    return (
        <MenuCard>
            <MenuCard.Icon />
        </MenuCard>
    );
};
*/

const MenuLists = ({ id }) => {
  const { openId, data, type, position, portalRef } = useMenuContext();

  const xPosition = Math.round(position.x);
  const yPosition = Math.round(position.y);

  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [openEditTransForm, setOpenEditTransForm] = useState(false);

  const [openEditSaviForm, setOpenEditSaviForm] = useState(false);
  const [openEditBudgetForm, setOpenEditBudgetForm] = useState(false);

  const handleDelForm = () => {
    setOpenDeleteForm((prev) => !prev);
  };

  const handleEditForm = () => {
    if (type === "savings") {
      setOpenEditSaviForm((prev) => !prev);
    }
    if (type === "transaction") {
      setOpenEditTransForm((prev) => !prev);
    }
    if (type === "budget") {
      setOpenEditBudgetForm((prev) => !prev);
    }
  };

  if (!portalRef.current || openId !== id) return null;
  return createPortal(
    <div
      className={`${
        openId ? "flex" : "hidden"
      } items-center justify-center absolute bg-light-sectionBackground dark:bg-dark-sectionBackground
      py-0.5 px-2
      rounded-md `}
      style={{
        top: `${position.top}px`,
        right: `${position.right}px`,
      }}
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
        className="bg-light-iconColor text-white  p-1 rounded-md text-center font-bold mb-1"
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
