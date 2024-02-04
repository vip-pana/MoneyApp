"use client";

import { Currency } from "@/gql/generated/graphql";
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  HStack,
  Input,
  Select,
  Spacer,
  Text,
  useCheckbox,
} from "@chakra-ui/react";
import React from "react";
import { LuSearch } from "react-icons/lu";

const TransactionsSearchbar = () => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox();
  return (
    <Card>
      <CardBody>
        <HStack>
          <FormControl minW={"180px"}>
            <Select placeholder="Select Date Range">
              <option>Custom range</option>
              <option>Today</option>
              <option>This week</option>
              <option>This month</option>
              <option>This year</option>
            </Select>
          </FormControl>
          <FormControl>
            <Input type="date" placeholder="Start date" />
          </FormControl>
          <FormControl>
            <Input type="date" placeholder="End date" />
          </FormControl>
          <FormControl>
            <Select placeholder="Categories">
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Select>
            {/* <FormHelperText>Questa sarà una multiselect</FormHelperText> */}
          </FormControl>
          <FormControl>
            <Select placeholder={"Currency"}>
              {(Object.keys(Currency) as Array<keyof typeof Currency>).map((value) => (
                <option key={value} value={value}>
                  {value.toUpperCase()}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Box
              cursor="pointer"
              borderRadius={"lg"}
              borderWidth={"1px"}
              boxShadow={"md"}
              borderColor={"teal.600"}
              px={5}
              py={1}
            >
              <input {...getInputProps()} hidden />
              <Text {...getLabelProps()} textAlign={"center"}>
                Income
              </Text>
            </Box>
          </FormControl>
          <FormControl>
            <Box
              cursor="pointer"
              borderRadius={"lg"}
              borderWidth={"1px"}
              boxShadow={"md"}
              borderColor={"red.600"}
              px={5}
              py={1}
              {...htmlProps}
            >
              <Box {...getCheckboxProps()}>
                <input {...getInputProps()} hidden />
                <Text {...getLabelProps()} textAlign={"center"}>
                  {state.isChecked ? "clicked" : "Expense"}
                </Text>
              </Box>
            </Box>
          </FormControl>
          <Spacer />
          <FormControl maxW={"10%"}>
            <Button rightIcon={<LuSearch />} w={"full"} colorScheme="teal">
              Search
            </Button>
          </FormControl>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default TransactionsSearchbar;
