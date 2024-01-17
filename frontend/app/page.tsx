"use client";

import React, { useState } from "react";
import Login from "./login/page";

export default function Page() {
  const [isLoggedIn, SetIsLoggedIn] = useState<boolean>(false);

  return <>{isLoggedIn ? <></> : <Login />}</>;
}
