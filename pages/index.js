import Articulo from '../components/Articulo'
import Tag from "../components/Tag";
import Boton from "../components/Boton";
import styles from '../styles/Home.module.css'
import {React,useState} from 'react';
import stylesArticles from "../styles/articulo.module.css"
import moment from 'moment';
import 'moment/locale/es';
moment.locale("es"); 
import Link from 'next/link';

export async function getServerSideProps(context)  {
  try{
    const res = await fetch('https://api-test-ln.herokuapp.com/articles');
    const data = await res.json()
    return {
      props: { articulos: data.articles.filter(art => art.subtype ==7) }
    }
  } catch(error){
    console.log(error);
  }
  
}

function orderTags(articulos){
  var articuloArrayObjeto = {};
  var articuloArray=[];
  var articuloTags=[]
  var i=0;
  //recorro el array de articulos y agrego el tag a un nuevo articulo
  articulos.map(art =>{
    art.taxonomy.tags.map(tag =>{
      articuloArray.push(tag.slug)
    })
  })
  //cuento la ocurrencia de cada slug en el array y saco los repetidos, lo convierto en un map
  articuloArray = articuloArray.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  //recorro el map, y armo un nuevo objecto de Tags, agrupandolos y totalizando la ocurrencia de cada uno
  for (let artc of articuloArray.entries()) {
    var text=""
    var index=0
    if(artc[0].includes("tid")){
      index=artc[0].search("tid")
      text=(artc[0].substring(0,index)).replace(/-|0/g," ")
    }
    else{
      text=artc[0]
    }
    articuloArrayObjeto={
      slug:artc[0], 
      text:text,
      count:artc[1],
      id:i
    }
    articuloTags.push(articuloArrayObjeto);
    i++;
  }
  //los ordeno de mayor a menor
  articuloTags=articuloTags.sort((a,b)=>b.count-a.count);
  //solo muestro los 10 primeros
  articuloTags=articuloTags.slice(0,10)
  return articuloTags;
}


const Home = ({articulos}) => {
  const [ articlesNum, setArticlesNum] = useState(9);
  let tags=[];
  tags=orderTags(articulos);
  function showMore() {
    setArticlesNum(prevArticlesNum => prevArticlesNum + 9)
  }
  return (   
    <div >
      <main style={{marginLeft:40}}>
          <h1 className={styles.titulo}>Acumulado Grilla</h1>
          <div className={stylesArticles.gridTags}>   
            {tags.map(tag =>( 
              <div key={tag.id}>    
                <Link 
                href={{pathname:"/tema/[slug]", 
                      query:{
                          id:tag.id,
                          text:tag.text,
                          slug:tag.slug

                }}} 
                as={"/tema/"+ tag.slug} 
                passHref
                >
                <div>
                  <Tag
                    className={stylesArticles.tag}
                    //url="#"
                    nombre={tag.text + "·"}
                  /> 
                </div>
                </Link>
              </div>
            ))}
          </div>
          <div className={stylesArticles.gridArticulos}>
            {articulos.slice(0, articlesNum).map(art=>( 
              <div key={art._id}>   
                <Link
                href={{pathname:"/[id]", 
                        query:{
                            id:art._id,
                            basic:art.headlines.basic,
                }}} 
                as={"/"+ art._id} 
                passHref
                >
                  <div>
                    <Articulo
                      className={stylesArticles.articulo}
                      //url="#"
                      imagenNota={art.promo_items.basic.url}
                      titulo={art.headlines.basic}
                      fecha={moment(art.display_date).format('LL')}
                    />
                  </div>
                </Link>
              </div>
            ))}
             <div 
              style={{display: articlesNum > 9 ? 'none' : 'block' }}
              className={stylesArticles.transparencia}
             >
             </div>
          </div>
          <div 
          className={stylesArticles.cajaBoton} 
          style={{display: articlesNum >= articulos.length ? 'none' : 'block' }}
          >
                <Boton
                  className={stylesArticles.boton}
                  nombre="Mas acumulados de Grilla"
                  onClick={showMore}
                />
          </div>
      </main>
    </div>
  )
}
export default Home;
