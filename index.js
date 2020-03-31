const keyMode = {
  keyEn: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→', 'En'],
  keyEnShift: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→', 'EN'],
  keyRu: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→', 'Ру'],
  keyRuShift: ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→', 'РУ'],
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

const lang = () => {
  let x = String;
  const localLang = localStorage.localLang;
  console.log(localLang);
  
  switch (localLang) {
    case 'En':
      x = keyMode.keyEn;
      break;
    case 'Ру':
      x = keyMode.keyRu;
      break;
    case 'EN':
      x = keyMode.keyEnShift;
      break;
    case 'РУ':
      x = keyMode.keyRuShift;
      break;
    default:
      x = keyMode.keyRu;
      break;
  }
  
  createKeys(x);
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

  function inputKey(key) {
    if (key === 'Backspace') {
      input.value = input.value.substring(0, input.value.length - 1);
    } else if (key === 'Del') {
      input.value = input.value.substring(0, input.value.length - 1);
    } else if (key === 'Enter') {
      input.value += '\n';
    } else if (key === ' ') {
      input.value += ' ';
    } else if (key === 'Tab') {
      input.value += '    ';
    } else if (key === 'CapsLock') {
      pressShift();
    } else if (key.length === 1) {
      input.value += key;
    }
  }

  function pressShift() {
    const langKeyboard = document.querySelectorAll('.keyboard-key')[64].innerText;
    if (langKeyboard === 'En') {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyEnShift);
    } else if (langKeyboard === 'EN') {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyEn);
    } else if (langKeyboard === 'Ру') {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyRuShift);
    } else if (langKeyboard === 'РУ') {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyRu);
    }
  }

  keyboard.forEach((el) => {
    el.onmousedown = function (event) {
      el.classList.add('keyboard-key__active');
      if (el.innerText === 'Shift') {
        pressShift();
      }
    }
    el.onmouseleave = function (event) {
      el.classList.remove('keyboard-key__active');
      // if (el.innerText === 'Shift') {
      //   pressShift();
      // }
    }
    el.onmouseup = function(event) {
      if (el.innerText === 'Shift') {
        pressShift();
      }
      el.classList.remove('keyboard-key__active');
      inputKey(el.innerText);
    }
  });
};

const pressKey = () => {
  let keyboard = document.querySelectorAll('.keyboard-key');
  let input = document.querySelector('.keyboard-input');

  function pressShift() {
    const langKeyboard = document.querySelectorAll('.keyboard-key')[64].innerText;
    if (langKeyboard === 'En') {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyEnShift);
    } else if (langKeyboard === 'EN') {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyEn);
    } else if (langKeyboard === 'Ру') {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyRuShift);
    } else if (langKeyboard === 'РУ') {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyRu);
    }
  }

  document.addEventListener('keydown', (el) => {
    el.preventDefault();
    console.log(el.key);
    const langKeyboard = document.querySelectorAll('.keyboard-key')[64].innerText.toLowerCase();
    function activeKey() {
      keyboard.forEach((vir) => {
        if (el.altKey && vir.innerText === 'Alt') {
          vir.classList.add('keyboard-key__active');
        } else if (el.ctrlKey && vir.innerText === 'Ctrl') {
          vir.classList.add('keyboard-key__active');
        } else if (el.shiftKey && vir.innerText === 'Shift') {
          vir.classList.add('keyboard-key__active');
        } else if (el.metaKey && vir.innerText === 'Win') {
          vir.classList.add('keyboard-key__active');
        } else if (el.key === 'Delete' && vir.innerText === 'Del') {
          vir.classList.add('keyboard-key__active');
        } else if (el.key === 'ArrowUp' && vir.innerText === '↑') {
          vir.classList.add('keyboard-key__active');
        } else if (el.key === 'ArrowDown' && vir.innerText === '↓') {
          vir.classList.add('keyboard-key__active');
        } else if (el.key === 'ArrowLeft' && vir.innerText === '←') {
          vir.classList.add('keyboard-key__active');
        } else if (el.key === 'ArrowRight' && vir.innerText === '→') {
          vir.classList.add('keyboard-key__active');
        } else if (el.key === ' ' && vir.innerText === '') {
          vir.classList.add('keyboard-key__active');
        } else if (el.key === vir.innerText) {
          vir.classList.add('keyboard-key__active');
        }
      });
    }

    if (el.key.length === 1) {
      activeKey();
      input.value += el.key;
    } else if (el.key === 'Backspace') {
      activeKey();
      input.value = input.value.substring(0, input.value.length - 1);
    } else if (el.key === 'Delete') {
      activeKey();
      input.value = input.value.substring(0, input.value.length - 1);
    } else if (el.key === 'Enter') {
      activeKey();
      input.value += '\n';
    } else if (el.key === 'Tab') {
      activeKey();
      input.value += '    ';
    } else if (el.key === 'CapsLock') {
      activeKey();
      pressShift();
      keyboard = document.querySelectorAll('.keyboard-key');
    } else if (el.key === 'Shift') {
      activeKey();
      pressShift();
      keyboard = document.querySelectorAll('.keyboard-key');
    } else if (el.key === 'ArrowUp') {
      input.value += '↑';
      activeKey();
    } else if (el.key === 'ArrowDown') {
      activeKey();
      input.value += '↓';
    } else if (el.key === 'ArrowLeft') {
      activeKey();
      input.value += '←';
    } else if (el.key === 'ArrowRight') {
      activeKey();
      input.value += '→';
    } else if (el.altKey && el.ctrlKey && el.shiftKey && (langKeyboard === 'ру')) {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyEn);
      localStorage.setItem('localLang', document.querySelectorAll('.keyboard-key')[64].innerText);
    } else if (el.altKey && el.ctrlKey && el.shiftKey && (langKeyboard === 'en')) {
      document.querySelector('.keyboard').innerHTML = ' ';
      createKeys(keyMode.keyRu);
      localStorage.setItem('localLang', document.querySelectorAll('.keyboard-key')[64].innerText);
    } else if (el.altKey || el.ctrlKey || el.shiftKey || el.metaKey) {
      activeKey();
    }
  });

  document.addEventListener('keyup', (el) => {
    keyboard.forEach((vir) => {
      if (vir.classList.contains('keyboard-key__active')) {
        vir.classList.remove('keyboard-key__active');
      }
    });

    if (el.key === 'Shift') {
      pressShift();
      keyboard = document.querySelectorAll('.keyboard-key');
    }
  });

  localStorage.setItem('localLang', document.querySelectorAll('.keyboard-key')[64].innerText);
  console.log(localStorage.setItem('localLang', document.querySelectorAll('.keyboard-key')[64].innerText));
};

window.onload = function () {
  console.log('hello');
  getKeyboardWrapper();
  lang();
  pressKey();
};
