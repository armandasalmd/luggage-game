import { FC, useState, useEffect } from "react";
import classNames from "classnames";

import "./Pagination.scss";
import LeftIcon from "@material-ui/icons/Undo";
import RightIcon from "@material-ui/icons/Redo";
import { Input } from "@components/atoms";
import useDebounce from "@hooks/useDebounce";
import GlobalUtils from "@utils/Global";

interface PaginationProps {
  noJumping?: boolean;
  defaultPage?: number;
  pageCount: number;
  onChange?(page: number): void;
}

const Pagination: FC<PaginationProps> = (props) => {
  const [page, setPage] = useState(props.defaultPage || 1);
  const [pageVal, setPageVal] = useState("");
  const classes = classNames("pagination", {
    "pagination--noJumping": props.noJumping === true,
  });
  const classesLeft = classNames("pagination__button", {
    "pagination__button--disabled": page <= 1
  });
  const classesRight = classNames("pagination__button", {
    "pagination__button--disabled": page >= props.pageCount
  });

  useDebounce(onChange, 1000, [page]);

  const placeholder = "Page " + page + "/" + props.pageCount;

  function onChange() {
    GlobalUtils.callIfFunction(props.onChange, page);
    setPageVal("");
  }

  function handleInput(value: string) {
    let parsed = parseInt(value);
    
    if (!isNaN(parsed)) {
      if (props.pageCount < parsed) {
        parsed = props.pageCount;
      } else if (parsed === 0) {
        parsed = 1;
      }

      setPageVal(parsed.toString());
      setPage(parsed);
    }
  }

  useEffect(() => {
    if (page > props.pageCount) {
      setPage(props.pageCount);
    }
  }, [props.pageCount, page])

  return (
    <div className={classes}>
      <span
        className={classesLeft}
        onClick={setPage.bind(null, page - 1)}
      >
        <LeftIcon />
      </span>
      <Input
        className="pagination__input"
        maxWidth={100}
        placeholder={placeholder}
        setValue={handleInput}
        value={pageVal}
      />
      <span
        className={classesRight}
        onClick={setPage.bind(null, page + 1)}
      >
        <RightIcon />
      </span>
    </div>
  );
};

export default Pagination;
