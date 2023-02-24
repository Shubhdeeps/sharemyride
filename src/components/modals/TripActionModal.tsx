import React from "react";
import { RidePopUpNonNull } from "../../types/customTypes.model";
import ModalWrapper from "./ModalWrapper";
import DeleteTicket from "./ticketActions/DeleteTicket";
import EditRide from "./ticketActions/EditRideModal";
import NewReport from "./ticketActions/NewReport";

export default function TripActionModal({
  action,
  setAction,
  role,
}: {
  action: RidePopUpNonNull;
  setAction: Function;
  role: "passenger" | "ride";
}) {
  const actionKey = Object.keys(action)[0];
  const actionValue = Object.values(action)[0];
  let childComponent = <></>;
  switch (actionKey) {
    case "edit":
      childComponent = (
        <EditRide ticketId={actionValue} setAction={setAction} role={role} />
      );
      break;
    case "report":
      childComponent = (
        <NewReport ticketId={actionValue} setAction={setAction} role={role} />
      );
      break;
    case "delete":
      childComponent = (
        <DeleteTicket
          ticketId={actionValue}
          setAction={setAction}
          role={role}
        />
      );
      break;
    default:
      break;
  }

  return (
    <ModalWrapper>
      <div
        className="d-flex flex-column gap-2 p-2"
        style={{ minWidth: "300px" }}
      >
        <span className="fw-bold text-3">
          {Object.keys(action)[0].toUpperCase()} {role.toUpperCase()}
        </span>
        {childComponent}
      </div>
    </ModalWrapper>
  );
}
