import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Head from "next/head";

const IndexPage = () => {
  const toast = useToast();
  return (
    <Box d="flex" h="100vh" justifyContent="center" fontFamily="inter">
      <Head>
        <title>Sivu link shortener</title>
      </Head>
      <Formik
        initialValues={{ slug: "", url: "" }}
        onSubmit={async (values) => {
          console.log(values);

          const regexCheck = /\W|_/g;

          if (
            values.slug === "" ||
            regexCheck.test(values.slug) ||
            values.url === ""
          ) {
            return toast({
              title: "invalid slug",
              description: `Slug can only contain alphanumeric values`,
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top-right",
            });
          }

          const response = await fetch("/api/getSlug", {
            body: JSON.stringify({
              slug: values.slug,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });
          const data = await response.json();

          if (data.errors === "url") {
            toast({
              title: "invalid url",
              description: `${values.slug} has already been assigned to another url`,
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top-right",
            });

            return;
          }

          await fetch("/api/createSlug", {
            body: JSON.stringify({
              slug: values.slug,
              url: values.url,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });

          toast({
            title: "Link shortened",
            description: `${values.url} has been shortened to the URL: https://s.sivu.tk/${values.slug}.`,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        }}
      >
        <Form>
          <Box w={{ sm: "90vw", lg: "50vw" }} mt={10}>
            <Heading mb={4}>Sivu link shortener</Heading>
            <Text mb={8}>
              Use this for personal work, or when adding links to the Sivu project!
            </Text>
            <Box mb={6}>
              <FormLabel>Long link:</FormLabel>
              <Field
                as={Input}
                placeholder="ex: https://github.com/Sivu-Tutorials/"
                size="lg"
                name="url"
              />
            </Box>
            <Box mb={6}>
              <FormLabel>Slug of short link.</FormLabel>
              <Field
                as={Input}
                placeholder="ex: website"
                size="lg"
                name="slug"
              />
            </Box>
          </Box>
          <Button colorScheme="teal" type="submit">
            <Text>create link</Text>
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default IndexPage;
