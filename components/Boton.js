export default function Boton({children,...props}){
    return( 
        <div className={props.className}>
            <button
                style={props.style}
                {...props}
                >
                {props.nombre}
                {children}
            </button>
        </div>
    );
}