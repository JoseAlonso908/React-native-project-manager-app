import React, { Component } from 'react';

export default class GlobalValue extends Component {
    setvalue(key,jsonValue) {
        AsyncStorage.setItem(key, JSON.stringify(UID123_object), () => {
            AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
                AsyncStorage.getItem('UID123', (err, result) => {
                    console.log(result);
                });
            });
        });

    }

}
