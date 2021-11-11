$(function () {
    var initialPosition = {
        //black
        a8: 'rook-black',
        b8: 'knight-black',
        c8: 'bishop-black',
        d8: 'queen-black',
        e8: 'king-black',
        f8: 'bishop-black',
        g8: 'knight-black',
        h8: 'rook-black',

        a7: 'pawn-black',
        b7: 'pawn-black',
        c7: 'pawn-black',
        d7: 'pawn-black',
        e7: 'pawn-black',
        f7: 'pawn-black',
        g7: 'pawn-black',
        h7: 'pawn-black',


        //white
        a2: 'pawn-white',
        b2: 'pawn-white',
        c2: 'pawn-white',
        d2: 'pawn-white',
        e2: 'pawn-white',
        f2: 'pawn-white',
        g2: 'pawn-white',
        h2: 'pawn-white',

        a1: 'rook-white',
        b1: 'knight-white',
        c1: 'bishop-white',
        d1: 'queen-white',
        e1: 'king-white',
        f1: 'bishop-white',
        g1: 'knight-white',
        h1: 'rook-white'
    };

    var colunas = [];
    colunas[0] = 'a';
    colunas[1] = 'b';
    colunas[2] = 'c';
    colunas[3] = 'd';
    colunas[4] = 'e';
    colunas[5] = 'f';
    colunas[6] = 'g';
    colunas[7] = 'h';
    var mate = false;
    var moveKings = {
        white: {},
        black: {}
    }
    var movesPecaCheck = {};
    var checking = false;
    var checkingLonge = false;

    var jogador = 'white';
    var vezDo = 'white';

    var clicou = 0;
    var pecaEscolhida = '';
    var ultimaCasaEscolhida = '';

    $('body').on('click', '.piece', function () {
        var classe = $(this).attr('class');
        var casa = $(this).parent();
        var casaId = casa.attr('id');

        if (vezDo == jogador) {
            console.log(classe, jogador);
            if (classe.indexOf(jogador) >= 0) {
                clicou = 1;
                ultimaCasaEscolhida = casaId;
                pecaEscolhida = $(this);
                $('.square-board').removeClass('possible');
                $('.spanPossivel').removeClass('possible');
            }
        }
    })

    function newGame() {
        $('.square-board').each(function () {
            var square = $(this);

            var sq = square.attr('id');
            if (objSearchIndex(initialPosition, sq) != null) {
                square.html(`
                <div class="piece ${initialPosition[sq]}"></div>`);
            }
        });

    }

    function printBoard() {
        var light = 1;
        var columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        for (var l = 8; l >= 1; --l) {
            for (var c = 0; c < columns.length; ++c) {
                var sq = columns[c] + l;
                var ligthdark = (light == 1 ? 'light' : 'dark');
                $('.board').append(`
                <div class="square-board ${ligthdark}" id="${sq}">
                </div>`);
                light ^= 1;
            }
            light ^= 1;
        }
    }

    var vaiPara = '';
    $('body').on('click', '.square-board', function () {
        var temPeca = $(this).find('.piece').size();
        var idCasa = $(this).attr('id');

       var movimentosPossiveis = verifyPiece(pecaEscolhida, ultimaCasaEscolhida);

        $.each(movimentosPossiveis, function (i, sqr) {
            // $('#' + sqr).addClass('possible');
            $('#' + sqr).append('<span class="spanPossivel possible"></span>');
        })

        if (idCasa != ultimaCasaEscolhida) {
            vaiPara = idCasa;
            alert(vaiPara);
            if (objSearch(movimentosPossiveis, idCasa) != null) {
                if (mate == false) {
                    // jogar($(this));
                } else {
                    alert('checkMate');
                }
            } else {
                alert('Jogada inválida');
            }
        }
    });

    function verifyPiece(piece, square) {
        var tipo = piece.attr('class');
        var possibleMoves = {};

        if (tipo == 'piece pawn-black') {
            possibleMoves = findMovesPawn(square, 'black');
        } else if ('piece pawn-white') {
            possibleMoves = findMovesPawn(square, 'white');
        }
        return possibleMoves;
    }

    function findMovesPawn(square, tipo) {
        var line = Number(square[1]);
        var column = square[0];
        var linha = line+1;
        var moves = {};
        var x = 0;

        if (tipo == 'white') {
            if (line == 2) {
                for (var i = 0; i < 2; i++) {
                    var casa = $('#'+column+(linha++));
                    if(casa.find('.piece').size() == 0) {
                        x++;
                        moves[x] = casa.attr('id');
                    } else {
                        break;
                    }
                }
            }
        } else {
            alert('Achar movimentos para o dark')
        }

        return moves;
    }

    printBoard();
    newGame();

    function objSearch(obj, valor) {
        var retorno = null;

        $.each(obj, function (i, val) {
            if (val == valor) {
                retorno = i;
            }
        });

        return retorno;
    }


    function objSearchIndex(obj, index) {
        var retorno = null;

        $.each(obj, function (i, val) {
            if (i == index) {
                retorno = i;
            }
        });

        return retorno;
    }
});