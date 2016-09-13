export const receivedUsers = (users: Array<Object>) => {
    return {
        type: 'RECEIVED_USERS',
        users: users
    }
}
