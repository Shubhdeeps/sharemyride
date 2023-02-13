import { useState } from "react";
import ListingCarRides from "./timeline/ListingCarRides";
import ListingPassengers from "./timeline/ListingPassenger";

export default function SingleRoutePage() {
  const [activeNavButton, setActiveNavButton] = useState<"cars" | "passenger">(
    "cars"
  );

  return (
    <>
      {activeNavButton === "cars" ? (
        <ListingCarRides
          setActiveNavButton={setActiveNavButton}
          activeNavButton={activeNavButton}
        />
      ) : (
        <ListingPassengers
          setActiveNavButton={setActiveNavButton}
          activeNavButton={activeNavButton}
        />
      )}
    </>
  );
}
