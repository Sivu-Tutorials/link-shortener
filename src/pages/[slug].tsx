import { GetServerSideProps, GetServerSidePropsResult } from "next";
import React from "react";
import redis from "../index";

interface IndexProps {
  error: string;
}

const Redirect: React.FC<IndexProps> = ({ error }: IndexProps) => {
  return (
    <div>
      {error}
      <div></div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IndexProps> = async (
  ctx
): Promise<GetServerSidePropsResult<IndexProps>> => {
  const slug = ctx.req.url;

  const parsedSlug = slug.substring(1);

  const value = await redis.get(parsedSlug);

  if (!value) {
    return {
      redirect: {
        destination: "/unlucky",
        permanent: false,
      },
    };
  } else {
    ctx.res.writeHead(307, { location: `${value}` });
    ctx.res.end();
  }

  return {
    props: {
      error: "error",
    },
  };
};

export default Redirect;
