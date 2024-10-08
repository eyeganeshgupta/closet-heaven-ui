import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllCategoriesAction } from "../../redux/slices/categories/categoriesSlice";

const HomeCategories = () => {
  // ! dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesAction());
  }, [dispatch]);

  // TODO: get data from store
  const {
    loading,
    categories: { categories },
    error,
  } = useSelector((state) => {
    return state?.categories;
  });

  const categoriesToShow = categories?.slice(0, 5);

  return (
    <>
      <div className="mt-4 flow-root">
        <div className="-my-2">
          {loading ? (
            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
              <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 xl:w-auto bg-gray-200 animate-pulse"
                  >
                    <div className="absolute inset-0 h-full w-full bg-gray-300"></div>
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gray-400 opacity-50"></div>
                    <div className="relative mt-auto h-6 bg-gray-300 w-3/4 mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
              <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {categoriesToShow?.map((category) => (
                  <Link
                    key={category?.name}
                    to={`/products-filters?category=${category?.name}`}
                    className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                  >
                    <span aria-hidden="true" className="absolute inset-0">
                      <img
                        src={category.image}
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                    />
                    <span className="relative mt-auto text-center text-xl font-bold text-white">
                      {category?.name} ({category?.products?.length})
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeCategories;
