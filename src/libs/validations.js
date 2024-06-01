import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

export const isObjectEmpty = (obj)  =>{
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false; // Si encuentra al menos una propiedad, el objeto no está vacío
      }
    }
    return true; // Si no se encontraron propiedades, el objeto está vacío
};

export const validateLongNumber = (number,leng) => {
  const regex = /^[0-9]{leng}$/;
  return regex.test(number);
}


/**
 * 
 * date standard ISO : YYYY-MM-DD
 * example : 2024-02-01T00:00:00.000Z
 * 
 * "date": "31-05-2024",
 * "hour": "14:30:45"
 * 
 * @param {string} date date of client standard
 * @param {string} hour is requered for future
 * @returns variable convert stantard

*/
dayjs.extend(customParseFormat);

export const parseStandardDate = (date,hour) => {  
  try {
    if (date && hour) {
      const dateTime = `${date} ${hour}`;
      return dayjs(dateTime, 'DD-MM-YYYY HH:mm:ss').toISOString();
    }
    return "";
  } catch (error) {
    console.error('Error parsing date:', error);
    return "";
  }
};

/**
 * 
 * @param {string} dateStandard date type standard ISO
 * @returns date type standard client
 */
export const parseStandardClient = (dateStandard) =>{
  try {
    const parsedDate = dayjs(dateStandard).format('DD-MM-YYYY');
    return parsedDate;
  } catch (error) {
    console.error('Error parsing date:', error);
    return "";
  }
}