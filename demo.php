<!-- !TODO: Make a loop for html pieces -->
<!-- TODO: Add preloader when photo is loading -->
<!-- TODO: Add hover thumbnail animation -->

<!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <title>Тестовое задание WineStyle</title>
    <meta name="description" content="Тестовое задание WineStyle">
    <meta name="author" content="Volzhenin Nikolay">
    <link rel="stylesheet" href="css/grid.min.css">
    <link rel="stylesheet" href="css/lightgallery.min.css">
    <link rel="stylesheet" href="css/styles.css?v=1.0">
</head>
<body>
<div class="container round-medium blue mt-3">
    <h1>Тестовое задание WineStyle</h1>
</div>
<div class="container">
    <div id="photos-wrap" class="row">
    </div>
</div>
<script>
    const wrapper = document.getElementById("photos-wrap");
    let myHTML = '';
    for (let i = 0; i < 10; i++) {
        myHTML += `<div id='thumbnails${i+1}' data-id="${i+1}" class="thumbnails col-12 col-sm-6 col-md-6 col-lg-4 my-3 d-flex justify-content-center">
                      <picture class="photo round-small">
                            <source media="(max-width: 575px)" srcset="/generator.php?size=mic&name=${i+1}">
                            <img src="/generator.php?size=min&name=${i+1}" alt=\'mountains\'>
                      </picture>
                    </div>`;
    }
    wrapper.innerHTML = myHTML
</script>

<script src="js/lightgallery.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
