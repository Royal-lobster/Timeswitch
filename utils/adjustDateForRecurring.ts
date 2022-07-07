import dayjs, { ManipulateType } from 'dayjs';
import { RecurringFrequency } from '../types';

export const adjustDateForRecurring = (
  date: string,
  time: string,
  recurringFrequency: string | undefined
) => {
  const currentDate = dayjs();
  const eventDateTime = dayjs(`${date} ${time}`);

  const findNextOccurrence = (relativeUnit: ManipulateType, offset = 1) => {
    let targetEventDate = eventDateTime;
    while (targetEventDate.isBefore(dayjs())) {
      targetEventDate = targetEventDate.add(offset, relativeUnit);
    }
    return targetEventDate.format('YYYY-MM-DD');
  };

  if (currentDate.isAfter(eventDateTime)) {
    const todayDate = dayjs().format('YYYY-MM-DD');
    const todayEventDateTime = dayjs(`${todayDate} ${time}`);

    switch (recurringFrequency) {
      case RecurringFrequency.EveryDay:
        if (dayjs().isAfter(eventDateTime)) {
          return todayEventDateTime.add(1, 'day').format('YYYY-MM-DD');
        }
        return todayEventDateTime.format('YYYY-MM-DD');

      case RecurringFrequency.AlternateDays:
        return findNextOccurrence('day', 2);

      case RecurringFrequency.EveryWeek:
        return findNextOccurrence('week');

      case RecurringFrequency.EveryMonth:
        return findNextOccurrence('month');

      case RecurringFrequency.EveryYear:
        return findNextOccurrence('year');

      default:
        return date;
    }
  }

  return date;
};
