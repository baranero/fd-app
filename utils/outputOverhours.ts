export const outputOverhours = (array: any, mainArray: any ) => {
  
    let holder: any = {};

    array.forEach(function(d: {userId: string, amount: number}) {
      if (holder.hasOwnProperty(d.userId)) {
        
        holder[d.userId] = holder[d.userId] + d.amount;
      } else {
        holder[d.userId] = d.amount;
      }
      
    });
    
    let sumOverhours = [];
    
    for (let prop in holder) {
        
      sumOverhours.push({ userId: prop, amount: holder[prop] });
    }
    
    let mergedSumOverhours = [];
    
    for(let i=0; i<mainArray.length; i++) {
        
      mergedSumOverhours.push({
       ...mainArray[i],
       ...(sumOverhours.find((itmInner) => itmInner.userId === mainArray[i].id)),
    }
      );
    }
    return mergedSumOverhours
}

