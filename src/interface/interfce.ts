import { createServer } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { ZodNumber, z } from "zod";

const PasswordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string()
    .min(6)
    .refine(value => PasswordStrengthRegex.test(value), {
      message: 'Password must contain at least  6 characters, including at least one uppercase letter and one special character',
    }),
});

export type SignUp = z.infer<typeof SignUpSchema>
  
export const LoginSchema = z.object({
  email: z.string()
    .email()
    .nonempty(),
  password: z.string()
    .min(6)
    .nonempty(),
});

export type Login = z.infer<typeof LoginSchema>

export const UserProfileSchema = z.object({
  username: z.string().min(4, 'Username must be at least  4 characters').max(10, 'Username must be less than or equal to  10 characters'),
  image: z.any().refine(file => {
    // Assuming `file` is an instance of File or similar
    return file && file.byteLength <=  400 *  1024; //  400 KB
  }, 'File size must be less than or equal to  400 KB'),
});

export type Users = z.infer<typeof UserProfileSchema>

  export interface RockClimbing {
    id:number,
    place:string,
    grade:string,
    approved:boolean,
    lat:number,
    long:number,
    description:string,
}
export interface WeatherData {
  
  weather: {
    main: string;
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  visibility: number;
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
}
export interface User {
  username: string;
  avatar_url: string;
}
export interface Comments {
  id:number
  user_id:number,
  rock_id:number,
  content:string,
  users?: User;

}
export interface userRoutes {
  id:number,
  user_id:string,
  rock_id:number,
  rocks:{
    place:string
  }
}