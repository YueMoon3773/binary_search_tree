const arrayHandler = () => {
    const isValueInArray = (arr, value) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                return true;
            }
        }
        return false;
    };

    const prepareArray = (arr) => {
        //sort the inp arr
        const sortedArr = arr.sort((a, b) => a - b);
        // console.log({ sortedArr });

        let retArr = [];
        // remove duplicated items
        sortedArr.forEach((item) => {
            if (!retArr.includes(item)) {
                retArr.push(item);
            }
        });

        return retArr;
    };

    const createArray = (size) => {
        let retArr = [];

        while (retArr.length < size) {
            let val = Math.floor(Math.random() * 100);

            if (!isValueInArray(retArr, val)) {
                retArr.push(val);
            }
        }

        return retArr;
    };

    return {
        prepareArray,
        createArray,
    };
};

module.exports = arrayHandler;
