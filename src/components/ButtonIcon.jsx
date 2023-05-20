import { IconButton } from "@chakra-ui/react";

const ButtonIcon = ({ Icon, onClick }) => {
  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      onClick={onClick}
      icon={<Icon />}
    />
  );
};

export default ButtonIcon;
