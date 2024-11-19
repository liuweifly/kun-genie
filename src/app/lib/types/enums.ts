//八字计算与五行对应实现

// 基础类型定义
export enum Gender {
  Male = 'male',
  Female = 'female'
}

export enum Stem {
  JIA = '甲',
  YI = '乙',
  BING = '丙',
  DING = '丁',
  WU = '戊',
  JI = '己',
  GENG = '庚',
  XIN = '辛',
  REN = '壬',
  GUI = '癸'
}

export enum Branch {
  ZI = '子',
  CHOU = '丑',
  YIN = '寅',
  MAO = '卯',
  CHEN = '辰',
  SI = '巳',
  WU = '午',
  WEI = '未',
  SHEN = '申',
  YOU = '酉',
  XU = '戌',
  HAI = '亥'
}

export enum WuXing {
  METAL = '金',
  WOOD = '木',
  WATER = '水',
  FIRE = '火',
  EARTH = '土'
}

// 添加十神枚举
export enum TenGod {
  ZHENG_GUAN = '正官', // 正官
  PIAN_GUAN = '七杀',  // 偏官(七杀)
  ZHENG_YIN = '正印',  // 正印
  PIAN_YIN = '偏印',   // 偏印
  BI_JIAN = '比肩',    // 比肩
  PIAN_CAI = '偏财',   // 偏财
  ZHENG_CAI = '正财',  // 正财
  SHANG_GUAN = '伤官', // 伤官
  SHI_SHEN = '食神',   // 食神
  JIAN_DI = '劫财',    // 劫财
  RI_YUAN = '日元'     // 日元（新增）
}

// 添加五行颜色枚举
export enum WuXingColor {
  METAL = '#FFD700', // 金 - 黄色
  WOOD = '#228B22',  // 木 - 绿色
  WATER = '#1E90FF', // 水 - 蓝色
  FIRE = '#FF4500',  // 火 - 红色
  EARTH = '#CD853F'  // 土 - 土黄色
}