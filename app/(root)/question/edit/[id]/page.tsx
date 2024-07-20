import Question from "@/components/Forms/Question";
import { GetQuestionById } from "@/lib/actions/Question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types/types";
import { auth } from "@clerk/nextjs/server";

import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Question — CodeSphere",
};

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const result = await GetQuestionById({ questionId: params.id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default Page;
