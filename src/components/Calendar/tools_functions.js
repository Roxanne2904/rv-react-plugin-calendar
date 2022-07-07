let oneDay = 60 * 60 * 24 * 1000;
//*L'horodatage du jour
export let todayTimestamp =
  Date.now() -
  (Date.now() % oneDay) +
  new Date().getTimezoneOffset() * 1000 * 60;

export const daysMap = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const monthMap = [
  {
    lang: "en",
    days: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  {
    lang: "fr",
    days: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septempbre",
      "Octobre",
      "Novembre",
      "Decembre",
    ],
  },
  {
    lang: "spa",
    days: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
  },
  {
    lang: "por",
    days: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
  },
  {
    lang: "ger",
    days: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],
  },
];
export const shortenedMonth = [
  {
    lang: "en",
    days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  },
  {
    lang: "fr",
    days: ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"],
  },
  {
    lang: "spa",
    days: ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"],
  },
  {
    lang: "por",
    days: ["DOM", "SEG", "TER", "QUA", "QUI", "SEXT", "SAB"],
  },
  {
    lang: "ger",
    days: ["SON", "MON", "DIEN", "MITT", "DON", "FRE", "SAM"],
  },
];
export const getNumberOfDays = (year, month) => {
  const months30 = [3, 5, 8, 10];
  const leapYear = year % 4 === 0;
  return month === 1
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
    ? 30
    : 31;
};
export const getDayDetails = (args) => {
  let rawDate = args.index - args.firstDayMonth; //ex:0-3 (index 0 and 3 = wednesday)
  let day = args.index % 7;
  let prevMonth = args.month - 1;
  let prevYear = args.year;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }
  let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  let refinedDate =
    (rawDate < 0
      ? prevMonthNumberOfDays + rawDate
      : rawDate % args.numberOfDays) + 1;
  let dayStatus = rawDate < 0 ? -1 : rawDate >= args.numberOfDays ? 1 : 0;
  let currentMonth = new Date(args.year, args.month).getMonth() + 1;
  // console.log(args.year, args.month, refinedDate);
  let timestamp = new Date(args.year, args.month, refinedDate).getTime();
  return {
    date: refinedDate,
    day,
    dayStatus,
    currentMonth,
    timestamp,
    dayString: daysMap[day],
  };
};
export const getMonthDetails = (year, month) => {
  // console.log(year); //2022
  // console.log(month); //5
  let firstDayMonth = new Date(year, month).getDay(); //3 : mercredi
  let numberOfDays = getNumberOfDays(year, month); //30 jours
  // console.log(numberOfDays);
  // console.log(month);
  let monthArray = [];
  let rows = 7;
  let currentDay = null;
  let index = 0;
  let cols = 6;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index,
        numberOfDays,
        firstDayMonth,
        year,
        month,
      });
      monthArray.push(currentDay);
      index++;
    }
  }
  return monthArray;
};
export const formatMonth = (month, lang) => {
  for (let i = 0; i < monthMap.length; i++) {
    let currentLang = monthMap[i].lang;
    if (currentLang === lang) {
      let currentDays = monthMap[i].days;
      for (let i = 0; i < currentDays.length; i++) {
        let indexOfMonthName = currentDays.indexOf(currentDays[i]);
        if (month === indexOfMonthName) {
          return currentDays[i];
        }
      }
    }
  }
};
export const formatValueCustom = (month, date, year, type, lang) => {
  switch (type) {
    case "1":
      return (
        (date < 10 ? "0" + date : date) +
        "/" +
        (month < 10 ? "0" + month : month) +
        "/" +
        year
      );
    case "2":
      return (
        year +
        "/" +
        (month < 10 ? "0" + month : month) +
        "/" +
        (date < 10 ? "0" + date : date)
      );
    default:
      return;
  }
};
export const formatADateStringIntoAnObject = (dateString) => {
  if (dateString !== null && dateString !== undefined && dateString !== "") {
    let currentDate =
      dateString.split("/")[0].length === 2
        ? dateString.split("/")[0]
        : dateString.split("/")[2];
    currentDate =
      currentDate.split("")[0] === "0" ? currentDate.split("")[1] : currentDate;

    let currentMonth = dateString.split("/")[1];

    currentMonth =
      currentMonth.split("")[0] === "0"
        ? currentMonth.split("")[1]
        : currentMonth;

    let currentYear =
      dateString.split("/")[0].length === 4
        ? dateString.split("/")[0]
        : dateString.split("/")[2];

    return { currentDate, currentMonth, currentYear };
  } else {
    return null;
  }
};
export const getDateStringFromTimestamp = (selectedDay, valueCustom, lang) => {
  let dateObject = new Date(selectedDay.timestamp);
  let month = dateObject.getMonth() + 1;
  let date = dateObject.getDate();

  if (selectedDay.dayStatus === -1) {
    let _month = selectedDay.currentMonth;
    let _date = selectedDay.currentDate;

    if (month !== _month) {
      month = month - 2;
      if (date !== _date) {
        date = _date;
      }
    } else {
      if (month === 1) {
        month = 12;
      } else {
        month = month - 1;
      }
    }
  }

  if (selectedDay.dayStatus === 1) {
    let _month = selectedDay.currentMonth;
    if (month !== _month) {
      month = month + 2;
    } else {
      if (month === 12) {
        month = 1;
      } else {
        month = month + 1;
      }
    }
  }

  return formatValueCustom(
    month,
    date,
    dateObject.getFullYear(),
    valueCustom,
    lang
  );
};