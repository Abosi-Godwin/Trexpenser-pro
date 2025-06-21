import MenuCard from "../contexts/MenuContext";

export const RecentItemMenuCard = ({ transaction}) => {
  
    return (
        <MenuCard>
            <MenuCard.Icon />
            <MenuCard.Options transaction={transaction} />
        </MenuCard>
    );
};
