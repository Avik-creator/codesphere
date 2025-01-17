import QuestionCard from "@/components/Card/QuestionCard";
import Custom_pagination from "@/components/Shared/Custom_pagination";
import NoResult from "@/components/Shared/NoResult";
import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import { getQuestionByTagId, getTagById } from "@/lib/actions/tag.action";
import { URLProps } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import React from "react";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: Omit<URLProps, "searchParams">): Promise<Metadata> {
  const tag = await getTagById({ tagId: params.id });

  return {
    title: `Posts by tag '${tag.name}' — CodeSphere`,
    description: tag.description || `Questions tagged with ${tag.name}`,
  };
}

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();

  const result = await getQuestionByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>
      <div className="mt-11 w-full">
        <LocalSearchBar
          route={`/tags/${params.id}`}
          iconPostition="left"
          imgsrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClass="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              clerkId={clerkId}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="No Tag Questions Found"
            description="It appears that there are no saved questions in your collection at the moment 😔.Start exploring and saving questions that pique your interest 🌟"
            link="/"
            linkTitle="Explore Questions"
          />
        )}
      </div>

      <div className="mt-10">
        <Custom_pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
