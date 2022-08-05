import React from "react";
import { Spinner } from "@chakra-ui/react";

export default function LoadingScreen() {
  return (
    <main className="flex flex-col h-[80vh] w-screen items-center justify-center space-y-2">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="brand.primary"
        size="xl"
      />
    </main>
  );
}
