export function validateMissingPerson(data) {

  if (!data.fullName) return false;

  if (!data.age) return false;

  if (!data.gender) return false;

  if (!data.dateMissing) return false;

  if (!data.location) return false;

  if (!data.reporterName) return false;

  if (!data.reporterPhone) return false;

  return true;

}