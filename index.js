const keyMode = {
  keyEn: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→', 'En'],
  keyEnShift: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→', 'EN'],
  keyRu: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→', 'Ру'],
  keyRuShift: ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→', 'РУ'],
};

const getKeyboardWrapper = () => {
  let main = document.createElement('div');
  let input = document.createElement('textarea');
  let keyboard = document.createElement('div');

  main.classList.add('keyboard-wrapper');
  input.classList.add('keyboard-input');
  keyboard.classList.add('keyboard');

  document.body.append(main);
  main.append(input);
  main.append(keyboard);
};

const createKeys = (x) => {
  let keyboard = document.querySelector('.keyboard');

  x.forEach((element) => {
    let keyboardKey = document.createElement('button');
    keyboardKey.innerText = `${element}`;

    if (element.length > 3) {
      keyboardKey.classList.add('keyboard-key');
      keyboardKey.classList.add('keyboard-key__wide');
    } else if (element === ' ') {
      keyboardKey.classList.add('keyboard-key');
      keyboardKey.classList.add('keyboard-key__extra-wide');
    } else {
      keyboardKey.classList.add('keyboard-key');
    }
    keyboard.append(keyboardKey);
  });
  selectedKey();
};

const selectedKey = () => {
  let keyboard = document.querySelectorAll('.keyboard-key');
  let input = document.querySelector('.keyboard-input');
  input.focus();

  function inputKey(key) {
    if (key == 'Backspace') {
      input.value.length = (input.value.length - 1);
    } else if (key == 'Enter') {
      input.value += '/n';
    } else if (key == 'Shift') {
      pressShift();

      // document.querySelector('.keyboard').innerHTML = ' ';
      // createKeys(keyMode.keyEnShift); // через if выбрать какой язак и на него shift/caps
    } else if (key == 'CapsLock') {
      pressShift();
    } else {
      input.value += key;
    }
  }

  function pressShift() {
    let langKeyboard = document.querySelectorAll('.keyboard-key')[64].innerText;

    if (langKeyboard == 'En') {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyEnShift);
    } else if (langKeyboard == 'EN') {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyEn);
    } else if (langKeyboard == 'Ru') {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyRuShift);
    } else if (langKeyboard == 'RU') {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyRu);
    }
  }

  keyboard.forEach((el) => {


    el.onmousedown = function (event) {
      el.classList.add('keyboard-key__active');
      inputKey(el.innerText);
    }
    el.onmouseleave = function (event) {
      el.classList.remove('keyboard-key__active');
    }
    el.onmouseup = function(event) {
      el.classList.remove('keyboard-key__active');
    }

  });
};










window.onload = function () {
  console.log('hello');
  getKeyboardWrapper();
  createKeys(keyMode.keyEn);
};
