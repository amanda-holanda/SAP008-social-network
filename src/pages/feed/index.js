import {
  createPost, getPost, upDatePost, deletePost, likePost,
} from '../../lib/firestore.js';
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
      <button id="btnLogout" class="btn-logout" type="button">Sair</button>
    </header>

    <form id="formFeed" class="form-feed">
      <label class="label-input-publish" for="text">
        <input id="post" class="input-publish" name="text" type="text">
      </label>

      <span id="alertPublish" class="alert-publish hide"></span>
           
      <button class="btn" id="btnPublish" type="button">Publicar</button>
      
    </form>

    <section id="postContainer" class="post-container">
    </section>   

    <footer class="footer-container">
      <p class="footer-text">
        Desenvolvido por <br>
        <a class="links-footer" href="https://www.linkedin.com/in/amandaholanda/">Amanda Holanda </a>|
        <a class="links-footer" href="https://www.linkedin.com/in/isa-bella-lima/"> Isabella Lima </a>|
        <a class="links-footer" href="https://www.linkedin.com/in/gleyciane-macena-costa/"> Gleyciane Macena</a>
      </p>
    </footer>

    `;

  container.innerHTML = template;

  const showPost = async () => {
    const arrayPost = await getPost();
    const postTemplate = arrayPost.map((post) => `
      <form class="post">
                  
        <label for="post-content" class="postTxt name" id="user-name">${post.name}</label>
                
        <textarea name="post-content" class="postTxt txtArea" data-post="${post.id}" id="text-post" disabled>${post.texto}</textarea>

        <span class="save-alert hide" data-save-alert="${post.id}"></span>

        <div ${post.author === auth.currentUser.uid ? 'class="btns-post-container" ' : 'class="btns-post-container hide"'}>          
          <button class="btn-post edit" data-id-post-edit="${post.id}" id="btnEdit" type="button">Editar</button>
          <button class="btn-post save hide" data-save="${post.id}"id="btnSave" type="button">Salvar</button>  
          <button data-id-post-delete="${post.id}" class="btn-post delete" id="btnDelete">Excluir</button>
        </div>            

        <div data-confirmation-options="${post.id}" class="confimation-delete hide">
          <span class="confirmation-text">Você deseja excluir essa publicação permanentemente?</span>
          <button class="btn-post confirm" id="btnConfirmDelete" data-confirmation-delete="${post.id}" type="button">Sim</button>
          <button class="btn-post confirm" data-decline-delete="${post.id}" type="button">Não</button>
        </div>

        <button id="btnLike" class="btn-like like " data-count-likes="${post.like.length}" data-like-btn="${post.id}" type="button">
        <img class="heart-icon" ${post.like.includes(auth.currentUser.uid) ? 'src="img/full-heart.png"' : 'src="img/empty-heart.png"'} alt="purple-heart"> 
        </button> 
      </form>

    `).join('');
    container.querySelector('#postContainer').innerHTML = postTemplate;

    const btnsEdit = Array.from(container.querySelectorAll('#btnEdit'));
    const btnsDelete = Array.from(container.querySelectorAll('#btnDelete'));
    const btnsLike = Array.from(container.querySelectorAll('#btnLike'));

    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const postToBeEdited = e.currentTarget.dataset.idPostEdit;
        const txtPost = container.querySelector(`[data-post="${postToBeEdited}"]`);
        const dataSave = container.querySelector(`[data-save="${postToBeEdited}"]`);
        const btnEdit = container.querySelector(`[data-id-post-edit="${postToBeEdited}"]`);
        const btnDelete = container.querySelector(`[data-id-post-delete="${postToBeEdited}"]`);
        const saveAlert = container.querySelector(`[data-save-alert="${postToBeEdited}"]`);

        txtPost.removeAttribute('disabled');
        dataSave.classList.remove('hide');
        btnEdit.classList.add('hide');
        btnDelete.classList.add('hide');

        dataSave.addEventListener('click', async () => {
          const txtEdited = txtPost.value;

          if (txtEdited !== '') {
            await upDatePost(postToBeEdited, txtEdited)
            .then(()=> {
              txtPost.setAttribute('disabled', '');
              dataSave.classList.add('hide');
              btnEdit.classList.remove('hide');
              btnDelete.classList.remove('hide');
              saveAlert.setAttribute('style', 'display: none');
            })
            .catch(()=> {
              saveAlert.classList.remove('hide');
              saveAlert.innerHTML = 'Ocorreu um erro, tente novamente.';              
            })
          } else {
            saveAlert.classList.remove('hide');
            saveAlert.innerHTML = 'Por favor, escreva algo antes de salvar.';
          }          
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

        btnConfirmDelete.addEventListener('click', async () => {
          await deletePost(postToBeDeleted);
          window.location.reload();
        });

        btnDeclineDelete.addEventListener('click', () => {
          confirmationOptions.classList.add('hide');
          btnDelete.classList.remove('hide');
          btnEdit.classList.remove('hide');
        });
      });
    });

    btnsLike.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const elemento = e.currentTarget;
        const postLikedId = elemento.dataset.likeBtn;
        const user = auth.currentUser.uid;
        const img = e.target;

        likePost(postLikedId, user)
          .then((resultado) => {
            if (resultado.liked === true) {
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

  const btnPublish = container.querySelector('#btnPublish');
  const txtInputPost = container.querySelector('#post');
  const btnLogout = container.querySelector('#btnLogout');
  const formFeed = container.querySelector('#formFeed');
  const alertPublish = container.querySelector('#alertPublish');

  btnPublish.addEventListener('click', async () => {
    const textPost = txtInputPost.value;
    if (textPost !== '') {
      await createPost(textPost)
      .then(()=> {
        showPost();
        formFeed.reset();
        alertPublish.setAttribute('style', 'display: none');
      })
      .catch(()=> {
        alertPublish.setAttribute('style', 'display: block');
        alertPublish.innerHTML = 'Ocorreu um erro, tente novamente.';
      })        
    } else {
      alertPublish.setAttribute('style', 'display: block');
      alertPublish.innerHTML = 'Por favor, escreva algo antes de publicar!';
    }      
  });

  btnLogout.addEventListener('click', async () => {
    await logout()
    .then(()=> {
      window.location.hash = "#login";
    })
    .catch(()=> {
      window.location.hash = "#feed";
    })
  });

  return container;
};
