import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { ListItem } from 'react-native-elements';
import api from './api';
import { useAppContext } from '../global/AppContext';

const RecentTransactions = () => {
    const { userID } = useAppContext();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
          fetchTransactions();
        }, [userID])
    );

    const fetchTransactions = async () => {
        try {
            if (!userID) return;
            const response = await api.get(`/transactions?userID=${userID}`);
            setTransactions(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const renderTransaction = ({ item }) => (
        <ListItem bottomDivider topDivider>
            <ListItem.Content>
                <ListItem.Title>{`${new Date(item.transactionDate).toString()}`}</ListItem.Title>
                {userID === item.idPayer ?
                (
                    <ListItem.Subtitle>{`You transferred $${item.amount} to ${item.Payee}`}</ListItem.Subtitle>
                ) : (
                    <ListItem.Subtitle>{`You received $${item.amount} from ${item.Payer}`}</ListItem.Subtitle>
                )
                }
            </ListItem.Content>
        </ListItem>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <FlatList
            data={transactions.slice().reverse()}
            keyExtractor={item => item.ID.toString()}
            renderItem={renderTransaction}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
        />
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RecentTransactions;