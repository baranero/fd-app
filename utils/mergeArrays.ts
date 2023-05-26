export const mergeArr = (array: any, mainArray: any) => {
    const mergedArr: any = [];

    array.forEach((item1: any) => {
        const matchingItem = mainArray.find((item2: any) => item2.id === item1.userId)
        if (matchingItem) {
            const mergedItem = {
                ...item1,
                name: matchingItem.name,
            }
            mergedArr.push(mergedItem)
        }
    })
    return mergedArr;
}