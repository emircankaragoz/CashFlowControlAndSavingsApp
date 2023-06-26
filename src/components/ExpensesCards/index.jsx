import React from "react";
import CommonCard from "./CommonCard";
import CategoryCard from "./CategoryCard";
import DateBasedCard from "./DateBasedCard";

export default function ExpensesCards({session}) {

  return (
    <>
      <div className="container my-3">
        <CommonCard session={session}/>
        <CategoryCard session={session}/>
        <DateBasedCard session={session}/>
      </div>
    </>
  );
}
