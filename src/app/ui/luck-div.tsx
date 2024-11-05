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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadStartTime, setLoadStartTime] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    useEffect(() => {
        if (values.birthDateTime) {
            setIsLoading(true);
            setLoadStartTime(Date.now());
            setFortune('');
            
            const date = new Date(values.birthDateTime);
            
            const lunar = Lunar.fromDate(date);
            
            const baziInfo = {
                year: lunar.getYearInGanZhi(),
                month: lunar.getMonthInGanZhi(),
                day: lunar.getDayInGanZhi(),
                time: lunar.getTimeInGanZhi(),
            };
            
            const baziString = `姓名：${values.name}
                性别：${values.gender === 'male' ? '男' : '女'}
                阳历：${date.toLocaleString()}
                农历：${lunar.toString()}
                八字：${baziInfo.year} ${baziInfo.month} ${baziInfo.day} ${baziInfo.time}
            `;
            
            setBazi(baziString);

            const fetchFortune = async () => {
                try {
                    const result = await getFortune(values);
                    setFortune(result.text);
                } catch (error) {
                    console.error('获取运势失败:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchFortune();
        }
    }, [values]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isLoading) {
            timer = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - loadStartTime) / 1000));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isLoading, loadStartTime]);

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
            
            <div className="p-4 border rounded-md">
                <h2 className="text-xl mb-4">每日运势分析</h2>
                <div className="whitespace-pre-line">
                    {bazi ? (
                        isLoading ? (
                            <>
                                正在加载中... ({elapsedTime} 秒)
                            </>
                        ) : fortune
                    ) : null}
                </div>
            </div>
        </div>
    );
}