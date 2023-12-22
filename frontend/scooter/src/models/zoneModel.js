const zoneModel = {
    // Get zone fetch request
    getZones: async function getZones() {
        try {
            const response = await fetch(`http://localhost:1337/zone`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching zone:', error);
            throw error;
        }
    },
    // Get zone fetch request
    getZone: async function getZone(zoneId) {
        try {
            const response = await fetch(`/zone/${zoneId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching zone:', error);
            throw error;
        }
    },
    // Put zone fetch request
    createZone: async function createZone(zoneData) {
        try {
            const response = await fetch(`http://localhost:1337/zone`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(zoneData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating zone:', error);
            throw error;
        }
    }
};
export default zoneModel;