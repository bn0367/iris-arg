import React from 'react';

interface WindowProps {
    width: number;
    height: number;
    children: any;
}

export default class Window extends React.Component<WindowProps> {
    state = {
        width: 0,
        height: 0,
        children: []
    }


    async componentDidMount() {
        const {width, height, children} = this.props;
        this.setState({width, height, children});
    }

    render() {
        const {width, height, children} = this.state;
        if (width === 0 || height === 0) {
            return null;
        }
        let w = width.toString() + "em";
        let h = height.toString() + "em";
        return <div style={{
            width: w,
            height: h,
            border: 'medium solid white',
            borderRadius: "0.25em",
            overflow: 'hidden',
            padding: '0.5em',
            userSelect: 'none',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }} className={'window'}>
            {children}
        </div>
    }
}
