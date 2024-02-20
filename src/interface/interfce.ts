import { createServer } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";

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

export const usernameSchema = z.string().min(4,'username has to be at least 4 charcaters')
.max(8,'username must be 8 charcters or less')
.regex(/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters')
.refine(async (username)=>{
  const cookiesShop = cookies()
  const supabase = await createServer(cookiesShop)
  const { data } = await supabase
      .from('profiles')
      .select('display_name')
      .eq('display_name', username)
      .single();
      return !data;
},'Username is already taken');


export type Users = z.infer<typeof usernameSchema>
  export interface RockClimbing {
    id:number,
    place:string,
    grade:string,
    approved:boolean,
    lat:number,
    long:number,
}