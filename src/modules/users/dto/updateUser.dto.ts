import { UserRole } from "src/common/types/EnumTypes"

export class UpdateUserDto {
  firstName: string
  lastName: string
  email: string
  role: UserRole
}
