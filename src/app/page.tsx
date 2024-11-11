'use client'

import { createCustomerInfo, State } from "./lib/utils/actions";
import { useActionState } from 'react';
import LuckDiv from './ui/luck-div';
import React from 'react';
import LuckDisplay from './ui/LuckDisplay';

export default function Home() {

  //定义useActionState的hook，用于form提交。流程是form提交后，可以返回错误信息和提醒
  const initialState: State = { message: null, errors: {}, values: {} };
  const [state, formAction] = useActionState(createCustomerInfo, initialState);

  //返回页面。目前是用的cursor生成的。注意：formAction是form提交后，可以返回错误信息和提醒
  return (
    <div className="p-6">
      <div className="mb-6 col-span-1">
        <h1 className="text-3xl mt-2 mb-2 text-left flex items-center font-bold">
          今日好运，请查收🙌
        </h1>
        <p className="text-lg text-left mb-6">请输出你的基本信息，查看今日运势</p>
        <form action={formAction}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2">姓名</label>
              <input
                type="text"
                id="name"
                name="name"
              className="w-full border rounded-md p-2 text-black"
              required
              defaultValue={state.values?.name || ''}
            />
          </div>

          <div>
            <label htmlFor="birthDateTime" className="block mb-2">出生时间</label>
            <input
              type="datetime-local"
              id="birthDateTime"
              name="birthDateTime"
              className="w-full border rounded-md p-2 text-black"
              required
              defaultValue={state.values?.birthDateTime || ''}
            />
          </div>

          <div>
            <label className="block mb-2">性别</label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="gender" 
                  value="male" 
                  required
                  defaultChecked={state.values?.gender === 'male'}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="gender" 
                  value="female"
                  defaultChecked={state.values?.gender === 'female'}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button type="submit" className="w-1/2 bg-black text-white rounded-md p-2 border border-gray-200">
              ✨ 查收
            </button>
          </div>
          </div>
        </form>
      </div>
      {/* <LuckDisplay /> */}
      <div className="mt-6">
        <h2 className="text-lg font-bold dark:text-white">调试信息</h2>
        <div className="mt-4 space-y-4">
          {state.values && (
            <>
              {/* 基本信息 */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2 dark:text-white">基本信息</h3>
                <p className="dark:text-gray-300">姓名：{state.values.name}</p>
                <p className="dark:text-gray-300">性别：{state.values.gender === 'male' ? '男' : '女'}</p>
                <p className="dark:text-gray-300">出生时间：{state.values.birthDateTime}</p>
              </div>

              {/* 八字信息 */}
              {state.values.bazi && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2 dark:text-white">八字</h3>
                  {(() => {
                    const bazi = JSON.parse(state.values.bazi);
                    return (
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">年柱</p>
                          <p className="dark:text-gray-300">{bazi.year.stem}{bazi.year.branch}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">月柱</p>
                          <p className="dark:text-gray-300">{bazi.month.stem}{bazi.month.branch}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">日柱</p>
                          <p className="dark:text-gray-300">{bazi.day.stem}{bazi.day.branch}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">时柱</p>
                          <p className="dark:text-gray-300">{bazi.hour.stem}{bazi.hour.branch}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* 当天八字 */}
              {state.values.currentDayBazi && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2 dark:text-white">今日八字</h3>
                  {(() => {
                    const currentDayBazi = JSON.parse(state.values.currentDayBazi);
                    return (
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">年柱</p>
                          <p className="dark:text-gray-300">{currentDayBazi.year.stem}{currentDayBazi.year.branch}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">月柱</p>
                          <p className="dark:text-gray-300">{currentDayBazi.month.stem}{currentDayBazi.month.branch}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">日柱</p>
                          <p className="dark:text-gray-300">{currentDayBazi.day.stem}{currentDayBazi.day.branch}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">时柱</p>
                          <p className="dark:text-gray-300">{currentDayBazi.hour.stem}{currentDayBazi.hour.branch}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* 身强弱分析 */}
              {state.values.strength && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2 dark:text-white">身强弱分析</h3>
                  {(() => {
                    const strength = JSON.parse(state.values.strength);
                    return (
                      <div>
                        <p className="dark:text-gray-300">总分：{strength.score}</p>
                        <p className="dark:text-gray-300">状态：{
                          strength.status === 'strong' ? '身强' :
                          strength.status === 'weak' ? '身弱' : '均衡'
                        }</p>
                        <div className="mt-2">
                          <p className="text-gray-600 dark:text-gray-400">详细得分：</p>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            {strength.details.map((detail: any, index: number) => (
                              <div key={index} className="text-sm dark:text-gray-300">
                                {detail.position}: {detail.score}分 ({detail.wuxing})
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* 当日运势 */}
              {state.values.dayFortune && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2 dark:text-white">今日运势</h3>
                  {(() => {
                    const dayFortune = JSON.parse(state.values.dayFortune);
                    return (
                      <div>
                        <p className="dark:text-gray-300">总分：{dayFortune.score}</p>
                        <div className="mt-2">
                          <p className="text-gray-600 dark:text-gray-400">详细分析：</p>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            {dayFortune.details.map((detail: any, index: number) => (
                              <div key={index} className="text-sm dark:text-gray-300">
                                {detail.position}: {detail.score}分 
                                ({detail.wuxing}) 
                                <span className={
                                  detail.type === 'LUCKY' ? 'text-green-600 dark:text-green-400' :
                                  detail.type === 'UNLUCKY' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
                                }>
                                  {detail.type === 'LUCKY' ? '吉' :
                                   detail.type === 'UNLUCKY' ? '凶' : '中性'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
  
   {/* <LuckDiv values={state.values ?? {}} />      */}