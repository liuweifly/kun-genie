import { GanZhiItem, GanZhiItemRelation } from '../lib/types/gzRelation';

interface SectionProps {
  title: string;
  relations: {
    stemRelations: GanZhiItemRelation[];
    branchRelations: GanZhiItemRelation[];
  };
}

export const GanZhiRelationDisplay = ({ title, relations }: SectionProps) => {
  const renderGanZhiItem = (item: GanZhiItem) => (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
      <div className="text-2xl font-bold mb-2" style={{ color: item.color }}>
        {item.name}
      </div>
      <div className="space-y-1 text-sm">
        <div>位置：{item.position}</div>
        <div>十神：{item.tenGod}</div>
        <div>六亲：{item.sixRelation}</div>
        <div>身体部位：{item.bodyPart}</div>
        {item.ageRange && <div>年龄范围：{item.ageRange}</div>}
      </div>
    </div>
  );

  const renderRelation = (relation: GanZhiItemRelation) => {
    const relationText = relation.isDirectional
      ? `${relation.members[0].name} ${relation.relationType} ${relation.members[1].name}`
      : `${relation.members.map(m => m.name).join('')} ${relation.relationType}`;

    return (
      <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
        <span className="text-lg">
          {relationText}
          {relation.wuxing && <span className="ml-2">化{relation.wuxing}</span>}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">{title}</h3>
      
      {/* 天干关系 */}
      {relations.stemRelations.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">天干关系</h4>
          {relations.stemRelations.map((relation, index) => (
            <div key={`stem-${index}`} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relation.members.map((item, idx) => (
                  <div key={idx}>{renderGanZhiItem(item)}</div>
                ))}
              </div>
              {renderRelation(relation)}
            </div>
          ))}
        </div>
      )}

      {/* 地支关系 */}
      {relations.branchRelations.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">地支关系</h4>
          {relations.branchRelations.map((relation, index) => (
            <div key={`branch-${index}`} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relation.members.map((item, idx) => (
                  <div key={idx}>{renderGanZhiItem(item)}</div>
                ))}
              </div>
              {renderRelation(relation)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 