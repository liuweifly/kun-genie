
const today = new Date().toLocaleDateString(); // 获取今天的日期


export default function LuckDisplay() {
  return (
    <div className="mt-12 col-span-1">
    <div>
    <h1 className="text-3xl font-bold sm:mb-5 mb-5 mt-5 text-left">
    🗓️ <span className="italic">{today}</span> {/* 显示今天的日期 */}
    </h1>
    </div>
    {/* 运势展示模块 */}
    <div className="w-full max-w-2xl bg-[#fdf9f3] rounded-md">              
        <div className="flex items-center p-4">
        {/* Circular Progress - 1/3 width */}
        <div className="relative flex h-full w-1/3 pr-4">
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
    </div>

    {/* 开运建议 */}
    <div className="mt-6">
    <h3 className="text-xl font-bold">开运建议</h3>
    <p>今天适合穿黄色，出行时间为下午3点到5点。</p> {/* 示例建议 */}
    </div>
    </div>
  )
}