import { ONE_DAY_IN_MILISECONDS } from '../constants';
import { calculateCorpusChristi, calculateEaster, calculatePentecost } from './calculateHolidaysDates';

export const getHolidaysForYear = (year: number): Date[] => {
    const easter = calculateEaster(year);
    const easterMonday = new Date(easter.getTime() + ONE_DAY_IN_MILISECONDS);
    const pentecost = calculatePentecost(easter);
    const corpusChristi = calculateCorpusChristi(easter);

    const holidays: Date[] = [
        new Date(`${year}-01-01`),      // Nowy Rok, 1 stycznia
        new Date(`${year}-01-06`),      // Trzech Króli, 6 stycznia
        easter,                         // Wielkanoc, 22 marca - 25 kwietnia
        easterMonday,                   // Poniedziałek wielkanocny, 23 marca - 26 kwietnia
        new Date(`${year}-05-01`),      // Święto Pracy, 1 maja
        new Date(`${year}-05-03`),      // Święto Konstytucji 3 Maja, 3 maja
        corpusChristi,                  // Boże ciało, 21 maja - 24 czerwca
        new Date(`${year}-08-15`),      // Wniebowzięcie NMP, 15 sierpnia
        new Date(`${year}-11-01`),      // Wszystkich Świętych, 1 listopada
        new Date(`${year}-11-11`),      // Święto Niepodległości, 11 listopada
        new Date(`${year}-12-25`),      // Boże Narodzenie, 25 grudnia
        new Date(`${year}-12-26`),      // Drugi dzień Bożego Narodzenia, 26 grudnia
    ];

    return holidays;
};
