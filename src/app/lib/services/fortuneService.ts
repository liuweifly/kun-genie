import { BaZi } from '../types/interfaces';
import { WuXing, Stem, Branch } from '../types/enums';
import { stemWuXingMap } from '../constants/mapping';
import { getSupportiveWuxing, getRestraintWuxing } from '../constants/wuxingRelations';
import { fortuneScores, FortuneType } from '../constants/fortuneScores';
import { BaziService } from './baziService';

export class FortuneService {
  // 计算当日运势
  static calculate(
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
    const dayWuxing = BaziService.calculateHiddenStemsWuxing(dayBazi);
    
    // 获取帮扶和抑制五行
    const supportiveWuxings = getSupportiveWuxing(userDayMaster);
    const restraintWuxings = getRestraintWuxing(userDayMaster);

    // 只取年月日的天干和��干
    const relevantStems = dayWuxing.stems.slice(0, 3);
    const relevantHiddenStems = dayWuxing.hiddenStems.slice(0, 3);

    // 计算天干运势
    const calculateStemFortune = (stem: { position: string; stem: Stem; wuxing: WuXing }) => {
      const wuxing = stemWuXingMap[stem.stem];
      let score = 0;
      let type: FortuneType = 'NEUTRAL';

      switch (strengthStatus) {
        case 'strong':
          if (restraintWuxings.includes(wuxing)) {
            score = fortuneScores.STEM;
            type = 'LUCKY';
          }
          break;
        case 'weak':
          if (supportiveWuxings.includes(wuxing)) {
            score = fortuneScores.STEM;
            type = 'LUCKY';
          }
          break;
        case 'balanced':
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

    // 计算天干���势
    relevantStems.forEach(calculateStemFortune);
    // 计算藏干运势
    relevantHiddenStems.forEach(calculateHiddenStemFortune);

    return {
      score: Math.round(totalScore),
      details
    };
  }
} 