export const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
};

export const isHoliday = (date: Date, holidays: Date[]): boolean => {
    return holidays.some(
        (holiday) =>
            holiday.getFullYear() === date.getFullYear() &&
            holiday.getMonth() === date.getMonth() &&
            holiday.getDate() === date.getDate(),
    );
};
