import React from 'react'

import './TabContent.css'

const TabContent = ({ children, activeTab, tabIndex, ...other }) => {

    return (
        <div
            hidden={activeTab !== tabIndex}
            id={`scrollable-auto-tabcontent-${tabIndex}`}
            aria-labelledby={`scrollable-auto-tab-${tabIndex}`}
            {...other}
        >
            {activeTab === tabIndex && (
                <div className="text-center">
                    {children}
                </div>
            )}
        </div>
    )
}

export default TabContent