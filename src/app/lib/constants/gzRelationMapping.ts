import { Stem, Branch, WuXing, Direction } from '../types/enums';
import { StemRelation, BranchRelation } from '../types/gzRelation';

// 天干关系表
export const stemRelationMapping: Record<Stem, StemRelation> = {
  [Stem.JIA]: {
    sheng: [Stem.BING, Stem.DING],     // 甲生丙丁
    ke: [Stem.WU, Stem.JI],       // 甲克戊己
    xianghe: [{stem: Stem.JI, wuxing: WuXing.EARTH}],                   // 甲己合土
    xiangchong: [Stem.GENG],              // 甲庚冲
  },
  [Stem.YI]: {
    sheng: [Stem.BING, Stem.DING],     // 乙生丙丁
    ke: [Stem.WU, Stem.JI],       // 乙克戊己
    xianghe: [{stem: Stem.GENG, wuxing: WuXing.METAL}],                   // 乙庚合金
    xiangchong: [Stem.XIN],              // 乙辛冲
  },
  [Stem.BING]: {
    sheng: [Stem.WU, Stem.JI],     // 丙生戊己
    ke: [Stem.GENG, Stem.XIN],       // 丙克庚辛
    xianghe: [{stem: Stem.XIN, wuxing: WuXing.WATER}],                   // 丙辛合水
    xiangchong: [Stem.REN],              // 丙壬冲
  },
  [Stem.DING]: {
    sheng: [Stem.WU, Stem.JI],     // 丁生戊己
    ke: [Stem.GENG, Stem.XIN],       // 丁克庚辛
    xianghe: [{stem: Stem.REN, wuxing: WuXing.WOOD}],                   // 丁壬合木
    xiangchong: [Stem.GUI],              // 丁癸冲
  },
  [Stem.WU]: {
    sheng: [Stem.GENG, Stem.XIN],     // 戊生庚辛
    ke: [Stem.REN, Stem.GUI],       // 戊克壬癸
    xianghe: [{stem: Stem.GUI, wuxing: WuXing.FIRE}],                   // 戊癸合火
  },
  [Stem.JI]: {
    sheng: [Stem.GENG, Stem.XIN],     // 己生辛庚
    ke: [Stem.REN, Stem.GUI],       // 己克壬癸
    xianghe: [{stem: Stem.JIA, wuxing: WuXing.EARTH}],                   // 己甲合土
  },
  [Stem.GENG]: {
    sheng: [Stem.REN, Stem.GUI],     // 庚生壬癸
    ke: [Stem.JIA, Stem.YI],       // 庚克甲乙
    xianghe: [{stem: Stem.YI, wuxing: WuXing.METAL}],                   // 庚乙合金
    xiangchong: [Stem.JIA],              // 庚甲冲
  },
  [Stem.XIN]: {
    sheng: [Stem.REN, Stem.GUI],     // 辛生壬癸
    ke: [Stem.JIA, Stem.YI],       // 辛克甲乙
    xianghe: [{stem: Stem.BING, wuxing: WuXing.WATER}],                   // 辛丙合水
    xiangchong: [Stem.YI],              // 辛乙冲
  },
  [Stem.REN]: {
    sheng: [Stem.JIA, Stem.YI],     // 壬生癸甲乙
    ke: [Stem.BING, Stem.DING],       // 壬克丙丁
    xianghe: [{stem: Stem.DING, wuxing: WuXing.WOOD}],                   // 壬丁合木 
    xiangchong: [Stem.BING],              // 壬丙冲
  },
  [Stem.GUI]: {
    sheng: [Stem.JIA, Stem.YI],     // 癸生壬甲乙
    ke: [Stem.BING, Stem.DING],       // 癸克丙丁
    xianghe: [{stem: Stem.WU, wuxing: WuXing.FIRE}],                   // 癸戊合火
    xiangchong: [Stem.DING],              // 癸丁冲
  },
};

// 地支关系表
export const branchRelationMapping: Record<Branch, BranchRelation> = {
  [Branch.ZI]: {
    sheng: [Branch.YIN, Branch.MAO],                               // 子水生寅卯木
    ke: [Branch.SI, Branch.WU],                                    // 子水克巳午火
    he: {
      xianghe: [{
        branch: Branch.CHOU,
        wuxing: WuXing.EARTH
      }],                                                          // 子丑合化土
      sanhe: [{
        branch: [Branch.SHEN, Branch.CHEN],
        wuxing: WuXing.WATER
      }],                                                          // 申子辰合水局
      sanhui: [{
        branch: [Branch.HAI, Branch.CHOU],
        direction: Direction.NORTH,
        wuxing: WuXing.WATER
      }]                                                           // 亥子丑会北方水局
    },
    xing: {
      xiangxing: [Branch.MAO]                                      // 子卯相刑
    },
    xiangchong: [Branch.WU],                                            // 子午相冲
    xianghai: [Branch.WEI]                                              // 子未相害
  },
  [Branch.CHOU]: {
    sheng: [Branch.SHEN, Branch.YOU],                             // 丑土生申酉金
    ke: [Branch.HAI, Branch.ZI],                                  // 丑土克亥子水
    he: {
      xianghe: [{
        branch: Branch.ZI,
        wuxing: WuXing.EARTH
      }],                                                          // 丑子合化土
      sanhe: [{
        branch: [Branch.SI, Branch.YOU],
        wuxing: WuXing.METAL
      }],                                                          // 巳酉丑合金局
      sanhui: [{
        branch: [Branch.ZI, Branch.HAI],
        direction: Direction.NORTH,
        wuxing: WuXing.WATER
      }]                                                           // 亥子丑会北方水局
    },
    xing: {
      sanxiang: [Branch.XU, Branch.WEI],                          // 丑戌未三刑
      xiangxing: [Branch.XU, Branch.WEI]                          // 丑刑戌，丑刑未
    },
    xiangchong: [Branch.WEI],                                          // 丑未相冲
    xianghai: [Branch.WU]                                              // 丑午相害
  },
  [Branch.YIN]: {
    sheng: [Branch.SI, Branch.WU],       
    ke: [Branch.CHEN, Branch.XU, Branch.CHOU, Branch.WEI],
    he: {
      xianghe: [{
        branch: Branch.HAI,
        wuxing: WuXing.WOOD
      }],                                                          // 寅亥合化木
      sanhe: [{
        branch: [Branch.WU, Branch.XU],
        wuxing: WuXing.FIRE
      }],                                                          // 寅午戌合火局
      sanhui: [{
        branch: [Branch.MAO, Branch.CHEN],
        direction: Direction.EAST,
        wuxing: WuXing.WOOD
      }]                                                          // 寅卯辰会东方木局
    },
    xing: {
      sanxiang: [Branch.SI, Branch.SHEN],                          // 寅巳申三刑
      xiangxing: [Branch.SI, Branch.SHEN]                          // 寅刑巳，寅刑申
    },
    xiangchong: [Branch.SHEN],                                          // 寅申相冲
    xianghai: [Branch.SI]                                              // 寅巳相害
  },
  [Branch.MAO]: {
    sheng: [Branch.SI, Branch.WU],      
    ke: [Branch.CHEN, Branch.XU, Branch.CHOU, Branch.WEI],
    he: {
      xianghe: [{
        branch: Branch.XU,
        wuxing: WuXing.FIRE
      }],                                                          // 卯戌合化火
      sanhe: [{
        branch: [Branch.HAI, Branch.WEI],
        wuxing: WuXing.WOOD
      }],                                                          // 亥卯未合木局
      sanhui: [{
        branch: [Branch.YIN, Branch.CHEN],
        direction: Direction.EAST,
        wuxing: WuXing.WOOD
      }]                                                          // 寅卯辰会东方木局
    },
    xing: {
      xiangxing: [Branch.ZI]                                      // 卯子相刑
    },
    xiangchong: [Branch.YOU],                                          // 卯酉相冲
    xianghai: [Branch.CHEN]                                          // 卯辰相害
  },
  [Branch.CHEN]: {
    sheng: [Branch.SHEN, Branch.YOU],   
    ke: [Branch.HAI, Branch.ZI],        
    he: {
      xianghe: [{
        branch: Branch.YOU,
        wuxing: WuXing.METAL
      }],                                                          // 辰酉合化金
      sanhe: [{
        branch: [Branch.SHEN, Branch.ZI],
        wuxing: WuXing.WATER
      }],                                                          // 申子辰合水局
      sanhui: [{
        branch: [Branch.YIN, Branch.MAO],
        direction: Direction.EAST,
        wuxing: WuXing.WOOD
      }]                                                          // 寅卯辰会东方木局
    },
    xing: {
      zixing: [Branch.CHEN]                                      // 辰自刑
    },
    xiangchong: [Branch.XU],                                           // 辰戌相冲
    xianghai: [Branch.MAO]                                           // 辰卯相害
  },
  [Branch.SI]: {
    sheng: [Branch.CHEN, Branch.XU, Branch.CHOU, Branch.WEI],
    ke: [Branch.SHEN, Branch.YOU],      
    he: {
      xianghe: [{
        branch: Branch.SHEN,
        wuxing: WuXing.WATER
      }],                                                          // 巳申合化水
      sanhe: [{
        branch: [Branch.YOU, Branch.CHOU],
        wuxing: WuXing.METAL
      }],                                                          // 巳酉丑合金局
      sanhui: [{
        branch: [Branch.WU, Branch.WEI],
        direction: Direction.SOUTH,
        wuxing: WuXing.FIRE
      }]                                                          // 巳午未会南方火局
    },
    xing: {
      sanxiang: [Branch.YIN, Branch.SHEN],                          // 寅巳申三刑
      xiangxing: [Branch.YIN, Branch.SHEN]                          // 巳刑寅，巳刑申
    },
    xiangchong: [Branch.HAI],                                          // 巳亥相冲
    xianghai: [Branch.YIN]                                             // 巳寅相害
  },
  [Branch.WU]: {
    sheng: [Branch.CHEN, Branch.XU, Branch.CHOU, Branch.WEI],
    ke: [Branch.SHEN, Branch.YOU],      
    he: {
      xianghe: [{
        branch: Branch.WEI,
        wuxing: WuXing.FIRE
      }],      
      sanhe: [{
        branch: [Branch.YIN, Branch.XU],
        wuxing: WuXing.FIRE
      }],                                                           // 寅午戌合火局
      sanhui: [{
        branch: [Branch.SI, Branch.WEI],
        direction: Direction.SOUTH,
        wuxing: WuXing.FIRE
      }]                                                          // 巳午未会南方火局
    },  
    xing: {
      zixing: [Branch.WU]                                      // 午自刑
    },
    xiangchong: [Branch.ZI],                                           // 午子相冲
    xianghai: [Branch.CHOU]                                         // 午丑相害
  },
  [Branch.WEI]: {
    sheng: [Branch.SHEN, Branch.YOU],   
    ke: [Branch.HAI, Branch.ZI],        
    he: {
      xianghe: [{
        branch: Branch.WU,
        wuxing: WuXing.FIRE
      }],                                                          // 未午合化火
      sanhe: [{
        branch: [Branch.HAI, Branch.MAO],
        wuxing: WuXing.WOOD
      }],                                                          // 亥卯未合木局
      sanhui: [{
        branch: [Branch.SI, Branch.WU],
        direction: Direction.SOUTH,
        wuxing: WuXing.FIRE
      }]                                                          // 巳午未会南方火局
    },
    xing: {
      sanxiang: [Branch.CHOU, Branch.XU],                          // 丑戌未三刑
      xiangxing: [Branch.CHOU, Branch.XU]                          // 未刑丑，未刑戌
    },
    xiangchong: [Branch.CHOU],                                         // 未丑相冲
    xianghai: [Branch.ZI]                                             // 未子相害
  },
  [Branch.SHEN]: {
    sheng: [Branch.HAI, Branch.ZI],     
    ke: [Branch.YIN, Branch.MAO],       
    he: {
      xianghe: [{
        branch: Branch.SI,
        wuxing: WuXing.WATER
      }],                                                          // 申巳合化水
      sanhe: [{
        branch: [Branch.ZI, Branch.CHEN],
        wuxing: WuXing.WATER
      }],                                                          // 申子辰合水局
      sanhui: [{
        branch: [Branch.YOU, Branch.XU],
        direction: Direction.WEST,
        wuxing: WuXing.METAL
      }]                                                          // 申酉戌会西方金局
    },
    xing: {
      sanxiang: [Branch.YIN, Branch.SI],                          // 寅巳申三刑
      xiangxing: [Branch.YIN, Branch.SI]                          // 申刑寅，申刑巳
    },
    xiangchong: [Branch.YIN],                                          // 申寅相冲
    xianghai: [Branch.HAI]                                            // 申亥相害
  },
  [Branch.YOU]: {
    sheng: [Branch.HAI, Branch.ZI],     
    ke: [Branch.YIN, Branch.MAO],       
    he: {
      xianghe: [{
        branch: Branch.CHEN,
        wuxing: WuXing.METAL
      }],                                                          // 酉辰合化金
      sanhe: [{
        branch: [Branch.SI, Branch.CHOU],
        wuxing: WuXing.METAL
      }],                                                          // 巳酉丑合金局
      sanhui: [{
        branch: [Branch.SHEN, Branch.XU],
        direction: Direction.WEST,
        wuxing: WuXing.METAL
      }]                                                          // 申酉戌会西方金局
    },
    xing: {
      zixing: [Branch.YOU]                                      // 酉自刑
    },
    xiangchong: [Branch.MAO],                                          // 酉卯相冲
    xianghai: [Branch.XU]                                            // 酉戌相害
  },
  [Branch.XU]: {
    sheng: [Branch.SHEN, Branch.YOU],   
    ke: [Branch.HAI, Branch.ZI],        
    he: {
      xianghe: [{
        branch: Branch.MAO,
        wuxing: WuXing.FIRE
      }],                                                          // 戌卯合化火
      sanhe: [{
        branch: [Branch.YIN, Branch.WU],
        wuxing: WuXing.FIRE
      }],                                                          // 寅午戌合火局
      sanhui: [{
        branch: [Branch.SHEN, Branch.YOU],
        direction: Direction.WEST,
        wuxing: WuXing.METAL
      }]                                                          // 申酉戌会西方金局
    },
    xing: {
      sanxiang: [Branch.CHOU, Branch.WEI],                          // 丑戌未三刑
      xiangxing: [Branch.CHOU, Branch.WEI]                          // 戌刑丑，戌刑未
    },
    xiangchong: [Branch.CHEN],                                         // 戌辰相冲
    xianghai: [Branch.YOU]                                           // 戌酉相害
  },
  [Branch.HAI]: {
    sheng: [Branch.YIN, Branch.MAO],    
    ke: [Branch.SI, Branch.WU],         
    he: {
      xianghe: [{
        branch: Branch.YIN,
        wuxing: WuXing.WOOD
      }],                                                          // 亥寅合化木
      sanhe: [{
        branch: [Branch.MAO, Branch.WEI],
        wuxing: WuXing.WOOD
      }],                                                          // 亥卯未合木局
      sanhui: [{
        branch: [Branch.ZI, Branch.CHOU],
        direction: Direction.NORTH,
        wuxing: WuXing.WATER
      }]                                                          // 亥子丑会北方水局
    },
    xing: {
      zixing: [Branch.HAI]                                      // 亥自刑
    },
    xiangchong: [Branch.SI],                                          // 亥巳相冲
    xianghai: [Branch.SHEN]                                           // 亥申相害
  }
}; 