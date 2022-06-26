import dayjs, { ManipulateType } from 'dayjs';

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
      case 'Every Day':
        if (dayjs().isAfter(eventDateTime))
          return todayEventDateTime.add(1, 'day').format('YYYY-MM-DD');
        else return todayEventDateTime.format('YYYY-MM-DD');

      case 'Alternate Days':
        return findNextOccurrence('day', 2);

      case 'Every Weak':
        return findNextOccurrence('week');

      case 'Every Month':
        return findNextOccurrence('month');

      case 'Every Year':
        return findNextOccurrence('year');

      default:
        return date;
    }
  }
};
