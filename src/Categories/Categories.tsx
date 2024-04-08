import React, { useEffect, useMemo, useState } from "react";
import Checkbox from "../common/Checkbox";
import "../css/categories.css";
import { ConnectedProps, connect } from "react-redux";
import { mapDispatchToProps } from "../redux/actionCreators";
import { IState } from "../redux/reducers";
import { isLoading, isSuccess } from "../redux/util";
import Spinner from "../common/Spinner";
import { Categories } from "../redux/api/interface";
import Pagination from "../common/Pagination";

const Categories: React.FC<Props> = ({ categories, getCategories }) => {
  const PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const [categoriesToShow, setCategoriesToShow] = useState<
    Array<Categories & { isChecked: boolean }>
  >([]);
  const [parsedCategories, setParsedCategories] = useState<
    Array<Categories & { isChecked: boolean }>
  >([]);
  useEffect(() => {
    getCategories({});
  }, []);

  const end = useMemo(() => {
    return page * PER_PAGE;
  }, [page]);
  const start = useMemo(() => {
    return end - PER_PAGE;
  }, [page]);

  const totalPages = useMemo(() => {
    if (isSuccess(categories) && categories?.data) {
      return categories?.data.length / PER_PAGE;
    }
    return 0;
  }, [categories]);

  useEffect(() => {
    if (isSuccess(categories) && categories.data) {
      const modifiedCategories = (categories?.data || []).map((category) => {
        return {
          ...category,
          isChecked: false,
        };
      });
      setParsedCategories(modifiedCategories);
    }
  }, [categories]);

  useEffect(() => {
    if ((isSuccess(categories) && parsedCategories) || [].length) {
      const catsToShow = [];
      for (let i = start; i < end; i++) {
        const val = parsedCategories[i];
        catsToShow.push(val);
      }
      setCategoriesToShow(catsToShow);
    }
  }, [parsedCategories, start, end]);

  const handlePageChange = (pg: number) => {
    setPage(pg + 1);
  };

  return (
    <>
      <div className="categories-container">
        <h1 className="mark-ur-interest">Please mark your interests!</h1>
        <h4 className="keep-you-notified">We'll keep you notified.</h4>
        <h3 className="saved-interest">My saved interests!</h3>
        <div>
          {isLoading(categories) && <Spinner />}
          {isSuccess(categories) && (
            <>
              {(categoriesToShow || []).map((category) => (
                <Checkbox
                  label={category.name}
                  key={category.id}
                  isChecked={category.isChecked}
                  handleCheck={() => {
                    const updatedCategories = parsedCategories.map((pc) => {
                      if (category.id === pc.id) {
                        return {
                          ...pc,
                          isChecked: true,
                        };
                      }
                      return pc;
                    });
                    setParsedCategories(updatedCategories);
                  }}
                />
              ))}
              <Pagination
                pages={totalPages}
                handlePageClick={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  categories: state.categories,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Categories);
