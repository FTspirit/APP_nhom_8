const getData_Uid = async (u_id : string) => {
        await firebase
            .app()
            .database('https://test-login-8c7d4-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/uses/${u_id}`)
            .once('value', snapshot => {
                const d = JSON.stringify(snapshot.val());
                setUsers({ ...users,
                            id: u_id,
                        });
                console.log('User data: ', snapshot.val());
            });
    };
export {getData_Uid}