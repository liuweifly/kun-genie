import { BaZi } from '../types/interfaces';
import { WuXing } from '../types/enums';
import { stemWuXingMap, branchWuXingMap } from '../constants/mapping';
import { positionScores, getSupportiveWuxing } from '../constants/wuxingRelations';

export class StrengthService {
  // 计算日主身强弱
  static calculate(bazi: BaZi): {
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
} 