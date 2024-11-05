import { useEffect, useState } from "react";
import { Lunar } from 'lunar-typescript'; // 需要安装这个包

interface Values {
    birthDateTime?: string;
    name?: string;
    gender?: string;
}

export default function LuckDiv({ values }: { values: Values }) {
    const [bazi, setBazi] = useState<string>('');

    useEffect(() => {
        if (values.birthDateTime) {
            // 解析日期时间字符串
            const date = new Date(values.birthDateTime);
            
            // 转换为阴历
            const lunar = Lunar.fromDate(date);
            
            // 获取八字
            const baziInfo = {
                year: lunar.getYearInGanZhi(), // 年柱
                month: lunar.getMonthInGanZhi(), // 月柱
                day: lunar.getDayInGanZhi(), // 日柱
                time: lunar.getTimeInGanZhi(), // 时柱
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
        }
    }, [values]); // 当 values 变化时重新计算

    return (
        <div className="mt-6 p-4 border rounded-md">
            <h2 className="text-xl mb-4">八字分析</h2>
            {bazi ? (
                <pre className="whitespace-pre-line">
                    {bazi}
                </pre>
            ) : (
                <p>请输入出生日期时间</p>
            )}
        </div>
    );
}