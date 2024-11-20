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


//大运计算
// 阳男阴女的地支顺序
export const YANG_MALE_YIN_FEMALE_BRANCHES = [
  Branch.ZI,   // 子
  Branch.YIN,  // 寅
  Branch.CHEN, // 辰
  Branch.WU,   // 午
  Branch.SHEN, // 申
  Branch.XU    // 戌
];

// 阴男阳女的地支顺序
export const YIN_MALE_YANG_FEMALE_BRANCHES = [
  Branch.CHOU, // 丑
  Branch.MAO,  // 卯
  Branch.SI,   // 巳
  Branch.WEI,  // 未
  Branch.YOU,  // 酉
  Branch.HAI   // 亥
];

// 六十甲子表
export const SIXTY_JIAZI = [
  { stem: '甲', branch: '子' },
  { stem: '乙', branch: '丑' },
  { stem: '丙', branch: '寅' },
  { stem: '丁', branch: '卯' },
  { stem: '戊', branch: '辰' },
  { stem: '己', branch: '巳' },
  { stem: '庚', branch: '午' },
  { stem: '辛', branch: '未' },
  { stem: '壬', branch: '申' },
  { stem: '癸', branch: '酉' },
  { stem: '甲', branch: '戌' },
  { stem: '乙', branch: '亥' },
  { stem: '丙', branch: '子' },
  { stem: '丁', branch: '丑' },
  { stem: '戊', branch: '寅' },
  { stem: '己', branch: '卯' },
  { stem: '庚', branch: '辰' },
  { stem: '辛', branch: '巳' },
  { stem: '壬', branch: '午' },
  { stem: '癸', branch: '未' },
  { stem: '甲', branch: '申' },
  { stem: '乙', branch: '酉' }, 
  { stem: '丙', branch: '戌' },
  { stem: '丁', branch: '亥' },
  { stem: '戊', branch: '子' },
  { stem: '己', branch: '丑' },
  { stem: '庚', branch: '寅' },
  { stem: '辛', branch: '卯' },
  { stem: '壬', branch: '辰' },
  { stem: '癸', branch: '巳' },
  { stem: '甲', branch: '午' },
  { stem: '乙', branch: '未' },
  { stem: '丙', branch: '申' },
  { stem: '丁', branch: '酉' },
  { stem: '戊', branch: '戌' },
  { stem: '己', branch: '亥' },
  { stem: '庚', branch: '子' },
  { stem: '辛', branch: '丑' },
  { stem: '壬', branch: '寅' },
  { stem: '癸', branch: '卯' },
  { stem: '甲', branch: '辰' },
  { stem: '乙', branch: '巳' },
  { stem: '丙', branch: '午' },
  { stem: '丁', branch: '未' },
  { stem: '戊', branch: '申' },
  { stem: '己', branch: '酉' },
  { stem: '庚', branch: '戌' },
  { stem: '辛', branch: '亥' },
  { stem: '壬', branch: '子' },
  { stem: '癸', branch: '丑' },
  { stem: '甲', branch: '寅' },
  { stem: '乙', branch: '卯' },
  { stem: '丙', branch: '辰' },
  { stem: '丁', branch: '巳' },
  { stem: '戊', branch: '午' },
  { stem: '己', branch: '未' },
  { stem: '庚', branch: '申' },
  { stem: '辛', branch: '酉' },
  { stem: '壬', branch: '戌' },
  { stem: '癸', branch: '亥' } 
];

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


