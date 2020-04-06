const keyMode = {
  keyEn: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→', 'En'],
  keyEnShift: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→', 'EN'],
  keyRu: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→', 'Ру'],
  keyRuShift: ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→', 'РУ'],
};

const getKeyboardWrapper = () => {
  const main = document.createElement('div');
  const input = document.createElement('textarea');
  const keyboard = document.createElement('div');

  main.classList.add('keyboard-wrapper');
  input.classList.add('keyboard-input');
  keyboard.classList.add('keyboard');

  document.body.append(main);
  main.append(input);
  main.append(keyboard);
};

const createKeys = (x) => {
  const keyboard = document.querySelector('.keyboard');

  x.forEach((element) => {
    const keyboardKeyCreate = document.createElement('button');
    keyboardKeyCreate.innerText = `${element}`;

    if (element.length > 3) {
      keyboardKeyCreate.classList.add('keyboard-key');
      keyboardKeyCreate.classList.add('keyboard-key__wide');
    } else if (element === ' ') {
      keyboardKeyCreate.classList.add('keyboard-key');
      keyboardKeyCreate.classList.add('keyboard-key__extra-wide');
    } else {
      keyboardKeyCreate.classList.add('keyboard-key');
    }
    keyboard.append(keyboardKeyCreate);
  });
};

const selectedKey = () => {
  const keyboardKey = document.querySelectorAll('.keyboard-key');
  const input = document.querySelector('.keyboard-input');
  function pressShift() {
    const langKeyboard = document.querySelectorAll('.keyboard-key')[64].innerText;
    switch (langKeyboard) {
      case 'En':
        document.querySelector('.keyboard').innerHTML = ' ';
        createKeys(keyMode.keyEnShift);
        break;
      case 'EN':
        document.querySelector('.keyboard').innerHTML = ' ';
        createKeys(keyMode.keyEn);
        break;
      case 'Ру':
        document.querySelector('.keyboard').innerHTML = ' ';
        createKeys(keyMode.keyRuShift);
        break;
      case 'РУ':
        document.querySelector('.keyboard').innerHTML = ' ';
        createKeys(keyMode.keyRu);
        break;
      default:
        break;
    }
    selectedKey();
  }
  function inputKey(key) {
    if (key.length === 1) {
      input.value += key;
    }
    switch (key) {
      case 'Backspace':
        input.value = input.value.substring(0, input.value.length - 1);
        break;
      case 'Del':
        input.value = input.value.substring(0, input.value.length - 1);
        break;
      case 'Enter':
        input.value += '\n';
        break;
      case '':
        input.value += ' ';
        break;
      case 'Tab':
        input.value += '    ';
        break;
      // case 'CapsLock':
      //   pressShift();
      //   selectedKey();
      //   break;
      default:
        break;
    }
  }
  keyboardKey.forEach((el) => {
    el.addEventListener('mousedown', () => {
      el.classList.add('keyboard-key__active');
      if (el.innerText === 'Shift') {
        pressShift();
      }
    });
    el.addEventListener('mouseleave', () => {
      el.classList.remove('keyboard-key__active');
    });
    el.addEventListener('mouseup', () => {
      if (el.innerText === 'Shift') {
        pressShift();
      } else if (el.innerText === 'CapsLock') {
        pressShift();
      }
      el.classList.remove('keyboard-key__active');
      inputKey(el.innerText);
    });
  });
};

const pressKey = () => {
  let keyboardKey = document.querySelectorAll('.keyboard-key');
  const input = document.querySelector('.keyboard-input');
  const pressShift = () => {
    const langKeyboard = document.querySelectorAll('.keyboard-key')[64].innerText;
    switch (langKeyboard) {
      case 'En':
        document.querySelector('.keyboard').innerHTML = ' ';
        createKeys(keyMode.keyEnShift);
        break;
      case 'EN':
        document.querySelector('.keyboard').innerHTML = ' ';
        createKeys(keyMode.keyEn);
        break;
      case 'Ру':
        document.querySelector('.keyboard').innerHTML = ' ';
        createKeys(keyMode.keyRuShift);
        break;
      case 'РУ':
        document.querySelector('.keyboard').innerHTML = ' ';
        createKeys(keyMode.keyRu);
        break;
      default:
        break;
    }
    selectedKey();
  };
  document.addEventListener('keydown', (el) => {
    el.preventDefault();
    keyboardKey = document.querySelectorAll('.keyboard-key');
    const langKeyboard = document.querySelectorAll('.keyboard-key')[64].innerText.toLowerCase();
    function activeKey() {
      keyboardKey.forEach((vir) => {
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
      keyboardKey = document.querySelectorAll('.keyboard-key');
    } else if (el.key === 'Shift') {
      activeKey();
      pressShift();
      keyboardKey = document.querySelectorAll('.keyboard-key');
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
    keyboardKey.forEach((vir) => {
      if (vir.classList.contains('keyboard-key__active')) {
        vir.classList.remove('keyboard-key__active');
      }
    });
    if (el.key === 'Shift') {
      pressShift();
    }
  });
};

const lang = () => {
  let x = String;
  const localPersonalLang = localStorage.localLang;
  switch (localPersonalLang) {
    case 'En':
      x = keyMode.keyEn;
      break;
    case 'Ру':
      x = keyMode.keyRu;
      break;
    default:
      x = keyMode.keyRu;
      break;
  }
  createKeys(x);
};

window.onload = function load() {
  getKeyboardWrapper();
  lang();
  pressKey();
  selectedKey();
};
