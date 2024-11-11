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