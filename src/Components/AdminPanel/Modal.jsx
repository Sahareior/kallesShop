import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useUpdateProductMutation } from '../../ReactRedux/apiSlice'

export default function Modal({items,refetch}) {
    const {_id,title, gender,img,img2,color,date,email,category,zoomImage,price} = items
  let [isOpen, setIsOpen] = useState(false)
  const [sgender,setSgender] = useState(gender)
  const [scategory,setScategory] = useState(category)
  const [updateProduct] = useUpdateProductMutation()
  


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  
  const handleChange=(e)=>{
    setSgender(e.target.value)
    }
    const handleCategory=(e)=>{
      setScategory(e.target.value)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const id = items._id; // Ensure you are passing the correct _id
      console.log(id)
      const gender = sgender.toLowerCase();
      const title = e.target.title.value;
      const category = scategory.toLowerCase();
      const img = e.target.img.value;
      const img2 = e.target.img2.value;
      const color = e.target.color.value;
      const date = e.target.date.value;
      const email = e.target.email.value;
      const zoomImage = e.target.zoom.value;
      const price = parseFloat(e.target.price.value);
    
      const value = { title, gender, img, img2, color, date, email, category, zoomImage, price };
      
      try {
        await updateProduct({ id, data: value }).unwrap();
        refetch();
        closeModal();
      } catch (error) {
        console.error('Error while updating product:', error);
      }
    };
    
  return (
    <>
      <div className=" flex text-black items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className='text-red-600'
          
        >
          Edit
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                       <section className="w-[770px]  p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
  <h1 className="text-xl font-bold text-white capitalize dark:text-white"></h1>

  <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2">
          <div>
              <label className="text-white dark:text-gray-200" htmlFor="username">Product Title</label>
              <input id="username" type="text" defaultValue={title} name='title' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
          </div>
          <div>
              <label className="text-white dark:text-gray-200" htmlFor="username">Gender</label>
              <select onChange={handleChange} className="appearance-none w-full py-1 px-2 bg-white" defaultValue={gender} name="whatever" id="frm-whatever">
              <option value={sgender}>{sgender}</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Kids">Others</option>
  </select>
          </div>
          <div>
              <label className="text-white dark:text-gray-200" htmlFor="username">Category</label>
              <select  onChange={handleCategory}  className="appearance-none w-full py-1 px-2 bg-white" name="whatever" id="frm-whatever">
  <option value={category}>{category}</option>
    <option value="Jeans">Jeans</option>
    <option value="Sharee">Sharee</option>
    <option value="T Shirts">T Shirts</option>
    <option value="Shirts">Shirts</option>
  </select>
          </div>

          <div>
              <label className="text-white dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
              <input id="emailAddress" type="email" defaultValue={email} name='email' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
          </div>

      
          <div>
              <label className="text-white dark:text-gray-200" htmlFor="emailAddress">Price</label>
              <input id="emailAddress" type="number" defaultValue={price} name='price' placeholder='$$' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
          </div>
      
          <div>
              <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Color</label>
              <input id="color" type="text" defaultValue={color} name='color' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
          </div>
  
       
          <div>
              <label className="text-white dark:text-gray-200" for="passwordConfirmation">Date</label>
              <input id="date" type="date" defaultValue={date} name='date' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
          </div>
        
          <div>
              <label className="text-white dark:text-gray-200">
              Main Image
            </label>
            <div className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              <input name='img' defaultValue={img} type="text" />
            </div>
          </div>
          <div>
              <label className="text-white dark:text-gray-200">
              Slideing Image
            </label>
            <div className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              <input name='img2' defaultValue={img2} type="text" />
            </div>
          </div>
          <div>
              <label className="text-white dark:text-gray-200">
              Zoom-Image
            </label>
            <div className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              <input name='zoom' defaultValue={zoomImage} type="text" />
            </div>
          </div>
      </div>

      <div className="flex justify-center mt-6">
          <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Upload</button>
      </div>
  </form>
</section>


                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
