import { GanZhiItem, GanZhiItemRelation } from '../lib/types/gzRelation';

interface SectionProps {
  title: string;
  relations: {
    stemRelations: GanZhiItemRelation[];
    branchRelations: GanZhiItemRelation[];
  };
}

export const GanZhiRelationDisplay = ({ title, relations }: SectionProps) => {
  const renderGanZhiItemDetails = (item: GanZhiItem) => {
    return (
      <div className="space-y-1">
        <span className="font-bold text-lg" style={{ color: item.color }}>{item.name}</span>
        <div className="text-sm space-y-0.5">
          <div>位置: {item.position}</div>
          <div>十神: {item.tenGod?.join(', ') || '空'}</div>
          <div>六亲: {item.sixRelation || '空'}</div>
          <div>自身部位: {item.bodyPart || '空'}</div>
        </div>
      </div>
    );
  };

  const renderRelationType = (relation: GanZhiItemRelation) => {
    return (
      <div className="text-center">
        <div className="font-medium">{relation.relationType}</div>
        <div className="text-sm">五行: {relation.wuxing || '空'}</div>
      </div>
    );
  };

  // 合并天干和地支关系
  const allRelations = [
    ...relations.stemRelations.map(relation => ({ ...relation, type: '天干' })),
    ...relations.branchRelations.map(relation => ({ ...relation, type: '地支' }))
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="">
              <th className="border p-2 text-left">模块</th>
              <th className="border p-2 text-left">干支1</th>
              <th className="border p-2 text-left">干支2</th>
              <th className="border p-2 text-left">关系</th>
            </tr>
          </thead>
          <tbody>
            {allRelations.map((relation, index) => {
              const moduleType = relation.type; // 天干或地支

              return (
                <tr key={index} className="">
                  <td className="border p-2">
                    <div>{moduleType}</div>
                  </td>
                  <td className="border p-2">{renderGanZhiItemDetails(relation.members[0])}</td>
                  <td className="border p-2">{renderGanZhiItemDetails(relation.members[1])}</td>
                  <td className="border p-2">{renderRelationType(relation)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 