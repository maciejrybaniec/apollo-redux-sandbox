function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(name);
        }, 2500);
    })
}

export function addUser(name) {
    return {
        type: 'ADD_USER',
        name: name
    };
};

export function receivedUsers(users) {
    return {
        type: 'RECEIVED_USERS',
        user: users
    };
};

export function createUserAndDoSomething() {
    return (dispatch) => {
        return fetchData().then((userName) => {
            dispatch(receivedUsers(['test', 'test2']))
        });
    };
}
