export default function getYear(date: string) {
  const year = new Date(date);
  return year.getFullYear();
}
