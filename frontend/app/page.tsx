"use client";

import { Link } from "@chakra-ui/next-js";
import React, { useState } from "react";
import Login from "./login/page";

export default function Page() {
  const [isLoggedIn, SetIsLoggedIn] = useState<boolean>(false);

  return <>{isLoggedIn ? <></> : <Login></Login>}</>;
}
