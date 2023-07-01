"use client"
import { Card } from 'antd'
import React, { useState } from 'react'

const tabList = [
    {
        key: 'info',
        tab: 'Info',
    },
    {
        key: 'transport',
        tab: 'Transport',
    },
    { 
        key: 'itinerary',
        tab: 'Itinerary'
    }
];


interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    contentList: Record<string, React.ReactNode>
    extra: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ title, contentList, extra, ...rest }) => {

    const [activeTabKey1, setActiveTabKey1] = useState<string>('info');

    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
      };

    return <div className="fixed z-[100] flex items-center justify-center top-0 left-0 w-screen h-screen bg-black bg-opacity-25" >
        <div className="flex w-[65vw]">
            <Card
                style={{ width: '100%' }}
                title={title}
                extra={extra}
                tabList={tabList}
                activeTabKey={activeTabKey1}
                onTabChange={onTab1Change}
            >
                {contentList[activeTabKey1]}
            </Card>
        </div>
    </div >
}

export default Modal