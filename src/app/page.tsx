'use client'

import { createCustomerInfo, State } from "./lib/actions";
import { useActionState } from 'react';
import LuckDiv from './ui/luck-div';

export default function Home() {

  //定义useActionState的hook，用于form提交。流程是form提交后，可以返回错误信息和提醒
  const initialState: State = { message: null, errors: {}, values: {} };
  const [state, formAction] = useActionState(createCustomerInfo, initialState);

  //返回页面。目前是用的cursor生成的。注意：formAction是form提交后，可以返回错误信息和提醒
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6 text-center">今日运势</h1>
      <form action={formAction}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Name</label>
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
            <label htmlFor="birthDateTime" className="block mb-2">Birthday</label>
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
            <label className="block mb-2">Gender</label>
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

          <div className="mt-6">
            <button type="submit" className="w-full bg-black text-white rounded-md p-2 border border-gray-200">
              查看
            </button>
          </div>
        </div>
      </form>
      <LuckDiv values={state.values ?? {}} />     
    </div>
  );
}
