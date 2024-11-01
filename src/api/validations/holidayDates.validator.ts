export const holidayDatesValidator = (startDate: string, endDate: string): boolean => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isEndDateAfterStartDate = end >= start;
    const areDatesInFuture = start >= today && end >= today;

    const isValidated = isEndDateAfterStartDate && areDatesInFuture;

    return isValidated;
};
