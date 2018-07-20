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
    ViewPropTypes
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
        return (
            <TouchableOpacity
                disabled={this.state.disabled}
                onPress={this._countDown}>
                <View style={[styles.countView, this.props.style]}>
                    <Text style={[styles.countText, this.props.textStyle]}>{this.state.text}</Text>
                </View>
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        height: 40,
        backgroundColor: 'green'
    },
    countText: {
        color: '#fff'
    }
});