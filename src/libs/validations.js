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
