import React from 'react';
import './Frontend.css';

export default function Frontend() {
    const handleAddSites = () => {
        console.log('Add Sites clicked');
    };

    const handleRemoveSites = () => {
        console.log('Remove Sites clicked');
    };

    const handleBack = () => {
        console.log('Back clicked');
    };

    return (
        <div className="container">
            <div className="box">
                <h1 className="heading">Add/Block Sites</h1>
                <div className="button-group">
                    <button className="btn btn-add" onClick={handleAddSites}>
                        Add Sites
                    </button>
                    <button className="btn btn-remove" onClick={handleRemoveSites}>
                        Remove Sites
                    </button>
                    <button className="btn btn-back" onClick={handleBack}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}