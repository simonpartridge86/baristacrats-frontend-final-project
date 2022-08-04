/*
Usage Notes:
- In page where FilterModal is used:
  - import useDisclosure from chakra: "import { useDisclosure } from "@chakra-ui/react";"
  - add following inside page function: "const { isOpen, onOpen, onClose } = useDisclosure();"
  - add following props: <FilterModal isOpen={isOpen} onClose={onClose} />
  - add a button to the page as follows: <button onClick={onOpen}>Open Modal</button>
*/

import React, { useState, useEffect } from "react";
import MainButton from "./MainButton";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Switch,
  Divider,
} from "@chakra-ui/react";
import { dietArray, cuisineArray } from "../libs/filters.js";

export default function FilterModal({ isOpen, onClose }) {
  const [dietFilters, setDietFilters] = useState([]);
  const [cuisineFilters, setCuisineFilters] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("diet") === null) {
      setDietFilters([...dietArray]);
    } else {
      const storedDietFilters = JSON.parse(localStorage.getItem("diet"));
      setDietFilters([...storedDietFilters]);
    }

    if (localStorage.getItem("cuisine") === null) {
      setCuisineFilters([...cuisineArray]);
    } else {
      const storedCuisineFilters = JSON.parse(localStorage.getItem("cuisine"));
      setCuisineFilters([...storedCuisineFilters]);
    }
  }, []);

  function onChangeDiet(e, arr, item) {
    const index = arr.findIndex((object) => {
      return object.filter === item;
    });
    const newArray = [...arr];
    newArray[index].isChecked = e.target.checked;
    setDietFilters(newArray);
    console.log(dietFilters);
  }
  function onChangeCuisine(e, arr, item) {
    const index = arr.findIndex((object) => {
      return object.filter === item;
    });
    const newArray = [...arr];
    newArray[index].isChecked = e.target.checked;
    setCuisineFilters(newArray);
    console.log(cuisineFilters);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="scale"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          width="90vw"
          flex="flex"
          flexDir="column"
          alignItems="center"
          maxWidth={"lg"}
          maxHeight={"70vh"}
        >
          <ModalHeader fontFamily={"brand.main"} fontSize={"2xl"}>
            <span className="font-permanent-marker text-center text-2xl text-primary-color font-normal">
              Chews{" "}
            </span>{" "}
            Filters
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="w-[80%] max-h-[50%]">
            <Text
              fontFamily={"brand.main"}
              fontWeight={600}
              fontSize={"lg"}
              textColor={"brand.primary"}
              textAlign={"left"}
            >
              Dietary Preferences:
            </Text>
            <Divider />
            <section className="w-[100%] flex flex-col mt-[1vh]">
              {dietFilters.map((object) => {
                return (
                  <div
                    className="flex flex-row items-center justify-between"
                    key={object.filter}
                  >
                    <label fontFamily={"brand.main"} htmlFor={object.filter}>
                      {object.filter}
                    </label>

                    <Switch
                      colorScheme="red"
                      id={object.filter}
                      onChange={(e) => {
                        onChangeDiet(e, dietFilters, object.filter);
                        localStorage.setItem(
                          "diet",
                          JSON.stringify(dietFilters)
                        );
                      }}
                      defaultChecked={object.isChecked}
                    />
                  </div>
                );
              })}
            </section>
            <Text
              fontFamily={"brand.main"}
              fontWeight={600}
              fontSize={"lg"}
              textColor={"brand.primary"}
              textAlign={"left"}
              marginTop={"2vh"}
            >
              Cuisine Preferences:
            </Text>
            <Divider />
            <section className="w-[100%] flex flex-col mt-[1vh]">
              {cuisineFilters.map((object) => {
                return (
                  <div
                    className="flex flex-row items-center justify-between"
                    key={object.filter}
                  >
                    <label fontFamily={"brand.main"} htmlFor={object.filter}>
                      {object.filter}
                    </label>

                    <Switch
                      colorScheme="red"
                      id={object.filter}
                      onChange={(e) => {
                        onChangeCuisine(e, cuisineFilters, object.filter);
                        localStorage.setItem(
                          "cuisine",
                          JSON.stringify(cuisineFilters)
                        );
                      }}
                      defaultChecked={object.isChecked}
                    />
                  </div>
                );
              })}
            </section>
          </ModalBody>

          <ModalFooter gap={"10px"}>
            <MainButton
              colorMode={"dark"}
              buttonText="Save"
              onClick={onClose}
              buttonSize="md"
              buttonWidth={"100px"}
            />
            <MainButton
              colorMode={"light"}
              buttonText="Cancel"
              onClick={onClose}
              buttonSize="md"
              buttonWidth={"100px"}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}