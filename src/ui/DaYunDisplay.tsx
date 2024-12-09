import { DaYunResult } from '../lib/types/interfaces';

interface DaYunDisplayProps {
  daYun: DaYunResult;
}

export const DaYunDisplay = ({ daYun }: DaYunDisplayProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">岁数</th>
            {daYun.daYuns.map((d, index) => (
              <th key={index} className="border px-4 py-2 text-center">{d.age}岁</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-bold">年份</td>
            {daYun.daYuns.map((d, index) => (
              <td key={index} className="border px-4 py-2 text-center">{d.year}</td>
            ))}
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">天干</td>
            {daYun.daYuns.map((d, index) => (
              <td 
                key={index} 
                className="border px-4 py-2 text-center"
              >
                {d.stem}
              </td>
            ))}
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">地支</td>
            {daYun.daYuns.map((d, index) => (
              <td 
                key={index} 
                className="border px-4 py-2 text-center"
              >
                {d.branch}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}; 