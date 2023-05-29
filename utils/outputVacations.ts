export const outputVacations = (array: any, mainArray: any, type: string) => {
  let holderArray: any = [];

  array.forEach((element: any) => {
    if (element.type === type) {
      holderArray.push(element);
    }
  });

  let holder: any = {};

  holderArray.forEach(function (d: {
    userId: string;
    amount: number;
    type: string;
  }) {
    if (holder.hasOwnProperty(d.userId)) {
      holder[d.userId] = holder[d.userId] + d.amount;
    } else {
      holder[d.userId] = d.amount;
    }
  });

  let sumVacations = [];

  for (let prop in holder) {
    sumVacations.push({ userId: prop, amount: holder[prop] });
  }

  let mergedSumVacations = [];

  for (let i = 0; i < mainArray.length; i++) {
    mergedSumVacations.push({
      ...mainArray[i],
      ...sumVacations.find((itmInner) => itmInner.userId === mainArray[i].id),
    });
  }

  return mergedSumVacations;
};
