import createHTMLIcon from './utils/createIcon';

export default class Keyboard {
  elements = {
    main: null,
    keysContainer: null,
    keys: [],
    textArea: null,
  }

  eventHandlers = {
    oninput: null,
    onclose: null,
  }

  properties = {
    opened: false,
    value: '',
    capsLock: false,
    shift: false,
    lang: false,
    mute: false,
    voiceRecord: false,
  }

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard', 'keyboard_hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.querySelector('body').appendChild(this.elements.main);

    const keyboardBtn = document.querySelector('.keyboard__button');
    keyboardBtn.addEventListener('click', () => {
      if (!this.properties.opened) {
        this.open(this.value, (currentValue) => {
          const el = this;
          el.value = currentValue;
        });
      }
    });

    this.elements.textArea = document.querySelector('.search__input');
  }

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keysLayout = [['`', 'ё'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], 'backspace',
      ['q', 'й'], ['w', 'ц'], ['e', 'у'], ['r', 'к'], ['t', 'е'], ['y', 'н'], ['u', 'г'], ['i', 'ш'], ['o', 'щ'], ['p', 'з'], ['[', 'х'], [']', 'ъ'],
      'capsLock', ['a', 'ф'], ['s', 'ы'], ['d', 'в'], ['f', 'а'], ['g', 'п'], ['h', 'р'], ['j', 'о'], ['k', 'л'], ['l', 'д'], [':', 'ж'], [';', 'э'], 'enter',
      'shift', ['z', 'я'], ['x', 'ч'], ['c', 'с'], ['v', 'м'], ['b', 'и'], ['n', 'т'], ['m', 'ь'], [',', 'б'], ['.', 'ю'], ['?', "'"], 'mute',
      'done', ['en', 'ru'], 'space', 'left-arrow', 'rigth-arrow', ['\\', '<'], ['/', '>']];

    keysLayout.forEach((key) => {
      if (Array.isArray(key)) {
        key.forEach((item) => {
          const keyElement = document.createElement('button');
          const insertLineBreak = [']'].indexOf(item[0]) !== -1;

          keyElement.setAttribute('type', 'button');
          keyElement.classList.add('keyboard__key');

          if (/[-0-9=/\\]/.test(item)) {
            keyElement.classList.add('withoutShift', 'sys');
            keyElement.textContent = item;

            keyElement.addEventListener('click', () => {
              this.elements.textArea.setRangeText(keyElement.textContent, this.elements.textArea.selectionStart, this.elements.textArea.selectionEnd, 'end');
              this.properties.value = this.elements.textArea.value;
              this.triggerEvent('oninput');
            });
          } else if (/['?]/.test(item)) {
            keyElement.textContent = item;
            keyElement.classList.add('sys');

            keyElement.addEventListener('click', () => {
              this.elements.textArea.setRangeText(keyElement.textContent, this.elements.textArea.selectionStart, this.elements.textArea.selectionEnd, 'end');
              this.properties.value = this.elements.textArea.value;
              this.triggerEvent('oninput');
            });
          } else if (/[!@#$%^&*()_<>+]/.test(item)) {
            keyElement.classList.add('withShift', 'sys');
            keyElement.textContent = item;

            keyElement.addEventListener('click', () => {
              this.elements.textArea.setRangeText(keyElement.textContent, this.elements.textArea.selectionStart, this.elements.textArea.selectionEnd, 'end');
              this.properties.value = this.elements.textArea.value;
              this.triggerEvent('oninput');
            });
          } else if (/[а-яёА-ЯЁ]/.test(item)) {
            keyElement.classList.add('keyboard__key_hidden', 'ru');
            keyElement.textContent = item.toLowerCase();

            keyElement.addEventListener('click', () => {
              if (this.properties.capsLock) {
                this.elements.textArea.setRangeText(keyElement.textContent.toUpperCase(), this.elements.textArea.selectionStart, this.elements.textArea.selectionEnd, 'end');
              } else if (!this.properties.capsLock) {
                this.elements.textArea.setRangeText(keyElement.textContent.toLowerCase(), this.elements.textArea.selectionStart, this.elements.textArea.selectionEnd, 'end');
              }
              this.properties.value = this.elements.textArea.value;
              this.triggerEvent('oninput');
            });
          } else if (item === 'ru') {
            keyElement.innerHTML = 'ru';
            keyElement.classList.add('keyboard__key_hidden', 'ru');

            keyElement.addEventListener('click', () => {
              this.changeLang();
            });
          } else if (item === 'en') {
            keyElement.innerHTML = 'en';
            keyElement.classList.add('en');

            keyElement.addEventListener('click', () => {
              this.changeLang();
            });
          } else {
            keyElement.classList.add('en');
            keyElement.textContent = item.toLowerCase();
            keyElement.addEventListener('click', () => {
              if (this.properties.capsLock) {
                this.elements.textArea.setRangeText(keyElement.textContent.toUpperCase(), this.elements.textArea.selectionStart, this.elements.textArea.selectionEnd, 'end');
              } else if (!this.properties.capsLock) {
                this.elements.textArea.setRangeText(keyElement.textContent.toLowerCase(), this.elements.textArea.selectionStart, this.elements.textArea.selectionEnd, 'end');
              }
              this.properties.value = this.elements.textArea.value;
              this.triggerEvent('oninput');
            });
          }

          fragment.appendChild(keyElement);

          if (insertLineBreak) {
            fragment.appendChild(document.createElement('br'));
          }
        });
      } else {
        const keyElement = document.createElement('button');
        const insertLineBreak = ['backspace', 'enter', 'mute'].indexOf(key) !== -1;

        keyElement.setAttribute('type', 'button');
        keyElement.classList.add('keyboard__key');

        switch (key) {
          case 'mute':
            keyElement.innerHTML = createHTMLIcon('volume_up');

            keyElement.addEventListener('click', () => {
              this.properties.mute = !this.properties.mute;
              keyElement.innerHTML = !this.properties.mute ? keyElement.innerHTML = createHTMLIcon('volume_up') : keyElement.innerHTML = createHTMLIcon('volume_off');
            });
            break;

          case 'backspace':
            keyElement.classList.add('keyboard__key_wide');
            keyElement.innerHTML = createHTMLIcon('backspace');
            keyElement.id = 'Backspace';

            keyElement.addEventListener('click', () => {
              if (this.elements.textArea.selectionStart !== 0) {
                this.elements.textArea.selectionStart -= 1;
                this.elements.textArea.setRangeText('');
                this.properties.value = this.elements.textArea.value;
                this.triggerEvent('oninput');
              }
            });

            document.addEventListener('keydown', (event) => {
              if (event.key === 'Backspace') {
                keyElement.classList.add('listen__active__key');
                setTimeout(() => {
                  keyElement.classList.remove('listen__active__key');
                }, 100);
              }
            });

            break;

          case 'capsLock':
            keyElement.classList.add('keyboard__key_wide', 'keyboard__key_activable');
            keyElement.id = 'CapsLock';
            keyElement.innerHTML = createHTMLIcon('keyboard_capslock');

            keyElement.addEventListener('click', () => {
              this.toggleCapsLock();
              if (!this.properties.shift) {
                keyElement.classList.toggle('keyboard__key_active', this.properties.capsLock);
              }
            });

            document.addEventListener('keydown', (event) => {
              if (event.key === 'CapsLock') {
                if (!this.properties.shift) {
                  this.toggleCapsLock();
                  keyElement.classList.toggle('keyboard__key_active', this.properties.capsLock);
                  keyElement.classList.add('listen__active__key');
                  setTimeout(() => {
                    keyElement.classList.remove('listen__active__key');
                  }, 100);
                }
              }
            });

            break;

          case 'shift':
            keyElement.classList.add('keyboard__key_wide', 'keyboard__key_activable');
            keyElement.id = 'Shift';
            keyElement.innerHTML = 'Shift';

            keyElement.addEventListener('click', () => {
              this.toggleShift();
              keyElement.classList.toggle('keyboard__key_active', this.properties.shift);
            });
            document.addEventListener('keydown', (event) => {
              if (event.key === 'Shift') {
                this.toggleShift();
                keyElement.classList.toggle('keyboard__key_active', this.properties.shift);
                keyElement.classList.add('listen__active__key');
                setTimeout(() => {
                  keyElement.classList.remove('listen__active__key');
                }, 100);
              }
            });

            break;

          case 'enter':
            keyElement.classList.add('keyboard__key_wide');
            keyElement.innerHTML = createHTMLIcon('keyboard_return');
            keyElement.id = 'Enter';

            keyElement.addEventListener('click', () => {
              this.elements.textArea.setRangeText('\n', this.elements.textArea.selectionStart, this.elements.textArea.selectionEnd, 'end');
              this.properties.value = this.elements.textArea.value;
              this.triggerEvent('oninput');
            });

            document.addEventListener('keydown', (event) => {
              if (event.key === 'Enter') {
                keyElement.classList.add('listen__active__key');
                setTimeout(() => {
                  keyElement.classList.remove('listen__active__key');
                }, 100);
              }
            });

            break;

          case 'done':
            keyElement.classList.add('keyboard__key_wide', 'keyboard__key_dark');
            keyElement.innerHTML = createHTMLIcon('keyboard_hide');

            keyElement.addEventListener('click', () => {
              this.close();
              this.triggerEvent('onclose');
            });

            break;

          case 'space':
            keyElement.classList.add('keyboard__key_extrawide');
            keyElement.innerHTML = createHTMLIcon('space_bar');
            keyElement.id = ' ';

            keyElement.addEventListener('click', () => {
              this.elements.textArea.setRangeText(' ', this.elements.textArea.selectionStart, this.elements.textArea.selectionEnd, 'end');
              this.properties.value = this.elements.textArea.value;
              this.triggerEvent('oninput');
            });

            document.addEventListener('keydown', (event) => {
              if (event.key === ' ') {
                keyElement.classList.add('listen__active__key');
                setTimeout(() => {
                  keyElement.classList.remove('listen__active__key');
                }, 100);
              }
            });

            break;

          case 'left-arrow':
            keyElement.innerHTML = createHTMLIcon('west');
            keyElement.id = 'ArrowLeft';
            keyElement.addEventListener('click', () => {
              if (this.elements.textArea.selectionStart !== 0) {
                this.elements.textArea.selectionStart -= 1;
                this.elements.textArea.selectionEnd -= 1;
              }
            });

            document.addEventListener('keydown', (event) => {
              if (event.key === 'ArrowLeft') {
                keyElement.classList.add('listen__active__key');
                setTimeout(() => {
                  keyElement.classList.remove('listen__active__key');
                }, 100);
              }
            });

            break;

          case 'rigth-arrow':
            keyElement.innerHTML = createHTMLIcon('east');
            keyElement.id = 'ArrowRight';
            keyElement.addEventListener('click', () => {
              this.elements.textArea.selectionStart += 1;
            });

            document.addEventListener('keydown', (event) => {
              if (event.key === 'ArrowRight') {
                keyElement.classList.add('listen__active__key');
                setTimeout(() => {
                  keyElement.classList.remove('listen__active__key');
                }, 100);
              }
            });

            break;

          default:

            break;
        }

        fragment.appendChild(keyElement);

        if (insertLineBreak) {
          fragment.appendChild(document.createElement('br'));
        }
      }
    });

    return fragment;
  }

  imitationFunc = () => {
    document.addEventListener('keydown', (event) => {
      this.elements.keys.forEach((button) => {
        if (event.key === button.innerText) {
          button.classList.add('listen__active__key');
          setTimeout(() => {
            button.classList.remove('listen__active__key');
          }, 100);
        }
      });
    });
  }

  toggleCapsLock() {
    if (this.properties.shift === false) {
      this.properties.capsLock = !this.properties.capsLock;

      this.elements.keys.forEach((item) => {
        const key = item;
        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock
            ? key.textContent.toUpperCase()
            : key.textContent.toLowerCase();
        }
      });
    }
  }

  toggleShift() {
    this.properties.capsLock = !this.properties.capsLock;

    this.elements.keys.forEach((item) => {
      const key = item;
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    });

    this.properties.shift = !this.properties.shift;
    this.elements.keys.forEach((but) => {
      const button = but;
      if (button.classList.contains('withoutShift')) {
        button.style.display = this.properties.shift
          ? button.style.display = 'none' : button.style.display = 'inline-flex';
      }
    });
    this.elements.keys.forEach((but) => {
      const button = but;
      if (button.classList.contains('withShift')) {
        button.style.display = this.properties.shift
          ? button.style.display = 'inline-block' : button.style.display = 'none';
      }
    });
  }

  changeLang() {
    this.properties.lang = !this.properties.lang;
    this.elements.keys.forEach((but) => {
      const button = but;
      if (button.classList.contains('en')) {
        button.style.display = this.properties.lang
          ? button.style.display = 'none' : button.style.display = 'inline-flex';
      }
    });
    this.elements.keys.forEach((but) => {
      const button = but;
      if (button.classList.contains('ru')) {
        button.style.display = this.properties.lang
          ? button.style.display = 'inline-block' : button.style.display = 'none';
      }
    });
  }

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  }

  open(initialValue, oninput, onclose) {
    this.properties.opened = true;
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard_hidden');
    this.imitationFunc();
  }

  close() {
    this.properties.opened = false;
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard_hidden');
  }
}
