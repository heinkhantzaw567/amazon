export function formatCurrency(price)
{
    return (price/100).toFixed(2);
}

export function adddate(today,number)
{
    return today.add(number, 'days');
}

export function formatdate(date)
{
    return date.format('dddd, MMMM D');
}