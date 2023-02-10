import { useState } from "react";
import CarsList from "./CarsList";
import PassengersList from "./PassengersList";

export default function SingleRoutePage() {
  const [activeNavButton, setActiveNavButton] = useState<"cars" | "passenger">(
    "cars"
  );

  return (
    <>
      {activeNavButton === "cars" ? (
        <CarsList
          setActiveNavButton={setActiveNavButton}
          activeNavButton={activeNavButton}
        />
      ) : (
        <PassengersList
          setActiveNavButton={setActiveNavButton}
          activeNavButton={activeNavButton}
        />
      )}
    </>
  );
}
