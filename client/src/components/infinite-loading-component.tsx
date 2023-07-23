import { FC, useEffect, useRef } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import OutlinedCard from "./common/card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";

const queryClient = new QueryClient();

interface Props {}

const post = [
  { id: 1, title: "post1" },
  { id: 2, title: "post2" },
  { id: 3, title: "post3" },
  { id: 4, title: "post4" },
  { id: 5, title: "post5" },
  { id: 6, title: "post6" },
  { id: 7, title: "post7" },
  { id: 8, title: "post8" },
];

// mock fetch data base
const fetchPost = async (page: number) => {
  console.log(page);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return post.slice((page - 1) * 2, page * 2);
};

const InfiniteLoadingComponent: FC<Props> = (): JSX.Element => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["query"],
    async ({ pageParam = 1 }) => {
      const response = await fetchPost(pageParam);
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        console.log(
          "🚀 ~ file: infinite-loading-component.tsx:43 ~ pages:",
          pages
        );

        return pages.length + 1;
      },
      initialData: {
        pages: [post.slice(0, 2)],
        pageParams: [1],
      },
    }
  );

  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  const _posts = data?.pages.flatMap((page) => page);
  return (
    <div>
      Posts 👇👇👇👇👇:
      {/* {data?.pages.map((page, i) => (
        <div key={i}>
          {page.map((post) => (
            <div key={post.id}>{post.title}</div>
          ))}
        </div>
      ))} */}
      {_posts?.map((post, i) => {
        if (i === _posts.length - 1) {
          return (
            <div key={post.id} ref={ref}>
              {/* {post.title} */}
              <OutlinedCard post={post.title} />
            </div>
          );
        }
        return (
          <div key={post.id}>
            {" "}
            <OutlinedCard post={post.title} />
          </div>
        );
      })}
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage
          ? "Loading More ...🔃🔃🔃🔃"
          : (data?.pages.length ?? 0) < 4
          ? "Load More 🌅🌅🌅🌅"
          : "Nothing to load 😢😢😢😢"}
      </button>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <InfiniteLoadingComponent />
    </QueryClientProvider>
  );
};

export default App;
