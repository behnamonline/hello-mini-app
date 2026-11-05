export const myDB = () => {

    if (import.meta.dev) {
        return useDatabase('mainDB_local');
    }
    return useDatabase('mainDB_cf');
    
};