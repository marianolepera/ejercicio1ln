import { useRouter } from "next/router";
import React from 'react';
import Boton from "../components/Boton";
import stylesArticles from "../styles/articulo.module.css"

export async function getServerSideProps (context){
    console.log(context.query) 
    return {
        props: { 
           id: context.query.id ,
           basic: context.query.basic, 
        }
    }
}

const DetailArticle = (props) => {
    const router = useRouter();
    const data= JSON.parse(JSON.stringify(props))
    return(
        <div style={{marginLeft:20}}>
            <h1>Detalle del Articulo:  </h1>
            <p> id: {data.id}</p>
            <p>nombre: {data.basic}</p>
            <Boton
                className={stylesArticles.boton}
                nombre="Volver al inicio"
                onClick={() => router.back()}
            />
        </div>
    );
}

export default DetailArticle