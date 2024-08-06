import { defer, type LoaderFunction } from "@remix-run/cloudflare";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Await resolve={loaderData.profile}>
        {(profile) => {
          return <div>{profile}</div>
        }}
      </Await>
    </Suspense>
  );
}

export const loader = (async () => {
  return defer({
    profile: new Promise((resolve) => {
      setTimeout(() => { 
        resolve("Loaded");
      }, 5000);
    }) as Promise<string>,
  });
}) satisfies LoaderFunction;
