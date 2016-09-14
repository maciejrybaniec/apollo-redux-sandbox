export const receivedUsers = (users: Array<Object>) => {
    return {
        type: 'RECEIVED_USERS',
        users: users
    }
}

export const receivedNetworks = (networks: Array<Object>) => {
    return {
        type: 'RECEIVED_NETWORKS',
        networks: networks
    }
}
