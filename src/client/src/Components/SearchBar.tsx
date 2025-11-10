export default function SearchBar() {
    return <div className="w-96 bg-blue-50 flex justify-between rounded">
        <input className="pl-3 w-full active:border-0" type="text" placeholder="Vyhledat kurz..."/>
        <button className="w-auto cursor-pointer border-l p-3 h-full ">Vyhledat</button>
    </div>
}; 