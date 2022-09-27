import React from "react";
import { useAppDispatch } from "../../Hooks/Redux";
import { setSearchString } from "../../Store/Slices/ItemSlice";
import debounce from "lodash.debounce";
import { useFetchAllCategoriesQuery } from "../../Services/CategoriesApi";
import { setActiveCategories } from "../../Store/Slices/CategoriesSlice";

type PopupClick = MouseEvent & {
  path: Node[];
};

const ButtonSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const [visiblePopup, setVisiblePopup] = React.useState<boolean>(false);
  const handleClickPopup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisiblePopup(!visiblePopup);
  };
  const { data: categories, error, isLoading } = useFetchAllCategoriesQuery();
  const [category, setCategory] = React.useState<string>("Все товары");
  const handleCategoryClick = (
    e: React.MouseEvent<HTMLLIElement>,
    str: string
  ) => {
    setCategory(str);
    dispatch(
      setActiveCategories(
        categories.find((category) => category.value === str).id
      )
    );
    setVisiblePopup(false);
  };
  const btnRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (btnRef.current && !_event.path.includes(btnRef.current)) {
        setVisiblePopup(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);
  if (isLoading) {
    return <h1>Загрузка</h1>;
  } else if (error) {
    return <h1>Ошибка</h1>;
  }
  return (
    <div>
      <button
        onClick={handleClickPopup}
        ref={btnRef}
        className="hover:bg-lime-300 text-lg min-w-max bg-lime-100 border border-lime-500 text-gray-900 rounded-l-lg py-2.5 px-3"
      >
        {categories[0].value &&
        categories[0].value.replace(/["']/g, "") !== category
          ? category
          : categories[0].value.replace(/["']/g, "")}
      </button>
      <div
        className={
          visiblePopup
            ? "w-44 bg-white border-lime-700 border rounded-lg z-10 absolute"
            : "hidden"
        }
      >
        <ul className="">
          {categories.map((category, index) => (
            <li
              key={index}
              className="block rounded-lg cursor-pointer text-lg min-w-auto my-1 font-normal hover:text-white hover:bg-lime-400 p-1"
              onClick={(e) =>
                handleCategoryClick(e, category.value.replace(/["']/g, ""))
              }
            >
              {category.value.replace(/["']/g, "")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SearchItem: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const dispatch = useAppDispatch();
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchString(str));
    }, 1500),
    []
  );
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  return (
    <div className="flex items-baseline max-w-full min-w-max mr-5">
      <ButtonSearch />
      <div className="relative w-full">
        <input
          className="block p-2.5 w-full z-20 text-lg text-lime-700 bg-gray-50 rounded-r-lg border border-l-lime-50 border-lime-500 outline-0"
          onChange={onChangeSearch}
          placeholder="Товар"
          value={value}
          type="search"
        />
      </div>
    </div>
  );
};

export default SearchItem;
