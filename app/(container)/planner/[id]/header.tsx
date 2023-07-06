"use client"
import { Select } from 'antd'

const Header: React.FC<any> = () => {
    return <div className="h-[10vh] px-8 drop-shadow-xl flex items-center justify-between header w-full bg-gradient-to-r from-orange-400 to-orange-600">
        <div>
            <img src="/logo-white.svg" alt="" className='w-full h-[1.8rem]' />
            <p className='text-sm'>Travel plan editor</p>
        </div>
        <div className="flex items-center space-x-8">
            <p className="text-[0.92rem]">Hanoi to Haiphong in 3 days</p>
            <Select
                className='planner-editor-category-selector'
                suffixIcon={null}
                defaultValue="food-tour"
                style={{ width: 120 }}
                bordered={false}
                options={[
                    { value: 'food-tour', label: 'Food tour' },
                    { value: 'camping', label: 'Camping' },
                    { value: 'hiking', label: 'Hiking' },
                ]}
            />
            <div className="flex items-center space-x-4">
                <img src="/icons/download.svg" alt="" />
                <img src="/icons/share.svg" alt="" />
                <img src="/icons/flag.svg" alt="" />
            </div>
        </div>
    </div>
}

export default Header