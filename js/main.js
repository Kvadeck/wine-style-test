// !TODO: Data structure for links
// !TODO: Add counter for images
// !TODO: If mobile dont show big, if desktop dont show mic.

const imageCount = 10;

function getArrWithFileName(filename = 1) {
    const arr = [];
    const sizes = ['big','med','min','mic'];
    let mobileFlag = window.mobileCheck();

    if(mobileFlag === true){
        sizes.shift();
    } else {
        sizes.splice(-1,1);
    }

    for (let i = 0; i < sizes.length; i++) {
        arr.push({
            "src": `/generator.php?size=${sizes[i]}&name=${filename}`,
        });
    }
    return arr;
}

function putLinksToObj(count = 10){
    let obj = {};
    for (let i = 0; i < count; i++) {
        obj[i+1] = getArrWithFileName(i+1);
    }
    return obj;
}

function getLinksByKey(id = 1) {
    let allObj = putLinksToObj(imageCount);
    return allObj[id];
}

for (let i = 0; i < imageCount; i++) {
    document.getElementById(`thumbnails${i+1}`).addEventListener('click', function() {
        let dataId = document.getElementById(`thumbnails${i+1}`).dataset.id;
        lightGallery(document.getElementById(`thumbnails${i+1}`), {
            dynamic: true,
            dynamicEl: getLinksByKey(dataId)
        })
    })
}
