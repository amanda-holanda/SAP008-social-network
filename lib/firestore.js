import { app } from './firebase.js';
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, getAuth} from './export.js'

const db = getFirestore(app);

const createPost = async (textPost) => {
    const auth = getAuth(app);
    try {
        const docRef = await addDoc(collection(db, 'post'), {
            name: auth.currentUser.displayName,
            author: auth.currentUser.uid,
            texto: textPost,
            like: [],
        });
    } catch (e) {
    }
};

const getPost = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "post"));
        const postArray = [];
        querySnapshot.forEach((post) => {
            postArray.push({ ...post.data(), id: post.id });
        });
        console.log(postArray);
        return postArray;
    } catch (error) {
        return error;
    }
};

const upDatePost = async (userId, textPost) => {
    const newPost = doc(db, 'post', userId);

    await updateDoc(newPost, {
        texto: textPost,

    });
};

const deletePost = async (userId) => {
    try {
        const postToBeDeleted = doc(db, 'post', userId);
        await deleteDoc(postToBeDeleted);
        return postToBeDeleted.id;
    } catch (error) {
        return error;
    }
};

const getPostById = async (postId) => {
    const docRef = doc(db, "post", postId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

const likePost = async (postId, userId) => {
    const post = await getPostById(postId);
    let likes = post.like;
    const liking = !likes.includes(userId);     

    if(liking) {
        likes.push(userId);
    } else {        
        likes = likes.filter((id) => id != userId);
    }

    await updateDoc(doc(db, 'post', postId), {
        like: likes,
    });
      
    const objectLike = { liked: liking, count: likes.length }
    console.log(objectLike);
    return objectLike;    
};


export { createPost, getPost, upDatePost, deletePost, likePost };
