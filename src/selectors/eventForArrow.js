document.addEventListener('scroll', () => {
   if (window.pageYOffset > 2000) {
      document.querySelector('.arrow-up-button').classList.add('arrow-up-button--active')
   } else {
      document.querySelector('.arrow-up-button').classList.remove('arrow-up-button--active')
   }
})