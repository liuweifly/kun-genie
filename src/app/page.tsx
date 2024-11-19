'use client'

import { createCustomerInfo, State } from "./lib/utils/actions";
import { useActionState } from 'react';
import React, { useEffect } from 'react';
import LuckDisplay from './ui/LuckDisplay';
import LoadingState from './ui/LoadingState';
import TenGodDisplay from './ui/TenGodDisplay';

export default function Home() {
  const initialState: State = { message: null, errors: {}, values: {} };
  const [state, formAction, isPending] = useActionState(createCustomerInfo, initialState);

  // 从 localStorage 加载数据
  useEffect(() => {
    const savedData = localStorage.getItem('userInputData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // 更新表单值
      const form = document.querySelector('form');
      if (form) {
        const nameInput = form.querySelector('#name') as HTMLInputElement;
        const birthInput = form.querySelector('#birthDateTime') as HTMLInputElement;
        const genderInputs = form.querySelectorAll('input[name="gender"]') as NodeListOf<HTMLInputElement>;
        
        if (nameInput) nameInput.value = parsedData.name || '';
        if (birthInput) birthInput.value = parsedData.birthDateTime || '';
        if (genderInputs) {
          genderInputs.forEach(input => {
            input.checked = input.value === parsedData.gender;
          });
        }
      }
    }
  }, []);

  // 监听表单变化并保存到 localStorage
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const form = e.target.form;
    if (form) {
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        birthDateTime: formData.get('birthDateTime'),
        gender: formData.get('gender'),
      };
      localStorage.setItem('userInputData', JSON.stringify(data));
    }
  };

  return (
    <div className="p-6">
      {/* 在成功时不显示任何信息，而在失败时显示错误信息 */}
      {state.message && state.message !== 'Success!' && (
        <div className="mb-4 p-4 rounded-md bg-red-50 text-red-700 border border-red-200">
          {state.message}
        </div>
      )}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  />
                  <span className="ml-2">男</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="female"
                    defaultChecked={state.values?.gender === 'female'}
                    onChange={handleInputChange}
                  />
                  <span className="ml-2">女</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button 
                type="submit" 
                disabled={isPending}
                className={`w-1/2 bg-black text-white rounded-md p-2 border border-gray-200 transition-opacity ${
                  isPending ? 'opacity-75' : ''
                }`}
              >
                {isPending ? '🔮 正在计算...' : '✨ 查收'}
              </button>
            </div>
            </div>
          </form>
        </div>
      {/* 加载状态 */}
      {isPending && <LoadingState />}
      {/* <LuckDisplay /> */}
      {!isPending && state.message && (
      <div className="mt-6">
        <h2 className="text-lg font-bold dark:text-white">调试信息</h2>
        <div className="mt-4 space-y-4">
          {state.values && (
            <>
              {/* 基本信息 */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2 dark:text-white">基本信息</h3>
                <p className="dark:text-gray-300">姓名：{state.values.name}</p>
                <p className="dark:text-gray-300">
                  性别：{state.values.gender && (state.values.gender === 'male' ? '男' : '女')}
                </p>
                <p className="dark:text-gray-300">出生时间：{state.values.birthDateTime}</p>
              </div>

              {/* 十神分析 */}
              {state.values.tenGodData && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">八字十神分析</h3>
                  <TenGodDisplay tenGodData={JSON.parse(state.values.tenGodData)} />
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
      )}
    </div>
  );
}  
