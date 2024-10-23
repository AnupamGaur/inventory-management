import { useState } from 'react'
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const menuItems = ['Home', 'Stores', 'Products', 'Catalogue', 'Promotions', 'Reports', 'Docs', 'Settings'];
  const [activeItem, setActiveItem] = useState<String>('Products')
  return (
    <div className="bg-white flex flex-col min-h-screen h-full justify-between p-3 border-r-[1px]">
      {/* menu bar */}
      <div>
        <div>
          <div className="bg-teal-500 text-white rounded-lg p-2 flex items-center w-40">
            <span className="font-bold mr-2">A</span>
            <span>ANUPAM INC.</span>
          </div>
        </div>
        <hr className="h-px my-8 " />
        <nav>
          {menuItems.map((item, index) => (
            <div key={index}>
            <Link to={item} >
              <div key={index} className={`flex rounded-md py-2 px-4 hover:bg-gray-100 ${item === activeItem ? 'bg-[#ECF7FF] text-[#1F8CD0]' : ''} items-center gap-2`} onClick={() => setActiveItem(item)}>

                <input disabled type="checkbox" className="w-4 h-4" />
                {item}

              </div>
            </Link>
            </div>
          ))}
        </nav>
      </div>
      {/* user profile */}
      <div className="flex flex-col">
        <div>
          <hr className="h-px my-8 bg-black/5" />
        </div>
        <div className='flex flex-row justify-around items-center'>
          <img src="https://static.virtubox.io/project/file/20241017-175544-boms-user1.png" alt="User" className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-semibold">Anupam Gaur</div>
            <div className="text-sm text-gray-500">agaur_be20@thapar.edu</div>
          </div>
          <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path d="M9.293 6.293L15.586 12l-6.293 6.293 1.414 1.414L18.414 12 10.707 4.293 9.293 6.293z" fill="#1F8CD0"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Sidebar