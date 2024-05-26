import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const getCurrentUserEmail = () => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          resolve(user.email);
        } else {
          // No user is signed in
          resolve(null);
        }
      });
    });
  };


  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);




    try {
      const currentUserEmail = await getCurrentUserEmail();
      const imgResponse = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      }).then(res => res.json());

      if (imgResponse.success) {
        const imgURL = imgResponse.data.display_url;
        const newItem = {
          name: data.name,
          category: data.category,
          youtubeVideoCode: data.youtubeVideoCode,
          country: data.country,
          recipe: data.recipe,
          image: imgURL,
          creatorEmail: currentUserEmail,
          watchCount: 0,
          purchased_by: [],
        };

        const response = await fetch('https://recipe-server-psi.vercel.app/addRecipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        }).then(res => res.json());

        if (response.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Recipe added successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    } catch (error) {
      console.error('Error uploading image or adding recipe:', error);
    }
  };



  return (
    <div className="mt-24">
      <h2 className="text-4xl mt-8 font-serif font-extrabold text-center mb-12 text-orange-600">Add your Favorite recipes</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-12 rounded-lg max-w-7xl mx-auto">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Recipe Name*</span>
          </div>
          <input
            type="text"
            placeholder="Type Here The Recipe Name"
            {...register("name", { required: true, maxLength: 120 })}
            className="input input-bordered w-full"
          />
          {errors.name && <span className="text-sm text-red-500">Recipe Name is required</span>}
        </label>
        <div className="flex gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Category*</span>
            </div>
            <select
              defaultValue="Pick One"
              {...register("category", { required: true })}
              className="select select-bordered"
            >
              <option disabled>Pick One</option>
              <option>Pizza</option>
              <option>Soup</option>
              <option>Salad</option>
              <option>Desi</option>
              <option>Dessert</option>
              <option>Drinks</option>
            </select>
            {errors.category && <span className="text-sm text-red-500">Category is required</span>}
          </label>
          <label htmlFor="youtubeVideoCode" className="form-control w-full">
            <div className="label">
              <span className="label-text">Youtube Video*</span>
            </div>
            <input
              type="text" id="youtubeVideoCode" {...register("youtubeVideoCode", { required: true })}
              className="input input-bordered w-full" />
            {errors.youtubeVideoCode && <span className="text-sm text-red-500">Please provide the YouTube video code</span>}
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Country*</span>
            </div>
            <input
              type="text"
              placeholder="Country"
              {...register("country", { required: true, maxLength: 20 })}
              className="input input-bordered w-full"
            />
            {errors.country && <span className="text-sm text-red-500">Country is required</span>}
          </label>
        </div>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Recipe Details</span>
          </div>
          <textarea
            {...register("recipe", { required: true, maxLength: 200 })}
            className="textarea textarea-bordered h-24"
            placeholder="Type Here of Item Details"
          ></textarea>
          {errors.recipe && <span className="text-sm text-red-500">Recipe Details are required</span>}
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Recipe Image*</span>
          </div>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full"
          />
          {errors.image && <span className="text-sm text-red-500">Recipe Image is required</span>}
        </label>
        <input type="submit" className="btn mt-8 bg-orange-600 text-white font-semibold text-lg px-8" value="Add Recipe" />
      </form>
    </div>
  );
};

export default AddItem;
