import Image from 'next/image'

export default function Articulo(props){
    return( 
        <div className={props.className}>
            <a href={props.url}>
            <img  src={props.imagenNota} alt={props.titulo} layout="fill"  ></img>
            {/* <div style={props.style}> */}
            <h3>{props.titulo}</h3>
                {/* <p>{props.bajada}</p> */}
            <p>{props.fecha}</p>
            </a>
            {/* </div> */}
            {props.children}
        </div>
    );
}