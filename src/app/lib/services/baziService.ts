import { Lunar } from 'lunar-typescript';
import { Gender, Stem, Branch, WuXing } from '../types/enums';
import { BaZi, UserInput } from '../types/interfaces';
import { stemWuXingMap, branchWuXingMap, branchHiddenStemMap } from '../constants/mapping';
import { positionScores, getSupportiveWuxing, getRestraintWuxing } from '../constants/wuxingRelations';
import { fortuneScores, FortuneType } from '../constants/fortuneScores';

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

  // 计算日主身强弱
  static calculateUserStrength(bazi: BaZi): {
    score: number;
    status: 'strong' | 'balanced' | 'weak';
    details: {
      position: string;
      wuxing: WuXing;
      score: number;
    }[];
  } {
    const dayMaster = stemWuXingMap[bazi.day.stem];
    const supportiveWuxing = getSupportiveWuxing(dayMaster);
    let totalScore = 0;
    const details: { position: string; wuxing: WuXing; score: number; }[] = [];

    // 计算天干分值
    const stems = {
      year: { stem: bazi.year.stem, score: positionScores.YEAR_STEM, position: '年干' },
      month: { stem: bazi.month.stem, score: positionScores.MONTH_STEM, position: '月干' },
      day: { stem: bazi.day.stem, score: positionScores.DAY_STEM, position: '日干' },
      hour: { stem: bazi.hour.stem, score: positionScores.HOUR_STEM, position: '时干' }
    };

    // 计算地支分值
    const branches = {
      year: { branch: bazi.year.branch, score: positionScores.YEAR_BRANCH, position: '年支' },
      month: { branch: bazi.month.branch, score: positionScores.MONTH_BRANCH, position: '月令' },
      day: { branch: bazi.day.branch, score: positionScores.DAY_BRANCH, position: '日支' },
      hour: { branch: bazi.hour.branch, score: positionScores.HOUR_BRANCH, position: '时支' }
    };

    // 计算天干得分
    Object.values(stems).forEach(({ stem, score, position }) => {
      const wuxing = stemWuXingMap[stem];
      if (supportiveWuxing.includes(wuxing)) {
        totalScore += score;
        details.push({ position, wuxing, score });
      } else {
        details.push({ position, wuxing, score: 0 });
      }
    });

    // 计算地支得分
    Object.values(branches).forEach(({ branch, score, position }) => {
      const wuxing = branchWuXingMap[branch];
      if (supportiveWuxing.includes(wuxing)) {
        totalScore += score;
        details.push({ position, wuxing, score });
      } else {
        details.push({ position, wuxing, score: 0 });
      }
    });

    // 判断身强弱状态
    let status: 'strong' | 'balanced' | 'weak';
    if (totalScore > 60) {
      status = 'strong';
    } else if (totalScore >= 40 && totalScore <= 60) {
      status = 'balanced';
    } else {
      status = 'weak';
    }

    return {
      score: totalScore,
      status,
      details
    };
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

  // 计算当日运势
  static calculateDayFortune(
    dayBazi: BaZi,
    userDayMaster: WuXing,
    strengthStatus: 'strong' | 'balanced' | 'weak'
  ): {
    score: number;
    details: {
      position: string;
      wuxing: WuXing;
      score: number;
      type: FortuneType;
    }[];
  } {
    let totalScore = 0;
    const details: {
      position: string;
      wuxing: WuXing;
      score: number;
      type: FortuneType;
    }[] = [];

    // 获取当日五行
    const dayWuxing = this.calculateHiddenStemsWuxing(dayBazi);
    
    // 获取帮扶和抑制五行
    const supportiveWuxings = getSupportiveWuxing(userDayMaster);
    const restraintWuxings = getRestraintWuxing(userDayMaster);

    // 计算天干运势
    const calculateStemFortune = (stem: { position: string; stem: Stem; wuxing: WuXing }) => {
      const wuxing = stemWuXingMap[stem.stem];
      let score = 0;
      let type: FortuneType = 'NEUTRAL';

      switch (strengthStatus) {
        case 'strong':
          // 身强者看克
          if (restraintWuxings.includes(wuxing)) {
            score = fortuneScores.STEM;
            type = 'LUCKY';
          }
          break;
        case 'weak':
          // 身弱者看生
          if (supportiveWuxings.includes(wuxing)) {
            score = fortuneScores.STEM;
            type = 'LUCKY';
          }
          break;
        case 'balanced':
          // 均衡者看生克
          if (supportiveWuxings.includes(wuxing)) {
            score = fortuneScores.STEM;
            type = 'LUCKY';
          } else if (restraintWuxings.includes(wuxing)) {
            score = -fortuneScores.STEM;
            type = 'UNLUCKY';
          }
          break;
      }

      totalScore += score;
      details.push({
        position: stem.position,
        wuxing,
        score,
        type
      });
    };

    // 计算藏干运势
    const calculateHiddenStemFortune = (hiddenStem: {
      position: string;
      branch: Branch;
      stems: { stem: Stem; wuxing: WuXing }[];
    }) => {
      hiddenStem.stems.forEach((stem, index) => {
        let score = 0;
        let type: FortuneType = 'NEUTRAL';
        const scoreValue = index === 0 ? fortuneScores.HIDDEN_STEM.MAIN :
                          index === 1 ? fortuneScores.HIDDEN_STEM.SECONDARY :
                          fortuneScores.HIDDEN_STEM.TERTIARY;

        switch (strengthStatus) {
          case 'strong':
            if (restraintWuxings.includes(stem.wuxing)) {
              score = scoreValue;
              type = 'LUCKY';
            }
            break;
          case 'weak':
            if (supportiveWuxings.includes(stem.wuxing)) {
              score = scoreValue;
              type = 'LUCKY';
            }
            break;
          case 'balanced':
            if (supportiveWuxings.includes(stem.wuxing)) {
              score = scoreValue;
              type = 'LUCKY';
            } else if (restraintWuxings.includes(stem.wuxing)) {
              score = -scoreValue;
              type = 'UNLUCKY';
            }
            break;
        }

        totalScore += score;
        details.push({
          position: `${hiddenStem.position}藏${index + 1}`,
          wuxing: stem.wuxing,
          score,
          type
        });
      });
    };

    // 计算天干运势
    dayWuxing.stems.forEach(calculateStemFortune);
    // 计算藏干运势
    dayWuxing.hiddenStems.forEach(calculateHiddenStemFortune);

    return {
      score: totalScore,
      details
    };
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
    strength: {
        score: number;
        status: 'strong' | 'balanced' | 'weak';
        details: {
        position: string;
        wuxing: WuXing;
        score: number;
        }[];
    };
    dayFortune: {
        score: number;
        details: {
          position: string;
          wuxing: WuXing;
          score: number;
          type: FortuneType;
        }[];
    };
} {
    const bazi = this.calculateBazi(input.birthDate);
    const currentDayBazi = this.calculateCurrentDayBazi();
    const stemBranchwuxing = this.calculateStemBranchWuxing(bazi);
    const hiddenStemsWuxing = this.calculateHiddenStemsWuxing(bazi);
    const strength = this.calculateUserStrength(bazi);

    // 计算当日运势
    const dayFortune = this.calculateDayFortune(
        currentDayBazi,
        stemWuXingMap[bazi.day.stem],
        strength.status
      );
  
    return {
        bazi,
        currentDayBazi,
        stemBranchwuxing,
        hiddenStemsWuxing,
        strength,
        dayFortune
    };
  }
}