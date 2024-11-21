import { Stem, Branch, TenGod } from '../types/enums';
import { BaZi, DaYun } from '../types/interfaces';
import { tenGodMap } from '../constants/tenGodMapping';
import { branchHiddenStemMap } from '../constants/mapping';
import { getStemWuXingColor, getBranchWuXingColor } from '../utils/colors';

export class TenGodService {
  // 计算十神
  static calculate(bazi: BaZi, currentDayBazi: BaZi, currentDaYun: { stem: Stem; branch: Branch; startYear: number }): {
    stems: {
      position: string;
      stem: Stem;
      tenGod: TenGod;
      color: string;
    }[];
    hiddenStems: {
      position: string;
      branchs: {
        branch: Branch;
        color: string;
      };
      stems: {
        stem: Stem;
        tenGod: TenGod;
        color: string;
      }[];
    }[];
  } {
    const dayMaster = bazi.day.stem; // 日主
    
    // 计算天干十神
    const stems = [
      { position: '大运', stem: currentDaYun.stem },
      { position: '流年', stem: currentDayBazi.year.stem },
      { position: '流月', stem: currentDayBazi.month.stem },
      { position: '流日', stem: currentDayBazi.day.stem },
      { position: '年柱', stem: bazi.year.stem },
      { position: '月柱', stem: bazi.month.stem },
      { position: '日柱', stem: bazi.day.stem },
      { position: '时柱', stem: bazi.hour.stem },
    ].map(({ position, stem }) => ({
      position,
      stem,
      tenGod: position === '日柱' ? TenGod.RI_YUAN : tenGodMap[dayMaster][stem],
      color: getStemWuXingColor(stem)
    }));

    // 计算藏干十神
    const hiddenStems = [
      { position: '大运', branch: currentDaYun.branch },
      { position: '流年', branch: currentDayBazi.year.branch },
      { position: '流月', branch: currentDayBazi.month.branch },
      { position: '流日', branch: currentDayBazi.day.branch },
      { position: '年柱', branch: bazi.year.branch },
      { position: '月柱', branch: bazi.month.branch },
      { position: '日柱', branch: bazi.day.branch },
      { position: '时柱', branch: bazi.hour.branch },
    ].map(({ position, branch }) => ({
      position,
      branchs: {
        branch,
        color: getBranchWuXingColor(branch)
      },
      stems: this.calculateHiddenStems(branch).map(stem => ({
        stem,
        tenGod: tenGodMap[dayMaster][stem],
        color: getStemWuXingColor(stem)
      }))
    }));

    return { stems, hiddenStems };
  }

  // 计算地支藏干
  private static calculateHiddenStems(branch: Branch): Stem[] {
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
} 