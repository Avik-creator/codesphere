import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filter";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import Custom_pagination from "./Custom_pagination";
import {
  OptionalFilter,
  OptionalPage,
  QuestionId,
  UserId,
} from "@/lib/actions/shared.types";

interface Props extends QuestionId, UserId, OptionalPage, OptionalFilter {
  totalAnswers: number;
}

const AllAnswers = async ({
  userId,
  questionId,
  totalAnswers,
  filter,
  page,
}: Props) => {
  const result = await getAnswers({
    questionId,
    sortBy: filter,
    page,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result.answer.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer?.author?.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer?.author?.picture}
                  width={22}
                  height={22}
                  alt="profile"
                  className="rounded-full object-cover max-sm:mt-0.5"
                />

                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer?.author?.name}
                  </p>
                  <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                    <span className="max-sm:hidden">• answered </span>
                    {getTimestamp(answer.createdAt)}
                  </p>
                </div>
              </Link>

              <div className="flex justify-end">
                <Votes
                  type="Answer"
                  itemId={JSON.stringify(answer?._id)}
                  userId={JSON.stringify(userId)}
                  upvotes={answer?.upvotes?.length}
                  hasupVoted={answer.upvotes.includes(userId as never)}
                  downvotes={answer.downvotes?.length}
                  hasdownVoted={answer.downvotes.includes(userId as never)}
                />
              </div>
            </div>

            <ParseHTML data={answer?.content} />
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Custom_pagination
          pageNumber={page ? +page : 1}
          isNext={result.isNext}
        />
      </div>
    </div>
  );
};

export default AllAnswers;
