import React from 'react'
import './loader.css'

const Loader: React.FC = () => {
    return (
        <div className="box" data-testid="loader">
            <div className="cat">
                <div className="cat__body" />
                <div className="cat__body" />
                <div className="cat__tail" />
                <div className="cat__head" />
            </div>
        </div>
    )
}

export default Loader
