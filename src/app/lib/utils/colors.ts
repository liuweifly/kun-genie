import { Stem, Branch, WuXing, WuXingColor } from '../types/enums';
import { stemWuXingMap, branchWuXingMap } from '../constants/mapping';

// 五行到颜色的映射
export const wuXingColorMap: Record<WuXing, string> = {
  [WuXing.METAL]: WuXingColor.METAL, // 金 - 黄色
  [WuXing.WOOD]: WuXingColor.WOOD,   // 木 - 绿色
  [WuXing.WATER]: WuXingColor.WATER, // 水 - 蓝色
  [WuXing.FIRE]: WuXingColor.FIRE,   // 火 - 红色
  [WuXing.EARTH]: WuXingColor.EARTH  // 土 - 土黄色
};

// 获取天干对应的五行颜色
export function getStemWuXingColor(stem: Stem): string {
  const wuxing = stemWuXingMap[stem];
  return wuXingColorMap[wuxing];
}

// 获取地支对应的五行颜色
export function getBranchWuXingColor(branch: Branch): string {
  const wuxing = branchWuXingMap[branch];
  return wuXingColorMap[wuxing];
} 