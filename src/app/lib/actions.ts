'use server';
import { z } from 'zod';
// import { sql } from '@vercel/postgres';

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

const CreateInfo = FormSchema; 
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

export async function createInfo(prevState: State, formData: FormData): Promise<State> {
  const rawFormData = {
    name: formData.get('name'),
    birthDateTime: formData.get('birthDateTime'),
    gender: formData.get('gender'),
  };
  //在当前页面展示form中的信息
  const validatedFields = CreateInfo.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Info.',
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

  // 插入info到数据库中 
  // const { name, gender, birthDateTime } = validatedFields.data;

  // try {
  //   await sql`
  //     INSERT INTO info (name, gender, birthDateTime)
  //     VALUES (${name}, ${gender}, ${birthDateTime})
  //   `;
  //   return { message: 'Success!', errors: {}, values: {} };
  // } catch (error) {
  //   return {
  //     message: 'Database Error: Failed to Create Info.',
  //     // errors: {},
  //     // values: {}
  //   };
  // }
}
