export default function SearchBar() {
    return <div className="w-96 bg-blue-50 p-3 flex justify-between">
        <input type="text" placeholder="Vyhledat kurz..."/>
        <button className="w-auto cursor-pointer">Vyhledat</button>
    </div>
}; 