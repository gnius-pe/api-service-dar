
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