const userToBikeModel = {
    getAll: async function () {
        try {
          const response = await fetch('http://localhost:1337/userToBike');
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching all user-to-bike relationships:', error);
        }
    },

    create: async function (usertoBike) {
        try {
            console.log(usertoBike);
            const response = await fetch('http://localhost:1337/userToBike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_userid: usertoBike.user_userid,
                    scooterId: usertoBike.scooterId,
                    startTime: usertoBike.startTime,
                    stopTime: usertoBike.stopTime,
                    price: usertoBike.price,
                }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    delete: async function (idUsertobike) {
        try {
            const response = await fetch(`http://localhost:1337/userToBike/${idUsertobike}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                return { error: 'Internal Server Error' };
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return { error: 'Internal Server Error' };
        }
    },

}

export default userToBikeModel;