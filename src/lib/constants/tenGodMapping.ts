import { Stem, TenGod, WuXing, WuXingColor } from '../types/enums';
import { stemWuXingMap } from './mapping';

// 天干十神对应表：第一列为日主，横向为其他天干对应的十神
export const tenGodMap: Record<Stem, Record<Stem, TenGod>> = {
  // 甲日见到其他天干的十神
  [Stem.JIA]: {
    [Stem.JIA]: TenGod.BI_JIAN,     // 比肩
    [Stem.YI]: TenGod.JIAN_DI,      // 劫财
    [Stem.BING]: TenGod.SHI_SHEN,   // 食神
    [Stem.DING]: TenGod.SHANG_GUAN, // 伤官
    [Stem.WU]: TenGod.PIAN_CAI,     // 偏财
    [Stem.JI]: TenGod.ZHENG_CAI,    // 正财
    [Stem.GENG]: TenGod.PIAN_GUAN,  // 七杀
    [Stem.XIN]: TenGod.ZHENG_GUAN,  // 正官
    [Stem.REN]: TenGod.PIAN_YIN,    // 偏印
    [Stem.GUI]: TenGod.ZHENG_YIN,   // 正印
  },
  // 乙日见到其他天干的十神
  [Stem.YI]: {
    [Stem.JIA]: TenGod.JIAN_DI,     // 劫财
    [Stem.YI]: TenGod.BI_JIAN,      // 比肩
    [Stem.BING]: TenGod.SHANG_GUAN, // 伤官
    [Stem.DING]: TenGod.SHI_SHEN,   // 食神
    [Stem.WU]: TenGod.ZHENG_CAI,    // 正财
    [Stem.JI]: TenGod.PIAN_CAI,     // 偏财
    [Stem.GENG]: TenGod.ZHENG_GUAN, // 正官
    [Stem.XIN]: TenGod.PIAN_GUAN,   // 七杀
    [Stem.REN]: TenGod.ZHENG_YIN,   // 正印
    [Stem.GUI]: TenGod.PIAN_YIN,    // 偏印
  },
  // 丙日见到其他天干的十神
  [Stem.BING]: {
    [Stem.JIA]: TenGod.PIAN_YIN,     // 偏印
    [Stem.YI]: TenGod.ZHENG_YIN,   // 正印
    [Stem.BING]: TenGod.BI_JIAN,    // 比肩
    [Stem.DING]: TenGod.JIAN_DI,    // 劫财
    [Stem.WU]: TenGod.SHI_SHEN,   // 食神
    [Stem.JI]: TenGod.SHANG_GUAN, // 伤官
    [Stem.GENG]: TenGod.PIAN_CAI,     // 偏财
    [Stem.XIN]: TenGod.ZHENG_CAI,    // 正财
    [Stem.REN]: TenGod.PIAN_GUAN,  // 七杀
    [Stem.GUI]: TenGod.ZHENG_GUAN,  // 正官
  },
  // 丁日见到其他天干的十神
  [Stem.DING]: {
    [Stem.JIA]: TenGod.ZHENG_YIN,   // 正印
    [Stem.YI]: TenGod.PIAN_YIN,     // 偏印
    [Stem.BING]: TenGod.JIAN_DI,    // 劫财
    [Stem.DING]: TenGod.BI_JIAN,    // 比肩
    [Stem.WU]: TenGod.SHANG_GUAN, // 伤官
    [Stem.JI]: TenGod.SHI_SHEN,   // 食神
    [Stem.GENG]: TenGod.ZHENG_CAI,    // 正财
    [Stem.XIN]: TenGod.PIAN_CAI,     // 偏财
    [Stem.REN]: TenGod.ZHENG_GUAN,  // 正官
    [Stem.GUI]: TenGod.PIAN_GUAN,  // 七杀
  },
  // 戊日见到其他天干的十神
  [Stem.WU]: {
    [Stem.JIA]: TenGod.PIAN_GUAN,   // 七杀
    [Stem.YI]: TenGod.ZHENG_GUAN,   // 正官
    [Stem.BING]: TenGod.PIAN_YIN,   // 偏印
    [Stem.DING]: TenGod.ZHENG_YIN,  // 正印
    [Stem.WU]: TenGod.BI_JIAN,      // 比肩
    [Stem.JI]: TenGod.JIAN_DI,      // 劫财
    [Stem.GENG]: TenGod.SHI_SHEN,   // 食神
    [Stem.XIN]: TenGod.SHANG_GUAN,  // 伤官
    [Stem.REN]: TenGod.PIAN_CAI,    // 偏财
    [Stem.GUI]: TenGod.ZHENG_CAI,   // 正财
  },
  // 己日见到其他天干的十神
  [Stem.JI]: {
    [Stem.JIA]: TenGod.ZHENG_GUAN,  // 正官
    [Stem.YI]: TenGod.PIAN_GUAN,    // 七杀
    [Stem.BING]: TenGod.ZHENG_YIN,  // 正印
    [Stem.DING]: TenGod.PIAN_YIN,   // 偏印
    [Stem.WU]: TenGod.JIAN_DI,      // 劫财
    [Stem.JI]: TenGod.BI_JIAN,      // 比肩
    [Stem.GENG]: TenGod.SHANG_GUAN, // 伤官
    [Stem.XIN]: TenGod.SHI_SHEN,    // 食神
    [Stem.REN]: TenGod.ZHENG_CAI,   // 正财
    [Stem.GUI]: TenGod.PIAN_CAI,    // 偏财
  },
  // 庚日见到其他天干的十神
  [Stem.GENG]: {
    [Stem.JIA]: TenGod.PIAN_CAI,    // 偏财
    [Stem.YI]: TenGod.ZHENG_CAI,    // 正财
    [Stem.BING]: TenGod.PIAN_GUAN,  // 七杀
    [Stem.DING]: TenGod.ZHENG_GUAN, // 正官
    [Stem.WU]: TenGod.PIAN_YIN,    // 偏印
    [Stem.JI]: TenGod.ZHENG_YIN,   // 正印
    [Stem.GENG]: TenGod.BI_JIAN,    // 比肩
    [Stem.XIN]: TenGod.JIAN_DI,     // 劫财
    [Stem.REN]: TenGod.SHI_SHEN,    // 食神
    [Stem.GUI]: TenGod.SHANG_GUAN, // 伤官
  },
  // 辛日见到其他天干的十神
  [Stem.XIN]: {
    [Stem.JIA]: TenGod.ZHENG_CAI,   // 正财
    [Stem.YI]: TenGod.PIAN_CAI,     // 偏财
    [Stem.BING]: TenGod.ZHENG_GUAN, // 正官
    [Stem.DING]: TenGod.PIAN_GUAN,  // 七杀
    [Stem.WU]: TenGod.ZHENG_YIN,   // 正印
    [Stem.JI]: TenGod.PIAN_YIN,    // 偏印
    [Stem.GENG]: TenGod.JIAN_DI,    // 劫财
    [Stem.XIN]: TenGod.BI_JIAN,     // 比肩
    [Stem.REN]: TenGod.SHANG_GUAN, // 伤官
    [Stem.GUI]: TenGod.SHI_SHEN,    // 食神
  },
  // 壬日见到其他天干的十神
  [Stem.REN]: {
    [Stem.JIA]: TenGod.SHI_SHEN,    // 食神
    [Stem.YI]: TenGod.SHANG_GUAN,   // 伤官
    [Stem.BING]: TenGod.PIAN_CAI,   // 偏财
    [Stem.DING]: TenGod.ZHENG_CAI,  // 正财
    [Stem.WU]: TenGod.PIAN_GUAN,    // 七杀
    [Stem.JI]: TenGod.ZHENG_GUAN,   // 正官
    [Stem.GENG]: TenGod.PIAN_YIN,   // 偏印
    [Stem.XIN]: TenGod.ZHENG_YIN,   // 正印
    [Stem.REN]: TenGod.BI_JIAN,     // 比肩
    [Stem.GUI]: TenGod.JIAN_DI,     // 劫财
  },
  // 癸日见到其他天干的十神
  [Stem.GUI]: {
    [Stem.JIA]: TenGod.SHANG_GUAN,  // 伤官
    [Stem.YI]: TenGod.SHI_SHEN,     // 食神
    [Stem.BING]: TenGod.ZHENG_CAI,  // 正财
    [Stem.DING]: TenGod.PIAN_CAI,   // 偏财
    [Stem.WU]: TenGod.ZHENG_GUAN,   // 正官
    [Stem.JI]: TenGod.PIAN_GUAN,    // 七杀
    [Stem.GENG]: TenGod.ZHENG_YIN,  // 正印
    [Stem.XIN]: TenGod.PIAN_YIN,    // 偏印
    [Stem.REN]: TenGod.JIAN_DI,     // 劫财
    [Stem.GUI]: TenGod.BI_JIAN,     // 比肩
  },
};

const wuXingColorMap: Record<WuXing, string> = {
  [WuXing.METAL]: WuXingColor.METAL,
  [WuXing.WOOD]: WuXingColor.WOOD,
  [WuXing.WATER]: WuXingColor.WATER,
  [WuXing.FIRE]: WuXingColor.FIRE,
  [WuXing.EARTH]: WuXingColor.EARTH,
};