export default interface User {
  id?: number;
  email: string;
  roles?: string[];
  isBlocked?: boolean;
}
