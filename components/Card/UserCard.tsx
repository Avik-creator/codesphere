import { getTopIneractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../Shared/RenderTag";
import { Badge } from "../ui/badge";

interface props {
  user: {
    _id: string;
    clerkId: string;
    name: string;
    username: string;
    picture: string;
  };
}

const UserCard = async ({ user }: props) => {
  const interactedTags = await getTopIneractedTags({ userId: user._id });
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px] overflow-hidden"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt="User profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>

        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag: any) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
