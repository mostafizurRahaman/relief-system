import { UserRole, UserStatus } from "@prisma/client";



export interface IAdmin { 
  password: string;
  admin: { 
    fullName: string;
    phoneNumber: string;
    role?: UserRole;
    profileImg: string; 
    email?: string;
    address: string; 
    isDeleted: boolean;
    status?: UserStatus
  } 

}