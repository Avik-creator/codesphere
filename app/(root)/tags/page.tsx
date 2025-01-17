import Link from "next/link";

import Filter from "@/components/Shared/Filter";
import NoResult from "@/components/Shared/NoResult";

import { TagFilters, UserFilters } from "@/constants/filter";

import type { SearchParamsProps } from "@/types/types";
import type { Metadata } from "next";
import LocalSearchBar from "@/components/Shared/Search/LocalSearchBar";
import { getAllTags } from "@/lib/actions/tag.action";
import Custom_pagination from "@/components/Shared/Custom_pagination";

export const metadata: Metadata = {
  title: "Tags — CodeSphere",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/tags"
          placeholder="Search for tags"
          iconPostition="left"
          imgsrc="/assets/icons/search.svg"
          otherClass="flex-1"
        />

        <Filter
          filters={TagFilters}
          otherClass="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag: any) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>

                {tag.description && (
                  <p className="small-regular text-dark500_light700 mt-4">
                    {tag.description}
                  </p>
                )}

                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>{" "}
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It appears that there are not tags found at the moment 😔. Ask a Question and kickstart the
            discussion with tags. our query could be the next big thing others learn from. Get
            involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>

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
