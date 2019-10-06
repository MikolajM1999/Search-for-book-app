document.addEventListener('scroll', () => {
   if (window.pageYOffset > 2000) {
      document.getElementById('arrow').classList.add('arrow--active')
   } else {
      document.getElementById('arrow').classList.remove('arrow--active')
   }
})