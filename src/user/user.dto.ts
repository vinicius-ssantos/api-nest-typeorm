export class UserDto {
  id: string;
  name: string;
  email: string;
}

export interface FindAllParameters {
  name: string;
  email: string;
}
