export enum RecurringFrequency {
  EveryDay = 'Every Day',
  AlternateDays = 'Alternate Days',
  EveryWeek = 'Every Week',
  EveryMonth = 'Every Month',
  EveryYear = 'Every Year',
}

export interface ShareData {
  title: string;
  description: string;
  date: string;
  time: string;
  timezones: string[];
  primaryColor: string;
  isRecurring?: boolean;
  recurringFrequency?: RecurringFrequency;
}
