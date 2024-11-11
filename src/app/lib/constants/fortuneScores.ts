// 流年月日分值配置
export const fortuneScores = {
  STEM: 12,           // 天干分值
  HIDDEN_STEM: {
    MAIN: 12,         // 藏干主气分值
    SECONDARY: 7.2,   // 藏干次气分值
    TERTIARY: 3.6     // 藏干余气分值
  }
};

// 运势计算类型
export type FortuneType = 'LUCKY' | 'UNLUCKY' | 'NEUTRAL';

// 运势计算规则
export const fortuneRules = {
  STRONG: {
    // 身强者，遇克为吉
    LUCKY: 'RESTRAIN_ME',     // 克我为吉
    UNLUCKY: 'NEUTRAL',       // 其他情况不考虑
  },
  WEAK: {
    // 身弱者，遇生为吉
    LUCKY: 'SUPPORTIVE',      // 生我和同我为吉
    UNLUCKY: 'NEUTRAL',       // 其他情况不考虑
  },
  BALANCED: {
    // 均衡者，遇生为吉，遇克为凶
    LUCKY: 'SUPPORTIVE',      // 生我和同我为吉
    UNLUCKY: 'RESTRAIN_ME',   // 克我为凶
  }
};
