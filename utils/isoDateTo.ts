export default function getYear(date: string) {
  const year = new Date(date);
  console.log(year);
  console.log(year.getFullYear());
  return year.getFullYear();
}
