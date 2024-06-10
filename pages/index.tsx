import Description from "@/components/Description";
import Layout from "@/components/Layout";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next/types";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {

  return (
    <Layout>
      <Description
        title="E-magazyn FireControl"
        text="Nie zapomnij wpisać co pobrałeś!"
        src="/images/schedule.jpg"
        alt="Schedule photo"
      />
      {/* <Description
        title=""
        text="All necessary elements visualized on charts."
        src="/images/chart.jpg"
        alt="Chart photo"
      /> */}
    </Layout>
  );
}

