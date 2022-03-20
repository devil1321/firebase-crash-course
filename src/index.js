import { initializeApp } from 'firebase/app'
import { getFirestore,collection, getDocs,addDoc,deleteDoc,doc, onSnapshot,query,where,orderBy,serverTimestamp,getDoc,updateDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,onAuthStateChanged ,} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDWwLKVVN3Gksawm_T1VOJCmXtr8A9QdOk",
    authDomain: "fir-9-cc-a6eca.firebaseapp.com",
    projectId: "fir-9-cc-a6eca",
    storageBucket: "fir-9-cc-a6eca.appspot.com",
    messagingSenderId: "629812409354",
    appId: "1:629812409354:web:7e9c09544caf54d54adbf3"
  };
  
  initializeApp(firebaseConfig)

//   init service
const db = getFirestore()
const auth = getAuth()

//   collection ref
const colRef = collection(db,'books')

// queries

// const q = query(colRef,where("author","==","Anna McSave"))

// query with order sort
// const q = query(colRef,where("author","==","Anna McSave"),orderBy('title','desc'))
const q = query(colRef,where("author","==","name"),orderBy("createdAt"))

console.log('query',q)

let books = [] 
let allBooks = []
// if realtime
getDocs(colRef)
  .then((snapshot)=>{
      snapshot.docs.forEach(doc => {
        books.push({...doc.data(),id:doc.id})
      })
}).then(data => console.log("query books",books))
  .catch(err => console.log(err))

// query realtime q
onSnapshot(q,(snapshot)=>{
    books = []
    snapshot.docs.forEach(doc => {
        books.push({...doc.data(),id:doc.id})
    })
    console.log(books)
})
const usbubBooks = onSnapshot(colRef,(snapshot)=>{
    allBooks = []
    snapshot.docs.forEach(doc => {
        allBooks.push({...doc.data(),id:doc.id})
    })
    console.log("allBooks",allBooks)
})

  const addBookForm = document.querySelector('.add')
  const deleteBookForm = document.querySelector('.delete')
  addBookForm.addEventListener('submit', (e) => {
      e.preventDefault()
      addDoc(colRef,{
          title:addBookForm.title.value,
          author:addBookForm.author.value,
          createdAr:serverTimestamp()
      }).then(()=>{
          addBookForm.reset()
      })
  })
  deleteBookForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const docRef  = doc(db, 'books', deleteBookForm.id.value)
      deleteDoc(docRef)
        .then(()=>{
            deleteBookForm.reset()
        })
  })

//   get single docRef
const docRef  = doc(db, 'books', "7JWKbjzYr90dfC0lGmYL")

getDoc(docRef)
  .then(doc => {
      console.log(doc.data(),doc.id)
  })
  .catch(err => console.log(err))

  const usbubDoc  = onSnapshot(docRef,(doc)=>{
    console.log(doc.data(),doc.id)
})

// update

const updateForm = document.querySelector('.update')

updateForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const docRef = doc(db, 'books',updateForm.id.value)
    updateDoc(docRef,{
        title:"Dominik"
    }).then(()=>updateForm.reset())
})

const signup = document.querySelector('.signup')

signup.addEventListener('submit', (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth,signup.email.value,signup.password.value)
        .then((user)=>{
            console.log(user.user)
            signup.reset()
        })
        .catch(err => console.log(err.message))
})

const login = document.querySelector('.login')
const logOut = document.querySelector('.logout')


login.addEventListener('submit', (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth,login.email.value,login.password.value)
        .then(user => console.log('d'))
        .catch(err => console.log(err.message))
})
logOut.addEventListener('click', (e) => {
    e.preventDefault()
    signOut(auth)
        .then(()=> console.log('d'))
        .catch(err => console.log(err.message))
})

const usnubAuth = onAuthStateChanged(auth,(user)=>{
    console.log("stch",user)
})
const unsubscribe = document.querySelector('.unsubscribe')

unsubscribe.addEventListener('click',()=>{
    usnubAuth()
    usbubDoc()
    usbubBooks()
})
