import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FeedScreenRoot,
  FeedScreenHeader,
  SWrapperBtn,
  FeedScreenFooter,
} from "./FeedScreen.styled";
import { useToken } from "../../hooks";
import { Logo } from "../../core/kit/logo";
import { SecondaryButton, PrimaryButton } from "../../core/kit/button";
import { Dropdown, Review, Spinner } from "../../components";
import { useHistory } from "react-router-dom";
import { LIMIT_REVIEWS, API_APP } from "../../constants";

type Sentiment = -1 | 0 | 1;

interface IReview {
  id: number;
  created_at: string;
  comment: string;
  themes: IReviewTheme[];
}

interface IReviewTheme {
  theme_id: number;
  sentiment: Sentiment;
}

interface ITheme {
  id: number;
  name: string;
}

const getURL = (limit: number, offset?: number, filterId?: number | null) => {
  switch (true) {
    case Boolean(offset && filterId):
      return `${API_APP.BASE_URL}${API_APP.REVIEWS_API}?limit=${limit}&offset=${offset}&theme_id=${filterId}`;
    case Boolean(offset):
      return `${API_APP.BASE_URL}${API_APP.REVIEWS_API}?limit=${limit}&offset=${offset}`;
    default:
      return `${API_APP.BASE_URL}${API_APP.REVIEWS_API}?limit=${limit}`;
  }
};

async function getReviewsByLimit(
  token: string,
  limit: number,
  offset?: number,
  filterId?: number | null,
) {
  const url = getURL(limit, offset, filterId);
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

async function getThemeById(token: string, theme_id: number) {
  return fetch(`${API_APP.BASE_URL}${API_APP.THEMES_API}/${theme_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export const FeedScreen: React.FC = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [offset, setOffset] = useState(5);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterId, setFilterId] = useState<number | null>(null);
  const [uniqueThemeIds, setUniqueThemesIds] = useState<number[]>([]);
  const [activeThemes, setActiveThemes] = useState<ITheme[]>([]);
  const [fetching, setFetching] = useState(false);

  const isCancelled = useRef(false);

  const { token, removeToken } = useToken();

  const history = useHistory();

  const TOTAL_COUNT_REVIEWS = 1000;

  const scrollHandler = useCallback(
    (e: Event) => {
      const target = e.target as Document;
      if (
        target.documentElement.scrollHeight -
          (target.documentElement.scrollTop + window.innerHeight) <
          10 &&
        reviews.length < TOTAL_COUNT_REVIEWS
      ) {
        setFetching(true);
      }
    },
    [reviews],
  );

  const onloadReviewsHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getReviewsByLimit(
        token,
        LIMIT_REVIEWS,
        offset,
        filterId,
      );

      if (response.status === 401) {
        logoutHandler();
      }

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const data = await response.json();

      const newData = data.data.filter((obj: IReview) =>
        reviews.every((el: IReview) => {
          return el.id !== obj.id;
        }),
      );
      setReviews((prev: IReview[]) => [...prev, ...newData]);
      setOffset((prev) => prev + 5);
    } catch (err) {
      if (typeof err === "string") {
        setError(err.toUpperCase());
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("unknown error");
      }
    } finally {
      setIsLoading(false);
      setFetching(false);
    }
  }, [token, offset, filterId, getReviewsByLimit, reviews]);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await getReviewsByLimit(token, LIMIT_REVIEWS);

      if (response.status === 401) {
        logoutHandler();
      }

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!isCancelled.current) {
        setReviews((prev) => [...prev, ...data.data]);
      }
    } catch (err) {
      if (typeof err === "string") {
        setError(err.toUpperCase());
      } else if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logoutHandler = () => {
    removeToken();
    history.push("/login");
  };

  const updatedThemes = (oldThemes: IReviewTheme[]) => {
    return oldThemes.map((oldTheme) => ({
      ...oldTheme,
      name: getThemeName(oldTheme.theme_id),
    }));
  };

  const getThemeName = (id: number) => {
    const item = activeThemes.find((theme) => theme.id === id);
    if (item) {
      return item.name;
    }
    return null;
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter(({ themes }) => {
      return filterId && themes.some(({ theme_id }) => theme_id === filterId);
    });
  }, [reviews, filterId]);

  function compareNumbers(a: number, b: number) {
    return b - a;
  }

  const displayedReviews = useMemo(() => {
    const feed = filterId ? filteredReviews : reviews;

    const sortedFeed = feed.sort((a, b) =>
      compareNumbers(Date.parse(a.created_at), Date.parse(b.created_at)),
    );

    return sortedFeed.map((review) => (
      <Review
        key={review.id}
        data-testid={`review-item`}
        comment={review.comment}
        created_at={review.created_at}
        themes={updatedThemes(review.themes)}
      />
    ));
  }, [reviews, updatedThemes, filteredReviews, filterId]);

  const resetReviewsHandler = useCallback(() => {
    setReviews([]);
    setOffset(0);
    setActiveThemes([]);
    fetchReviews();
    setOffset(5);
  }, [setReviews, setOffset, setActiveThemes, fetchReviews]);

  useEffect(() => {
    if (token) {
      fetchReviews();
    }

    return () => {
      isCancelled.current = true;
    };
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [scrollHandler]);

  /** useEffect for infinite scrolling */
  useEffect(() => {
    if (fetching) {
      onloadReviewsHandler();
    }
  }, [fetching]);
  /**if there is a filter => should get data with updated offset */
  useEffect(() => {
    if (filterId) {
      setOffset(filteredReviews.length);
    }
  }, [filterId, filteredReviews]);

  useEffect(() => {
    const fetchThemeById = async (theme_id: number) => {
      setIsLoading(true);
      try {
        const response = await getThemeById(token, theme_id);

        if (response.status === 401) {
          logoutHandler();
        }

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();

        setActiveThemes((prev: ITheme[]) => {
          if (prev.some((el) => el.id === data.data.id)) return [...prev];
          return [...prev, data.data];
        });
      } catch (err) {
        if (typeof err === "string") {
          setError(err.toUpperCase());
        } else if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    uniqueThemeIds.forEach((theme: number) => fetchThemeById(theme));
  }, [uniqueThemeIds]);

  useEffect(() => {
    if (reviews.length) {
      const allThemes: number[] = reviews
        .map((review) => review.themes)
        .reduce((acc, themes) => [...acc, ...themes], [])
        .map((item) => item.theme_id);
      setUniqueThemesIds([...new Set([...allThemes])]);
    }
  }, [reviews]);

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token]);

  return (
    <FeedScreenRoot data-testid="feed-screen-root">
      {error && <h2>{error}</h2>}
      <FeedScreenHeader data-testid="feed-screen-header">
        <Logo />
        <SWrapperBtn>
          <SecondaryButton
            data-testid="feed-screen-logout-btn"
            onClick={logoutHandler}
          >
            Log out
          </SecondaryButton>
        </SWrapperBtn>
      </FeedScreenHeader>
      <Dropdown
        items={activeThemes}
        setFilterId={setFilterId}
        resetReviewsHandler={resetReviewsHandler}
        filterId={filterId}
      />
      {displayedReviews}
      <FeedScreenFooter data-testid="feed-screen-footer">
        {isLoading ? (
          <Spinner />
        ) : (
          <SWrapperBtn data-testid="feed-screen-loadmore">
            <PrimaryButton onClick={onloadReviewsHandler}>
              Load more
            </PrimaryButton>
          </SWrapperBtn>
        )}
      </FeedScreenFooter>
    </FeedScreenRoot>
  );
};
