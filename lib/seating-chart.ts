export const APS_SEATING_CHART_ID = 'dd6032fa-7bf0-40a3-a70b-6235ccb93fe5';

export type SeatingAssignment = {
  id: string;
  registrantId: string;
  firstName?: string | null;
  lastName?: string | null;
  company?: string | null;
  email?: string | null;
  role?: string | null;
  tableNumber: number | null;
  seatingChartId: string;
};

export type SeatingRegistrantOption = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  companyName?: string | null;
  attendeeType?: string | null;
};
