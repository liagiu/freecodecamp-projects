const form = document.querySelector('.form');
const formBtns = document.querySelector('.form__btns');
const arrowBtns = document.querySelectorAll('.form__arrow-btn');
const dotBtns = document.querySelectorAll('.form__dot-btn');
const submitBtn = document.querySelector('.form__submit-btn');
const tabs = document.querySelectorAll('.form__tab');
const alert = document.querySelector('.form__alert');
const header = document.querySelector('.header');
const wrapper = document.querySelector('.wrapper');
let currTab = 0;

function validateForm() {
  const inputs = [
    ...tabs[currTab].querySelectorAll('.form__input, .form__dropdown')
  ];
  const radioBtns = tabs[currTab].querySelectorAll('.form__radio');
  const checkboxes = tabs[currTab].querySelectorAll('.form__checkbox');
  let isRadioChecked = false;
  let isCheckboxChecked = false;
  let isInputFilled = true;

  for (let input of inputs) {
    if (!input.value) {
      input.classList.add('form__invalid');
      isInputFilled = false;
      break;
    }
    input.classList.remove('form__invalid');
  }

  radioBtns.forEach(radioBtn => {
    if (radioBtn.checked) return (isRadioChecked = true);
  });
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) return (isCheckboxChecked = true);
  });

  if (
    !isInputFilled ||
    (radioBtns.length > 0 && !isRadioChecked) ||
    (checkboxes.length > 0 && !isCheckboxChecked)
  ) {
    alert.style.opacity = 1;
    return false;
  } else {
    alert.style.opacity = 0;
    return true;
  }
}

function switchTab(btn) {
  const btnIndex = btn.target.value;

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  alert.style.opacity = 0;

  if (btnIndex === '1') {
    if (!validateForm()) return;
  }

  tabs.forEach(tab => {
    tab.style.opacity = 0;
    tab.style.zIndex = 0;
  });

  if (btnIndex === '0' && currTab > 0) {
    currTab -= 1;
  } else if (btnIndex === '1' && currTab < tabs.length - 2) {
    currTab += 1;
  }

  tabs[currTab].style.opacity = 1;
  tabs[currTab].style.zIndex = 1;
  colorDotBtn(currTab);

  if (btnIndex === '0' && currTab === 0) {
    btn.target.style.color = 'rgba(62, 78, 86, 0.6)';
  } else {
    arrowBtns[0].style.color = '#607682';
  }

  if (btnIndex === '1' && currTab === 2) {
    btn.target.style.color = 'rgba(62, 78, 86, 0.6)';
  } else {
    arrowBtns[1].style.color = '#607682';
  }

  formBtns.style.top = `${tabs[currTab].offsetHeight +
    formBtns.offsetHeight -
    25}px`;
}

function colorDotBtn(btnIndex) {
  for (let i = 0; i < tabs.length - 1; i++) {
    if (i <= btnIndex) {
      dotBtns[i].style.background = '#3e4e56';
    } else {
      dotBtns[i].style.background = '#fff';
    }
  }
}

function handleSubmit(e) {
  e.preventDefault();
  if (validateForm() && currTab == 2) {
    tabs[currTab].style.opacity = 0;
    tabs[3].style.opacity = 1;
    tabs[3].style.zIndex = 4;
    formBtns.style.display = 'none';
  }
}

arrowBtns.forEach(btn => btn.addEventListener('click', switchTab));
form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);

window.addEventListener('resize', () => {
  console.log(wrapper.offsetWidth);
  formBtns.style.opacity = 0;
  setTimeout(() => {
    formBtns.style.top = `${tabs[currTab].offsetHeight +
      formBtns.offsetHeight -
      25}px`;
    formBtns.style.opacity = 1;
  }, 600);
});
