export function formatCurrency(price)
{
    if(price <0)
    {
        price *=-1
    }
    return (Math.round(price)/100).toFixed(2);
}

export function adddate(today,number)
{
    return today.add(number, 'days');
}

export function formatdate(date)
{
    return date.format('dddd, MMMM D');
}
export function skipweekend(date,today)
{
    let hein=0;
    let i =1
    
    while 

    (date >0)
    {
        
        if(!isWeekend(today.add(i,'day').format("dddd")))
        {
            hein +=1;
            date -=1;
        }
        i++
    }
    return hein;
}
function isWeekend(hello)
{
  if ( hello === "Saturday" || hello === "Sunday")
    return true
  
  return false 
}
