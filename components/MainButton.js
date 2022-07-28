import { Button } from "@chakra-ui/react";

/*
Prop Notes:
 - buttonWidth = to adjust width of button to your needs
 - buttonSize = options are lg, md, sm, xs (will also adjust text size)
 - onClick = whatever onClick callback function you are passing to this button
 - colorMode = add "light" for white button with red features, otherwise defaults to standard red button
*/

export default function MainButton({
  buttonWidth,
  buttonSize,
  buttonText,
  onClick,
  colorMode,
}) {
  if (colorMode === "light") {
    return (
      <Button
        onClick={onClick}
        size={buttonSize}
        fontWeight={"600"}
        fontFamily={"nunito, sans-serif"}
        rounded={"lg"}
        width={buttonWidth}
        _hover={{
          transform: "translateY(-1px)",
          boxShadow: "md",
        }}
        bg={"brand.light"}
        color={"brand.primary"}
        borderWidth={"2px"}
        borderColor={"brand.primary"}
        _active={{
          bg: "brand.primary",
          color: "brand.light",
        }}
      >
        {buttonText}
      </Button>
    );
  } else if (colorMode === "dark") {
    return (
      <Button
        onClick={onClick}
        size={buttonSize}
        fontWeight={"600"}
        fontFamily={"nunito, sans-serif"}
        rounded={"md"}
        width={buttonWidth}
        _hover={{
          transform: "translateY(-1px)",
          boxShadow: "md",
        }}
        bg={"brand.primary"}
        color={"brand.light"}
        _active={{
          bg: "brand.light",
          color: "brand.primary",
          borderWidth: "2px",
          borderColor: "brand.primary",
        }}
      >
        {buttonText}
      </Button>
    );
  }
}