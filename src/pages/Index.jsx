import React, { useState, useEffect } from "react";
import { Box, Button, VStack, Text, Container, useToast, Center } from "@chakra-ui/react";
import { FaHandPointer } from "react-icons/fa";

const Index = () => {
  const [gameState, setGameState] = useState("waiting"); // waiting, ready, started
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const toast = useToast();

  useEffect(() => {
    let timeout;
    if (gameState === "ready") {
      // Set a random timeout between 2 to 5 seconds
      const randomDelay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
      timeout = setTimeout(() => {
        setGameState("started");
        setStartTime(new Date().getTime());
      }, randomDelay);
    }

    return () => clearTimeout(timeout);
  }, [gameState]);

  const handleStartClick = () => {
    setGameState("ready");
    setEndTime(null);
  };

  const handleResponseClick = () => {
    if (gameState === "started") {
      const currentTime = new Date().getTime();
      setEndTime(currentTime);
      const reactionTime = currentTime - startTime;
      toast({
        title: `Your reaction time is ${reactionTime} ms`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setGameState("waiting");
    } else if (gameState === "ready") {
      toast({
        title: "Too soon! Wait for the color to change.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setGameState("waiting");
    }
  };

  return (
    <Container maxW="xl" centerContent>
      <VStack spacing={8} py={12}>
        <Text fontSize="2xl" fontWeight="bold">
          Reaction Time Test
        </Text>
        <Box w="100%" h="300px" bg={gameState === "started" ? "green.300" : "red.300"} borderRadius="lg" display="flex" alignItems="center" justifyContent="center" boxShadow="md">
          <Center>
            {gameState === "waiting" && <Text fontSize="xl">Click "Start" to begin!</Text>}
            {gameState === "ready" && <Text fontSize="xl">Wait for green...</Text>}
            {gameState === "started" && <FaHandPointer size="3em" />}
          </Center>
        </Box>
        <Button colorScheme="blue" size="lg" leftIcon={<FaHandPointer />} onClick={gameState === "waiting" ? handleStartClick : handleResponseClick}>
          {gameState === "waiting" ? "Start" : "Click!"}
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
