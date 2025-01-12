import { loginEmailPassword, signInGoogle } from '../../lib/auth.js';

export default () => {
  const container = document.createElement('div');
  container.classList.add('wrapper-login');
  const template = `    
    <section class="container-login">      
      <img src="./img/picsfem.png" class="logo-login">                  

      <form class="form-login">
        <div class="email-and-password-container">
          <div class="iconmail"> 
            <img class="mail" src="img/icon-mail.png">      
            <label class="login-label" id="loginLabel" for="email">              
              <input id="txtEmail" type="email" name="email" class="input-login" placeholder="Email" required>
            </label>
          </div> 

          <div class="iconmail"> 
            <img class="mail" src="img/icon-heart-lock.png">
            <label class="login-label" id="loginLabel" for="password">                
              <input id="txtPassword" type="password" name="password" class="input-login" placeholder="Senha" minlength="8" required>
            </label>              
          </div>
        </div>           
              
        <div class="signup-and-forgotpassword-container">              
          <a href="#signup" type="button" class="signup-and-forgotpassword" style="text-decoration:none">Criar conta</a>
                
          <a href="#" class="signup-and-forgotpassword">Esqueceu sua senha?</a>
        </div>   

        <span class="txt-error hide" id="txtError"></span>

        <button id="btnLogin" type="button" class="btn-login">Entrar</button>                  
                                                  
      </form>
      
      <div class="line-container">
          <span class="line"></span>
          <span class="txt-line">ou</span>
          <span class="line"></span>        
      </div>
              
      <button id="btn-gmail" type="button" class="btn-google">
          <img class="google-icon" src="./img/google-icon.png" alt="google-icon">
          Continue com google
      </button>                    
      
    </section>       

    <img class="wallpaper-login" src="./img/foto.png">      
       
    `;

  container.innerHTML = template;

  const txtEmail = container.querySelector('#txtEmail');
  const txtPassword = container.querySelector('#txtPassword');
  const btnLogin = container.querySelector('#btnLogin');
  const btnGmail = container.querySelector('#btn-gmail');
  const txtError = container.querySelector('#txtError');

  btnLogin.addEventListener('click', () => {
    loginEmailPassword(txtEmail.value, txtPassword.value)
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch(() => {
        txtError.setAttribute('style', 'display: block');
        txtError.innerHTML = 'Usuário ou senha incorretos';
        txtPassword.focus();
      });
  });

  btnGmail.addEventListener('click', () => {
    signInGoogle()
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch(() => {
        txtError.setAttribute('style', 'display: block');
        txtError.innerHTML = 'Erro ao logar com sua conta do google';
      });
  });

  return container;
};
