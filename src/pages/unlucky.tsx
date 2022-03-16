import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import img404 from "../../public/404.svg";

interface Props404 {}

const Page404: React.FC<Props404> = ({}) => {
  const router = useRouter();
  return (
    <Box>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Box minH="100vh" d="flex" fontFamily="inter" w="100vw">
        <Box
          w={{ sm: "100vw", md: "50vw" }}
          d="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box m={8} maxW={{ sm: "40vw", md: "20vw" }}>
            <Heading fontSize={{ sm: "5xl", md: "6xl", lg: "7xl" }}>
              404
            </Heading>
            <Box
              w="16"
              h="1"
              bgColor="plum"
              mt={{ sm: 3, md: 6 }}
              mb={{ sm: 3, md: 6 }}
            ></Box>
            <Text
              fontSize={{ sm: "lg", md: "xl", lg: "2xl", xl: "3xl" }}
              mb={8}
            >
              Invalid redirect link
            </Text>
            <Button
              variant="outline"
              colorScheme="purple"
              onClick={() => {
                router.push("/");
              }}
            >
              <Text color="black">Go Home</Text>
            </Button>
          </Box>
        </Box>
        <Box
          position="relative"
          pb={{ sm: 96, md: 0 }}
          pt={96}
          d={{ sm: "none", md: "flex" }}
          minH={{ sm: "auto", md: "100vh" }}
          w={{ sm: "100vw", md: "50vw" }}
        >
          <Image src={img404} layout="fill" objectFit="cover" />
        </Box>
      </Box>
    </Box>
  );
};

export default Page404;
