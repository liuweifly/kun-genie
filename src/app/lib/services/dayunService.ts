import { Lunar } from 'lunar-typescript';
import { Gender, Branch, Stem } from '../types/enums';
import { DaYun, DaYunResult } from '../types/interfaces';
import { 
  YANG_MALE_YIN_FEMALE_BRANCHES, 
  YIN_MALE_YANG_FEMALE_BRANCHES,
  SIXTY_JIAZI 
} from '../types/enums';

export class DaYunService {

  // 确定大运顺序
  private static determineSequence(yearBranch: Branch, gender: Gender): 'forward' | 'backward' {
    if ((YANG_MALE_YIN_FEMALE_BRANCHES.includes(yearBranch) && gender === Gender.Male) || 
    (YIN_MALE_YANG_FEMALE_BRANCHES.includes(yearBranch) && gender === Gender.Female)) {
      return 'forward';
    }
    return 'backward';
  }

  // 计算起运年龄
  private static calculateStartAge(birthDate: Date, sequence: 'forward' | 'backward'): number {
    const lunar = Lunar.fromDate(birthDate);
    let timeDiff: number;
    
    if (sequence === 'forward') {
      const nextJieQi = lunar.getNextJieQi();
      const nextJieQiDate = new Date(nextJieQi.getSolar().toYmdHms().replace(' ', 'T'));
      timeDiff = (nextJieQiDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24);
    } else {
      const prevJieQi = lunar.getPrevJieQi();
      const prevJieQiDate = new Date(prevJieQi.getSolar().toYmdHms().replace(' ', 'T'));
      timeDiff = (birthDate.getTime() - prevJieQiDate.getTime()) / (1000 * 60 * 60 * 24);
    }
    // 3天为1年，四舍五入
    return Math.round(timeDiff / 3);
  }


  // 在六十甲子表中找到指定干支的索引
  private static findGanZhiIndex(stem: string, branch: string): number {
    return SIXTY_JIAZI.findIndex(gz => gz.stem === stem && gz.branch === branch);
  }
    
  // 获取下一个干支
  private static getNextGanZhi(currentIndex: number, isForward: boolean): { stem: string; branch: string } {
    const length = SIXTY_JIAZI.length; // 60
    if (isForward) {
        // 顺序，向后推1位
        const nextIndex = (currentIndex + 1) % length;
        return SIXTY_JIAZI[nextIndex];
    } else {
        // 逆序，向前推1位
    const nextIndex = (currentIndex - 1 + length) % length;
    return SIXTY_JIAZI[nextIndex];
    }
  }

  // 计算大运
  public static calculateDaYun(
    birthDate: Date,
    gender: Gender,
    yearBranch: Branch,
    monthStem: Stem,    // 月柱天干
    monthBranch: Branch,  // 月柱地支
  ): DaYunResult {

    const sequence = this.determineSequence(yearBranch, gender);
    const startAge = this.calculateStartAge(birthDate, sequence);
    const startYear = birthDate.getFullYear() + startAge;

    // 找到月柱在六十甲子表中的位置
    const monthGanZhiIndex = this.findGanZhiIndex(monthStem, monthBranch);

    // 计算8个大运
    const daYuns: DaYun[] = [];
    let currentAge = startAge;
    let currentYear = startYear;
    let currentIndex = monthGanZhiIndex;

    // 从月柱开始推算8个大运
    for (let i = 0; i < 8; i++) {
      const ganZhi = this.getNextGanZhi(currentIndex, sequence === 'forward');

      daYuns.push({
        age: currentAge,
        year: currentYear,
        stem: ganZhi.stem,
        branch: ganZhi.branch
      });

      currentAge += 10;
      currentYear += 10;
      currentIndex = this.findGanZhiIndex(ganZhi.stem, ganZhi.branch);
    }

    return {
      startAge,
      startYear,
      sequence,
      daYuns
    };
  }
} 