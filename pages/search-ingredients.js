import { Search2Icon, AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import MainButton from "../components/MainButton";
import { useRouter } from "next/router";
import BackButton from "../components/BackButton";

export default function SearchIngredients() {
  const router = useRouter();
  const meal = router.query.meal;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [inputText, setInputText] = useState("");
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [tagsArray, setTagsArray] = useState([]);

  async function fetchIngredients(inputText) {
    const response = await fetch(
      `https://api.edamam.com/auto-complete?app_id=5cca2bea&app_key=%2061c41e444a3a1fa44fc42fcbe169faad&q=${inputText}`
    );
    const data = await response.json();
    const newData = [...data.slice(0, 5)];
    setIngredientOptions(newData);
  }

  function addTag(str) {
    if (tagsArray.length > 4) {
      alert("You can only add a maximum of 5 ingredients!");
      setInputText("");
      setIngredientOptions([]);
      return;
    }
    if (str === "") {
      alert(
        "No ingredient entered, please search for an ingredient and select from dropdown menu"
      );
      setInputText("");
      setIngredientOptions([]);
      return;
    }
    if (tagsArray.includes(str)) {
      alert("This ingredient has already been added");
      setInputText("");
      setIngredientOptions([]);
      return;
    }
    setTagsArray([...tagsArray, currentIngredient]);
    setInputText("");
    setIngredientOptions([]);
  }

  function deleteTag(index) {
    setTagsArray([...tagsArray.slice(0, index), ...tagsArray.slice(index + 1)]);
  }

  return (
    <main className="h-[80vh] w-screen flex flex-col items-center justify-center space-y-6">
      <section className="absolute top-[12vh] left-[2vh]">
        <BackButton extraText={"to Search Options"} buttonSize="sm" />
      </section>
      <VStack width="80%" className="max-w-lg">
        <h1 className="font-nunito font-bold text-2xl text-center">
          Time to{" "}
          <span className="font-permanent-marker text-center text-2xl text-primary-color font-normal">
            Chews{" "}
          </span>
          your ingredients:
        </h1>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Type ingredients here"
            fontFamily={"brand.main"}
            onChange={(e) => {
              setInputText(e.target.value);
              fetchIngredients(inputText);
            }}
            value={inputText}
          />
        </InputGroup>

        <label htmlFor="ingredients" hidden>
          Select from list:
        </label>
        <Select
          placeholder="Chews from list"
          name="ingredients"
          id="ingredients"
          fontFamily={"brand.main"}
          onChange={(e) => {
            setCurrentIngredient(e.target.value);
            console.log(currentIngredient);
          }}
        >
          {ingredientOptions.map((ingredient) => {
            return (
              <option
                key={ingredient}
                value={ingredient}
                fontFamily={"brand.main"}
              >
                {ingredient}
              </option>
            );
          })}
        </Select>

        <HStack wrap={"wrap"} spacing={2} align={"space-between"}>
          {tagsArray.map((tag, index) => (
            <Tag
              size="md"
              key={tag}
              borderRadius="full"
              variant="solid"
              bg={"brand.primary"}
              fontFamily={"brand.main"}
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton
                onClick={() => {
                  deleteTag(index);
                }}
              />
            </Tag>
          ))}
        </HStack>

        <MainButton
          onClick={() => {
            addTag(currentIngredient);
          }}
          leftIcon={<AddIcon />}
          buttonText="Add Ingredient"
          colorMode={"light"}
          buttonWidth="100%"
          buttonSize="lg"
        />
      </VStack>
      <Divider width="80%" className="max-w-lg" />
      <VStack width="80%" className="max-w-lg">
        <h2 className="font-nunito font-bold text-2xl text-center">
          Added your ingredients?
        </h2>
        <MainButton
          leftIcon={"Yes, now"}
          buttonText={
            <span className="font-permanent-marker text-center text-xl text-light-color font-normal">
              Chews
            </span>
          }
          rightIcon="for Me"
          colorMode={"dark"}
          buttonWidth="100%"
          buttonSize="lg"
          onClick={() => {
            tagsArray.length > 0
              ? router.push({
                  pathname: "/results",
                  query: { meal: meal, ingredients: { ...tagsArray } },
                })
              : onOpen();
          }}
        />
        <MainButton
          leftIcon={<EditIcon />}
          buttonText="Edit Search Filters"
          buttonSize="sm"
          colorMode="light"
          buttonWidth="100%"
        />
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="80vw" mt="30vh">
          <ModalHeader>WAIT!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Please add some ingredients first!</Text>
          </ModalBody>

          <ModalFooter>
            <MainButton
              buttonText="OK"
              colorMode="dark"
              mr={3}
              onClick={onClose}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
}

/*
Bug fixing:
- Stop blank tags getting added ✅
- Stop repeat tags getting added (maybe add alert) ✅
- limit number of tags to 5ish ✅
- When clicking Add Ingredient - clear text input and return select input to "Chews from list" ✅
- make tags deletable by clicking cross ✅

- Limit number of suggestions to 5? ✅
- Connect "Chews for Me" button to results page 
- Tags are indented on second+ line

*/
