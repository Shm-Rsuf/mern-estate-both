import { useState } from "react";
import SectionTitle from "../components/shared/SectionTitle";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  console.log(formData);

  /* handleImageSubmit */
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError("image upload failded (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("you can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      /* test starts here */
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
      /* test ends here */
    });
  };

  /* handleDelete */
  const handleDelete = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <SectionTitle title="Create a Listing" />
      <form className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col gap-5 flex-1">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            maxLength={60}
            minLength={10}
            required
            className="border rounded-md p-2 focus:outline-none"
          />

          <textarea
            type="text"
            name="name"
            id="name"
            placeholder="Description"
            required
            className="border rounded-md p-2 focus:outline-none"
          />

          <input
            type="text"
            name="name"
            id="name"
            placeholder="Address"
            required
            className="border rounded-md p-2 focus:outline-none"
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="sale" id="sale" className="w-4" />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" name="rent" id="rent" className="w-4" />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-4"
              />
              <span>Parking spot</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-4"
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" name="offer" id="offer" className="w-4" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                max="10"
                min="1"
                required
                className="p-3 border border-gray-300 rounded-md"
              />
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                max="10"
                min="1"
                required
                className="p-3 border border-gray-300 rounded-md"
              />
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="regularPrice"
                id="regularPrice"
                max="10"
                min="1"
                required
                className="p-3 border border-gray-300 rounded-md"
              />
              <div className="flex flex-col items-center">
                <span>Regular Price</span>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="discountPrice"
                id="discountPrice"
                max="10"
                min="1"
                required
                className="p-3 border border-gray-300 rounded-md"
              />
              <div className="flex flex-col items-center">
                <span>Discounted Price</span>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right flex flex-col flex-1 gap-5">
          <p className="font-semibold">
            Image:
            <span className="font-normal text-gray-500 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              name="images"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded-md w-full"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-2 text-green-700 border border-green-700 rounded-md uppercase disabled:text-green-500 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading" : "Upload"}
            </button>
          </div>
          <p className="text-red-600 text-sm text-center">
            {imageUploadError && imageUploadError}
          </p>

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between items-center border border-gray-300 px-3 rounded-md"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-28 h-28 object-contain rounded-md"
                />
                <button
                  onClick={() => handleDelete(index)}
                  type="button"
                  className="text-red-600 uppercase cursor-pointer hover:text-red-500 duration-300"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            type="submit"
            disabled={false}
            className="bg-slate-700 text-white p-2 rounded-md uppercase tracking-wide hover:bg-slate-600 duration-300 cursor-pointer disabled:bg-slate-500 disabled:cursor-not-allowed"
          >
            create listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
