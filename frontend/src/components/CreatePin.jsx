import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Select from "react-select";
import { allCategoriess, pinDetailQuery } from "../utils/data";
import { client } from "../client";
import Loading from "./Loading";
import { Controller, useForm } from "react-hook-form";
import Message from "./Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../app/constant/common";

const CreatePin = ({ user, isAdd }) => {
  const [loading, setLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [allCategories, setAllCategories] = useState("");
  const { state } = useSelector((state) => state.common);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    resetField,
    setValue,
    getValues,
  } = useForm();
  const [pinDetail, setPinDetail] = useState();
  const { pinId } = useParams();
  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
      });
    }
  };
  useEffect(() => {
    if (isAdd) {
      resetField("upload_image");
      resetField("title");
      resetField("about");
      resetField("destination");
      resetField("categories");
    } else {
      setValue("upload_image", pinDetail?.image?.asset.url);
      setValue("title", pinDetail?.title);
      setValue("about", pinDetail?.about);
      setValue("destination", pinDetail?.destination);
      // eslint-disable-next-line array-callback-return
      // const ctgs = [];
      // pinDetail?.categories?.map((ctg) => {
      //   const newCtg = { label: ctg?.label, value: ctg?.category };
      //   ctgs.push(newCtg);
      // });
      setValue("categories", pinDetail?.categories);
    }
  }, [pinDetail, isAdd]);

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);
  useEffect(() => {
    const query = allCategoriess();

    client.fetch(query).then((data) => {
      setAllCategories(data);
    });
  }, []);

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };
  const onSubmit = async (data) => {
    const { title, about, categories, destination } = data;
    let ctgris = [];
    categories?.map((category) => {
      const { _id } = category;
      const ctg = { ...category, _key: _id };
      ctgris.push(ctg);
    });
    if (imageAsset && user.status && isAdd) {
      if (title && about && imageAsset?._id && ctgris) {
        const doc = {
          _type: "pin",
          title,
          about,
          destination,
          image: {
            _type: "image",
            idImage: imageAsset?._id,
            asset: {
              _type: "reference",
              _ref: imageAsset?._id,
            },
          },
          userId: user._id,
          postedBy: {
            _type: "postedBy",
            _ref: user._id,
          },
          categories: ctgris,
        };
        await client.create(doc).then(() => {
          dispatch(setState("success"));
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
      }
    } else if (user.status) {
      await client
        .patch(pinId)
        .set({
          title: title,
          about: about,
          categories: ctgris,
          destination: destination ? destination : "",
          image: {
            _type: "image",
            idImage: imageAsset?._id
              ? imageAsset?._id
              : pinDetail?.image?.idImage,
            asset: {
              _type: "reference",
              _ref: imageAsset?._id
                ? imageAsset?._id
                : pinDetail?.image?.idImage,
            },
          },
        })
        .commit()
        .then(() => {
          dispatch(setState("success"));
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
    } else {
      dispatch(setState("error"));
    }
  };

  return (
    <div className="flex flex-col justify-center  mt-5 lg:h-4/5">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex lg:flex-row flex-col justify-center  bg-white lg:p-5 p-3 w-full">
          <div className="bg-secondaryColor p-3 flex flex-0.7 w-full ">
            <div className=" flex justify-center  flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
              {loading && <Loading />}
              {imageAsset || pinDetail?.image?.asset.url ? (
                <div className="relative h-full">
                  <img
                    src={imageAsset?.url || getValues("upload_image")}
                    alt="uploaded-pic"
                    className="h-full w-full object-contain"
                  />

                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setImageAsset(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              ) : (
                <label>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col justify-center items-center relative">
                      <p className="font-bold text-2xl z-50">
                        <AiOutlineCloudUpload />
                      </p>
                      <p className="text-lg z-50">Click to upload</p>
                    </div>
                    <p className="mt-32 text-gray-400">
                      Khuy???n ngh???: S??? d???ng JPG, JPEG, SVG, PNG, GIF ho???c TIFF
                      ch???t l?????ng d?????i 20MB
                    </p>
                  </div>
                  <input
                    type="file"
                    name="upload_image z-50"
                    {...register("upload_image")}
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                  {errors?.upload_image && (
                    <p className="text-red-500">Vui l??ng t???i h??nh ???nh.</p>
                  )}
                  {wrongImageType && (
                    <p>Vui l??ng ch???n ????ng lo???i v?? k??ch th?????c!</p>
                  )}
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
            <input
              type="text"
              name="title"
              placeholder="Th??m ti??u ?????"
              {...register("title", { required: true })}
              className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
            />
            {errors?.title && (
              <p className="text-red-500">
                Vui l??ng nh???p t???t c??? c??c tr?????ng n??y.
              </p>
            )}
            {user && (
              <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
                <img
                  src={user.image || getValues("upload_image")}
                  className="w-10 h-10 rounded-full"
                  alt="user-profile"
                />
                <p className="font-bold">{user.userName}</p>
              </div>
            )}
            <textarea
              type="text"
              name="about"
              {...register("about", { required: true })}
              placeholder="Cho m???i ng?????i bi???t n???i dung Ghim c???a b???n"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            />
            {errors?.about && (
              <p className="text-red-500">
                Vui l??ng nh???p t???t c??? c??c tr?????ng n??y.
              </p>
            )}
            <input
              type="url"
              name="destination"
              {...register("destination")}
              placeholder="Th??m m???t li??n k???t"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            />

            <div className="flex flex-col">
              <div>
                <p className="mb-2 font-semibold text:lg sm:text-xl">
                  Ch???n th??? lo???i ???nh
                </p>
                {allCategories && (
                  <Controller
                    {...register("categories", { required: true })}
                    control={control}
                    name="categories"
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          isMulti
                          className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                          options={allCategories}
                        />
                      );
                    }}
                  />
                )}
              </div>
              {errors?.categories && (
                <p className="text-red-500">Vui l??ng ch???n th??? lo???i</p>
              )}
              <div className="flex justify-end items-end mt-5">
                <button
                  type="submit"
                  className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                >
                  L??u ???nh
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Message
        message={
          state === "error"
            ? "B???n ???? b??? ch???n ????ng ???nh!"
            : "????ng ???nh th??nh c??ng !"
        }
      />
    </div>
  );
};

export default CreatePin;
