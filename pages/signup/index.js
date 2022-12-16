import { createAccount } from '../../lib/auth.js';

export default function signUp() {
  const container = document.createElement('div');
  container.classList.add('wrapper-signup');

  const template = `    
     <section class="signup-container">    
        <a href= "#login" type="button" class="btnVoltar" style="text-decoration:none">Voltar</a>  
        <img src="./img/picsfem.png" class="logo-signup">              
        <form class="signup-form" >
          <div class="name-email-pass">
            <label class= "signup-label" for="name">              
              <input class="input-signup" id="txtName" type="text" name="name" placeholder="Nome" required>
            </label>

            <label class= "signup-label" for="email">              
              <input class="input-signup" id="txtEmail" type="email" name="email" id="txtEmail" placeholder="Email" required>
            </label>
          
            <label class= "signup-label" for="password">              
              <input class="input-signup" id="txtPassword" type="password" name="password" id="txtPassword" minlength="8" placeholder="Senha" required>
            </label>
          </div>
          
          <span id="txtAlert" class="txt-alert hide"></span>
          
          <button id="btnSignup" type="button" class="btnSignup" style="text-decoration:none">CRIAR CONTA</button>
                    
        </form>                
     </section>
     <img class="wallpaper-signup" src="./img/foto.png">       
    `;
  container.innerHTML = template;

  const txtName = container.querySelector('#txtName');
  const txtEmail = container.querySelector('#txtEmail');
  const txtPassword = container.querySelector('#txtPassword');
  const btnSignup = container.querySelector('#btnSignup');
  const txtAlert = container.querySelector('#txtAlert');

  btnSignup.addEventListener('click', () => {
    createAccount(txtName.value, txtEmail.value, txtPassword.value)
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch(() => {
        txtAlert.setAttribute('style', 'display: block');
        txtAlert.innerHTML = 'Erro na criação de conta. Por favor, tente novamente.';
      });
  });

  return container;
}
