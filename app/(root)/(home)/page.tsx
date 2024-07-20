import HomeFilter from "@/components/Home/HomeFilter";
import QuestionCard from "@/components/Card/QuestionCard";
import Filter from "@/components/Shared/Filter";
import NoResult from "@/components/Shared/NoResult";
import Pagination from "@/components/Shared/Custom_pagination";
import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import {
  GetQuestion,
  getRecommendedQuestions,
} from "@/lib/actions/Question.action";
import { SearchParamsProps } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Custom_pagination from "@/components/Shared/Custom_pagination";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home — CodeSphere",
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId: clerkId } = auth();

  let result;

  if (searchParams?.filter === "recommended") {
    if (clerkId) {
      result = await getRecommendedQuestions({
        userId: clerkId,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
      });
    } else {
      result = {
        question: [],
        isNext: false,
      };
    }
  } else {
    result = await GetQuestion({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  }

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={"/ask-question"} className="flex justify-end max:sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          placeholder="Search for questions"
          iconPostition="left"
          imgsrc="/assets/icons/search.svg"
          otherClass="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClass="min-h-[56px] sm:min-w-[170px]"
          containerClass="hidden max-md:flex"
        />
      </div>
      <HomeFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.question.length > 0 ? (
          result.question.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
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
            title="There`s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
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
}
