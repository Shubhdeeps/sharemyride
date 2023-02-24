type EditCard = {
    edit: string; //string as card id
};
type DeleteCard = {
    delete: string; // stirng as card id
};
type ReportCard = {
    report: string; // string as card id
};

export type RidePopUp = EditCard | DeleteCard | ReportCard | null;
export type RidePopUpNonNull = EditCard | DeleteCard | ReportCard;