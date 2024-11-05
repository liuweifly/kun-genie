'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  // id: z.string(),
  name: z.string({
      invalid_type_error: 'Please enter a name.',
  }),
  gender: z.enum(['male', 'female'], {
      invalid_type_error: 'Please select an gender.',
  }),
  birthDateTime: z.string(),
});

const CreateCustomerInfo = FormSchema; 
// const UpdateInfo = FormSchema.omit({ id: true, birthDateTime: true });

export type State = {
  errors?: {
    name?: string[];
    birthDateTime?: string[];
    gender?: string[];
  };
  message?: string | null;
  values?: {
    name?: string;
    birthDateTime?: string;
    gender?: string;
  };
};

export async function createCustomerInfo(prevState: State, formData: FormData): Promise<State> {
  const rawFormData = {
    name: formData.get('name'),
    birthDateTime: formData.get('birthDateTime'),
    gender: formData.get('gender'),
  };
  //在当前页面展示form中的信息
  const validatedFields = CreateCustomerInfo.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customer Info.',
      values: {
        name: formData.get('name')?.toString(),
        birthDateTime: formData.get('birthDateTime')?.toString(),
        gender: formData.get('gender')?.toString(),
      },
    };
  }
  console.log(validatedFields.data);
  //如果填写数据正确，则返回成功信息和空错误信息以及填写信息
  return { message: 'Success!', errors: {}, values: validatedFields.data };

  //插入info到数据库中        
  // const { name, gender, birthDateTime } = validatedFields.data;
  // const userId = '76d65c26-f784-44a2-ac19-586678f7c2f2';

  // try {
  //   await sql`
  //     INSERT INTO customerInfo (name, gender, birthDateTime, userId)
  //     VALUES (${name}, ${gender}, ${birthDateTime}, ${userId})
  //   `;
  //   // console.log('Success!', validatedFields.data);
  //   return { message: 'Success!', errors: {}, values: validatedFields.data};
  // } catch (error) {
  //   console.error('Error:', error);
  //   return {
  //     message: 'Database Error: Failed to Create Customer Info.',
  //     // errors: {},
  //     // values: {}
  //   };
  // }
}
