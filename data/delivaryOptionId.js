import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
 
export const delivaryOptions=[
  {
    id : '1',
    delivaryDays : 7,
    priceCents : 0
  },
  {
    id : '2',
    delivaryDays : 3,
    priceCents : 499
  },
  {
    id : '3',
    delivaryDays : 1,
    priceCents : 999
  }
]

export function getDelivaryOption(delivaryOptionId){

  let delivaryOption;

  delivaryOptions.forEach((option) => {
    if(option.id === delivaryOptionId){
      delivaryOption = option;
    }
  });

  return delivaryOption;
}

function isWeekEnd(date){
  const dayOfWeek=date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}


export function calculateDelivaryDate(delivaryOption){
  let remainingDays=delivaryOption.delivaryDays;
  let deliveryDate=dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isWeekEnd(deliveryDate)) {
      remainingDays--;
      // This is a shortcut for:
      // remainingDays = remainingDays - 1;
    }
  }

  const dateString = deliveryDate.format(
    'dddd, MMMM D');
  
  return dateString;
}
