import { Gender, Stem, Branch } from './enums';

export interface UserInput {
  gender: Gender;
  birthDate: Date;
}

export interface BaZi {
  year: { stem: Stem; branch: Branch };
  month: { stem: Stem; branch: Branch };
  day: { stem: Stem; branch: Branch };
  hour: { stem: Stem; branch: Branch };
}

export interface BaZiApiResponse {
  code: number;
  data: {
    yearGanZhi: string;
    monthGanZhi: string;
    dayGanZhi: string;
    timeGanZhi: string;
  };
}

// 藏干映射表
export interface HiddenStem {
  main: Stem;
  secondary?: Stem;
  tertiary?: Stem;
}

// 新增数据库相关的接口定义
export interface CustomerInfo {
  id?: string;           // 可选，因为创建时不需要
  name: string;
  birthDateTime: string;
  gender: Gender;
  userId: string;
}

export interface UserInfo {
  userId: string;
  userName: string;
}

// Fortune 相关接口
export interface FortuneInfo {
  customerId: string;
  fortuneDate: Date;
  overallScore: number;
  details: any; // 可以根据实际数据结构定义更具体的类型
}