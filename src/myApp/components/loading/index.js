'use strict'
import React,{PureComponent} from 'react';
import { StyleSheet, Dimensions, Text, View, Modal, ActivityIndicator } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;




export class EasyLoading {
    constructor() {
    }
    static bind(loading, key = 'default') {
        loading && (this.map[key] = loading);
    }
    static unBind(key = 'default') {
        this.map[key] = null
        delete this.map[key];
    }
    static show(text = 'Loading...', timeout = -1, key = 'default') {
        this.map[key] && this.map[key].setState({ "isShow": true, "text": text, "timeout": timeout });
    }
    static dismis(key = 'default') {
        this.map[key] && this.map[key].setState({ "isShow": false });
    }
}

EasyLoading.map = {};



export class Loading extends PureComponent {

    static propTypes = {
        type: React.PropTypes.string,
        background: React.PropTypes.string,
        color: React.PropTypes.string,
        textStyle: React.PropTypes.any,
        loadingStyle: React.PropTypes.any,
        topOffset: React.PropTypes.number,
    };

    constructor(props) {
        super(props);
        let handle = 0;
        this.state = {
            isShow: false,
            timeout: -1,
            text: "Loading..."
        }
        EasyLoading.bind(this, this.props.type || 'default');
    }
    componentWillUnmount() {
        clearTimeout(this.handle);
        EasyLoading.unBind(this.props.type || 'default');
    }
    render() {
        clearTimeout(this.handle);
        (this.state.timeout != -1) && (this.handle = setTimeout(() => {
            EasyLoading.dismis(this.props.type || 'default');
        }, this.state.timeout));

        return this.state.isShow ?
            <View style={[styles.container,
                {height:SCREEN_HEIGHT - (this.props.topOffset || 0),
                    backgroundColor:this.props.background || '#E9E9EF'}]}>
                <View style={[styles.load_box, this.props.loadingStyle]}>
                    <ActivityIndicator animating={true} color={this.props.color || '#FFF'} size={'large'} style={styles.load_progress} />
                    <Text style={[styles.load_text, this.props.textStyle]}>{this.state.text}</Text>
                </View>
            </View> : null

    }
}


const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: 'absolute',
        zIndex: 999,
        justifyContent:'center',
        alignItems: 'center',
        bottom:0
    },
    load_box: {
        width: 100,
        height: 100,
        backgroundColor: '#0008',
        alignItems: 'center',
        borderRadius: 10,

    },
    load_progress: {
        position: 'absolute',
        width: 100,
        height: 90
    },
    load_text: {
        marginTop: 70,
        color: '#FFF',
    }
});