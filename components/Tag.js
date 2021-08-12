import Link from 'next/link';
export default function Tag({className,nombre,children}){
    return( 
        <div className={className}>
            {/* <a href={props.url}> */}
            <p>{nombre}</p>
            {/* </a> */}
            {children}
        </div>
    );
}