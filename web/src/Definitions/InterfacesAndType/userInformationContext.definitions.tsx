export type UserProps = {
  email: string;
  id?: string;
  fullName: string;
  userRole?: string;
};

export interface UserContextProps {
  userInfo?: UserProps;
  setUserInfo: (val: UserProps) => void;
  removeUserInfo: () => void;
  setFullName: (val: string) => void;
  getFullName: () => string;
  IsAuthenticated: () => boolean;
}
