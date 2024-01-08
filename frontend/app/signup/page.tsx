"use client";

import { Input } from "@chakra-ui/react";
import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <div>
      signup
      <Input placeholder="Basic usage" />
    </div>
  );
};

export default Signup;
