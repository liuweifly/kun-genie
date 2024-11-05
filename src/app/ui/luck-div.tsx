import { useEffect, useState } from "react";
import { Lunar } from 'lunar-typescript';
import { getFortune } from "../lib/actions";

interface Values {
    birthDateTime?: string;
    name?: string;
    gender?: string;
}

export default function LuckDiv({ values }: { values: Values }) {
    const [bazi, setBazi] = useState<string>('');
    const [fortune, setFortune] = useState<string>('');

    useEffect(() => {
        if (values.birthDateTime) {
            // 解析日期时间字符串
            const date = new Date(values.birthDateTime);
            
            // 转换为阴历
            const lunar = Lunar.fromDate(date);
            
            // 获取八字
            const baziInfo = {
                year: lunar.getYearInGanZhi(),
                month: lunar.getMonthInGanZhi(),
                day: lunar.getDayInGanZhi(),
                time: lunar.getTimeInGanZhi(),
            };
            
            // 格式化八字显示
            const baziString = `
                姓名：${values.name}
                性别：${values.gender === 'male' ? '男' : '女'}
                阳历：${date.toLocaleString()}
                农历：${lunar.toString()}
                八字：${baziInfo.year} ${baziInfo.month} ${baziInfo.day} ${baziInfo.time}
            `;
            
            setBazi(baziString);

            // 调用服务器端函数获取运势
            const fetchFortune = async () => {
                try {
                    const result = await getFortune(values);
                    setFortune(result.text);
                } catch (error) {
                    console.error('获取运势失败:', error);
                }
            };

            fetchFortune();
        }
    }, [values]);

    return (
        <div className="mt-6 space-y-6">
            <div className="p-4 border rounded-md">
                <h2 className="text-xl mb-4">八字分析</h2>
                {bazi ? (
                    <pre className="whitespace-pre-line">
                        {bazi}
                    </pre>
                ) : (
                    <p>请输入出生日期时间</p>
                )}
            </div>
            
            {fortune && (
                <div className="p-4 border rounded-md">
                    <h2 className="text-xl mb-4">每日运势分析</h2>
                    <div className="whitespace-pre-line">
                        {fortune}
                    </div>
                </div>
            )}
        </div>
    );
}