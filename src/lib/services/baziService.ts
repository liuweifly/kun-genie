import { Lunar } from 'lunar-typescript';
import { Gender, Stem, Branch, WuXing, TenGod } from '../types/enums';
import { BaZi, UserInput } from '../types/interfaces';
import { stemWuXingMap, branchWuXingMap, branchHiddenStemMap } from '../constants/mapping';
import { positionScores, getSupportiveWuxing, getRestraintWuxing } from '../constants/wuxingRelations';
import { fortuneScores, FortuneType } from '../constants/fortuneScores';
import { tenGodMap } from '../constants/tenGodMapping';
import { getStemWuXingColor, getBranchWuXingColor } from '../utils/colors';

export class BaziService {
  // 计算八字
  static calculateBazi(birthDate: Date): BaZi {
    const lunar = Lunar.fromDate(birthDate);
    
    return {
      year: {
        stem: lunar.getYearGan() as Stem,
        branch: lunar.getYearZhi() as Branch
      },
      month: {
        stem: lunar.getMonthGan() as Stem,
        branch: lunar.getMonthZhi() as Branch
      },
      day: {
        stem: lunar.getDayGan() as Stem,
        branch: lunar.getDayZhi() as Branch
      },
      hour: {
        stem: lunar.getTimeGan() as Stem,
        branch: lunar.getTimeZhi() as Branch
      }
    };
  }

  // 计算五行属性
  static calculateStemBranchWuxing(bazi: BaZi): WuXing[] {
    const wuxingArray: WuXing[] = [];

    // 添加天干的五行
    wuxingArray.push(stemWuXingMap[bazi.year.stem]);
    wuxingArray.push(stemWuXingMap[bazi.month.stem]);
    wuxingArray.push(stemWuXingMap[bazi.day.stem]);
    wuxingArray.push(stemWuXingMap[bazi.hour.stem]);

    // 添加地支的五行
    wuxingArray.push(branchWuXingMap[bazi.year.branch]);
    wuxingArray.push(branchWuXingMap[bazi.month.branch]);
    wuxingArray.push(branchWuXingMap[bazi.day.branch]);
    wuxingArray.push(branchWuXingMap[bazi.hour.branch]);

    return wuxingArray;
  }

  // 计算当天八字
  static calculateCurrentDayBazi(): BaZi {
    const currentDate = new Date();
    return this.calculateBazi(currentDate);
  }

  // 计算地支藏干
  static calculateHiddenStems(branch: Branch): Stem[] {
    const hiddenStem = branchHiddenStemMap[branch];
    const stems: Stem[] = [hiddenStem.main];
    
    if (hiddenStem.secondary) {
      stems.push(hiddenStem.secondary);
    }
    
    if (hiddenStem.tertiary) {
      stems.push(hiddenStem.tertiary);
    }
    
    return stems;
  }

  // 计算天干和藏干的五行
  static calculateHiddenStemsWuxing(bazi: BaZi): {
    stems: { position: string; stem: Stem; wuxing: WuXing }[];
    hiddenStems: { position: string; branch: Branch; stems: { stem: Stem; wuxing: WuXing }[] }[];
  } {
    const stems = [
      { position: '年干', stem: bazi.year.stem, wuxing: stemWuXingMap[bazi.year.stem] },
      { position: '月干', stem: bazi.month.stem, wuxing: stemWuXingMap[bazi.month.stem] },
      { position: '日干', stem: bazi.day.stem, wuxing: stemWuXingMap[bazi.day.stem] },
      { position: '时干', stem: bazi.hour.stem, wuxing: stemWuXingMap[bazi.hour.stem] }
    ];

    const hiddenStems = [
      {
        position: '年支',
        branch: bazi.year.branch,
        stems: this.calculateHiddenStems(bazi.year.branch)
          .map(stem => ({ stem, wuxing: stemWuXingMap[stem] }))
      },
      {
        position: '月支',
        branch: bazi.month.branch,
        stems: this.calculateHiddenStems(bazi.month.branch)
          .map(stem => ({ stem, wuxing: stemWuXingMap[stem] }))
      },
      {
        position: '日支',
        branch: bazi.day.branch,
        stems: this.calculateHiddenStems(bazi.day.branch)
          .map(stem => ({ stem, wuxing: stemWuXingMap[stem] }))
      },
      {
        position: '时支',
        branch: bazi.hour.branch,
        stems: this.calculateHiddenStems(bazi.hour.branch)
          .map(stem => ({ stem, wuxing: stemWuXingMap[stem] }))
      }
    ];

    return { stems, hiddenStems };
  }

  // 更新主计算方法
  static calculate(input: UserInput): {
    bazi: BaZi;
    currentDayBazi: BaZi;
    stemBranchwuxing: WuXing[];
    hiddenStemsWuxing: {
        stems: { position: string; stem: Stem; wuxing: WuXing }[];
        hiddenStems: { position: string; branch: Branch; stems: { stem: Stem; wuxing: WuXing }[] }[];
    };
  } {
    const bazi = this.calculateBazi(input.birthDate);
    const currentDayBazi = this.calculateCurrentDayBazi();
    const stemBranchwuxing = this.calculateStemBranchWuxing(bazi);
    const hiddenStemsWuxing = this.calculateHiddenStemsWuxing(bazi);
  
    return {
        bazi,
        currentDayBazi,
        stemBranchwuxing,
        hiddenStemsWuxing,
    };
  }
}