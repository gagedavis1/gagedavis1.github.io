/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
// Sorts all of the elements of the bubble sort array from shortest to largest and updates the swap counter.
async function bubbleSort(array){
    for(let i = 0; i < array.length -1; i++){ //runs through the array
        for(let j = array.length -1; j > 1; j--){ //inner loop does the real sorting starting at the end of the array
            if(array[j].value < array[j-1].value ){ //compares the two elements that are next to one another, so if the value is less than the value of the previous element, then it gets swapped.
                swap(array, j, j - 1); //swaps the arrays
                updateCounter(bubbleCounter); //updates the counter to keep track of the amount of swaps
                await sleep(); //stops the function from running for about half a second so that the function is easy to visualize
            }
        }
    }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){
    if(right - left < 0){ //base case that when right - left is less than zero it just returns
        return;
    }

    var index = await partition(array, left, right)
    if(left < index - 1){
        await quickSort(array, left, index - 1);
    }

    if(right > index){
        await quickSort(array, index, right);
    }
}

// TODOs 4 & 5: Implement partition
async function partition(array, left, right){
    let pivot = array[Math.floor((right + left) / 2)].value; //creates a variable called pivot which selects pivot amout by taking middle index, divides it by two, rounds by using math floor, then that is the value used as pivot.
    while(left < right){
        while(array[left].value < pivot){
            left++;
        }
        while(array[right].value > pivot){
            right--;
        }
        if(left < right){
            swap(array, left, right);
            updateCounter(quickCounter);
            await sleep();
        }
    }
    return left + 1;
}

// TODO 1: Implement swap
function swap(array, i, j){
    var og = array[i]; //stores the original value of array[i] for later use
    array[i] = array[j] //array j is stored as array i
    array[j] = og; //the orginal array i is assigned to array j
    drawSwap(array, i, j); //swaps the images visually
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}