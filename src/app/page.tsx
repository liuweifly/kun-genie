'use client'

import { createCustomerInfo, State } from "./lib/actions";
import { useActionState } from 'react';
import LuckDiv from './ui/luck-div';
import React from 'react';
import { Card } from './ui/Card';

export default function Home() {

  //定义useActionState的hook，用于form提交。流程是form提交后，可以返回错误信息和提醒
  const initialState: State = { message: null, errors: {}, values: {} };
  const [state, formAction] = useActionState(createCustomerInfo, initialState);

  const today = new Date().toLocaleDateString(); // 获取今天的日期

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

      <div className="mt-12 col-span-1">
          <div>
            <h1 className="text-3xl font-bold sm:mb-5 mb-5 mt-5 sm:mt-0 sm:text-center text-left">
            🗓️ <span className="italic">{today}</span> {/* 显示今天的日期 */}
            </h1>
          </div>
           {/* 运势展示模块 */}
        <div className="mt-6">  
          {/* 右侧运势展示 */}
          <Card className="w-full max-w-2xl bg-[#fdf9f3]" style={{ aspectRatio: '2 / 1' }}>              
              <div className="flex h-[calc(100%-2rem)] items-center">
                {/* Circular Progress - 1/3 width */}
                <div className="relative h-full w-1/3 pr-4">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e8e8e8"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#b666d2"
                      strokeWidth="10"
                      strokeDasharray="282.7"
                      strokeDashoffset="113.08"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-bold text-[#444]">60</span>
                    <span className="text-sm text-[#666]">综合运势</span>
                  </div>
                </div>

                {/* Progress Bars - 2/3 width */}
                <div className="flex h-full w-2/3 flex-col justify-center space-y-4 pl-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-[#8b5d3b]">
                      <span>财富运</span>
                      <span>66%</span>
                    </div>
                    <div className="h-6 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
                      <div 
                        className="h-full rounded-full bg-[#e6c876] text-xs leading-6 text-white"
                        style={{ width: '66%' }}
                      >
                        <span className="pl-2">平平</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-[#8b5d3b]">
                      <span>爱情运</span>
                      <span>60%</span>
                    </div>
                    <div className="h-6 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
                      <div 
                        className="h-full rounded-full bg-[#e67676] text-xs leading-6 text-white"
                        style={{ width: '60%' }}
                      >
                        <span className="pl-2">平平</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-[#8b5d3b]">
                      <span>事业运</span>
                      <span>56%</span>
                    </div>
                    <div className="h-6 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
                      <div 
                        className="h-full rounded-full bg-[#76a6e6] text-xs leading-6 text-white"
                        style={{ width: '56%' }}
                      >
                        <span className="pl-2">一般</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

          {/* 开运建议 */}
          <div className="mt-6">
            <h3 className="text-xl font-bold">开运建议</h3>
            <p>今天适合穿黄色，出行时间为下午3点到5点。</p> {/* 示例建议 */}
          </div>
        </div>
      </div>
    </div>
  );
}
  
   {/* <LuckDiv values={state.values ?? {}} />      */}