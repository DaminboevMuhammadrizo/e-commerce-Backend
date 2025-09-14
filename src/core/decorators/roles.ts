import { SetMetadata } from "@nestjs/common";
import { UsersRole } from "src/common/types/EnumTypes";

export const Roles = (...roles: UsersRole[]) => SetMetadata('roles', roles)
