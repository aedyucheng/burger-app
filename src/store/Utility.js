export const updateObject = (oldObjet, updatedProperties) => {
    return {
        ...oldObjet,
        ...updatedProperties
    }
}