import { initializeApp } from 'firebase/app'
import { collection, getFirestore, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBjJmdW-uF-xaOIcLOvfZOzvkeiNYWFdjo",
  authDomain: "teste-alest-1f3f8.firebaseapp.com",
  projectId: "teste-alest-1f3f8",
});

export const App = () => {
  const [nome, setNome] = useState("")
  const [midia, setMidia] = useState("")
  const [valor, setValor] = useState("")
  const [produtos, setProdutos] = useState([])

  const db = getFirestore(firebaseApp);
  const produtoCollectionRef = collection(db, "Produtos");

  async function criarProduto() {
    const produto = await addDoc(produtoCollectionRef, {
      nome, midia, valor
    });
    console.log(produto);
    window.location.reload();
  }

  useEffect(() => {
    const getProdutos = async () => {
      const data = await getDocs(produtoCollectionRef);
      setProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProdutos();
  },[]);

  async function deletarProduto(id) {
    const produtoDoc = doc(db, "Produtos", id);
    await deleteDoc(produtoDoc);
    window.location.reload();
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder="Nome..." 
        value={nome} 
        onChange={(e) => setNome(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Mídia..." 
        value={midia} 
        onChange={(e) => setMidia(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Valor..." 
        value={valor} 
        onChange={(e) => setValor(e.target.value)}
      />
      <button onClick={criarProduto}>Criar produto</button>
      <ul>
        {produtos.map((produto) => {
          return (
            <div key={produto.id}>
              <li>{produto.nome}</li>
              <li>{produto.midia}</li>
              <li>{produto.valor}</li>
              <button onClick={() => deletarProduto(produto.id)}>Deletar</button>
              <br></br><br></br>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
