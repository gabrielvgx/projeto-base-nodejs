export type ActivityCreatePayload = {
  name: string;
  description?: string;
  estimatedPrice?: number;
  estimatedDurationMinutes: number;
  bookingLeadTimeMinutes?: number;
  bookingLeadDays?: number;
};
