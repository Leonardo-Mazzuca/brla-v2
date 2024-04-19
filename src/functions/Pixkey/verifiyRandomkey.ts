



export const isRandomKey = (value : string) => {

    return value.replace(' ','').replace(/-/g, '').length === 32;

}