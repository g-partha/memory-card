import './styles/card.css'

export default function Card({name, src, handleClick}){
    return <div onClick={handleClick} className="pokemon-card">
        <img src={src} alt={name}></img>
        <p>{name}</p>
    </div>
}