import { createPost, getPost, upDatePost, deletePost, likePost } from './../../lib/firestore.js';
import { logout } from '../../lib/auth.js';
import { getAuth } from '../../lib/export.js';
import { app } from '../../lib/firebase.js';

const auth = getAuth(app);

export default () => {  
  const container = document.createElement('div');
  container.classList.add('wrapper-feed');
  const template = `      

    <header class="header-feed">
      <img src="./img/picsfem.png" class="logo-feed">
      <a class="link-logout" href="#login"><button id="btnLogout" class="btn-logout" type="button">Sair</button></a>
    </header>

    <form id="formFeed" class="form-feed">
      <label class="label-input-publish" for="text">
        <input id="post" class="input-publish" name="text" type="text">
      </label>
      <div class="btns-container">
        <button class="btn" type="button">Imagem</button> 
        <button class="btn" type="button">Tema</button>    
        <button class="btn" id="btnPublish" type="button">Publicar</button>
      </div>      
    </form>

    <section id="postContainer" class="post-container">
    </section>   

    <footer class="footer-container">
      <p class="footer-text">
        Desenvolvido por <br>
        <a class="links-footer" href="https://www.linkedin.com/in/amandaholanda/">Amanda Holanda</a>, 
        <a class="links-footer" href="https://www.linkedin.com/in/isa-bella-lima/">Isabella Lima</a> e 
        <a class="links-footer" href="https://www.linkedin.com/in/gleyciane-macena-costa/">Gleyciane Macena</a>
      </p>
    </footer>

    `;

  container.innerHTML = template;
  
  const showPost = async () => {
    const arrayPost = await getPost();    
    const postTemplate = arrayPost.map((post) => `
      <div class="post">
        <div class="photo-name-container">
          <img src="img/camera-icon.png" class="photo-user" alt="user photo">
          <p class="postTxt name" id="user-name">${post.name}</p>
        </div>        
        
        <textarea class="postTxt txtArea" data-post="${post.id}" id="text-post" disabled>${post.texto}</textarea>

        <div class="btns-post-container">
          <button class="btn-post edit" data-id-post-edit="${post.id}" id="btnEdit" type="button">Editar</button>
          <button class="btn-post save hide" data-save="${post.id}"id="btnSave" type="button">Salvar</button>  
          <button data-id-post-delete="${post.id}" class="btn-post delete" id="btnDelete">Excluir</button>
        </div>            

        <div data-confirmation-options="${post.id}" class="confimation-delete hide">
          <p class="confirmation-text">Você deseja excluir essa publicação permanentemente?</p>
          <button class="btn-post confirm" id="btnConfirmDelete" data-confirmation-delete="${post.id}" type="button">Sim</button>
          <button class="btn-post confirm" data-decline-delete="${post.id}" type="button">Não</button>
        </div>

        <button id="btnLike" class="btn-like like " data-count-likes="${post.like.length}" data-like-btn="${post.id}" type="button">
        <img class="heart-icon" ${post.like.includes(auth.currentUser.uid) ? 'src="img/full-heart.png"' : 'src="img/empty-heart.png"'} alt="purple-heart"> 
        </button> 
      </div>

    `).join('');
    container.querySelector("#postContainer").innerHTML = postTemplate;

    const btnsEdit = Array.from(container.querySelectorAll('#btnEdit'));
    const btnsDelete = Array.from(container.querySelectorAll('#btnDelete'));
    const btnsLike = Array.from(container.querySelectorAll('#btnLike'));    
    
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const postToBeEdited = e.currentTarget.dataset.idPostEdit;
        const txtPost = container.querySelector(`[data-post="${postToBeEdited}"]`);
        const dataSave = container.querySelector(`[data-save="${postToBeEdited}"]`);
        const btnEdit = container.querySelector(`[data-id-post-edit="${postToBeEdited}"]`);
        const btnDelete = container.querySelector(`[data-id-post-delete="${postToBeEdited}"]`);

        txtPost.removeAttribute('disabled');
        dataSave.classList.remove('hide');
        btnEdit.classList.add('hide');
        btnDelete.classList.add('hide');

        dataSave.addEventListener("click", async () => {
          await upDatePost(postToBeEdited, txtPost.value);
          txtPost.setAttribute('disabled', '');
          dataSave.classList.add('hide');
          btnEdit.classList.remove('hide');
          btnDelete.classList.remove('hide');

        });
      });
    });    
   
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const postToBeDeleted = e.currentTarget.dataset.idPostDelete;
        const btnDelete = container.querySelector(`[data-id-post-delete="${postToBeDeleted}"]`);
        const confirmationOptions = container.querySelector(`[data-confirmation-options="${postToBeDeleted}"]`);
        const btnConfirmDelete = container.querySelector(`[data-confirmation-delete="${postToBeDeleted}"]`);
        const btnDeclineDelete = container.querySelector(`[data-decline-delete="${postToBeDeleted}"]`);  
        const btnEdit = container.querySelector(`[data-id-post-edit="${postToBeDeleted}"]`);      

        btnEdit.classList.add('hide');
        btnDelete.classList.add('hide');
        confirmationOptions.classList.remove('hide');           

        btnConfirmDelete.addEventListener('click', async() => {               
          await deletePost(postToBeDeleted);
          window.location.reload();  
        });

        btnDeclineDelete.addEventListener('click', () => {
          confirmationOptions.classList.add('hide');  
          btnDelete.classList.remove('hide');
          btnEdit.classList.remove('hide');
        })

      });    
    });

    btnsLike.forEach((btn) => {
      btn.addEventListener('click', (e) => {        
        const elemento = e.currentTarget;
        const postLikedId = elemento.dataset.likeBtn;
        const user = auth.currentUser.uid;
        const img = e.target;

          likePost(postLikedId, user)
          .then(resultado => {
            
            if(resultado.liked === true) {
              img.setAttribute('src', 'img/full-heart.png');
            } else {
              img.setAttribute('src', 'img/empty-heart.png');
            }
            
            elemento.dataset.countLikes = resultado.count;
          });
                   
      });
    });

  };
  showPost();

  const btnPublish = container.querySelector("#btnPublish");
  const txtInputPost = container.querySelector('#post');
  const btnLogout = container.querySelector('#btnLogout');
  const formFeed = container.querySelector('#formFeed');

  btnPublish.addEventListener("click", (e) => {
    e.preventDefault();
    const textPost = txtInputPost.value;    
    createPost(textPost);
    showPost();
    formFeed.reset();
  });

  btnLogout.addEventListener("click", () => {
    logout();
  });

  return container;
};