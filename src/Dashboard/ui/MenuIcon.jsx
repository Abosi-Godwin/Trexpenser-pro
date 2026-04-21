

const MenuIcons = ({ id, type }) => {
  const { openId, open, close, setPosition, portalRef, setOpenId } = useMenuContext();

  const handleIconClick = (event) => {
    const iconRect = event.target.closest("div").getBoundingClientRect();

    const containerRect = portalRef.current.getBoundingClientRect();

    setPosition({
      top: iconRect.bottom - containerRect.top + 4, // Y position
      right: containerRect.right - iconRect.right, // X position
    });

    openId === "" || openId !== id ? open(id) : close();
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
