# react-native-zyCountDown
用于react-native的计数组件

  封装的一个倒计时按钮,仅仅使用TouchableOpacity，View和Text.  <br/>

## 安装
`npm i react-native-zycountdown`
#####   或者
`yarn add react-native-zycountdown`

##使用
```
import CountDown from 'react-native-zycountdown';
...

<CountDown
    onClick={() => {
    ToastAndroid.show('Start counting',ToastAndroid.SHORT);
    return true}}
/>

<CountDown
    style={{backgroundColor: 'blue'}}
    textStyle={{color: 'yellow'}}
    count={10}
    title={'click to start'}
    frontText={'frontText:'}
    behindText={'behindText'}
    onClick={() => {
    ToastAndroid.show('Start counting',ToastAndroid.SHORT);
    return true}}
/>
```

