/**
 * Created by 李卓原 on 2018/7/13.
 * email: zhuoyuan93@gmail.com
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewPropTypes,
    ImageBackground
} from 'react-native';

export default class CountDown extends React.Component {

    static propTypes = {
        style: ViewPropTypes.style,
        textStyle: ViewPropTypes.style,
        onClick: PropTypes.func,
        count: PropTypes.number,
        title: PropTypes.string,
        frontText: PropTypes.string,
        behindText: PropTypes.string,
    };

    static defaultProps = {
        count: 60,
        title: 'send',
        frontText: '等待',
        behindText: '秒'
    };

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.title,
            thisCount: this.props.count,
            disabled: false
        }
    }

    render() {
        let {source, style, textStyle} = this.props;
        return (
            <TouchableOpacity
                style={[styles.countView, style]}
                disabled={this.state.disabled}
                onPress={this._countDown}>
                <ImageBackground source={source} style={styles.backImg}>
                    <Text style={[styles.countText, textStyle]}>{this.state.text}</Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    /**
     * 执行上一页面传来的方法
     * 当上一页面方法返回true 才会 开始计时
     * @private
     */
    _countDown = () => {
        let {title, count, onClick, frontText, behindText} = this.props;
        if (!onClick()) return;
        this.setState({disabled: true, text: frontText + this.state.thisCount + behindText});
        this.timeInterval = setInterval(() => {
            if (this.state.thisCount) {
                this.setState(prevState => ({
                    thisCount: prevState.thisCount - 1,
                    text: prevState.thisCount > 0 ? frontText + (prevState.thisCount - 1) + behindText : count
                }))
            } else {
                this.timeInterval && clearInterval(this.timeInterval);
                this.setState({
                    text: title,
                    thisCount: count,
                    disabled: false
                })
            }
        }, 1000)
    };

    componentWillUnmount() {
        this.timeInterval && clearInterval(this.timeInterval);
    }
}

const styles = StyleSheet.create({
    countView: {
        backgroundColor: '#3F39C9',
    },
    backImg: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 5,
    },
    countText: {
        color: '#fff'
    }
});