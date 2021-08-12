import { useRouter } from "next/router";
import Boton from "../../components/Boton";
import stylesArticles from "../../styles/articulo.module.css"

export async function getServerSideProps (context){
    console.log(context.query) 
    return {
        props: { 
           id: context.query.id ,
           text: context.query.text,
           slug: context.query.slug 
        }
    }
}

const DetailTag = (props) => {
    const router = useRouter();
    return(
        <div style={{marginLeft:20}}>
            <h1>Detalle del tag:  </h1>
            <p> id: {props.id}</p>
            <p>nombre: {props.text}</p>
            <p>slug: {props.slug}</p>
            <Boton
                className={stylesArticles.boton}
                nombre="Volver al inicio"
                onClick={() => router.back()}
            />
        </div>
    );
}

export default DetailTag