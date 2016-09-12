import React, { Component } from 'react';

class Main extends Component {
    render() {
        const { children } = this.props;
        console.log('KAKAKA', this);
        return (
            <div className="Main">
                {children}
            </div>
        );
    }
}

export default Main;
