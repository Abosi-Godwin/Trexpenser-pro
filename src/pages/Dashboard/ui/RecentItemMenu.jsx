import MenuCard from "../Contexts/MenuContext";

export const RecentItemMenuCard = ({ transactionId }) => {
    return (
        <MenuCard>
            <MenuCard.Icon />
            <MenuCard.Options transactionId={transactionId} />
        </MenuCard>
    );
};
