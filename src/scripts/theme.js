const possibleThemes = ['theme-light', 'theme-dark'];

const control = document.querySelector('#theme-form select');
control.disabled = false;
control.addEventListener('change', changeEvent);

initTheme();

function changeEvent({ srcElement }) {
  setTheme(srcElement.value);
}

function setTheme(nextTheme) {
  possibleThemes.forEach((theme) => {
    if (theme === nextTheme) {
      document.documentElement.classList.add(theme);
    } else {
      document.documentElement.classList.remove(theme);
    }
  });
  localStorage.theme = nextTheme;
}

function initTheme() {
  const theme = localStorage.theme ?? '';
  const control = document.querySelector(`#theme-form select`);
  control.value = theme;
  setTheme(control.value);
}
