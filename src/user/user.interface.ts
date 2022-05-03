export interface IUserFilters {
  email?: string;
  id?: number;
}

export interface IUserCreate {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IUserUpdate {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}
