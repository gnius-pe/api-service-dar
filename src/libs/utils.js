
export const calculateAge = (birthDatePatient) => {
    // Parse the birth date
    const birth = new Date(birthDatePatient);
    const today = new Date();

    // Calculate the difference in years
    let age = today.getFullYear() - birth.getFullYear();
    
    // Adjust if the birthday hasn't occurred yet this year
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();
    const birthMonth = birth.getMonth();
    const birthDate = birth.getDate();
    
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate < birthDate)) {
        age--;
    }

    return age;
  }

export const getCurrentDateTime = () => {
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
  
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  }

  export const parseDate = (inputDate) => {
    const date = new Date(inputDate);
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${month}/${day}/${year}`;
  }