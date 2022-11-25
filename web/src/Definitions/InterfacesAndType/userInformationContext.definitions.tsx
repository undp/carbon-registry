export type UserProps = {
  id: string;
  userRole: string;
};

export interface UserContextProps {
  userInfoState?: UserProps;
  setUserInfo: (val: UserProps) => void;
  removeUserInfo: () => void;
  IsAuthenticated: () => boolean;
}
