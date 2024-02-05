"use client";

import { Currency } from "@/gql/generated/graphql";
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  Input,
  Select,
  Spacer,
  Text,
  Wrap,
  WrapItem,
  useCheckbox,
} from "@chakra-ui/react";
import React from "react";
import { LuSearch } from "react-icons/lu";

const TransactionsSearchbar = () => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox();
  return (
    <Card>
      <CardBody>
        <Wrap>
          <WrapItem>
            <FormControl>
              <Select placeholder="Select Date Range" w={"100%"}>
                <option>Custom range</option>
                <option>Today</option>
                <option>This week</option>
                <option>This month</option>
                <option>This year</option>
              </Select>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl>
              <Input type="date" placeholder="Start date" />
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl>
              <Input type="date" placeholder="End date" />
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl>
              <Select placeholder="Categories">
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
              </Select>
              {/* <FormHelperText>Questa sarà una multiselect</FormHelperText> */}
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl>
              <Select placeholder={"Currency"}>
                {(Object.keys(Currency) as Array<keyof typeof Currency>).map((value) => (
                  <option key={value} value={value}>
                    {value.toUpperCase()}
                  </option>
                ))}
              </Select>
            </FormControl>
          </WrapItem>
          <WrapItem>
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
          </WrapItem>
          <Spacer />
          <WrapItem>
            <FormControl>
              <Button rightIcon={<LuSearch />} w={"full"} colorScheme="teal">
                Search
              </Button>
            </FormControl>
          </WrapItem>
        </Wrap>
      </CardBody>
    </Card>
  );
};

export default TransactionsSearchbar;
