$(function () {

    function printBoard() {
        var light = 1;
        var columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        for (var l = 8; l >= 1; l--) {
            for (var c = 0; c < columns.length; ++c) {
                var square = columns[c]+1;
                var ligthdark = (light == 1 ? 'light': 'dark');
                $('.board').append(`<div class="square-board ${ligthdark}" id="${square}">${square}</div>`);
                light^=1;
            }
            light^=1;
        }
    }

    printBoard();

    function objSearch(obj, valor) {
        var retorno = null;

        $.each(obj, function (i, val) {
            if (val == valor) {
                return i;
            }
        });
        return retorno;
    }


    function objSearchIndex(obj, index) {
        var retorno = null;

        $.each(obj, function (i, val) {
            if (i == index) {
                return i;
            }
        });

        return retorno;
    }

});