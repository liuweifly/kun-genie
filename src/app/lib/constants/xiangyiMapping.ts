import { Position, SixRelation, BodyPart, AgeRange } from '../types/xiangyiEnums';

// 象义映射表 - 通过类型和位置查询
export const XIANGYI_MAPPING = {
  // 天干的象义
  '天干': {
    [Position.YEAR]: {
      sixRelation: SixRelation.FATHER,    // 父亲
      bodyPart: BodyPart.HEAD,            // 头
      ageRange: AgeRange.RANGE_1_9        // 1-9岁
    },
    [Position.MONTH]: {
      sixRelation: SixRelation.BROTHER,   // 兄弟
      bodyPart: BodyPart.CHEST,           // 胸
      ageRange: AgeRange.RANGE_19_27      // 19-27岁
    },
    [Position.DAY]: {
      sixRelation: SixRelation.SELF,      // 自己
      bodyPart: BodyPart.LOWER_BELLY,     // 小腹
      // 日柱没有年龄范围
    },
    [Position.HOUR]: {
      sixRelation: SixRelation.FIRST_CHILD, // 长子
      bodyPart: BodyPart.THIGH,             // 大腿
      ageRange: AgeRange.RANGE_46_54        // 46-54岁
    }
  },
  
  // 地支的象义
  '地支': {
    [Position.YEAR]: {
      sixRelation: SixRelation.MOTHER,    // 母亲
      bodyPart: BodyPart.NECK,            // 脖
      ageRange: AgeRange.RANGE_10_18      // 10-18岁
    },
    [Position.MONTH]: {
      sixRelation: SixRelation.SISTER,    // 姐妹
      bodyPart: BodyPart.BELLY,           // 腹
      ageRange: AgeRange.RANGE_28_36      // 28-36岁
    },
    [Position.DAY]: {
      sixRelation: SixRelation.SPOUSE,    // 配偶
      bodyPart: BodyPart.BUTTOCKS,        // 屁股
      ageRange: AgeRange.RANGE_37_45      // 37-45岁
    },
    [Position.HOUR]: {
      sixRelation: SixRelation.SECOND_CHILD, // 次子
      bodyPart: BodyPart.CALF_FOOT,          // 小腿和脚
      ageRange: AgeRange.RANGE_55_PLUS       // 55岁及以后
    }
  }
} as const;

// 使用示例：
// const xiangyi = XIANGYI_MAPPING['天干'][Position.YEAR];
// console.log(xiangyi.sixRelation); // 父亲
// console.log(xiangyi.bodyPart); // 头
// console.log(xiangyi.ageRange); // 1-9岁