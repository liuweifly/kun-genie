import { Stem, Branch, TenGod, WuXing, Direction, RelationType, WuXingColor } from "./enums";
import { Position, SixRelation, BodyPart, AgeRange } from "./xiangyiEnums";

//展示用
export interface GanZhiItem {  
  position: Position;
  name: Stem | Branch;
  color: string;
  tenGod: TenGod[];
  sixRelation: SixRelation | '';
  bodyPart: BodyPart | '';
  ageRange: AgeRange | '';
};

export interface GanZhiItemRelation {  
  members: GanZhiItem[];
  relationType: RelationType;
  isDirectional: boolean;    // 是否为有方向性的关系（生克是有方向的，其他都是无方向的）
  wuxing?: WuXing;          // 合、三合、三会产生的五行
};
  
//计算用
export interface StemRelation {
  sheng: Stem[]; // 生
  ke: Stem[];    // 克
  xianghe: {stem: Stem, wuxing: WuXing}[];    // 相合
  xiangchong?: Stem[]; // 相冲
};

export interface BranchRelation {
  sheng: Branch[];    // 生
  ke: Branch[];       // 克
  he:{
    xianghe: {branch: Branch, wuxing: WuXing}[];    // 相合
    sanhe?: {branch: Branch[], wuxing: WuXing}[];    // 三合
    sanhui?: {                                     // 三会
      branch: Branch[],
      direction: Direction,  
      wuxing: WuXing
    }[];
  }
  xing: {
    xiangxing?: Branch[];     // 相刑
    sanxiang?: Branch[];      // 三刑
    zixing?: Branch[];        // 自刑
  }
  xiangchong: Branch[];    // 相冲
  xianghai: Branch[];      // 相害
};

// 定义返回类型
export interface RelationResult {
  members: {
    position: Position;
    value: Stem | Branch;
  }[];
  relationType: RelationType;
  isDirectional: boolean;    // 是否为有方向性的关系（生克是有方向的，其他都是无方向的）
  wuxing?: WuXing;          // 合、三合、三会产生的五行
}