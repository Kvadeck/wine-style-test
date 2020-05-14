// !TODO: Data structure for links
// !TODO: Add counter for images
// !TODO: If mobile dont show big, if desktop dont show mic.

const imageCount = 10;

function getArrWithFileName(filename = 1) { // getImagesWithFilename
    const arr = [];
    const sizes = ['big','med','min','mic'];
    let mobileFlag = window.mobileCheck();

    if(mobileFlag === true){ // if (mobileFlag) 
        sizes.shift();       
    } else {
        sizes.splice(-1,1); // sizes.pop()
    }

    for (let i = 0; i < sizes.length; i++) {
        arr.push({
            "src": `/generator.php?size=${sizes[i]}&name=${filename}`,
        });
    }
    return arr;
}

function putLinksToObj(count = 10){         // getArrayLinks
    let obj = {};                           // const arr = [];
    for (let i = 0; i < count; i++) {
        obj[i+1] = getArrWithFileName(i+1); // arr.push(getImagesWithFilename(i+1))
    }
    return obj;                             // return arr
}

function getLinksByKey(id = 1) {
    let allObj = putLinksToObj(imageCount); // каждый раз создаешь эти объекты вместо того, 
    return allObj[id];                      // чтобы один раз создать и оттуда доставать
}

// const arrayLinks = putLinksToObj(imageCount);

for (let i = 0; i < imageCount; i++) {
    // поиск узлов в DOM-дереве - очень дорогая операция, чтобы её вызывать каждый раз
    // кэшируй результат
    // const gallery = document.getElementById(`thumbnails${i+1}`);  *не советую вообще так делать
    // но и вешать на каждую галерею обработчик очень дорого, поэтому это нужно делегировать
    document.getElementById(`thumbnails${i+1}`).addEventListener('click', function() {  
        let dataId = document.getElementById(`thumbnails${i+1}`).dataset.id;
        lightGallery(document.getElementById(`thumbnails${i+1}`), {
            dynamic: true,
            dynamicEl: getLinksByKey(dataId)
        })
    })
}


