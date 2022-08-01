import { Button } from "@chakra-ui/react";

/*
Prop Notes:
 - buttonWidth = to adjust width of button to your needs
 - buttonSize = options are lg, md, sm, xs (will also adjust text size)
 - buttonText = whatever text you want to appear on the button
 - onClick = whatever onClick callback function you are passing to this button
 - colorMode = add "light" for white button with red features, otherwise add"dark" for a standard red button
 - isDisabled = takes boolean to determine whether button is enabled or disable (true = disabled), defaults to false
*/

export default function MainButton({
  buttonWidth,
  buttonSize,
  buttonText,
  onClick,
  colorMode,
  isDisabled,
}) {
  if (colorMode === "light") {
    return (
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size={buttonSize}
        fontWeight={"600"}
        fontFamily={"brand.main"}
        fontSize={"xl"}
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
        disabled={isDisabled}
        onClick={onClick}
        size={buttonSize}
        fontWeight={"600"}
        fontSize={"xl"}
        fontFamily={"brand.main"}
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
