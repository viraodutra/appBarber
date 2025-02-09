import React, { useEffect, useContext } from 'react';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/core';

import BarberLogo from '../../assets/barber.svg'
import Api from '../../Api';
import { UserContext } from '../../contexts/UserContext';

export default () => {

    const navigation = useNavigation();
    const  { dispatch: userDispatch } = useContext (UserContext);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');

            if(token){
                let res = await Api.checkToken(token);

                if(res.token){
                    await AsyncStorage.setItem('token', res.token)

                    userDispatch({
                        type: 'setAvatar',
                        payload: {
                            avatar: res.data.avatar
                        }
                    });

                    navigation.reset({
                        routes: [{name: 'MainTab'}]
                    });
                } else {

                }
            } else {
                navigation.navigate('SignIn');
            }
        }

        checkToken();
    }, []);

    return(
        <Container>
            <BarberLogo
                width="100%" height="150"
            ></BarberLogo>
            <LoadingIcon
                size="large" color="#FFFFFF"
            ></LoadingIcon>
        </Container>
    );
}