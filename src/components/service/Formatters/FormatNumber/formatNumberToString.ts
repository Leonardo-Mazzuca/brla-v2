



export const formatNumberToString = (number: number, currency: string) => {

    return new Intl.NumberFormat('en-IN', 
    { style: 'currency', currency: currency })
    .format(number);

}