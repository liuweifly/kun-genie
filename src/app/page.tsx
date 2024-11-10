'use client'

import { createCustomerInfo, State } from "./lib/actions";
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
      <LuckDisplay />
    </div>

  );
}
  
   {/* <LuckDiv values={state.values ?? {}} />      */}