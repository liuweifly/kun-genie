'use server';

import { z } from 'zod';
import { Gender } from '../types/enums';
import { UserInput } from '../types/interfaces';
import { BaziService } from '../services/baziService';
import { DaYunService } from '../services/dayunService';
import { createCustomer, createFortune } from '../db/actions'
import { Lunar } from 'lunar-typescript';
import { BusinessError, DatabaseError } from '../exceptions/AppError';
import { logError, logInfo } from './logger';

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
    daYunData?: string;
    tenGodData?: string;
  };
};

export async function createCustomerInfo(prevState: State, formData: FormData): Promise<State> {

  const rawFormData = {
    name: formData.get('name'),
    birthDateTime: formData.get('birthDateTime'),
    gender: formData.get('gender'),
    userId: '76d65c26-f784-44a2-ac19-586678f7c2f2',
  };

  try {  
    logInfo('用户输入信息', rawFormData);

    const validatedFields = CreateCustomerInfo.safeParse(rawFormData);
    if (!validatedFields.success) {
      throw new BusinessError('输入数据验证失败');
    }

    // 创建或更新客户信息
    const customer = await createCustomer({
      name: validatedFields.data.name,
      birthDateTime: validatedFields.data.birthDateTime,
      gender: validatedFields.data.gender as Gender,
      userId: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    }).catch(error => {
      logError('创建用户失败:', error);
      throw new DatabaseError('创建用户信息失败');
    });

    

    //将浏览器时区的时间转换为UTC时间，避免时区问题。
    //我国曾在从1986年至1991年实行过夏时令，所以在这段时间内出生的国人需要减去1小时，才是真实出生时间。
    const birthDate = new Date(validatedFields.data.birthDateTime);
    const userInput: UserInput = {
      gender: validatedFields.data.gender as Gender,
      birthDate: birthDate
    };

    // 八字计算
    const result = BaziService.calculate(userInput);

    // 大运计算
    const dayunResult = DaYunService.calculateDaYun(
      birthDate,
      validatedFields.data.gender as Gender,
      result.bazi.year.branch,
      result.bazi.month.stem,
      result.bazi.month.branch
    );
    

    // 保存运势结果
    await createFortune(customer.id, {
      overallScore: result.dayFortune.score,
      details: {
        bazi: result.bazi,
        currentDayBazi: result.currentDayBazi,
        strength: result.strength,
        dayFortune: result.dayFortune
      }
    }).catch(error => {
      logError('保存运势结果失败:', error);
      throw new DatabaseError('保存运势结果失败');
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
        dayFortune: JSON.stringify(result.dayFortune),
        daYunData: JSON.stringify(dayunResult),
        tenGodData: JSON.stringify(result.tenGods)
      } 
    };
  } catch (error) {
    logError('处理用户信息失败:', error);

    // 转换 rawFormData 为符合 State.values 类型的对象
    const errorValues = {
      name: rawFormData.name?.toString(),
      birthDateTime: rawFormData.birthDateTime?.toString(),
      gender: rawFormData.gender?.toString(),
    };
    
    // 根据错误类型返回不同的错误信息
    if (error instanceof BusinessError) {
      return {
        message: error.message,
        errors: {},
        values: errorValues
      };
    }
    
    if (error instanceof DatabaseError) {
      return {
        message: '系统错误，请稍后重试',
        errors: {},
        values: errorValues
      };
    }

    return {
      message: '未知错误，请联系管理员',
      errors: {},
      values: errorValues
    };
  }
}

//获取dify运势，短期废弃
export async function getFortune(values: {
  name?: string;
  birthDateTime?: string;
  gender?: string;
}) {
  try {
    if (!values.birthDateTime) {
      throw new BusinessError('出生日期时间不能为空');
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
        response_mode: "blocking",
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      logError('Dify API 错误响应:', errorText);
      throw new BusinessError('获取运势信息失败');
    }

    const data = await response.json();
    logInfo('Dify API 响应数据:', data);

    return { text: data.answer };

  } catch (error) {
    logError('获取运势失败:', error);
    if (error instanceof BusinessError) {
      throw error;
    }
    throw new BusinessError('获取运势信息失败，请稍后重试');
  }
}

