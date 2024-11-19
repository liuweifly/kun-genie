'use client';

import { Branch, Stem, TenGod } from '../lib/types/enums';

interface TenGodDisplayProps {
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
  };
}

export default function TenGodDisplay({ tenGodData }: TenGodDisplayProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2"></th>
            {tenGodData.stems.map(({ position }) => (
              <th key={position} className="border px-4 py-2">{position}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-bold">十神</td>
            {tenGodData.stems.map(({ tenGod, position }) => (
              <td key={position} className="border px-4 py-2">{tenGod}</td>
            ))}
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">天干</td>
            {tenGodData.stems.map(({ stem, color, position }) => (
              <td 
                key={position} 
                className="border px-4 py-2 text-2xl font-bold"
                style={{ color }}
              >
                {stem}
              </td>
            ))}
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">地支</td>
            {tenGodData.hiddenStems.map(({ branchs, position }) => (
              <td key={position} className="border px-4 py-2 text-2xl font-bold">
                  <span 
                    style={{ color: branchs.color }}
                    className="block"
                  >
                    {branchs.branch}
                  </span>
              </td>
            ))}
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">藏干十神</td>
            {tenGodData.hiddenStems.map(({ stems, position }) => (
              <td key={position} className="border px-4 py-2">
                {stems.map(({ stem, tenGod, color }, index) => (
                  <span 
                    key={index}
                    style={{ color }}
                    className="block"
                  >
                    {stem}{tenGod}
                  </span>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
} 