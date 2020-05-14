// !TODO: Data structure for links
// !TODO: Add counter for images
// !TODO: If mobile dont show big, if desktop dont show mic.

const imageCount = 10;


// нейминг функций очень важен для понимания происходящего
function getImagesWithFileName(filename = 1) {
    const arr = [];
    const sizes = ['big','med','min','mic'];
    let mobileFlag = window.mobileCheck();

    // условный оператор сам приводит все значения к boolean, так что нет надобности в прошлой проверке
    if (mobileFlag){ 
        sizes.shift();       
    } else {
        // slice, конечно, круто, но будь на моём месте кто-нибудь другой, 
        // то вряд ли бы понял, что делал следующий код
        sizes.pop();
    }

    for (let i = 0; i < sizes.length; i++) {
        arr.push({
            // кавычки для ключей объекта нужны лишь в том случае, если ключ имеет другие символы
            // например, {"my-custom-key": "value"}
            // здесь не нужно - {src: "value"}
            src: `/generator.php?size=${sizes[i]}&name=${filename}`,
        });
    }
    return arr;
}


// эту функцию по хорошему вынести в глобальную область, но поскольку здесь не ООП подход, то не стоит
function putLinksToObj(count = 10){        
    let arr = [];                           
    for (let i = 0; i < count; i++) {
        arr.push(getImagesWithFileName(i+1)); 
    }
    return arr;                             
}

// двумерный массив с ссылками
 const arrayLinks = putLinksToObj(imageCount);

// for (let i = 0; i < imageCount; i++) {
//     // поиск узлов в DOM-дереве - очень дорогая операция, чтобы её вызывать каждый раз
//     // кэшируй результат
//     // const gallery = document.getElementById(`thumbnails${i+1}`);  *не советую вообще так делать
//     // но и вешать на каждую галерею обработчик очень дорого, поэтому это нужно делегировать
//     document.getElementById(`thumbnails${i+1}`).addEventListener('click', function() {  
//         let dataId = document.getElementById(`thumbnails${i+1}`).dataset.id;
//         lightGallery(document.getElementById(`thumbnails${i+1}`), {
//             dynamic: true,
//             dynamicEl: getLinksByKey(dataId)
//         })
//     })
// }

// если обработчиков в коде становится больше 2-3, то стоит подумать о делегировании
// конечно, в ситуациях с небольшим количеством элементов, вряд ли будет заметен профит
// но представь, что у тебя таких галерей миллион
// ты будешь крутить цикл по всему миллиону элементов? чтобы было миллион функций?
// в таких ситуациях на помощь приходит делегирование
// достаточно повесить обработчик на родителя, а через event.target
// искать элемент, на который кликнули
wrapper.addEventListener('click', (event) => {
    let element = event.target; // получаем элемент, на который кликнули
    
    // поднимаемся вверх по дереву, пока element не будет равен wrapper
    while (element !== wrapper){
        // если у элемента есть такой атрибут, то это тот элемент, который нам нужен и мы останавливаем цикл
        if (element.hasAttribute("data-id")) break;
        // иначе дальше идём вверх
        element = element.parentElement;
    }

    //получаем id
    const id = element.getAttribute("data-id");

    // дальше ты всё сам делал
    lightGallery(element, {
        dynamic: true,
        dynamicEl: arrayLinks[id]
    });
})

