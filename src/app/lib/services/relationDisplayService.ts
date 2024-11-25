import { XIANGYI_MAPPING } from '../constants/xiangyiMapping';
import { Stem, Branch, TenGod } from '../types/enums';
import { RelationResult } from '../types/gzRelation';
import { GanZhiItem, GanZhiItemRelation } from '../types/gzRelation';
import { Position } from '../types/xiangyiEnums';
import { getStemWuXingColor, getBranchWuXingColor } from '../utils/colors';

export class RelationDisplayService {

  private static isStem(value: Stem | Branch): value is Stem {
    return Object.values(Stem).includes(value as Stem);
  }

  static convertToGanZhiItemRelations(
    relations: {
      stemRelations: RelationResult[];
      branchRelations: RelationResult[];
    },
    tenGodData: {
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
    }
  ): {
    stemRelations: GanZhiItemRelation[];
    branchRelations: GanZhiItemRelation[];
  } {
    return {
      stemRelations: relations.stemRelations.map(relation => 
        this.convertSingleRelation(relation, tenGodData)
      ),
      branchRelations: relations.branchRelations.map(relation => 
        this.convertSingleRelation(relation, tenGodData)
      )
    };
  }

  private static convertSingleRelation(
    relation: RelationResult,
    tenGodData: {
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
    }
  ): GanZhiItemRelation {
    const members: GanZhiItem[] = relation.members.map(member => {

      // 从tenGodData中获取对应位置的十神信息
      let tenGodInfo, nameColor, xiangyiInfo;
      if (this.isStem(member.value)) {
        // 根据member.value的类型获取颜色
        nameColor = getStemWuXingColor(member.value)
        // 从stems数组中找到对应position的数据,获取对应位置的十神信息
        tenGodInfo = tenGodData.stems.find(item => item.position === member.position);
        tenGodInfo = tenGodInfo ? [tenGodInfo.tenGod] : [];
        // 根据position获取象义
        xiangyiInfo = XIANGYI_MAPPING['天干'][member.position]; 

      } else {
        // 根据member.value的类型获取颜色
        nameColor = getBranchWuXingColor(member.value)
        // 从hiddenStems数组中找到对应position的数据,,获取对应位置的十神信息
        const branchInfo = tenGodData.hiddenStems.find(item => item.position === member.position);
        tenGodInfo = branchInfo?.stems?.map(item => item.tenGod) || [];
        // 根据position获取象义
        xiangyiInfo = XIANGYI_MAPPING['地支'][member.position]; 
      }

      return {
        position: member.position,
        name: member.value,
        color: nameColor,
        tenGod: tenGodInfo,
        sixRelation: xiangyiInfo.sixRelation,
        bodyPart: xiangyiInfo.bodyPart,
        ageRange: xiangyiInfo.ageRange
      };
    });

    return {
      members,
      relationType: relation.relationType,
      isDirectional: relation.isDirectional,
      wuxing: relation.wuxing
    };
  }

} 