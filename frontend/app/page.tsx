"use client";

import { useFooStore } from "@/utils/zustand/fooStore";

export default function Home() {
  const { increment, decrement, count } = useFooStore();
  return (
    <>
      <p>{count}</p>
      <button
        onClick={() => {
          increment(5);
        }}
      >
        increment
      </button>
      <button onClick={decrement}>decrement</button>
    </>
  );
}
