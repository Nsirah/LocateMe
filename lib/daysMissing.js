export function getMissingDays(dateMissing) {

  const today = new Date();

  const missingDate = new Date(dateMissing);

  const difference =
    today.getTime() - missingDate.getTime();

  return Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

}