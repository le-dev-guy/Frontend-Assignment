const generateRandomMinutes = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const addMinutes = (date, minutes = 1) => {
    return new Date(date.getTime() + minutes*60000);
}
const generateFutureTimeForTest = (min, max) => {
    let randMinutes = generateRandomMinutes(min, max);
    let futureDate = addMinutes(new Date(), randMinutes).toString();
    return futureDate;
}

export const dummyData = [
  {
    price: 49002.53118185497,
    time: '2022-11-12 09:07:09',
    valid_till: generateFutureTimeForTest(0,3),
  },
  {
    price: 50760.99955989577,
    time: '2022-11-12 09:07:20',
    valid_till: generateFutureTimeForTest(0,3),
  },
  {
    price: 47592.970340351894,
    time: '2022-11-12 09:07:26',
    valid_till: generateFutureTimeForTest(0,3),
  },
  {
    price: 47619.44765973462,
    time: '2022-11-12 09:07:31',
    valid_till: generateFutureTimeForTest(0,3),
  },
  {
    price: 49218.08142429656,
    time: '2022-11-12 09:07:38',
    valid_till: generateFutureTimeForTest(0,3),
  },
];