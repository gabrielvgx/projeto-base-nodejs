import type { LeadTimeConfig } from '@types';
import dayjs from 'dayjs';

class BookingLeadTimeHelper {
  isValidLeadTime(scheduledAt: Date, leadTimeConfig?: LeadTimeConfig): boolean {
    const { leadTimeInMinutes = 0, leadTimeInDays = 0 } = leadTimeConfig || {};
    const now = dayjs();
    const minAllowedDate = now
      .add(leadTimeInMinutes || 0, 'minute')
      .add(leadTimeInDays || 0, 'day');

    const scheduledDate = dayjs(scheduledAt);
    return scheduledDate.isSame(minAllowedDate) || scheduledDate.isAfter(minAllowedDate);
  }
}

const instance = new BookingLeadTimeHelper();
export { instance as BookingLeadTimeHelper };
