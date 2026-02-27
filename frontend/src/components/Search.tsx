import React from 'react'

function Search({keyword, setKeyword, fetchData}){

    return <header className="p-4 bg-white shadow-md z-10">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input 
            type="text" 
            className="flex-1 p-2 border rounded"
            placeholder="Search district or name..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button 
            onClick={() => fetchData(keyword)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </header>

}

export default Search;