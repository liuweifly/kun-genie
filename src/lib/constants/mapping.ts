// constants/mappings.ts
import { Stem, Branch, WuXing} from '../types/enums';
import { HiddenStem } from '../types/interfaces';
// 五行映射表
export const stemWuXingMap: Record<Stem, WuXing> = {
    [Stem.JIA]: WuXing.WOOD,
    [Stem.YI]: WuXing.WOOD,
    [Stem.BING]: WuXing.FIRE,
    [Stem.DING]: WuXing.FIRE,
    [Stem.WU]: WuXing.EARTH,
    [Stem.JI]: WuXing.EARTH,
    [Stem.GENG]: WuXing.METAL,
    [Stem.XIN]: WuXing.METAL,
    [Stem.REN]: WuXing.WATER,
    [Stem.GUI]: WuXing.WATER
  };
  
export const branchWuXingMap: Record<Branch, WuXing> = {
    [Branch.ZI]: WuXing.WATER,
    [Branch.CHOU]: WuXing.EARTH,
    [Branch.YIN]: WuXing.WOOD,
    [Branch.MAO]: WuXing.WOOD,
    [Branch.CHEN]: WuXing.EARTH,
    [Branch.SI]: WuXing.FIRE,
    [Branch.WU]: WuXing.FIRE,
    [Branch.WEI]: WuXing.EARTH,
    [Branch.SHEN]: WuXing.METAL,
    [Branch.YOU]: WuXing.METAL,
    [Branch.XU]: WuXing.EARTH,
    [Branch.HAI]: WuXing.WATER
  };
  
export const branchHiddenStemMap: Record<Branch, HiddenStem> = {
    [Branch.ZI]: { main: Stem.GUI },
    [Branch.CHOU]: { main: Stem.JI, secondary: Stem.GUI, tertiary: Stem.XIN },
    [Branch.YIN]: { main: Stem.JIA, secondary: Stem.BING, tertiary: Stem.WU },
    [Branch.MAO]: { main: Stem.YI },
    [Branch.CHEN]: { main: Stem.WU, secondary: Stem.YI, tertiary: Stem.GUI },
    [Branch.SI]: { main: Stem.BING, secondary: Stem.WU, tertiary: Stem.GENG },
    [Branch.WU]: { main: Stem.DING, secondary: Stem.JI },
    [Branch.WEI]: { main: Stem.JI, secondary: Stem.YI, tertiary: Stem.DING },
    [Branch.SHEN]: { main: Stem.GENG, secondary: Stem.REN, tertiary: Stem.WU },
    [Branch.YOU]: { main: Stem.XIN },
    [Branch.XU]: { main: Stem.WU, secondary: Stem.XIN, tertiary: Stem.DING },
    [Branch.HAI]: { main: Stem.REN, secondary: Stem.JIA }
  };