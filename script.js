import { fabric } from 'fabric';  // Ссылка на fabric.js, может потребоваться настроить.
import 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js';

// Инициализация холста для рисования
let canvas = new fabric.Canvas('texture-canvas');

// Загрузка UV развертки изображения
fabric.Image.fromURL('uv_cube.png', function(img) {
    // Добавляем UV развертку на холст
    canvas.add(img);
});

canvas.on('object:modified', function () {
    // Создание новой текстуры из содержимого холста
    var texture = new THREE.Texture(canvas.getElement());
    texture.needsUpdate = true;

    let modelViewer = document.querySelector("#model");
    let model = modelViewer.model;

    // Применение новой текстуры ко всем материалам модели
    model.materials.forEach((material) => {
        material.map = texture;
        material.needsUpdate = true;
    });
});

