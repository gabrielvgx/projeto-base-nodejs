export type Activity = {
  id: string;
  name: string;
  description?: string;
  estimatedPrice?: number;
  estimatedDurationMinutes: number;
  bookingLeadTimeMinutes?: number;
  bookingLeadDays?: number;
};

export type ActivityCreatePayload = Omit<Activity, 'id'>;
