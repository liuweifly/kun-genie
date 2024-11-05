'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { Lunar } from 'lunar-typescript';

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

// 新增获取运势的函数
export async function getFortune(values: {
  name?: string;
  birthDateTime?: string;
  gender?: string;
}) {
  try {
    if (!values.birthDateTime) {
      throw new Error('出生日期时间不能为空');
    }

    // 解析日期时间字符串
    const date = new Date(values.birthDateTime);
    
    // 转换为阴历
    const lunar = Lunar.fromDate(date);
    
    // 获取八字
    const baziInfo = {
      year: lunar.getYearInGanZhi(),
      month: lunar.getMonthInGanZhi(),
      day: lunar.getDayInGanZhi(),
      time: lunar.getTimeInGanZhi(),
    };

    // 组合成查询字符串
    const query = `姓名：${values.name}，性别：${values.gender === 'male' ? '男' : '女'}，
农历生辰八字：${baziInfo.year} ${baziInfo.month} ${baziInfo.day} ${baziInfo.time}，
请根据以上信息分析今日运势。`;

    console.log('Dify API 请求参数:', { query });

    const response = await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DIFY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {},
        query: query,
        user: values.name,
        response_mode: "blocking",  // 改为阻塞模式
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Dify API 错误响应:', errorText);
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const data = await response.json();
    console.log('Dify API 响应数据:', data);

    // 返回解析后的文本内容
    return { text: data.answer };

  } catch (error) {
    console.error('获取运势失败:', error);
    throw error;
  }
}
