export default function InputSearch() {
  return (
    <div className="relative w-full max-w-md">
      <input 
        type="text" 
        placeholder="Buscar livro ou autor" 
        className="w-full bg-transparent border border-gray-500 rounded pl-5 pr-20 py-3 placeholder:text-gray-400"
      />
      <i className="ph ph-magnifying-glass text-gray-500 text-xl absolute top-0 bottom-0 right-8 flex items-center" />
    </div>
  )
}
