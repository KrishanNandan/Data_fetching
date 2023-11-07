import { type ReactNode, useState, useEffect } from "react";

import BlogPosts, { BlogPost } from "./components/BlogPosts";
import { get } from "./util/http";
import fetchingImg from './assets/data-fetching.png';

type RawData = {
  "userId": number,
  "id": number,
  "title": string,
  "body": string
}


function App() {

  const [isFetching, setIsFetching] = useState(true);
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();

  useEffect(() => {
    setIsFetching(true);
    async function fetchPost() {
      const data = (await get("https://jsonplaceholder.typicode.com/posts")) as RawData[];
      const actualData: BlogPost[] = data.map((e) => { return { id: e.id, title: e.title, text: e.body } });
      setIsFetching(false);
      setFetchedPosts(() => actualData);
    }
    fetchPost();
  }, [])

  let content: ReactNode;
  
  if (isFetching) {
    content = <p id="loading-fallback">Fetching posts...</p>
  }

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />
  }

  console.log(content);
  return <main>
    <img src={fetchingImg} alt="An abstract image depicting a data fetching process." />
    {content}
  </main>

}

export default App;
