'use server';

import { z } from 'zod';
import { Lunar } from 'lunar-typescript';
import { Gender } from '../types/enums';
import { UserInput } from '../types/interfaces';
import { BaziService } from '../services/baziService';

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
    bazi?: string; // 新增 bazi 属性
    currentDayBazi?: string;
    stemBranchwuxing?: string; // 新增 wuxing 属性
    hiddenStemsWuxing?: string;
    strength?: string;
    dayFortune?: string;
  };
};

export async function createCustomerInfo(prevState: State, formData: FormData): Promise<State> {
  const rawFormData = {
    name: formData.get('name'),
    birthDateTime: formData.get('birthDateTime'),
    gender: formData.get('gender'),
  };
  console.log('用户输入信息', rawFormData);

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

  try {
    const birthDate = new Date(validatedFields.data.birthDateTime);
    const userInput: UserInput = {
      gender: validatedFields.data.gender as Gender,
      birthDate: birthDate
    };

    const result = BaziService.calculate(userInput);
    console.log('八字计算结果：', {
      bazi: result.bazi,
      currentDayBazi: result.currentDayBazi,
      stemBranchwuxing: result.stemBranchwuxing,
      hiddenStemsWuxing: {
        stems: JSON.stringify(result.hiddenStemsWuxing.stems),
        hiddenStems: JSON.stringify(result.hiddenStemsWuxing.hiddenStems)
      },
      strength: {
        score: result.strength.score,
        status: result.strength.status,
        details: JSON.stringify(result.strength.details, null, 2)  // 只对 details 使用 JSON.stringify
      },
      dayFortune: {
        score: result.dayFortune.score,
        details: JSON.stringify(result.dayFortune.details.map(detail => ({
          position: detail.position,
          wuxing: detail.wuxing,
          score: detail.score,
          type: detail.type
        })), null, 2)
      }
    });

    return { 
      message: 'Success!', 
      errors: {}, 
      values: {
        ...validatedFields.data,
        bazi: JSON.stringify(result.bazi),
        currentDayBazi: JSON.stringify(result.currentDayBazi),
        stemBranchwuxing: JSON.stringify(result.stemBranchwuxing),
        hiddenStemsWuxing: JSON.stringify(result.hiddenStemsWuxing),
        strength: JSON.stringify(result.strength),
        dayFortune: JSON.stringify(result.dayFortune)
      } 
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      message: '计算八字时出错',
      errors: {},
      values: validatedFields.data
    };
  }
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
