export const apiStorage = {
    getItem: async (key) => {
        try {
            const res = await fetch('http://localhost:8090/state');

            if (!res.ok) {
                throw new Error('Could not fetch');
            }

            const data = await res.json();

            return JSON.stringify(data);
        } catch (e) {
            console.log(e);
        }
    },
    setItem: async (key, item) => {
        try {
            const res = await fetch('http://localhost:8090/state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: item
            });

            if (!res.ok) {
                throw new Error('Could not fetch');
            }

            const data = await res.json();

            return JSON.stringify(data);
        } catch (e) {
            console.log(e);
        }
    }
}