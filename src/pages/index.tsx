import { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";

interface CatCategory {
  id: number;
  name: string;
}

interface SearchCatImage {
  breeds: string[];
  categories: CatCategory[];
  id: string;
  url: string;
  width: number;
  height: number;
}

type SearchCatImageResponse = SearchCatImage[];

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json() as SearchCatImageResponse;
  return result[0];
};

interface IndexPageProps {
  initialCatImageUrl: string;
}

const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);

  const handleClick = async () => {
    const image = await fetchCatImage();
    setCatImageUrl(image.url);
  };
  
  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: 'rgb(120,120,120)',
          color: 'white',
          border: 'none',
          borderRadius: '0.4rem',
          padding: '4px 4px', 
        }}>
        Cat of the day🐱
      </button>
      <div style={{ marginTop: 8 }}>
        <img style={{ width: '100%' }} src={catImageUrl} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};

export default IndexPage;
