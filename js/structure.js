$(document).ready(function () {
    var textElement = $('#text');
    var transformElement = $('#transform');
    var words = ['pueblo', 'pequeño', 'habitantes', 'grande', 'romantico',
        'romantica', 'historia', 'castillo', 'turístico', 'vampiros',
        'vampiro', 'perros', 'perro', 'gótico', 'restauración', 'dips',
        'vampíricos', 'bonito', 'feo', 'distancia', 'torre', 'años', 'prisión',
        'calles', 'pequeñas', 'divertido', 'grande', 'abandonado', 'acogedor',
        'agradable', 'aislado', 'ancho', 'antiguo', 'apacible', 'árido', 'bonito', 'bullicioso',
        'cálido', 'caótico', 'caudaloso', 'contaminado', 'costero', 'despejado', 'despoblado', 'elevado',
        'encantador', 'escarpado', 'estrecho', 'evocador', 'famoso', 'fascinante', 'fértil', 'frío', 'llano',
        'moderno', 'montañoso', 'oscuro', 'peligroso', 'pintoresco', 'plácido', 'poblado', 'remoto',
        'rural', 'seco', 'seguro', 'silencioso', 'sucio', 'tranquilo', 'urbano', 'ácido', 'enfadado',
        'dormido', 'despierto', 'malo', 'precioso', 'agrío', 'brillante', 'barato', 'limpio',
        'claro', 'freco', 'cruel', 'profundo', 'falso', 'monumento', 'monumentos',
        'localidad', 'simbolo', 'restaurante', 'horno', 'excursiones', 'excursion', 'artesanal', 'monta'];


    transformElement.on('click', function () {
        var body = $("html, body");
        body.stop().animate({scrollTop: 0}, 500);
        var struturedData = getStructuredData();
        buildStructuredData(struturedData);
    });

    function buildStructuredData(struturedData) {
        textElement.toggle();
        var wordsToShow = getWordsToShow(struturedData);
        $.each(wordsToShow, function (index, element) {
            $('#word-div').append('<div class="element"><div class="bar" style="height: calc(20px * ' + element.value + '); background-color: ' + element.color + '"></div><p class="word">' + element.name + ' (' + element.value + ')</p></div>')
        })
        transformElement.toggle();
        $('#info').css('border-bottom', '1px solid black');
        textElement.insertAfter("#info");
        textElement.toggle();

    }

    function getWordsToShow(structuredData) {
        var wordsToShow = [];
        var index = 0;
        Object.keys(structuredData).forEach(function (key) {
            if (structuredData[key] > 1) {
                wordsToShow[index] = {'name': key, 'value': structuredData[key], 'color': getColor(structuredData[key])}
                index++;
            }
        });
        return wordsToShow;
    }

    function getColor(value) {
        var color = "";
        if (value <= 3) {
            color = "#beccff"
        } else if (value > 3 && value <= 7) {
            color = "#93fff3"
        } else {
            color = "#70ff86"
        }
        return color;
    }

    function getStructuredData() {
        var finalText = processText(textElement.text());
        var wordsFromText = finalText.split(" ");
        var data = [];
        $.each(wordsFromText, function (index, wordFromText) {
            $.each(words, function (index, wordToFind) {
                if (wordFromText === wordToFind) {
                    if (data[wordToFind] == null) {
                        data[wordToFind] = 1
                    } else {
                        data[wordToFind] = data[wordToFind] + 1
                    }
                }
            })
        });
        return data;
    }

    function processText(text) {
        text = text.toLowerCase();
        text = text.trim();
        return text;
    }
});