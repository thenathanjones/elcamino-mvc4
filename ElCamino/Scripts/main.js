$(function () {
    tileImages();

    hookupHeroSelector();

    expandTextAreas();

    hookupRoutes();
})

function tileImages() {
    var $container = $('#photos');

    $container.imagesLoaded(function () {
        $container.masonry({
            itemSelector: '.photo',
            columnWidth: 280
        });
    });
}

function expandTextAreas() {
    $('.expanding').autosize({ append: "\n" });
    setTimeout(function () { $('.expanding').addClass('expanding-anim'); }, 100);
}

function hookupRoutes() {
    $('.route').click(function () {
        window.location.href = $(this).find('a').attr('href');
    });
}

function hookupHeroSelector() {
    $('#photos').find('.hero').on('click', function (e) {
        var hero = $(this);
        var heroId = hero.data('id');

        var endpoint = location.href.replace('edit', 'update_hero_photo');

        var heroChanged = function () {
            $('.hero').removeClass('selected');
            hero.addClass('selected');
        };

        var heroChangeFailed = function () {
            alert('Oh snap! Setting hero failed');
        };

        $.ajax({ url: endpoint, data: { photo_id: heroId }, type: 'PUT' })
          .done(heroChanged).fail(heroChangeFailed);

        e.preventDefault();
    });
}