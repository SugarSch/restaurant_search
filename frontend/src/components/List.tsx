import React from 'react'

function List({places}){

    return <section className="w-full md:w-1/3 overflow-y-auto p-4 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Results ({places.length})</h2>
          {places.length == 0 ? <p>No results</p> : (
            <div className="grid gap-4">
              {places.map(res => (
                <div key={res.id} className="p-3 bg-white rounded shadow hover:border-blue-300 border-2 border-transparent transition-all">
                  <h3 className="font-bold">{res.name}</h3>
                  <p className="text-sm text-gray-600">{res.district}</p>
                  <p className="text-xs text-blue-500 font-semibold">{res.category} • ⭐{res.rating}</p>
                </div>
              ))}
            </div>
          )}
        </section>
        
}

export default List;