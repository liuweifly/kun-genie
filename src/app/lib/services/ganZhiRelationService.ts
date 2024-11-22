import { Stem, Branch, RelationType } from '../types/enums';
import { Position } from '../types/xiangyiEnums';
import { RelationResult } from '../types/gzRelation';
import { stemRelationMapping, branchRelationMapping } from '../constants/gzRelationMapping';

export class GanZhiRelationService {
  // 计算两个天干之间的关系
  static calculateStemRelations(stem1: Stem, pos1: Position, stem2: Stem, pos2: Position): RelationResult[] {
    const relations: RelationResult[] = [];
    const relation = stemRelationMapping[stem1];

    // 检查生关系
    if (relation.sheng.includes(stem2)) {
      relations.push({
        members: [
          { position: pos1, value: stem1 },
          { position: pos2, value: stem2 }
        ],
        relationType: RelationType.SHENG,
        isDirectional: true
      });
    }

    // 检查克关系
    if (relation.ke.includes(stem2)) {
      relations.push({
        members: [
          { position: pos1, value: stem1 },
          { position: pos2, value: stem2 }
        ],
        relationType: RelationType.KE,
        isDirectional: true
      });
    }

    // 检查合关系
    const heRelation = relation.xianghe.find(h => h.stem === stem2);
    if (heRelation) {
      relations.push({
        members: [
          { position: pos1, value: stem1 },
          { position: pos2, value: stem2 }
        ],
        relationType: RelationType.XIANGHE,
        isDirectional: false,
        wuxing: heRelation.wuxing
      });
    }

    // 检查冲关系
    if (relation.xiangchong?.includes(stem2)) {
      relations.push({
        members: [
          { position: pos1, value: stem1 },
          { position: pos2, value: stem2 }
        ],
        relationType: RelationType.XIANGCHONG,
        isDirectional: false
      });
    }

    return relations;
  }

  // 计算生辰八字的所有天干关系
  static calculateBaziStemRelations(
    yearStem: Stem,
    monthStem: Stem,
    dayStem: Stem,
    hourStem: Stem
  ): RelationResult[] {
    const allRelations: RelationResult[] = [];
    const stems = [
      { stem: yearStem, pos: Position.YEAR },
      { stem: monthStem, pos: Position.MONTH },
      { stem: dayStem, pos: Position.DAY },
      { stem: hourStem, pos: Position.HOUR }
    ];

    // 计算所有天干之间的关系
    for (let i = 0; i < stems.length; i++) {
      for (let j = 0; j < stems.length; j++) {
        if (i !== j) {  // 避免自己和自己比较
          const relations = this.calculateStemRelations(
            stems[i].stem,
            stems[i].pos,
            stems[j].stem,
            stems[j].pos
          );
          
          // 对于无方向性的关系（合、冲），需要去重
          const directionalRelations = relations.filter(r => r.isDirectional);
          const nonDirectionalRelations = relations.filter(r => !r.isDirectional);
          
          // 只添加没有重复的无方向性关系
          if (i < j) {
            allRelations.push(...nonDirectionalRelations);
          }
          // 有方向性的关系都要添加
          allRelations.push(...directionalRelations);
        }
      }
    }

    return allRelations;
  }

  // 计算两个地支之间的关系
  static calculateBranchRelations(branch1: Branch, pos1: Position, branch2: Branch, pos2: Position): RelationResult[] {
    const relations: RelationResult[] = [];
    const relation = branchRelationMapping[branch1];

    // 检查生关系
    if (relation.sheng.includes(branch2)) {
      relations.push({
        members: [
          { position: pos1, value: branch1 },
          { position: pos2, value: branch2 }
        ],
        relationType: RelationType.SHENG,
        isDirectional: true
      });
    }

    // 检查克关系
    if (relation.ke.includes(branch2)) {
      relations.push({
        members: [
          { position: pos1, value: branch1 },
          { position: pos2, value: branch2 }
        ],
        relationType: RelationType.KE,
        isDirectional: true
      });
    }

    // 检查相合关系
    const heRelation = relation.he.xianghe.find(h => h.branch === branch2);
    if (heRelation) {
      relations.push({
        members: [
          { position: pos1, value: branch1 },
          { position: pos2, value: branch2 }
        ],
        relationType: RelationType.XIANGHE,
        isDirectional: false,
        wuxing: heRelation.wuxing
      });
    }

    // 检查相冲关系
    if (relation.xiangchong.includes(branch2)) {
      relations.push({
        members: [
          { position: pos1, value: branch1 },
          { position: pos2, value: branch2 }
        ],
        relationType: RelationType.XIANGCHONG,
        isDirectional: false
      });
    }

    // 检查相害关系
    if (relation.xianghai.includes(branch2)) {
      relations.push({
        members: [
          { position: pos1, value: branch1 },
          { position: pos2, value: branch2 }
        ],
        relationType: RelationType.XIANGHAI,
        isDirectional: false
      });
    }

    // 检查相刑关系
    if (relation.xing.xiangxing?.includes(branch2)) {
        relations.push({
        members: [
            { position: pos1, value: branch1 },
            { position: pos2, value: branch2 }
        ],
        relationType: RelationType.XIANGXING,
        isDirectional: false
        });
    }

    // 检查自刑
    if (relation.xing.zixing?.includes(branch2)) {
        relations.push({
        members: [
            { position: pos1, value: branch1 },
            { position: pos2, value: branch2 }
        ],
        relationType: RelationType.ZIXING,
        isDirectional: false
        });
    }    

    return relations;
  }

  // 计算三个地支是否构成三合局
  static checkSanHe(branches: Array<{branch: Branch, pos: Position}>): RelationResult | null {
    for (const relation of Object.values(branchRelationMapping)) {
      const sanheList = relation.he.sanhe;
      if (!sanheList) continue;  // 如果不存在，跳过当前循环
      for (const sanhe of sanheList) {
        const branchSet = new Set(branches.map(b => b.branch));
        const sanheSet = new Set(sanhe.branch);
        if (branchSet.size === 3 && [...branchSet].every(b => sanheSet.has(b))) {
          return {
            members: branches.map(b => ({ position: b.pos, value: b.branch })),
            relationType: RelationType.SANHE,
            isDirectional: false,
            wuxing: sanhe.wuxing
          };
        }
      }
    }
    return null;
  }

  // 计算三个地支是否构成三会局
  static checkSanHui(branches: Array<{branch: Branch, pos: Position}>): RelationResult | null {
    for (const relation of Object.values(branchRelationMapping)) {
      const sanhuiList = relation.he.sanhui;
      if (!sanhuiList) continue;  // 如果不存在，跳过当前循环
      for (const sanhui of sanhuiList) {
        const branchSet = new Set(branches.map(b => b.branch));
        const sanhuiSet = new Set(sanhui.branch);
        if (branchSet.size === 3 && [...branchSet].every(b => sanhuiSet.has(b))) {
          return {
            members: branches.map(b => ({ position: b.pos, value: b.branch })),
            relationType: RelationType.SANHUI,
            isDirectional: false,
            wuxing: sanhui.wuxing,
            // direction: sanhui.direction
          };
        }
      }
    }
    return null;
  }

// 添加检查三刑的方法
  static checkSanXing(branches: Array<{branch: Branch, pos: Position}>): RelationResult | null {
    for (const relation of Object.values(branchRelationMapping)) {
      const sanxiangList = relation.xing.sanxiang;
      if (sanxiangList) {
        const branchSet = new Set(branches.map(b => b.branch));
        const sanxiangSet = new Set(sanxiangList);
        // 检查是否包含当前地支本身
        const currentBranch = branches[0].branch;
        if (branchSet.size === 3 && sanxiangSet.has(currentBranch) && 
            [...branchSet].every(b => sanxiangSet.has(b) || b === currentBranch)) {
          return {
            members: branches.map(b => ({ position: b.pos, value: b.branch })),
            relationType: RelationType.SANXING,
            isDirectional: false
          };
        }
      }
    }
    return null;
  }

  // 计算生辰八字的所有地支关系
  static calculateBaziBranchRelations(
    yearBranch: Branch,
    monthBranch: Branch,
    dayBranch: Branch,
    hourBranch: Branch
  ): RelationResult[] {
    const allRelations: RelationResult[] = [];
    const branches = [
      { branch: yearBranch, pos: Position.YEAR },
      { branch: monthBranch, pos: Position.MONTH },
      { branch: dayBranch, pos: Position.DAY },
      { branch: hourBranch, pos: Position.HOUR }
    ];

    // 计算两两之间的关系
    for (let i = 0; i < branches.length; i++) {
      for (let j = 0; j < branches.length; j++) {
        if (i !== j) {
          const relations = this.calculateBranchRelations(
            branches[i].branch,
            branches[i].pos,
            branches[j].branch,
            branches[j].pos
          );
          
          // 对于无方向性的关系（合、冲、害），需要去重
          const directionalRelations = relations.filter(r => r.isDirectional);
          const nonDirectionalRelations = relations.filter(r => !r.isDirectional);
          
          // 只添加没有重复的无方向性关系
          if (i < j) {
            allRelations.push(...nonDirectionalRelations);
          }
          // 有方向性的关系都要添加
          allRelations.push(...directionalRelations);
        }
      }
    }

    // 检查三合局
    for (let i = 0; i < branches.length - 2; i++) {
      for (let j = i + 1; j < branches.length - 1; j++) {
        for (let k = j + 1; k < branches.length; k++) {
          const sanheResult = this.checkSanHe([branches[i], branches[j], branches[k]]);
          if (sanheResult) {
            allRelations.push(sanheResult);
          }
        }
      }
    }

    // 检查三会局
    for (let i = 0; i < branches.length - 2; i++) {
      for (let j = i + 1; j < branches.length - 1; j++) {
        for (let k = j + 1; k < branches.length; k++) {
          const sanhuiResult = this.checkSanHui([branches[i], branches[j], branches[k]]);
          if (sanhuiResult) {
            allRelations.push(sanhuiResult);
          }
        }
      }
    }

      // 检查三刑
    for (let i = 0; i < branches.length - 2; i++) {
      for (let j = i + 1; j < branches.length - 1; j++) {
        for (let k = j + 1; k < branches.length; k++) {
          const sanxingResult = this.checkSanXing([branches[i], branches[j], branches[k]]);
          if (sanxingResult) {
            allRelations.push(sanxingResult);
          }
        }
      }
    }

    return allRelations;
  }
} 