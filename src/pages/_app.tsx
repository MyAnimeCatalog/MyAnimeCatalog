import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Layout from "~/components/Layout";
import { AnimatePresence } from "framer-motion";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <AnimatePresence mode = "wait" initial = {false}>
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
