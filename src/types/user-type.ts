export type UserItemResponse = {
  _id?: string;
  name: string;
  email: string;
  gender: string;
  phone_number: string;
  address: string;
  birth_date: string;
  role: string;
  is_verified: boolean;
  email_verified_at: string;
  asset?:
    | {
        _id?: string | null | undefined;
        publicUrl?: string | null | undefined;
      }
    | undefined
    | null;
};

export type UpdatePasswordUser = {
  password: string;
  confirmPassword: string;
};
