import { WuXing } from '../types/enums';

// 干支位置权重分值
export const positionScores = {
  YEAR_STEM: 8,    // 年干
  MONTH_STEM: 12,  // 月干
  DAY_STEM: 0,     // 日元
  HOUR_STEM: 12,   // 时干
  YEAR_BRANCH: 4,  // 年支
  MONTH_BRANCH: 40,// 月令
  DAY_BRANCH: 12,  // 日支
  HOUR_BRANCH: 12  // 时支
};

// 获取帮扶五行列表（返回日主自身和生日主的五行）
export function getSupportiveWuxing(dayMaster: WuXing): WuXing[] {
  const supportive: WuXing[] = [dayMaster]; // 日主自身
  
  // 添加生日主的五行
  switch (dayMaster) {
    case WuXing.METAL:
      supportive.push(WuXing.EARTH); // 土生金
      break;
    case WuXing.WOOD:
      supportive.push(WuXing.WATER); // 水生木
      break;
    case WuXing.WATER:
      supportive.push(WuXing.METAL); // 金生水
      break;
    case WuXing.FIRE:
      supportive.push(WuXing.WOOD);  // 木生火
      break;
    case WuXing.EARTH:
      supportive.push(WuXing.FIRE);  // 火生土
      break;
  }
  
  return supportive;
}

// 获取抑制五行列表（返回除了帮扶五行之外的所有五行）
export function getRestraintWuxing(dayMaster: WuXing): WuXing[] {
  const supportive = getSupportiveWuxing(dayMaster);
  return Object.values(WuXing).filter(wuxing => !supportive.includes(wuxing));
} 