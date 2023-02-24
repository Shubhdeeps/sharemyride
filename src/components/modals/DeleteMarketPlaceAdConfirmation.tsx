import React from "react";
import ModalWrapper from "./ModalWrapper";
import DeleteTicket from "./ticketActions/DeleteTicket";
export default function DeleteMarketPlaceAdConfirmation({
  marketTicketId,
  setAction,
}: {
  marketTicketId: string;
  setAction: Function;
}) {
  return (
    <ModalWrapper>
      <DeleteTicket
        role="market"
        ticketId={marketTicketId}
        setAction={setAction}
      />
    </ModalWrapper>
  );
}
